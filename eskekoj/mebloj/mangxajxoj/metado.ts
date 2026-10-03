// ≺⧼ ការដាក់អាហារ 🍽️ ⧽≻
import * as THREE from "three";
import { TABLA_SUPRO } from "../tabloj.js";
import { bunMesh } from "./bulkoj.js";
import { glassMesh } from "./glasoj.js";
import { FOKS, TLAS } from "./datumoj.js";
import type { MangxajxDatumo } from "./datumoj.js";
import type { MangxajxItemo } from "./tipoj.js";
export function kreiMangxajxojn(g: THREE.Group, cx: number, cz: number, tabloj: { x: number; z: number }[] = []): MangxajxItemo[] {
  const items: MangxajxItemo[] = [];
  const metaDe = ( k: string ): MangxajxDatumo => FOKS.find(x => x.key === k) || TLAS.find(x => x.key === k)!;
  const aldoni = ( k: string, x: number, y: number, z: number ) => {
    const meta = metaDe(k);
    const m = k.startsWith("fok") ? bunMesh(meta) : glassMesh(meta);
    m.position.set(x, y, z);
    g.add(m);
    items.push({ mesh: m, key: k, f: meta, pos: new THREE.Vector3(x, y, z), dead: false });
  };
  if ( tabloj.length > 0 ) {
    const suproY = TABLA_SUPRO;
    const mangxoj = [ "fok0", "tla0", "fok1", "tla1", "fok2", "tla2" ];
    tabloj.forEach(( t, i ) => {
      aldoni(mangxoj[( i * 2 ) % mangxoj.length], t.x - 0o1/0o10, suproY, t.z);
      aldoni(mangxoj[( i * 2 + 1 ) % mangxoj.length], t.x + 0o1/0o10, suproY, t.z);
    });
  } else {
    const foods: { p: [ number, number, number ]; k: string }[] = [
      { p: [ cx + 0o15/0o40, 0o104/0o100, cz - 0o25/0o10 ], k: "fok0" }, { p: [ cx + 0o11/0o10, 0o104/0o100, cz - 0o25/0o10 ], k: "fok2" },
      { p: [ cx + 0o17/0o10, 0o104/0o100, cz - 0o25/0o10 ], k: "tla2" }, { p: [ cx + 0o35/0o10, 0o63/0o100, cz + 0o23/0o10 ], k: "fok1" }, { p: [ cx + 0o41/0o10, 0o63/0o100, cz + 0o23/0o10 ], k: "tla0" },
    ];
    for ( const f of foods ) {
      const meta = metaDe(f.k);
      const m = f.k.startsWith("fok") ? bunMesh(meta) : glassMesh(meta);
      m.position.set(f.p[0], f.p[1], f.p[2]);
      g.add(m);
      items.push({ mesh: m, key: f.k, f: meta, pos: new THREE.Vector3(f.p[0], f.p[1], f.p[2]), dead: false });
    }
  }
  return items;
}
