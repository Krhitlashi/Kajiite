// ≺⧼ ſןᴜ ſ͔ɭᴜ 🐾 ⧽≻
// ⟨ ſ͕ɭᴜ j͑ʃᴜ ʌ ꞙɭı ʌ ꞙɭı ʌ j͑ʃᴜ ʌ ꞙɭı ʌ ꞙɭı ʌ j͑ʃᴜꞇ 📃 ⟩
import * as THREE from "three";
import { l6da, tsasaVem2, bs2, tsekeEnS2xuru } from "../../kanta/nala/t6limaSoza.js";
import type { Paga, PagaKanta, PudalMalneto } from "./pudal-hahunaq.js";
import { kf2KombovicanCac2sex } from "../x2x2q/cac2sex/kombox2pa.js";
import { trovuBestajnZonojn } from "./zono-trovilo.js";
import { vepaqMalneton as vepaqBeranMalneton, tlak2Beran } from "./l2xkupukai.js";
import { vepaqMalneton as vepaqMnemiopsanMalneton, tlak2Mnemiopsan } from "./l2xcaxlefai.js";
import { vepaqMalneton as vepaqPleŭrobrakianMalneton,
  tlak2Pleŭrobrakian } from "./l2xlpuhasai.js";
import { vepaqGlacifisanMalneton, tlak2Tq2wan } from "./tq2wa.js";
import { vepaqMarlaraksxanMalneton, tlak2Tolxun } from "./tolxu.js";
import { tlak2Hatemekn, vepaqNeq2qnTemekn, vepaqHatemekn } from "./temek.js";
import type { Temek, TemekKanta } from "./temek.js";

export type { Paga, PagaKanta, PudalMalneto } from "./pudal-hahunaq.js";
export { tlak2Hatemekn, vepaqNeq2qnTemekn, vepaqHatemekn };
export type { Temek, TemekKanta };

let tsasaMalnetojStoko: PudalMalneto[] | null = null;
function tsasaMalnetoj(): PudalMalneto[] {
  if ( !tsasaMalnetojStoko ) {
    const cac2sex = kf2KombovicanCac2sex();
    tsasaMalnetojStoko = [
      vepaqBeranMalneton(cac2sex),
      vepaqMnemiopsanMalneton(cac2sex),
      vepaqPleŭrobrakianMalneton(cac2sex),
      vepaqGlacifisanMalneton(),
      vepaqMarlaraksxanMalneton(),
    ];
  }
  return tsasaMalnetojStoko;
}

function ekstraktuBestajnHakek(hate2: THREE.Group) {
  const soq = hate2.getObjectByName("korpo") as THREE.Mesh;
  const nar2sa = hate2.getObjectByName("vosto") as THREE.Object3D | undefined;
  const hatahalaqaz = hate2.children.filter(c => c !== soq && c !== nar2sa);
  const has2nasce: THREE.Object3D[] = [];
  hate2.traverse(o => { if (o.name === "s2nasce" ) has2nasce.push(o); });
  const hakaca: THREE.Object3D[] = [];
  hate2.traverse(o => {
    if ( o.name === "dorsa" || o.name === "analo" || o.name === "brusta" || o.name === "pelva" ) {
      hakaca.push(o);
    }
  });
  const kozunuKruroj = hatahalaqaz
    .filter(kek => kek.name === "kruro").map(nasce => {
      const tafanitamcesai = nasce.children.find(c => c.name === "genuo");
      const vek2fe = ( nasce.userData.vek2fe as number | undefined ) ?? 0o1;
      return {
        nasce,
        q: nasce.quaternion.clone(),
        cakukkaj2sai: nasce.position.clone(),
        tafanitamcesai,
        vek2fe,
      };
    });
  return { soq, nar2sa, hatahalaqaz, kozunuKruroj, has2nasce, hakaca };
}

