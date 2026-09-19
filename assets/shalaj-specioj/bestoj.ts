// Besta modulo — la komuna akva besta sistemo kaj la fasado de la bestaj specoj.
//
// ⟨ ĈIU SPECO SIDAS EN SIA PROPRA DOSIERO 📃 ⟩
//   · beroe.ts, mnemiopsis.ts, pleurobrakia.ts — la tri ktenoforoj ( kombuloj ),
//     kiuj pulsas; iliaj komunaj konstruiloj ( la ĝela kaj la kombila teksajxoj,
//     la pulso, la surfaca gluado ) estas en ktenofora-komunajxoj.ts.
//   · glacifiso.ts — la travidebla fiŝo de la riverfundo.
//   · marlaraksxo.ts — la longkrura mara araneo.
//   · petrelo.ts + petrelo-malneto.ts — la neĝopetrelo ( la fluga besto ).
// Ĉiu speco-dosiero posedas kaj sian modelon kaj sian animacion; ĉi tiu dosiero
// tenas la KOMUNAĴON: la speco-reĝistron, la metadon en la scenon kaj la
// komunan naĝan movon ( la rivera oscilado, la bobado, la grupo-rotacioj ).
//
// La specoj estas konstruitaj kiel malnetoj ( geometrioj/materialoj konstruitaj
// unufoje ), kaj ĉiu besto estas klono de sia malneto — la klonoj kunhavas la
// samajn geometriojn kaj materialojn, do la bestoj ne kostas teksturojn po unu.
import * as THREE from "three";
import { alteco, akvaNivelo, biomo, cxuEnLago } from "../../src/tereno.js";
import type { Besto, BestoSistemo, SpecoMalneto } from "./speco-tipoj.js";
import { kreiKombovicanTeksajxon } from "./ktenofora-komunajxoj.js";
import { trovuBestajnZonojn } from "./zono-trovilo.js";
import { konstruiMalneton as konstruiBeranMalneton, gxisdatigiBeran } from "./beroe.js";
import { konstruiMalneton as konstruiMnemiopsanMalneton, gxisdatigiMnemiopsan } from "./mnemiopsis.js";
import { konstruiMalneton as konstruiPleŭrobrakianMalneton,
  gxisdatigiPleŭrobrakian } from "./pleurobrakia.js";
import { konstruiGlacifisanMalneton, gxisdatigiGlacifison } from "./glacifiso.js";
import { konstruiMarlaraksxanMalneton, gxisdatigiMarlaraksxon } from "./marlaraksxo.js";
import { gxisdatigiPetrelojn, konstruiMetitanPetrelon, konstruiPetrelojn } from "./petrelo.js";
import type { Petrelo, PetreloSistemo } from "./petrelo.js";

// La publika vizaĝo — la ludo importas ĉion el ĉi tiu modulo, same kiel
// antaŭe, do la divido al la speco-dosieroj ne rompas la alvokantojn.
export { BIOMO_DE_BESTO } from "./speco-tipoj.js";
export type { Besto, BestoSistemo, SpecoMalneto } from "./speco-tipoj.js";
export { gxisdatigiPetrelojn, konstruiMetitanPetrelon, konstruiPetrelojn };
export type { Petrelo, PetreloSistemo };

// akvajMalnetoj — La kvin akvaj speco-malnetoj, konstruitaj nur unufoje kaj
// stokitaj module-nivele. Ĉiu besto estas klono de sia malneto, do la metado
// de multaj bestoj ne rekreu kanvasajn teksturojn aŭ geometriojn po voko.
let akvajMalnetojStoko: SpecoMalneto[] | null = null;
function akvajMalnetoj(): SpecoMalneto[] {
  if ( !akvajMalnetojStoko ) {
    const teksajxo = kreiKombovicanTeksajxon();
    akvajMalnetojStoko = [
      konstruiBeranMalneton(teksajxo),
      konstruiMnemiopsanMalneton(teksajxo),
      konstruiPleŭrobrakianMalneton(teksajxo),
      konstruiGlacifisanMalneton(),
      konstruiMarlaraksxanMalneton(),
    ];
  }
  return akvajMalnetojStoko;
}

