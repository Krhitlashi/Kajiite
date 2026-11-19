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
import { kanakaQena, kanakaQenaNovajn } from "../../eskekoj/komunajxoj/koloroj.js";
import { agordiMuzikanLokon } from "../../eskekoj/sonoj/muziko/ludilo.js";
import { aktivajUrboj } from "../tero-datumaro/rultempo.js";
import { alHe } from "../komunajxoj/unuoj.js";
import { kreiRultemon } from "../bildo/rultempo.js";
import { MALPOTENCA_APARATO } from "../bildo/scena/aparato.js";

/*តើចំណុចមួយនៅក្នុងព្រំដែនក្រុងណាមួយឬទេ ៖ ចម្ងាយ Manhattan ធៀបនឹងក្រឡាចតុកោណ
    @param x ( number ) - ទីតាំង X
    @param z ( number ) - ទីតាំង Z
@returns enUrbo ( boolean ) */
function cxuEnUrbo( x: number, z: number ): boolean {
  for ( const u of aktivajUrboj() ) {
    const pasxo = u.blokaGrando === "kvar" ? 0o40 : 0o30;
    const limo = ( u.arangxaGrando + 1 ) * pasxo + 0o20;
    if ( Math.abs(x - u.ofsX) + Math.abs(z - u.ofsZ) <= limo ) return true;
  }
  return false;
}

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

  // ⟪ កាមេរ៉ាសម្រាប់ការអភិវឌ្ឍន៍ 📃 ⟫
  // ⟨ មានតែក្នុង dev ៖ កំណត់កាមេរ៉ាត្រង់ចំណុចមួយ ដើម្បីមើលចំណែកជាក់លាក់
  // ( ឧ . ជណ្តើរចំណត ) ដោយមិនបាច់ដើរទៅទីនោះ ។ 📃 ⟩
  if ( ( import.meta as unknown as { env?: { DEV?: boolean } } ).env?.DEV === true ) {
    ( window as unknown as { __rigardi?: unknown } ).__rigardi = {
      fotilo, regiloj, ludanto,
      al( x: number, y: number, z: number, distanco = 0o30, alto = 0o20 ): void {
        ludanto.rezimo = "orbito";
        ludanto.pozicio.set(x, y, z);
        regiloj.target.set(x, y, z);
        fotilo.position.set(x + distanco, y + alto, z + distanco);
        regiloj.update();
      },
    };
  }

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
  // ⟨ ការភ្ជាប់ទៅឯកសារ ៖ ធាតុរង្វាស់ពេលលែងរាប់ពេលថេបលាក់ 📃 ⟩
  horlogxo.connect(document);
  let haltigita = false;
  let kadraGeneracio = 0;
  let radaraKadro = 0;
  let ombraKadro = 0;
  const rultempo = kreiRultemon({ malmultekosta: MALPOTENCA_APARATO });
  const ORBITA_DIR = new THREE.Vector3();
  const ORBITA_FLANKO = new THREE.Vector3();
  const ORBITA_SUPRE = new THREE.Vector3(0, 1, 0);
  const ORBITA_OFSETA = new THREE.Vector3();

  // ⟨ ទំហំអេក្រង់ និង ដង់ស៊ីតេភីកសែល អានតែពេលប្តូរ មិនអានរាល់ហ្វ្រេម 📃 ⟩
  let ekranaLargxo = innerWidth, ekranaAlto = innerHeight, aparataRatio = devicePixelRatio;
  const gxisdatigiEkranon = (): void => {
    ekranaLargxo = innerWidth; ekranaAlto = innerHeight; aparataRatio = devicePixelRatio;
  };
  window.addEventListener("resize", gxisdatigiEkranon);
  // ⟨ ស្លាក បញ្ចប់ ត្រូវបានបន្ថែមម្តង ហើយមិនដកចេញ ។ អ្នកសង្កេតជំនួស
  //   classList.contains រាល់ហ្វ្រេម ។ 📃 ⟩
  let sxargxoFinita = sxargxaElemento.classList.contains("finita");
  new MutationObserver(() => {
    sxargxoFinita = sxargxaElemento.classList.contains("finita");
  }).observe(sxargxaElemento, { attributes: true, attributeFilter: [ "class" ] });

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

  // ⟪ រង្វិលជុំ និងការត្រឡប់មកវិញ 📃 ⟫
  // ⟨ ថេបដែលលាក់មិនគូររូប ។ ទូរស័ព្ទអាចបោះបង់កុងតឺន័រ WebGL ពេលចាកចេញ ,
  // ហើយការត្រឡប់មកវិញត្រូវចាប់ផ្តើមរង្វិលជុំឡើងវិញ ដើម្បីកុំឱ្យអេក្រង់នៅទទេ ។ 📃 ⟩
  /*បញ្ឈប់រង្វិលជុំ ៖ ហៅពេលថេបលាក់ ឬកុងតឺន័រ WebGL បាត់បង់ */
  function halti(): void {
    haltigita = true;
    kadraGeneracio++;
  }

  /*ចាប់ផ្តើមរង្វិលជុំឡើងវិញ ៖ ហៅពេលថេបមកវិញ ឬកុងតឺន័រ WebGL ត្រឡប់មកវិញ */
  function restarti(): void {
    if ( document.hidden ) return;
    haltigita = false;
    horlogxo.reset();
    rultempo.restarigi();
    animacii();
  }

  function animacii(): void {
    if ( document.hidden ) { halti(); return; }
    rultempo.agordiFokuson(document.hasFocus());
    // ⟨ លេខជំនាន់ ៖ រង្វិលជុំចាស់ឈប់ខ្លួនឯង ពេលមានរង្វិលជុំថ្មី 📃 ⟩
    const mia = ++kadraGeneracio;
    const kadro = ( nun: number ): void => {
      if ( haltigita || mia !== kadraGeneracio ) return;
      requestAnimationFrame(kadro);
      // ⟨ ស៊ុមដែលមិនដល់ពេលមិនធ្វើបច្ចុប្បន្នភាព ឬ គូរទេ ។ 📃 ⟩
      if ( rultempo.bildigu(alHe(nun)) ) bildigi();
    };
    requestAnimationFrame(kadro);
  }

  document.addEventListener("visibilitychange", () => {
    if ( document.hidden ) { halti(); return; }
    // ⟨ រក្សាកម្រិតដែលរៀនរួច ដើម្បីកុំគូរធំភ្លាមពេលត្រឡប់មកវិញ ។ 📃 ⟩
    gxisdatigiEkranon();
    restarti();
  });
  window.addEventListener("blur", () => rultempo.agordiFokuson(false));
  window.addEventListener("focus", () => rultempo.agordiFokuson(true));
  window.addEventListener("pagehide", halti);
  window.addEventListener("pageshow", restarti);
  // ⟨ កុងតឺន័រ WebGL បាត់បង់ និងត្រឡប់មកវិញ 📃 ⟩
  kanvaso.addEventListener("webglcontextlost", ( e ) => {
    e.preventDefault();
    // ⟨ កុំចូលផ្លូវដែលធ្វើឱ្យ context បាត់ម្តងទៀត 📃 ⟩
    bildilo.shadowMap.enabled = false;
    aparataRatio = Math.min(aparataRatio, 0o1);
    halti();
  });
  kanvaso.addEventListener("webglcontextrestored", () => {
    // ⟨ ខ្លួនរបស់ three ផ្ទុកវាយនភាពឡើងវិញពីក្រណាត់ដើមដែលនៅរក្សាពិកសែល ។
    //   មិនគូរឡើងវិញទេ ព្រោះអ្នកគូរខ្លះប្រើចៃដន្យ ហើយរូបភាពត្រូវនៅដដែល ។ 📃 ⟩
    horlogxo.reset();
    restarti();
  });

  let kanakaKadroNombro = 0;
  let muzikaLokoT = 0;
  // ⟨ រយៈពេលបោសពេញនៅដដែល តែហ្វ្រេមផ្សេងៗលែងឆ្លងកាត់ឆាក ។ 📃 ⟩
  const KANAKA_PLENA_PERIODO = 0o14 * 0o20;
  function bildigi(): void {
    horlogxo.update();
    const krudaDt = horlogxo.getDelta();
    const deltaTempo = Math.min(krudaDt, 0o3/0o100);
    const t = horlogxo.getElapsed();

    const w = ekranaLargxo, h = ekranaAlto;
    const aktivaRatio = Math.min(aparataRatio, maksimumaRatio) * rultempo.skalo;
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
    // ⟨ តន្ត្រីតាមតំបន់ ៖ ពិនិត្យក្រុងរាល់ពាក់កណ្តាលវិនាទី 📃 ⟩
    if ( t - muzikaLokoT > 0o1/0o2 ) {
      muzikaLokoT = t;
      agordiMuzikanLokon(cxuEnUrbo(ludanto.pozicio.x, ludanto.pozicio.z));
    }

    for ( const n of npcoj ) { if ( n.group.visible ) gxisdatigiNpc(n, deltaTempo, t, alteco, piedoj.kolizioj.vojaSuproY); }

    // ⟨ ការប៉ះទង្គិចជាមួយរូបមានជីវិត 📃 ⟩
    if ( ludanto.rezimo === "promeno" && !ludanto.surKanoto ) {
      // ⟨ ពិនិត្យចម្ងាយការេមុន ទើបយកឫស ។ រូបភាគច្រើននៅឆ្ងាយ ហើយ
      //   Math.hypot លើគ្រប់រូបរាល់ហ្វ្រេមជាការខ្ជះខ្ជាយ ។ លទ្ធផលដដែល ។ 📃 ⟩
      const NPC_MIN2 = ( 0o7/0o10 ) * ( 0o7/0o10 );
      const BESTA_MIN2 = ( 0o5/0o10 ) * ( 0o5/0o10 );
      const MINIMA2 = ( 0o1/0o20000 ) * ( 0o1/0o20000 );
      for ( const n of npcoj ) {
        if ( !n.group.visible ) continue;
        const difX = ludanto.pozicio.x - n.group.position.x;
        const difZ = ludanto.pozicio.z - n.group.position.z;
        const d2 = difX * difX + difZ * difZ;
        if ( d2 >= NPC_MIN2 || d2 <= MINIMA2 ) continue;
        const d = Math.sqrt(d2);
        const pen = ( 0o7/0o10 - d ) * 0o1/0o2 / d;
        ludanto.pozicio.x += difX * pen;
        ludanto.pozicio.z += difZ * pen;
        n.group.position.x -= difX * pen;
        n.group.position.z -= difZ * pen;
      }
      for ( const b of bestoj.bestoj ) {
        if ( !b.grupo.visible ) continue;
        const difX = ludanto.pozicio.x - b.grupo.position.x;
        const difZ = ludanto.pozicio.z - b.grupo.position.z;
        const d2 = difX * difX + difZ * difZ;
        if ( d2 >= BESTA_MIN2 || d2 <= MINIMA2 ) continue;
        const d = Math.sqrt(d2);
        const pen = ( 0o5/0o10 - d ) / d;
        ludanto.pozicio.x += difX * pen;
        ludanto.pozicio.z += difZ * pen;
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
    // ⟨ ពេលឈរស្ងៀម ៖ គ្មានអ្នកណាបំលាស់ទីក្រៅពីពួកអ្នកដើរតាមផ្លូវ ។ ដូច្នេះ
    // ផែនទីស្រមោល ( ដែលជាការគូរធរណីមាត្រម្តងទៀត ) មិនចាំបាច់គូររៀងរាល់ពីរស៊ុមទេ ។
    // ស្រមោលរបស់អ្នកដើរតាមផ្លូវគ្រាន់តែយឺតបន្តិច ។ 📃 ⟩
    const movigxanta = ludanto.movoValoro > 0o1/0o100;
    const ombraPeriodo = movigxanta ? ( deltaTempo > 0o1/0o40 ? 0o4 : 0o2 ) : 0o6;
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
      } else if ( sxargxoFinita ) {
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

    // ⟪ ពណ៌ KNAKEHE ជានិច្ច 🎨 ⟫
    // ⟨ វត្ថុថ្មីបង្គត់ភ្លាម ពេលវាចូលឆាក ដោយមិនឆ្លងកាត់ឆាកទាំងមូល ។
    //   បោសពេញនៅរយៈពេលដើមដដែល ដើម្បីចាប់ពណ៌ដែលប្រែក្រោយមក ។ 📃 ⟩
    kanakaQenaNovajn(sceno);
    if ( ++kanakaKadroNombro % KANAKA_PLENA_PERIODO === 0 ) kanakaQena(sceno, true);

    bildilo.render(sceno, fotilo);
    statistiko.gxisdatigu(rultempo);
  }

  return { animacii };
}
