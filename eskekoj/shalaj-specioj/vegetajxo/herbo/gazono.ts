// ≺⧼ វាលស្មៅ 🟩 ⧽≻
import * as THREE from "three";
import { kreiHerbanTavolanKlinganTeksajxon } from "../../../komunajxoj/teksajxoj/tavola-klinga-herbo.js";
import { herbaKlingaKoloro, sekaHerbaKlingaKoloro, terenaKoloroEn } from "../../../komunajxoj/terenkoloroj.js";
import { kunfandiGeometriojnSenIndekson } from "../../../komunajxoj/kunfandajxoj.js";
import { kreiVegetajxanHazardon } from "../hazardoj.js";
import { VOJA_EKSTERA_DUONO } from "../../../medio/vojoj/mezuroj.js";
import { biomo, akvaNivelo, akvaNiveloProksima, SKULPTA_N, SKULPTA_PASO, SKULPTA_ORIGINO,
  type Biomo } from "../../../../kantaoj/mondo/tereno.js";
import { kreiHerbanKlingon } from "./klingoj.js";
import { kreiHerbanMaterialon, herbajTavoloj } from "./vento.js";

// ⟪ ដុំស្មៅ 🌾 ⟫
export interface HerbaTufo {
  x: number; z: number; y: number;
  sx: number; sy: number; sz: number;
  gx: number; gz: number;
  q: THREE.Quaternion;
  nuanco: number;
  deklivo: number;
  biomo: Biomo;
  varianto: number;
}

// ⟪ ក្រឡា និងក្តារ 📃 ⟫
// ⟨ តម្លៃទាំងនេះនាំចេញដើម្បីឱ្យឧបករណ៍ខាងក្រៅសាងសង់ស្មៅដូចគ្នា
//   បាន ដោយមិនចាំបាច់ចម្លងលេខ ។ 📃 ⟩
export const HERBA_CXELO = 0o2;
export const HERBA_TAVOLA_NOMO = "herbaTavolo";
const HERBA_TABELO = 0o40;
// ⟨ ស្មៅឆ្ងាយ ៖ ចម្ងាយតែមួយសម្រាប់គ្រប់ឧបករណ៍ ។ ស្មៅជាអ្នកចំណាយធំបំផុតលើ GPU ,
// ហើយវាលឆ្ងាយបិទដោយវាយនភាពដី ។ 📃 ⟩
const HERBA_LIMO = 0o40;
const HERBA_FADO = HERBA_LIMO;

// ⟪ រូបរាងដុំស្មៅ 📃 ⟫
export const HERBA_LARGO = 0o33/0o10;
const HERBA_CXELA_JITERO = 0o1/0o4;
// ⟨ ស្មៅស្រាល ៖ ស្លឹកតិចជាងមុន , ហើយកំណាត់តែមួយ ។ ស្លឹកនីមួយៗសន្សំត្រីកោណ ។
// ស្មៅជាអ្នកចំណាយធំបំផុតលើ GPU ៖ ដុំមួយមានស្លឹករាប់រយ ។ ការកំណត់តែមួយ
// សម្រាប់គ្រប់ឧបករណ៍ ៖ មិនមានការបែងចែកតាមឧបករណ៍ទេ ។ 📃 ⟩
export const HERBA_AKSOJ = 0o13;
const HERBA_SEGMENTOJ = 1;
export const HERBA_VARIANTOJ = 0o3;
// ⟨ គ្រាប់ពូជទូទៅ ៖ ឧបករណ៍ខាងក្រៅប្រើលេខដូចគ្នា ដើម្បីទទួលរូបរាងដូចគ្នា ។ 📃 ⟩
export const HERBA_SEMO = 0o2715;
export const HERBA_SEMA_PASO = 0o1436;
const HERBA_TABELOJ_ANTUX_JESI = 0o4;
// ⟨ ស្មៅឆ្ងាយ ៖ ស្មៅឆ្ងាយប្រើកំណាត់តែមួយ ។ ចំនួនស្លឹកដូចគ្នា , តែត្រីកោណពាក់កណ្តាល ។
// ផ្លាស់កម្រិតតែខ្សែកោងស្លឹក , ដូច្នេះមិនឃើញលោត ។ កម្រិតនេះជាចម្ងាយពី
// គែមក្រឡាស្មៅ ដល់ភ្នែកអ្នកលេង ។ 📃 ⟩
const HERBA_LOD_DISTO = 0o12;
const HERBA_LOD_SEGMENTOJ = 1;
const HERBA_KLINGA_ALTO = 0o14/0o100 + 0o2/0o10;
const HERBA_DEKLIVA_LIMO = 0o7/0o10;
const HERBA_DOKLIVA_LIMO = 0o13/0o20;
const HERBA_SUKENO = 0o1/0o100;

