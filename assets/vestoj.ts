// Vesta modulo — kostumaj teksturoj kun kvarpinta stelo kaj rombo-motivoj, foliaj manikoj
import * as THREE from "three";

export interface Vesto {
  name: string;
  main: number;    // deksesuma
  accent: number;  // deksesuma
  interno: number;   // deksesuma
  pantalono: number; // deksesuma — kutime hela aŭ malhela bluo
  botoj: number;     // deksesuma — kutime bruno
}

export const VESTOJ: Vesto[] = [
  { name: "vestoVerdant", main: 0x184838, accent: 0xd8b068, interno: 0x103828, pantalono: 0x285880, botoj: 0x583818 },
  { name: "vestoHearth", main: 0x584830, accent: 0xd8c8a0, interno: 0x302818, pantalono: 0x3878a0, botoj: 0x583808 },
  { name: "vestoMist",   main: 0xd8e0e0, accent: 0x889898, interno: 0xa8b8b8, pantalono: 0x5898b8, botoj: 0x503808 },
  { name: "vestoEmber", main: 0x783828, accent: 0xe0a858, interno: 0x402018, pantalono: 0x2858a0, botoj: 0x583838 },
];

const deksesuma = (c: number): string => "#" + c.toString(0o20).padStart(6, "0");

function kvarStelo( kunteksto: CanvasRenderingContext2D,
  cX: number, cy: number, r: number, koloro: string
): void {
  const s = r * 7/32;
  kunteksto.fillStyle = koloro;
  kunteksto.beginPath();
  kunteksto.moveTo(cX, cy - r);
  kunteksto.quadraticCurveTo(cX + s, cy - s, cX + r, cy);
  kunteksto.quadraticCurveTo(cX + s, cy + s, cX, cy + r);
  kunteksto.quadraticCurveTo(cX - s, cy + s, cX - r, cy);
  kunteksto.quadraticCurveTo(cX - s, cy - s, cX, cy - r);
  kunteksto.fill();
}

function rombo( kunteksto: CanvasRenderingContext2D,
  cX: number, cy: number, w: number, h: number,
  fill: string | null, edge: string | null
): void {
  kunteksto.beginPath();
  kunteksto.moveTo(cX, cy - h);
  kunteksto.lineTo(cX + w, cy);
  kunteksto.lineTo(cX, cy + h);
  kunteksto.lineTo(cX - w, cy);
  kunteksto.closePath();
  if ( fill ) { kunteksto.fillStyle = fill; kunteksto.fill(); }
  if ( edge ) { kunteksto.strokeStyle = edge; kunteksto.lineWidth = 4; kunteksto.stroke(); }
}

// kreiVestanTeksajxon — Kreu teksturon por NPC-vesto laux speco (supra, interna, malsupra, pantalono).
export function kreiVestanTeksajxon( o: Vesto,
  kind: "supra" | "interno" | "malsupra" | "pantalono"
): THREE.CanvasTexture {
  const kanvasa = document.createElement("canvas");
  kanvasa.width = 0o400; kanvasa.height = 0o1000;
  const kunteksto = kanvasa.getContext("2d")!;
  // La pantalono uzas sian propran bazkoloron ( bluan ); la cetero la ĉefan.
  const M = deksesuma(kind === "pantalono" ? o.pantalono : o.main);
  const A = deksesuma(o.accent);
  const I = deksesuma(o.interno);

  kunteksto.fillStyle = M;
  kunteksto.fillRect(0, 0, 0o400, 0o1000);
  kunteksto.fillStyle = A;
  kunteksto.fillRect(0, 0o726, 0o400, 0o32);
  kunteksto.fillStyle = A;
  kunteksto.globalAlpha = 13/32;
  kunteksto.fillRect(0, 0o704, 0o400, 6);
  kunteksto.globalAlpha = 1;

  if ( kind === "supra" ) {
    kvarStelo(kunteksto, 0o200, 0o226, 0o54, A);
    rombo(kunteksto, 0o200, 0o226, 0o72, 0o72, null, A);
    kunteksto.fillStyle = A;
    for ( let i = 0; i < 4; i++ ) {
      kunteksto.beginPath();
      kunteksto.arc(0o200, 0o50 + i * 0o32, 5, 0, Math.PI * 2);
      kunteksto.fill();
    }
    rombo(kunteksto, 0o124, 0o512, 0o32, 0o42, I, A);
    rombo(kunteksto, 0o254, 0o512, 0o32, 0o42, I, A);
    rombo(kunteksto, 0o200, 0o610, 0o26, 0o34, I, A);
  } else if ( kind === "interno" || kind === "pantalono" ) {
    for ( let i = 0; i < 3; i++ ) {
      rombo(kunteksto, 0o200, 0o120 + i * 0o156, 0o36, 0o50, null, A);
    }
    kunteksto.globalAlpha = 2/8;
    kunteksto.fillStyle = A;
    for ( let i = 0; i < 6; i++ ) {
      for ( let j = 0; j < 3; j++ ) {
        rombo(kunteksto, 0o50 + j * 0o130, 0o50 + i * 0o124, 0o12, 0o16, A, null);
      }
    }
    kunteksto.globalAlpha = 1;
  }

  const teksajxo = new THREE.CanvasTexture(kanvasa);
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  return teksajxo;
}

