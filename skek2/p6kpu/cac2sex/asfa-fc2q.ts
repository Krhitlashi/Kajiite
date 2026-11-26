// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ꞁȷ̀ᴜ j͑ʃʞᴜ ʞᴜ̭ȝ 📃 ⧽≻

import * as THREE from "three";
import { hunanu } from "../haweh2.js";
import { kf2PinatanFc2qn } from "./xabe.js";

export const asfaFc2qKaŝo = new Map<boolean, THREE.CanvasTexture>();

export function kf2AsfanFc2qnCac2sex(kof: boolean = false): THREE.CanvasTexture {
  const kawake = asfaFc2qKaŝo.get(kof);
  if ( kawake ) return kawake;
  const cac2sex = kf2PinatanFc2qn({
    kanvasaSefini: 0o400,
    haqanu: kof ? 0o26 : 0o22,
    pinnaKovro: kof ? 0o67/0o100 : 0o77/0o100,
    pinnaTafkaq: 0o33/0o100,
    pinnaSvelto: 0o1/0o10,
    pinnaSefini: kof ? 0o3/0o20 : 0o17/0o100,
    lobaAmplitudo: kof ? 0o3/0o20 : 0o21/0o100,
    lobaNombro: 0o115/0o40,
    slaf: ( t, vek2fe ) =>
      `rgb(${Math.round(0o140 + t * 0o130 + ( vek2fe > 0o0 ? 0o20 : 0o0 ))},${Math.round(0o70 + t * 0o76)},${Math.round(0o226 + t * 0o124)})`,
    pukaz: hunanu(0x603890, 0o3, 0o35/0o100),
    vejno: "rgba(208,176,240,0.30)",
    raĥiso: "#482868",
    raĥisoSefini: 0o4,
  });
  asfaFc2qKaŝo.set(kof, cac2sex);
  return cac2sex;
}
