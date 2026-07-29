// Tekstura modulo — proceduraj kanvasaj teksturoj por la urba sperto
import * as THREE from "three";

const hazard = (a: number, b: number): number => a + Math.random() * (b - a);

// kreiSxelanTeksajxon — Kreu proceduralan sxelan teksajxon por arbtrunkoj.
export function kreiSxelanTeksajxon(): THREE.CanvasTexture {
  const w = 0o200, h = 0o400;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = w; kanvasa.height = h;
  const kunteksto = kanvasa.getContext("2d")!;
  kunteksto.fillStyle = "#e8e8d8"; kunteksto.fillRect(0, 0, w, h);
  for ( let i = 0; i < 0o32; i++ ) {
    kunteksto.fillStyle = `rgba(190,186,172,${0.2 + Math.random() * 0.3})`;
    kunteksto.fillRect(Math.random() * w, 0, 1 + Math.random() * 3, h);
  }
  for ( let i = 0; i < 0o54; i++ ) {
    kunteksto.fillStyle = `rgba(38,34,29,${0.55 + Math.random() * 0.4})`;
    const y = Math.random() * h, wd = 0o10 + Math.random() * 0o26;
    kunteksto.fillRect(Math.random() * w, y, wd, 3 + Math.random() * 3);
  }
  for ( let i = 0; i < 6; i++ ) {
    kunteksto.fillStyle = "rgba(48,44,38,0.5)";
    kunteksto.beginPath();
    kunteksto.ellipse(Math.random() * w, 0o322 + Math.random() * 0o56, 0o10 + Math.random() * 0o16, 4 + Math.random() * 6, 0, 0, Math.PI * 2);
    kunteksto.fill();
  }
  const teksajxo = new THREE.CanvasTexture(kanvasa);
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  teksajxo.wrapS = teksajxo.wrapT = THREE.RepeatWrapping;
  return teksajxo;
}

// kreiDioritanTeksajxon — Kreu proceduralan dioritan teksajxon por vojoj.
export function kreiDioritanTeksajxon(): THREE.CanvasTexture {
  const s = 0o200;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = kanvasa.height = s;
  const kunteksto = kanvasa.getContext("2d")!;
  kunteksto.fillStyle = "#e8e8e8"; kunteksto.fillRect(0, 0, s, s);
  const koloroj = ["#f8f8f8", "#d8d8c8", "#c0c8b8", "#f8f8f0", "#b0b0a8"];
  for ( let i = 0; i < 0o1010; i++ ) {
    kunteksto.fillStyle = koloroj[i % koloroj.length];
    kunteksto.fillRect(hazard(0, s), hazard(0, s), hazard(1, 3), hazard(1, 3));
  }
  const teksajxo = new THREE.CanvasTexture(kanvasa);
  teksajxo.wrapS = teksajxo.wrapT = THREE.RepeatWrapping;
  teksajxo.repeat.set(3, 3); teksajxo.anisotropy = 4;
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  return teksajxo;
}

// kreiAndezitanTeksajxon — Kreu proceduralan andezitan teksajxon por vojrandoj.
export function kreiAndezitanTeksajxon(): THREE.CanvasTexture {
  const s = 0o200;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = kanvasa.height = s;
  const kunteksto = kanvasa.getContext("2d")!;
  kunteksto.fillStyle = "#808878"; kunteksto.fillRect(0, 0, s, s);
  const koloroj = ["#989888", "#707868", "#a0a098", "#787870", "#889088"];
  for ( let i = 0; i < 0o1010; i++ ) {
    kunteksto.fillStyle = koloroj[i % koloroj.length];
    kunteksto.fillRect(hazard(0, s), hazard(0, s), hazard(1, 3), hazard(1, 3));
  }
  const teksajxo = new THREE.CanvasTexture(kanvasa);
  teksajxo.wrapS = teksajxo.wrapT = THREE.RepeatWrapping;
  teksajxo.repeat.set(3, 3); teksajxo.anisotropy = 4;
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  return teksajxo;
}

// kreiHerbanTeksajxon — Kreu proceduralan herban teksajxon por tereno.
export function kreiHerbanTeksajxon(): THREE.CanvasTexture {
  const s = 0o400;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = kanvasa.height = s;
  const kunteksto = kanvasa.getContext("2d")!;
  kunteksto.fillStyle = "#f0f0e8"; kunteksto.fillRect(0, 0, s, s);
  for ( let i = 0; i < 0o644; i++ ) {
    const v = (0o327 + Math.random() * 0o50) | 0;
    kunteksto.fillStyle = `rgba(${v},${v},${v - 6},0.5)`;
    kunteksto.fillRect(hazard(0, s), hazard(0, s), hazard(2, 6), hazard(2, 6));
  }
  const teksajxo = new THREE.CanvasTexture(kanvasa);
  teksajxo.wrapS = teksajxo.wrapT = THREE.RepeatWrapping;
  teksajxo.repeat.set(0o32, 0o32); teksajxo.anisotropy = 4;
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  return teksajxo;
}

