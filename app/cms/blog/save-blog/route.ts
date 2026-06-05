import { NextResponse } from "next/server";
import { readJson, writeJson } from "../../_lib/data";
import type { BlogItem } from "@/data/types";
import { requireAuth } from "../../_lib/auth";

export async function POST(req: Request) {
  const denied = await requireAuth();
  if (denied) return denied;

  const body = await req.json();
  const now = new Date().toISOString();

  const item: BlogItem = {
    title: body.title,
    story: body.story,
    author: body.author || "Fredi Anriko",
    createdAt: now,
    updatedAt: now,
  };

  const existing = readJson<BlogItem[]>("blog.json", []);
  existing.unshift(item); // newest on top
  writeJson("blog.json", existing);

  return NextResponse.json({ success: true });
}
