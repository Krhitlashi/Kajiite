// ≺⧼ La stelea vitro ✨ ⧽≻
// La frostigita vitro de la signoj ( steleaVitro ) kaj la signa teksto kun siaj
// tagaj/noktaj inkoj ( steleaTeksto, gxisdatigiSteleanVitron ) plus la signalo
// mem ( aldoniSteleanSignon ).
import * as THREE from "three";
import { generiSkribanTeksajxon } from "../../komunajxoj/skripto-rivelilo.js";
import { nomoAih } from "../../../kantaoj/lingvo/tradukoj.js";
import { kreiSteleanFormon } from "./formoj.js";
import { konstruajxaMaterialo } from "./tipoj.js";

// steleaVitro — La dividita frosta vitro de la steleaj signoj ( unu materialo
// por la tuta mondo, kiel la muroj kaj la kadroj ). Konstruu gxin per la sama
// kasxo kiel la aliaj konstruajxaj materialoj, por ke la tagnokta sxangxo
// ( gxisdatigiSteleanVitron ) kaj la konstruo atingu la SAMAN objekton.
//
// ⟨ LA FROSTA VITRO — nenia `transmission` 📃 ⟩ — la plato estas DUONTRATRAVIDA
// `transparent` + `opacity` 0o5/0o10 lasas 0.375 de la fono tra, kaj alta
// `roughness` ( 0o5/0o10 ) forprenas la spegulojn — la plato legigxas kiel
// frostigita vitro, ne kiel spegulo nek kiel aero. La fono NE malklarigxas
// frostigita vitro malklarigas ĝin, kaj la plato nun havas pli da korpo.
//
// ⟨ Kial NE `transmission` 📃 ⟩ — tiu materialo devigas la bildilon re-desegni la
// TUTAN maldiafanan scenon en apartan bufron ( la transira pasumo ). Mezurite per
// ?statistiko tio kostis 354 kromajn desegnajn alvokojn kaj 21.6 M da trianguloj
// po kadro — triono de la tuta geometria laboro de ĉiu kadro. Por kelkaj
// malgrandaj signoj tio ne indas. La transiro tag/nokto sxangxas la BAZAN KOLORON
// ( vidu sube ), do la signo ankaux mallumigxas nokte.
//
// ⟨ Kial 0.625 kaj ne pli travidebla 📃 ⟩ — vera transira vitro ( la malnova
// versio ) lasis la fonon tro klare tra, do la literoj luktis kun la bildo
// malantaŭ ili. Kun 0.625 la fono restas videbla sed malklara — la plato ne
// estas travidebla — kaj la flava teksto legigxas pli firme.
function steleaVitro(): THREE.MeshStandardMaterial {
  return konstruajxaMaterialo("steleo",
    () => new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0o5/0o10, metalness: 0,
      // ⟨ Pli maldiafana 📃 ⟩ — 0o6/0o10 ( 0.75 ) anstataŭ 0o5/0o10 ( 0.625 ).
      // La literoj jam batalis kun la fono; kun kvarono de la fono tra ili la
      // flava inko legigxas firme kaj la plato havas ankoraux pli da korpo.
      transparent: true, opacity: 0o6/0o10,
      // Nenia `transmission` — tiu pasumo kostis trionon de la geometrio ( vidu supre )
      emissive: 0x0a1a18, emissiveIntensity: 0o1/0o4,
    }));
}

