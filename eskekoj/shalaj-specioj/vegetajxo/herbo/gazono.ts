// ≺⧼ វាលស្មៅ 🟩 ⧽≻
import * as THREE from "three";
import { kreiHerbanTavolanKlinganTeksajxon } from "../../../komunajxoj/teksajxoj/tavola-klinga-herbo.js";
import { terenaKoloroEn } from "../../../komunajxoj/terenkoloroj.js";
import { kunfandiGeometriojnSenIndekson } from "../../../komunajxoj/kunfandajxoj.js";
import { kreiVegetajxanHazardon } from "../hazardoj.js";
import { biomo, akvaNivelo, SKULPTA_N, SKULPTA_PASO, SKULPTA_ORIGINO,
  type Biomo } from "../../../../kantaoj/mondo/tereno.js";
import { kreiHerbanKlingon } from "./klingoj.js";
import { kreiHerbanMaterialon, herbajTavoloj } from "./vento.js";

// ⟪ ស្រទាប់ស្មៅ 📃 ⟫
export interface HerbaTufo {
  x: number; z: number; y: number;
  sx: number; sy: number; sz: number;
  q: THREE.Quaternion;
  nuanco: number;
  deklivo: number;
  biomo: Biomo;
  varianto: number;
}

// ⟨ ក្រឡា និងក្តារ 📃 ⟩
const HERBA_CXELO = 0o2;
export const HERBA_TAVOLA_NOMO = "herbaTavolo";
const HERBA_TABELO = 0o20;
const HERBA_JITERO = 0o6/0o20;
const HERBA_LIMO = 0o60;
// ⟨ ស្មើនឹងដែនកំណត់ 📃 ⟩
const HERBA_FADO = HERBA_LIMO;

// ⟪ ស្លឹកវាលស្មៅបន្ត 📃 ⟫
// ⟨ ផ្នែកពីរ 📃 ⟩
// ⟨ តម្លៃ 📃 ⟩
const HERBA_TAVOLA_AKSOJ = 0o13;
const HERBA_TAVOLA_SEGMENTOJ = 0o2;
// ⟪ វ៉ារ្យ៉ង់ការរៀបចំ 📃 ⟫
const HERBA_TAVOLAJ_VARIANTOJ = 0o3;

// ⟪ ប៉ារ៉ាម៉ែត្រពណ៌ជីវតំបន់ស្មៅ 🎨 ⟫
export const HERBA_BIOMAJ_KOLOROJ:
  Partial<Record<Biomo, readonly [ number, number, number ]>> = {
    "valo": [ 0o1, 0o1, 0o1 ],
    "ebenaĵo": [ 0o1, 0o1, 0o4/0o5 ],
    "montaro": [ 0o17/0o20, 0o1, 0o1 ],
    "akvaj-plantoj": [ 0o17/0o20, 0o1, 0o4/0o5 ],
    "ekvizeto": [ 0o17/0o20, 0o1, 0o17/0o20 ],
  };

const HERBA_BLANKA_KOLORO = new THREE.Color(0o1, 0o1, 0o1);

const HERBA_MALHELIGO = 0o6/0o10;

function herbaHasho(ix: number, iz: number): number {
  let h = Math.imul(ix, 0x27d4eb2d) ^ Math.imul(iz, 0x165667b1);
  h = Math.imul(h ^ ( h >>> 0o15 ), 0x2545f491);
  return ( ( h ^ ( h >>> 0o13 ) ) >>> 0 ) / 0o40000000000;
}

