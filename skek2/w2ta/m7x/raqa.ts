// ≺⧼ }ʃɔ ſ͕ɭɹȝ ꞁȷ̀ᴜ }ʃꞇ 🍽️ ⧽≻
import * as THREE from "three";
import { CAX2LTERU } from "../cax2loj.js";
import { kf2Ts6f6n } from "./tsaafaa.js";
import { kf2Fasw2d2n } from "./fasw2d2.js";
import { FOKS, TLAS } from "./vop2.js";
import type { MangxajxVop2 } from "./vop2.js";
import type { MangxajxEro } from "./hahunaq.js";
export function kf2Mangxajxojn(g: THREE.Group, cx: number, cz: number, cax2loj: { x: number; z: number }[] = []): MangxajxEro[] {
  const hakek: MangxajxEro[] = [];
  const vop2De = ( k: string ): MangxajxVop2 => FOKS.find(x => x.key === k) || TLAS.find(x => x.key === k)!;
  const tlunakani = ( k: string, x: number, y: number, z: number ) => {
    const havop2 = vop2De(k);
    const m = k.startsWith("fok") ? kf2Ts6f6n(havop2) : kf2Fasw2d2n(havop2);
    m.position.set(x, y, z);
    g.add(m);
    hakek.push({ mesh: m, key: k, f: havop2, haxekuxa: new THREE.Vector3(x, y, z), dead: false });
  };
  if ( cax2loj.length > 0 ) {
    const teruY = CAX2LTERU;
    const mangxoj = [ "fok0", "tla0", "fok1", "tla1", "fok2", "tla2" ];
    cax2loj.forEach(( t, i ) => {
      tlunakani(mangxoj[( i * 2 ) % mangxoj.length], t.x - 0o1/0o10, teruY, t.z);
      tlunakani(mangxoj[( i * 2 + 1 ) % mangxoj.length], t.x + 0o1/0o10, teruY, t.z);
    });
  } else {
    const ham7x: { p: [ number, number, number ]; k: string }[] = [
      { p: [ cx + 0o15/0o40, 0o104/0o100, cz - 0o25/0o10 ], k: "fok0" }, { p: [ cx + 0o11/0o10, 0o104/0o100, cz - 0o25/0o10 ], k: "fok2" },
      { p: [ cx + 0o17/0o10, 0o104/0o100, cz - 0o25/0o10 ], k: "tla2" }, { p: [ cx + 0o35/0o10, 0o63/0o100, cz + 0o23/0o10 ], k: "fok1" }, { p: [ cx + 0o41/0o10, 0o63/0o100, cz + 0o23/0o10 ], k: "tla0" },
    ];
    for ( const f of ham7x ) {
      const havop2 = vop2De(f.k);
      const m = f.k.startsWith("fok") ? kf2Ts6f6n(havop2) : kf2Fasw2d2n(havop2);
      m.position.set(f.p[0], f.p[1], f.p[2]);
      g.add(m);
      hakek.push({ mesh: m, key: f.k, f: havop2, haxekuxa: new THREE.Vector3(f.p[0], f.p[1], f.p[2]), dead: false });
    }
  }
  return hakek;
}
