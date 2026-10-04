// ≺⧼ ចលនាអណ្តាតភ្លើង 🔥 ⧽≻
import * as THREE from "three";
import { LANGA_ALTO } from "./flamo.js";
import type { HxeuxfaSistemo } from "./tipoj.js";
const FLAMA_M = new THREE.Matrix4();
const FLAMA_Q = new THREE.Quaternion();
const FLAMA_Q2 = new THREE.Quaternion();
const FLAMA_E = new THREE.Euler();
const FLAMA_E2 = new THREE.Euler();
const FLAMA_S = new THREE.Vector3();
const FLAMA_TMP = new THREE.Vector3();

export function animaciiFlammojn(sys: HxeuxfaSistemo, t: number): void {
  const M = FLAMA_M;
  const Q = FLAMA_Q;
  const E = FLAMA_E;
  const S = FLAMA_S;
  const TMP = FLAMA_TMP;

  // ⟨ ហេតុអ្វីអណ្តាតភ្លើងឡើងលើ 📃 ⟩
  sys.spots.forEach(( p, i ) => {
    const fazo = sys.phases[i];
    const skalo = 1 + 0o5/0o40 * Math.sin(t * 0o1223/0o100 + fazo) + 0o3/0o40 * Math.sin(t * 0o2755/0o100 + fazo * 0o155/0o100);
    const skaloY = skalo * ( 0o43/0o40 + 0o3/0o20 * Math.sin(t * 0o21 + fazo) );
    const klinoX = 0o3/0o100 * Math.sin(t * 0o17/0o10 + fazo);
    const klinoZ = 0o3/0o100 * Math.cos(t * 0o13/0o10 + fazo * 0o3/0o2);
    E.set(klinoX, t * 0o163/0o100 + fazo, klinoZ);
    Q.setFromEuler(E);
    S.set(skalo, skaloY, skalo);
    M.compose(TMP.set(p.x, p.y + ( skaloY - 1 ) * 0o35/0o200, p.z), Q, S);
    sys.flamaEkstero.setMatrixAt(i, M);

    S.set(skalo * 0o35/0o40, skaloY * 0o35/0o40, skalo * 0o35/0o40);
    M.compose(TMP.set(p.x, p.y + ( skaloY * 0o35/0o40 - 1 ) * 0o23/0o200,
      p.z), Q, S);
    sys.flamaInterno.setMatrixAt(i, M);

    const kerna = 0o7/0o10 + 0o15/0o100 * Math.sin(t * 0o33/0o10 + fazo * 0o5/0o2)
      + 0o1/0o10 * Math.sin(t * 0o77/0o10 + fazo);
    S.set(skalo * kerna, skaloY * kerna * 0o7/0o10, skalo * kerna);
    M.compose(TMP.set(p.x, p.y + ( skaloY * kerna * 0o7/0o10 - 1 ) * 0o10/0o200, p.z), Q, S);
    sys.flamaKerno.setMatrixAt(i, M);
  });

  // ⟨ អណ្តាត 📃 ⟩
  const langojPoLampo = sys.langojPoLampo;
  sys.spots.forEach(( p, i ) => {
    const fazoFlama = sys.phases[i];
    for ( let j = 0; j < langojPoLampo; j++ ) {
      const idx = i * langojPoLampo + j;
      const bazo = sys.langajBazoj[idx];
      const fazo = sys.langajFazoj[idx];
      const osc = 0o1/0o2 + 0o1/0o2 * Math.sin(t * ( 0o33/0o40 + 0o23/0o100 * j ) + fazo + fazoFlama);
      const sx = bazo.z * ( 0o13/0o40 + 0o3/0o4 * osc );
      const sy = 0o23/0o100 + 0o123/0o100 * osc;
      const klino = 0o1/0o10 + 0o5/0o20 * osc;
      const cx = bazo.x / Math.max(1e-6, Math.hypot(bazo.x, bazo.y));
      const cz = bazo.y / Math.max(1e-6, Math.hypot(bazo.x, bazo.y));
      FLAMA_E2.set(klino * cz, 0, -klino * cx);
      FLAMA_Q2.setFromEuler(FLAMA_E2);
      FLAMA_Q2.premultiply(Q);
      S.set(sx, sy, sx);
      M.compose(TMP.set(p.x + bazo.x * ( 0o23/0o40 + 0o15/0o40 * osc ),
        p.y + ( sy - 1 ) * LANGA_ALTO / 2 * 0o7/0o10,
        p.z + bazo.y * ( 0o23/0o40 + 0o15/0o40 * osc )), FLAMA_Q2, S);
      sys.flamaLangoj.setMatrixAt(idx, M);
    }
  });

  for ( let k = 0; k < sys.punktajLumoj.length; k++ ) {
    const fazo = sys.phases[sys.lumajIndeksoj[k]];
    sys.punktajLumoj[k].intensity = 0o15/0o40 * ( 0o27/0o40 + 0o11/0o40 * Math.sin(t * 0o15 + fazo) * Math.sin(t * 0o723/0o100 + fazo * 2) );
  }

  sys.flamaEkstero.instanceMatrix.needsUpdate = true;
  sys.flamaInterno.instanceMatrix.needsUpdate = true;
  sys.flamaKerno.instanceMatrix.needsUpdate = true;
  sys.flamaLangoj.instanceMatrix.needsUpdate = true;
  sys.brilaMaterialo.uniforms.uTime.value = t;
}
