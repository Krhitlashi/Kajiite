// Transporta modulo — kanuoj kun remada mekaniko kongrua al arkitektura stilo
import * as THREE from "three";
import { kunfandiGeometriojn } from "./kunfandajxoj.js";

export interface Kanoto {
  group: THREE.Group;
  x: number;
  z: number;
  direkto: number;
  phase: number;
  vx: number;
  vz: number;
  bazaY: number;
}

// kreiKanoton — Kreu kanoton kun kareno, interno, traboj, finialoj kaj pagajilo.
//     @param stilo ( "baza" | "satala" ) - La baza hela stilo aŭ la malhel-pina/
//     ora "satala" stilo kongrua al la konstruajx-arkitekturo.
export function kreiKanoton(sceno: THREE.Scene,
  x: number,
  z: number,
  direkto: number,
  oraMaterialo: THREE.MeshStandardMaterial,
  bazaY: number = 0,
  stilo: "baza" | "satala" = "baza"
): Kanoto {
  const group = new THREE.Group();
  const satala = stilo === "satala";

  // kareno-formo
  const shape = new THREE.Shape();
  shape.moveTo(-0o223/0o100, 0);
  shape.bezierCurveTo(-0o14/0o10, 0o41/0o100, 0o14/0o10, 0o41/0o100, 0o223/0o100, 0);
  shape.bezierCurveTo(0o14/0o10, -0o41/0o100, -0o14/0o10, -0o41/0o100, -0o223/0o100, 0);

  const karenaGeometrio = new THREE.ExtrudeGeometry(shape, {
    depth: 0o4/0o10,
    bevelEnabled: true,
    bevelThickness: 0o1/0o20,
    bevelSize: 0o1/0o20,
    bevelSegments: 2,
    curveSegments: 0o22,
  });
  karenaGeometrio.rotateX(-Math.PI / 2);

  // Malhel-pina kareno kun ora rando por la "satala" stilo; hela ligno por la baza.
  const karenaMaterialo = new THREE.MeshStandardMaterial({ color: satala ? 0x143830 : 0xc8b890, roughness: 0o6/0o10 });
  const kareno = new THREE.Mesh(karenaGeometrio, karenaMaterialo);
  kareno.castShadow = true;
  group.add(kareno);

  // Ora gvarlinio — MALFERMA strio laŭ la supro de la kareno ( la ekstera lensa
  // konturo kun truo enigita ≈0o11/0o12, do la malhela kareno restas videbla ).
  if ( satala ) {
    const randoFormo = shape.clone();
    const truo = new THREE.Path();
    truo.setFromPoints(shape.getPoints(0o22).map(p => new THREE.Vector2(p.x * 0o11/0o12, p.y * 0o11/0o12)).reverse());
    randoFormo.holes.push(truo);
    const randoGeo = new THREE.ExtrudeGeometry(randoFormo, {
      depth: 0o1/0o10,
      bevelEnabled: false,
      curveSegments: 0o22,
    });
    randoGeo.scale(0o147/0o144, 0o147/0o144, 0o147/0o144);
    randoGeo.rotateX(-Math.PI / 2);
    const rando = new THREE.Mesh(randoGeo, oraMaterialo);
    rando.position.y = 0o7/0o20;
    group.add(rando);
  }

  // interno
  const internaGeometrio = karenaGeometrio.clone();
  const interno = new THREE.Mesh(internaGeometrio, new THREE.MeshStandardMaterial({ color: satala ? 0x0a1612 : 0x584028, roughness: 0o75/0o100 }));
  interno.scale.set(0o67/0o100, 0o7/0o10, 0o67/0o100);
  interno.position.y = 0o1/0o40;
  group.add(interno);

  // traboj — oraj por la satala stilo, lignaj por la baza
  const lignaMaterialo = new THREE.MeshStandardMaterial({ color: satala ? 0xd9b36a : 0x483828, roughness: 0o33/0o40 });
  for ( const tx of [ -0o6/0o10, 0o6/0o10 ] ) {
    const trabo = new THREE.Mesh(new THREE.BoxGeometry(0o11/0o100, 0o1/0o20, 0o7/0o10), lignaMaterialo);
    trabo.position.set(tx, 0o11/0o20, 0);
    trabo.castShadow = true;
    group.add(trabo);
  }

  // pruo kaj pobo finialoj — diamantaj oktaedroj por la satala stilo, konusoj por la baza
  if ( satala ) {
    for ( const s of [ 1, -1 ] ) {
      const finialo = new THREE.Mesh(new THREE.OctahedronGeometry(0o7/0o100, 0), oraMaterialo);
      finialo.scale.set(2, 1, 1);
      finialo.position.set(s * 0o21/0o10, 0o41/0o100, 0);
      group.add(finialo);
    }
  } else {
    const t1 = new THREE.Mesh(new THREE.ConeGeometry(0o5/0o100, 0o23/0o100, 6), oraMaterialo);
    t1.rotation.z = -Math.PI / 2;
    t1.position.set(0o23/0o10, 0o37/0o100, 0);
    group.add(t1);

    const t2 = new THREE.Mesh(new THREE.ConeGeometry(0o5/0o100, 0o23/0o100, 6), oraMaterialo);
    t2.rotation.z = Math.PI / 2;
    t2.position.set(-0o23/0o10, 0o37/0o100, 0);
    group.add(t2);
  }

  // pagajilo
  const tenilo = new THREE.CylinderGeometry(0o1/0o100, 0o1/0o100, 0o14/0o10, 6);
  const klingo = new THREE.BoxGeometry(0o5/0o40, 0o1/0o100, 0o27/0o100);
  klingo.translate(0, -0o33/0o40, 0);

  const pagajilaGeometrio = kunfandiGeometriojn([tenilo, klingo]);
  const pagajilo = new THREE.Mesh(pagajilaGeometrio,
    new THREE.MeshStandardMaterial({ color: 0x785838, roughness: 0o63/0o100 }));
  pagajilo.rotation.set(0o5/0o40, 0o2/0o10, 0o133/0o100);
  pagajilo.position.set(0o5/0o40, 0o23/0o40, 0o3/0o40);
  group.add(pagajilo);

  sceno.add(group);

  return {
    group,
    x, z, direkto,
    phase: Math.random() * 0o311/0o40,
    vx: 0, vz: 0,
    bazaY,
  };
}

