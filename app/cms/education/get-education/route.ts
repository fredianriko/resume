import { NextResponse } from "next/server";
import { readJson } from "../../_lib/data";
import type { EducationItem } from "@/data/types";

export async function GET() {
  return NextResponse.json(readJson<EducationItem[]>("education.json", []));
}
