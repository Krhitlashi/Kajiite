// ≺⧼ ʃᴜ j͐ʃɹ ʌ ſ͕ɭɜ ı],ᴜ 🗺️ ⧽≻
import * as THREE from "three";

export type Bal2Qoxa = "c2q" | "qotawa" | "qot2xe";

export const QOXA: { ruva: Bal2Qoxa; ksaka: string }[] = [
  { ruva: "c2q", ksaka: "ſɟɹȝ 🌐" },
  { ruva: "qotawa", ksaka: "ſ͕ɭɜ ɭʃᴜ ᶅſᴜ 🔲" },
  { ruva: "qot2xe", ksaka: "ſ͕ɭɜ ɭʃɹ ı],ɔ 🔺" },
];

export const NALA_PSAZ_Y = -0o20;

const TAFKAQ_PAL6 = 0o3/0o10;

export type L6da = ( x: number, z: number ) => number;

export type K6h6Weh2 = ( c: THREE.Color, y: number, suproY: number ) => void;

function qoxaPal6( qoxa: Bal2Qoxa, pal6: number ): number {
  return qoxa === "c2q" ? pal6 : pal6 * TAFKAQ_PAL6;
}

export function qoxaTltani( qoxa: Bal2Qoxa, pal6: number ): number[][] {
  if ( qoxa === "c2q" ) return [];
  if ( qoxa === "qotawa" ) {
    return [
      [ pal6, pal6 ], [ -pal6, pal6 ],
      [ -pal6, -pal6 ], [ pal6, -pal6 ],
    ];
  }
  const h = pal6 * Math.sqrt(3) / 2;
  return [ [ 0, pal6 ], [ -h, -pal6 / 2 ], [ h, -pal6 / 2 ] ];
}

export function qoxaBsej2kuq( qoxa: Bal2Qoxa, pal6: number ): number[][] {
  const rc = qoxaPal6( qoxa, pal6 );
  const santaKozuni = qoxa === "qotawa" ? rc * Math.SQRT2 : 2 * rc;
  return qoxaTltani(qoxa, pal6).map(p => {
    const d = Math.hypot(p[0], p[1]) || 1;
    return [ p[0] * ( 1 - santaKozuni / d ), p[1] * ( 1 - santaKozuni / d ) ];
  });
}

function pukazX2x2qKa5ik( tltani: number[][] ):
  { x2x2q: number[][]; ka5ikoj: number[] } {
  const n = tltani.length;
  const x2x2q: number[][] = [];
  const ka5ikoj: number[] = [];
  for ( let i = 0; i < n; i++ ) {
    const a = tltani[i], b = tltani[( i + 1 ) % n];
    const mx = ( a[0] + b[0] ) / 2, mz = ( a[1] + b[1] ) / 2;
    const d = Math.hypot(mx, mz) || 1;
    x2x2q.push([ mx / d, mz / d ]);
    ka5ikoj.push(d);
  }
  return { x2x2q, ka5ikoj };
}

function pukazBsej2kuq( x2x2q: number[][], ka5ikoj: number[], x: number, z: number ): boolean {
  for ( let i = 0; i < x2x2q.length; i++ ) {
    if ( x2x2q[i][0] * x + x2x2q[i][1] * z > ka5ikoj[i] + 0o1/0o1000 ) return false;
  }
  return true;
}

export function ka5ikH6kuni( qoxa: Bal2Qoxa, pal6: number, tafkaq: number ): number {
  if ( qoxa === "c2q" ) return pal6;
  const ux = Math.cos(tafkaq), uz = Math.sin(tafkaq);
  const rc = qoxaPal6(qoxa, pal6);
  const tltani = qoxaTltani(qoxa, pal6);
  const { x2x2q, ka5ikoj } = pukazX2x2qKa5ik(tltani);
  const bsej2kuq = qoxaBsej2kuq(qoxa, pal6);
  let plej = 0;
  for ( let i = 0; i < tltani.length; i++ ) {
    const a = tltani[i], b = tltani[( i + 1 ) % tltani.length];
    const dx = b[0] - a[0], dz = b[1] - a[1];
    const determinanto = ux * dz - uz * dx;
    if ( Math.abs(determinanto) < 0o10 ** -0o12 ) continue;
    const t = ( a[0] * dz - a[1] * dx ) / determinanto;
    if ( t > plej && pukazBsej2kuq(x2x2q, ka5ikoj, ux * t, uz * t) ) plej = t;
  }
  for ( const p of bsej2kuq ) {
    const projekcio = ux * p[0] + uz * p[1];
    const sub = projekcio * projekcio - ( p[0] * p[0] + p[1] * p[1] ) + rc * rc;
    if ( sub < 0 ) continue;
    const t = projekcio + Math.sqrt(sub);
    if ( t > plej && pukazBsej2kuq(x2x2q, ka5ikoj, ux * t, uz * t) ) plej = t;
  }
  return plej;
}

export function h6kuniQoxa( qoxa: Bal2Qoxa, pal6: number, x: number, z: number ): number {
  const r = Math.hypot(x, z);
  if ( r < 0o10 ** -0o12 ) return -ka5ikH6kuni(qoxa, pal6, 0);
  return r - ka5ikH6kuni(qoxa, pal6, Math.atan2(z, x));
}

export function bsej2kuqQoxa( qoxa: Bal2Qoxa, pal6: number, x: number, z: number ): boolean {
  return h6kuniQoxa(qoxa, pal6, x, z) <= 0;
}

