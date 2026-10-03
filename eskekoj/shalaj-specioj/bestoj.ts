// ≺⧼ សត្វ 🐾 ⧽≻
// ⟨ ប្រភេទនីមួយៗនៅក្នុងឯកសារផ្ទាល់ខ្លួន 📃 ⟩
import * as THREE from "three";
import { alteco, akvaNivelo, biomo, cxuEnLago } from "../../kantaoj/mondo/tereno.js";
import type { Besto, BestoSistemo, SpecoMalneto } from "./speco-tipoj.js";
import { kreiKombovicanTeksajxon } from "../komunajxoj/teksajxoj/kombovico.js";
import { trovuBestajnZonojn } from "./zono-trovilo.js";
import { konstruiMalneton as konstruiBeranMalneton, gxisdatigiBeran } from "./beroe.js";
import { konstruiMalneton as konstruiMnemiopsanMalneton, gxisdatigiMnemiopsan } from "./mnemiopsis.js";
import { konstruiMalneton as konstruiPleŭrobrakianMalneton,
  gxisdatigiPleŭrobrakian } from "./pleurobrakia.js";
import { konstruiGlacifisanMalneton, gxisdatigiGlacifison } from "./glacifiso.js";
import { konstruiMarlaraksxanMalneton, gxisdatigiMarlaraksxon } from "./marlaraksxo.js";
import { gxisdatigiPetrelojn, konstruiMetitanPetrelon, konstruiPetrelojn } from "./petrelo.js";
import type { Petrelo, PetreloSistemo } from "./petrelo.js";

export type { Besto, BestoSistemo, SpecoMalneto } from "./speco-tipoj.js";
export { gxisdatigiPetrelojn, konstruiMetitanPetrelon, konstruiPetrelojn };
export type { Petrelo, PetreloSistemo };

let akvajMalnetojStoko: SpecoMalneto[] | null = null;
function akvajMalnetoj(): SpecoMalneto[] {
  if ( !akvajMalnetojStoko ) {
    const teksajxo = kreiKombovicanTeksajxon();
    akvajMalnetojStoko = [
      konstruiBeranMalneton(teksajxo),
      konstruiMnemiopsanMalneton(teksajxo),
      konstruiPleŭrobrakianMalneton(teksajxo),
      konstruiGlacifisanMalneton(),
      konstruiMarlaraksxanMalneton(),
    ];
  }
  return akvajMalnetojStoko;
}

function ekstraktuBestajnPartojn(grupo: THREE.Group) {
  const korpo = grupo.getObjectByName("korpo") as THREE.Mesh;
  const vosto = grupo.getObjectByName("vosto") as THREE.Object3D | undefined;
  const animajxoj = grupo.children.filter(c => c !== korpo && c !== vosto);
  const segmentoj: THREE.Object3D[] = [];
  grupo.traverse(o => { if (o.name === "segmento" ) segmentoj.push(o); });
  const naĝiloj: THREE.Object3D[] = [];
  grupo.traverse(o => {
    if ( o.name === "dorsa" || o.name === "analo" || o.name === "brusta" || o.name === "pelva" ) {
      naĝiloj.push(o);
    }
  });
  const bazajKruroj = animajxoj
    .filter(parto => parto.name === "kruro").map(kruro => {
      const genuo = kruro.children.find(c => c.name === "genuo");
      const flanko = ( kruro.userData.flanko as number | undefined ) ?? 1;
      return {
        kruro,
        q: kruro.quaternion.clone(),
        ankro: kruro.position.clone(),
        genuo,
        flanko,
      };
    });
  return { korpo, vosto, animajxoj, bazajKruroj, segmentoj, naĝiloj };
}

