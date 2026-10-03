// ≺⧼ ទម្រង់ផែនទី 🗺️ ⧽≻
import * as THREE from "three";

export type MapFormo = "rondo" | "kvadrato" | "triangulo";

export const FORMOJ: { kodo: MapFormo; nomo: string }[] = [
  { kodo: "rondo", nomo: "Cirklo 🌐" },
  { kodo: "kvadrato", nomo: "Kvadrato 🔲" },
  { kodo: "triangulo", nomo: "Triangulo 🔺" },
];

export const MONDO_BAZA_Y = -0o20;

const ANGULA_PROPORCIO = 0o3/0o10;

export type Alto = ( x: number, z: number ) => number;

export type StrataKoloro = ( c: THREE.Color, y: number, surfY: number ) => void;

export function formoRondo( formo: MapFormo, grandeco: number ): number {
  return formo === "rondo" ? grandeco : grandeco * ANGULA_PROPORCIO;
}

export function formoVerticoj( formo: MapFormo, grandeco: number ): number[][] {
  if ( formo === "rondo" ) return [];
  if ( formo === "kvadrato" ) {
    return [
      [ grandeco, grandeco ], [ -grandeco, grandeco ],
      [ -grandeco, -grandeco ], [ grandeco, -grandeco ],
    ];
  }
  const h = grandeco * Math.sqrt(3) / 2;
  return [ [ 0, grandeco ], [ -h, -grandeco / 2 ], [ h, -grandeco / 2 ] ];
}

export function formoInternaj( formo: MapFormo, grandeco: number ): number[][] {
  const rc = formoRondo( formo, grandeco );
  const movo = formo === "kvadrato" ? rc * Math.SQRT2 : 2 * rc;
  return formoVerticoj(formo, grandeco).map(p => {
    const d = Math.hypot(p[0], p[1]) || 1;
    return [ p[0] * ( 1 - movo / d ), p[1] * ( 1 - movo / d ) ];
  });
}

function randajNormalojKunInradiusoj( verticoj: number[][] ):
  { normaloj: number[][]; inradiusoj: number[] } {
  const n = verticoj.length;
  const normaloj: number[][] = [];
  const inradiusoj: number[] = [];
  for ( let i = 0; i < n; i++ ) {
    const a = verticoj[i], b = verticoj[( i + 1 ) % n];
    const mx = ( a[0] + b[0] ) / 2, mz = ( a[1] + b[1] ) / 2;
    const d = Math.hypot(mx, mz) || 1;
    normaloj.push([ mx / d, mz / d ]);
    inradiusoj.push(d);
  }
  return { normaloj, inradiusoj };
}

function cxuEnMalrondigita( normaloj: number[][], inradiusoj: number[], x: number, z: number ): boolean {
  for ( let i = 0; i < normaloj.length; i++ ) {
    if ( normaloj[i][0] * x + normaloj[i][1] * z > inradiusoj[i] + 0o1/0o1000 ) return false;
  }
  return true;
}

export function radiusaDistanco( formo: MapFormo, grandeco: number, ang: number ): number {
  if ( formo === "rondo" ) return grandeco;
  const ux = Math.cos(ang), uz = Math.sin(ang);
  const rc = formoRondo(formo, grandeco);
  const verticoj = formoVerticoj(formo, grandeco);
  const { normaloj, inradiusoj } = randajNormalojKunInradiusoj(verticoj);
  const internaj = formoInternaj(formo, grandeco);
  let plej = 0;
  for ( let i = 0; i < verticoj.length; i++ ) {
    const a = verticoj[i], b = verticoj[( i + 1 ) % verticoj.length];
    const dx = b[0] - a[0], dz = b[1] - a[1];
    const determinanto = ux * dz - uz * dx;
    if ( Math.abs(determinanto) < 1e-9 ) continue;
    const t = ( a[0] * dz - a[1] * dx ) / determinanto;
    if ( t > plej && cxuEnMalrondigita(normaloj, inradiusoj, ux * t, uz * t) ) plej = t;
  }
  for ( const p of internaj ) {
    const projekcio = ux * p[0] + uz * p[1];
    const sub = projekcio * projekcio - ( p[0] * p[0] + p[1] * p[1] ) + rc * rc;
    if ( sub < 0 ) continue;
    const t = projekcio + Math.sqrt(sub);
    if ( t > plej && cxuEnMalrondigita(normaloj, inradiusoj, ux * t, uz * t) ) plej = t;
  }
  return plej;
}

export function distancoDeFormo( formo: MapFormo, grandeco: number, x: number, z: number ): number {
  const r = Math.hypot(x, z);
  if ( r < 1e-9 ) return -radiusaDistanco(formo, grandeco, 0);
  return r - radiusaDistanco(formo, grandeco, Math.atan2(z, x));
}

export function cxuEnFormo( formo: MapFormo, grandeco: number, x: number, z: number ): boolean {
  return distancoDeFormo(formo, grandeco, x, z) <= 0;
}

export function premuAlFormo( formo: MapFormo, grandeco: number, x: number, z: number,
  eligo: { x: number; z: number } ): boolean {
  const r = Math.hypot(x, z);
  if ( r < 1e-9 ) return false;
  const ang = Math.atan2(z, x);
  const rando = radiusaDistanco(formo, grandeco, ang);
  if ( r <= rando ) return false;
  eligo.x = Math.cos(ang) * rando;
  eligo.z = Math.sin(ang) * rando;
  return true;
}

