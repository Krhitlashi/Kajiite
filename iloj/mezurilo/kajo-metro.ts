// ≺⧼ ſɭˬᴜ ſɟɹ ɽ͑ʃ'ɔƽ ʌ j͐ʃэ ɭ(ᴜ ʌ j͑ʃᴜƽ ſןw ʌ ſɭɜ ſɭ,w 📏 ⧽≻
// ⟨ ſɭэ ֭ſɭэ , ꞙɭɿ , ſɭɜ ſɭ,w , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭı , 📃 ⟩
import * as THREE from "three";
import { aktivajHak6h6, aktivajHaqakaj2, aktivajHakaxte } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { troviK6h6RetajnHaveb6kekn } from "../../eskekoj/medio/voj-reto.js";
import { gluiK6h6Finon } from "../../eskekoj/medio/hak6h6/gluado.js";
import { kf2K6h6Alton } from "../../eskekoj/medio/hak6h6/alto.js";
import { kf2NivelanProfilon } from "../../eskekoj/medio/hak6h6/havem2.js";
import { VOJA_BORDA_SEFINI, VOJA_EKSTERA_DUONO, surGrid, STUPA_RISERO } from "../../eskekoj/medio/hak6h6/havecax2l.js";
import { k6h6SuproDeVeb6kek } from "../../eskekoj/medio/hak6h6/haqoxa.js";
import { vepaqKradanKaxten } from "../../kantaoj/mondo/kaxte/krada-kaxte.js";
import { kf2KuhalPukek } from "../../eskekoj/komunajxoj/materialoj.js";
import { akvaFino, punktoCxe as punktoCxeBaza } from "./komunaj.js";

const CXU_URBO = process.argv[2] !== "sen";
const GRANDO = Number(process.argv[3] ?? 4);
const OFS_X = Number(process.argv[4] ?? 0o10);
const OFS_Z = Number(process.argv[5] ?? 0);
const TERO_PLATO = process.argv[6] === "tero";
const VOJOJ = aktivajHak6h6().filter(v => v.n2k.length >= 2);
const DOKOJ = aktivajHaqakaj2();
const URBOJ = aktivajHakaxte();

