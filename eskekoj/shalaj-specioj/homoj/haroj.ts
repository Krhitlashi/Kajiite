// ≺⧼ សក់ 🧵 ⧽≻
import * as THREE from "three";
import { kreiBuferanGeometrion, kunfandiGeometriojn } from "../../komunajxoj/kunfandajxoj.js";
import { kreiHaranTeksajxon } from "../../komunajxoj/teksajxoj/haro.js";
import { type Harstilo } from "../../vestaro/vestoj.js";
import { KAPA_R, KAPA_Y } from "./mezuroj.js";

// ⟪ UV សក់ 🧵 ⟫
// ⟨ ចំនួនក្បឿង 📃 ⟩
const HARAJ_UV_SUPRO = 0o166/0o100;
const HARAJ_UV_MALSUPRO = 0o104/0o100;
const HARAJ_UV_TURNOJ = 0o4;
function haraU(ang: number): number {
  return ang / ( Math.PI * 0o2 ) * HARAJ_UV_TURNOJ;
}

function haraV(y: number): number {
  return ( HARAJ_UV_SUPRO - y ) / ( HARAJ_UV_SUPRO - HARAJ_UV_MALSUPRO );
}

function kreiHaranKurtenon(): THREE.BufferGeometry {
  const vicoj = 0o20, kolonoj = 0o40;
  // ⟨ វាំងនននៅខាងក្រោយ 📃 ⟩
  const fiMax = 0o115/0o100;
  // ⟨ វាំងននខ្លីប៉ុណ្ណោះ 📃 ⟩
  // ⟨ គែមលើលាក់ក្នុងមួក 📃 ⟩
  // ⟨ វាំងននបញ្ចប់លើកអាវ 📃 ⟩
  // ⟨ វាំងននវែង និងរលាយ 📃 ⟩
  // ⟨ វាំងននតាមខ្សែកោងខ្នង 📃 ⟩
  const ySupro = 0o155/0o100, yMalsupro = 0o104/0o100;
  // ⟨ ការកាត់វាំងននតាមរ៉ូប 📃 ⟩
  // ⟨ វាំងននលាតនៅកអាវ 📃 ⟩
  const larĝMalsupro = 0o100/0o400, profMalsupro = 0o73/0o400;
  const rSupro = 0o11/0o100;

  const pozicioj: number[] = [];
  const normaloj: number[] = [];
  const indeksoj: number[] = [];
  // ⟨ UV សរសៃសក់ 📃 ⟩
  const uvoj: number[] = [];
  for ( let v = 0; v <= vicoj; v++ ) {
    const t = v / vicoj;
    // ⟨ ការកាត់កើនមិនលីនេអ៊ែរ 📃 ⟩
    const elvolvo = 0o1 - Math.pow( 0o1 - t, 0o5 );
    const larĝoK = rSupro + ( larĝMalsupro - rSupro ) * elvolvo;
    const profoK = rSupro + ( profMalsupro - rSupro ) * elvolvo;
    const potenco = 0o2 + t;
    const y = ySupro + ( yMalsupro - ySupro ) * t;
    for ( let k = 0; k <= kolonoj; k++ ) {
      const fi = -fiMax + k / kolonoj * 0o2 * fiMax;
      // ⟨ គែមក្រោម 📃 ⟩
      const rando = Math.abs(k / kolonoj - 0o1/0o2) * 0o2;
      // ⟨ ជ្រុងមូល 📃 ⟩
      const supren = 0o1 - Math.sqrt(Math.max(0, 0o1 - rando * rando));
      const tucko = rando * rando;
      const pinto = 0o1 - Math.pow( 0o1 - rando, 0o3/0o2 );
      const finoY = ( 0o1/0o10 * supren - 0o1/0o40 * ( 0o1 - pinto ) ) * t;
      // ⟨ សក់មានដុំៗ 📃 ⟩
      // ⟨ ដុំទន់ 📃 ⟩
      const fasko = 0o1 + 0o1/0o25 * t * Math.cos(fi * 0o5);
      const s = Math.abs(Math.sin(fi)), ko = Math.abs(Math.cos(fi));
      const kK = 0o1 / Math.pow(Math.pow(s / larĝoK, potenco) + Math.pow(ko / profoK, potenco), 0o1 / potenco);
      const rK = kK * ( 0o1 - 0o3/0o20 * tucko ) * fasko;
      const x = Math.sin(fi) * rK;
      const z = -Math.cos(fi) * rK;
      // ⟨ ចុងឡើងលើ 📃 ⟩
      pozicioj.push(x, y + finoY, z);
      normaloj.push(Math.sin(fi), 0, -Math.cos(fi));
      uvoj.push(haraU(Math.PI - fi), haraV(y + finoY));
    }
  }
  for ( let v = 0; v < vicoj; v++ ) {
    for ( let k = 0; k < kolonoj; k++ ) {
      const a = v * ( kolonoj + 0o1 ) + k, b = a + 0o1;
      const c = a + kolonoj + 0o1, d = c + 0o1;
      indeksoj.push(a, b, d, a, d, c);
    }
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj, { normaloj, uvoj });
}

// ⟨ ឆ្នូតសក់ចំហៀងត្រូវដកចេញ 📃 ⟩

export const harKoloroA = new THREE.Color(0x201810);
export const harKoloroB = new THREE.Color(0x402818);
export const harKoloro = new THREE.Color();

