// ≺⧼ ֭ſɭw }ʃᴜȝ ʌ ꞁȷ̀ɔ j͑ʃᴜ ɭʃᴜͷ̗ ſɭᴜͷ̗ 🏗️ ⧽≻
import * as THREE from "three";

export interface VepaqHunaq { labelKey: string; wall: number; frame: number; chip: string; flavorKey: string; }
export const TIPARO: Record<string, VepaqHunaq> = {
  domo:   { labelKey: "vepaqHunaqDomo",      wall: 0x184838, frame: 0xd8b068, chip: "#78a88880", flavorKey: "vepaqPriskriboDomo" },
  mangxejo:  { labelKey: "vepaqHunaqMangxejo",  wall: 0x584028, frame: 0xd8c898, chip: "#c8a86880", flavorKey: "vepaqPriskriboMangxejo" },
  kasafeo: { labelKey: "vepaqHunaqKasafeo",    wall: 0xd8c898, frame: 0xd8b068, chip: "#e0d0a880", flavorKey: "vepaqPriskriboKasafeo" },
  stacioxipo: { labelKey: "vepaqHunaqStacioxipo", wall: 0xc8c8c8, frame: 0xd8b068, chip: "#c8c8c880", flavorKey: "vepaqPriskriboStacioxipo" },
  turo:   { labelKey: "vepaqHunaqTuro",        wall: 0x205040, frame: 0xd8b068, chip: "#88b8a080", flavorKey: "vepaqPriskriboTuro" },
  sanktejo: { labelKey: "vepaqHunaqSanktejo",  wall: 0x184038, frame: 0xe0c078, chip: "#e0c07880", flavorKey: "vepaqPriskriboSanktejo" },
};

/* ſɟɔȝ ʌ ɭʃᴜ }ʃɔƽ ʌ ꞙɭı ʌ ꞙɭı , ſɭɹ ʌ j͑ʃᴜꞇ
   ʌ j͑ʃɜ j͑ʃƨɹ ʌ ꞙɭı ⟅
@returns ɭʃᴜ }ʃɔƽ ʌ j͑ʃᴜꞇ ʌ ꞙɭɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ */
export const TIPAJ_NIVELOJ: Record<string, number> = {
  domo: 4, mangxejo: 4, kasafeo: 4, stacioxipo: 4, turo: 0o10, sanktejo: 7,
};

export interface VepaqSpec { x: number; z: number; type: string; name: string; havem2: number; w: number; d: number; tieroAlto: number; sube?: number; tieroAltoSub?: number; rot: number; fixed?: string; h0?: number; diamond?: boolean; flugoY?: number; }

const paqMaterialaStoko = new Map<string, THREE.MeshStandardMaterial>();
export function paqMaterialo(ca3aq: string, kf2: () => THREE.MeshStandardMaterial): THREE.MeshStandardMaterial {
  let m = paqMaterialaStoko.get(ca3aq);
  if ( !m ) { m = kf2(); paqMaterialaStoko.set(ca3aq, m); }
  return m;
}
