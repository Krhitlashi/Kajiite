// Kunfanda modulo — komunaj geometriaj kunfand-helpiloj por la tuta mondo
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

// kunfandiGeometriojn — Kunfandas plurajn BufferGeometriojn en unu indeksitan
// geometrion, konservante poziciojn, normalojn, UV-ojn kaj la indekson
// ( 0o20/0o40-bita laŭ la vertokvanto ). Ne-indeksaj enigoj ricevas sintezitajn
// sinsekvajn indeksojn. La UV-oj gravas por teksturitaj geometrioj ( ekz. la
// keŭfĥeso-korpo kun sia bakita folia teksturo ) — sen ili la mapo neniam
// specimeniĝas kaj la koloro aperas blanka.
export function kunfandiGeometriojn(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  if ( geos.length === 0 ) return new THREE.BufferGeometry();
  let tv = 0, ti = 0;
  for ( const g of geos ) {
    tv += g.getAttribute("position").count;
    ti += g.index ? g.index.count : g.getAttribute("position").count;
  }
  const pozicio = new Float32Array(tv * 3);
  const normo = new Float32Array(tv * 3);
  const uv = new Float32Array(tv * 2);
  const idxArr = tv > 65535 ? new Uint32Array(ti) : new Uint16Array(ti);
  let vo = 0, io = 0;
  for ( const g of geos ) {
    const p = g.getAttribute("position");
    const n = g.getAttribute("normal");
    const u = g.getAttribute("uv");
    const c = p.count;
    pozicio.set(p.array as Float32Array, vo * 3);
    if ( n ) normo.set(n.array as Float32Array, vo * 3);
    if ( u ) uv.set(u.array as Float32Array, vo * 2);
    const indico = g.index;
    if ( indico ) {
      for ( let i = 0; i < indico.array.length; i++ ) idxArr[io + i] = indico.array[i] + vo;
      io += indico.array.length;
    } else {
      for ( let i = 0; i < c; i++ ) idxArr[io + i] = i + vo;
      io += c;
    }
    vo += c;
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(pozicio, 3));
  out.setAttribute("normal", new THREE.BufferAttribute(normo, 3));
  out.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  out.setIndex(new THREE.BufferAttribute(idxArr, 1));
  return out;
}

// kreiBuferanGeometrion — Komuna pakado de bufera geometrio. Kreu la geometrion,
// atribuu la poziciojn ( kaj laŭvole la UV-ojn aŭ laŭtorejn normalojn ), fiksu la
// indekson kaj kalkulu la normalojn ( nur se ili ne estas aŭtoritaj ).
//     @param pozicioj ( number[] ) - La verticaj pozicioj ( ×3 ).
//     @param indeksoj ( number[] ) - La triangulaj indeksoj.
//     @param agordoj ( object = {} ) - Laŭvolaj atributoj.
//         uvoj ( number[] = undefined ) - La UV-oj ( ×2 ).
//         normaloj ( number[] = undefined ) - Aŭtoritaj normaloj ( ×3 );
//             se donita, la normaloj NE rekalkuliĝas.
//     @returns geometrio ( THREE.BufferGeometry ) - La preta geometrio.
export function kreiBuferanGeometrion(pozicioj: number[], indeksoj: number[],
  agordoj: { uvoj?: number[]; normaloj?: number[] } = {}
): THREE.BufferGeometry {
  const geometrio = new THREE.BufferGeometry();
  geometrio.setAttribute("position", new THREE.Float32BufferAttribute(pozicioj, 3));
  if ( agordoj.uvoj ) geometrio.setAttribute("uv", new THREE.Float32BufferAttribute(agordoj.uvoj, 2));
  if ( agordoj.normaloj ) geometrio.setAttribute("normal", new THREE.Float32BufferAttribute(agordoj.normaloj, 3));
  geometrio.setIndex(indeksoj);
  if ( !agordoj.normaloj ) geometrio.computeVertexNormals();
  return geometrio;
}

