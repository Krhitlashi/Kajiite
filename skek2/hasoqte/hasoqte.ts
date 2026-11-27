// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ֭ſɭᴜ j͑ʃɜ ſ͕ɭƨɔ 📃 ⧽≻

import { weh2Ruva, veb6qaiW2d2 } from "../p6kpu/haweh2.js";
import { baz2SexiaK6h6 } from "../p6kpu/cac2sex/pukek.js";

export interface Soqte {
  ksaka: string;
  soqteWeh2: number;
  tokhaxesai: number;
  c2h2: number;
  nascete: number;
  pat6te: number;
}

export const HASOQTE: Soqte[] = [
  { ksaka: "soqteWeh2Lhant", soqteWeh2: 0x184838, tokhaxesai: 0xd8b068, c2h2: 0x103828, nascete: 0x285880, pat6te: 0x583818 },
  { ksaka: "soqteWeh2Hearth", soqteWeh2: 0x584830, tokhaxesai: 0xd8c8a0, c2h2: 0x302818, nascete: 0x3878a0, pat6te: 0x583808 },
  { ksaka: "soqteWeh2Mist",   soqteWeh2: 0xd8e0e0, tokhaxesai: 0x889898, c2h2: 0xa8b8b8, nascete: 0x5898b8, pat6te: 0x503808 },
  { ksaka: "soqteWeh2Ember", soqteWeh2: 0x783828, tokhaxesai: 0xe0a858, c2h2: 0x402018, nascete: 0x2858a0, pat6te: 0x583838 },
  { ksaka: "soqteWeh2Azure", soqteWeh2: 0x2858a0, tokhaxesai: 0xe0b060, c2h2: 0x183060, nascete: 0x184878, pat6te: 0x503818 },
  { ksaka: "soqteWeh2Violet", soqteWeh2: 0x683878, tokhaxesai: 0xe0b8d8, c2h2: 0x402048, nascete: 0x384880, pat6te: 0x583828 },
  { ksaka: "soqteWeh2Gilt", soqteWeh2: 0xc8a838, tokhaxesai: 0xf0e8c0, c2h2: 0x786018, nascete: 0x285880, pat6te: 0x583808 },
  { ksaka: "soqteWeh2Rose", soqteWeh2: 0xc86888, tokhaxesai: 0xf0d0d8, c2h2: 0x703048, nascete: 0x2858a0, pat6te: 0x583818 },
  { ksaka: "soqteWeh2Obsidian", soqteWeh2: 0x181818, tokhaxesai: 0xd8d8d8, c2h2: 0x080808, nascete: 0x182838, pat6te: 0x282828 },
  { ksaka: "soqteWeh2Cyan", soqteWeh2: 0x38a8a8, tokhaxesai: 0xc8f0f0, c2h2: 0x185858, nascete: 0x2858a0, pat6te: 0x583818 },
];

export interface TsaqHaxe {
  ksaka: string;
  weh2: number;
}

export const HATSAQHAXE: TsaqHaxe[] = [
  { ksaka: "tsaqPsazai",  weh2: 0x281810 },
  { ksaka: "tsaqSahakani",    weh2: 0x181008 },
];

// ⟪ ſᶘᴜȝ ʌ ᶅſɔ ֭ſɭɹ 📃 ⟫
export interface TsaqWeh2 {
  ksaka: string;
  weh2: number;
}

export const TSAQWEH2J: TsaqWeh2[] = [
  { ksaka: "harWeh2Bruna",   weh2: 0x382018 },
  { ksaka: "harWeh2Hunasai",   weh2: 0x101008 },
  { ksaka: "harWeh2Ruĝeta",  weh2: 0x783018 },
  { ksaka: "harWeh2Kaŝtana", weh2: 0x583820 },
  { ksaka: "harWeh2Blonda",  weh2: 0xb08850 },
  { ksaka: "harWeh2Griza",   weh2: 0x889098 },
];

// ⟨ ɭʃɜ ŋᷠэ 📃 ⟩
export function ausexi(kuns2bana: CanvasRenderingContext2D,
  cX: number, cy: number, r: number, weh2: string
): void {
  kuns2bana.fillStyle = weh2;
  kuns2bana.fill(baz2SexiaK6h6(cX, cy, r, r));
}

export function b2tbehagasai(kuns2bana: CanvasRenderingContext2D,
  cX: number, cy: number, w: number, h: number,
  vetem2: string | null, catu5ek: string | null
): void {
  kuns2bana.beginPath();
  kuns2bana.moveTo(cX, cy - h);
  kuns2bana.lineTo(cX + w, cy);
  kuns2bana.lineTo(cX, cy + h);
  kuns2bana.lineTo(cX - w, cy);
  kuns2bana.closePath();
  if ( vetem2 ) { kuns2bana.fillStyle = vetem2; kuns2bana.fill(); }
  if ( catu5ek ) { kuns2bana.strokeStyle = catu5ek; kuns2bana.lineWidth = 0o4; kuns2bana.stroke(); }
}

