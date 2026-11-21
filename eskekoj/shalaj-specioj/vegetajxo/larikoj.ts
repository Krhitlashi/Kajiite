// ≺⧼ ដើមល្មុត 🌲 ⧽≻
import * as THREE from "three";
import { kreiLarikanSxelanTeksajxon } from "../../komunajxoj/teksajxoj/larika-sxelo.js";
import { kreiLarikanSxelanBumpanTeksajxon } from "../../komunajxoj/teksajxoj/larika-sxelo-bumpo.js";
import { kunfandiGeometriojnSenIndekson } from "../../komunajxoj/kunfandajxoj.js";
import { KRONA_GEOMETRIA_RADIUSO, TAVOLA_PROPORCIO, kronaRadiusoLarika } from "./kronoj.js";
import { kreiKlinoQuaternionon, kreiPoziciilon, hazardaKoloro, kreiVegetajxanHazardon } from "./hazardoj.js";
import type { ArboMetado } from "./metado.js";
import { kreiTrunkanGeometrion } from "./trunkoj.js";
import { ombraKoloro } from "../../komunajxoj/koloroj.js";

function konstruiLarikanFoliaranGeometrion(): { folioj: THREE.BufferGeometry; brancxoj: THREE.BufferGeometry } {
  const partoj: THREE.BufferGeometry[] = [];
  const branĉajPartoj: THREE.BufferGeometry[] = [];
  // ⟨ កំពូល 📃 ⟩
  const ALTO = 1;
  const KERNA_BOT = 0o3/0o100;
  const KERNA_SUP = 0o1/0o100;
  const kerno = new THREE.CylinderGeometry(KERNA_SUP, KERNA_BOT, ALTO, 0o12, 0o3);
  kerno.translate(0, ALTO / 2, 0);
  branĉajPartoj.push(kerno);
  const eksteraR = ( t: number ): number => 0o1/0o2 * Math.pow(1 - t, 0o7/0o10) + 0o1/0o100;
  const kernaR = ( t: number ): number => KERNA_BOT + ( KERNA_SUP - KERNA_BOT ) * t;

  const hazardo = kreiVegetajxanHazardon(0o101667);
  const kreiPinglanKarteton = ( longo: number, dikeco: number ): THREE.BufferGeometry => {
    const pozicioj: number[] = [];
    const uvoj: number[] = [];
    const indeksoj: number[] = [];
    const segmentoj = 0o3;
    for ( let i = 0; i <= segmentoj; i++ ) {
      const t = i / segmentoj;
      const duonLargho = dikeco * ( 0o1/0o10 + 0o2/0o5 * Math.sin(t * Math.PI) );
      const kurbo = longo * 0o1/0o10 * Math.sin(t * Math.PI);
      pozicioj.push(longo * t, -duonLargho, kurbo,
        longo * t, 0, kurbo + dikeco * 0o1/0o4,
        longo * t, duonLargho, kurbo);
      uvoj.push(t, 0, t, 0o1/0o2, t, 0o1);
      if ( i === segmentoj ) continue;
      for ( let j = 0; j < 0o2; j++ ) {
        const bazo = i * 0o3 + j;
        indeksoj.push(bazo, bazo + 0o3, bazo + 0o1,
          bazo + 0o1, bazo + 0o3, bazo + 0o4);
      }
    }
    const geometrio = new THREE.BufferGeometry();
    geometrio.setAttribute("position", new THREE.Float32BufferAttribute(pozicioj, 0o3));
    geometrio.setAttribute("uv", new THREE.Float32BufferAttribute(uvoj, 0o2));
    geometrio.setIndex(indeksoj);
    geometrio.computeVertexNormals();
    return geometrio;
  };

  const kreiPinglanVentumilon = ( longo: number, dikeco: number,
    klinoM = 0o6/0o10 ): THREE.BufferGeometry => {
    const fasko = ( turno: number ): THREE.BufferGeometry => {
      const pingloj: THREE.BufferGeometry[] = [];
      const kvanto = 0o5;
      for ( let j = 0; j < kvanto; j++ ) {
        const t = j / ( kvanto - 1 ) - 0o5/0o10;
        // ⟨ ការប្រែប្រួលម្ជុល 📃 ⟩
        const klino = t * klinoM + ( hazardo() - 0o5/0o10 ) * 0o3/0o10;
        const pinglo = kreiPinglanKarteton(
          longo * ( 0o4/0o5 + hazardo() * 0o4/0o10 ), dikeco);
        pinglo.applyMatrix4(new THREE.Matrix4().makeRotationY(turno));
        pinglo.applyMatrix4(new THREE.Matrix4().makeRotationY(
          t * 0o14/0o10 + ( hazardo() - 0o5/0o10 ) * 0o1/0o10));
        pinglo.applyMatrix4(new THREE.Matrix4().makeRotationX(
          ( hazardo() - 0o5/0o10 ) * 0o5/0o10));
        pinglo.applyMatrix4(new THREE.Matrix4().makeRotationZ(klino));
        pingloj.push(pinglo);
      }
      return kunfandiGeometriojnSenIndekson(pingloj);
    };
    return fasko(0);
  };

  const kirloj = 0o10;
  const faskojPoKirlo = 0o7;
  for ( let i = 0; i < kirloj * faskojPoKirlo; i++ ) {
    const kirlo = Math.floor(i / faskojPoKirlo);
    const enKirlo = i % faskojPoKirlo;
    const a = enKirlo / faskojPoKirlo * Math.PI * 2 + kirlo * 0o7/0o20
      + ( hazardo() - 0o5/0o10 ) * 0o1/0o10;
    const t = 0o7/0o100 + ( kirlo / ( kirloj - 1 ) ) * 0o66/0o100;
    const y = t * ALTO;
    const kR = kernaR(t);
    const bazoP = new THREE.Vector3(Math.cos(a) * kR, y, Math.sin(a) * kR);
    const akso = new THREE.Vector3(Math.cos(a), 0o1/0o10 + hazardo() * 0o1/0o10,
      Math.sin(a)).normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0o1, 0), akso);
    const longo = ( eksteraR(t) - kR ) * ( 0o7/0o10 + hazardo() * 0o1/0o4 );
    const branĉo = new THREE.CylinderGeometry(0o1/0o1000, 0o1/0o100, longo, 0o5)
      .translate(0, longo / 0o2, 0);
    branĉo.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(q));
    branĉo.translate(bazoP.x, bazoP.y, bazoP.z);
    branĉajPartoj.push(branĉo);
    for ( let j = 0; j < 0o4; j++ ) {
      const laux = ( j + 0o1 ) / 0o4;
      const pinglaAkso = new THREE.Vector3(Math.cos(a) * 0o1/0o2,
        0o1, Math.sin(a) * 0o1/0o2).normalize();
      const qPingloj = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0o1, 0, 0), pinglaAkso);
      const ventumilo = kreiPinglanVentumilon(0o5/0o100 + hazardo() * 0o3/0o100,
        0o1/0o100, 0o3/0o4);
      ventumilo.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(qPingloj));
      ventumilo.translate(bazoP.x + akso.x * longo * laux,
        bazoP.y + akso.y * longo * laux, bazoP.z + akso.z * longo * laux);
      partoj.push(ventumilo);
    }
  }
  const supro = kreiPinglanVentumilon(0o1/0o10, 0o1/0o100, 0o3/0o4);
  supro.rotateZ(Math.PI / 0o2);
  supro.translate(0, ALTO, 0);
  partoj.push(supro);
  return { folioj: kunfandiGeometriojnSenIndekson(partoj),
    brancxoj: kunfandiGeometriojnSenIndekson(branĉajPartoj) };
}

