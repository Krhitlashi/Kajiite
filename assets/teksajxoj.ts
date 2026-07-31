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
    for ( const s of [ -1, 1 ] ) {
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

// kreiPurpuranFilikanTeksajxon — Kreu purpurajn pinajn filikojn kiel en Four Groves.
export function kreiPurpuranFilikanTeksajxon( densa: boolean = false ): THREE.CanvasTexture {
  const kanvasa = document.createElement("canvas");
  const s = 0o400;
  kanvasa.width = kanvasa.height = s;
  const kunteksto = kanvasa.getContext("2d")!;
  const paletro = densa
    ? { tigo: "#3a2050", a: "#a05ac0", b: "#c07ae0" }
    : { tigo: "#4a2a5e", a: "#7a4ab0", b: "#9a6ad0" };

  kunteksto.clearRect(0, 0, s, s);
  kunteksto.strokeStyle = paletro.tigo;
  kunteksto.lineWidth = densa ? 0o5 : 0o4;
  kunteksto.lineCap = "round";
  kunteksto.beginPath();
  kunteksto.moveTo(s / 2, s - 4/8);
  kunteksto.quadraticCurveTo(s / 2 + (densa ? 0o14 : 0), s * 4/8, s / 2 + (densa ? 0o24 : 0), 4/8);
  kunteksto.stroke();

  const nombro = densa ? 0o42 : 0o32;
  const maksimumaLongo = densa ? 0o112 : 0o130;
  for ( let i = 0; i < nombro; i++ ) {
    const t = i / (nombro - 1);
    const y = s - 8/8 - t * 0o340;
    const x = s / 2 + (densa ? 0o24 : 0) * t * t;
    const envolva = ( 22/64 + 42/64 * Math.min(0o1, t * 4/8) ) * Math.pow(1 - t, 54/64 );
    const longo = maksimumaLongo * envolva + 0o6;
    const largho = longo * 10/64 + 0o2;
    const kurbo = 27/64 + t * 6/8;
    const koloro = i % 2 ? paletro.a : paletro.b;

    for ( const flanko of [ -1, 1 ] ) {
      const angulo = flanko > 0 ? -kurbo : Math.PI + kurbo;
      const finoX = x + Math.cos(angulo) * longo;
      const finoY = y + Math.sin(angulo) * longo;
      const cos = Math.cos(angulo), sin = Math.sin(angulo);
      kunteksto.fillStyle = koloro;
      kunteksto.beginPath();
      kunteksto.moveTo(x, y);
      kunteksto.quadraticCurveTo(x + cos * longo * 4/8 - sin * largho, y + sin * longo * 4/8 + cos * largho, finoX, finoY);
      kunteksto.quadraticCurveTo(x + cos * longo * 4/8 + sin * largho, y + sin * longo * 4/8 - cos * largho, x, y);
      kunteksto.fill();
    }
  }

  const teksajxo = new THREE.CanvasTexture(kanvasa);
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  return teksajxo;
}

// kreiHerbErinanTeksajxon — Kreu proceduralan herberan teksajxon por herbo.
export function kreiHerbErinanTeksajxon(): THREE.CanvasTexture {
  const s = 0o200;
  const kanvasa = document.createElement( "canvas" );
  kanvasa.width = s; kanvasa.height = s;
  const kunteksto = kanvasa.getContext( "2d" )!;
  kunteksto.clearRect( 0, 0, s, s );
  // Verda klingo kontraux travidebla fono
  const gradiento = kunteksto.createRadialGradient( s / 2, s * 0.85, 0, s / 2, s * 0.85, s * 0.55 );
  gradiento.addColorStop( 0, "rgba(100,140,70,0.95)" );
  gradiento.addColorStop( 4/8, "rgba(130,170,90,0.75)" );
  gradiento.addColorStop( 1, "rgba(160,200,110,0)" );
  kunteksto.fillStyle = gradiento;
  kunteksto.fillRect( 0, 0, s, s );
  // Centra vejno
  kunteksto.strokeStyle = "rgba(80,120,50,0.6)";
  kunteksto.lineWidth = 2;
  kunteksto.beginPath();
  kunteksto.moveTo( s / 2, s * 0.92 );
  kunteksto.quadraticCurveTo( s / 2, s * 0.4, s / 2, s * 0.08 );
  kunteksto.stroke();
  const teksajxo = new THREE.CanvasTexture( kanvasa );
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  return teksajxo;
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
