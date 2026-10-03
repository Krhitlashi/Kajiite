// ≺⧼ វាយនភាពសំបកស្វាយ 🌳 ⧽≻
import * as THREE from "three";
import { liniejo } from "../koloroj.js";
import { desegniWrapan, kreiKanvasanTeksajxon, senAlfa, sxovu } from "./helpiloj.js";
import { desegniStrion } from "./sxelo.js";

export interface PuraSxelaFendo { x: number; y: number; longo: number; ondo: number; dikeco: number; tono: number; }

export interface PuraSxelaPlato { x: number; largho: number; hela: boolean; }

export interface PuraSxelaMakulo { x: number; y: number; r: number; hela: boolean; }

export interface PuraSxelaSkizo {
  fendoj: PuraSxelaFendo[]; platoj: PuraSxelaPlato[]; makuloj: PuraSxelaMakulo[];
}

export const puraSxelaW = 0o200, puraSxelaH = 0o2000;

export let puraSxelaSkizo: PuraSxelaSkizo | null = null;

export function generiPuranSxelanSkizon(): PuraSxelaSkizo {
  if ( puraSxelaSkizo ) return puraSxelaSkizo;
  const w = puraSxelaW, h = puraSxelaH;
  const fendoj: PuraSxelaFendo[] = [];
  for ( let i = 0; i < 0o30; i++ ) {
    fendoj.push({
      x: Math.random() * w,
      y: Math.random() * h,
      longo: 0o60 + Math.random() * 0o240,
      ondo: ( Math.random() - 0o4/0o10 ) * 0o3,
      dikeco: 1 + Math.random() * 0o3,
      tono: Math.random(),
    });
  }
  const platoj: PuraSxelaPlato[] = [];
  for ( let i = 0; i < 0o24; i++ ) {
    platoj.push({
      x: Math.random() * w,
      largho: 0o2 + Math.random() * 0o6,
      hela: Math.random() < 0o1/0o2,
    });
  }
  const makuloj: PuraSxelaMakulo[] = [];
  const kolumnoj = 0o4, vicoj = 0o30;
  for ( let j = 0; j < vicoj; j++ ) for ( let i = 0; i < kolumnoj; i++ ) {
    makuloj.push({
      x: w * ( i + 0o1/0o2 + ( j % 2 === 0 ? 0o1/0o4 : -0o1/0o4 ) ) / kolumnoj,
      y: h * ( j + 0o1/0o2 ) / vicoj,
      r: h * 0.014,
      hela: ( i + j ) % 2 === 0,
    });
  }
  puraSxelaSkizo = { fendoj, platoj, makuloj };
  return puraSxelaSkizo;
}

export function desegniSxelajnPorojn(k: CanvasRenderingContext2D, r: number,
  malhela: string, hela: string): void {
  const w = puraSxelaW, h = puraSxelaH, PASO = 0o50;
  const kolumnoj = Math.floor(w / PASO), vicoj = Math.floor(h / PASO);
  const deX = ( w - kolumnoj * PASO ) / 2, deY = ( h - vicoj * PASO ) / 2;
  for ( let j = 0; j < vicoj; j++ ) for ( let i = 0; i < kolumnoj; i++ ) {
    const x = ( i + 0o1/0o2 ) * PASO + deX, y = ( j + 0o1/0o2 ) * PASO + deY;
    k.fillStyle = ( i + j ) % 2 === 0 ? malhela : hela;
    desegniWrapan(k, w, () => {
      k.beginPath(); k.arc(x, y, r, 0, Math.PI * 2); k.fill();
    });
  }
}

export const SXELA_KOLUMO_SUPRO = 0o73/0o100;

export const SXELA_KOLUMO_NOMBRO = 0o10;

export const SXELA_KOLUMO_BAZO = 0o1/0o20;

export const SXELA_KOLUMO_MEZO = 0.96;

export function desegniLaSxelanKolumon(k: CanvasRenderingContext2D,
  bando: [ string, string ], skvamo: string, vejno: string): void {
  const w = puraSxelaW, h = puraSxelaH;
  const pintoY = 0;
  const bazoY = h * ( 1 - SXELA_KOLUMO_SUPRO );
  const longo = bazoY - pintoY;
  const tasaBazo = 1 - h * SXELA_KOLUMO_BAZO / bazoY;
  const gradiento = k.createLinearGradient(0, bazoY, 0, pintoY);
  gradiento.addColorStop(0, senAlfa(bando[0]));
  gradiento.addColorStop(tasaBazo, bando[0]);
  gradiento.addColorStop(1, bando[1]);
  k.fillStyle = gradiento;
  k.fillRect(0, pintoY, w, longo);
  const pasxo = w / SXELA_KOLUMO_NOMBRO;
  const duono = pasxo * 0o7/0o10;
  for ( let i = 0; i < SXELA_KOLUMO_NOMBRO; i++ ) {
    const cx = i * pasxo;
    desegniWrapan(k, w, () => {
      k.beginPath();
      k.moveTo(cx, pintoY);
      k.quadraticCurveTo(cx - duono, pintoY + longo * 0o4/0o10,
        cx - duono * 0o6/0o10, bazoY - longo * 0o1/0o10);
      k.quadraticCurveTo(cx - duono * 0o2/0o10, bazoY, cx, bazoY);
      k.quadraticCurveTo(cx + duono * 0o2/0o10, bazoY,
        cx + duono * 0o6/0o10, bazoY - longo * 0o1/0o10);
      k.quadraticCurveTo(cx + duono, pintoY + longo * 0o4/0o10, cx, pintoY);
      k.closePath();
      k.fillStyle = skvamo;
      k.fill();
      k.lineCap = "round";
      k.lineWidth = Math.max(1, duono * 0o3/0o10);
      k.strokeStyle = vejno;
      k.beginPath();
      k.moveTo(cx, bazoY - k.lineWidth * 2);
      k.lineTo(cx, pintoY + k.lineWidth * 3);
      k.stroke();
    });
  }
}

