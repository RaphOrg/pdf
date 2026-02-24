import { Command } from 'commander';
import { notImplemented } from './_not-implemented.js';

export function splitCommand() {
  const cmd = new Command('split');
  cmd
    .description('Split a PDF into pages or ranges')
    .argument('<input>', 'Input PDF file')
    .option('-o, --outdir <dir>', 'Output directory', '.')
    .option('--pages <spec>', 'Pages spec (e.g. "1-3,7,9-")')
    .action(notImplemented('split'));

  return cmd;
}
