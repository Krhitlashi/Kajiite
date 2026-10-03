// ≺⧼ លម្អសាតាឡា 💠 ⧽≻
import * as THREE from "three";
import { kreiRondigitanRektangulanFormon } from "../../komunajxoj/formoj.js";
import { konstruajxaMaterialo, type KonstruSpec } from "./tipoj.js";

export function aldoniDiamantanSpegulon(sceno: THREE.Scene, spec: KonstruSpec, group: THREE.Group, w: number): void {
  const mg = group.clone();
  mg.scale.y = -1;
  mg.position.y = ( spec.h0 || 0 ) - 0o2/0o100;
  mg.traverse(m => { if ( m instanceof THREE.Mesh ) m.castShadow = false; });
  sceno.add(mg);
  const oroMaterialo = konstruajxaMaterialo("spegulaOro",
    () => new THREE.MeshStandardMaterial({ color: 0xd8b068, metalness: 0o7/0o10, roughness: 0o26/0o100, emissive: 0x302808, emissiveIntensity: 0o26/0o100 }));
  const ringGeo = new THREE.RingGeometry(Math.max(0o1/0o100, w * 0o23/0o100 + 0o11/0o100), Math.max(0o2/0o100, w * 0o23/0o100 + 0o21/0o100), 32);
  const ring = new THREE.Mesh(ringGeo, oroMaterialo);
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(spec.x, ( spec.h0 || 0 ) + 0o1/0o100, spec.z);
  sceno.add(ring);
}

// ⟨ គែមលើមូល 📃 ⟩
export function aldoniTavolanRandon(geos: THREE.BufferGeometry[], hw: number, hd: number, y: number, klino: number, tieroAlto: number): void {
  // ⟨ គែមស្តើងខ្លាំង និងមានបបូរ 📃 ⟩
  const randoLargho = 0o1/0o10;
  const randoAlto = 0o1/0o40;
  const lipoAlto = 0o1/0o50;
  const randoR = 0o3/0o20;
  const randoBendo = (alto: number, bazaY: number): void => {
    const formo = kreiRondigitanRektangulanFormon(
      ( hw - klino ) * 2 + randoLargho, ( hd - klino ) * 2 + randoLargho, randoR);
    const truo = kreiRondigitanRektangulanFormon(
      ( hw - klino ) * 2 - randoLargho, ( hd - klino ) * 2 - randoLargho,
      Math.max(0o1/0o20, randoR - randoLargho)).getPoints(0o40);
    formo.holes.push(new THREE.Path(truo.reverse()));
    const geo = new THREE.ExtrudeGeometry(formo, { depth: alto, bevelEnabled: false, curveSegments: 0o40 });
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, bazaY, 0);
    geos.push(geo);
  };
  randoBendo(randoAlto, y + tieroAlto - randoAlto);
  randoBendo(lipoAlto, y + tieroAlto);
}
