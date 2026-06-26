import { NextResponse } from "next/server";
import { Socket } from "net";

function probePort(port: number, host = "127.0.0.1", timeout = 1500): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new Socket();
    socket.setTimeout(timeout);
    socket.on("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.on("error", () => {
      socket.destroy();
      resolve(false);
    });
    socket.on("timeout", () => {
      socket.destroy();
      resolve(false);
    });
    socket.connect(port, host);
  });
}

export async function GET() {
  const [litellm, lmstudio, comfyui, ngrok] = await Promise.all([
    probePort(4000),
    probePort(1234),
    probePort(8188),
    probePort(4040),
  ]);

  return NextResponse.json({
    ok: true,
    status: {
      litellm,
      lmstudio,
      comfyui,
      ngrok,
    },
  });
}
