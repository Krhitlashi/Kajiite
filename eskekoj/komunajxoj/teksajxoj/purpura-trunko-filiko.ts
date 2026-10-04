// ≺⧼ វាយនភាពដើមស្វាយហ្វីលីកា 🌿 ⧽≻
import * as THREE from "three";
import { ombro } from "../koloroj.js";
import { kreiPinatanFrondon } from "./filiko.js";

export const purpuraTronkaFrondaKaŝo = new Map<boolean, THREE.CanvasTexture>();

export function kreiPurpuranTronkofilikanTeksajxon(densa: boolean = false): THREE.CanvasTexture {
  const trovita = purpuraTronkaFrondaKaŝo.get(densa);
  if ( trovita ) return trovita;
  const teksajxo = kreiPinatanFrondon({
    kanvasaLargho: 0o340,
    paroj: densa ? 0o36 : 0o42,
    pinnaKovro: 0o75/0o100,
    pinnaAngulo: 0o35/0o100,
    pinnaSvelto: 0o1/0o10,
    pinnaLargho: densa ? 0o3/0o20 : 0o7/0o40,
    lobaAmplitudo: densa ? 0o3/0o20 : 0o17/0o100,
    lobaNombro: 0o123/0o40,
    folio: ( t, flanko ) =>
      `rgb(${Math.round(0o150 + t * 0o126 + ( flanko > 0 ? 0o20 : 0 ))},${Math.round(0o74 + t * 0o76)},${Math.round(0o236 + t * 0o122)})`,
    rando: ombro(0x683898, 0o3, 0o35/0o100),
    vejno: "rgba(214,178,244,0.28)",
    raĥiso: "#4a2a68",
    raĥisoLargho: 3,
  });
  purpuraTronkaFrondaKaŝo.set(densa, teksajxo);
  return teksajxo;
}