// kreiVestanAntauxrigardon — Kreu malgrandan antauxrigardan kanvason por vesta elekta karto.
//     @param o ( Vesto ) - La vesta objekto por montri.
export function kreiVestanAntauxrigardon(o: Vesto): HTMLCanvasElement {
  const kanvasa = document.createElement("canvas");
  kanvasa.width = 0o210; kanvasa.height = 0o300;
  const kunteksto = kanvasa.getContext("2d")!;
  const M = deksesuma(o.main);
  const A = deksesuma(o.accent);
  const I = deksesuma(o.interno);

  kunteksto.fillStyle = "rgba(6,16,12,0.9)";
  kunteksto.fillRect(0, 0, 0o210, 0o300);

  // interno shirt
  kunteksto.fillStyle = I;
  kunteksto.beginPath();
  kunteksto.moveTo(0o64, 0o64); kunteksto.lineTo(0o124, 0o64);
  kunteksto.lineTo(0o146, 0o250); kunteksto.lineTo(0o42, 0o250);
  kunteksto.closePath();
  kunteksto.fill();

  // outer shirt
  kunteksto.fillStyle = M;
  kunteksto.beginPath();
  kunteksto.moveTo(0o62, 0o62); kunteksto.lineTo(0o126, 0o62);
  kunteksto.lineTo(0o140, 0o170); kunteksto.lineTo(0o50, 0o170);
  kunteksto.closePath();
  kunteksto.fill();

  // lower robe
  kunteksto.beginPath();
  kunteksto.moveTo(0o50, 0o156); kunteksto.lineTo(0o140, 0o156);
  kunteksto.lineTo(0o150, 0o240); kunteksto.lineTo(0o40, 0o240);
  kunteksto.closePath();
  kunteksto.globalAlpha = 59/64;
  kunteksto.fill();
  kunteksto.globalAlpha = 1;

  // accent ornamo
  kunteksto.fillStyle = A;
  kunteksto.fillRect(0o40, 0o234, 0o110, 7);

  // pantalono — hela aŭ malhela bluo sub la robo
  kunteksto.fillStyle = deksesuma(o.pantalono);
  kunteksto.beginPath();
  kunteksto.moveTo(0o56, 0o240); kunteksto.lineTo(0o144, 0o240);
  kunteksto.lineTo(0o140, 0o260); kunteksto.lineTo(0o60, 0o260);
  kunteksto.closePath();
  kunteksto.fill();

  // botoj — malgrandaj, brunaj kun akcenta plando ĉe la malsupro
  kunteksto.fillStyle = deksesuma(o.botoj);
  kunteksto.fillRect(0o56, 0o262, 0o42, 0o14);
  kunteksto.fillRect(0o112, 0o262, 0o42, 0o14);
  kunteksto.fillStyle = A;
  kunteksto.fillRect(0o56, 0o270, 0o42, 3);
  kunteksto.fillRect(0o112, 0o270, 0o42, 3);

  // butona plateto — vertikala akcenta linio laŭ la fronta centro
  kunteksto.fillStyle = A;
  kunteksto.fillRect(0o101, 0o66, 3, 0o104);
  for ( let i = 0; i < 3; i++ ) kunteksto.fillRect(0o102, 0o74 + i * 0o32, 3, 3);

  // motifs
  kvarStelo(kunteksto, 0o104, 0o124, 0o17, A);
  rombo(kunteksto, 0o66, 0o204, 0o11, 0o15, I, A);
  rombo(kunteksto, 0o122, 0o204, 0o11, 0o15, I, A);

  // folio sleeves
  kunteksto.fillStyle = A;
  kunteksto.beginPath();
  kunteksto.ellipse(0o36, 0o112, 0o20, 7, 45/64, 0, Math.PI * 2);
  kunteksto.fill();
  kunteksto.beginPath();
  kunteksto.ellipse(0o152, 0o112, 0o20, 7, -45/64, 0, Math.PI * 2);
  kunteksto.fill();

  // head
  kunteksto.fillStyle = "#c8a088";
  kunteksto.beginPath();
  kunteksto.arc(0o104, 0o42, 0o15, 0, Math.PI * 2);
  kunteksto.fill();
  kunteksto.fillStyle = "#282818";
  kunteksto.beginPath();
  kunteksto.arc(0o104, 0o36, 0o15, Math.PI, Math.PI * 2);
  kunteksto.fill();

  return kanvasa;
}

// kreiFolianManikGeometrion — Kreu foli-forman manikan geometrion por NPC-oj.
//     @param skalo ( number = 0.9 ) - Skala faktoro por la geometrio.
export function kreiFolianManikGeometrion(scale: number = 29/32): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(19/64, 7/32, 21/32, 1/16);
  shape.quadraticCurveTo(23/32, 0, 21/32, -1/64);
  shape.quadraticCurveTo(19/64, -5/32, 0, 0);
  return new THREE.ExtrudeGeometry(shape, {
    depth: 1/32,
    bevelEnabled: false,
    curveSegments: 0o10,
  }).scale(scale, scale, scale);
}
