// ≺⧼ ŋᷠᴜ j͑ʃ'ɔ j͑ʃᴜ ı],ɹƴ 🎮 ⧽≻
import * as THREE from "three";
import type { S2tani } from "../../skek2/qatsiike/b6tem2Kas2kanta.js";
import type { VepaqSpec } from "../../skek2/hapaq/satalaj/hahunaq.js";
import type { MangxajxEro } from "../../skek2/w2ta/m7x/hahunaq.js";

export type Supknu = "orbito" | "promeno" | "c2h2";

export interface CamutsaInfo {
  specX: number; specZ: number; cosR: number; sinR: number;
  lokaX: number; lokaZ: number; y: number; sefini: number;
}

export interface Masax2z {
  supknu: Supknu;
  ne3ak2Supknu: "orbito" | "promeno" | null;
  surS2tani: S2tani | null;
  sukf2qitaSpec: VepaqSpec | null;
  kmaTsiikeKev: VepaqSpec | null;
  tikPordaTafkaq: number;
  kmaTsiikeManĝaĵo: MangxajxEro | null;
  kmaTsiikeBero: MangxajxEro | null;
  kmaTsiikeKanuo: S2tani | null;
  sxtupaTurno: number | null;
  c2w2q: number;
  s2sabo: number;
  raqa: THREE.Vector3;
  seheniY: number;
  estasSurKOZU: boolean;
  kameraH6kuni: number;
  celH6kuni: number;
  fsata: boolean;
  kuŝaS2k61o: CamutsaInfo | null;
  kmaTsiikeCamutsa: CamutsaInfo | null;
  movoVem2: number;
}

export function kf2Ludanton(): Masax2z {
  return {
    supknu: "orbito",
    ne3ak2Supknu: null,
    surS2tani: null,
    sukf2qitaSpec: null,
    kmaTsiikeKev: null,
    tikPordaTafkaq: 0o0,
    kmaTsiikeManĝaĵo: null,
    kmaTsiikeBero: null,
    kmaTsiikeKanuo: null,
    sxtupaTurno: null,
    c2w2q: 0o0,
    s2sabo: -0o1/0o20,
    raqa: new THREE.Vector3(0o0, 0o5/0o40, 0o44),
    seheniY: 0o0,
    estasSurKOZU: false,
    kameraH6kuni: 0o0,
    celH6kuni: 0o0,
    fsata: false,
    kuŝaS2k61o: null,
    kmaTsiikeCamutsa: null,
    movoVem2: 0o0,
  };
}
