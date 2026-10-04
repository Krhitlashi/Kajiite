// ≺⧼ វាយនភាពស្លឹកស្វាយ 🍃 ⧽≻
import * as THREE from "three";
import { ombro } from "../koloroj.js";
import { kreiKanvasanTeksajxon, senAlfa, sxovu } from "./helpiloj.js";

export const kreiPurpuranFolianTeksajxon = sxovu((): THREE.CanvasTexture => {
  const BAZO = 0xb868d0;
  const w = 0o1000, h = 0o2000;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, w, h);
    const cx = w / 2;
    const duono = ( y: number ): number => 0o1/0o2 * w * Math.sin(Math.PI * y / h);
    const klingo = (): void => {
      kunteksto.beginPath();
      for ( let y = 0; y <= h; y += 4 ) {
        if ( y === 0 ) kunteksto.moveTo(cx - duono(y), y);
        else kunteksto.lineTo(cx - duono(y), y);
      }
      for ( let y = h; y >= 0; y -= 4 ) kunteksto.lineTo(cx + duono(y), y);
      kunteksto.closePath();
    };
    const karno = kunteksto.createLinearGradient(0, h, 0, 0);
    karno.addColorStop(0, "#f0bcf4");
    karno.addColorStop(0o11/0o100, "#dc96e6");
    karno.addColorStop(0o1/0o2, "#bf6fd4");
    karno.addColorStop(0o15/0o20, "#9a4eae");
    karno.addColorStop(1, "#763486");
    klingo();
    kunteksto.fillStyle = karno;
    kunteksto.fill();
    kunteksto.save();
    klingo();
    kunteksto.clip();
    for ( const f of [ { t: 0o3/0o20, l: 0o17/0o100, d: -1 }, { t: 0o33/0o100, l: 0o3/0o20, d: 1 },
      { t: 0o51/0o100, l: 0o3/0o20, d: -1 }, { t: 0o33/0o40, l: 0o3/0o20, d: 1 } ] ) {
      const sx = cx + ( f.t - 0o1/0o2 ) * w;
      const grad = kunteksto.createLinearGradient(sx - f.l * w, 0, sx + f.l * w, 0);
      const koloro = f.d > 0 ? "rgba(255,238,255,0.10)" : ombro(BAZO, 0o11, 0o5/0o40);
      grad.addColorStop(0, senAlfa(koloro));
      grad.addColorStop(0o1/0o2, koloro);
      grad.addColorStop(1, senAlfa(koloro));
      kunteksto.fillStyle = grad;
      kunteksto.fillRect(sx - f.l * w, 0, f.l * 2 * w, h);
    }
    for ( let i = 0; i < 0o300; i++ ) {
      const y = Math.random() * h;
      const x = cx + ( Math.random() * 2 - 1 ) * duono(y);
      const r = h * ( 0o1/0o100 + Math.random() * 0o1/0o100 );
      const hela = Math.random() < 0o1/0o2;
      const koloro = hela ? "rgba(255,238,255,0.10)" : ombro(BAZO, 0o11, 0o13/0o100);
      const g = kunteksto.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, koloro);
      g.addColorStop(1, senAlfa(koloro));
      kunteksto.fillStyle = g;
      kunteksto.beginPath(); kunteksto.arc(x, y, r, 0, Math.PI * 2); kunteksto.fill();
    }
    const ripo = ( y: number ): number => w * ( 0o1/0o40 - 0o1/0o100 * ( 1 - y / h ) );
    kunteksto.beginPath();
    kunteksto.moveTo(cx - ripo(h), h);
    kunteksto.quadraticCurveTo(cx - ripo(h * 0o35/0o100), h * 0o35/0o100, cx - ripo(0), 0);
    kunteksto.lineTo(cx + ripo(0), 0);
    kunteksto.quadraticCurveTo(cx + ripo(h * 0o35/0o100), h * 0o35/0o100, cx + ripo(h), h);
    kunteksto.closePath();
    const ripoGradiento = kunteksto.createLinearGradient(cx - w * 0o1/0o20, 0, cx + w * 0o1/0o20, 0);
    ripoGradiento.addColorStop(0, ombro(BAZO, 0o12, 0o41/0o100));
    ripoGradiento.addColorStop(0o5/0o20, ombro(BAZO, 0o10, 0o1/0o10));
    ripoGradiento.addColorStop(0o1/0o2, "rgba(255,244,255,0.46)");
    ripoGradiento.addColorStop(0o13/0o20, ombro(BAZO, 0o10, 0o1/0o10));
    ripoGradiento.addColorStop(1, ombro(BAZO, 0o12, 0o41/0o100));
    kunteksto.fillStyle = ripoGradiento;
    kunteksto.fill();
    kunteksto.lineCap = "round";
    const VENOPAROJ = 0o14;
    const dikoV = h * 0o0/0o10;
    for ( let i = 1; i <= VENOPAROJ; i++ ) {
      const t = i / ( VENOPAROJ + 1 );
      const y = h * ( 1 - t );
      const antauxen = h * ( 0o1/0o20 + 0o3/0o100 * t );
      const rando = duono(y - antauxen) * 0o67/0o100;
      for ( const dir of [ -1, 1 ] ) {
        kunteksto.strokeStyle = ombro(BAZO, 0o11, 0o41/0o100);
        kunteksto.lineWidth = dikoV;
        kunteksto.beginPath();
        kunteksto.moveTo(cx + dir * w * 0o1/0o100, y);
        kunteksto.quadraticCurveTo(cx + dir * rando * 0o43/0o100, y - antauxen * 0o13/0o40, cx + dir * rando, y - antauxen);
        kunteksto.stroke();
        kunteksto.strokeStyle = "rgba(255,240,255,0.36)";
        kunteksto.lineWidth = dikoV * 0o43/0o100;
        kunteksto.beginPath();
        kunteksto.moveTo(cx + dir * w * 0o1/0o100, y - dikoV * 0o5/0o10);
        kunteksto.quadraticCurveTo(cx + dir * rando * 0o43/0o100, y - antauxen * 0o13/0o40 - dikoV * 0o5/0o10,
          cx + dir * rando, y - antauxen - dikoV * 0o5/0o10);
        kunteksto.stroke();
      }
    }
    kunteksto.lineWidth = h * 0o0/0o10;
    for ( let i = 0; i < 0o500; i++ ) {
      const y = Math.random() * h;
      const x = cx + ( Math.random() * 2 - 1 ) * duono(y);
      const l = h * ( 0o1/0o40 + Math.random() * 0o1/0o20 );
      kunteksto.strokeStyle = Math.random() < 0o1/0o2
        ? `rgba(255,240,255,${0o3/0o40 + Math.random() * 0o1/0o10})`
        : ombro(BAZO, 0o11, 0o7/0o100 + Math.random() * 0o11/0o100);
      kunteksto.beginPath();
      kunteksto.moveTo(x, y);
      kunteksto.lineTo(x + ( Math.random() * 2 - 1 ) * l, y - l * ( 0o3/0o10 + Math.random() * 0o15/0o20 ));
      kunteksto.stroke();
    }
    for ( let i = 0; i < 0o400; i++ ) {
      const y = Math.random() * h;
      const x = cx + ( Math.random() * 2 - 1 ) * duono(y);
      const l = h * 0o0/0o10 * ( 0o5/0o10 + Math.random() );
      kunteksto.fillStyle = Math.random() < 0o1/0o2
        ? ombro(BAZO, 0o6, 0o5/0o40 + Math.random() * 0o7/0o40)
        : `rgba(248,228,254,${0o5/0o40 + Math.random() * 0o7/0o40})`;
      kunteksto.fillRect(x, y, l, l);
    }
    const brilo = kunteksto.createLinearGradient(0, h, 0, 0);
    brilo.addColorStop(0, "rgba(255,240,255,0.16)");
    brilo.addColorStop(0o1/0o2, senAlfa("rgba(255,240,255,0.12)"));
    brilo.addColorStop(1, ombro(BAZO, 0o11, 0o3/0o20));
    kunteksto.fillStyle = brilo;
    kunteksto.fillRect(0, 0, w, h);
    kunteksto.strokeStyle = ombro(BAZO, 0o12, 0o41/0o100);
    kunteksto.lineWidth = h * 0o1/0o100;
    klingo();
    kunteksto.stroke();
    kunteksto.strokeStyle = "rgba(246,226,252,0.42)";
    kunteksto.lineWidth = h * 0o0/0o10;
    klingo();
    kunteksto.stroke();
    kunteksto.restore();
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
});