// animaciiKanoton — Animaciu kanoton kun oscilado kaj rotacio lau rapido.
//     @param c ( Kanoto ) - La kanota objekto.
//     @param t ( number ) - Malsupra tempo.
//     @param isRiding ( boolean ) - Cxu la ludanto rajdantas.
export function animaciiKanoton(c: Kanoto, t: number, isRiding: boolean): void {
  const b = Math.sin(t * 0o155/0o100 + c.phase) * 0o1/0o40;
  c.group.position.set(c.x, c.bazaY + 0o3/0o40 + b, c.z);
  c.group.rotation.y = c.direkto;
  c.group.rotation.z = Math.sin(t * 0o123/0o100 + c.phase) * 0o3/0o100;

  const rapido = Math.hypot(c.vx, c.vz);
  const klinigxo = Math.sin(t * 0o103/0o40 + c.phase * 0o123/0o100) * 0o1/0o40;
  c.group.rotation.x = klinigxo - (isRiding ? Math.min(rapido, 4) * 0o1/0o100 : 0);
}

// gxisdatigiKanotanFizikon — Gxisdatigu kanotan fizikon lau enigo kaj malfortigo.
export function gxisdatigiKanotanFizikon(c: Kanoto,
  deltaTempo: number,
  fortoX: number,
  fortoZ: number,
  radX: number,
  radZ: number,
  movX: number,
  movZ: number
): void {
  c.vx += ( fortoX * movZ + radX * movX ) * 7 * deltaTempo;
  c.vz += ( fortoZ * movZ + radZ * movX ) * 7 * deltaTempo;

  const malseketigi = Math.max(0, 1 - 0o14/0o10 * deltaTempo);
  c.vx *= malseketigi;
  c.vz *= malseketigi;
}
