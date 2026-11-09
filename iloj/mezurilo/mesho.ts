// ≺⧼ ការប្រៀបធៀបដីរលូន និងដីសំណាញ់ 📏 ⧽≻
// ⟨ ផ្លូវសាងសង់តាមអនុគមន៍ alteco ( រលូន ) , តែដីដែលឃើញជាសំណាញ់
// បន្ទាត់ត្រង់ចន្លោះចំណុចរាល់ ៤ ឯកតា ។ ឧបករណ៍នេះវាស់ទាំងពីរ ។ 📃 ⟩
import * as THREE from "three";
import { aktivajVojoj, aktivajDokoj, aktivajUrboj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { troviVojaRetajnKunigojn } from "../../eskekoj/medio/voj-reto.js";
import { gluiVojaFinon } from "../../eskekoj/medio/vojoj/gluado.js";
import { kreiVojoAlton } from "../../eskekoj/medio/vojoj/alto.js";
import { kreiNivelanProfilon } from "../../eskekoj/medio/vojoj/niveloj.js";
import { VOJA_BORDA_LARĜO, VOJA_EKSTERA_DUONO, surGrid } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { vojaSuproDeKunigo } from "../../eskekoj/medio/vojoj/formoj.js";
import { konstruiKradanUrbon } from "../../kantaoj/mondo/urbo/krada-urbo.js";
import { kreiOranMaterialon } from "../../eskekoj/komunajxoj/materialoj.js";
import { akvaFino } from "./komunaj.js";

const GRIDO = 0o4; // ជំហានសំណាញ់ដី ( SKULPTA_PASO )
// ⟨ ដីសំណាញ់ 📏 ⟩ ៖ បន្ទាត់ត្រង់រវាងចំណុចរាល់ 4 ឯកតា ។
function meshaAlteco(x: number, z: number): number {
  const x0 = Math.floor(x / GRIDO) * GRIDO, z0 = Math.floor(z / GRIDO) * GRIDO;
  const fx = (x - x0) / GRIDO, fz = (z - z0) / GRIDO;
  const h00 = alteco(x0, z0), h10 = alteco(x0 + GRIDO, z0);
  const h01 = alteco(x0, z0 + GRIDO), h11 = alteco(x0 + GRIDO, z0 + GRIDO);
  return (h00 * (1 - fx) + h10 * fx) * (1 - fz) + (h01 * (1 - fx) + h11 * fx) * fz;
}

const TERO_PLATO = process.argv[3] === "tero";
const VOJOJ = aktivajVojoj().filter(v => v.punktoj.length >= 2);
const DOKOJ = aktivajDokoj();
const URBOJ = aktivajUrboj();
const sceno = new THREE.Scene();
const oro = kreiOranMaterialon(0xd8b45a);
const kradajDifinoj: any[] = [];
const kradajKunigoj: [number, number][] = [];
for (const u of URBOJ) {
  const urbo = konstruiKradanUrbon(sceno,
    { arangxaGrando: u.arangxaGrando, blokaGrando: u.blokaGrando as any, keuxfhxeso: false, lampoj: false },
    [u.ofsX, u.ofsZ], oro);
  kradajDifinoj.push(...urbo.vojDifinoj);
  kradajKunigoj.push(...urbo.kunigajPunktoj);
}
const landoj = DOKOJ.map(d => {
  const r = d.rotacio ?? 0;
  return { x: d.x + Math.sin(r) * (d.profundo / 2), z: d.z + Math.cos(r) * (d.profundo / 2) };
});
const antauxaj = troviVojaRetajnKunigojn(VOJOJ.map(v => ({ punktoj: v.punktoj, larĝo: v.larĝo })), DOKOJ);
const celojGluaj: [number, number][] = [...kradajKunigoj, ...antauxaj.map(k => [k.x, k.z] as [number, number])];
const kradajPunktoj = kradajDifinoj.map(d => d.pts as [number, number][]);
const gluitaj = VOJOJ.map((v, i) => gluiVojaFinon(v.punktoj, celojGluaj, landoj,
  [...kradajPunktoj, ...VOJOJ.filter((_, j) => j !== i).map(o => o.punktoj)]));
const kunigoj = troviVojaRetajnKunigojn(
  VOJOJ.map((v, i) => ({ punktoj: gluitaj[i], larĝo: v.larĝo })), DOKOJ);
const ciujKunigoj: [number, number][] = [...kradajKunigoj, ...kunigoj.map(k => [k.x, k.z] as [number, number])];
const vojoAlteco = kreiVojoAlton(alteco,
  [...kradajKunigoj.map(([x, z]) => ({ x, z, direktaj: [] as [number, number][] })), ...kunigoj]);
const platoj = new Map<string, number>();
const platoCxe = (x: number, z: number): number => {
  const klavo = x + "," + z;
  let alto = platoj.get(klavo);
  if (alto === undefined) {
    alto = surGrid(vojaSuproDeKunigo(x, z, [], VOJA_EKSTERA_DUONO,
      TERO_PLATO ? alteco : vojoAlteco).supro);
    platoj.set(klavo, alto);
  }
  return alto;
};
const ankroj = ciujKunigoj.map(([x, z]) => ({ x, z, alto: platoCxe(x, z) }));

function punktoCxe(pts: readonly [number, number][], s: number): { x: number; z: number } {
  let kur = 0;
  for (let k = 0; k < pts.length - 1; k++) {
    const [x1, z1] = pts[k], [x2, z2] = pts[k + 1];
    const lo = Math.hypot(x2 - x1, z2 - z1);
    if (s <= kur + lo || k === pts.length - 2) {
      const t = lo < 0o10 ** -0o12 ? 0 : Math.max(0, Math.min(1, (s - kur) / lo));
      return { x: x1 + (x2 - x1) * t, z: z1 + (z2 - z1) * t };
    }
    kur += lo;
  }
  const q = pts[pts.length - 1];
  return { x: q[0], z: q[1] };
}

for (let i = 0; i < VOJOJ.length; i++) {
  const v = VOJOJ[i] as any;
  const duono = (v.pontoLarĝo ?? v.larĝo) / 4 + VOJA_BORDA_LARĜO;
  const p = kreiNivelanProfilon(gluitaj[i], duono, vojoAlteco, akvaFino, ankroj);
  let sumo = 0, maks = 0, maksLoko = "";
  let sumoM = 0, maksM = 0, maksMLoko = "";
  let kasxita = 0;
  // ⟨ កម្រាស់ជញ្ជាំងក្រោមផ្លូវ 📏 ⟩ ៖ ដូចអ្វីដែលហ្គេមសាងសង់ ។
  let muroSumo = 0, muroMaks = 0, muroLoko = "";
  for (let j = 0; j < p.altoj.length; j++) {
    const q = punktoCxe(gluitaj[i], p.situoj[j]);
    const s = p.altoj[j] - alteco(q.x, q.z);
    const m = p.altoj[j] - meshaAlteco(q.x, q.z);
    sumo += s; sumoM += m;
    if (s > maks) { maks = s; maksLoko = `${q.x.toFixed(1)},${q.z.toFixed(1)}`; }
    if (m > maksM) { maksM = m; maksMLoko = `${q.x.toFixed(1)},${q.z.toFixed(1)}`; }
    if (m > 0o1/0o2) kasxita++;
    const qa = punktoCxe(gluitaj[i], p.situoj[j] - 0.1);
    const qb = punktoCxe(gluitaj[i], p.situoj[j] + 0.1);
    const dx = qb.x - qa.x, dz = qb.z - qa.z, dl = Math.hypot(dx, dz) || 1;
    const lx = -dz / dl * duono, lz = dx / dl * duono;
    // ⟨ មុខចំហៀង 📏 ⟩ ៖ កំពូលផ្អៀងតាមជម្រាលចំហៀង ។
    const gMal = vojoAlteco(q.x - lx, q.z - lz);
    const gDek = vojoAlteco(q.x + lx, q.z + lz);
    const klin = Math.min(1.0, Math.abs(gDek - gMal));
    const malPlialta = gMal > gDek;
    const sMal = malPlialta ? p.altoj[j] : p.altoj[j] - klin;
    const sDek = malPlialta ? p.altoj[j] - klin : p.altoj[j];
    const muro = Math.max(sMal - (gMal - 0.25), sDek - (gDek - 0.25));
    muroSumo += muro;
    if (muro > muroMaks) { muroMaks = muro; muroLoko = `${q.x.toFixed(1)},${q.z.toFixed(1)}`; }
  }
  const n = p.altoj.length;
  console.log(`${i} ${v.nomo} : លើសដីរលូន មធ្យម ${(sumo / n).toFixed(2)} ខ្ពស់ ${maks.toFixed(2)} @${maksLoko}` +
    ` | លើសសំណាញ់ មធ្យម ${(sumoM / n).toFixed(2)} ខ្ពស់ ${maksM.toFixed(2)} @${maksMLoko}` +
    ` | គំរូលើស 0.5 ${kasxita}/${n}` +
    ` | ជញ្ជាំង មធ្យម ${(muroSumo / n).toFixed(2)} ខ្ពស់ ${muroMaks.toFixed(2)} @${muroLoko}`);
}

// ⟨ ផ្លូវក្រឡាទីក្រុង 📏 ⟩ ៖ រកផ្លូវដែលរាបយូរជាងគេ ហើយខ្ពស់លើដី ។
const plataj: { nomo: string; longo: number; alto: number; teroMin: number; teroMaks: number; x: number; z: number }[] = [];
for (let i = 0; i < kradajDifinoj.length; i++) {
  const d = kradajDifinoj[i];
  if (!d.pts || d.pts.length < 2) continue;
  const duono = d.w / 2 + VOJA_BORDA_LARĜO;
  const p = kreiNivelanProfilon(d.pts as [number, number][], duono, vojoAlteco, akvaFino, ankroj);
  let s0 = p.situoj[0], nuna = p.altoj[0];
  for (let j = 1; j <= p.altoj.length; j++) {
    if (j === p.altoj.length || p.altoj[j] !== nuna) {
      const s1 = j === p.altoj.length ? p.situoj[p.altoj.length - 1] : p.situoj[j];
      const longo = s1 - s0;
      if (longo > 6) {
        let mn = Infinity, mx = -Infinity;
        for (let u = s0; u <= s1; u += 0.5) {
          const q = punktoCxe(d.pts as [number, number][], u);
          mn = Math.min(mn, alteco(q.x, q.z)); mx = Math.max(mx, alteco(q.x, q.z));
        }
        const q = punktoCxe(d.pts as [number, number][], s0);
        plataj.push({ nomo: `ក្រឡា ${i}`, longo, alto: nuna, teroMin: mn, teroMaks: mx, x: q.x, z: q.z });
      }
      if (j < p.altoj.length) { s0 = p.situoj[j]; nuna = p.altoj[j]; }
    }
  }
}
plataj.sort((a, b) => b.longo - a.longo);
console.log("=== ផ្លូវក្រឡារាបវែង ===");
for (const r of plataj.slice(0, 6))
  console.log(`  ${r.nomo} ${r.longo.toFixed(1)}@${r.alto.toFixed(1)} ដី ${r.teroMin.toFixed(1)}..${r.teroMaks.toFixed(1)}` +
    ` ( ខ្ពស់ ${(r.alto - r.teroMin).toFixed(2)} ) @${r.x.toFixed(0)},${r.z.toFixed(0)}`);

// ⟨ ការលោតកម្ពស់ 📏 ⟩ ៖ កន្លែងដែលផ្លូវចុះ ឬឡើងលើសមួយជំហាន ។
type Salto = { nomo: string; salto: number; de: number; al: number; x: number; z: number };
const saltoj: Salto[] = [];
function skanuSaltojn(nomo: string, pts: [number, number][], duono: number): void {
  const p = kreiNivelanProfilon(pts, duono, vojoAlteco, akvaFino, ankroj);
  for (let j = 1; j < p.altoj.length; j++) {
    const d = p.altoj[j] - p.altoj[j - 1];
    if (Math.abs(d) > 0.5 + 0o10 ** -0o7) {
      const q = punktoCxe(pts, p.situoj[j]);
      saltoj.push({ nomo, salto: d, de: p.altoj[j - 1], al: p.altoj[j], x: q.x, z: q.z });
    }
  }
}
for (let i = 0; i < VOJOJ.length; i++) {
  const v = VOJOJ[i] as any;
  skanuSaltojn(v.nomo, gluitaj[i], (v.pontoLarĝo ?? v.larĝo) / 4 + VOJA_BORDA_LARĜO);
}
for (let i = 0; i < kradajDifinoj.length; i++) {
  const d = kradajDifinoj[i];
  if (!d.pts || d.pts.length < 2) continue;
  skanuSaltojn(`ក្រឡា ${i}`, d.pts as [number, number][], d.w / 2 + VOJA_BORDA_LARĜO);
}
saltoj.sort((a, b) => Math.abs(b.salto) - Math.abs(a.salto));
console.log(`=== លោតលើសមួយជំហាន ${saltoj.length} ===`);
for (const s of saltoj.slice(0, 6))
  console.log(`  ${s.nomo} ${s.de.toFixed(2)} ំ ${s.al.toFixed(2)} ( ${s.salto.toFixed(2)} ) @${s.x.toFixed(0)},${s.z.toFixed(0)}`);
