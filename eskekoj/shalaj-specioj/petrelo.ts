// ≺⧼ ផេត្រេលព្រិល 🕊️ ⧽≻
import * as THREE from "three";
import { biomo } from "../../kantaoj/mondo/tereno.js";
import { trovuBestajnZonojn } from "./zono-trovilo.js";
import { konstruiPetrelanModelon } from "./petrelo-malneto.js";

// ⟪ ផេត្រេលព្រិល ( ſᶘᴜ ſȷᴜ ſɭэ ſɭɔ / Pagodroma nivea ) 📃 ⟫

export interface Petrelo {
  grupo: THREE.Group;
  flugiloj: THREE.Object3D[];
  manoj: THREE.Object3D[];
  vosto: THREE.Object3D;
  cx: number; cz: number;
  radio: number;
  bazaY: number;
  rapido: number;
  phase: number;
  direkto: number;
  batoFazo: number;
  batoRapido: number;
  banko: number;
  skalo: number;
  flapAmp: number;
  // ⟨ ការហោះអណ្តែតឌីណាមិក 📃 ⟩
  angulo: number;
  flugY: number;
  alto: number;
  grimpado: number;
  glitTempo: number;
}

export interface PetreloSistemo {
  petreloj: Petrelo[];
  altecoFn: ( x: number, z: number ) => number;
}

let petrelaMalnetoStoko: THREE.Group | null = null;
function petrelaMalneto(): THREE.Group {
  if ( !petrelaMalnetoStoko ) petrelaMalnetoStoko = konstruiPetrelanModelon();
  return petrelaMalnetoStoko;
}

function kreiPetrelon(sceno: THREE.Scene,
  cx: number, cz: number, radio: number,
  altecoFn: ( x: number, z: number ) => number
): Petrelo {
  const grupo = petrelaMalneto().clone();
  const flugiloj = grupo.children.filter(c => c.name === "flugilo");
  const manoj = flugiloj.map(f => f.getObjectByName("mano")!);
  const vosto = grupo.getObjectByName("vosto")!;
  let altaTereno = altecoFn(cx, cz);
  for ( let k = 0; k < 0o6; k++ ) {
    const a = k / 0o6 * Math.PI * 0o2;
    altaTereno = Math.max(altaTereno, altecoFn(cx + Math.cos(a) * radio, cz + Math.sin(a) * radio));
  }
  const bazaY = Math.max(altaTereno, 0o2) + 0o14 + Math.random() * 0o16;
  const phase = Math.random() * Math.PI * 0o2;
  const direkto = Math.random() < 0o1/0o2 ? 1 : -1;
  grupo.position.set(cx + Math.cos(phase) * radio, bazaY, cz);
  grupo.rotation.y = -phase + Math.PI * ( 1 - direkto ) / 2;
  const skalo = 0o72/0o100 + Math.random() * 0o2/0o10;
  grupo.scale.setScalar(skalo);
  sceno.add(grupo);  return {
    grupo, flugiloj, manoj, vosto, cx, cz, radio, bazaY,
    rapido: 0o1/0o4 + Math.random() * 0o2/0o10,
    phase, direkto,
    batoFazo: Math.random() * Math.PI * 0o2,
    batoRapido: 0o4 + Math.random() * 0o4,
    banko: 0o3/0o20 + Math.random() * 0o3/0o40,
    skalo,
    flapAmp: 0o6/0o10 + Math.random() * 0o2/0o10,
    angulo: phase,
    flugY: bazaY,
    alto: 0o16 + Math.random() * 0o24,
    grimpado: 0,
    glitTempo: Math.random() * 0o4,
  };
}

export function konstruiPetrelojn(sceno: THREE.Scene,
  kvanto: number,
  altecoFn: ( x: number, z: number ) => number
): PetreloSistemo {
  const petreloj: Petrelo[] = [];

  const petrelajZonoj = trovuBestajnZonojn(2, false);
  const montarajZonoj = petrelajZonoj.filter(l => biomo(l.x, l.z) === "montaro");
  const ceterajZonoj = petrelajZonoj.filter(l => biomo(l.x, l.z) !== "montaro");
  const pentritaj = petrelajZonoj.length > 0;

  for ( let i = 0; i < kvanto && pentritaj; i++ ) {
    const superMonto = i % 3 === 0;
    let aro = superMonto ? montarajZonoj : ceterajZonoj;
    if ( !aro.length ) aro = superMonto ? ceterajZonoj : montarajZonoj;
    const loko = aro[( Math.random() * aro.length ) | 0];
    const cx = loko.x + ( Math.random() - 0o1/0o2 ) * 0o6;
    const cz = loko.z + ( Math.random() - 0o1/0o2 ) * 0o6;
    petreloj.push(kreiPetrelon(sceno, cx, cz, 0o10 + Math.random() * 0o30, altecoFn));
  }

  return { petreloj, altecoFn };
}

