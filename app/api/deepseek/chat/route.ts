import { NextRequest, NextResponse } from "next/server";

const LITELLM_URL = "http://127.0.0.1:4000/v1/chat/completions";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { ok: false, error: "messages array is required" },
        { status: 400 },
      );
    }

    const masterKey = process.env.MSC_LITELLM_MASTER_KEY;
    if (!masterKey) {
      return NextResponse.json(
        { ok: false, error: "LiteLLM master key not configured" },
        { status: 500 },
      );
    }

    const res = await fetch(LITELLM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${masterKey}`,
      },
      body: JSON.stringify({
        model: body.model || "deepseek-v4-pro",
        messages: body.messages,
        max_tokens: body.max_tokens ?? 4096,
        stream: false,
      }),
      signal: AbortSignal.timeout(120000),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: data.error?.message || `LiteLLM HTTP ${res.status}` },
        { status: res.status },
      );
    }

    return NextResponse.json({ ok: true, ...data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 },
    );
  }
}
