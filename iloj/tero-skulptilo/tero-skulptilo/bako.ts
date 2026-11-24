// ≺⧼ j͑ʃɹ ſɟᴜ ſᶘɹ ſɟᴜ }ʃᴜ 🎨 ⧽≻
// ſɭɜ ſɭ,w , ſɭᴜ ſןᴜ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ( ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭэ ᶗ‹ , ꞙɭэ ,
import * as THREE from "three";
import { bazaAlteco } from "../../../kantaoj/mondo/tereno.js";
import { katmullRom } from "../../../kantaoj/komunajxoj/interpolo.js";
import { terenaKoloroEn } from "../../../eskekoj/komunajxoj/terenkoloroj.js";
import { MONDO, MONDO_HALFO, REZ } from "./havecax2l.js";
import { tsekeAkvoSurfaco } from "./akvo.js";
import { kuns2bana2d } from "../../komunajxoj/dom.js";

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
  PASO: number;
  X0: number;
  Z0: number;
  l6daInterp: ( x: number, z: number ) => number;
  akvaKavoInterp: ( x: number, z: number ) => number;
  akvaVem2En: ( x: number, z: number ) => number | null;
  tsekeAkvo: ( x: number, z: number ) => boolean;
  akvaVem2Proksima: ( x: number, z: number ) => number;
  peniko: () => string;
  paga: () => number;
}
let hal6da: Float32Array;
let habs2: Uint8Array;
let hapaga: Uint8Array;
let N: number;
let PASO: number;
let X0: number;
let Z0: number;
let l6daInterp: ( x: number, z: number ) => number;
let akvaKavoInterp: ( x: number, z: number ) => number;
let akvaVem2En: ( x: number, z: number ) => number | null;
let tsekeAkvo: ( x: number, z: number ) => boolean;
let akvaVem2Proksima: ( x: number, z: number ) => number;
let penikoAktiva: () => string;
let pagaAktiva: () => number;

/* ſɭэ ᶗ‹ , ꞙɭı ,
   អនុគមន៍ មិនមែនតម្លៃទេ ព្រោះជក់កំពុងប្រើផ្លាស់ប្តូរពេលប្រើ ដូច្នេះការដុត
   អានវាទាន់ពេល ( សម្លេងលេចឡើង និងបាត់តាមឧបករណ៍ )។
    @param k ( BakaLigo ) - ការយោងរបស់ឯកសារមេ។ */
export function agordiBakon(k: BakaLigo): void {
  hal6da = k.hal6da; habs2 = k.habs2; hapaga = k.hapaga;
  N = k.N; PASO = k.PASO; X0 = k.X0; Z0 = k.Z0;
  l6daInterp = k.l6daInterp; akvaKavoInterp = k.akvaKavoInterp;
  akvaVem2En = k.akvaVem2En; tsekeAkvo = k.tsekeAkvo; akvaVem2Proksima = k.akvaVem2Proksima;
  penikoAktiva = k.peniko; pagaAktiva = k.paga;
}

// ⟪ ſɭᴜ ſןᴜ , 📃 ⟫ , ſɭᴜ ſןᴜ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭɜ ſɭ,w , ꞙɭɿ ,
export const bazaCanvas = document.createElement("canvas");
bazaCanvas.width = bazaCanvas.height = REZ;
const bazaKuns2bana = kuns2bana2d(bazaCanvas);
const bazaBildo = bazaKuns2bana.createImageData(REZ, REZ);
const bazoj = new Float32Array(REZ * REZ);            // កម្ពស់ប្រូសេឌូរ៉ាល់
const haga = new Float32Array(REZ * REZ);         // កត្តាស្រមោលភ្នំតូច
const deklivoGradientoj = new Float32Array(REZ * REZ); // |∇h| គឺជម្រាលថ្មសម្រាប់បន្ទះពណ៌រួម

// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᶗɜ ᶘᴜ , ꞙɭɩ ,
export function prerenderiBazon(): void {
  for ( let py = 0; py < REZ; py++ ) {
    const z = MONDO_HALFO - ( py + 0o1/0o2 ) * MONDO / REZ;
    for ( let px = 0; px < REZ; px++ ) {
      const x = MONDO_HALFO - ( px + 0o1/0o2 ) * MONDO / REZ;
      const i = py * REZ + px;
      bazoj[i] = bazaAlteco(x, z);
    }
  }
}

