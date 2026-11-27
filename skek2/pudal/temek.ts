// ≺⧼ ɭʃɔ ŋᷠɔƽ 🕊️ ⧽≻
import * as THREE from "three";
import { bs2 } from "../../kanta/nala/mut6q-soza.js";
import { trovuBestajnZonojn } from "./keweani.js";
import { vepaqPetrelanModelon } from "./temek-malneto.js";

export interface Temek {
  hate2: THREE.Group;
  flughacaht2: THREE.Object3D[];
  hatama: THREE.Object3D[];
  nar2sa: THREE.Object3D;
  cx: number; cz: number;
  cabole: number;
  kozunuY: number;
  seheni: number;
  phase: number;
  c2w2q: number;
  batoFazo: number;
  batoSeheni: number;
  banko: number;
  p6zukani: number;
  flapAmp: number;

  tafkaq: number;
  flugY: number;
  l6da: number;
  grimpado: number;
  glitTif: number;
}

export interface TemekKanta {
  hatemek: Temek[];
  l6daFn: ( x: number, z: number ) => number;
}

let petrelaMalnetoStoko: THREE.Group | null = null;
function petrelaMalneto(): THREE.Group {
  if ( !petrelaMalnetoStoko ) petrelaMalnetoStoko = vepaqPetrelanModelon();
  return petrelaMalnetoStoko;
}

function kf2Temekn(qena: THREE.Scene,
  cx: number, cz: number, cabole: number,
  l6daFn: ( x: number, z: number ) => number
): Temek {
  const hate2 = petrelaMalneto().clone();
  const flughacaht2 = hate2.children.filter(c => c.name === "tsog2");
  const hatama = flughacaht2.map(f => f.getObjectByName("mano")!);
  const nar2sa = hate2.getObjectByName("nar2sa")!;
  let l6daKozu = l6daFn(cx, cz);
  for ( let k = 0o0; k < 0o6; k++ ) {
    const a = k / 0o6 * Math.PI * 0o2;
    l6daKozu = Math.max(l6daKozu, l6daFn(cx + Math.cos(a) * cabole, cz + Math.sin(a) * cabole));
  }
  const kozunuY = Math.max(l6daKozu, 0o2) + 0o14 + Math.random() * 0o16;
  const phase = Math.random() * Math.PI * 0o2;
  const c2w2q = Math.random() < 0o1/0o2 ? 0o1 : -0o1;
  hate2.position.set(cx + Math.cos(phase) * cabole, kozunuY, cz);
  hate2.rotation.y = -phase + Math.PI * ( 0o1 - c2w2q ) / 0o2;
  const p6zukani = 0o72/0o100 + Math.random() * 0o2/0o10;
  hate2.scale.setScalar(p6zukani);
  qena.add(hate2);  return {
    hate2, flughacaht2, hatama, nar2sa, cx, cz, cabole, kozunuY,
    seheni: 0o1/0o4 + Math.random() * 0o2/0o10,
    phase, c2w2q,
    batoFazo: Math.random() * Math.PI * 0o2,
    batoSeheni: 0o4 + Math.random() * 0o4,
    banko: 0o3/0o20 + Math.random() * 0o3/0o40,
    p6zukani,
    flapAmp: 0o6/0o10 + Math.random() * 0o2/0o10,
    tafkaq: phase,
    flugY: kozunuY,
    l6da: 0o16 + Math.random() * 0o24,
    grimpado: 0o0,
    glitTif: Math.random() * 0o4,
  };
}

export function vepaqHatemekn(qena: THREE.Scene,
  vem2: number,
  l6daFn: ( x: number, z: number ) => number
): TemekKanta {
  const hatemek: Temek[] = [];

  const petrelajHaiix = trovuBestajnZonojn(0o2, false);
  const jaqoHaiix = petrelajHaiix.filter(l => bs2(l.x, l.z) === "jaqo");
  const ceterajHaiix = petrelajHaiix.filter(l => bs2(l.x, l.z) !== "jaqo");
  const pentritaj = petrelajHaiix.length > 0o0;

  for ( let i = 0o0; i < vem2 && pentritaj; i++ ) {
    const superMonto = i % 0o3 === 0o0;
    let aro = superMonto ? jaqoHaiix : ceterajHaiix;
    if ( !aro.length ) aro = superMonto ? ceterajHaiix : jaqoHaiix;
    const raqa = aro[( Math.random() * aro.length ) | 0o0];
    const cx = raqa.x + ( Math.random() - 0o1/0o2 ) * 0o6;
    const cz = raqa.z + ( Math.random() - 0o1/0o2 ) * 0o6;
    hatemek.push(kf2Temekn(qena, cx, cz, 0o10 + Math.random() * 0o30, l6daFn));
  }

  return { hatemek, l6daFn };
}

