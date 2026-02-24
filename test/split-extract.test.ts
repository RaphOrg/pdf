import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { describe, expect, test } from 'vitest';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const execFileAsync = promisify(execFile);
const root = path.resolve(__dirname, '..');
const cli = path.join(root, 'bin', 'pdfkit.js');

async function makeMiniPdf(pages = 3): Promise<string> {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'pdf-mini-'));
  const file = path.join(dir, 'mini.pdf');

  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);

  for (let i = 1; i <= pages; i++) {
    const page = doc.addPage([595.28, 841.89]); // A4-ish
    const { height } = page.getSize();

    page.drawText('Hello world', {
      x: 72,
      y: height - 72,
      size: 24,
      font,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Mini PDF Page ${i}`, {
      x: 72,
      y: height - 110,
      size: 14,
      font,
      color: rgb(0, 0, 0),
    });
  }

  const bytes = await doc.save();
  await fs.writeFile(file, bytes);
  return file;
}

describe('cli split + extract-text', () => {
  test('split writes page-001.pdf...', async () => {
    const mini = await makeMiniPdf(3);
    const outdir = await fs.mkdtemp(path.join(os.tmpdir(), 'pdf-split-'));

    await execFileAsync('node', [cli, 'split', mini, '--outdir', outdir, '--every', '1']);

    const files = (await fs.readdir(outdir)).sort();
    expect(files).toContain('page-001.pdf');
    expect(files).toContain('page-002.pdf');
    expect(files).toContain('page-003.pdf');
  });

  test('extract-text returns text', async () => {
    const mini = await makeMiniPdf(2);
    const { stdout } = await execFileAsync('node', [cli, 'extract-text', mini]);

    expect(stdout).toMatch(/hello world/i);
    expect(stdout).toMatch(/Mini PDF Page 1/);
    expect(stdout).toMatch(/Mini PDF Page 2/);
  });
});
