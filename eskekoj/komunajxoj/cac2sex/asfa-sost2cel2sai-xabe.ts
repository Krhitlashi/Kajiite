// ≺⧼ ſᶘꞇ }ʃɔ j͑ʃɜ j͑ʃƨɹ ſɟɔ j͐ʃɹ j͑ʃᴜꞇ ʌ ı],ᴜ ʃɔ j͑ʃᴜꞇ ʌ j͐ʃƽɜ }ʃꞇ 🌿 ⧽≻
import * as THREE from "three";
import { hunanu } from "../koloroj.js";
import { kf2PinatanFc2qn } from "./xabe.js";

export const asfaTronkaFc2qKaŝo = new Map<boolean, THREE.CanvasTexture>();

export function kf2AsfanTronkoxabenCac2sex(densa: boolean = false): THREE.CanvasTexture {
  const trovita = asfaTronkaFc2qKaŝo.get(densa);
  if ( trovita ) return trovita;
  const cac2sex = kf2PinatanFc2qn({
    kanvasaLargho: 0o340,
    paroj: densa ? 0o36 : 0o42,
    pinnaKovro: 0o75/0o100,
    pinnaAngulo: 0o35/0o100,
    pinnaSvelto: 0o1/0o10,
    pinnaLargho: densa ? 0o3/0o20 : 0o7/0o40,
    lobaAmplitudo: densa ? 0o3/0o20 : 0o17/0o100,
    lobaNombro: 0o123/0o40,
    slaf: ( t, kanto ) =>
      `rgb(${Math.round(0o150 + t * 0o126 + ( kanto > 0 ? 0o20 : 0 ))},${Math.round(0o74 + t * 0o76)},${Math.round(0o236 + t * 0o122)})`,
    pukaz: hunanu(0x683898, 0o3, 0o35/0o100),
    vejno: "rgba(208,176,240,0.28)",
    raĥiso: "#482868",
    raĥisoLargho: 3,
  });
  asfaTronkaFc2qKaŝo.set(densa, cac2sex);
  return cac2sex;
}
