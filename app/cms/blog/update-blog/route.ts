import { NextResponse } from "next/server";
import { readJson, writeJson } from "../../_lib/data";
import type { BlogItem } from "@/data/types";
import { requireAuth } from "../../_lib/auth";

export async function POST(req: Request) {
  const denied = await requireAuth();
  if (denied) return denied;

  const { index, title, story } = await req.json();

  const data = readJson<BlogItem[]>("blog.json", []);

  if (index === null || index === undefined || !data[index]) {
    return NextResponse.json({ error: "Invalid index" }, { status: 400 });
  }

  const previous = data[index];
  data[index] = {
    title,
    story,
    author: previous.author || "Fredi Anriko",
    createdAt: previous.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  writeJson("blog.json", data);

  return NextResponse.json({ success: true });
}
