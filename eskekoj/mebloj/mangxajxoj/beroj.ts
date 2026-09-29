// ≺⧼ La beroj de la Pussxlefoj 🫐 ⧽≻
// La klastroj da travideblaj manĝeblaj beroj en la ŝela taso de la Pussxlefoj
// ( kreiPussxlefojnBerojn ).
import * as THREE from "three";
import { PUSSXLEFO_BEROJ } from "./datumoj.js";
import type { MangxajxItemo } from "./tipoj.js";
// kreiPussxlefojnBerojn — Metu klastrojn da travideblaj manĝeblaj beroj EN la
// ŝelan tason de la Pussxlefoj ( la konuso de la unua folia tavolo ). Ne ĉiu
// planto portas berojn — nur proksimume duono — kaj ĉiu klastro estas unu
// manĝaĵobjekto, kiun la ludanto povas kolekti ( manĝi ) per E, same kiel la
// manĝaĵoj sur la tabloj.
//     @param g ( THREE.Object3D ) - La sceno ( aŭ grupo ) por aldoni la berojn.
//     @param plantoj ( { x, h, z, s, plantAlto? }[] ) - La metitaj Pussxlefoj
//              ( ArboMetado-formo ). plantAlto estas la REALA plant-alto, kiun
//              konstruiPussxlefojn skribas reen; sen gxi oni uzas la mezumon.
//     @returns items ( MangxajxItemo[] ) - La ber-klastroj.
export function kreiPussxlefojnBerojn(g: THREE.Object3D, plantoj: { x: number; h: number; z: number; s: number; plantAlto?: number }[]): MangxajxItemo[] {
  const items: MangxajxItemo[] = [];
  if ( plantoj.length === 0 ) return items;
  const f = PUSSXLEFO_BEROJ[0];
  const beroGeometrio = new THREE.SphereGeometry(1, 0o10, 0o10);
  const kernoGeometrio = new THREE.SphereGeometry(1, 8, 6);
  // Travidebla ŝelo kun hela kerno — la beroj brilas kiel frostaj gutoj.
  const beroMaterialo = new THREE.MeshStandardMaterial({
    color: f.col, transparent: true, opacity: 0o45 / 0o100, roughness: 0o15/0o100, depthWrite: false,
  });
  const kernoMaterialo = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0o35/0o100 });
  // ⟨ La trunkopinta profilo 📃 ⟩ — la sama profilo kiel en konstruiPussxlefojn
  // ( vegetajxo/pussxlefo.ts ), ĉar la ŝela taso sidas sur la trunko kaj oni bezonas la
  // samajn mezurojn por trovi ĝian internon.
  const trunkopintaProfilon = ( t: number ): number => {
    if ( t <= 0.88 ) return 1;
    const u = Math.min(1, ( t - 0.88 ) / 0.12);
    return Math.sqrt(Math.max(0, 1 - u * u));
  };
  for ( const p of plantoj ) {
    // Proksimume 70% de la plantoj portas berojn ( 0o55/0o100 = 0.7 ).
    if ( Math.random() > 0o55/0o100 ) continue;
    const klastro = new THREE.Group();
    // ⟨ La taso 📃 ⟩ — la planto havas unu ŝelan tason ĉe sia unua folia
    // tavolo, kaj la beroj nun sidas EN tiu konuso anstataŭ flosi en la aero
    // ĉirkaŭ la maldika trunko. La mezuroj ripetas la formulojn de la konstruo
    // ( se la metado ne skribis plantAlto, ni uzas la mezumon 0o17/0o20 ).
    const plantAlto = p.plantAlto ?? ( 0o5/0o10 + p.s * 0o3/0o10 ) * 0o17/0o20;
    const unuaTavolaY = plantAlto * 0o3/0o10;
    const sxelaAlto = plantAlto * 0o2/0o10;
    const trunkoR = ( 0o5/0o40 - ( unuaTavolaY / plantAlto ) * 0o2/0o40 )
      * trunkopintaProfilon(unuaTavolaY / plantAlto);
    const ringaSkalo = Math.max(0o3/0o40, trunkoR / ( 0o13/0o40 ) * 0o11/0o10);
    // La fundo de la taso kaj la interna radiuso ĉe la fundo — la konuso
    // malfermiĝas supren, do la malsupro estas la plej mallarĝa.
    const tasoFundo = p.h + unuaTavolaY - sxelaAlto * 0o14/0o40;
    const internaR = ringaSkalo * 0o2/0o10;
    // Simetria ringo EN la taso — n beroj egale spacigitaj laŭ la angulo, ĉe
    // la sama radiuso kaj alto. La malgranda hazarda skalo tenas la klastrojn
    // diversaj inter si sen ke la beroj eliru el la taso.
    const n = 3 + ( ( Math.random() * 3 ) | 0 );
    const turno = Math.random() * Math.PI * 2;
    const skalo = 0o2/0o100 + Math.random() * 0o2/0o100;
    const dy = sxelaAlto * ( 0o2/0o10 + Math.random() * 0o3/0o10 );
    for ( let i = 0; i < n; i++ ) {
      const ang = turno + i / n * Math.PI * 2;
      const lokalo = new THREE.Vector3(Math.cos(ang) * internaR, dy, Math.sin(ang) * internaR);
      const bero = new THREE.Mesh(beroGeometrio, beroMaterialo);
      bero.position.copy(lokalo);
      bero.scale.setScalar(skalo);
      const kerno = new THREE.Mesh(kernoGeometrio, kernoMaterialo);
      kerno.position.copy(lokalo);
      kerno.scale.setScalar(skalo * 0o3/0o10);
      klastro.add(bero, kerno);
    }
    klastro.position.set(p.x, tasoFundo, p.z);
    g.add(klastro);
    items.push({ mesh: klastro, key: f.key, f, pos: new THREE.Vector3(p.x, tasoFundo, p.z), dead: false });
  }
  return items;
}
