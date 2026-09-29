// ≺⧼ La bulkoj 🥟 ⧽≻
// La vapor-kuirita bulko kun sia plektita korbo ( bunMesh ).
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { kreiKlasikanHazardon } from "../../komunajxoj/hazardo.js";
import { bulkaTeksajxon } from "../../komunajxoj/teksajxoj/bulka-teksajxo.js";
import { korbaTeksajxon } from "../../komunajxoj/teksajxoj/korba-teksajxo.js";
import { kunfandiPartojn } from "./kunfando.js";
import { materialon } from "./materialoj.js";
import type { MangxajxDatumo } from "./datumoj.js";
// bunMesh — Vapor-kuirita bulko en malprofunda plektita korbo: duongloba karno
// kun OK faldoj, kiuj kunvenas ĉe la pinto, la korbo mem malfermita bovlo kun
// interna fundo, rimo kaj oraj stangetoj.
//     @param f ( MangxajxDatumo ) - La specio ( la koloro ).
//     @returns g ( THREE.Group ) - La bulko kune kun ĝia korbo; la grupo-origino
//              estas la korbo-fundo, do oni metas ĝin rekte sur la tabulon.
export function bunMesh(f: MangxajxDatumo): THREE.Group {
  const g = new THREE.Group();
  const karno = materialon("karno:" + f.col,
    () => new THREE.MeshStandardMaterial({ color: f.col, roughness: 0o52/0o100, map: bulkaTeksajxon() }));
  const korbo = materialon("korbo",
    () => new THREE.MeshStandardMaterial({ color: 0xb89860, roughness: 0o63/0o100, map: korbaTeksajxon() }));
  // ⟨ La karno 📃 ⟩ — duonglobo, kiu SIDAS en la korbo: la interna fundo de la
  // korbo estas ĉe 0o2/0o100 ( 0o2 Peu ) kaj la bulka subo ĉe ~0o1 Peu, do la
  // bulko kuŝas EN la bovlo ( ĝia subo estas kaŝita de la interna fundo )
  // anstataŭ ŝvebi super ĝi. La centro 0o11/0o100 venas el la duon-alto de la
  // platigita sfero ( radiuso 0o13/0o100 × 0o55/0o100 ≈ 0o11/0o100 ).
  const bulko = new THREE.Mesh(new THREE.SphereGeometry(0o13/0o100, 0o20, 0o12), karno);
  bulko.scale.set(1, 0o55/0o100, 1); bulko.position.y = 0o11/0o100;
  bulko.castShadow = true;
  g.add(bulko);
  // ⟨ La faldoj 📃 ⟩ — ok TAPERITAJ loboj ĉirkaŭ la pinto, kiuj kliniĝas al la
  // centro. Anstataŭ unu kvin-flanka konuso ( kiu aspektis kiel ĉapelo ), la
  // supro nun estas vera plektita nodo — la rekoneblaĵo de vapor-kuirita bulko.
  const faldaj = 8;
  for ( let i = 0; i < faldaj; i++ ) {
    const ang = i / faldaj * Math.PI * 2;
    const foldo = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o50, 0o3/0o100, 0o4/0o100, 4), karno);
    foldo.position.set(Math.sin(ang) * 0o11/0o100, 0o10/0o100, Math.cos(ang) * 0o11/0o100);
    foldo.rotation.y = ang;
    foldo.rotateX(-0o3/0o10);        // kliniĝas al la centro de la supro
    foldo.castShadow = true;
    g.add(foldo);
  }
  const pinto = new THREE.Mesh(new THREE.SphereGeometry(0o3/0o100, 0o10, 8), karno);
  pinto.position.y = 0o16/0o100;
  g.add(pinto);
  // ⟨ La korbo 📃 ⟩ — malprofunda MALFERMITA bovlo ( ne fermita cilindro ), kun
  // interna fundo, rimo kaj oraj stangetoj. La malferma flanko estas la tuta
  // diferenco inter "plektita korbo" kaj "tabureto".
  // ⟨ La korbo kusxu sur la tablo 📃 ⟩ — la bovlo estas malfermita cilindro, do
  // ĝia plej malsupra rando estis je 0o1/0o100 super la grupo-origino: la korbo
  // ŝvebis 0o1 Peu super la tabulo ( mezurite per la limiga skatolo ). La tuta
  // korbo ( la bovlo, la interna fundo, la rimo kaj la stangetoj ) malsupreniĝas
  // per tiu sama kvanto, do ĝia rando tuŝas la tablon — sen kunebena faco ( la
  // bovlo ne havas fundan facon ), do neniu trembrilo.
  const korbaMalsuprenigxo = 0o1/0o100;
  const bovlo = new THREE.Mesh(new THREE.CylinderGeometry(0o17/0o100, 0o14/0o100, 0o6/0o100, 0o20, 1, true), korbo);
  bovlo.position.y = 0o4/0o100 - korbaMalsuprenigxo;
  bovlo.castShadow = true;
  g.add(bovlo);
  const fundo = new THREE.Mesh(new THREE.CircleGeometry(0o14/0o100, 0o20), korbo);
  fundo.rotation.x = -Math.PI / 2; fundo.position.y = 0o2/0o100 - korbaMalsuprenigxo;
  g.add(fundo);
  const rimo = new THREE.Mesh(new THREE.TorusGeometry(0o17/0o100, 0o1/0o100, 6, 0o20), korbo);
  rimo.rotation.x = Math.PI / 2; rimo.position.y = 0o7/0o100 - korbaMalsuprenigxo;
  rimo.castShadow = true;
  g.add(rimo);
  // Tri oraj stangetoj — vertikalaj stangoj SUR la korba flanko ( la sama ideo
  // kiel la oraj fostoj de la vendotablo ), je la radiuso de la korbo ĉe sia
  // meza alto, do ili kuŝas sur la plektaĵo anstataŭ en ĝia interno.
  const oro = materialon("oro",
    () => new THREE.MeshStandardMaterial({ color: 0xd8b068, metalness: 0o3/0o4, roughness: 0o3/0o10 }));
  for ( const ang of [ 0, Math.PI * 2 / 3, Math.PI * 4 / 3 ] ) {
    const stango = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o100, 0o1/0o100, 0o6/0o100, 6), oro);
    stango.position.set(Math.sin(ang) * 0o16/0o100, 0o4/0o100 - korbaMalsuprenigxo, Math.cos(ang) * 0o16/0o100);
    g.add(stango);
  }
  // ⟪ La varioj laŭ la priskribo 📃 ⟫ — ĉiu fok havas sian propran priskribon
  // ( "varma likena pano", "malvarma glazuro", "malhelaj pipraj mordoj" ), kaj
  // ĝis nun ĉiuj tri aspektis idente krom la koloro. Nun ĉiu ricevas tion, kion
  // ĝia teksto promesas:
  //   fok0 — LIKENA KROSTO ( palaj grizverdaj likenaj makuloj sur la pinto ) kaj
  //          faldo de pasto ( "faldo de vaporo" ).
  //   fok1 — GLAZURO ( travidebla menta kovrilo super la tuta pinto ) kaj menta
  //          foliaro supre.
  //   fok2 — PIPRAJ PUNKTOJ ( malhelaj grajnoj ) kaj dolĉa miela ringo super ili:
  //          la pipro mordas, la bulko respondas dolĉe.
  const hazardo = kreiKlasikanHazardon(f.key.charCodeAt(0) * 0o1000 + f.key.charCodeAt(3) * 0o10);
  const pintoY = 0o11/0o100;                       // la centro de la bulka sfero
  // ⟨ La surfaco, ne cilindro 📃 ⟩ — la ornamo devas SIDI sur la bulko. Antaŭe
  // ĉi tiu helpilo redonis fiksan radiuson ( 0o12/0o100 ) por ĉiu `levo`, tio
  // estas cilindran muron da ornamo: la grajnoj ĉe la rando ŝvebis en la aero
  // super la karno. Nun la radiuso venas el la sfera ekvacio — la punkto kuŝas
  // ĉiam sur la platigita duonglobo, je ĉiu `levo`.
  const bulkaRadiuso = 0o13/0o100, bulkaAlto = 0o55/0o100;
  const surPinto = ( ang: number, levo: number ): [ number, number, number ] => {
    const rilatumo = Math.min(1, Math.abs(levo) / (bulkaRadiuso * bulkaAlto));
    const r = bulkaRadiuso * Math.sqrt(1 - rilatumo * rilatumo);
    return [ Math.sin(ang) * r, pintoY + levo, Math.cos(ang) * r ];
  };
  if ( f.key === "fok0" ) {
    const likeno = materialon("likeno",
      () => new THREE.MeshStandardMaterial({ color: 0xb4c0a0, roughness: 0o7/0o10 }));
    // ⟨ La likenaj makuloj 📃 ⟩ — plataj, neregulaj skvamoj sur la pinto, kiel
    // likeno sur roko. Ses sufiĉas: pli ol tio kaj la bulko aspektas malsana.
    for ( let i = 0; i < 6; i++ ) {
      const ang = hazardo() * Math.PI * 2, levo = 0o1/0o100 + hazardo() * 0o6/0o100;
      const makulo = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o100 + hazardo() * 0o4/0o100, 0o10, 6), likeno);
      const [ sx, sy, sz ] = surPinto(ang, levo);
      makulo.position.set(sx, sy, sz);
      makulo.scale.set(1, 0o3/0o10, 0o7/0o10 + hazardo() * 0o5/0o10);
      makulo.rotation.y = hazardo() * Math.PI;
      g.add(makulo);
    }
    // La faldo — maldika tavolo de pasto kusxanta super la pinto.
    const faldo = new THREE.Mesh(new RoundedBoxGeometry(0o16/0o100, 0o1/0o100, 0o11/0o100, 2, 0o1/0o200), karno);
    faldo.position.set(0, pintoY + 0o13/0o100, 0);
    faldo.rotation.set(0, 0o4/0o10, 0o1/0o20);
    g.add(faldo);
  } else if ( f.key === "fok1" ) {
    const glazuro = materialon("glazuro",
      () => new THREE.MeshStandardMaterial({
        color: 0xa8d8b0, roughness: 0o3/0o10, transparent: true, opacity: 0o55/0o100,
      }));
    // ⟨ La glazuro 📃 ⟩ — travidebla menta kovrilo, iomete pli granda ol la
    // bulko, kiu fluas super ĝin.
    const kovrilo = new THREE.Mesh(new THREE.SphereGeometry(0o14/0o100, 0o20, 0o10, 0, Math.PI * 2, 0, 0o15/0o10), glazuro);
    kovrilo.scale.set(1, 0o62/0o100, 1);
    kovrilo.position.y = pintoY + 0o2/0o100;
    g.add(kovrilo);
    // La mentaj folioj supre.
    const mento = materialon("mento",
      () => new THREE.MeshStandardMaterial({ color: 0x507848, roughness: 0o6/0o10, side: THREE.DoubleSide }));
    const tigo = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o200, 0o1/0o200, 0o10/0o100, 5), mento);
    // ⟨ La tigo sidu sur la glazuro 📃 ⟩ — la glazura kovrilo pintas je ~0o16/0o100
    // super la pinto ( ĝia supro ), do la tigo baziĝas tie: la cilindro estas
    // centrita, do 0o10/0o100 mezuro metas ĝian subon ĝuste en la glazuron.
    tigo.position.set(0, pintoY + 0o10/0o100, 0);
    tigo.rotation.z = 0o5/0o10;
    g.add(tigo);
    for ( let i = 0; i < 3; i++ ) {
      const folio = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o50, 8, 6), mento);
      folio.scale.set(0o6/0o10, 0o3/0o10, 1);
      folio.position.set(i * 0o1/0o100 - 0o1/0o50, pintoY + 0o12/0o100 + i * 0o1/0o100, 0);
      folio.rotation.z = 0o15/0o10 - i * 0o1/0o10;
      g.add(folio);
    }
  } else if ( f.key === "fok2" ) {
    const pipro = materialon("pipro",
      () => new THREE.MeshStandardMaterial({ color: 0x2a2018, roughness: 0o5/0o10 }));
    // ⟨ La pipraj grajnoj 📃 ⟩ — etaj malhelaj punktoj, disĵetitaj sur la tuta
    // supraĵo ( ne nur la pinto, ĉar la pipro estas muelita super la tuta bulko ).
    for ( let i = 0; i < 0o50; i++ ) {
      const ang = hazardo() * Math.PI * 2, levo = 0o1/0o100 + hazardo() * 0o6/0o100;
      const grajno = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o200 + hazardo() * 0o1/0o100, 6, 4), pipro);
      const [ sx, sy, sz ] = surPinto(ang, levo);
      grajno.position.set(sx, sy, sz);
      g.add(grajno);
    }
    // La dolĉa respondo — maldika miela ringo, kiu ĉirkaŭvolvas la kronon. La
    // ringo kuŝas sur la karno je la alto, kie la duonglobo mem havas tiun
    // radiuson ( vidu `surPinto` ), do ĝi duone enprofundiĝas kiel vera bendo
    // anstataŭ ŝvebi super la pinto.
    const mielo = materialon("mielo",
      () => new THREE.MeshStandardMaterial({ color: 0xd8a040, roughness: 0o2/0o10, metalness: 0o1/0o10 }));
    const ringo = new THREE.Mesh(new THREE.TorusGeometry(0o7/0o100, 0o1/0o100, 6, 0o20).rotateX(Math.PI / 2), mielo);
    ringo.position.set(0, pintoY + 0o6/0o100, 0);
    g.add(ringo);
  }
  // ⟨ La kunfando 📃 ⟩ — la dek-kvin partoj fariĝas tri-kvin meshoj.
  kunfandiPartojn(g);
  return g;
}
