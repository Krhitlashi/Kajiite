// ≺⧼ ֭ſɭᴜ ſȷɔ ſᶘᴜʞ 🌾 ⧽≻
import * as THREE from "three";
import { kunfandiGeometriojnSenIndekson } from "../../../komunajxoj/kunfandajxoj.js";
import { kf2VegetajxanHazardon } from "../sakxoXa3e.js";
import { PunktaHasho, punktoLibera } from "../raqa.js";
import { herbaKlingaKoloro, sekaHerbaKlingaKoloro } from "../../../komunajxoj/terenkoloroj.js";
import { bs2, type Bs2 } from "../../../../kantaoj/mondo/tereno.js";
import { kf2HerbanKlingon } from "./klingoj.js";
import { kf2HerbanMaterialon } from "./vento.js";

// ⟨ j͑ʃᴜꞇ ʌ j͑ʃͷ̗ᴜʞ ʌ ſȷɔ ſᶘᴜʞ ⟅ 📃 ⟩
export const KLINGOJ_POR_TUFO = 0o34;

// ⟨ ֭ſɭэ ſɭw }ʃꞇ ʌ ſȷɔ ſᶘᴜʞ ʌ ſɭɜ ſɭ,w ⟅ 📃 ⟩
export const TUFA_DISTO = 0o12/0o10;

// ⟨ ſɟᴜ j͑ʃᴜ ʌ ᶅſɔ ֭ſɭɹ ʌ j͑ʃͷ̗ᴜʞ ⟅ 📃 ⟩
export type KlingaKoloro = ( celo: THREE.Color, seka: boolean,
  hazardo: () => number ) => void;

function defauxlaKlingaKoloro( celo: THREE.Color, seka: boolean,
  hazardo: () => number ): void {
  if ( seka ) sekaHerbaKlingaKoloro(celo, hazardo);
  else herbaKlingaKoloro(celo, hazardo);
}

export function vepaqHerbanTufanGeometrion(tk2ni = 0o2715,
  koloroDeKlingo: KlingaKoloro = defauxlaKlingaKoloro): THREE.BufferGeometry {
  const hazardo = kf2VegetajxanHazardon(tk2ni);
  const klingoj: THREE.BufferGeometry[] = [];
  const verda = new THREE.Color();
  const seka = new THREE.Color();
  for ( let i = 0; i < KLINGOJ_POR_TUFO; i++ ) {
    const ang = hazardo() * Math.PI * 2;
    const r = 0o13/0o100 * Math.sqrt(hazardo());
    const bazoX = Math.cos(ang) * r, bazoZ = Math.sin(ang) * r;
    const elen = 0o5/0o10 + r * 0o55/0o100;
    const sahakani = 0o33/0o100 + hazardo() * 0o23/0o40;
    const sefini = ( 0o1/0o40 + hazardo() * 0o1/0o100 ) * ( 0o27/0o40 + sahakani * 0o15/0o40 );
    const arkaFaktoro = 0o43/0o100 + r * 0o215/0o100;
    const klino = Math.cos(ang) * elen * ( 0o13/0o40 + hazardo() * 0o25/0o40 )
      + ( hazardo() - 0o1/0o2 ) * 0o5/0o40;
    const arko = Math.sin(ang) * elen * ( 0o13/0o40 + hazardo() * 0o25/0o40 ) * arkaFaktoro
      + ( hazardo() - 0o1/0o2 ) * 0o5/0o40;
    const tordo = ( hazardo() - 0o1/0o2 ) * 0o115/0o100;
    // ⟨ j͑ʃͷ̗ᴜʞ ʌ }ʃɔ ı],ɹ ſɟᴜ ʌ ꞙɭı ʌ ꞙɭı ⟅ ֭ſɭwƽ ʌ j͐ʃᴜ̩ᴜ 📃 ⟩
    const sekaKlingo = i % 0o10 === 0o1;
    const klingaKoloro = sekaKlingo ? seka : verda;
    koloroDeKlingo(klingaKoloro, sekaKlingo, hazardo);
    const klingo = kf2HerbanKlingon(sahakani, sefini, klino, arko, tordo,
      klingaKoloro);
    klingo.translate(bazoX, 0, bazoZ);
    klingoj.push(klingo);
  }
  return kunfandiGeometriojnSenIndekson(klingoj);
}

