import { NextResponse } from "next/server";
import { writeJson } from "../../_lib/data";
import type { AboutData } from "@/data/types";
import { requireAuth } from "../../_lib/auth";

export async function POST(req: Request) {
  const denied = await requireAuth();
  if (denied) return denied;

  const body = (await req.json()) as AboutData;

  if (!body.about) {
    return NextResponse.json(
      { success: false, error: "About text is required" },
      { status: 400 }
    );
  }

  writeJson("aboutme.json", { about: body.about });
  return NextResponse.json({ success: true });
}
