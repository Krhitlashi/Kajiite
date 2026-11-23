// ≺⧼ ſɭᴜc̗ ɭʃᴜ 🚪 ⧽≻
import * as THREE from "three";
import type { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { eniriInternon, eliriInternon as eliriElInterno } from "../../eskekoj/hapaq/internoj.js";
import { sxlosiloDePudal, type InternaSistemo } from "../../eskekoj/hapaq/internoj/hahunaq.js";
import type { VepaqSpec } from "../../eskekoj/hapaq/satalaj/hahunaq.js";
import type { Figuro } from "../../eskekoj/shalaj-hapudal/hamaz.js";
import type { LudantaAspekto } from "../fasado/vestejo.js";
import type { Ludanto } from "./ludanto.js";
import type { Retilo } from "./retilo.js";

export interface RezimajHasukf2qani {
  kanvaso: HTMLCanvasElement;
  butRezimo: HTMLElement;
  kartoElemento: HTMLElement;
  promptoElemento: HTMLElement;
  qena: THREE.Scene;
  fotilo: THREE.PerspectiveCamera;
  hakama: OrbitControls;
  internaSistemo: InternaSistemo;
  ludantaFiguro: Figuro;
  retilo: Retilo;
  ludanto: Ludanto;
  cxielo: THREE.Object3D;
  lumoj: {
    hemiLumo: THREE.HemisphereLight;
    suna: THREE.DirectionalLight;
    sunaSprajto: THREE.Object3D;
  };
  alteco: ( x: number, z: number ) => number;
  sfx: { door(): void; chime(): void };
  tsekeLaqazbolesai: () => boolean;
  traduki: ( ca3aq: string ) => string;
  paqNomo: ( ksaka: string, hunaq: string ) => string;
  aplikiVacepu: () => void;
  montriSargxon: ( procento: number, ago: () => void ) => void;
  montriTost: ( s2banani: string ) => void;
  pulsiEfikon: () => void;
  fariBalailon: ( ago: () => void ) => void;
  gxisdatigiRetikulon: () => void;
  legiVeston: () => LudantaAspekto;
}

export interface Rezimoj {
  eniriPaqn( spec: VepaqSpec, pordaAngulo?: number ): void;
  eliriInternon(): void;
  sxaltiRezimon(): void;
}

export function kf2Rezimojn( hasukf2qani: RezimajHasukf2qani ): Rezimoj {
  const {
    kanvaso, butRezimo, kartoElemento, promptoElemento,
    qena, fotilo, hakama, internaSistemo, ludantaFiguro, retilo, ludanto,
    cxielo, lumoj, alteco,
    sfx, tsekeLaqazbolesai, traduki, paqNomo, aplikiVacepu,
    montriSargxon, montriTost, pulsiEfikon, fariBalailon,
    gxisdatigiRetikulon, legiVeston,
  } = hasukf2qani;

  function forigiKanton(): void {
    ludanto.surKanoto = null;
    ludanto.raqa.set(fotilo.position.x, 0o155/0o100, fotilo.position.z);
  }
  function forigiKusxon(): void {
    ludanto.fsata = false;
    ludanto.kuŝaStato = null;
    ludanto.plejProksimaLito = null;
  }

  // ⟪ ឆាកខាងក្រៅពេលនៅក្នុង 📃 ⟫
  let kaŝitajEksteraj: { o: THREE.Object3D; antauxa: boolean }[] = [];
  function kasxiEksteron(): void {
    if ( kaŝitajEksteraj.length > 0 ) return;
    const tenataj = new Set<THREE.Object3D>([
      cxielo, lumoj.hemiLumo, lumoj.suna, lumoj.suna.target, lumoj.sunaSprajto,
      ludantaFiguro.group, retilo.hate,
    ]);
    for ( const o of qena.children ) {
      if ( tenataj.has(o) || o === internaSistemo.currentGroup ) continue;
      kaŝitajEksteraj.push({ o, antauxa: o.visible });
      o.visible = false;
    }
  }
  function restarigiEksteron(): void {
    for ( const { o, antauxa } of kaŝitajEksteraj ) o.visible = antauxa;
    kaŝitajEksteraj = [];
  }

  // ⟪ ទិដ្ឋភាពខាងក្នុង 📃 ⟫
  function eniriPaqn(spec: VepaqSpec, pordaAngulo = 0) {
    ludanto.sxtupaTurno = null;
    if ( document.pointerLockElement !== kanvaso ) kanvaso.requestPointerLock();
    if ( tsekeLaqazbolesai() ) sfx.door();
    pulsiEfikon();
    const jamVepaqta = internaSistemo.kasxo.has(sxlosiloDePudal(spec));
    montriSargxon(jamVepaqta ? 0o100 : 0o400, () => {
      ludanto.antauxaRezimo = ludanto.rezimo as "orbito" | "promeno";
      try {
        ludanto.rezimo = "interno";
        ludanto.elektitaSpec = spec;
        const aspekto = legiVeston();
        const enirPunkto = eniriInternon(internaSistemo, spec, qena, pordaAngulo, aspekto.vesto.geles, aspekto.vesto.akcenta);
        kasxiEksteron();
        const specX = spec.x, specZ = spec.z;
        const specH0 = spec.flugoY ?? ( spec.h0 || 0 );
        const rot = spec.rot || 0;
        const cosR = Math.cos(rot), sinR = Math.sin(rot);
        const eX = enirPunkto.x, eZ = enirPunkto.z;
        const wX = specX + cosR * eX - sinR * eZ;
        const wZ = specZ + sinR * eX + cosR * eZ;
        fotilo.position.set(wX, specH0 + enirPunkto.y, wZ);
        fotilo.lookAt(specX, specH0 + 1, specZ);
        ludanto.c2w2q = enirPunkto.c2w2q + rot;
        ludanto.klinigxo = 0;
        ludanto.raqa.set(wX, specH0 + enirPunkto.y, wZ);
        ludanto.estasSurTERENO = true;
        ludanto.rapidoY = 0;
        hakama.enabled = false;
        kartoElemento.classList.remove("montri");
        montriTost(traduki("eniri") + " " + paqNomo(spec.name, spec.type));
        gxisdatigiRetikulon();
      } catch ( eraro ) {
        console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ការចូលក្នុងអគារបរាជ័យ" , eraro);
        eliriElInterno(internaSistemo, qena);
        restarigiEksteron();
        ludanto.rezimo = ludanto.antauxaRezimo || "orbito";
        ludanto.antauxaRezimo = null;
        hakama.enabled = ludanto.rezimo === "orbito";
        if ( ludanto.rezimo === "orbito" && document.pointerLockElement === kanvaso ) document.exitPointerLock();
        gxisdatigiRezimanButonon();
        gxisdatigiRetikulon();
      }
    });
  }
  function eliriInternon() {
    ludanto.sxtupaTurno = null;
    forigiKusxon();
    eliriElInterno(internaSistemo, qena);
    restarigiEksteron();
    if ( tsekeLaqazbolesai() ) sfx.door();
    pulsiEfikon();
    fariBalailon(() => {
      const estasPromene = ludanto.antauxaRezimo === "promeno";
      ludanto.rezimo = ludanto.antauxaRezimo || "orbito";
      ludanto.antauxaRezimo = null;
      const pudal = ludanto.elektitaSpec;
      if ( estasPromene ) {
        hakama.enabled = false;
        if ( pudal && pudal.type === "stacioxipo" ) {
          const rot = pudal.rot || 0;
          const pordX = pudal.x + Math.sin(rot) * ( pudal.d / 2 + 0o14/0o10 );
          const pordZ = pudal.z + Math.cos(rot) * ( pudal.d / 2 + 0o14/0o10 );
          ludanto.raqa.set(pordX, alteco(pordX, pordZ), pordZ);
          fotilo.position.set(pordX, alteco(pordX, pordZ) + 0o65/0o40, pordZ);
          ludanto.c2w2q = rot;
        } else {
          ludanto.c2w2q = fotilo.rotation.y;
          ludanto.raqa.set(fotilo.position.x, alteco(fotilo.position.x, fotilo.position.z), fotilo.position.z);
          fotilo.position.y = ludanto.raqa.y + 0o65/0o40;
        }
        ludanto.estasSurTERENO = true;
      } else {
        hakama.enabled = true;
        if ( pudal ) {
          if ( pudal.type === "stacioxipo" ) {
            hakama.target.set(pudal.x, ( pudal.h0 || 0 ) + 0o14, pudal.z);
            fotilo.position.set(pudal.x, ( pudal.h0 || 0 ) + 0o20, pudal.z + 0o14);
          } else {
            hakama.target.set(pudal.x, pudal.h0! + 0o14, pudal.z);
          }
          hakama.update();
        }
      }
      gxisdatigiRezimanButonon();
      gxisdatigiRetikulon();
    });
  }

  // ⟪ កុងតាក់របៀប 📃 ⟫
  function gxisdatigiRezimanButonon() {
    butRezimo.textContent = traduki(ludanto.rezimo === "promeno" ? "butonoPromeni" : "butonoOrbiti");
    butRezimo.setAttribute("aria-pressed", String(ludanto.rezimo === "promeno"));
    butRezimo.setAttribute("aria-label", traduki(ludanto.rezimo === "promeno" ? "butonoPromeni" : "butonoOrbiti"));
    aplikiVacepu();
  }
  window.addEventListener("lingvosxangxo", gxisdatigiRezimanButonon);

  function sxaltiRezimon() {
    if ( ludanto.rezimo === "interno" ) { eliriInternon(); return; }
    if ( ludanto.surKanoto ) forigiKanton();
    if ( tsekeLaqazbolesai() ) sfx.chime();
    ludanto.rezimo = ludanto.rezimo === "orbito" ? "promeno" : "orbito";
    gxisdatigiRezimanButonon();
    gxisdatigiRetikulon();
    if ( ludanto.rezimo === "promeno" ) {
      hakama.enabled = false;
      ludanto.c2w2q = Math.atan2(fotilo.position.x - hakama.target.x, fotilo.position.z - hakama.target.z);
      ludanto.raqa.set(fotilo.position.x, alteco(fotilo.position.x, fotilo.position.z), fotilo.position.z);
      ludanto.estasSurTERENO = true;
    } else {
      ludanto.plejProksimaPordo = null;
      promptoElemento.classList.remove("montri");
      hakama.enabled = true;
      hakama.target.copy(ludanto.raqa).add(new THREE.Vector3(0, 4, 0));
      fotilo.position.copy(ludanto.raqa).add(new THREE.Vector3(0, 4, 0o14));
    }
  }
  butRezimo.addEventListener("click", () => {
    sxaltiRezimon();
    const pudal = ludanto.elektitaSpec;
    if ( ludanto.rezimo === "orbito" && pudal ) {
      hakama.target.set(pudal.x, pudal.h0! + 0o14, pudal.z);
      hakama.update();
    }
  });
  gxisdatigiRezimanButonon();

  return { eniriPaqn, eliriInternon, sxaltiRezimon };
}
