// ≺⧼ មេឃ 🌤 ⧽≻
import * as THREE from "three";
import { kreiCxielanMaterialon, type CxielajUniformoj } from "../../../eskekoj/komunajxoj/lumo.js";

export function kreiCxielon(sceno: THREE.Scene): {
  cxielo: THREE.Mesh;
  cxielajUniformoj: CxielajUniformoj;
} {
  // ⟨ ពណ៌តែមួយសម្រាប់មេឃលើឆាក និងកញ្ចក់ឆ្លុះ ។ 📃 ⟩
  const cxielajUniformoj: CxielajUniformoj = {
    uTop: { value: new THREE.Color(0x78a8c0) },
    uMid: { value: new THREE.Color(0xb8d0d8) },
    uBot: { value: new THREE.Color(0xe0e8e8) },
    uSunCol: { value: new THREE.Color(0xf8f0d8) },
    uSunDir: { value: new THREE.Vector3(0o4/0o10, 0o63/0o100, 0o23/0o100) },
  };
  const cxielaGeometrio = new THREE.SphereGeometry(0o1170, 0o30, 0o20);
  const cxielo = new THREE.Mesh(cxielaGeometrio, kreiCxielanMaterialon(cxielajUniformoj));
  sceno.add(cxielo);
  return { cxielo, cxielajUniformoj };
}
