// ≺⧼ ֭ſɭw }ʃᴜȝ 📐 ⧽≻
export interface KradaArangxo {
  ptaluPal6: number;
  k6liqPal6: "vakox2qita" | "kvar";
  kekufxeso?: boolean;
  hahufwuk2?: boolean;
}
export type CellType = "kap2" | "turo" | "geqqa" | "kasafeo" | "qaman2" | "ka5asexaz";
export type KradaK2pa = [ number, number, CellType ];
export interface KradaPaq {
  x: number; z: number; rot: number; hunaq: CellType;
  cx: number; cz: number;
  veq6k2: "sost2" | "NE" | "NW" | "SW" | "SE";
  stacia: boolean;
  ekstra?: boolean;
  konektita?: boolean;
}

export interface AldonaK6liq {
  x: number;
  z: number;
  hunaq: CellType;
  rot?: number;
  veq6k2?: KradaPaq["veq6k2"];
  stacia?: boolean;
  konektita?: boolean;
}

export interface KradaKas2kantaS2nasce {
  orient: "NS" | "EW";
  haxekuxa: number;
  de: number; al: number;
  stacia?: boolean;
}

export interface KradaSpono {
  de: [ number, number ];
  al: [ number, number ];
  paq: number;
}

export interface KradaPlano {
  ptalu: KradaArangxo;
  haKekkozusai: KradaK2pa[];
  TONA: number;
  nordaN2k: number;
  t2q2X: number;
  t2q2Suda: number;
  sudaK6h6: number;
  ka5asexazZ: number;
  staciaRingaNordo: number;
  paqj: KradaPaq[];
  hak6h6: KradaKas2kantaS2nasce[];
  hatohtanu: KradaSpono[];
  spurXoj: number[];
  spurZoj: number[];
  caxlefkakaiX: number[];
  caxlefkakaiZ: number[];
  hahufwuk2: { x: number; z: number }[];
}
