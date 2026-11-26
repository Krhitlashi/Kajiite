// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ꞁȷ̀ᴜ j͑ʃʞᴜ ɔ˞ ſɟɔ j͐ʃɹ 📃 ⧽≻

import * as THREE from "three";
import { kf2X2pa } from "../haweh2.js";
import { k2fWrapan, kf2P2t6zoCac2sex, senAlfa, p2somani } from "./mafezi.js";
import { k2fStrion } from "./s2cel2.js";

export interface PuraS2cel2Tlohk2 { x: number; y: number; sahakani: number; x6mi: number; kof: number; tono: number; }

export interface PuraS2cel2Pa12 { x: number; sefini: number; hela: boolean; }

export interface PuraS2cel2Makulo { x: number; y: number; r: number; hela: boolean; }

export interface PuraS2cel2Sakp6scasai {
  hac2c2k: PuraS2cel2Tlohk2[]; hab6qaiQafej2: PuraS2cel2Pa12[]; haxet7: PuraS2cel2Makulo[];
}

export const puraS2cel2W = 0o200, puraS2cel2H = 0o2000;

export let puraS2cel2Sakp6scasai: PuraS2cel2Sakp6scasai | null = null;

export function generiPuranS2cel2nSakp6scasai(): PuraS2cel2Sakp6scasai {
  if ( puraS2cel2Sakp6scasai ) return puraS2cel2Sakp6scasai;
  const w = puraS2cel2W, h = puraS2cel2H;
  const hac2c2k: PuraS2cel2Tlohk2[] = [];
  for ( let i = 0o0; i < 0o30; i++ ) {
    hac2c2k.push({
      x: Math.random() * w,
      y: Math.random() * h,
      sahakani: 0o60 + Math.random() * 0o240,
      x6mi: ( Math.random() - 0o4/0o10 ) * 0o3,
      kof: 0o1 + Math.random() * 0o3,
      tono: Math.random(),
    });
  }
  const hab6qaiQafej2: PuraS2cel2Pa12[] = [];
  for ( let i = 0o0; i < 0o24; i++ ) {
    hab6qaiQafej2.push({
      x: Math.random() * w,
      sefini: 0o2 + Math.random() * 0o6,
      hela: Math.random() < 0o1/0o2,
    });
  }
  const haxet7: PuraS2cel2Makulo[] = [];
  const hakolumno = 0o4, hax2pa = 0o30;
  for ( let j = 0o0; j < hax2pa; j++ ) for ( let i = 0o0; i < hakolumno; i++ ) {
    haxet7.push({
      x: w * ( i + 0o1/0o2 + ( j % 0o2 === 0o0 ? 0o1/0o4 : -0o1/0o4 ) ) / hakolumno,
      y: h * ( j + 0o1/0o2 ) / hax2pa,
      r: h * 0o1/0o100,
      hela: ( i + j ) % 0o2 === 0o0,
    });
  }
  puraS2cel2Sakp6scasai = { hac2c2k, hab6qaiQafej2, haxet7 };
  return puraS2cel2Sakp6scasai;
}

export function k2fS2cel2jnHah6k6(k: CanvasRenderingContext2D, r: number,
  huna: string, hela: string): void {
  const w = puraS2cel2W, h = puraS2cel2H, Tona = 0o50;
  const hakolumno = Math.floor(w / Tona), hax2pa = Math.floor(h / Tona);
  const deX = ( w - hakolumno * Tona ) / 0o2, deY = ( h - hax2pa * Tona ) / 0o2;
  for ( let j = 0o0; j < hax2pa; j++ ) for ( let i = 0o0; i < hakolumno; i++ ) {
    const x = ( i + 0o1/0o2 ) * Tona + deX, y = ( j + 0o1/0o2 ) * Tona + deY;
    k.fillStyle = ( i + j ) % 0o2 === 0o0 ? huna : hela;
    k2fWrapan(k, w, () => {
      k.beginPath(); k.arc(x, y, r, 0o0, Math.PI * 0o2); k.fill();
    });
  }
}

export const S2CEL2KOLUMOKMARO = 0o73/0o100;

export const S2CEL2KOLUMONOMBRO = 0o10;

