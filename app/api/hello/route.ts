import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "Welcome to Wifi Combat Application" },
    { status: 200, statusText: "OK" }
  );
}