export const SXELA_BAZAJ_HALTOJ: [ number, [ number, number, number ] ][] = [
  [ 0, [ 0x38, 0x20, 0x3e ] ],
  [ 0.35, [ 0x4c, 0x2c, 0x54 ] ],
  [ 0.72, [ 0x5e, 0x3a, 0x60 ] ],
  [ 1, [ 0x6e, 0x46, 0x6a ] ],
];

export function sxelaBazaKoloro(t: number): [ number, number, number ] {
  const f = Math.min(1, Math.max(0, t));
  for ( let i = 1; i < SXELA_BAZAJ_HALTOJ.length; i++ ) {
    const [ t1, k1 ] = SXELA_BAZAJ_HALTOJ[i];
    if ( f <= t1 ) {
      const [ t0, k0 ] = SXELA_BAZAJ_HALTOJ[i - 1];
      const u = ( f - t0 ) / ( t1 - t0 );
      return [ k0[0] + ( k1[0] - k0[0] ) * u,
        k0[1] + ( k1[1] - k0[1] ) * u,
        k0[2] + ( k1[2] - k0[2] ) * u ];
    }
  }
  const lasta = SXELA_BAZAJ_HALTOJ[SXELA_BAZAJ_HALTOJ.length - 1][1];
  return [ lasta[0], lasta[1], lasta[2] ];
}

export function sxelaTrunkaKoloro(t: number): [ number, number, number ] {
  const s = sxelaBazaKoloro(t);
  return [ liniejo(s[0]), liniejo(s[1]), liniejo(s[2]) ];
}

export function sxelaKolumKoloro(): [ number, number, number ] {
  const s = sxelaBazaKoloro(SXELA_KOLUMO_MEZO);
  return [ liniejo(s[0]), liniejo(s[1]), liniejo(s[2]) ];
}

export const kreiPurpuranSxelanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const w = puraSxelaW, h = puraSxelaH;
  const teksajxo = kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    const gradiento = kunteksto.createLinearGradient(0, h, 0, 0);
    for ( const [ frakcio, koloro ] of SXELA_BAZAJ_HALTOJ )
      gradiento.addColorStop(frakcio, `rgb(${koloro[0]},${koloro[1]},${koloro[2]})`);
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, w, h);
    const skizo = generiPuranSxelanSkizon();
    for ( const makulo of skizo.makuloj ) {
      const koloro = makulo.hela ? "rgba(178,128,186,0.13)" : "rgba(24,10,30,0.12)";
      desegniWrapan(kunteksto, w, () => {
        const g = kunteksto.createRadialGradient(makulo.x, makulo.y, 0, makulo.x, makulo.y, makulo.r);
        g.addColorStop(0, koloro);
        g.addColorStop(1, senAlfa(koloro));
        kunteksto.fillStyle = g;
        kunteksto.beginPath(); kunteksto.arc(makulo.x, makulo.y, makulo.r, 0, Math.PI * 2); kunteksto.fill();
      });
    }
    for ( const plato of skizo.platoj ) {
      const pinto = plato.hela
        ? `rgba(158,110,166,${0o13/0o100 + Math.random() * 0o7/0o100})`
        : `rgba(20,8,28,${0o15/0o100 + Math.random() * 0o7/0o100})`;
      desegniWrapan(kunteksto, w, () => {
        const g = kunteksto.createLinearGradient(plato.x, 0, plato.x + plato.largho, 0);
        g.addColorStop(0, senAlfa(pinto));
        g.addColorStop(0o1/0o2, pinto);
        g.addColorStop(1, senAlfa(pinto));
        kunteksto.fillStyle = g;
        kunteksto.fillRect(plato.x, 0, plato.largho, h);
      });
    }
    kunteksto.lineCap = "round";
    for ( const fendo of skizo.fendoj ) {
      const korpo = fendo.tono < 0o1/0o2 ? "rgba(92,48,106,0.42)" : "rgba(26,10,34,0.48)";
      const kernDikeco = Math.max(1, fendo.dikeco * 0o1/0o2);
      desegniWrapan(kunteksto, w, () => {
        desegniStrion(kunteksto, fendo, korpo);
        desegniStrion(kunteksto, { ...fendo, dikeco: kernDikeco }, "rgba(14,4,20,0.55)");
      });
    }
    desegniSxelajnPorojn(kunteksto, 0o3/0o2, "rgba(20,8,24,0.11)", "rgba(176,138,180,0.10)");
    desegniLaSxelanKolumon(kunteksto,
      [ "rgba(14,6,20,0.09)", "rgba(255,248,255,0.07)" ],
      "rgba(18,8,24,0.12)", "rgba(30,14,38,0.20)");
  }, [ 1, 1 ], { volvado: THREE.RepeatWrapping });
  teksajxo.wrapT = THREE.ClampToEdgeWrapping;
  return teksajxo;
});
