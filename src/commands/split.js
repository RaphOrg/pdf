import fs from 'node:fs/promises';
import path from 'node:path';
import { Command } from 'commander';
import { PDFDocument } from 'pdf-lib';

function pad3(n) {
  return String(n).padStart(3, '0');
}

export function splitCommand() {
  const cmd = new Command('split');
  cmd
    .description('Split a PDF into multi-page chunks')
    .argument('<input>', 'Input PDF file')
    .requiredOption('-o, --outdir <dir>', 'Output directory')
    .option('--every <n>', 'Pages per output PDF', (v) => Number(v), 1)
    .action(async (input, opts) => {
      const every = Number(opts.every ?? 1);
      if (!Number.isInteger(every) || every <= 0) {
        throw new Error('--every must be a positive integer');
      }

      const outdir = opts.outdir;
      await fs.mkdir(outdir, { recursive: true });

      const inBytes = await fs.readFile(input);
      const inDoc = await PDFDocument.load(inBytes);
      const totalPages = inDoc.getPageCount();

      let fileIndex = 1;
      for (let start = 0; start < totalPages; start += every) {
        const end = Math.min(start + every, totalPages);
        const outDoc = await PDFDocument.create();
        const pageIndices = Array.from(
          { length: end - start },
          (_, i) => start + i,
        );
        const pages = await outDoc.copyPages(inDoc, pageIndices);
        for (const p of pages) outDoc.addPage(p);
        const outBytes = await outDoc.save();

        const outName = `page-${pad3(fileIndex)}.pdf`;
        const outPath = path.join(outdir, outName);
        await fs.writeFile(outPath, outBytes);
        fileIndex++;
      }
    });

  return cmd;
}
