// ≺⧼ វាយនភាពសំបកប៊ឺច 🌳 ⧽≻
import * as THREE from "three";
import { desegniWrapajnNubojn, desegniWrapan, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const sxelaW = 0o400, sxelaH = 0o3000;

export interface BetulaLenticelo {
  x: number; y: number; longo: number; dikeco: number; kurbo: number; angulo: number;
}

export interface BetulaStrio {
  x: number; y: number; longo: number; ondo: number; dikeco: number;
}

export interface BetulaSxeligho {
  y: number; alto: number; sago: number; kurbaAlto: number;
  cikloj: [ number, number ]; fazo: number; malhelo: number;
}

export interface BetulaCikatro {
  x: number; y: number; r: number; angulo: number; radiaj: number[];
}

export interface BetulaSkizo {
  lenticeloj: BetulaLenticelo[];
  strioj: BetulaStrio[];
  helajStrioj: BetulaStrio[];
  horizontajoj: BetulaStrio[];
  sxelighoj: BetulaSxeligho[];
  cikatroj: BetulaCikatro[];
}

export let betulaSkizo: BetulaSkizo | null = null;

export function generiBetulanSkizon(): BetulaSkizo {
  if ( betulaSkizo ) return betulaSkizo;
  const lenticeloj: BetulaLenticelo[] = [];
  const aroj = 0o70;
  for ( let a = 0; a < aroj; a++ ) {
    const ax = Math.random() * sxelaW, ay = Math.random() * sxelaH;
    const kresko = 0o7/0o10 + ( ay / sxelaH ) * 0o6/0o10;
    const nombro = 0o4 + ( ( Math.random() * 0o7 ) | 0 );
    for ( let i = 0; i < nombro; i++ ) {
      const y = Math.min(Math.max(ay + ( Math.random() - 0o4/0o10 ) * 0o24, 0), sxelaH);
      lenticeloj.push({
        x: ax + ( Math.random() - 0o4/0o10 ) * 0o24,
        y,
        longo: ( 0o2 + Math.random() * 0o5 ) * kresko,
        dikeco: 0o1 + Math.random() * 0o1 + y / sxelaH * 0o1/0o2,
        kurbo: ( Math.random() - 0o4/0o10 ) * 0o2,
        angulo: ( Math.random() - 0o4/0o10 ) * 0o2/0o10,
      });
    }
  }
  const strioj: BetulaStrio[] = [];
  for ( let i = 0; i < 0o30; i++ ) {
    strioj.push({
      x: Math.random() * sxelaW,
      y: Math.random() * sxelaH,
      longo: 0o300 + Math.random() * 0o600,
      ondo: ( Math.random() - 0o5/0o10 ) * 0o10,
      dikeco: 1 + Math.random() * 0o2,
    });
  }
  const helajStrioj: BetulaStrio[] = [];
  for ( let i = 0; i < 0o14; i++ ) {
    helajStrioj.push({
      x: Math.random() * sxelaW,
      y: Math.random() * sxelaH,
      longo: 0o400 + Math.random() * 0o1000,
      ondo: ( Math.random() - 0o5/0o10 ) * 0o20,
      dikeco: 1 + Math.random() * 0o2,
    });
  }
  const horizontajoj: BetulaStrio[] = [];
  for ( let i = 0; i < 0o200; i++ ) {
    horizontajoj.push({
      x: Math.random() * sxelaW,
      y: Math.random() * sxelaH,
      longo: 0o40 + Math.random() * 0o110,
      ondo: ( Math.random() - 0o4/0o10 ) * 0o5,
      dikeco: 1,
    });
  }
  const sxelighoj: BetulaSxeligho[] = [];
  for ( let i = 0; i < 0o4; i++ ) {
    const y0 = sxelaH * ( 1 - Math.pow(Math.random(), 0o3/0o2) );
    const maljuneco = y0 / sxelaH;
    const alto = ( 0o20 + Math.random() * 0o40 ) * ( 0o7/0o10 + maljuneco * 0o5/0o10 );
    sxelighoj.push({
      y: Math.min(y0, sxelaH - alto - 0o30),
      alto,
      sago: 0o11 + Math.random() * 0o14,
      kurbaAlto: 0o14 + Math.random() * 0o10,
      cikloj: [ 0o3 + ( ( Math.random() * 0o3 ) | 0 ), 0o4 + ( ( Math.random() * 0o4 ) | 0 ) ],
      fazo: Math.random() * Math.PI * 2,
      malhelo: 0o35/0o100 + maljuneco * 0o25/0o100,
    });
  }
  const cikatroj: BetulaCikatro[] = [];
  for ( let i = 0; i < 0o24; i++ ) {
    const radiaj: number[] = [];
    for ( let v = 0; v < 0o6; v++ ) radiaj.push(0o7/0o10 + Math.random() * 0o6/0o10);
    cikatroj.push({
      x: Math.random() * sxelaW,
      y: sxelaH * ( 0o6/0o10 + Math.random() * 0o4/0o10 ),
      r: 0o3 + Math.random() * 0o6,
      angulo: ( Math.random() - 0o5/0o10 ) * 0o4/0o10,
      radiaj,
    });
  }
  betulaSkizo = { lenticeloj, strioj, helajStrioj, horizontajoj, sxelighoj, cikatroj };
  return betulaSkizo;
}

export function desegniLenticelon(k: CanvasRenderingContext2D, lent: BetulaLenticelo, koloro: string): void {
  k.save();
  k.translate(lent.x, lent.y);
  k.rotate(lent.angulo);
  const duono = lent.longo / 2;
  const d = lent.dikeco, kurb = lent.kurbo;
  k.beginPath();
  k.moveTo(-duono, 0);
  k.quadraticCurveTo(-duono * 0o1/0o4, kurb - d * 0o63/0o100, 0, kurb - d);
  k.quadraticCurveTo(duono * 0o1/0o4, kurb - d * 0o63/0o100, duono, 0);
  k.quadraticCurveTo(duono * 0o1/0o4, kurb + d * 0o63/0o100, 0, kurb + d);
  k.quadraticCurveTo(-duono * 0o1/0o4, kurb + d * 0o63/0o100, -duono, 0);
  k.closePath();
  k.fillStyle = koloro;
  k.fill();
  k.lineCap = "round";
  k.strokeStyle = "rgba(20,16,12,0.22)";
  k.lineWidth = d * 0o63/0o100;
  k.beginPath();
  k.moveTo(-duono * 0o72/0o100, kurb + d * 0o11/0o10);
  k.quadraticCurveTo(0, kurb + d * 0o6/0o10, duono * 0o72/0o100, kurb + d * 0o11/0o10);
  k.stroke();
  k.strokeStyle = "rgba(255,255,250,0.30)";
  k.lineWidth = d * 0o5/0o10;
  k.beginPath();
  k.moveTo(-duono * 0o72/0o100, kurb - d * 0o11/0o10);
  k.quadraticCurveTo(0, kurb - d * 0o7/0o10, duono * 0o72/0o100, kurb - d * 0o11/0o10);
  k.stroke();
  k.restore();
}

export function desegniStrion(k: CanvasRenderingContext2D, strio: BetulaStrio, koloro: string): void {
  k.save();
  k.strokeStyle = koloro;
  k.lineWidth = strio.dikeco;
  k.lineCap = "round";
  k.beginPath();
  k.moveTo(strio.x, strio.y);
  k.quadraticCurveTo(strio.x + strio.ondo, strio.y + strio.longo * 0o4/0o10, strio.x - strio.ondo * 0o6/0o10, strio.y + strio.longo);
  k.stroke();
  k.restore();
}

export function desegniHorizontanStrion(k: CanvasRenderingContext2D, strio: BetulaStrio, koloro: string): void {
  k.save();
  k.strokeStyle = koloro;
  k.lineWidth = strio.dikeco;
  k.lineCap = "round";
  k.beginPath();
  k.moveTo(strio.x, strio.y);
  k.quadraticCurveTo(strio.x + strio.longo * 0o4/0o10, strio.y + strio.ondo, strio.x + strio.longo, strio.y - strio.ondo * 0o6/0o10);
  k.stroke();
  k.restore();
}

export function desegniSxelighon(k: CanvasRenderingContext2D, sxel: BetulaSxeligho, malhela: string, ombro: string, hela: string): void {
  const pasoj = 0o100, paso = sxelaW / pasoj;
  const punktoj: number[] = [];
  const [ n1, n2 ] = sxel.cikloj;
  for ( let i = 0; i <= pasoj; i++ ) {
    const t = ( i * paso ) / sxelaW * Math.PI * 2;
    punktoj.push(sxel.sago * ( Math.sin(t * n1 + sxel.fazo) * 0o6/0o10 + Math.sin(t * n2 + sxel.fazo * 0o17/0o10) * 0o4/0o10 ));
  }
  const bendo = ( de: number, dikeco: number, koloro: string ): void => {
    k.beginPath();
    k.moveTo(0, sxel.y + de + punktoj[0]);
    for ( let i = 1; i <= pasoj; i++ ) k.lineTo(i * paso, sxel.y + de + punktoj[i]);
    for ( let i = pasoj; i >= 0; i-- ) k.lineTo(i * paso, sxel.y + de + dikeco + punktoj[i]);
    k.closePath();
    k.fillStyle = koloro;
    k.fill();
  };
  bendo(0, sxel.alto, malhela);
  bendo(sxel.alto * 0o4/0o10, 0o2, malhela);
  bendo(sxel.kurbaAlto, 0o6, ombro);
  bendo(0, sxel.kurbaAlto, hela);
}

export function desegniCikatron(k: CanvasRenderingContext2D, cik: BetulaCikatro, malhela: string, hela: string): void {
  k.save();
  k.translate(cik.x, cik.y);
  k.rotate(cik.angulo);
  k.beginPath();
  for ( let i = 0; i <= cik.radiaj.length; i++ ) {
    const t = i / cik.radiaj.length * Math.PI * 2;
    const r = cik.r * cik.radiaj[i % cik.radiaj.length];
    const x = Math.cos(t) * r, y = Math.sin(t) * r * 0o35/0o100;
    if ( i === 0 ) k.moveTo(x, y); else k.lineTo(x, y);
  }
  k.closePath();
  k.fillStyle = malhela;
  k.fill();
  k.strokeStyle = hela;
  k.lineWidth = 1;
  k.stroke();
  k.restore();
}

export const kreiSxelanTeksajxon = sxovu((): THREE.CanvasTexture => {
  return kreiKanvasanTeksajxon(sxelaW, sxelaH, ( k ) => {
    k.fillStyle = "#f8f8f0"; k.fillRect(0, 0, sxelaW, sxelaH);
    desegniWrapajnNubojn(k, sxelaW, sxelaH, 0o14,
      [ "rgba(255,255,252,0.35)", "rgba(248,247,242,0.25)", "rgba(232,230,222,0.10)" ],
      0o10/0o100, 0o12/0o100);
    const skizo = generiBetulanSkizon();
    for ( const strio of skizo.horizontajoj ) {
      const koloro = `rgba(158,154,142,${0o1/0o20 + Math.random() * 0o1/0o20})`;
      desegniWrapan(k, sxelaW, () => { desegniHorizontanStrion(k, strio, koloro); });
    }
    for ( const strio of skizo.strioj ) {
      const koloro = `rgba(176,172,158,${0o1/0o10 + Math.random() * 0o12/0o100})`;
      desegniWrapan(k, sxelaW, () => { desegniStrion(k, strio, koloro); });
    }
    for ( const strio of skizo.helajStrioj ) {
      const koloro = `rgba(253,253,247,${0o3/0o20 + Math.random() * 0o3/0o20})`;
      desegniWrapan(k, sxelaW, () => { desegniStrion(k, strio, koloro); });
    }
    for ( const lent of skizo.lenticeloj ) {
      const maljuneco = lent.y / sxelaH;
      const koloro = `rgba(26,23,19,${0o55/0o100 + maljuneco * 0o30/0o100})`;
      desegniWrapan(k, sxelaW, () => {
        desegniLenticelon(k, { ...lent, longo: lent.longo + 0o4, dikeco: lent.dikeco + 1 },
          `rgba(152,134,104,${0o10/0o100 + maljuneco * 0o6/0o100})`);
        desegniLenticelon(k, lent, koloro);
      });
    }
    for ( const sxel of skizo.sxelighoj ) {
      desegniWrapan(k, sxelaW, () => {
        desegniSxelighon(k, sxel,
          `rgba(104,94,80,${sxel.malhelo})`,
          "rgba(24,18,12,0.25)",
          "rgba(252,251,245,0.85)");
      });
    }
    for ( const cik of skizo.cikatroj ) {
      desegniWrapan(k, sxelaW, () => {
        desegniCikatron(k, cik, "rgba(96,88,74,0.50)", "rgba(250,250,242,0.55)");
      });
    }
    for ( let i = 0; i < 0o4000; i++ ) {
      const l = 0o1 + Math.random() * 0o10;
      k.fillStyle = Math.random() < 0o3/0o5
        ? `rgba(120,116,104,${0o3/0o100 + Math.random() * 0o10/0o100})`
        : `rgba(255,255,250,${0o5/0o100 + Math.random() * 0o10/0o100})`;
      k.fillRect(Math.random() * ( sxelaW - l ), Math.random() * sxelaH, l, 1);
    }
    const lavo = k.createLinearGradient(0, sxelaH * 0o5/0o10, 0, sxelaH);
    lavo.addColorStop(0, "rgba(168,164,152,0)");
    lavo.addColorStop(0.55, "rgba(156,152,142,0.10)");
    lavo.addColorStop(1, "rgba(120,116,108,0.34)");
    k.fillStyle = lavo;
    k.fillRect(0, 0, sxelaW, sxelaH);
  }, [ 1, 1 ], { anisotropio: 4 });
});
