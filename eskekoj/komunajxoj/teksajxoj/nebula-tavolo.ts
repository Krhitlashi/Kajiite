// ≺⧼ វាយនភាពស្រទាប់អ័ព្ទ 🌫️ ⧽≻
import * as THREE from "three";
import { kreiKanvasanTeksajxon } from "./helpiloj.js";

export function kreiNebulTavolanTeksajxon(): THREE.CanvasTexture {
  const s = 0o400;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, s, s);
    const makuloj = 0o40;
    for ( let i = 0; i < makuloj; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = s * ( 0o1/0o4 + Math.random() * 0o1/0o2 );
      const denso = 0o7/0o40 + Math.random() * 0o13/0o40;
      const koloro = `rgba(204,220,220,${denso.toFixed(2)})`;
      for ( const dx of [ -s, 0, s ] ) {
        for ( const dy of [ -s, 0, s ] ) {
          const g = kunteksto.createRadialGradient(x + dx, y + dy, 0, x + dx, y + dy, r);
          g.addColorStop(0, koloro);
          g.addColorStop(1, "rgba(204,220,220,0)");
          kunteksto.fillStyle = g;
          kunteksto.beginPath();
          kunteksto.arc(x + dx, y + dy, r, 0, Math.PI * 2);
          kunteksto.fill();
        }
      }
    }
  }, [ 1, 1 ], { volvado: THREE.RepeatWrapping });
}
