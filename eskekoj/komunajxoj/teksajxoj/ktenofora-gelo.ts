// ≺⧼ វាយនភាពជែលកតេណូផរ 🪼 ⧽≻
import { kreiKanvasanTeksajxon } from "./helpiloj.js";
import * as THREE from "three";

export interface GelajOpcioj {
  bazo: string;
  kanalo: string;
  poluso: string;
  polusaForto?: number;
  grajnoj?: number;
}

export function kreiGelanTeksajxon( opcioj: GelajOpcioj ):
  { koloro: THREE.CanvasTexture; reliefo: THREE.CanvasTexture } {
  const s = 0o400;
  const denso = opcioj.polusaForto ?? 0o6/0o10;
  const desegnu = ( reliefo: boolean ) => kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.fillStyle = reliefo ? "rgb(128,128,128)" : opcioj.bazo;
    kunteksto.fillRect(0, 0, s, s);
    const gradiento = kunteksto.createLinearGradient(0, 0, 0, s);
    if ( reliefo ) {
      gradiento.addColorStop(0, "rgba(90,90,90," + denso + ")");
      gradiento.addColorStop(0o1/0o5, "rgba(128,128,128,0)");
      gradiento.addColorStop(0o4/0o5, "rgba(128,128,128,0)");
      gradiento.addColorStop(1, "rgba(90,90,90," + denso + ")");
    } else {
      gradiento.addColorStop(0, opcioj.poluso);
      gradiento.addColorStop(0o1/0o5, "rgba(255,255,255,0)");
      gradiento.addColorStop(0o4/0o5, "rgba(255,255,255,0)");
      gradiento.addColorStop(1, opcioj.poluso);
    }
    kunteksto.globalAlpha = reliefo ? 0o7/0o10 : denso;
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, s, s);
    kunteksto.globalAlpha = 1;
    const kanalaLargho = s * 0o5/0o100;
    for ( let k = 0; k < 0o10; k++ ) {
      const cx = ( k + 0o1/0o2 ) / 0o10 * s;
      kunteksto.strokeStyle = reliefo ? "rgba(190,190,190,0.55)" : opcioj.kanalo;
      kunteksto.globalAlpha = reliefo ? 0o5/0o10 : 0o45/0o100;
      kunteksto.lineWidth = kanalaLargho;
      kunteksto.beginPath();
      for ( let i = 0; i <= 0o20; i++ ) {
        const v = i / 0o20;
        const x = cx + Math.sin(v * Math.PI * 0o2 + k) * kanalaLargho * 0o3;
        if ( i === 0 ) kunteksto.moveTo(x, v * s);
        else kunteksto.lineTo(x, v * s);
      }
      kunteksto.stroke();
      kunteksto.globalAlpha = 1;
    }
    const grajnoj = opcioj.grajnoj ?? 0o400;
    kunteksto.fillStyle = reliefo ? "rgba(200,200,200,0.35)" : opcioj.kanalo;
    for ( let i = 0; i < grajnoj; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = 0o1/0o2 + Math.random() * 1.2;
      kunteksto.globalAlpha = 0o1/0o10 + Math.random() * 0o2/0o10;
      kunteksto.beginPath();
      kunteksto.arc(x, y, r, 0, Math.PI * 2);
      kunteksto.fill();
    }
    kunteksto.globalAlpha = 1;
  }, [ 1, 1 ], { volvado: THREE.RepeatWrapping });
  return { koloro: desegnu(false), reliefo: desegnu(true) };
}
