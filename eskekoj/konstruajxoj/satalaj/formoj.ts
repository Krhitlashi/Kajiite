// ≺⧼ ទម្រង់សាតាឡា 📐 ⧽≻
import * as THREE from "three";

export const MURA_KLINO = 0o5/0o20;

export function rondigitaTrapezaFormo(blokoLargho: number, tw: number, h: number, rb: number, rt: number): THREE.Shape {
  const s = new THREE.Shape(), sl = ( blokoLargho / 2 - tw / 2 ) / h;
  s.moveTo(-blokoLargho / 2 + rb, 0); s.lineTo(blokoLargho / 2 - rb, 0);
  s.quadraticCurveTo(blokoLargho / 2, 0, blokoLargho / 2 - sl * rt, rt);
  s.lineTo(tw / 2 + sl * rt, h - rt); s.quadraticCurveTo(tw / 2, h, tw / 2 - rt, h);
  s.lineTo(-tw / 2 + rt, h); s.quadraticCurveTo(-tw / 2, h, -tw / 2 - sl * rt, h - rt);
  s.lineTo(-blokoLargho / 2 + sl * rb, rb); s.quadraticCurveTo(-blokoLargho / 2, 0, -blokoLargho / 2 + rb, 0);
  return s;
}

export function kreiKlinoTavolon(hwB: number, hdB: number, hwT: number, hdT: number, alto: number): THREE.BufferGeometry {
  const rB = Math.max(0o1/0o20, Math.hypot(hwB, hdB));
  const rT = Math.max(0o1/0o20, Math.hypot(hwT, hdT));
  const g = new THREE.CylinderGeometry(rT, rB, alto, 4, 1);
  g.rotateY(Math.PI / 4);
  return g;
}

// ⟨ ជ្រុងណាត្រូវមូល 📃 ⟩
export function kreiSteleanFormon(w: number, h: number, r1: number, r2: number): THREE.Shape {
  const s = new THREE.Shape();
  const hw = w / 2;
  s.moveTo(-hw, 0);
  s.lineTo(hw, 0);
  s.lineTo(hw, h - r2);
  s.absarc(hw - r2, h - r2, r2, 0, Math.PI / 2, false);
  s.lineTo(-hw + r1, h);
  s.absarc(-hw + r1, h - r1, r1, Math.PI / 2, Math.PI, false);
  s.closePath();
  return s;
}
// ⟨ ហេតុអ្វីមិនកាត់ CatmullRom 📃 ⟩
export function diamantajDuonoj(s: number, rc = 0o1/0o20): [ number, number ][] {
  const d = s * Math.SQRT1_2;
  const kvar: [ number, number ][] = [ [ d, -d ], [ -d, -d ], [ -d, d ], [ d, d ] ];
  const ARKOJ = 3, FLATAJ = 1;
  const punktoj: [ number, number ][] = [];
  for ( let j = 0; j < kvar.length; j++ ) {
    const a = kvar[j];
    const antauxa = kvar[( j + kvar.length - 1 ) % kvar.length];
    const sekva = kvar[( j + 1 ) % kvar.length];
    const u = new THREE.Vector2(a[0] - antauxa[0], a[1] - antauxa[1]).normalize();
    const v = new THREE.Vector2(sekva[0] - a[0], sekva[1] - a[1]).normalize();
    const centro = [ a[0] + rc * ( v.x - u.x ), a[1] + rc * ( v.y - u.y) ];
    const komencaAngulo = Math.atan2(-v.y, -v.x);
    for ( let k = 0; k <= ARKOJ; k++ ) {
      const angulo = komencaAngulo - k / ARKOJ * Math.PI / 2;
      punktoj.push([ centro[0] + rc * Math.cos(angulo), centro[1] + rc * Math.sin(angulo) ]);
    }
    const rando = new THREE.Vector2(sekva[0] - a[0], sekva[1] - a[1]);
    const longeco = rando.length() - 2 * rc;
    for ( let k = 1; k <= FLATAJ; k++ ) {
      punktoj.push([
        a[0] + v.x * rc + v.x * longeco * k / ( FLATAJ + 1 ),
        a[1] + v.y * rc + v.y * longeco * k / ( FLATAJ + 1 ),
      ]);
    }
  }
  return punktoj;
}