function c2qKen2q(kuns2bana: CanvasRenderingContext2D,
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

export function kf2SoqteKix2(o: Soqte): HTMLCanvasElement {
  const p2t6zo = document.createElement("canvas");
  p2t6zo.width = 0o210; p2t6zo.height = 0o300;
  const kuns2bana = p2t6zo.getContext("2d")!;
  const M = weh2Ruva(o.soqteWeh2);
  const A = weh2Ruva(o.tokhaxesai);
  const I = weh2Ruva(o.c2h2);

  kuns2bana.fillStyle = "rgba(0,16,8,0.9)";
  kuns2bana.fillRect(0o0, 0o0, 0o210, 0o300);

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

  kuns2bana.fillStyle = weh2Ruva(o.nascete);
  kuns2bana.fillRect(0o46, 0o244, 0o14, 0o16);
  kuns2bana.fillRect(0o126, 0o244, 0o14, 0o16);

  kuns2bana.fillStyle = weh2Ruva(o.pat6te);
  c2qKen2q(kuns2bana, 0o45, 0o250, 0o16, 0o14, 0o3);
  c2qKen2q(kuns2bana, 0o130, 0o250, 0o16, 0o14, 0o3);
  c2qKen2q(kuns2bana, 0o44, 0o260, 0o20, 0o6, 0o2);
  c2qKen2q(kuns2bana, 0o124, 0o260, 0o20, 0o6, 0o2);
  kuns2bana.fillStyle = A;
  c2qKen2q(kuns2bana, 0o40, 0o270, 0o30, 0o4, 0o1);
  c2qKen2q(kuns2bana, 0o110, 0o270, 0o30, 0o4, 0o1);

  kuns2bana.fillStyle = A;
  kuns2bana.fillRect(0o100, 0o66, 0o3, 0o104);
  for ( let i = 0o0; i < 0o3; i++ ) kuns2bana.fillRect(0o102, 0o100 + i * 0o32, 0o3, 0o3);

  ausexi(kuns2bana, 0o104, 0o124, 0o20, A);
  b2tbehagasai(kuns2bana, 0o66, 0o204, 0o11, 0o15, I, A);
  b2tbehagasai(kuns2bana, 0o122, 0o204, 0o11, 0o15, I, A);

  for ( const c2w2q of [ -0o1, 0o1 ] ) {
    const cx = 0o104 + c2w2q * 0o46;
    const c2h2 = cx - c2w2q * 0o4;
    const p6sca = cx + c2w2q * 0o4;
    const teruY = 0o100, p6scaY = 0o150;
    kuns2bana.fillStyle = M;
    kuns2bana.beginPath();
    kuns2bana.moveTo(c2h2, teruY);
    kuns2bana.lineTo(c2h2, p6scaY);
    kuns2bana.quadraticCurveTo(c2h2 + c2w2q * 0o3, p6scaY + 0o14, c2h2 + c2w2q * 0o6, p6scaY + 0o4);
    kuns2bana.quadraticCurveTo(c2h2 + c2w2q * 0o11, p6scaY + 0o14, p6sca, p6scaY);
    kuns2bana.lineTo(p6sca, teruY);
    kuns2bana.closePath();
    kuns2bana.fill();
    kuns2bana.strokeStyle = A;
    kuns2bana.lineWidth = 0o3;
    kuns2bana.beginPath();
    kuns2bana.moveTo(c2h2, p6scaY);
    kuns2bana.quadraticCurveTo(c2h2 + c2w2q * 0o3, p6scaY + 0o14, c2h2 + c2w2q * 0o6, p6scaY + 0o4);
    kuns2bana.quadraticCurveTo(c2h2 + c2w2q * 0o11, p6scaY + 0o14, p6sca, p6scaY);
    kuns2bana.stroke();
  }

  return p2t6zo;
}

export function kf2TsaqKix2(haxe: TsaqHaxe, weh2?: number): HTMLCanvasElement {
  const p2t6zo = document.createElement("canvas");
  p2t6zo.width = 0o210; p2t6zo.height = 0o300;
  const kuns2bana = p2t6zo.getContext("2d")!;
  const H = weh2Ruva(weh2 ?? haxe.weh2);
  const tozaX = 0o104, wopoY = 0o66, wopoR = 0o20;

  kuns2bana.fillStyle = "rgba(0,16,8,0.9)";
  kuns2bana.fillRect(0o0, 0o0, 0o210, 0o300);

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
  kuns2bana.arc(tozaX, wopoY, wopoR, 0o0, Math.PI * 0o2);
  kuns2bana.fill();

  kuns2bana.fillStyle = H;
  if ( haxe.ksaka === "tsaqSahakani" ) {
    kuns2bana.beginPath();
    kuns2bana.moveTo(tozaX - wopoR, wopoY - 0o2);
    kuns2bana.lineTo(tozaX - wopoR - 0o6, 0o136);
    kuns2bana.lineTo(tozaX - wopoR - 0o2, 0o130);
    kuns2bana.lineTo(tozaX - wopoR - 0o6, 0o142);
    kuns2bana.lineTo(tozaX - 0o3, 0o130);
    kuns2bana.lineTo(tozaX + 0o3, 0o142);
    kuns2bana.lineTo(tozaX + wopoR + 0o6, 0o130);
    kuns2bana.lineTo(tozaX + wopoR + 0o2, 0o136);
    kuns2bana.lineTo(tozaX + wopoR, wopoY - 0o2);
    kuns2bana.closePath();
    kuns2bana.fill();
  }

  kuns2bana.beginPath();
  kuns2bana.arc(tozaX, wopoY, wopoR + 0o2, Math.PI, Math.PI * 0o2);
  kuns2bana.closePath();
  kuns2bana.fill();

  return p2t6zo;
}

