#!/usr/bin/env node
/**
 * Hostinger MCP launcher for Cursor (Windows-safe).
 *
 * 1. Runs the scoped hostinger-api-mcp binary (not the default all-tools server).
 * 2. Drops tool names Cursor rejects (must match [a-zA-Z0-9_]+ only).
 *
 * Uses newline-delimited JSON-RPC (MCP SDK >= 1.x), not Content-Length framing.
 */
import { spawn } from 'node:child_process';

const VALID_BINS = new Set([
  'hostinger-api-mcp',
  'hostinger-billing-mcp',
  'hostinger-dns-mcp',
  'hostinger-domains-mcp',
  'hostinger-hosting-mcp',
  'hostinger-reach-mcp',
  'hostinger-vps-mcp',
]);

const BIN = process.argv[2];
const CURSOR_TOOL_NAME = /^[a-zA-Z0-9_]+$/;

if (!BIN || !VALID_BINS.has(BIN)) {
  console.error(
    `Usage: node msc-hostinger-mcp.mjs <${[...VALID_BINS].join('|')}>`,
  );
  process.exit(1);
}

const childArgs =
  process.platform === 'win32'
    ? ['/c', 'npx', '-y', '--package=hostinger-api-mcp', BIN]
    : ['-y', '--package=hostinger-api-mcp', BIN];

const child = spawn(process.platform === 'win32' ? 'cmd' : 'npx', childArgs, {
  stdio: ['pipe', 'pipe', 'inherit'],
  env: process.env,
});

class LineReader {
  constructor() {
    this.buffer = Buffer.alloc(0);
  }

  push(chunk) {
    this.buffer = Buffer.concat([this.buffer, chunk]);
  }

  pull() {
    const index = this.buffer.indexOf(0x0a);
    if (index === -1) return null;

    const line = this.buffer
      .slice(0, index)
      .toString('utf8')
      .replace(/\r$/, '')
      .trim();
    this.buffer = this.buffer.subarray(index + 1);
    if (!line) return this.pull();
    return JSON.parse(line);
  }
}

function serializeMessage(message) {
  return Buffer.from(`${JSON.stringify(message)}\n`, 'utf8');
}

function sanitizeTools(message) {
  const tools = message?.result?.tools;
  if (!Array.isArray(tools)) return message;

  const kept = tools.filter((tool) => {
    const name = tool?.name ?? tool?.id;
    return typeof name === 'string' && CURSOR_TOOL_NAME.test(name);
  });

  if (kept.length === tools.length) return message;

  return {
    ...message,
    result: {
      ...message.result,
      tools: kept,
    },
  };
}

const fromChild = new LineReader();
const fromParent = new LineReader();

child.stdout.on('data', (chunk) => {
  fromChild.push(chunk);
  let message;
  while ((message = fromChild.pull())) {
    process.stdout.write(serializeMessage(sanitizeTools(message)));
  }
});

process.stdin.on('data', (chunk) => {
  fromParent.push(chunk);
  let message;
  while ((message = fromParent.pull())) {
    child.stdin.write(serializeMessage(message));
  }
});

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 0);
});

process.on('SIGINT', () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));
