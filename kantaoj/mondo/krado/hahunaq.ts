// ≺⧼ ֭ſɭw }ʃᴜȝ 📐 ⧽≻
export interface KradaArangxo {
  arangxaGrando: number;
  blokaGrando: "unu" | "kvar";
  keuxfhxeso?: boolean;
  lampoj?: boolean;
}
export type CellType = "domo" | "turo" | "mangxejo" | "kasafeo" | "sanktejo" | "stacio";
export type KradaK2pa = [ number, number, CellType ];
export interface KradaPaq {
  x: number; z: number; rot: number; hunaq: CellType;
  cx: number; cz: number;
  sub: "centro" | "NE" | "NW" | "SW" | "SE";
  stacia: boolean;
  ekstra?: boolean;
  konektita?: boolean;
}

export interface AldonaBloko {
  x: number;
  z: number;
  hunaq: CellType;
  rot?: number;
  sub?: KradaPaq["sub"];
  stacia?: boolean;
  konektita?: boolean;
}

export interface KradaVojS2nasce {
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
  arangxo: KradaArangxo;
  haKekkozusai: KradaK2pa[];
  PASXO: number;
  nordaPinto: number;
  ringoX: number;
  ringoSuda: number;
  sudaK6h6: number;
  stacioZ: number;
  staciaRingaNordo: number;
  paqj: KradaPaq[];
  hak6h6: KradaVojS2nasce[];
  spronoj: KradaSpono[];
  spurXoj: number[];
  spurZoj: number[];
  retoX: number[];
  retoZ: number[];
  lampoj: { x: number; z: number }[];
}
