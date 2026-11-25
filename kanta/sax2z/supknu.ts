// ≺⧼ ſɭᴜc̗ ɭʃᴜ 🚪 ⧽≻
import * as THREE from "three";
import type { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { eniriC2h2, eliriC2h2 as eliriElC2h2 } from "../../skek2/hapaq/hac2h2.js";
import { ca3aqDePudal, type C2h2Kanta } from "../../skek2/hapaq/hac2h2/hahunaq.js";
import type { VepaqSpec } from "../../skek2/hapaq/satalaj/hahunaq.js";
import type { Qoxa } from "../../skek2/pudal/hamaz.js";
import type { LudantaAspekto } from "../fasado/qatlaq.js";
import type { Masax2z } from "./masax2z.js";
import type { Caxlefkakai } from "./caxlefkakai.js";

export interface RezimajHasukf2qani {
  p2t6zo: HTMLCanvasElement;
  butSupknu: HTMLElement;
  thalaKfe: HTMLElement;
  x2paKfe: HTMLElement;
  qena: THREE.Scene;
  catahaq: THREE.PerspectiveCamera;
  hakama: OrbitControls;
  c2h2Kanta: C2h2Kanta;
  ludantaQoxa: Qoxa;
  caxlefkakai: Caxlefkakai;
  masax2z: Masax2z;
  cana: THREE.Object3D;
  hatsije: {
    hemiTsije: THREE.HemisphereLight;
    suna: THREE.DirectionalLight;
    sunaSprajto: THREE.Object3D;
  };
  l6da: ( x: number, z: number ) => number;
  sfx: { door(): void; chime(): void };
  tsekeLaqazbolesai: () => boolean;
  traduki: ( ca3aq: string ) => string;
  paqKsaka: ( ksaka: string, hunaq: string ) => string;
  aplikiVacepu: () => void;
  laqaziSargxon: ( procento: number, zegeni: () => void ) => void;
  laqaziTost: ( s2banani: string ) => void;
  pulsiEfikon: () => void;
  fariBalailon: ( zegeni: () => void ) => void;
  tlak2Retikulon: () => void;
  vefalSoqte: () => LudantaAspekto;
}

export interface Rezimoj {
  eniriPaqn( spec: VepaqSpec, pordaTafkaq?: number ): void;
  eliriC2h2(): void;
  tsiinanusabosaiSupknu(): void;
}

export function kf2Rezimojn( hasukf2qani: RezimajHasukf2qani ): Rezimoj {
  const {
    p2t6zo, butSupknu, thalaKfe, x2paKfe,
    qena, catahaq, hakama, c2h2Kanta, ludantaQoxa, caxlefkakai, masax2z,
    cana, hatsije, l6da,
    sfx, tsekeLaqazbolesai, traduki, paqKsaka, aplikiVacepu,
    laqaziSargxon, laqaziTost, pulsiEfikon, fariBalailon,
    tlak2Retikulon, vefalSoqte,
  } = hasukf2qani;

  function h2liKanton(): void {
    masax2z.surS2tani = null;
    masax2z.raqa.set(catahaq.position.x, 0o155/0o100, catahaq.position.z);
  }
  function h2liKusxon(): void {
    masax2z.fsata = false;
    masax2z.kuŝaS2k61o = null;
    masax2z.kmaTsiikeCamutsa = null;
  }

  // ⟪ ſɟᴜ ſȷᴜɔ˞ ʌ ꞙɭɔ ʌ ſɭɜ ſᶘɹ 📃 ⟫
  let kaŝitajEksteraj: { o: THREE.Object3D; ne3ak2: boolean }[] = [];
  function kobesaiEkst6liman(): void {
    if ( kaŝitajEksteraj.length > 0 ) return;
    const tenataj = new Set<THREE.Object3D>([
      cana, hatsije.hemiTsije, hatsije.suna, hatsije.suna.target, hatsije.sunaSprajto,
      ludantaQoxa.group, caxlefkakai.hate2,
    ]);
    for ( const o of qena.children ) {
      if ( tenataj.has(o) || o === c2h2Kanta.currentGroup ) continue;
      kaŝitajEksteraj.push({ o, ne3ak2: o.visible });
      o.visible = false;
    }
  }
  function restarigiEkst6liman(): void {
    for ( const { o, ne3ak2 } of kaŝitajEksteraj ) o.visible = ne3ak2;
    kaŝitajEksteraj = [];
  }

  // ⟪ ſɭꞇ ı],ɹ ʌ ſɭɜ ſᶘɹ 📃 ⟫
  function eniriPaqn(spec: VepaqSpec, pordaTafkaq = 0) {
    masax2z.sxtupaTurno = null;
    if ( document.pointerLockElement !== p2t6zo ) p2t6zo.requestPointerLock();
    if ( tsekeLaqazbolesai() ) sfx.door();
    pulsiEfikon();
    const jamVepaqta = c2h2Kanta.kuba.has(ca3aqDePudal(spec));
    laqaziSargxon(jamVepaqta ? 0o100 : 0o400, () => {
      masax2z.ne3ak2Supknu = masax2z.supknu as "orbito" | "promeno";
      try {
        masax2z.supknu = "c2h2";
        masax2z.sukf2qitaSpec = spec;
        const aspekto = vefalSoqte();
        const enirN2k = eniriC2h2(c2h2Kanta, spec, qena, pordaTafkaq, aspekto.soqte.soqteWeh2, aspekto.soqte.tokhaxesai);
        kobesaiEkst6liman();
        const specX = spec.x, specZ = spec.z;
        const specH0 = spec.flugoY ?? ( spec.h0 || 0 );
        const rot = spec.rot || 0;
        const cosR = Math.cos(rot), sinR = Math.sin(rot);
        const eX = enirN2k.x, eZ = enirN2k.z;
        const wX = specX + cosR * eX - sinR * eZ;
        const wZ = specZ + sinR * eX + cosR * eZ;
        catahaq.position.set(wX, specH0 + enirN2k.y, wZ);
        catahaq.lookAt(specX, specH0 + 1, specZ);
        masax2z.c2w2q = enirN2k.c2w2q + rot;
        masax2z.s2sabo = 0;
        masax2z.raqa.set(wX, specH0 + enirN2k.y, wZ);
        masax2z.estasSurKOZU = true;
        masax2z.seheniY = 0;
        hakama.enabled = false;
        thalaKfe.classList.remove("laqazi");
        laqaziTost(traduki("eniri") + " " + paqKsaka(spec.name, spec.type));
        tlak2Retikulon();
      } catch ( tlohk2nik2p2 ) {
        console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ſȷwɔ˞ ʌ ſɟɔȝ ʌ ꞙɭɔ ʌ ſɭɜ ſɭw j͐ʃᴜ" , tlohk2nik2p2);
        eliriElC2h2(c2h2Kanta, qena);
        restarigiEkst6liman();
        masax2z.supknu = masax2z.ne3ak2Supknu || "orbito";
        masax2z.ne3ak2Supknu = null;
        hakama.enabled = masax2z.supknu === "orbito";
        if ( masax2z.supknu === "orbito" && document.pointerLockElement === p2t6zo ) document.exitPointerLock();
        tlak2RezimanCatsiina();
        tlak2Retikulon();
      }
    });
  }
  function eliriC2h2() {
    masax2z.sxtupaTurno = null;
    h2liKusxon();
    eliriElC2h2(c2h2Kanta, qena);
    restarigiEkst6liman();
    if ( tsekeLaqazbolesai() ) sfx.door();
    pulsiEfikon();
    fariBalailon(() => {
      const estasPromene = masax2z.ne3ak2Supknu === "promeno";
      masax2z.supknu = masax2z.ne3ak2Supknu || "orbito";
      masax2z.ne3ak2Supknu = null;
      const pudal = masax2z.sukf2qitaSpec;
      if ( estasPromene ) {
        hakama.enabled = false;
        if ( pudal && pudal.type === "ka5asexazxipo" ) {
          const rot = pudal.rot || 0;
          const pordX = pudal.x + Math.sin(rot) * ( pudal.d / 2 + 0o14/0o10 );
          const pordZ = pudal.z + Math.cos(rot) * ( pudal.d / 2 + 0o14/0o10 );
          masax2z.raqa.set(pordX, l6da(pordX, pordZ), pordZ);
          catahaq.position.set(pordX, l6da(pordX, pordZ) + 0o65/0o40, pordZ);
          masax2z.c2w2q = rot;
        } else {
          masax2z.c2w2q = catahaq.rotation.y;
          masax2z.raqa.set(catahaq.position.x, l6da(catahaq.position.x, catahaq.position.z), catahaq.position.z);
          catahaq.position.y = masax2z.raqa.y + 0o65/0o40;
        }
        masax2z.estasSurKOZU = true;
      } else {
        hakama.enabled = true;
        if ( pudal ) {
          if ( pudal.type === "ka5asexazxipo" ) {
            hakama.target.set(pudal.x, ( pudal.h0 || 0 ) + 0o14, pudal.z);
            catahaq.position.set(pudal.x, ( pudal.h0 || 0 ) + 0o20, pudal.z + 0o14);
          } else {
            hakama.target.set(pudal.x, pudal.h0! + 0o14, pudal.z);
          }
          hakama.update();
        }
      }
      tlak2RezimanCatsiina();
      tlak2Retikulon();
    });
  }

  // ⟪ ſᶘɹ }ʃᴜ }ʃw j͑ʃᴜ ʃɜ j͑ʃᴜꞇ 📃 ⟫
  function tlak2RezimanCatsiina() {
    butSupknu.textContent = traduki(masax2z.supknu === "promeno" ? "catsiinaPromeni" : "catsiinaOrbiti");
    butSupknu.setAttribute("aria-pressed", String(masax2z.supknu === "promeno"));
    butSupknu.setAttribute("aria-label", traduki(masax2z.supknu === "promeno" ? "catsiinaPromeni" : "catsiinaOrbiti"));
    aplikiVacepu();
  }
  window.addEventListener("lingvovasaka", tlak2RezimanCatsiina);

  function tsiinanusabosaiSupknu() {
    if ( masax2z.supknu === "c2h2" ) { eliriC2h2(); return; }
    if ( masax2z.surS2tani ) h2liKanton();
    if ( tsekeLaqazbolesai() ) sfx.chime();
    masax2z.supknu = masax2z.supknu === "orbito" ? "promeno" : "orbito";
    tlak2RezimanCatsiina();
    tlak2Retikulon();
    if ( masax2z.supknu === "promeno" ) {
      hakama.enabled = false;
      masax2z.c2w2q = Math.atan2(catahaq.position.x - hakama.target.x, catahaq.position.z - hakama.target.z);
      masax2z.raqa.set(catahaq.position.x, l6da(catahaq.position.x, catahaq.position.z), catahaq.position.z);
      masax2z.estasSurKOZU = true;
    } else {
      masax2z.kmaTsiikeKev = null;
      x2paKfe.classList.remove("laqazi");
      hakama.enabled = true;
      hakama.target.copy(masax2z.raqa).add(new THREE.Vector3(0, 4, 0));
      catahaq.position.copy(masax2z.raqa).add(new THREE.Vector3(0, 4, 0o14));
    }
  }
  butSupknu.addEventListener("click", () => {
    tsiinanusabosaiSupknu();
    const pudal = masax2z.sukf2qitaSpec;
    if ( masax2z.supknu === "orbito" && pudal ) {
      hakama.target.set(pudal.x, pudal.h0! + 0o14, pudal.z);
      hakama.update();
    }
  });
  tlak2RezimanCatsiina();

  return { eniriPaqn, eliriC2h2, tsiinanusabosaiSupknu };
}
