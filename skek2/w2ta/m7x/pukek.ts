// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſןw ſɭɔƽ 📃 ⧽≻

import * as THREE from "three";

const pukekStoko = new Map<string, THREE.MeshStandardMaterial>();
export function pukekon(ca3aq: string, kf2: () => THREE.MeshStandardMaterial): THREE.MeshStandardMaterial {
  let m = pukekStoko.get(ca3aq);
  if ( !m ) { m = kf2(); pukekStoko.set(ca3aq, m); }
  return m;
}