// konstruiBestojn — Metu la bestojn en la riveron. Hazardaj pozicioj laŭ la
// riverkurbiĝo, evitante la dokojn. Ili flosas ĉe la akvosurfaco ( aŭ marŝas
// pli profunde ) kaj naĝas per pulsoj ( vidu gxisdatigiBestojn ).
//     @param kvanto ( number ) - Kiom da bestoj.
//     @param riverFn ( funkcio ) - Rivercentra funkcio z(x).
//     @param akvoYFn ( funkcio ) - Akvosurfaca alta funkcio y(x).
//     @param duonaLargho ( number ) - Duon-larĝo de la rivero.
// ekstraktuBestajnPartojn — Trovu la korpon, la voston kaj la animeblajn
// partojn de besto-klono, kaj konservu la bazan kruro-pozon por la marŝa
// animacio ( vidu gxisdatigiBestojn ). Reuzata de konstruiBestojn kaj
// konstruiMetitanBeston — ambaŭ dividas la saman ekstraktan logikon.
function ekstraktuBestajnPartojn(grupo: THREE.Group) {
  const korpo = grupo.getObjectByName("korpo") as THREE.Mesh;
  const vosto = grupo.getObjectByName("vosto") as THREE.Object3D | undefined;
  const animajxoj = grupo.children.filter(c => c !== korpo && c !== vosto);
  // La glacifisa korpo estas ĉeno de segmentoj ( ankaŭ infanoj, do ili fallas
  // en animajxojn ) kaj la naĝiloj sidas sur la segmentoj. La animacio trafas
  // ilin laŭ la nomoj, tra la tuta klono ( getObjectByName estas rekursiva ).
  const segmentoj: THREE.Object3D[] = [];
  grupo.traverse(o => { if (o.name === "segmento" ) segmentoj.push(o); });
  const naĝiloj: THREE.Object3D[] = [];
  grupo.traverse(o => {
    if ( o.name === "dorsa" || o.name === "analo" || o.name === "brusta" || o.name === "pelva" ) {
      naĝiloj.push(o);
    }
  });
  const bazajKruroj = animajxoj
    .filter(parto => parto.name === "kruro").map(kruro => {
      // La grupo-origino SIDAS ĉe la kokso ( la femuro komenciĝas tie ), do la
      // ankro estas simple la grupo-loko — nenia re-centriga kalkulo. La genuo
      // ( la dua artiko de la marlaraksxo ) estas trovata unufoje ĉi tie.
      const genuo = kruro.children.find(c => c.name === "genuo");
      // La flanko ( ±1 ) — la animacio spegulas per ĝi la rotaciojn ĉirkaŭ la
      // loka z-akso ( la bato kaj la genua flekso ). La valoro venas el la
      // malneto tra userData ( Object3D.clone konservas ĝin ).
      const flanko = ( kruro.userData.flanko as number | undefined ) ?? 1;
      return {
        kruro,
        q: kruro.quaternion.clone(),
        ankro: kruro.position.clone(),
        genuo,
        flanko,
      };
    });
  return { korpo, vosto, animajxoj, bazajKruroj, segmentoj, naĝiloj };
}

