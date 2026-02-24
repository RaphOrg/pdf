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
npm install
npm run cli -- --help
```

## Usage

```bash
# help/version
npm run cli -- --help
npm run cli -- --version

# merge: merge <out.pdf> <in1.pdf...>
node ./bin/pdfkit.js merge merged.pdf a.pdf b.pdf c.pdf

# rotate: rotate <in.pdf> <out.pdf> --degrees 90|180|270 [--pages 1,3-5]
node ./bin/pdfkit.js rotate input.pdf rotated.pdf --degrees 90
node ./bin/pdfkit.js rotate input.pdf rotated.pdf --degrees 270 --pages "1,3-5"
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
