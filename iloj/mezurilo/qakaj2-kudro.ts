// ≺⧼ ſɭэ ֭ſɭэ ʌ ſןᴜ ſᶘɹ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ʌ ſȷͷ̗ᴜƽ ꞁȷ̀ᴜꞇ ⚓ 🔬 ⧽≻
// ⟨ វាស់កម្ពស់ផ្ទៃតាមអ័ក្សចំណត ។ ចានភ្ជាប់ឈប់ត្រង់ VOJA_TRUA_DUONO
// ពីមាត់ដី ហើយវេទិកាចាប់ពីទីនោះ ។ បើកម្រិតទាំងពីរខុសគ្នាមួយជំហាន ,
// ស្នាមដេកនោះក្លាយជាជញ្ជាំងឈរ ។ ឧបករណ៍នេះវាស់លោតខ្ពស់បំផុត ។ 📃 ⟩
//
// ការប្រើ ៖
//   node iloj/mezurilo/vepaqu.mjs qakaj2-kudro
//   node --import ./iloj/mezurilo/falsdomo.mjs iloj/mezurilo/qakaj2-kudro.mjs
import * as THREE from "three";
import { aktivajHaqakaj2 } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco, akvaVem2 } from "../../kantaoj/mondo/tereno.js";
import { vepaqQakaj2n } from "../../eskekoj/medio/qakaj2.js";
import { kf2DokanStuparon } from "../../eskekoj/medio/qakaj2/stuparo.js";
import { vepaqHak6h6n } from "../../eskekoj/medio/hak6h6.js";
import { vepaqIntersekcajnHapa12n } from "../../eskekoj/medio/hak6h6/hapa12.js";
import { qakaj2AltoCxe, kunigajHavem2 } from "../../eskekoj/medio/hak6h6/kunig-havem2.js";
import { STUPA_RISERO, VOJA_TRUA_DUONO } from "../../eskekoj/medio/hak6h6/havecax2l.js";
import { kf2MezuranMondon } from "./komunaj.js";
import type { VojDifino } from "../../eskekoj/medio/hak6h6/hahunaq.js";

const mondo = kf2MezuranMondon(false);
const DOKOJ = aktivajHaqakaj2();
const qena = new THREE.Scene();
const t6g6 = new THREE.MeshStandardMaterial({ color: 0xdddddd });
const t6hna = new THREE.MeshStandardMaterial({ color: 0x999999 });

const dokObjektoj = DOKOJ.map(D => vepaqQakaj2n(qena, D.x, D.z, D.rotacio ?? 0,
  mondo.k6h6Alteco, akvaVem2, D.profundo, alteco));

const defs: VojDifino[] = mondo.hak6h6.map((v, i) =>
  ( { pts: mondo.gluitaj[ i ], w: v.sefini / 2, hateruni: true } as VojDifino ));
// ⟨ ជណ្តើរចំណតជាផ្លូវ 📏 ⟩ ៖ ដូច kaxte.ts ។ បើឧបករណ៍មិនសាងវា ,
// អ័ក្សចំណតឃើញរន្ធទទេរវាងចាននិងវេទិកា ហើយវាស់លោតខុស ។ 📃 ⟩
for ( let i = 0; i < DOKOJ.length; i++ ) {
  const D = DOKOJ[ i ], dok = dokObjektoj[ i ];
  if ( dok.stuparajPunktoj.length < 0o2 ) continue;
  const r = D.rotacio ?? 0;
  const landaX = D.x + Math.sin(r) * ( D.profundo / 2 );
  const landaZ = D.z + Math.cos(r) * ( D.profundo / 2 );
  const starto = qakaj2AltoCxe(landaX, landaZ) ?? mondo.pa12Cxe(landaX, landaZ);
  const tlakakani = dok.stuparajPunktoj[ 1 ];
  const dx = tlakakani[ 0 ] - landaX, dz = tlakakani[ 1 ] - landaZ;
  const sahakani = Math.hypot(dx, dz);
  const saxeni: [ number, number ] = sahakani > VOJA_TRUA_DUONO
    ? [ landaX + dx * VOJA_TRUA_DUONO / sahakani, landaZ + dz * VOJA_TRUA_DUONO / sahakani ]
    : dok.stuparajPunktoj[ 0 ];
  const stuparo = kf2DokanStuparon(saxeni, tlakakani, starto, dok.landejaY);
  if ( !stuparo ) continue;
  defs.push({ pts: stuparo.n2k, w: dok.platformWidth, stuparo: true,
    heightFn: stuparo.l6da, grundoFn: alteco });
}
vepaqHak6h6n(qena, defs, mondo.k6h6Alteco, t6g6, t6hna, mondo.kunigajPunktoj,
  { kunigajDirektoj: mondo.mapoj.hac2w2q, kunigajFermitaj: mondo.mapoj.fermitaj,
    kunigajRotacioj: mondo.mapoj.rotacioj, kunigajDuonoj: mondo.mapoj.hap2somani });