// ⟪ អាងស្មៅ ដើម្បីកុំឱ្យចៃដន្យចូលក្នុងផ្លូវ 📃 ⟫
// ⟨ ចៃដន្យអស់ចូលបំផុត ពីមជ្ឈប់ដុំ នៅទំហំមួយ , រួចសង្កត់តាមចៃដន្យដែលអាចធ្វើបាន ដើម្បីកុំឱ្យមានកន្លែងទទេធំ ជាងចា។ច្ចាន់ តែងតែបាន 📃 ⟩
const HERBA_RADIO = HERBA_LARGO * 0o1/0o2 + ( 0o14/0o100 + 0o2/0o10 )
  * ( 0o5/0o100 + 0o15/0o100 ) * ( 0o5/0o10 + 0o5/0o10 );

// ⟪ ពណ៌តាមតំបន់ 🎨 ⟫
export const HERBA_BIOMAJ_KOLOROJ:
  Partial<Record<Biomo, readonly [ number, number, number ]>> = {
    "valo": [ 0o1, 0o1, 0o1 ],
    "ebenaĵo": [ 0o1, 0o1, 0o4/0o5 ],
    "montaro": [ 0o17/0o20, 0o1, 0o1 ],
    "akvaj-plantoj": [ 0o17/0o20, 0o1, 0o4/0o5 ],
    "ekvizeto": [ 0o17/0o20, 0o1, 0o17/0o20 ],
  };

const HERBA_BLANKA_KOLORO = new THREE.Color(0o1, 0o1, 0o1);
// ⟨ ដុំស្មៅខ្លះប្រផេះ ខ្លះបៃតងចាស់ ៖ ដើម្បីកុំឱ្យវាលស្មៅស្មើគ្នាទាំងអស់ 📃 ⟩
const HERBA_GRUZA_KOLORO = new THREE.Color(0o6/0o10, 0o66/0o100, 0o6/0o10);
const HERBA_MALHELA_KOLORO = new THREE.Color(0o16/0o100, 0o3/0o10, 0o22/0o100);

const HERBA_MALHELIGO = 0o74/0o100;

function herbaHasho(ix: number, iz: number): number {
  let h = Math.imul(ix, 0x27d4eb2d) ^ Math.imul(iz, 0x165667b1);
  h = Math.imul(h ^ ( h >>> 0o15 ), 0x2545f491);
  return ( ( h ^ ( h >>> 0o13 ) ) >>> 0 ) / 0o40000000000;
}

// ⟨ ចម្លងធរណីមាត្រមួយសម្រាប់ក្រឡាមួយ ៖ បន្ថែមទិន្នន័យជម្រាលតាមដុំស្មៅ ។
//   ឧបករណ៍សាកល្បងក៏ប្រើមុខងារនេះ ដើម្បីឱ្យស្មៅដូចឆាកពិត ។ 📃 ⟩
export function kreiHerbanTavolanKopion(varia: THREE.BufferGeometry, kvanto: number,
  doklivo?: THREE.InstancedBufferAttribute): THREE.BufferGeometry {
  const geometrio = new THREE.BufferGeometry();
  for ( const nomo of [ "position", "uv", "color" ] ) {
    const atributo = varia.getAttribute(nomo);
    if ( atributo ) geometrio.setAttribute(nomo, atributo);
  }
  const indekso = varia.getIndex();
  if ( indekso ) geometrio.setIndex(indekso);
  // ⟨ កម្រិតទាំងពីរប្រើទិន្នន័យទំហំជម្រាលតែមួយ ៖ ធនធានតែមួយ , មិនចំលងទ្វេទេ ។ 📃 ⟩
  geometrio.setAttribute("herbaDoklivo", doklivo
    ?? new THREE.InstancedBufferAttribute(new Float32Array(kvanto * 2), 2));
  return geometrio;
}

