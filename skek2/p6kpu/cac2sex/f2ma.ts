// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſȷɹ ŋᷠᴜ 📃 ⧽≻

import * as THREE from "three";
import { hunanu } from "../haweh2.js";
import { kf2Sakxo } from "../caq2q.js";
import { k2fKonturanQoxan, neregulaK6h6, p2somani } from "./pukek.js";

export function pentriLikenanMakulon(kuns2bana: CanvasRenderingContext2D, s: number): void {
  kuns2bana.clearRect(0o0, 0o0, s, s);
  const sakxo = kf2Sakxo(0o5231);
  const cx = s / 0o2, cy = s / 0o2;
  const hakozonu = [ 0xb8c8a0, 0xc8d8b0, 0xa8c098, 0xd0e0b8 ];
  k2fKonturanQoxan(kuns2bana,
    neregulaK6h6(cx, cy, s * 0o2/0o10, 0o6, 0o2/0o10, sakxo() * Math.PI * 0o2),
    0xc8d8b0, s * 0o1/0o40, s * 0o1/0o100);
  const hal6ksabosai = 0o14;
  for ( let i = 0o0; i < hal6ksabosai; i++ ) {
    const a = ( i / hal6ksabosai + ( sakxo() - 0o5/0o10 ) * 0o2/0o10 ) * Math.PI * 0o2;
    const d = s * ( 0o15/0o100 + sakxo() * 0o4/0o100 );
    const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
    const r = s * ( 0o4/0o100 + sakxo() * 0o3/0o100 );
    k2fKonturanQoxan(kuns2bana,
      neregulaK6h6(x, y, r, 0o4 + ( ( sakxo() * 0o3 ) | 0o0 ), 0o2/0o10, sakxo() * Math.PI * 0o2),
      hakozonu[i % hakozonu.length], s * 0o1/0o60, s * 0o1/0o140);
  }
  const apotecioj = 0o6;
  for ( let i = 0o0; i < apotecioj; i++ ) {
    const a = sakxo() * Math.PI * 0o2;
    const d = s * sakxo() * 0o12/0o100;
    const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
    const r = s * ( 0o15/0o1000 + sakxo() * 0o1/0o100 );
    const disko = new Path2D();
    disko.arc(x, y, r, 0o0, Math.PI * 0o2);
    k2fKonturanQoxan(kuns2bana, disko, 0xb89878, s * 0o1/0o140, s * 0o1/0o200);
    kuns2bana.fillStyle = hunanu(0xb89878, 0o3);
    kuns2bana.beginPath();
    kuns2bana.arc(x, y, r * 0o4/0o10, 0o0, Math.PI * 0o2);
    kuns2bana.fill();
  }
}

export let likenaP2t6zo: HTMLCanvasElement | null = null;

export function kf2LikenanP2t6zo(): HTMLCanvasElement {
  if ( likenaP2t6zo ) return likenaP2t6zo;
  const s = 0o200;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = kanvasa.height = s;
  pentriLikenanMakulon(kanvasa.getContext("2d")!, s);
  likenaP2t6zo = kanvasa;
  return kanvasa;
}

export const kf2LikenanCac2sex = p2somani((): THREE.CanvasTexture => {
  const cac2sex = new THREE.CanvasTexture(kf2LikenanP2t6zo());
  cac2sex.colorSpace = THREE.SRGBColorSpace;
  return cac2sex;
});
