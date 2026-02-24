# pdf

A pragmatic PDF toolkit CLI.

## Install

```bash
npm install
```

For local dev usage:

```bash
npm link
pdf --help
```

## Usage

```bash
pdf --help
pdf --version

# merge: output first, then inputs
pdf merge merged.pdf a.pdf b.pdf

# rotate: input then output
pdf rotate in.pdf out.pdf --degrees 90
pdf rotate in.pdf out.pdf --degrees 270 --pages 1,3-5

# split: split into chunks of N pages (default N=1)
pdf split input.pdf --outdir out/
pdf split input.pdf --outdir out/ --every 2
# writes: out/page-001.pdf, out/page-002.pdf, ...

# extract text
pdf extract-text input.pdf
pdf extract-text input.pdf --out output.txt
```

### Safety / edge cases

- Commands that write an output file refuse to overwrite by default.
  - Use `--force` to overwrite.
- `--pages` is 1-based. Example: `--pages 1,3-5`

## Commands

- `merge` — merge PDFs
- `split` — split into per-page (or N-page) PDFs
- `compress` — optimize/compress (stub)
- `rotate` — rotate pages
- `extract-text` — extract text

## Dev

```bash
npm install
npm run lint
npm test
```

## Running without npm link

```bash
node ./bin/pdfkit.js --help
node ./bin/pdfkit.js merge merged.pdf a.pdf b.pdf
node ./bin/pdfkit.js rotate in.pdf out.pdf --degrees 90
```
