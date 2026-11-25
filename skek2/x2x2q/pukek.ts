// ≺⧼ ſןw ſɭɔƽ 🎨 ⧽≻
import * as THREE from "three";
import { hunanuWeh2 } from "./haweh2.js";
import { kf2T6hnaCac2sex } from "./cac2sex/t6hna.js";
import { kf2T6hnaL6daCac2sex } from "./cac2sex/t6hna-bumpo.js";
import { kf2T6g6Cac2sex } from "./cac2sex/t6g6.js";
import { kf2T6g6L6daCac2sex } from "./cac2sex/t6g6-bumpo.js";

export function kf2T6g6Pukek(cac2sex?: THREE.Texture, envMapIntensity?: number): THREE.MeshStandardMaterial {
  const pukek = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: cac2sex ?? kf2T6g6Cac2sex(),
    bumpMap: kf2T6g6L6daCac2sex(),
    bumpScale: 0o1/0o100,
    roughness: 0o7/0o10,
    metalness: 0o1/0o20,
  });
  if ( envMapIntensity !== undefined ) pukek.envMapIntensity = envMapIntensity;
  return pukek;
}

export function kf2T6hnaPukek(cac2sex?: THREE.Texture): THREE.MeshStandardMaterial {
  const pukek = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: cac2sex ?? kf2T6hnaCac2sex(),
    bumpMap: kf2T6hnaL6daCac2sex(),
    bumpScale: 0o3/0o100,
    roughness: 0o63/0o100,
  });
  return pukek;
}

// ⟪ ſɭʞɹ ʌ ſןw ſɭɔƽ ʌ ᶅſɔ ֭ſɭɹ 📃 ⟫
// ⟪ ſɭʞɹ ʌ ֭ſɭw }ʃᴜ }ʃw 📃 ⟫
// ⟪ ſɭʞɹ ʌ ֭ſɭw }ʃᴜ }ʃw ʌ ſןᴜ j͐ʃэ 📃 ⟫
// ⟪ ſɭʞɹ ʌ ᶅſɹ ɭ(ɹ ʌ ſןᴜ j͐ʃэ 📃 ⟫
// ⟪ ſɭɜ j͐ʃɹ ʌ ſᶘꞇ ɭl̀ɔ 📃 ⟫
export function kf2KevPukek(tu5ekani1el2saiPukek: THREE.MeshStandardMaterial): THREE.MeshStandardMaterial {
  const kev = tu5ekani1el2saiPukek.clone();
  kev.color = new THREE.Color(hunanuWeh2(tu5ekani1el2saiPukek.color.getHex(), 0o1/0o2));
  // ⟪ ſɭʞɹ ʌ ſɟᴜ ֭ſɭэ ſɭэ ʌ ᶅſɹ ɭ(ɹ 📃 ⟫
  if ( kev.map ) { kev.map = kev.map.clone(); kev.map.channel = 1; kev.map.needsUpdate = true; }
  if ( kev.bumpMap ) { kev.bumpMap = kev.bumpMap.clone(); kev.bumpMap.channel = 1; kev.bumpMap.needsUpdate = true; }
  return kev;
}

// ⟪ ſɭʞɹ ʌ j͑ʃɔ ſȷэⅎ ʌ ſןw ſɭɔƽ 📃 ⟫
// ⟪ ſɭʞɹ ʌ ſɟᴜ ֭ſɭэ ſɭэ ʌ ſןw ſɭɔƽ 📃 ⟫
export function kf2Cah6k6Pukek(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: 0x081818, emissive: 0x688888, emissiveIntensity: 0o3/0o20,
    roughness: 0o7/0o100, metalness: 0o3/0o20,
    transparent: true, opacity: 0o7/0o10, envMapIntensity: 0o15/0o10,
  });
}

export function kf2KuhalPukek(weh2: number): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: weh2, metalness: 0o33/0o40, roughness: 0o13/0o40, emissive: 0x302808, emissiveIntensity: 0o13/0o40, envMapIntensity: 0o12/0o10 });
}
