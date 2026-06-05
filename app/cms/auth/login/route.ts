import { NextResponse } from "next/server";
import { SESSION_COOKIE, sessionToken, verifyProof } from "../../_lib/auth";

export async function POST(req: Request) {
  const { nonce, proof } = await req.json();

  if (!verifyProof(nonce, proof)) {
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}
