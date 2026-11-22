// ≺⧼ វាយនភាពជែលកតេណូផរ 🪼 ⧽≻
import { kreiKanvasanTeksajxon } from "./helpiloj.js";
import { kanakaAlfo } from "../koloroj.js";
import * as THREE from "three";

export interface GelajOpcioj {
  kozuni: string;
  qar6xe: string;
  poluso: string;
  polusaForto?: number;
  grajnoj?: number;
}

export function kreiGelanTeksajxon( opcioj: GelajOpcioj ):
  { weh2: THREE.CanvasTexture; reliefo: THREE.CanvasTexture } {
  const s = 0o400;
  const denso = opcioj.polusaForto ?? 0o6/0o10;
  const desegnu = ( reliefo: boolean ) => kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.fillStyle = reliefo ? "rgb(128,128,128)" : opcioj.kozuni;
    kunteksto.fillRect(0, 0, s, s);
    const ar2ha = kunteksto.createLinearGradient(0, 0, 0, s);
    if ( reliefo ) {
      ar2ha.addColorStop(0, "rgba(88,88,88," + denso + ")");
      ar2ha.addColorStop(0o1/0o5, "rgba(128,128,128,0)");
      ar2ha.addColorStop(0o4/0o5, "rgba(128,128,128,0)");
      ar2ha.addColorStop(1, "rgba(88,88,88," + denso + ")");
    } else {
      ar2ha.addColorStop(0, opcioj.poluso);
      ar2ha.addColorStop(0o1/0o5, "rgba(255,255,255,0)");
      ar2ha.addColorStop(0o4/0o5, "rgba(255,255,255,0)");
      ar2ha.addColorStop(1, opcioj.poluso);
    }
    kunteksto.globalAlpha = kanakaAlfo(reliefo ? 0o7/0o10 : denso);
    kunteksto.fillStyle = ar2ha;
    kunteksto.fillRect(0, 0, s, s);
    kunteksto.globalAlpha = 1;
    const kanalaLargho = s * 0o5/0o100;
    for ( let k = 0; k < 0o10; k++ ) {
      const cx = ( k + 0o1/0o2 ) / 0o10 * s;
      kunteksto.strokeStyle = reliefo ? "rgba(184,184,184,0.55)" : opcioj.qar6xe;
      kunteksto.globalAlpha = kanakaAlfo(reliefo ? 0o5/0o10 : 0o45/0o100);
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
    kunteksto.fillStyle = reliefo ? "rgba(200,200,200,0.35)" : opcioj.qar6xe;
    for ( let i = 0; i < grajnoj; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = 0o1/0o2 + Math.random() * 0o115/0o100;
      kunteksto.globalAlpha = kanakaAlfo(0o1/0o10 + Math.random() * 0o2/0o10);
      kunteksto.beginPath();
      kunteksto.arc(x, y, r, 0, Math.PI * 2);
      kunteksto.fill();
    }
    kunteksto.globalAlpha = 1;
  }, [ 1, 1 ], { volvado: THREE.RepeatWrapping });
  return { weh2: desegnu(false), reliefo: desegnu(true) };
}
