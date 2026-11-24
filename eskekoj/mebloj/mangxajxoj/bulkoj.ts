// ≺⧼ ſᶘэ ſȷэ 🥟 ⧽≻
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { kf2SakxoKlasika } from "../../komunajxoj/hazardo.js";
import { ts6f6Cac2sex } from "../../komunajxoj/cac2sex/ts6f6-cac2sex.js";
import { caq2qCac2sex } from "../../komunajxoj/cac2sex/caq2q-cac2sex.js";
import { kox2qKek } from "./kunfando.js";
import { pukekon } from "./materialoj.js";
import type { MangxajxDatumo } from "./datumoj.js";
export function bunMesh(f: MangxajxDatumo): THREE.Group {
  const g = new THREE.Group();
  const karno = pukekon("karno:" + f.col,
    () => new THREE.MeshStandardMaterial({ color: f.col, roughness: 0o52/0o100, map: ts6f6Cac2sex() }));
  const korbo = pukekon("korbo",
    () => new THREE.MeshStandardMaterial({ color: 0xb89860, roughness: 0o63/0o100, map: caq2qCac2sex() }));
// ⟨ ſןᴜ ᶘɹ , 📃 ⟩
  const bulko = new THREE.Mesh(new THREE.SphereGeometry(0o13/0o100, 0o20, 0o12), karno);
  bulko.scale.set(1, 0o55/0o100, 1); bulko.position.y = 0o11/0o100;
  bulko.castShadow = true;
  g.add(bulko);
// ⟨ ſןᴜ ſɭᴜƴ , 📃 ⟩
  const faldaj = 0o10;
  for ( let i = 0; i < faldaj; i++ ) {
    const ang = i / faldaj * Math.PI * 2;
    const foldo = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o50, 0o3/0o100, 0o4/0o100, 4), karno);
    foldo.position.set(Math.sin(ang) * 0o11/0o100, 0o10/0o100, Math.cos(ang) * 0o11/0o100);
    foldo.rotation.y = ang;
    foldo.rotateX(-0o3/0o10);
    foldo.castShadow = true;
    g.add(foldo);
  }
  const pinto = new THREE.Mesh(new THREE.SphereGeometry(0o3/0o100, 0o10, 0o10), karno);
  pinto.position.y = 0o16/0o100;
  g.add(pinto);
// ⟨ ſɭɜ ᶗ‹ , 📃 ⟩
// ⟨ ſɭɜ ᶗ‹ , j͑ʃɜ ſɭ,ᴜ , 📃 ⟩
  const caq2qMalsuprenigxo = 0o1/0o100;
  const bovlo = new THREE.Mesh(new THREE.CylinderGeometry(0o17/0o100, 0o14/0o100, 0o6/0o100, 0o20, 1, true), korbo);
  bovlo.position.y = 0o4/0o100 - caq2qMalsuprenigxo;
  bovlo.castShadow = true;
  g.add(bovlo);
  const fundo = new THREE.Mesh(new THREE.CircleGeometry(0o14/0o100, 0o20), korbo);
  fundo.rotation.x = -Math.PI / 2; fundo.position.y = 0o2/0o100 - caq2qMalsuprenigxo;
  g.add(fundo);
  const rimo = new THREE.Mesh(new THREE.TorusGeometry(0o17/0o100, 0o1/0o100, 6, 0o20), korbo);
  rimo.rotation.x = Math.PI / 2; rimo.position.y = 0o7/0o100 - caq2qMalsuprenigxo;
  rimo.castShadow = true;
  g.add(rimo);
  const oro = pukekon("oro",
    () => new THREE.MeshStandardMaterial({ color: 0xd8b068, metalness: 0o3/0o4, roughness: 0o3/0o10 }));
  for ( const ang of [ 0, Math.PI * 2 / 3, Math.PI * 4 / 3 ] ) {
    const stango = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o100, 0o1/0o100, 0o6/0o100, 6), oro);
    stango.position.set(Math.sin(ang) * 0o16/0o100, 0o4/0o100 - caq2qMalsuprenigxo, Math.cos(ang) * 0o16/0o100);
    g.add(stango);
  }
// ⟪ ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , ꞙɭı , 📃 ⟫
  const hazardo = kf2SakxoKlasika(f.key.charCodeAt(0) * 0o1000 + f.key.charCodeAt(3) * 0o10);
  const pintoY = 0o11/0o100;
