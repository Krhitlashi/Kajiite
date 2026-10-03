// ≺⧼ បណ្តាញផ្លូវ ប្រភេទ 🛣️ ⧽≻
export type VojaPunkto = [ number, number ];

export interface VojaRetoVojo {
  punktoj: VojaPunkto[];
  larĝo?: number;
}

export interface VojaRetoDoko {
  x: number;
  z: number;
  profundo: number;
  rotacio?: number;
}

export interface VojaRetoKunigo {
  x: number;
  z: number;
  direktaj: VojaPunkto[];
  rotacio: number;
  fermitaj: [ number, number ];
}

export const TOLERANCO = 0o1/0o1000;
export const ALGLUA_RANDO = 0o5/0o2;