export function formajRandPunktoj( formo: MapFormo, grandeco: number,
  punktojPoArko = 0o200 ): number[][] {
  if ( formo === "rondo" ) {
    const kvanto = punktojPoArko * 4;
    const punktoj: number[][] = [];
    for ( let i = 0; i < kvanto; i++ ) {
      const ang = i / kvanto * Math.PI * 2;
      punktoj.push([ Math.cos(ang) * grandeco, Math.sin(ang) * grandeco ]);
    }
    return punktoj;
  }
  const rc = formoRondo(formo, grandeco);
  const verticoj = formoVerticoj(formo, grandeco);
  const { normaloj } = randajNormalojKunInradiusoj(verticoj);
  const internaj = formoInternaj(formo, grandeco);
  const n = verticoj.length;
  const punktoj: number[][] = [];
  for ( let i = 0; i < n; i++ ) {
    const p = internaj[i];
    const antaŭa = normaloj[( i + n - 1 ) % n];
    const sekva = normaloj[i];
    const a0 = Math.atan2(antaŭa[1], antaŭa[0]);
    const a1 = Math.atan2(sekva[1], sekva[0]);
    let diferenco = a1 - a0;
    while ( diferenco > Math.PI ) diferenco -= Math.PI * 2;
    while ( diferenco < -Math.PI ) diferenco += Math.PI * 2;
    for ( let k = 0; k <= punktojPoArko; k++ ) {
      const ang = a0 + diferenco * k / punktojPoArko;
      punktoj.push([ p[0] + Math.cos(ang) * rc, p[1] + Math.sin(ang) * rc ]);
    }
  }
  return punktoj;
}

export interface FormaBazo {
  geometrio: THREE.BufferGeometry;
  randPunktoj: number[][];
  aktualigu( alto: Alto, bazaY: number ): void;
}

export function kreiFormanBazon( opcioj: {
  formo: MapFormo; grandeco: number; koloro: StrataKoloro; punktojPoArko?: number;
} ): FormaBazo {
  const randPunktoj = formajRandPunktoj(opcioj.formo, opcioj.grandeco,
    opcioj.punktojPoArko ?? 0o200);
  let areo = 0;
  for ( let i = 0; i < randPunktoj.length; i++ ) {
    const a = randPunktoj[i], b = randPunktoj[( i + 1 ) % randPunktoj.length];
    areo += a[0] * b[1] - b[0] * a[1];
  }
  if ( areo < 0 ) randPunktoj.reverse();
  const P = randPunktoj.length;
  const geometrio = new THREE.BufferGeometry();
  const pozicioj = new Float32Array(( P * 2 + 1 ) * 3);
  const koloroj = new Float32Array(( P * 2 + 1 ) * 3);
  const indeksoj: number[] = [];
  for ( let i = 0; i < P; i++ ) {
    const j = ( i + 1 ) % P;
    indeksoj.push(i, P + j, P + i, i, j, P + j);
    indeksoj.push(P * 2, P + i, P + j);
  }
  const centro = P * 2;
  for ( let i = 0; i < P; i++ ) {
    pozicioj[i * 3] = randPunktoj[i][0];
    pozicioj[i * 3 + 2] = randPunktoj[i][1];
    pozicioj[( P + i ) * 3] = randPunktoj[i][0];
    pozicioj[( P + i ) * 3 + 2] = randPunktoj[i][1];
  }
  geometrio.setAttribute("position", new THREE.BufferAttribute(pozicioj, 3));
  geometrio.setAttribute("color", new THREE.BufferAttribute(koloroj, 3));
  geometrio.setIndex(indeksoj);
  const koloro = new THREE.Color();
  const bazo: FormaBazo = {
    geometrio,
    randPunktoj,
    aktualigu( alto: Alto, bazaY: number ): void {
      for ( let i = 0; i < P; i++ ) {
        const x = randPunktoj[i][0], z = randPunktoj[i][1];
        const surfY = alto(x, z);
        pozicioj[i * 3 + 1] = surfY;
        pozicioj[( P + i ) * 3 + 1] = bazaY;
        opcioj.koloro(koloro, surfY, surfY);
        koloroj[i * 3] = koloro.r; koloroj[i * 3 + 1] = koloro.g; koloroj[i * 3 + 2] = koloro.b;
        opcioj.koloro(koloro, bazaY, surfY);
        koloroj[( P + i ) * 3] = koloro.r; koloroj[( P + i ) * 3 + 1] = koloro.g; koloroj[( P + i ) * 3 + 2] = koloro.b;
      }
      pozicioj[centro * 3 + 1] = bazaY;
      opcioj.koloro(koloro, bazaY, bazaY);
      koloroj[centro * 3] = koloro.r; koloroj[centro * 3 + 1] = koloro.g; koloroj[centro * 3 + 2] = koloro.b;
      geometrio.attributes.position.needsUpdate = true;
      geometrio.attributes.color.needsUpdate = true;
      geometrio.computeVertexNormals();
    },
  };
  return bazo;
}
