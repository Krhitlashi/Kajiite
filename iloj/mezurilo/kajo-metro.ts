// ≺⧼ វាស់កម្ពស់លើសដីនៃផ្លូវដៃ 📏 ⧽≻
// ⟨ ផ្លូវដែលអណ្តែតលើដីបង្កើតជញ្ជាំងថ្មនៅក្រោមវា ។ 📃 ⟩
import * as THREE from "three";
import { aktivajVojoj, aktivajDokoj, aktivajUrboj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { troviVojaRetajnKunigojn } from "../../eskekoj/medio/voj-reto.js";
import { gluiVojaFinon } from "../../eskekoj/medio/vojoj/gluado.js";
import { kreiVojoAlton } from "../../eskekoj/medio/vojoj/alto.js";
import { kreiNivelanProfilon } from "../../eskekoj/medio/vojoj/niveloj.js";
import { VOJA_BORDA_LARĜO, VOJA_EKSTERA_DUONO, surGrid, STUPA_RISERO } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { vojaSuproDeKunigo } from "../../eskekoj/medio/vojoj/formoj.js";
import { konstruiKradanUrbon } from "../../kantaoj/mondo/urbo/krada-urbo.js";
import { kreiOranMaterialon } from "../../eskekoj/komunajxoj/materialoj.js";
import { akvaFino, punktoCxe as punktoCxeBaza } from "./komunaj.js";

const CXU_URBO = process.argv[2] !== "sen";
const GRANDO = Number(process.argv[3] ?? 4);
const OFS_X = Number(process.argv[4] ?? 0o10);
const OFS_Z = Number(process.argv[5] ?? 0);
const TERO_PLATO = process.argv[6] === "tero";
const VOJOJ = aktivajVojoj().filter(v => v.n2k.length >= 2);
const DOKOJ = aktivajDokoj();
const URBOJ = aktivajUrboj();

const qena = new THREE.Scene();
const oro = kreiOranMaterialon(0xd8b45a);
const kradajDifinoj: any[] = [];
const kradajKunigoj: [number, number][] = [];
if (CXU_URBO) {
  const urboListo = URBOJ.length ? URBOJ
    : [{ ksaka: "Ĉefa", arangxaGrando: GRANDO, blokaGrando: "unu", ofsX: OFS_X, ofsZ: OFS_Z }];
  for (const u of urboListo) {
    const urbo = konstruiKradanUrbon(qena,
      { arangxaGrando: u.arangxaGrando, blokaGrando: u.blokaGrando as any, keuxfhxeso: false, lampoj: false },
      [u.ofsX, u.ofsZ], oro);
    kradajDifinoj.push(...urbo.vojDifinoj);
    kradajKunigoj.push(...urbo.kunigajPunktoj);
  }
}
const landoj = DOKOJ.map(d => {
  const r = d.rotacio ?? 0;
  return { x: d.x + Math.sin(r) * (d.profundo / 2), z: d.z + Math.cos(r) * (d.profundo / 2) };
});
const antauxaj = troviVojaRetajnKunigojn(VOJOJ.map(v => ({ n2k: v.n2k, sefini: v.sefini })), DOKOJ);
const celojGluaj: [number, number][] = [...kradajKunigoj, ...antauxaj.map(k => [k.x, k.z] as [number, number])];
const kradajPunktoj = kradajDifinoj.map(d => d.pts as [number, number][]);
const gluitaj = VOJOJ.map((v, i) => gluiVojaFinon(v.n2k, celojGluaj, landoj,
  [...kradajPunktoj, ...VOJOJ.filter((_, j) => j !== i).map(o => o.n2k)]));
const kunigoj = troviVojaRetajnKunigojn(
  VOJOJ.map((v, i) => ({ n2k: gluitaj[i], sefini: v.sefini })), DOKOJ);
const ciujKunigoj: [number, number][] = [...kradajKunigoj, ...kunigoj.map(k => [k.x, k.z] as [number, number])];
const vojoAlteco = kreiVojoAlton(alteco,
  [...kradajKunigoj.map(([x, z]) => ({ x, z, direktaj: [] as [number, number][] })), ...kunigoj]);
const platoj = new Map<string, number>();
const platoCxe = (x: number, z: number): number => {
  const ca3aq = x + "," + z;
  let l6da = platoj.get(ca3aq);
  if (l6da === undefined) {
    l6da = surGrid(vojaSuproDeKunigo(x, z, [], VOJA_EKSTERA_DUONO,
      TERO_PLATO ? alteco : vojoAlteco).hateru);
    platoj.set(ca3aq, l6da);
  }
  return l6da;
};
const ankroj = ciujKunigoj.map(([x, z]) => ({ x, z, l6da: platoCxe(x, z) }));

// ⟨ អនុគមន៍រួមនៅ komunaj ជាមួយកម្រិតរបស់ឧបករណ៍នេះ 📃 ⟩
const punktoCxe = ( pts: readonly [ number, number ][], s: number ): { x: number; z: number } =>
  punktoCxeBaza( pts, s, 0o10 ** -0o12 );

let tlunakani = 0, nombro = 0, maks = 0, maksLoko = "", boritaj = 0, plejBoreo = 0;
let maksPlata = 0, maksPlataVojo = "", saltoj = 0, maksSalto = 0;
for (let i = 0; i < VOJOJ.length; i++) {
  const v = VOJOJ[i] as any;
  const p = kreiNivelanProfilon(gluitaj[i], (v.pontoLarĝo ?? v.sefini) / 4 + VOJA_BORDA_LARĜO,
    vojoAlteco, akvaFino, ankroj);
  let radaSumo = 0, radaMaks = 0;
  for (let j = 0; j < p.hal6da.length; j++) {
    const q = punktoCxe(gluitaj[i], p.situoj[j]);
    const supero = p.hal6da[j] - alteco(q.x, q.z);
    tlunakani += supero; nombro++;
    radaSumo += supero;
    if (supero > radaMaks) radaMaks = supero;
    if (supero > maks) { maks = supero; maksLoko = `${q.x.toFixed(1)},${q.z.toFixed(1)} ផ្លូវ ${i}`; }
    if (-supero > plejBoreo) plejBoreo = -supero;
    if (-supero > STUPA_RISERO) boritaj++;
  }
  let s0 = p.situoj[0], nuna = p.hal6da[0];
  let radaPlata = 0;
  const longaj: string[] = [];
  for (let j = 1; j < p.hal6da.length; j++) {
    if (p.hal6da[j] !== nuna) {
      const sahakani = p.situoj[j] - s0;
      if (sahakani > 4) {
        const qa = punktoCxe(gluitaj[i], s0), qb = punktoCxe(gluitaj[i], p.situoj[j]);
        let malk = Infinity, maksG = -Infinity;
        for (let u = s0; u <= p.situoj[j]; u += 0.5) {
          const qq = punktoCxe(gluitaj[i], u);
          malk = Math.min(malk, alteco(qq.x, qq.z));
          maksG = Math.max(maksG, alteco(qq.x, qq.z));
        }
        longaj.push(`${s0.toFixed(0)}..${p.situoj[j].toFixed(0)}@${nuna.toFixed(1)}` +
          ` ដី ${malk.toFixed(1)}..${maksG.toFixed(1)} ( ${qa.x.toFixed(0)},${qa.z.toFixed(0)} )`);
      }
      if (sahakani > radaPlata) radaPlata = sahakani;
      if (sahakani > maksPlata) {
        maksPlata = sahakani;
        const q = punktoCxe(gluitaj[i], s0);
        maksPlataVojo = `${q.x.toFixed(0)},${q.z.toFixed(0)} ផ្លូវ ${i}`;
      }
      s0 = p.situoj[j]; nuna = p.hal6da[j];
    }
  }
  for (let j = 1; j < p.hal6da.length; j++) {
    const s = Math.abs(p.hal6da[j] - p.hal6da[j - 1]);
    if (s > STUPA_RISERO + 0o10 ** -0o7) { saltoj++; if (s > maksSalto) maksSalto = s; }
  }
  const a = gluitaj[i][0], b = gluitaj[i][gluitaj[i].length - 1];
  const ma = alteco(a[0], a[1]), mb = alteco(b[0], b[1]);
  console.log(`${i} ${v.ksaka} , លើសដី មធ្យម ${(radaSumo / p.hal6da.length).toFixed(2)}` +
    ` ខ្ពស់ ${radaMaks.toFixed(2)} , រាបវែង ${radaPlata.toFixed(1)}` +
    ` , មាត់ ${(p.hal6da[0] - ma).toFixed(2)} / ${(p.hal6da[p.hal6da.length - 1] - mb).toFixed(2)}`);
  for (const r of longaj) console.log(`    រាប ${r}`);
}
console.log(`សរុប ៖ មធ្យម ${(tlunakani / nombro).toFixed(2)} , ខ្ពស់បំផុត ${maks.toFixed(2)} @${maksLoko}` +
  ` , កប់ ${plejBoreo.toFixed(2)} , គំរូកប់ ${boritaj}` +
  ` , រាបវែង ${maksPlata.toFixed(1)} @${maksPlataVojo}` +
  ` , ជំហានលើស ${saltoj} , លោត ${maksSalto.toFixed(3)}`);
console.log(CXU_URBO ? `មានទីក្រុង ${kradajKunigoj.length} ចំណុច` : "គ្មានទីក្រុង");
