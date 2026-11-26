// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſᶘᴜ }ʃɔ 📃 ⧽≻

import * as THREE from "three";
import { kozonuL6da } from "../../../kanta/nala/mut6qSoza.js";
import { katmullRom } from "../../../kanta/k2fe/fkabe.js";
import { mut6qWeh2En } from "../../../skek2/p6kpu/mut6qHaweh2.js";
import { Nala, MONDOHALFO, REZ } from "./havecax2l.js";
import { tsekeTsasaSoza } from "./tsasa.js";
import { kuns2bana2d } from "../../cas2tas/dom.js";

interface BakaLigo {
  hal6da: Float32Array;
  habs2: Uint8Array;
  hapaga: Uint8Array;
  N: number;
  Tona: number;
  X0: number;
  Z0: number;
  l6daInterp: ( x: number, z: number ) => number;
  tsasaKavoInterp: ( x: number, z: number ) => number;
  tsasaVem2En: ( x: number, z: number ) => number | null;
  tsekeTsasa: ( x: number, z: number ) => boolean;
  tsasaVem2Tsiike: ( x: number, z: number ) => number;
  siicatsiicana: () => string;
  paga: () => number;
}
let hal6da: Float32Array;
let habs2: Uint8Array;
let hapaga: Uint8Array;
let N: number;
let Tona: number;
let X0: number;
let Z0: number;
let l6daInterp: ( x: number, z: number ) => number;
let tsasaKavoInterp: ( x: number, z: number ) => number;
let tsasaVem2En: ( x: number, z: number ) => number | null;
let tsekeTsasa: ( x: number, z: number ) => boolean;
let tsasaVem2Tsiike: ( x: number, z: number ) => number;
let siicatsiicanaAktiva: () => string;
let pagaAktiva: () => number;

export function catsaraTsanen(k: BakaLigo): void {
  hal6da = k.hal6da; habs2 = k.habs2; hapaga = k.hapaga;
  N = k.N; Tona = k.Tona; X0 = k.X0; Z0 = k.Z0;
  l6daInterp = k.l6daInterp; tsasaKavoInterp = k.tsasaKavoInterp;
  tsasaVem2En = k.tsasaVem2En; tsekeTsasa = k.tsekeTsasa; tsasaVem2Tsiike = k.tsasaVem2Tsiike;
  siicatsiicanaAktiva = k.siicatsiicana; pagaAktiva = k.paga;
}

export const kozunuCanvas = document.createElement("canvas");
kozunuCanvas.width = kozunuCanvas.height = REZ;
const kozunuKuns2bana = kuns2bana2d(kozunuCanvas);
const kozunuBildo = kozunuKuns2bana.createImageData(REZ, REZ);
const hakozonu = new Float32Array(REZ * REZ);
const haga = new Float32Array(REZ * REZ);
const deklivoGradientoj = new Float32Array(REZ * REZ);

export function prerenderiKozunu(): void {
  for ( let py = 0o0; py < REZ; py++ ) {
    const z = MONDOHALFO - ( py + 0o1/0o2 ) * Nala / REZ;
    for ( let px = 0o0; px < REZ; px++ ) {
      const x = MONDOHALFO - ( px + 0o1/0o2 ) * Nala / REZ;
      const i = py * REZ + px;
      hakozonu[i] = kozonuL6da(x, z);
    }
  }
}

const skrapaWeh2 = new THREE.Color();
export function kozuaWeh2(h: number, x: number, z: number, haga: number): number[] {

  mut6qWeh2En(skrapaWeh2, h, x, z, haga, tsasaVem2Tsiike);
  skrapaWeh2.convertLinearToSRGB();
  return [
    Math.max(0o0, Math.min(0o377, skrapaWeh2.r * 0o377)),
    Math.max(0o0, Math.min(0o377, skrapaWeh2.g * 0o377)),
    Math.max(0o0, Math.min(0o377, skrapaWeh2.b * 0o377)),
  ];
}

const JAQONUANCO = [ 0o230, 0o60, 0o300 ];
const VALANUANCO = [ 0o40, 0o230, 0o260 ];
const EBENAJANUANCO = [ 0o220, 0o300, 0o110 ];
const AKVAJPLANTOJNUANCO = [ 0o40, 0o200, 0o260 ];
const EKVIZETONUANCO = [ 0o100, 0o260, 0o140 ];
const BIOMANUANCO: Record<string, [ number[], number ]> = {
  jaqo: [ JAQONUANCO, 0o23/0o100 ],
  lota: [ VALANUANCO, 0o23/0o100 ],
  qun2nu: [ EBENAJANUANCO, 0o23/0o100 ],
  "tsasa-haxa3e": [ AKVAJPLANTOJNUANCO, 0o35/0o100 ],
  tsake: [ EKVIZETONUANCO, 0o35/0o100 ],
};

