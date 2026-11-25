// ≺⧼ j͑ʃɹ ſɟᴜ ſᶘɹ ſɟᴜ }ʃᴜ 🎨 ⧽≻
// ſɭɜ ſɭ,w , ſɭᴜ ſןᴜ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ( ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭэ ᶗ‹ , ꞙɭэ ,
import * as THREE from "three";
import { kozonuL6da } from "../../../kanta/nala/t6limaSoza.js";
import { katmullRom } from "../../../kanta/x2x2q/interpolo.js";
import { t6limaWeh2En } from "../../../skek2/x2x2q/t6limaHaweh2.js";
import { Nala, MONDOHALFO, REZ } from "./havecax2l.js";
import { tsekeTsasaSoza } from "./tsasa.js";
import { kuns2bana2d } from "../../x2x2q/dom.js";

// ⟪ ſɭэ ᶗ‹ , 📃 ⟫ , ſɭэ ᶗ‹ ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭэ ᶗ‹ , ꞙɭц ,
// ſɭэ ᶗ‹ , ꞙɭэ ,
// ⟨ ſɭᴜ ſןᴜ , 📃 ⟩ , ſɭᴜ ſןᴜ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
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

/* ſɭэ ᶗ‹ , ꞙɭı ,
   ſɭᴜc̗ ɭʃᴜ ｡ ſɭɜ j͑ʃ'ɔ ŋᷠɹ ｡ ı],ɔ j͑ʃᴜ̭ɔ ɭʃꞇ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ｡
   ſɜ j͐ʃɔ ｡ j͑ʃᴜ ｡ ſɟᴜᴜ̩ ɭʃɹ ｡
    @param k ( BakaLigo ) - j͑ʃᴜ j͐ʃɹ ｡ j͑ʃɜ ſןɹ ſɭɹ ſᶘɔ ｡ */
export function catsaraTsanen(k: BakaLigo): void {
  hal6da = k.hal6da; habs2 = k.habs2; hapaga = k.hapaga;
  N = k.N; Tona = k.Tona; X0 = k.X0; Z0 = k.Z0;
  l6daInterp = k.l6daInterp; tsasaKavoInterp = k.tsasaKavoInterp;
  tsasaVem2En = k.tsasaVem2En; tsekeTsasa = k.tsekeTsasa; tsasaVem2Tsiike = k.tsasaVem2Tsiike;
  siicatsiicanaAktiva = k.siicatsiicana; pagaAktiva = k.paga;
}

// ⟪ ſɭᴜ ſןᴜ , 📃 ⟫ , ſɭᴜ ſןᴜ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭɜ ſɭ,w , ꞙɭɿ ,
export const kozunuCanvas = document.createElement("canvas");
kozunuCanvas.width = kozunuCanvas.height = REZ;
const kozunuKuns2bana = kuns2bana2d(kozunuCanvas);
const kozunuBildo = kozunuKuns2bana.createImageData(REZ, REZ);
const hakozonu = new Float32Array(REZ * REZ);            // j͑ʃэ ɭ(ᴜ ｡ j͑ʃᴜ j͑ʃᴜ ｡
const haga = new Float32Array(REZ * REZ);         // ֭ſɭw }ʃᴜ }ʃw ｡ ɭl̀ᴜ ſ͕ɭɜ ｡
const deklivoGradientoj = new Float32Array(REZ * REZ); // |∇h| ｡ ſɭw ſɭᴜƴ ｡ j͑ʃɔ ſɭᴜ ｡

// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᶗɜ ᶘᴜ , ꞙɭɩ ,
export function prerenderiKozunu(): void {
  for ( let py = 0; py < REZ; py++ ) {
    const z = MONDOHALFO - ( py + 0o1/0o2 ) * Nala / REZ;
    for ( let px = 0; px < REZ; px++ ) {
      const x = MONDOHALFO - ( px + 0o1/0o2 ) * Nala / REZ;
      const i = py * REZ + px;
      hakozonu[i] = kozonuL6da(x, z);
    }
  }
}

