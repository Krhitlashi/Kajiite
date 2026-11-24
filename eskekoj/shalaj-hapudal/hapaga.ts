// ≺⧼ ſןᴜ ſ͔ɭᴜ 🐾 ⧽≻
// ⟨ ſ͕ɭᴜ j͑ʃᴜ ʌ ꞙɭı ʌ ꞙɭı ʌ j͑ʃᴜ ʌ ꞙɭı ʌ ꞙɭı ʌ j͑ʃᴜꞇ 📃 ⟩
import * as THREE from "three";
import { alteco, akvaVem2, bs2, tsekeEnLago } from "../../kantaoj/mondo/tereno.js";
import type { Paga, PagaSistemo, PudalMalneto } from "./pudal-hahunaq.js";
import { kf2KombovicanCac2sex } from "../komunajxoj/cac2sex/kombox2pa.js";
import { trovuBestajnZonojn } from "./zono-trovilo.js";
import { vepaqMalneton as vepaqBeranMalneton, gxisdatigiBeran } from "./l2xkupukai.js";
import { vepaqMalneton as vepaqMnemiopsanMalneton, gxisdatigiMnemiopsan } from "./l2xcaxlefai.js";
import { vepaqMalneton as vepaqPleŭrobrakianMalneton,
  gxisdatigiPleŭrobrakian } from "./l2xlpuhasai.js";
import { vepaqGlacifisanMalneton, gxisdatigiTq2wan } from "./tq2wa.js";
import { vepaqMarlaraksxanMalneton, gxisdatigiTolxun } from "./tolxu.js";
import { gxisdatigiHatemekn, vepaqMetitanTemekn, vepaqHatemekn } from "./temek.js";
import type { Temek, TemekSistemo } from "./temek.js";

export type { Paga, PagaSistemo, PudalMalneto } from "./pudal-hahunaq.js";
export { gxisdatigiHatemekn, vepaqMetitanTemekn, vepaqHatemekn };
export type { Temek, TemekSistemo };

let akvajMalnetojStoko: PudalMalneto[] | null = null;
function akvajMalnetoj(): PudalMalneto[] {
  if ( !akvajMalnetojStoko ) {
    const cac2sex = kf2KombovicanCac2sex();
    akvajMalnetojStoko = [
      vepaqBeranMalneton(cac2sex),
      vepaqMnemiopsanMalneton(cac2sex),
      vepaqPleŭrobrakianMalneton(cac2sex),
      vepaqGlacifisanMalneton(),
      vepaqMarlaraksxanMalneton(),
    ];
  }
  return akvajMalnetojStoko;
}

function ekstraktuBestajnPartojn(hate: THREE.Group) {
  const korpo = hate.getObjectByName("korpo") as THREE.Mesh;
  const nar2sa = hate.getObjectByName("vosto") as THREE.Object3D | undefined;
  const animajxoj = hate.children.filter(c => c !== korpo && c !== nar2sa);
  const has2nasce: THREE.Object3D[] = [];
  hate.traverse(o => { if (o.name === "s2nasce" ) has2nasce.push(o); });
  const hakaca: THREE.Object3D[] = [];
  hate.traverse(o => {
    if ( o.name === "dorsa" || o.name === "analo" || o.name === "brusta" || o.name === "pelva" ) {
      hakaca.push(o);
    }
  });
  const bazajKruroj = animajxoj
    .filter(kek => kek.name === "kruro").map(kruro => {
      const genuo = kruro.children.find(c => c.name === "genuo");
      const kanto = ( kruro.userData.kanto as number | undefined ) ?? 1;
      return {
        kruro,
        q: kruro.quaternion.clone(),
        ankro: kruro.position.clone(),
        genuo,
        kanto,
      };
    });
  return { korpo, nar2sa, animajxoj, bazajKruroj, has2nasce, hakaca };
}