// ſ͕ɭɜ ı],ᴜ , ꞙɭı ,
// ſ͕ɭɜ ı],ᴜ , ꞙɭɿ ,
// ſ͕ɭɜ ı],ᴜ , ꞙɭц ,
// ſ͕ɭɜ ı],ᴜ , ꞙɭэ ,
// ſ͕ɭɜ ı],ᴜ , ꞙɭɩ ,
// ſ͕ɭɜ ı],ᴜ , ꞙɭꞟ ,
const skrapaKoloro = new THREE.Color();
export function terenaKoloro255(h: number, x: number, z: number, haga: number): number[] {
// ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭɿ ,
  terenaKoloroEn(skrapaKoloro, h, x, z, haga, akvaVem2Proksima);
  skrapaKoloro.convertLinearToSRGB();
  return [
    Math.max(0, Math.min(0o377, skrapaKoloro.r * 0o377)),
    Math.max(0, Math.min(0o377, skrapaKoloro.g * 0o377)),
    Math.max(0, Math.min(0o377, skrapaKoloro.b * 0o377)),
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
const MONTA_NUANCO = [ 0o230, 0o60, 0o300 ];    // ពណ៌ស្វាយ គឺតំបន់ជីវៈភ្នំ
const VALA_NUANCO = [ 0o40, 0o230, 0o260 ];     // បៃតងខៀវ គឺតំបន់ជីវៈជ្រលង
const EBENAJA_NUANCO = [ 0o220, 0o300, 0o110 ]; // បៃតងស្រាល គឺតំបន់ជីវៈវាលរាប
const AKVAJ_PLANTOJ_NUANCO = [ 0o40, 0o200, 0o260 ]; // ខៀវបៃតងជ្រៅ គឺរុក្ខជាតិទឹក
const EKVIZETO_NUANCO = [ 0o100, 0o260, 0o140 ];     // បៃតងស្រាល គឺ tsake
const BIOMA_NUANCO: Record<string, [ number[], number ]> = {
  montaro: [ MONTA_NUANCO, 0o23/0o100 ],
  valo: [ VALA_NUANCO, 0o23/0o100 ],
  ebenaĵo: [ EBENAJA_NUANCO, 0o23/0o100 ],
  "akvaj-plantoj": [ AKVAJ_PLANTOJ_NUANCO, 0o35/0o100 ],
  tsake: [ EKVIZETO_NUANCO, 0o35/0o100 ],
};
// ſɭɜ ſɭ,w , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭɜ ſɭ,w , ꞙɭɩ ,
// ſɭɜ ſɭ,w , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
const AKVAJ_BESTOJ_NUANCO = [ 0o110, 0o220, 0o300 ];
const PETRELA_NUANCO = [ 0o320, 0o320, 0o320 ];
const NPCA_NUANCO = [ 0o320, 0o260, 0o110 ];
const BESTO_NUANCO: Record<number, [ number[], number ]> = {
  1: [ AKVAJ_BESTOJ_NUANCO, 0o13/0o40 ],
  2: [ PETRELA_NUANCO, 0o13/0o40 ],
  4: [ NPCA_NUANCO, 0o13/0o40 ],
};

// ſɭɜ ſɭ,w , ꞙɭɿ ,
// ꞙɭı , ſɭɜ ſɭ,w , ꞙɭɿ ,
// ſɭɜ ſɭ,w , ꞙɭц ,
function bs2Interp(x: number, z: number): number {
  const i = Math.max(0, Math.min(N - 1, Math.floor(( x - X0 ) / PASO)));
  const j = Math.max(0, Math.min(N - 1, Math.floor(( z - Z0 ) / PASO)));
  return habs2[j * N + i];
}
const BIOMA_NOMOJ: ( string | null )[] = [ null, "montaro", "valo", "ebenaĵo", "akvaj-plantoj", "tsake" ];

// ſɭɜ ſɭ,w , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭɜ ſɭ,w , ꞙɭꞟ ,
function pagaInterp(x: number, z: number): number {
  const i = Math.max(0, Math.min(N - 1, Math.floor(( x - X0 ) / PASO)));
  const j = Math.max(0, Math.min(N - 1, Math.floor(( z - Z0 ) / PASO)));
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
  const akva = tsekeAkvoSurfaco(x, z);
  if ( pentrita === 4 && akva ) return "akvaj-plantoj";
  if ( pentrita === 5 && akva ) return "tsake";
  if ( akva ) return "akvo";
  if ( pentrita !== 0 ) return BIOMA_NOMOJ[pentrita] ?? "nenio";
  return "nenio";
}
// ſ͕ɭɜ ı],ᴜ , ꞙɭı ,
// ſɭэ ᶗ‹ , ꞙɭɿ ,
// ſ͕ɭɜ ı],ᴜ , ꞙɭц ,
export function almetiBiomanNuancon(k: number[], x: number, z: number, _d: number): number[] {
// ſɭɜ ſɭ,w , ꞙɭэ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭɩ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭꞟ ,
  if ( penikoAktiva() === "bs2" ) {
    const n = BIOMA_NUANCO[bs2De(x, z)];
    if ( n ) {
      const m = n[1];
      return [
        k[0] + ( n[0][0] - k[0] ) * m,
        k[1] + ( n[0][1] - k[1] ) * m,
        k[2] + ( n[0][2] - k[2] ) * m,
      ];
    }
    return k;
  }  // មានតែពេលឧបករណ៍សត្វបើក ហើយទិដ្ឋភាពបង្ហាញតែ
// ſɭɜ ſɭ,w , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
  if ( penikoAktiva() === "hapaga" ) {
    const b = pagaInterp(x, z);
    const n = BESTO_NUANCO[pagaAktiva() & 7];
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
function kolorigiAkvon(datumoj: Uint8ClampedArray, o: number, h: number, vem2: number,
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
  const k = almetiBiomanNuancon([ r, g, b ], x, z, delta);
  r = k[0]; g = k[1]; b = k[2];
  datumoj[o] = Math.min(0o377, r * hunanu);
  datumoj[o + 1] = Math.min(0o377, g * hunanu);
  datumoj[o + 2] = Math.min(0o377, b * hunanu);
  datumoj[o + 3] = 0o377;
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
  const fx = ( x - X0 ) / PASO, fz = ( z - Z0 ) / PASO;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const cxelo = ( i: number, j: number ) => hal6da[Math.max(0, Math.min(N - 1, j)) * N + Math.max(0, Math.min(N - 1, i))];
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
  const r: number[] = [], rd: number[] = [];
  for ( let k = -1; k <= 2; k++ ) {
    const j = j0 + k;
    const a = cxelo(i0 - 1, j), b = cxelo(i0, j), c = cxelo(i0 + 1, j), d = cxelo(i0 + 2, j);
    r.push(katmullRom(a, b, c, d, u));
    rd.push(bicubaDerivata(a, b, c, d, u));
  }
  const h = katmullRom(r[0], r[1], r[2], r[3], v);
  const dhdu = katmullRom(rd[0], rd[1], rd[2], rd[3], v);
  const dhdv = bicubaDerivata(r[0], r[1], r[2], r[3], v);
  return [ h, dhdu / PASO, dhdv / PASO ];
}
// ſɭɜ ſɭ,w , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
export function rekalkuliDeklivojn(px0: number, py0: number, px1: number, py1: number): void {
  const lumoX = -0o43/0o100, lumoY = 0o25/0o40, lumoZ = 0o41/0o100;
  const lumoLen = Math.hypot(lumoX, lumoY, lumoZ);
  const minPx = Math.max(1, px0), maxPx = Math.min(REZ - 2, px1);
  const minPy = Math.max(1, py0), maxPy = Math.min(REZ - 2, py1);
  for ( let py = minPy; py <= maxPy; py++ ) {
    const z = MONDO_HALFO - ( py + 0o1/0o2 ) * MONDO / REZ;
    for ( let px = minPx; px <= maxPx; px++ ) {
      const x = MONDO_HALFO - ( px + 0o1/0o2 ) * MONDO / REZ;
      const i = py * REZ + px;
      const [ , deklX, deklZ ] = l6daKunDerivajoj(x, z);
      deklivoGradientoj[i] = Math.hypot(deklX, deklZ);
      const nx = -deklX * 0o215/0o100, nz = -deklZ * 0o215/0o100, ny = 1;
      const len = Math.hypot(nx, ny, nz);
      const lumo = ( nx * lumoX + ny * lumoY + nz * lumoZ ) / len / lumoLen;
      haga[i] = 0o55/0o100 + 0o1/0o2 * Math.max(0, lumo);
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
  const datumoj = bazaBildo.data;
  for ( let py = py0; py <= py1; py++ ) {
    const z = MONDO_HALFO - ( py + 0o1/0o2 ) * MONDO / REZ;
    for ( let px = px0; px <= px1; px++ ) {
      const x = MONDO_HALFO - ( px + 0o1/0o2 ) * MONDO / REZ;
      const i = py * REZ + px;
      const kozuni = bazoj[i];
      const delta = l6daInterp(x, z);
// ſɭɜ ſɭ,w , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
      const h = kozuni + delta - akvaKavoInterp(x, z);
      const o = i * 4;
      const hunanu = haga[i] || 1;
// ſᶘᴜ j͑ʃᴜ , ꞙɭц ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭэ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭɩ ,
      const vem2 = akvaVem2En(x, z);
      if ( vem2 !== null && tsekeAkvo(x, z) && h < vem2 - 0o1/0o100 ) {
        kolorigiAkvon(datumoj, o, h, vem2, hunanu, delta, x, z);
      } else {
        const k = almetiBiomanNuancon(terenaKoloro255(h, x, z, deklivoGradientoj[i] || 0), x, z, delta);
        datumoj[o] = Math.min(0o377, k[0] * hunanu);
        datumoj[o + 1] = Math.min(0o377, k[1] * hunanu);
        datumoj[o + 2] = Math.min(0o377, k[2] * hunanu);
        datumoj[o + 3] = 0o377;
      }
    }
  }
  bazaKuns2bana.putImageData(bazaBildo, 0, 0);
}
