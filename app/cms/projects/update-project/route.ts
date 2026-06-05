import { NextResponse } from "next/server";
import { readJson, writeJson } from "../../_lib/data";
import type { ProjectItem } from "@/data/types";
import { requireAuth } from "../../_lib/auth";

export async function POST(req: Request) {
  const denied = await requireAuth();
  if (denied) return denied;

  const { index, title, description, tech, liveUrl, repoUrl } =
    await req.json();

  const data = readJson<ProjectItem[]>("projects.json", []);

  if (index === null || index === undefined || !data[index]) {
    return NextResponse.json({ error: "Invalid index" }, { status: 400 });
  }

  data[index] = { title, description, tech, liveUrl, repoUrl };
  writeJson("projects.json", data);

  return NextResponse.json({ success: true });
}
