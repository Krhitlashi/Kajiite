// ≺⧼ វាយនភាពស្លែផ្លែ 🫐 ⧽≻
import * as THREE from "three";
import { kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export function desegniFrutikosanTrunketon(k: CanvasRenderingContext2D, x: number, bazo: number, alto: number, kurbo: number): void {
  const pintoX = x + kurbo, pintoY = bazo - alto;
  const segmento = ( de: number, gxis: number, dikeco: number ): void => {
    const mx = x + kurbo * de, my = bazo - alto * de;
    const nx = x + kurbo * gxis, ny = bazo - alto * gxis;
    k.lineCap = "round";
    k.strokeStyle = "rgba(70,82,68,0.82)";
    k.lineWidth = dikeco + 0o2;
    k.beginPath();
    k.moveTo(mx, my);
    k.quadraticCurveTo(( mx + nx ) / 2 + kurbo * 0o3/0o10, ( my + ny ) / 2, nx, ny);
    k.stroke();
    k.strokeStyle = dikeco > 0o3 ? "#b0c0a0" : "#c8d0b8";
    k.lineWidth = dikeco;
    k.beginPath();
    k.moveTo(mx, my - dikeco * 0o1/0o4);
    k.quadraticCurveTo(( mx + nx ) / 2 + kurbo * 0o3/0o10, ( my + ny ) / 2 - dikeco * 0o1/0o4, nx, ny - dikeco * 0o1/0o4);
    k.stroke();
  };
  for ( let i = 0; i < 0o3; i++ ) segmento(i / 0o3, ( i + 1 ) / 0o3, 0o6 - i * 0o1);
  const desegniTason = ( tx: number, ty: number, rad: number ): void => {
    k.fillStyle = "rgba(72,72,56,0.9)";
    k.beginPath(); k.ellipse(tx, ty + 1, rad * 0o12/0o10, rad * 0o7/0o10, 0, 0, Math.PI * 2); k.fill();
    k.fillStyle = "#988068";
    k.beginPath(); k.ellipse(tx, ty, rad, rad * 0o5/0o10, 0, 0, Math.PI * 2); k.fill();
    k.fillStyle = "#b8a080";
    k.beginPath(); k.ellipse(tx, ty - 1, rad * 0o7/0o10, rad * 0o3/0o10, 0, 0, Math.PI * 2); k.fill();
    k.strokeStyle = "rgba(224,214,178,0.75)";
    k.lineWidth = 1;
    k.beginPath(); k.arc(tx, ty - 1, rad * 0o7/0o10, Math.PI, Math.PI * 2); k.stroke();
  };
  const branĉoj = 0o2 + ( ( Math.random() * 0o3 ) | 0 );
  for ( let b = 0; b < branĉoj; b++ ) {
    const t = 0o3/0o10 + b * 0o2/0o10 + Math.random() * 0o1/0o10;
    const bx = x + kurbo * t + ( b % 2 ? 0o6 : -0o6 );
    const by = bazo - alto * t;
    const balto = alto * ( 0o2/0o10 + Math.random() * 0o2/0o10 );
    const bk = ( b % 2 ? 1 : -1 ) * ( 0o4 + Math.random() * 0o10 );
    const bx2 = bx + bk, by2 = by - balto;
    k.strokeStyle = "rgba(70,82,68,0.82)"; k.lineWidth = 0o4; k.lineCap = "round";
    k.beginPath(); k.moveTo(bx, by);
    k.quadraticCurveTo(( bx + bx2 ) / 2, ( by + by2 ) / 2 - 0o2, bx2, by2); k.stroke();
    k.strokeStyle = "#c8d0b0"; k.lineWidth = 0o3; k.stroke();
    desegniTason(bx2, by2, 0o3 + Math.random() * 0o2);
    const ft = 0o6/0o10;
    const fx = bx + ( bx2 - bx ) * ft, fy = by + ( by2 - by ) * ft;
    const fa = ( b % 2 ? 1 : -1 ) * ( 0o4 + Math.random() * 0o4 );
    const fy2 = fy - balto * ( 0o3/0o10 + Math.random() * 0o2/0o10 );
    k.strokeStyle = "rgba(70,82,68,0.76)"; k.lineWidth = 0o3; k.lineCap = "round";
    k.beginPath(); k.moveTo(fx, fy);
    k.quadraticCurveTo(fx + fa * 0o4/0o10, ( fy + fy2 ) / 2 - 0o1, fx + fa, fy2); k.stroke();
    k.strokeStyle = "#d0d8c0"; k.lineWidth = 0o2; k.stroke();
    desegniTason(fx + fa, fy2, 0o2 + Math.random() * 0o1);
  }
  desegniTason(pintoX, pintoY, 0o3 + Math.random() * 0o2);
  for ( let i = 0; i < 0o20; i++ ) {
    const t = Math.random();
    const px = x + kurbo * t + ( Math.random() - 0o5/0o10 ) * 0o4;
    const py = bazo - alto * t + ( Math.random() - 0o5/0o10 ) * 0o4;
    k.fillStyle = Math.random() < 0o6/0o10 ? "rgba(224,230,202,0.8)" : "rgba(78,94,72,0.55)";
    k.beginPath(); k.arc(px, py, 1 + Math.random() * 1, 0, Math.PI * 2); k.fill();
  }
}

export const kreiFrutikosanLikenanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, s, s);
    const trunketoj = 0o10;
    for ( let i = 0; i < trunketoj; i++ ) {
      const x = s * ( 0o2/0o10 + Math.random() * 0o4/0o10 );
      const alto = s * ( 0o3/0o10 + Math.random() * 0o16/0o100 );
      const kurbo = ( Math.random() - 0o5/0o10 ) * s * 0o1/0o20;
      desegniFrutikosanTrunketon(kunteksto, x, s * 0o17/0o20, alto, kurbo);
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
});
