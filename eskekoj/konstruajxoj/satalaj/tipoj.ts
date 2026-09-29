// ≺⧼ La satalaj tipoj 🏗️ ⧽≻
// La tiparoj kaj la speco de konstruaĵo — la tipaj etikedoj kaj muroj ( KonstruTipo ),
// la tiparo ( TIPARO ), la konstru-speco ( KonstruSpec ) kaj la kaŝmemoro de la
// konstruaĵaj materialoj ( konstruajxaMaterialo ).
import * as THREE from "three";

export interface KonstruTipo { labelKey: string; wall: number; frame: number; chip: string; flavorKey: string; }
export const TIPARO: Record<string, KonstruTipo> = {
  domo:   { labelKey: "tipDomo",      wall: 0x184838, frame: 0xd8b068, chip: "#78a88880", flavorKey: "flvDomo" },
  mangxejo:  { labelKey: "tipMangxejo",  wall: 0x584028, frame: 0xd8c898, chip: "#c8a86880", flavorKey: "flvMangxejo" },
  kasafeo: { labelKey: "tipKasafeo",    wall: 0xd8c898, frame: 0xd8b068, chip: "#e0d0a880", flavorKey: "flvKasafeo" },
  stacioxipo: { labelKey: "tipStacioxipo", wall: 0xc8c8c8, frame: 0xd8b068, chip: "#c8c8c880", flavorKey: "flvStacioxipo" },
  turo:   { labelKey: "tipTuro",        wall: 0x205040, frame: 0xd8b068, chip: "#88b8a080", flavorKey: "flvTuro" },
  sanktejo: { labelKey: "tipSanktejo",  wall: 0x184038, frame: 0xe0c078, chip: "#e0c07880", flavorKey: "flvSanktejo" },
};

export interface KonstruSpec { x: number; z: number; type: string; name: string; niveloj: number; w: number; d: number; tieroAlto: number; sube?: number; tieroAltoSub?: number; rot: number; fixed?: string; h0?: number; diamond?: boolean; flugoY?: number; }

// konstruajxaMaterialo — La komuna materiala cacheo de la satalaj konstruajxoj.
// La sama ( tipo, koloro ) kombinajxo aperas en dekdekon da konstruaĵoj — la
// cacheo redonas UNU materialon po ŝlosilo anstataŭ freŝa materialo po voko
// ( malpli da materialoj = malpli da ŝanĝoj de materialo inter desegno-vokoj ).
const konstruajxaMaterialaStoko = new Map<string, THREE.MeshStandardMaterial>();
export function konstruajxaMaterialo(ŝlosilo: string, krei: () => THREE.MeshStandardMaterial): THREE.MeshStandardMaterial {
  let m = konstruajxaMaterialaStoko.get(ŝlosilo);
  if ( !m ) { m = krei(); konstruajxaMaterialaStoko.set(ŝlosilo, m); }
  return m;
}
