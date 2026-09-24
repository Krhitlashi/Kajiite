// ≺⧼ Pleŭrobrakia 🪼 ⧽≻
// La globa ktenoforo de la rivero ( margrozberujo ). Preskaŭ
// sfera ĝelo kun ok kombovicoj, la statocisto sur la pinto, kaj DU LONGAJ
// sinuaj tentakloj, kiuj eliras el ingoj sur la supra duono de la korpo.
//
// ⟨ La ingoj kaj la statocisto 📃 ⟩ — la ingoj ( la konusetoj, el kiuj la
// tentakloj eliras ) antaŭe staris je fiksa x = ±0.15, dum la korpo estas ~0.9
// duon-larĝa tie: ili do estis EN la korpo, ne sur ĝi. Nun ilia loko venas de
// la profilo ( profiloR ), kaj ili sekvas la pulson ( surfacxaParto ), do la
// membrano restas sur la ĝelo dum la tuta pulso.
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import type { Besto, SpecoMalneto } from "./speco-tipoj.js";
import { aldoniKombovicojn, aplikiKtenoforanPulson, gluuSurfacxon, kreiGelanTeksajxon,
  kreiKombilanMaterialon, kreiKorpon, profiloR, surfacxaParto } from "./ktenofora-komunajxoj.js";

// La korpa profilo ( r, y ) — preskaŭ sfero de radiuso 0.92, iomete pinta ĉe la
// aborala poluso. Pleŭrobrakia estas la plej "globeta" el la tri ktenoforoj.
const PROFILO: [ number, number ][] = [
  [ 0o2/0o100, -0o1 ],           // 0.03, -1 — la buŝa poro ( malgranda )
  [ 0o15/0o100, -0o74/0o100 ],   // 0.20, -0.94
  [ 0o33/0o100, -0o67/0o100 ],   // 0.42, -0.86
  [ 0o50/0o100, -0o54/0o100 ],   // 0.62, -0.69
  [ 0o62/0o100, -0o33/0o100 ],   // 0.78, -0.42
  [ 0o70/0o100, -0o12/0o100 ],   // 0.88, -0.16
  [ 0o73/0o100, 0o12/0o100 ],    // 0.92, 0.16
  [ 0o71/0o100, 0o32/0o100 ],    // 0.89, 0.41
  [ 0o63/0o100, 0o50/0o100 ],    // 0.80, 0.62
  [ 0o51/0o100, 0o62/0o100 ],    // 0.64, 0.78
  [ 0o34/0o100, 0o71/0o100 ],    // 0.44, 0.89
  [ 0o16/0o100, 0o75/0o100 ],    // 0.22, 0.95
  [ 0o3/0o100, 0o77/0o100 ],     // 0.05, 0.98 — la aborala poluso
];

// La alto de la ingoj kaj la longo de la tentakloj.
const INGA_Y = 0o43/0o100;   // 0.547 — la ingoj sidas sur la supra duono
const TENTAKLA_LONGO = 0o130/0o100;

