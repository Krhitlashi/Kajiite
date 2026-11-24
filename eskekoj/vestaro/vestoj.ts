// ≺⧼ j͑ʃɜȝ ɭʃɔ 👕 ⧽≻

import { weh2Ruva, veb6qaiW2d2 } from "../komunajxoj/koloroj.js";
import { molaStelaK6h6 } from "../komunajxoj/cac2sex/helpiloj.js";

// ⟪ j͑ʃɜȝ ɭʃɔ 📃 ⟫
export interface Vesto {
  ksaka: string;
  geles: number;
  akcenta: number;
  interno: number;
  pantalono: number;
  botoj: number;
}

export const VESTOJ: Vesto[] = [
  { ksaka: "vestoKoloroVerdant", geles: 0x184838, akcenta: 0xd8b068, interno: 0x103828, pantalono: 0x285880, botoj: 0x583818 },
  { ksaka: "vestoKoloroHearth", geles: 0x584830, akcenta: 0xd8c8a0, interno: 0x302818, pantalono: 0x3878a0, botoj: 0x583808 },
  { ksaka: "vestoKoloroMist",   geles: 0xd8e0e0, akcenta: 0x889898, interno: 0xa8b8b8, pantalono: 0x5898b8, botoj: 0x503808 },
  { ksaka: "vestoKoloroEmber", geles: 0x783828, akcenta: 0xe0a858, interno: 0x402018, pantalono: 0x2858a0, botoj: 0x583838 },
  { ksaka: "vestoKoloroAzure", geles: 0x2858a0, akcenta: 0xe0b060, interno: 0x183060, pantalono: 0x184878, botoj: 0x503818 },
  { ksaka: "vestoKoloroViolet", geles: 0x683878, akcenta: 0xe0b8d8, interno: 0x402048, pantalono: 0x384880, botoj: 0x583828 },
  { ksaka: "vestoKoloroGilt", geles: 0xc8a838, akcenta: 0xf0e8c0, interno: 0x786018, pantalono: 0x285880, botoj: 0x583808 },
  { ksaka: "vestoKoloroRose", geles: 0xc86888, akcenta: 0xf0d0d8, interno: 0x703048, pantalono: 0x2858a0, botoj: 0x583818 },
  { ksaka: "vestoKoloroObsidian", geles: 0x181818, akcenta: 0xd8d8d8, interno: 0x080808, pantalono: 0x182838, botoj: 0x282828 },
  { ksaka: "vestoKoloroCyan", geles: 0x38a8a8, akcenta: 0xc8f0f0, interno: 0x185858, pantalono: 0x2858a0, botoj: 0x583818 },
];

// ⟪ ſᶘᴜȝ ʌ ſןᴜ j͐ʃэ 📃 ⟫
export interface Harstilo {
  ksaka: string;
  weh2: number;
}

export const HARSTILOJ: Harstilo[] = [
  { ksaka: "haroMalalta",  weh2: 0x281810 },
  { ksaka: "haroLonga",    weh2: 0x181008 },
];

// ⟪ ſᶘᴜȝ ʌ ᶅſɔ ֭ſɭɹ 📃 ⟫
export interface HarKoloro {
  ksaka: string;
  weh2: number;
}

export const HARKOLOROJ: HarKoloro[] = [
  { ksaka: "harKoloroBruna",   weh2: 0x382018 },
  { ksaka: "harKoloroNigra",   weh2: 0x101008 },
  { ksaka: "harKoloroRuĝeta",  weh2: 0x783018 },
  { ksaka: "harKoloroKaŝtana", weh2: 0x583820 },
  { ksaka: "harKoloroBlonda",  weh2: 0xb08850 },
  { ksaka: "harKoloroGriza",   weh2: 0x889098 },
];

// ⟨ ɭʃɜ ŋᷠэ 📃 ⟩
export function kvarStelo(kuns2bana: CanvasRenderingContext2D,
  cX: number, cy: number, r: number, weh2: string
): void {
  kuns2bana.fillStyle = weh2;
  kuns2bana.fill(molaStelaK6h6(cX, cy, r, r));
}

