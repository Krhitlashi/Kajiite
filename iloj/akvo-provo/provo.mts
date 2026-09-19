// Provizora provo de la akvokalkulo sur la reala mapo. Forigebla.
import fs from "node:fs";
import { kalkuliAkvon } from "../../src/akvokalkulo.ts";

const n = 192, paso = 4, origino = [-384, -384];
const kr = fs.readFileSync("src/tero-datumaro/cxefa/krado.ts", "utf8");
const ak = fs.readFileSync("src/tero-datumaro/cxefa/akvo.ts", "utf8");
const buf = Buffer.from(kr.match(/SKULPTA_DELTAJ = "(.*)";/)![1], "base64");
const del = new Float32Array(n * n);
for (let i = 0; i < n * n; i++) del[i] = buf.readInt16LE(i * 2) / 16;
const mb = Buffer.from(ak.match(/SKULPTA_AKVA_MASKO = "(.*)";/)![1], "base64");
const semoj = new Uint8Array(n * n);
for (let i = 0; i < n * n; i++) semoj[i] = (mb[i >> 3] >> (i & 7)) & 1;
const nivelo = Number(ak.match(/SKULPTA_AKVA_NIVELO = (.*);/)![1].replace("0o", "0"));
const NIVELLO = (() => {
  const m = ak.match(/SKULPTA_AKVA_NIVELO = (.*);/)![1].trim();
  const p = m.replace(/^-/, "").split("/");
  const num = parseInt(p[0].replace("0o", ""), 8), den = p[1] ? parseInt(p[1].replace("0o", ""), 8) : 1;
  return (m.startsWith("-") ? -1 : 1) * num / den;
})();
console.log("nivelo:", NIVELLO, "(kruda:", nivelo, ")");

const alto = (x: number, z: number) => {
  const fx = Math.max(0, Math.min(n - 1, (x - origino[0]) / paso));
  const fz = Math.max(0, Math.min(n - 1, (z - origino[1]) / paso));
  const i = Math.round(fx), j = Math.round(fz);
  return del[j * n + i];
};
const enFormo = (x: number, z: number) => Math.hypot(x, z) <= 384;

const t0 = Date.now();
const rez = kalkuliAkvon(n, paso, origino, alto, enFormo, [], semoj, { nivelo: NIVELLO });
console.log("kalkulo:", Date.now() - t0, "ms  ", rez.statistikoj);

// Komparo kun la pentrita masko
let pentrita = 0, sama = 0, nurPentrita = 0, nurKalkulita = 0;
for (let i = 0; i < n * n; i++) {
  const p = semoj[i] === 1, k = rez.masko[i] === 1;
  if (p) pentrita++;
  if (p && k) sama++;
  if (p && !k) nurPentrita++;
  if (!p && k) nurKalkulita++;
}
console.log("pentrita:", pentrita, "sama:", sama, "nur pentrita:", nurPentrita, "nur kalkulita:", nurKalkulita);

// Nun kun fonto sur la lago ( pli granda fluo ) + fonto sur monteto
const fontoj = [
  { x: -190, z: -150, fluo: 30 },
  { x: -320, z: 120, fluo: 6 },
];
const r2 = kalkuliAkvon(n, paso, origino, alto, enFormo, fontoj, semoj, { nivelo: NIVELLO });
console.log("kun fontoj:", r2.statistikoj);
let kavoj = 0, maxKavo = 0;
for (let i = 0; i < n * n; i++) if (r2.kavoj[i] > 0) { kavoj++; maxKavo = Math.max(maxKavo, r2.kavoj[i]); }
console.log("kanalaj celoj:", kavoj, "plej profunda eltrancxo:", maxKavo.toFixed(3));
