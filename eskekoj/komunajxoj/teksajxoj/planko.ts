// ≺⧼ វាយនភាពក្តារ 🪵 ⧽≻
import * as THREE from "three";
import { deksesuma, malheligi } from "../koloroj.js";
import { kreiKlasikanHazardon } from "../hazardo.js";
import { larmo } from "./helpiloj.js";

export function generiPlankanTeksajxon(bazaKoloro: number, akcentaKoloro: number, semo: number): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 0o2000;
  const g = c.getContext("2d")!;
  const cx = c.width / 2, cy = c.height / 2;
  const R = c.width / 2;
  const baza = deksesuma(bazaKoloro), akcenta = deksesuma(akcentaKoloro);
  const malhela = malheligi(baza);
  const rnd = kreiKlasikanHazardon(semo);
  const pintoj = rnd() < 0o5/0o10 ? 4 : 0o10;
  const larmoj = rnd() < 0o5/0o10;
  const ondo = [ 0o15/0o1000, 0o35/0o1000, 0o55/0o1000 ][Math.floor(rnd() * 3)];
  const fazo = rnd() < 0o5/0o10 ? 0 : Math.PI / 4;
  const interŝanĝi = rnd() < 0o5/0o10;
  g.fillStyle = baza;
  g.fillRect(0, 0, c.width, c.height);
  const grad = g.createRadialGradient(cx, cy, 0, cx, cy, R);
  grad.addColorStop(0, akcenta + "22");
  grad.addColorStop(1, akcenta + "00");
  g.fillStyle = grad;
  g.fillRect(0, 0, c.width, c.height);
  const angulaR = R * 0o7/0o100;
  for ( const sx of [ -1, 1 ] ) for ( const sy of [ -1, 1 ] ) {
    const ax = cx + sx * R * 0o60/0o100;
    const ay = cy + sy * R * 0o60/0o100;
    const enen = Math.atan2(cy - ay, cx - ax);
    if ( larmoj ) {
      larmo(g, ax, ay, angulaR, enen, akcenta);
      g.fillStyle = baza;
      g.beginPath();
      g.arc(ax, ay, angulaR * 0o45/0o100, 0, Math.PI * 2);
      g.fill();
    } else {
      g.strokeStyle = akcenta;
      g.lineWidth = R * 0o12/0o1000;
      g.beginPath();
      g.arc(ax, ay, angulaR, 0, Math.PI * 2);
      g.stroke();
      g.beginPath();
      g.arc(ax, ay, angulaR * 0o55/0o100, 0, Math.PI * 2);
      g.stroke();
      g.fillStyle = akcenta;
      g.beginPath();
      g.arc(ax, ay, angulaR * 0o25/0o100, 0, Math.PI * 2);
      g.fill();
    }
  }
  const stelo = ( p: number, ekstera: number, ena: number, ofseto = 0 ) => {
    g.fillStyle = akcenta;
    g.beginPath();
    for ( let i = 0; i <= p * 2; i++ ) {
      const ang = ofseto + ( i / ( p * 2 ) ) * Math.PI * 2;
      const rad = i % 2 === 0 ? ekstera : ena;
      const x = cx + Math.cos(ang) * rad;
      const y = cy + Math.sin(ang) * rad;
      if ( i === 0 ) { g.moveTo(x, y); continue; }
      const prevAng = ofseto + ( ( i - 1 ) / ( p * 2 ) ) * Math.PI * 2;
      const midAng = ( prevAng + ang ) / 2;
      const midRad = ena + ( ekstera - ena ) * 0o23/0o100;
      g.quadraticCurveTo(
        cx + Math.cos(midAng) * midRad,
        cy + Math.sin(midAng) * midRad,
        x, y
);
    }
    g.closePath();
    g.fill();
  };
  const stelEkstera = R * 0o22/0o100;
  stelo(pintoj, stelEkstera, stelEkstera * 0o4/0o10, pintoj === 4 ? Math.PI / 4 : 0);
  g.fillStyle = akcenta;
  g.beginPath();
  g.arc(cx, cy, R * 0o45/0o1000, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = baza;
  g.beginPath();
  g.arc(cx, cy, R * 0o2/0o100, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = akcenta;
  g.beginPath();
  g.arc(cx, cy, R * 0o7/0o1000, 0, Math.PI * 2);
  g.fill();
  const flankaLinio = ( inseto: number, largho: number, koloro: string ) => {
    g.strokeStyle = koloro;
    g.lineWidth = largho;
    g.beginPath();
    g.moveTo(cx - R + inseto, cy - R + inseto);
    g.lineTo(cx + R - inseto, cy - R + inseto);
    g.lineTo(cx + R - inseto, cy + R - inseto);
    g.lineTo(cx - R + inseto, cy + R - inseto);
    g.lineTo(cx - R + inseto, cy - R + inseto);
    g.stroke();
  };
  flankaLinio(R * 0o45/0o1000, R * 0o2/0o100, akcenta);
  flankaLinio(R * 0o7/0o100, R * 0o1/0o100, malhela);
  const spuri = ( skalo: number, inversa: boolean ) => {
    const punktoj = 0o230;
    for ( let i = 0; i <= punktoj; i++ ) {
      const t = ( i / punktoj ) * Math.PI * 2 * ( inversa ? -1 : 1 );
      const k = 0o32/0o10;
      const c = Math.pow(Math.abs(Math.cos(t)), k) + Math.pow(Math.abs(Math.sin(t)), k);
      const rad = ( skalo / Math.pow(c, 1 / k) ) * ( 1 + ondo * Math.sin(4 * t + fazo) );
      const x = cx + Math.cos(t) * rad;
      const y = cy + Math.sin(t) * rad;
      if ( i === 0 ) g.moveTo(x, y); else g.lineTo(x, y);
    }
    g.closePath();
  };
  const bendo = ( rIn: number, rEk: number, koloro: string ) => {
    g.fillStyle = koloro;
    g.beginPath();
    spuri(rEk, false);
    spuri(rIn, true);
    g.fill("evenodd");
  };
  const bendoPaŝo = R * 0o55/0o1000;
  const bendoLargho = bendoPaŝo * 0o55/0o100;
  let bendoN = 0;
  for ( let s = R * 0o31/0o100; s + bendoLargho < R * 0o60/0o100; s += bendoPaŝo ) {
    bendo(s, s + bendoLargho, ( bendoN + ( interŝanĝi ? 1 : 0 ) ) % 2 === 0 ? akcenta : malhela);
    bendoN++;
  }
  const teksajxo = new THREE.CanvasTexture(c);
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  teksajxo.anisotropy = 0o10;
  return teksajxo;
}
