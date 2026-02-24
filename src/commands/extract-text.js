import fs from 'node:fs/promises';
import { Command } from 'commander';
import pdfParse from 'pdf-parse';

async function extractText(bytes) {
  const res = await pdfParse(Buffer.from(bytes));
  return res.text ?? '';
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
