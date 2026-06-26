#!/usr/bin/env node
//
// JonBeatz.dev project backup — sequential versioned mirror to the backup drive.
// Folder naming: jonbeatz-dev-project-v{N}-{letter} (v1-a, v1-b, ... v1-z, v2-a).
// Trimmed standalone-site workflow (no Hermes/personal snapshot). Backup tree is
// SEPARATE from the personal JonBeatz profile (guarded below).
//
// Usage:
//   node scripts/jonbeatz-dev-backup.mjs [name] [--standard|--full] [--yes] [--dry-run] [--note "..."]
// npm:
//   backup / backup:project   -> interactive standard
//   backup:standard           -> standard (skips heavy/regenerable dirs)
//   backup:full               -> full mirror (everything)
//   backup:quick              -> standard + --yes
//   backup:quick:full         -> full + --yes

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

const DEFAULT_BACKUP_ROOT = "G:\\Hermes_Project_BackUpz\\JonBeatz.dev";
const BACKUP_FOLDER_BASE = "jonbeatz-dev-project";
const BACKUP_FOLDER_PATTERN = /^jonbeatz-dev-project-v(\d+)-([a-z])$/i;
const DEFAULT_START_VERSION = 1;
// Heavy / rebuildable / regenerable — skipped in STANDARD backups.
const STANDARD_DIRS = ["node_modules", ".next", "out", "logs", ".deploy"];
// Nested dirs (full paths) skipped in STANDARD backups.
const STANDARD_NESTED_DIRS = [path.join(".cursor", "design-references")];
const NOTES_REL_PATH = path.join(".cursor", "BackUp-Notez.md");
const NOTES_FOOTER = "\n*Backup created — JonBeatz.dev standalone site project.*\n";

// ---- .env.local hydration (KI_BACKUP_ROOT) ----------------------------------
function loadEnvFile(filePath, override = true) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    value = value.replace(/%([^%]+)%/g, (_, name) => process.env[name] ?? `%${name}%`);
    if (override || process.env[key] === undefined) process.env[key] = value;
  }
}
loadEnvFile(path.join(REPO_ROOT, ".env.local"), true);
loadEnvFile(path.join(REPO_ROOT, ".env.local.example"), false);

// ---- args -------------------------------------------------------------------
const rawArgs = process.argv.slice(2);
const noteFlagIndex = rawArgs.findIndex((a) => a === "--note" || a === "-n");
const userNoteFromCli = noteFlagIndex !== -1 ? (rawArgs[noteFlagIndex + 1] || "").trim() : "";
const args = noteFlagIndex === -1 ? rawArgs : rawArgs.filter((_, i) => i !== noteFlagIndex && i !== noteFlagIndex + 1);

const isFullBackup = args.includes("--full") || args.includes("-f");
const isStandardBackup = args.includes("--standard") || args.includes("-s");
const skipConfirm = args.includes("--yes") || args.includes("-y");
const isDryRun = args.includes("--dry-run");
const customName = args.find((a) => !a.startsWith("-")) || null;

// ---- helpers ----------------------------------------------------------------
function getProjectVersion() {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, "package.json"), "utf8"));
    if (pkg.version) return pkg.version;
  } catch {
    /* fallback */
  }
  return "unknown";
}

const formatBackupFolderName = (version, letter) => `${BACKUP_FOLDER_BASE}-v${version}-${letter}`;

function parseBackupFolder(name) {
  const m = name.match(BACKUP_FOLDER_PATTERN);
  return m ? { version: Number(m[1]), letter: m[2].toLowerCase() } : null;
}

function compareBackupFolders(a, b) {
  const pa = parseBackupFolder(a);
  const pb = parseBackupFolder(b);
  if (!pa || !pb) return a.localeCompare(b, undefined, { sensitivity: "base" });
  if (pa.version !== pb.version) return pa.version - pb.version;
  return pa.letter.localeCompare(pb.letter);
}

