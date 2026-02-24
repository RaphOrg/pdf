import { Command } from 'commander';
import { mergeCommand } from './commands/merge.js';
import { splitCommand } from './commands/split.js';
import { compressCommand } from './commands/compress.js';
import { rotateCommand } from './commands/rotate.js';
import { extractTextCommand } from './commands/extract-text.js';

export async function main(argv) {
  const program = new Command();

  program
    .name('pdf')
    .description('PDF toolkit CLI')
    .version('0.1.0');

  program.addCommand(mergeCommand());
  program.addCommand(splitCommand());
  program.addCommand(compressCommand());
  program.addCommand(rotateCommand());
  program.addCommand(extractTextCommand());

  program.showHelpAfterError(true);
  program.showSuggestionAfterError(true);

  await program.parseAsync(argv);
}