export function konstruiMalneton(teksajxo: THREE.CanvasTexture): SpecoMalneto {
  const grupo = new THREE.Group();
  const gelo = kreiGelanTeksajxon({
    bazo: "rgb(226,244,236)", kanalo: "rgb(156,206,184)",
    poluso: "rgb(196,232,214)", polusaForto: 0o45/0o100, grajnoj: 0o470,
  });
  const korpo = kreiKorpon(gelo, teksajxo, PROFILO, 0xd8f0e8, 0x286858);
  korpo.name = "korpo";
  grupo.add(korpo);
  aldoniKombovicojn(grupo, PROFILO, kreiKombilanMaterialon(0x60d8b8));

  // La statocisto — la sensorgano sur la aborala poluso, la plej karakteriza
  // organo de la kombuloj.
  const statocisto = new THREE.Mesh(
    new THREE.SphereGeometry(0o5/0o100, 0o10, 0o6).scale(0o1, 0o6/0o10, 0o1),
    new THREE.MeshPhysicalMaterial({
      color: 0xd8f0e0, transparent: true, opacity: 0o3/0o5, depthWrite: false,
      roughness: 0o1/0o10, emissive: 0x48a888, emissiveIntensity: 0o7/0o10,
    }));
  statocisto.name = "statocisto";
  statocisto.position.y = 0o75/0o100;
  surfacxaParto(statocisto);
  grupo.add(statocisto);

  // La buŝa lipo — malgranda ringo ĉe la buŝa poro. Ankaŭ ĝi sekvas la pulson.
  const buŝaY = -0o74/0o100;
  const buŝaRando = new THREE.Mesh(
    new THREE.TorusGeometry(profiloR(PROFILO, buŝaY), 0o25/0o1000, 0o6, 0o16),
    new THREE.MeshPhysicalMaterial({
      color: 0xb8e4d0, transparent: true, opacity: 0o1/0o2, depthWrite: false,
      roughness: 0o1/0o4, emissive: 0x205848, emissiveIntensity: 0o2/0o10,
    }));
  buŝaRando.rotation.x = -Math.PI / 0o2;
  buŝaRando.position.y = buŝaY;
  buŝaRando.name = "busxo";
  surfacxaParto(buŝaRando);
  grupo.add(buŝaRando);

  const palpaMaterialo = new THREE.MeshPhysicalMaterial({
    color: 0xc8e8e0, transparent: true, opacity: 0o1/0o2, depthWrite: false,
    roughness: 0o1/0o4, emissive: 0x288878, emissiveIntensity: 0o1/0o2,
    side: THREE.DoubleSide,
  });
  const ingaR = profiloR(PROFILO, INGA_Y);
  for ( const s of [ 0o1, -0o1 ] ) {
    // La tentakla ingo — eta konuso sur la korpa surfaco, el kiu la tentaklo
    // eliras. Ĝi sidas ĝuste sur la surfaco ( profiloR ) kaj turniĝas eksteren.
    const ingo = new THREE.Mesh(new THREE.ConeGeometry(0o6/0o100, 0o12/0o100, 0o10),
      palpaMaterialo);
    ingo.name = "ingo";
    ingo.position.set(s * ingaR, INGA_Y, 0);
    ingo.rotation.z = s * 0o1/0o2;
    ingo.userData.flanko = s;
    surfacxaParto(ingo);
    grupo.add(ingo);
    // ⟨ La tentaklo 📃 ⟩ — longa, maldika tubo kun la flankaj tentiloj ( la
    // gluaĵaj haroj, per kiuj ĝi kaptas planktonon ). Ĝi pendas de la ingo
    // malsupren kaj sinuas. La tubo kaj la tentiloj estas UNU kunfandita
    // geometrio, do la besto restas malpeza.
    const bazX = s * ingaR;
    const punktoj: THREE.Vector3[] = [];
    for ( let i = 0; i <= 0o10; i++ ) {
      const u = i / 0o10;
      punktoj.push(new THREE.Vector3(
        bazX + s * Math.sin(u * Math.PI * 0o3/0o2) * 0o22/0o100,
        INGA_Y - u * TENTAKLA_LONGO,
        Math.sin(u * Math.PI * 0o2 + s) * 0o20/0o100));
    }
    const kurbo = new THREE.CatmullRomCurve3(punktoj);
    const partoj: THREE.BufferGeometry[] = [ new THREE.TubeGeometry(kurbo, 0o16, 0o3/0o1000, 0o6) ];
    for ( let i = 1; i < 0o16; i++ ) {
      const p = kurbo.getPoint(i / 0o16);
      const haro = new THREE.CylinderGeometry(0o1/0o200, 0o2/0o200, 0o12/0o100, 0o4);
      haro.rotateZ(s * ( 0o4/0o5 + ( i % 0o2 ? 0o15/0o100 : -0o15/0o100 )));
      haro.translate(p.x, p.y, p.z);
      partoj.push(haro);
    }
    const palpo = new THREE.Mesh(mergeGeometries(partoj)!, palpaMaterialo);
    palpo.name = "palpo";
    palpo.userData.flanko = s;
    surfacxaParto(palpo);
    grupo.add(palpo);
  }

  // Pleŭrobrakia — la globeta ktenoforo kun la du longegaj tentakloj: mezaj
  // pulsoj, kaj la plej MALGRANDA platigo, ĉar ĝia korpo estas preskaŭ sfero
  // kaj la tentakloj devas resti longaj ( la platigo mallongigas ĉion laŭ la
  // akso ).
  return { malneto: grupo, platigxo: new THREE.Vector3(0o1, 0o1, 0o1),
    supro: 0o63/0o100, speco: "pleurobrakia",
    pulsaRapido: 0o4, pulsaForto: 0o3/0o40, pulsaOndo: 0o1/0o10,
    plata: 0o7/0o10 };
}

// gxisdatigiPleŭrobrakian — La du longaj tentakloj sinuas malantaŭen, la
// statocisto, la buŝa lipo kaj la ingoj sekvas la pulson de la korpo.
export function gxisdatigiPleŭrobrakian(b: Besto, t: number): void {
  const pulso = aplikiKtenoforanPulson(b, t);
  let i = 0;
  for ( const parto of b.animajxoj ) {
    if ( parto.name === "palpo" ) {
      gluuSurfacxon(parto, pulso);
      parto.rotation.x = Math.sin(t * 0o1/0o2 + b.phase + i) * 0o2/0o10;
      parto.rotation.z = Math.cos(t * 0o3/0o4 + b.phase + i) * 0o1/0o10;
      i++;
    } else if ( parto.name === "ingo" || parto.name === "statocisto"
      || parto.name === "busxo" ) {
      gluuSurfacxon(parto, pulso);
    }
  }
  b.grupo.rotation.x = Math.sin(t * 0o1/0o2 + b.phase * 0o3) * 0o3/0o100;
}
