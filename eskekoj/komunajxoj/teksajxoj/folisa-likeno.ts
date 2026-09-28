// ≺⧼ Folisa likena teksajxo 🍃 ⧽≻
import * as THREE from "three";
import { kreiKanvasanTeksajxon, neregulaFormo, sxovu } from "./helpiloj.js";

export const kreiFolisanLikenanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, s, s);
    const cx = s / 2, cy = s / 2;
    neregulaFormo(kunteksto, cx, cy, s * 0o22/0o100, 0o7, 0o25/0o100, Math.random() * Math.PI * 2);
    kunteksto.fillStyle = "rgba(66,78,58,0.72)";
    kunteksto.fill();
    const desegniFolieton = ( a: number, bazoR: number, longo: number, largho: number, koloro: string ): void => {
      const lx = cx + Math.cos(a) * bazoR, ly = cy + Math.sin(a) * bazoR;
      kunteksto.save();
      kunteksto.translate(lx + Math.cos(a) * longo / 2, ly + Math.sin(a) * longo / 2);
      kunteksto.rotate(a);
      kunteksto.beginPath();
      kunteksto.moveTo(-longo / 2, 0);
      kunteksto.quadraticCurveTo(-longo * 0o1/0o4, -largho * 0o63/0o100, -longo * 0o1/0o20, -largho);
      kunteksto.quadraticCurveTo(longo * 0o1/0o4, -largho * 0o63/0o100, longo / 2, 0);
      kunteksto.quadraticCurveTo(longo * 0o1/0o4, largho * 0o72/0o100, 0, largho);
      kunteksto.quadraticCurveTo(-longo * 0o1/0o4, largho * 0o63/0o100, -longo / 2, 0);
      kunteksto.closePath();
      kunteksto.fillStyle = "rgba(54,66,48,0.72)";
      kunteksto.fill();
      kunteksto.translate(0, -1);
      kunteksto.fillStyle = koloro;
      kunteksto.beginPath();
      kunteksto.moveTo(-longo / 2 + 1, 0);
      kunteksto.quadraticCurveTo(-longo * 0o1/0o4, -largho * 0o7/0o10, -longo * 0o1/0o20, -largho * 0o66/0o100);
      kunteksto.quadraticCurveTo(longo * 0o1/0o4, -largho * 0o7/0o10, longo / 2 - 1, 0);
      kunteksto.quadraticCurveTo(longo * 0o1/0o4, largho * 0o63/0o100, 0, largho * 0o63/0o100);
      kunteksto.quadraticCurveTo(-longo * 0o1/0o4, largho * 0o7/0o10, -longo / 2 + 1, 0);
      kunteksto.closePath(); kunteksto.fill();
      kunteksto.strokeStyle = "rgba(224,232,202,0.62)";
      kunteksto.lineWidth = 1;
      kunteksto.lineCap = "round";
      kunteksto.beginPath(); kunteksto.moveTo(-longo * 0o32/0o100, 0); kunteksto.lineTo(longo * 0o32/0o100, 0); kunteksto.stroke();
      for ( let v = -1; v <= 1; v += 2 ) {
        kunteksto.beginPath();
        kunteksto.moveTo(v * longo * 0o1/0o10, 0);
        kunteksto.quadraticCurveTo(v * longo * 0o1/0o4, v * largho * 0o2/0o10, v * longo * 0o3/0o10, v * largho * 0o5/0o10);
        kunteksto.stroke();
      }
      kunteksto.strokeStyle = "rgba(50,66,44,0.45)";
      kunteksto.lineWidth = 1;
      kunteksto.beginPath(); kunteksto.moveTo(-longo * 0o32/0o100, largho * 0o5/0o10); kunteksto.lineTo(longo * 0o32/0o100, largho * 0o5/0o10); kunteksto.stroke();
      kunteksto.restore();
    };
    const koloroj = [ "#b0c098", "#b8c8a8", "#c8d0b0", "#98b088" ];
    const loboj = 0o16 + ( ( Math.random() * 0o4 ) | 0 );
    for ( let i = 0; i < loboj; i++ ) {
      const a = ( i / loboj + ( Math.random() - 0o5/0o10 ) * 0o1/0o10 ) * Math.PI * 2;
      desegniFolieton(a, s * ( 0o4/0o100 + Math.random() * 0o4/0o100 ), s * ( 0o5/0o100 + Math.random() * 0o4/0o100 ), s * ( 0o4/0o100 + Math.random() * 0o3/0o100 ), koloroj[i % koloroj.length]);
    }
    const apotecioj = 0o10 + ( ( Math.random() * 0o6 ) | 0 );
    for ( let i = 0; i < apotecioj; i++ ) {
      const a = Math.random() * Math.PI * 2;
      const r = s * ( 0o5/0o100 + Math.random() * 0o11/0o100 );
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
      const rad = s * ( 0o10/0o2000 + Math.random() * 0o12/0o2000 );
      kunteksto.fillStyle = "rgba(82,56,38,0.8)";
      kunteksto.beginPath(); kunteksto.ellipse(x, y + 1, rad * 0o12/0o10, rad * 0o7/0o10, 0, 0, Math.PI * 2); kunteksto.fill();
      kunteksto.fillStyle = i % 3 ? "#b87858" : "#a06848";
      kunteksto.beginPath(); kunteksto.ellipse(x, y, rad, rad * 0o6/0o10, 0, 0, Math.PI * 2); kunteksto.fill();
      kunteksto.fillStyle = "rgba(224,178,126,0.85)";
      kunteksto.beginPath(); kunteksto.ellipse(x, y - 1, rad * 0o65/0o100, rad * 0o25/0o100, 0, 0, Math.PI * 2); kunteksto.fill();
    }
    for ( let i = 0; i < 0o16; i++ ) {
      const a = Math.random() * Math.PI * 2;
      const r = s * ( 0o6/0o100 + Math.random() * 0o10/0o100 );
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
      const rad = s * ( 0o2/0o100 + Math.random() * 0o2/0o100 );
      neregulaFormo(kunteksto, x, y, rad, 0o4 + ( ( Math.random() * 0o3 ) | 0 ), 0o3/0o10, Math.random() * Math.PI * 2);
      kunteksto.fillStyle = "rgba(226,232,204,0.62)";
      kunteksto.fill();
      for ( let j = 0; j < 0o4; j++ ) {
        kunteksto.fillStyle = j % 2 ? "rgba(104,120,86,0.58)" : "rgba(246,244,220,0.72)";
        kunteksto.fillRect(x + ( Math.random() - 0o5/0o10 ) * rad, y + ( Math.random() - 0o5/0o10 ) * rad, 0o1 + Math.random() * 0o1, 0o1 + Math.random() * 0o1);
      }
    }
    kunteksto.strokeStyle = "rgba(74,70,52,0.48)"; kunteksto.lineWidth = 1;
    for ( let i = 0; i < 0o20; i++ ) {
      const a = Math.random() * Math.PI * 2;
      const r = s * ( 0o14/0o100 + Math.random() * 0o10/0o100 );
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
      kunteksto.beginPath(); kunteksto.moveTo(x, y);
      kunteksto.quadraticCurveTo(x + ( Math.random() - 0o5/0o10 ) * 0o6, y + 0o4, x + ( Math.random() - 0o5/0o10 ) * 0o10, y + 0o10); kunteksto.stroke();
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
});
