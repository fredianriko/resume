import { NextResponse } from "next/server";
import { isAuthed } from "../../_lib/auth";

export async function GET() {
  return NextResponse.json({ authenticated: await isAuthed() });
}
