// ≺⧼ Animacio 🎞️ ⧽≻
// La ĉefa buklo de la ludo — unu kadro po bildigo. Gxi pelas la senreĝimajn
// sistemojn ( la vetero, la akvo, la bestojn, la NPC-ojn, la retilon, la ombrojn,
// la herbon, la minimapon kaj la bildigon ) kaj lasas la tri reĝimajn blokojn al
// la piediraj kaj kanuaj moduloj:
//
//   promenado.ts — la ekstera piedirado ( la tereno, la naĝado, la promptoj )
//   internado.ts — la kuŝado kaj la piedirado en la interno
//   kanuado.ts   — la kanua direktado, la kanua fotilo kaj la flosado
//
// Ĉiu bloko mem elektas ĉu ĝi agu ( per la reĝimo kaj la kanuo ), do ĉi tiu
// buklo nur vokas ilin en la sama ordo ĉiukadre.
import * as THREE from "three";
import type { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { gxisdatigiAkvon } from "../../eskekoj/medio/akvo.js";
import { animaciiFlammojn } from "../../eskekoj/konstruajxoj/hxeuxfa/animacio.js";
import { gxisdatigiInternon } from "../../eskekoj/konstruajxoj/internoj.js";
import { animaciiKrasesxagxon } from "../../eskekoj/konstruajxoj/krasesxagxa-kosmosxipo.js";
import { gxisdatigiBestojn, gxisdatigiPetrelojn } from "../../eskekoj/shalaj-specioj/bestoj.js";
import { gxisdatigiNpc, marŝSvingo } from "../../eskekoj/shalaj-specioj/homoj.js";
import { gxisdatigiHerbon } from "../../eskekoj/shalaj-specioj/vegetajxo/herbo/vento.js";
import type { Figuro } from "../../eskekoj/shalaj-specioj/homoj.js";
import type { MapFormo } from "../../eskekoj/komunajxoj/mapformo.js";
import { alteco, akvaNivelo } from "../mondo/tereno.js";
import type { UrbaSistemo } from "../mondo/urbo/tipoj.js";
import { gxisdatigiVidlimojn } from "../bildo/vidlimo.js";
import type { Minimapo } from "../bildo/minimapo.js";
import type { Statistiko } from "../fasado/statistiko.js";
import type { LudantaAspekto } from "../fasado/vestejo.js";
import { kreiHerbajnPusantojn } from "./herbo-pusantoj.js";
import type { Retilo, LokaStato } from "./retilo.js";
import type { Ludanto } from "./ludanto.js";
import { kreiPiedanStaton } from "./piedirado.js";
import type { PiedaMondo } from "./piedirado.js";
import { kreiPromenanton } from "./promenado.js";
import { kreiInternanton } from "./internado.js";
import type { Kanuanto } from "./kanuado.js";

// AnimaciajOpcioj — la elementoj, la sistemoj de la mondo ( la urbo ), la kanua
// bloko, la kolizia krado kaj la agoj de la orkestrilo, kiujn la buklo bezonas.
// La staton de la ludanto gxi ricevas kiel unu objekton.
export interface AnimaciajOpcioj {
  kanvaso: HTMLCanvasElement;
  sxargxaElemento: HTMLElement;
  promptoElemento: HTMLElement;
  bildilo: THREE.WebGLRenderer;
  fotilo: THREE.PerspectiveCamera;
  sceno: THREE.Scene;
  regiloj: OrbitControls;
  maksimumaRatio: number;
  ludanto: Ludanto;
  klavoj: Record<string, boolean>;
  cxuSprintas: () => boolean;
  cxuSaltas: () => boolean;
  ludantaFiguro: Figuro;
  minimapo: Minimapo;
  retilo: Retilo;
  statistiko: Statistiko;
  mondo: UrbaSistemo;
  kanuanto: Kanuanto;
  gxisdatigiVeteron: ( t: number ) => void;
  gxisdatigiOmbron: ( x: number, z: number ) => boolean;
  mapoFormo: MapFormo;
  mapoGrandeco: number;
  piedoj: PiedaMondo;
  legiVeston: () => LudantaAspekto;
  agordiPrompton: ( htmlo: string ) => void;
}

export interface Animacio {
  animacii(): void;
}

export function kreiAnimacion( opcioj: AnimaciajOpcioj ): Animacio {
  const {
    kanvaso, sxargxaElemento, promptoElemento,
    bildilo, fotilo, sceno, regiloj, maksimumaRatio,
    ludanto, klavoj, cxuSprintas, cxuSaltas,
    ludantaFiguro, minimapo, retilo, statistiko,
    mondo, kanuanto, gxisdatigiVeteron, gxisdatigiOmbron,
    mapoFormo, mapoGrandeco, piedoj,
    legiVeston, agordiPrompton,
  } = opcioj;
  const {
    riverData, riveroNordOrienta, lago, skulptaAkvo, bestoj, petreloj,
    lampSistemo, nebulSistemo, npcoj, internaSistemo, xipo,
  } = mondo;

  // La tri reĝimaj blokoj. Ili kunhavas la fotilon kaj la kolizian kradon
  // ( `piedoj`, venanta de la orkestrilo ) kaj la paŝan oscilon ( `movo` ).
  const movo = kreiPiedanStaton();
  const promenanto = kreiPromenanton({
    ludanto, movo, mondo, piedoj, klavoj, cxuSprintas, cxuSaltas,
    promptoElemento, agordiPrompton, mapoFormo, mapoGrandeco,
  });
  const internanto = kreiInternanton({
    ludanto, movo, interno: internaSistemo, piedoj, klavoj, promptoElemento, agordiPrompton,
  });

  // ⟪ La stato de la buklo 📃 ⟫ — la tempigilo, la kadro-nombroj, la dinamika
  // rezolucio kaj la reuzataj orbitaĵoj. Nenio el tio apartenas al la ludanto.
  const horlogxo = new THREE.Timer();
  // La radara kadro-nombro — la 2-bitaj malaltaj bitoj tempigas la redesegnon de
  // 0o7 fojoj en He.
  let radaraKadro = 0;
  // La ombra kadro-nombro — la malalta bito tempigas la ombran pasumon al 0o16
  // fojoj en He ( vidu la ombran kadencan klarigon en scena.ts ).
  let ombraKadro = 0;
  // Dinamika rezolucio — sub ŝarĝo la bildiga skalo malkreskas paŝe ( ĝis 60% de
  // la baza pixelRatio ) kaj revenas kiam la kadroj denove estas rapidaj.
  let dinamikaSkalo = 1;
  let malrapidajKadroj = 0, rapidajKadroj = 0;
  // Reuzataj skribaj vektoroj de la orbita movo — neniu ĉiukadra asigno.
  const ORBITA_DIR = new THREE.Vector3();
  const ORBITA_FLANKO = new THREE.Vector3();
  const ORBITA_SUPRE = new THREE.Vector3(0, 1, 0);
  const ORBITA_OFSETA = new THREE.Vector3();

  // ⟪ Retila stato 📃 ⟫ — la pozicio kaj aspekto de la ludanto, sendataj al la
  // aliaj ludantoj per la retilo. En orbito la ludanto ne ĉeestas fizike en la
  // mondo — la aliaj kaŝas la figuron ( reĝimo "orbit" ).
  function konstruiRetilanStaton(): LokaStato {
    const aspekto = legiVeston();
    const kanoto = ludanto.surKanoto;
    let y = ludanto.pozicio.y;
    if ( kanoto ) {
      // Sur la kanuo la figuro sidas sur la bastono.
      y = kanoto.bazaY + 0o3/0o20;
    } else if ( movo.estisNaĝanta && ludanto.rezimo === "walk" ) {
      // Naĝante la korpo mergiĝas — la kapo apenaŭ super la akvosurfaco.
      y = akvaNivelo(ludanto.pozicio.x, ludanto.pozicio.z) - 0o16/0o10;
    }
    return {
      x: ludanto.pozicio.x, y, z: ludanto.pozicio.z,
      direkto: ludanto.direkto,
      movo: ludanto.rezimo === "walk" || ludanto.rezimo === "interior" ? ludanto.movoValoro : 0,
      naĝas: movo.estisNaĝanta,
      surKanuo: kanoto !== null,
      interno: ludanto.rezimo === "interior" && ludanto.elektitaSpec ? `${Math.round(ludanto.elektitaSpec.x)}|${Math.round(ludanto.elektitaSpec.z)}` : "",
      reĝimo: ludanto.rezimo,
      vesto: aspekto.vestoIdx,
      haro: aspekto.harStiloIdx,
      harKoloro: aspekto.harKoloroIdx,
    };
  }

  // ⟪ La herbo-puŝantoj 📃 ⟫ — la gazono cedas sub la piedoj ( vidu gxisdatigiHerbon
  // en vegetajxo/herbo/vento.ts ). La glitoj kaj la kandidata elekto vivas en
  // kantaoj/ludo/herbo-pusantoj.ts — la buklo nur donas la fotilon ĉiukadre.
  const { kolekti: kolektiHerbajnPusantojn } = kreiHerbajnPusantojn({
    npcoj, bestoj,
    ludanto: () => ludanto.pozicio,
    promenas: () => ludanto.rezimo === "walk" && !ludanto.surKanoto,
  });

  function animacii() {
    requestAnimationFrame(animacii);
    // Timer ( anstataux la malnova Clock ) — update() devas voki cxiun kadron
    // antaux la legado de getDelta()/getElapsed().
    horlogxo.update();
    const krudaDt = horlogxo.getDelta();
    const deltaTempo = Math.min(krudaDt, 0o3/0o100);
    const t = horlogxo.getElapsed();

    // Reskaligi — dinamika rezolucio. Sub ŝarĝo la skalo malkreskas paŝe kaj
    // revenas kiam la kadroj denove estas rapidaj.
    const w = innerWidth, h = innerHeight;
    // Malrapida < 0o26 kadroj en He, rapida > 0o32 kadroj en He. La rapida sojlo
    // estas atingebla ankaŭ sur ekrano de 0o34 kadroj en He ( 0o34 > 0o32 ), por ke
    // la rezolucio povu reveni.
    if ( krudaDt > 1 / 0o60 ) { malrapidajKadroj++; rapidajKadroj = 0; }
    else if ( krudaDt < 1 / 0o70 ) { rapidajKadroj++; malrapidajKadroj = 0; }
    // ⟨ La reagemo 📃 ⟩ — antaŭe la skalo bezonis 0o40 ( 32 ) sinsekvajn malrapidajn
    // kadrojn por malleviĝi unu paŝon. Ĉe 0o2 kadroj en He tio estas pli ol 0o15 He
    // da lagado antaŭ la unua malleviĝo — la ludanto jam delonge sentas la
    // frostigon.
    // Nun la sojlo estas 0o14 ( 12 ) kadroj kaj la paŝo estas 0o2 anstataŭ 0o1, do
    // la skalo atingas sian ekvilibron en kvinono de la tempo.
    if ( malrapidajKadroj >= 0o14 && dinamikaSkalo > 0o6/0o10 ) { dinamikaSkalo = Math.max(0o6/0o10, dinamikaSkalo - 0o2/0o10); malrapidajKadroj = 0; }
    else if ( rapidajKadroj >= 0o130 && dinamikaSkalo < 1 ) { dinamikaSkalo = Math.min(1, dinamikaSkalo + 0o1/0o10); rapidajKadroj = 0; }
    const aktivaRatio = Math.min(devicePixelRatio, maksimumaRatio) * dinamikaSkalo;
    if ( kanvaso.width !== Math.floor(w * aktivaRatio) || kanvaso.height !== Math.floor(h * aktivaRatio) ) {
      fotilo.aspect = w / h; fotilo.updateProjectionMatrix();
      bildilo.setPixelRatio(aktivaRatio);
      bildilo.setSize(w, h);
    }

    // Vetero — precipita animacio ( pluvo · neĝo ) kaj la fotil-sekvo.
    gxisdatigiVeteron(t);
    // Flamoj
    animaciiFlammojn(lampSistemo, t);
    // Akva animacio — la skulptita masko estas la akvo; la proceduraj meshxoj
    // ekzistas nur sen skulptita datumaro.
    if ( riverData ) gxisdatigiAkvon(riverData, t);
    if ( riveroNordOrienta ) gxisdatigiAkvon(riveroNordOrienta, t);
    if ( lago ) gxisdatigiAkvon(lago, t);
    if ( skulptaAkvo ) gxisdatigiAkvon(skulptaAkvo, t);
    // Ktenoforoj — naĝado kaj pulso en la rivero
    gxisdatigiBestojn(bestoj, t);
    // Neĝopetreloj — rondflugado kaj flugil-batado super la lago kaj la rivero
    gxisdatigiPetrelojn(petreloj, t);
    // Krasesxagxo — oscila flosado super la kosmopordo ( la sxipo estas
    // objekto de SKULPTA_OBJEKTOJ — sen metita sxipo restas neniu ).
    if ( xipo ) animaciiKrasesxagxon(xipo, t, false);

    // ⟪ La reĝimaj blokoj 📃 ⟫ — la promenado, la interno kaj la kanuado, en la
    // sama ordo kiel antaŭe. Ĉiu bloko mem elektas ĉu ĝi agu.
    promenanto.paŝi(deltaTempo, t);
    internanto.paŝi(deltaTempo, t);
    kanuanto.paŝi(deltaTempo, t);

    // NPC-aj animacioj — vojkonsciaj: la dua argumento estas la piedebla supraĵo
    // ( vojoj + dokoj ), do la NPC-oj paŝas SUR la pavimajn vojojn anstataŭ
    // trairi ilin kiel la kruda tero sube.
    // Nur la videblaj NPC-oj animaciiĝas. La malproksimaj ( pli ol la vivanta
    // limo ) paŭzas — la animacio kaj la du terenaj legaĵoj ( alteco + la voja
    // supraĵo ) de 0o230 figuroj ĉiukadre estas vera kosto, kaj la paŭzintaj
    // figuroj estas kaŝitaj sub la nebulo.
    for ( const n of npcoj ) { if ( n.group.visible ) gxisdatigiNpc(n, deltaTempo, t, alteco, piedoj.kolizioj.vojaSuproY); }

    // ⟨ Kolizioj kun la vivantaj figuroj 📃 ⟩ — la ludanto ne trairu la NPC-ojn
    // nek la bestojn. Ĉe la NPC-oj ambaŭ flankoj cedas ( duono por la ludanto,
    // duono por la figuro — nur iliaj horizontaloj, la grundo-kvantoj de la
    // sekva kadro rekrampas ilin vertikale ); ĉe la bestoj la ludanto sola
    // estas puŝata — ili naĝas sian propran kurbon.
    if ( ludanto.rezimo === "walk" && !ludanto.surKanoto ) {
      for ( const n of npcoj ) {
        // Kaŝita ( forlasita ) NPC estas pli ol la vivanta limo for — neniu kolizio.
        if ( !n.group.visible ) continue;
        const difX = ludanto.pozicio.x - n.group.position.x, difZ = ludanto.pozicio.z - n.group.position.z;
        const d = Math.hypot(difX, difZ);
        const min = 0o7/0o10;
        if ( d < min && d > 0o1/0o20000 ) {
          const pen = min - d;
          ludanto.pozicio.x += ( difX / d ) * pen * 0o1/0o2;
          ludanto.pozicio.z += ( difZ / d ) * pen * 0o1/0o2;
          n.group.position.x -= ( difX / d ) * pen * 0o1/0o2;
          n.group.position.z -= ( difZ / d ) * pen * 0o1/0o2;
        }
      }
      for ( const b of bestoj.bestoj ) {
        if ( !b.grupo.visible ) continue;
        const difX = ludanto.pozicio.x - b.grupo.position.x, difZ = ludanto.pozicio.z - b.grupo.position.z;
        const d = Math.hypot(difX, difZ);
        const min = 0o5/0o10;
        if ( d < min && d > 0o1/0o20000 ) {
          const pen = min - d;
          ludanto.pozicio.x += ( difX / d ) * pen;
          ludanto.pozicio.z += ( difZ / d ) * pen;
        }
      }
    }

    // ⟪ Retilo 📃 ⟫ — sendu la lokan staton ( unu sendon ĉiun 0o21/0o100 He ) kaj
    // sekvu la forajn figurojn. Kiam la servilo ne estas atingebla, la tuta
    // per-kadra laboro estas preterlasata ( neniu stato-konstruo, neniu animacio —
    // ne ekzistas foraj figuroj se ne estas konekto ). La stato-builder vokiĝas nur
    // ĉe la realaj sendo-oj — neniu per-kadra objekto asigniĝas.
    if ( retilo.aktiva ) {
      retilo.sendi(konstruiRetilanStaton);
      retilo.animacii(deltaTempo, t);
    }

    // ⟪ Ludanta figuro — tria persono 📃 ⟫
    // Glata malzomo. Al nulo la fotilo revenas al unua persono kaj la figuro
    // kasxigxas ( alie gxi estus ene de la fotilo ).
    ludanto.kameraDistanco += ( ludanto.celDistanco - ludanto.kameraDistanco ) * Math.min(1, deltaTempo * 0o10);
    if ( ludanto.celDistanco < 0o1/0o20 ) ludanto.kameraDistanco = 0;
    const vidasFiguron = ludanto.kameraDistanco > 0o1/0o20 && ( ludanto.rezimo === "walk" || ludanto.rezimo === "interior" );
    ludantaFiguro.group.visible = vidasFiguron;
    if ( vidasFiguron ) {
      const kanoto = ludanto.surKanoto;
      if ( kanoto ) {
        // Sur la kanuo la figuro sidas sur la bastono, turnita laux la remado.
        ludantaFiguro.group.position.set(kanoto.x, kanoto.bazaY + 0o3/0o20, kanoto.z);
      } else {
        ludantaFiguro.group.position.set(ludanto.pozicio.x, ludanto.pozicio.y, ludanto.pozicio.z);
        if ( ludanto.rezimo === "walk" && movo.estisNaĝanta ) {
          // Naĝante la korpo mergiĝas, la kapo apenaŭ super la akvosurfaco.
          ludantaFiguro.group.position.y = akvaNivelo(ludanto.pozicio.x, ludanto.pozicio.z) - 0o16/0o10
            + Math.sin(t * 2 + ludanto.pozicio.x * 0o1/0o10) * 0o1/0o20;
        }
      }
      ludantaFiguro.group.rotation.y = Math.atan2(-Math.sin(ludanto.direkto), -Math.cos(ludanto.direkto));
      // Marŝa animacio — la sama ritmo kiel la fotila bobado, kontraŭfazaj
      // kruroj kaj brakoj dum paŝado, plus la svingo de la tuko kaj la kapo. La
      // funkcio ricevas la FAZON ( oscilo × 0o2 ), ne ĝian sinuson. Sur la kanuo la
      // figuro sidas sen svingo.
      const movoFiguro = kanoto ? 0 : ludanto.movoValoro;
      marŝSvingo(ludantaFiguro, movo.oscilo * 2, movoFiguro, deltaTempo);
    }
    // Internaj animacioj
    if ( ludanto.rezimo === "interior" ) gxisdatigiInternon(internaSistemo, t);

    // Nebula drivo — GPU-a ( uTime ); la orienten-driva ĉirkaŭvolvo okazas en
    // la vertica shadero, do la CPU nur donas la tempon.
    nebulSistemo.uTime.value = t;

    // Kompaso / minimapo — la nadlo indikas la rigardan direkton sur la norda mapo.
    // La sama konvertaĵo kiel la markila sago ( atan2( -fx, fz ) ). oriento dekstren,
    // nordo supren. En orbito la rigardo estas de la fotilo al la celo, do ( fx, fz ).
    const fx = ludanto.rezimo === "walk" ? -Math.sin(ludanto.direkto) : regiloj.target.x - fotilo.position.x;
    const fz = ludanto.rezimo === "walk" ? -Math.cos(ludanto.direkto) : regiloj.target.z - fotilo.position.z;
    // La mapo sekvu la vidpunkton. En promeno/interno la ludanto, en orbito la
    // fotila celo — alie la radaro restus fiksita ĉe la elirloko en orbito.
    const mapX = ludanto.rezimo === "orbit" ? regiloj.target.x : ludanto.pozicio.x;
    const mapZ = ludanto.rezimo === "orbit" ? regiloj.target.z : ludanto.pozicio.z;
    // La minimapo ricevas la vidpunkton, la rigardan direkton kaj la map-centron;
    // gxi mem turnas la radaran nadlon kaj retenas ilin por la desegnado.
    minimapo.gxisdatigi(fx, fz, mapX, mapZ);
    // La suna ombro-volumeno sekvu la saman vidpunkton — la ombroj sekvas la
    // ludanton ( anstataŭ resti fiksitaj ĉe la mond-origino ) kaj la ombra
    // pasumo desegnas nur la proksimajn ombrantojn. La ombro-mapo re-desegniĝas
    // tuj kiam la volumeno moviĝas, alie ĉiun duan kadron ( la moviĝantaj ombroj
    // postiĝas maksimume du kadrojn ).
    // ⟨ La ombra kadenco sub ŝarĝo 📃 ⟩ — la ombra pasumo estas la plej peza
    // unuopa parto de la kadro ( ĉirkaŭ 477 alvokoj kaj 8.3M trianguloj por ĉiu
    // ombra kadro ). Kiam la antaŭa kadro jam estis malrapida ( sub ~0o16 kadroj
    // en He ), la mapo refreŝiĝas ĉiun KVARAN kadron anstataŭ ĉiun duan: la ombroj
    // de la moviĝantaj figuroj postiĝas unu plian kadron ( 0o11/0o200 He —
    // nerimarkebla ) kaj la ombra pasumo duoniĝas ĝuste en la momentoj, kiam la
    // kadro estas ŝarĝita.
    // La moviĝanta ombro-volumeno tamen ĉiam ricevas sian kadron tuj — alie la
    // rando de la volumeno rampirus en la vidon dum irado.
    const ombraPeriodo = deltaTempo > 0o1/0o40 ? 0o4 : 0o2;
    ombraKadro = ( ombraKadro + 1 ) % ombraPeriodo;
    const ombroMovigxis = gxisdatigiOmbron(mapX, mapZ);
    if ( ombroMovigxis || ombraKadro === 0 ) bildilo.shadowMap.needsUpdate = true;
    // La kvar lampaj punktlumoj sekvu la saman vidpunkton ( la plej proksimaj
    // flamoj lumas ) — la nombro restas kvar, do neniu shader-rekompilo.
    lampSistemo.sekviLumojn(mapX, mapZ);
    // ⟪ La herbo 📃 ⟫ — la vento ricevas la tempon kaj la vidpunkton. La herbo
    // mem sidas senmove sur la tero ( la tabuloj konstruigxis unufoje ), do ĉi tiu
    // estas la sola per-kadra kosto de la herbo — du skriboj, neniu matrico.
    // ⟨ La centro de la herbo estas la FOTILO 📃 ⟩ — la fado kaj la vidlimo de la
    // herbo mezuriĝas de la okulo, ne de la vidpunkto de la mapo ( mapX/mapZ — la
    // orbita celo ). Kun la celo la gazono malgrandiĝis ĝuste apud la fotilo kaj
    // pleniĝis nur ĉirkaŭ la punkto, kiun oni rigardas, do ju pli oni zumis
    // proksimen, des malpli da herbo restis videbla — tio estis la eraro.
    if ( ludanto.rezimo !== "interior" ) {
      const fotilaX = fotilo.position.x, fotilaZ = fotilo.position.z;
      gxisdatigiHerbon(t, fotilaX, fotilaZ, kolektiHerbajnPusantojn(fotilaX, fotilaZ));
    }
    // La bakita mapo desegniĝas ĉiukadre — nur 2D-tavoloj, neniu sceno-submeto.
    // La RADARO malakrigiĝas al ~0o7 fojojn en He ( ĉiu 4-a kadro ) — la 2D-tavoloj
    // estas malmultekostaj sed nenij bezonas 0o34 kadrojn en He ( la radara nadlo
    // kaj la punktoj moviĝas malrapide; la plena mapo restas ĉiukadre por flua
    // pan/zoom ).
    if ( minimapo.cxuBakita() ) {
      if ( minimapo.cxuMalfermita() ) {
        minimapo.desegniPlenanMapon();
      } else if ( sxargxaElemento.classList.contains("finita") ) {
        radaraKadro = ( radaraKadro + 1 ) & 3;
        if ( radaraKadro === 0 ) minimapo.desegniRadaron();
      }
    }

    // WASD orbita movado; Q/E por vertikala movo
    if ( ludanto.rezimo === "orbit" ) {
      const panX = ( klavoj.KeyD ? 1 : 0 ) - ( klavoj.KeyA ? 1 : 0 );
      const panZ = ( klavoj.KeyS ? 1 : 0 ) - ( klavoj.KeyW ? 1 : 0 );
      const panY = ( klavoj.KeyE ? 1 : 0 ) - ( klavoj.KeyQ ? 1 : 0 );
      if ( panX || panZ || panY ) {
        const fotilaDir = ORBITA_DIR;
        fotilo.getWorldDirection(fotilaDir);
        fotilaDir.y = 0; fotilaDir.normalize();
        const side = ORBITA_FLANKO.crossVectors(fotilaDir, ORBITA_SUPRE).normalize();
        const rapido = 0o40 * deltaTempo;
        // Nuligi la skriban vektoron ĉiun kadron — alie addScaledVector amasigus
        // la antaŭajn kadrojn kaj la fotilo forflugus.
        const offset = ORBITA_OFSETA.set(0, 0, 0)
          .addScaledVector(side, panX * rapido)
          .addScaledVector(fotilaDir, -panZ * rapido);
        offset.y = panY * rapido;
        regiloj.target.add(offset);
        fotilo.position.add(offset);
      }
      regiloj.update();
    }

    // ⟪ La vidlimo 📃 ⟫ — la per-kadra distanca forigo ( vidu kantaoj/bildo/vidlimo.ts ).
    // En la interno la tuta ekstera mondo estas kaŝita de kasxiEksteron, do la
    // vidlimo ne tuŝu la videblecojn tie — alie ĝi revivigus la kaŝitajn eksterajn
    // objektojn. Alie la ĝisdatigo okazas ĉiun kadron, ĝuste antaŭ la bildigo.
    //
    // ⟨ La centro estas la FOTILO, ne la celo 📃 ⟩ — la nebulo ( FogExp2 )
    // mezuriĝas de la OKULO: la denso estas almenaŭ 0o5/0o400 ( 5/256 ), do
    // nenio videblas trans ~0o200 ( 135 ) unuoj de la fotilo, en ĉiu vetero.
    // La centro de la vidlimo antaŭe estis mapX/mapZ — en la orbito tio estas la
    // CELO, ne la fotilo. Kun la kamera distanco 0o330 ( 330 ) la tuta urbo
    // sidas pli ol 0o200 for de la okulo ( tute nebula, pure blanka ekrano )
    // sed restis desegnata ĉiukadre — dekoj da milionoj da trianguloj por
    // nenio. En la promenado la fotilo kaj la ludanto estas preskaŭ la sama
    // punkto, do tie la ŝanĝo apenaŭ videblas.
    if ( ludanto.rezimo !== "interior" ) gxisdatigiVidlimojn(fotilo.position.x, fotilo.position.z);

    bildilo.render(sceno, fotilo);
    // La diagnoza surmetaĵo legas renderer.info POST la bildigo — tie la nombroj
    // apartenas al la ĵus finita kadro.
    statistiko.gxisdatigu();
  }

  return { animacii };
}
