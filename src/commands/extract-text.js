import fs from 'node:fs/promises';
import { Command } from 'commander';

async function extractText(bytes) {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const loadingTask = pdfjs.getDocument({ data: new Uint8Array(bytes) });
  const doc = await loadingTask.promise;

  let out = '';
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    const line = content.items.map((it) => (it.str ?? '')).join(' ');
    out += line + '\n';
  }

  return out;
}

export function extractTextCommand() {
  const cmd = new Command('extract-text');
  cmd
    .description('Extract text from a PDF')
    .argument('<input>', 'Input PDF file')
    .option('--out <file>', 'Output text file (defaults to stdout)')
    .action(async (input, opts) => {
      const bytes = await fs.readFile(input);
      const text = (await extractText(bytes)).trimEnd() + '\n';

      if (opts.out) {
        await fs.writeFile(opts.out, text, 'utf8');
      } else {
        process.stdout.write(text);
      }
    });

  return cmd;
}
