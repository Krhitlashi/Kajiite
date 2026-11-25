// ≺⧼ ſȷɹ ŋᷠᴜ j͑ʃᴜꞇ ʌ ſȷɜ j͐ʃꞇ j͑ʃᴜ j͑ʃᴜꞇ ʌ j͐ʃƽɜ }ʃꞇ 🍃 ⧽≻
import * as THREE from "three";
import { kf2Sakxo } from "../caq2q.js";
import { k2fKonturanQoxan, kf2P2t6zoCac2sex, neregulaK6h6, p2somani } from "./mafezi.js";

export const kf2FolisanLikenanCac2sex = p2somani((): THREE.CanvasTexture => {
  const s = 0o200;
  return kf2P2t6zoCac2sex(s, s, ( kuns2bana ) => {
    kuns2bana.clearRect(0o0, 0o0, s, s);
    const sakxo = kf2Sakxo(0o5232);
    const cx = s / 0o2, cy = s / 0o2;
    const hakozonu = [ 0xb0c098, 0xb8c8a8, 0xc8d0b0, 0x98b088 ];
    k2fKonturanQoxan(kuns2bana,
      neregulaK6h6(cx, cy, s * 0o16/0o100, 0o7, 0o25/0o100, sakxo() * Math.PI * 0o2),
      0x98b088, s * 0o1/0o40, s * 0o1/0o100);
    const hal6ksabosai = 0o16;
    for ( let i = 0o0; i < hal6ksabosai; i++ ) {
      const a = ( i / hal6ksabosai + ( sakxo() - 0o5/0o10 ) * 0o1/0o10 ) * Math.PI * 0o2;
      const d = s * ( 0o12/0o100 + sakxo() * 0o5/0o100 );
      const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
      const r = s * ( 0o4/0o100 + sakxo() * 0o3/0o100 );
      k2fKonturanQoxan(kuns2bana,
        neregulaK6h6(x, y, r, 0o5, 0o3/0o10, sakxo() * Math.PI * 0o2),
        hakozonu[i % hakozonu.length], s * 0o1/0o60, s * 0o1/0o140);
    }
    const apotecioj = 0o7;
    for ( let i = 0o0; i < apotecioj; i++ ) {
      const a = sakxo() * Math.PI * 0o2;
      const d = s * sakxo() * 0o12/0o100;
      const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
      const r = s * ( 0o15/0o1000 + sakxo() * 0o1/0o100 );
      const disko = new Path2D();
      disko.arc(x, y, r, 0o0, Math.PI * 0o2);
      k2fKonturanQoxan(kuns2bana, disko, 0xb87858, s * 0o1/0o140, s * 0o1/0o200);
    }
  }, [ 0o1, 0o1 ], { g2b2: THREE.ClampToEdgeWrapping });
});