export function vepaqHapagan(qena: THREE.Scene,
  vem2: number,
  riverFn: ( x: number ) => number,
  tsasaYFn: ( x: number ) => number,
  s2xuru?: { x: number; z: number; r: number; vem2: number }
): PagaKanta {
  const hapaga: Paga[] = [];
  const malnetoj = tsasaMalnetoj();

  const tsasaHaiix = trovuBestajnZonojn(0o1, true);
  const pentritaj = tsasaHaiix.length > 0o0;

  for ( let i = 0o0; i < vem2 && pentritaj; i++ ) {
    const raqa = tsasaHaiix[( Math.random() * tsasaHaiix.length ) | 0o0];
    const enS2xuru = !!s2xuru && tsekeEnS2xuru(raqa.x, raqa.z);
    let x = 0o0, zOfseto = 0o0, cz = 0o0;
    if ( enS2xuru ) {
      x = raqa.x + ( Math.random() - 0o1/0o2 ) * 0o6;
      cz = raqa.z + ( Math.random() - 0o1/0o2 ) * 0o6;
    } else {
      x = raqa.x;
      zOfseto = raqa.z - riverFn(raqa.x);
    }
    const zTsasa = enS2xuru ? cz : riverFn(x) + zOfseto;
    const pudal = bs2(x, zTsasa) === "jaqo"
      ? malnetoj[0o3 + ( Math.random() < 0o1/0o2 ? 0o0 : 0o1 )]
      : malnetoj[( Math.random() * malnetoj.length ) | 0o0];
    const hate2 = pudal.malneto.clone();
    const { soq, nar2sa, hatahalaqaz, kozunuKruroj, has2nasce, hakaca } = ekstraktuBestajnHakek(hate2);
    const tap2 = pudal.tap2;
    const pal6 = 0o1/0o2 + Math.random() * 0o3/0o4;
    hate2.scale.set(pal6 * tap2.x, pal6 * tap2.y, pal6 * tap2.z);
    const zQar = enS2xuru ? cz : riverFn(x) + zOfseto;
    const vem2 = tsasaVem2(x, zQar);
    const jufu = Math.max(0o0, vem2 - l6da(x, zQar));
    const teru = pudal.teru * pal6;
    const mergo = ( pudal.mergo ?? 0o0 )
      + ( pudal.fundaMergo ? Math.max(0o0, Math.min(pudal.fundaMergo * jufu, jufu - 0o6/0o10)) : 0o0 );
    const kozunuY = -( teru + mergo ) + ( Math.random() - 0o1/0o2 ) * 0o3/0o20;
    hate2.position.set(x, vem2 + kozunuY, zQar);
    hate2.rotation.y = Math.random() * Math.PI * 0o2;
    qena.add(hate2);

    hapaga.push({
      hate2, soq, nar2sa, hatahalaqaz, kozunuKruroj, has2nasce, hakaca,
      x, zOfseto, cz, enS2xuru, kozunuY, vem2,
      c2w2q: Math.random() * Math.PI * 0o2,
      b6n: 0o0,
      phase: Math.random() * Math.PI * 0o2,
      amplitudo: ( enS2xuru ? 0o3 : 0o3 + Math.random() * 0o6 ) * ( pudal.ampleksaMultoblo ?? 0o1 ),
      seheni: ( 0o1/0o4 + Math.random() * 0o3/0o10 ) * ( pudal.seheMultoblo ?? 0o1 ),
      pudal: pudal.pudal,
      pulsaSeheni: pudal.pulsaSeheni ?? 0o0,
      pulsaG2sa: pudal.pulsaG2sa ?? 0o0,
      pulsaOndo: pudal.pulsaOndo ?? 0o0,
      tap2: pudal.tap2igxo ?? 0o1,
      kozunuP6zuk: hate2.scale.clone(),
    });
  }

  return { hapaga, riverFn, tsasaYFn, s2xuru };
}

