# pdf

A PDF toolkit CLI (scaffold).

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

pdf merge a.pdf b.pdf -o merged.pdf
pdf split input.pdf --pages "1-3,7" --outdir out/
pdf compress input.pdf -o output.pdf --quality medium
pdf rotate input.pdf -o rotated.pdf --degrees 90 --pages "1-"
pdf extract-text input.pdf -o output.txt
```

## Commands

- `merge` — merge PDFs
- `split` — split pages/ranges
- `compress` — optimize/compress
- `rotate` — rotate pages
- `extract-text` — extract text

> Note: commands are currently stubs and will print “not implemented yet”.

## Dev

```bash
npm install
npm run lint
npm run format
```