// ⟪ ជម្រើសសម្រាប់ដុំស្មៅមួយ 📃 ⟫
// ⟨ ការគណនាដុំស្មៅត្រូវការតែអនុគមន៍ពីខាងក្រៅប៉ុណ្ណោះ ។ ការបំបែកវាចេញ
//   ធ្វើឱ្យឧបករណ៍សាកល្បងសាងសង់ស្មៅដូចឆាកពិត ។ 📃 ⟩
export interface HerbaTufaOpcioj {
  heightFn: ( x: number, z: number ) => number;
  excludeRivers: ( x: number, z: number ) => boolean;
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean;
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean;
  biomojFiltro?: readonly Biomo[];
  vojaKlaro?: ( x: number, z: number, maks: number ) => number;
  kruxaKlaro?: ( x: number, z: number, maks: number ) => number;
  // ⟨ ជម្រើសសម្រាប់ឆាកសាកល្បង ៖ តំបន់ និងកម្រិតទឹកអាចមកពីខាងក្រៅ
  //   ដោយមិនប៉ះពាល់ដល់ពិភពលោកពិត ។ 📃 ⟩
  biomoFn?: ( x: number, z: number ) => Biomo;
  akvaNiveloFn?: ( x: number, z: number ) => number;
}

const TUF_E = new THREE.Euler();
const TUF_Q = new THREE.Quaternion();

// ⟨ ការគណនាដុំស្មៅមួយនៅក្រឡា ( ix , iz ) ។ ត្រឡប់ null បើក្រឡានោះគ្មានស្មៅ ។ 📃 ⟩
export function kalkuliHerbanTufon(ix: number, iz: number,
  opcioj: HerbaTufaOpcioj): HerbaTufo | null {
  const heightFn = opcioj.heightFn;
  const x = ( ix + 0o1/0o2 + ( herbaHasho(ix, iz) - 0o1/0o2 ) * HERBA_CXELA_JITERO ) * HERBA_CXELO;
  const z = ( iz + 0o1/0o2 + ( herbaHasho(ix + 0o27, iz + 0o11) - 0o1/0o2 ) * HERBA_CXELA_JITERO )
    * HERBA_CXELO;
  const bi = ( opcioj.biomoFn ?? biomo )(x, z);
  if ( opcioj.biomojFiltro && !opcioj.biomojFiltro.includes(bi) ) return null;
  if ( opcioj.excludeRivers(x, z) ) return null;
  if ( opcioj.excludePaths(x, z, 0o2) ) return null;
  if ( opcioj.excludeBuildings(x, z, 0o2) ) return null;
  const y = heightFn(x, z);
  if ( y < ( opcioj.akvaNiveloFn ?? akvaNivelo )(x, z) + 0o1/0o10 ) return null;

  const paso = SKULPTA_PASO;
  const gxo = ( heightFn(x + paso, z) - heightFn(x - paso, z) ) / ( 2 * paso );
  const gzo = ( heightFn(x, z + paso) - heightFn(x, z - paso) ) / ( 2 * paso );
  const deklivo = Math.hypot(gxo, gzo);
  if ( deklivo > HERBA_DEKLIVA_LIMO ) return null;
  const reteno = deklivo > HERBA_DOKLIVA_LIMO ? HERBA_DOKLIVA_LIMO / deklivo : 0o1;
  const gxoR = gxo * reteno, gzoR = gzo * reteno;

  const skalo = 0o1 - 0o1/0o20 + herbaHasho(ix + 0o21, iz + 0o17) * 0o2/0o10;
  let sx = skalo * ( 0o1 - 0o1/0o40 + herbaHasho(ix + 0o3, iz + 0o32) * 0o1/0o20 );
  let sz = skalo * ( 0o1 - 0o1/0o40 + herbaHasho(ix + 0o35, iz + 0o5) * 0o1/0o20 );
  const sy = skalo * ( 0o1 - 0o1/0o10 + herbaHasho(ix + 0o13, iz + 0o7) * 0o2/0o10 );

  // ⟨ បង្រួមដុំស្មៅនៅជិតផ្លូវ និងគីហ្វហេសូ ។ 📃 ⟩
  const pleja = Math.max( sx, sz );
  let limo = 0o1;
  for ( const klaroFn of [ opcioj.vojaKlaro, opcioj.kruxaKlaro ] ) {
    if ( !klaroFn ) continue;
    const klaro = klaroFn( x, z, HERBA_RADIO );
    if ( klaro <= 0 ) return null;
    limo = Math.min( limo, klaro / ( HERBA_RADIO * pleja ) );
  }
  if ( limo < 0o1 ) {
    sx *= limo;
    sz *= limo;
  }
  const yaw = herbaHasho(ix + 0o15, iz + 0o23) * Math.PI * 0o2;
  TUF_Q.setFromEuler(TUF_E.set(0, yaw, 0));
  const c = Math.cos(yaw), s = Math.sin(yaw);
  const faktoro = sx / sy;
  const gx = ( c * gxoR - s * gzoR ) * faktoro;
  const gz = ( s * gxoR + c * gzoR ) * faktoro;

  const varianto = Math.min(HERBA_VARIANTOJ - 1,
    Math.floor(herbaHasho(ix + 0o33, iz + 0o41) * HERBA_VARIANTOJ));
  return { x, z, y: y - HERBA_SUKENO, sx, sy, sz, gx, gz,
    q: TUF_Q.clone(), deklivo, biomo: bi, varianto,
    nuanco: 0o1 - 0o1/0o40 + herbaHasho(ix + 0o17, iz + 0o13) * 0o1/0o20 };
}

