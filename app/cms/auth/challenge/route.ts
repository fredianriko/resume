import { NextResponse } from "next/server";
import { issueNonce } from "../../_lib/auth";

// Hand out a one-time nonce for the challenge/response login. Marked dynamic so
// it is never cached — each login must get a fresh nonce.
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ nonce: issueNonce() });
}
