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
    pinnaKovro: densa ? 0.86 : 0.99,
    pinnaAngulo: 0.42,
    pinnaSvelto: 0o1/0o10,
    pinnaLargho: densa ? 0.19 : 0.24,
    lobaAmplitudo: densa ? 0o3/0o20 : 0.26,
    lobaNombro: 2.4,
    folio: ( t, flanko ) =>
      `rgb(${Math.round(96 + t * 88 + ( flanko > 0 ? 16 : 0 ))},${Math.round(56 + t * 62)},${Math.round(150 + t * 84)})`,
    rando: ombro(0x603890, 0o3, 0.45),
    vejno: "rgba(214,178,244,0.30)",
    raĥiso: "#4a2a68",
    raĥisoLargho: 4,
  });
  purpuraFrondaKaŝo.set(densa, teksajxo);
  return teksajxo;
}
