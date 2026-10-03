// ≺⧼ វាយនភាពដើមស្វាយ 🌳 ⧽≻
import * as THREE from "three";
import { desegniWrapajnNubojn, desegniWrapan, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export interface PurpuraTrunkaBendo {
  y: number; alto: number; sago: number; fazo: number; cikloj: [ number, number ];
}

export interface PurpuraTrunkaFibro {
  x: number; tono: number;
}

export interface PurpuraTrunkaSkvamo {
  x: number; y: number; r: number; hela: boolean;
}

export interface PurpuraTrunkaSkizo {
  bendoj: PurpuraTrunkaBendo[];
  fibroj: PurpuraTrunkaFibro[];
  skvamoj: PurpuraTrunkaSkvamo[];
}

export const purpuraTrunkaW = 0o200, purpuraTrunkaH = 0o400;

export let purpuraTrunkaSkizo: PurpuraTrunkaSkizo | null = null;

export function generiPurpuranTrunkanSkizon(): PurpuraTrunkaSkizo {
  if ( purpuraTrunkaSkizo ) return purpuraTrunkaSkizo;
  const w = purpuraTrunkaW, h = purpuraTrunkaH;
  const bendoj: PurpuraTrunkaBendo[] = [];
  for ( let i = 0; i < 0o6; i++ ) {
    bendoj.push({
      y: h * ( 0o14/0o100 + i * 0o11/0o100 + Math.random() * 0o3/0o100 ),
      alto: 0o4 + Math.random() * 0o4,
      sago: 1 + Math.random() * 0o2,
      fazo: Math.random() * Math.PI * 2,
      cikloj: [ 0o2 + ( ( Math.random() * 0o3 ) | 0 ), 0o4 + ( ( Math.random() * 0o3 ) | 0 ) ],
    });
  }
  const fibroj: PurpuraTrunkaFibro[] = [];
  for ( let i = 0; i < 0o20; i++ ) fibroj.push({ x: Math.random() * w, tono: Math.random() });
  const skvamoj: PurpuraTrunkaSkvamo[] = [];
  for ( let i = 0; i < 0o30; i++ ) {
    skvamoj.push({ x: Math.random() * w, y: Math.random() * h, r: 1 + Math.random() * 0o2, hela: Math.random() < 0o5/0o10 });
  }
  purpuraTrunkaSkizo = { bendoj, fibroj, skvamoj };
  return purpuraTrunkaSkizo;
}

export function desegniPurpuranBendon(k: CanvasRenderingContext2D, bendo: PurpuraTrunkaBendo, koloro: string): void {
  const pasoj = 0o100, paso = purpuraTrunkaW / pasoj;
  const punktoj: number[] = [];
  const [ n1, n2 ] = bendo.cikloj;
  for ( let i = 0; i <= pasoj; i++ ) {
    const t = i / pasoj * Math.PI * 2;
    punktoj.push(bendo.sago * ( Math.sin(t * n1 + bendo.fazo) * 0o6/0o10 + Math.sin(t * n2 + bendo.fazo * 0o17/0o10) * 0o4/0o10 ));
  }
  k.beginPath();
  k.moveTo(0, bendo.y + punktoj[0]);
  for ( let i = 1; i <= pasoj; i++ ) k.lineTo(i * paso, bendo.y + punktoj[i]);
  for ( let i = pasoj; i >= 0; i-- ) k.lineTo(i * paso, bendo.y + bendo.alto + punktoj[i]);
  k.closePath();
  k.fillStyle = koloro;
  k.fill();
}

export const kreiPurpuranTrunkanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const w = purpuraTrunkaW, h = purpuraTrunkaH;
  return kreiKanvasanTeksajxon(w, h, ( k ) => {
    k.fillStyle = "#282038"; k.fillRect(0, 0, w, h);
    desegniWrapajnNubojn(k, w, h, 0o14,
      [ "rgba(72,64,88,0.20)", "rgba(16,12,24,0.18)", "rgba(88,80,104,0.14)" ],
      0o10/0o100, 0o14/0o100);
    const skizo = generiPurpuranTrunkanSkizon();
    for ( const fibro of skizo.fibroj ) {
      const koloro = fibro.tono < 0o5/0o10
        ? `rgba(96,88,112,${0o1/0o10 + Math.random() * 0o1/0o10})`
        : `rgba(16,12,24,${0o1/0o10 + Math.random() * 0o1/0o10})`;
      desegniWrapan(k, w, () => {
        k.strokeStyle = koloro;
        k.lineWidth = 1;
        k.lineCap = "round";
        k.beginPath();
        k.moveTo(fibro.x, 0);
        k.quadraticCurveTo(fibro.x + 0o2, h * 0o4/0o10, fibro.x - 0o2, h);
        k.stroke();
      });
    }
    for ( const bendo of skizo.bendoj ) {
      desegniPurpuranBendon(k, bendo, "#181018");
      desegniPurpuranBendon(k, { ...bendo, y: bendo.y + bendo.alto }, "rgba(88,80,104,0.30)");
    }
    for ( const skvamo of skizo.skvamoj ) {
      const koloro = skvamo.hela ? "rgba(104,96,128,0.16)" : "rgba(8,8,16,0.18)";
      desegniWrapan(k, w, () => {
        const l = skvamo.r * 0o6;
        k.strokeStyle = koloro;
        k.lineWidth = 1;
        k.beginPath();
        k.moveTo(skvamo.x - l, skvamo.y - l * 0o3/0o10);
        k.lineTo(skvamo.x + l, skvamo.y + l * 0o3/0o10);
        k.moveTo(skvamo.x - l, skvamo.y + l * 0o3/0o10);
        k.lineTo(skvamo.x + l, skvamo.y - l * 0o3/0o10);
        k.stroke();
      });
    }
    for ( const skvamo of skizo.skvamoj ) {
      desegniWrapan(k, w, () => {
        k.fillStyle = "rgba(16,12,24,0.4)";
        k.beginPath(); k.arc(skvamo.x, skvamo.y, skvamo.r, 0, Math.PI * 2); k.fill();
      });
    }
  }, [ 1, 2 ]);
});
