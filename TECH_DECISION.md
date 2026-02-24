# TECH_DECISION — PDF engine/library choices

Goal: pick defaults that work on macOS/Linux/Windows without making install a nightmare.

## Quick take (defaults)
- **Editing (merge/split/rotate/basic page ops): `pdf-lib`**
  - Pure JS, no native deps, runs anywhere Node runs.
- **“Real” optimization/compression/linearization: external `qpdf` (optional)**
  - Best results, but requires a system binary.
  - Treat as an optional accelerator path.
- **Text extraction: external Poppler `pdftotext` (preferred when available), else `pdf-parse` fallback**
  - Poppler is more accurate on gnarly PDFs.

## Merge / split / rotate / basic transforms
### Option A — `pdf-lib` (recommended default)
**Pros**
- Cross-platform, pure JS
- Easy to ship as a library + CLI
- Good for page-level operations (copy pages, reorder, rotate)

**Cons**
- Not a “PDF optimizer”; file-size reduction is limited
- Some PDFs (weird encodings/objects) can be painful

### Option B — `hummus-recipe`
**Pros**
- Historically popular for page manipulation

**Cons**
- Fragile ecosystem; tends to lag behind modern Node/tooling
- Native-ish complexity / maintenance risk

**Verdict:** not the default.

### Option C — call system tools (`qpdf` / Poppler) via `child_process`
**Pros**
- Battle-tested correctness for many operations
- Best-in-class for certain tasks (e.g., qpdf for structural ops)

**Cons**
- Requires binaries installed (CI + user machines)
- Packaging/distribution gets annoying fast

**Verdict:** keep as optional backend for power-user mode.

## Compress / optimize
### `pdf-lib`
- Can sometimes reduce size depending on how you rebuild objects, but it’s not an optimizer.

### `qpdf` (recommended when available)
**Pros**
- Excellent at stream compression, object cleanup, linearization
- Fast and stable

**Cons**
- External dependency

**Recommendation:** implement `--compress` as:
1) try `qpdf` if present
2) otherwise do a no-op (or minimal rebuild) and document the limitation

## Text extraction
### Option A — `pdf-parse`
**Pros**
- Zero external dependencies
- Simple API

**Cons**
- Accuracy varies; layout-sensitive extraction can be rough

### Option B — Poppler `pdftotext` (recommended when available)
**Pros**
- Generally better extraction, especially for real-world PDFs
- More flags for controlling output

**Cons**
- External dependency

**Recommendation:** default behavior:
- Prefer `pdftotext` if found on PATH
- Fallback to `pdf-parse` for portability

## Implementation note
Design the code around an interface like:
- `PdfEngine` for page ops (default pdf-lib)
- `TextExtractor` (poppler first, then pdf-parse)
- `Optimizer` (qpdf optional)

So we can swap backends without rewriting the CLI.
