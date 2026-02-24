import { Command } from 'commander';
import fs from 'node:fs/promises';
import path from 'node:path';
import { PDFDocument } from 'pdf-lib';

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

export function mergeCommand() {
  const cmd = new Command('merge');
  cmd
    .description('Merge multiple PDFs into a single output PDF')
    .argument('<output>', 'Output PDF file')
    .argument('<inputs...>', 'Input PDF files (in order)')
    .option('-f, --force', 'Overwrite output if it already exists')
    .action(async (output, inputs, opts) => {
      if (!inputs?.length) throw new Error('At least one input PDF is required');

      if (!opts.force && (await fileExists(output))) {
        throw new Error(`Refusing to overwrite existing file: ${output} (use --force)`);
      }

      const outDoc = await PDFDocument.create();

      for (const inFile of inputs) {
        let bytes;
        try {
          bytes = await fs.readFile(inFile);
        } catch (e) {
          throw new Error(`Failed to read input: ${inFile}`);
        }

        let inDoc;
        try {
          inDoc = await PDFDocument.load(bytes);
        } catch {
          throw new Error(`Failed to parse PDF: ${inFile}`);
        }

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