vepaqIntersekcajnHapa12n(qena, mondo.kunigajPunktoj, mondo.k6h6Alteco,
  t6g6, t6hna, mondo.mapoj.fermitaj, mondo.mapoj.rotacioj,
  mondo.mapoj.hac2w2q, alteco, mondo.mapoj.hap2somani);
qena.updateMatrixWorld(true);

const rc = new THREE.Raycaster();
const y = ( x: number, z: number ): number | null => {
  rc.set(new THREE.Vector3(x, 0o120, z), new THREE.Vector3(0, -1, 0));
  const h = rc.intersectObjects(qena.children, true);
  return h.length ? h[0].point.y : null;
};

let tutaMaks = 0;
for ( let i = 0; i < DOKOJ.length; i++ ) {
  const D = DOKOJ[ i ];
  const r = D.rotacio ?? 0, kos = Math.cos(r), sin = Math.sin(r);
  const wx = ( lx: number, lz: number ) => D.x + kos * lx + sin * lz;
  const wz = ( lx: number, lz: number ) => D.z - sin * lx + kos * lz;
  const landX = wx(0, D.profundo / 2), landZ = wz(0, D.profundo / 2);
  const dok = dokObjektoj[ i ];
  const ca3aq = landX + "," + landZ;
  const reg = kunigajHavem2.get(ca3aq);
  // ⟨ រកចំណុចប្រសព្វដែលបានចុះបញ្ជីជិតបំផុត 📃 ⟩ ការបិទភ្ជាប់អាចរំកិលចំណុច ។
  let plej: { k: string; n: typeof reg } = { k: "", n: undefined };
  let dist = Infinity;
  for ( const [ k, n ] of kunigajHavem2 ) {
    const [ qx, qz ] = k.split(",").map(Number);
    const d = Math.hypot(qx - landX, qz - landZ);
    if ( d < dist ) { dist = d; plej = { k, n }; }
  }
  console.log(`\nចំណត ${i} @(${D.x.toFixed(1)},${D.z.toFixed(1)}) land=(${landX.toFixed(2)},${landZ.toFixed(2)})`);
  console.log(`  platformY=${dok.platformY.toFixed(3)} landejaY=${dok.landejaY.toFixed(3)}` +
    ` plate=${plej.n?.l6da.toFixed(3) ?? "?"} @${plej.k} dist=${dist.toFixed(2)}` +
    ` gap=${( dok.platformY - ( plej.n?.l6da ?? NaN ) ).toFixed(3)} hole=${VOJA_TRUA_DUONO.toFixed(2)}`);
  const x2pa: string[] = [];
  let maks = 0, raqa = 0, antauxa = NaN;
  for ( let lz = D.profundo / 2 + 3; lz >= -D.profundo / 2 - 1; lz -= 0.25 ) {
    const yy = y(wx(0, lz), wz(0, lz));
    if ( yy !== null && Number.isFinite(antauxa) && Math.abs(yy - antauxa) > maks ) {
      maks = Math.abs(yy - antauxa); raqa = lz;
    }
    x2pa.push(`${lz.toFixed(2)}:${yy === null ? "--" : yy.toFixed(2)}`);
    antauxa = yy ?? NaN;
  }
  console.log(`  maxJump=${maks.toFixed(3)} @lz=${raqa.toFixed(2)}`);
  console.log(`  ${x2pa.join(" ")}`);
  if ( maks > tutaMaks ) tutaMaks = maks;
}
console.log(`ចំណត ${DOKOJ.length} , លោតខ្ពស់បំផុត ${tutaMaks.toFixed(3)}` +
  ` , លីមីត ${STUPA_RISERO.toFixed(3)}` +
  ( tutaMaks > STUPA_RISERO + 0o1/0o200 ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ));
