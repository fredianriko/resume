import crypto from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Credentials come from environment variables (set them in .env.local, which is
// gitignored). Defaults are provided only so the CMS works out of the box on a
// fresh clone — change them before relying on this.
export function adminUser() {
  return process.env.CMS_USERNAME || "admin";
}
export function adminPass() {
  return process.env.CMS_PASSWORD || "admin";
}

export const SESSION_COOKIE = "cms_session";

// The cookie stores a hash of the credentials (plus an optional secret), never
// the raw password. A request is authenticated when its cookie matches the hash
// recomputed from the current env credentials.
export function sessionToken() {
  const secret = process.env.CMS_SECRET || "local-cms";
  return crypto
    .createHash("sha256")
    .update(`${adminUser()}:${adminPass()}:${secret}`)
    .digest("hex");
}

export function credentialsMatch(username: string, password: string) {
  return username === adminUser() && password === adminPass();
}

// ----- Challenge / response login -----
// The browser never sends the raw username/password. Instead it requests a
// one-time nonce and sends sha256(username:password:nonce). The nonce is
// single-use and short-lived, so the transmitted proof can't be replayed.

const nonces = new Map<string, number>(); // nonce -> expiry timestamp (ms)
const NONCE_TTL_MS = 2 * 60 * 1000;

export function issueNonce() {
  // Opportunistic cleanup of expired nonces.
  const now = Date.now();
  for (const [n, exp] of nonces) if (exp < now) nonces.delete(n);

  const nonce = crypto.randomBytes(16).toString("hex");
  nonces.set(nonce, now + NONCE_TTL_MS);
  return nonce;
}

function consumeNonce(nonce: string) {
  const exp = nonces.get(nonce);
  if (exp === undefined) return false;
  nonces.delete(nonce); // one-time use
  return exp >= Date.now();
}

function expectedProof(nonce: string) {
  return crypto
    .createHash("sha256")
    .update(`${adminUser()}:${adminPass()}:${nonce}`)
    .digest("hex");
}

export function verifyProof(nonce: string, proof: string) {
  if (typeof nonce !== "string" || typeof proof !== "string") return false;
  if (!consumeNonce(nonce)) return false;

  const a = Buffer.from(proof, "hex");
  const b = Buffer.from(expectedProof(nonce), "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function isAuthed() {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value === sessionToken();
}

// Use at the top of any write (POST) route. Returns a 401 response when the
// caller is not logged in, or null when it is safe to proceed.
export async function requireAuth(): Promise<NextResponse | null> {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
