import { NextResponse } from "next/server";
import { readJson, writeJson } from "../../_lib/data";
import type { CareerItem } from "@/data/types";
import { requireAuth } from "../../_lib/auth";

export async function POST(req: Request) {
  const denied = await requireAuth();
  if (denied) return denied;

  const body = await req.json();
  const item: CareerItem = {
    title: body.title,
    company: body.company,
    period: body.period,
    achievements: body.achievements,
  };

  const existing = readJson<CareerItem[]>("career.json", []);
  existing.unshift(item); // newest on top
  writeJson("career.json", existing);

  return NextResponse.json({ success: true });
}
