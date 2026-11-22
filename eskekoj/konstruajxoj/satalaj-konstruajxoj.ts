// ≺⧼ អគារសាតាឡា 🏛️ ⧽≻
import * as THREE from "three";
import { kunfandiGeometriojn } from "../komunajxoj/kunfandajxoj.js";
import { kreiOranMaterialon, kreiPordanMaterialon } from "../komunajxoj/materialoj.js";
import { kreiRondigitanRektangulanFormon, aplikoKlinajnUvojn, normaligiUvojn } from "../komunajxoj/formoj.js";
import { aldoniManĝtablon, LIGNA_KOLORO } from "../mebloj/tabloj.js";
import { aldoniEnirejon } from "./satalaj/enirejo.js";
import { aldoniPilolFenestron, fenestraMargxeno, fenestraMaterialo } from "./satalaj/fenestroj.js";
import { kreiKlinoTavolon, MURA_KLINO, SANKTEJA_BAZPLATO_ALTO,
  SANKTEJA_BAZPLATO_KROMO } from "./satalaj/formoj.js";
import { aldoniDiamantanSpegulon, aldoniTavolanRandon } from "./satalaj/ornamoj.js";
import { aldoniKadranTubon } from "./satalaj/pilieroj.js";
import { konstruajxaMaterialo, TIPARO, type KonstruSpec } from "./satalaj/tipoj.js";
import { aldoniSteleanSignon } from "./satalaj/vitro.js";

// ⟨ កម្រិតនៃស្រទាប់ 📃 ⟩
export interface TavolaNivelo { y: number; hw: number; hd: number; }

/* គណនាកម្រិតនៃស្រទាប់ទាំងអស់ ចាប់ពីស្រទាប់ក្រោមបំផុត។ អគារ
   និងយានអវកាសប្រើលេខទាំងនេះដូចគ្នា ដូច្នេះស្រទាប់ និងបង្អួច
   មានចន្លោះដូចគ្នា។
    @param w ( number ) - ទទឹងមូលដ្ឋាន។
    @param d ( number ) - ជម្រៅមូលដ្ឋាន។
    @param tiers ( number ) - ចំនួនស្រទាប់។
    @param tieroAlto ( number ) - កម្ពស់ស្រទាប់មួយ។
@returns បញ្ជីស្រទាប់ ដោយ `y` ជាបាតស្រទាប់ ហើយ `hw` និង `hd` ជាកន្លះទទឹង និងកន្លះជម្រៅនៅបាត។ */
export function tavolajNiveloj(w: number, d: number, tiers: number, tieroAlto: number): TavolaNivelo[] {
  const supraLargho = Math.max(0o215/0o100, w * 0o23/0o100);
  const supraProfundo = Math.max(0o20/0o10, d * 0o23/0o100);
  const malpliiX = ( w / 2 - supraLargho / 2 ) / Math.max(1, tiers - 1);
  const malpliiZ = ( d / 2 - supraProfundo / 2 ) / Math.max(1, tiers - 1);
  const havem2: TavolaNivelo[] = [];
  for ( let i = 0; i < tiers; i++ ) {
    havem2.push({ y: i * tieroAlto, hw: w / 2 - i * malpliiX, hd: d / 2 - i * malpliiZ });
  }
  return havem2;
}