// kunfandiDuGeometriojn — Kunfandas du geometriojn SEN indekso, konservante la
// triangulan ordon kaj la UV-ojn. Ideala por plantoj kun alfa-testataj teksturoj.
export function kunfandiDuGeometriojn(a: THREE.BufferGeometry, b: THREE.BufferGeometry): THREE.BufferGeometry {
  // Ne-indeksaj geometrioj konservas la triangulan ordon dum kunfando;
  // alie la indekso perdiĝas kaj duono de ĉiu ebeno neniam bildiĝas.
  const na = a.index ? a.toNonIndexed() : a;
  const nb = b.index ? b.toNonIndexed() : b;
  const aPos = na.getAttribute("position");
  const bPos = nb.getAttribute("position");
  const aCount = aPos.count;
  const bCount = bPos.count;
  const tuto = aCount + bCount;

  const pozicio = new Float32Array(tuto * 3);
  const normo = new Float32Array(tuto * 3);
  const uv = new Float32Array(tuto * 2);

  pozicio.set(aPos.array as Float32Array, 0);
  pozicio.set(bPos.array as Float32Array, aCount * 3);

  const aNorm = na.getAttribute("normal");
  const bNorm = nb.getAttribute("normal");
  if ( aNorm ) normo.set(aNorm.array as Float32Array, 0);
  if ( bNorm ) normo.set(bNorm.array as Float32Array, aCount * 3);

  const aUV = na.getAttribute("uv");
  const bUV = nb.getAttribute("uv");
  if ( aUV ) uv.set(aUV.array as Float32Array, 0);
  if ( bUV ) uv.set(bUV.array as Float32Array, aCount * 2);

  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(pozicio, 3));
  out.setAttribute("normal", new THREE.BufferAttribute(normo, 3));
  out.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  // ⟨ La per-vertaj koloroj 📃 ⟩ — la herbo kaj la filikoj portas la nuancon de
  // ĉiu folio en la vertica kolor-aro ( vertexColors ), kaj sen la kunfando de
  // tiu atributo la tuta foliaro ricevus la koloron de la UNUA folio. Nur
  // kunfandiĝas kiam AMBAŬ flankoj havas la atributon.
  const aKol = na.getAttribute("color");
  const bKol = nb.getAttribute("color");
  if ( aKol && bKol ) {
    const koloroj = new Float32Array(tuto * 3);
    koloroj.set(aKol.array as Float32Array, 0);
    koloroj.set(bKol.array as Float32Array, aCount * 3);
    out.setAttribute("color", new THREE.BufferAttribute(koloroj, 3));
  }
  return out;
}

// kunfandiGeometriojnSenIndekson — Redukta kunfando de pluraj geometrioj per
// kunfandiDuGeometriojn ( sen indekso, kun UV-oj ).
export function kunfandiGeometriojnSenIndekson(geometrioj: THREE.BufferGeometry[]): THREE.BufferGeometry {
  if ( geometrioj.length === 0 ) return new THREE.BufferGeometry();
  return geometrioj.slice(1).reduce(( rezulto, geometrio ) => kunfandiDuGeometriojn(rezulto, geometrio), geometrioj[0]);
}

// ⟪ Kunfando de jam konstruitaj meshoj 📃 ⟫ — la supraj helpiloj kunfandas
// GEOMETRIOJN dum la konstruado; ĉi tiu kunfandas meshojn kiuj jam staras en
// la sceno. La urbaj konstruaĵoj estas la lasta granda fonto de desegnaj
// alvokoj — ĉiu el la ~40 konstruaĵoj konsistas el 15-20 etaj meshoj ( la
// pintaj randoj, la pordaj tuboj, la signoj, la fenestroj, la tabloj ), kaj
// ĉiu el ili estas aparta alvoko en la ĉefa pasumo KAJ en la ombra pasumo.
// La konstruaĵoj estas senmovaj, do ili povas dividi la samajn kunigitajn
// meshojn.

// KunfandajOpcioj — La agordoj de kunfandiMondajnMeshojn.
//     celo ( number = 0 ) - La spaca ĉela grandeco por la kunigoj ( 0 = unu
//         kunigo por ĉiu materialo, sen spaca divido ). Ĉelo tenas la kunigojn
//         malgrandaj, do la vidkampo ankoraŭ forigas la malproksimajn partojn.
//     konservu ( funkcio = undefined ) - Kiuj meshoj restu APARTAJ ( la
//         elekteblaj muroj — la klako bezonas la specon de unuopa konstruaĵo ).
export interface KunfandajOpcioj {
  celo?: number;
  konservu?: ( m: THREE.Mesh ) => boolean;
}

// La sumaj nombroj de ĉiuj kunfandoj ĝis nun — por la diagnoza surmetaĵo
// ( src/statistiko.ts ). Unu nombro diras pli ol la tuta bildigo: "640 meshoj
// fariĝis 34" pruvas la ŝparadon sen mezuri kadrojn.
const kunfandajRezultoj = { antaŭe: 0, poste: 0 };

