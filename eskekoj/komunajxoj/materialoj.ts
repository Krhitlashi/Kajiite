// ≺⧼ វត្ថុធាតុ 🎨 ⧽≻
import * as THREE from "three";
import { ombraKoloro } from "./koloroj.js";
import { kreiAndezitanTeksajxon } from "./teksajxoj/andezito.js";
import { kreiAndezitanBumpanTeksajxon } from "./teksajxoj/andezito-bumpo.js";
import { kreiDioritanTeksajxon } from "./teksajxoj/diorito.js";
import { kreiDioritanBumpanTeksajxon } from "./teksajxoj/diorito-bumpo.js";

export function kreiDioritanMaterialon(map?: THREE.Texture, envMapIntensity?: number): THREE.MeshStandardMaterial {
  const m = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: map ?? kreiDioritanTeksajxon(),
    bumpMap: kreiDioritanBumpanTeksajxon(),
    bumpScale: 0o1/0o100,
    roughness: 0o1/0o10,
    metalness: 0o1/0o20,
  });
  if ( envMapIntensity !== undefined ) m.envMapIntensity = envMapIntensity;
  return m;
}

export function kreiAndezitanMaterialon(map?: THREE.Texture): THREE.MeshStandardMaterial {
  const m = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: map ?? kreiAndezitanTeksajxon(),
    bumpMap: kreiAndezitanBumpanTeksajxon(),
    bumpScale: 0o3/0o100,
    roughness: 0o63/0o100,
  });
  return m;
}

// ⟨ ពណ៌មកពីអគារ 📃 ⟩
// ⟨ ការធ្វើឲ្យងងឹតជាការដក 📃 ⟩
// ⟨ ការដកប៉ុន្មាន 📃 ⟩
// ⟨ ហេតុអ្វីមិនតូចជាង 📃 ⟩
// ⟨ ការបញ្ចេញពន្លឺបាត់ 📃 ⟩
export function kreiPordanMaterialon(muraMaterialo: THREE.MeshStandardMaterial): THREE.MeshStandardMaterial {
  const pordo = muraMaterialo.clone();
  pordo.color = new THREE.Color(ombraKoloro(muraMaterialo.color.getHex(), 0o1/0o2));
  return pordo;
}

// ⟨ ឧទាហរណ៍ថ្មីជានិច្ច 📃 ⟩
// ⟨ អ្វីធ្វើឲ្យវាជាកញ្ចក់ 📃 ⟩
export function kreiFenestranMaterialon(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: 0x081818, emissive: 0x688888, emissiveIntensity: 0o3/0o20,
    roughness: 0o7/0o100, metalness: 0o3/0o20,
    transparent: true, opacity: 0o7/0o10, envMapIntensity: 0o15/0o10,
  });
}

export function kreiOranMaterialon(koloro: number): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: koloro, metalness: 0o33/0o40, roughness: 0o13/0o40, emissive: 0x302808, emissiveIntensity: 0o13/0o40, envMapIntensity: 0o12/0o10 });
}
