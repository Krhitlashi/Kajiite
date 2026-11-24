// ≺⧼ ɭʃɔ ŋᷠɔƽ 🕊️ ⧽≻
import * as THREE from "three";
import { bs2 } from "../../kantaoj/mondo/tereno.js";
import { trovuBestajnZonojn } from "./zono-trovilo.js";
import { vepaqPetrelanModelon } from "./temek-malneto.js";

// ⟪ ſᶘɜ ſ͔ɭɹ , ſᶘᴜ ſȷᴜ ſɭэ ſɭɔ , ꞙɭı ( ſᶘᴜ ſȷᴜ ſɭэ ſɭɔ / Pagodroma nivea ) 📃 ⟫

export interface Temek {
  hate: THREE.Group;
  flugiloj: THREE.Object3D[];
  manoj: THREE.Object3D[];
  nar2sa: THREE.Object3D;
  cx: number; cz: number;
  radio: number;
  bazaY: number;
  rapido: number;
  phase: number;
  c2w2q: number;
  batoFazo: number;
  batoRapido: number;
  banko: number;
  p6zukani: number;
  flapAmp: number;
  // ⟨ j͑ʃɹ }ʃɹ ɭʃᴜ , j͑ʃᴜ ſɭᴜ , ⟅ ⟩
  tafkaq: number;
  flugY: number;
  l6da: number;
  grimpado: number;
  glitTempo: number;
}

export interface TemekSistemo {
  hatemek: Temek[];
  altecoFn: ( x: number, z: number ) => number;
}

let petrelaMalnetoStoko: THREE.Group | null = null;
function petrelaMalneto(): THREE.Group {
  if ( !petrelaMalnetoStoko ) petrelaMalnetoStoko = vepaqPetrelanModelon();
  return petrelaMalnetoStoko;
}

function kf2Temekn(qena: THREE.Scene,
  cx: number, cz: number, radio: number,
  altecoFn: ( x: number, z: number ) => number
): Temek {
  const hate = petrelaMalneto().clone();
  const flugiloj = hate.children.filter(c => c.name === "flugilo");
  const manoj = flugiloj.map(f => f.getObjectByName("mano")!);
  const nar2sa = hate.getObjectByName("vosto")!;
  let altaTereno = altecoFn(cx, cz);
  for ( let k = 0; k < 0o6; k++ ) {
    const a = k / 0o6 * Math.PI * 0o2;
    altaTereno = Math.max(altaTereno, altecoFn(cx + Math.cos(a) * radio, cz + Math.sin(a) * radio));
  }
  const bazaY = Math.max(altaTereno, 0o2) + 0o14 + Math.random() * 0o16;
  const phase = Math.random() * Math.PI * 0o2;
  const c2w2q = Math.random() < 0o1/0o2 ? 1 : -1;
  hate.position.set(cx + Math.cos(phase) * radio, bazaY, cz);
  hate.rotation.y = -phase + Math.PI * ( 1 - c2w2q ) / 2;
  const p6zukani = 0o72/0o100 + Math.random() * 0o2/0o10;
  hate.scale.setScalar(p6zukani);
  qena.add(hate);  return {
    hate, flugiloj, manoj, nar2sa, cx, cz, radio, bazaY,
    rapido: 0o1/0o4 + Math.random() * 0o2/0o10,
    phase, c2w2q,
    batoFazo: Math.random() * Math.PI * 0o2,
    batoRapido: 0o4 + Math.random() * 0o4,
    banko: 0o3/0o20 + Math.random() * 0o3/0o40,
    p6zukani,
    flapAmp: 0o6/0o10 + Math.random() * 0o2/0o10,
    tafkaq: phase,
    flugY: bazaY,
    l6da: 0o16 + Math.random() * 0o24,
    grimpado: 0,
    glitTempo: Math.random() * 0o4,
  };
}

export function vepaqHatemekn(qena: THREE.Scene,
  vem2: number,
  altecoFn: ( x: number, z: number ) => number
): TemekSistemo {
  const hatemek: Temek[] = [];

  const petrelajZonoj = trovuBestajnZonojn(2, false);
  const montarajZonoj = petrelajZonoj.filter(l => bs2(l.x, l.z) === "montaro");
  const ceterajZonoj = petrelajZonoj.filter(l => bs2(l.x, l.z) !== "montaro");
  const pentritaj = petrelajZonoj.length > 0;

  for ( let i = 0; i < vem2 && pentritaj; i++ ) {
    const superMonto = i % 3 === 0;
    let aro = superMonto ? montarajZonoj : ceterajZonoj;
    if ( !aro.length ) aro = superMonto ? ceterajZonoj : montarajZonoj;
    const raqa = aro[( Math.random() * aro.length ) | 0];
    const cx = raqa.x + ( Math.random() - 0o1/0o2 ) * 0o6;
    const cz = raqa.z + ( Math.random() - 0o1/0o2 ) * 0o6;
    hatemek.push(kf2Temekn(qena, cx, cz, 0o10 + Math.random() * 0o30, altecoFn));
  }

  return { hatemek, altecoFn };
}

