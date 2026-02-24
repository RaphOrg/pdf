import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { PDFDocument } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const binPath = path.join(repoRoot, 'bin', 'pdfkit.js');

async function makePdf(filePath, pageCount) {
  const doc = await PDFDocument.create();
  for (let i = 0; i < pageCount; i++) doc.addPage();
  const bytes = await doc.save();
  await fs.writeFile(filePath, bytes);
}

function runPdf(args) {
  const res = spawnSync('node', [binPath, ...args], {
    cwd: repoRoot,
    encoding: 'utf8',
  });
  if (res.status !== 0) {
    throw new Error(`pdf ${args.join(' ')} failed (code ${res.status})\n${res.stdout}\n${res.stderr}`);
  }
}

async function countPages(filePath) {
  const bytes = await fs.readFile(filePath);
  const doc = await PDFDocument.load(bytes);
  return doc.getPageCount();
}

async function main() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'pdf-cli-smoke-'));

  const a = path.join(dir, 'a.pdf');
  const b = path.join(dir, 'b.pdf');
  const merged = path.join(dir, 'merged.pdf');
  const rotated = path.join(dir, 'rotated.pdf');

  await makePdf(a, 1);
  await makePdf(b, 2);

  runPdf(['merge', merged, a, b]);
  const mergedPages = await countPages(merged);
  if (mergedPages !== 3) throw new Error(`expected merged to have 3 pages, got ${mergedPages}`);

  runPdf(['rotate', merged, rotated, '--degrees', '90', '--pages', '2-3']);
  const rotatedPages = await countPages(rotated);
  if (rotatedPages !== 3) throw new Error(`expected rotated to have 3 pages, got ${rotatedPages}`);

  console.log('smoke ok');
}

await main();
