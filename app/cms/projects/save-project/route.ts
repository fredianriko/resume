import { NextResponse } from "next/server";
import { readJson, writeJson } from "../../_lib/data";
import type { ProjectItem } from "@/data/types";
import { requireAuth } from "../../_lib/auth";

export async function POST(req: Request) {
  const denied = await requireAuth();
  if (denied) return denied;

  const body = await req.json();
  const item: ProjectItem = {
    title: body.title,
    description: body.description,
    tech: body.tech,
    liveUrl: body.liveUrl,
    repoUrl: body.repoUrl,
  };

  const existing = readJson<ProjectItem[]>("projects.json", []);
  existing.unshift(item);
  writeJson("projects.json", existing);

  return NextResponse.json({ success: true });
}
