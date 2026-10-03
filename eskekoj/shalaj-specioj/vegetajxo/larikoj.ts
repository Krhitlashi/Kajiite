// ≺⧼ ដើមល្មុត 🌲 ⧽≻
import * as THREE from "three";
import { kreiLarikanFoliaranTeksajxon } from "../../komunajxoj/teksajxoj/larika-foliaro.js";
import { kreiLarikanSxelanTeksajxon } from "../../komunajxoj/teksajxoj/larika-sxelo.js";
import { kreiLarikanSxelanBumpanTeksajxon } from "../../komunajxoj/teksajxoj/larika-sxelo-bumpo.js";
import { kunfandiGeometriojnSenIndekson } from "../../komunajxoj/kunfandajxoj.js";
import { KRONA_GEOMETRIA_RADIUSO, TAVOLA_PROPORCIO, kronaRadiusoLarika } from "./kronoj.js";
import { kreiKlinoQuaternionon, kreiPoziciilon, hazardaKoloro, kreiVegetajxanHazardon } from "./hazardoj.js";
import type { ArboMetado } from "./metado.js";
import { kreiTrunkanGeometrion } from "./trunkoj.js";

function konstruiLarikanFoliaranGeometrion(): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  // ⟨ កំពូល 📃 ⟩
  const ALTO = 1;
  const KERNA_BOT = 0o14/0o100;
  const KERNA_SUP = 0o5/0o100;
  const kerno = new THREE.CylinderGeometry(KERNA_SUP, KERNA_BOT, ALTO, 0o12, 0o3);
  kerno.translate(0, ALTO / 2, 0);
  partoj.push(kerno);
  const eksteraR = ( t: number ): number => 0o1/0o2 * Math.pow(1 - t, 0o7/0o10) + 0.02;
  const kernaR = ( t: number ): number => KERNA_BOT + ( KERNA_SUP - KERNA_BOT ) * t;

  // ⟨ ម្ជុលកោង 📃 ⟩
  const kreiPinglanKarteton = ( longo: number, dikeco: number ): THREE.BufferGeometry => {
    const kurbo = longo * 0o2/0o25;
    // ⟨ ម្ជុលចេញពីមែក 📃 ⟩
    const pozicioj = [
      0, 0, 0, longo * 0o35/0o100, -dikeco / 2, kurbo,
      longo * 0o65/0o100, -dikeco / 2, kurbo, longo, 0, 0,
      longo * 0o65/0o100, dikeco / 2, kurbo, longo * 0o35/0o100, dikeco / 2, kurbo,
    ];
    const uvoj = [ 0, 0o1/0o2, 0o2/0o10, 0, 0o63/0o100, 0, 1, 0o1/0o2,
      0o63/0o100, 1, 0o2/0o10, 1 ];
    const geometrio = new THREE.BufferGeometry();
    geometrio.setAttribute("position", new THREE.Float32BufferAttribute(pozicioj, 3));
    geometrio.setAttribute("uv", new THREE.Float32BufferAttribute(uvoj, 2));
    geometrio.setIndex([ 0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5 ]);
    geometrio.computeVertexNormals();
    return geometrio;
  };

  const kreiPinglanVentumilon = ( longo: number, dikeco: number,
    klinoM = 0o6/0o10 ): THREE.BufferGeometry => {
    const fasko = ( turno: number ): THREE.BufferGeometry => {
      const pingloj: THREE.BufferGeometry[] = [];
      const kvanto = 0o13;
      for ( let j = 0; j < kvanto; j++ ) {
        const t = j / ( kvanto - 1 ) - 0o5/0o10;
        // ⟨ ការប្រែប្រួលម្ជុល 📃 ⟩
        const klino = t * klinoM + ( Math.random() - 0o5/0o10 ) * 0o3/0o10;
        const pinglo = kreiPinglanKarteton(
          longo * ( 0o4/0o5 + Math.random() * 0o4/0o10 ), dikeco);
        pinglo.applyMatrix4(new THREE.Matrix4().makeRotationY(turno));
        pinglo.applyMatrix4(new THREE.Matrix4().makeRotationY(
          t * 0o14/0o10 + ( Math.random() - 0o5/0o10 ) * 0o1/0o10));
        pinglo.applyMatrix4(new THREE.Matrix4().makeRotationX(
          ( Math.random() - 0o5/0o10 ) * 0o5/0o10));
        pinglo.applyMatrix4(new THREE.Matrix4().makeRotationZ(klino));
        pingloj.push(pinglo);
      }
      return kunfandiGeometriojnSenIndekson(pingloj);
    };
    return kunfandiGeometriojnSenIndekson([ fasko(0), fasko(Math.PI / 2) ]);
  };

  const kirloj = 0o10;
  const faskojPoKirlo = 0o7;
  for ( let i = 0; i < kirloj * faskojPoKirlo; i++ ) {
    const kirlo = Math.floor(i / faskojPoKirlo);
    const enKirlo = i % faskojPoKirlo;
    const a = enKirlo / faskojPoKirlo * Math.PI * 2 + kirlo * 0o7/0o20
      + ( Math.random() - 0o5/0o10 ) * 0o1/0o10;
    const t = 0o7/0o100 + ( kirlo / ( kirloj - 1 ) ) * 0o66/0o100;
    const y = t * ALTO;
    const kR = kernaR(t);
    const bazoP = new THREE.Vector3(Math.cos(a) * kR, y, Math.sin(a) * kR);
    const akso = new THREE.Vector3(
      Math.cos(a) * 0o66/0o100, 0o40/0o100 + Math.random() * 0o15/0o100,
      Math.sin(a) * 0o66/0o100).normalize();
    // ⟨ ស៊ុមពីរ 📃 ⟩
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), akso);
    const qPingloj = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), akso);
    const konektiloLongo = Math.max(0o10/0o100, kR * 0o7/0o10);
    const konektilo = new THREE.CylinderGeometry(0o2/0o100, 0o4/0o100, konektiloLongo, 5)
      .translate(0, konektiloLongo / 2, 0);
    konektilo.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(q));
    konektilo.translate(bazoP.x - akso.x * konektiloLongo, bazoP.y - akso.y * konektiloLongo,
      bazoP.z - akso.z * konektiloLongo);
    partoj.push(konektilo);
    // ⟨ ប្រវែងម្ជុល 📃 ⟩
    const longo = ( eksteraR(t) - kR ) * ( 1 + ( Math.random() - 0o5/0o10 ) * 0o2/0o10 )
      + 0o2/0o100;
    const ventumilo = kreiPinglanVentumilon(longo * ( kirlo === 0 ? 0o7/0o10 : 1 ),
      0o3/0o200, -0o4/0o10);
    ventumilo.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(qPingloj));
    ventumilo.translate(bazoP.x, bazoP.y, bazoP.z);
    partoj.push(ventumilo);
  }
  partoj.push(new THREE.CylinderGeometry(0o1/0o100, 0o4/0o100, 0o16/0o100, 5)
    .translate(0, ALTO + 0o6/0o100, 0));
  return kunfandiGeometriojnSenIndekson(partoj);
}

