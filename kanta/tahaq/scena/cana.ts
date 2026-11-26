// ≺⧼ ſɟᴜ }ʃᴜ 🌤 ⧽≻
import * as THREE from "three";
import { kf2CananPukekn, type CanaUnihaqoxa } from "../../../skek2/p6kpu/tsije.js";

export function kf2Canan(qena: THREE.Scene): {
  cana: THREE.Mesh;
  canaajUnihaqoxa: CanaUnihaqoxa;
} {

  const canaajUnihaqoxa: CanaUnihaqoxa = {
    uTop: { value: new THREE.Color(0x78a8c0) },
    uMid: { value: new THREE.Color(0xb8d0d8) },
    uBot: { value: new THREE.Color(0xe0e8e8) },
    uSunCol: { value: new THREE.Color(0xf8f0d8) },
    uSunDir: { value: new THREE.Vector3(0o4/0o10, 0o63/0o100, 0o23/0o100) },
    uHunastaf: { value: 0o0 },
  };

  qena.userData.canaajUnihaqoxa = canaajUnihaqoxa;
  const canaaVecax2l = new THREE.SphereGeometry(0o1170, 0o30, 0o20);
  const cana = new THREE.Mesh(canaaVecax2l, kf2CananPukekn(canaajUnihaqoxa));

  cana.frustumCulled = false;
  cana.onBeforeRender = ( tona, kagani, catahaq ) => {
    cana.position.copy(catahaq.position);
    cana.updateMatrixWorld();
  };
  qena.add(cana);
  return { cana, canaajUnihaqoxa };
}
