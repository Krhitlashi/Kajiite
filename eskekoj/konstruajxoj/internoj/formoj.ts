// ≺⧼ ទម្រង់ខាងក្នុង ✨ ⧽≻
import * as THREE from "three";

export const GOLD = 0xd8b068;
export const GOLD_SOFT = 0xc8a858;
export const GOLD_WARM = 0xf8d898;

export function kreiTrapezanPordTruon(kozuni: number, teru: number, l6da: number, rb: number, rt: number): THREE.Path {
  const p = new THREE.Path(), sl = ( kozuni / 2 - teru / 2 ) / l6da;
  p.moveTo(-kozuni / 2 + rb, 0);
  p.quadraticCurveTo(-kozuni / 2, 0, -kozuni / 2 + sl * rb, rb);
  p.lineTo(-teru / 2 - sl * rt, l6da - rt);
  p.quadraticCurveTo(-teru / 2, l6da, -teru / 2 + rt, l6da);
  p.lineTo(teru / 2 - rt, l6da);
  p.quadraticCurveTo(teru / 2, l6da, teru / 2 + sl * rt, l6da - rt);
  p.lineTo(kozuni / 2 - sl * rt, rt);
  p.quadraticCurveTo(kozuni / 2, 0, kozuni / 2 - rb, 0);
  p.closePath();
  return p;
}

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
  const poz = g.getAttribute("position");
  const uv = g.getAttribute("uv");
  for ( let i = 0; i < uv.count; i++ ) {
    uv.setXY(i, ( poz.getX(i) + hw ) / ( hw * 2 ), ( poz.getY(i) + hd ) / ( hd * 2 ));
  }
  uv.needsUpdate = true;
  return g.rotateX(rotacio);
}