// ſ͕ɭɜ ı],ᴜ , ꞙɭı ,
// ſ͕ɭɜ ı],ᴜ , ꞙɭɿ ,
// ſ͕ɭɜ ı],ᴜ , ꞙɭц ,
// ſ͕ɭɜ ı],ᴜ , ꞙɭэ ,
// ſ͕ɭɜ ı],ᴜ , ꞙɭɩ ,
// ſ͕ɭɜ ı],ᴜ , ꞙɭꞟ ,
const skrapaWeh2 = new THREE.Color();
export function kozuaWeh2(h: number, x: number, z: number, haga: number): number[] {
// ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭɿ ,
  t6limaWeh2En(skrapaWeh2, h, x, z, haga, tsasaVem2Tsiike);
  skrapaWeh2.convertLinearToSRGB();
  return [
    Math.max(0, Math.min(0o377, skrapaWeh2.r * 0o377)),
    Math.max(0, Math.min(0o377, skrapaWeh2.g * 0o377)),
    Math.max(0, Math.min(0o377, skrapaWeh2.b * 0o377)),
  ];
}

// ⟨ ſɭɜ ſɭ,w , ꞙɭц , 📃 ⟩
// ſɭɜ ſɭ,w , ꞙɭэ ,
// ſɭɜ ſɭ,w , ꞙɭɩ ,
// ( ſɭэ ᶗ‹ , ꞙɭı ,
// ſɭэ ᶗ‹ , ꞙɭɿ ,
// ſɭɜ ſɭ,w , ꞙɭц ,
// ſɭɜ ſɭ,w , ꞙɭэ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭɩ ,
// ſɭɜ ſɭ,w , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
const JAQONUANCO = [ 0o230, 0o60, 0o300 ];    // j͑ʃɔ ſɭᴜ ｡ ɭl̀ᴜ ſ͕ɭɜ ｡
const VALANUANCO = [ 0o40, 0o230, 0o260 ];     // j͑ʃɔ ſɭᴜ ｡ j͐ʃɜ ɭʃᴜ ｡
const EBENAJANUANCO = [ 0o220, 0o300, 0o110 ]; // j͑ʃɔ ſɭᴜ ｡ ᶅſɔ ɽ͑ʃ'ɔ ｡
const AKVAJPLANTOJNUANCO = [ 0o40, 0o200, 0o260 ]; // j͑ʃɔ ſɭᴜ ｡ ſᶘꞇȝ ｡ j͑ʃ'ᴜ ſɟwƽ ｡
const EKVIZETONUANCO = [ 0o100, 0o260, 0o140 ];     // j͑ʃɔ ſɭᴜ ｡ tsake
const BIOMANUANCO: Record<string, [ number[], number ]> = {
  jaqo: [ JAQONUANCO, 0o23/0o100 ],
  lota: [ VALANUANCO, 0o23/0o100 ],
  qun2nu: [ EBENAJANUANCO, 0o23/0o100 ],
  "tsasa-haxa3e": [ AKVAJPLANTOJNUANCO, 0o35/0o100 ],
  tsake: [ EKVIZETONUANCO, 0o35/0o100 ],
};
// ſɭɜ ſɭ,w , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭɜ ſɭ,w , ꞙɭɩ ,
// ſɭɜ ſɭ,w , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
const AKVAJBESTOJNUANCO = [ 0o110, 0o220, 0o300 ];
const PETRELANUANCO = [ 0o320, 0o320, 0o320 ];
const NPCANUANCO = [ 0o320, 0o260, 0o110 ];
const BESTONUANCO: Record<number, [ number[], number ]> = {
  1: [ AKVAJBESTOJNUANCO, 0o13/0o40 ],
  2: [ PETRELANUANCO, 0o13/0o40 ],
  4: [ NPCANUANCO, 0o13/0o40 ],
};

// ſɭɜ ſɭ,w , ꞙɭɿ ,
// ꞙɭı , ſɭɜ ſɭ,w , ꞙɭɿ ,
// ſɭɜ ſɭ,w , ꞙɭц ,
function bs2Interp(x: number, z: number): number {
  const i = Math.max(0, Math.min(N - 1, Math.floor(( x - X0 ) / Tona)));
  const j = Math.max(0, Math.min(N - 1, Math.floor(( z - Z0 ) / Tona)));
  return habs2[j * N + i];
}
const JAQONAMOJ: ( string | null )[] = [ null, "jaqo", "lota", "qun2nu", "tsasa-haxa3e", "tsake" ];

// ſɭɜ ſɭ,w , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭɜ ſɭ,w , ꞙɭꞟ ,
function pagaInterp(x: number, z: number): number {
  const i = Math.max(0, Math.min(N - 1, Math.floor(( x - X0 ) / Tona)));
  const j = Math.max(0, Math.min(N - 1, Math.floor(( z - Z0 ) / Tona)));
  return hapaga[j * N + i];
}