// ⟨ តារាងពណ៌ប្រចាំតំបន់ ៖ គណនាម្តង , ប្រើរាល់ដុំស្មៅ ។ 📃 ⟩
export function kreiBiomajnKolorojn(): Map<Biomo, THREE.Color> {
  const biomaKoloro = new Map<Biomo, THREE.Color>();
  for ( const nomo of Object.keys(HERBA_BIOMAJ_KOLOROJ) as Biomo[] ) {
    const rgb = HERBA_BIOMAJ_KOLOROJ[nomo];
    if ( rgb ) biomaKoloro.set(nomo, new THREE.Color(rgb[0], rgb[1], rgb[2]));
  }
  return biomaKoloro;
}

// ⟨ ពណ៌ឧទាហរណ៍សម្រាប់ដុំស្មៅមួយ ៖ ដីផ្តល់ពន្លឺ , ដុំស្មៅផ្តល់ក្តារពណ៌ខ្លួនឯង ,
//   តំបន់ផ្តល់ការផ្អោប , ហើយចៃដន្យបន្ថែមប្រផេះ និងបៃតងចាស់ម្តងម្កាល ។ 📃 ⟩
export function herbaTufaKoloroEn(celo: THREE.Color, teraKoloro: THREE.Color,
  tufo: HerbaTufo, biomaKoloro: ReadonlyMap<Biomo, THREE.Color>,
  niveloFn?: ( x: number, z: number ) => number): THREE.Color {
  const tera = terenaKoloroEn(teraKoloro, tufo.y, tufo.x, tufo.z,
    tufo.deklivo, niveloFn ?? akvaNiveloProksima);
  const teraLumo = Math.max(
    ( tera.r + tera.g * 0o2 + tera.b ) * 0o1/0o4, 0o1/0o100 );
  herbaKlingaKoloro(celo,
    () => herbaHasho(Math.floor(tufo.x / 0o3), Math.floor(tufo.z / 0o3)));
  const klingaLumo = Math.max(
    ( celo.r + celo.g * 0o2 + celo.b ) * 0o1/0o4, 0o1/0o100 );
  const ombro = 0o15/0o20 + 0o5/0o40 * Math.min(1, teraLumo / ( 0o1/0o2 ));
  celo.multiplyScalar(tufo.nuanco * HERBA_MALHELIGO * ombro / klingaLumo)
    .multiply(biomaKoloro.get(tufo.biomo) ?? HERBA_BLANKA_KOLORO);
  // ⟨ ចម្រុះពណ៌តាមដុំ ៖ ប្រផេះ និងបៃតងចាស់លាយចូលម្តងម្កាល 📃 ⟩
  const vario = herbaHasho(Math.floor(tufo.x / 0o6), Math.floor(tufo.z / 0o6));
  if ( vario < 0o1/0o4 ) celo.lerp(HERBA_GRUZA_KOLORO, ( 0o1/0o4 - vario ) * 0o6/0o10);
  else if ( vario > 0o3/0o4 ) celo.lerp(HERBA_MALHELA_KOLORO, ( vario - 0o3/0o4 ) * 0o6/0o10);
  return celo;
}

// ⟨ វត្ថុធាតុសម្រាប់ស្រទាប់ស្មៅ ៖ ដូចឆាកពិត ។ ចម្ងាយបិទអាចពង្រីកបាន
//   សម្រាប់ឧបករណ៍សាកល្បងតូច ។ 📃 ⟩
export function kreiHerbanTavolanMaterialon(fado = HERBA_FADO): THREE.MeshStandardMaterial {
  return kreiHerbanMaterialon(fado, kreiHerbanTavolanKlinganTeksajxon(),
    { doklivo: true, alto: HERBA_KLINGA_ALTO, svajo: 0o2/0o100, pusxo: 0o1/0o10 });
}

