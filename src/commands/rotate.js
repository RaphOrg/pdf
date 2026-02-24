import { Command } from 'commander';
import fs from 'node:fs/promises';
import path from 'node:path';
import { PDFDocument, degrees as pdfDegrees } from 'pdf-lib';
import { parsePagesSpec } from '../lib/pages.js';

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

function normalizeDegrees(value) {
  const n = Number(value);
  if (![90, 180, 270].includes(n)) {
    throw new Error('Invalid --degrees. Must be one of: 90, 180, 270');
  }
  return n;
}

export function rotateCommand() {
  const cmd = new Command('rotate');
  cmd
    .description('Rotate pages in a PDF')
    .argument('<input>', 'Input PDF file')
    .argument('<output>', 'Output PDF file')
    .requiredOption('-d, --degrees <deg>', 'Degrees (90|180|270)')
    .option('--pages <spec>', 'Pages spec (e.g. "1-3,7"). Default: all pages')
    .option('-f, --force', 'Overwrite output if it already exists')
    .action(async (input, output, opts) => {
      const deg = normalizeDegrees(opts.degrees);

      if (!opts.force && (await fileExists(output))) {
        throw new Error(`Refusing to overwrite existing file: ${output} (use --force)`);
      }

      let bytes;
      try {
        bytes = await fs.readFile(input);
      } catch {
        throw new Error(`Failed to read input: ${input}`);
      }

      let doc;
      try {
        doc = await PDFDocument.load(bytes);
      } catch {
        throw new Error(`Failed to parse PDF: ${input}`);
      }

      const pages = doc.getPages();
      let indices;
      try {
        indices = parsePagesSpec(opts.pages, pages.length);
      } catch (e) {
        throw new Error(String(e?.message || e));
      }

      for (const idx of indices) {
        const page = pages[idx];
        if (!page) continue;
        const current = page.getRotation().angle;
        page.setRotation(pdfDegrees((current + deg) % 360));
      }

      await fs.mkdir(path.dirname(output), { recursive: true }).catch(() => {});
      const out = await doc.save();
      await fs.writeFile(output, out);
    });

  return cmd;
}
