// Fortune Cookie for the Liquidated Trader
// Writes a single original fortune-cookie line for a crypto trader who
// has just been liquidated, to /output/entry.txt.
// Node 22, stdlib only, deterministic, no network, no wall-clock time.

// The line. Chosen over these candidates:
//  1. "The market drank your wallet dry — but it left you the glass,
//     and the glass is half full."
//     Rejected: a lovely liquid pun, but "half full" optimism is a
//     well-worn cliche, and without a "Your fortune" frame the cookie
//     voice is thin — it reads like a toast, not a fortune.
//  2. "Your wallet is empty, your courage is not — the cookie charges
//     no margin for hope."
//     Rejected: warm, but the "margin" wordplay sits too close to the
//     obvious liquidation vocabulary everyone reaches for, and the
//     punchline "for hope" lands soft rather than funny.
//  3. "The stars watched you leverage the moon — then politely handed
//     you this cookie instead."
//     Rejected: a fresh image and a polite cookie, but the loss is only
//     implied (leverage); it risks losing to any entry that names the
//     loss outright, and the joke is about the stars, not the trader.
//  4. "You will rise again, says the cookie — it just cannot say when,
//     or with whose money."
//     Rejected: a good last-word twist, but no wallet and no loss are
//     named, so it reads as generic encouragement rather than a fortune
//     for a liquidated trader.
//  5. CHOSEN: "You sold the bottom, bought the top, and the cookie
//     believes in you — it has no money either."
//     Why it wins: the loss is named in the trader's own self-own
//     (sold the bottom, bought the top), the fortune voice is there
//     ("the cookie believes in you"), and the punchline turns the
//     cookie into a fellow broke believer — rueful, warm solidarity,
//     never cruel or smug. The surprise is the last word: the cookie
//     has no money either. One breath, one line, no stock liquidation
//     pun ("rekt", "margin call", "buy the dip") anywhere in it.
const LINE =
  "You sold the bottom, bought the top, and the cookie believes in you \u2014 it has no money either.";

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Enforce the gate ourselves: UTF-8 text, 1-160 characters, not only
// whitespace, a single line, at most 20 words of plain text.
const WORDS = LINE.trim().split(/\s+/).length;
if (
  LINE.length < 1 ||
  LINE.length > 160 ||
  LINE.trim().length === 0 ||
  /\n/.test(LINE) ||
  WORDS > 20
) {
  throw new Error(`line fails gate: ${LINE.length} chars, ${WORDS} words`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

// Read-back self-check: what we wrote must be exactly the line, and the
// written bytes must themselves pass the gate (1-160 chars, not only
// whitespace, a single line, at most 20 words) — so a disk or encoding
// surprise fails loudly.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: entry.txt differs from LINE");
}
const writtenWords = written.trim().split(/\s+/).length;
if (
  written.length < 1 ||
  written.length > 160 ||
  written.trim().length === 0 ||
  /\n/.test(written) ||
  writtenWords > 20
) {
  throw new Error(
    `written entry fails gate: ${written.length} chars, ${writtenWords} words`,
  );
}

console.log(`entry: ${LINE.length} chars, ${WORDS} words — gate OK`);