function listSequentialBackupFolders(backupRoot) {
  if (!fs.existsSync(backupRoot)) return [];
  return fs
    .readdirSync(backupRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory() && BACKUP_FOLDER_PATTERN.test(d.name))
    .map((d) => d.name)
    .sort(compareBackupFolders);
}

function suggestNextBackupFolder(backupRoot) {
  const existing = listSequentialBackupFolders(backupRoot);
  if (existing.length === 0) return formatBackupFolderName(DEFAULT_START_VERSION, "a");
  const { version, letter } = parseBackupFolder(existing[existing.length - 1]);
  if (letter < "z") return formatBackupFolderName(version, String.fromCharCode(letter.charCodeAt(0) + 1));
  return formatBackupFolderName(version + 1, "a");
}

const displayBackupType = (t) => (t === "FULL" ? "Full" : "Standard");
const escapeTableCell = (text) => String(text).replace(/\|/g, "\\|").replace(/\r?\n/g, " ").trim();

function getGitInfo(repoRoot) {
  try {
    const run = (c) => execSync(c, { cwd: repoRoot, encoding: "utf8" }).trim();
    return {
      branch: run("git branch --show-current"),
      commit: run("git rev-parse --short HEAD"),
      message: run("git log -1 --pretty=%B").split("\n")[0],
    };
  } catch (error) {
    console.warn("[Backup] Git info unavailable:", error.message);
    return { branch: "unknown", commit: "unknown", message: "unknown" };
  }
}

function verifyBackupContents(backupPath, backupType) {
  const errors = [];
  const warnings = [];
  const checks = [
    { path: "package.json", type: "file", required: true },
    { path: "TRUTH.md", type: "file", required: true },
    { path: "AGENTS.md", type: "file", required: true },
    { path: ".env.local", type: "file", required: false, label: ".env.local (secrets)" },
    { path: "app", type: "dir", required: true },
    { path: "components", type: "dir", required: true },
    { path: "scripts", type: "dir", required: true },
    { path: ".cursor", type: "dir", required: true },
  ];
  if (backupType === "FULL") checks.push({ path: "node_modules", type: "dir", required: true });

  for (const check of checks) {
    const targetPath = path.join(backupPath, check.path);
    if (!fs.existsSync(targetPath)) {
      (check.required ? errors : warnings).push(`Missing ${check.required ? "required" : "optional"} ${check.type}: ${check.label || check.path}`);
    } else {
      const stat = fs.statSync(targetPath);
      if (check.type === "file" && !stat.isFile()) errors.push(`Expected file, found directory: ${check.path}`);
      else if (check.type === "dir" && !stat.isDirectory()) errors.push(`Expected directory, found file: ${check.path}`);
    }
  }
  return { success: errors.length === 0, errors, warnings, checkedItemsCount: checks.length };
}

function formatExcluded(backupType) {
  if (backupType === "FULL") return "None (full backup)";
  return [...STANDARD_DIRS.map((d) => `${d}/`), ...STANDARD_NESTED_DIRS.map((d) => `${d.replace(/\\/g, "/")}/`)].join(", ");
}

function buildNoteEntry({ timestamp, backupType, userNotes, gitInfo, backupFolder, projectVersion, verification }) {
  const typeLabel = displayBackupType(backupType);
  let entry = `## [${timestamp}] - ${typeLabel} Backup\n\n`;
  entry += userNotes?.trim() ? `**My Notes:** ${userNotes.trim()}\n\n---\n\n` : `---\n\n`;
  entry += `| Field | Value |\n|-------|-------|\n`;
  entry += `| **Folder** | ${escapeTableCell(backupFolder)} |\n`;
  entry += `| **Version** | ${escapeTableCell(projectVersion)} |\n`;
  entry += `| **Branch** | ${escapeTableCell(gitInfo.branch)} |\n`;
  entry += `| **Commit** | ${escapeTableCell(gitInfo.commit)} |\n`;
  entry += `| **Message** | ${escapeTableCell(gitInfo.message)} |\n`;
  entry += `| **Type** | ${typeLabel} |\n`;
  entry += `| **Excluded** | ${escapeTableCell(formatExcluded(backupType))} |\n`;
  entry += `| **Included (secrets)** | ${escapeTableCell(".env.local")} |\n`;
  if (verification) {
    const v = verification.success
      ? `Verified (${verification.checkedItemsCount}/${verification.checkedItemsCount} items intact)`
      : `Failed (${verification.errors.length} errors, see terminal)`;
    entry += `| **Verification** | ${escapeTableCell(v)} |\n`;
  }
  entry += `\n---\n\n`;
  return entry;
}