// ⟨ ឃ្លាំងសម្ងាត់ធរណីមាត្រស្រទាប់ 📃 ⟩
const tavolajKashmemoroj = new Map<string, { muroj: THREE.BufferGeometry; kadroj: THREE.BufferGeometry }>();
function tavolajGeometrioj(w: number, d: number, tiers: number, tieroAlto: number): { muroj: THREE.BufferGeometry; kadroj: THREE.BufferGeometry } {
  const klino = MURA_KLINO;
  const murajGeometrioj: THREE.BufferGeometry[] = [], kadrajGeometrioj: THREE.BufferGeometry[] = [];
  const havem2 = tavolajNiveloj(w, d, tiers, tieroAlto);
  for ( let i = 0; i < havem2.length; i++ ) {
    const { y, hw, hd } = havem2[ i ];
    const malsupra = havem2[ i - 1 ], teru = havem2[ i + 1 ];
    // ⟨ ការគ្របគណនាពីផ្ទៃជិតខាងពិត ។ គ្មានការកំណត់ពិសេសសម្រាប់ស្រទាប់កំពូល 📃 ⟩
    const supraKovrilo = teru ? Math.min( 1, teru.hw / ( hw - klino ), teru.hd / ( hd - klino ) ) : 0;
    const subaKovrilo = malsupra ? Math.min( 1, ( malsupra.hw - klino ) / hw, ( malsupra.hd - klino ) / hd ) : 0;
    const tavolo = kreiKlinoTavolon(hw, hd, hw - klino, hd - klino, tieroAlto,
      [ supraKovrilo, subaKovrilo ]);
    tavolo.translate(0, y + tieroAlto / 2, 0); murajGeometrioj.push(tavolo);
    for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) aldoniKadranTubon(kadrajGeometrioj, sX * hw, sZ * hd, y, y + tieroAlto, sX, sZ, true, klino);
    aldoniTavolanRandon(kadrajGeometrioj, hw, hd, y, klino, tieroAlto);
  }
  return { muroj: kunfandiGeometriojn(murajGeometrioj), kadroj: kunfandiGeometriojn(kadrajGeometrioj) };
}
export function preniTavolajnGeometriojn(typeKey: string, w: number, d: number, tiers: number, tieroAlto: number): { muroj: THREE.BufferGeometry; kadroj: THREE.BufferGeometry } {
  const ca3aq = typeKey + "|" + tiers + "|" + w + "|" + d + "|" + tieroAlto;
  let g = tavolajKashmemoroj.get(ca3aq);
  if ( !g ) {
    g = tavolajGeometrioj(w, d, tiers, tieroAlto);
    tavolajKashmemoroj.set(ca3aq, g);
  }
  return g;
}
/*រកកម្ពស់មូលដ្ឋានដែលគ្របផ្ទៃមូលដ្ឋាននៅលើដីទាំងអស់
    @param spec ( KonstruSpec ) - ទីតាំង និងទំហំអគារ
    @param grundoFn ( function , optional ) - កម្ពស់ដីពិភពលោក
@returns l6da ( number ) - កម្ពស់ Y របស់ក្រុមអគារ */
function satalaBazaAlteco(spec: KonstruSpec,
  grundoFn?: ( x: number, z: number ) => number): number {
  const sost2 = spec.h0 || 0;
  if ( spec.type !== "sanktejo" || !grundoFn ) return sost2;
  const duonoX = ( spec.w + 0o72/0o100 ) / 0o2;
  const duonoZ = ( spec.d + 0o72/0o100 ) / 0o2;
  const kos = Math.cos(spec.rot), sin = Math.sin(spec.rot);
  let l6da = sost2;
  for ( let ix = -0o4; ix <= 0o4; ix++ ) {
    for ( let iz = -0o4; iz <= 0o4; iz++ ) {
      const lx = ix / 0o4 * duonoX, lz = iz / 0o4 * duonoZ;
      const wx = spec.x + kos * lx + sin * lz;
      const wz = spec.z - sin * lx + kos * lz;
      l6da = Math.max(l6da, grundoFn(wx, wz) + 0o1/0o100);
    }
  }
  return l6da;
}