// ⟨ La KONTURO de la signa teksto 📃 ⟩ — la literoj portas maldikan konturon,
// kiu estas NIGRA tage kaj BLANKA nokte ( ĝi transiras kune kun la tagnokta
// ciklo, kiel la plato mem ). Ni faras tion per malgranda shadero: la teksajxo
// entenas la glifojn kiel MASKON ( blanka alfa kanalo ), kaj la fragment-shadero
// desegnas la ORAN inkon plus la konturon — la plej granda alfa valoro en la
// ĉirkaŭaĵo ( ok direktoj, du radiusoj ) estas la konturo. Tiel la koloro de la
// konturo estas uniformo ( unu komuna `Color` por ĉiuj signoj, do la tagnokta
// transiro sxangxas unu valoron ), kaj la fona `discard` forigas ankaŭ la etan
// tinton, kiun alie lasus la mipmapoj de la malgranda teksto.
// ⟨ La inko de la teksto — FLAVA 📃 ⟩ — antaŭe gxi estis ora-bejxa ( 0xd8b068,
// la sama koloro kiel la kadroj ), kiu legigxis bruna sur la hela vitro. Nun la
// teksto estas vere FLAVA, kaj gxi sekvas la tagnokton kiel la plato: MUTA flava
// tage ( 0xc2b32f — sufice malhela kontraux la hela frosta vitro ) kaj PALA
// flava nokte ( 0xf2eea6 — preskaux lumanta kontraux la nigra plato ).
//
// ⟨ Kial la flava ne estas ORA 📃 ⟩ — la ora bejxo ( 0xd8b068 ) kaj gxia
// malhela versio ( 0xc79b2b ) havas la RUĜAN kanalon rimarkeble super la VERDA
// ( 0xc7 = 199 kontraŭ 0x9b = 155 ), do la teksto legigxis ORANGXA sur la hela
// vitro. Flavo bezonas la du kanalojn preskaux EGAJN: nun la tagan inkon
// ( 0xc2b32f → 194 / 179 ) kaj la noktan ( 0xf2eea6 → 242 / 238 ) apartigas nur
// kelkaj unuoj, do la nuanco restas flava, ne oranĝa.
//
// ⟨ Unu komuna koloro 📃 ⟩ — la uniformoj de cxiuj signaj shaderoj montras al
// cxi tiuj du `Color`-objektoj, do la tagnokta transiro sxangxas ilin unufoje kaj
// cxiuj signoj sekvas ( sen listo de materialoj ).
const STELEA_INKO_TAGE = new THREE.Color(0xc2b32f);
const STELEA_INKO_NOKTE = new THREE.Color(0xf2eea6);
const steleaInkaKoloro = new THREE.Color().copy(STELEA_INKO_TAGE);
// La KONTURO de la teksto estas la MALO de la plato: BLANKA tage, NIGRA nokte —
// do la literoj cxiam havas randon, kiu kontrastas kun la fono ( hela halo sur la
// hela vitro, malhela streko sur la nigra plato ).
const steleaBordoKoloro = new THREE.Color(0xffffff);
function steleaTeksto(mapo: THREE.Texture): THREE.ShaderMaterial {
  const im = mapo.image as { width: number; height: number };
  return new THREE.ShaderMaterial({
    uniforms: {
      uMapo: { value: mapo },
      uInko: { value: steleaInkaKoloro },
      uBordo: { value: steleaBordoKoloro },
      uTeksele: { value: new THREE.Vector2(1 / im.width, 1 / im.height) },
      uDikeco: { value: 0o5/0o2 },   // 2.5 tekseloj da konturo
    },
    transparent: true, depthWrite: false, toneMapped: false,
    vertexShader: `varying vec2 vUv;
    void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }`,
    fragmentShader: `precision highp float;
    uniform sampler2D uMapo; uniform vec3 uInko; uniform vec3 uBordo;
    uniform vec2 uTeksele; uniform float uDikeco; varying vec2 vUv;
    void main(){
      float a = texture2D( uMapo, vUv ).a;
      float r = 0.0;
      for ( int i = 0; i < 8; i++ ) {
        float ang = float( i ) * 0.7853981634;
        vec2 of = vec2( cos( ang ), sin( ang ) ) * uTeksele * uDikeco;
        r = max( r, texture2D( uMapo, vUv + of ).a );
        r = max( r, texture2D( uMapo, vUv + of * 0.55 ).a );
      }
      float inka = smoothstep( 0.35, 0.6, a );
      float kontura = smoothstep( 0.35, 0.6, r );
      if ( kontura < 0.004 ) discard;
      gl_FragColor = vec4( mix( uBordo, uInko, inka ), max( inka, kontura ) );
    }`,
  });
}

