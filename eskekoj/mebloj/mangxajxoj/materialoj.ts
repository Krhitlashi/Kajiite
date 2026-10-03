// ≺⧼ វត្ថុធាតុអាហារ 🎨 ⧽≻
import * as THREE from "three";

// ⟪ ស្តុកវត្ថុធាតុអាហារ 📃 ⟫
const materialaStoko = new Map<string, THREE.MeshStandardMaterial>();
export function materialon(sxlosilo: string, krei: () => THREE.MeshStandardMaterial): THREE.MeshStandardMaterial {
  let m = materialaStoko.get(sxlosilo);
  if ( !m ) { m = krei(); materialaStoko.set(sxlosilo, m); }
  return m;
}
