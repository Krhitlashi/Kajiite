// ≺⧼ អគារសាតាឡា 🏛️ ⧽≻
import * as THREE from "three";
import { kunfandiGeometriojn } from "../komunajxoj/kunfandajxoj.js";
import { kreiOranMaterialon, kreiPordanMaterialon } from "../komunajxoj/materialoj.js";
import { kreiRondigitanRektangulanFormon } from "../komunajxoj/formoj.js";
import { aldoniManĝtablon, LIGNA_KOLORO } from "../mebloj/tabloj.js";
import { aldoniEnirejon } from "./satalaj/enirejo.js";
import { aldoniPilolFenestron, fenestraMargxeno, fenestraMaterialo } from "./satalaj/fenestroj.js";
import { kreiKlinoTavolon, MURA_KLINO } from "./satalaj/formoj.js";
import { aldoniDiamantanSpegulon, aldoniTavolanRandon } from "./satalaj/ornamoj.js";
import { aldoniKadranTubon } from "./satalaj/pilieroj.js";
import { konstruajxaMaterialo, TIPARO, type KonstruSpec } from "./satalaj/tipoj.js";
import { aldoniSteleanSignon } from "./satalaj/vitro.js";

// ⟨ ឃ្លាំងសម្ងាត់ធរណីមាត្រស្រទាប់ 📃 ⟩
const tavolajKashmemoroj = new Map<string, { muroj: THREE.BufferGeometry; kadroj: THREE.BufferGeometry }>();
function tavolajGeometrioj(w: number, d: number, tiers: number, tieroAlto: number, estasStacio: boolean): { muroj: THREE.BufferGeometry; kadroj: THREE.BufferGeometry } {
  const supraLargho = estasStacio ? w * 0o5/0o10 : Math.max(0o215/0o100, w * 0o23/0o100);
  const supraProfundo = estasStacio ? d * 0o5/0o10 : Math.max(0o20/0o10, d * 0o23/0o100);
  const malpliiX = ( w / 2 - supraLargho / 2 ) / Math.max(1, tiers - 1);
  const malpliiZ = ( d / 2 - supraProfundo / 2 ) / Math.max(1, tiers - 1);
  const klino = MURA_KLINO;
  const murajGeometrioj: THREE.BufferGeometry[] = [], kadrajGeometrioj: THREE.BufferGeometry[] = [];
  for ( let i = 0; i < tiers; i++ ) {
    const hw = w / 2 - i * malpliiX, hd = d / 2 - i * malpliiZ, y = i * tieroAlto;
    const tavolo = kreiKlinoTavolon(hw, hd, hw - klino, hd - klino, tieroAlto);
    tavolo.translate(0, y + tieroAlto / 2, 0); murajGeometrioj.push(tavolo);
    for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) aldoniKadranTubon(kadrajGeometrioj, sX * hw, sZ * hd, y, y + tieroAlto, sX, sZ, true, klino);
    aldoniTavolanRandon(kadrajGeometrioj, hw, hd, y, klino, tieroAlto);
  }
  return { muroj: kunfandiGeometriojn(murajGeometrioj), kadroj: kunfandiGeometriojn(kadrajGeometrioj) };
}
function preniTavolajnGeometriojn(typeKey: string, w: number, d: number, tiers: number, tieroAlto: number): { muroj: THREE.BufferGeometry; kadroj: THREE.BufferGeometry } {
  const klavo = typeKey + "|" + tiers + "|" + w + "|" + d + "|" + tieroAlto;
  let g = tavolajKashmemoroj.get(klavo);
  if ( !g ) {
    g = tavolajGeometrioj(w, d, tiers, tieroAlto, typeKey === "stacioxipo");
    tavolajKashmemoroj.set(klavo, g);
  }
  return g;
}
export function konstruiSatalon(spec: KonstruSpec, sceno: THREE.Scene, selektajxoj: THREE.Mesh[]): THREE.Group {
  const { niveloj: tiers, tieroAlto, w, d, type: typeKey, name } = spec;
  const sube = spec.sube || 0;
  const estasStacio = typeKey === "stacioxipo";
  const supraLargho = estasStacio ? w * 0o5/0o10 : Math.max(0o215/0o100, w * 0o23/0o100);
  const supraProfundo = estasStacio ? d * 0o5/0o10 : Math.max(0o20/0o10, d * 0o23/0o100);
  const malpliiX = ( w / 2 - supraLargho / 2 ) / Math.max(1, tiers - 1), malpliiZ = ( d / 2 - supraProfundo / 2 ) / Math.max(1, tiers - 1);
  const T = TIPARO[typeKey] || TIPARO.domo;
  const muraKoloro = T.wall, kadraKoloro = T.frame;
  const klino = MURA_KLINO;
  const tavolaj = preniTavolajnGeometriojn(typeKey, w, d, tiers, tieroAlto);

  const group = new THREE.Group();
  const muraMaterialo = konstruajxaMaterialo("muro" + muraKoloro + ( typeKey === "kasafeo" ? "k" : "" ),
    () => new THREE.MeshStandardMaterial({ color: muraKoloro, roughness: typeKey === "kasafeo" ? 0o41/0o100 : 0o3/0o4, metalness: 0, envMapIntensity: 0 }));
  const kadraMaterialo = konstruajxaMaterialo("kadro" + kadraKoloro,
    () => kreiOranMaterialon(kadraKoloro));
  // ⟨ ទ្វារប្រើជញ្ជាំងខ្លួនឯង 📃 ⟩
  // ⟨ ទ្វារកញ្ចក់ 📃 ⟩
  const vitraPordo = typeKey === "kasafeo" || typeKey === "stacioxipo";
  const eniraMaterialo = vitraPordo
    ? fenestraMaterialo()
    : konstruajxaMaterialo("eniro" + muraKoloro, () => kreiPordanMaterialon(muraMaterialo));

  const muroj = new THREE.Mesh(tavolaj.muroj, muraMaterialo);
  muroj.castShadow = muroj.receiveShadow = true;
  muroj.userData = { spec, buildingType: T };
  selektajxoj.push(muroj);
  group.add(muroj);
  group.add(new THREE.Mesh(tavolaj.kadroj, kadraMaterialo));

  aldoniEnirejon(group, d, kadraMaterialo, eniraMaterialo,
    typeKey === "sanktejo" ? 4 : 1, tieroAlto, typeKey === "sanktejo");

  if ( typeKey === "sanktejo" ) {
    const pintajxo = new THREE.Mesh(new THREE.ConeGeometry(supraLargho * 0o43/0o100, 0o63/0o40, 4).rotateY(Math.PI / 4), kadraMaterialo);
    pintajxo.position.y = tiers * tieroAlto + 0o63/0o100; pintajxo.castShadow = true; group.add(pintajxo);
  }

  if ( typeKey === "stacioxipo" ) {
    const apronFormo = kreiRondigitanRektangulanFormon(w + 4, d + 4, 0o10/0o10);
    const apronGeo = new THREE.ExtrudeGeometry(apronFormo, { depth: 0o3/0o40, bevelEnabled: false, curveSegments: 0o10 });
    apronGeo.rotateX(-Math.PI / 2);
    apronGeo.translate(0, -0o1/0o40, 0);
    const apron = new THREE.Mesh(apronGeo, muraMaterialo);
    apron.receiveShadow = true; group.add(apron);
    for ( const sZ of [ -1, 1 ] ) {
      const b1 = new THREE.BoxGeometry(w + 4, 0o1/0o20, 0o5/0o20); b1.translate(0, 0o7/0o100, sZ * ( d / 2 + 0o4/0o10 )); group.add(new THREE.Mesh(b1, kadraMaterialo));
    }
    for ( const sX of [ -1, 1 ] ) {
      const b2 = new THREE.BoxGeometry(0o5/0o20, 0o1/0o20, d + 4); b2.translate(sX * ( w / 2 + 0o4/0o10 ), 0o7/0o100, 0); group.add(new THREE.Mesh(b2, kadraMaterialo));
    }
    for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
      const piliero = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o10, 0o3/0o20, 0o7/0o4, 6), kadraMaterialo);
      piliero.position.set(sX * ( w / 2 + 0o15/0o10 ), 0o7/0o10, sZ * ( d / 2 + 0o15/0o10 )); piliero.castShadow = true; group.add(piliero);
      const brilo = new THREE.Mesh(new THREE.SphereGeometry(0o5/0o40, 0o10, 0o6), eniraMaterialo);
      brilo.position.set(sX * ( w / 2 + 0o15/0o10 ), 0o7/0o4 + 0o5/0o40, sZ * ( d / 2 + 0o15/0o10 )); group.add(brilo);
    }
    const roofY = tiers * tieroAlto;
    const ringo = new THREE.Mesh(new THREE.RingGeometry(0o15/0o20, 0o23/0o20, 0o40).rotateX(-Math.PI / 2), kadraMaterialo);
    ringo.position.y = roofY + 0o1/0o40; group.add(ringo);
  }

  // ⟨ បង្អួចខាងក្រៅលើជ្រុងទាំងបួន 📃 ⟩
  // ⟨ ច្បាប់ 📃 ⟩
  // ⟨ ទីសក្ការៈ 📃 ⟩
  // ⟨ កន្លែងប្រជុំ ( កាហ្វេ ) 📃 ⟩
  const senEksterajFenestroj = typeKey === "domo" || typeKey === "mangxejo"
    || typeKey === "turo" || typeKey === "sanktejo";
  if ( !senEksterajFenestroj ) {
    const fenAlto = Math.min(0o5/0o10, tieroAlto * 0o23/0o100);
    const vitro = fenestraMaterialo();
    // ⟨ លេខរឹមមួយសម្រាប់អគារទាំងមូល 📃 ⟩
    const facoLarga = Math.min(w / 2, d / 2) - klino / 2;
    const fenMargxeno = fenestraMargxeno(facoLarga);
    for ( let i = 0; i < tiers; i++ ) {
      const hwT = w / 2 - i * malpliiX, hdT = d / 2 - i * malpliiZ;
      const faco = Math.min(hwT, hdT) - klino / 2;
      // ⟨ ស្រទាប់តូចពេក 📃 ⟩
      const horizontala = faco * 2 - fenMargxeno * 2 >= fenAlto;
      if ( !horizontala && faco < fenAlto * 0o1/0o2 + 0o1/0o10 ) continue;
      const yC = i * tieroAlto + tieroAlto / 2;
      for ( let f = 0; f < 4; f++ ) {
        if ( i === 0 && f === 0 ) continue;
        aldoniPilolFenestron(group, kadraMaterialo, vitro, f, yC, faco,
          klino, tieroAlto, fenAlto, false, horizontala ? fenMargxeno : undefined,
          !horizontala);
      }
    }
  }

  aldoniSteleanSignon(group, name, typeKey, w, d);

  const eksterajTabloj = typeKey === "mangxejo" && spec.fixed !== "kvar" ? new THREE.Group() : null;
  if ( eksterajTabloj ) {
    const lignaMaterialo = konstruajxaMaterialo("ligno",
      () => new THREE.MeshStandardMaterial({ color: LIGNA_KOLORO, roughness: 0o41/0o100, metalness: 0o11/0o100 }));
    for ( let i = -1; i <= 1; i += 2 ) {
      const tx = i * 5, tz = d / 2 + 3;
      aldoniManĝtablon(eksterajTabloj, tx, tz, 0, lignaMaterialo, kadraMaterialo);
    }
  }
  if ( sube > 0 && typeKey === "sanktejo" ) {
    // ⟨ មូលដ្ឋានរាបស្មើជាង 📃 ⟩
    const kadroW = w + 0o72/0o100, kadroD = d + 0o72/0o100;
    const dikeco = 0o1/0o2;
    const rAnguloj = 0o1/0o2;
    const platoAlto = 0o1/0o10;
    const kadroFormo = kreiRondigitanRektangulanFormon(kadroW, kadroD, rAnguloj);
    const ena = kreiRondigitanRektangulanFormon(
      kadroW - dikeco * 2, kadroD - dikeco * 2, Math.max(0o1/0o20, rAnguloj - dikeco)
).getPoints(0o40);
    kadroFormo.holes.push(new THREE.Path(ena.reverse()));
    const kadroGeo = new THREE.ExtrudeGeometry(kadroFormo, { depth: platoAlto, bevelEnabled: false, curveSegments: 0o40 });
    kadroGeo.rotateX(-Math.PI / 2);
    group.add(new THREE.Mesh(kadroGeo, kadraMaterialo));
  }

  group.position.set(spec.x, spec.h0 || 0, spec.z);
  group.rotation.y = spec.rot;
  sceno.add(group);
  if ( spec.diamond ) aldoniDiamantanSpegulon(sceno, spec, group, w);
  if ( eksterajTabloj ) group.add(eksterajTabloj);
  return group;
}
