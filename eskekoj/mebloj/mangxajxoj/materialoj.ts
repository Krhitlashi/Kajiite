// ≺⧼ La manĝaĵaj materialoj 🎨 ⧽≻
// La komuna materiala stoko de la manĝaĵoj ( materialaStoko, materialon ).
import * as THREE from "three";

// ⟪ La materiala stoko de la manĝaĵoj 📃 ⟫ — la partoj de la bulkoj kaj de la
// glasoj uzas la samajn materialojn ( la plektita korbo, la oro, la vitro, la
// mento, la subteno ), sed ĉiu parto antaŭe kreis SIAN propran. La ok manĝaĵoj
// de unu mangxejo tiel faris pli ol cent materialojn por kelkaj objektoj — ĉiu
// el ili aparta uniformaro por la bildilo. La stoko redonas UNU materialon po
// ŝlosilo ( la sama ideo kiel konstruajxaMaterialo en satalaj-konstruajxoj.ts ).
// La koloraj variantoj portas la koloron en la ŝlosilo.
const materialaStoko = new Map<string, THREE.MeshStandardMaterial>();
export function materialon(sxlosilo: string, krei: () => THREE.MeshStandardMaterial): THREE.MeshStandardMaterial {
  let m = materialaStoko.get(sxlosilo);
  if ( !m ) { m = krei(); materialaStoko.set(sxlosilo, m); }
  return m;
}
