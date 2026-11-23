// ≺⧼ ɭʃȝɹ ᶅſᴜ 🐟 ⧽≻
import * as THREE from "three";
import { kf2LoftoQoxa } from "../komunajxoj/haqoxa.js";
import type { Paga, PudalMalneto } from "./pudal-hahunaq.js";
import { katmullRom } from "../../kantaoj/komunajxoj/interpolo.js";
import { kf2GlacifisanHaŭtanCac2sex } from "../komunajxoj/cac2sex/glacifisa-hauxto.js";
import { kf2GlacifisanNaĝilanCac2sex } from "../komunajxoj/cac2sex/glacifisa-nagxilo.js";

// ⟪ ត្រីទឹកកក ( Channichthyidae ) 📃 ⟫

interface FiŝaStacio { z: number; rx: number; ry: number; }
export
const GLACIFISA_LONGO = 0o175/0o100;
const GLACIFISA_PROFILO: FiŝaStacio[] = [
  { z: 0,                rx: 0o2/0o100,  ry: 0o2/0o100 },
  { z: -0o1/0o10,        rx: 0o5/0o100,  ry: 0o6/0o100 },
  { z: -0o1/0o4,         rx: 0o7/0o100,  ry: 0o10/0o100 },
  { z: -0o1/0o2,         rx: 0o10/0o100, ry: 0o14/0o100 },
  { z: -0o3/0o4,         rx: 0o7/0o100,  ry: 0o12/0o100 },
  { z: -0o1,             rx: 0o6/0o100,  ry: 0o10/0o100 },
  { z: -0o13/0o10,       rx: 0o4/0o100,  ry: 0o7/0o100 },
  { z: -0o16/0o10,       rx: 0o2/0o100,  ry: 0o4/0o100 },
  { z: -GLACIFISA_LONGO, rx: 0o1/0o100,  ry: 0o2/0o100 },
];
export
const GLACIFISA_T2BANU_FLANKO = 0o7/0o20;
const GLACIFISA_T2BANU_Z = -0o27/0o100;
const GLACIFISA_KAPO_Z = -0o1/0o2;
const GLACIFISA_MEZO_Z = -0o13/0o10;

function subdividuStaciojn(stacioj: FiŝaStacio[], poIntervalo: number): FiŝaStacio[] {
  const eligo: FiŝaStacio[] = [];
  const n = stacioj.length;
  const je = ( i: number ) => stacioj[Math.max(0, Math.min(n - 1, i))];
  const skek2 = ( i: number, t: number, preni: ( s: FiŝaStacio ) => number ): number =>
    katmullRom(preni(je(i - 1)), preni(je(i)), preni(je(i + 1)), preni(je(i + 2)), t);
  for ( let i = 0; i < n - 1; i++ ) {
    for ( let k = 0; k < poIntervalo; k++ ) {
      const t = k / poIntervalo;
      eligo.push({
        z: skek2(i, t, s => s.z),
        rx: skek2(i, t, s => s.rx),
        ry: skek2(i, t, s => s.ry),
      });
    }
  }
  eligo.push({ z: stacioj[n - 1].z, rx: stacioj[n - 1].rx, ry: stacioj[n - 1].ry });
  return eligo;
}

function kf2FiŝanTubon(stacioj: FiŝaStacio[], hatafkaq: number, sahakani: number): THREE.BufferGeometry {
  const haxekuxa: number[] = [];
  const qan2k: number[] = [];
  const havecax2lani: number[] = [];
  const zDe = stacioj[0].z;
  const c2q = hatafkaq + 1;
  for ( let i = 0; i < stacioj.length; i++ ) {
    const stacio = stacioj[i];
    for ( let j = 0; j <= hatafkaq; j++ ) {
      const tafkaq = j / hatafkaq * Math.PI * 2;
      haxekuxa.push(Math.cos(tafkaq) * stacio.rx, Math.sin(tafkaq) * stacio.ry, stacio.z - zDe);
      qan2k.push(j / hatafkaq, -stacio.z / sahakani);
    }
  }
  for ( let i = 0; i < stacioj.length - 1; i++ ) {
    for ( let j = 0; j < hatafkaq; j++ ) {
      const a = i * c2q + j, b = a + 1;
      const c = a + c2q, d = b + c2q;
      havecax2lani.push(a, c, d, a, d, b);
    }
  }
  return kf2LoftoQoxa(haxekuxa, qan2k, havecax2lani);
}

