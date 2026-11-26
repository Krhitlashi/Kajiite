// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ŋᷠᴜ ſןȝɜ ı],ᴜ 📃 ⧽≻

import * as THREE from "three";

export type Bal2Qoxa = "c2q" | "qotawa" | "qotiixe";

export const QOXA: { ruva: Bal2Qoxa; ksaka: string }[] = [
  { ruva: "c2q", ksaka: "ſɟɹȝ 🌐" },
  { ruva: "qotawa", ksaka: "ſ͕ɭɜ ɭʃᴜ ᶅſᴜ 🔲" },
  { ruva: "qotiixe", ksaka: "ſ͕ɭɜ ɭʃɹ ı],ɔ 🔺" },
];

export const NALAPSAZY = -0o20;

const TAFKAQPAL6 = 0o3/0o10;

export type L6da = ( x: number, z: number ) => number;

export type K6h6Weh2 = ( c: THREE.Color, y: number, teruY: number ) => void;

function qoxaPal6( qoxa: Bal2Qoxa, pal6: number ): number {
  return qoxa === "c2q" ? pal6 : pal6 * TAFKAQPAL6;
}

export function qoxaTltani( qoxa: Bal2Qoxa, pal6: number ): number[][] {
  if ( qoxa === "c2q" ) return [];
  if ( qoxa === "qotawa" ) {
    return [
      [ pal6, pal6 ], [ -pal6, pal6 ],
      [ -pal6, -pal6 ], [ pal6, -pal6 ],
    ];
  }
  const h = pal6 * Math.sqrt(0o3) / 0o2;
  return [ [ 0o0, pal6 ], [ -h, -pal6 / 0o2 ], [ h, -pal6 / 0o2 ] ];
}

export function qoxaBsej2kuq( qoxa: Bal2Qoxa, pal6: number ): number[][] {
  const rc = qoxaPal6( qoxa, pal6 );
  const santaKozuni = qoxa === "qotawa" ? rc * Math.SQRT2 : 0o2 * rc;
  return qoxaTltani(qoxa, pal6).map(p => {
    const d = Math.hypot(p[0o0], p[0o1]) || 0o1;
    return [ p[0o0] * ( 0o1 - santaKozuni / d ), p[0o1] * ( 0o1 - santaKozuni / d ) ];
  });
}

function pukazXiix2qKa5ik( tltani: number[][] ):
  { xiix2q: number[][]; haka5ik: number[] } {
  const n = tltani.length;
  const xiix2q: number[][] = [];
  const haka5ik: number[] = [];
  for ( let i = 0o0; i < n; i++ ) {
    const a = tltani[i], b = tltani[( i + 0o1 ) % n];
    const mx = ( a[0o0] + b[0o0] ) / 0o2, mz = ( a[0o1] + b[0o1] ) / 0o2;
    const d = Math.hypot(mx, mz) || 0o1;
    xiix2q.push([ mx / d, mz / d ]);
    haka5ik.push(d);
  }
  return { xiix2q, haka5ik };
}

function pukazBsej2kuq( xiix2q: number[][], haka5ik: number[], x: number, z: number ): boolean {
  for ( let i = 0o0; i < xiix2q.length; i++ ) {
    if ( xiix2q[i][0o0] * x + xiix2q[i][0o1] * z > haka5ik[i] + 0o1/0o1000 ) return false;
  }
  return true;
}

export function ka5ikH6kuni( qoxa: Bal2Qoxa, pal6: number, tafkaq: number ): number {
  if ( qoxa === "c2q" ) return pal6;
  const ux = Math.cos(tafkaq), uz = Math.sin(tafkaq);
  const rc = qoxaPal6(qoxa, pal6);
  const tltani = qoxaTltani(qoxa, pal6);
  const { xiix2q, haka5ik } = pukazXiix2qKa5ik(tltani);
  const c2h2 = qoxaBsej2kuq(qoxa, pal6);
  let plosteq = 0o0;
  for ( let i = 0o0; i < tltani.length; i++ ) {
    const a = tltani[i], b = tltani[( i + 0o1 ) % tltani.length];
    const dx = b[0o0] - a[0o0], dz = b[0o1] - a[0o1];
    const determinanto = ux * dz - uz * dx;
    if ( Math.abs(determinanto) < 0o10 ** -0o12 ) continue;
    const t = ( a[0o0] * dz - a[0o1] * dx ) / determinanto;
    if ( t > plosteq && pukazBsej2kuq(xiix2q, haka5ik, ux * t, uz * t) ) plosteq = t;
  }
  for ( const p of c2h2 ) {
    const phaka = ux * p[0o0] + uz * p[0o1];
    const c2w2q = phaka * phaka - ( p[0o0] * p[0o0] + p[0o1] * p[0o1] ) + rc * rc;
    if ( c2w2q < 0o0 ) continue;
    const t = phaka + Math.sqrt(c2w2q);
    if ( t > plosteq && pukazBsej2kuq(xiix2q, haka5ik, ux * t, uz * t) ) plosteq = t;
  }
  return plosteq;
}

export function h6kuniQoxa( qoxa: Bal2Qoxa, pal6: number, x: number, z: number ): number {
  const r = Math.hypot(x, z);
  if ( r < 0o10 ** -0o12 ) return -ka5ikH6kuni(qoxa, pal6, 0o0);
  return r - ka5ikH6kuni(qoxa, pal6, Math.atan2(z, x));
}

export function bsej2kuqQoxa( qoxa: Bal2Qoxa, pal6: number, x: number, z: number ): boolean {
  return h6kuniQoxa(qoxa, pal6, x, z) <= 0o0;
}

