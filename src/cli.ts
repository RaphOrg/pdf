#!/usr/bin/env node

import { add } from "./index.js";

function help() {
  console.log(`pdf

Usage:
  pdf --help

Notes:
  Placeholder CLI scaffold. (Yes, it does almost nothing yet.)
  add(1,2) = ${add(1, 2)}
`);
}

const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h") || args.length === 0) {
  help();
  process.exit(0);
}

console.error("Unknown arguments:", args.join(" "));
process.exit(1);
