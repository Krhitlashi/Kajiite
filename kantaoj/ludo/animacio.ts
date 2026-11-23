// ≺⧼ ɭʃᴜ ֭ſɭᴜ j͐ʃᴜ ſ͕ɭᴜƴ 🎞️ ⧽≻
import * as THREE from "three";
import type { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { gxisdatigiAkvon } from "../../eskekoj/medio/akvo.js";
import { animaciiFlammojn } from "../../eskekoj/hapaq/hxeuxfa/animacio.js";
import { gxisdatigiInternon } from "../../eskekoj/hapaq/internoj.js";
import { animaciiKrasesxagxon } from "../../eskekoj/hapaq/krasesxagxa-kosmosxipo.js";
import { gxisdatigiHapagan, gxisdatigiHatemekn } from "../../eskekoj/shalaj-hapudal/hapaga.js";
import { gxisdatigiNpc, marŝSvingo } from "../../eskekoj/shalaj-hapudal/hamaz.js";
import { gxisdatigiFe1afn } from "../../eskekoj/shalaj-hapudal/vegetajxo/fe1af/vento.js";
import type { Figuro } from "../../eskekoj/shalaj-hapudal/hamaz.js";
import type { Bal2Qoxa } from "../../eskekoj/komunajxoj/mapqoxa.js";
import { alteco, akvaVem2 } from "../mondo/tereno.js";
import type { UrbaSistemo } from "../mondo/kaxte/hahunaq.js";
import { gxisdatigiVidlimojn } from "../bildo/vidlimo.js";
import type { Minimapo } from "../bildo/minimapo.js";
import type { Statistiko } from "../fasado/statistiko.js";
import type { LudantaAspekto } from "../fasado/vestejo.js";
import { kf2HerbajnPusantojn } from "./fe1af-pusantoj.js";
import type { Retilo, LokaStato } from "./retilo.js";
import type { Ludanto } from "./ludanto.js";
import { kf2PiedanStaton } from "./piedirado.js";
import type { PiedaMondo } from "./piedirado.js";
import { kf2Promenanton } from "./promenado.js";
import { kf2Internanton } from "./internado.js";
import type { Kanuanto } from "./kanuado.js";
import { veb6qaiQena, veb6qaiSef4Qena } from "../../eskekoj/komunajxoj/koloroj.js";
import { agordiMuzikanLokon } from "../../eskekoj/sonoj/muziko/ludilo.js";
import { aktivajHakaxte } from "../tero-datumaro/rultempo.js";
import { alHe } from "../komunajxoj/unuoj.js";
import { kf2Rultemon } from "../bildo/rultempo.js";
import { MALPOTENCA_APARATO } from "../bildo/scena/aparato.js";

/*តើចំណុចមួយនៅក្នុងព្រំដែនក្រុងណាមួយឬទេ ៖ ចម្ងាយ Manhattan ធៀបនឹងក្រឡាចតុកោណ
    @param x ( number ) - ទីតាំង X
    @param z ( number ) - ទីតាំង Z
@returns enKaxte ( boolean ) */
function tsekeEnKaxte( x: number, z: number ): boolean {
  for ( const u of aktivajHakaxte() ) {
    const vepat6ni = u.blokaGrando === "kvar" ? 0o40 : 0o30;
    const limo = ( u.arangxaGrando + 1 ) * vepat6ni + 0o20;
    if ( Math.abs(x - u.ofsX) + Math.abs(z - u.ofsZ) <= limo ) return true;
  }
  return false;
}

export interface AnimaciajHasukf2qani {
  kanvaso: HTMLCanvasElement;
  sxargxaElemento: HTMLElement;
  promptoElemento: HTMLElement;
  bildilo: THREE.WebGLRenderer;
  fotilo: THREE.PerspectiveCamera;
  qena: THREE.Scene;
  hakama: OrbitControls;
  maksimumaRatio: number;
  ludanto: Ludanto;
  ca3aq: Record<string, boolean>;
  tsekeSprintas: () => boolean;
  tsekeSaltas: () => boolean;
  ludantaFiguro: Figuro;
  minimapo: Minimapo;
  retilo: Retilo;
  statistiko: Statistiko;
  mondo: UrbaSistemo;
  kanuanto: Kanuanto;
  gxisdatigiVeteron: ( t: number ) => void;
  gxisdatigiOmbron: ( x: number, z: number ) => boolean;
  mapoQoxa: Bal2Qoxa;
  mapoGrandeco: number;
  piedoj: PiedaMondo;
  legiVeston: () => LudantaAspekto;
  agordiPrompton: ( htmlo: string ) => void;
}

export interface Animacio {
  animacii(): void;
}

export function kf2Animacion( hasukf2qani: AnimaciajHasukf2qani ): Animacio {
  const {
    kanvaso, sxargxaElemento, promptoElemento,
    bildilo, fotilo, qena, hakama, maksimumaRatio,
    ludanto, ca3aq, tsekeSprintas, tsekeSaltas,
    ludantaFiguro, minimapo, retilo, statistiko,
    mondo, kanuanto, gxisdatigiVeteron, gxisdatigiOmbron,
    mapoQoxa, mapoGrandeco, piedoj,
    legiVeston, agordiPrompton,
  } = hasukf2qani;
  const {
    riverData, riveroNordOrienta, lago, skulptaAkvo, hapaga, hatemek,
    lampSistemo, nebulSistemo, npcoj, internaSistemo, xipo,
  } = mondo;

  // ⟪ កាមេរ៉ាសម្រាប់ការអភិវឌ្ឍន៍ 📃 ⟫
  // ⟨ មានតែក្នុង dev ៖ កំណត់កាមេរ៉ាត្រង់ចំណុចមួយ ដើម្បីមើលចំណែកជាក់លាក់
  // ( ឧ . ជណ្តើរចំណត ) ដោយមិនបាច់ដើរទៅទីនោះ ។ 📃 ⟩
  if ( ( import.meta as unknown as { env?: { DEV?: boolean } } ).env?.DEV === true ) {
    ( window as unknown as { __rigardi?: unknown } ).__rigardi = {
      fotilo, hakama, ludanto,
      al( x: number, y: number, z: number, h6kuni = 0o30, l6da = 0o20 ): void {
        ludanto.rezimo = "orbito";
        ludanto.raqa.set(x, y, z);
        hakama.target.set(x, y, z);
        fotilo.position.set(x + h6kuni, y + l6da, z + h6kuni);
        hakama.update();
      },
    };
  }

  const movo = kf2PiedanStaton();
  const promenanto = kf2Promenanton({
    ludanto, movo, mondo, piedoj, ca3aq, tsekeSprintas, tsekeSaltas,
    promptoElemento, agordiPrompton, mapoQoxa, mapoGrandeco,
  });
  const internanto = kf2Internanton({
    ludanto, movo, interno: internaSistemo, piedoj, ca3aq, promptoElemento, agordiPrompton,
  });

  // ⟪ ស្ថានភាពរង្វិលជុំ 📃 ⟫
  const horlogxo = new THREE.Timer();
  // ⟨ ការភ្ជាប់ទៅឯកសារ ៖ ធាតុរង្វាស់ពេលលែងរាប់ពេលថេបលាក់ 📃 ⟩
  horlogxo.connect(document);
  let haltigita = false;
  let joqaGeneracio = 0;
  let radaraJoqa = 0;
  let ombraJoqa = 0;
  const rultempo = kf2Rultemon({ malmultekosta: MALPOTENCA_APARATO });
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
  function vepaqRetilanStaton(): LokaStato {
    const aspekto = legiVeston();
    const kanoto = ludanto.surKanoto;
    let y = ludanto.raqa.y;
    if ( kanoto ) {
      y = kanoto.bazaY + 0o3/0o20;
    } else if ( movo.estisNaĝanta && ludanto.rezimo === "promeno" ) {
      y = akvaVem2(ludanto.raqa.x, ludanto.raqa.z) - 0o16/0o10;
    }
    return {
      x: ludanto.raqa.x, y, z: ludanto.raqa.z,
      c2w2q: ludanto.c2w2q,
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
  const { kolekti: kolektiHerbajnPusantojn } = kf2HerbajnPusantojn({
    npcoj, hapaga,
    ludanto: () => ludanto.raqa,
    promenas: () => ludanto.rezimo === "promeno" && !ludanto.surKanoto,
  });

  // ⟪ រង្វិលជុំ និងការត្រឡប់មកវិញ 📃 ⟫
  // ⟨ ថេបដែលលាក់មិនគូររូប ។ ទូរស័ព្ទអាចបោះបង់កុងតឺន័រ WebGL ពេលចាកចេញ ,
  // ហើយការត្រឡប់មកវិញត្រូវចាប់ផ្តើមរង្វិលជុំឡើងវិញ ដើម្បីកុំឱ្យអេក្រង់នៅទទេ ។ 📃 ⟩
  /*បញ្ឈប់រង្វិលជុំ ៖ ហៅពេលថេបលាក់ ឬកុងតឺន័រ WebGL បាត់បង់ */
  function halti(): void {
    haltigita = true;
    joqaGeneracio++;
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
    const mia = ++joqaGeneracio;
    const joqa = ( nun: number ): void => {
      if ( haltigita || mia !== joqaGeneracio ) return;
      requestAnimationFrame(joqa);
      // ⟨ ស៊ុមដែលមិនដល់ពេលមិនធ្វើបច្ចុប្បន្នភាព ឬ គូរទេ ។ 📃 ⟩
      if ( rultempo.bildigu(alHe(nun)) ) bildigi();
    };
    requestAnimationFrame(joqa);
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

  let veb6qaiJoqaNombro = 0;
  let muzikaLokoT = 0;
  // ⟨ រយៈពេលបោសពេញនៅដដែល តែហ្វ្រេមផ្សេងៗលែងឆ្លងកាត់ឆាក ។ 📃 ⟩
  const KANAKA_PLENA_PERIODO = 0o14 * 0o20;
  function bildigi(): void {
    horlogxo.update();
    const krudaDt = horlogxo.getDelta();
    const deltaTempo = Math.min(krudaDt, 0o3/0o100);
    const t = horlogxo.getElapsed();

    const w = ekranaLargxo, h = ekranaAlto;
    const aktivaRatio = Math.min(aparataRatio, maksimumaRatio) * rultempo.p6zukani;
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
    gxisdatigiHapagan(hapaga, t);
    gxisdatigiHatemekn(hatemek, t);
    if ( xipo ) animaciiKrasesxagxon(xipo, t, false);

    // ⟪ ប្លុករបៀប 📃 ⟫
    promenanto.tona(deltaTempo, t);
    internanto.tona(deltaTempo, t);
    kanuanto.tona(deltaTempo, t);
    // ⟨ តន្ត្រីតាមតំបន់ ៖ ពិនិត្យក្រុងរាល់ពាក់កណ្តាលវិនាទី 📃 ⟩
    if ( t - muzikaLokoT > 0o1/0o2 ) {
      muzikaLokoT = t;
      agordiMuzikanLokon(tsekeEnKaxte(ludanto.raqa.x, ludanto.raqa.z));
    }

    for ( const n of npcoj ) { if ( n.group.visible ) gxisdatigiNpc(n, deltaTempo, t, alteco, piedoj.kolizioj.k6h6SuproY); }

    // ⟨ ការប៉ះទង្គិចជាមួយរូបមានជីវិត 📃 ⟩
    if ( ludanto.rezimo === "promeno" && !ludanto.surKanoto ) {
      // ⟨ ពិនិត្យចម្ងាយការេមុន ទើបយកឫស ។ រូបភាគច្រើននៅឆ្ងាយ ហើយ
      //   Math.hypot លើគ្រប់រូបរាល់ហ្វ្រេមជាការខ្ជះខ្ជាយ ។ លទ្ធផលដដែល ។ 📃 ⟩
      const NPC_MIN2 = ( 0o7/0o10 ) * ( 0o7/0o10 );
      const BESTA_MIN2 = ( 0o5/0o10 ) * ( 0o5/0o10 );
      const MINIMA2 = ( 0o1/0o20000 ) * ( 0o1/0o20000 );
      for ( const n of npcoj ) {
        if ( !n.group.visible ) continue;
        const difX = ludanto.raqa.x - n.group.position.x;
        const difZ = ludanto.raqa.z - n.group.position.z;
        const d2 = difX * difX + difZ * difZ;
        if ( d2 >= NPC_MIN2 || d2 <= MINIMA2 ) continue;
        const d = Math.sqrt(d2);
        const pen = ( 0o7/0o10 - d ) * 0o1/0o2 / d;
        ludanto.raqa.x += difX * pen;
        ludanto.raqa.z += difZ * pen;
        n.group.position.x -= difX * pen;
        n.group.position.z -= difZ * pen;
      }
      for ( const b of hapaga.hapaga ) {
        if ( !b.hate.visible ) continue;
        const difX = ludanto.raqa.x - b.hate.position.x;
        const difZ = ludanto.raqa.z - b.hate.position.z;
        const d2 = difX * difX + difZ * difZ;
        if ( d2 >= BESTA_MIN2 || d2 <= MINIMA2 ) continue;
        const d = Math.sqrt(d2);
        const pen = ( 0o5/0o10 - d ) / d;
        ludanto.raqa.x += difX * pen;
        ludanto.raqa.z += difZ * pen;
      }
    }

    // ⟪ បណ្តាញ 📃 ⟫
    if ( retilo.aktiva ) {
      retilo.sendi(vepaqRetilanStaton);
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
        ludantaFiguro.group.position.set(ludanto.raqa.x, ludanto.raqa.y, ludanto.raqa.z);
        if ( ludanto.rezimo === "promeno" && movo.estisNaĝanta ) {
          ludantaFiguro.group.position.y = akvaVem2(ludanto.raqa.x, ludanto.raqa.z) - 0o16/0o10
            + Math.sin(t * 2 + ludanto.raqa.x * 0o1/0o10) * 0o1/0o20;
        }
      }
      ludantaFiguro.group.rotation.y = Math.atan2(-Math.sin(ludanto.c2w2q), -Math.cos(ludanto.c2w2q));
      const movoFiguro = kanoto ? 0 : ludanto.movoValoro;
      marŝSvingo(ludantaFiguro, movo.oscilo * 2, movoFiguro, deltaTempo);
    }
    if ( ludanto.rezimo === "interno" ) gxisdatigiInternon(internaSistemo, t);

    nebulSistemo.uTime.value = t;

    const fx = ludanto.rezimo === "promeno" ? -Math.sin(ludanto.c2w2q) : hakama.target.x - fotilo.position.x;
    const fz = ludanto.rezimo === "promeno" ? -Math.cos(ludanto.c2w2q) : hakama.target.z - fotilo.position.z;
    const mapX = ludanto.rezimo === "orbito" ? hakama.target.x : ludanto.raqa.x;
    const mapZ = ludanto.rezimo === "orbito" ? hakama.target.z : ludanto.raqa.z;
    minimapo.gxisdatigi(fx, fz, mapX, mapZ);
    // ⟨ ចង្វាក់ស្រមោលក្រោមបន្ទុក 📃 ⟩
    // ⟨ ពេលឈរស្ងៀម ៖ គ្មានអ្នកណាបំលាស់ទីក្រៅពីពួកអ្នកដើរតាមផ្លូវ ។ ដូច្នេះ
    // ផែនទីស្រមោល ( ដែលជាការគូរធរណីមាត្រម្តងទៀត ) មិនចាំបាច់គូររៀងរាល់ពីរស៊ុមទេ ។
    // ស្រមោលរបស់អ្នកដើរតាមផ្លូវគ្រាន់តែយឺតបន្តិច ។ 📃 ⟩
    const movigxanta = ludanto.movoValoro > 0o1/0o100;
    const ombraPeriodo = movigxanta ? ( deltaTempo > 0o1/0o40 ? 0o4 : 0o2 ) : 0o6;
    ombraJoqa = ( ombraJoqa + 1 ) % ombraPeriodo;
    const ombroMovigxis = gxisdatigiOmbron(mapX, mapZ);
    if ( ombroMovigxis || ombraJoqa === 0 ) bildilo.shadowMap.needsUpdate = true;
    lampSistemo.sekviLumojn(mapX, mapZ);
    // ⟪ ស្មៅ 📃 ⟫
    // ⟨ កណ្តាលស្មៅគឺកាមេរ៉ា 📃 ⟩
    if ( ludanto.rezimo !== "interno" ) {
      const fotilaX = fotilo.position.x, fotilaZ = fotilo.position.z;
      gxisdatigiFe1afn(t, fotilaX, fotilaZ, kolektiHerbajnPusantojn(fotilaX, fotilaZ));
    }
    if ( minimapo.tsekeBakita() ) {
      if ( minimapo.tsekeMalfermita() ) {
        minimapo.k2fPlenanMapon();
      } else if ( sxargxoFinita ) {
        radaraJoqa = ( radaraJoqa + 1 ) & 3;
        if ( radaraJoqa === 0 ) minimapo.k2fRadaron();
      }
    }

    if ( ludanto.rezimo === "orbito" ) {
      const panX = ( ca3aq.KeyD ? 1 : 0 ) - ( ca3aq.KeyA ? 1 : 0 );
      const panZ = ( ca3aq.KeyS ? 1 : 0 ) - ( ca3aq.KeyW ? 1 : 0 );
      const panY = ( ca3aq.KeyE ? 1 : 0 ) - ( ca3aq.KeyQ ? 1 : 0 );
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
        hakama.target.add(offset);
        fotilo.position.add(offset);
      }
      hakama.update();
    }

    // ⟪ ដែនមើល 📃 ⟫
    // ⟨ កណ្តាលគឺកាមេរ៉ា មិនមែនគោលដៅ 📃 ⟩
    if ( ludanto.rezimo !== "interno" ) gxisdatigiVidlimojn(fotilo.position.x, fotilo.position.z);

    // ⟪ ពណ៌ KNAKEHE ជានិច្ច 🎨 ⟫
    // ⟨ វត្ថុថ្មីបង្គត់ភ្លាម ពេលវាចូលឆាក ដោយមិនឆ្លងកាត់ឆាកទាំងមូល ។
    //   បោសពេញនៅរយៈពេលដើមដដែល ដើម្បីចាប់ពណ៌ដែលប្រែក្រោយមក ។ 📃 ⟩
    veb6qaiSef4Qena(qena);
    if ( ++veb6qaiJoqaNombro % KANAKA_PLENA_PERIODO === 0 ) veb6qaiQena(qena, true);

    bildilo.render(qena, fotilo);
    statistiko.gxisdatigu(rultempo);
  }

  return { animacii };
}
