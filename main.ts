// news-image-20261119 entry (Node 22, standard library only).
// The image is entry.png beside this file: a newspaper front page
// summing up Thursday 19 November 2026 — the Trump–Xi–Putin
// trilateral in Shenzhen, the Gulf escalation, the GTA VI launch,
// the Jeffries Speaker nomination, Voyager 1's light-day milestone,
// plus Cyclone Akvan, the EU Ukraine loan and Ukraine's refinery
// strikes in the footer strip. The program just copies it to the
// output directory the grader provides, so both runs write the
// same bytes.
//
// Run locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });

// Read the image, check it really is a PNG, then write it out.
// Copying via a buffer keeps the output byte-identical on every run.
const source = new URL('./entry.png', import.meta.url);
const image = readFileSync(source);
const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!image.subarray(0, 8).equals(pngMagic)) {
  throw new Error('entry.png is not a PNG file');
}
writeFileSync(join(outDir, 'entry.png'), image);
