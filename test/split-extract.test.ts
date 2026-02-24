import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, test } from 'vitest';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const root = path.resolve(__dirname, '..');
const cli = path.join(root, 'bin', 'pdfkit.js');
const mini = path.join(root, 'test', 'fixtures', 'mini.pdf');

describe('cli split + extract-text', () => {
  test('split writes page-001.pdf...', async () => {
    const outdir = await fs.mkdtemp(path.join(os.tmpdir(), 'pdf-split-'));
    await execFileAsync('node', [cli, 'split', mini, '--outdir', outdir, '--every', '1']);

    const files = (await fs.readdir(outdir)).sort();
    expect(files).toContain('page-001.pdf');
    expect(files).toContain('page-002.pdf');
    expect(files).toContain('page-003.pdf');
  });

  test('extract-text returns text', async () => {
    const { stdout } = await execFileAsync('node', [cli, 'extract-text', mini]);
    expect(stdout).toMatch(/hello world/i);
      });
});
