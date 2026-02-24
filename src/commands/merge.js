import { Command } from 'commander';
import { notImplemented } from './_not-implemented.js';

export function mergeCommand() {
  const cmd = new Command('merge');
  cmd
    .description('Merge multiple PDFs into a single output PDF')
    .argument('<inputs...>', 'Input PDF files')
    .requiredOption('-o, --output <file>', 'Output PDF file')
    .action(notImplemented('merge'));

  return cmd;
}
