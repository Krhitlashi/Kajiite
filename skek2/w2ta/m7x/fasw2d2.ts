// ≺⧼ ſȷᴜɔ˞ ᶅſɹ ɭ(ɹ 🥛 ⧽≻
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { kf2SakxoKlasika } from "../../x2x2q/caq2q.js";
import { fasw2d2Cac2sex } from "../../x2x2q/cac2sex/fasw2d2-cac2sex.js";
import { kzusaqCac2sex } from "../../x2x2q/cac2sex/kzusaq-cac2sex.js";
import { kox2qKek } from "./kox2qo.js";
import { pukekon } from "./pukek.js";
import type { MangxajxVop2 } from "./vop2.js";
export function kf2Fasw2d2n(f: MangxajxVop2): THREE.Group {
  const g = new THREE.Group();
  const ph2la = 0o1/0o100;
  const fasw2d2Pukek = pukekon("fasw2d2Pukek", () => new THREE.MeshStandardMaterial({
    color: 0xe0f0e8, transparent: true, opacity: 0o26 / 0o100, roughness: 0o6/0o100,
    depthWrite: false, side: THREE.DoubleSide, map: fasw2d2Cac2sex(),
  }));
// ⟨ ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , 📃 ⟩
  const s2qena = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0o6/0o100, 0),
    new THREE.Vector2(0o6/0o100, 0o1/0o100),
    new THREE.Vector2(0o5/0o100, 0o10/0o100),
    new THREE.Vector2(0o6/0o100, 0o14/0o100),
    new THREE.Vector2(0o7/0o100, 0o16/0o100),
    new THREE.Vector2(0o5/0o100, 0o15/0o100),
    new THREE.Vector2(0o5/0o100, 0o1/0o100),
    new THREE.Vector2(0, 0o1/0o100),
  ];
  const glaso = new THREE.Mesh(new THREE.LatheGeometry(s2qena, 0o24), fasw2d2Pukek);
  glaso.position.y = ph2la;
  g.add(glaso);
// ⟨ ſᶘᴜ j͑ʃᴜ , 📃 ⟩
  const kx2Pukek = pukekon("kx2:" + f.col, () => new THREE.MeshStandardMaterial({ color: f.col, transparent: true, opacity: 0o64 / 0o100, roughness: 0o5/0o20, depthWrite: false }));
  const kx2 = new THREE.Mesh(new THREE.CylinderGeometry(0o45/0o1000, 0o45/0o1000, 0o10/0o100, 0o20), kx2Pukek);
  kx2.position.y = ph2la + 0o5/0o100;
  g.add(kx2);
  const kx2c6 = new THREE.Mesh(new THREE.CircleGeometry(0o45/0o1000, 0o20), pukekon("soza:" + f.col,
    () => new THREE.MeshStandardMaterial({ color: f.col, roughness: 0o2/0o10, transparent: true, opacity: 0o63/0o100 })));
// ⟨ ſᶘᴜ j͑ʃᴜ , j͑ʃᴜ ſɭ,w , 📃 ⟩
  kx2c6.rotation.x = -Math.PI / 2; kx2c6.position.y = ph2la + 0o5/0o100 + 0o10/0o200 + 0o1/0o200;
  g.add(kx2c6);
  const menisko = new THREE.Mesh(new THREE.TorusGeometry(0o44/0o1000, 0o1/0o100, 5, 0o20), pukekon("menisko",
    () => new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0o2/0o10, transparent: true, opacity: 0o45/0o100 })));
  menisko.rotation.x = Math.PI / 2; menisko.position.y = ph2la + 0o5/0o100 + 0o10/0o200 + 0o1/0o200;
  g.add(menisko);
  if ( f.key !== "tla2" ) {
    const chej2c2wa = new THREE.Mesh(new THREE.CylinderGeometry(0o5/0o100, 0o5/0o100, 0o1/0o40, 0o12, 1, false, 0, Math.PI), pukekon("chej2c2wa",
      () => new THREE.MeshStandardMaterial({ color: 0xe0c060, roughness: 0o45/0o100, map: kzusaqCac2sex(), side: THREE.DoubleSide })));
    chej2c2wa.position.set(0o2/0o100, ph2la + 0o15/0o100, -0o4/0o100);
    chej2c2wa.rotation.set(0o14/0o10, 0, 0o1/0o10);
    g.add(chej2c2wa);
  }
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
  if ( f.key !== "tla2" ) {
    const kotsiix = pukekon("kotsiix",
      () => new THREE.MeshStandardMaterial({ color: 0x507848, roughness: 0o6/0o10, side: THREE.DoubleSide }));
    const kotsiixKozunu = f.key === "tla1" ? ph2la + 0o6/0o100 : ph2la + 0o14/0o100;
    const tok2q = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o200, 0o1/0o200, 0o12/0o100, 5), kotsiix);
    tok2q.position.set(0o4/0o100, kotsiixKozunu, 0o2/0o100);
    tok2q.rotation.z = 0o4/0o10;
    g.add(tok2q);
    for ( let i = 0; i < 3; i++ ) {
      const slaf = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o50, 0o10, 6), kotsiix);
      slaf.scale.set(0o6/0o10, 0o3/0o10, 1);
      slaf.position.set(0o4/0o100 + i * 0o1/0o100 - 0o1/0o50, kotsiixKozunu + 0o2/0o100 + i * 0o1/0o100, 0o2/0o100);
      slaf.rotation.z = 0o15/0o10 - i * 0o1/0o10;
      g.add(slaf);
    }
  }
