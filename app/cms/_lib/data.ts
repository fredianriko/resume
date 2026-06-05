import fs from "fs";
import path from "path";

// Helpers shared by the local CMS route handlers.
// These read/write the JSON files under /data. They only run in `next dev`
// on your machine — the CMS is stripped from the production static export.

export function dataPath(file: string) {
  return path.join(process.cwd(), "data", file);
}

export function readJson<T>(file: string, fallback: T): T {
  try {
    const raw = fs.readFileSync(dataPath(file), "utf-8");
    return JSON.parse(raw || "null") ?? fallback;
  } catch {
    return fallback;
  }
}

export function writeJson(file: string, data: unknown) {
  fs.writeFileSync(dataPath(file), JSON.stringify(data, null, 2));
}