export function konstruiBestojn(sceno: THREE.Scene,
  kvanto: number,
  riverFn: ( x: number ) => number,
  akvoYFn: ( x: number ) => number,
  duonaLargho: number,
  lago?: { x: number; z: number; r: number; nivelo: number }
): BestoSistemo {
  const bestoj: Besto[] = [];
  const malnetoj = akvajMalnetoj();

  // La pentrita akvaj-bestoj zono ( la skulptilo ) — la bestoj naĝas nur en
  // la pentritaj akvaj ĉeloj ( hazarda ĉelo kiel ankro ). La defaŭltaj lokoj
  // estas bakitaj en la tavolon; malplena zono signifas neniajn bestojn.
  const akvajZonoj = trovuBestajnZonojn(1, true);
  const pentritaj = akvajZonoj.length > 0;

  for ( let i = 0; i < kvanto && pentritaj; i++ ) {
    // Ĉiu besto ankoras ĉe hazarda pentrita akva ĉelo — lago aux rivero laŭ
    // la ĉelo. La lagaj bestoj ricevas la ĉelon kaj restas ĉirkaŭ ĝi,
    // anstataŭ sekvi la riverkurbon.
    const loko = akvajZonoj[( Math.random() * akvajZonoj.length ) | 0];
    const enLago = !!lago && cxuEnLago(loko.x, loko.z);
    let x = 0, zOfseto = 0, cz = 0;
    if ( enLago ) {
      x = loko.x + ( Math.random() - 0o1/0o2 ) * 0o6;
      cz = loko.z + ( Math.random() - 0o1/0o2 ) * 0o6;
    } else {
      x = loko.x;
      zOfseto = loko.z - riverFn(loko.x);
    }
    // La speco-mikso sekvas la biomon de la akvo. La rivero kaj la lago estas
    // la AKVA biomo ( la skulptita masko ) — la ktenoforoj kaj la marlaraksxo
    // estas la kutimaj akvaj specoj, dum la glacifiso preferas malvarman
    // montaran akvon ( se la skulptilo iam levus montaran lagon ).
    const zAkvo = enLago ? cz : riverFn(x) + zOfseto;
    const speco = biomo(x, zAkvo) === "montaro"
      ? malnetoj[3 + ( Math.random() < 0o1/0o2 ? 0 : 1 )]
      : malnetoj[( Math.random() * malnetoj.length ) | 0];
    // Klono kunhavas la geometriojn/materialojn de la malneto.
    const grupo = speco.malneto.clone();
    const { korpo, vosto, animajxoj, bazajKruroj, segmentoj, naĝiloj } = ekstraktuBestajnPartojn(grupo);
    const platigxo = speco.platigxo;
    const grandeco = 0o1/0o2 + Math.random() * 0o3/0o4;
    grupo.scale.set(grandeco * platigxo.x, grandeco * platigxo.y, grandeco * platigxo.z);
    // La grupo sidas tiel, ke la korpo estas plejparte subakva — nur la supro
    // restas ĉe la surfaclinio ( plus la mergo de la fundaj bestoj ), supren
    // kaj malsupren kun la bobado ( vidu gxisdatigiBestojn ). La akvosurfaco
    // venas de akvaNivelo — la SAMA funkcio, kiun uzas la naĝanto kaj la kanuo.
    // La malnova procedura akvoYFn situas kelkajn unuojn super la skulptita
    // akvo, do la bestoj flosis en la aero super la rivero kaj la lago.
    const zLoko = enLago ? cz : riverFn(x) + zOfseto;
    const nivelo = akvaNivelo(x, zLoko);
    const profundo = Math.max(0, nivelo - alteco(x, zLoko));
    const supro = speco.supro * grandeco;
    // La fundaj bestoj ( glacifiso ) naĝas antaŭ la fundo — la mergo sekvas la
    // lokan profundon, sed restas malfermo sub la korpo.
    const mergo = ( speco.mergo ?? 0 )
      + ( speco.fundaMergo ? Math.max(0, Math.min(speco.fundaMergo * profundo, profundo - 0o6/0o10)) : 0 );
    const bazaY = -( supro + mergo ) + ( Math.random() - 0o1/0o2 ) * 0o3/0o20;
    grupo.position.set(x, nivelo + bazaY, zLoko);
    grupo.rotation.y = Math.random() * Math.PI * 0o2;
    sceno.add(grupo);

    bestoj.push({
      grupo, korpo, vosto, animajxoj, bazajKruroj, segmentoj, naĝiloj,
      x, zOfseto, cz, enLago, bazaY, nivelo,
      direkto: Math.random() * Math.PI * 0o2,
      turno: 0,
      phase: Math.random() * Math.PI * 0o2,
      amplitudo: ( enLago ? 0o3 : 0o3 + Math.random() * 0o6 ) * ( speco.ampleksaMultoblo ?? 0o1 ),
      rapido: ( 0o1/0o4 + Math.random() * 0o3/0o10 ) * ( speco.rapidaMultoblo ?? 0o1 ),
      speco: speco.speco,
      pulsaRapido: speco.pulsaRapido ?? 0,
      pulsaForto: speco.pulsaForto ?? 0,
      pulsaOndo: speco.pulsaOndo ?? 0,
      plata: speco.plata ?? 1,
      bazaSkalo: grupo.scale.clone(),
    });
  }

  return { bestoj, riverFn, akvoYFn, lago };
}

