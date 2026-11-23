// ≺⧼ ſᶘꞇ }ʃɔ j͑ʃɹ ſɟɔ j͐ʃɹ j͑ʃᴜꞇ ʌ j͐ʃƽɜ }ʃꞇ 🌳 ⧽≻
import * as THREE from "three";
import { kf2X2pa } from "../koloroj.js";
import { k2fWrapan, kf2P2t6zoCac2sex, senAlfa, sxovu } from "./helpiloj.js";
import { k2fStrion } from "./s2cel2.js";

export interface PuraS2cel2Fendo { x: number; y: number; sahakani: number; ondo: number; dikeco: number; tono: number; }

export interface PuraS2cel2Pa12 { x: number; sefini: number; hela: boolean; }

export interface PuraS2cel2Makulo { x: number; y: number; r: number; hela: boolean; }

export interface PuraS2cel2Skizo {
  fendoj: PuraS2cel2Fendo[]; hapa12: PuraS2cel2Pa12[]; makuloj: PuraS2cel2Makulo[];
}

export const puraS2cel2W = 0o200, puraS2cel2H = 0o2000;

export let puraS2cel2Skizo: PuraS2cel2Skizo | null = null;

export function generiPuranS2cel2nSkizon(): PuraS2cel2Skizo {
  if ( puraS2cel2Skizo ) return puraS2cel2Skizo;
  const w = puraS2cel2W, h = puraS2cel2H;
  const fendoj: PuraS2cel2Fendo[] = [];
  for ( let i = 0; i < 0o30; i++ ) {
    fendoj.push({
      x: Math.random() * w,
      y: Math.random() * h,
      sahakani: 0o60 + Math.random() * 0o240,
      ondo: ( Math.random() - 0o4/0o10 ) * 0o3,
      dikeco: 1 + Math.random() * 0o3,
      tono: Math.random(),
    });
  }
  const hapa12: PuraS2cel2Pa12[] = [];
  for ( let i = 0; i < 0o24; i++ ) {
    hapa12.push({
      x: Math.random() * w,
      sefini: 0o2 + Math.random() * 0o6,
      hela: Math.random() < 0o1/0o2,
    });
  }
  const makuloj: PuraS2cel2Makulo[] = [];
  const kolumnoj = 0o4, hax2pa = 0o30;
  for ( let j = 0; j < hax2pa; j++ ) for ( let i = 0; i < kolumnoj; i++ ) {
    makuloj.push({
      x: w * ( i + 0o1/0o2 + ( j % 2 === 0 ? 0o1/0o4 : -0o1/0o4 ) ) / kolumnoj,
      y: h * ( j + 0o1/0o2 ) / hax2pa,
      r: h * 0o1/0o100,
      hela: ( i + j ) % 2 === 0,
    });
  }
  puraS2cel2Skizo = { fendoj, hapa12, makuloj };
  return puraS2cel2Skizo;
}

export function k2fS2cel2jnPorojn(k: CanvasRenderingContext2D, r: number,
  malhela: string, hela: string): void {
  const w = puraS2cel2W, h = puraS2cel2H, PASO = 0o50;
  const kolumnoj = Math.floor(w / PASO), hax2pa = Math.floor(h / PASO);
  const deX = ( w - kolumnoj * PASO ) / 2, deY = ( h - hax2pa * PASO ) / 2;
  for ( let j = 0; j < hax2pa; j++ ) for ( let i = 0; i < kolumnoj; i++ ) {
    const x = ( i + 0o1/0o2 ) * PASO + deX, y = ( j + 0o1/0o2 ) * PASO + deY;
    k.fillStyle = ( i + j ) % 2 === 0 ? malhela : hela;
    k2fWrapan(k, w, () => {
      k.beginPath(); k.arc(x, y, r, 0, Math.PI * 2); k.fill();
    });
  }
}

export const S2CEL2_KOLUMO_SUPRO = 0o73/0o100;

