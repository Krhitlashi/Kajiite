// ≺⧼ ֭ſɭᴜ j͑ʃɜ ſ͕ɭƨɔ 👕 ⧽≻

import { weh2Ruva } from "../p6kpu/haweh2.js";
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

export function vefalSoqte( idx: number ): Soqte {
  return HASOQTE[idx % HASOQTE.length] || HASOQTE[0o0];
}

export function vefalTsaqHaxe( idx: number ): TsaqHaxe {
  return HATSAQHAXE[idx % HATSAQHAXE.length] || HATSAQHAXE[0o0];
}

export function vefalTsaqWeh2( idx: number ): TsaqWeh2 {
  return TSAQWEH2J[idx] || TSAQWEH2J[0o0];
}

export function ausexi(kuns2bana: CanvasRenderingContext2D,
  cX: number, cy: number, r: number, weh2: string
): void {
  kuns2bana.fillStyle = weh2;
  kuns2bana.fill(baz2SexiaK6h6(cX, cy, r, r));
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

