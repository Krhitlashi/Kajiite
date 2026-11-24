// ≺⧼ ı],ᴜ ֭ſɭᴜ ſɭɜ ſɭ,w ʌ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ʌ ſɭɜ ſɭ,w ʌ j͑ʃɔ }ʃᴜȝ }ʃꞇ 📏 ⧽≻
// ⟨ ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ı],ᴜ ֭ſɭᴜ , ⟅ ſɭɜ ſɭ,w ,
// ſɭэ ſɭᴜ , ꞙɭэ , ꞙɭı , 📃 ⟩
import * as THREE from "three";
import { aktivajHak6h6, aktivajHaqakaj2, aktivajHakaxte } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { troviK6h6RetajnHaveb6kekn } from "../../eskekoj/medio/voj-reto.js";
import { gluiK6h6Finon } from "../../eskekoj/medio/hak6h6/gluado.js";
import { kf2K6h6Alton } from "../../eskekoj/medio/hak6h6/alto.js";
import { kf2NivelanProfilon } from "../../eskekoj/medio/hak6h6/havem2.js";
import { VOJA_BORDA_SEFINI, VOJA_EKSTERA_DUONO, surGrid } from "../../eskekoj/medio/hak6h6/havecax2l.js";
import { k6h6SuproDeVeb6kek } from "../../eskekoj/medio/hak6h6/haqoxa.js";
import { vepaqKradanKaxten } from "../../kantaoj/mondo/kaxte/krada-kaxte.js";
import { kf2KuhalPukek } from "../../eskekoj/komunajxoj/materialoj.js";
import { akvaFino, punktoCxe as punktoCxeBaza } from "./komunaj.js";

const GRIDO = 0o4; // ɭʃɜ }ʃᴜ ʌ j͑ʃɜ ſɭ,w ʌ j͑ʃw ſɭɹ ſɭɹ ſןᴜ ( SKULPTA_PASO )
// ⟨ ſɭɜ ſɭ,w , ſɭэ ſɭᴜ , 📏 ⟩ , ſɭэ ſɭᴜ , ꞙɭэ , ꞙɭı ,
function meshaAlteco(x: number, z: number): number {
  const x0 = Math.floor(x / GRIDO) * GRIDO, z0 = Math.floor(z / GRIDO) * GRIDO;
  const fx = (x - x0) / GRIDO, fz = (z - z0) / GRIDO;
  const h00 = alteco(x0, z0), h10 = alteco(x0 + GRIDO, z0);
  const h01 = alteco(x0, z0 + GRIDO), h11 = alteco(x0 + GRIDO, z0 + GRIDO);
  return (h00 * (1 - fx) + h10 * fx) * (1 - fz) + (h01 * (1 - fx) + h11 * fx) * fz;
}

const TERO_PLATO = process.argv[3] === "tero";
const VOJOJ = aktivajHak6h6().filter(v => v.n2k.length >= 2);
const DOKOJ = aktivajHaqakaj2();
const URBOJ = aktivajHakaxte();
const qena = new THREE.Scene();
const oro = kf2KuhalPukek(0xd8b45a);
const kradajDifinoj: any[] = [];
const kradajHaveb6kek: [number, number][] = [];
for (const u of URBOJ) {
  const kaxte = vepaqKradanKaxten(qena,
    { arangxaGrando: u.arangxaGrando, blokaGrando: u.blokaGrando as any, keuxfhxeso: false, lampoj: false },
    [u.ofsX, u.ofsZ], oro);
  kradajDifinoj.push(...kaxte.vojDifinoj);
  kradajHaveb6kek.push(...kaxte.kunigajPunktoj);
}
const landoj = DOKOJ.map(d => {
  const r = d.rotacio ?? 0;
  return { x: d.x + Math.sin(r) * (d.profundo / 2), z: d.z + Math.cos(r) * (d.profundo / 2) };
});
const antauxaj = troviK6h6RetajnHaveb6kekn(VOJOJ.map(v => ({ n2k: v.n2k, sefini: v.sefini })), DOKOJ);
const celojGluaj: [number, number][] = [...kradajHaveb6kek, ...antauxaj.map(k => [k.x, k.z] as [number, number])];
const kradajPunktoj = kradajDifinoj.map(d => d.pts as [number, number][]);
const gluitaj = VOJOJ.map((v, i) => gluiK6h6Finon(v.n2k, celojGluaj, landoj,
  [...kradajPunktoj, ...VOJOJ.filter((_, j) => j !== i).map(o => o.n2k)]));
const haveb6kek = troviK6h6RetajnHaveb6kekn(
  VOJOJ.map((v, i) => ({ n2k: gluitaj[i], sefini: v.sefini })), DOKOJ);