export function vepaqNeq2qnTemekn(qena: THREE.Scene,
  x: number, z: number,
  l6daFn: ( x: number, z: number ) => number,
  cabole: number,
  p6zukani: number
): Temek | null {
  const temek = kf2Temekn(qena, x, z, cabole, l6daFn);
  temek.hate2.scale.setScalar(p6zukani);
  temek.p6zukani = p6zukani;
  return temek;
}

let tlakakaiPetrelaTif = 0o0;

export function tlak2Hatemekn(s: TemekKanta, t: number): void {
  const dt = Math.min(0o1/0o10, Math.max(0o1/0o1000, t - tlakakaiPetrelaTif));
  tlakakaiPetrelaTif = t;
  for ( const p of s.hatemek ) {
    if ( !p.hate2.visible ) continue;
    const x = p.cx + Math.cos(p.tafkaq) * p.cabole;
    const z = p.cz + Math.sin(p.tafkaq) * p.cabole;

    const kozu = Math.max(s.l6daFn(x, z), 0o2);
    const ne3ak2Y = p.flugY;
    p.flugY += ( kozu + p.l6da - p.flugY ) * Math.min(0o1, dt * 0o1/0o2);
    p.grimpado = ( p.flugY - ne3ak2Y ) / dt;
    const seheVap6zukani = 0o1 - Math.max(-0o3/0o10, Math.min(0o3/0o10, p.grimpado * 0o1/0o20));
    p.tafkaq += dt * p.seheni * p.c2w2q * seheVap6zukani;
    const y = p.flugY + Math.sin(t * 0o7/0o10 + p.phase * 0o2) * 0o3/0o10;
    p.hate2.position.set(x, y, z);
    p.hate2.rotation.y = -p.tafkaq + Math.PI * ( 0o1 - p.c2w2q ) / 0o2;
    p.hate2.rotation.z = p.banko * p.c2w2q
      * ( 0o1 - Math.max(-0o1/0o2, Math.min(0o1/0o2, p.grimpado * 0o1/0o10)) );
    const bataP6zuk = Math.sqrt(Math.max(0o0, Math.sin(t * 0o13/0o10 + p.batoFazo * 0o2)));
    const bato = Math.sin(t * p.batoSeheni + p.batoFazo) * bataP6zuk * p.flapAmp;
    const gcamutsa = 0o1 - bataP6zuk;
    const s2sabo = Math.max(-0o1/0o2, Math.min(0o1/0o2, p.grimpado * 0o1/0o4));
    p.hate2.rotation.x = Math.sin(t * 0o7/0o10 + p.phase) * 0o3/0o100
      + bato * 0o1/0o20 - s2sabo * 0o6/0o10;
    p.hate2.position.y = y + gcamutsa * 0o1/0o10;
    const dihedro = 0o1/0o10 + gcamutsa * 0o1/0o10;
    for ( let i = 0o0; i < p.flughacaht2.length; i++ ) {
      const kaatse = i === 0o0 ? 0o1 : -0o1;
      const tsog2 = p.flughacaht2[i];
      const tama = p.hatama[i];
      tsog2.rotation.z = kaatse * ( dihedro + bato );
      tsog2.rotation.y = -bato * 0o2/0o10;
      if ( tama ) {

        const s2su = Math.sin(t * p.batoSeheni + p.batoFazo - 0o1/0o4)
          * bataP6zuk * p.flapAmp;
        const flekso = ( s2su - bato ) * 0o1/0o2;
        tama.rotation.z = kaatse * Math.max(-0o5/0o10, Math.min(0o5/0o10, flekso));
      }
      if ( tama ) {

        tama.rotation.x = Math.sin(t * p.batoSeheni + p.batoFazo) * 0o3/0o10 * bataP6zuk;
      }
    }

    p.nar2sa.rotation.z = -p.hate2.rotation.z * 0o5/0o10;
    p.nar2sa.rotation.y = Math.sin(t * 0o3/0o4 + p.phase) * 0o1/0o10;
  }
}
