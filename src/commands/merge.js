import { Command } from 'commander';
import fs from 'node:fs/promises';
import path from 'node:path';
import { PDFDocument } from 'pdf-lib';

export function mergeCommand() {
  const cmd = new Command('merge');
  cmd
    .description('Merge multiple PDFs into a single output PDF')
    .argument('<output>', 'Output PDF file')
    .argument('<inputs...>', 'Input PDF files (in order)')
    .action(async (output, inputs) => {
      if (!inputs?.length) {
        throw new Error('At least one input PDF is required');
      }

      const outDoc = await PDFDocument.create();

      for (const inFile of inputs) {
        const bytes = await fs.readFile(inFile);
        const inDoc = await PDFDocument.load(bytes);
        const indices = inDoc.getPageIndices();
        const pages = await outDoc.copyPages(inDoc, indices);
        for (const p of pages) outDoc.addPage(p);
      }

      await fs.mkdir(path.dirname(output), { recursive: true }).catch(() => {});
      const outBytes = await outDoc.save();
      await fs.writeFile(output, outBytes);
    });

  return cmd;
}
