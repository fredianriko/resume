import { NextResponse } from "next/server";
import { readJson } from "../../_lib/data";
import type { HeroData } from "@/data/types";

export async function GET() {
  return NextResponse.json(
    readJson<HeroData>("hero.json", {
      name: "",
      subtitle: "",
      profileImage: "",
      buttons: [],
    })
  );
}
