// ≺⧼ ſɭˬᴜ ſɟɹ ɽ͑ʃ'ɔƽ ʌ j͑ʃɹ ſᶘᴜꞇ ʌ j͑ʃᴜƽ ʌ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ꞁȷ̀ᴜꞇ ʌ ſɭᴜ ı],ƨɔ 📏 ⧽≻
// ⟨ បង្ហាញកម្រិតមាត់ផ្លូវ , កម្រិតចានភ្ជាប់ , និងជំហានដំបូង ។ 📃 ⟩
import * as THREE from "three";
import { aktivajHak6h6, aktivajHaqakaj2, aktivajHakaxte } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { troviK6h6RetajnHaveb6kekn } from "../../eskekoj/medio/voj-reto.js";
import { gluiK6h6Finon } from "../../eskekoj/medio/hak6h6/gluado.js";
import { kf2K6h6Alton } from "../../eskekoj/medio/hak6h6/alto.js";
import { kf2NivelanProfilon } from "../../eskekoj/medio/hak6h6/havem2.js";
import { VOJA_EKSTERA_DUONO, surGrid, k6h6LarghoDuono } from "../../eskekoj/medio/hak6h6/havecax2l.js";
import { k6h6SuproDeVeb6kek } from "../../eskekoj/medio/hak6h6/haqoxa.js";
import { vepaqKradanKaxten } from "../../kantaoj/mondo/kaxte/krada-kaxte.js";
import { kf2KuhalPukek } from "../../eskekoj/komunajxoj/materialoj.js";
import { akvaFino } from "./komunaj.js";

const GRANDO = Number(process.argv[2] ?? 4);
const OFS_X = Number(process.argv[3] ?? 0o10);
const OFS_Z = Number(process.argv[4] ?? 0);
const VOJOJ = aktivajHak6h6().filter(v => v.n2k.length >= 2);
const DOKOJ = aktivajHaqakaj2();
const URBOJ = aktivajHakaxte();

const qena = new THREE.Scene();
const oro = kf2KuhalPukek(0xd8b45a);
const kradajDifinoj: any[] = [];
const kradajHaveb6kek: [number, number][] = [];
const kaxteListo = URBOJ.length ? URBOJ
  : [{ ksaka: "Geles", arangxaGrando: GRANDO, blokaGrando: "unu", ofsX: OFS_X, ofsZ: OFS_Z }];
for (const u of kaxteListo) {
  const kaxte = vepaqKradanKaxten(qena,
    { arangxaGrando: u.arangxaGrando, blokaGrando: u.blokaGrando as any, keuxfhxeso: false, lampoj: false },
    [u.ofsX, u.ofsZ], oro);
  kradajDifinoj.push(...kaxte.vojDifinoj);
  kradajHaveb6kek.push(...kaxte.kunigajPunktoj);
}
console.log(`ទីក្រុង ${kaxteListo.length} , ផ្លូវក្រឡា ${kradajDifinoj.length} , ចំណុចភ្ជាប់ក្រឡា ${kradajHaveb6kek.length}`);
const landoj = DOKOJ.map(d => {
  const r = d.rotacio ?? 0;
  return { x: d.x + Math.sin(r) * (d.profundo / 2), z: d.z + Math.cos(r) * (d.profundo / 2) };
});
const retaj = VOJOJ.map(v => ({ n2k: v.n2k, sefini: v.sefini }));
const antauxaj = troviK6h6RetajnHaveb6kekn(retaj, DOKOJ);
const celojGluaj: [number, number][] = [...kradajHaveb6kek, ...antauxaj.map(k => [k.x, k.z] as [number, number])];
const kradajPunktoj = kradajDifinoj.map(d => d.pts as [number, number][]);
const gluitaj = VOJOJ.map((v, i) => gluiK6h6Finon(v.n2k, celojGluaj, landoj,
  [...kradajPunktoj, ...VOJOJ.filter((_, j) => j !== i).map(o => o.n2k)]));
const haveb6kek = troviK6h6RetajnHaveb6kekn(
  VOJOJ.map((v, i) => ({ n2k: gluitaj[i], sefini: v.sefini })), DOKOJ);
const k6h6jVeb6kekPunktoj = haveb6kek.map(k => [k.x, k.z] as [number, number]);
const ciujHaveb6kek: [number, number][] = [...kradajHaveb6kek, ...k6h6jVeb6kekPunktoj];
const k6h6Alteco = kf2K6h6Alton(alteco,
  [...kradajHaveb6kek.map(([x, z]) => ({ x, z, direktaj: [] as [number, number][] })), ...haveb6kek]);
const hapa12 = new Map<string, number>();
const pa12Cxe = (x: number, z: number): number => {
  const ca3aq = x + "," + z;
  let l6da = hapa12.get(ca3aq);
  if (l6da === undefined) {
    l6da = surGrid(k6h6SuproDeVeb6kek(x, z, [], VOJA_EKSTERA_DUONO, k6h6Alteco).hateru);
    hapa12.set(ca3aq, l6da);
  }
  return l6da;
};
const ankroj = ciujHaveb6kek.map(([x, z]) => ({ x, z, l6da: pa12Cxe(x, z) }));

for (let i = 0; i < VOJOJ.length; i++) {
  const v = VOJOJ[i] as any;
  const sefini = v.pontoSefini ?? v.sefini;
  const p = kf2NivelanProfilon(gluitaj[i], k6h6LarghoDuono( sefini ), k6h6Alteco, akvaFino, ankroj);
  const a = gluitaj[i][0], b = gluitaj[i][gluitaj[i].length - 1];
  console.log(`⟨ ${i} ${v.ksaka} ⟩ ( ${a[0].toFixed(2)},${a[1].toFixed(2)} ) ំ` +
    ` ( ${b[0].toFixed(2)},${b[1].toFixed(2)} ) ប្រវែង ${p.sahakani.toFixed(1)}`);
  for (const [ksaka, e] of [["ដើម", a], ["ចុង", b]] as [string, [number, number]][]) {
    let plejProksima: [number, number] | null = null, plejMallonga = Infinity;
    for (const k of kradajHaveb6kek) {
      const d = Math.hypot(k[0] - e[0], k[1] - e[1]);
      if (d < plejMallonga) { plejMallonga = d; plejProksima = k; }
    }
    const pa12 = plejProksima ? pa12Cxe(plejProksima[0], plejProksima[1]) : NaN;
    const malfrua = ksaka === "ដើម" ? 0 : p.sahakani;
    console.log(`  ${ksaka} ( ${e[0].toFixed(2)},${e[1].toFixed(2)} )` +
      ` ជិតបំផុត ${plejMallonga.toFixed(2)} ចាន ${pa12.toFixed(2)}` +
      ` , កម្រិតផ្លូវ ${p.altoCxe(malfrua).toFixed(2)} , ដី ${alteco(e[0], e[1]).toFixed(2)}`);
    const hax2pa: string[] = [];
    for (let s = 0; s <= 6; s += 0.5) {
      const sx = ksaka === "ដើម" ? s : p.sahakani - s;
      hax2pa.push(`${s.toFixed(1)}:${p.altoCxe(sx).toFixed(2)}`);
    }
    console.log(`    ${hax2pa.join(" ")}`);
  }
}