export function konstruiBestojn(sceno: THREE.Scene,
  kvanto: number,
  riverFn: ( x: number ) => number,
  akvoYFn: ( x: number ) => number,
  lago?: { x: number; z: number; r: number; nivelo: number }
): BestoSistemo {
  const bestoj: Besto[] = [];
  const malnetoj = akvajMalnetoj();

  const akvajZonoj = trovuBestajnZonojn(1, true);
  const pentritaj = akvajZonoj.length > 0;

  for ( let i = 0; i < kvanto && pentritaj; i++ ) {
    const loko = akvajZonoj[( Math.random() * akvajZonoj.length ) | 0];
    const enLago = !!lago && cxuEnLago(loko.x, loko.z);
    let x = 0, zOfseto = 0, cz = 0;
    if ( enLago ) {
      x = loko.x + ( Math.random() - 0o1/0o2 ) * 0o6;
      cz = loko.z + ( Math.random() - 0o1/0o2 ) * 0o6;
    } else {
      x = loko.x;
      zOfseto = loko.z - riverFn(loko.x);
    }
    const zAkvo = enLago ? cz : riverFn(x) + zOfseto;
    const speco = biomo(x, zAkvo) === "montaro"
      ? malnetoj[3 + ( Math.random() < 0o1/0o2 ? 0 : 1 )]
      : malnetoj[( Math.random() * malnetoj.length ) | 0];
    const grupo = speco.malneto.clone();
    const { korpo, vosto, animajxoj, bazajKruroj, segmentoj, naĝiloj } = ekstraktuBestajnPartojn(grupo);
    const platigxo = speco.platigxo;
    const grandeco = 0o1/0o2 + Math.random() * 0o3/0o4;
    grupo.scale.set(grandeco * platigxo.x, grandeco * platigxo.y, grandeco * platigxo.z);
    const zLoko = enLago ? cz : riverFn(x) + zOfseto;
    const nivelo = akvaNivelo(x, zLoko);
    const profundo = Math.max(0, nivelo - alteco(x, zLoko));
    const supro = speco.supro * grandeco;
    const mergo = ( speco.mergo ?? 0 )
      + ( speco.fundaMergo ? Math.max(0, Math.min(speco.fundaMergo * profundo, profundo - 0o6/0o10)) : 0 );
    const bazaY = -( supro + mergo ) + ( Math.random() - 0o1/0o2 ) * 0o3/0o20;
    grupo.position.set(x, nivelo + bazaY, zLoko);
    grupo.rotation.y = Math.random() * Math.PI * 0o2;
    sceno.add(grupo);

    bestoj.push({
      grupo, korpo, vosto, animajxoj, bazajKruroj, segmentoj, naĝiloj,
      x, zOfseto, cz, enLago, bazaY, nivelo,
      direkto: Math.random() * Math.PI * 0o2,
      turno: 0,
      phase: Math.random() * Math.PI * 0o2,
      amplitudo: ( enLago ? 0o3 : 0o3 + Math.random() * 0o6 ) * ( speco.ampleksaMultoblo ?? 0o1 ),
      rapido: ( 0o1/0o4 + Math.random() * 0o3/0o10 ) * ( speco.rapidaMultoblo ?? 0o1 ),
      speco: speco.speco,
      pulsaRapido: speco.pulsaRapido ?? 0,
      pulsaForto: speco.pulsaForto ?? 0,
      pulsaOndo: speco.pulsaOndo ?? 0,
      plata: speco.plata ?? 1,
      bazaSkalo: grupo.scale.clone(),
    });
  }

  return { bestoj, riverFn, akvoYFn, lago };
}