const ciujHaveb6kek: [number, number][] = [...kradajHaveb6kek, ...haveb6kek.map(k => [k.x, k.z] as [number, number])];
const k6h6Alteco = kf2K6h6Alton(alteco,
  [...kradajHaveb6kek.map(([x, z]) => ({ x, z, direktaj: [] as [number, number][] })), ...haveb6kek]);
const hapa12 = new Map<string, number>();
const pa12Cxe = (x: number, z: number): number => {
  const ca3aq = x + "," + z;
  let l6da = hapa12.get(ca3aq);
  if (l6da === undefined) {
    l6da = surGrid(k6h6SuproDeVeb6kek(x, z, [], VOJA_EKSTERA_DUONO,
      TERO_PLATO ? alteco : k6h6Alteco).hateru);
    hapa12.set(ca3aq, l6da);
  }
  return l6da;
};
const ankroj = ciujHaveb6kek.map(([x, z]) => ({ x, z, l6da: pa12Cxe(x, z) }));

// ⟨ ı],ᴜ ֭ſɭᴜ , ſɭɜ ſɭᴜ , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
const punktoCxe = ( pts: readonly [ number, number ][], s: number ): { x: number; z: number } =>
  punktoCxeBaza( pts, s, 0o10 ** -0o12 );

for (let i = 0; i < VOJOJ.length; i++) {
  const v = VOJOJ[i] as any;
  const p2somani = (v.pontoSefini ?? v.sefini) / 4 + VOJA_BORDA_SEFINI;
  const p = kf2NivelanProfilon(gluitaj[i], p2somani, k6h6Alteco, akvaFino, ankroj);
  let tlunakani = 0, maks = 0, maksLoko = "";
  let sumoM = 0, maksM = 0, maksMLoko = "";
  let kasxita = 0;
// ⟨ j͑ʃᴜ ſɭ,w , ſɭᴜ ſɭ,w , 📏 ⟩ , ſɭэ ſɭᴜ , ꞙɭı ,
  let muroSumo = 0, muroMaks = 0, muroLoko = "";
  for (let j = 0; j < p.hal6da.length; j++) {
    const q = punktoCxe(gluitaj[i], p.haxekuxa[j]);
    const s = p.hal6da[j] - alteco(q.x, q.z);
    const m = p.hal6da[j] - meshaAlteco(q.x, q.z);
    tlunakani += s; sumoM += m;
    if (s > maks) { maks = s; maksLoko = `${q.x.toFixed(1)},${q.z.toFixed(1)}`; }
    if (m > maksM) { maksM = m; maksMLoko = `${q.x.toFixed(1)},${q.z.toFixed(1)}`; }
    if (m > 0o1/0o2) kasxita++;
    const qa = punktoCxe(gluitaj[i], p.haxekuxa[j] - 0.1);
    const qb = punktoCxe(gluitaj[i], p.haxekuxa[j] + 0.1);
    const dx = qb.x - qa.x, dz = qb.z - qa.z, dl = Math.hypot(dx, dz) || 1;
    const lx = -dz / dl * p2somani, lz = dx / dl * p2somani;
// ⟨ ſɭᴜ ſןᴜ , ſןᴜ ᶘɹ , 📏 ⟩ , ſɭᴜ ſןᴜ , ֭ſɭᴜ ſ͔ɭᴜ ,
    const gMal = k6h6Alteco(q.x - lx, q.z - lz);
    const gDek = k6h6Alteco(q.x + lx, q.z + lz);
    const klin = Math.min(1.0, Math.abs(gDek - gMal));
    const malPlialta = gMal > gDek;
    const sMal = malPlialta ? p.hal6da[j] : p.hal6da[j] - klin;
    const sDek = malPlialta ? p.hal6da[j] - klin : p.hal6da[j];
    const muro = Math.max(sMal - (gMal - 0.25), sDek - (gDek - 0.25));
    muroSumo += muro;
    if (muro > muroMaks) { muroMaks = muro; muroLoko = `${q.x.toFixed(1)},${q.z.toFixed(1)}`; }
  }
  const n = p.hal6da.length;
  console.log(`${i} ${v.ksaka} ｡ ɭl̀ᴜ ʌ ſɭɜ ſɭ,w ı],ᴜ ֭ſɭᴜ ｡ ſȷƽᴜ ɭʃᴜ ${(tlunakani / n).toFixed(2)} ｡ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${maks.toFixed(2)} @${maksLoko}` +
    ` | ɭl̀ᴜ ʌ ſןᴜ ſᶘɹ ſɭɹ ſɭɹ ſןᴜ ｡ ſȷƽᴜ ɭʃᴜ ${(sumoM / n).toFixed(2)} ｡ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${maksM.toFixed(2)} @${maksMLoko}` +
    ` | ſᶘᴜ j͐ʃɹ ɭl̀ᴜ ꞙɭııɔ.ɩ ${kasxita}/${n}` +
    ` | ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ſᶘɔ j͐ʃɹ j͑ʃᴜꞇ ｡ ſȷƽᴜ ɭʃᴜ ${(muroSumo / n).toFixed(2)} ｡ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${muroMaks.toFixed(2)} @${muroLoko}`);
}