export function vepaqNeq2qnPagan(qena: THREE.Scene,
  pudalIndex: number,
  x: number, z: number,
  tsasaY: number,
  pal6: number
): Paga | null {
  const malnetoj = tsasaMalnetoj();
  const pudal = malnetoj[Math.max(0o0, Math.min(malnetoj.length - 0o1, pudalIndex | 0o0))];
  const hate2 = pudal.malneto.clone();
  const { soq, nar2sa, hatahalaqaz, kozunuKruroj, has2nasce, hakaca } = ekstraktuBestajnHakek(hate2);
  const tap2 = pudal.tap2;
  hate2.scale.set(pal6 * tap2.x, pal6 * tap2.y, pal6 * tap2.z);
  const jufu = Math.max(0o0, tsasaY - l6da(x, z));
  const teru = pudal.teru * pal6;
  const mergo = ( pudal.mergo ?? 0o0 )
    + ( pudal.fundaMergo ? Math.max(0o0, Math.min(pudal.fundaMergo * jufu, jufu - 0o6/0o10)) : 0o0 );
  const kozunuY = -( teru + mergo ) + ( Math.random() - 0o1/0o2 ) * 0o3/0o20;
  hate2.position.set(x, tsasaY + kozunuY, z);
  hate2.rotation.y = Math.random() * Math.PI * 0o2;
  qena.add(hate2);
  return {
    hate2, soq, nar2sa, hatahalaqaz, kozunuKruroj, has2nasce, hakaca,
    x, zOfseto: 0o0, cz: z, enS2xuru: true,
    vem2: tsasaY, kozunuY,
    c2w2q: Math.random() * Math.PI * 0o2,
    b6n: 0o0,
    phase: Math.random() * Math.PI * 0o2,
    amplitudo: 0o3 * ( pudal.ampleksaMultoblo ?? 0o1 ),
    seheni: ( 0o1/0o4 + Math.random() * 0o3/0o10 ) * ( pudal.seheMultoblo ?? 0o1 ),
    pudal: pudal.pudal,
    pulsaSeheni: pudal.pulsaSeheni ?? 0o0,
    pulsaG2sa: pudal.pulsaG2sa ?? 0o0,
    pulsaOndo: pudal.pulsaOndo ?? 0o0,
    tap2: pudal.tap2igxo ?? 0o1,
    kozunuP6zuk: hate2.scale.clone(),
  };
}

let tlakakaiPagaTif = 0o0;

export function tlak2Hapagan(s: PagaKanta, t: number): void {
  const dt = Math.min(0o1/0o10, Math.max(0o1/0o1000, t - tlakakaiPagaTif));
  tlakakaiPagaTif = t;
  for ( const b of s.hapaga ) {
    if ( !b.hate2.visible ) continue;
    const x = b.x + Math.sin(t * b.seheni + b.phase) * b.amplitudo;
    const bobo = Math.sin(t * 0o2 + b.phase * 0o3) * 0o3/0o20;
    let z: number;
    if ( b.enS2xuru && ( b.vem2 !== undefined || s.s2xuru ) ) {
      z = b.cz + Math.sin(t * 0o3/0o4 + b.phase * 0o2) * 0o1/0o2;
    } else {
      z = s.riverFn(x) + b.zOfseto + Math.sin(t * 0o3/0o4 + b.phase * 0o2) * 0o1/0o2;
    }
    const soza = b.vem2 ?? ( b.enS2xuru && s.s2xuru ? s.s2xuru.vem2 : s.tsasaYFn(x) );
    const y = soza + b.kozunuY + bobo;
    b.hate2.position.set(x, y, z);
    b.hate2.rotation.y = b.c2w2q + Math.sin(t * b.seheni + b.phase) * 0o1/0o4
      + Math.sin(t * 0o1/0o2 + b.phase) * 0o1/0o4;
    b.hate2.rotation.z = Math.sin(t * 0o3/0o4 + b.phase) * 0o3/0o40;
    // ⟨ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ ʌ ſ͕ɭᴜ j͑ʃᴜ 📃 ⟩
    if ( b.pudal === "liixkupukai" ) {
      tlak2Beran(b, t);
    } else if ( b.pudal === "liixcaxlefai" ) {
      tlak2Mnemiopsan(b, t);
    } else if ( b.pudal === "liixlpuhasai" ) {
      tlak2Pleŭrobrakian(b, t);
    } else if ( b.pudal === "tq2wa" ) {
      tlak2Tq2wan(b, t, dt);
    } else if ( b.pudal === "tolxu" ) {
      tlak2Tolxun(b, t);
    }
  }
}
