// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ʃⱷ̮̀ɔ˞ɔ˞ɜ ꞁȷ̀ꞇ ɭ(ᴜ ʞ ŋᷠᴜ 📃 ⧽≻

import * as THREE from "three";
import { kf2Sakxo } from "../caq2q.js";
import { k2fKonturanQoxan, kf2P2t6zoCac2sex, neregulaK6h6, p2somani } from "./mafezi.js";

export const kf2ByssoidanLikenanCac2sex = p2somani((): THREE.CanvasTexture => {
  const s = 0o200;
  return kf2P2t6zoCac2sex(s, s, ( kuns2bana ) => {
    kuns2bana.clearRect(0o0, 0o0, s, s);
    const sakxo = kf2Sakxo(0o5233);
    const cx = s / 0o2, cy = s / 0o2;
    const hakozonu = [ 0xc8d0b0, 0xd0d8b8, 0xb8c0a0, 0xd8e0c0 ];
    k2fKonturanQoxan(kuns2bana,
      neregulaK6h6(cx, cy, s * 0o16/0o100, 0o6, 0o2/0o10, sakxo() * Math.PI * 0o2),
      0x889878, s * 0o1/0o40, s * 0o1/0o100);
    const hatufo = 0o12;
    for ( let i = 0o0; i < hatufo; i++ ) {
      const a = ( i / hatufo + ( sakxo() - 0o5/0o10 ) * 0o2/0o10 ) * Math.PI * 0o2;
      const d = s * ( 0o15/0o100 + sakxo() * 0o6/0o100 );
      const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
      const r = s * ( 0o5/0o100 + sakxo() * 0o3/0o100 );
      k2fKonturanQoxan(kuns2bana,
        neregulaK6h6(x, y, r, 0o6, 0o15/0o100, sakxo() * Math.PI * 0o2),
        hakozonu[i % hakozonu.length], s * 0o1/0o60, s * 0o1/0o140);
    }
    const granetoj = 0o10;
    for ( let i = 0o0; i < granetoj; i++ ) {
      const a = sakxo() * Math.PI * 0o2;
      const d = s * sakxo() * 0o16/0o100;
      const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
      const r = s * ( 0o1/0o100 + sakxo() * 0o1/0o100 );
      const disko = new Path2D();
      disko.arc(x, y, r, 0o0, Math.PI * 0o2);
      k2fKonturanQoxan(kuns2bana, disko, 0xe0e0c8, s * 0o1/0o200, s * 0o1/0o400);
    }
  }, [ 0o1, 0o1 ], { g2b2: THREE.ClampToEdgeWrapping });
});
