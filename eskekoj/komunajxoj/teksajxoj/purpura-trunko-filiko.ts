// ≺⧼ Purpura trunka filika teksajxo 🌿 ⧽≻
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
    pinnaKovro: 0.95,
    pinnaAngulo: 0.45,
    pinnaSvelto: 0.12,
    pinnaLargho: densa ? 0.19 : 0.22,
    lobaAmplitudo: densa ? 0o3/0o20 : 0.24,
    lobaNombro: 2.6,
    folio: ( t, flanko ) =>
      `rgb(${Math.round(104 + t * 86 + ( flanko > 0 ? 16 : 0 ))},${Math.round(60 + t * 62)},${Math.round(158 + t * 82)})`,
    rando: ombro(0x683898, 0o3, 0.45),
    vejno: "rgba(214,178,244,0.28)",
    raĥiso: "#4a2a68",
    raĥisoLargho: 3,
  });
  purpuraTronkaFrondaKaŝo.set(densa, teksajxo);
  return teksajxo;
}