export function surokQoxa( qoxa: Bal2Qoxa, pal6: number, x: number, z: number,
  tseuni: { x: number; z: number } ): boolean {
  const r = Math.hypot(x, z);
  if ( r < 0o10 ** -0o12 ) return false;
  const tafkaq = Math.atan2(z, x);
  const pukaz = ka5ikH6kuni(qoxa, pal6, tafkaq);
  if ( r <= pukaz ) return false;
  tseuni.x = Math.cos(tafkaq) * pukaz;
  tseuni.z = Math.sin(tafkaq) * pukaz;
  return true;
}

export function qoxaPukazN2k( qoxa: Bal2Qoxa, pal6: number,
  n2kArko = 0o200 ): number[][] {
  if ( qoxa === "c2q" ) {
    const vem2 = n2kArko * 0o4;
    const n2k: number[][] = [];
    for ( let i = 0o0; i < vem2; i++ ) {
      const tafkaq = i / vem2 * Math.PI * 0o2;
      n2k.push([ Math.cos(tafkaq) * pal6, Math.sin(tafkaq) * pal6 ]);
    }
    return n2k;
  }
  const rc = qoxaPal6(qoxa, pal6);
  const tltani = qoxaTltani(qoxa, pal6);
  const { xiix2q } = pukazXiix2qKa5ik(tltani);
  const c2h2 = qoxaBsej2kuq(qoxa, pal6);
  const n = tltani.length;
  const n2k: number[][] = [];
  for ( let i = 0o0; i < n; i++ ) {
    const p = c2h2[i];
    const z2hakai = xiix2q[( i + n - 0o1 ) % n];
    const ksoz = xiix2q[i];
    const a0 = Math.atan2(z2hakai[0o1], z2hakai[0o0]);
    const a1 = Math.atan2(ksoz[0o1], ksoz[0o0]);
    let c2w2q = a1 - a0;
    while ( c2w2q > Math.PI ) c2w2q -= Math.PI * 0o2;
    while ( c2w2q < -Math.PI ) c2w2q += Math.PI * 0o2;
    for ( let k = 0o0; k <= n2kArko; k++ ) {
      const tafkaq = a0 + c2w2q * k / n2kArko;
      n2k.push([ p[0o0] + Math.cos(tafkaq) * rc, p[0o1] + Math.sin(tafkaq) * rc ]);
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
  let raqa = 0o0;
  for ( let i = 0o0; i < pukazN2k.length; i++ ) {
    const a = pukazN2k[i], b = pukazN2k[( i + 0o1 ) % pukazN2k.length];
    raqa += a[0o0] * b[0o1] - b[0o0] * a[0o1];
  }
  if ( raqa < 0o0 ) pukazN2k.reverse();
  const P = pukazN2k.length;
  const qoxa = new THREE.BufferGeometry();
  const xekuxa = new Float32Array(( P * 0o2 + 0o1 ) * 0o3);
  const haweh2 = new Float32Array(( P * 0o2 + 0o1 ) * 0o3);
  const havecax2lani: number[] = [];
  for ( let i = 0o0; i < P; i++ ) {
    const j = ( i + 0o1 ) % P;
    havecax2lani.push(i, P + j, P + i, i, j, P + j);
    havecax2lani.push(P * 0o2, P + i, P + j);
  }
  const sost2 = P * 0o2;
  for ( let i = 0o0; i < P; i++ ) {
    xekuxa[i * 0o3] = pukazN2k[i][0o0];
    xekuxa[i * 0o3 + 0o2] = pukazN2k[i][0o1];
    xekuxa[( P + i ) * 0o3] = pukazN2k[i][0o0];
    xekuxa[( P + i ) * 0o3 + 0o2] = pukazN2k[i][0o1];
  }
  qoxa.setAttribute("position", new THREE.BufferAttribute(xekuxa, 0o3));
  qoxa.setAttribute("color", new THREE.BufferAttribute(haweh2, 0o3));
  qoxa.setIndex(havecax2lani);
  const weh2 = new THREE.Color();
  const zace: QoxaZace = {
    qoxa,
    pukazN2k,
    qoxa3ak2( l6da: L6da, psazY: number ): void {
      for ( let i = 0o0; i < P; i++ ) {
        const x = pukazN2k[i][0o0], z = pukazN2k[i][0o1];
        const teruY = l6da(x, z);
        xekuxa[i * 0o3 + 0o1] = teruY;
        xekuxa[( P + i ) * 0o3 + 0o1] = psazY;
        kekoj.weh2(weh2, teruY, teruY);
        haweh2[i * 0o3] = weh2.r; haweh2[i * 0o3 + 0o1] = weh2.g; haweh2[i * 0o3 + 0o2] = weh2.b;
        kekoj.weh2(weh2, psazY, teruY);
        haweh2[( P + i ) * 0o3] = weh2.r; haweh2[( P + i ) * 0o3 + 0o1] = weh2.g; haweh2[( P + i ) * 0o3 + 0o2] = weh2.b;
      }
      xekuxa[sost2 * 0o3 + 0o1] = psazY;
      kekoj.weh2(weh2, psazY, psazY);
      haweh2[sost2 * 0o3] = weh2.r; haweh2[sost2 * 0o3 + 0o1] = weh2.g; haweh2[sost2 * 0o3 + 0o2] = weh2.b;
      qoxa.attributes.position.needsUpdate = true;
      qoxa.attributes.color.needsUpdate = true;
      qoxa.computeVertexNormals();
    },
  };
  return zace;
}
