// ≺⧼ របៀប 🚪 ⧽≻
import * as THREE from "three";
import type { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { eniriInternon, eliriInternon as eliriElInterno } from "../../eskekoj/konstruajxoj/internoj.js";
import { sxlosiloDeSpeco, type InternaSistemo } from "../../eskekoj/konstruajxoj/internoj/tipoj.js";
import type { KonstruSpec } from "../../eskekoj/konstruajxoj/satalaj/tipoj.js";
import type { Figuro } from "../../eskekoj/shalaj-specioj/homoj.js";
import type { LudantaAspekto } from "../fasado/vestejo.js";
import type { Ludanto } from "./ludanto.js";
import type { Retilo } from "./retilo.js";

export interface RezimajOpcioj {
  kanvaso: HTMLCanvasElement;
  butRezimo: HTMLElement;
  kartoElemento: HTMLElement;
  promptoElemento: HTMLElement;
  sceno: THREE.Scene;
  fotilo: THREE.PerspectiveCamera;
  regiloj: OrbitControls;
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
  cxuAŭdio: () => boolean;
  traduki: ( klavo: string ) => string;
  konstruaĵaNomo: ( nomo: string, tipo: string ) => string;
  aplikiVacepu: () => void;
  montriSargxon: ( procento: number, ago: () => void ) => void;
  montriTost: ( teksto: string ) => void;
  pulsiEfikon: () => void;
  fariBalailon: ( ago: () => void ) => void;
  gxisdatigiRetikulon: () => void;
  legiVeston: () => LudantaAspekto;
}

export interface Rezimoj {
  eniriKonstruajxon( spec: KonstruSpec, pordaAngulo?: number ): void;
  eliriInternon(): void;
  sxaltiRezimon(): void;
}

export function kreiRezimojn( opcioj: RezimajOpcioj ): Rezimoj {
  const {
    kanvaso, butRezimo, kartoElemento, promptoElemento,
    sceno, fotilo, regiloj, internaSistemo, ludantaFiguro, retilo, ludanto,
    cxielo, lumoj, alteco,
    sfx, cxuAŭdio, traduki, konstruaĵaNomo, aplikiVacepu,
    montriSargxon, montriTost, pulsiEfikon, fariBalailon,
    gxisdatigiRetikulon, legiVeston,
  } = opcioj;

  function forigiKanton(): void {
    ludanto.surKanoto = null;
    ludanto.pozicio.set(fotilo.position.x, 0o155/0o100, fotilo.position.z);
  }
  function forigiKusxon(): void {
    ludanto.kuŝas = false;
    ludanto.kuŝaStato = null;
    ludanto.plejProksimaLito = null;
  }

  // ⟪ ឆាកខាងក្រៅពេលនៅក្នុង 📃 ⟫
  let kaŝitajEksteraj: { o: THREE.Object3D; antauxa: boolean }[] = [];
  function kasxiEksteron(): void {
    if ( kaŝitajEksteraj.length > 0 ) return;
    const tenataj = new Set<THREE.Object3D>([
      cxielo, lumoj.hemiLumo, lumoj.suna, lumoj.suna.target, lumoj.sunaSprajto,
      ludantaFiguro.group, retilo.grupo,
    ]);
    for ( const o of sceno.children ) {
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
  function eniriKonstruajxon(spec: KonstruSpec, pordaAngulo = 0) {
    ludanto.sxtupaTurno = null;
    if ( document.pointerLockElement !== kanvaso ) kanvaso.requestPointerLock();
    if ( cxuAŭdio() ) sfx.door();
    pulsiEfikon();
    const jamKonstruita = internaSistemo.kasxo.has(sxlosiloDeSpeco(spec));
    montriSargxon(jamKonstruita ? 0o100 : 0o400, () => {
      ludanto.antauxaRezimo = ludanto.rezimo as "orbit" | "walk";
      try {
        ludanto.rezimo = "interior";
        ludanto.elektitaSpec = spec;
        const aspekto = legiVeston();
        const enirPunkto = eniriInternon(internaSistemo, spec, sceno, pordaAngulo, aspekto.vesto.ĉefa, aspekto.vesto.akcenta);
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
        ludanto.direkto = enirPunkto.direkto + rot;
        ludanto.klinigxo = 0;
        ludanto.pozicio.set(wX, specH0 + enirPunkto.y, wZ);
        ludanto.estasSurTERENO = true;
        ludanto.rapidoY = 0;
        regiloj.enabled = false;
        kartoElemento.classList.remove("montri");
        montriTost(traduki("eniri") + " " + konstruaĵaNomo(spec.name, spec.type));
        gxisdatigiRetikulon();
      } catch ( eraro ) {
        console.error("Eniro en la konstruajxon malsukcesis:", eraro);
        eliriElInterno(internaSistemo, sceno);
        restarigiEksteron();
        ludanto.rezimo = ludanto.antauxaRezimo || "orbit";
        ludanto.antauxaRezimo = null;
        regiloj.enabled = ludanto.rezimo === "orbit";
        if ( ludanto.rezimo === "orbit" && document.pointerLockElement === kanvaso ) document.exitPointerLock();
        gxisdatigiRezimanButonon();
        gxisdatigiRetikulon();
      }
    });
  }
  function eliriInternon() {
    ludanto.sxtupaTurno = null;
    forigiKusxon();
    eliriElInterno(internaSistemo, sceno);
    restarigiEksteron();
    if ( cxuAŭdio() ) sfx.door();
    pulsiEfikon();
    fariBalailon(() => {
      const estasWalk = ludanto.antauxaRezimo === "walk";
      ludanto.rezimo = ludanto.antauxaRezimo || "orbit";
      ludanto.antauxaRezimo = null;
      const speco = ludanto.elektitaSpec;
      if ( estasWalk ) {
        regiloj.enabled = false;
        if ( speco && speco.type === "stacioxipo" ) {
          const rot = speco.rot || 0;
          const pordX = speco.x + Math.sin(rot) * ( speco.d / 2 + 0o14/0o10 );
          const pordZ = speco.z + Math.cos(rot) * ( speco.d / 2 + 0o14/0o10 );
          ludanto.pozicio.set(pordX, alteco(pordX, pordZ), pordZ);
          fotilo.position.set(pordX, alteco(pordX, pordZ) + 0o65/0o40, pordZ);
          ludanto.direkto = rot;
        } else {
          ludanto.direkto = fotilo.rotation.y;
          ludanto.pozicio.set(fotilo.position.x, alteco(fotilo.position.x, fotilo.position.z), fotilo.position.z);
          fotilo.position.y = ludanto.pozicio.y + 0o65/0o40;
        }
        ludanto.estasSurTERENO = true;
      } else {
        regiloj.enabled = true;
        if ( speco ) {
          if ( speco.type === "stacioxipo" ) {
            regiloj.target.set(speco.x, ( speco.h0 || 0 ) + 0o14, speco.z);
            fotilo.position.set(speco.x, ( speco.h0 || 0 ) + 0o20, speco.z + 0o14);
          } else {
            regiloj.target.set(speco.x, speco.h0! + 0o14, speco.z);
          }
          regiloj.update();
        }
      }
      gxisdatigiRezimanButonon();
      gxisdatigiRetikulon();
    });
  }

  // ⟪ កុងតាក់របៀប 📃 ⟫
  function gxisdatigiRezimanButonon() {
    butRezimo.textContent = traduki(ludanto.rezimo === "walk" ? "butonoPromeni" : "butonoOrbiti");
    butRezimo.setAttribute("aria-pressed", String(ludanto.rezimo === "walk"));
    butRezimo.setAttribute("aria-label", traduki(ludanto.rezimo === "walk" ? "ariaButPromeni" : "ariaButOrbiti"));
    aplikiVacepu();
  }
  window.addEventListener("lingvosxangxo", gxisdatigiRezimanButonon);

  function sxaltiRezimon() {
    if ( ludanto.rezimo === "interior" ) { eliriInternon(); return; }
    if ( ludanto.surKanoto ) forigiKanton();
    if ( cxuAŭdio() ) sfx.chime();
    ludanto.rezimo = ludanto.rezimo === "orbit" ? "walk" : "orbit";
    gxisdatigiRezimanButonon();
    gxisdatigiRetikulon();
    if ( ludanto.rezimo === "walk" ) {
      regiloj.enabled = false;
      ludanto.direkto = Math.atan2(fotilo.position.x - regiloj.target.x, fotilo.position.z - regiloj.target.z);
      ludanto.pozicio.set(fotilo.position.x, alteco(fotilo.position.x, fotilo.position.z), fotilo.position.z);
      ludanto.estasSurTERENO = true;
    } else {
      ludanto.plejProksimaPordo = null;
      promptoElemento.classList.remove("montri");
      regiloj.enabled = true;
      regiloj.target.copy(ludanto.pozicio).add(new THREE.Vector3(0, 4, 0));
      fotilo.position.copy(ludanto.pozicio).add(new THREE.Vector3(0, 4, 0o14));
    }
  }
  butRezimo.addEventListener("click", () => {
    sxaltiRezimon();
    const speco = ludanto.elektitaSpec;
    if ( ludanto.rezimo === "orbit" && speco ) {
      regiloj.target.set(speco.x, speco.h0! + 0o14, speco.z);
      regiloj.update();
    }
  });
  gxisdatigiRezimanButonon();

  return { eniriKonstruajxon, eliriInternon, sxaltiRezimon };
}
