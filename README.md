# pdf

A small PDF toolkit CLI.

Currently implemented:
- `merge` (pdf-lib)
- `rotate` (pdf-lib)

Other commands exist but are stubs.

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

# merge: pdf merge <out.pdf> <in1.pdf...>
pdf merge merged.pdf a.pdf b.pdf c.pdf

# rotate: pdf rotate <in.pdf> <out.pdf> --degrees 90|180|270 [--pages 1,3-5]
pdf rotate input.pdf rotated.pdf --degrees 90
pdf rotate input.pdf rotated.pdf --degrees 270 --pages "1,3-5"
```

## Commands

- `merge <out.pdf> <in1.pdf...>` — merge PDFs
- `rotate <in.pdf> <out.pdf> --degrees <90|180|270> [--pages <spec>]` — rotate pages
- `split` — stub
- `compress` — stub
- `extract-text` — stub

## Dev

```bash
npm install
npm run lint
npm test
```