// ⟨ La stelea vitro sekvas la tagnokton 📃 ⟩ — la plato de ĉiu signo estas
// BLANKA tagmeze kaj NIGRA en la nokto, kaj ĝi transiras glate tra la tuta
// ciklo ( la sama parametro `malhelo` kiel la ĉielo, la nebulo kaj la pordoj —
// 0 = tago, 1 = krepusko ).
//
// ⟨ La koloro ankaŭ FILTRAS la trapason 📃 ⟩ — en la fizika modelo de three la
// baza koloro multiplikas la trapasantan lumon: blanka koloro lasas la fono tra
// ( frosta vitro ), nigra ĝin sufokas ( solida nigra tabulo ). Tiel unu valoro
// regas kaj la koloron kaj la travideblecon — la signo neniam konkuras kun la
// fono, sed tenas sian propran korpon.
//
// La KONTURO de la teksto iras la malan direkton ( nigra tage, blanka nokte ),
// ĉar la filtraĵo de la plato malheligas ankaŭ la malantaŭan bildon: tage la
// literoj bezonas malhelan konturon sur la hela vitro, nokte helan konturon sur
// la nigra plato.
//     @param malhelo ( number ) - 0 = plena tago ( blanka ), 1 = plena nokto ( nigra ).
export function gxisdatigiSteleanVitron(malhelo: number): void {
  const v = 1 - Math.max(0, Math.min(1, malhelo));
  // Skribu nur kiam la valoro vere sxangxigxis — la ciklo vokas cxiun kadron.
  if ( Math.abs(v - lastaVitraLumo) < 0o1/0o100 ) return;
  lastaVitraLumo = v;
  const m = steleaVitro();
  m.color.setRGB(v, v, v);
  // La INKO de la teksto transiras de PALA flava ( nokte ) al MUTA flava ( tage ).
  steleaInkaKoloro.lerpColors(STELEA_INKO_NOKTE, STELEA_INKO_TAGE, v);
  // La KONTURO iras la MALAN direkton ol la plato: blanka tage, nigra nokte.
  steleaBordoKoloro.setRGB(v, v, v);
  // Nokte ankaŭ la emisio malaperas, do la signo estas vere nigra.
  m.emissiveIntensity = v * 0o1/0o4;
}
let lastaVitraLumo = 1;

