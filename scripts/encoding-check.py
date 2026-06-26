#!/usr/bin/env python3
"""Scan repo markdown for UTF-8 mojibake corruption."""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent / "lib"))
from utf8_file import scan_repo  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent

if __name__ == "__main__":
    issues = scan_repo(ROOT)
    if not issues:
        print("[encoding:check] OK — no mojibake in markdown/mdc files")
        raise SystemExit(0)
    print("[encoding:check] FAIL — corrupted UTF-8 sequences found:")
    for rel, reason in issues:
        print(f"  {rel} ({reason})")
    print("[encoding:check] Fix with UTF-8 editor or restore from git; use Python for file writes.")
    raise SystemExit(1)
