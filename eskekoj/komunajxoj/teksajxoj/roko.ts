// ≺⧼ វាយនភាពថ្ម 🪨 ⧽≻
import * as THREE from "three";
import { kreiHazardanGenerilon } from "../hazardo.js";
import { desegniWrapajnNubojn, desegniWrapajnMakulojn, desegniWrapan, desegniWrapanKristalon,
  desegniFendanVojon, hazard, kreiKanvasanTeksajxon, senAlfa, sxovu } from "./helpiloj.js";

export interface RokaKristalo {
  x: number; y: number; angulo: number; rx: number; ry: number;
  verticoj: number[]; tono: number;
}

export interface RokaFendo {
  punktoj: [ number, number ][]; dikeco: number;
}

export interface RokaSkizo {
  kristaloj: RokaKristalo[]; fendoj: RokaFendo[]; makuloj: [ number, number, number, number ][];
}

export function generiRokanSkizon(): RokaSkizo {
  const hazardo = kreiHazardanGenerilon(0o2731);
  const s = 0o400;
  const kristaloj: RokaKristalo[] = [];
  for ( let i = 0; i < 0o46; i++ ) {
    const n = 0o5 + ( ( hazardo() * 0o3 ) | 0 );
    const verticoj: number[] = [];
    for ( let v = 0; v < n; v++ ) verticoj.push(0o76/0o100 + hazardo() * 0o3/0o10);
    kristaloj.push({
      x: hazardo() * s, y: hazardo() * s, angulo: hazardo() * Math.PI,
      rx: 0o7 + hazardo() * 0o20, ry: 0o7 + hazardo() * 0o16,
      verticoj, tono: hazardo(),
    });
  }
  const fendoj: RokaFendo[] = [];
  for ( let i = 0; i < 0o7; i++ ) {
    const punktoj: [ number, number ][] = [];
    let x = hazardo() * s, y = hazardo() * s;
    let ang = hazardo() * Math.PI * 2;
    punktoj.push([ x, y ]);
    for ( let j = 0; j < 0o7; j++ ) {
      ang += ( hazardo() - 0o5/0o10 ) * 0o7/0o10;
      x += Math.cos(ang) * ( 0o10 + hazardo() * 0o24 );
      y += Math.sin(ang) * ( 0o10 + hazardo() * 0o24 );
      punktoj.push([ x, y ]);
    }
    fendoj.push({ punktoj, dikeco: 0o55/0o100 + hazardo() * 0o7/0o10 });
  }
  const makuloj: [ number, number, number, number ][] = [];
  for ( let i = 0; i < 0o12; i++ ) {
    makuloj.push([ hazardo() * s, hazardo() * s, 0o12 + hazardo() * 0o34, hazardo() ]);
  }
  return { kristaloj, fendoj, makuloj };
}

export const kreiRokenTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o400;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.fillStyle = "#808078"; kunteksto.fillRect(0, 0, s, s);
    desegniWrapajnNubojn(kunteksto, s, s, 0o24,
      [ "rgba(152,152,144,0.17)", "rgba(96,96,88,0.14)", "rgba(128,128,120,0.15)",
        "rgba(112,112,104,0.13)" ],
      0o14/0o100, 0o22/0o100, hazard);
    const skizo = generiRokanSkizon();
    const paletro = [ "#888880", "#808078", "#908888", "#787870", "#909090", "#808078",
      "#888880", "#787878" ];
    for ( const kris of skizo.kristaloj ) {
      const bazo = paletro[( kris.tono * paletro.length ) | 0];
      const hela = kris.tono > 0o27/0o40 ? "rgba(200,200,192,0.40)" : "rgba(176,176,168,0.30)";
      desegniWrapanKristalon(kunteksto, s, kris, ( k ) => {
        k.fillStyle = bazo;
        k.fill();
        const g = k.createLinearGradient(-kris.rx, -kris.ry, kris.rx, kris.ry);
        g.addColorStop(0, hela);
        g.addColorStop(0o6/0o10, senAlfa(hela));
        k.fillStyle = g;
        k.fill();
        k.strokeStyle = "rgba(56,56,48,0.16)";
        k.lineWidth = 1;
        k.stroke();
      });
    }
    for ( const m of skizo.makuloj ) {
      const koloro = m[3] < 0o35/0o100 ? "rgba(176,176,168,0.20)"
        : ( m[3] < 0o7/0o10 ? "rgba(88,88,80,0.22)" : "rgba(104,120,88,0.20)" );
      desegniWrapan(kunteksto, s, () => {
        const g = kunteksto.createRadialGradient(m[0], m[1], 0, m[0], m[1], m[2]);
        g.addColorStop(0, koloro);
        g.addColorStop(1, senAlfa(koloro));
        kunteksto.fillStyle = g;
        kunteksto.beginPath(); kunteksto.arc(m[0], m[1], m[2], 0, Math.PI * 2); kunteksto.fill();
      });
    }
    for ( const fendo of skizo.fendoj ) {
      desegniWrapan(kunteksto, s, () => {
        kunteksto.lineCap = "round";
        kunteksto.strokeStyle = "rgba(144,144,136,0.24)";
        kunteksto.lineWidth = fendo.dikeco + 0o63/0o40;
        desegniFendanVojon(kunteksto, fendo.punktoj);
        kunteksto.stroke();
        kunteksto.strokeStyle = "rgba(48,48,40,0.46)";
        kunteksto.lineWidth = fendo.dikeco;
        kunteksto.stroke();
      });
    }
    for ( let i = 0; i < 0o3; i++ ) {
      let x = hazard(0, s), y = hazard(0, s);
      let ang = hazard(0, Math.PI * 2);
      kunteksto.save();
      kunteksto.lineCap = "round";
      kunteksto.strokeStyle = "rgba(232,232,216,0.55)";
      kunteksto.lineWidth = 0o55/0o40 + Math.random() * 0o55/0o40;
      kunteksto.beginPath(); kunteksto.moveTo(x, y);
      for ( let j = 0; j < 0o14; j++ ) {
        ang += ( Math.random() - 0o1/0o2 ) * 0o15/0o20;
        x += Math.cos(ang) * 0o16; y += Math.sin(ang) * 0o16;
        kunteksto.lineTo(x, y);
      }
      kunteksto.stroke();
      kunteksto.strokeStyle = "rgba(120,120,112,0.30)";
      kunteksto.lineWidth = 3;
      kunteksto.stroke();
      kunteksto.restore();
    }
    desegniWrapajnMakulojn(kunteksto, s, 0o600, ( i ) => {
      const x = hazard(0, s), y = hazard(0, s);
      const wd = 1 + Math.random() * 2, hd = 1 + Math.random() * 2;
      const koloro = i % 0o7 === 0 ? "rgba(224,224,216,0.60)"
        : ( i % 2 ? "rgba(96,96,88,0.30)" : "rgba(176,176,168,0.34)" );
      return [ x, y, wd, hd, koloro ];
    });
  }, [ 0o3, 0o3 ], { volvado: THREE.RepeatWrapping, anisotropio: 4 });
});
