export type MediaType = "image" | "pdf";

export function getMediaType(src: string): MediaType {
  const ext = src.split(".").pop()?.toLowerCase() || "";
  if (ext === "pdf") return "pdf";
  return "image";
}
