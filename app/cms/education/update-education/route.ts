import { NextResponse } from "next/server";
import { readJson, writeJson } from "../../_lib/data";
import type { EducationItem } from "@/data/types";
import { requireAuth } from "../../_lib/auth";

export async function POST(req: Request) {
  const denied = await requireAuth();
  if (denied) return denied;

  const { index, school, degree, period, details } = await req.json();

  const data = readJson<EducationItem[]>("education.json", []);

  if (index === null || index === undefined || !data[index]) {
    return NextResponse.json({ error: "Invalid index" }, { status: 400 });
  }

  data[index] = { school, degree, period, details };
  writeJson("education.json", data);

  return NextResponse.json({ success: true });
}
