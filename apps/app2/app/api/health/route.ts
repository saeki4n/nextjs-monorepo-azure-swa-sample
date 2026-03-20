import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    app: "app2",
    message: "Hello from app2 API",
    timestamp: new Date().toISOString(),
  });
}
