// ≺⧼ ការសាងសង់ឧបករណ៍វាស់ 🛠️ ⧽≻
// ⟨ ឯកសារ `.mjs` ជាលទ្ធផលសាងសង់ ៖ មិនរក្សាទុកក្នុង git ទេ ។
// ស្គ្រីបនេះសាងសង់ឯកសារ `.ts` ទាំងអស់ក្នុងថតនេះទៅ `.mjs` ។ 📃 ⟩
//
// ការប្រើ ៖
//   node iloj/mezurilo/konstruu.mjs            # សាងសង់ទាំងអស់
//   node iloj/mezurilo/konstruu.mjs provo      # សាងសង់តែមួយ
//
// បន្ទាប់មក ៖
//   node --import ./iloj/mezurilo/falsdomo.mjs iloj/mezurilo/provo.mjs vojoj
import { readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ĉiTie = dirname(fileURLToPath(import.meta.url));
// ⟨ rolldown ហៅដោយ node ផ្ទាល់ 📏 ⟩ ៖ ផ្លូវមានអក្សរពិសេស , ហើយ shell កាត់ពួកវា ។
// ដូច្នេះហៅឯកសារ CLI ដោយ `process.execPath` , មិនមែនដោយ `npx` ។ 📃 ⟩
const roldownCli = resolve(ĉiTie, "../../node_modules/rolldown/bin/cli.mjs");
const elektitaj = process.argv.slice(2);
const dosieroj = readdirSync(ĉiTie)
  .filter(n => n.endsWith(".ts"))
  .map(n => n.slice(0, -3))
  .filter(n => elektitaj.length === 0 || elektitaj.includes(n))
  .sort();

if ( dosieroj.length === 0 ) {
  console.error("គ្មានឯកសារ .ts ត្រូវសាងសង់");
  process.exit(1);
}

let malsukcesoj = 0;
for ( const nomo of dosieroj ) {
  const fonto = join(ĉiTie, nomo + ".ts");
  const celo = join(ĉiTie, nomo + ".mjs");
  // ⟨ គ្មាន shell 📏 ⟩ ៖ ផ្លូវមានអក្សរពិសេស , ហើយ shell កាត់ពួកវា ។
  const rezulto = spawnSync(process.execPath,
    [ roldownCli, fonto, "-o", celo, "--format", "esm", "--platform", "node" ],
    { stdio: "pipe", encoding: "utf8" });
  if ( rezulto.status === 0 ) {
    console.log(`✓ ${nomo}`);
  } else {
    malsukcesoj++;
    console.error(`✗ ${nomo}`);
    console.error(( rezulto.error ? String(rezulto.error) : "" ) +
      ( rezulto.stderr || rezulto.stdout || "" ).trim().split("\n").slice(-6).join("\n"));
  }
}

console.log(`\nសាងសង់ ${dosieroj.length - malsukcesoj}/${dosieroj.length} បានជោគជ័យ`);
process.exitCode = malsukcesoj === 0 ? 0 : 1;