// ⟨ ſɭэ ֭ſɭэ , ſɭэ ſɭ,w , 📏 ⟩ , ſɭэ ſɭᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
const plataj: { ksaka: string; sahakani: number; l6da: number; teroMin: number; teroMaks: number; x: number; z: number }[] = [];
for (let i = 0; i < kradajDifinoj.length; i++) {
  const d = kradajDifinoj[i];
  if (!d.pts || d.pts.length < 2) continue;
  const p2somani = d.w / 2 + VOJA_BORDA_SEFINI;
  const p = kf2NivelanProfilon(d.pts as [number, number][], p2somani, k6h6Alteco, akvaFino, ankroj);
  let s0 = p.haxekuxa[0], nuna = p.hal6da[0];
  for (let j = 1; j <= p.hal6da.length; j++) {
    if (j === p.hal6da.length || p.hal6da[j] !== nuna) {
      const s1 = j === p.hal6da.length ? p.haxekuxa[p.hal6da.length - 1] : p.haxekuxa[j];
      const sahakani = s1 - s0;
      if (sahakani > 6) {
        let mn = Infinity, mx = -Infinity;
        for (let u = s0; u <= s1; u += 0.5) {
          const q = punktoCxe(d.pts as [number, number][], u);
          mn = Math.min(mn, alteco(q.x, q.z)); mx = Math.max(mx, alteco(q.x, q.z));
        }
        const q = punktoCxe(d.pts as [number, number][], s0);
        plataj.push({ ksaka: `ſɭɹ ſןᴜ ${i}`, sahakani, l6da: nuna, teroMin: mn, teroMaks: mx, x: q.x, z: q.z });
      }
      if (j < p.hal6da.length) { s0 = p.haxekuxa[j]; nuna = p.hal6da[j]; }
    }
  }
}
plataj.sort((a, b) => b.sahakani - a.sahakani);
console.log("=== ſɭэ ֭ſɭэ ʌ ſɭɹ ſןᴜ ｡ j͑ʃ'ɔ ŋᷠɹ ｡ ſɭэ }ʃᴜ ɭl̀ᴜ ===");
for (const r of plataj.slice(0, 6))
  console.log(`  ${r.ksaka} ${r.sahakani.toFixed(1)}@${r.l6da.toFixed(1)} ｡ ſɭɜ ſɭ,w ${r.teroMin.toFixed(1)}..${r.teroMaks.toFixed(1)}` +
    ` ( ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${(r.l6da - r.teroMin).toFixed(2)} ) @${r.x.toFixed(0)},${r.z.toFixed(0)}`);

// ⟨ j͑ʃᴜ ſɭ,w , ſןɔ˞ᴜƴ , 📏 ⟩ , ſɭэ ֭ſɭэ , ſןɔ˞ᴜƴ ,
type Salto = { ksaka: string; salto: number; de: number; al: number; x: number; z: number };
const saltoj: Salto[] = [];
function skanuSaltojn(ksaka: string, pts: [number, number][], p2somani: number): void {
  const p = kf2NivelanProfilon(pts, p2somani, k6h6Alteco, akvaFino, ankroj);
  for (let j = 1; j < p.hal6da.length; j++) {
    const d = p.hal6da[j] - p.hal6da[j - 1];
    if (Math.abs(d) > 0.5 + 0o10 ** -0o7) {
      const q = punktoCxe(pts, p.haxekuxa[j]);
      saltoj.push({ ksaka, salto: d, de: p.hal6da[j - 1], al: p.hal6da[j], x: q.x, z: q.z });
    }
  }
}
for (let i = 0; i < VOJOJ.length; i++) {
  const v = VOJOJ[i] as any;
  skanuSaltojn(v.ksaka, gluitaj[i], (v.pontoSefini ?? v.sefini) / 4 + VOJA_BORDA_SEFINI);
}
for (let i = 0; i < kradajDifinoj.length; i++) {
  const d = kradajDifinoj[i];
  if (!d.pts || d.pts.length < 2) continue;
  skanuSaltojn(`ſɭɹ ſןᴜ ${i}`, d.pts as [number, number][], d.w / 2 + VOJA_BORDA_SEFINI);
}
saltoj.sort((a, b) => Math.abs(b.salto) - Math.abs(a.salto));
console.log(`=== j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ʌ ſɭɹ ſȷɔ ɭʃɜ }ʃᴜ ${saltoj.length} ===`);
for (const s of saltoj.slice(0, 6))
  console.log(`  ${s.ksaka} ${s.de.toFixed(2)} ｡ ${s.al.toFixed(2)} ( ${s.salto.toFixed(2)} ) @${s.x.toFixed(0)},${s.z.toFixed(0)}`);
