export function formatDate(dateStr: string, style: "short" | "long" = "short") {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: style === "long" ? "long" : "short",
    day: "numeric",
  });
}

export function readingTimeLabel(minutes: number) {
  return `${minutes} min read`;
}
