import { NextResponse } from "next/server";
import { writeJson } from "../../_lib/data";
import type { AboutData } from "@/data/types";
import { requireAuth } from "../../_lib/auth";

export async function POST(req: Request) {
  const denied = await requireAuth();
  if (denied) return denied;

  const body = (await req.json()) as AboutData;

  if (!body.about || !Array.isArray(body.skills)) {
    return NextResponse.json(
      { success: false, error: "Invalid JSON structure" },
      { status: 400 }
    );
  }

  writeJson("aboutme.json", body);
  return NextResponse.json({ success: true });
}
