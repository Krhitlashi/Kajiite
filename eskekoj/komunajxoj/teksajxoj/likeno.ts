// ≺⧼ វាយនភាពស្លែ 🪨 ⧽≻
import * as THREE from "three";
import { ombro } from "../koloroj.js";
import { kf2Sakxo } from "../hazardo.js";
import { desegniKonturanFormon, neregulaVojo, sxovu } from "./helpiloj.js";

export function pentriLikenanMakulon(kunteksto: CanvasRenderingContext2D, s: number): void {
  kunteksto.clearRect(0o0, 0o0, s, s);
  const hazardo = kf2Sakxo(0o5231);
  const cx = s / 0o2, cy = s / 0o2;
  const bazoj = [ 0xb8c8a0, 0xc8d8b0, 0xa8c098, 0xd0e0b8 ];
  desegniKonturanFormon(kunteksto,
    neregulaVojo(cx, cy, s * 0o2/0o10, 0o6, 0o2/0o10, hazardo() * Math.PI * 0o2),
    0xc8d8b0, s * 0o1/0o40, s * 0o1/0o100);
  const loboj = 0o14;
  for ( let i = 0o0; i < loboj; i++ ) {
    const a = ( i / loboj + ( hazardo() - 0o5/0o10 ) * 0o2/0o10 ) * Math.PI * 0o2;
    const d = s * ( 0o15/0o100 + hazardo() * 0o4/0o100 );
    const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
    const r = s * ( 0o4/0o100 + hazardo() * 0o3/0o100 );
    desegniKonturanFormon(kunteksto,
      neregulaVojo(x, y, r, 0o4 + ( ( hazardo() * 0o3 ) | 0 ), 0o2/0o10, hazardo() * Math.PI * 0o2),
      bazoj[i % bazoj.length], s * 0o1/0o60, s * 0o1/0o140);
  }
  const apotecioj = 0o6;
  for ( let i = 0o0; i < apotecioj; i++ ) {
    const a = hazardo() * Math.PI * 0o2;
    const d = s * hazardo() * 0o12/0o100;
    const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
    const r = s * ( 0o15/0o1000 + hazardo() * 0o1/0o100 );
    const disko = new Path2D();
    disko.arc(x, y, r, 0o0, Math.PI * 0o2);
    desegniKonturanFormon(kunteksto, disko, 0xb89878, s * 0o1/0o140, s * 0o1/0o200);
    kunteksto.fillStyle = ombro(0xb89878, 0o3);
    kunteksto.beginPath();
    kunteksto.arc(x, y, r * 0o4/0o10, 0o0, Math.PI * 0o2);
    kunteksto.fill();
  }
}

export let likenaKanvaso: HTMLCanvasElement | null = null;

export function kreiLikenanKanvason(): HTMLCanvasElement {
  if ( likenaKanvaso ) return likenaKanvaso;
  const s = 0o200;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = kanvasa.height = s;
  pentriLikenanMakulon(kanvasa.getContext("2d")!, s);
  likenaKanvaso = kanvasa;
  return kanvasa;
}

export const kreiLikenanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const teksajxo = new THREE.CanvasTexture(kreiLikenanKanvason());
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  return teksajxo;
});
