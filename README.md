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

# merge
pdf merge a.pdf b.pdf -o merged.pdf

# split: split into chunks of N pages (default N=1)
pdf split input.pdf --outdir out/
pdf split input.pdf --outdir out/ --every 2
# writes: out/page-001.pdf, out/page-002.pdf, ...

# extract text
pdf extract-text input.pdf
pdf extract-text input.pdf --out output.txt
```

## Commands

- `merge` — merge PDFs
- `split` — split into per-page (or N-page) PDFs
- `compress` — optimize/compress (stub)
- `rotate` — rotate pages (stub)
- `extract-text` — extract text

## Dev

```bash
npm install
npm run lint
npm test
```

## Split

```bash
node ./bin/pdfkit.js split input.pdf --outdir out/
node ./bin/pdfkit.js split input.pdf --outdir out/ --every 2
```

## Extract text

```bash
node ./bin/pdfkit.js extract-text input.pdf
node ./bin/pdfkit.js extract-text input.pdf --out output.txt
```