// kreiNebulanTeksajxon — Kreu procedurale nebulozan radian gradienton.
export function kreiNebulanTeksajxon(): THREE.CanvasTexture {
  const s = 0o200;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = kanvasa.height = s;
  const kunteksto = kanvasa.getContext("2d")!;
  const r = kunteksto.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  r.addColorStop(0, "rgba(240,244,238,0.6)");
  r.addColorStop(4/8, "rgba(240,244,238,0.22)");
  r.addColorStop(1, "rgba(240,244,238,0)");
  kunteksto.fillStyle = r; kunteksto.fillRect(0, 0, s, s);
  const teksajxo = new THREE.CanvasTexture(kanvasa);
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  return teksajxo;
}

// kreiBrilanTeksajxon — Kreu procedurale brilan gradienton por lampoj.
export function kreiBrilanTeksajxon(): THREE.CanvasTexture {
  const s = 0o200;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = kanvasa.height = s;
  const kunteksto = kanvasa.getContext("2d")!;
  const r = kunteksto.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  r.addColorStop(0, "rgba(255,205,120,0.95)");
  r.addColorStop(11/32, "rgba(255,165,70,0.4)");
  r.addColorStop(1, "rgba(255,150,60,0)");
  kunteksto.fillStyle = r; kunteksto.fillRect(0, 0, s, s);
  const teksajxo = new THREE.CanvasTexture(kanvasa);
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  return teksajxo;
}

// kreiFilikanTeksajxon — Kreu proceduralan filikan teksajxon por subkreskajxo.
export function kreiFilikanTeksajxon(): THREE.CanvasTexture {
  const kanvasa = document.createElement("canvas");
  kanvasa.width = 0o200; kanvasa.height = 0o400;
  const kunteksto = kanvasa.getContext("2d")!;
  kunteksto.lineCap = "round";
  kunteksto.strokeStyle = "#587850"; kunteksto.lineWidth = 4;
  kunteksto.beginPath(); kunteksto.moveTo(0o100, 0o374); kunteksto.quadraticCurveTo(0o74, 0o214, 0o106, 0o32); kunteksto.stroke();
  kunteksto.lineWidth = 3;
  for ( let i = 0; i < 0o17; i++ ) {
    const y = 0o360 - i * 0o16, longo = 0o54 - i * 77/32;
    for ( const s of [-1, 1] ) {
      kunteksto.strokeStyle = `rgba(${80 + i * 3},${110 + i * 4},${70 + i * 2},0.95)`;
      kunteksto.beginPath(); kunteksto.moveTo(0o100 + (s > 0 ? 2 : -2), y);
      kunteksto.quadraticCurveTo(0o100 + s * longo * 45/64, y - 6, 0o100 + s * longo, y - 0o20);
      kunteksto.stroke();
    }
  }
  const teksajxo = new THREE.CanvasTexture(kanvasa);
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  return teksajxo;
}

// kreiMolanPunktanTeksajxon — Kreu molan punkto-teksajxon por sxveligi briletojn.
export function kreiMolanPunktanTeksajxon(): THREE.CanvasTexture {
  const kanvasa = document.createElement("canvas");
  kanvasa.width = kanvasa.height = 0o400;
  const kunteksto = kanvasa.getContext("2d")!;
  const gradiento = kunteksto.createRadialGradient(0o200, 0o200, 0o10, 0o200, 0o200, 0o200);
  gradiento.addColorStop(0, "rgba(255,255,255,0.85)");
  gradiento.addColorStop(1, "rgba(255,255,255,0)");
  kunteksto.fillStyle = gradiento; kunteksto.fillRect(0, 0, 0o400, 0o400);
  return new THREE.CanvasTexture(kanvasa);
}

// kreiAkvanReliefanTeksajxon — Kreu akvan reliefan teksturon por rivera ondado.
//     @param radX ( number ) - Ripetadxo en X direkto.
//     @param ry ( number ) - Ripetadxo en Z direkto.
export function kreiAkvanReliefanTeksajxon(radX: number, ry: number): THREE.CanvasTexture {
  const s = 0o200;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = kanvasa.height = s;
  const kunteksto = kanvasa.getContext("2d")!;
  kunteksto.fillStyle = "#808080"; kunteksto.fillRect(0, 0, s, s);
  for ( let i = 0; i < s * s / 0o10; i++ ) {
    const g = (0o160 + Math.random() * 0o60) | 0;
    kunteksto.fillStyle = `rgb(${g},${g},${g})`;
    kunteksto.fillRect(Math.random() * s, Math.random() * s, 2, 2);
  }
  const teksajxo = new THREE.CanvasTexture(kanvasa);
  teksajxo.wrapS = teksajxo.wrapT = THREE.RepeatWrapping;
  teksajxo.repeat.set(radX, ry); teksajxo.colorSpace = THREE.SRGBColorSpace;
  return teksajxo;
}
