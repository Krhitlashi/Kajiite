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

/* ſɭэ ſɭᴜ , j͑ʃɜ j͑ʃƨɹ , ꞙɭı ,
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

// ⟪ ſɭᴜ ſןᴜ , 📃 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı ,
// ( ꞙɭɿ , ſןɔ˞ᴜƴ ) , 📃 ⟩
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

// ⟪ ſɭэ ſɭw , 📃 ⟫
  const horlogxo = new THREE.Timer();
// ⟨ ſɭэ ᶗ‹ , ꞙɭı , 📃 ⟩
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

// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
  let ekranaLargxo = innerWidth, ekranaAlto = innerHeight, aparataRatio = devicePixelRatio;
  const gxisdatigiEkranon = (): void => {
    ekranaLargxo = innerWidth; ekranaAlto = innerHeight; aparataRatio = devicePixelRatio;
  };
  window.addEventListener("resize", gxisdatigiEkranon);
// ⟨ ſɭэ ᶗ‹ , ꞙɭц ,
//   ſɭэ ᶗ‹ , ꞙɭэ , 📃 ⟩
  let sxargxoFinita = sxargxaElemento.classList.contains("finita");
  new MutationObserver(() => {
    sxargxoFinita = sxargxaElemento.classList.contains("finita");
  }).observe(sxargxaElemento, { attributes: true, attributeFilter: [ "class" ] });

// ⟪ ſɭᴜ ſןᴜ , 📃 ⟫
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

// ⟪ ſɭэ ſɭw , 📃 ⟫
  const { kolekti: kolektiHerbajnPusantojn } = kf2HerbajnPusantojn({
    npcoj, hapaga,
    ludanto: () => ludanto.raqa,
    promenas: () => ludanto.rezimo === "promeno" && !ludanto.surKanoto,
  });

// ⟪ ſɭэ ſɭw , ꞙɭɿ , 📃 ⟫
// ⟨ ſɭэ ᶗ‹ , ꞙɭц ,
// ſɭэ ᶗ‹ , ꞙɭэ , 📃 ⟩
/* ſɭэ ſɭw , ꞙɭı , */
  function halti(): void {
    haltigita = true;
    joqaGeneracio++;
  }

/* ſɭэ ſɭw , ꞙɭɿ , */
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
// ⟨ ſɭэ ᶗ‹ , ꞙɭɩ , 📃 ⟩
    const mia = ++joqaGeneracio;
    const joqa = ( nun: number ): void => {
      if ( haltigita || mia !== joqaGeneracio ) return;
      requestAnimationFrame(joqa);
// ⟨ ſɭᴜ ſןᴜ , ꞙɭꞟ , 📃 ⟩
      if ( rultempo.bildigu(alHe(nun)) ) bildigi();
    };
    requestAnimationFrame(joqa);
  }

  document.addEventListener("visibilitychange", () => {
    if ( document.hidden ) { halti(); return; }
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
    gxisdatigiEkranon();
    restarti();
  });
  window.addEventListener("blur", () => rultempo.agordiFokuson(false));
  window.addEventListener("focus", () => rultempo.agordiFokuson(true));
  window.addEventListener("pagehide", halti);
  window.addEventListener("pageshow", restarti);
// ⟨ ſɭэ ᶗ‹ , ꞙɭɿ , 📃 ⟩
  kanvaso.addEventListener("webglcontextlost", ( e ) => {
    e.preventDefault();
// ⟨ ſɭэ ᶗ‹ , ꞙɭц , 📃 ⟩
    bildilo.shadowMap.enabled = false;
    aparataRatio = Math.min(aparataRatio, 0o1);
    halti();
  });
  kanvaso.addEventListener("webglcontextrestored", () => {
// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭэ ,
//   ſ͕ɭɜ ı],ᴜ , ꞙɭɩ , 📃 ⟩
    horlogxo.reset();
    restarti();
  });

  let veb6qaiJoqaNombro = 0;
  let muzikaLokoT = 0;
// ⟨ ſɭᴜ ſןᴜ , ꞙɭꞟ , 📃 ⟩
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

// ⟪ ſɭᴜ ſןᴜ , 📃 ⟫
    promenanto.tona(deltaTempo, t);
    internanto.tona(deltaTempo, t);
    kanuanto.tona(deltaTempo, t);
// ⟨ ſȷwɔ˞ , ꞙɭı , 📃 ⟩
    if ( t - muzikaLokoT > 0o1/0o2 ) {
      muzikaLokoT = t;
      agordiMuzikanLokon(tsekeEnKaxte(ludanto.raqa.x, ludanto.raqa.z));
    }

    for ( const n of npcoj ) { if ( n.group.visible ) gxisdatigiNpc(n, deltaTempo, t, alteco, piedoj.kolizioj.k6h6SuproY); }

// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
    if ( ludanto.rezimo === "promeno" && !ludanto.surKanoto ) {
// ⟨ ſɭᴜ ſןᴜ , ꞙɭц ,
//   ſɭᴜ ſןᴜ , ꞙɭэ , 📃 ⟩
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

// ⟪ ſɭᴜ ſןᴜ , 📃 ⟫
    if ( retilo.aktiva ) {
      retilo.sendi(vepaqRetilanStaton);
      retilo.animacii(deltaTempo, t);
    }

// ⟪ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟫
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
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ , 📃 ⟩
    const movigxanta = ludanto.movoValoro > 0o1/0o100;
    const ombraPeriodo = movigxanta ? ( deltaTempo > 0o1/0o40 ? 0o4 : 0o2 ) : 0o6;
    ombraJoqa = ( ombraJoqa + 1 ) % ombraPeriodo;
    const ombroMovigxis = gxisdatigiOmbron(mapX, mapZ);
    if ( ombroMovigxis || ombraJoqa === 0 ) bildilo.shadowMap.needsUpdate = true;
    lampSistemo.sekviLumojn(mapX, mapZ);
// ⟪ ſɭэ ſɭw , 📃 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɩ , 📃 ⟩
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

// ⟪ ſɭᴜ ſןᴜ , 📃 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
    if ( ludanto.rezimo !== "interno" ) gxisdatigiVidlimojn(fotilo.position.x, fotilo.position.z);

// ⟪ ſ͕ɭɜ ı],ᴜ , 🎨 ⟫
// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭı ,
//   ſ͕ɭɜ ı],ᴜ , ꞙɭɿ , 📃 ⟩
    veb6qaiSef4Qena(qena);
    if ( ++veb6qaiJoqaNombro % KANAKA_PLENA_PERIODO === 0 ) veb6qaiQena(qena, true);

    bildilo.render(qena, fotilo);
    statistiko.gxisdatigu(rultempo);
  }

  return { animacii };
}
