// ≺⧼ វាយនភាពសំបកពីងពាងសមុទ្រ 🕷️ ⧽≻
import { kreiKanvasanTeksajxon } from "./helpiloj.js";
import * as THREE from "three";

export function kreiKutiklanTeksajxon(): { koloro: THREE.CanvasTexture; reliefo: THREE.CanvasTexture } {
  const s = 0o200;
  const desegnu = (reliefo: boolean) => kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.fillStyle = reliefo ? "rgb(128,128,128)" : "rgb(208,176,136)";
    kunteksto.fillRect(0, 0, s, s);
    for ( let i = 0; i < 0o6; i++ ) {
      const y = ( i + 0o1/0o2 ) / 0o6 * s;
      kunteksto.strokeStyle = reliefo ? "rgba(64,64,64,0.55)" : "rgba(144,112,72,0.8)";
      kunteksto.lineWidth = s * 0o1/0o100;
      kunteksto.beginPath();
      kunteksto.moveTo(0, y);
      kunteksto.lineTo(s, y);
      kunteksto.stroke();
    }
    for ( let i = 0; i < 0o300; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = 0o23/0o40 + Math.random() * 0o43/0o40;
      kunteksto.fillStyle = reliefo
        ? ( Math.random() < 0o1/0o2 ? "rgba(200,200,200,0.5)" : "rgba(80,80,80,0.45)" )
        : ( Math.random() < 0o1/0o2 ? "rgba(232,208,176,0.5)" : "rgba(168,128,88,0.45)" );
      kunteksto.beginPath();
      kunteksto.arc(x, y, r, 0, Math.PI * 2);
      kunteksto.fill();
    }
  }, [ 1, 1 ], { volvado: THREE.RepeatWrapping });
  return { koloro: desegnu(false), reliefo: desegnu(true) };
}
