// ≺⧼ ប្រភេទសំឡេង 🎵 ⧽≻
export interface SonoEvento {
  t: number;
  i: string;
  f?: number;
  d: number;
  v?: number;
  dur?: number;
  cresc?: number;
  toot?: boolean;
}

export interface Sekcio {
  n: string;
  a: number;
  b: number;
}

export interface SpuroDateno {
  events: SonoEvento[];
  dur: number;
  secs: Sekcio[];
}
