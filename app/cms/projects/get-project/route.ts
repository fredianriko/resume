import { NextResponse } from "next/server";
import { readJson } from "../../_lib/data";
import type { ProjectItem } from "@/data/types";

export async function GET() {
  return NextResponse.json(readJson<ProjectItem[]>("projects.json", []));
}