// konstruiMetitanBeston — UNU ktenoforo cxe preciza pozicio ( la objekta ilo
// de la terena skulptilo ). La besto ankoras cxe ( x, z ), naĝas enLago-stile
// ( eta oscilado cxirkau la ankro — la enLago-vojo de gxisdatigiBestojn ) kaj
// flosas sur la DONITA akvosurfaco ( nivelo ), ne sur la komuna lago.
//     @param specoIndex ( number ) - 0=Beroe, 1=Mnemiopsis, 2=Pleŭrobrakia,
//         3=Glacifiso, 4=Marlaraksxo.
//     @param x, z ( number ) - La ankro ( monda pozicio ).
//     @param akvoY ( number ) - La akvosurfaco tie.
//     @param grandeco ( number ) - La skala faktoro.
//     @returns La besto ( jam aldonita al la sceno ), aux null.
export function konstruiMetitanBeston(sceno: THREE.Scene,
  specoIndex: number,
  x: number, z: number,
  akvoY: number,
  grandeco: number
): Besto | null {
  const malnetoj = akvajMalnetoj();
  const speco = malnetoj[Math.max(0, Math.min(malnetoj.length - 1, specoIndex | 0))];
  const grupo = speco.malneto.clone();
  const { korpo, vosto, animajxoj, bazajKruroj, segmentoj, naĝiloj } = ekstraktuBestajnPartojn(grupo);
  const platigxo = speco.platigxo;
  grupo.scale.set(grandeco * platigxo.x, grandeco * platigxo.y, grandeco * platigxo.z);
  const profundo = Math.max(0, akvoY - alteco(x, z));
  const supro = speco.supro * grandeco;
  const mergo = ( speco.mergo ?? 0 )
    + ( speco.fundaMergo ? Math.max(0, Math.min(speco.fundaMergo * profundo, profundo - 0o6/0o10)) : 0 );
  const bazaY = -( supro + mergo ) + ( Math.random() - 0o1/0o2 ) * 0o3/0o20;
  grupo.position.set(x, akvoY + bazaY, z);
  grupo.rotation.y = Math.random() * Math.PI * 0o2;
  sceno.add(grupo);
  return {
    grupo, korpo, vosto, animajxoj, bazajKruroj, segmentoj, naĝiloj,
    x, zOfseto: 0, cz: z, enLago: true,
    nivelo: akvoY, bazaY,
    direkto: Math.random() * Math.PI * 0o2,
    turno: 0,
    phase: Math.random() * Math.PI * 0o2,
    amplitudo: 0o3 * ( speco.ampleksaMultoblo ?? 0o1 ),
    rapido: ( 0o1/0o4 + Math.random() * 0o3/0o10 ) * ( speco.rapidaMultoblo ?? 0o1 ),
    speco: speco.speco,
    pulsaRapido: speco.pulsaRapido ?? 0,
    pulsaForto: speco.pulsaForto ?? 0,
    pulsaOndo: speco.pulsaOndo ?? 0,
    plata: speco.plata ?? 1,
    bazaSkalo: grupo.scale.clone(),
  };
}

