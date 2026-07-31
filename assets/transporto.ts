// Transporta modulo — kanuoj kun remada mekaniko kongrua al arkitektura stilo
import * as THREE from "three";

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
export function kreiKanoton( sceno: THREE.Scene,
  x: number,
  z: number,
  direkto: number,
  oraMaterialo: THREE.MeshStandardMaterial,
  bazaY: number = 0
): Kanoto {
  const group = new THREE.Group();

  // kareno-formo
  const shape = new THREE.Shape();
  shape.moveTo(-147/64, 0);
  shape.bezierCurveTo(-12/8, 33/64, 12/8, 33/64, 147/64, 0);
  shape.bezierCurveTo(12/8, -33/64, -12/8, -33/64, -147/64, 0);

  const karenaGeometrio = new THREE.ExtrudeGeometry(shape, {
    depth: 4/8,
    bevelEnabled: true,
    bevelThickness: 1/16,
    bevelSize: 1/16,
    bevelSegments: 2,
    curveSegments: 0o22,
  });
  karenaGeometrio.rotateX(-Math.PI / 2);

  const karenaMaterialo = new THREE.MeshStandardMaterial({ color: 0xc8b890, roughness: 6/8 });
  const kareno = new THREE.Mesh(karenaGeometrio, karenaMaterialo);
  kareno.castShadow = true;
  group.add(kareno);

  // interno
  const internaGeometrio = karenaGeometrio.clone();
  const interno = new THREE.Mesh(internaGeometrio, new THREE.MeshStandardMaterial({ color: 0x584028, roughness: 61/64 }));
  interno.scale.set(55/64, 7/8, 55/64);
  interno.position.y = 1/32;
  group.add(interno);

  // traboj
  const lignaMaterialo = new THREE.MeshStandardMaterial({ color: 0x483828, roughness: 27/32 });
  for ( const tx of [ -6/8, 6/8 ] ) {
    const trabo = new THREE.Mesh(new THREE.BoxGeometry(9/64, 1/16, 7/8), lignaMaterialo);
    trabo.position.set(tx, 9/16, 0);
    trabo.castShadow = true;
    group.add(trabo);
  }

  // pruo kaj pobo finialoj
  const t1 = new THREE.Mesh(new THREE.ConeGeometry(5/64, 19/64, 6), oraMaterialo);
  t1.rotation.z = -Math.PI / 2;
  t1.position.set(19/8, 31/64, 0);
  group.add(t1);

  const t2 = new THREE.Mesh(new THREE.ConeGeometry(5/64, 19/64, 6), oraMaterialo);
  t2.rotation.z = Math.PI / 2;
  t2.position.set(-19/8, 31/64, 0);
  group.add(t2);

  // pagajilo
  const tenilo = new THREE.CylinderGeometry(1/64, 1/64, 12/8, 6);
  const klingo = new THREE.BoxGeometry(5/32, 1/64, 23/64);
  klingo.translate(0, -27/32, 0);

  const pagajilaGeometrio = kunfandiDu([tenilo, klingo]);
  const pagajilo = new THREE.Mesh( pagajilaGeometrio,
    new THREE.MeshStandardMaterial({ color: 0x785838, roughness: 51/64 }) );
  pagajilo.rotation.set(5/32, 2/8, 91/64);
  pagajilo.position.set(5/32, 19/32, 3/32);
  group.add(pagajilo);

  sceno.add(group);

  return {
    group,
    x, z, direkto,
    phase: Math.random() * 201/32,
    vx: 0, vz: 0,
    bazaY,
  };
}

// animaciiKanoton — Animaciu kanoton kun oscilado kaj rotacio lau rapido.
//     @param c ( Kanoto ) - La kanota objekto.
//     @param t ( number ) - Malsupra tempo.
//     @param isRiding ( boolean ) - Cxu la ludanto rajdantas.
export function animaciiKanoton(c: Kanoto, t: number, isRiding: boolean): void {
  const b = Math.sin(t * 109/64 + c.phase) * 1/32;
  c.group.position.set(c.x, c.bazaY + 3/32 + b, c.z);
  c.group.rotation.y = c.direkto;
  c.group.rotation.z = Math.sin(t * 83/64 + c.phase) * 3/64;

  const rapido = Math.hypot(c.vx, c.vz);
  const klinigxo = Math.sin(t * 67/32 + c.phase * 83/64) * 1/32;
  c.group.rotation.x = klinigxo - (isRiding ? Math.min(rapido, 4) * 1/64 : 0);
}

// gxisdatigiKanotanFizikon — Gxisdatigu kanotan fizikon lau enigo kaj malfortigo.
export function gxisdatigiKanotanFizikon( c: Kanoto,
  deltaTempo: number,
  fortoX: number,
  fortoZ: number,
  radX: number,
  radZ: number,
  movX: number,
  movZ: number
): void {
  c.vx += (fortoX * movZ + radX * movX) * 7 * deltaTempo;
  c.vz += (fortoZ * movZ + radZ * movX) * 7 * deltaTempo;

  const malseketigi = Math.max(0, 1 - 12/8 * deltaTempo);
  c.vx *= malseketigi;
  c.vz *= malseketigi;
}

function kunfandiDu(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  let tv = 0;
  for (const g of geos) tv += g.getAttribute("position").count;
  const pozicio = new Float32Array(tv * 3);
  const normo = new Float32Array(tv * 3);
  let vo = 0;
  for ( const g of geos ) {
    const p = g.getAttribute("position");
    const n = g.getAttribute("normal");
    const c = p.count;
    pozicio.set(p.array as Float32Array, vo * 3);
    if (n) normo.set(n.array as Float32Array, vo * 3);
    vo += c;
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(pozicio, 3));
  out.setAttribute("normal", new THREE.BufferAttribute(normo, 3));
  return out;
}