export async function konstruiHerbanTavolon(
  sceno: THREE.Scene,
  jesi: () => Promise<void>,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  biomojFiltro?: readonly Biomo[],
  denso = 0o10/0o10
): Promise<void> {
  // ⟨ ស្លឹកគ្មានពណ៌ 📃 ⟩
  const materialo = kreiHerbanMaterialon(HERBA_FADO, kreiHerbanTavolanKlinganTeksajxon());
  // ⟨ សមាមាត្រស្លឹក 📃 ⟩
  // ⟨ វាលស្មៅខ្ពស់ជាង 📃 ⟩
  // ⟨ ការផ្លាស់បន្ថយ 📃 ⟩
  // ⟨ ការរៀបចំបី 📃 ⟩
  // ⟨ ទទឹងយកការគ្របដណ្តប់វិញ 📃 ⟩
  const variantoj: THREE.BufferGeometry[] = [
    konstruiHerbanTavolanGeometrion(0o223/0o100, HERBA_TAVOLA_AKSOJ,
      0o10/0o100, 0o11/0o20, 0o20/0o10, 0o2715),
    konstruiHerbanTavolanGeometrion(0o223/0o100, HERBA_TAVOLA_AKSOJ,
      0o7/0o100, 0o23/0o40, 0o22/0o10, 0o4633),
    konstruiHerbanTavolanGeometrion(0o223/0o100, HERBA_TAVOLA_AKSOJ - 1,
      0o11/0o100, 0o21/0o40, 0o17/0o10, 0o6151),
  ];
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
  const E = new THREE.Euler();
  const Q = new THREE.Quaternion();
  const ena = new THREE.Vector3(), enX = new THREE.Vector3(), enZ = new THREE.Vector3();
  const normalo = new THREE.Vector3();
  const vertikala = new THREE.Vector3(0, 1, 0);
  const lokoj: HerbaTufo[][] = variantoj.map(() => []);
  const biomaKoloro = new Map<Biomo, THREE.Color>();
  for ( const nomo of Object.keys(HERBA_BIOMAJ_KOLOROJ) as Biomo[] ) {
    const rgb = HERBA_BIOMAJ_KOLOROJ[nomo];
    if ( rgb ) biomaKoloro.set(nomo, new THREE.Color(rgb[0], rgb[1], rgb[2]));
  }

  const kalkuliTufon = ( ix: number, iz: number ): HerbaTufo | null => {
    if ( herbaHasho(ix, iz) > denso ) return null;
    const x = ( ix + 0o1/0o2 ) * HERBA_CXELO + ( herbaHasho(ix + 0o3, iz) - 0o1/0o2 ) * HERBA_JITERO * 0o2;
    const z = ( iz + 0o1/0o2 ) * HERBA_CXELO + ( herbaHasho(ix, iz + 0o5) - 0o1/0o2 ) * HERBA_JITERO * 0o2;
    const bi = biomo(x, z);
    if ( biomojFiltro && !biomojFiltro.includes(bi) ) return null;
    if ( excludeRivers(x, z) ) return null;
    if ( excludePaths(x, z, 0o2) ) return null;
    if ( excludeBuildings(x, z, 0o2) ) return null;
    const y = heightFn(x, z);
    if ( y < akvaNivelo(x, z) + 0o1/0o10 ) return null;

    // ⟨ គំរូពីរសម្រាប់ចម្លើយពីរ 📃 ⟩
    const paso = HERBA_CXELO;
    ena.set(x, y, z);
    enX.set(x + paso, heightFn(x + paso, z), z).sub(ena);
    enZ.set(x, heightFn(x, z + paso), z).sub(ena);
    if ( Math.max(Math.abs(enX.y), Math.abs(enZ.y)) / paso > 0o7/0o10 ) return null;
    const deklivo = Math.hypot(enX.y, enZ.y) / paso;
    normalo.crossVectors(enZ, enX).normalize();
    if ( normalo.y < 0 ) normalo.negate();

    // ⟨ ទទឹងនៅស្ទើរស្មើ 📃 ⟩
    const sx = 0o11/0o12 + herbaHasho(ix + 0o11, iz) * 0o1/0o4;
    const sz = 0o11/0o12 + herbaHasho(ix, iz + 0o11) * 0o1/0o4;
    // ⟨ កម្ពស់ដូចគ្នា 📃 ⟩
    // ⟨ ហេតុអ្វីមិនច្រើនជាង 📃 ⟩
    const sy = 0o7/0o10 + herbaHasho(ix + 0o13, iz + 0o3) * 0o1/0o10;
    const klinLimito = Math.PI / 0o10;
    const horiz = Math.hypot(normalo.x, normalo.z);
    if ( horiz > 0o1/0o2000 && Math.atan2(horiz, Math.max(normalo.y, 0o1/0o2000)) > klinLimito ) {
      const u = Math.tan(klinLimito);
      normalo.set(normalo.x / horiz * u, 1, normalo.z / horiz * u).normalize();
    }
    const q = new THREE.Quaternion().setFromUnitVectors(vertikala, normalo);
    E.set(0, herbaHasho(ix + 0o15, iz + 0o7) * Math.PI * 2, 0);
    q.multiply(Q.setFromEuler(E));

    // ⟨ វ៉ារ្យ៉ង់ការរៀបចំ 📃 ⟩
    const varianto = Math.min(HERBA_TAVOLAJ_VARIANTOJ - 1,
      Math.floor(herbaHasho(ix + 0o21, iz + 0o27) * HERBA_TAVOLAJ_VARIANTOJ));
    // ⟨ ពណ៌លាំ 📃 ⟩
    return { x, z, y, sx, sy, sz, q, deklivo, biomo: bi, varianto,
      nuanco: 0o17/0o20 + herbaHasho(ix + 0o17, iz + 0o13) * 0o1/0o10 };
  };

  for ( let tz = 0; tz < tabeloj; tz++ ) {
    for ( let tx = 0; tx < tabeloj; tx++ ) {
      for ( let v = 0; v < lokoj.length; v++ ) lokoj[v].length = 0;
      const unuaX = unuaCxelo + tx * cxelojPoTabelo;
      const unuaZ = unuaCxeloZ + tz * cxelojPoTabelo;
      for ( let iz = 0; iz < cxelojPoTabelo; iz++ ) {
        for ( let ix = 0; ix < cxelojPoTabelo; ix++ ) {
          const tufo = kalkuliTufon(unuaX + ix, unuaZ + iz);
          if ( tufo !== null ) lokoj[tufo.varianto].push(tufo);
        }
      }
      for ( let v = 0; v < lokoj.length; v++ ) {
        const tufoj = lokoj[v];
        if ( tufoj.length === 0 ) continue;
        const mesho = new THREE.InstancedMesh(variantoj[v], materialo, tufoj.length);
        for ( let i = 0; i < tufoj.length; i++ ) {
          const tufo = tufoj[i];
          M.compose(P.set(tufo.x, tufo.y, tufo.z), tufo.q, S.set(tufo.sx, tufo.sy, tufo.sz));
          mesho.setMatrixAt(i, M);
          // ⟨ ពណ៌មកពីដី 📃 ⟩
          const tera = terenaKoloroEn(teraKoloro, tufo.y, tufo.x, tufo.z, tufo.deklivo, akvaNivelo);
          const teraLumo = Math.max(
            ( tera.r + tera.g * 0o2 + tera.b ) * 0o1/0o4, 0o1/0o100 );
          // ⟨ ជិតដីជាង 📃 ⟩
          C.copy(tera).multiplyScalar(tufo.nuanco * HERBA_MALHELIGO / teraLumo)
            .multiply(biomaKoloro.get(tufo.biomo) ?? HERBA_BLANKA_KOLORO);
          mesho.setColorAt(i, C);
        }
        mesho.instanceMatrix.needsUpdate = true;
        if ( mesho.instanceColor ) mesho.instanceColor.needsUpdate = true;
        mesho.name = HERBA_TAVOLA_NOMO;
        // ⟨ ក្តារកក 📃 ⟩
        mesho.matrixWorldAutoUpdate = false;
        sceno.add(mesho);
        // ⟨ ដែនមើលផ្ទាល់ខ្លួន 📃 ⟩
        herbajTavoloj.push({
          mesho,
          cx: ( unuaX + cxelojPoTabelo * 0o1/0o2 ) * HERBA_CXELO,
          cz: ( unuaZ + cxelojPoTabelo * 0o1/0o2 ) * HERBA_CXELO,
          limo: HERBA_LIMO + HERBA_TABELO * 0o7/0o10,
        });
      }
    }
    await jesi();
  }
}