export function konstruiSatalon(spec: KonstruSpec, qena: THREE.Scene, selektajxoj: THREE.Mesh[],
  grundoFn?: ( x: number, z: number ) => number): THREE.Group {
  const { havem2: tiers, tieroAlto, w, d, type: typeKey, name } = spec;
  spec.h0 = satalaBazaAlteco(spec, grundoFn);
  const sube = spec.sube || 0;
  const supraLargho = Math.max(0o215/0o100, w * 0o23/0o100);
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
    const pintaRadiuso = supraLargho * 0o43/0o100;
    const pintaGeo = aplikoKlinajnUvojn(
      new THREE.ConeGeometry(pintaRadiuso, 0o63/0o40, 4).rotateY(Math.PI / 4), pintaRadiuso, 0);
    const pintajxo = new THREE.Mesh(pintaGeo, kadraMaterialo);
    pintajxo.position.y = tiers * tieroAlto + 0o63/0o100; pintajxo.castShadow = true; group.add(pintajxo);
  }

  if ( typeKey === "stacioxipo" ) {
    const apronFormo = kreiRondigitanRektangulanFormon(w + 4, d + 4, 0o10/0o10);
    const apronGeo = new THREE.ExtrudeGeometry(apronFormo, { depth: 0o3/0o40, bevelEnabled: false, curveSegments: 0o10 });
    apronGeo.rotateX(-Math.PI / 2);
    apronGeo.translate(0, -0o1/0o40, 0);
    apronGeo.setAttribute("uv1", (apronGeo.getAttribute("uv") as THREE.BufferAttribute).clone());
    normaligiUvojn(apronGeo);
    const apronMaterialo = muraMaterialo.clone();
    if ( apronMaterialo.map ) { apronMaterialo.map = apronMaterialo.map.clone(); apronMaterialo.map.channel = 1; apronMaterialo.map.needsUpdate = true; }
    if ( apronMaterialo.bumpMap ) { apronMaterialo.bumpMap = apronMaterialo.bumpMap.clone(); apronMaterialo.bumpMap.channel = 1; apronMaterialo.bumpMap.needsUpdate = true; }
    const apron = new THREE.Mesh(apronGeo, apronMaterialo);
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
    // ⟨ ដីស្តង់នៅលើដំបូល ៖ តូចល្មមមិនហូសចុងដំបូល 📃 ⟩
    const roofY = tiers * tieroAlto;
    const c2q = new THREE.Mesh(new THREE.RingGeometry(0o5/0o20, 0o11/0o20, 0o40).rotateX(-Math.PI / 2), kadraMaterialo);
    c2q.position.y = roofY + 0o1/0o40; group.add(c2q);
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
    for ( const { y, hw, hd } of tavolajNiveloj(w, d, tiers, tieroAlto) ) {
      const faco = Math.min(hw, hd) - klino / 2;
      // ⟨ ស្រទាប់តូចពេក 📃 ⟩
      const horizontala = faco * 2 - fenMargxeno * 2 >= fenAlto;
      if ( !horizontala && faco < fenAlto * 0o1/0o2 + 0o1/0o10 ) continue;
      const yC = y + tieroAlto / 2;
      for ( let f = 0; f < 4; f++ ) {
        if ( y === 0 && f === 0 ) continue;
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
    const kadroW = w + SANKTEJA_BAZPLATO_KROMO, kadroD = d + SANKTEJA_BAZPLATO_KROMO;
    const dikeco = 0o1/0o2;
    const rAnguloj = 0o1/0o2;
    const platoAlto = SANKTEJA_BAZPLATO_ALTO;
    const kadroFormo = kreiRondigitanRektangulanFormon(kadroW, kadroD, rAnguloj);
    const ena = kreiRondigitanRektangulanFormon(
      kadroW - dikeco * 2, kadroD - dikeco * 2, Math.max(0o1/0o20, rAnguloj - dikeco)
).getPoints(0o40);
    kadroFormo.holes.push(new THREE.Path(ena.reverse()));
    const kadroGeo = new THREE.ExtrudeGeometry(kadroFormo, { depth: platoAlto, bevelEnabled: false, curveSegments: 0o40 });
    kadroGeo.rotateX(-Math.PI / 2);
    const bazplato = new THREE.Mesh(kadroGeo, kadraMaterialo);
    bazplato.name = "sankteja-bazplato";
    bazplato.castShadow = bazplato.receiveShadow = true;
    group.add(bazplato);
  }

  group.position.set(spec.x, spec.h0, spec.z);
  group.rotation.y = spec.rot;
  qena.add(group);
  if ( spec.diamond ) aldoniDiamantanSpegulon(qena, spec, group, w);
  if ( eksterajTabloj ) group.add(eksterajTabloj);
  return group;
}