export function vepaqMetitanTemekn(qena: THREE.Scene,
  x: number, z: number,
  altecoFn: ( x: number, z: number ) => number,
  radio: number,
  p6zukani: number
): Temek | null {
  const temek = kf2Temekn(qena, x, z, radio, altecoFn);
  temek.hate.scale.setScalar(p6zukani);
  temek.p6zukani = p6zukani;
  return temek;
}

let lastaPetrelaTempo = 0;

// ⟨ j͑ʃɹ }ʃɹ ɭʃᴜ , j͑ʃᴜ ſɭᴜ , ⟅ ⟩
export function gxisdatigiHatemekn(s: TemekSistemo, t: number): void {
  const dt = Math.min(0o1/0o10, Math.max(0o1/0o1000, t - lastaPetrelaTempo));
  lastaPetrelaTempo = t;
  for ( const p of s.hatemek ) {
    if ( !p.hate.visible ) continue;
    const x = p.cx + Math.cos(p.tafkaq) * p.radio;
    const z = p.cz + Math.sin(p.tafkaq) * p.radio;
    // ⟨ j͐ʃэ ɭ(ᴜ , ⟅ ⟩
    const tereno = Math.max(s.altecoFn(x, z), 0o2);
    const antauxaY = p.flugY;
    p.flugY += ( tereno + p.l6da - p.flugY ) * Math.min(1, dt * 0o1/0o2);
    p.grimpado = ( p.flugY - antauxaY ) / dt;
    const seheFaktoro = 1 - Math.max(-0o3/0o10, Math.min(0o3/0o10, p.grimpado * 0o1/0o20));
    p.tafkaq += dt * p.rapido * p.c2w2q * seheFaktoro;
    const y = p.flugY + Math.sin(t * 0o7/0o10 + p.phase * 0o2) * 0o3/0o10;
    p.hate.position.set(x, y, z);
    p.hate.rotation.y = -p.tafkaq + Math.PI * ( 1 - p.c2w2q ) / 2;
    p.hate.rotation.z = p.banko * p.c2w2q
      * ( 1 - Math.max(-0o1/0o2, Math.min(0o1/0o2, p.grimpado * 0o1/0o10)) );
    const bataSkalo = Math.sqrt(Math.max(0, Math.sin(t * 0o13/0o10 + p.batoFazo * 0o2)));
    const bato = Math.sin(t * p.batoRapido + p.batoFazo) * bataSkalo * p.flapAmp;
    const glito = 0o1 - bataSkalo;
    const klinigxo = Math.max(-0o1/0o2, Math.min(0o1/0o2, p.grimpado * 0o1/0o4));
    p.hate.rotation.x = Math.sin(t * 0o7/0o10 + p.phase) * 0o3/0o100
      + bato * 0o1/0o20 - klinigxo * 0o6/0o10;
    p.hate.position.y = y + glito * 0o1/0o10;
    const dihedro = 0o1/0o10 + glito * 0o1/0o10;
    for ( let i = 0; i < p.flugiloj.length; i++ ) {
      const signo = i === 0 ? 1 : -1;
      const flugilo = p.flugiloj[i];
      const mano = p.manoj[i];
      flugilo.rotation.z = signo * ( dihedro + bato );
      flugilo.rotation.y = -bato * 0o2/0o10;
      if ( mano ) {
        // ⟨ ſᶘɜ ſ͔ɭɹ , j͑ʃᴜ ſןɹ , ⟅ ⟩
        const malfrua = Math.sin(t * p.batoRapido + p.batoFazo - 0o1/0o4)
          * bataSkalo * p.flapAmp;
        const flekso = ( malfrua - bato ) * 0o1/0o2;
        mano.rotation.z = signo * Math.max(-0o5/0o10, Math.min(0o5/0o10, flekso));
      }
      if ( mano ) {
        // ⟨ ſᶘɜ ſ͔ɭɹ , ı],э ŋᷠꞇ , ⟅ ⟩
        mano.rotation.x = Math.sin(t * p.batoRapido + p.batoFazo) * 0o3/0o10 * bataSkalo;
      }
    }
    // ⟨ ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ , ⟅ ⟩
    p.nar2sa.rotation.z = -p.hate.rotation.z * 0o5/0o10;
    p.nar2sa.rotation.y = Math.sin(t * 0o3/0o4 + p.phase) * 0o1/0o10;
  }
}
