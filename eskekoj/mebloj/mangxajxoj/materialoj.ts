// ≺⧼ ŋᷠɜⅎᶗ‹ j͑ʃᴜꞇ ʌ ſɭc̗w ſɟᴜͷ̗ 🎨 ⧽≻
import * as THREE from "three";

// ⟪ pukek ʌ ŋᷠɜⅎᶗ‹ 📃 ⟫
const pukekStoko = new Map<string, THREE.MeshStandardMaterial>();
export function pukekon(sxlosilo: string, kf2: () => THREE.MeshStandardMaterial): THREE.MeshStandardMaterial {
  let m = pukekStoko.get(sxlosilo);
  if ( !m ) { m = kf2(); pukekStoko.set(sxlosilo, m); }
  return m;
}