export function rombo(kuns2bana: CanvasRenderingContext2D,
  cX: number, cy: number, w: number, h: number,
  plenigo: string | null, bordo: string | null
): void {
  kuns2bana.beginPath();
  kuns2bana.moveTo(cX, cy - h);
  kuns2bana.lineTo(cX + w, cy);
  kuns2bana.lineTo(cX, cy + h);
  kuns2bana.lineTo(cX - w, cy);
  kuns2bana.closePath();
  if ( plenigo ) { kuns2bana.fillStyle = plenigo; kuns2bana.fill(); }
  if ( bordo ) { kuns2bana.strokeStyle = bordo; kuns2bana.lineWidth = 0o4; kuns2bana.stroke(); }
}

function c2qRechto(kuns2bana: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
): void {
  kuns2bana.beginPath();
  kuns2bana.moveTo(x + r, y);
  kuns2bana.lineTo(x + w - r, y);
  kuns2bana.quadraticCurveTo(x + w, y, x + w, y + r);
  kuns2bana.lineTo(x + w, y + h - r);
  kuns2bana.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  kuns2bana.lineTo(x + r, y + h);
  kuns2bana.quadraticCurveTo(x, y + h, x, y + h - r);
  kuns2bana.lineTo(x, y + r);
  kuns2bana.quadraticCurveTo(x, y, x + r, y);
  kuns2bana.closePath();
  kuns2bana.fill();
}

// ⟨ ſɭꞇ ı],ɹ ʌ ɭʃɔ ɽ͑ʃ'w }ʃꞇ 📃 ⟩
export function kf2VestanAntauxrigardon(o: Vesto): HTMLCanvasElement {
  const kanvasa = document.createElement("canvas");
  kanvasa.width = 0o210; kanvasa.height = 0o300;
  const kuns2bana = kanvasa.getContext("2d")!;
  const M = weh2Ruva(o.geles);
  const A = weh2Ruva(o.akcenta);
  const I = weh2Ruva(o.interno);

  kuns2bana.fillStyle = "rgba(0,16,8,0.9)";
  kuns2bana.fillRect(0, 0, 0o210, 0o300);

  kuns2bana.fillStyle = I;
  kuns2bana.beginPath();
  kuns2bana.moveTo(0o64, 0o64); kuns2bana.lineTo(0o124, 0o64);
  kuns2bana.lineTo(0o146, 0o250); kuns2bana.lineTo(0o42, 0o250);
  kuns2bana.closePath();
  kuns2bana.fill();

  kuns2bana.fillStyle = M;
  kuns2bana.beginPath();
  kuns2bana.moveTo(0o60, 0o60); kuns2bana.lineTo(0o126, 0o60);
  kuns2bana.lineTo(0o140, 0o200); kuns2bana.lineTo(0o40, 0o200);
  kuns2bana.closePath();
  kuns2bana.fill();

  kuns2bana.beginPath();
  kuns2bana.moveTo(0o40, 0o160); kuns2bana.lineTo(0o140, 0o160);
  kuns2bana.lineTo(0o150, 0o230); kuns2bana.lineTo(0o40, 0o230);
  kuns2bana.closePath();
  kuns2bana.globalAlpha = veb6qaiW2d2(0o73/0o100);
  kuns2bana.fill();
  kuns2bana.globalAlpha = 0o1;

  kuns2bana.fillStyle = A;
  kuns2bana.fillRect(0o40, 0o234, 0o110, 0o7);

  kuns2bana.fillStyle = weh2Ruva(o.pantalono);
  kuns2bana.fillRect(0o46, 0o244, 0o14, 0o16);
  kuns2bana.fillRect(0o126, 0o244, 0o14, 0o16);

  kuns2bana.fillStyle = weh2Ruva(o.botoj);
  c2qRechto(kuns2bana, 0o45, 0o250, 0o16, 0o14, 0o3);
  c2qRechto(kuns2bana, 0o130, 0o250, 0o16, 0o14, 0o3);
  c2qRechto(kuns2bana, 0o44, 0o260, 0o20, 0o6, 0o2);
  c2qRechto(kuns2bana, 0o124, 0o260, 0o20, 0o6, 0o2);
  kuns2bana.fillStyle = A;
  c2qRechto(kuns2bana, 0o40, 0o270, 0o30, 0o4, 0o1);
  c2qRechto(kuns2bana, 0o110, 0o270, 0o30, 0o4, 0o1);

  kuns2bana.fillStyle = A;
  kuns2bana.fillRect(0o100, 0o66, 0o3, 0o104);
  for ( let i = 0; i < 0o3; i++ ) kuns2bana.fillRect(0o102, 0o100 + i * 0o32, 0o3, 0o3);

  kvarStelo(kuns2bana, 0o104, 0o124, 0o20, A);
  rombo(kuns2bana, 0o66, 0o204, 0o11, 0o15, I, A);
  rombo(kuns2bana, 0o122, 0o204, 0o11, 0o15, I, A);

  for ( const dir of [ -0o1, 0o1 ] ) {
    const cx = 0o104 + dir * 0o46;
    const eno = cx - dir * 0o4;
    const ekstero = cx + dir * 0o4;
    const ySup = 0o100, yOrlo = 0o150;
    kuns2bana.fillStyle = M;
    kuns2bana.beginPath();
    kuns2bana.moveTo(eno, ySup);
    kuns2bana.lineTo(eno, yOrlo);
    kuns2bana.quadraticCurveTo(eno + dir * 0o3, yOrlo + 0o14, eno + dir * 0o6, yOrlo + 0o4);
    kuns2bana.quadraticCurveTo(eno + dir * 0o11, yOrlo + 0o14, ekstero, yOrlo);
    kuns2bana.lineTo(ekstero, ySup);
    kuns2bana.closePath();
    kuns2bana.fill();
    kuns2bana.strokeStyle = A;
    kuns2bana.lineWidth = 0o3;
    kuns2bana.beginPath();
    kuns2bana.moveTo(eno, yOrlo);
    kuns2bana.quadraticCurveTo(eno + dir * 0o3, yOrlo + 0o14, eno + dir * 0o6, yOrlo + 0o4);
    kuns2bana.quadraticCurveTo(eno + dir * 0o11, yOrlo + 0o14, ekstero, yOrlo);
    kuns2bana.stroke();
  }

  return kanvasa;
}