function readExistingNotesBody(backupPath) {
  const notesPath = path.join(backupPath, NOTES_REL_PATH);
  if (!fs.existsSync(notesPath)) return "";
  let content = fs.readFileSync(notesPath, "utf8");
  const footerIdx = content.indexOf("\n*Backup created — JonBeatz.dev");
  if (footerIdx !== -1) content = content.slice(0, footerIdx);
  const trimmed = content.trimEnd();
  return trimmed ? `${trimmed}\n\n` : "";
}

function prependBackupNote(backupPath, entry, preservedTail = "") {
  const notesPath = path.join(backupPath, NOTES_REL_PATH);
  fs.mkdirSync(path.dirname(notesPath), { recursive: true });
  let tail = preservedTail || (fs.existsSync(notesPath) ? fs.readFileSync(notesPath, "utf8") : "");
  if (!tail.includes("*Backup created — JonBeatz.dev")) tail += NOTES_FOOTER;
  fs.writeFileSync(notesPath, entry + tail, "utf8");
  return notesPath;
}

const askQuestion = (rl, q) => new Promise((resolve) => rl.question(q, resolve));

async function resolveBackupPlan(rl) {
  let backupRoot = process.env.JBD_BACKUP_ROOT?.trim() || "";
  let backupFolder = customName || "";
  const interactive = process.stdin.isTTY;

  console.log(`
+--------------------------------------------------------------+
|  JonBeatz.dev Backup System                                  |
+--------------------------------------------------------------+

Source: ${REPO_ROOT}
`);

  if (interactive && !backupRoot) {
    const answer = await askQuestion(rl, `Backup drive/folder [${DEFAULT_BACKUP_ROOT}]: `);
    backupRoot = answer.trim() || DEFAULT_BACKUP_ROOT;
  } else {
    backupRoot = backupRoot || DEFAULT_BACKUP_ROOT;
    if (process.env.JBD_BACKUP_ROOT) console.log(`Backup root (from JBD_BACKUP_ROOT): ${backupRoot}`);
  }

  // Safety: never back up into the PERSONAL JonBeatz profile tree.
  // Matches ...\JonBeatz (or /JonBeatz) but intentionally allows ...\JonBeatz.dev.
  if (/[\\/]JonBeatz([\\/]|$)/i.test(backupRoot)) {
    console.error(`Refusing to back up into the personal JonBeatz path: ${backupRoot}`);
    process.exit(1);
  }

  const existingSeq = listSequentialBackupFolders(backupRoot);
  if (existingSeq.length > 0) console.log(`Existing backups (${existingSeq.length}): ${existingSeq.join(", ")}`);

  const suggestedFolder = customName || suggestNextBackupFolder(backupRoot);
  if (interactive && !backupFolder) {
    const folderAnswer = await askQuestion(rl, `Backup folder name [${suggestedFolder}]: `);
    backupFolder = folderAnswer.trim() || suggestedFolder;
  } else {
    backupFolder = backupFolder || suggestedFolder;
  }

  const fullBackupPath = path.join(backupRoot, backupFolder);
  const backupType = isFullBackup ? "FULL" : "STANDARD";

  console.log(`
----------------------------------------------------------------
 Source:      ${REPO_ROOT}
 Destination: ${fullBackupPath}
 Type:        ${backupType}
----------------------------------------------------------------
`);

  if (interactive && !skipConfirm) {
    const confirm = await askQuestion(rl, "Proceed with backup? (y/n): ");
    if (confirm.trim().toLowerCase() !== "y") {
      console.log("\nBackup cancelled.");
      return null;
    }
  } else if (!interactive && !skipConfirm) {
    console.log("\nNon-interactive session: add --yes to run, or run from a terminal for prompts.");
    return null;
  }

  let userNotes = userNoteFromCli;
  if (interactive && !userNotes) {
    userNotes = (await askQuestion(rl, "\nAdd a short note about this backup (optional, Enter to skip): ")).trim();
  }

  return { fullBackupPath, backupFolder, backupType, userNotes };
}