// ſɭɜ ſɭ,w , ꞙɭı ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭɿ ,
// ſɭɜ ſɭ,w , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
function bs2De(x: number, z: number): string {
  const pentrita = bs2Interp(x, z);
// ⟨ ſᶘᴜ j͑ʃᴜ , 📃 ⟩ , ſᶘᴜ j͑ʃᴜ , ꞙɭɩ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭꞟ ,
  const tsasa = tsekeTsasaSoza(x, z);
  if ( pentrita === 4 && tsasa ) return "tsasa-haxa3e";
  if ( pentrita === 5 && tsasa ) return "tsake";
  if ( tsasa ) return "tsasa";
  if ( pentrita !== 0 ) return JAQONAMOJ[pentrita] ?? "qun2";
  return "qun2";
}
// ſ͕ɭɜ ı],ᴜ , ꞙɭı ,
// ſɭэ ᶗ‹ , ꞙɭɿ ,
// ſ͕ɭɜ ı],ᴜ , ꞙɭц ,
export function alneq2qBiomanNuancon(k: number[], x: number, z: number, d: number): number[] {
// ſɭɜ ſɭ,w , ꞙɭэ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭɩ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭꞟ ,
  if ( siicatsiicanaAktiva() === "bs2" ) {
    const n = BIOMANUANCO[bs2De(x, z)];
    if ( n ) {
      const m = n[1];
      return [
        k[0] + ( n[0][0] - k[0] ) * m,
        k[1] + ( n[0][1] - k[1] ) * m,
        k[2] + ( n[0][2] - k[2] ) * m,
      ];
    }
    return k;
  }  // j͑ʃᴜ ｡ ſןᴜ ſ͔ɭᴜ ｡ j͑ʃᴜ ｡ ſɟᴜᴜ̩ ɭʃɹ ｡
// ſɭɜ ſɭ,w , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
  if ( siicatsiicanaAktiva() === "hapaga" ) {
    const b = pagaInterp(x, z);
    const n = BESTONUANCO[pagaAktiva() & 7];
    if ( !n || ( b & ( pagaAktiva() & 7 ) ) === 0 ) return k;
    const m = n[1];
    return [
      k[0] + ( n[0][0] - k[0] ) * m,
      k[1] + ( n[0][1] - k[1] ) * m,
      k[2] + ( n[0][2] - k[2] ) * m,
    ];
  }
  return k;
}

// ſᶘᴜ j͑ʃᴜ , ſɭɜ ſɭ,w ,
// ſ͕ɭɜ ı],ᴜ , ꞙɭı ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭɿ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭц ,
function kolorigiTsasa(havop2: Uint8ClampedArray, o: number, h: number, vem2: number,
  hunanu: number, delta: number, x: number, z: number): void {
  const prof = Math.min(6, vem2 - h);
  const t = prof / 6;
  let r = 0o40 + ( 0o10 - 0o40 ) * t;
  let g = 0o150 - 0o110 * t;
  let b = 0o150 - 0o110 * t;
  if ( delta !== 0 ) {
    const s = 0o5/0o40 + Math.min(0o1/0o2, Math.abs(delta) / 4);
    r += 0o30 * s; g -= 0o14 * s; b -= 0o20 * s;
  }
// ſɭɜ ſɭ,w , ſᶘᴜ j͑ʃᴜ , ꞙɭэ ,
// ( ſᶘᴜ j͑ʃᴜ , ꞙɭɩ ,
  const k = alneq2qBiomanNuancon([ r, g, b ], x, z, delta);
  r = k[0]; g = k[1]; b = k[2];
  havop2[o] = Math.min(0o377, r * hunanu);
  havop2[o + 1] = Math.min(0o377, g * hunanu);
  havop2[o + 2] = Math.min(0o377, b * hunanu);
  havop2[o + 3] = 0o377;
}