// ⟪ ការសង់តាមក្រឡា 🏗 ⟫
export async function konstruiHerbanTavolon(
  sceno: THREE.Scene,
  jesi: () => Promise<void>,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  biomojFiltro?: readonly Biomo[],
  aksoj = HERBA_AKSOJ,
  vojaKlaro?: ( x: number, z: number, maks: number ) => number,
  kruxaKlaro?: ( x: number, z: number, maks: number ) => number
): Promise<void> {
  const materialo = kreiHerbanTavolanMaterialon();
  const variantoj: THREE.BufferGeometry[] = [];
  for ( let v = 0; v < HERBA_VARIANTOJ; v++ ) {
    variantoj.push(konstruiHerbanTavolanGeometrion(HERBA_LARGO, aksoj,
      HERBA_SEMO + v * HERBA_SEMA_PASO));
  }
  // ⟨ កម្រិតឆ្ងាយ ៖ ដុំស្មៅតែមួយទំហំដូចគ្នា , ស្លឹកដូចគ្នា , តែកំណាត់តែមួយ ។ 📃 ⟩
  const malproksimajVariantoj: THREE.BufferGeometry[] = [];
  for ( let v = 0; v < HERBA_VARIANTOJ; v++ ) {
    malproksimajVariantoj.push(konstruiHerbanTavolanGeometrion(HERBA_LARGO, aksoj,
      HERBA_SEMO + v * HERBA_SEMA_PASO, HERBA_LOD_SEGMENTOJ));
  }
  const amplexo = SKULPTA_N * SKULPTA_PASO;
  const cxelojPoTabelo = Math.round(HERBA_TABELO / HERBA_CXELO);
  const tabeloj = Math.ceil(amplexo / HERBA_TABELO);
  const unuaCxelo = Math.round(SKULPTA_ORIGINO[0] / HERBA_CXELO);
  const unuaCxeloZ = Math.round(SKULPTA_ORIGINO[1] / HERBA_CXELO);

  const M = new THREE.Matrix4();
  const P = new THREE.Vector3();
  const S = new THREE.Vector3();
  const C = new THREE.Color();
  const teraKoloro = new THREE.Color();
  const lokoj: HerbaTufo[][] = variantoj.map(() => []);
  const biomaKoloro = kreiBiomajnKolorojn();
  const tufajOpcioj: HerbaTufaOpcioj = {
    heightFn, excludeRivers, excludePaths, excludeBuildings,
    biomojFiltro, vojaKlaro, kruxaKlaro,
  };

  let konstruitaj = 0;
  for ( let tz = 0; tz < tabeloj; tz++ ) {
    for ( let tx = 0; tx < tabeloj; tx++ ) {
      for ( let v = 0; v < lokoj.length; v++ ) lokoj[v].length = 0;
      const unuaX = unuaCxelo + tx * cxelojPoTabelo;
      const unuaZ = unuaCxeloZ + tz * cxelojPoTabelo;
      for ( let iz = 0; iz < cxelojPoTabelo; iz++ ) {
        for ( let ix = 0; ix < cxelojPoTabelo; ix++ ) {
          const tufo = kalkuliHerbanTufon(unuaX + ix, unuaZ + iz, tufajOpcioj);
          if ( tufo !== null ) lokoj[tufo.varianto].push(tufo);
        }
      }
      for ( let v = 0; v < lokoj.length; v++ ) {
        const tufoj = lokoj[v];
        if ( tufoj.length === 0 ) continue;
        const geometrio = kreiHerbanTavolanKopion(variantoj[v], tufoj.length);
        const deklivoj = geometrio.getAttribute("herbaDoklivo") as THREE.InstancedBufferAttribute;
        const malproksima = kreiHerbanTavolanKopion(malproksimajVariantoj[v], tufoj.length, deklivoj);
        const mesho = new THREE.InstancedMesh(geometrio, materialo, tufoj.length);
        for ( let i = 0; i < tufoj.length; i++ ) {
          const tufo = tufoj[i];
          M.compose(P.set(tufo.x, tufo.y, tufo.z), tufo.q, S.set(tufo.sx, tufo.sy, tufo.sz));
          mesho.setMatrixAt(i, M);
          deklivoj.setXY(i, tufo.gx, tufo.gz);
          mesho.setColorAt(i, herbaTufaKoloroEn(C, teraKoloro, tufo, biomaKoloro));
        }
        deklivoj.needsUpdate = true;
        mesho.instanceMatrix.needsUpdate = true;
        if ( mesho.instanceColor ) mesho.instanceColor.needsUpdate = true;
        mesho.name = HERBA_TAVOLA_NOMO;
        mesho.matrixWorldAutoUpdate = false;
        // ⟨ ដែនសម្រាប់កាត់ ៖ គណនាម្តង ដើម្បីកុំឲ្យការឆ្លាស់កម្រិតប្តូរដែន ។ 📃 ⟩
        mesho.computeBoundingSphere();
        sceno.add(mesho);
        herbajTavoloj.push({
          mesho,
          cx: ( unuaX + cxelojPoTabelo * 0o1/0o2 ) * HERBA_CXELO,
          cz: ( unuaZ + cxelojPoTabelo * 0o1/0o2 ) * HERBA_CXELO,
          limo: HERBA_LIMO + HERBA_TABELO * 0o7/0o10,
          detalaj: geometrio,
          malproksimaj: malproksima,
          lodDistanco: HERBA_LOD_DISTO,
          radiuso: HERBA_TABELO * Math.SQRT1_2,
          malproksima: false,
        });
      }
      if ( ++konstruitaj % HERBA_TABELOJ_ANTUX_JESI === 0 ) await jesi();
    }
  }
  await jesi();
}