export const S2CEL2_KOLUMO_NOMBRO = 0o10;

export const S2CEL2_KOLUMO_BAZO = 0o1/0o20;

export const S2CEL2_KOLUMO_MEZO = 0o75/0o100;

export function k2fLaS2cel2nKolumon(k: CanvasRenderingContext2D,
  bando: [ string, string ], skvamo: string, vejno: string): void {
  const w = puraS2cel2W, h = puraS2cel2H;
  const pintoY = 0;
  const bazoY = h * ( 1 - S2CEL2_KOLUMO_SUPRO );
  const sahakani = bazoY - pintoY;
  const tasaBazo = 1 - h * S2CEL2_KOLUMO_BAZO / bazoY;
  const ar2ha = k.createLinearGradient(0, bazoY, 0, pintoY);
  ar2ha.addColorStop(0, senAlfa(bando[0]));
  ar2ha.addColorStop(tasaBazo, bando[0]);
  ar2ha.addColorStop(1, bando[1]);
  k.fillStyle = ar2ha;
  k.fillRect(0, pintoY, w, sahakani);
  const vepat6ni = w / S2CEL2_KOLUMO_NOMBRO;
  const p2somani = vepat6ni * 0o7/0o10;
  for ( let i = 0; i < S2CEL2_KOLUMO_NOMBRO; i++ ) {
    const cx = i * vepat6ni;
    k2fWrapan(k, w, () => {
      k.beginPath();
      k.moveTo(cx, pintoY);
      k.quadraticCurveTo(cx - p2somani, pintoY + sahakani * 0o4/0o10,
        cx - p2somani * 0o6/0o10, bazoY - sahakani * 0o1/0o10);
      k.quadraticCurveTo(cx - p2somani * 0o2/0o10, bazoY, cx, bazoY);
      k.quadraticCurveTo(cx + p2somani * 0o2/0o10, bazoY,
        cx + p2somani * 0o6/0o10, bazoY - sahakani * 0o1/0o10);
      k.quadraticCurveTo(cx + p2somani, pintoY + sahakani * 0o4/0o10, cx, pintoY);
      k.closePath();
      k.fillStyle = skvamo;
      k.fill();
      k.lineCap = "round";
      k.lineWidth = Math.max(1, p2somani * 0o3/0o10);
      k.strokeStyle = vejno;
      k.beginPath();
      k.moveTo(cx, bazoY - k.lineWidth * 2);
      k.lineTo(cx, pintoY + k.lineWidth * 3);
      k.stroke();
    });
  }
}

export const S2CEL2_BAZAJ_HALTOJ: [ number, [ number, number, number ] ][] = [
  [ 0, [ 0x38, 0x20, 0x3e ] ],
  [ 0o13/0o40, [ 0x4c, 0x2c, 0x54 ] ],
  [ 0o27/0o40, [ 0x5e, 0x3a, 0x60 ] ],
  [ 1, [ 0x6e, 0x46, 0x6a ] ],
];

export function s2cel2BazaKoloro(t: number): [ number, number, number ] {
  const f = Math.min(1, Math.max(0, t));
  for ( let i = 1; i < S2CEL2_BAZAJ_HALTOJ.length; i++ ) {
    const [ t1, k1 ] = S2CEL2_BAZAJ_HALTOJ[i];
    if ( f <= t1 ) {
      const [ t0, k0 ] = S2CEL2_BAZAJ_HALTOJ[i - 1];
      const u = ( f - t0 ) / ( t1 - t0 );
      return [ k0[0] + ( k1[0] - k0[0] ) * u,
        k0[1] + ( k1[1] - k0[1] ) * u,
        k0[2] + ( k1[2] - k0[2] ) * u ];
    }
  }
  const z2hak = S2CEL2_BAZAJ_HALTOJ[S2CEL2_BAZAJ_HALTOJ.length - 1][1];
  return [ z2hak[0], z2hak[1], z2hak[2] ];
}