export function konstruiLarikon(sceno: THREE.Scene,
  arboj: ArboMetado[]
): THREE.InstancedMesh {
  const hazardaGenerilo = kreiVegetajxanHazardon(0o101666);
  const larikaTeksajxo = kreiLarikanSxelanTeksajxon();
  const larikaBumpo = kreiLarikanSxelanBumpanTeksajxon();
  const trunkaGeometrio = kreiTrunkanGeometrion(0o5/0o20, 0o11/0o100, 0o5/0o20 * 0o13/0o10, 0o11);
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: larikaTeksajxo, bumpMap: larikaBumpo, bumpScale: 0o1/0o20, roughness: 0o55/0o100 });
  const trunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, arboj.length);
  if ( arboj.length === 0 ) return trunkoj;

  const kronaGeometrioj = konstruiLarikanFoliaranGeometrion();
  const kronaGeometrio = kronaGeometrioj.folioj;
  kronaGeometrio.computeBoundingBox();
  // ⟨ ម្ជុលពីរជាន់ 📃 ⟩
  const kronaMaterialo = new THREE.MeshStandardMaterial({
    color: 0xc8c068, roughness: 0o1,
    side: THREE.DoubleSide,
  });
  const MAKS_TAVOLOJ = 0o4;
  const TAVOLA_KOVRO = 0o3/0o4;
  // ⟨ មែកទទេ 📃 ⟩
  const BRANCXETOJ = 0o3;
  const brancxetaGeometrio = new THREE.CylinderGeometry(0o1/0o100, 0o5/0o100, 1, 4)
    .translate(0, 0o1/0o2, 0);
  // ⟨ ក្រឡាដើមឈើ ៖ frustum culling ធ្វើការតាម mesh , ដូច្នេះក្រឡាដីមួយៗត្រូវ
  // មាន mesh របស់ខ្លួន , បើមិនដូច្នេះព្រៃទាំងមូលគូររាល់ពេលដែលឃើញតែមួយចំណែក ។ 📃 ⟩
  interface LarikaBukedo {
    trunkoj: THREE.Matrix4[]; trunkojKoloroj: THREE.Color[];
    kronoj: THREE.Matrix4[]; kronojKoloroj: THREE.Color[];
    brancxetoj: THREE.Matrix4[]; brancxetojKoloroj: THREE.Color[];
  }
  const bukedoj = new Map<string, LarikaBukedo>();
  const bukedoDe = ( x: number, z: number ): LarikaBukedo => {
    const klavo = Math.floor(x / 0o100) + "," + Math.floor(z / 0o100);
    let bukedo = bukedoj.get(klavo);
    if ( !bukedo ) {
      bukedo = { trunkoj: [], trunkojKoloroj: [], kronoj: [], kronojKoloroj: [],
        brancxetoj: [], brancxetojKoloroj: [] };
      bukedoj.set(klavo, bukedo);
    }
    return bukedo;
  };

  const M = new THREE.Matrix4();
  const C = new THREE.Color();
  const yUp = new THREE.Vector3(0, 1, 0);
  const xAkso = new THREE.Vector3(1, 0, 0);
  const sxelaKoloro = new THREE.Color();
  const paletro = [ 0xf8f0d8, 0xe8e0c8, 0xf0e8d0, 0xe0d8c0 ];

  arboj.forEach(( t, i ) => {
    // ⟨ ដុះខ្លីដែរ 📃 ⟩
    const h = (0o155/0o40 + t.s * 0o30/0o10) * (0o33/0o100 + hazardaGenerilo() * 0o10/0o10);
    // ⟨ ដើមតាមកម្ពស់ 📃 ⟩
    const trunkaLargho = 0o23/0o100 + h * 0o5/0o100;
    const Q = kreiKlinoQuaternionon(hazardaGenerilo, 0o3/0o20, hazardaGenerilo() * Math.PI * 2);
    const bazo = new THREE.Vector3(t.x, t.h, t.z);
    const pozicio = kreiPoziciilon(bazo, Q);
    const bukedo = bukedoDe(t.x, t.z);

    M.compose(pozicio(new THREE.Vector3(0, h / 2, 0)), Q,
      new THREE.Vector3(trunkaLargho, h, trunkaLargho));
    bukedo.trunkoj.push(M.clone());

    const helo = 0o73/0o100 + hazardaGenerilo() * 0o5/0o100;
    C.setRGB(
      helo * ( 0o77/0o100 + hazardaGenerilo() * 0o3/0o100 ),
      helo * ( 0o75/0o100 + hazardaGenerilo() * 0o1/0o20 ),
      helo * ( 0o35/0o40 + hazardaGenerilo() * 0o1/0o20 ));
    bukedo.trunkojKoloroj.push(C.clone());
    sxelaKoloro.copy(C);

    const tavoloj = 0o3 + ( ( hazardaGenerilo() * 0o2 ) | 0 );
    // ⟨ សមាមាត្រ 📃 ⟩
    // ⟨ ទទឹងមកពីការដាក់ 📃 ⟩
    // ⟨ កំពូលក៏តាមកម្ពស់ 📃 ⟩
    const kronaRadiuso = Math.min(0o3/0o4 * kronaRadiusoLarika(t.s), 0o21/0o100 * h);
    const bazaLargho = kronaRadiuso / KRONA_GEOMETRIA_RADIUSO;
    const kronaMinimumaY = kronaGeometrio.boundingBox!.min.y;
    const kronaMaksimumaY = kronaGeometrio.boundingBox!.max.y;
    const geometriaAlto = kronaMaksimumaY - kronaMinimumaY;
    // ⟨ ស្រទាប់ជាមុន 📃 ⟩
    const tavolajSkaloj: { largho: number; alto: number }[] = [];
    let kronoSumo = 0;
    for ( let k = 0; k < tavoloj; k++ ) {
      const m = k / MAKS_TAVOLOJ;
      const largho = bazaLargho * ( 1 - m * 0o3/0o4 )
        * ( 0o21/0o24 + hazardaGenerilo() * 0o3/0o10 );
      const alto = largho * TAVOLA_PROPORCIO * ( 0o11/0o12 + hazardaGenerilo() * 0o2/0o10 );
      tavolajSkaloj.push({ largho, alto });
      kronoSumo += ( k === 0 ? alto : alto * ( 0o1 - TAVOLA_KOVRO ) ) * geometriaAlto;
    }
    let antaŭaSupro = h + 0o3/0o10 - kronoSumo;
    for ( let k = 0; k < MAKS_TAVOLOJ; k++ ) {
      if ( k >= tavoloj ) {
        // ⟨ ស្រទាប់ទទេ ៖ គ្មានធរណីមាត្រ , តែត្រូវឆ្លងកាត់ចៃដន្យដូចដើម 📃 ⟩
        hazardaKoloro(hazardaGenerilo, C, paletro);
        continue;
      }
      const { largho: kronoLargho, alto: kronoAlto } = tavolajSkaloj[k];
      // ⟨ ការរលាយស្រទាប់ 📃 ⟩
      const bazaY = antaŭaSupro - ( k === 0 ? 0 : TAVOLA_KOVRO * kronoAlto * geometriaAlto );
      const centroY = bazaY - kronaMinimumaY * kronoAlto - kronoAlto * 0o1/0o100;
      M.compose(pozicio(new THREE.Vector3(
        ( hazardaGenerilo() - 0o5/0o10 ) * 0o12/0o100,
        centroY,
        ( hazardaGenerilo() - 0o5/0o10 ) * 0o12/0o100)), Q,
        new THREE.Vector3(kronoLargho, kronoAlto, kronoLargho));
      bukedo.kronoj.push(M.clone());
      bukedo.kronojKoloroj.push(hazardaKoloro(hazardaGenerilo, C, paletro).clone());
      antaŭaSupro = centroY + kronaMaksimumaY * kronoAlto;
    }

    for ( let b = 0; b < BRANCXETOJ; b++ ) {
      const ang = hazardaGenerilo() * Math.PI * 2;
      // ⟨ កន្លែងមែកស្ងួត 📃 ⟩
      const yBrancxo = h * ( 0o1/0o10 + b * 0o1/0o10
        + ( hazardaGenerilo() - 0o5/0o10 ) * 0o1/0o20 );
      const longo = ( 0o3/0o10 + hazardaGenerilo() * 0o1/0o2 ) * trunkaLargho;
      const klino = 0o17/0o10 + hazardaGenerilo() * 0o4/0o10;
      const Qb = new THREE.Quaternion().setFromAxisAngle(yUp, ang)
        .multiply(new THREE.Quaternion().setFromAxisAngle(xAkso, klino));
      const trunkaR = ( 0o5/0o20 * ( 1 - yBrancxo / h ) + 0o11/0o100 * ( yBrancxo / h ) )
        * trunkaLargho * 0o7/0o10;
      M.compose(pozicio(new THREE.Vector3(
        Math.sin(ang) * trunkaR, yBrancxo, Math.cos(ang) * trunkaR)),
        Qb.premultiply(Q), new THREE.Vector3(trunkaLargho, longo, trunkaLargho));
      bukedo.brancxetoj.push(M.clone());
      // ⟨ ស្រមោលមែក ៖ ដក ៣ ជំហាន n0n0n0 ពីពណ៌សំបក , មិនគុណងងឹត 📃 ⟩
      bukedo.brancxetojKoloroj.push(
        C.setHex(ombraKoloro(sxelaKoloro.getHex(), 0o3)).clone());
    }
  });

  // ⟨ mesh មួយក្នុងមួយក្រឡា ។ 📃 ⟩
  let unuaTrunko: THREE.InstancedMesh | null = null;
  const ĉiujTrunkaj: THREE.InstancedMesh[] = [];
  for ( const bukedo of bukedoj.values() ) {
    const cxelajTrunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, bukedo.trunkoj.length);
    const kronoj = new THREE.InstancedMesh(kronaGeometrio, kronaMaterialo, bukedo.kronoj.length);
    const folibranĉoj = new THREE.InstancedMesh(kronaGeometrioj.brancxoj, trunkaMaterialo, bukedo.kronoj.length);
    const brancxetoj = new THREE.InstancedMesh(brancxetaGeometrio, trunkaMaterialo, bukedo.brancxetoj.length);
    for ( let i = 0; i < bukedo.trunkoj.length; i++ ) {
      cxelajTrunkoj.setMatrixAt(i, bukedo.trunkoj[i]);
      cxelajTrunkoj.setColorAt(i, bukedo.trunkojKoloroj[i]);
    }
    for ( let i = 0; i < bukedo.kronoj.length; i++ ) {
      kronoj.setMatrixAt(i, bukedo.kronoj[i]);
      kronoj.setColorAt(i, bukedo.kronojKoloroj[i]);
      folibranĉoj.setMatrixAt(i, bukedo.kronoj[i]);
    }
    for ( let i = 0; i < bukedo.brancxetoj.length; i++ ) {
      brancxetoj.setMatrixAt(i, bukedo.brancxetoj[i]);
      brancxetoj.setColorAt(i, bukedo.brancxetojKoloroj[i]);
    }
    cxelajTrunkoj.name = "larikaTrunko";
    kronoj.name = "larikaKrono";
    folibranĉoj.name = "larikaFolibrancxo";
    folibranĉoj.instanceMatrix.needsUpdate = true;
    folibranĉoj.castShadow = true;
    brancxetoj.name = "larikaBrancxo";
    cxelajTrunkoj.instanceMatrix.needsUpdate = true;
    kronoj.instanceMatrix.needsUpdate = true;
    brancxetoj.instanceMatrix.needsUpdate = true;
    if ( cxelajTrunkoj.instanceColor ) cxelajTrunkoj.instanceColor.needsUpdate = true;
    if ( kronoj.instanceColor ) kronoj.instanceColor.needsUpdate = true;
    if ( brancxetoj.instanceColor ) brancxetoj.instanceColor.needsUpdate = true;
    cxelajTrunkoj.castShadow = kronoj.castShadow = brancxetoj.castShadow = true;
    sceno.add(cxelajTrunkoj, kronoj, folibranĉoj, brancxetoj);
    ĉiujTrunkaj.push(cxelajTrunkoj);
    if ( !unuaTrunko ) unuaTrunko = cxelajTrunkoj;
  }
  const rezulto = unuaTrunko ?? trunkoj;
  rezulto.userData.ĉiujTrunkaj = ĉiujTrunkaj;
  return rezulto;
}
