// ≺⧼ ſᶘꞇ }ʃɔ j͑ʃɜ j͑ʃƨɹ ſɟɔ j͐ʃɹ j͑ʃᴜꞇ ʌ j͐ʃƽɜ }ʃꞇ 🌳 ⧽≻
import * as THREE from "three";
import { k2fWrapajnNubojn, k2fWrapan, kf2P2t6zoCac2sex, sxovu } from "./helpiloj.js";

export interface AsfaTrunkaBendo {
  y: number; l6da: number; sago: number; fazo: number; cikloj: [ number, number ];
}

export interface AsfaTrunkaFibro {
  x: number; tono: number;
}

export interface AsfaTrunkaSkvamo {
  x: number; y: number; r: number; hela: boolean;
}

export interface AsfaTrunkaSkizo {
  bendoj: AsfaTrunkaBendo[];
  fibroj: AsfaTrunkaFibro[];
  skvamoj: AsfaTrunkaSkvamo[];
}

export const asfaTrunkaW = 0o200, asfaTrunkaH = 0o400;

export let asfaTrunkaSkizo: AsfaTrunkaSkizo | null = null;

export function generiAsfanTrunkanSkizon(): AsfaTrunkaSkizo {
  if ( asfaTrunkaSkizo ) return asfaTrunkaSkizo;
  const w = asfaTrunkaW, h = asfaTrunkaH;
  const bendoj: AsfaTrunkaBendo[] = [];
  for ( let i = 0; i < 0o6; i++ ) {
    bendoj.push({
      y: h * ( 0o14/0o100 + i * 0o11/0o100 + Math.random() * 0o3/0o100 ),
      l6da: 0o4 + Math.random() * 0o4,
      sago: 1 + Math.random() * 0o2,
      fazo: Math.random() * Math.PI * 2,
      cikloj: [ 0o2 + ( ( Math.random() * 0o3 ) | 0 ), 0o4 + ( ( Math.random() * 0o3 ) | 0 ) ],
    });
  }
  const fibroj: AsfaTrunkaFibro[] = [];
  for ( let i = 0; i < 0o20; i++ ) fibroj.push({ x: Math.random() * w, tono: Math.random() });
  const skvamoj: AsfaTrunkaSkvamo[] = [];
  for ( let i = 0; i < 0o30; i++ ) {
    skvamoj.push({ x: Math.random() * w, y: Math.random() * h, r: 1 + Math.random() * 0o2, hela: Math.random() < 0o5/0o10 });
  }
  asfaTrunkaSkizo = { bendoj, fibroj, skvamoj };
  return asfaTrunkaSkizo;
}

export function k2fAsfanBendon(k: CanvasRenderingContext2D, bendo: AsfaTrunkaBendo, weh2: string): void {
  const havepat6ni = 0o100, vepat6ni = asfaTrunkaW / havepat6ni;
  const n2k: number[] = [];
  const [ n1, n2 ] = bendo.cikloj;
  for ( let i = 0; i <= havepat6ni; i++ ) {
    const t = i / havepat6ni * Math.PI * 2;
    n2k.push(bendo.sago * ( Math.sin(t * n1 + bendo.fazo) * 0o6/0o10 + Math.sin(t * n2 + bendo.fazo * 0o17/0o10) * 0o4/0o10 ));
  }
  k.beginPath();
  k.moveTo(0, bendo.y + n2k[0]);
  for ( let i = 1; i <= havepat6ni; i++ ) k.lineTo(i * vepat6ni, bendo.y + n2k[i]);
  for ( let i = havepat6ni; i >= 0; i-- ) k.lineTo(i * vepat6ni, bendo.y + bendo.l6da + n2k[i]);
  k.closePath();
  k.fillStyle = weh2;
  k.fill();
}

export const kf2AsfanTrunkanCac2sex = sxovu((): THREE.CanvasTexture => {
  const w = asfaTrunkaW, h = asfaTrunkaH;
  return kf2P2t6zoCac2sex(w, h, ( k ) => {
    k.fillStyle = "#282038"; k.fillRect(0, 0, w, h);
    k2fWrapajnNubojn(k, w, h, 0o14,
      [ "rgba(72,64,88,0.20)", "rgba(16,8,24,0.18)", "rgba(88,80,104,0.14)" ],
      0o10/0o100, 0o14/0o100);
    const skizo = generiAsfanTrunkanSkizon();
    for ( const fibro of skizo.fibroj ) {
      const weh2 = fibro.tono < 0o5/0o10
        ? `rgba(96,88,112,${0o1/0o10 + Math.random() * 0o1/0o10})`
        : `rgba(16,8,24,${0o1/0o10 + Math.random() * 0o1/0o10})`;
      k2fWrapan(k, w, () => {
        k.strokeStyle = weh2;
        k.lineWidth = 1;
        k.lineCap = "round";
        k.beginPath();
        k.moveTo(fibro.x, 0);
        k.quadraticCurveTo(fibro.x + 0o2, h * 0o4/0o10, fibro.x - 0o2, h);
        k.stroke();
      });
    }
    for ( const bendo of skizo.bendoj ) {
      k2fAsfanBendon(k, bendo, "#181018");
      k2fAsfanBendon(k, { ...bendo, y: bendo.y + bendo.l6da }, "rgba(88,80,104,0.30)");
    }
    for ( const skvamo of skizo.skvamoj ) {
      const weh2 = skvamo.hela ? "rgba(104,96,128,0.16)" : "rgba(8,8,16,0.18)";
      k2fWrapan(k, w, () => {
        const l = skvamo.r * 0o6;
        k.strokeStyle = weh2;
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
      k2fWrapan(k, w, () => {
        k.fillStyle = "rgba(16,8,24,0.4)";
        k.beginPath(); k.arc(skvamo.x, skvamo.y, skvamo.r, 0, Math.PI * 2); k.fill();
      });
    }
  }, [ 1, 2 ]);
});
