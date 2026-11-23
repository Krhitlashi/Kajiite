// ≺⧼ ſᶘꞇ }ʃɔ j͑ʃͷ̗ᴜʞ ꞁȷ̀ᴜꞇ ʌ j͐ʃƽɜ }ʃꞇ 🌿 ⧽≻
import * as THREE from "three";
import { hunanu } from "../koloroj.js";
import { kf2PinatanFc2qn } from "./xabe.js";

export const asfaFc2qKaŝo = new Map<boolean, THREE.CanvasTexture>();

export function kf2AsfanFc2qnCac2sex(densa: boolean = false): THREE.CanvasTexture {
  const trovita = asfaFc2qKaŝo.get(densa);
  if ( trovita ) return trovita;
  const cac2sex = kf2PinatanFc2qn({
    kanvasaLargho: 0o400,
    paroj: densa ? 0o26 : 0o22,
    pinnaKovro: densa ? 0o67/0o100 : 0o77/0o100,
    pinnaAngulo: 0o33/0o100,
    pinnaSvelto: 0o1/0o10,
    pinnaLargho: densa ? 0o3/0o20 : 0o17/0o100,
    lobaAmplitudo: densa ? 0o3/0o20 : 0o21/0o100,
    lobaNombro: 0o115/0o40,
    slaf: ( t, kanto ) =>
      `rgb(${Math.round(0o140 + t * 0o130 + ( kanto > 0 ? 0o20 : 0 ))},${Math.round(0o70 + t * 0o76)},${Math.round(0o226 + t * 0o124)})`,
    pukaz: hunanu(0x603890, 0o3, 0o35/0o100),
    vejno: "rgba(208,176,240,0.30)",
    raĥiso: "#482868",
    raĥisoLargho: 4,
  });
  asfaFc2qKaŝo.set(densa, cac2sex);
  return cac2sex;
}
