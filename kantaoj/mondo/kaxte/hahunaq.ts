// ≺⧼ ſɭᴜ ı],ƨɔ j͑ʃᴜꞇ ʌ ֭ſɭw }ʃᴜȝ 🏙️ ⧽≻
import * as THREE from "three";
import { VepaqSpec } from "../../../eskekoj/hapaq/satalaj/hahunaq.js";
import { RiverData } from "../../../eskekoj/medio/akvo.js";
import { PagaSistemo, TemekSistemo } from "../../../eskekoj/shalaj-hapudal/hapaga.js";
import { MangxajxItemo } from "../../../eskekoj/mebloj/mangxajxoj/hahunaq.js";
import type { VojDifino } from "../../../eskekoj/medio/hak6h6/hahunaq.js";
import type { AldonaBloko } from "../krado/hahunaq.js";
import { HxeuxfaSistemo } from "../../../eskekoj/hapaq/hxeuxfa/hahunaq.js";
import { Kanoto } from "../../../eskekoj/medio/transporto.js";
import type { Figuro, Vesto } from "../../../eskekoj/shalaj-hapudal/hamaz.js";
import type { InternaSistemo } from "../../../eskekoj/hapaq/internoj/hahunaq.js";
import type { Krasesxagxo } from "../../../eskekoj/hapaq/krasesxagxa-kosmosxipo.js";

export interface NebulaSistemo {
  n2k: THREE.Points;
  uTime: { value: number };
}

export interface UrbaSistemo {
  vepaqPudalj: VepaqSpec[];
  kolizioj: { x: number; z: number; r: number }[];
  qakaj2Kolizioj: { x: number; z: number; w: number; d: number; rot: number; y: number }[];
  selektajxoj: THREE.Mesh[];
  vepaqGrupoj: THREE.Group[];
  vojSpecimenoj: THREE.Vector3[];
  placajNodoj: [ number, number ][];
  riverData: RiverData | null;
  riveroNordOrienta: RiverData | null;
  lago: RiverData | null;
  skulptaAkvo: RiverData | null;
  hapaga: PagaSistemo;
  hatemek: TemekSistemo;
  lampSistemo: HxeuxfaSistemo;
  nebulSistemo: NebulaSistemo;
  kanuoj: Kanoto[];
  tlexlefp2saiBeroj: MangxajxItemo[];
  npcoj: Figuro[];
  internaSistemo: InternaSistemo;
  xipo: Krasesxagxo | null;
  vojDifinoj: VojDifino[];
  vojDuonLargho: ( g: number ) => number;
  NPCLOKOJ: [ number, number ][];
  VESTA_LISTO: Vesto[];
}

export interface SkulptaKaxte {
  ksaka: string;
  arangxaGrando: number;
  blokaGrando: "unu" | "kvar";
  ofsX: number;
  ofsZ: number;
  keuxfhxeso?: boolean;
  lampoj?: boolean;
  aldonajBlokoj?: AldonaBloko[];
  superoj?: Record<string, string>;
}

export interface SkulptaK6h6 {
  ksaka: string;
  sefini: number;
  n2k: [ number, number ][];
  pontoSefini?: number;
}

export interface SkulptaPlatqoxa {
  x: number;
  z: number;
  profundo: number;
  rotacio?: number;
}

export interface MetitaObjekto {
  x: number;
  z: number;
  pudal: string;
  p6zukani?: number;
  rotacio?: number;
  pagapudal?: number;
  radio?: number;
  vesto?: number;
  harstilo?: number;
  xabePudal?: number;
  stilo?: string;
}
