import { NextResponse } from "next/server";
import { writeJson } from "../../_lib/data";
import type { ContactData } from "@/data/types";
import { requireAuth } from "../../_lib/auth";

export async function POST(req: Request) {
  const denied = await requireAuth();
  if (denied) return denied;

  const body = (await req.json()) as ContactData;
  writeJson("contact.json", body);
  return NextResponse.json({ success: true });
}
