#!/usr/bin/env node
/**
 * Build the JonBeatz Command Center as a STATIC public site (out/) for jon-beatz.com.
 *
 * The app's API routes (system status, deepseek chat, telegram sessions) are
 * local-workstation-only and a POST handler is incompatible with Next static
 * export. So this script temporarily moves app/api aside, builds with
 * JB_STATIC=1 (output: 'export', frozen "all online" status, inert doc links),
 * then restores app/api — leaving the live local dev experience untouched.
 *
 * Usage:
 *   npm run site:build:static     # produces ./out
 *   npm run site:preview          # serve ./out at http://localhost:5055
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const API_DIR = path.join(ROOT, "app", "api");
const STASH_DIR = path.join(ROOT, "app", "_api_stash");
const OUT_DIR = path.join(ROOT, "out");
const NEXT_DIR = path.join(ROOT, ".next");

function rmrf(target) {
  if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true });
}

function stashApi() {
  if (!fs.existsSync(API_DIR)) return;
  rmrf(STASH_DIR);
  fs.cpSync(API_DIR, STASH_DIR, { recursive: true });
  rmrf(API_DIR);
  console.log("[static] Stashed app/api for export build.");
}

function restoreApi() {
  if (!fs.existsSync(STASH_DIR)) return;
  rmrf(API_DIR);
  fs.cpSync(STASH_DIR, API_DIR, { recursive: true });
  rmrf(STASH_DIR);
}

function main() {
  // Recover from any prior aborted run before starting.
  restoreApi();

  rmrf(OUT_DIR);
  rmrf(NEXT_DIR); // avoid export/non-export mode cache conflicts

  if (fs.existsSync(API_DIR)) {
    stashApi();
  }

  try {
    const variant = process.env.JB_VARIANT || (process.argv.includes("--dev") ? "dev" : "");
    const env = { ...process.env, JB_STATIC: "1", NEXT_PUBLIC_JB_STATIC: "1" };
    if (variant) {
      env.NEXT_PUBLIC_JB_VARIANT = variant;
      console.log(`[static] Variant: ${variant} (footer adjusted for public domain)`);
    }
    console.log("[static] Running: next build (JB_STATIC=1)\n");
    execSync("npx next build", { cwd: ROOT, stdio: "inherit", env });
    console.log(`\n[static] Build complete -> ${OUT_DIR}`);
    console.log("[static] Preview with: npm run site:preview");
  } finally {
    restoreApi();
    console.log("[static] Restored app/api (local dev dashboard unaffected).");
  }
}

main();
