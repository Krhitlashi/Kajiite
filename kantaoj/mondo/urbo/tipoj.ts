// ≺⧼ ប្រភេទទីក្រុង 🏙️ ⧽≻
import * as THREE from "three";
import { KonstruSpec } from "../../../eskekoj/konstruajxoj/satalaj/tipoj.js";
import { RiverData } from "../../../eskekoj/medio/akvo.js";
import { BestoSistemo, PetreloSistemo } from "../../../eskekoj/shalaj-specioj/bestoj.js";
import { MangxajxItemo } from "../../../eskekoj/mebloj/mangxajxoj/tipoj.js";
import type { VojDifino } from "../../../eskekoj/medio/vojoj/tipoj.js";
import type { AldonaBloko } from "../krado/tipoj.js";
import { HxeuxfaSistemo } from "../../../eskekoj/konstruajxoj/hxeuxfa/tipoj.js";
import { Kanoto } from "../../../eskekoj/medio/transporto.js";
import type { Figuro, Vesto } from "../../../eskekoj/shalaj-specioj/homoj.js";
import type { InternaSistemo } from "../../../eskekoj/konstruajxoj/internoj/tipoj.js";
import type { Krasesxagxo } from "../../../eskekoj/konstruajxoj/krasesxagxa-kosmosxipo.js";

export interface NebulaSistemo {
  punktoj: THREE.Points;
  uTime: { value: number };
}

export interface UrbaSistemo {
  konstruSpecoj: KonstruSpec[];
  kolizioj: { x: number; z: number; r: number }[];
  dokoKolizioj: { x: number; z: number; w: number; d: number; rot: number; y: number }[];
  selektajxoj: THREE.Mesh[];
  konstruGrupoj: THREE.Group[];
  vojSpecimenoj: THREE.Vector3[];
  placajNodoj: [ number, number ][];
  riverData: RiverData | null;
  riveroNordOrienta: RiverData | null;
  lago: RiverData | null;
  skulptaAkvo: RiverData | null;
  bestoj: BestoSistemo;
  petreloj: PetreloSistemo;
  lampSistemo: HxeuxfaSistemo;
  nebulSistemo: NebulaSistemo;
  kanuoj: Kanoto[];
  pussxlefoBeroj: MangxajxItemo[];
  npcoj: Figuro[];
  internaSistemo: InternaSistemo;
  xipo: Krasesxagxo | null;
  vojDifinoj: VojDifino[];
  vojDuonLargho: ( g: number ) => number;
  NPCLOKOJ: [ number, number ][];
  VESTA_LISTO: Vesto[];
}

export interface SkulptaUrbo {
  nomo: string;
  arangxaGrando: number;
  blokaGrando: "unu" | "kvar";
  ofsX: number;
  ofsZ: number;
  keuxfhxeso?: boolean;
  lampoj?: boolean;
  aldonajBlokoj?: AldonaBloko[];
  superoj?: Record<string, string>;
}

export interface SkulptaVojo {
  nomo: string;
  larĝo: number;
  punktoj: [ number, number ][];
  pontoLarĝo?: number;
}

export interface SkulptaPlatformo {
  x: number;
  z: number;
  profundo: number;
  rotacio?: number;
}

export interface MetitaObjekto {
  x: number;
  z: number;
  speco: string;
  skalo?: number;
  rotacio?: number;
  bestospeco?: number;
  radio?: number;
  vesto?: number;
  harstilo?: number;
  filikaSpeco?: number;
  stilo?: string;
}