// ⟨ ហេតុអ្វីឧបករណ៍សង់ដោយឡែក 📃 ⟩
// ⟨ រូបរាង 📃 ⟩
function konstruiHerbanTavolanGeometrion(flanko = 0o223/0o100, akso = 0o10, jit = 0o13/0o100,
  longo = 0o15/0o40, larghaFaktoro = 0o14/0o10, semo = 0o2715): THREE.BufferGeometry {
  const hazardo = kreiVegetajxanHazardon(semo);
  const klingoj: THREE.BufferGeometry[] = [];
  const verda = new THREE.Color();
  const seka = new THREE.Color();
  const duono = flanko * 0o1/0o2;
  const pasxo = flanko / akso;
  for ( let iz = 0; iz < akso; iz++ ) {
    for ( let ix = 0; ix < akso; ix++ ) {
      const rx = -duono + ( ix + 0o1/0o2 ) * pasxo + ( hazardo() - 0o1/0o2 ) * jit * 0o2;
      const rz = -duono + ( iz + 0o1/0o2 ) * pasxo + ( hazardo() - 0o1/0o2 ) * jit * 0o2;
      // ⟨ ការប្រែប្រួលកម្ពស់ 📃 ⟩
      // ⟨ គ្មានការលើកគែម 📃 ⟩
      const klingoLongo = longo * ( 0o1/0o2 + hazardo() * 0o1/0o2 );
      const klingoLargho = ( 0o1/0o40 + hazardo() * 0o1/0o100 ) * larghaFaktoro
        * ( 0o35/0o40 + klingoLongo * 0o4/0o10 );
      // ⟨ គ្មានកង្ហារ 📃 ⟩
      // ⟨ ហេតុអ្វីចៃដន្យ មិនតាមទីតាំង 📃 ⟩
      const klino = ( hazardo() - 0o1/0o2 ) * 0o6/0o100;
      const arko = ( hazardo() - 0o1/0o2 ) * 0o6/0o100;
      // ⟨ ការបង្វិល 📃 ⟩
      const tordo = ( hazardo() - 0o1/0o2 ) * 0o16/0o10;
      // ⟨ ដោយចៃដន្យ មិនតាមទីតាំង 📃 ⟩
      const sekaKlingo = hazardo() < 0o1/0o4;
      if ( sekaKlingo ) {
        seka.setRGB(0o21/0o20, 0o33/0o40 + hazardo() * 0o1/0o10, 0o13/0o40 + hazardo() * 0o5/0o40 );
      } else {
        verda.setRGB(0o27/0o40 + hazardo() * 0o13/0o40, 0o63/0o100 + hazardo() * 0o11/0o40, 0o5/0o10 + hazardo() * 0o23/0o100);
      }
      // ⟨ ស្លឹក 📃 ⟩
      const klingo = kreiHerbanKlingon(klingoLongo, klingoLargho, klino, arko, tordo,
        sekaKlingo ? seka : verda, HERBA_TAVOLA_SEGMENTOJ, 0o6/0o10, true);
      klingo.translate(rx, 0, rz);
      klingoj.push(klingo);
    }
  }
  return kunfandiGeometriojnSenIndekson(klingoj);
}
