#!/usr/bin/env python3
"""UTF-8 safe file helpers for JonBeatz scripts (Windows PowerShell mojibake guard)."""

from __future__ import annotations

from pathlib import Path

# Common UTF-8 misread as Latin-1 / Windows-1252 signatures
MOJIBAKE_MARKERS = (
    "Ã",
    "â€",
    "Â·",
    "â†'",
    "â€™",
    "â€œ",
    "â€",
    "ΓÇ",
    "┬╖",
    "≡ƒ",
)


def read_utf8(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def write_utf8(path: Path, content: str) -> None:
    path.write_text(content, encoding="utf-8", newline="\n")


def has_mojibake(text: str) -> bool:
    return any(marker in text for marker in MOJIBAKE_MARKERS)


def scan_repo(root: Path, globs: tuple[str, ...] = ("**/*.md", "**/*.mdc")) -> list[tuple[str, str]]:
    hits: list[tuple[str, str]] = []
    for pattern in globs:
        for path in root.glob(pattern):
            if not path.is_file():
                continue
            rel = str(path.relative_to(root)).replace("\\", "/")
            if rel.startswith("node_modules/") or "/node_modules/" in rel:
                continue
            try:
                text = read_utf8(path)
            except UnicodeDecodeError:
                hits.append((rel, "invalid UTF-8 bytes"))
                continue
            if has_mojibake(text):
                hits.append((rel, "mojibake detected"))
    return sorted(hits)


if __name__ == "__main__":
    import sys

    repo = Path(__file__).resolve().parent.parent
    issues = scan_repo(repo)
    if not issues:
        print("OK: no mojibake detected")
        sys.exit(0)
    for rel, reason in issues:
        print(f"{reason}: {rel}")
    sys.exit(1)
