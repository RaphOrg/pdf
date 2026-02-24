import { Command } from 'commander';
import { notImplemented } from './_not-implemented.js';

export function rotateCommand() {
  const cmd = new Command('rotate');
  cmd
    .description('Rotate pages in a PDF')
    .argument('<input>', 'Input PDF file')
    .requiredOption('-o, --output <file>', 'Output PDF file')
    .requiredOption('-d, --degrees <deg>', 'Degrees (90|180|270)')
    .option('--pages <spec>', 'Pages spec (e.g. "1-3,7")')
    .action(notImplemented('rotate'));

  return cmd;
}
