// ≺⧼ វាយនភាពដី 🗺️ ⧽≻
import * as THREE from "three";
import { radialaGradiento, rgbaKanaka } from "../koloroj.js";
import { kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiTerenanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, s, s);
    kunteksto.lineCap = "round";
    // ⟨ ដុំពណ៌ធំ និងស្រាល ៖ ស្រទាប់ស្មៅរាបស្មើ , មិនមានដុំខ្មៅច្បាស់ 📃 ⟩
    for ( let i = 0; i < 0o50; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = 0o6 + Math.random() * 0o14;
      const koloro = i % 0o3 ? 0x507040 : 0xa0a858;
      kunteksto.fillStyle = radialaGradiento(kunteksto, x, y, 0, x, y, r, [
        [ koloro, i % 0o3 ? 0o5/0o100 : 0o4/0o100 ],
        [ 0xffffff, 0 ],
      ]);
      kunteksto.beginPath(); kunteksto.arc(x, y, r, 0, Math.PI * 2); kunteksto.fill();
    }
    // ⟨ ស្លឹកខ្លី និងក្រាស់ ៖ ខ្សែស្តើងធ្វើឱ្យស្មៅមើលទៅស្រួច ។
    //   ឥឡូវខ្សែខ្លីជាង , ក្រាស់ជាង , ហើយស្រាលជាង 📃 ⟩
    for ( let i = 0; i < 0o200; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const longo = 0o2 + Math.random() * 0o6;
      const a = -Math.PI / 2 + ( Math.random() - 0o5/0o10 ) * 0o6/0o10;
      kunteksto.strokeStyle = rgbaKanaka(i % 0o4 ? 0x487038 : 0x889058,
        0o1/0o10 + Math.random() * 0o4/0o100);
      kunteksto.lineWidth = 0o1 + Math.random() * 0o1;
      kunteksto.beginPath();
      kunteksto.moveTo(x, y);
      kunteksto.quadraticCurveTo(x + ( Math.random() - 0o5/0o10 ) * 0o2, y - longo * 0o1/0o2,
        x + Math.cos(a) * longo, y + Math.sin(a) * longo);
      kunteksto.stroke();
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
});
