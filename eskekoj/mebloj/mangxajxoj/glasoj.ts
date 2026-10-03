// ≺⧼ កែវ 🥛 ⧽≻
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { kreiKlasikanHazardon } from "../../komunajxoj/hazardo.js";
import { vitraTeksajxon } from "../../komunajxoj/teksajxoj/vitra-teksajxo.js";
import { citrusaTeksajxon } from "../../komunajxoj/teksajxoj/citrusa-teksajxo.js";
import { kunfandiPartojn } from "./kunfando.js";
import { materialon } from "./materialoj.js";
import type { MangxajxDatumo } from "./datumoj.js";
export function glassMesh(f: MangxajxDatumo): THREE.Group {
  const g = new THREE.Group();
  const subteno = 0o1/0o100;
  const vitro = materialon("vitro", () => new THREE.MeshStandardMaterial({
    color: 0xe0f0e8, transparent: true, opacity: 0o26 / 0o100, roughness: 0o6/0o100,
    depthWrite: false, side: THREE.DoubleSide, map: vitraTeksajxon(),
  }));
  // ⟨ ប្រវែងកាត់កែវ 📃 ⟩
  const profilo = [
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
  const glaso = new THREE.Mesh(new THREE.LatheGeometry(profilo, 0o24), vitro);
  glaso.position.y = subteno;
  g.add(glaso);
  // ⟨ ភេសជ្ជៈ 📃 ⟩
  const likvaMat = materialon("likvo:" + f.col, () => new THREE.MeshStandardMaterial({ color: f.col, transparent: true, opacity: 0o64 / 0o100, roughness: 0o5/0o20, depthWrite: false }));
  const likvo = new THREE.Mesh(new THREE.CylinderGeometry(0o45/0o1000, 0o45/0o1000, 0o10/0o100, 0o20), likvaMat);
  likvo.position.y = subteno + 0o5/0o100;
  g.add(likvo);
  const surfaco = new THREE.Mesh(new THREE.CircleGeometry(0o45/0o1000, 0o20), materialon("surfaco:" + f.col,
    () => new THREE.MeshStandardMaterial({ color: f.col, roughness: 0o2/0o10, transparent: true, opacity: 0o63/0o100 })));
  // ⟨ ផ្ទៃឈរលើវត្ថុរាវ 📃 ⟩
  surfaco.rotation.x = -Math.PI / 2; surfaco.position.y = subteno + 0o5/0o100 + 0o10/0o200 + 0o1/0o200;
  g.add(surfaco);
  const menisko = new THREE.Mesh(new THREE.TorusGeometry(0o44/0o1000, 0o1/0o100, 5, 0o20), materialon("menisko",
    () => new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0o2/0o10, transparent: true, opacity: 0o45/0o100 })));
  menisko.rotation.x = Math.PI / 2; menisko.position.y = subteno + 0o5/0o100 + 0o10/0o200 + 0o1/0o200;
  g.add(menisko);
  if ( f.key !== "tla2" ) {
    const citrono = new THREE.Mesh(new THREE.CylinderGeometry(0o5/0o100, 0o5/0o100, 0o1/0o40, 0o12, 1, false, 0, Math.PI), materialon("citrono",
      () => new THREE.MeshStandardMaterial({ color: 0xe0c060, roughness: 0o45/0o100, map: citrusaTeksajxon(), side: THREE.DoubleSide })));
    citrono.position.set(0o2/0o100, subteno + 0o15/0o100, -0o4/0o100);
    citrono.rotation.set(0o14/0o10, 0, 0o1/0o10);
    g.add(citrono);
  }
  // ⟨ កន្លែងវានៅ 📃 ⟩
  if ( f.key !== "tla2" ) {
    const mento = materialon("mento",
      () => new THREE.MeshStandardMaterial({ color: 0x507848, roughness: 0o6/0o10, side: THREE.DoubleSide }));
    const mentaBazo = f.key === "tla1" ? subteno + 0o6/0o100 : subteno + 0o14/0o100;
    const tigo = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o200, 0o1/0o200, 0o12/0o100, 5), mento);
    tigo.position.set(0o4/0o100, mentaBazo, 0o2/0o100);
    tigo.rotation.z = 0o4/0o10;
    g.add(tigo);
    for ( let i = 0; i < 3; i++ ) {
      const folio = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o50, 8, 6), mento);
      folio.scale.set(0o6/0o10, 0o3/0o10, 1);
      folio.position.set(0o4/0o100 + i * 0o1/0o100 - 0o1/0o50, mentaBazo + 0o2/0o100 + i * 0o1/0o100, 0o2/0o100);
      folio.rotation.z = 0o15/0o10 - i * 0o1/0o10;
      g.add(folio);
    }
  }
  // ⟪ វ៉ារ្យ៉ង់តាមការពិពណ៌នា 📃 ⟫
  const hazardo = kreiKlasikanHazardon(f.key.charCodeAt(0) * 0o1000 + f.key.charCodeAt(3) * 0o100 + 7);
  if ( f.key === "tla0" ) {
    const fajrero = materialon("fajrero",
      () => new THREE.MeshStandardMaterial({
        color: 0xf8ffff, roughness: 0o1/0o10, metalness: 0o3/0o10, emissive: 0x88a8a0, emissiveIntensity: 0o3/0o10,
      }));
    for ( let i = 0; i < 0o12; i++ ) {
      const ang = hazardo() * Math.PI * 2, r = hazardo() * 0o5/0o100;
      const bobelo = new THREE.Mesh(new THREE.SphereGeometry(0o2/0o100 + hazardo() * 0o2/0o100, 6, 5), fajrero);
      bobelo.position.set(Math.sin(ang) * r, subteno + 0o3/0o100 + hazardo() * 0o6/0o100, Math.cos(ang) * r);
      g.add(bobelo);
    }
  } else if ( f.key === "tla1" ) {
    const mielo = materialon("mielo",
      () => new THREE.MeshStandardMaterial({ color: 0xd8a040, roughness: 0o2/0o10, metalness: 0o1/0o10 }));
    // ⟨ ស្រទាប់ទឹកឃ្មុំ លើអាស៊ីត 📃 ⟩
    const tavolo = new THREE.Mesh(new THREE.CylinderGeometry(0o44/0o1000, 0o43/0o1000, 0o4/0o100, 0o20), mielo);
    tavolo.position.y = subteno + 0o7/0o100;
    g.add(tavolo);
    const guto = new THREE.Mesh(new THREE.SphereGeometry(0o2/0o100, 8, 6), mielo);
    guto.scale.set(1, 0o16/0o10, 1);
    guto.position.set(-0o7/0o100, subteno + 0o16/0o100, 0o3/0o100);
    g.add(guto);
  } else if ( f.key === "tla2" ) {
    const glacio = materialon("glacio",
      () => new THREE.MeshStandardMaterial({
        color: 0xd8eef2, roughness: 0o1/0o10, transparent: true, opacity: 0o6/0o10, depthWrite: false,
      }));
    // ⟨ ដុំទឹកកក 📃 ⟩
    for ( let i = 0; i < 3; i++ ) {
      const ang = i / 3 * Math.PI * 2 + hazardo();
      const peco = new THREE.Mesh(new RoundedBoxGeometry(0o5/0o100, 0o5/0o100, 0o5/0o100, 2, 0o1/0o100), glacio);
      peco.position.set(Math.sin(ang) * 0o3/0o100, subteno + 0o6/0o100 + hazardo() * 0o5/0o100, Math.cos(ang) * 0o3/0o100);
      peco.rotation.set(hazardo() * 0o4/0o10, ang, hazardo() * 0o4/0o10);
      g.add(peco);
    }
    const frosto = materialon("frosto",
      () => new THREE.MeshStandardMaterial({ color: 0xe8f4f8, roughness: 0o2/0o10, transparent: true, opacity: 0o5/0o10, depthWrite: false }));
    const kolumo = new THREE.Mesh(new THREE.TorusGeometry(0o6/0o100, 0o3/0o100, 8, 0o20).rotateX(Math.PI / 2), frosto);
    kolumo.position.y = subteno + 0o12/0o100;
    g.add(kolumo);
  }
  const korko = new THREE.Mesh(new THREE.CylinderGeometry(0o7/0o100, 0o7/0o100, 0o1/0o100, 0o20), materialon("korko",
    () => new THREE.MeshStandardMaterial({ color: 0x4a3524, roughness: 0o7/0o10 })));
  korko.position.y = 0o1/0o200;
  g.add(korko);
  // ⟨ ការរលាយ 📃 ⟩
  kunfandiPartojn(g);
  return g;
}
