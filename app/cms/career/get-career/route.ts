import { NextResponse } from "next/server";
import { readJson } from "../../_lib/data";
import type { CareerItem } from "@/data/types";

export async function GET() {
  return NextResponse.json(readJson<CareerItem[]>("career.json", []));
}
