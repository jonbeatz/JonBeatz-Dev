#!/usr/bin/env python3
"""Sync version strings and README badges from package.json (UTF-8 safe)."""

from __future__ import annotations

import json
import re
import sys
from datetime import date
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent / "lib"))
from utf8_file import read_utf8, write_utf8  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
REPO = "jonbeatz/JonBeatz-Dev"
REPO_URL = f"https://github.com/{REPO}"
RELEASES_URL = f"{REPO_URL}/releases"


def main() -> int:
    pkg = json.loads(read_utf8(ROOT / "package.json"))
    version = pkg["version"]
    vtag = f"v{version}"
    today = date.today().isoformat()

    truth_path = ROOT / "TRUTH.md"
    if truth_path.exists():
        truth = read_utf8(truth_path)
        truth = re.sub(r"\*\*Version:\*\*\s*[\d.]+", f"**Version:** {version}", truth)
        write_utf8(truth_path, truth.rstrip() + "\n")

    master_path = ROOT / ".cursor" / "docs" / "MASTER-COMMANDS.md"
    if master_path.exists():
        master = read_utf8(master_path)
        master = re.sub(
            r"\*\*Last updated:\*\*[^\n]*",
            f"**Last updated:** {today} · **Version:** {version}",
            master,
        )
        write_utf8(master_path, master.rstrip() + "\n")

    readme_path = ROOT / "README.md"
    if readme_path.exists():
        lines = read_utf8(readme_path).splitlines()
        out: list[str] = []
        for line in lines:
            if "img.shields.io/badge/version-" in line:
                out.append(
                    f"[![Version](https://img.shields.io/badge/version-{version}-blue)]({RELEASES_URL})"
                )
            elif "img.shields.io/github/v/release/" in line:
                out.append(
                    f"[![Release](https://img.shields.io/github/v/release/{REPO}?label=release&sort=semver)]({RELEASES_URL})"
                )
            elif "img.shields.io/badge/GitHub-" in line:
                out.append(
                    f"[![Repo](https://img.shields.io/badge/GitHub-jonbeatz%2FJonBeatz--Dev-181717?logo=github)]({REPO_URL})"
                )
            elif "img.shields.io/badge/Platform-" in line:
                out.append(
                    f"[![Platform](https://img.shields.io/badge/Platform-Windows_10%2F11-0078D6?logo=windows)]({REPO_URL})"
                )
            elif line.strip().startswith("| **Version** |"):
                out.append(
                    f"| **Version** | `{vtag}` · [Latest release]({RELEASES_URL}/tag/{vtag}) |"
                )
            else:
                out.append(line)
        write_utf8(readme_path, "\n".join(out) + "\n")

    print(f"Version sync complete: {vtag}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