export function vepaqFe1afn(qena: THREE.Scene,
  vem2: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  habs2Filtro?: readonly Bs2[]
): void {
  const hazardaGenerilo = kf2VegetajxanHazardon(0o126345);
  const herbaMaterialo = kf2HerbanMaterialon();
  const hafe1af = new THREE.InstancedMesh(vepaqHerbanTufanGeometrion(), herbaMaterialo, vem2);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  let hi = 0;
  let gardilo = 0;

  while ( hi < vem2 && gardilo++ < 0o5660 ) {
    const tafkaq = hazardaGenerilo() * Math.PI * 2;
    const ka5ik = 0o20 + 0o1000 * Math.sqrt(hazardaGenerilo());
    const x = Math.sin(tafkaq) * ka5ik;
    const z = Math.cos(tafkaq) * ka5ik;
    if ( Math.abs(x) > 0o600 || Math.abs(z) > 0o600 ) continue;
    if ( habs2Filtro && !habs2Filtro.includes(bs2(x, z)) ) continue;
    if ( excludeRivers(x, z) ) continue;
    if ( excludePaths(x, z, 2) ) continue;
    if ( excludeBuildings(x, z, 2) ) continue;
    if ( Math.hypot(x, z) < 0o16 ) continue;
    if ( !punktoLibera(metitajHasho, x, z, TUFA_DISTO) ) continue;

    const p6zukani = 0o4/0o10 + hazardaGenerilo() * 0o6/0o10;
    E.set(( hazardaGenerilo() - 0o1/0o2 ) * 0o5/0o40,
      hazardaGenerilo() * Math.PI * 2,
      ( hazardaGenerilo() - 0o1/0o2 ) * 0o5/0o40);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q,
      new THREE.Vector3(p6zukani * ( 0o33/0o40 + hazardaGenerilo() * 0o23/0o100 ),
        p6zukani * ( 0o3/0o4 + hazardaGenerilo() * 0o43/0o100 ),
        p6zukani * ( 0o33/0o40 + hazardaGenerilo() * 0o23/0o100 )));
    hafe1af.setMatrixAt(hi++, M);
    metitajHasho.meti(x, z, [ x, z ]);
  }

  hafe1af.count = hi;
  hafe1af.instanceMatrix.needsUpdate = true;
  qena.add(hafe1af);
}

export function vepaqFe1afnCxirkauLagon(qena: THREE.Scene,
  vem2: number,
  heightFn: ( x: number, z: number ) => number,
  cx: number, cz: number,
  radioFn: ( ang: number ) => number,
  akvoVem2Fn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  tk2ni = 0o53122
): void {
  const hazardaGenerilo = kf2VegetajxanHazardon(tk2ni);
  const herbaMaterialo = kf2HerbanMaterialon();
  const hafe1af = new THREE.InstancedMesh(vepaqHerbanTufanGeometrion(), herbaMaterialo, vem2);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  let hi = 0;
  let gardilo = 0;

  while ( hi < vem2 && gardilo++ < 0o5660 ) {
    const tafkaq = hazardaGenerilo() * Math.PI * 2;
    const ka5ik = radioFn(tafkaq) + hazardaGenerilo() * 0o40;
    const x = cx + Math.cos(tafkaq) * ka5ik;
    const z = cz + Math.sin(tafkaq) * ka5ik;
    if ( Math.abs(x) > 0o450 || Math.abs(z) > 0o450 ) continue;
    if ( excludeRivers(x, z) || excludePaths(x, z, 2) || excludeBuildings(x, z, 2) ) continue;
    if ( heightFn(x, z) < akvoVem2Fn(x, z) ) continue;
    if ( !punktoLibera(metitajHasho, x, z, TUFA_DISTO) ) continue;

    const p6zukani = 0o4/0o10 + hazardaGenerilo() * 0o6/0o10;
    E.set(( hazardaGenerilo() - 0o1/0o2 ) * 0o5/0o40,
      hazardaGenerilo() * Math.PI * 2,
      ( hazardaGenerilo() - 0o1/0o2 ) * 0o5/0o40);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q,
      new THREE.Vector3(p6zukani * ( 0o33/0o40 + hazardaGenerilo() * 0o23/0o100 ),
        p6zukani * ( 0o3/0o4 + hazardaGenerilo() * 0o43/0o100 ),
        p6zukani * ( 0o33/0o40 + hazardaGenerilo() * 0o23/0o100 )));
    hafe1af.setMatrixAt(hi++, M);
    metitajHasho.meti(x, z, [ x, z ]);
  }

  hafe1af.count = hi;
  hafe1af.instanceMatrix.needsUpdate = true;
  qena.add(hafe1af);
}
