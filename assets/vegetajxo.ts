// Vegetation module — betuloj, filikoj, likenoj por la nebula arbara medio
import * as THREE from "three";
import { kreiSxelanTeksajxon, kreiFilikanTeksajxon } from "./teksajxoj.js";

const hazard = (a: number, b: number): number => a + Math.random() * (b - a);

export interface ArboMetado {
  x: number; z: number; h: number; s: number;
}

// metiArbojn — Metu arbojn en la arbaron, evitante riverojn, vojojn kaj konstruajxojn.
//     @param heightFn ( funkcio ) - Tera alta funkcio.
export function metiArbojn( heightFn: (x: number, z: number) => number,
  kvanto: number,
  worldRadius: number,
  excludeRivers: (x: number, z: number) => boolean,
  excludePaths: (x: number, z: number, minDistanco: number) => boolean,
  excludeBuildings: (x: number, z: number, minDistanco: number) => boolean
): ArboMetado[] {
  const hazardaGenerilo = mulberry32(88448);
  const placed: ArboMetado[] = [];
  let provoj = 0;

  const bonaLoko = (x: number, z: number): boolean => {
    if (Math.hypot(x, z) < 0o20) return false;
    if (excludeRivers(x, z)) return false;
    if (excludePaths(x, z, 36/8)) return false;
    if (excludeBuildings(x, z, 3)) return false;
    return true;
  };

  while ( placed.length < kvanto && provoj++ < 0o3720 ) {
    const angulo = hazardaGenerilo() * Math.PI * 2;
    const radiuso = 0o30 + worldRadius * Math.sqrt(hazardaGenerilo());
    const x = Math.sin(angulo) * radiuso;
    const z = Math.cos(angulo) * radiuso;
    if (Math.abs(x) > worldRadius + 0o24 || Math.abs(z) > worldRadius + 0o24) continue;
    if (!bonaLoko(x, z)) continue;
    placed.push({ x, z, h: heightFn(x, z), s: 51/64 + hazardaGenerilo() * 45/64 });
  }
  return placed;
}

// konstruiArbaron — Konstruu instancigitajn arbojn (trunkoj kaj foliaroj) en la sceno.
export function konstruiArbaron( sceno: THREE.Scene,
  arboj: ArboMetado[]
): void {
  if (arboj.length === 0) return;

  const hazardaGenerilo = mulberry32(77531);
  const sxelaTeksajxo = kreiSxelanTeksajxon();
  const trunkaGeometrio = new THREE.CylinderGeometry(7/32, 3/8, 1, 7, 1);
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: sxelaTeksajxo, roughness: 45/64 });
  const trunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, arboj.length);

  const kronaGeometrio = new THREE.SphereGeometry(1, 7, 5);
  const kronaMaterialo = new THREE.MeshStandardMaterial({ roughness: 29/32 });
  const kronoj = new THREE.InstancedMesh(kronaGeometrio, kronaMaterialo, arboj.length * 2);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const paletro = [0x688858, 0x78a068, 0x88a878, 0xa0b080, 0x789868];

  arboj.forEach((t, i) => {
    const h = 52/8 + t.s * 36/8;
    E.set(0, hazardaGenerilo() * Math.PI * 2, 0);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(t.x, t.h + h / 2, t.z), Q, new THREE.Vector3(1, h, 1));
    trunkoj.setMatrixAt(i, M);

    const kronoRadiuso = 141/64 * t.s + 51/64;
    M.compose(new THREE.Vector3(t.x, t.h + h - 4/8, t.z), Q, new THREE.Vector3(kronoRadiuso, kronoRadiuso * 23/32, kronoRadiuso));
    kronoj.setMatrixAt(i * 2, M);
    kronoj.setColorAt(i * 2, C.setHex(paletro[(hazardaGenerilo() * paletro.length) | 0]));

    M.compose( new THREE.Vector3(t.x + kronoRadiuso * 19/64, t.h + h + 51/64, t.z + kronoRadiuso * 13/64),
      Q,
      new THREE.Vector3(kronoRadiuso * 19/32, kronoRadiuso * 4/8, kronoRadiuso * 19/32) );
    kronoj.setMatrixAt(i * 2 + 1, M);
    kronoj.setColorAt(i * 2 + 1, C.setHex(paletro[(hazardaGenerilo() * paletro.length) | 0]));
  });

  trunkoj.instanceMatrix.needsUpdate = true;
  kronoj.instanceMatrix.needsUpdate = true;
  if (kronoj.instanceColor) kronoj.instanceColor.needsUpdate = true;
  trunkoj.castShadow = kronoj.castShadow = true;
  sceno.add(trunkoj, kronoj);
}