export function s2cel2TrunkaKoloro(t: number): [ number, number, number ] {
  const s = s2cel2BazaKoloro(t);
  return [ kf2X2pa(s[0]), kf2X2pa(s[1]), kf2X2pa(s[2]) ];
}

export function s2cel2KolumKoloro(): [ number, number, number ] {
  const s = s2cel2BazaKoloro(S2CEL2_KOLUMO_MEZO);
  return [ kf2X2pa(s[0]), kf2X2pa(s[1]), kf2X2pa(s[2]) ];
}

export const kf2AsfanS2cel2nCac2sex = sxovu((): THREE.CanvasTexture => {
  const w = puraS2cel2W, h = puraS2cel2H;
  const cac2sex = kf2P2t6zoCac2sex(w, h, ( kuns2bana ) => {
    const ar2ha = kuns2bana.createLinearGradient(0, h, 0, 0);
    for ( const [ frakcio, weh2 ] of S2CEL2_BAZAJ_HALTOJ )
      ar2ha.addColorStop(frakcio, `rgb(${weh2[0]},${weh2[1]},${weh2[2]})`);
    kuns2bana.fillStyle = ar2ha;
    kuns2bana.fillRect(0, 0, w, h);
    const skizo = generiPuranS2cel2nSkizon();
    for ( const makulo of skizo.makuloj ) {
      const weh2 = makulo.hela ? "rgba(176,128,184,0.13)" : "rgba(24,8,24,0.12)";
      k2fWrapan(kuns2bana, w, () => {
        const g = kuns2bana.createRadialGradient(makulo.x, makulo.y, 0, makulo.x, makulo.y, makulo.r);
        g.addColorStop(0, weh2);
        g.addColorStop(1, senAlfa(weh2));
        kuns2bana.fillStyle = g;
        kuns2bana.beginPath(); kuns2bana.arc(makulo.x, makulo.y, makulo.r, 0, Math.PI * 2); kuns2bana.fill();
      });
    }
    for ( const pa12 of skizo.hapa12 ) {
      const pinto = pa12.hela
        ? `rgba(152,104,160,${0o13/0o100 + Math.random() * 0o7/0o100})`
        : `rgba(16,8,24,${0o15/0o100 + Math.random() * 0o7/0o100})`;
      k2fWrapan(kuns2bana, w, () => {
        const g = kuns2bana.createLinearGradient(pa12.x, 0, pa12.x + pa12.sefini, 0);
        g.addColorStop(0, senAlfa(pinto));
        g.addColorStop(0o1/0o2, pinto);
        g.addColorStop(1, senAlfa(pinto));
        kuns2bana.fillStyle = g;
        kuns2bana.fillRect(pa12.x, 0, pa12.sefini, h);
      });
    }
    kuns2bana.lineCap = "round";
    for ( const fendo of skizo.fendoj ) {
      const korpo = fendo.tono < 0o1/0o2 ? "rgba(88,48,104,0.42)" : "rgba(24,8,32,0.48)";
      const kernDikeco = Math.max(1, fendo.dikeco * 0o1/0o2);
      k2fWrapan(kuns2bana, w, () => {
        k2fStrion(kuns2bana, fendo, korpo);
        k2fStrion(kuns2bana, { ...fendo, dikeco: kernDikeco }, "rgba(8,0,16,0.55)");
      });
    }
    k2fS2cel2jnPorojn(kuns2bana, 0o3/0o2, "rgba(16,8,24,0.11)", "rgba(176,136,176,0.10)");
    k2fLaS2cel2nKolumon(kuns2bana,
      [ "rgba(8,0,16,0.09)", "rgba(255,248,255,0.07)" ],
      "rgba(16,8,24,0.12)", "rgba(24,8,32,0.20)");
  }, [ 1, 1 ], { volvado: THREE.RepeatWrapping });
  cac2sex.wrapT = THREE.ClampToEdgeWrapping;
  return cac2sex;
});
