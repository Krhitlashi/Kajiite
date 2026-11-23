// ≺⧼ ŋᷠɜⅎᶗ‹ j͑ʃᴜꞇ ʌ ſɭc̗w ſɟᴜͷ̗ 🎨 ⧽≻
import * as THREE from "three";

// ⟪ ស្តុកវត្ថុធាតុអាហារ 📃 ⟫
const materialaStoko = new Map<string, THREE.MeshStandardMaterial>();
export function materialon(sxlosilo: string, kf2: () => THREE.MeshStandardMaterial): THREE.MeshStandardMaterial {
  let m = materialaStoko.get(sxlosilo);
  if ( !m ) { m = kf2(); materialaStoko.set(sxlosilo, m); }
  return m;
}
