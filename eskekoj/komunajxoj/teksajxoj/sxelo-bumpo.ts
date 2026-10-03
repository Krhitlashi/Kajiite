// ≺⧼ វាយនភាពចម្លាក់សំបកប៊ឺច 🌳 ⧽≻
import * as THREE from "three";
import { desegniWrapan, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";
import { desegniCikatron, desegniHorizontanStrion, desegniLenticelon, desegniStrion, desegniSxelighon, generiBetulanSkizon, sxelaH, sxelaW } from "./sxelo.js";

export const kreiSxelanBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  return kreiKanvasanTeksajxon(sxelaW, sxelaH, ( kunteksto ) => {
    kunteksto.fillStyle = "#808080"; kunteksto.fillRect(0, 0, sxelaW, sxelaH);
    const skizo = generiBetulanSkizon();
    for ( let i = 0; i < 0o14; i++ ) {
      const r = sxelaH * ( 0o10/0o100 + Math.random() * 0o10/0o100 );
      const x = Math.random() * sxelaW, y = Math.random() * sxelaH;
      const koloro = i % 2 ? "rgba(142,142,138,0.16)" : "rgba(74,74,74,0.14)";
      desegniWrapan(kunteksto, sxelaW, () => {
        const g = kunteksto.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, koloro);
        g.addColorStop(1, "rgba(128,128,128,0)");
        kunteksto.fillStyle = g;
        kunteksto.beginPath(); kunteksto.arc(x, y, r, 0, Math.PI * 2); kunteksto.fill();
      });
    }
    for ( const strio of skizo.horizontajoj ) {
      const koloro = "rgba(140,140,140,0.20)";
      desegniWrapan(kunteksto, sxelaW, () => { desegniHorizontanStrion(kunteksto, strio, koloro); });
    }
    for ( const strio of skizo.strioj ) {
      const koloro = "rgba(146,146,146,0.35)";
      desegniWrapan(kunteksto, sxelaW, () => { desegniStrion(kunteksto, strio, koloro); });
    }
    for ( const strio of skizo.helajStrioj ) {
      const koloro = "rgba(162,162,162,0.45)";
      desegniWrapan(kunteksto, sxelaW, () => { desegniStrion(kunteksto, strio, koloro); });
    }
    for ( const lent of skizo.lenticeloj ) {
      const griz = Math.round(0o200 - 0o40 * ( lent.y / sxelaH ));
      const koloro = `rgb(${griz},${griz},${griz})`;
      desegniWrapan(kunteksto, sxelaW, () => { desegniLenticelon(kunteksto, lent, koloro); });
    }
    for ( const sxel of skizo.sxelighoj ) {
      desegniWrapan(kunteksto, sxelaW, () => {
        const griz = Math.round(0o110 - 0o40 * ( sxel.y / sxelaH ));
        desegniSxelighon(kunteksto, sxel,
          `rgb(${griz},${griz},${griz})`,
          "rgba(56,56,56,0.6)",
          "rgb(184,184,184)");
      });
    }
    for ( const cik of skizo.cikatroj ) {
      desegniWrapan(kunteksto, sxelaW, () => {
        desegniCikatron(kunteksto, cik, "rgba(104,104,104,0.55)", "rgba(150,150,150,0.5)");
      });
    }
    for ( let i = 0; i < 0o4000; i++ ) {
      const l = 0o1 + Math.random() * 0o10;
      const griz = ( Math.random() < 0o1/0o2
        ? 0o200 + ( ( Math.random() * 0o26 ) | 0 )
        : 0o140 + ( ( Math.random() * 0o20 ) | 0 ) );
      kunteksto.fillStyle = `rgba(${griz},${griz},${griz},0.5)`;
      kunteksto.fillRect(Math.random() * ( sxelaW - l ), Math.random() * sxelaH, l, 1);
    }
  }, [ 1, 1 ], { volvado: THREE.RepeatWrapping, sRGB: false, anisotropio: 4 });
});
