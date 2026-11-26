// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ʃэ ɭʃɔ ŋᷠɹ ſɭᴜ j͑ʃɹ ſɭᴜ }ʃƨᴜ 📃 ⧽≻

import * as THREE from "three";
import { vakox2qQoxaKefoujn } from "../p6kpu/hakox2q.js";

export interface S2tani {
  group: THREE.Group;
  x: number;
  z: number;
  c2w2q: number;
  phase: number;
  vx: number;
  vz: number;
  kozunuY: number;
}

export function kf2S2tani(qena: THREE.Scene,
  x: number,
  z: number,
  c2w2q: number,
  oraPukek: THREE.MeshStandardMaterial,
  kozunuY: number = 0o0,
  haxe: "kozunu" | "satala" = "kozunu"
): S2tani {
  const group = new THREE.Group();
  const satala = haxe === "satala";

  const shape = new THREE.Shape();
  shape.moveTo(-0o223/0o100, 0o0);
  shape.bezierCurveTo(-0o14/0o10, 0o41/0o100, 0o14/0o10, 0o41/0o100, 0o223/0o100, 0o0);
  shape.bezierCurveTo(0o14/0o10, -0o41/0o100, -0o14/0o10, -0o41/0o100, -0o223/0o100, 0o0);

  const karenaVecax2l = new THREE.ExtrudeGeometry(shape, {
    depth: 0o4/0o10,
    bevelEnabled: true,
    bevelThickness: 0o1/0o20,
    bevelSize: 0o1/0o20,
    bevelSegments: 0o2,
    curveSegments: 0o22,
  });
  karenaVecax2l.rotateX(-Math.PI / 0o2);

  const karenaPukek = new THREE.MeshStandardMaterial({ color: satala ? 0x183830 : 0xc8b890, roughness: 0o6/0o10 });
  const kareno = new THREE.Mesh(karenaVecax2l, karenaPukek);
  kareno.castShadow = true;
  group.add(kareno);

  if ( satala ) {
    const pukazQoxa = shape.clone();
    const truo = new THREE.Path();
    truo.setFromPoints(shape.getPoints(0o22).map(p => new THREE.Vector2(p.x * 0o72/0o100, p.y * 0o72/0o100)).reverse());
    pukazQoxa.holes.push(truo);
    const pukazGeo = new THREE.ExtrudeGeometry(pukazQoxa, {
      depth: 0o1/0o10,
      bevelEnabled: false,
      curveSegments: 0o22,
    });
    pukazGeo.scale(0o102/0o100, 0o102/0o100, 0o102/0o100);
    pukazGeo.rotateX(-Math.PI / 0o2);
    const pukaz = new THREE.Mesh(pukazGeo, oraPukek);
    pukaz.position.y = 0o7/0o20;
    group.add(pukaz);
  }

  const internaVecax2l = karenaVecax2l.clone();
  const c2h2 = new THREE.Mesh(internaVecax2l, new THREE.MeshStandardMaterial({ color: satala ? 0x081810 : 0x584028, roughness: 0o75/0o100 }));
  c2h2.scale.set(0o67/0o100, 0o7/0o10, 0o67/0o100);
  c2h2.position.y = 0o1/0o40;
  group.add(c2h2);

  const lignaPukek = new THREE.MeshStandardMaterial({ color: satala ? 0xd8b068 : 0x483828, roughness: 0o33/0o40 });
  for ( const tx of [ -0o6/0o10, 0o6/0o10 ] ) {
    const xaq = new THREE.Mesh(new THREE.BoxGeometry(0o11/0o100, 0o1/0o20, 0o7/0o10), lignaPukek);
    xaq.position.set(tx, 0o11/0o20, 0o0);
    xaq.castShadow = true;
    group.add(xaq);
  }

  if ( satala ) {
    for ( const s of [ 0o1, -0o1 ] ) {
      const finialo = new THREE.Mesh(new THREE.OctahedronGeometry(0o7/0o100, 0o0), oraPukek);
      finialo.scale.set(0o2, 0o1, 0o1);
      finialo.position.set(s * 0o21/0o10, 0o41/0o100, 0o0);
      group.add(finialo);
    }
  } else {
    const t1 = new THREE.Mesh(new THREE.ConeGeometry(0o5/0o100, 0o23/0o100, 0o6), oraPukek);
    t1.rotation.z = -Math.PI / 0o2;
    t1.position.set(0o23/0o10, 0o37/0o100, 0o0);
    group.add(t1);

    const t2 = new THREE.Mesh(new THREE.ConeGeometry(0o5/0o100, 0o23/0o100, 0o6), oraPukek);
    t2.rotation.z = Math.PI / 0o2;
    t2.position.set(-0o23/0o10, 0o37/0o100, 0o0);
    group.add(t2);
  }

  const cakuk = new THREE.CylinderGeometry(0o1/0o100, 0o1/0o100, 0o14/0o10, 0o6);
  const kxa = new THREE.BoxGeometry(0o5/0o40, 0o1/0o100, 0o27/0o100);
  kxa.translate(0o0, -0o33/0o40, 0o0);

  const pagajilaVecax2l = vakox2qQoxaKefoujn([ cakuk, kxa ]);
  const pagajilo = new THREE.Mesh(pagajilaVecax2l,
    new THREE.MeshStandardMaterial({ color: 0x785838, roughness: 0o63/0o100 }));
  pagajilo.rotation.set(0o5/0o40, 0o2/0o10, 0o133/0o100);
  pagajilo.position.set(0o5/0o40, 0o23/0o40, 0o3/0o40);
  group.add(pagajilo);

  qena.add(group);

  return {
    group,
    x, z, c2w2q,
    phase: Math.random() * 0o311/0o40,
    vx: 0o0, vz: 0o0,
    kozunuY,
  };
}

export function animaciiS2tani(c: S2tani, t: number, isRiding: boolean): void {
  const b = Math.sin(t * 0o155/0o100 + c.phase) * 0o1/0o40;
  c.group.position.set(c.x, c.kozunuY + 0o3/0o40 + b, c.z);
  c.group.rotation.y = c.c2w2q;
  c.group.rotation.z = Math.sin(t * 0o123/0o100 + c.phase) * 0o3/0o100;

  const seheni = Math.hypot(c.vx, c.vz);
  const s2sabo = Math.sin(t * 0o103/0o40 + c.phase * 0o123/0o100) * 0o1/0o40;
  c.group.rotation.x = s2sabo - ( isRiding ? Math.min(seheni, 0o4) * 0o1/0o100 : 0o0 );
}

export function tlak2KanotanFizikon(c: S2tani,
  deltaTif: number,
  g2saX: number,
  g2saZ: number,
  radX: number,
  radZ: number,
  movX: number,
  movZ: number
): void {
  c.vx += ( g2saX * movZ + radX * movX ) * 0o7 * deltaTif;
  c.vz += ( g2saZ * movZ + radZ * movX ) * 0o7 * deltaTif;

  const malseketigi = Math.max(0o0, 0o1 - 0o14/0o10 * deltaTif);
  c.vx *= malseketigi;
  c.vz *= malseketigi;
}