// ⟨ ſɭᴜ ſןᴜ , ſȷƽᴜ ʃɔ , ꞙɭɔ , 📃 ⟩
  const ts6f6Radiuso = 0o13/0o100, ts6f6Alto = 0o55/0o100;
  const surPinto = ( ang: number, levo: number ): [ number, number, number ] => {
    const rilatumo = Math.min(1, Math.abs(levo) / (ts6f6Radiuso * ts6f6Alto));
    const r = ts6f6Radiuso * Math.sqrt(1 - rilatumo * rilatumo);
    return [ Math.sin(ang) * r, pintoY + levo, Math.cos(ang) * r ];
  };
  if ( f.key === "fok0" ) {
    const f2ma = pukekon("f2ma",
      () => new THREE.MeshStandardMaterial({ color: 0xb4c0a0, roughness: 0o7/0o10 }));
// ⟨ ſɭэ ɭʃᴜ , 📃 ⟩
    for ( let i = 0; i < 6; i++ ) {
      const ang = hazardo() * Math.PI * 2, levo = 0o1/0o100 + hazardo() * 0o6/0o100;
      const makulo = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o100 + hazardo() * 0o4/0o100, 0o10, 6), f2ma);
      const [ sx, sy, sz ] = surPinto(ang, levo);
      makulo.position.set(sx, sy, sz);
      makulo.scale.set(1, 0o3/0o10, 0o7/0o10 + hazardo() * 0o5/0o10);
      makulo.rotation.y = hazardo() * Math.PI;
      g.add(makulo);
    }
    const faldo = new THREE.Mesh(new RoundedBoxGeometry(0o16/0o100, 0o1/0o100, 0o11/0o100, 2, 0o1/0o200), karno);
    faldo.position.set(0, pintoY + 0o13/0o100, 0);
    faldo.rotation.set(0, 0o4/0o10, 0o1/0o20);
    g.add(faldo);
  } else if ( f.key === "fok1" ) {
    const glazuro = pukekon("glazuro",
      () => new THREE.MeshStandardMaterial({
        color: 0xa8d8b0, roughness: 0o3/0o10, transparent: true, opacity: 0o55/0o100,
      }));
// ⟨ ſɭᴜ ſ͕ɭᴜ , ı],ᴜ ֭ſɭᴜ , 📃 ⟩
    const kovrilo = new THREE.Mesh(new THREE.SphereGeometry(0o14/0o100, 0o20, 0o10, 0, Math.PI * 2, 0, 0o15/0o10), glazuro);
    kovrilo.scale.set(1, 0o62/0o100, 1);
    kovrilo.position.y = pintoY + 0o2/0o100;
    g.add(kovrilo);
    const mento = pukekon("mento",
      () => new THREE.MeshStandardMaterial({ color: 0x507848, roughness: 0o6/0o10, side: THREE.DoubleSide }));
    const tigo = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o200, 0o1/0o200, 0o10/0o100, 5), mento);
// ⟨ ſɭэ ɭʃᴜ , ſɭᴜ ſ͕ɭᴜ , 📃 ⟩
    tigo.position.set(0, pintoY + 0o10/0o100, 0);
    tigo.rotation.z = 0o5/0o10;
    g.add(tigo);
    for ( let i = 0; i < 3; i++ ) {
      const slaf = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o50, 0o10, 6), mento);
      slaf.scale.set(0o6/0o10, 0o3/0o10, 1);
      slaf.position.set(i * 0o1/0o100 - 0o1/0o50, pintoY + 0o12/0o100 + i * 0o1/0o100, 0);
      slaf.rotation.z = 0o15/0o10 - i * 0o1/0o10;
      g.add(slaf);
    }
  } else if ( f.key === "fok2" ) {
    const pipro = pukekon("pipro",
      () => new THREE.MeshStandardMaterial({ color: 0x2a2018, roughness: 0o5/0o10 }));
// ⟨ ſ͕ɭɜ ı],ᴜ , ſןɔ˞ᴜƴ , 📃 ⟩
    for ( let i = 0; i < 0o50; i++ ) {
      const ang = hazardo() * Math.PI * 2, levo = 0o1/0o100 + hazardo() * 0o6/0o100;
      const grajno = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o200 + hazardo() * 0o1/0o100, 6, 4), pipro);
      const [ sx, sy, sz ] = surPinto(ang, levo);
      grajno.position.set(sx, sy, sz);
      g.add(grajno);
    }
    const mielo = pukekon("mielo",
      () => new THREE.MeshStandardMaterial({ color: 0xd8a040, roughness: 0o2/0o10, metalness: 0o1/0o10 }));
    const c2q = new THREE.Mesh(new THREE.TorusGeometry(0o7/0o100, 0o1/0o100, 6, 0o20).rotateX(Math.PI / 2), mielo);
    c2q.position.set(0, pintoY + 0o6/0o100, 0);
    g.add(c2q);
  }
// ⟨ ı],ᴜ ſɭɹ ꞇɔʊ , 📃 ⟩
  kox2qKek(g);
  return g;
}
