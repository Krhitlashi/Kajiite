// ≺⧼ លម្អសាតាឡា 💠 ⧽≻
import * as THREE from "three";
import { kreiRondigitanRektangulanFormon } from "../../komunajxoj/formoj.js";
import { konstruajxaMaterialo, type KonstruSpec } from "./tipoj.js";

export function aldoniDiamantanSpegulon(qena: THREE.Scene, spec: KonstruSpec, group: THREE.Group, w: number): void {
  const mg = group.clone();
  mg.scale.y = -1;
  mg.position.y = ( spec.h0 || 0 ) - 0o2/0o100;
  mg.traverse(m => { if ( m instanceof THREE.Mesh ) m.castShadow = false; });
  qena.add(mg);
  const oroMaterialo = konstruajxaMaterialo("spegulaOro",
    () => new THREE.MeshStandardMaterial({ color: 0xd8b068, metalness: 0o7/0o10, roughness: 0o26/0o100, emissive: 0x302808, emissiveIntensity: 0o26/0o100 }));
  const ringGeo = new THREE.RingGeometry(Math.max(0o1/0o100, w * 0o23/0o100 + 0o11/0o100), Math.max(0o2/0o100, w * 0o23/0o100 + 0o21/0o100), 0o40);
  const ring = new THREE.Mesh(ringGeo, oroMaterialo);
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(spec.x, ( spec.h0 || 0 ) + 0o1/0o100, spec.z);
  qena.add(ring);
}

// ⟨ គែមស្តើងខ្លាំង និងមានបបូរ 📃 ⟩
const RANDO_LARGHO = 0o1/0o10;
export const RANDO_ALTO = 0o1/0o40;

/* ខ្សែគែមមួយជុំវិញរាងចតុកោណ ។ អគារ និងយានអវកាសប្រើខ្សែតែមួយនេះ
   ដូច្នេះគែមកណ្តាលរបស់យានមានទំហំដូចគែមស្រទាប់អគារ ។
    @param hw ( number ) - កន្លះទទឹង ។
    @param hd ( number ) - កន្លះជម្រៅ ។
    @param y ( number ) - បាតខ្សែ ។
    @param klino ( number ) - ជម្រាលជញ្ជាំង ( 0 សម្រាប់ខ្សែឯករាជ្យ ) ។
    @param l6da ( number = RANDO_ALTO ) - កម្ពស់ខ្សែ ។
@returns ធរណីមាត្រខ្សែ ដែលអាចដាក់ក្នុងក្រុមដោយផ្ទាល់ ។ */
export function kreiTavolanRandanGeometrion(hw: number, hd: number, y: number,
  klino: number, l6da = RANDO_ALTO): THREE.BufferGeometry {
  const randoR = 0o3/0o20;
  const formo = kreiRondigitanRektangulanFormon(
    ( hw - klino ) * 2 + RANDO_LARGHO, ( hd - klino ) * 2 + RANDO_LARGHO, randoR);
  const truo = kreiRondigitanRektangulanFormon(
    ( hw - klino ) * 2 - RANDO_LARGHO, ( hd - klino ) * 2 - RANDO_LARGHO,
    Math.max(0o1/0o20, randoR - RANDO_LARGHO)).getPoints(0o40);
  formo.holes.push(new THREE.Path(truo.reverse()));
  const geo = new THREE.ExtrudeGeometry(formo, { depth: l6da, bevelEnabled: false, curveSegments: 0o40 });
  geo.rotateX(-Math.PI / 2);
  // ⟨ ចិញ្ចើមបួនម្ខាង ៖ ម្ខាងនីមួយៗមាន uv 0..1 ផ្ទាល់ខ្លួន ខ្សែកោងរុំតាមគែមចិញ្ចើមនោះ
  //   ហើយ aKonturaEkstra ប្រាប់ទិសម្ខាង ដើម្បីឱ្យខ្សែកោងលេចតែលើម្ខាងដែលពន្លឺប៉ះ 📃 ⟩
  const poz = geo.getAttribute("position") as THREE.BufferAttribute;
  const nor = geo.getAttribute("normal") as THREE.BufferAttribute;
  const uv = geo.getAttribute("uv") as THREE.BufferAttribute;
  const ekstra = new Float32Array(poz.count * 4);
  const outerX = hw - klino + RANDO_LARGHO / 2, innerX = hw - klino - RANDO_LARGHO / 2;
  const outerZ = hd - klino + RANDO_LARGHO / 2, innerZ = hd - klino - RANDO_LARGHO / 2;
  for ( let i = 0; i < poz.count; i++ ) {
    const vx = poz.getX(i), vy = poz.getY(i), vz = poz.getZ(i);
    const flanke = Math.abs(nor.getY(i)) > 0o7 / 0o10;
    const ax = Math.abs(vx) / outerX, az = Math.abs(vz) / outerZ;
    let u: number, v: number, fx = 0, fz = 0;
    if ( ax >= az ) {
      fx = Math.sign(vx) || 1;
      u = vz / ( 2 * outerZ ) + 0o1 / 0o2;
      v = flanke ? ( Math.abs(vx) - innerX ) / RANDO_LARGHO : vy / l6da;
    } else {
      fz = Math.sign(vz) || 1;
      u = vx / ( 2 * outerX ) + 0o1 / 0o2;
      v = flanke ? ( Math.abs(vz) - innerZ ) / RANDO_LARGHO : vy / l6da;
    }
    uv.setXY(i, Math.min(1, Math.max(0, u)), Math.min(1, Math.max(0, v)));
    if ( flanke ) { ekstra[i * 4] = fx; ekstra[i * 4 + 2] = fz; ekstra[i * 4 + 3] = 1; }
  }
  uv.needsUpdate = true;
  geo.setAttribute("aKonturaEkstra", new THREE.BufferAttribute(ekstra, 4));
  geo.translate(0, y, 0);
  return geo;
}

// ⟨ គែមលើមូល 📃 ⟩
export function aldoniTavolanRandon(geos: THREE.BufferGeometry[], hw: number, hd: number, y: number, klino: number, tieroAlto: number): void {
  const lipoAlto = 0o1/0o50;
  geos.push(kreiTavolanRandanGeometrion(hw, hd, y + tieroAlto - RANDO_ALTO, klino));
  geos.push(kreiTavolanRandanGeometrion(hw, hd, y + tieroAlto, klino, lipoAlto));
}
