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
  const running = await probePort(8188);
  return NextResponse.json({ ok: true, running });
}
