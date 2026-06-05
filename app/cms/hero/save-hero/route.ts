import { NextResponse } from "next/server";
import { writeJson } from "../../_lib/data";
import type { HeroData } from "@/data/types";
import { requireAuth } from "../../_lib/auth";

export async function POST(req: Request) {
  const denied = await requireAuth();
  if (denied) return denied;

  const body = (await req.json()) as HeroData;
  writeJson("hero.json", body);
  return NextResponse.json({ success: true });
}
