// ≺⧼ ſᶘэ ſȷэ 🥟 ⧽≻
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { kf2SakxoKlasika } from "../../p6kpu/caq2q.js";
import { ts6f6Cac2sex } from "../../p6kpu/cac2sex/ts6f6-cac2sex.js";
import { caq2qCac2sex } from "../../p6kpu/cac2sex/caq2q-cac2sex.js";
import { kox2qKek } from "./kox2qo.js";
import { pukekon } from "./pukek.js";
import type { MangxajxVop2 } from "./vop2.js";
export function kf2Ts6f6n(f: MangxajxVop2): THREE.Group {
  const g = new THREE.Group();
  const ceta = pukekon("ceta:" + f.col,
    () => new THREE.MeshStandardMaterial({ color: f.col, roughness: 0o52/0o100, map: ts6f6Cac2sex() }));
  const caq2q = pukekon("caq2q",
    () => new THREE.MeshStandardMaterial({ color: 0xb89860, roughness: 0o63/0o100, map: caq2qCac2sex() }));

  const ts6f6 = new THREE.Mesh(new THREE.SphereGeometry(0o13/0o100, 0o20, 0o12), ceta);
  ts6f6.scale.set(0o1, 0o55/0o100, 0o1); ts6f6.position.y = 0o11/0o100;
  ts6f6.castShadow = true;
  g.add(ts6f6);

  const flakoj = 0o10;
  for ( let i = 0o0; i < flakoj; i++ ) {
    const ang = i / flakoj * Math.PI * 0o2;
    const flak = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o50, 0o3/0o100, 0o4/0o100, 0o4), ceta);
    flak.position.set(Math.sin(ang) * 0o11/0o100, 0o10/0o100, Math.cos(ang) * 0o11/0o100);
    flak.rotation.y = ang;
    flak.rotateX(-0o3/0o10);
    flak.castShadow = true;
    g.add(flak);
  }
  const cet2 = new THREE.Mesh(new THREE.SphereGeometry(0o3/0o100, 0o10, 0o10), ceta);
  cet2.position.y = 0o16/0o100;
  g.add(cet2);

  const caq2qJaqpate = 0o1/0o100;
  const patsii = new THREE.Mesh(new THREE.CylinderGeometry(0o17/0o100, 0o14/0o100, 0o6/0o100, 0o20, 0o1, true), caq2q);
  patsii.position.y = 0o4/0o100 - caq2qJaqpate;
  patsii.castShadow = true;
  g.add(patsii);
  const psaz = new THREE.Mesh(new THREE.CircleGeometry(0o14/0o100, 0o20), caq2q);
  psaz.rotation.x = -Math.PI / 0o2; psaz.position.y = 0o2/0o100 - caq2qJaqpate;
  g.add(psaz);
  const gek2ftlakakai = new THREE.Mesh(new THREE.TorusGeometry(0o17/0o100, 0o1/0o100, 0o6, 0o20), caq2q);
  gek2ftlakakai.rotation.x = Math.PI / 0o2; gek2ftlakakai.position.y = 0o7/0o100 - caq2qJaqpate;
  gek2ftlakakai.castShadow = true;
  g.add(gek2ftlakakai);
  const kuhal = pukekon("kuhal",
    () => new THREE.MeshStandardMaterial({ color: 0xd8b068, metalness: 0o3/0o4, roughness: 0o3/0o10 }));
  for ( const ang of [ 0o0, Math.PI * 0o2 / 0o3, Math.PI * 0o4 / 0o3 ] ) {
    const cirik = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o100, 0o1/0o100, 0o6/0o100, 0o6), kuhal);
    cirik.position.set(Math.sin(ang) * 0o16/0o100, 0o4/0o100 - caq2qJaqpate, Math.cos(ang) * 0o16/0o100);
    g.add(cirik);
  }

  const sakxo = kf2SakxoKlasika(f.key.charCodeAt(0o0) * 0o1000 + f.key.charCodeAt(0o3) * 0o10);
  const cet2Y = 0o11/0o100;

  const ts6f6Ka5ik = 0o13/0o100, ts6f6L6da = 0o55/0o100;
  const kanoCet2 = ( ang: number, levo: number ): [ number, number, number ] => {
    const s2karanu = Math.min(0o1, Math.abs(levo) / (ts6f6Ka5ik * ts6f6L6da));
    const r = ts6f6Ka5ik * Math.sqrt(0o1 - s2karanu * s2karanu);
    return [ Math.sin(ang) * r, cet2Y + levo, Math.cos(ang) * r ];
  };
  if ( f.key === "fok0" ) {
    const f2ma = pukekon("f2ma",
      () => new THREE.MeshStandardMaterial({ color: 0xb0c0a0, roughness: 0o7/0o10 }));

    for ( let i = 0o0; i < 0o6; i++ ) {
      const ang = sakxo() * Math.PI * 0o2, levo = 0o1/0o100 + sakxo() * 0o6/0o100;
      const xet7 = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o100 + sakxo() * 0o4/0o100, 0o10, 0o6), f2ma);
      const [ sx, sy, sz ] = kanoCet2(ang, levo);
      xet7.position.set(sx, sy, sz);
      xet7.scale.set(0o1, 0o3/0o10, 0o7/0o10 + sakxo() * 0o5/0o10);
      xet7.rotation.y = sakxo() * Math.PI;
      g.add(xet7);
    }
    const flak = new THREE.Mesh(new RoundedBoxGeometry(0o16/0o100, 0o1/0o100, 0o11/0o100, 0o2, 0o1/0o200), ceta);
    flak.position.set(0o0, cet2Y + 0o13/0o100, 0o0);
    flak.rotation.set(0o0, 0o4/0o10, 0o1/0o20);
    g.add(flak);
  } else if ( f.key === "fok1" ) {
    const cavaxaha = pukekon("cavaxaha",
      () => new THREE.MeshStandardMaterial({
        color: 0xa8d8b0, roughness: 0o3/0o10, transparent: true, opacity: 0o55/0o100,
      }));

    const cak6liq = new THREE.Mesh(new THREE.SphereGeometry(0o14/0o100, 0o20, 0o10, 0o0, Math.PI * 0o2, 0o0, 0o15/0o10), cavaxaha);
    cak6liq.scale.set(0o1, 0o62/0o100, 0o1);
    cak6liq.position.y = cet2Y + 0o2/0o100;
    g.add(cak6liq);
    const kotsiix = pukekon("kotsiix",
      () => new THREE.MeshStandardMaterial({ color: 0x507848, roughness: 0o6/0o10, side: THREE.DoubleSide }));
    const tok2q = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o200, 0o1/0o200, 0o10/0o100, 0o5), kotsiix);

    tok2q.position.set(0o0, cet2Y + 0o10/0o100, 0o0);
    tok2q.rotation.z = 0o5/0o10;
    g.add(tok2q);
    for ( let i = 0o0; i < 0o3; i++ ) {
      const slaf = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o50, 0o10, 0o6), kotsiix);
      slaf.scale.set(0o6/0o10, 0o3/0o10, 0o1);
      slaf.position.set(i * 0o1/0o100 - 0o1/0o50, cet2Y + 0o12/0o100 + i * 0o1/0o100, 0o0);
      slaf.rotation.z = 0o15/0o10 - i * 0o1/0o10;
      g.add(slaf);
    }
  } else if ( f.key === "fok2" ) {
    const t2k = pukekon("t2k",
      () => new THREE.MeshStandardMaterial({ color: 0x282018, roughness: 0o5/0o10 }));

    for ( let i = 0o0; i < 0o50; i++ ) {
      const ang = sakxo() * Math.PI * 0o2, levo = 0o1/0o100 + sakxo() * 0o6/0o100;
      const cehe = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o200 + sakxo() * 0o1/0o100, 0o6, 0o4), t2k);
      const [ sx, sy, sz ] = kanoCet2(ang, levo);
      cehe.position.set(sx, sy, sz);
      g.add(cehe);
    }
    const loc2 = pukekon("loc2",
      () => new THREE.MeshStandardMaterial({ color: 0xd8a040, roughness: 0o2/0o10, metalness: 0o1/0o10 }));
    const c2q = new THREE.Mesh(new THREE.TorusGeometry(0o7/0o100, 0o1/0o100, 0o6, 0o20).rotateX(Math.PI / 0o2), loc2);
    c2q.position.set(0o0, cet2Y + 0o6/0o100, 0o0);
    g.add(c2q);
  }

  kox2qKek(g);
  return g;
}