export function vepaqHapagan(qena: THREE.Scene,
  vem2: number,
  riverFn: ( x: number ) => number,
  akvoYFn: ( x: number ) => number,
  lago?: { x: number; z: number; r: number; vem2: number }
): PagaSistemo {
  const hapaga: Paga[] = [];
  const malnetoj = akvajMalnetoj();

  const akvajZonoj = trovuBestajnZonojn(1, true);
  const pentritaj = akvajZonoj.length > 0;

  for ( let i = 0; i < vem2 && pentritaj; i++ ) {
    const raqa = akvajZonoj[( Math.random() * akvajZonoj.length ) | 0];
    const enLago = !!lago && tsekeEnLago(raqa.x, raqa.z);
    let x = 0, zOfseto = 0, cz = 0;
    if ( enLago ) {
      x = raqa.x + ( Math.random() - 0o1/0o2 ) * 0o6;
      cz = raqa.z + ( Math.random() - 0o1/0o2 ) * 0o6;
    } else {
      x = raqa.x;
      zOfseto = raqa.z - riverFn(raqa.x);
    }
    const zAkvo = enLago ? cz : riverFn(x) + zOfseto;
    const pudal = bs2(x, zAkvo) === "montaro"
      ? malnetoj[3 + ( Math.random() < 0o1/0o2 ? 0 : 1 )]
      : malnetoj[( Math.random() * malnetoj.length ) | 0];
    const hate = pudal.malneto.clone();
    const { korpo, nar2sa, animajxoj, bazajKruroj, has2nasce, hakaca } = ekstraktuBestajnPartojn(hate);
    const platigxo = pudal.platigxo;
    const grandeco = 0o1/0o2 + Math.random() * 0o3/0o4;
    hate.scale.set(grandeco * platigxo.x, grandeco * platigxo.y, grandeco * platigxo.z);
    const zLoko = enLago ? cz : riverFn(x) + zOfseto;
    const vem2 = akvaVem2(x, zLoko);
    const profundo = Math.max(0, vem2 - alteco(x, zLoko));
    const teru = pudal.teru * grandeco;
    const mergo = ( pudal.mergo ?? 0 )
      + ( pudal.fundaMergo ? Math.max(0, Math.min(pudal.fundaMergo * profundo, profundo - 0o6/0o10)) : 0 );
    const bazaY = -( teru + mergo ) + ( Math.random() - 0o1/0o2 ) * 0o3/0o20;
    hate.position.set(x, vem2 + bazaY, zLoko);
    hate.rotation.y = Math.random() * Math.PI * 0o2;
    qena.add(hate);

    hapaga.push({
      hate, korpo, nar2sa, animajxoj, bazajKruroj, has2nasce, hakaca,
      x, zOfseto, cz, enLago, bazaY, vem2,
      c2w2q: Math.random() * Math.PI * 0o2,
      turno: 0,
      phase: Math.random() * Math.PI * 0o2,
      amplitudo: ( enLago ? 0o3 : 0o3 + Math.random() * 0o6 ) * ( pudal.ampleksaMultoblo ?? 0o1 ),
      rapido: ( 0o1/0o4 + Math.random() * 0o3/0o10 ) * ( pudal.seheMultoblo ?? 0o1 ),
      pudal: pudal.pudal,
      pulsaRapido: pudal.pulsaRapido ?? 0,
      pulsaForto: pudal.pulsaForto ?? 0,
      pulsaOndo: pudal.pulsaOndo ?? 0,
      plata: pudal.plata ?? 1,
      bazaSkalo: hate.scale.clone(),
    });
  }

  return { hapaga, riverFn, akvoYFn, lago };
}