export function konstruiMetitanBeston(sceno: THREE.Scene,
  specoIndex: number,
  x: number, z: number,
  akvoY: number,
  grandeco: number
): Besto | null {
  const malnetoj = akvajMalnetoj();
  const speco = malnetoj[Math.max(0, Math.min(malnetoj.length - 1, specoIndex | 0))];
  const grupo = speco.malneto.clone();
  const { korpo, vosto, animajxoj, bazajKruroj, segmentoj, naĝiloj } = ekstraktuBestajnPartojn(grupo);
  const platigxo = speco.platigxo;
  grupo.scale.set(grandeco * platigxo.x, grandeco * platigxo.y, grandeco * platigxo.z);
  const profundo = Math.max(0, akvoY - alteco(x, z));
  const supro = speco.supro * grandeco;
  const mergo = ( speco.mergo ?? 0 )
    + ( speco.fundaMergo ? Math.max(0, Math.min(speco.fundaMergo * profundo, profundo - 0o6/0o10)) : 0 );
  const bazaY = -( supro + mergo ) + ( Math.random() - 0o1/0o2 ) * 0o3/0o20;
  grupo.position.set(x, akvoY + bazaY, z);
  grupo.rotation.y = Math.random() * Math.PI * 0o2;
  sceno.add(grupo);
  return {
    grupo, korpo, vosto, animajxoj, bazajKruroj, segmentoj, naĝiloj,
    x, zOfseto: 0, cz: z, enLago: true,
    nivelo: akvoY, bazaY,
    direkto: Math.random() * Math.PI * 0o2,
    turno: 0,
    phase: Math.random() * Math.PI * 0o2,
    amplitudo: 0o3 * ( speco.ampleksaMultoblo ?? 0o1 ),
    rapido: ( 0o1/0o4 + Math.random() * 0o3/0o10 ) * ( speco.rapidaMultoblo ?? 0o1 ),
    speco: speco.speco,
    pulsaRapido: speco.pulsaRapido ?? 0,
    pulsaForto: speco.pulsaForto ?? 0,
    pulsaOndo: speco.pulsaOndo ?? 0,
    plata: speco.plata ?? 1,
    bazaSkalo: grupo.scale.clone(),
  };
}

let lastaBestoTempo = 0;

export function gxisdatigiBestojn(s: BestoSistemo, t: number): void {
  const dt = Math.min(0o1/0o10, Math.max(0o1/0o1000, t - lastaBestoTempo));
  lastaBestoTempo = t;
  for ( const b of s.bestoj ) {
    if ( !b.grupo.visible ) continue;
    const x = b.x + Math.sin(t * b.rapido + b.phase) * b.amplitudo;
    const bobo = Math.sin(t * 0o2 + b.phase * 0o3) * 0o3/0o20;
    let z: number;
    if ( b.enLago && ( b.nivelo !== undefined || s.lago ) ) {
      z = b.cz + Math.sin(t * 0o3/0o4 + b.phase * 0o2) * 0o1/0o2;
    } else {
      z = s.riverFn(x) + b.zOfseto + Math.sin(t * 0o3/0o4 + b.phase * 0o2) * 0o1/0o2;
    }
    const surfaco = b.nivelo ?? ( b.enLago && s.lago ? s.lago.nivelo : s.akvoYFn(x) );
    const y = surfaco + b.bazaY + bobo;
    b.grupo.position.set(x, y, z);
    b.grupo.rotation.y = b.direkto + Math.sin(t * b.rapido + b.phase) * 0o1/0o4
      + Math.sin(t * 0o1/0o2 + b.phase) * 0o1/0o4;
    b.grupo.rotation.z = Math.sin(t * 0o3/0o4 + b.phase) * 0o3/0o40;
    // ⟨ ចលនាតាមប្រភេទ 📃 ⟩
    if ( b.speco === "beroe" ) {
      gxisdatigiBeran(b, t);
    } else if ( b.speco === "mnemiopsis" ) {
      gxisdatigiMnemiopsan(b, t);
    } else if ( b.speco === "pleurobrakia" ) {
      gxisdatigiPleŭrobrakian(b, t);
    } else if ( b.speco === "glacifiso" ) {
      gxisdatigiGlacifison(b, t, dt);
    } else if ( b.speco === "marlaraksxo" ) {
      gxisdatigiMarlaraksxon(b, t);
    }
  }
}
