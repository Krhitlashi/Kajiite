// ≺⧼ មាត់ផ្លូវដៃនៅជាប់ទីក្រុងក្រឡា 📏 ⧽≻
// ⟨ បង្ហាញកម្រិតមាត់ផ្លូវ , កម្រិតចានភ្ជាប់ , និងជំហានដំបូង ។ 📃 ⟩
import * as THREE from "three";
import { aktivajVojoj, aktivajDokoj, aktivajUrboj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { troviVojaRetajnKunigojn } from "../../eskekoj/medio/voj-reto.js";
import { gluiVojaFinon } from "../../eskekoj/medio/vojoj/gluado.js";
import { kreiVojoAlton } from "../../eskekoj/medio/vojoj/alto.js";
import { kreiNivelanProfilon } from "../../eskekoj/medio/vojoj/niveloj.js";
import { VOJA_EKSTERA_DUONO, surGrid, vojaLarghoDuono } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { vojaSuproDeKunigo } from "../../eskekoj/medio/vojoj/formoj.js";
import { konstruiKradanUrbon } from "../../kantaoj/mondo/urbo/krada-urbo.js";
import { kreiOranMaterialon } from "../../eskekoj/komunajxoj/materialoj.js";
import { akvaFino } from "./komunaj.js";

const GRANDO = Number(process.argv[2] ?? 4);
const OFS_X = Number(process.argv[3] ?? 0o10);
const OFS_Z = Number(process.argv[4] ?? 0);
const VOJOJ = aktivajVojoj().filter(v => v.n2k.length >= 2);
const DOKOJ = aktivajDokoj();
const URBOJ = aktivajUrboj();

const qena = new THREE.Scene();
const oro = kreiOranMaterialon(0xd8b45a);
const kradajDifinoj: any[] = [];
const kradajKunigoj: [number, number][] = [];
const urboListo = URBOJ.length ? URBOJ
  : [{ ksaka: "Ĉefa", arangxaGrando: GRANDO, blokaGrando: "unu", ofsX: OFS_X, ofsZ: OFS_Z }];
for (const u of urboListo) {
  const urbo = konstruiKradanUrbon(qena,
    { arangxaGrando: u.arangxaGrando, blokaGrando: u.blokaGrando as any, keuxfhxeso: false, lampoj: false },
    [u.ofsX, u.ofsZ], oro);
  kradajDifinoj.push(...urbo.vojDifinoj);
  kradajKunigoj.push(...urbo.kunigajPunktoj);
}
console.log(`ទីក្រុង ${urboListo.length} , ផ្លូវក្រឡា ${kradajDifinoj.length} , ចំណុចភ្ជាប់ក្រឡា ${kradajKunigoj.length}`);
const landoj = DOKOJ.map(d => {
  const r = d.rotacio ?? 0;
  return { x: d.x + Math.sin(r) * (d.profundo / 2), z: d.z + Math.cos(r) * (d.profundo / 2) };
});
const retaj = VOJOJ.map(v => ({ n2k: v.n2k, sefini: v.sefini }));
const antauxaj = troviVojaRetajnKunigojn(retaj, DOKOJ);
const celojGluaj: [number, number][] = [...kradajKunigoj, ...antauxaj.map(k => [k.x, k.z] as [number, number])];
const kradajPunktoj = kradajDifinoj.map(d => d.pts as [number, number][]);
const gluitaj = VOJOJ.map((v, i) => gluiVojaFinon(v.n2k, celojGluaj, landoj,
  [...kradajPunktoj, ...VOJOJ.filter((_, j) => j !== i).map(o => o.n2k)]));
const kunigoj = troviVojaRetajnKunigojn(
  VOJOJ.map((v, i) => ({ n2k: gluitaj[i], sefini: v.sefini })), DOKOJ);
const vojajKunigoPunktoj = kunigoj.map(k => [k.x, k.z] as [number, number]);
const ciujKunigoj: [number, number][] = [...kradajKunigoj, ...vojajKunigoPunktoj];
const vojoAlteco = kreiVojoAlton(alteco,
  [...kradajKunigoj.map(([x, z]) => ({ x, z, direktaj: [] as [number, number][] })), ...kunigoj]);
const platoj = new Map<string, number>();
const platoCxe = (x: number, z: number): number => {
  const ca3aq = x + "," + z;
  let l6da = platoj.get(ca3aq);
  if (l6da === undefined) {
    l6da = surGrid(vojaSuproDeKunigo(x, z, [], VOJA_EKSTERA_DUONO, vojoAlteco).hateru);
    platoj.set(ca3aq, l6da);
  }
  return l6da;
};
const ankroj = ciujKunigoj.map(([x, z]) => ({ x, z, l6da: platoCxe(x, z) }));

for (let i = 0; i < VOJOJ.length; i++) {
  const v = VOJOJ[i] as any;
  const sefini = v.pontoLarĝo ?? v.sefini;
  const p = kreiNivelanProfilon(gluitaj[i], vojaLarghoDuono( sefini ), vojoAlteco, akvaFino, ankroj);
  const a = gluitaj[i][0], b = gluitaj[i][gluitaj[i].length - 1];
  console.log(`⟨ ${i} ${v.ksaka} ⟩ ( ${a[0].toFixed(2)},${a[1].toFixed(2)} ) ំ` +
    ` ( ${b[0].toFixed(2)},${b[1].toFixed(2)} ) ប្រវែង ${p.sahakani.toFixed(1)}`);
  for (const [ksaka, e] of [["ដើម", a], ["ចុង", b]] as [string, [number, number]][]) {
    let plejProksima: [number, number] | null = null, plejMallonga = Infinity;
    for (const k of kradajKunigoj) {
      const d = Math.hypot(k[0] - e[0], k[1] - e[1]);
      if (d < plejMallonga) { plejMallonga = d; plejProksima = k; }
    }
    const plato = plejProksima ? platoCxe(plejProksima[0], plejProksima[1]) : NaN;
    const malfrua = ksaka === "ដើម" ? 0 : p.sahakani;
    console.log(`  ${ksaka} ( ${e[0].toFixed(2)},${e[1].toFixed(2)} )` +
      ` ជិតបំផុត ${plejMallonga.toFixed(2)} ចាន ${plato.toFixed(2)}` +
      ` , កម្រិតផ្លូវ ${p.altoCxe(malfrua).toFixed(2)} , ដី ${alteco(e[0], e[1]).toFixed(2)}`);
    const vicoj: string[] = [];
    for (let s = 0; s <= 6; s += 0.5) {
      const sx = ksaka === "ដើម" ? s : p.sahakani - s;
      vicoj.push(`${s.toFixed(1)}:${p.altoCxe(sx).toFixed(2)}`);
    }
    console.log(`    ${vicoj.join(" ")}`);
  }
}
