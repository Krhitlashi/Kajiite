// ≺⧼ ទម្រង់ផ្លូវ 📐 ⧽≻
import * as THREE from "three";
import { KORNA_ENA_R, KORNA_R, VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO } from "./mezuroj.js";

/**
 * សាងសង់ផ្នែកផ្លូវជាជំហានរវាងចំណុចផ្លូវពីរ។
 * យកគំរូកម្ពស់ដីរាល់ ~4 ឯកតា ដើម្បីឱ្យផ្លូវបង្កើតជំហានតាមធម្មជាតិ
 * នៅកន្លែងដីជម្រាល ហើយរលូនលើដីរាបស្មើ។
 */
export function kreiArkPunktojn(cx: number, cz: number, r: number, sx: number, sz: number): [ number, number ][] {
  const punktoj: [ number, number ][] = [];
  const pasxoj = 0o40;
  const a0 = sx > 0 ? 0 : Math.PI;
  const a1 = sz > 0 ? Math.PI / 2 : ( sx > 0 ? -Math.PI / 2 : 3 * Math.PI / 2 );
  for ( let i = 0; i <= pasxoj; i++ ) {
    const ang = a0 + ( a1 - a0 ) * ( i / pasxoj );
    punktoj.push([ cx + r * Math.cos(ang), cz + r * Math.sin(ang) ]);
  }
  return punktoj;
}

export function kreiKvaronanRingon(cx: number, cz: number, rEna: number, rEkstera: number, sx: number, sz: number): [ number, number ][] {
  return [ ...kreiArkPunktojn(cx, cz, rEkstera, sx, sz),
    ...kreiArkPunktojn(cx, cz, rEna, sx, sz).reverse() ];
}

function specimeniRotitajn(
  x: number,
  z: number,
  duono: number,
  rotacio: number,
  heightFn: ( x: number, z: number ) => number
): { maksimumo: number; minimumo: number } {
  const kos = Math.cos( rotacio ), sin = Math.sin( rotacio );
  let maksimumo = -Infinity, minimumo = Infinity;
  for ( const lx of [ -duono, duono ] ) for ( const lz of [ -duono, duono ] ) {
    const h = heightFn( x + kos * lx - sin * lz, z + sin * lx + kos * lz );
    maksimumo = Math.max( maksimumo, h );
    minimumo = Math.min( minimumo, h );
  }
  return { maksimumo, minimumo };
}

// ⟨ ហេតុអ្វីអនុគមន៍ដោយឡែក 📃 ⟩
export function plataAltoj(x: number, z: number, rotacio: number,
  heightFn: ( x: number, z: number ) => number
): { supro: number; minimumo: number } {
  const altoj = specimeniRotitajn(x, z, VOJA_EKSTERA_DUONO, rotacio, heightFn);
  return { supro: Math.max( heightFn(x, z), altoj.maksimumo ) + VOJA_SUPRO_LEVIGXO,
    minimumo: altoj.minimumo };
}

export function kreiEnanKornanArkon(sx: number, sz: number, ekstera: number): [ number, number ][] {
  return kreiArkPunktojn(sx * ( ekstera + KORNA_R ), sz * ( ekstera + KORNA_R ), KORNA_ENA_R, -sx, -sz).reverse();
}

export function kreiEksteranKurbanArkon(sx: number, sz: number, ekstera: number): [ number, number ][] {
  return kreiArkPunktojn(sx * ( ekstera + KORNA_R ), sz * ( ekstera + KORNA_R ), KORNA_R, -sx, -sz);
}

export function kreiFormonElPunktoj(punktoj: [ number, number ][]): THREE.Shape {
  const formaj = punktoj.map(p => [ p[0], -p[1] ] as [ number, number ]);
  let areo = 0;
  for ( let i = 0; i < formaj.length; i++ ) {
    const a = formaj[i], b = formaj[( i + 1 ) % formaj.length];
    areo += a[0] * b[1] - b[0] * a[1];
  }
  if ( areo < 0 ) formaj.reverse();
  const formo = new THREE.Shape();
  formo.moveTo(formaj[0][0], formaj[0][1]);
  for ( let i = 1; i < formaj.length; i++ ) formo.lineTo(formaj[i][0], formaj[i][1]);
  formo.closePath();
  return formo;
}

export function kreiSegmentGeometrion(w: number, l: number, d: number, ofsetoX: number = 0): THREE.ExtrudeGeometry {
  const formo = new THREE.Shape();
  const duonW = w / 2, duonL = l / 2;
  formo.moveTo(-duonW + ofsetoX, -duonL);
  formo.lineTo(duonW + ofsetoX, -duonL);
  formo.lineTo(duonW + ofsetoX, duonL);
  formo.lineTo(-duonW + ofsetoX, duonL);
  formo.closePath();
  return new THREE.ExtrudeGeometry(formo, { depth: d, bevelEnabled: false });
}
