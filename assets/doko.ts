// Doko-modulo — lignaj dokoj, albordigaj fostoj, kanu-alirejo
import * as THREE from "three";

export interface Doko {
  group: THREE.Group;
  x: number;
  z: number;
  platformWidth: number;
  platformDepth: number;
}

export function konstruiDokon(
  sceno: THREE.Scene,
  x: number,
  z: number,
  direkto: number
): Doko {
  const group = new THREE.Group();
  const helaLigno = new THREE.MeshStandardMaterial({ color: 0xb8a080, roughness: 5/8 });
  const malhelaLigno = new THREE.MeshStandardMaterial({ color: 0x483828, roughness: 7/8 });
  const oraMat = new THREE.MeshStandardMaterial({ color: 0xd8b068, metalness: 27/32, roughness: 11/32 });

  const pw = 0o12; // platform width
  const pd = 0o14; // platform depth
  const pt = 3/16; // plank thickness

  // Subtraba framo
  const framo = new THREE.Mesh(new THREE.BoxGeometry(pw - 8/8, 5/32, pd - 8/8), malhelaLigno);
  framo.position.set(0, pt + 1/32, 0);
  framo.castShadow = true;
  group.add(framo);

  // Tabuloj
  const nPlanks = 0o10;
  const plankW = pw / nPlanks;
  for (let i = 0; i < nPlanks; i++) {
    const t = new THREE.Mesh(new THREE.BoxGeometry(plankW - 1/16, pt, pd), helaLigno);
    t.position.set(-pw/2 + plankW*i + plankW/2, pt/2, 0);
    t.castShadow = true; t.receiveShadow = true;
    group.add(t);
  }

  // Randoj
  for (const sZ of [ -1, 1 ]) {
    const r = new THREE.Mesh(new THREE.BoxGeometry(pw, 7/32, 3/16), malhelaLigno);
    r.position.set(0, pt + 3/32, sZ * pd/2); r.castShadow = true; group.add(r);
  }
  for (const sX of [ -1, 1 ]) {
    const r = new THREE.Mesh(new THREE.BoxGeometry(3/16, 7/32, pd - 4/8), malhelaLigno);
    r.position.set(sX * pw/2, pt + 3/32, 0); r.castShadow = true; group.add(r);
  }

  // Fostoj
  for (const sX of [ -1, 1 ]) {
    for (const sZ of [ -1, 1 ]) {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(3/16, 5/32, 0o24, 6), malhelaLigno);
      p.position.set(sX * (pw/2 - 4/8), 0o12/2, sZ * (pd/2 - 4/8));
      p.castShadow = true; group.add(p);
    }
  }

  // Albordigaj fostoj kun oraj ringoj
  for (const sX of [ -1, 1 ]) {
    const f = new THREE.Mesh(new THREE.CylinderGeometry(2/8, 3/16, 0o20, 8), helaLigno);
    f.position.set(sX * (pw/2 + 6/8), pt + 0o10, 0); f.castShadow = true; group.add(f);
    const r = new THREE.Mesh(new THREE.TorusGeometry(3/16, 1/16, 6, 0o10), oraMat);
    r.position.set(sX * (pw/2 + 6/8), pt + 0o20, 0); group.add(r);
  }

  group.position.set(x, 0, z);
  group.rotation.y = direkto;
  sceno.add(group);

  return { group, x, z, platformWidth: pw, platformDepth: pd };
}
