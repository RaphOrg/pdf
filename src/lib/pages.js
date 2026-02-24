// Parse page selection specs like "1,3-5" into 0-based page indices.
// If spec is undefined/null/empty => all pages.

export function parsePagesSpec(spec, pageCount) {
  if (!spec) return Array.from({ length: pageCount }, (_, i) => i);

  const out = new Set();
  const parts = String(spec)
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);

  for (const part of parts) {
    const m = part.match(/^([0-9]+)(?:-([0-9]+))?$/);
    if (!m) throw new Error(`Invalid pages spec: ${spec}`);

    const start = Number(m[1]);
    const end = m[2] ? Number(m[2]) : start;

    if (start < 1 || end < 1 || end < start) throw new Error(`Invalid pages spec: ${spec}`);

    for (let p = start; p <= end; p++) {
      if (p > pageCount) continue; // ignore out-of-range pages
      out.add(p - 1);
    }
  }

  return [...out].sort((a, b) => a - b);
}