function printSuccess(fullBackupPath, backupType, backupFolder, notesPath, verification) {
  console.log(`
----------------------------------------------------------------
Backup complete!
Location: ${fullBackupPath}
Type:     ${backupType}
Notes:    ${notesPath}
`);
  if (verification) {
    if (verification.success) {
      console.log(`[VERIFY] SUCCESS: all ${verification.checkedItemsCount} critical elements present.`);
    } else {
      console.log(`[VERIFY] FAILURE: ${verification.errors.length} missing/corrupted!`);
      for (const err of verification.errors) console.log(`   - ${err}`);
    }
    for (const warn of verification.warnings) console.log(`   Warning: ${warn}`);
  }
  console.log(`Folder: ${backupFolder}`);
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const plan = await resolveBackupPlan(rl);
    if (!plan) return;
    const { fullBackupPath, backupFolder, backupType, userNotes } = plan;

    if (isDryRun) {
      console.log("\n[dry-run] Backup plan (no files copied):");
      console.log(`  Destination: ${fullBackupPath}`);
      console.log(`  Folder:      ${backupFolder}`);
      console.log(`  Type:        ${backupType}`);
      console.log(`  Note:        ${userNotes || "(none)"}`);
      return;
    }

    const driveRoot = path.parse(fullBackupPath).root;
    if (!fs.existsSync(driveRoot)) {
      console.error(`Backup drive ${driveRoot} not found. Plug it in or set KI_BACKUP_ROOT.`);
      process.exit(1);
    }

    fs.mkdirSync(fullBackupPath, { recursive: true });

    let cmd = `robocopy "${REPO_ROOT}" "${fullBackupPath}" /MIR /NFL /NDL /NJH /NP /R:1 /W:1`;
    if (backupType === "STANDARD") {
      const nested = STANDARD_NESTED_DIRS.map((d) => `"${path.join(REPO_ROOT, d)}"`).join(" ");
      cmd += ` /XD ${STANDARD_DIRS.join(" ")} ${nested}`;
      console.log(`Standard skips: ${formatExcluded("STANDARD")}\n`);
      console.log("Keep backup destination private (.env.local is copied).\n");
    } else {
      console.log("Full backup: no directory skips.\n");
    }

    console.log("Creating backup...\n");
    const now = new Date();
    const p2 = (n) => String(n).padStart(2, "0");
    const timestamp = `${now.getFullYear()}-${p2(now.getMonth() + 1)}-${p2(now.getDate())} ${p2(now.getHours())}:${p2(now.getMinutes())}:${p2(now.getSeconds())}`;
    const gitInfo = getGitInfo(REPO_ROOT);
    const projectVersion = getProjectVersion();

    let robocopyOk = false;
    try {
      execSync(cmd, { stdio: "inherit", shell: "powershell.exe" });
      robocopyOk = true;
    } catch (error) {
      if ([0, 1, 2, 3, 4, 5, 6, 7].includes(error.status)) robocopyOk = true;
      else {
        console.error(`\nBackup failed: ${error.message}`);
        process.exit(1);
      }
    }

    if (robocopyOk) {
      const verification = verifyBackupContents(fullBackupPath, backupType);
      const noteEntry = buildNoteEntry({ timestamp, backupType, userNotes, gitInfo, backupFolder, projectVersion, verification });
      const preserved = readExistingNotesBody(fullBackupPath);
      const notesPath = prependBackupNote(fullBackupPath, noteEntry, preserved);
      printSuccess(fullBackupPath, backupType, backupFolder, notesPath, verification);
    }
  } finally {
    rl.close();
  }
}

main();
