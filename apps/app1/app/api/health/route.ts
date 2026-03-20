import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    app: "app1",
    message: "Hello from app1 API",
    timestamp: new Date().toISOString(),
  });
}
