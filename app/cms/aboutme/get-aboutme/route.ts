import { NextResponse } from "next/server";
import { readJson } from "../../_lib/data";
import type { AboutData } from "@/data/types";

export async function GET() {
  return NextResponse.json(
    readJson<AboutData>("aboutme.json", { about: "", skills: [] })
  );
}