// ſ͕ɭɜ ı],ᴜ , ꞙɭꞟ ,
function bicubaDerivata(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const t2 = t * t;
  return 0o1/0o2 * ( ( -p0 + p2 ) + 2 * ( 2 * p0 - 5 * p1 + 4 * p2 - p3 ) * t
    + 3 * ( -p0 + 3 * p1 - 3 * p2 + p3 ) * t2 );
}
// ſɭɜ ſɭ,w , ꞙɭı ,
// ſɭэ ſɭᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭэ ſɭᴜ , ꞙɭэ ,
export function l6daKunDerivajoj(x: number, z: number): [ number, number, number ] {
  const fx = ( x - X0 ) / Tona, fz = ( z - Z0 ) / Tona;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const k2pa = ( i: number, j: number ) => hal6da[Math.max(0, Math.min(N - 1, j)) * N + Math.max(0, Math.min(N - 1, i))];
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
  const r: number[] = [], rd: number[] = [];
  for ( let k = -1; k <= 2; k++ ) {
    const j = j0 + k;
    const a = k2pa(i0 - 1, j), b = k2pa(i0, j), c = k2pa(i0 + 1, j), d = k2pa(i0 + 2, j);
    r.push(katmullRom(a, b, c, d, u));
    rd.push(bicubaDerivata(a, b, c, d, u));
  }
  const h = katmullRom(r[0], r[1], r[2], r[3], v);
  const dhdu = katmullRom(rd[0], rd[1], rd[2], rd[3], v);
  const dhdv = bicubaDerivata(r[0], r[1], r[2], r[3], v);
  return [ h, dhdu / Tona, dhdv / Tona ];
}
// ſɭɜ ſɭ,w , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
export function revek2feDeklik6h6n(px0: number, py0: number, px1: number, py1: number): void {
  const lumoX = -0o43/0o100, lumoY = 0o25/0o40, lumoZ = 0o41/0o100;
  const lumoLen = Math.hypot(lumoX, lumoY, lumoZ);
  const minPx = Math.max(1, px0), maxPx = Math.min(REZ - 2, px1);
  const minPy = Math.max(1, py0), maxPy = Math.min(REZ - 2, py1);
  for ( let py = minPy; py <= maxPy; py++ ) {
    const z = MONDOHALFO - ( py + 0o1/0o2 ) * Nala / REZ;
    for ( let px = minPx; px <= maxPx; px++ ) {
      const x = MONDOHALFO - ( px + 0o1/0o2 ) * Nala / REZ;
      const i = py * REZ + px;
      const [ , deklX, deklZ ] = l6daKunDerivajoj(x, z);
      deklivoGradientoj[i] = Math.hypot(deklX, deklZ);
      const nx = -deklX * 0o215/0o100, nz = -deklZ * 0o215/0o100, ny = 1;
      const len = Math.hypot(nx, ny, nz);
      const tsije = ( nx * lumoX + ny * lumoY + nz * lumoZ ) / len / lumoLen;
      haga[i] = 0o55/0o100 + 0o1/0o2 * Math.max(0, tsije);
    }
  }
}

// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭɜ ſɭ,w , ꞙɭı ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭɿ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭц ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭэ ,
//     @param px0, py0, px1, py1 ( number ) , ſɭᴜ ſןᴜ ,
export function pentri(px0: number, py0: number, px1: number, py1: number): void {
  const havop2 = kozunuBildo.data;
  for ( let py = py0; py <= py1; py++ ) {
    const z = MONDOHALFO - ( py + 0o1/0o2 ) * Nala / REZ;
    for ( let px = px0; px <= px1; px++ ) {
      const x = MONDOHALFO - ( px + 0o1/0o2 ) * Nala / REZ;
      const i = py * REZ + px;
      const kozuni = hakozonu[i];
      const delta = l6daInterp(x, z);
// ſɭɜ ſɭ,w , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
      const h = kozuni + delta - tsasaKavoInterp(x, z);
      const o = i * 4;
      const hunanu = haga[i] || 1;
// ſᶘᴜ j͑ʃᴜ , ꞙɭц ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭэ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭɩ ,
      const vem2 = tsasaVem2En(x, z);
      if ( vem2 !== null && tsekeTsasa(x, z) && h < vem2 - 0o1/0o100 ) {
        kolorigiTsasa(havop2, o, h, vem2, hunanu, delta, x, z);
      } else {
        const k = alneq2qBiomanNuancon(kozuaWeh2(h, x, z, deklivoGradientoj[i] || 0), x, z, delta);
        havop2[o] = Math.min(0o377, k[0] * hunanu);
        havop2[o + 1] = Math.min(0o377, k[1] * hunanu);
        havop2[o + 2] = Math.min(0o377, k[2] * hunanu);
        havop2[o + 3] = 0o377;
      }
    }
  }
  kozunuKuns2bana.putImageData(kozunuBildo, 0, 0);
}
