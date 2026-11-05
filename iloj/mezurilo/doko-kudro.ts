// ≺⧼ ស្នាមដេក ផ្លូវ → ចានភ្ជាប់ → ចំណត ⚓ 🔬 ⧽≻
// ⟨ វាស់កម្ពស់ផ្ទៃតាមអ័ក្សចំណត ។ ចានភ្ជាប់ឈប់ត្រង់ VOJA_TRUA_DUONO
// ពីមាត់ដី ហើយវេទិកាចាប់ពីទីនោះ ។ បើកម្រិតទាំងពីរខុសគ្នាមួយជំហាន ,
// ស្នាមដេកនោះក្លាយជាជញ្ជាំងឈរ ។ ឧបករណ៍នេះវាស់លោតខ្ពស់បំផុត ។ 📃 ⟩
//
// ការប្រើ ៖
//   node iloj/mezurilo/konstruu.mjs doko-kudro
//   node --import ./iloj/mezurilo/falsdomo.mjs iloj/mezurilo/doko-kudro.mjs
import * as THREE from "three";
import { aktivajDokoj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco, akvaNivelo } from "../../kantaoj/mondo/tereno.js";
import { konstruiDokon } from "../../eskekoj/medio/doko.js";
import { konstruiVojojn } from "../../eskekoj/medio/vojoj.js";
import { konstruiIntersekcajnPlatojn } from "../../eskekoj/medio/vojoj/platoj.js";
import { kunigajNiveloj } from "../../eskekoj/medio/vojoj/kunig-niveloj.js";
import { STUPA_RISERO, VOJA_TRUA_DUONO } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { kreiMezuranMondon } from "./komunaj.js";
import type { VojDifino } from "../../eskekoj/medio/vojoj/tipoj.js";

const mondo = kreiMezuranMondon(false);
const DOKOJ = aktivajDokoj();
const sceno = new THREE.Scene();
const diorito = new THREE.MeshStandardMaterial({ color: 0xdddddd });
const andezito = new THREE.MeshStandardMaterial({ color: 0x999999 });

const dokObjektoj = DOKOJ.map(D => konstruiDokon(sceno, D.x, D.z, D.rotacio ?? 0,
  mondo.vojoAlteco, akvaNivelo, D.profundo, alteco));

const defs: VojDifino[] = mondo.vojoj.map((v, i) =>
  ( { pts: mondo.gluitaj[ i ], w: v.larĝo / 2, kapoj: true } as VojDifino ));
konstruiVojojn(sceno, defs, mondo.vojoAlteco, diorito, andezito, mondo.kunigajPunktoj,
  { kunigajDirektoj: mondo.mapoj.direktoj, kunigajFermitaj: mondo.mapoj.fermitaj,
    kunigajRotacioj: mondo.mapoj.rotacioj, kunigajDuonoj: mondo.mapoj.duonoj });
konstruiIntersekcajnPlatojn(sceno, mondo.kunigajPunktoj, mondo.vojoAlteco,
  diorito, andezito, mondo.mapoj.fermitaj, mondo.mapoj.rotacioj,
  mondo.mapoj.direktoj, alteco, mondo.mapoj.duonoj);
sceno.updateMatrixWorld(true);

const rc = new THREE.Raycaster();
const y = ( x: number, z: number ): number | null => {
  rc.set(new THREE.Vector3(x, 80, z), new THREE.Vector3(0, -1, 0));
  const h = rc.intersectObjects(sceno.children, true);
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
  const klavo = landX + "," + landZ;
  const reg = kunigajNiveloj.get(klavo);
  // ⟨ find the nearest registered intersection (gluing may shift the point) ⟩
  let plej: { k: string; n: typeof reg } = { k: "", n: undefined };
  let dist = Infinity;
  for ( const [ k, n ] of kunigajNiveloj ) {
    const [ qx, qz ] = k.split(",").map(Number);
    const d = Math.hypot(qx - landX, qz - landZ);
    if ( d < dist ) { dist = d; plej = { k, n }; }
  }
  console.log(`\nចំណត ${i} @(${D.x.toFixed(1)},${D.z.toFixed(1)}) land=(${landX.toFixed(2)},${landZ.toFixed(2)})`);
  console.log(`  platformY=${dok.platformY.toFixed(3)} landejaY=${dok.landejaY.toFixed(3)}` +
    ` plate=${plej.n?.alto.toFixed(3) ?? "?"} @${plej.k} dist=${dist.toFixed(2)}` +
    ` gap=${( dok.platformY - ( plej.n?.alto ?? NaN ) ).toFixed(3)} hole=${VOJA_TRUA_DUONO.toFixed(2)}`);
  const vico: string[] = [];
  let maks = 0, loko = 0, antauxa = NaN;
  for ( let lz = D.profundo / 2 + 3; lz >= -D.profundo / 2 - 1; lz -= 0.25 ) {
    const yy = y(wx(0, lz), wz(0, lz));
    if ( yy !== null && Number.isFinite(antauxa) && Math.abs(yy - antauxa) > maks ) {
      maks = Math.abs(yy - antauxa); loko = lz;
    }
    vico.push(`${lz.toFixed(2)}:${yy === null ? "--" : yy.toFixed(2)}`);
    antauxa = yy ?? NaN;
  }
  console.log(`  maxJump=${maks.toFixed(3)} @lz=${loko.toFixed(2)}`);
  console.log(`  ${vico.join(" ")}`);
  if ( maks > tutaMaks ) tutaMaks = maks;
}
console.log(`ចំណត ${DOKOJ.length} , លោតខ្ពស់បំផុត ${tutaMaks.toFixed(3)}` +
  ` , លីមីត ${STUPA_RISERO.toFixed(3)}` +
  ( tutaMaks > STUPA_RISERO + 0o1/0o200 ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ));