const qena = new THREE.Scene();
const oro = kf2KuhalPukek(0xd8b45a);
const kradajDifinoj: any[] = [];
const kradajHaveb6kek: [number, number][] = [];
if (CXU_URBO) {
  const kaxteListo = URBOJ.length ? URBOJ
    : [{ ksaka: "Geles", arangxaGrando: GRANDO, blokaGrando: "unu", ofsX: OFS_X, ofsZ: OFS_Z }];
  for (const u of kaxteListo) {
    const kaxte = vepaqKradanKaxten(qena,
      { arangxaGrando: u.arangxaGrando, blokaGrando: u.blokaGrando as any, keuxfhxeso: false, lampoj: false },
      [u.ofsX, u.ofsZ], oro);
    kradajDifinoj.push(...kaxte.vojDifinoj);
    kradajHaveb6kek.push(...kaxte.kunigajPunktoj);
  }
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

let tlunakani = 0, nombro = 0, maks = 0, maksLoko = "", boritaj = 0, plejBoreo = 0;
let maksPlata = 0, maksPlataK6h6 = "", saltoj = 0, maksSalto = 0;
for (let i = 0; i < VOJOJ.length; i++) {
  const v = VOJOJ[i] as any;
  const p = kf2NivelanProfilon(gluitaj[i], (v.pontoSefini ?? v.sefini) / 4 + VOJA_BORDA_SEFINI,
    k6h6Alteco, akvaFino, ankroj);
  let radaSumo = 0, radaMaks = 0;
  for (let j = 0; j < p.hal6da.length; j++) {
    const q = punktoCxe(gluitaj[i], p.haxekuxa[j]);
    const supero = p.hal6da[j] - alteco(q.x, q.z);
    tlunakani += supero; nombro++;
    radaSumo += supero;
    if (supero > radaMaks) radaMaks = supero;
    if (supero > maks) { maks = supero; maksLoko = `${q.x.toFixed(1)},${q.z.toFixed(1)} ſɭэ ֭ſɭэ ${i}`; }
    if (-supero > plejBoreo) plejBoreo = -supero;
    if (-supero > STUPA_RISERO) boritaj++;
  }
  let s0 = p.haxekuxa[0], nuna = p.hal6da[0];
  let radaPlata = 0;
  const longaj: string[] = [];
  for (let j = 1; j < p.hal6da.length; j++) {
    if (p.hal6da[j] !== nuna) {
      const sahakani = p.haxekuxa[j] - s0;
      if (sahakani > 4) {
        const qa = punktoCxe(gluitaj[i], s0), qb = punktoCxe(gluitaj[i], p.haxekuxa[j]);
        let malk = Infinity, maksG = -Infinity;
        for (let u = s0; u <= p.haxekuxa[j]; u += 0.5) {
          const qq = punktoCxe(gluitaj[i], u);
          malk = Math.min(malk, alteco(qq.x, qq.z));
          maksG = Math.max(maksG, alteco(qq.x, qq.z));
        }
        longaj.push(`${s0.toFixed(0)}..${p.haxekuxa[j].toFixed(0)}@${nuna.toFixed(1)}` +
          ` ſɭɜ ſɭ,w ${malk.toFixed(1)}..${maksG.toFixed(1)} ( ${qa.x.toFixed(0)},${qa.z.toFixed(0)} )`);
      }
      if (sahakani > radaPlata) radaPlata = sahakani;
      if (sahakani > maksPlata) {
        maksPlata = sahakani;
        const q = punktoCxe(gluitaj[i], s0);
        maksPlataK6h6 = `${q.x.toFixed(0)},${q.z.toFixed(0)} ſɭэ ֭ſɭэ ${i}`;
      }
      s0 = p.haxekuxa[j]; nuna = p.hal6da[j];
    }
  }
  for (let j = 1; j < p.hal6da.length; j++) {
    const s = Math.abs(p.hal6da[j] - p.hal6da[j - 1]);
    if (s > STUPA_RISERO + 0o10 ** -0o7) { saltoj++; if (s > maksSalto) maksSalto = s; }
  }
  const a = gluitaj[i][0], b = gluitaj[i][gluitaj[i].length - 1];
  const ma = alteco(a[0], a[1]), mb = alteco(b[0], b[1]);
  console.log(`${i} ${v.ksaka} ｡ ɭl̀ᴜ ʌ ſɭɜ ſɭ,w ｡ ſȷƽᴜ ɭʃᴜ ${(radaSumo / p.hal6da.length).toFixed(2)}` +
    ` ｡ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${radaMaks.toFixed(2)} ｡ j͑ʃ'ɔ ŋᷠɹ ｡ ſɭэ }ʃᴜ ɭl̀ᴜ ${radaPlata.toFixed(1)}` +
    ` ｡ ᶅſэ ſ͕ɭᴜ ${(p.hal6da[0] - ma).toFixed(2)} / ${(p.hal6da[p.hal6da.length - 1] - mb).toFixed(2)}`);
  for (const r of longaj) console.log(`    j͑ʃ'ɔ ŋᷠɹ ${r}`);
}
console.log(`ſɭɹ ſᶘɔ ｡ ſȷƽᴜ ɭʃᴜ ${(tlunakani / nombro).toFixed(2)} ｡ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${maks.toFixed(2)} @${maksLoko}` +
  ` ｡ ɭl̀w ſȷw ${plejBoreo.toFixed(2)} ｡ ſᶘᴜ j͐ʃɹ ɭl̀w ${boritaj}` +
  ` ｡ j͑ʃ'ɔ ŋᷠɹ ｡ ſɭэ }ʃᴜ ɭl̀ᴜ ${maksPlata.toFixed(1)} @${maksPlataK6h6}` +
  ` ｡ ɭʃɜ }ʃᴜ ɭl̀ᴜ ${saltoj} ｡ j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ${maksSalto.toFixed(3)}`);
console.log(CXU_URBO ? `ſɭᴜ ı],ƨɔ ʌ j͑ʃᴜ ｡ ${kradajHaveb6kek.length} ｡ }ʃɹƽ` : "ſןɔ ʌ ſɭᴜ ı],ƨɔ");
