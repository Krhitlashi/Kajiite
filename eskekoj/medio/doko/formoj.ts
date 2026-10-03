// ≺⧼ ទម្រង់ចំណត 📐 ⧽≻
import * as THREE from "three";

export function kreiDokanFormon(w: number, l: number, r: number): THREE.Shape {
  const formo = new THREE.Shape();
  const duonW = w / 2, duonL = l / 2;
  const rad = Math.max(0, Math.min(r, duonW, duonL / 2));
  formo.moveTo(-duonW, -duonL);
  formo.lineTo(duonW, -duonL);
  formo.lineTo(duonW, duonL - rad);
  formo.absarc(duonW - rad, duonL - rad, rad, 0, Math.PI / 2, false);
  formo.lineTo(-duonW + rad, duonL);
  formo.absarc(-duonW + rad, duonL - rad, rad, Math.PI / 2, Math.PI, false);
  formo.lineTo(-duonW, -duonL);
  formo.closePath();
  return formo;
}

// ⟨ វណ្ឌវង្កមួយ ការប្រើពីរ 📃 ⟩
export function kreiDokanEksteranFormon(w: number, l: number, r: number, strio: number): THREE.Shape {
  const duonW = w / 2, duonL = l / 2;
  const rad = Math.max(0, Math.min(r + strio, duonW + strio, ( duonL + strio ) / 2));
  const landa = -duonL;
  const ekstera = new THREE.Shape();
  ekstera.moveTo(-duonW - strio, landa);
  ekstera.lineTo(duonW + strio, landa);
  ekstera.lineTo(duonW + strio, duonL + strio - rad);
  ekstera.absarc(duonW + strio - rad, duonL + strio - rad, rad, 0, Math.PI / 2, false);
  ekstera.lineTo(-duonW - strio + rad, duonL + strio);
  ekstera.absarc(-duonW - strio + rad, duonL + strio - rad, rad, Math.PI / 2, Math.PI, false);
  ekstera.lineTo(-duonW - strio, landa);
  ekstera.closePath();
  return ekstera;
}

export function kreiDokanKadron(w: number, l: number, r: number, strio: number, dikeco: number): THREE.BufferGeometry {
  const ekstera = kreiDokanEksteranFormon(w, l, r, strio);
  const truo = new THREE.Path();
  truo.setFromPoints(kreiDokanFormon(w, l, r).getPoints().reverse());
  ekstera.holes.push(truo);
  const geometrio = new THREE.ExtrudeGeometry(ekstera, { depth: dikeco, bevelEnabled: false });
  geometrio.rotateX(-Math.PI / 2);
  return geometrio;
}
