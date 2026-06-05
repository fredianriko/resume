import { NextResponse } from "next/server";
import { readJson, writeJson } from "../../_lib/data";
import type { EducationItem } from "@/data/types";
import { requireAuth } from "../../_lib/auth";

export async function POST(req: Request) {
  const denied = await requireAuth();
  if (denied) return denied;

  const body = await req.json();
  const item: EducationItem = {
    school: body.school,
    degree: body.degree,
    period: body.period,
    details: body.details,
  };

  const existing = readJson<EducationItem[]>("education.json", []);
  existing.unshift(item);
  writeJson("education.json", existing);

  return NextResponse.json({ success: true });
}
