// ≺⧼ ſᶘꞇ }ʃɔ j͑ʃɜ j͑ʃƨɹ ſɟɔ j͐ʃɹ j͑ʃᴜꞇ ʌ ı],ᴜ ʃɔ j͑ʃᴜꞇ ʌ j͐ʃƽɜ }ʃꞇ 🌿 ⧽≻
import * as THREE from "three";
import { hunanu } from "../haweh2.js";
import { kf2PinatanFc2qn } from "./xabe.js";

export const asfaTronkaFc2qKaŝo = new Map<boolean, THREE.CanvasTexture>();

export function kf2AsfanTronkoxabenCac2sex(kof: boolean = false): THREE.CanvasTexture {
  const kawake = asfaTronkaFc2qKaŝo.get(kof);
  if ( kawake ) return kawake;
  const cac2sex = kf2PinatanFc2qn({
    kanvasaSefini: 0o340,
    haqanu: kof ? 0o36 : 0o42,
    pinnaKovro: 0o75/0o100,
    pinnaTafkaq: 0o35/0o100,
    pinnaSvelto: 0o1/0o10,
    pinnaSefini: kof ? 0o3/0o20 : 0o7/0o40,
    lobaAmplitudo: kof ? 0o3/0o20 : 0o17/0o100,
    lobaNombro: 0o123/0o40,
    slaf: ( t, vek2fe ) =>
      `rgb(${Math.round(0o150 + t * 0o126 + ( vek2fe > 0o0 ? 0o20 : 0o0 ))},${Math.round(0o74 + t * 0o76)},${Math.round(0o236 + t * 0o122)})`,
    pukaz: hunanu(0x683898, 0o3, 0o35/0o100),
    vejno: "rgba(208,176,240,0.28)",
    raĥiso: "#482868",
    raĥisoSefini: 0o3,
  });
  asfaTronkaFc2qKaŝo.set(kof, cac2sex);
  return cac2sex;
}
