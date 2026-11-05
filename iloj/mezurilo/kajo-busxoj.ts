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
const OFS_X = Number(process.argv[3] ?? 8);
const OFS_Z = Number(process.argv[4] ?? 0);
const VOJOJ = aktivajVojoj().filter(v => v.punktoj.length >= 2);
const DOKOJ = aktivajDokoj();
const URBOJ = aktivajUrboj();

const sceno = new THREE.Scene();
const oro = kreiOranMaterialon(0xd8b45a);
const kradajDifinoj: any[] = [];
const kradajKunigoj: [number, number][] = [];
const urboListo = URBOJ.length ? URBOJ
  : [{ nomo: "Ĉefa", arangxaGrando: GRANDO, blokaGrando: "unu", ofsX: OFS_X, ofsZ: OFS_Z }];
for (const u of urboListo) {
  const urbo = konstruiKradanUrbon(sceno,
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
const retaj = VOJOJ.map(v => ({ punktoj: v.punktoj, larĝo: v.larĝo }));
const antauxaj = troviVojaRetajnKunigojn(retaj, DOKOJ);
const celojGluaj: [number, number][] = [...kradajKunigoj, ...antauxaj.map(k => [k.x, k.z] as [number, number])];
const kradajPunktoj = kradajDifinoj.map(d => d.pts as [number, number][]);
const gluitaj = VOJOJ.map((v, i) => gluiVojaFinon(v.punktoj, celojGluaj, landoj,
  [...kradajPunktoj, ...VOJOJ.filter((_, j) => j !== i).map(o => o.punktoj)]));
const kunigoj = troviVojaRetajnKunigojn(
  VOJOJ.map((v, i) => ({ punktoj: gluitaj[i], larĝo: v.larĝo })), DOKOJ);
const vojajKunigoPunktoj = kunigoj.map(k => [k.x, k.z] as [number, number]);
const ciujKunigoj: [number, number][] = [...kradajKunigoj, ...vojajKunigoPunktoj];
const vojoAlteco = kreiVojoAlton(alteco,
  [...kradajKunigoj.map(([x, z]) => ({ x, z, direktaj: [] as [number, number][] })), ...kunigoj]);
const platoj = new Map<string, number>();
const platoCxe = (x: number, z: number): number => {
  const klavo = x + "," + z;
  let alto = platoj.get(klavo);
  if (alto === undefined) {
    alto = surGrid(vojaSuproDeKunigo(x, z, [], VOJA_EKSTERA_DUONO, vojoAlteco).supro);
    platoj.set(klavo, alto);
  }
  return alto;
};
const ankroj = ciujKunigoj.map(([x, z]) => ({ x, z, alto: platoCxe(x, z) }));

for (let i = 0; i < VOJOJ.length; i++) {
  const v = VOJOJ[i] as any;
  const larĝo = v.pontoLarĝo ?? v.larĝo;
  const p = kreiNivelanProfilon(gluitaj[i], vojaLarghoDuono( larĝo ), vojoAlteco, akvaFino, ankroj);
  const a = gluitaj[i][0], b = gluitaj[i][gluitaj[i].length - 1];
  console.log(`⟨ ${i} ${v.nomo} ⟩ ( ${a[0].toFixed(2)},${a[1].toFixed(2)} ) ំ` +
    ` ( ${b[0].toFixed(2)},${b[1].toFixed(2)} ) ប្រវែង ${p.longo.toFixed(1)}`);
  for (const [nomo, e] of [["ដើម", a], ["ចុង", b]] as [string, [number, number]][]) {
    let plejProksima: [number, number] | null = null, plejMallonga = Infinity;
    for (const k of kradajKunigoj) {
      const d = Math.hypot(k[0] - e[0], k[1] - e[1]);
      if (d < plejMallonga) { plejMallonga = d; plejProksima = k; }
    }
    const plato = plejProksima ? platoCxe(plejProksima[0], plejProksima[1]) : NaN;
    const malfrua = nomo === "ដើម" ? 0 : p.longo;
    console.log(`  ${nomo} ( ${e[0].toFixed(2)},${e[1].toFixed(2)} )` +
      ` ជិតបំផុត ${plejMallonga.toFixed(2)} ចាន ${plato.toFixed(2)}` +
      ` , កម្រិតផ្លូវ ${p.altoCxe(malfrua).toFixed(2)} , ដី ${alteco(e[0], e[1]).toFixed(2)}`);
    const vicoj: string[] = [];
    for (let s = 0; s <= 6; s += 0.5) {
      const sx = nomo === "ដើម" ? s : p.longo - s;
      vicoj.push(`${s.toFixed(1)}:${p.altoCxe(sx).toFixed(2)}`);
    }
    console.log(`    ${vicoj.join(" ")}`);
  }
}