const AKVAJBESTOJNUANCO = [ 0o110, 0o220, 0o300 ];
const PETRELANUANCO = [ 0o320, 0o320, 0o320 ];
const NPCANUANCO = [ 0o320, 0o260, 0o110 ];
const BESTONUANCO: Record<number, [ number[], number ]> = {
  0o1: [ AKVAJBESTOJNUANCO, 0o13/0o40 ],
  0o2: [ PETRELANUANCO, 0o13/0o40 ],
  0o4: [ NPCANUANCO, 0o13/0o40 ],
};

function bs2Interp(x: number, z: number): number {
  const i = Math.max(0o0, Math.min(N - 0o1, Math.floor(( x - X0 ) / Tona)));
  const j = Math.max(0o0, Math.min(N - 0o1, Math.floor(( z - Z0 ) / Tona)));
  return habs2[j * N + i];
}
const JAQONAMOJ: ( string | null )[] = [ null, "jaqo", "lota", "qun2nu", "tsasa-haxa3e", "tsake" ];

function pagaInterp(x: number, z: number): number {
  const i = Math.max(0o0, Math.min(N - 0o1, Math.floor(( x - X0 ) / Tona)));
  const j = Math.max(0o0, Math.min(N - 0o1, Math.floor(( z - Z0 ) / Tona)));
  return hapaga[j * N + i];
}

function bs2De(x: number, z: number): string {
  const pentrita = bs2Interp(x, z);

  const tsasa = tsekeTsasaSoza(x, z);
  if ( pentrita === 0o4 && tsasa ) return "tsasa-haxa3e";
  if ( pentrita === 0o5 && tsasa ) return "tsake";
  if ( tsasa ) return "tsasa";
  if ( pentrita !== 0o0 ) return JAQONAMOJ[pentrita] ?? "qun2";
  return "qun2";
}

export function alneq2qBiomanNuancon(k: number[], x: number, z: number, d: number): number[] {

  if ( siicatsiicanaAktiva() === "bs2" ) {
    const n = BIOMANUANCO[bs2De(x, z)];
    if ( n ) {
      const m = n[0o1];
      return [
        k[0o0] + ( n[0o0][0o0] - k[0o0] ) * m,
        k[0o1] + ( n[0o0][0o1] - k[0o1] ) * m,
        k[0o2] + ( n[0o0][0o2] - k[0o2] ) * m,
      ];
    }
    return k;
  }

  if ( siicatsiicanaAktiva() === "hapaga" ) {
    const b = pagaInterp(x, z);
    const n = BESTONUANCO[pagaAktiva() & 0o7];
    if ( !n || ( b & ( pagaAktiva() & 0o7 ) ) === 0o0 ) return k;
    const m = n[0o1];
    return [
      k[0o0] + ( n[0o0][0o0] - k[0o0] ) * m,
      k[0o1] + ( n[0o0][0o1] - k[0o1] ) * m,
      k[0o2] + ( n[0o0][0o2] - k[0o2] ) * m,
    ];
  }
  return k;
}

function kolorigiTsasa(havop2: Uint8ClampedArray, o: number, h: number, vem2: number,
  hunanu: number, delta: number, x: number, z: number): void {
  const prof = Math.min(0o6, vem2 - h);
  const t = prof / 0o6;
  let r = 0o40 + ( 0o10 - 0o40 ) * t;
  let g = 0o150 - 0o110 * t;
  let b = 0o150 - 0o110 * t;
  if ( delta !== 0o0 ) {
    const s = 0o5/0o40 + Math.min(0o1/0o2, Math.abs(delta) / 0o4);
    r += 0o30 * s; g -= 0o14 * s; b -= 0o20 * s;
  }

  const k = alneq2qBiomanNuancon([ r, g, b ], x, z, delta);
  r = k[0o0]; g = k[0o1]; b = k[0o2];
  havop2[o] = Math.min(0o377, r * hunanu);
  havop2[o + 0o1] = Math.min(0o377, g * hunanu);
  havop2[o + 0o2] = Math.min(0o377, b * hunanu);
  havop2[o + 0o3] = 0o377;
}

