#!/usr/bin/env node
/**
 * Minimal Hostinger SSH command runner for JONBEATZ.DEV (password auth via ssh2).
 *
 * Credentials are read from .env.local (NOT passed on the command line) so the
 * account password never appears in shell history/terminal logs. The Hostinger
 * SSH login (host/port/user/password) is ACCOUNT-WIDE — one login reaches every
 * site on the account; only the folder path differs (jonbeatz.dev lives under its
 * own domains/<domain>/public_html).
 *
 * Resolution order for the creds file:
 *   1. HOSTINGER_SSH_ENV (explicit override)
 *   2. this project's own .env.local (self-contained)
 *
 * Usage:
 *   npm run site:ssh -- "ls -la domains/jonbeatz.dev/public_html"
 *   node scripts/hostinger-ssh.mjs "du -sh domains/jonbeatz.dev/public_html"
 */
import { Client } from "ssh2";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PROJECT_ENV = path.join(REPO_ROOT, ".env.local");

function resolveCredFile() {
  if (process.env.HOSTINGER_SSH_ENV) return process.env.HOSTINGER_SSH_ENV;
  return PROJECT_ENV;
}

const CRED_FILE = resolveCredFile();

function parseEnv(file) {
  const out = {};
  if (!fs.existsSync(file)) return out;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    out[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return out;
}

const cmd = process.argv.slice(2).join(" ");
if (!cmd) {
  console.error("usage: npm run site:ssh -- <remote command>");
  process.exit(2);
}

const e = parseEnv(CRED_FILE);
const host = e.HOSTINGER_SSH_HOST;
const port = Number(e.HOSTINGER_SSH_PORT || 22);
const username = e.HOSTINGER_SSH_USER;
const password = e.HOSTINGER_SSH_PASSWORD;

if (!host || !username || !password) {
  console.error(`[ssh] Missing HOSTINGER_SSH_* in ${CRED_FILE}`);
  console.error("[ssh] Set HOSTINGER_SSH_HOST / _USER / _PASSWORD (see .env.local.example).");
  process.exit(2);
}

const conn = new Client();
conn
  .on("ready", () => {
    conn.exec(cmd, (err, stream) => {
      if (err) {
        console.error("[ssh] exec error:", err.message);
        conn.end();
        process.exit(1);
      }
      stream
        .on("close", (code) => {
          conn.end();
          process.exit(code || 0);
        })
        .on("data", (d) => process.stdout.write(d))
        .stderr.on("data", (d) => process.stderr.write(d));
    });
  })
  .on("error", (err) => {
    console.error("[ssh] connection error:", err.message);
    process.exit(1);
  })
  .connect({ host, port, username, password, readyTimeout: 20000 });