// kunfandajxoStatistiko — La sumaj nombroj de la kunfandoj.
//     @returns ( { antaŭe, poste } ) - Kiom da meshoj estis kaj kiom restis.
export function kunfandajxoStatistiko(): { antaŭe: number; poste: number } {
  return kunfandajRezultoj;
}

// renversiVolvon — Inversigu la triangulan ventumilon de geometrio ( por la
// spegulitaj kopioj ). Indeksitaj geometrioj inversigas la indeksojn, senindeksaj
// interŝanĝas la duan kaj trian verton de ĉiu triangulo en ĉiuj atributoj.
function renversiVolvon(g: THREE.BufferGeometry): void {
  if ( g.index !== null ) {
    const arr = g.index.array;
    for ( let i = 0; i < arr.length; i += 3 ) {
      const t = arr[i + 1]; arr[i + 1] = arr[i + 2]; arr[i + 2] = t;
    }
    g.index.needsUpdate = true;
    return;
  }
  for ( const nomo of Object.keys(g.attributes) ) {
    const at = g.attributes[nomo], s = at.itemSize, arr = at.array as Float32Array;
    for ( let i = 0; i + 2 < at.count; i += 3 ) {
      for ( let k = 0; k < s; k++ ) {
        const a = ( i + 1 ) * s + k, b = ( i + 2 ) * s + k, t = arr[a];
        arr[a] = arr[b]; arr[b] = t;
      }
    }
    at.needsUpdate = true;
  }
}

// kunfandiMondajnMeshojn — Kunfandu la senmovajn meshojn de la donitaj radikoj
// en malmultaj meshoj PO ( materialo · ombra stato · bildiga ordo · tavolo ·
// verto-signaturo · spaca ĉelo ). La geometrioj transformiĝas al la MONDA
// spaco ( la kunigitaj meshoj havas identecon ), do la fontaj grupoj povas havi
// ajnan transformon. La ORIGINALAJ geometrioj ne disponiĝas — ili povas esti
// dividataj inter pluraj meshoj ( la spegulaj klonoj ) — nur la laboraj klonoj.
//     @param gepatra ( THREE.Object3D ) - Kie la kunigitaj meshoj aldoniĝu.
//     @param radikoj ( THREE.Object3D[] ) - La radikoj de la kunfandotaj arboj.
//     @param opcioj ( KunfandajOpcioj = {} ) - La agordoj ( vidu supre ).
//     @returns ( { antaŭe, poste } ) - Kiom da meshoj estis kaj kiom restis.
export function kunfandiMondajnMeshojn(gepatra: THREE.Object3D, radikoj: THREE.Object3D[],
  opcioj: KunfandajOpcioj = {}
): { antaŭe: number; poste: number } {
  const celo = opcioj.celo || 0;
  const konservu = opcioj.konservu;
  const grupoj = new Map<string, { mesho: THREE.Mesh; matrico: THREE.Matrix4 }[]>();
  let antaŭe = 0;
  for ( const radiko of radikoj ) {
    radiko.updateWorldMatrix(true, true);
    radiko.traverse(o => {
      if ( !o.visible ) return;
      const m = o as THREE.Mesh;
      // Instancigitaj tavoloj, punktaj sistemoj kaj material-aroj restas siaj.
      if ( m.isMesh !== true || ( m as THREE.InstancedMesh ).isInstancedMesh === true ) return;
      if ( Array.isArray(m.material) ) return;
      if ( konservu !== undefined && konservu(m) ) return;
      antaŭe++;
      const geometrio = m.geometry;
      // La verto-signaturo — mergeGeometries postulas identajn atributojn
      // ( kaj indekson en ĉiuj aŭ en neniuj ).
      const signaturo = Object.keys(geometrio.attributes).sort().join(",")
        + ( geometrio.index === null ? "|n" : "|i" );
      const matrico = m.matrixWorld;
      const ĉelo = celo > 0
        ? Math.floor(matrico.elements[12] / celo) + "," + Math.floor(matrico.elements[14] / celo)
        : "-";
      const ŝlosilo = [ m.material.uuid, m.castShadow ? 1 : 0, m.receiveShadow ? 1 : 0,
        m.renderOrder, m.layers.mask, signaturo, ĉelo ].join("|");
      let listo = grupoj.get(ŝlosilo);
      if ( listo === undefined ) grupoj.set(ŝlosilo, listo = []);
      listo.push({ mesho: m, matrico: matrico.clone() });
    });
  }
  let poste = 0;
  for ( const listo of grupoj.values() ) {
    if ( listo.length < 2 ) { poste += listo.length; continue; }
    const geometrioj = listo.map(a => {
      const g = a.mesho.geometry.clone();   // la klono estas nia — vi povas disponigi ĝin
      g.applyMatrix4(a.matrico);
      // ⟨ La spegulitaj geometrioj 📃 ⟩ — la diamanta spegulo sub ĉiu konstruaĵo
      // havas NEGATIVAN determinanton ( scale.y = -1 ). three.js inversigas la
      // ventumilon de la trianguloj por tiaj objektoj dum bildigo ( frontFaceCW ),
      // sed la bakita geometrio havas identecon — do la ventumilo inversiĝu
      // MANE, alie la tuta spegulo malaperus malantaŭ la malantaŭaj facoj.
      if ( a.matrico.determinant() < 0 ) renversiVolvon(g);
      return g;
    });
    const kunigita = mergeGeometries(geometrioj, false);
    for ( const g of geometrioj ) g.dispose();
    if ( kunigita === null ) { poste += listo.length; continue; }   // ne kongruaj
    const unua = listo[0].mesho;
    const mesho = new THREE.Mesh(kunigita, unua.material);
    mesho.castShadow = unua.castShadow;
    mesho.receiveShadow = unua.receiveShadow;
    mesho.renderOrder = unua.renderOrder;
    mesho.layers.mask = unua.layers.mask;
    // La uzant-datumojn nur se ĉiuj anoj dividas la SAMAN objekton ( alie la
    // kunigo portus la identecon de unu el ili ).
    let samaj: Record<string, unknown> | null = unua.userData;
    for ( const a of listo ) if ( a.mesho.userData !== samaj ) { samaj = null; break; }
    if ( samaj !== null ) mesho.userData = samaj;
    // La nomo markas la kunigojn — la diagnoza censo ( statistiko.ts ) povas
    // tiel apartigi ilin de la ceteraj scenaj objektoj.
    mesho.name = "kunigita";
    gepatra.add(mesho);
    for ( const a of listo ) a.mesho.removeFromParent();
    poste++;
  }
  kunfandajRezultoj.antaŭe += antaŭe;
  kunfandajRezultoj.poste += poste;
  return { antaŭe, poste };
}