// lastaBestoTempo — la antaŭa animacia tempo, por la kadra tempopaso. La glata
// turniĝo de la glacifiso bezonas ĝin, kaj gxisdatigiBestojn ricevas nur la
// absolutan tempon.
let lastaBestoTempo = 0;

// gxisdatigiBestojn — Naĝiga animacio. La bestoj oscilas laŭ la rivero,
// svingas la kapon, bobas kaj pulse kunpremas la korpon ( kiel kombuloj ).
// La glacifiso turniĝas al la direkto de sia movo, kliniĝas en la turnojn,
// ondigas la korpon per la segmenta ĉeno kaj remas per la brustaj ventumiloj.
//     @param s ( BestoSistemo ) - La besta sistemo.
//     @param t ( number ) - Malsupra tempo.
export function gxisdatigiBestojn(s: BestoSistemo, t: number): void {
  // La kadra tempopaso — limigita, ĉar la unua kadro kaj paŭzoj donas grandajn
  // valorojn, kaj la turniĝo tiam saltus.
  const dt = Math.min(0o1/0o10, Math.max(0o1/0o1000, t - lastaBestoTempo));
  lastaBestoTempo = t;
  for ( const b of s.bestoj ) {
    // Fora besto ( pli malproksima ol la vidlimo de la ludo ) estas kaŝita —
    // ĝia animacio paŭzas kaj rekomenciĝas kiam ĝi revenas en la vidon.
    if ( !b.grupo.visible ) continue;
    const x = b.x + Math.sin(t * b.rapido + b.phase) * b.amplitudo;
    const bobo = Math.sin(t * 0o2 + b.phase * 0o3) * 0o3/0o20;
    let z: number;
    if ( b.enLago && ( b.nivelo !== undefined || s.lago ) ) {
      z = b.cz + Math.sin(t * 0o3/0o4 + b.phase * 0o2) * 0o1/0o2;
    } else {
      z = s.riverFn(x) + b.zOfseto + Math.sin(t * 0o3/0o4 + b.phase * 0o2) * 0o1/0o2;
    }
    // La akvosurfaco de la besto ( b.nivelo, kalkulita ĉe la metado el
    // akvaNivelo ) — la sama surfaco, ĉe kiu naĝas la ludanto.
    const surfaco = b.nivelo ?? ( b.enLago && s.lago ? s.lago.nivelo : s.akvoYFn(x) );
    const y = surfaco + b.bazaY + bobo;
    b.grupo.position.set(x, y, z);
    b.grupo.rotation.y = b.direkto + Math.sin(t * b.rapido + b.phase) * 0o1/0o4
      + Math.sin(t * 0o1/0o2 + b.phase) * 0o1/0o4;
    b.grupo.rotation.z = Math.sin(t * 0o3/0o4 + b.phase) * 0o3/0o40;
    // ⟨ La speco-specifa animacio 📃 ⟩ — ĉiu speco-dosiero zorgas pri siaj
    // propraj partoj; ĉi tiu funkcio nur elektas la ĝustan laŭ la speco.
    if ( b.speco === "beroe" ) {
      gxisdatigiBeran(b, t);
    } else if ( b.speco === "mnemiopsis" ) {
      gxisdatigiMnemiopsan(b, t);
    } else if ( b.speco === "pleurobrakia" ) {
      gxisdatigiPleŭrobrakian(b, t);
    } else if ( b.speco === "glacifiso" ) {
      gxisdatigiGlacifison(b, t, dt);
    } else if ( b.speco === "marlaraksxo" ) {
      gxisdatigiMarlaraksxon(b, t);
    }
  }
}
