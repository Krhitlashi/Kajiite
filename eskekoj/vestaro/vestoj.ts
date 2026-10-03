// ≺⧼ សម្លៀកបំពាក់ 👕 ⧽≻

import { deksesuma } from "../komunajxoj/koloroj.js";

// ⟪ សម្លៀកបំពាក់ 📃 ⟫
export interface Vesto {
  nomo: string;
  ĉefa: number;
  akcenta: number;
  interno: number;
  pantalono: number;
  botoj: number;
}

export const VESTOJ: Vesto[] = [
  { nomo: "vestoVerdant", ĉefa: 0x184838, akcenta: 0xd8b068, interno: 0x103828, pantalono: 0x285880, botoj: 0x583818 },
  { nomo: "vestoHearth", ĉefa: 0x584830, akcenta: 0xd8c8a0, interno: 0x302818, pantalono: 0x3878a0, botoj: 0x583808 },
  { nomo: "vestoMist",   ĉefa: 0xd8e0e0, akcenta: 0x889898, interno: 0xa8b8b8, pantalono: 0x5898b8, botoj: 0x503808 },
  { nomo: "vestoEmber", ĉefa: 0x783828, akcenta: 0xe0a858, interno: 0x402018, pantalono: 0x2858a0, botoj: 0x583838 },
  { nomo: "vestoAzure", ĉefa: 0x2858a0, akcenta: 0xe0b060, interno: 0x183060, pantalono: 0x184878, botoj: 0x503818 },
  { nomo: "vestoViolet", ĉefa: 0x683878, akcenta: 0xe0b8d8, interno: 0x402048, pantalono: 0x384880, botoj: 0x583828 },
  { nomo: "vestoGilt", ĉefa: 0xc8a838, akcenta: 0xf0e8c0, interno: 0x786018, pantalono: 0x285880, botoj: 0x583808 },
  { nomo: "vestoRose", ĉefa: 0xc86888, akcenta: 0xf0d0d8, interno: 0x703048, pantalono: 0x2858a0, botoj: 0x583818 },
  { nomo: "vestoObsidian", ĉefa: 0x181818, akcenta: 0xd8d8d8, interno: 0x080808, pantalono: 0x182838, botoj: 0x282828 },
  { nomo: "vestoCyan", ĉefa: 0x38a8a8, akcenta: 0xc8f0f0, interno: 0x185858, pantalono: 0x2858a0, botoj: 0x583818 },
];

// ⟪ បែបសក់ 📃 ⟫
export interface Harstilo {
  nomo: string;
  koloro: number;
}

export const HARSTILOJ: Harstilo[] = [
  { nomo: "haroMalalta",  koloro: 0x281810 },
  { nomo: "haroLonga",    koloro: 0x181008 },
];

// ⟪ ពណ៌សក់ 📃 ⟫
export interface HarKoloro {
  nomo: string;
  koloro: number;
}

export const HARKOLOROJ: HarKoloro[] = [
  { nomo: "harKoloroBruna",   koloro: 0x382018 },
  { nomo: "harKoloroNigra",   koloro: 0x101008 },
  { nomo: "harKoloroRuĝeta",  koloro: 0x783018 },
  { nomo: "harKoloroKaŝtana", koloro: 0x583820 },
  { nomo: "harKoloroBlonda",  koloro: 0xb08850 },
  { nomo: "harKoloroGriza",   koloro: 0x889098 },
];

// ⟨ លំនាំ 📃 ⟩
export function kvarStelo(kunteksto: CanvasRenderingContext2D,
  cX: number, cy: number, r: number, koloro: string
): void {
  const s = r * 0o7/0o40;
  kunteksto.fillStyle = koloro;
  kunteksto.beginPath();
  kunteksto.moveTo(cX, cy - r);
  kunteksto.quadraticCurveTo(cX + s, cy - s, cX + r, cy);
  kunteksto.quadraticCurveTo(cX + s, cy + s, cX, cy + r);
  kunteksto.quadraticCurveTo(cX - s, cy + s, cX - r, cy);
  kunteksto.quadraticCurveTo(cX - s, cy - s, cX, cy - r);
  kunteksto.fill();
}