export const S2CEL2KOLUMOBAZO = 0o1/0o20;

export const S2CEL2KOLUMOMEZO = 0o75/0o100;

export function k2fLaS2cel2nKolumon(k: CanvasRenderingContext2D,
  bando: [ string, string ], p6zuk: string, vejno: string): void {
  const w = puraS2cel2W, h = puraS2cel2H;
  const cet2Y = 0o0;
  const kozunuY = h * ( 0o1 - S2CEL2KOLUMOKMARO );
  const sahakani = kozunuY - cet2Y;
  const tasaKozunu = 0o1 - h * S2CEL2KOLUMOBAZO / kozunuY;
  const ar2ha = k.createLinearGradient(0o0, kozunuY, 0o0, cet2Y);
  ar2ha.addColorStop(0o0, senAlfa(bando[0o0]));
  ar2ha.addColorStop(tasaKozunu, bando[0o0]);
  ar2ha.addColorStop(0o1, bando[0o1]);
  k.fillStyle = ar2ha;
  k.fillRect(0o0, cet2Y, w, sahakani);
  const vepat6ni = w / S2CEL2KOLUMONOMBRO;
  const p2somani = vepat6ni * 0o7/0o10;
  for ( let i = 0o0; i < S2CEL2KOLUMONOMBRO; i++ ) {
    const cx = i * vepat6ni;
    k2fWrapan(k, w, () => {
      k.beginPath();
      k.moveTo(cx, cet2Y);
      k.quadraticCurveTo(cx - p2somani, cet2Y + sahakani * 0o4/0o10,
        cx - p2somani * 0o6/0o10, kozunuY - sahakani * 0o1/0o10);
      k.quadraticCurveTo(cx - p2somani * 0o2/0o10, kozunuY, cx, kozunuY);
      k.quadraticCurveTo(cx + p2somani * 0o2/0o10, kozunuY,
        cx + p2somani * 0o6/0o10, kozunuY - sahakani * 0o1/0o10);
      k.quadraticCurveTo(cx + p2somani, cet2Y + sahakani * 0o4/0o10, cx, cet2Y);
      k.closePath();
      k.fillStyle = p6zuk;
      k.fill();
      k.lineCap = "round";
      k.lineWidth = Math.max(0o1, p2somani * 0o3/0o10);
      k.strokeStyle = vejno;
      k.beginPath();
      k.moveTo(cx, kozunuY - k.lineWidth * 0o2);
      k.lineTo(cx, cet2Y + k.lineWidth * 0o3);
      k.stroke();
    });
  }
}

export const S2CEL2BAZAJHHAL6DA: [ number, [ number, number, number ] ][] = [
  [ 0o0, [ 0x38, 0x20, 0x3e ] ],
  [ 0o13/0o40, [ 0x4c, 0x2c, 0x54 ] ],
  [ 0o27/0o40, [ 0x5e, 0x3a, 0x60 ] ],
  [ 0o1, [ 0x6e, 0x46, 0x6a ] ],
];

export function s2cel2BazaWeh2(t: number): [ number, number, number ] {
  const f = Math.min(0o1, Math.max(0o0, t));
  for ( let i = 0o1; i < S2CEL2BAZAJHHAL6DA.length; i++ ) {
    const [ t1, k1 ] = S2CEL2BAZAJHHAL6DA[i];
    if ( f <= t1 ) {
      const [ t0, k0 ] = S2CEL2BAZAJHHAL6DA[i - 0o1];
      const u = ( f - t0 ) / ( t1 - t0 );
      return [ k0[0o0] + ( k1[0o0] - k0[0o0] ) * u,
        k0[0o1] + ( k1[0o1] - k0[0o1] ) * u,
        k0[0o2] + ( k1[0o2] - k0[0o2] ) * u ];
    }
  }
  const z2hak = S2CEL2BAZAJHHAL6DA[S2CEL2BAZAJHHAL6DA.length - 0o1][0o1];
  return [ z2hak[0o0], z2hak[0o1], z2hak[0o2] ];
}

