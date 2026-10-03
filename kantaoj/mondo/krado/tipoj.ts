// ≺⧼ ប្រភេទក្រឡា 📐 ⧽≻
export interface KradaArangxo {
  arangxaGrando: number;
  blokaGrando: "unu" | "kvar";
  keuxfhxeso?: boolean;
  lampoj?: boolean;
}
export type CellType = "domo" | "turo" | "mangxejo" | "kasafeo" | "sanktejo" | "stacio";
export type KradaĈelo = [ number, number, CellType ];
export interface KradaKonstruajxo {
  x: number; z: number; rot: number; tipo: CellType;
  cx: number; cz: number;
  sub: "centro" | "NE" | "NW" | "SW" | "SE";
  stacia: boolean;
  ekstra?: boolean;
  konektita?: boolean;
}

export interface AldonaBloko {
  x: number;
  z: number;
  tipo: CellType;
  rot?: number;
  sub?: KradaKonstruajxo["sub"];
  stacia?: boolean;
  konektita?: boolean;
}

export interface KradaVojSegmento {
  orient: "NS" | "EW";
  poz: number;
  de: number; al: number;
  stacia?: boolean;
}

export interface KradaSpono {
  de: [ number, number ];
  al: [ number, number ];
  konstruajxo: number;
}

export interface KradaPlano {
  arangxo: KradaArangxo;
  ĉeloj: KradaĈelo[];
  PASXO: number;
  nordaPinto: number;
  ringoX: number;
  ringoSuda: number;
  sudaVojo: number;
  stacioZ: number;
  staciaRingaNordo: number;
  konstruaĵoj: KradaKonstruajxo[];
  vojoj: KradaVojSegmento[];
  spronoj: KradaSpono[];
  spurXoj: number[];
  spurZoj: number[];
  retoX: number[];
  retoZ: number[];
  lampoj: { x: number; z: number }[];
}