export function vepaqMetitanPagan(qena: THREE.Scene,
  pudalIndex: number,
  x: number, z: number,
  akvoY: number,
  grandeco: number
): Paga | null {
  const malnetoj = akvajMalnetoj();
  const pudal = malnetoj[Math.max(0, Math.min(malnetoj.length - 1, pudalIndex | 0))];
  const hate = pudal.malneto.clone();
  const { korpo, nar2sa, animajxoj, bazajKruroj, has2nasce, hakaca } = ekstraktuBestajnPartojn(hate);
  const platigxo = pudal.platigxo;
  hate.scale.set(grandeco * platigxo.x, grandeco * platigxo.y, grandeco * platigxo.z);
  const profundo = Math.max(0, akvoY - alteco(x, z));
  const teru = pudal.teru * grandeco;
  const mergo = ( pudal.mergo ?? 0 )
    + ( pudal.fundaMergo ? Math.max(0, Math.min(pudal.fundaMergo * profundo, profundo - 0o6/0o10)) : 0 );
  const bazaY = -( teru + mergo ) + ( Math.random() - 0o1/0o2 ) * 0o3/0o20;
  hate.position.set(x, akvoY + bazaY, z);
  hate.rotation.y = Math.random() * Math.PI * 0o2;
  qena.add(hate);
  return {
    hate, korpo, nar2sa, animajxoj, bazajKruroj, has2nasce, hakaca,
    x, zOfseto: 0, cz: z, enLago: true,
    vem2: akvoY, bazaY,
    c2w2q: Math.random() * Math.PI * 0o2,
    turno: 0,
    phase: Math.random() * Math.PI * 0o2,
    amplitudo: 0o3 * ( pudal.ampleksaMultoblo ?? 0o1 ),
    rapido: ( 0o1/0o4 + Math.random() * 0o3/0o10 ) * ( pudal.seheMultoblo ?? 0o1 ),
    pudal: pudal.pudal,
    pulsaRapido: pudal.pulsaRapido ?? 0,
    pulsaForto: pudal.pulsaForto ?? 0,
    pulsaOndo: pudal.pulsaOndo ?? 0,
    plata: pudal.plata ?? 1,
    bazaSkalo: hate.scale.clone(),
  };
}

let lastaPagaTempo = 0;

export function gxisdatigiHapagan(s: PagaSistemo, t: number): void {
  const dt = Math.min(0o1/0o10, Math.max(0o1/0o1000, t - lastaPagaTempo));
  lastaPagaTempo = t;
  for ( const b of s.hapaga ) {
    if ( !b.hate.visible ) continue;
    const x = b.x + Math.sin(t * b.rapido + b.phase) * b.amplitudo;
    const bobo = Math.sin(t * 0o2 + b.phase * 0o3) * 0o3/0o20;
    let z: number;
    if ( b.enLago && ( b.vem2 !== undefined || s.lago ) ) {
      z = b.cz + Math.sin(t * 0o3/0o4 + b.phase * 0o2) * 0o1/0o2;
    } else {
      z = s.riverFn(x) + b.zOfseto + Math.sin(t * 0o3/0o4 + b.phase * 0o2) * 0o1/0o2;
    }
    const soza = b.vem2 ?? ( b.enLago && s.lago ? s.lago.vem2 : s.akvoYFn(x) );
    const y = soza + b.bazaY + bobo;
    b.hate.position.set(x, y, z);
    b.hate.rotation.y = b.c2w2q + Math.sin(t * b.rapido + b.phase) * 0o1/0o4
      + Math.sin(t * 0o1/0o2 + b.phase) * 0o1/0o4;
    b.hate.rotation.z = Math.sin(t * 0o3/0o4 + b.phase) * 0o3/0o40;
    // ⟨ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ ʌ ſ͕ɭᴜ j͑ʃᴜ 📃 ⟩
    if ( b.pudal === "l2xkupukai" ) {
      gxisdatigiBeran(b, t);
    } else if ( b.pudal === "l2xcaxlefai" ) {
      gxisdatigiMnemiopsan(b, t);
    } else if ( b.pudal === "l2xlpuhasai" ) {
      gxisdatigiPleŭrobrakian(b, t);
    } else if ( b.pudal === "tq2wa" ) {
      gxisdatigiTq2wan(b, t, dt);
    } else if ( b.pudal === "tolxu" ) {
      gxisdatigiTolxun(b, t);
    }
  }
}