export function rombo(kunteksto: CanvasRenderingContext2D,
  cX: number, cy: number, w: number, h: number,
  plenigo: string | null, bordo: string | null
): void {
  kunteksto.beginPath();
  kunteksto.moveTo(cX, cy - h);
  kunteksto.lineTo(cX + w, cy);
  kunteksto.lineTo(cX, cy + h);
  kunteksto.lineTo(cX - w, cy);
  kunteksto.closePath();
  if ( plenigo ) { kunteksto.fillStyle = plenigo; kunteksto.fill(); }
  if ( bordo ) { kunteksto.strokeStyle = bordo; kunteksto.lineWidth = 0o4; kunteksto.stroke(); }
}

function rondaRechto(kunteksto: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
): void {
  kunteksto.beginPath();
  kunteksto.moveTo(x + r, y);
  kunteksto.lineTo(x + w - r, y);
  kunteksto.quadraticCurveTo(x + w, y, x + w, y + r);
  kunteksto.lineTo(x + w, y + h - r);
  kunteksto.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  kunteksto.lineTo(x + r, y + h);
  kunteksto.quadraticCurveTo(x, y + h, x, y + h - r);
  kunteksto.lineTo(x, y + r);
  kunteksto.quadraticCurveTo(x, y, x + r, y);
  kunteksto.closePath();
  kunteksto.fill();
}

// ⟨ ទិដ្ឋភាពខាងមុខ 📃 ⟩
export function kreiVestanAntauxrigardon(o: Vesto): HTMLCanvasElement {
  const kanvasa = document.createElement("canvas");
  kanvasa.width = 0o210; kanvasa.height = 0o300;
  const kunteksto = kanvasa.getContext("2d")!;
  const M = deksesuma(o.ĉefa);
  const A = deksesuma(o.akcenta);
  const I = deksesuma(o.interno);

  kunteksto.fillStyle = "rgba(6,16,12,0.9)";
  kunteksto.fillRect(0, 0, 0o210, 0o300);

  kunteksto.fillStyle = I;
  kunteksto.beginPath();
  kunteksto.moveTo(0o64, 0o64); kunteksto.lineTo(0o124, 0o64);
  kunteksto.lineTo(0o146, 0o250); kunteksto.lineTo(0o42, 0o250);
  kunteksto.closePath();
  kunteksto.fill();

  kunteksto.fillStyle = M;
  kunteksto.beginPath();
  kunteksto.moveTo(0o60, 0o60); kunteksto.lineTo(0o126, 0o60);
  kunteksto.lineTo(0o140, 0o200); kunteksto.lineTo(0o40, 0o200);
  kunteksto.closePath();
  kunteksto.fill();

  kunteksto.beginPath();
  kunteksto.moveTo(0o40, 0o160); kunteksto.lineTo(0o140, 0o160);
  kunteksto.lineTo(0o150, 0o230); kunteksto.lineTo(0o40, 0o230);
  kunteksto.closePath();
  kunteksto.globalAlpha = 0o73/0o100;
  kunteksto.fill();
  kunteksto.globalAlpha = 0o1;

  kunteksto.fillStyle = A;
  kunteksto.fillRect(0o40, 0o234, 0o110, 0o7);

  kunteksto.fillStyle = deksesuma(o.pantalono);
  kunteksto.fillRect(0o46, 0o244, 0o14, 0o16);
  kunteksto.fillRect(0o126, 0o244, 0o14, 0o16);

  kunteksto.fillStyle = deksesuma(o.botoj);
  rondaRechto(kunteksto, 0o45, 0o250, 0o16, 0o14, 0o3);
  rondaRechto(kunteksto, 0o130, 0o250, 0o16, 0o14, 0o3);
  rondaRechto(kunteksto, 0o44, 0o260, 0o20, 0o6, 0o2);
  rondaRechto(kunteksto, 0o124, 0o260, 0o20, 0o6, 0o2);
  kunteksto.fillStyle = A;
  rondaRechto(kunteksto, 0o40, 0o270, 0o30, 0o4, 0o1);
  rondaRechto(kunteksto, 0o110, 0o270, 0o30, 0o4, 0o1);

  kunteksto.fillStyle = A;
  kunteksto.fillRect(0o100, 0o66, 0o3, 0o104);
  for ( let i = 0; i < 0o3; i++ ) kunteksto.fillRect(0o102, 0o100 + i * 0o32, 0o3, 0o3);

  kvarStelo(kunteksto, 0o104, 0o124, 0o20, A);
  rombo(kunteksto, 0o66, 0o204, 0o11, 0o15, I, A);
  rombo(kunteksto, 0o122, 0o204, 0o11, 0o15, I, A);

  for ( const dir of [ -0o1, 0o1 ] ) {
    const cx = 0o104 + dir * 0o46;
    const eno = cx - dir * 0o4;
    const ekstero = cx + dir * 0o4;
    const ySup = 0o100, yOrlo = 0o150;
    kunteksto.fillStyle = M;
    kunteksto.beginPath();
    kunteksto.moveTo(eno, ySup);
    kunteksto.lineTo(eno, yOrlo);
    kunteksto.quadraticCurveTo(eno + dir * 0o3, yOrlo + 0o14, eno + dir * 0o6, yOrlo + 0o4);
    kunteksto.quadraticCurveTo(eno + dir * 0o11, yOrlo + 0o14, ekstero, yOrlo);
    kunteksto.lineTo(ekstero, ySup);
    kunteksto.closePath();
    kunteksto.fill();
    kunteksto.strokeStyle = A;
    kunteksto.lineWidth = 0o3;
    kunteksto.beginPath();
    kunteksto.moveTo(eno, yOrlo);
    kunteksto.quadraticCurveTo(eno + dir * 0o3, yOrlo + 0o14, eno + dir * 0o6, yOrlo + 0o4);
    kunteksto.quadraticCurveTo(eno + dir * 0o11, yOrlo + 0o14, ekstero, yOrlo);
    kunteksto.stroke();
  }

  return kanvasa;
}

