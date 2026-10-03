// ≺⧼ វាយនភាពថ្ម 🪨 ⧽≻
import * as THREE from "three";
import { kreiHazardanGenerilon } from "../hazardo.js";
import { desegniWrapajnNubojn, desegniWrapan, hazard, kreiKanvasanTeksajxon, senAlfa, sxovu } from "./helpiloj.js";

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
    fendoj.push({ punktoj, dikeco: 0.7 + hazardo() * 0o7/0o10 });
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
    kunteksto.fillStyle = "#85857e"; kunteksto.fillRect(0, 0, s, s);
    desegniWrapajnNubojn(kunteksto, s, s, 0o24,
      [ "rgba(158,158,150,0.17)", "rgba(96,96,90,0.14)", "rgba(132,132,124,0.15)",
        "rgba(112,112,106,0.13)" ],
      0o14/0o100, 0o22/0o100, hazard);
    const skizo = generiRokanSkizon();
    const paletro = [ "#8a8a83", "#82827b", "#908f88", "#7d7d76", "#969690", "#87877f",
      "#8d8d86", "#7f7f78" ];
    for ( const kris of skizo.kristaloj ) {
      const bazo = paletro[( kris.tono * paletro.length ) | 0];
      const hela = kris.tono > 0.72 ? "rgba(206,206,196,0.40)" : "rgba(178,178,168,0.30)";
      desegniWrapan(kunteksto, s, () => {
        kunteksto.save();
        kunteksto.translate(kris.x, kris.y);
        kunteksto.rotate(kris.angulo);
        kunteksto.beginPath();
        for ( let v = 0; v < kris.verticoj.length; v++ ) {
          const a = ( v / kris.verticoj.length ) * Math.PI * 2;
          const r = kris.verticoj[v];
          const px = Math.cos(a) * kris.rx * r, py = Math.sin(a) * kris.ry * r;
          if ( v === 0 ) kunteksto.moveTo(px, py); else kunteksto.lineTo(px, py);
        }
        kunteksto.closePath();
        kunteksto.fillStyle = bazo;
        kunteksto.fill();
        const g = kunteksto.createLinearGradient(-kris.rx, -kris.ry, kris.rx, kris.ry);
        g.addColorStop(0, hela);
        g.addColorStop(0o6/0o10, senAlfa(hela));
        kunteksto.fillStyle = g;
        kunteksto.fill();
        kunteksto.strokeStyle = "rgba(56,56,52,0.16)";
        kunteksto.lineWidth = 1;
        kunteksto.stroke();
        kunteksto.restore();
      });
    }
    for ( const m of skizo.makuloj ) {
      const koloro = m[3] < 0o35/0o100 ? "rgba(180,180,170,0.20)"
        : ( m[3] < 0o7/0o10 ? "rgba(92,92,86,0.22)" : "rgba(104,120,92,0.20)" );
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
        kunteksto.strokeStyle = "rgba(148,148,140,0.24)";
        kunteksto.lineWidth = fendo.dikeco + 1.6;
        kunteksto.beginPath();
        kunteksto.moveTo(fendo.punktoj[0][0], fendo.punktoj[0][1]);
        for ( let i = 1; i < fendo.punktoj.length; i++ ) {
          kunteksto.lineTo(fendo.punktoj[i][0], fendo.punktoj[i][1]);
        }
        kunteksto.stroke();
        kunteksto.strokeStyle = "rgba(48,48,44,0.46)";
        kunteksto.lineWidth = fendo.dikeco;
        kunteksto.beginPath();
        kunteksto.moveTo(fendo.punktoj[0][0], fendo.punktoj[0][1]);
        for ( let i = 1; i < fendo.punktoj.length; i++ ) {
          kunteksto.lineTo(fendo.punktoj[i][0], fendo.punktoj[i][1]);
        }
        kunteksto.stroke();
      });
    }
    for ( let i = 0; i < 0o3; i++ ) {
      let x = hazard(0, s), y = hazard(0, s);
      let ang = hazard(0, Math.PI * 2);
      kunteksto.save();
      kunteksto.lineCap = "round";
      kunteksto.strokeStyle = "rgba(232,232,222,0.55)";
      kunteksto.lineWidth = 1.4 + Math.random() * 1.4;
      kunteksto.beginPath(); kunteksto.moveTo(x, y);
      for ( let j = 0; j < 0o14; j++ ) {
        ang += ( Math.random() - 0o1/0o2 ) * 0o15/0o20;
        x += Math.cos(ang) * 14; y += Math.sin(ang) * 14;
        kunteksto.lineTo(x, y);
      }
      kunteksto.stroke();
      kunteksto.strokeStyle = "rgba(120,120,112,0.30)";
      kunteksto.lineWidth = 3;
      kunteksto.stroke();
      kunteksto.restore();
    }
    for ( let i = 0; i < 0o600; i++ ) {
      const x = hazard(0, s), y = hazard(0, s);
      const wd = 1 + Math.random() * 2, hd = 1 + Math.random() * 2;
      desegniWrapan(kunteksto, s, () => {
        kunteksto.fillStyle = i % 0o7 === 0 ? "rgba(226,226,218,0.60)"
          : ( i % 2 ? "rgba(96,96,90,0.30)" : "rgba(178,178,168,0.34)" );
        kunteksto.fillRect(x, y, wd, hd);
      });
    }
  }, [ 0o3, 0o3 ], { volvado: THREE.RepeatWrapping, anisotropio: 4 });
});
