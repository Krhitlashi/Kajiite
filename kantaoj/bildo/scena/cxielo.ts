// ≺⧼ ſɟᴜ }ʃᴜ 🌤 ⧽≻
import * as THREE from "three";
import { kf2CxielanMaterialon, type CxielajUnihaqoxa } from "../../../eskekoj/komunajxoj/lumo.js";

export function kf2Cxielon(qena: THREE.Scene): {
  cxielo: THREE.Mesh;
  cxielajUnihaqoxa: CxielajUnihaqoxa;
} {
  // ⟨ ᶅſɔ ֭ſɭɹ ʌ ꞙɭı ʌ ꞙɭı ʌ ſɟᴜ }ʃᴜ , ſןɔ ſ͕ɭɔ }ʃꞇ ⟅ 📃 ⟩
  const cxielajUnihaqoxa: CxielajUnihaqoxa = {
    uTop: { value: new THREE.Color(0x78a8c0) },
    uMid: { value: new THREE.Color(0xb8d0d8) },
    uBot: { value: new THREE.Color(0xe0e8e8) },
    uSunCol: { value: new THREE.Color(0xf8f0d8) },
    uSunDir: { value: new THREE.Vector3(0o4/0o10, 0o63/0o100, 0o23/0o100) },
    uNokto: { value: 0o0 },
  };
  // ⟨ ſᶘᴜ j͑ʃᴜ ʌ j͑ʃɜ ſɭ,ᴜ ʌ ꞙɭı ʌ ꞙɭı , ſɟᴜ }ʃᴜ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ 📃 ⟩
  qena.userData.cxielajUnihaqoxa = cxielajUnihaqoxa;
  const cxielaGeometrio = new THREE.SphereGeometry(0o1170, 0o30, 0o20);
  const cxielo = new THREE.Mesh(cxielaGeometrio, kf2CxielanMaterialon(cxielajUnihaqoxa));
  // ⟨ ſɟᴜ }ʃᴜ ʌ j͑ʃᴜꞇ ʌ j͑ʃᴜ , ꞙɭɔ ʌ ſɟɔ ɭʃɹ ʌ j͑ʃ'ƽɹʞ 📃 ⟩
  cxielo.frustumCulled = false;
  cxielo.onBeforeRender = ( _bildilo, _sceno, fotilo ) => {
    cxielo.position.copy(fotilo.position);
    cxielo.updateMatrixWorld();
  };
  qena.add(cxielo);
  return { cxielo, cxielajUnihaqoxa };
}
