// ≺⧼ ſ͕ɭɜ ᶗ‹ , ſɭэ ɭʃᴜ 🛠️ ⧽≻
// ⟨ ſ͕ɭɜ ᶗ‹ , ſɭэ ſɭᴜ , ꞙɭı ,
// ſ͕ɭɜ ᶗ‹ , ſɭэ ſɭᴜ , ꞙɭı , 📃 ⟩
//
// ſɭэ ɭʃᴜ , ⟅
//   node iloj/mezurilo/konstruu.mjs            # ſ͕ɭɜ ᶗ‹ , ꞙɭı ,
//   node iloj/mezurilo/konstruu.mjs provo      # ſ͕ɭɜ ᶗ‹ , ꞙɭı ,
//
// ſɭэ ɭʃᴜ , ⟅
//   node --import ./iloj/mezurilo/falsdomo.mjs iloj/mezurilo/provo.mjs vojoj
import { readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ĉiTie = dirname(fileURLToPath(import.meta.url));
// ⟨ ſ͕ɭɜ ᶗ‹ , ſɭэ ɭʃᴜ , 📏 ⟩ , ſɭэ ɭʃᴜ , ꞙɭı ,
// ſɭэ ɭʃᴜ , ꞙɭı , 📃 ⟩
const roldownCli = resolve(ĉiTie, "../../node_modules/rolldown/bin/cli.mjs");
const elektitaj = process.argv.slice(2);
const dosieroj = readdirSync(ĉiTie)
  .filter(n => n.endsWith(".ts"))
  .map(n => n.slice(0, -3))
  .filter(n => elektitaj.length === 0 || elektitaj.includes(n))
  .sort();

if ( dosieroj.length === 0 ) {
  console.error("ſןɔ ʌ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ｡ .ts ｡ ſɭʞɹ");
  process.exit(1);
}

let malsukcesoj = 0;
for ( const nomo of dosieroj ) {
  const fonto = join(ĉiTie, nomo + ".ts");
  const celo = join(ĉiTie, nomo + ".mjs");
// ⟨ ſɭэ ɭʃᴜ , ꞙɭɿ , 📏 ⟩ , ſɭэ ɭʃᴜ , ꞙɭı ,
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

console.log(`
ſɭʞɹ ｡ ${dosieroj.length - malsukcesoj}/${dosieroj.length} ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ`);
process.exitCode = malsukcesoj === 0 ? 0 : 1;
