// ≺⧼ វាយនភាពស្លែ 🪨 ⧽≻
import * as THREE from "three";
import { neregulaFormo, senAlfa, sxovu } from "./helpiloj.js";

export function pentriLikenanMakulon(kunteksto: CanvasRenderingContext2D, s: number): void {
  kunteksto.clearRect(0, 0, s, s);
  const cx = s / 2, cy = s / 2;
  const nuboj = [ "rgba(224,232,200,0.4)", "rgba(136,152,120,0.35)", "rgba(88,104,72,0.3)", "rgba(196,208,150,0.4)", "rgba(152,164,140,0.35)" ];
  for ( let i = 0; i < 0o20; i++ ) {
    const a = Math.random() * Math.PI * 2;
    const d = s * ( Math.random() * 0o1/0o10 );
    const r = s * ( 0o1/0o10 + Math.random() * 0o1/0o10 );
    const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
    neregulaFormo(kunteksto, x, y, r, 0o3 + ( ( Math.random() * 0o3 ) | 0 ), 0o3/0o10, Math.random() * Math.PI * 2);
    const g = kunteksto.createRadialGradient(x, y, 0, x, y, r * 0o15/0o10);
    g.addColorStop(0, nuboj[i % nuboj.length]);
    g.addColorStop(1, senAlfa(nuboj[i % nuboj.length]));
    kunteksto.fillStyle = g;
    kunteksto.fill();
  }
  const koloroj = [ "#c8d8c0", "#b8c8a8", "#d8e8c8", "#a8c8a0" ];
  const elong = 0o11/0o10 + Math.random() * 0o4/0o10;
  const nombro = 0o16 + ( ( Math.random() * 0o4 ) | 0 );
  for ( let i = 0; i < nombro; i++ ) {
    const a = Math.random() * Math.PI * 2;
    const r = s * ( 0o1/0o40 + Math.random() * 0o3/0o100 );
    const d = s * ( 0o1/0o40 + Math.random() * 0o1/0o20 );
    const x = cx + Math.cos(a) * d * elong;
    const y = cy + Math.sin(a) * d;
    neregulaFormo(kunteksto, x, y, r, 0o4 + ( ( Math.random() * 0o4 ) | 0 ), 0o3/0o10 + Math.random() * 0o25/0o100, Math.random() * Math.PI * 2);
    const gradiento = kunteksto.createRadialGradient(x, y, 0, x, y, r * 0o17/0o10);
    gradiento.addColorStop(0, koloroj[i % koloroj.length]);
    gradiento.addColorStop(0o6/0o10, koloroj[i % koloroj.length]);
    gradiento.addColorStop(1, "rgba(160,176,144,0)");
    kunteksto.fillStyle = gradiento;
    kunteksto.fill();
  }
  const ox = cx + s * ( Math.random() - 0o5/0o10 ) * 0o1/0o10;
  const oy = cy + s * ( Math.random() - 0o5/0o10 ) * 0o1/0o10;
  const or = s * 0o22/0o100;
  neregulaFormo(kunteksto, ox, oy, or, 0o4, 0o3/0o10, Math.random() * Math.PI * 2);
  const centro = kunteksto.createRadialGradient(ox, oy, 0, ox, oy, or * 0o15/0o10);
  centro.addColorStop(0, "rgba(96,112,80,0.40)");
  centro.addColorStop(1, "rgba(96,112,80,0)");
  kunteksto.fillStyle = centro;
  kunteksto.fill();
  const zono = ( zx: number, zy: number, r0: number, koloro: string, lineWidth: number, sago: number ): void => {
    kunteksto.strokeStyle = koloro;
    kunteksto.lineWidth = lineWidth;
    neregulaFormo(kunteksto, zx, zy, r0, 0o4, sago, Math.random() * Math.PI * 2);
    kunteksto.stroke();
  };
  const f1 = Math.random() * Math.PI * 2, f2 = Math.random() * Math.PI * 2;
  zono(cx + Math.cos(f1) * s * 0o6/0o100, cy + Math.sin(f1) * s * 0o6/0o100, s * 0o15/0o100, "rgba(88,104,72,0.14)", 1, 0o3/0o10);
  zono(cx + Math.cos(f2) * s * 0o4/0o100, cy + Math.sin(f2) * s * 0o4/0o100, s * 0o17/0o100, "rgba(88,104,72,0.18)", 2, 0o3/0o10);
  zono(cx, cy, s * 0o17/0o100, "rgba(232,240,216,0.50)", 3, 0o25/0o10);
  zono(cx, cy, s * 0o2/0o10, "rgba(88,104,72,0.55)", 1, 0o22/0o100);
  const loboj = 0o13 + ( ( Math.random() * 0o4 ) | 0 );
  for ( let i = 0; i < loboj; i++ ) {
    const a = ( i / loboj + Math.random() * 0o3/0o10 ) * Math.PI * 2;
    const bazo = s * ( 0o11/0o100 + Math.random() * 0o3/0o100 );
    const longo = s * ( 0o3/0o100 + Math.random() * 0o2/0o100 );
    const largho = s * ( 0o2/0o100 + Math.random() * 0o2/0o100 );
    const lx = cx + Math.cos(a) * bazo;
    const ly = cy + Math.sin(a) * bazo;
    kunteksto.save();
    kunteksto.translate(lx + Math.cos(a) * longo / 2, ly + Math.sin(a) * longo / 2);
    kunteksto.rotate(a);
    const g = kunteksto.createRadialGradient(0, 0, 0, 0, 0, longo / 2 + largho);
    g.addColorStop(0, "#b8d0a8");
    g.addColorStop(1, "rgba(160,176,144,0)");
    kunteksto.fillStyle = g;
    kunteksto.beginPath();
    kunteksto.ellipse(0, 0, longo / 2 + largho, largho, 0, 0, Math.PI * 2);
    kunteksto.fill();
    kunteksto.strokeStyle = "rgba(232,242,216,0.5)";
    kunteksto.lineWidth = 2;
    kunteksto.beginPath();
    kunteksto.ellipse(0, -1, longo / 2 + largho, largho, 0, Math.PI, Math.PI * 2);
    kunteksto.stroke();
    kunteksto.strokeStyle = "rgba(88,104,72,0.35)";
    kunteksto.lineWidth = 3;
    kunteksto.beginPath();
    kunteksto.ellipse(0, 2, longo / 2 + largho, largho, 0, 0, Math.PI);
    kunteksto.stroke();
    kunteksto.restore();
  }
  const areola = ( ax: number, ay: number, ar: number, aKvanto: number, aKoloro: string ): void => {
    kunteksto.beginPath();
    for ( let v = 0; v < aKvanto; v++ ) {
      const aa = v / aKvanto * Math.PI * 2 + Math.random() * 0o1/0o10;
      const rv = ar * ( 0o7/0o10 + Math.random() * 0o6/0o10 );
      const px = ax + Math.cos(aa) * rv, py = ay + Math.sin(aa) * rv;
      if ( v === 0 ) kunteksto.moveTo(px, py); else kunteksto.lineTo(px, py);
    }
    kunteksto.closePath();
    kunteksto.fillStyle = "rgba(210,220,190,0.46)";
    kunteksto.fill();
    kunteksto.strokeStyle = aKoloro;
    kunteksto.lineWidth = 1;
    kunteksto.stroke();
  };
  for ( let ringoI = 0; ringoI < 0o3; ringoI++ ) {
    const ĉeloj = ringoI === 0 ? 1 : 0o10;
    const r0 = ringoI === 0 ? 0 : s * ( 0o5/0o100 + ringoI * 0o5/0o100 );
    for ( let ĉ = 0; ĉ < ĉeloj; ĉ++ ) {
      const aa = ( ĉ / ĉeloj + ( Math.random() - 0o5/0o10 ) * 0o15/0o100 ) * Math.PI * 2;
      const rr = r0 + ( Math.random() - 0o5/0o10 ) * s * 0o2/0o100;
      const x = cx + Math.cos(aa) * rr, y = cy + Math.sin(aa) * rr;
      areola(x, y, s * ( 0o3/0o100 + Math.random() * 0o2/0o100 ), 0o6 + ( ( Math.random() * 0o3 ) | 0 ), `rgba(72,88,56,${0o5/0o10 + Math.random() * 0o2/0o10})`);
    }
  }
  for ( let i = 0; i < 0o54; i++ ) {
    const a = Math.random() * Math.PI * 2;
    const r = s * 0o15/0o100 * Math.sqrt(Math.random());
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    const ang = Math.random() * Math.PI;
    const long = s * ( 0o1/0o100 + Math.random() * 0o2/0o100 );
    kunteksto.strokeStyle = `rgba(72,88,56,${0o5/0o10 + Math.random() * 0o2/0o10})`;
    kunteksto.lineWidth = 1;
    kunteksto.beginPath();
    kunteksto.moveTo(x - Math.cos(ang) * long, y - Math.sin(ang) * long);
    kunteksto.lineTo(x + Math.cos(ang) * long, y + Math.sin(ang) * long);
    kunteksto.stroke();
  }
  for ( let i = 0; i < 0o160; i++ ) {
    const t = Math.sqrt(Math.random());
    const a = Math.random() * Math.PI * 2;
    const r = s * 0o5/0o20 * t;
    kunteksto.fillStyle = `rgba(88,104,72,${0o4/0o10 + Math.random() * 0o26/0o100})`;
    kunteksto.fillRect(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 1 + Math.random() * 2, 1 + Math.random() * 2);
  }
  for ( let i = 0; i < 0o100; i++ ) {
    const t = Math.sqrt(Math.random());
    const a = Math.random() * Math.PI * 2;
    const r = s * 0o5/0o20 * t;
    kunteksto.fillStyle = `rgba(232,240,216,${0o4/0o10 + Math.random() * 0o2/0o10})`;
    kunteksto.fillRect(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 1 + Math.random() * 2, 1 + Math.random() * 2);
  }
  const soradioj = 0o10 + ( ( Math.random() * 0o4 ) | 0 );
  for ( let i = 0; i < soradioj; i++ ) {
    const a = Math.random() * Math.PI * 2;
    const r = s * ( 0o4/0o100 + Math.random() * 0o1/0o10 );
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    const rad = s * ( 0o3/0o100 + Math.random() * 0o1/0o100 );
    const g = kunteksto.createRadialGradient(x, y, 0, x, y, rad);
    g.addColorStop(0, "rgba(240,246,228,0.5)");
    g.addColorStop(1, "rgba(240,246,228,0)");
    kunteksto.fillStyle = g;
    kunteksto.beginPath(); kunteksto.arc(x, y, rad, 0, Math.PI * 2); kunteksto.fill();
  }
  const amasoj = 0o2 + ( ( Math.random() * 0o2 ) | 0 );
  for ( let i = 0; i < amasoj; i++ ) {
    const a = Math.random() * Math.PI * 2;
    const r = s * ( Math.random() * 0o2/0o10 );
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    const rad = s * ( 0o4/0o100 + Math.random() * 0o1/0o100 );
    const g = kunteksto.createRadialGradient(x, y, 0, x, y, rad);
    g.addColorStop(0, "rgba(216,228,200,0.5)");
    g.addColorStop(1, "rgba(216,228,200,0)");
    kunteksto.fillStyle = g;
    kunteksto.beginPath(); kunteksto.arc(x, y, rad, 0, Math.PI * 2); kunteksto.fill();
    for ( let p = 0; p < 0o6; p++ ) {
      const pa = Math.random() * Math.PI * 2;
      const pr = Math.random() * rad;
      kunteksto.fillStyle = "rgba(88,104,72,0.5)";
      kunteksto.fillRect(x + Math.cos(pa) * pr, y + Math.sin(pa) * pr, 1 + Math.random() * 1, 1 + Math.random() * 1);
    }
  }
  const apotecioj = 0o10 + ( ( Math.random() * 0o4 ) | 0 );
  for ( let i = 0; i < apotecioj; i++ ) {
    const a = Math.random() * Math.PI * 2;
    const r = s * ( 0o4/0o100 + Math.random() * 0o11/0o100 );
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    const rad = s * ( 0o10/0o1000 + Math.random() * 0o14/0o1000 );
    kunteksto.fillStyle = "rgba(64,72,48,0.9)";
    kunteksto.beginPath();
    kunteksto.arc(x, y, rad, 0, Math.PI * 2);
    kunteksto.fill();
    kunteksto.fillStyle = "rgba(224,232,208,0.95)";
    kunteksto.beginPath();
    kunteksto.arc(x, y, rad * 0o7/0o10, 0, Math.PI * 2);
    kunteksto.fill();
    kunteksto.fillStyle = "rgba(56,64,48,0.95)";
    kunteksto.beginPath();
    kunteksto.arc(x, y, rad * 0o3/0o10, 0, Math.PI * 2);
    kunteksto.fill();
    kunteksto.strokeStyle = "rgba(255,255,250,0.55)";
    kunteksto.lineWidth = 1;
    kunteksto.beginPath();
    kunteksto.arc(x, y, rad * 0o66/0o100, -Math.PI * 0o3/0o4, -Math.PI * 0o1/0o4);
    kunteksto.stroke();
  }
  for ( let i = 0; i < 0o30; i++ ) {
    const a = Math.random() * Math.PI * 2;
    const r = s * ( Math.random() * 0o2/0o10 );
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    kunteksto.fillStyle = "rgba(64,72,48,0.7)";
    kunteksto.fillRect(x, y, 1 + Math.random() * 1, 1 + Math.random() * 1);
  }
  const pruino = kunteksto.createRadialGradient(cx, cy, 0, cx, cy, s * 0o22/0o100);
  pruino.addColorStop(0, "rgba(240,246,228,0.45)");
  pruino.addColorStop(1, "rgba(240,246,228,0.12)");
  kunteksto.fillStyle = pruino;
  kunteksto.fillRect(0, 0, s, s);
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