// kunfandiKajVeldoiGeometriojn — Kunfandas la partojn en UNU geometrion kaj
// VELDAS la koincidajn vertojn ( la ferma-kapo-rando kun la unua/lasta ringo
// de la svingo ) kaj REKOMPUTAS la normalojn. la kapoj ombrigxas seninterrompe
// — NENIA videbla kudro cxe la supro aux la malsupro; la supro estas unu glata
// strukturo ( la hoka pinto kreskas el la sxafto, ne kusxas kiel kovrilo ).
export function kunfandiKajVeldoiGeometriojn(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  if ( geos.length === 0 ) return new THREE.BufferGeometry();
  const unu = kunfandiGeometriojn(geos);
  const pozicio = unu.getAttribute("position") as THREE.BufferAttribute;
  const idxArr = unu.getIndex()!.array as Uint16Array | Uint32Array;
  const tv = pozicio.count;
  // Veldi. Koincidaj vertoj ( en 0o1/0o10000 ) dividas la saman indekson. La pli fajna
  // krado gravas cxe la eta fina ringo. je 0o1/0o1000 pluraj najbaraj rondangulaj
  // punktoj kunfalis en la saman verton kaj kreis la videblan krucan cxapon.
  const skalo = 4096;
  const mapo = new Map<string, number>();
  const novaIndekso = new Uint32Array(tv);
  let nv = 0;
  for ( let i = 0; i < tv; i++ ) {
    const sxlosilo = Math.round(pozicio.getX(i) * skalo) + "," + Math.round(pozicio.getY(i) * skalo) + "," + Math.round(pozicio.getZ(i) * skalo);
    const trovita = mapo.get(sxlosilo);
    if ( trovita !== undefined ) { novaIndekso[i] = trovita; }
    else { mapo.set(sxlosilo, nv); novaIndekso[i] = nv; nv++; }
  }
  const veldita = new Float32Array(nv * 3);
  for ( let i = 0; i < tv; i++ ) {
    veldita[novaIndekso[i]*3] = pozicio.getX(i);
    veldita[novaIndekso[i]*3+1] = pozicio.getY(i);
    veldita[novaIndekso[i]*3+2] = pozicio.getZ(i);
  }
  for ( let i = 0; i < idxArr.length; i++ ) idxArr[i] = novaIndekso[idxArr[i]];
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(veldita, 3));
  out.setIndex(new THREE.BufferAttribute(idxArr, 1));
  out.computeVertexNormals();
  return out;
}
