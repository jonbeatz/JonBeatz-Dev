import { NextResponse } from "next/server";
import { execSync } from "child_process";

export async function GET() {
  try {
    const output = execSync(
      'powershell -NoProfile -ExecutionPolicy Bypass -File scripts/telegram-sessions.ps1 -Limit 10',
      {
        encoding: "utf8",
        timeout: 15000,
        cwd: process.cwd(),
      },
    );

    return NextResponse.json({ ok: true, output: output.trim() });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 },
    );
  }
}
