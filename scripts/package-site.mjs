#!/usr/bin/env node
/**
 * One-command packaging for the jonbeatz.dev static deploy.
 *
 * Runs the static export (build-static-site.mjs, red variant by default) then
 * zips ./out into a timestamped archive ready for Hostinger's static deploy.
 * Prints the archive path so the agent can hand it straight to the Hostinger
 * MCP (hosting_deployStaticWebsite).
 *
 *   npm run site:package          # build + zip jonbeatz.dev
 *
 * The archive path is also written to .deploy/last-archive.txt for tooling.
 *
 * NOTE: After deploying, the Hostinger CDN edge cache MUST be flushed
 * (hPanel -> jonbeatz.dev -> Performance -> CDN -> Flush cache) or the old
 * page keeps serving. See .cursor/docs/JONBEATZ-DEV-DEPLOY.md.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "out");
const DEPLOY_DIR = path.join(ROOT, ".deploy");

// This standalone project only ships jonbeatz.dev (the red command-center site).
const TARGET_DOMAIN = "jonbeatz.dev";
const ARCHIVE_PREFIX = "jonbeatz-dev-site";
const LAST_ARCHIVE_FILE = "last-archive.txt";

function stamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}_${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}

function main() {
  console.log("[package] Building static export...\n");
  execSync("node scripts/build-static-site.mjs", {
    cwd: ROOT,
    stdio: "inherit",
    env: { ...process.env },
  });

  if (!fs.existsSync(path.join(OUT_DIR, "index.html"))) {
    console.error("[package] FAIL: out/index.html missing — build did not produce a static site.");
    process.exit(1);
  }

  fs.mkdirSync(DEPLOY_DIR, { recursive: true });
  const archive = path.join(DEPLOY_DIR, `${ARCHIVE_PREFIX}_${stamp()}.zip`);
  if (fs.existsSync(archive)) fs.rmSync(archive);

  // Zip the CONTENTS of out/ (not the folder itself) so files land at web root.
  const ps = `Compress-Archive -Path '${path.join(OUT_DIR, "*")}' -DestinationPath '${archive}' -Force`;
  console.log("\n[package] Zipping out/ ...");
  execSync(`powershell -NoProfile -ExecutionPolicy Bypass -Command "${ps}"`, {
    cwd: ROOT,
    stdio: "inherit",
  });

  fs.writeFileSync(path.join(DEPLOY_DIR, LAST_ARCHIVE_FILE), archive, "utf8");

  const sizeKb = (fs.statSync(archive).size / 1024).toFixed(1);
  console.log(`\n[package] Target -> ${TARGET_DOMAIN} (red dev variant)`);
  console.log(`[package] Archive ready (${sizeKb} KB):`);
  console.log(`  ${archive}`);
  console.log("\n[package] Next steps:");
  console.log("  1. Agent: Hostinger MCP hosting_deployStaticWebsite");
  console.log(`     { domain: '${TARGET_DOMAIN}', archivePath: '<path above>' }`);
  console.log(`  2. FLUSH CDN: hPanel -> ${TARGET_DOMAIN} -> Performance -> CDN -> Flush cache`);
  console.log(`  3. Verify: https://${TARGET_DOMAIN} (hard refresh / private window)`);
}

main();