// ⟪ ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , ꞙɭı , 📃 ⟫
  const sakxo = kf2SakxoKlasika(f.key.charCodeAt(0) * 0o1000 + f.key.charCodeAt(3) * 0o100 + 7);
  if ( f.key === "tla0" ) {
    const dci = pukekon("dci",
      () => new THREE.MeshStandardMaterial({
        color: 0xf8ffff, roughness: 0o1/0o10, metalness: 0o3/0o10, emissive: 0x88a8a0, emissiveIntensity: 0o3/0o10,
      }));
    for ( let i = 0; i < 0o12; i++ ) {
      const ang = sakxo() * Math.PI * 2, r = sakxo() * 0o5/0o100;
      const bop2 = new THREE.Mesh(new THREE.SphereGeometry(0o2/0o100 + sakxo() * 0o2/0o100, 6, 5), dci);
      bop2.position.set(Math.sin(ang) * r, ph2la + 0o3/0o100 + sakxo() * 0o6/0o100, Math.cos(ang) * r);
      g.add(bop2);
    }
  } else if ( f.key === "tla1" ) {
    const loc2 = pukekon("loc2",
      () => new THREE.MeshStandardMaterial({ color: 0xd8a040, roughness: 0o2/0o10, metalness: 0o1/0o10 }));
// ⟨ ſᶘᴜ j͑ʃᴜ , ſɟɹ ɭʃᴜ , 📃 ⟩
    const tanek = new THREE.Mesh(new THREE.CylinderGeometry(0o44/0o1000, 0o43/0o1000, 0o4/0o100, 0o20), loc2);
    tanek.position.y = ph2la + 0o7/0o100;
    g.add(tanek);
    const fu36 = new THREE.Mesh(new THREE.SphereGeometry(0o2/0o100, 0o10, 6), loc2);
    fu36.scale.set(1, 0o16/0o10, 1);
    fu36.position.set(-0o7/0o100, ph2la + 0o16/0o100, 0o3/0o100);
    g.add(fu36);
  } else if ( f.key === "tla2" ) {
    const kzi3a = pukekon("kzi3a",
      () => new THREE.MeshStandardMaterial({
        color: 0xd8eef2, roughness: 0o1/0o10, transparent: true, opacity: 0o6/0o10, depthWrite: false,
      }));
// ⟨ ſᶘᴜ j͑ʃᴜ , ſןɔ˞ᴜƴ , 📃 ⟩
    for ( let i = 0; i < 3; i++ ) {
      const ang = i / 3 * Math.PI * 2 + sakxo();
      const kek = new THREE.Mesh(new RoundedBoxGeometry(0o5/0o100, 0o5/0o100, 0o5/0o100, 2, 0o1/0o100), kzi3a);
      kek.position.set(Math.sin(ang) * 0o3/0o100, ph2la + 0o6/0o100 + sakxo() * 0o5/0o100, Math.cos(ang) * 0o3/0o100);
      kek.rotation.set(sakxo() * 0o4/0o10, ang, sakxo() * 0o4/0o10);
      g.add(kek);
    }
    const c2c2s = pukekon("c2c2s",
      () => new THREE.MeshStandardMaterial({ color: 0xe8f4f8, roughness: 0o2/0o10, transparent: true, opacity: 0o5/0o10, depthWrite: false }));
    const lazKtop2te = new THREE.Mesh(new THREE.TorusGeometry(0o6/0o100, 0o3/0o100, 0o10, 0o20).rotateX(Math.PI / 2), c2c2s);
    lazKtop2te.position.y = ph2la + 0o12/0o100;
    g.add(lazKtop2te);
  }
  const vaku3a = new THREE.Mesh(new THREE.CylinderGeometry(0o7/0o100, 0o7/0o100, 0o1/0o100, 0o20), pukekon("vaku3a",
    () => new THREE.MeshStandardMaterial({ color: 0x4a3524, roughness: 0o7/0o10 })));
  vaku3a.position.y = 0o1/0o200;
  g.add(vaku3a);
// ⟨ ı],ᴜ ſɭɹ ꞇɔʊ , 📃 ⟩
  kox2qKek(g);
  return g;
}