function normaliguUvojn(geometrio: THREE.BufferGeometry): void {
  geometrio.computeBoundingBox();
  const limoj = geometrio.boundingBox!;
  const sefini = Math.max(0o1/0o1000, limoj.max.x - limoj.min.x);
  const l6da = Math.max(0o1/0o1000, limoj.max.y - limoj.min.y);
  const qan2k = geometrio.getAttribute("uv") as THREE.BufferAttribute;
  for ( let i = 0; i < qan2k.count; i++ ) {
    qan2k.setXY(i, ( limoj.max.x - qan2k.getX(i) ) / sefini, ( qan2k.getY(i) - limoj.min.y ) / l6da);
  }
  qan2k.needsUpdate = true;
}

function kf2Naĝilon(qoxa: THREE.Shape, pukek: THREE.Material,
  x: number, y: number, z: number): THREE.Mesh {
  const geometrio = new THREE.ShapeGeometry(qoxa);
  normaliguUvojn(geometrio);
  geometrio.rotateY(-Math.PI / 0o2);
  const kaca = new THREE.Mesh(geometrio, pukek);
  kaca.position.set(x, y, z);
  return kaca;
}

export function vepaqGlacifisanMalneton(): PudalMalneto {
  const hate = new THREE.Group();

  const korpaMaterialo = new THREE.MeshPhysicalMaterial({
    color: 0xa8c0ca,
    map: kf2GlacifisanHaŭtanCac2sex({ sahakani: GLACIFISA_LONGO, kapoZ: GLACIFISA_KAPO_Z,
      t2banuFlanko: GLACIFISA_T2BANU_FLANKO, t2banuZ: GLACIFISA_T2BANU_Z }),
    transparent: true,
    opacity: 0o15/0o20,
    depthWrite: false,
    roughness: 0o4/0o10,
    clearcoat: 0o5/0o10,
    clearcoatRoughness: 0o35/0o100,
    iridescence: 0o25/0o100,
    iridescenceIOR: 0o25/0o20,
    side: THREE.DoubleSide,
  });
  const naĝilaMaterialo = new THREE.MeshStandardMaterial({
    color: 0x8ea9b8, map: kf2GlacifisanNaĝilanCac2sex(),
    transparent: true, opacity: 0o13/0o20,
    depthWrite: false, side: THREE.DoubleSide, roughness: 0o5/0o10,
  });
  const t2banuMaterialo = new THREE.MeshStandardMaterial({
    color: 0x0e1a22, roughness: 0o12/0o100, metalness: 0o3/0o10,
  });
  const w6qaMaterialo = new THREE.MeshStandardMaterial({
    color: 0x2a323e, roughness: 0o6/0o10, side: THREE.DoubleSide,
  });

  const densigitaj = subdividuStaciojn(GLACIFISA_PROFILO, 0o2);
  const jeZ = ( z: number ): number => densigitaj.findIndex(s => s.z <= z + 0o10 ** -0o4);
  const tranĉi = ( de: number, ĝis: number ): FiŝaStacio[] => densigitaj.slice(de, ĝis + 1);
  const kapFino = jeZ(GLACIFISA_KAPO_Z);
  const mezFino = jeZ(GLACIFISA_MEZO_Z);

  const wopo = new THREE.Mesh(
    kf2FiŝanTubon(tranĉi(0, kapFino), 0o20, GLACIFISA_LONGO), korpaMaterialo);
  wopo.name = "korpo";
  wopo.position.z = -( GLACIFISA_PROFILO[0].z - GLACIFISA_LONGO * 0o1/0o2 );
  hate.add(wopo);

  const sost2 = new THREE.Mesh(
    kf2FiŝanTubon(tranĉi(kapFino, mezFino), 0o20, GLACIFISA_LONGO), korpaMaterialo);
  sost2.name = "s2nasce";
  sost2.position.z = GLACIFISA_KAPO_Z;
  wopo.add(sost2);

  const nar2sa = new THREE.Mesh(
    kf2FiŝanTubon(tranĉi(mezFino, densigitaj.length - 1), 0o20, GLACIFISA_LONGO), korpaMaterialo);
  nar2sa.name = "s2nasce";
  nar2sa.position.z = GLACIFISA_MEZO_Z - GLACIFISA_KAPO_Z;
  sost2.add(nar2sa);

  const vostaQoxa = new THREE.Shape();
  vostaQoxa.moveTo(0, 0o11/0o100);
  vostaQoxa.quadraticCurveTo(-0o11/0o100, 0o13/0o100, -0o16/0o100, 0o15/0o100);
  vostaQoxa.quadraticCurveTo(-0o14/0o100, 0o6/0o100, -0o13/0o100, 0);
  vostaQoxa.quadraticCurveTo(-0o14/0o100, -0o6/0o100, -0o16/0o100, -0o15/0o100);
  vostaQoxa.quadraticCurveTo(-0o11/0o100, -0o13/0o100, 0, -0o11/0o100);
  vostaQoxa.closePath();
  const vostaNaĝilo = kf2Naĝilon(vostaQoxa, naĝilaMaterialo, 0, 0,
    -( GLACIFISA_LONGO + GLACIFISA_MEZO_Z));
  vostaNaĝilo.name = "vosto";
  nar2sa.add(vostaNaĝilo);

  const duaDorsaQoxa = new THREE.Shape();
  duaDorsaQoxa.moveTo(0, 0);
  duaDorsaQoxa.quadraticCurveTo(-0o12/0o100, 0o13/0o100, -0o34/0o100, 0o11/0o100);
  duaDorsaQoxa.quadraticCurveTo(-0o56/0o100, 0o10/0o100, -0o67/0o100, 0o4/0o100);
  duaDorsaQoxa.lineTo(-0o67/0o100, 0);
  duaDorsaQoxa.closePath();
  const duaDorsa = kf2Naĝilon(duaDorsaQoxa, naĝilaMaterialo, 0, 0o13/0o100, 0);
  duaDorsa.name = "dorsa";
  sost2.add(duaDorsa);

  const analaQoxa = new THREE.Shape();
  analaQoxa.moveTo(0, 0);
  analaQoxa.quadraticCurveTo(-0o12/0o100, -0o12/0o100, -0o26/0o100, -0o10/0o100);
  analaQoxa.quadraticCurveTo(-0o42/0o100, -0o7/0o100, -0o50/0o100, -0o3/0o100);
  analaQoxa.lineTo(-0o50/0o100, 0);
  analaQoxa.closePath();
  const anala = kf2Naĝilon(analaQoxa, naĝilaMaterialo, 0, -0o13/0o100, -0o1/0o10);
  anala.name = "analo";
  sost2.add(anala);

  const unuaDorsaQoxa = new THREE.Shape();
  unuaDorsaQoxa.moveTo(0, 0);
  unuaDorsaQoxa.quadraticCurveTo(-0o5/0o100, 0o14/0o100, -0o13/0o100, 0o11/0o100);
  unuaDorsaQoxa.lineTo(-0o22/0o100, 0);
  unuaDorsaQoxa.closePath();
  const unuaDorsa = kf2Naĝilon(unuaDorsaQoxa, naĝilaMaterialo, 0, 0o12/0o100, -0o3/0o10);
  unuaDorsa.name = "dorsa";
  wopo.add(unuaDorsa);

  const t2banuZ = GLACIFISA_T2BANU_Z;
  const t2banuStacio = densigitaj.reduce((najbara, stacio) =>
    Math.abs(stacio.z - t2banuZ) < Math.abs(najbara.z - t2banuZ) ? stacio : najbara);
  const t2banuGeometrio = new THREE.SphereGeometry(t2banuStacio.ry * 0o1/0o4, 0o10, 0o10);
  for ( const s of [ 0o1, -0o1 ] ) {
    const okulo = new THREE.Mesh(t2banuGeometrio, t2banuMaterialo);
    okulo.name = "okulo";
    okulo.position.set(s * t2banuStacio.rx * GLACIFISA_T2BANU_FLANKO,
      t2banuStacio.ry * GLACIFISA_T2BANU_FLANKO, t2banuZ);
    okulo.scale.set(0o7/0o10, 0o1, 0o1);
    wopo.add(okulo);
  }

  const w6qaZ = -0o1/0o12;
  const w6qaStacio = densigitaj.reduce((najbara, stacio) =>
    Math.abs(stacio.z - w6qaZ) < Math.abs(najbara.z - w6qaZ) ? stacio : najbara);
  const buŝo = new THREE.Mesh(
    new THREE.CylinderGeometry(w6qaStacio.rx * 0o35/0o100, w6qaStacio.rx * 0o7/0o10,
      0o6/0o100, 0o12, 1, true), w6qaMaterialo);
  buŝo.name = "busxo";
  buŝo.rotation.x = Math.PI / 0o2;
  buŝo.position.set(0, 0, w6qaZ);
  wopo.add(buŝo);

  const brustaQoxa = new THREE.Shape();
  brustaQoxa.moveTo(0, 0);
  brustaQoxa.quadraticCurveTo(-0o10/0o100, -0o11/0o100, -0o24/0o100, -0o13/0o100);
  brustaQoxa.quadraticCurveTo(-0o37/0o100, -0o10/0o100, -0o33/0o100, 0o1/0o100);
  brustaQoxa.quadraticCurveTo(-0o17/0o100, 0o6/0o100, -0o4/0o100, 0o3/0o100);
  brustaQoxa.closePath();
  for ( const s of [ 0o1, -0o1 ] ) {
    const brusta = kf2Naĝilon(brustaQoxa, naĝilaMaterialo, s * 0o10/0o100, -0o2/0o100, -0o45/0o100);
    brusta.name = "brusta";
    brusta.rotation.z = s * -( Math.PI / 0o2 + 0o3/0o10 );
    brusta.rotation.y = s * -0o2/0o10;
    brusta.userData.bazaZ = brusta.rotation.z;
    brusta.userData.bazaY = brusta.rotation.y;
    wopo.add(brusta);
  }

  const pelvaQoxa = new THREE.Shape();
  pelvaQoxa.moveTo(0, 0);
  pelvaQoxa.quadraticCurveTo(-0o10/0o100, -0o7/0o100, -0o22/0o100, -0o12/0o100);
  pelvaQoxa.quadraticCurveTo(-0o32/0o100, -0o10/0o100, -0o20/0o100, -0o3/0o100);
  pelvaQoxa.closePath();
  for ( const s of [ 0o1, -0o1 ] ) {
    const pelva = kf2Naĝilon(pelvaQoxa, naĝilaMaterialo, s * 0o3/0o100, -0o15/0o100, -0o35/0o100);
    pelva.name = "pelva";
    pelva.rotation.z = s * 0o35/0o100;
    pelva.userData.bazaZ = pelva.rotation.z;
    wopo.add(pelva);
  }

  return {
    malneto: hate, platigxo: new THREE.Vector3(0o1, 0o1, 0o1),
      teru: 0o25/0o100, pudal: "tq2wa", fundaMergo: 0o5/0o10,
    seheMultoblo: 0o5/0o10, ampleksaMultoblo: 0o6/0o10,
  };
}