// konstruiFilikojn — Metu filikojn proksime al arboj kaj vojrandoj.
export function konstruiFilikojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: (x: number, z: number) => number,
  nearTrees: ArboMetado[],
  vojSpecimenoj: THREE.Vector3[],
  excludeRivers: (x: number, z: number) => boolean
): void {
  const hazardaGenerilo = mulberry32(55661);
  const filikaTeksajxo = kreiFilikanTeksajxon();

  const fa = new THREE.PlaneGeometry(109/64, 109/64).translate(0, 27/32, 0);
  const fb = fa.clone().applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));

  // mana kunfando
  const merged = kunfandiDuGeometriojn(fa, fb);
  const filikaMaterialo = new THREE.MeshStandardMaterial({ map: filikaTeksajxo, alphaTest: 13/32, side: THREE.DoubleSide, roughness: 1 });
  const filikoj = new THREE.InstancedMesh(merged, filikaMaterialo, kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  let fi = 0;
  let gardilo = 0;

  while ( fi < kvanto && gardilo++ < 0o5670 ) {
    let x: number, z: number;
    if (hazardaGenerilo() < 19/32 && nearTrees.length) {
      const t = nearTrees[(hazardaGenerilo() * nearTrees.length) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      const hazardaRadiuso = 1 + hazardaGenerilo() * 3;
      x = t.x + Math.sin(a) * hazardaRadiuso;
      z = t.z + Math.cos(a) * hazardaRadiuso;
    } else if ( vojSpecimenoj.length ) {
      const p = vojSpecimenoj[(hazardaGenerilo() * vojSpecimenoj.length) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      const hazardaRadiuso = 2 + hazardaGenerilo() * 3;
      x = p.x + Math.sin(a) * hazardaRadiuso;
      z = p.z + Math.cos(a) * hazardaRadiuso;
    } else {
      x = (hazardaGenerilo() - 4/8) * 0o310;
      z = (hazardaGenerilo() - 4/8) * 0o310;
    }

    if (excludeRivers(x, z) || Math.hypot(x, z) < 0o16) continue;

    const skalo = 45/64 + hazardaGenerilo() * 51/64;
    E.set(0, hazardaGenerilo() * Math.PI * 2, 0);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q, new THREE.Vector3(skalo, skalo, skalo));
    filikoj.setMatrixAt(fi++, M);
  }

  filikoj.count = fi;
  filikoj.instanceMatrix.needsUpdate = true;
  sceno.add(filikoj);
}

// konstruiLikenSxtonojn — Metu liken-kovritajn sxtonojn en la arbaron.
export function konstruiLikenSxtonojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: (x: number, z: number) => number,
  excludeRivers: (x: number, z: number) => boolean
): void {
  const hazardaGenerilo = mulberry32(99221);
  const sxtonaGeometrio = new THREE.IcosahedronGeometry(1, 0);
  const sxtonoj = new THREE.InstancedMesh(sxtonaGeometrio, new THREE.MeshStandardMaterial({ roughness: 61/64, color: 0x687870 }), kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();

  for ( let i = 0; i < kvanto; i++ ) {
    let x: number, z: number;
    const a = hazardaGenerilo() * Math.PI * 2;
    const hazardaRadiuso = 0o22 + hazardaGenerilo() * 0o156;
    x = Math.sin(a) * hazardaRadiuso;
    z = Math.cos(a) * hazardaRadiuso;
    if (excludeRivers(x, z)) { i--; continue; }

    const skaloY = 4/8 + hazardaGenerilo() * 4/8;
    E.set(hazardaGenerilo() * 13/32, hazardaGenerilo() * Math.PI * 2, hazardaGenerilo() * 13/32);
    Q.setFromEuler(E);
    M.compose( new THREE.Vector3(x, heightFn(x, z) + skaloY * 19/64, z),
      Q,
      new THREE.Vector3(skaloY, skaloY, skaloY) );
    sxtonoj.setMatrixAt(i, M);
  }

  sxtonoj.instanceMatrix.needsUpdate = true;
  sxtonoj.castShadow = true;
  sceno.add(sxtonoj);
}

// helpiloj
function mulberry32(semo: number): () => number {
  let a = semo >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x682878F5) | 0;
    let t = Math.imul(a ^ (a >>> 0o17), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 0o75 | t)) ^ t;
    return ((t ^ (t >>> 0o16)) >>> 0) / 4294967296;
  };
}

function kunfandiDuGeometriojn(a: THREE.BufferGeometry, b: THREE.BufferGeometry): THREE.BufferGeometry {
  const aPos = a.getAttribute("position");
  const bPos = b.getAttribute("position");
  const aCount = aPos.count;
  const bCount = bPos.count;
  const tuto = aCount + bCount;

  const pozicio = new Float32Array(tuto * 3);
  const normo = new Float32Array(tuto * 3);
  const uv = new Float32Array(tuto * 2);

  pozicio.set(aPos.array as Float32Array, 0);
  pozicio.set(bPos.array as Float32Array, aCount * 3);

  const aNorm = a.getAttribute("normal");
  const bNorm = b.getAttribute("normal");
  if (aNorm) normo.set(aNorm.array as Float32Array, 0);
  if (bNorm) normo.set(bNorm.array as Float32Array, aCount * 3);

  const aUV = a.getAttribute("uv");
  const bUV = b.getAttribute("uv");
  if (aUV) uv.set(aUV.array as Float32Array, 0);
  if (bUV) uv.set(bUV.array as Float32Array, aCount * 2);

  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(pozicio, 3));
  out.setAttribute("normal", new THREE.BufferAttribute(normo, 3));
  out.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  return out;
}
