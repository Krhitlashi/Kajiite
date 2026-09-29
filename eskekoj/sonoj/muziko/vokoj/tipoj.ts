// ≺⧼ La sonaj tipoj 🎵 ⧽≻
// La datumaj tipoj de la muzikaj spuroj — la sono-evento ( SonoEvento ), la
// sekcio ( Sekcio ) kaj la spurdatenoj ( SpuroDateno ).
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
