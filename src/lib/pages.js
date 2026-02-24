// Parse page selection specs like "1,3-5" into 0-based page indices.
// If spec is undefined/null/empty => all pages.

export function parsePagesSpec(spec, pageCount) {
  const total = Number(pageCount);
  if (!Number.isFinite(total) || total < 0) {
    throw new Error('Invalid pageCount');
  }

  if (!spec) return Array.from({ length: total }, (_, i) => i);

  const out = new Set();
  const parts = String(spec)
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);

  if (!parts.length) return Array.from({ length: total }, (_, i) => i);

  for (const part of parts) {
    const m = part.match(/^([0-9]+)(?:-([0-9]+))?$/);
    if (!m) throw new Error(`Invalid pages spec: ${spec}. Expected format like: 1,3-5`);

    const start = Number(m[1]);
    const end = m[2] ? Number(m[2]) : start;

    if (start < 1 || end < 1 || end < start) {
      throw new Error(`Invalid pages spec: ${spec}. Pages are 1-based, ranges must be ascending`);
    }

    for (let p = start; p <= end; p++) {
      if (p > total) continue; // ignore out-of-range pages
      out.add(p - 1);
    }
  }

  return [...out].sort((a, b) => a - b);
}
