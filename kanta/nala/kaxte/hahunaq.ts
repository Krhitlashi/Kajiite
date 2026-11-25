// ≺⧼ ſɭᴜ ı],ƨɔ j͑ʃᴜꞇ ʌ ֭ſɭw }ʃᴜȝ 🏙️ ⧽≻
import * as THREE from "three";
import { VepaqSpec } from "../../../skek2/hapaq/satalaj/hahunaq.js";
import { RiverData } from "../../../skek2/qatsiike/tsasa.js";
import { PagaKanta, TemekKanta } from "../../../skek2/pudal/hapaga.js";
import { MangxajxEro } from "../../../skek2/w2ta/m7x/hahunaq.js";
import type { Kas2kantaDitlakak } from "../../../skek2/qatsiike/hak6h6/hahunaq.js";
import type { AldonaK6liq } from "../qox2n2k/hahunaq.js";
import { HxeuxfaKanta } from "../../../skek2/hapaq/hxeuxfa/hahunaq.js";
import { S2tani } from "../../../skek2/qatsiike/b6tem2Kas2kanta.js";
import type { Qoxa, Soqte } from "../../../skek2/pudal/hamaz.js";
import type { C2h2Kanta } from "../../../skek2/hapaq/hac2h2/hahunaq.js";
import type { Krasesxagxo } from "../../../skek2/hapaq/krasesxagxa-kosmosxipo.js";

export interface NebulaKanta {
  n2k: THREE.Points;
  uTime: { value: number };
}

export interface UrbaKanta {
  vepaqPudalj: VepaqSpec[];
  hasap2: { x: number; z: number; r: number }[];
  qakaj2Hasap2ni: { x: number; z: number; w: number; d: number; rot: number; y: number }[];
  knasukf2qdalai: THREE.Mesh[];
  vepaqHahate: THREE.Group[];
  kas2kantaHapx01o: THREE.Vector3[];
  haqotawaHamaxema: [ number, number ][];
  riverData: RiverData | null;
  k6siNordOrienta: RiverData | null;
  s2xuru: RiverData | null;
  knat6keqanuTsasa: RiverData | null;
  hapaga: PagaKanta;
  hatemek: TemekKanta;
  lampKanta: HxeuxfaKanta;
  nebulKanta: NebulaKanta;
  has2kaj2: S2tani[];
  tlexlefp2saiBeroj: MangxajxEro[];
  hanpco: Qoxa[];
  c2h2Kanta: C2h2Kanta;
  xipo: Krasesxagxo | null;
  kas2kantaHavop2ni: Kas2kantaDitlakak[];
  kas2kantaP2somaniSefini: ( g: number ) => number;
  NPCLOKOJ: [ number, number ][];
  VESTALISTO: Soqte[];
}

export interface Knat6keqanuKuba {
  ksaka: string;
  ptaluPal6: number;
  k6liqPal6: "vakox2qita" | "kvar";
  ofsX: number;
  ofsZ: number;
  kekufxeso?: boolean;
  hahufwuk2?: boolean;
  tlunakHak6liq?: AldonaK6liq[];
  hateru?: Record<string, string>;
}

export interface Knat6keqanuK6h6N2k {
  ksaka: string;
  sefini: number;
  n2k: [ number, number ][];
  c2kanuSefini?: number;
}

export interface Knat6keqanuTap2Qoxa {
  x: number;
  z: number;
  jufu: number;
  s2sabo?: number;
}

export interface Neq2qObjekto {
  x: number;
  z: number;
  pudal: string;
  p6zukani?: number;
  s2sabo?: number;
  pagapudal?: number;
  cabole?: number;
  soqte?: number;
  tsaqHaxe?: number;
  xabePudal?: number;
  haxe?: string;
}