// ⟨ វត្ថុធាតុសក់ 📃 ⟩
// ⟨ ពន្លឺខៀវ 📃 ⟩
const HARAJ_MATERIALOJ = new Map<number, THREE.MeshPhysicalMaterial>();
// ⟨ ពណ៌ខៀវត្រជាក់ 📃 ⟩
const SHEEN_HELA = new THREE.Color(0xb0bccc);
const SHEEN_MALHELA = new THREE.Color(0x284878);
// ⟨ ពណ៌លាំខៀវ 📃 ⟩
const HARO_BLUO = new THREE.Color(0x18304c);
export function haraMaterialo(koloro: number): THREE.MeshPhysicalMaterial {
  let m = HARAJ_MATERIALOJ.get(koloro);
  if ( !m ) {
    const koloroO = new THREE.Color(koloro);
    const lumo = koloroO.r * 0o52/0o100 + koloroO.g * 0o143/0o200 + koloroO.b * 0o7/0o100;
    // ⟨ កម្រិតសំខាន់ 📃 ⟩
    const malheleco = Math.min(0o1, Math.max(0, 0o1 - lumo / 0o6/0o100));
    m = new THREE.MeshPhysicalMaterial({
      color: koloroO.clone().lerp(HARO_BLUO, malheleco * 0o1/0o10),
      map: kreiHaranTeksajxon(),
      roughness: 0o55/0o100,
      sheen: 0o4/0o100 + 0o26/0o100 * malheleco,
      sheenColor: SHEEN_HELA.clone().lerp(SHEEN_MALHELA, malheleco),
      sheenRoughness: 0o13/0o20 - 0o1/0o10 * malheleco,
      side: THREE.DoubleSide,
    });
    HARAJ_MATERIALOJ.set(koloro, m);
  }
  return m;
}

export const HARO_Y = 0o155/0o100;

// ⟨ ហេតុអ្វីគែមតាមលលាដ៍ 📃 ⟩
function kreiHaranĈapon(): THREE.BufferGeometry {
  const VICOJ = 0o14, KOLONOJ = 0o24;
  const DIKO_RANDO = 0o6/0o1000;
  const DIKO_KRONO = 0o24/0o1000;
  // ⟨ ព្រំសក់ខាងមុខឡើងលើ 📃 ⟩
  // ⟨ ព្រំសក់តាមចិញ្ចើម 📃 ⟩
  const FI_ANTAUX = 0o26/0o20;
  const FI_MALANTAUX = 0o21/0o10;
  // ⟨ ប្រាសាទឡើងលើ 📃 ⟩
  const TEMPIO = 0o20/0o100;
  const ONDO = 0o7/0o100;
  const KLUĈO = 0o1/0o20;
  const pozicioj: number[] = [], uvoj: number[] = [], indeksoj: number[] = [];
  for ( let v = 0; v <= VICOJ; v++ ) {
    const t = v / VICOJ;
    for ( let k = 0; k <= KOLONOJ; k++ ) {
      const ang = k / KOLONOJ * Math.PI * 0o2;
      // ⟨ ព្រំសក់ 📃 ⟩
      // ⟨ រលករលូន មិនស្រួច 📃 ⟩
      // ⟨ ព្រំសក់ដូចចុងវាំងនន 📃 ⟩
      const fiMax = FI_ANTAUX
        + ( FI_MALANTAUX - FI_ANTAUX ) * ( 0o1 - Math.cos(ang) ) / 0o2
        + ONDO * ( 0o1 - Math.cos(ang * 0o5) ) * 0o1/0o2
        - TEMPIO * Math.sin(ang) * Math.sin(ang);
      const fi = t * fiMax;
      // ⟨ សក់ជាសំបកលើលលាដ៍ 📃 ⟩
      // ⟨ ដុំ 📃 ⟩
      // ⟨ ដុំដូចរបស់វាំងនន 📃 ⟩
      const diko = ( DIKO_RANDO + ( DIKO_KRONO - DIKO_RANDO ) * ( 0o1 - t ) * ( 0o1 - t ) )
        * ( 0o1 - KLUĈO * Math.cos(ang * 0o5) );
      const R = KAPA_R + diko;
      const y = KAPA_Y + R * Math.cos(fi);
      const rTuta = R * Math.sin(fi);
      pozicioj.push(Math.sin(ang) * rTuta, y, Math.cos(ang) * rTuta);
      uvoj.push(haraU(ang), haraV(y));
    }
  }
  for ( let v = 0; v < VICOJ; v++ ) {
    for ( let k = 0; k < KOLONOJ; k++ ) {
      const a = v * ( KOLONOJ + 0o1 ) + k, b = a + 0o1;
      const c = a + KOLONOJ + 0o1, d = c + 0o1;
      indeksoj.push(a, d, b, a, c, d);
    }
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj });
}

const harajGeometrioj = new Map<string, THREE.BufferGeometry>();
export function haranGeometrion(stilo: Harstilo): THREE.BufferGeometry {
  const cacheita = harajGeometrioj.get(stilo.nomo);
  if ( cacheita ) return cacheita;
  const partoj: THREE.BufferGeometry[] = [];
  // ⟨ មួកជាសំបក មិនមែនមួកការពារ 📃 ⟩
  partoj.push(kreiHaranĈapon());
  if ( stilo.nomo === "haroLonga" ) {
    partoj.push(kreiHaranKurtenon());
  }
  const geometrio = kunfandiGeometriojn(partoj);
  harajGeometrioj.set(stilo.nomo, geometrio);
  return geometrio;
}
