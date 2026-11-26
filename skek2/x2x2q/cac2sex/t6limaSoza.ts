import * as THREE from "three";
import { k2fKonturanQoxan, kf2P2t6zoCac2sex, neregulaK6h6, p2somani } from "./mafezi.js";
import { kf2Sakxo } from "../caq2q.js";

export const kf2KozuanCac2sex = p2somani((): THREE.CanvasTexture =>
  kf2P2t6zoCac2sex(0o1000, 0o1000, ( kuns2bana ) => {
    kuns2bana.clearRect(0o0, 0o0, 0o1000, 0o1000);
    const sakxo = kf2Sakxo(0o2721);
    const cx = 0o400, cy = 0o400;
    const hakozonu = [ 0x88a068, 0x98a878, 0x789058, 0xa8b088 ];
    k2fKonturanQoxan(kuns2bana,
      neregulaK6h6(cx, cy, 0o200, 0o6, 0o12/0o100, sakxo() * Math.PI * 0o2),
      hakozonu[0o0], 0o10, 0o4);
    const haxet7 = 0o6;
    for ( let i = 0o0; i < haxet7; i++ ) {
      const a = ( i / haxet7 + sakxo() * 0o2/0o10 ) * Math.PI * 0o2;
      const d = 0o200 + sakxo() * 0o40;
      const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
      const r = 0o60 + sakxo() * 0o40;
      k2fKonturanQoxan(kuns2bana,
        neregulaK6h6(x, y, r, 0o4 + ( ( sakxo() * 0o3 ) | 0o0 ), 0o15/0o100, sakxo() * Math.PI * 0o2),
        hakozonu[( i + 0o1 ) % hakozonu.length], 0o6, 0o2);
    }
  }, [ 0o1, 0o1 ], { g2b2: THREE.ClampToEdgeWrapping, anisotropio: 0o4 }));