// Prefix a public asset path (e.g. "/profilepict.jpeg") with the configured
// basePath so it resolves correctly when the site is hosted under a subpath
// like https://<user>.github.io/<repo>. External URLs are returned as-is.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(pathOrUrl: string): string {
  if (!pathOrUrl) return pathOrUrl;
  if (/^https?:\/\//.test(pathOrUrl) || pathOrUrl.startsWith("mailto:")) {
    return pathOrUrl;
  }
  // Avoid double-prefixing.
  if (basePath && pathOrUrl.startsWith(basePath + "/")) return pathOrUrl;
  return `${basePath}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}