export function s2cel2TrunkaWeh2(t: number): [ number, number, number ] {
  const s = s2cel2BazaWeh2(t);
  return [ kf2X2pa(s[0o0]), kf2X2pa(s[0o1]), kf2X2pa(s[0o2]) ];
}

export function s2cel2KolumWeh2(): [ number, number, number ] {
  const s = s2cel2BazaWeh2(S2CEL2KOLUMOMEZO);
  return [ kf2X2pa(s[0o0]), kf2X2pa(s[0o1]), kf2X2pa(s[0o2]) ];
}

export const kf2AsfanS2cel2nCac2sex = p2somani((): THREE.CanvasTexture => {
  const w = puraS2cel2W, h = puraS2cel2H;
  const cac2sex = kf2P2t6zoCac2sex(w, h, ( kuns2bana ) => {
    const ar2ha = kuns2bana.createLinearGradient(0o0, h, 0o0, 0o0);
    for ( const [ doma, weh2 ] of S2CEL2BAZAJHHAL6DA )
      ar2ha.addColorStop(doma, `rgb(${weh2[0o0]},${weh2[0o1]},${weh2[0o2]})`);
    kuns2bana.fillStyle = ar2ha;
    kuns2bana.fillRect(0o0, 0o0, w, h);
    const sakp6scasai = generiPuranS2cel2nSakp6scasai();
    for ( const xet7 of sakp6scasai.haxet7 ) {
      const weh2 = xet7.hela ? "rgba(176,128,184,0.13)" : "rgba(24,8,24,0.12)";
      k2fWrapan(kuns2bana, w, () => {
        const g = kuns2bana.createRadialGradient(xet7.x, xet7.y, 0o0, xet7.x, xet7.y, xet7.r);
        g.addColorStop(0o0, weh2);
        g.addColorStop(0o1, senAlfa(weh2));
        kuns2bana.fillStyle = g;
        kuns2bana.beginPath(); kuns2bana.arc(xet7.x, xet7.y, xet7.r, 0o0, Math.PI * 0o2); kuns2bana.fill();
      });
    }
    for ( const b6qaiQafej2 of sakp6scasai.hab6qaiQafej2 ) {
      const n2k = b6qaiQafej2.hela
        ? `rgba(152,104,160,${0o13/0o100 + Math.random() * 0o7/0o100})`
        : `rgba(16,8,24,${0o15/0o100 + Math.random() * 0o7/0o100})`;
      k2fWrapan(kuns2bana, w, () => {
        const g = kuns2bana.createLinearGradient(b6qaiQafej2.x, 0o0, b6qaiQafej2.x + b6qaiQafej2.sefini, 0o0);
        g.addColorStop(0o0, senAlfa(n2k));
        g.addColorStop(0o1/0o2, n2k);
        g.addColorStop(0o1, senAlfa(n2k));
        kuns2bana.fillStyle = g;
        kuns2bana.fillRect(b6qaiQafej2.x, 0o0, b6qaiQafej2.sefini, h);
      });
    }
    kuns2bana.lineCap = "round";
    for ( const c2c2k of sakp6scasai.hac2c2k ) {
      const soq = c2c2k.tono < 0o1/0o2 ? "rgba(88,48,104,0.42)" : "rgba(24,8,32,0.48)";
      const lowakKof = Math.max(0o1, c2c2k.kof * 0o1/0o2);
      k2fWrapan(kuns2bana, w, () => {
        k2fStrion(kuns2bana, c2c2k, soq);
        k2fStrion(kuns2bana, { ...c2c2k, kof: lowakKof }, "rgba(8,0,16,0.55)");
      });
    }
    k2fS2cel2jnHah6k6(kuns2bana, 0o3/0o2, "rgba(16,8,24,0.11)", "rgba(176,136,176,0.10)");
    k2fLaS2cel2nKolumon(kuns2bana,
      [ "rgba(8,0,16,0.09)", "rgba(255,248,255,0.07)" ],
      "rgba(16,8,24,0.12)", "rgba(24,8,32,0.20)");
  }, [ 0o1, 0o1 ], { g2b2: THREE.RepeatWrapping });
  cac2sex.wrapT = THREE.ClampToEdgeWrapping;
  return cac2sex;
});
