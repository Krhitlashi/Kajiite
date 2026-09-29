// ≺⧼ La satalaj ornamoj 💠 ⧽≻
// La diamanta spegulo ( aldoniDiamantanSpegulon ) kaj la rondigitaj supraj randoj
// de la tavoloj ( aldoniTavolanRandon ).
import * as THREE from "three";
import { kreiRondigitanRektangulanFormon } from "../../komunajxoj/formoj.js";
import { konstruajxaMaterialo, type KonstruSpec } from "./tipoj.js";

// aldoniDiamantanSpegulon — Reflektu la konstruajxon suben (diamanta spegulo) kun
// ora ringo cxe la bazo.
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

// aldoniTavolanRandon — La ORA rando ĉe la supro de unu tiera muro.
// ⟨ RONDIGITAJ supraj randoj 📃 ⟩ — antaŭe kvar apartaj skatoloj ( du laŭ ĉiu
// akso ) kun AKRAJ anguloj, kiuj renkontiĝis en la kvar anguloj de la tavolo.
// Nun unu RONDIGITA kadro ( la sama formo kiel la ora bazplato de la sanktejo
// kaj la vojoj ) ĉirkaŭas la tutan tavolon per unu senjunta bendo kun molaj
// anguloj. La dikeco kaj la alto restas la samaj kiel la malnovaj stangoj, do la
// rando aspektas idente — nur la anguloj rondiĝis.
//     @param geos ( THREE.BufferGeometry[] ) - La kadraj geometrioj ( kunfandataj ).
//     @param hw, hd ( number ) - La duon-larĝo kaj duon-profundo de la tavolo.
//     @param y ( number ) - La malsupra nivelo de la tavolo.
//     @param klino, tieroAlto ( number ) - La muro-deklivo kaj la tiera alto.
// Elportita ( export ) ankaŭ por la inspektilo, kiu montras unu tavolon sola.
export function aldoniTavolanRandon(geos: THREE.BufferGeometry[], hw: number, hd: number, y: number, klino: number, tieroAlto: number): void {
  // ⟨ La rando estas TRE MALDIKA kaj havas LIPON 📃 ⟩ — la antaŭa bendo estis
  // sola kaj 0.2 larĝa ( ĝi legiĝis kiel dika ora strio ĉirkaŭ la tavolo ). Nun
  // ĝi estas maldika strio ( 0.125 larĝa, 0.031 alta ), kaj SUR la tavola supro
  // kuŝas dua samforma tavolo — la LIPO — kiu leviĝas 0.025 super la supron. La
  // du formas kune maldikan oran randon kun supra eĝo, anstataŭ platbenda
  // ĉirkaŭaĵo. La kvar anguloj restas rondaj ( la sama kreiRondigitan... formo
  // kiel la bazplato kaj la vojoj ).
  const randoLargho = 0o1/0o10;   // 0.125 — la larĝo de la ora strio
  const randoAlto = 0o1/0o40;     // 0.031 — la maldika vertikala strio
  const lipoAlto = 0o1/0o50;      // 0.025 — la supra lipo
  const randoR = 0o3/0o20;
  // randoBendo — unu rondigita kadro el la sama formo, je la sama loko, kun
  // propra alto kaj propria baza nivelo. La ena truo estas pli malgranda je la
  // bendo-larĝo, kun la MALA ( CW ) ventumilo — kiel la porda truo en internoj.ts
  // kaj la bazplato, por ke Earcut rekonu ĝin kiel truon.
  const randoBendo = (alto: number, bazaY: number): void => {
    const formo = kreiRondigitanRektangulanFormon(
      ( hw - klino ) * 2 + randoLargho, ( hd - klino ) * 2 + randoLargho, randoR);
    const truo = kreiRondigitanRektangulanFormon(
      ( hw - klino ) * 2 - randoLargho, ( hd - klino ) * 2 - randoLargho,
      Math.max(0o1/0o20, randoR - randoLargho)).getPoints(0o40);
    formo.holes.push(new THREE.Path(truo.reverse()));
    const geo = new THREE.ExtrudeGeometry(formo, { depth: alto, bevelEnabled: false, curveSegments: 0o40 });
    // Plata ( rotaciita X ) — la dikeco fariĝas vertikala.
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, bazaY, 0);
    geos.push(geo);
  };
  // La maldika vertikala strio — ĝia supro estas la tavola supro.
  randoBendo(randoAlto, y + tieroAlto - randoAlto);
  // La lipo — sur la tavola supro, iomete levita super ĝin.
  randoBendo(lipoAlto, y + tieroAlto);
}
