// ≺⧼ Diorita teksajxo 🪨 ⧽≻
import * as THREE from "three";
import { desegniWrapajnNubojn, desegniWrapan, hazard, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export interface DioritaKristalo {
  x: number; y: number; rx: number; ry: number; angulo: number;
  indekso: number;
  verticoj: number[];
}

export const dioritaPaletro = [
  { hela: "#f8f8f0", bazo: "#f0f0e8", malhela: "#d8d8d0", reliefo: 0o54/0o100 },
  { hela: "#f0f0e8", bazo: "#e8e8e0", malhela: "#d0d0c8", reliefo: 0o52/0o100 },
  { hela: "#e8e8e0", bazo: "#e0e0d8", malhela: "#c8c8c0", reliefo: 0o50/0o100 },
  { hela: "#e0e0d8", bazo: "#d8d8d0", malhela: "#c0c0b8", reliefo: 0o46/0o100 },
  { hela: "#d8d8d0", bazo: "#d0d0c8", malhela: "#b8b8b0", reliefo: 0o44/0o100 },
  { hela: "#d0d0c8", bazo: "#c8c8c0", malhela: "#b0b0a8", reliefo: 0o42/0o100 },
  { hela: "#c0c0b8", bazo: "#b8b8b0", malhela: "#a0a098", reliefo: 0o40/0o100 },
  { hela: "#b0b0a8", bazo: "#a8a8a0", malhela: "#909088", reliefo: 0o36/0o100 },
  { hela: "#a0a098", bazo: "#989890", malhela: "#808078", reliefo: 0o34/0o100 },
  { hela: "#909088", bazo: "#888880", malhela: "#787870", reliefo: 0o32/0o100 },
  { hela: "#707068", bazo: "#686860", malhela: "#505048", reliefo: 0o26/0o100 },
  { hela: "#606058", bazo: "#585850", malhela: "#484840", reliefo: 0o24/0o100 },
  { hela: "#505048", bazo: "#484840", malhela: "#383830", reliefo: 0o22/0o100 },
  { hela: "#404038", bazo: "#383830", malhela: "#282820", reliefo: 0o20/0o100 },
  { hela: "#303028", bazo: "#282820", malhela: "#181810", reliefo: 0o16/0o100 },
];

export function elektiDioritanIndekson(): number {
  const r = Math.random();
  if ( r < 0o32/0o100 ) return ( Math.random() * 0o4 ) | 0;
  if ( r < 0o54/0o100 ) return 0o4 + ( ( Math.random() * 0o4 ) | 0 );
  return 0o10 + ( ( Math.random() * 0o4 ) | 0 );
}

export let dioritajKristaloj: DioritaKristalo[] | null = null;

export function generiDioritajnKristalojn(): DioritaKristalo[] {
  if ( dioritajKristaloj ) return dioritajKristaloj;
  const listo: DioritaKristalo[] = [];
  for ( let i = 0; i < 0o340; i++ ) {
    const n = 0o4 + ( ( Math.random() * 0o4 ) | 0 );
    const verticoj: number[] = [];
    for ( let v = 0; v < n; v++ ) verticoj.push(0o7/0o10 + Math.random() * 0o3/0o10);
    listo.push({
      x: hazard(0, 0o400), y: hazard(0, 0o400),
      rx: hazard(0o4, 0o14), ry: hazard(0o3, 0o11),
      angulo: hazard(0, Math.PI),
      indekso: elektiDioritanIndekson(),
      verticoj,
    });
  }
  dioritajKristaloj = listo;
  return listo;
}

export const kreiDioritanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o400;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.fillStyle = "#d8d8d0"; kunteksto.fillRect(0, 0, s, s);
    desegniWrapajnNubojn(kunteksto, s, s, 0o20,
      [ "rgba(248,248,240,0.3)", "rgba(104,104,96,0.18)", "rgba(168,168,160,0.26)", "rgba(136,136,128,0.16)" ],
      0o14/0o100, 0o16/0o100, hazard);
    const kristaloj = generiDioritajnKristalojn();
    const grajnRandoj = [ "rgba(48,48,40,0.4)", "rgba(40,40,32,0.4)", "rgba(16,16,8,0.45)" ];
    for ( let i = 0; i < kristaloj.length; i++ ) {
      const kris = kristaloj[i];
      const pal = dioritaPaletro[kris.indekso];
      const rando = grajnRandoj[kris.indekso < 0o4 ? 0 : ( kris.indekso < 0o10 ? 1 : 2 )];
      desegniWrapan(kunteksto, s, () => {
        kunteksto.save();
        kunteksto.translate(kris.x, kris.y);
        kunteksto.rotate(kris.angulo);
        const g = kunteksto.createLinearGradient(-kris.rx, -kris.ry, kris.rx, kris.ry);
        g.addColorStop(0, pal.hela);
        g.addColorStop(0o7/0o10, pal.bazo);
        g.addColorStop(1, pal.malhela);
        kunteksto.beginPath();
        for ( let v = 0; v < kris.verticoj.length; v++ ) {
          const a = ( v / kris.verticoj.length ) * Math.PI * 2;
          const r = kris.verticoj[v];
          const px = Math.cos(a) * kris.rx * r;
          const py = Math.sin(a) * kris.ry * r;
          if ( v === 0 ) kunteksto.moveTo(px, py); else kunteksto.lineTo(px, py);
        }
        kunteksto.closePath();
        kunteksto.fillStyle = g;
        kunteksto.fill();
        kunteksto.strokeStyle = rando;
        kunteksto.lineWidth = 1;
        kunteksto.stroke();
        kunteksto.restore();
      });
    }
    for ( let i = 0; i < 0o640; i++ ) {
      const wd = hazard(0o1, 0o3), hd = hazard(0o1, 0o3);
      const x = hazard(0, s), y = hazard(0, s);
      desegniWrapan(kunteksto, s, () => {
        kunteksto.fillStyle = i % 2 ? "rgba(80,80,72,0.45)" : "rgba(168,168,160,0.5)";
        kunteksto.fillRect(x, y, wd, hd);
      });
    }
    for ( let i = 0; i < 0o110; i++ ) {
      const wd = 1 + Math.random() * 2, hd = 1 + Math.random() * 2;
      const x = hazard(0, s), y = hazard(0, s);
      desegniWrapan(kunteksto, s, () => {
        kunteksto.fillStyle = "rgba(248,248,240,0.85)";
        kunteksto.fillRect(x, y, wd, hd);
      });
    }
  }, [ 0o2, 0o2 ], { volvado: THREE.RepeatWrapping, anisotropio: 4 });
});