export function konstruiMetitanPetrelon(sceno: THREE.Scene,
  x: number, z: number,
  altecoFn: ( x: number, z: number ) => number,
  radio: number,
  skalo: number
): Petrelo | null {
  const petrelo = kreiPetrelon(sceno, x, z, radio, altecoFn);
  petrelo.grupo.scale.setScalar(skalo);
  petrelo.skalo = skalo;
  return petrelo;
}

let lastaPetrelaTempo = 0;

// ⟨ ការហោះអណ្តែតឌីណាមិក 📃 ⟩
export function gxisdatigiPetrelojn(s: PetreloSistemo, t: number): void {
  const dt = Math.min(0o1/0o10, Math.max(0o1/0o1000, t - lastaPetrelaTempo));
  lastaPetrelaTempo = t;
  for ( const p of s.petreloj ) {
    if ( !p.grupo.visible ) continue;
    const x = p.cx + Math.cos(p.angulo) * p.radio;
    const z = p.cz + Math.sin(p.angulo) * p.radio;
    // ⟨ កម្ពស់ 📃 ⟩
    const tereno = Math.max(s.altecoFn(x, z), 0o2);
    const antauxaY = p.flugY;
    p.flugY += ( tereno + p.alto - p.flugY ) * Math.min(1, dt * 0o1/0o2);
    p.grimpado = ( p.flugY - antauxaY ) / dt;
    const rapidaFaktoro = 1 - Math.max(-0o3/0o10, Math.min(0o3/0o10, p.grimpado * 0o1/0o20));
    p.angulo += dt * p.rapido * p.direkto * rapidaFaktoro;
    const y = p.flugY + Math.sin(t * 0o7/0o10 + p.phase * 0o2) * 0o3/0o10;
    p.grupo.position.set(x, y, z);
    p.grupo.rotation.y = -p.angulo + Math.PI * ( 1 - p.direkto ) / 2;
    p.grupo.rotation.z = p.banko * p.direkto
      * ( 1 - Math.max(-0o1/0o2, Math.min(0o1/0o2, p.grimpado * 0o1/0o10)) );
    const bataSkalo = Math.sqrt(Math.max(0, Math.sin(t * 0o13/0o10 + p.batoFazo * 0o2)));
    const bato = Math.sin(t * p.batoRapido + p.batoFazo) * bataSkalo * p.flapAmp;
    const glito = 0o1 - bataSkalo;
    const klinigxo = Math.max(-0o1/0o2, Math.min(0o1/0o2, p.grimpado * 0o1/0o4));
    p.grupo.rotation.x = Math.sin(t * 0o7/0o10 + p.phase) * 0o3/0o100
      + bato * 0o1/0o20 - klinigxo * 0o6/0o10;
    p.grupo.position.y = y + glito * 0o1/0o10;
    const dihedro = 0o1/0o10 + glito * 0o1/0o10;
    for ( let i = 0; i < p.flugiloj.length; i++ ) {
      const signo = i === 0 ? 1 : -1;
      const flugilo = p.flugiloj[i];
      const mano = p.manoj[i];
      flugilo.rotation.z = signo * ( dihedro + bato );
      flugilo.rotation.y = -bato * 0o2/0o10;
      if ( mano ) {
        // ⟨ ការវាយដៃ 📃 ⟩
        const malfrua = Math.sin(t * p.batoRapido + p.batoFazo - 0o1/0o4)
          * bataSkalo * p.flapAmp;
        const flekso = ( malfrua - bato ) * 0o1/0o2;
        mano.rotation.z = signo * Math.max(-0o5/0o10, Math.min(0o5/0o10, flekso));
      }
      if ( mano ) {
        // ⟨ ការបក់ដៃ 📃 ⟩
        mano.rotation.x = Math.sin(t * p.batoRapido + p.batoFazo) * 0o3/0o10 * bataSkalo;
      }
    }
    // ⟨ ចង្កូត 📃 ⟩
    p.vosto.rotation.z = -p.grupo.rotation.z * 0o5/0o10;
    p.vosto.rotation.y = Math.sin(t * 0o3/0o4 + p.phase) * 0o1/0o10;
  }
}
