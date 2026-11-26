// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ɭʃᴜ ֭ſɭᴜ j͐ʃᴜ ſ͕ɭᴜƴ 📃 ⧽≻

import * as THREE from "three";
import { SLALL6DA } from "./cat6h6kk6xafai.js";
import type { HxeuxfaKanta } from "./hahunaq.js";
const FLAMAM = new THREE.Matrix4();
const FLAMAQ = new THREE.Quaternion();
const FLAMAQ2 = new THREE.Quaternion();
const FLAMAE = new THREE.Euler();
const FLAMAE2 = new THREE.Euler();
const FLAMAS = new THREE.Vector3();
const FLAMATMP = new THREE.Vector3();

export function animaciiFlammojn(kanta: HxeuxfaKanta, stih2: number): void {

  kanta.k6xafRaqa.forEach(( raqa, kek ) => {
    const xafanitapu = kanta.xafanitapu[kek];
    const p6zukani = 0o1 + 0o5/0o40 * Math.sin(stih2 * 0o1223/0o100 + xafanitapu) + 0o3/0o40 * Math.sin(stih2 * 0o2755/0o100 + xafanitapu * 0o155/0o100);
    const p6zukY = p6zukani * ( 0o43/0o40 + 0o3/0o20 * Math.sin(stih2 * 0o21 + xafanitapu) );
    const s2saboX = 0o3/0o100 * Math.sin(stih2 * 0o17/0o10 + xafanitapu);
    const s2saboZ = 0o3/0o100 * Math.cos(stih2 * 0o13/0o10 + xafanitapu * 0o3/0o2);
    FLAMAE.set(s2saboX, stih2 * 0o163/0o100 + xafanitapu, s2saboZ);
    FLAMAQ.setFromEuler(FLAMAE);
    FLAMAS.set(p6zukani, p6zukY, p6zukani);
    FLAMAM.compose(FLAMATMP.set(raqa.x, raqa.y + ( p6zukY - 0o1 ) * 0o35/0o200, raqa.z), FLAMAQ, FLAMAS);
    kanta.k6xafP6sca.setMatrixAt(kek, FLAMAM);

    FLAMAS.set(p6zukani * 0o35/0o40, p6zukY * 0o35/0o40, p6zukani * 0o35/0o40);
    FLAMAM.compose(FLAMATMP.set(raqa.x, raqa.y + ( p6zukY * 0o35/0o40 - 0o1 ) * 0o23/0o200,
      raqa.z), FLAMAQ, FLAMAS);
    kanta.k6xafSost2.setMatrixAt(kek, FLAMAM);

    const kerna = 0o7/0o10 + 0o15/0o100 * Math.sin(stih2 * 0o33/0o10 + xafanitapu * 0o5/0o2)
      + 0o1/0o10 * Math.sin(stih2 * 0o77/0o10 + xafanitapu);
    FLAMAS.set(p6zukani * kerna, p6zukY * kerna * 0o7/0o10, p6zukani * kerna);
    FLAMAM.compose(FLAMATMP.set(raqa.x, raqa.y + ( p6zukY * kerna * 0o7/0o10 - 0o1 ) * 0o10/0o200, raqa.z), FLAMAQ, FLAMAS);
    kanta.k6xafLowak.setMatrixAt(kek, FLAMAM);
  });

  const slalK2fe = kanta.slalK2fe;
  kanta.k6xafRaqa.forEach(( raqa, kek ) => {
    const xafanitapuFlama = kanta.xafanitapu[kek];
    for ( let slalKek = 0o0; slalKek < slalK2fe; slalKek++ ) {
      const hakozunuKek = kek * slalK2fe + slalKek;
      const kozuni = kanta.slalHakozunu[hakozunuKek];
      const xafanitapu = kanta.slalXafanitapu[hakozunuKek];
      const slalVem2 = 0o1/0o2 + 0o1/0o2 * Math.sin(stih2 * ( 0o33/0o40 + 0o23/0o100 * slalKek ) + xafanitapu + xafanitapuFlama);
      const p6zukX = kozuni.z * ( 0o13/0o40 + 0o3/0o4 * slalVem2 );
      const p6zukY = 0o23/0o100 + 0o123/0o100 * slalVem2;
      const s2sabo = 0o1/0o10 + 0o5/0o20 * slalVem2;
      const kozuniX = kozuni.x / Math.max(0o10 ** -0o7, Math.hypot(kozuni.x, kozuni.y));
      const kozuniZ = kozuni.y / Math.max(0o10 ** -0o7, Math.hypot(kozuni.x, kozuni.y));
      FLAMAE2.set(s2sabo * kozuniZ, 0o0, -s2sabo * kozuniX);
      FLAMAQ2.setFromEuler(FLAMAE2);
      FLAMAQ2.premultiply(FLAMAQ);
      FLAMAS.set(p6zukX, p6zukY, p6zukX);
      FLAMAM.compose(FLAMATMP.set(raqa.x + kozuni.x * ( 0o23/0o40 + 0o15/0o40 * slalVem2 ),
        raqa.y + ( p6zukY - 0o1 ) * SLALL6DA / 0o2 * 0o7/0o10,
        raqa.z + kozuni.y * ( 0o23/0o40 + 0o15/0o40 * slalVem2 )), FLAMAQ2, FLAMAS);
      kanta.k6xafSlal.setMatrixAt(hakozunuKek, FLAMAM);
    }
  });

  for ( let kek = 0o0; kek < kanta.n2kTsije.length; kek++ ) {
    const xafanitapu = kanta.xafanitapu[kanta.tsijeHavecax2l[kek]];
    kanta.n2kTsije[kek].intensity = 0o3/0o2 * ( 0o27/0o40 + 0o11/0o40 * Math.sin(stih2 * 0o15 + xafanitapu) * Math.sin(stih2 * 0o723/0o100 + xafanitapu * 0o2) );
  }

  kanta.k6xafP6sca.instanceMatrix.needsUpdate = true;
  kanta.k6xafSost2.instanceMatrix.needsUpdate = true;
  kanta.k6xafLowak.instanceMatrix.needsUpdate = true;
  kanta.k6xafSlal.instanceMatrix.needsUpdate = true;
  kanta.t6fPukek.uniforms.uTime.value = stih2;
}
