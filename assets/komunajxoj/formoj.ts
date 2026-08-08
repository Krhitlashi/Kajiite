// Forma modulo — komunaj formo-fabrikoj dividitaj inter la konstruajxoj kaj la interno.
import * as THREE from "three";

// kreiPilolFenestranFormon — Longan horizontalan rondigitan fenestron. Rektangulo
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

// kreiRondigitanRektangulanFormon — Rondigita rektangulo ( nur la kvar anguloj
// estas rondaj ). Kontrauxhorlogxa volvajxo tenas la supran facon de
// ExtrudeGeometry supren post la ekzistanta -90° X-rotacio. Uzata de la vojoj
// ( kreiRondanRektangulon, kiu krampas la radiuson ), la kosmoporda lancx-
// apronoj kaj la ora bazplato — la sama formo en la tuta mondo.
//     @param w ( number ) - Largho.
//     @param d ( number ) - Profundo.
//     @param r ( number ) - Radio de la rondaj anguloj ( la alvokanto zorgu
//         pri krampo al la duon-dimensioj se necesas ).
//     @returns formo ( THREE.Shape ) - La rondigita rektangulo.
export function kreiRondigitanRektangulanFormon(w: number, d: number, r: number): THREE.Shape {
  const s = new THREE.Shape();
  const hw = w / 2, hd = d / 2;
  s.moveTo(-hw + r, -hd);
  s.lineTo(hw - r, -hd);
  s.absarc(hw - r, -hd + r, r, -Math.PI / 2, 0, false);
  s.lineTo(hw, hd - r);
  s.absarc(hw - r, hd - r, r, 0, Math.PI / 2, false);
  s.lineTo(-hw + r, hd);
  s.absarc(-hw + r, hd - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(-hw, -hd + r);
  s.absarc(-hw + r, -hd + r, r, Math.PI, Math.PI * 0o3/0o2, false);
  s.closePath();
  return s;
}