// aldoniSteleanSignon — Uniforma 3D stela signo por cxiuj konstruajxoj. nesimetriaj
// rondigitaj supraj anguloj (r1 = 0o1/0o4, r2 = 0o1/0o10), rektaj malsupraj. La Gawekiif-nomo
// staras sur la tero apud la pordo. La texturo estas travidebla — nur la teksto
// montrigxas super la malhela steleo (neniu nigra bloko).
//     @param tipo ( string ) - La konstrua-tipo ( satala TIPARO-sxlosilo ) — la
//              defauxta tip-nomo anstatauxas la nomon kiam la konstruajxo estas sennoma.
// Elportita ( export ) ankaŭ por la inspektilo, kiu montras la signon sola.
export function aldoniSteleanSignon(group: THREE.Group, name: string, tipo: string, w: number, d: number): void {
  // ⟨ La teksajxo estas MASKO 📃 ⟩ — la shadero legas nur la alfa-kanalon, do
  // la glifoj estas desegnitaj blankaj kaj la ORAN inkon donas la shadero mem
  // ( kune kun la tagnokta konturo ).
  const teksajxo = generiSkribanTeksajxon(nomoAih(name, tipo), { w: 0o300, h: 0o1516, ink: "#ffffff" });
  teksajxo.wrapS = teksajxo.wrapT = THREE.ClampToEdgeWrapping;
  // La signo staras sur la tero apud la pordo (0o1/0o100 levita por ne z-fajfi kun la grundo).
  const signaY = 0o1/0o100;
  const steleo = new THREE.Mesh(
    new THREE.ExtrudeGeometry(kreiSteleanFormon(0o5/0o10, 0o24/0o10, 0o1/0o4, 0o1/0o10), { depth: 0o5/0o40, bevelEnabled: false, curveSegments: 0o10 }),
    // ⟨ La steleo estas FROSTA VITRO 📃 ⟩ — la sama dividita materialo por
    // ĉiuj konstruaĵoj ( kiel la muroj kaj la kadroj ). La plato estas
    // DUONTRATRAVIDA: `transparent` + `opacity` 0o5/0o10 lasas 0.375 de la fono
    // tra, kaj alta `roughness` ( 0.42 ) forprenas la spegulojn — la plato
    // legiĝas kiel frostigita vitro, ne kiel spegulo kaj ne kiel aero.
    //
    // ⟨ Kial NE `transmission` 📃 ⟩ — la antaŭa versio estis vera transira vitro.
    // Tiu materialo postulas apartan pasumon de la tuta maldiafana sceno ( vidu
    // la mezurojn en scena.ts ); por kelkaj malgrandaj signoj tio estis triono de
    // la geometria laboro de ĉiu kadro. La fono ankaŭ ne plu malklarigxas — kio
    // taŭgas, ĉar la plato nun estas pli maldiafana ol antaŭe.
    //
    // ⟨ Kial la koloro estas HELA 📃 ⟩ — la baza koloro venas de la TAGNOKTA
    // transiro ( vidu gxisdatigiSteleanVitron ) — blanka tage, nigra nokte — kaj
    // kun ĝi iras la OPACECO: tage frosta vitro, nokte preskaŭ solida nigra
    // tabulo.
    //
    // La plato NE ĵetas ombron: travidebla objekto kun maldiafana ombro aspektus
    // kiel solida nigra tabulo.
    steleaVitro()
);
  steleo.position.set(w * 0o13/0o40, signaY, d / 2 + 0o104/0o100 - 0o5/0o100); steleo.castShadow = false; group.add(steleo);
  // ShapeGeometry uzas la krudajn formo-koordinatojn kiel UV (ne [0,1]),
  // do la texturo algluigxus al la malsupra-dekstra angulo de la faco.
  // Normaligu la UV-ojn al la limig-skatolo por plenigi la tutan facon.
  // ⟨ La faco havas la SAMAN konturon kiel la plato 📃 ⟩ — antaŭe ĝi estis pli
  // malgranda ( 0o4/0o10 × 0o215/0o100 anstataŭ 0o5/0o10 × 0o24/0o10 ) kaj
  // flosis antaux la plato, do ĝi legigxis kiel aparta KARTO ene de la signo.
  // Nun ĝi kusxas GXUSTE sur la fronta faco de la plato ( la sama formo, la sama
  // grandeco ), do la teksto sxajnas esti presita SUR la vitro.
  const faceGeo = new THREE.ShapeGeometry(kreiSteleanFormon(0o5/0o10, 0o24/0o10, 0o1/0o4, 0o1/0o10), 0o10);
  faceGeo.computeBoundingBox();
  const facePoz = faceGeo.getAttribute("position");
  const faceUV = faceGeo.getAttribute("uv");
  const faceUjo = faceGeo.boundingBox!;
  const faceLargho = Math.max(1e-6, faceUjo.max.x - faceUjo.min.x);
  const faceAlto = Math.max(1e-6, faceUjo.max.y - faceUjo.min.y);
  // ⟨ La teksto estas iomete PLI MALGRANDA ol la faco 📃 ⟩ — la glifoj plenigas
  // ~83% de la teksajxo-larĝo, do sur la tuta faco ili preskaŭ tusxus la randon de
  // la plato. Ni disetendas la UV-ojn 7/6-obla ĉirkaŭ la centro: la teksto tiel
  // sxrumpas al ~86% kaj la randoj de la teksajxo ( travideblaj — 8.6% cxiuflanke )
  // restas ekstere, kie la `discard` de la shadero forigas ilin.
  const tekstaSkalo = 0o7/0o6;
  for ( let i = 0; i < faceUV.count; i++ ) {
    const u = ( facePoz.getX(i) - faceUjo.min.x ) / faceLargho;
    const v = ( facePoz.getY(i) - faceUjo.min.y ) / faceAlto;
    faceUV.setXY(i, 0o1/0o2 + ( u - 0o1/0o2 ) * tekstaSkalo, 0o1/0o2 + ( v - 0o1/0o2 ) * tekstaSkalo);
  }
  faceUV.needsUpdate = true;
  const face = new THREE.Mesh(faceGeo, steleaTeksto(teksajxo));
  // La faco sidas TUCXE antaux la fronto de la plato ( la ekstrudo 0o5/0o40
  // profunda finigxas je d/2 + 0o111/0o100 ) — 0o1/0o300 ( ~0.005 ) da spaco
  // suficxas por eviti z-fajfon, sed restas nevidebla de la flanko.
  face.position.set(w * 0o13/0o40, signaY, d / 2 + 0o111/0o100 + 0o1/0o300); group.add(face);
}