// ⟪ រូបរាងដុំស្មៅ 🌿 ⟫
export function konstruiHerbanTavolanGeometrion(flanko = HERBA_LARGO, aksoj = HERBA_AKSOJ,
  semo = HERBA_SEMO, segmentoj = HERBA_SEGMENTOJ,
  klingaKoloro?: ( celo: THREE.Color, seka: boolean, hazardo: () => number ) => void
): THREE.BufferGeometry {
  const hazardo = kreiVegetajxanHazardon(semo);
  const klingoj: THREE.BufferGeometry[] = [];
  const verda = new THREE.Color();
  const seka = new THREE.Color();
  const duono = flanko * 0o1/0o2;
  const pasxo = flanko / aksoj;
  for ( let iz = 0; iz < aksoj; iz++ ) {
    for ( let ix = 0; ix < aksoj; ix++ ) {
      const rx = -duono + ( ix + hazardo() ) * pasxo;
      const rz = -duono + ( iz + hazardo() ) * pasxo;
      const disto = Math.min(1, Math.hypot(rx, rz) / duono);
      const angulo = Math.atan2(rz, rx);
      const longo = 0o14/0o100 + hazardo() * 0o2/0o10;
      const largho = 0o2/0o100 + hazardo() * 0o2/0o100;
      const elen = longo * ( 0o5/0o100 + hazardo() * 0o15/0o100 )
        * ( 0o5/0o10 + disto * 0o5/0o10 );
      const klino = Math.cos(angulo) * elen
        + ( hazardo() - 0o1/0o2 ) * 0o6/0o100 * longo;
      const arko = Math.sin(angulo) * elen
        + ( hazardo() - 0o1/0o2 ) * 0o6/0o100 * longo;
      const tordo = ( hazardo() - 0o1/0o2 ) * 0o16/0o10;
      const sekaKlingo = hazardo() < 0o1/0o10;
      // ⟨ ពណ៌ស្លឹក ៖ ធម្មតាមកពីតារាងពណ៌ , តែឧបករណ៍សាកល្បងអាចដាក់ការកែ
      //   របស់ខ្លួន ។ ការហៅត្រូវដូចគ្នា ដើម្បីរក្សារូបរាងដើម ។ 📃 ⟩
      if ( klingaKoloro ) klingaKoloro(sekaKlingo ? seka : verda, sekaKlingo, hazardo);
      else if ( sekaKlingo ) sekaHerbaKlingaKoloro(seka, hazardo);
      else herbaKlingaKoloro(verda, hazardo);
      const klingo = kreiHerbanKlingon(longo, largho, klino, arko, tordo,
        sekaKlingo ? seka : verda, segmentoj, 0o5/0o10);
      klingo.translate(rx, 0, rz);
      klingoj.push(klingo);
    }
  }
  return kunfandiGeometriojnSenIndekson(klingoj);
}