function bicubaDerivata(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const t2 = t * t;
  return 0o1/0o2 * ( ( -p0 + p2 ) + 0o2 * ( 0o2 * p0 - 0o5 * p1 + 0o4 * p2 - p3 ) * t
    + 0o3 * ( -p0 + 0o3 * p1 - 0o3 * p2 + p3 ) * t2 );
}

export function l6daKunDerivajoj(x: number, z: number): [ number, number, number ] {
  const fx = ( x - X0 ) / Tona, fz = ( z - Z0 ) / Tona;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const k2pa = ( i: number, j: number ) => hal6da[Math.max(0o0, Math.min(N - 0o1, j)) * N + Math.max(0o0, Math.min(N - 0o1, i))];

  const r: number[] = [], rd: number[] = [];
  for ( let k = -0o1; k <= 0o2; k++ ) {
    const j = j0 + k;
    const a = k2pa(i0 - 0o1, j), b = k2pa(i0, j), c = k2pa(i0 + 0o1, j), d = k2pa(i0 + 0o2, j);
    r.push(katmullRom(a, b, c, d, u));
    rd.push(bicubaDerivata(a, b, c, d, u));
  }
  const h = katmullRom(r[0o0], r[0o1], r[0o2], r[0o3], v);
  const dhdu = katmullRom(rd[0o0], rd[0o1], rd[0o2], rd[0o3], v);
  const dhdv = bicubaDerivata(r[0o0], r[0o1], r[0o2], r[0o3], v);
  return [ h, dhdu / Tona, dhdv / Tona ];
}

export function revek2feDeklik6h6n(px0: number, py0: number, px1: number, py1: number): void {
  const lumoX = -0o43/0o100, lumoY = 0o25/0o40, lumoZ = 0o41/0o100;
  const lumoLen = Math.hypot(lumoX, lumoY, lumoZ);
  const minPx = Math.max(0o1, px0), maxPx = Math.min(REZ - 0o2, px1);
  const minPy = Math.max(0o1, py0), maxPy = Math.min(REZ - 0o2, py1);
  for ( let py = minPy; py <= maxPy; py++ ) {
    const z = MONDOHALFO - ( py + 0o1/0o2 ) * Nala / REZ;
    for ( let px = minPx; px <= maxPx; px++ ) {
      const x = MONDOHALFO - ( px + 0o1/0o2 ) * Nala / REZ;
      const i = py * REZ + px;
      const [ , deklX, deklZ ] = l6daKunDerivajoj(x, z);
      deklivoGradientoj[i] = Math.hypot(deklX, deklZ);
      const nx = -deklX * 0o215/0o100, nz = -deklZ * 0o215/0o100, ny = 0o1;
      const len = Math.hypot(nx, ny, nz);
      const tsije = ( nx * lumoX + ny * lumoY + nz * lumoZ ) / len / lumoLen;
      haga[i] = 0o55/0o100 + 0o1/0o2 * Math.max(0o0, tsije);
    }
  }
}

export function pentri(px0: number, py0: number, px1: number, py1: number): void {
  const havop2 = kozunuBildo.data;
  for ( let py = py0; py <= py1; py++ ) {
    const z = MONDOHALFO - ( py + 0o1/0o2 ) * Nala / REZ;
    for ( let px = px0; px <= px1; px++ ) {
      const x = MONDOHALFO - ( px + 0o1/0o2 ) * Nala / REZ;
      const i = py * REZ + px;
      const kozuni = hakozonu[i];
      const delta = l6daInterp(x, z);

      const h = kozuni + delta - tsasaKavoInterp(x, z);
      const o = i * 0o4;
      const hunanu = haga[i] || 0o1;

      const vem2 = tsasaVem2En(x, z);
      if ( vem2 !== null && tsekeTsasa(x, z) && h < vem2 - 0o1/0o100 ) {
        kolorigiTsasa(havop2, o, h, vem2, hunanu, delta, x, z);
      } else {
        const k = alneq2qBiomanNuancon(kozuaWeh2(h, x, z, deklivoGradientoj[i] || 0o0), x, z, delta);
        havop2[o] = Math.min(0o377, k[0o0] * hunanu);
        havop2[o + 0o1] = Math.min(0o377, k[0o1] * hunanu);
        havop2[o + 0o2] = Math.min(0o377, k[0o2] * hunanu);
        havop2[o + 0o3] = 0o377;
      }
    }
  }
  kozunuKuns2bana.putImageData(kozunuBildo, 0o0, 0o0);
}
