import { NextResponse } from "next/server";
import { readJson } from "../../_lib/data";
import type { BlogItem } from "@/data/types";

export async function GET() {
  return NextResponse.json(readJson<BlogItem[]>("blog.json", []));
}
