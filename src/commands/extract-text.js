import { Command } from 'commander';
import { notImplemented } from './_not-implemented.js';

export function extractTextCommand() {
  const cmd = new Command('extract-text');
  cmd
    .description('Extract text from a PDF')
    .argument('<input>', 'Input PDF file')
    .option('-o, --output <file>', 'Output text file (defaults to stdout)')
    .option('--pages <spec>', 'Pages spec (e.g. "1-3,7")')
    .action(notImplemented('extract-text'));

  return cmd;
}
