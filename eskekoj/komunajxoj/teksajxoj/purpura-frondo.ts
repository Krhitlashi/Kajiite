// ≺⧼ វាយនភាពស្លឹកស្វាយ 🌿 ⧽≻
import * as THREE from "three";
import { ombro } from "../koloroj.js";
import { kreiPinatanFrondon } from "./filiko.js";

export const purpuraFrondaKaŝo = new Map<boolean, THREE.CanvasTexture>();

export function kreiPurpuranFrondanTeksajxon(densa: boolean = false): THREE.CanvasTexture {
  const trovita = purpuraFrondaKaŝo.get(densa);
  if ( trovita ) return trovita;
  const teksajxo = kreiPinatanFrondon({
    kanvasaLargho: 0o400,
    paroj: densa ? 0o26 : 0o22,
    pinnaKovro: densa ? 0o67/0o100 : 0o77/0o100,
    pinnaAngulo: 0o33/0o100,
    pinnaSvelto: 0o1/0o10,
    pinnaLargho: densa ? 0o3/0o20 : 0o17/0o100,
    lobaAmplitudo: densa ? 0o3/0o20 : 0o21/0o100,
    lobaNombro: 0o115/0o40,
    folio: ( t, flanko ) =>
      `rgb(${Math.round(0o140 + t * 0o130 + ( flanko > 0 ? 0o20 : 0 ))},${Math.round(0o70 + t * 0o76)},${Math.round(0o226 + t * 0o124)})`,
    rando: ombro(0x603890, 0o3, 0o35/0o100),
    vejno: "rgba(214,178,244,0.30)",
    raĥiso: "#4a2a68",
    raĥisoLargho: 4,
  });
  purpuraFrondaKaŝo.set(densa, teksajxo);
  return teksajxo;
}