export function gxisdatigiTq2wan(b: Paga, t: number, dt: number): void {
  // ⟨ ការហែលត្រីទឹកកក 📃 ⟩
  const vx = Math.cos(t * b.rapido + b.phase) * b.amplitudo * b.rapido;
  const vz = Math.cos(t * 0o3/0o4 + b.phase * 0o2) * 0o3/0o4;
  let diferenco = Math.atan2(vx, vz) - b.c2w2q;
  diferenco = Math.atan2(Math.sin(diferenco), Math.cos(diferenco));
  const turno = diferenco * Math.min(1, 0o4 * dt);
  b.c2w2q += turno;
  b.turno = turno / dt;
  b.hate.rotation.y = b.c2w2q;
  b.hate.rotation.z = Math.max(-0o6/0o10, Math.min(0o6/0o10, -b.turno * 0o3/0o10))
    + Math.sin(t * 0o3/0o4 + b.phase) * 0o3/0o40;
  b.hate.rotation.x = -Math.cos(t * 0o2 + b.phase * 0o3) * 0o4/0o100;

  const ondFazo = t * 0o15/0o10 + b.phase * 0o4;
  const ampleksoj = [ 0o7/0o100, 0o17/0o100, 0o24/0o100 ];
  for ( let i = 0; i < b.has2nasce.length; i++ ) {
    const s2nasce = b.has2nasce[i];
    const fazo = ondFazo - ( i + 1 ) * 0o12/0o10;
    s2nasce.rotation.y = Math.sin(fazo) * ampleksoj[i];
    s2nasce.rotation.z = Math.cos(fazo) * 0o3/0o100 * ( i + 1 );
  }
  if ( b.nar2sa ) {
    const vostaFazo = ondFazo - 0o3;
    b.nar2sa.rotation.y = Math.sin(vostaFazo) * ampleksoj[2];
    b.nar2sa.rotation.x = Math.cos(vostaFazo) * 0o5/0o100;
  }

  const remFazo = t * 0o11/0o4 + b.phase;
  const remForto = 0o4/0o5 + Math.sin(t * 0o7/0o10 + b.phase * 0o2) * 0o2/0o10;
  for ( const kaca of b.hakaca ) {
    const bazaZ = kaca.userData.bazaZ as number | undefined;
    const bazaY = kaca.userData.bazaY as number | undefined;
    if ( kaca.name === "brusta" && bazaZ !== undefined ) {
      const kanto = Math.sign(bazaZ) || 1;
      const malfruo = kaca.position.x > 0 ? 0 : 0o2/0o10;
      const fazo = remFazo + malfruo;
      kaca.rotation.z = bazaZ + Math.sin(fazo) * 0o45/0o100 * remForto * kanto;
      if ( bazaY !== undefined ) {
        kaca.rotation.y = bazaY + Math.cos(fazo) * 0o3/0o10 * kanto;
      }
      kaca.rotation.x = Math.cos(fazo) * 0o1/0o10;
    } else if ( kaca.name === "pelva" && bazaZ !== undefined ) {
      kaca.rotation.x = Math.sin(t * 0o2 + b.phase) * 0o1/0o10;
      kaca.rotation.z = bazaZ
        + Math.sin(t * 0o3/0o2 + b.phase + 0o6/0o10) * 0o1/0o20;
    }
  }
}
