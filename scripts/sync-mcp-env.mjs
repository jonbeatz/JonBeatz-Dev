#!/usr/bin/env node
/**
 * Sync JonBeatz MCP env vars from .env.local into project + global Cursor MCP configs.
 *
 * Project: .cursor/mcp.json (21st-dev, browserbase, composio)
 * Global:  ~/.cursor/mcp.json (github, tavily, hostinger-*)
 *
 * Usage:
 *   npm run sync:mcp-env
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const ENV_LOCAL = path.join(REPO_ROOT, '.env.local');
const PROJECT_MCP = path.join(REPO_ROOT, '.cursor', 'mcp.json');
const GLOBAL_MCP = path.join(os.homedir(), '.cursor', 'mcp.json');
const HOSTINGER_LAUNCHER_SOURCE = path.join(REPO_ROOT, 'scripts', 'jonbeatz-hostinger-mcp.mjs');
const HOSTINGER_LAUNCHER_GLOBAL = path.join(
  os.homedir(),
  '.cursor',
  'scripts',
  'jonbeatz-hostinger-mcp.mjs',
);

const PLACEHOLDER_RE =
  /^(REPLACE_WITH_|YOUR_|your-|example_replace|your-wp-)/i;

const HOSTINGER_BIN_BY_SERVER = {
  'hostinger-hosting': 'hostinger-hosting-mcp',
  'hostinger-vps': 'hostinger-vps-mcp',
  'hostinger-domains': 'hostinger-domains-mcp',
  'hostinger-dns': 'hostinger-dns-mcp',
};

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`.env.local not found: ${filePath} — run npm run env:setup`);
  }
  const env = {};
  for (const line of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

function maskSecret(value, prefixLen = 4) {
  if (!value || value.length <= prefixLen + 4) return '****';
  return `${value.slice(0, prefixLen)}…${value.slice(-4)}`;
}

function isPlaceholder(value) {
  if (!value) return true;
  return PLACEHOLDER_RE.test(value);
}

function backupOnce(filePath) {
  const bak = `${filePath}.sync-bak`;
  if (!fs.existsSync(bak) && fs.existsSync(filePath)) {
    fs.copyFileSync(filePath, bak);
    console.log(`[JonBeatz:MCP] Backup: ${bak}`);
  }
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`MCP config not found: ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function setNestedEnv(config, serverName, envUpdates) {
  const server = config.mcpServers?.[serverName];
  if (!server) return false;
  server.env = server.env || {};
  let changed = false;
  for (const [key, value] of Object.entries(envUpdates)) {
    if (value === undefined || value === '') continue;
    if (server.env[key] !== value) {
      server.env[key] = value;
      changed = true;
    }
  }
  return changed;
}

function installHostingerLauncher() {
  if (!fs.existsSync(HOSTINGER_LAUNCHER_SOURCE)) {
    throw new Error(`Hostinger launcher missing: ${HOSTINGER_LAUNCHER_SOURCE}`);
  }
  fs.mkdirSync(path.dirname(HOSTINGER_LAUNCHER_GLOBAL), { recursive: true });
  fs.copyFileSync(HOSTINGER_LAUNCHER_SOURCE, HOSTINGER_LAUNCHER_GLOBAL);
  return HOSTINGER_LAUNCHER_GLOBAL.replace(/\\/g, '/');
}

function normalizeHostingerServers(config) {
  const servers = config.mcpServers || {};
  let changed = false;
  const launcherPath = installHostingerLauncher();

  for (const [serverName, binName] of Object.entries(HOSTINGER_BIN_BY_SERVER)) {
    const server = servers[serverName];
    if (!server) continue;

    const expectedArgs = [launcherPath, binName];
    const currentArgs = server.args || [];
    const argsMatch =
      server.command === 'node' &&
      currentArgs.length === expectedArgs.length &&
      currentArgs.every((value, index) => value === expectedArgs[index]);

    if (!argsMatch) {
      server.command = 'node';
      server.args = expectedArgs;
      changed = true;
    }
  }

  return changed;
}

function syncProjectMcp(env) {
  backupOnce(PROJECT_MCP);
  const projectConfig = readJson(PROJECT_MCP);
  let projectChanged = false;

  const magicKey = env['21ST_DEV_MAGIC_API_KEY'];
  if (magicKey && projectConfig.mcpServers?.['21st-dev-magic']) {
    const changed = setNestedEnv(projectConfig, '21st-dev-magic', { API_KEY: magicKey });
    if (isPlaceholder(magicKey)) {
      console.warn('[JonBeatz:MCP] WARN: 21ST_DEV_MAGIC_API_KEY looks like a placeholder');
    }
    if (changed) projectChanged = true;
    console.log(
      `[JonBeatz:MCP] ${changed ? 'PASS' : 'OK'}: 21st-dev-magic → project (${maskSecret(magicKey)})`,
    );
  } else if (projectConfig.mcpServers?.['21st-dev-magic']) {
    console.log('[JonBeatz:MCP] SKIP: No 21ST_DEV_MAGIC_API_KEY in .env.local');
  }

  const browserbaseUpdates = {
    BROWSERBASE_API_KEY: env.BROWSERBASE_API_KEY,
    BROWSERBASE_PROJECT_ID: env.BROWSERBASE_PROJECT_ID,
  };
  if (
    Object.values(browserbaseUpdates).some(Boolean) &&
    projectConfig.mcpServers?.browserbase
  ) {
    const changed = setNestedEnv(projectConfig, 'browserbase', browserbaseUpdates);
    if (changed) projectChanged = true;
    console.log(`[JonBeatz:MCP] ${changed ? 'PASS' : 'OK'}: browserbase → project`);
  } else if (projectConfig.mcpServers?.browserbase) {
    console.log('[JonBeatz:MCP] SKIP: No BROWSERBASE_* keys in .env.local');
  }

  const composioKey = env.COMPOSIO_API_KEY;
  if (composioKey && projectConfig.mcpServers?.composio) {
    const server = projectConfig.mcpServers.composio;
    let changed = false;
    if (server.url) {
      delete server.url;
      delete server.headers;
      changed = true;
    }
    const envChanged = setNestedEnv(projectConfig, 'composio', {
      COMPOSIO_API_KEY: composioKey,
    });
    if (envChanged) changed = true;
    if (changed) projectChanged = true;
    console.log(
      `[JonBeatz:MCP] ${changed ? 'PASS' : 'OK'}: composio → project (${maskSecret(composioKey)})`,
    );
  } else if (projectConfig.mcpServers?.composio) {
    console.log('[JonBeatz:MCP] SKIP: composio present — no COMPOSIO_API_KEY in .env.local');
  }

  for (const name of ['markdownify', 'pencil']) {
    if (projectConfig.mcpServers?.[name]) {
      console.log(`[JonBeatz:MCP] OK: ${name} — no secrets (enable in Cursor Settings → MCP)`);
    }
  }

  if (projectChanged) {
    writeJson(PROJECT_MCP, projectConfig);
  }
}

function syncGlobalMcp(env) {
  const globalDir = path.dirname(GLOBAL_MCP);
  if (!fs.existsSync(globalDir)) {
    fs.mkdirSync(globalDir, { recursive: true });
    console.log(`[JonBeatz:MCP] Created global Cursor directory: ${globalDir}`);
  }

  if (!fs.existsSync(GLOBAL_MCP)) {
    writeJson(GLOBAL_MCP, { mcpServers: {} });
    console.log(`[JonBeatz:MCP] Initialized empty global mcp.json at ${GLOBAL_MCP}`);
  }

  backupOnce(GLOBAL_MCP);
  const globalConfig = readJson(GLOBAL_MCP);
  let globalChanged = false;

  globalConfig.mcpServers = globalConfig.mcpServers || {};

  const githubToken = env.GITHUB_PERSONAL_ACCESS_TOKEN;
  if (githubToken) {
    if (!globalConfig.mcpServers.github) {
      globalConfig.mcpServers.github = {
        command: "npx",
        args: ["-y", "@modelcontextprotocol/server-github"],
        env: {}
      };
      globalChanged = true;
      console.log("[JonBeatz:MCP] Auto-created global 'github' server block.");
    }
    const changed = setNestedEnv(globalConfig, 'github', {
      GITHUB_PERSONAL_ACCESS_TOKEN: githubToken,
    });
    if (changed) globalChanged = true;
    console.log(
      `[JonBeatz:MCP] ${changed ? 'PASS' : 'OK'}: github → global (${maskSecret(githubToken, 4)})`,
    );
  }

  const tavilyKey = env.TAVILY_API_KEY;
  if (tavilyKey) {
    if (!globalConfig.mcpServers.tavily) {
      globalConfig.mcpServers.tavily = {
        command: "npx",
        args: ["-y", "@modelcontextprotocol/server-tavily"],
        env: {}
      };
      globalChanged = true;
      console.log("[JonBeatz:MCP] Auto-created global 'tavily' server block.");
    }
    const changed = setNestedEnv(globalConfig, 'tavily', {
      TAVILY_API_KEY: tavilyKey,
    });
    if (changed) globalChanged = true;
    console.log(
      `[JonBeatz:MCP] ${changed ? 'PASS' : 'OK'}: tavily → global (${maskSecret(tavilyKey, 8)})`,
    );
  }

  const hostingerToken = env.HOSTINGER_API_TOKEN;
  if (hostingerToken) {
    let createdAny = false;
    for (const serverName of Object.keys(HOSTINGER_BIN_BY_SERVER)) {
      if (!globalConfig.mcpServers[serverName]) {
        globalConfig.mcpServers[serverName] = {
          command: "node",
          args: [],
          env: {}
        };
        globalChanged = true;
        createdAny = true;
      }
    }
    if (createdAny) {
      console.log("[JonBeatz:MCP] Auto-created global 'hostinger-*' server blocks.");
    }

    if (isPlaceholder(hostingerToken)) {
      console.warn('[JonBeatz:MCP] WARN: HOSTINGER_API_TOKEN looks like a placeholder');
    }

    const hostingerServers = Object.keys(globalConfig.mcpServers).filter((name) =>
      name.startsWith('hostinger-'),
    );
    for (const serverName of hostingerServers) {
      const changed = setNestedEnv(globalConfig, serverName, {
        HOSTINGER_API_TOKEN: hostingerToken,
      });
      if (changed) globalChanged = true;
    }
    console.log(
      `[JonBeatz:MCP] ${globalChanged ? 'PASS' : 'OK'}: hostinger token → global (${hostingerServers.length} server(s), ${maskSecret(hostingerToken)})`,
    );
  } else {
    const hostingerServers = Object.keys(globalConfig.mcpServers).filter((name) =>
      name.startsWith('hostinger-'),
    );
    if (hostingerServers.length > 0) {
      console.log('[JonBeatz:MCP] SKIP: hostinger-* present but no HOSTINGER_API_TOKEN in .env.local');
    }
  }

  const hostingerArgsChanged = normalizeHostingerServers(globalConfig);
  if (hostingerArgsChanged) {
    globalChanged = true;
    console.log('[JonBeatz:MCP] PASS: hostinger-* → scoped launcher (jonbeatz-hostinger-mcp.mjs)');
  }

  const falKey = env.FAL_API_KEY || env.FAL_KEY;
  if (falKey) {
    if (!globalConfig.mcpServers['fal-ai']) {
      globalConfig.mcpServers['fal-ai'] = {
        url: 'https://mcp.fal.ai/mcp',
        headers: {},
      };
      globalChanged = true;
      console.log("[JonBeatz:MCP] Auto-created global 'fal-ai' MCP server block.");
    }
    const server = globalConfig.mcpServers['fal-ai'];
    server.url = server.url || 'https://mcp.fal.ai/mcp';
    server.headers = server.headers || {};
    const authHeader = `Bearer ${falKey}`;
    if (server.headers.Authorization !== authHeader) {
      server.headers.Authorization = authHeader;
      globalChanged = true;
    }
    if (isPlaceholder(falKey)) {
      console.warn('[JonBeatz:MCP] WARN: FAL_API_KEY looks like a placeholder');
    }
    console.log(
      `[JonBeatz:MCP] ${globalChanged ? 'PASS' : 'OK'}: fal-ai → global (${maskSecret(falKey)})`,
    );
  } else if (globalConfig.mcpServers['fal-ai']) {
    console.log('[JonBeatz:MCP] SKIP: fal-ai present but no FAL_API_KEY in .env.local');
  }

  if (globalChanged) {
    writeJson(GLOBAL_MCP, globalConfig);
  }
}

function main() {
  const env = parseEnvFile(ENV_LOCAL);
  syncProjectMcp(env);
  syncGlobalMcp(env);
  console.log('[JonBeatz:MCP] Next: Cursor Settings → MCP → refresh servers.');
}

try {
  main();
} catch (err) {
  console.error(`[JonBeatz:MCP] FAIL: ${err.message}`);
  process.exit(1);
}
