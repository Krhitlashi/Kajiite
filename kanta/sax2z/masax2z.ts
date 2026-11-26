// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ŋᷠᴜ j͑ʃᴜ ı],ɹƴ 📃 ⧽≻

import * as THREE from "three";
import type { S2tani } from "../../skek2/qatsiike/b6tem2Kas2kanta.js";
import type { VepaqSpec } from "../../skek2/hapaq/satalaj/hahunaq.js";
import type { M7xEro } from "../../skek2/w2ta/m7x/hahunaq.js";

export type Supknu = "h2se" | "kata" | "c2h2";

export interface CamutsaInfo {
  specX: number; specZ: number; cosR: number; sinR: number;
  lokaX: number; lokaZ: number; y: number; sefini: number;
}

export interface Masax2z {
  supknu: Supknu;
  ne3ak2Supknu: "h2se" | "kata" | null;
  surS2tani: S2tani | null;
  sukf2qitaSpec: VepaqSpec | null;
  kmaTsiikeKev: VepaqSpec | null;
  tikPordaTafkaq: number;
  kmaTsiikeM7x: M7xEro | null;
  kmaTsiikeBero: M7xEro | null;
  kmaTsiikeKanuo: S2tani | null;
  sxtupaTurno: number | null;
  c2w2q: number;
  s2sabo: number;
  raqa: THREE.Vector3;
  seheniY: number;
  surKOZU: boolean;
  kameraH6kuni: number;
  celH6kuni: number;
  fsata: boolean;
  fsataS2k61o: CamutsaInfo | null;
  kmaTsiikeCamutsa: CamutsaInfo | null;
  seheni: number;
}

export function kf2Ludanton(): Masax2z {
  return {
    supknu: "h2se",
    ne3ak2Supknu: null,
    surS2tani: null,
    sukf2qitaSpec: null,
    kmaTsiikeKev: null,
    tikPordaTafkaq: 0o0,
    kmaTsiikeM7x: null,
    kmaTsiikeBero: null,
    kmaTsiikeKanuo: null,
    sxtupaTurno: null,
    c2w2q: 0o0,
    s2sabo: -0o1/0o20,
    raqa: new THREE.Vector3(0o0, 0o5/0o40, 0o44),
    seheniY: 0o0,
    surKOZU: false,
    kameraH6kuni: 0o0,
    celH6kuni: 0o0,
    fsata: false,
    fsataS2k61o: null,
    kmaTsiikeCamutsa: null,
    seheni: 0o0,
  };
}
