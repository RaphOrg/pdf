import { Command } from 'commander';
import { notImplemented } from './_not-implemented.js';

export function compressCommand() {
  const cmd = new Command('compress');
  cmd
    .description('Compress/optimize a PDF')
    .argument('<input>', 'Input PDF file')
    .requiredOption('-o, --output <file>', 'Output PDF file')
    .option('--quality <level>', 'Quality preset (low|medium|high)', 'medium')
    .action(notImplemented('compress'));

  return cmd;
}
