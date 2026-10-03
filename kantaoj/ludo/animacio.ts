// ≺⧼ ចលនា 🎞️ ⧽≻
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

  const movo = kreiPiedanStaton();
  const promenanto = kreiPromenanton({
    ludanto, movo, mondo, piedoj, klavoj, cxuSprintas, cxuSaltas,
    promptoElemento, agordiPrompton, mapoFormo, mapoGrandeco,
  });
  const internanto = kreiInternanton({
    ludanto, movo, interno: internaSistemo, piedoj, klavoj, promptoElemento, agordiPrompton,
  });

  // ⟪ ស្ថានភាពរង្វិលជុំ 📃 ⟫
  const horlogxo = new THREE.Timer();
  let radaraKadro = 0;
  let ombraKadro = 0;
  let dinamikaSkalo = 1;
  let malrapidajKadroj = 0, rapidajKadroj = 0;
  const ORBITA_DIR = new THREE.Vector3();
  const ORBITA_FLANKO = new THREE.Vector3();
  const ORBITA_SUPRE = new THREE.Vector3(0, 1, 0);
  const ORBITA_OFSETA = new THREE.Vector3();

  // ⟪ ស្ថានភាពបណ្តាញ 📃 ⟫
  function konstruiRetilanStaton(): LokaStato {
    const aspekto = legiVeston();
    const kanoto = ludanto.surKanoto;
    let y = ludanto.pozicio.y;
    if ( kanoto ) {
      y = kanoto.bazaY + 0o3/0o20;
    } else if ( movo.estisNaĝanta && ludanto.rezimo === "promeno" ) {
      y = akvaNivelo(ludanto.pozicio.x, ludanto.pozicio.z) - 0o16/0o10;
    }
    return {
      x: ludanto.pozicio.x, y, z: ludanto.pozicio.z,
      direkto: ludanto.direkto,
      movo: ludanto.rezimo === "promeno" || ludanto.rezimo === "interno" ? ludanto.movoValoro : 0,
      naĝas: movo.estisNaĝanta,
      surKanuo: kanoto !== null,
      interno: ludanto.rezimo === "interno" && ludanto.elektitaSpec ? `${Math.round(ludanto.elektitaSpec.x)}|${Math.round(ludanto.elektitaSpec.z)}` : "",
      reĝimo: ludanto.rezimo,
      vesto: aspekto.vestoIdx,
      haro: aspekto.harStiloIdx,
      harKoloro: aspekto.harKoloroIdx,
    };
  }

  // ⟪ អ្នករុញស្មៅ 📃 ⟫
  const { kolekti: kolektiHerbajnPusantojn } = kreiHerbajnPusantojn({
    npcoj, bestoj,
    ludanto: () => ludanto.pozicio,
    promenas: () => ludanto.rezimo === "promeno" && !ludanto.surKanoto,
  });

  function animacii() {
    requestAnimationFrame(animacii);
    horlogxo.update();
    const krudaDt = horlogxo.getDelta();
    const deltaTempo = Math.min(krudaDt, 0o3/0o100);
    const t = horlogxo.getElapsed();

    const w = innerWidth, h = innerHeight;
    if ( krudaDt > 1 / 0o60 ) { malrapidajKadroj++; rapidajKadroj = 0; }
    else if ( krudaDt < 1 / 0o70 ) { rapidajKadroj++; malrapidajKadroj = 0; }
    // ⟨ ភាពឆ្លើយតប 📃 ⟩
    if ( malrapidajKadroj >= 0o14 && dinamikaSkalo > 0o6/0o10 ) { dinamikaSkalo = Math.max(0o6/0o10, dinamikaSkalo - 0o2/0o10); malrapidajKadroj = 0; }
    else if ( rapidajKadroj >= 0o130 && dinamikaSkalo < 1 ) { dinamikaSkalo = Math.min(1, dinamikaSkalo + 0o1/0o10); rapidajKadroj = 0; }
    const aktivaRatio = Math.min(devicePixelRatio, maksimumaRatio) * dinamikaSkalo;
    if ( kanvaso.width !== Math.floor(w * aktivaRatio) || kanvaso.height !== Math.floor(h * aktivaRatio) ) {
      fotilo.aspect = w / h; fotilo.updateProjectionMatrix();
      bildilo.setPixelRatio(aktivaRatio);
      bildilo.setSize(w, h);
    }

    gxisdatigiVeteron(t);
    animaciiFlammojn(lampSistemo, t);
    if ( riverData ) gxisdatigiAkvon(riverData, t);
    if ( riveroNordOrienta ) gxisdatigiAkvon(riveroNordOrienta, t);
    if ( lago ) gxisdatigiAkvon(lago, t);
    if ( skulptaAkvo ) gxisdatigiAkvon(skulptaAkvo, t);
    gxisdatigiBestojn(bestoj, t);
    gxisdatigiPetrelojn(petreloj, t);
    if ( xipo ) animaciiKrasesxagxon(xipo, t, false);

    // ⟪ ប្លុករបៀប 📃 ⟫
    promenanto.paŝi(deltaTempo, t);
    internanto.paŝi(deltaTempo, t);
    kanuanto.paŝi(deltaTempo, t);

    for ( const n of npcoj ) { if ( n.group.visible ) gxisdatigiNpc(n, deltaTempo, t, alteco, piedoj.kolizioj.vojaSuproY); }

    // ⟨ ការប៉ះទង្គិចជាមួយរូបមានជីវិត 📃 ⟩
    if ( ludanto.rezimo === "promeno" && !ludanto.surKanoto ) {
      for ( const n of npcoj ) {
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

    // ⟪ បណ្តាញ 📃 ⟫
    if ( retilo.aktiva ) {
      retilo.sendi(konstruiRetilanStaton);
      retilo.animacii(deltaTempo, t);
    }

    // ⟪ រូបអ្នកលេង , មុំទីបី 📃 ⟫
    ludanto.kameraDistanco += ( ludanto.celDistanco - ludanto.kameraDistanco ) * Math.min(1, deltaTempo * 0o10);
    if ( ludanto.celDistanco < 0o1/0o20 ) ludanto.kameraDistanco = 0;
    const vidasFiguron = ludanto.kameraDistanco > 0o1/0o20 && ( ludanto.rezimo === "promeno" || ludanto.rezimo === "interno" );
    ludantaFiguro.group.visible = vidasFiguron;
    if ( vidasFiguron ) {
      const kanoto = ludanto.surKanoto;
      if ( kanoto ) {
        ludantaFiguro.group.position.set(kanoto.x, kanoto.bazaY + 0o3/0o20, kanoto.z);
      } else {
        ludantaFiguro.group.position.set(ludanto.pozicio.x, ludanto.pozicio.y, ludanto.pozicio.z);
        if ( ludanto.rezimo === "promeno" && movo.estisNaĝanta ) {
          ludantaFiguro.group.position.y = akvaNivelo(ludanto.pozicio.x, ludanto.pozicio.z) - 0o16/0o10
            + Math.sin(t * 2 + ludanto.pozicio.x * 0o1/0o10) * 0o1/0o20;
        }
      }
      ludantaFiguro.group.rotation.y = Math.atan2(-Math.sin(ludanto.direkto), -Math.cos(ludanto.direkto));
      const movoFiguro = kanoto ? 0 : ludanto.movoValoro;
      marŝSvingo(ludantaFiguro, movo.oscilo * 2, movoFiguro, deltaTempo);
    }
    if ( ludanto.rezimo === "interno" ) gxisdatigiInternon(internaSistemo, t);

    nebulSistemo.uTime.value = t;

    const fx = ludanto.rezimo === "promeno" ? -Math.sin(ludanto.direkto) : regiloj.target.x - fotilo.position.x;
    const fz = ludanto.rezimo === "promeno" ? -Math.cos(ludanto.direkto) : regiloj.target.z - fotilo.position.z;
    const mapX = ludanto.rezimo === "orbito" ? regiloj.target.x : ludanto.pozicio.x;
    const mapZ = ludanto.rezimo === "orbito" ? regiloj.target.z : ludanto.pozicio.z;
    minimapo.gxisdatigi(fx, fz, mapX, mapZ);
    // ⟨ ចង្វាក់ស្រមោលក្រោមបន្ទុក 📃 ⟩
    const ombraPeriodo = deltaTempo > 0o1/0o40 ? 0o4 : 0o2;
    ombraKadro = ( ombraKadro + 1 ) % ombraPeriodo;
    const ombroMovigxis = gxisdatigiOmbron(mapX, mapZ);
    if ( ombroMovigxis || ombraKadro === 0 ) bildilo.shadowMap.needsUpdate = true;
    lampSistemo.sekviLumojn(mapX, mapZ);
    // ⟪ ស្មៅ 📃 ⟫
    // ⟨ កណ្តាលស្មៅគឺកាមេរ៉ា 📃 ⟩
    if ( ludanto.rezimo !== "interno" ) {
      const fotilaX = fotilo.position.x, fotilaZ = fotilo.position.z;
      gxisdatigiHerbon(t, fotilaX, fotilaZ, kolektiHerbajnPusantojn(fotilaX, fotilaZ));
    }
    if ( minimapo.cxuBakita() ) {
      if ( minimapo.cxuMalfermita() ) {
        minimapo.desegniPlenanMapon();
      } else if ( sxargxaElemento.classList.contains("finita") ) {
        radaraKadro = ( radaraKadro + 1 ) & 3;
        if ( radaraKadro === 0 ) minimapo.desegniRadaron();
      }
    }

    if ( ludanto.rezimo === "orbito" ) {
      const panX = ( klavoj.KeyD ? 1 : 0 ) - ( klavoj.KeyA ? 1 : 0 );
      const panZ = ( klavoj.KeyS ? 1 : 0 ) - ( klavoj.KeyW ? 1 : 0 );
      const panY = ( klavoj.KeyE ? 1 : 0 ) - ( klavoj.KeyQ ? 1 : 0 );
      if ( panX || panZ || panY ) {
        const fotilaDir = ORBITA_DIR;
        fotilo.getWorldDirection(fotilaDir);
        fotilaDir.y = 0; fotilaDir.normalize();
        const side = ORBITA_FLANKO.crossVectors(fotilaDir, ORBITA_SUPRE).normalize();
        const rapido = 0o40 * deltaTempo;
        const offset = ORBITA_OFSETA.set(0, 0, 0)
          .addScaledVector(side, panX * rapido)
          .addScaledVector(fotilaDir, -panZ * rapido);
        offset.y = panY * rapido;
        regiloj.target.add(offset);
        fotilo.position.add(offset);
      }
      regiloj.update();
    }

    // ⟪ ដែនមើល 📃 ⟫
    // ⟨ កណ្តាលគឺកាមេរ៉ា មិនមែនគោលដៅ 📃 ⟩
    if ( ludanto.rezimo !== "interno" ) gxisdatigiVidlimojn(fotilo.position.x, fotilo.position.z);

    bildilo.render(sceno, fotilo);
    statistiko.gxisdatigu();
  }

  return { animacii };
}