export function konstruiLarikon(sceno: THREE.Scene,
  arboj: ArboMetado[]
): THREE.InstancedMesh {
  const hazardaGenerilo = kreiVegetajxanHazardon(33718);
  const larikaTeksajxo = kreiLarikanSxelanTeksajxon();
  const larikaBumpo = kreiLarikanSxelanBumpanTeksajxon();
  const trunkaGeometrio = kreiTrunkanGeometrion(0o5/0o20, 0o11/0o100, 0o5/0o20 * 1.38, 0o11);
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: larikaTeksajxo, bumpMap: larikaBumpo, bumpScale: 0o6/0o10, roughness: 0o55/0o100 });
  const trunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, arboj.length);
  if ( arboj.length === 0 ) return trunkoj;

  const kronaGeometrio = konstruiLarikanFoliaranGeometrion();
  kronaGeometrio.computeBoundingBox();
  // ⟨ ម្ជុលពីរជាន់ 📃 ⟩
  const kronaMaterialo = new THREE.MeshStandardMaterial({
    map: kreiLarikanFoliaranTeksajxon(), color: 0xffffff, roughness: 0o35/0o40,
    side: THREE.DoubleSide,
  });
  const MAKS_TAVOLOJ = 0o4;
  const kronoj = new THREE.InstancedMesh(kronaGeometrio, kronaMaterialo, arboj.length * MAKS_TAVOLOJ);

  // ⟨ មែកទទេ 📃 ⟩
  const BRANCXETOJ = 0o3;
  const brancxetaGeometrio = new THREE.CylinderGeometry(0o1/0o100, 0o5/0o100, 1, 4)
    .translate(0, 0o1/0o2, 0);
  const brancxetoj = new THREE.InstancedMesh(brancxetaGeometrio, trunkaMaterialo,
    arboj.length * BRANCXETOJ);

  const M = new THREE.Matrix4();
  const C = new THREE.Color();
  const yUp = new THREE.Vector3(0, 1, 0);
  const xAkso = new THREE.Vector3(1, 0, 0);
  const sxelaKoloro = new THREE.Color();
  const paletro = [ 0xc8a848, 0xd0b858, 0xd8c060, 0xd8a838, 0xc0a048, 0xe0c868, 0xb89038, 0xa8b048 ];

  arboj.forEach(( t, i ) => {
    // ⟨ ដុះខ្លីដែរ 📃 ⟩
    const h = (3.4 + t.s * 3.0) * (0.42 + hazardaGenerilo() * 1.0);
    // ⟨ ដើមតាមកម្ពស់ 📃 ⟩
    const trunkaLargho = 0.30 + h * 0.075;
    const Q = kreiKlinoQuaternionon(hazardaGenerilo, 0o3/0o20, hazardaGenerilo() * Math.PI * 2);
    const bazo = new THREE.Vector3(t.x, t.h, t.z);
    const pozicio = kreiPoziciilon(bazo, Q);

    M.compose(pozicio(new THREE.Vector3(0, h / 2, 0)), Q,
      new THREE.Vector3(trunkaLargho, h, trunkaLargho));
    trunkoj.setMatrixAt(i, M);

    const helo = 0.92 + hazardaGenerilo() * 0.08;
    C.setRGB(
      helo * ( 0.98 + hazardaGenerilo() * 0.04 ),
      helo * ( 0.95 + hazardaGenerilo() * 0o1/0o20 ),
      helo * ( 0.90 + hazardaGenerilo() * 0.07 ));
    trunkoj.setColorAt(i, C);
    sxelaKoloro.copy(C);

    const tavoloj = 0o3 + ( ( hazardaGenerilo() * 0o2 ) | 0 );
    // ⟨ សមាមាត្រ 📃 ⟩
    // ⟨ ទទឹងមកពីការដាក់ 📃 ⟩
    // ⟨ កំពូលក៏តាមកម្ពស់ 📃 ⟩
    const kronaRadiuso = Math.min(0o3/0o4 * kronaRadiusoLarika(t.s), 0.27 * h);
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
      kronoSumo += ( k === 0 ? alto : alto * 0o27/0o100 ) * geometriaAlto;
    }
    let antaŭaSupro = h + 0o3/0o10 - kronoSumo;
    for ( let k = 0; k < MAKS_TAVOLOJ; k++ ) {
      if ( k >= tavoloj ) {
        M.compose(pozicio(new THREE.Vector3(0, antaŭaSupro, 0)), Q,
          new THREE.Vector3(0, 0, 0));
        kronoj.setMatrixAt(i * MAKS_TAVOLOJ + k, M);
        kronoj.setColorAt(i * MAKS_TAVOLOJ + k, hazardaKoloro(hazardaGenerilo, C, paletro));
        continue;
      }
      const { largho: kronoLargho, alto: kronoAlto } = tavolajSkaloj[k];
      // ⟨ ការរលាយស្រទាប់ 📃 ⟩
      const bazaY = antaŭaSupro - ( k === 0 ? 0 : 0o27/0o100 * kronoAlto * geometriaAlto);
      const centroY = bazaY - kronaMinimumaY * kronoAlto - kronoAlto * 0o1/0o100;
      M.compose(pozicio(new THREE.Vector3(
        ( hazardaGenerilo() - 0o5/0o10 ) * 0o12/0o100,
        centroY,
        ( hazardaGenerilo() - 0o5/0o10 ) * 0o12/0o100)), Q,
        new THREE.Vector3(kronoLargho, kronoAlto, kronoLargho));
      kronoj.setMatrixAt(i * MAKS_TAVOLOJ + k, M);
      kronoj.setColorAt(i * MAKS_TAVOLOJ + k, hazardaKoloro(hazardaGenerilo, C, paletro));
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
      brancxetoj.setMatrixAt(i * BRANCXETOJ + b, M);
      brancxetoj.setColorAt(i * BRANCXETOJ + b, C.copy(sxelaKoloro).multiplyScalar(0o7/0o10));
    }
  });

  trunkoj.instanceMatrix.needsUpdate = true;
  kronoj.instanceMatrix.needsUpdate = true;
  brancxetoj.instanceMatrix.needsUpdate = true;
  if ( trunkoj.instanceColor ) trunkoj.instanceColor.needsUpdate = true;
  if ( kronoj.instanceColor ) kronoj.instanceColor.needsUpdate = true;
  if ( brancxetoj.instanceColor ) brancxetoj.instanceColor.needsUpdate = true;
  trunkoj.castShadow = kronoj.castShadow = brancxetoj.castShadow = true;
  sceno.add(trunkoj, kronoj, brancxetoj);
  return trunkoj;
}