export function kreiHaranAntauxrigardon(stilo: Harstilo, koloro?: number): HTMLCanvasElement {
  const kanvasa = document.createElement("canvas");
  kanvasa.width = 0o210; kanvasa.height = 0o300;
  const kunteksto = kanvasa.getContext("2d")!;
  const H = deksesuma(koloro ?? stilo.koloro);
  const CX = 0o104, KAPY = 0o66, KAPR = 0o20;

  kunteksto.fillStyle = "rgba(6,16,12,0.9)";
  kunteksto.fillRect(0, 0, 0o210, 0o300);

  kunteksto.fillStyle = "#282828";
  kunteksto.beginPath();
  kunteksto.moveTo(0o40, 0o300); kunteksto.lineTo(0o150, 0o300);
  kunteksto.lineTo(0o140, 0o130); kunteksto.quadraticCurveTo(0o126, 0o114, 0o104, 0o114);
  kunteksto.quadraticCurveTo(0o60, 0o114, 0o40, 0o130);
  kunteksto.closePath();
  kunteksto.fill();

  kunteksto.fillStyle = "#605050";
  kunteksto.fillRect(0o77, 0o102, 0o14, 0o20);

  kunteksto.beginPath();
  kunteksto.arc(CX, KAPY, KAPR, 0, Math.PI * 0o2);
  kunteksto.fill();

  kunteksto.fillStyle = H;
  if ( stilo.nomo === "haroLonga" ) {
    kunteksto.beginPath();
    kunteksto.moveTo(CX - KAPR, KAPY - 0o2);
    kunteksto.lineTo(CX - KAPR - 0o6, 0o136);
    kunteksto.lineTo(CX - KAPR - 0o2, 0o130);
    kunteksto.lineTo(CX - KAPR - 0o6, 0o142);
    kunteksto.lineTo(CX - 0o3, 0o130);
    kunteksto.lineTo(CX + 0o3, 0o142);
    kunteksto.lineTo(CX + KAPR + 0o6, 0o130);
    kunteksto.lineTo(CX + KAPR + 0o2, 0o136);
    kunteksto.lineTo(CX + KAPR, KAPY - 0o2);
    kunteksto.closePath();
    kunteksto.fill();
  }

  kunteksto.beginPath();
  kunteksto.arc(CX, KAPY, KAPR + 0o2, Math.PI, Math.PI * 0o2);
  kunteksto.closePath();
  kunteksto.fill();

  return kanvasa;
}