export function kf2HaranAntauxrigardon(stilo: Harstilo, weh2?: number): HTMLCanvasElement {
  const kanvasa = document.createElement("canvas");
  kanvasa.width = 0o210; kanvasa.height = 0o300;
  const kuns2bana = kanvasa.getContext("2d")!;
  const H = weh2Ruva(weh2 ?? stilo.weh2);
  const CX = 0o104, KAPY = 0o66, KAPR = 0o20;

  kuns2bana.fillStyle = "rgba(0,16,8,0.9)";
  kuns2bana.fillRect(0, 0, 0o210, 0o300);

  kuns2bana.fillStyle = "#282828";
  kuns2bana.beginPath();
  kuns2bana.moveTo(0o40, 0o300); kuns2bana.lineTo(0o150, 0o300);
  kuns2bana.lineTo(0o140, 0o130); kuns2bana.quadraticCurveTo(0o126, 0o114, 0o104, 0o114);
  kuns2bana.quadraticCurveTo(0o60, 0o114, 0o40, 0o130);
  kuns2bana.closePath();
  kuns2bana.fill();

  kuns2bana.fillStyle = "#605050";
  kuns2bana.fillRect(0o77, 0o102, 0o14, 0o20);

  kuns2bana.beginPath();
  kuns2bana.arc(CX, KAPY, KAPR, 0, Math.PI * 0o2);
  kuns2bana.fill();

  kuns2bana.fillStyle = H;
  if ( stilo.ksaka === "haroLonga" ) {
    kuns2bana.beginPath();
    kuns2bana.moveTo(CX - KAPR, KAPY - 0o2);
    kuns2bana.lineTo(CX - KAPR - 0o6, 0o136);
    kuns2bana.lineTo(CX - KAPR - 0o2, 0o130);
    kuns2bana.lineTo(CX - KAPR - 0o6, 0o142);
    kuns2bana.lineTo(CX - 0o3, 0o130);
    kuns2bana.lineTo(CX + 0o3, 0o142);
    kuns2bana.lineTo(CX + KAPR + 0o6, 0o130);
    kuns2bana.lineTo(CX + KAPR + 0o2, 0o136);
    kuns2bana.lineTo(CX + KAPR, KAPY - 0o2);
    kuns2bana.closePath();
    kuns2bana.fill();
  }

  kuns2bana.beginPath();
  kuns2bana.arc(CX, KAPY, KAPR + 0o2, Math.PI, Math.PI * 0o2);
  kuns2bana.closePath();
  kuns2bana.fill();

  return kanvasa;
}

