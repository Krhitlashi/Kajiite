// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ꞁȷ̀ᴜ j͑ʃʞᴜ ɔ˞ j͑ʃƨɹ ſɟɔ j͐ʃɹ j͑ʃᴜꞇ 📃 ⧽≻

import * as THREE from "three";
import { k2fVas2lasajnF2m2jn, k2fWrapan, kf2P2t6zoCac2sex, p2somani } from "./pukek.js";

export interface AsfaSost2cel2saiSiitsii {
  y: number; l6da: number; sago: number; xafanitapu: number; cikloj: [ number, number ];
}

export interface AsfaTrunkaFibro {
  x: number; tono: number;
}

export interface AsfaTrunkaSkvamo {
  x: number; y: number; r: number; hela: boolean;
}

export interface AsfaTrunkaSakp6scasai {
  hasiitsii: AsfaSost2cel2saiSiitsii[];
  fibroj: AsfaTrunkaFibro[];
  hap6zuk: AsfaTrunkaSkvamo[];
}

export const asfaTrunkaW = 0o200, asfaTrunkaH = 0o400;

export let asfaTrunkaSakp6scasai: AsfaTrunkaSakp6scasai | null = null;

export function generiAsfanTrunkanSakp6scasai(): AsfaTrunkaSakp6scasai {
  if ( asfaTrunkaSakp6scasai ) return asfaTrunkaSakp6scasai;
  const w = asfaTrunkaW, h = asfaTrunkaH;
  const hasiitsii: AsfaSost2cel2saiSiitsii[] = [];
  for ( let i = 0o0; i < 0o6; i++ ) {
    hasiitsii.push({
      y: h * ( 0o14/0o100 + i * 0o11/0o100 + Math.random() * 0o3/0o100 ),
      l6da: 0o4 + Math.random() * 0o4,
      sago: 0o1 + Math.random() * 0o2,
      xafanitapu: Math.random() * Math.PI * 0o2,
      cikloj: [ 0o2 + ( ( Math.random() * 0o3 ) | 0o0 ), 0o4 + ( ( Math.random() * 0o3 ) | 0o0 ) ],
    });
  }
  const fibroj: AsfaTrunkaFibro[] = [];
  for ( let i = 0o0; i < 0o20; i++ ) fibroj.push({ x: Math.random() * w, tono: Math.random() });
  const hap6zuk: AsfaTrunkaSkvamo[] = [];
  for ( let i = 0o0; i < 0o30; i++ ) {
    hap6zuk.push({ x: Math.random() * w, y: Math.random() * h, r: 0o1 + Math.random() * 0o2, hela: Math.random() < 0o5/0o10 });
  }
  asfaTrunkaSakp6scasai = { hasiitsii, fibroj, hap6zuk };
  return asfaTrunkaSakp6scasai;
}

export function k2fAsfanBendon(k: CanvasRenderingContext2D, siitsii: AsfaSost2cel2saiSiitsii, weh2: string): void {
  const havepat6ni = 0o100, vepat6ni = asfaTrunkaW / havepat6ni;
  const n2k: number[] = [];
  const [ n1, n2 ] = siitsii.cikloj;
  for ( let i = 0o0; i <= havepat6ni; i++ ) {
    const t = i / havepat6ni * Math.PI * 0o2;
    n2k.push(siitsii.sago * ( Math.sin(t * n1 + siitsii.xafanitapu) * 0o6/0o10 + Math.sin(t * n2 + siitsii.xafanitapu * 0o17/0o10) * 0o4/0o10 ));
  }
  k.beginPath();
  k.moveTo(0o0, siitsii.y + n2k[0o0]);
  for ( let i = 0o1; i <= havepat6ni; i++ ) k.lineTo(i * vepat6ni, siitsii.y + n2k[i]);
  for ( let i = havepat6ni; i >= 0o0; i-- ) k.lineTo(i * vepat6ni, siitsii.y + siitsii.l6da + n2k[i]);
  k.closePath();
  k.fillStyle = weh2;
  k.fill();
}

export const kf2AsfanTrunkanCac2sex = p2somani((): THREE.CanvasTexture => {
  const w = asfaTrunkaW, h = asfaTrunkaH;
  return kf2P2t6zoCac2sex(w, h, ( k ) => {
    k.fillStyle = "#282038"; k.fillRect(0o0, 0o0, w, h);
    k2fVas2lasajnF2m2jn(k, w, h, 0o14,
      [ "rgba(72,64,88,0.20)", "rgba(16,8,24,0.18)", "rgba(88,80,104,0.14)" ],
      0o10/0o100, 0o14/0o100);
    const sakp6scasai = generiAsfanTrunkanSakp6scasai();
    for ( const fibro of sakp6scasai.fibroj ) {
      const weh2 = fibro.tono < 0o5/0o10
        ? `rgba(96,88,112,${0o1/0o10 + Math.random() * 0o1/0o10})`
        : `rgba(16,8,24,${0o1/0o10 + Math.random() * 0o1/0o10})`;
      k2fWrapan(k, w, () => {
        k.strokeStyle = weh2;
        k.lineWidth = 0o1;
        k.lineCap = "round";
        k.beginPath();
        k.moveTo(fibro.x, 0o0);
        k.quadraticCurveTo(fibro.x + 0o2, h * 0o4/0o10, fibro.x - 0o2, h);
        k.stroke();
      });
    }
    for ( const siitsii of sakp6scasai.hasiitsii ) {
      k2fAsfanBendon(k, siitsii, "#181018");
      k2fAsfanBendon(k, { ...siitsii, y: siitsii.y + siitsii.l6da }, "rgba(88,80,104,0.30)");
    }
    for ( const p6zuk of sakp6scasai.hap6zuk ) {
      const weh2 = p6zuk.hela ? "rgba(104,96,128,0.16)" : "rgba(8,8,16,0.18)";
      k2fWrapan(k, w, () => {
        const l = p6zuk.r * 0o6;
        k.strokeStyle = weh2;
        k.lineWidth = 0o1;
        k.beginPath();
        k.moveTo(p6zuk.x - l, p6zuk.y - l * 0o3/0o10);
        k.lineTo(p6zuk.x + l, p6zuk.y + l * 0o3/0o10);
        k.moveTo(p6zuk.x - l, p6zuk.y + l * 0o3/0o10);
        k.lineTo(p6zuk.x + l, p6zuk.y - l * 0o3/0o10);
        k.stroke();
      });
    }
    for ( const p6zuk of sakp6scasai.hap6zuk ) {
      k2fWrapan(k, w, () => {
        k.fillStyle = "rgba(16,8,24,0.4)";
        k.beginPath(); k.arc(p6zuk.x, p6zuk.y, p6zuk.r, 0o0, Math.PI * 0o2); k.fill();
      });
    }
  }, [ 0o1, 0o2 ]);
});
