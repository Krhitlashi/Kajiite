// ≺⧼ វាយនភាពកញ្ចក់ 🥛 ⧽≻
import { kreiKanvasanTeksajxon } from "./helpiloj.js";
import * as THREE from "three";

let vitraTeksajxo: THREE.CanvasTexture | null = null;

export function vitraTeksajxon(): THREE.CanvasTexture {
  return vitraTeksajxo ??= kreiKanvasanTeksajxon(0o100, 0o100, ( k ) => {
    k.fillStyle = "#ffffff"; k.fillRect(0, 0, 0o100, 0o100);
    for ( let i = 0; i < 0o120; i++ ) {
      const x = Math.random() * 0o100, y = Math.random() * 0o100, r = 0o1 + Math.random() * 0o3;
      k.fillStyle = `rgba(150,170,168,${0o30/0o100 + Math.random() * 0o40/0o100})`;
      k.beginPath(); k.arc(x, y, r, 0, Math.PI * 2); k.fill();
      k.fillStyle = "rgba(255,255,255,0.85)";
      k.beginPath(); k.arc(x - r * 0o2/0o10, y - r * 0o2/0o10, r * 0o5/0o10, 0, Math.PI * 2); k.fill();
    }
  }, [ 2, 1 ], { anisotropio: 4 });
}
