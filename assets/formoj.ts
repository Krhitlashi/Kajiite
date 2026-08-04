// Forma modulo — komunaj formo-fabrikoj dividitaj inter la konstruajxoj kaj la interno.
import * as THREE from "three";

// kreiPilolFenestranFormon — LONGAs horizontalan rondigitan fenestron. Rektangulo
// kun duoncirklaj finoj (pilolo). Uzata por la internaj fenestroj (centritaj sur
// cxiu muro), la kasafeaj eksteraj fenestroj kaj la spacosxipaj fenestroj.
export function kreiPilolFenestranFormon(w: number, h: number): THREE.Shape {
  const s = new THREE.Shape();
  const hw = w / 2, r = h / 2;
  s.moveTo(-hw + r, 0);
  s.lineTo(hw - r, 0);
  s.absarc(hw - r, r, r, -Math.PI / 2, Math.PI / 2, false);
  s.lineTo(-hw + r, h);
  s.absarc(-hw + r, r, r, Math.PI / 2, Math.PI * 0o3/0o2, false);
  s.closePath();
  return s;
}
