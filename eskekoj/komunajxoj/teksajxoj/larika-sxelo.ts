// ≺⧼ វាយនភាពសំបកល្មុត 🌲 ⧽≻
import * as THREE from "three";
import { desegniWrapajnNubojn, desegniWrapan, kreiKanvasanTeksajxon, senAlfa, sxovu } from "./helpiloj.js";
import { desegniHorizontanStrion, desegniStrion } from "./sxelo.js";

export interface LarikaFendo {
  x: number; y: number; longo: number; ondo: number; dikeco: number; tono: number;
}

export interface LarikaPlato {
  x: number; y: number; longo: number; ondo: number; dikeco: number; tono: number;
}

export interface LarikaKresto { x: number; largho: number; hela: boolean; }

export interface LarikaMakulo {
  x: number; y: number; r: number; hela: boolean;
}

export interface LarikaSkizo {
  fendoj: LarikaFendo[];
  platoj: LarikaPlato[];
  makuloj: LarikaMakulo[];
  krestoj: LarikaKresto[];
}

export let larikaSkizo: LarikaSkizo | null = null;

export function generiLarikanSkizon(): LarikaSkizo {
  if ( larikaSkizo ) return larikaSkizo;
  const w = 0o200, h = 0o400;
  const fendoj: LarikaFendo[] = [];
  for ( let i = 0; i < 0o20; i++ ) {
    fendoj.push({
      x: Math.random() * w,
      y: Math.random() * h,
      longo: 0o60 + Math.random() * 0o220,
      ondo: ( Math.random() - 0o4/0o10 ) * 0o4,
      dikeco: 1 + Math.random() * 0o3,
      tono: Math.random(),
    });
  }
  const platoj: LarikaPlato[] = [];
  for ( let i = 0; i < 0o40; i++ ) {
    platoj.push({
      x: Math.random() * w,
      y: Math.random() * h,
      longo: 0o6 + Math.random() * 0o20,
      ondo: ( Math.random() - 0o4/0o10 ) * 0o3,
      dikeco: 1 + Math.random() * 0o2,
      tono: Math.random(),
    });
  }
  const makuloj: LarikaMakulo[] = [];
  for ( let i = 0; i < 0o40; i++ ) {
    makuloj.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1 + Math.random() * 0o3,
      hela: Math.random() < 0o5/0o10,
    });
  }
  const krestoj: LarikaKresto[] = [];
  for ( let i = 0; i < 0o26; i++ ) {
    krestoj.push({
      x: Math.random() * w,
      largho: 0o2 + Math.random() * Math.random() * 0o10,
      hela: Math.random() < 0o6/0o10,
    });
  }
  larikaSkizo = { fendoj, platoj, makuloj, krestoj };
  return larikaSkizo;
}

export const kreiLarikanSxelanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const w = 0o200, h = 0o400;
  return kreiKanvasanTeksajxon(w, h, ( k ) => {
    k.fillStyle = "#989080"; k.fillRect(0, 0, w, h);
    desegniWrapajnNubojn(k, w, h, 0o16,
      [ "rgba(160,150,136,0.20)", "rgba(70,62,54,0.18)", "rgba(112,104,92,0.22)" ],
      0o10/0o100, 0o14/0o100);
    const skizo = generiLarikanSkizon();
    for ( const kresto of skizo.krestoj ) {
      const pinto = kresto.hela
        ? `rgba(176,164,146,${0o17/0o100 + Math.random() * 0o10/0o100})`
        : `rgba(56,46,38,${0o20/0o100 + Math.random() * 0o10/0o100})`;
      desegniWrapan(k, w, () => {
        const g = k.createLinearGradient(kresto.x, 0, kresto.x + kresto.largho, 0);
        g.addColorStop(0, senAlfa(pinto));
        g.addColorStop(0o1/0o2, pinto);
        g.addColorStop(1, senAlfa(pinto));
        k.fillStyle = g;
        k.fillRect(kresto.x, 0, kresto.largho, h);
      });
    }
    for ( const fendo of skizo.fendoj ) {
      const korpo = fendo.tono < 0o5/0o10 ? "rgba(128,82,56,0.45)" : "rgba(70,50,40,0.50)";
      const kernDikeco = Math.max(1, fendo.dikeco * 0o5/0o10);
      desegniWrapan(k, w, () => {
        desegniStrion(k, fendo, korpo);
        desegniStrion(k, { ...fendo, dikeco: kernDikeco }, "rgba(52,36,28,0.55)");
        desegniStrion(k, { ...fendo, x: fendo.x + kernDikeco * 0o6/0o10, dikeco: 1 },
          "rgba(186,174,158,0.22)");
      });
    }
    for ( const plato of skizo.platoj ) {
      const koloro = plato.tono < 0o5/0o10
        ? `rgba(150,140,126,${0o2/0o10 + Math.random() * 0o3/0o10})`
        : `rgba(56,42,34,${0o25/0o40 + Math.random() * 0o15/0o40})`;
      desegniWrapan(k, w, () => {
        desegniHorizontanStrion(k, plato, koloro);
        if ( plato.tono >= 0o5/0o10 ) {
          desegniHorizontanStrion(k, { ...plato, y: plato.y + 1, dikeco: 1 },
            "rgba(188,176,160,0.20)");
        }
      });
    }
    for ( const makulo of skizo.makuloj ) {
      const koloro = makulo.hela ? "rgba(176,166,152,0.25)" : "rgba(52,42,36,0.30)";
      desegniWrapan(k, w, () => {
        k.fillStyle = koloro;
        k.beginPath(); k.arc(makulo.x, makulo.y, makulo.r, 0, Math.PI * 2); k.fill();
      });
    }
  }, [ 1, 2 ]);
});