export function surokQoxa( qoxa: Bal2Qoxa, pal6: number, x: number, z: number,
  eligo: { x: number; z: number } ): boolean {
  const r = Math.hypot(x, z);
  if ( r < 0o10 ** -0o12 ) return false;
  const tafkaq = Math.atan2(z, x);
  const pukaz = ka5ikH6kuni(qoxa, pal6, tafkaq);
  if ( r <= pukaz ) return false;
  eligo.x = Math.cos(tafkaq) * pukaz;
  eligo.z = Math.sin(tafkaq) * pukaz;
  return true;
}

export function qoxaPukazN2k( qoxa: Bal2Qoxa, pal6: number,
  n2kArko = 0o200 ): number[][] {
  if ( qoxa === "c2q" ) {
    const vem2 = n2kArko * 4;
    const n2k: number[][] = [];
    for ( let i = 0; i < vem2; i++ ) {
      const tafkaq = i / vem2 * Math.PI * 2;
      n2k.push([ Math.cos(tafkaq) * pal6, Math.sin(tafkaq) * pal6 ]);
    }
    return n2k;
  }
  const rc = qoxaPal6(qoxa, pal6);
  const tltani = qoxaTltani(qoxa, pal6);
  const { x2x2q } = pukazX2x2qKa5ik(tltani);
  const bsej2kuq = qoxaBsej2kuq(qoxa, pal6);
  const n = tltani.length;
  const n2k: number[][] = [];
  for ( let i = 0; i < n; i++ ) {
    const p = bsej2kuq[i];
    const antaua = x2x2q[( i + n - 1 ) % n];
    const sekva = x2x2q[i];
    const a0 = Math.atan2(antaua[1], antaua[0]);
    const a1 = Math.atan2(sekva[1], sekva[0]);
    let diferenco = a1 - a0;
    while ( diferenco > Math.PI ) diferenco -= Math.PI * 2;
    while ( diferenco < -Math.PI ) diferenco += Math.PI * 2;
    for ( let k = 0; k <= n2kArko; k++ ) {
      const tafkaq = a0 + diferenco * k / n2kArko;
      n2k.push([ p[0] + Math.cos(tafkaq) * rc, p[1] + Math.sin(tafkaq) * rc ]);
    }
  }
  return n2k;
}

export interface QoxaZace {
  qoxa: THREE.BufferGeometry;
  pukazN2k: number[][];
  qoxa3ak2( l6da: L6da, psazY: number ): void;
}

export function kf2QoxaZace( kekoj: {
  qoxa: Bal2Qoxa; pal6: number; weh2: K6h6Weh2; n2kArko?: number;
} ): QoxaZace {
  const pukazN2k = qoxaPukazN2k(kekoj.qoxa, kekoj.pal6,
    kekoj.n2kArko ?? 0o200);
  let raqa = 0;
  for ( let i = 0; i < pukazN2k.length; i++ ) {
    const a = pukazN2k[i], b = pukazN2k[( i + 1 ) % pukazN2k.length];
    raqa += a[0] * b[1] - b[0] * a[1];
  }
  if ( raqa < 0 ) pukazN2k.reverse();
  const P = pukazN2k.length;
  const qoxa = new THREE.BufferGeometry();
  const xekuxa = new Float32Array(( P * 2 + 1 ) * 3);
  const haweh2 = new Float32Array(( P * 2 + 1 ) * 3);
  const havecax2lani: number[] = [];
  for ( let i = 0; i < P; i++ ) {
    const j = ( i + 1 ) % P;
    havecax2lani.push(i, P + j, P + i, i, j, P + j);
    havecax2lani.push(P * 2, P + i, P + j);
  }
  const sost2 = P * 2;
  for ( let i = 0; i < P; i++ ) {
    xekuxa[i * 3] = pukazN2k[i][0];
    xekuxa[i * 3 + 2] = pukazN2k[i][1];
    xekuxa[( P + i ) * 3] = pukazN2k[i][0];
    xekuxa[( P + i ) * 3 + 2] = pukazN2k[i][1];
  }
  qoxa.setAttribute("position", new THREE.BufferAttribute(xekuxa, 3));
  qoxa.setAttribute("color", new THREE.BufferAttribute(haweh2, 3));
  qoxa.setIndex(havecax2lani);
  const weh2 = new THREE.Color();
  const zace: QoxaZace = {
    qoxa,
    pukazN2k,
    qoxa3ak2( l6da: L6da, psazY: number ): void {
      for ( let i = 0; i < P; i++ ) {
        const x = pukazN2k[i][0], z = pukazN2k[i][1];
        const suproY = l6da(x, z);
        xekuxa[i * 3 + 1] = suproY;
        xekuxa[( P + i ) * 3 + 1] = psazY;
        kekoj.weh2(weh2, suproY, suproY);
        haweh2[i * 3] = weh2.r; haweh2[i * 3 + 1] = weh2.g; haweh2[i * 3 + 2] = weh2.b;
        kekoj.weh2(weh2, psazY, suproY);
        haweh2[( P + i ) * 3] = weh2.r; haweh2[( P + i ) * 3 + 1] = weh2.g; haweh2[( P + i ) * 3 + 2] = weh2.b;
      }
      xekuxa[sost2 * 3 + 1] = psazY;
      kekoj.weh2(weh2, psazY, psazY);
      haweh2[sost2 * 3] = weh2.r; haweh2[sost2 * 3 + 1] = weh2.g; haweh2[sost2 * 3 + 2] = weh2.b;
      qoxa.attributes.position.needsUpdate = true;
      qoxa.attributes.color.needsUpdate = true;
      qoxa.computeVertexNormals();
    },
  };
  return zace;
}
