// ≺⧼ La internaj formoj ✨ ⧽≻
// La oraj akcentaj koloroj ( GOLD, GOLD_SOFT, GOLD_WARM ) kaj la du malgrandaj
// formiloj — la trapeza porda truo ( kreiTrapezanPordTruon ) kaj la ringa planko
// por la heliksa ŝtuparo ( kreiRinganPlankon ).
import * as THREE from "three";

// Dezajnaj konstantaj valoroj
export const GOLD = 0xd8b068;
export const GOLD_SOFT = 0xc8a858;
export const GOLD_WARM = 0xf8d898;

// kreiTrapezanPordTruon — Rondigita trapezoida truo por la antaŭa pordo,
// kongruanta al la EKSTERAN pordo (rondigitaTrapezaFormo en satalaj-konstruaĵoj).
// CW-orde (kontraŭa al la ekstera konturo) por truo en ShapeGeometry/ExtrudeGeometry.
export function kreiTrapezanPordTruon(bazo: number, supro: number, alto: number, rb: number, rt: number): THREE.Path {
  const p = new THREE.Path(), sl = ( bazo / 2 - supro / 2 ) / alto;
  p.moveTo(-bazo / 2 + rb, 0);
  p.quadraticCurveTo(-bazo / 2, 0, -bazo / 2 + sl * rb, rb);
  p.lineTo(-supro / 2 - sl * rt, alto - rt);
  p.quadraticCurveTo(-supro / 2, alto, -supro / 2 + rt, alto);
  p.lineTo(supro / 2 - rt, alto);
  p.quadraticCurveTo(supro / 2, alto, supro / 2 + sl * rt, alto - rt);
  p.lineTo(bazo / 2 - sl * rt, rt);
  p.quadraticCurveTo(bazo / 2, 0, bazo / 2 - rb, 0);
  p.closePath();
  return p;
}

// Ringa planko — kvadrato kun cirkla truo por la helika ŝtuparo.
export function kreiRinganPlankon(hw: number, hd: number, r: number, rotacio: number): THREE.BufferGeometry {
  const s = new THREE.Shape();
  s.moveTo(-hw, -hd);
  s.lineTo(hw, -hd);
  s.lineTo(hw, hd);
  s.lineTo(-hw, hd);
  s.closePath();
  const truo = new THREE.Path();
  truo.absarc(0, 0, r, 0, Math.PI * 2, true);
  s.holes.push(truo);
  const g = new THREE.ShapeGeometry(s, 0o30);
  // Normaligu la UV-ojn al [0,1], por ke la stela plank-teksturo mapiĝu tra la
  // tuta planko ( ShapeGeometry uzas la krudajn formo-koordinatojn kiel UV ).
  const poz = g.getAttribute("position");
  const uv = g.getAttribute("uv");
  for ( let i = 0; i < uv.count; i++ ) {
    uv.setXY(i, ( poz.getX(i) + hw ) / ( hw * 2 ), ( poz.getY(i) + hd ) / ( hd * 2 ));
  }
  uv.needsUpdate = true;
  return g.rotateX(rotacio);
}
