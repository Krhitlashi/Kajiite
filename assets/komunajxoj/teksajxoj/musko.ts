// ≺⧼ Muska teksajxo 🌿 ⧽≻
import * as THREE from "three";
import { kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiMuskanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    const bazaGradiento = kunteksto.createLinearGradient(0, 0, 0, s);
    bazaGradiento.addColorStop(0, "#489088");
    bazaGradiento.addColorStop(0o5/0o10, "#387870");
    bazaGradiento.addColorStop(0o3/0o4, "#507850");
    bazaGradiento.addColorStop(1, "#607848");
    kunteksto.fillStyle = bazaGradiento;
    kunteksto.fillRect(0, 0, s, s);
    const tufoKoloroj = [ "rgba(103,188,174,0.44)", "rgba(67,151,143,0.42)", "rgba(145,211,190,0.30)", "rgba(37,112,111,0.34)" ];
    for ( let i = 0; i < 0o70; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = s * ( 0o3/0o100 + Math.random() * 0o6/0o100 );
      const g = kunteksto.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, tufoKoloroj[i % tufoKoloroj.length]);
      g.addColorStop(0o5/0o10, "rgba(67,151,143,0.18)");
      g.addColorStop(1, "rgba(31,86,83,0)");
      kunteksto.fillStyle = g;
      kunteksto.beginPath();
      kunteksto.ellipse(x, y, r, r * ( 0o6/0o10 + Math.random() * 0o4/0o10 ), Math.random() * Math.PI, 0, Math.PI * 2);
      kunteksto.fill();
    }
    kunteksto.lineCap = "round";
    for ( let i = 0; i < 0o140; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const angulo = Math.random() * Math.PI * 2;
      const longo = s * ( 0o1/0o100 + Math.random() * 0o2/0o100 );
      const kurbo = ( Math.random() - 0o5/0o10 ) * 0o3;
      kunteksto.strokeStyle = i % 0o4 ? "rgba(139,211,193,0.28)" : "rgba(25,92,91,0.34)";
      kunteksto.lineWidth = 0o1/0o2 + Math.random() * 0o1/0o2;
      kunteksto.beginPath();
      kunteksto.moveTo(x, y);
      kunteksto.quadraticCurveTo(x + Math.cos(angulo) * longo * 0o1/0o2 - Math.sin(angulo) * kurbo,
        y + Math.sin(angulo) * longo * 0o1/0o2 + Math.cos(angulo) * kurbo,
        x + Math.cos(angulo) * longo, y + Math.sin(angulo) * longo);
      kunteksto.stroke();
    }
    for ( let i = 0; i < 0o230; i++ ) {
      const x = Math.random() * s;
      const bazoY = s * ( 0o3/0o4 + Math.random() * 0o1/0o4 );
      const alto = s * ( 0o1/0o100 + Math.random() * 0o3/0o100 )
        * ( bazoY < s * 0o75/0o100 ? 0o7/0o10 : 1 );
      kunteksto.strokeStyle = i % 0o4 ? "rgba(104,158,78,0.46)" : "rgba(43,103,62,0.44)";
      kunteksto.lineWidth = 0o1/0o2 + Math.random() * 0o1/0o2;
      kunteksto.beginPath();
      kunteksto.moveTo(x, bazoY);
      kunteksto.quadraticCurveTo(x + ( Math.random() - 0o5/0o10 ) * 0o2, bazoY - alto * 0o1/0o2,
        x + ( Math.random() - 0o5/0o10 ) * 0o2, bazoY - alto);
      kunteksto.stroke();
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
});
