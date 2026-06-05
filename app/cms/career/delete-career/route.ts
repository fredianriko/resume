import { NextResponse } from "next/server";
import { readJson, writeJson } from "../../_lib/data";
import type { CareerItem } from "@/data/types";
import { requireAuth } from "../../_lib/auth";

export async function POST(req: Request) {
  const denied = await requireAuth();
  if (denied) return denied;

  const { index } = await req.json();

  const data = readJson<CareerItem[]>("career.json", []);

  if (index === null || index === undefined || !data[index]) {
    return NextResponse.json({ error: "Invalid index" }, { status: 400 });
  }

  data.splice(index, 1);
  writeJson("career.json", data);

  return NextResponse.json({ success: true });
}
