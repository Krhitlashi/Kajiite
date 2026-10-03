// ≺⧼ វាយនភាពស្លឹកគីហ្វហេសូ ⭐ ⧽≻
import * as THREE from "three";

export function kreiFolianTeksajxon(): THREE.CanvasTexture {
  const H = 0o1000;
  const STRETCH = 0o56 / 0o10;
  const W = Math.round(H * STRETCH);
  const kanvasa = document.createElement("canvas");
  kanvasa.width = W;
  kanvasa.height = H;
  const k = kanvasa.getContext("2d")!;
  k.fillStyle = "#a0c8b0";
  k.fillRect(0, 0, W, H);
  k.lineCap = "round";
  k.lineJoin = "round";
  const stelaKoloro = "#3860b0";
  const supraFoliaKoloro = "#4898d0";
  const subaFoliaKoloro = "#7088b8";
  const suprajKrampojKoloro = "#5098b8";
  const subajKrampojKoloro = "#50a060";
  const cx = W * 0o4 / 0o10;
  const cy = H * 0o4 / 0o10;
  const gr = k.createLinearGradient(0, 0, 0, H * 0o1 / 0o10);
  gr.addColorStop(0, supraFoliaKoloro);
  gr.addColorStop(1, supraFoliaKoloro + "00");
  k.fillStyle = gr;
  k.fillRect(0, 0, W, H * 0o1 / 0o10);
  const gb = k.createLinearGradient(0, H * 0o7 / 0o10, 0, H);
  gb.addColorStop(0, subaFoliaKoloro + "00");
  gb.addColorStop(1, subaFoliaKoloro);
  k.fillStyle = gb;
  k.fillRect(0, H * 0o7 / 0o10, W, H * 0o1 / 0o10);
  k.fillStyle = stelaKoloro;
  const rx = W * 0o31 / 0o100;
  const ry = H * 0o7 / 0o200;
  const sr = 0o11 / 0o20;
  k.beginPath();
  k.moveTo(cx, cy - ry);
  k.quadraticCurveTo(cx + rx * sr, cy - ry * sr, cx + rx, cy);
  k.quadraticCurveTo(cx + rx * sr, cy + ry * sr, cx, cy + ry);
  k.quadraticCurveTo(cx - rx * sr, cy + ry * sr, cx - rx, cy);
  k.quadraticCurveTo(cx - rx * sr, cy - ry * sr, cx, cy - ry);
  k.closePath();
  k.fill();
  k.lineWidth = H * 0o1 / 0o40;
  for ( const sX of [ -1, 1 ] ) {
    for ( const sY of [ -1, 1 ] ) {
      k.strokeStyle = sY < 0 ? suprajKrampojKoloro : subajKrampojKoloro;
      const ax = cx + sX * rx * 0o11 / 0o10;
      const ay = cy + sY * ry * 0o25 / 0o10;
      const lx1 = cx + sX * rx * 0o10 / 0o10;
      const ly1 = cy + sY * ry * 0o6 / 0o10;
      const lx2 = cx + sX * rx * 0o55 / 0o100;
      const ly2 = cy + sY * ry * 0o12 / 0o10;
      const kx1 = cx + sX * rx * 0o21 / 0o20;
      const ky1 = cy + sY * ry * 0o15 / 0o10;
      const kx2 = cx + sX * rx * 0o66 / 0o100;
      const ky2 = cy + sY * ry * 0o20 / 0o10;
      k.beginPath();
      k.moveTo(ax, ay);
      k.quadraticCurveTo(kx1, ky1, lx1, ly1);
      k.moveTo(ax, ay);
      k.quadraticCurveTo(kx2, ky2, lx2, ly2);
      k.stroke();
      const vx = cx + sX * rx * 0o7 / 0o10;
      k.beginPath();
      k.moveTo(vx, ay - sY * ry * 0o11 / 0o10);
      k.lineTo(vx, ay - sY * ry * 0o17 / 0o10);
      k.stroke();
    }
  }
  const folioDuonoLargho = W * 0o31 / 0o100;
  const foliaSupro = H * 0o2 / 0o100;
  const foliaBazo = H * 0o23 / 0o100;
  const foliaMezo = H * 0o12 / 0o100;
  const foliaVeinLargho = W * 0o17 / 0o100;
  const foliaVeinAlto = H * 0o5 / 0o100;
  k.lineWidth = H * 0o1 / 0o40;
  const desegnuFolion = ( supra: boolean, koloro: string ) => {
    k.strokeStyle = koloro;
    const pintoY = supra ? foliaSupro : H - foliaSupro;
    const mezoY = supra ? foliaMezo : H - foliaMezo;
    const bazoY = supra ? foliaBazo : H - foliaBazo;
    const centraBazoY = supra ? foliaBazo + H * 0o13 / 0o100 : H - foliaBazo - H * 0o13 / 0o100;
    k.beginPath();
    k.moveTo(cx, pintoY);
    k.quadraticCurveTo(cx - folioDuonoLargho, mezoY, cx - folioDuonoLargho, bazoY);
    k.quadraticCurveTo(cx, centraBazoY, cx + folioDuonoLargho, bazoY);
    k.quadraticCurveTo(cx + folioDuonoLargho, mezoY, cx, pintoY);
    k.closePath();
    k.stroke();
    k.beginPath();
    k.moveTo(cx, pintoY);
    k.lineTo(cx, bazoY);
    k.stroke();
    const veinBazY = bazoY;
    const veinMezoY = supra ? foliaMezo + foliaVeinAlto : H - foliaMezo - foliaVeinAlto;
    for ( const sgn of [ -1, 1 ] ) {
      k.beginPath();
      k.moveTo(cx, mezoY);
      k.quadraticCurveTo(
        cx + sgn * foliaVeinLargho, veinMezoY,
        cx + sgn * foliaVeinLargho * 0o11 / 0o10, veinBazY
);
      k.stroke();
    }
  };
  desegnuFolion(true, supraFoliaKoloro);
  desegnuFolion(false, subaFoliaKoloro);
  const t = new THREE.CanvasTexture(kanvasa);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 0o10;
  return t;
}
