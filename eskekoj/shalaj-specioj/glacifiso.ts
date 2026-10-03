// ≺⧼ ត្រីទឹកកក 🐟 ⧽≻
import * as THREE from "three";
import { kreiLoftanGeometrion } from "../komunajxoj/formoj.js";
import type { Besto, SpecoMalneto } from "./speco-tipoj.js";
import { katmullRom } from "../../kantaoj/komunajxoj/interpolo.js";
import { kreiGlacifisanHaŭtanTeksajxon } from "../komunajxoj/teksajxoj/glacifisa-hauxto.js";
import { kreiGlacifisanNaĝilanTeksajxon } from "../komunajxoj/teksajxoj/glacifisa-nagxilo.js";

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
const GLACIFISA_OKULA_FLANKO = 0o7/0o20;
const GLACIFISA_OKULA_Z = -0o27/0o100;
const GLACIFISA_KAPO_Z = -0o1/0o2;
const GLACIFISA_MEZO_Z = -0o13/0o10;

function subdividuStaciojn(stacioj: FiŝaStacio[], poIntervalo: number): FiŝaStacio[] {
  const eligo: FiŝaStacio[] = [];
  const n = stacioj.length;
  const je = ( i: number ) => stacioj[Math.max(0, Math.min(n - 1, i))];
  const valoro = ( i: number, t: number, preni: ( s: FiŝaStacio ) => number ): number =>
    katmullRom(preni(je(i - 1)), preni(je(i)), preni(je(i + 1)), preni(je(i + 2)), t);
  for ( let i = 0; i < n - 1; i++ ) {
    for ( let k = 0; k < poIntervalo; k++ ) {
      const t = k / poIntervalo;
      eligo.push({
        z: valoro(i, t, s => s.z),
        rx: valoro(i, t, s => s.rx),
        ry: valoro(i, t, s => s.ry),
      });
    }
  }
  eligo.push({ z: stacioj[n - 1].z, rx: stacioj[n - 1].rx, ry: stacioj[n - 1].ry });
  return eligo;
}

function kreiFiŝanTubon(stacioj: FiŝaStacio[], anguloj: number, longo: number): THREE.BufferGeometry {
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const indeksoj: number[] = [];
  const zDe = stacioj[0].z;
  const ringo = anguloj + 1;
  for ( let i = 0; i < stacioj.length; i++ ) {
    const stacio = stacioj[i];
    for ( let j = 0; j <= anguloj; j++ ) {
      const angulo = j / anguloj * Math.PI * 2;
      pozicioj.push(Math.cos(angulo) * stacio.rx, Math.sin(angulo) * stacio.ry, stacio.z - zDe);
      uvoj.push(j / anguloj, -stacio.z / longo);
    }
  }
  for ( let i = 0; i < stacioj.length - 1; i++ ) {
    for ( let j = 0; j < anguloj; j++ ) {
      const a = i * ringo + j, b = a + 1;
      const c = a + ringo, d = b + ringo;
      indeksoj.push(a, c, d, a, d, b);
    }
  }
  return kreiLoftanGeometrion(pozicioj, uvoj, indeksoj);
}

function normaliguUvojn(geometrio: THREE.BufferGeometry): void {
  geometrio.computeBoundingBox();
  const limoj = geometrio.boundingBox!;
  const largho = Math.max(0o1/0o1000, limoj.max.x - limoj.min.x);
  const alto = Math.max(0o1/0o1000, limoj.max.y - limoj.min.y);
  const uvoj = geometrio.getAttribute("uv") as THREE.BufferAttribute;
  for ( let i = 0; i < uvoj.count; i++ ) {
    uvoj.setXY(i, ( limoj.max.x - uvoj.getX(i) ) / largho, ( uvoj.getY(i) - limoj.min.y ) / alto);
  }
  uvoj.needsUpdate = true;
}

function kreiNaĝilon(formo: THREE.Shape, materialo: THREE.Material,
  x: number, y: number, z: number): THREE.Mesh {
  const geometrio = new THREE.ShapeGeometry(formo);
  normaliguUvojn(geometrio);
  geometrio.rotateY(-Math.PI / 0o2);
  const naĝilo = new THREE.Mesh(geometrio, materialo);
  naĝilo.position.set(x, y, z);
  return naĝilo;
}

export function konstruiGlacifisanMalneton(): SpecoMalneto {
  const grupo = new THREE.Group();

  const korpaMaterialo = new THREE.MeshPhysicalMaterial({
    color: 0xa8c0ca,
    map: kreiGlacifisanHaŭtanTeksajxon({ longo: GLACIFISA_LONGO, kapoZ: GLACIFISA_KAPO_Z,
      okulaFlanko: GLACIFISA_OKULA_FLANKO, okulaZ: GLACIFISA_OKULA_Z }),
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
    color: 0x8ea9b8, map: kreiGlacifisanNaĝilanTeksajxon(),
    transparent: true, opacity: 0o13/0o20,
    depthWrite: false, side: THREE.DoubleSide, roughness: 0o5/0o10,
  });
  const okulaMaterialo = new THREE.MeshStandardMaterial({
    color: 0x0e1a22, roughness: 0o12/0o100, metalness: 0o3/0o10,
  });
  const buŝaMaterialo = new THREE.MeshStandardMaterial({
    color: 0x2a323e, roughness: 0o6/0o10, side: THREE.DoubleSide,
  });

  const densigitaj = subdividuStaciojn(GLACIFISA_PROFILO, 0o2);
  const jeZ = ( z: number ): number => densigitaj.findIndex(s => s.z <= z + 0o1/0o10000);
  const tranĉi = ( de: number, ĝis: number ): FiŝaStacio[] => densigitaj.slice(de, ĝis + 1);
  const kapFino = jeZ(GLACIFISA_KAPO_Z);
  const mezFino = jeZ(GLACIFISA_MEZO_Z);

  const kapo = new THREE.Mesh(
    kreiFiŝanTubon(tranĉi(0, kapFino), 0o20, GLACIFISA_LONGO), korpaMaterialo);
  kapo.name = "korpo";
  kapo.position.z = -( GLACIFISA_PROFILO[0].z - GLACIFISA_LONGO * 0o1/0o2 );
  grupo.add(kapo);

  const mezo = new THREE.Mesh(
    kreiFiŝanTubon(tranĉi(kapFino, mezFino), 0o20, GLACIFISA_LONGO), korpaMaterialo);
  mezo.name = "segmento";
  mezo.position.z = GLACIFISA_KAPO_Z;
  kapo.add(mezo);

  const vosto = new THREE.Mesh(
    kreiFiŝanTubon(tranĉi(mezFino, densigitaj.length - 1), 0o20, GLACIFISA_LONGO), korpaMaterialo);
  vosto.name = "segmento";
  vosto.position.z = GLACIFISA_MEZO_Z - GLACIFISA_KAPO_Z;
  mezo.add(vosto);

  const vostaFormo = new THREE.Shape();
  vostaFormo.moveTo(0, 0o11/0o100);
  vostaFormo.quadraticCurveTo(-0o11/0o100, 0o13/0o100, -0o16/0o100, 0o15/0o100);
  vostaFormo.quadraticCurveTo(-0o14/0o100, 0o6/0o100, -0o13/0o100, 0);
  vostaFormo.quadraticCurveTo(-0o14/0o100, -0o6/0o100, -0o16/0o100, -0o15/0o100);
  vostaFormo.quadraticCurveTo(-0o11/0o100, -0o13/0o100, 0, -0o11/0o100);
  vostaFormo.closePath();
  const vostaNaĝilo = kreiNaĝilon(vostaFormo, naĝilaMaterialo, 0, 0,
    -( GLACIFISA_LONGO + GLACIFISA_MEZO_Z));
  vostaNaĝilo.name = "vosto";
  vosto.add(vostaNaĝilo);

  const duaDorsaFormo = new THREE.Shape();
  duaDorsaFormo.moveTo(0, 0);
  duaDorsaFormo.quadraticCurveTo(-0o12/0o100, 0o13/0o100, -0o34/0o100, 0o11/0o100);
  duaDorsaFormo.quadraticCurveTo(-0o56/0o100, 0o10/0o100, -0o67/0o100, 0o4/0o100);
  duaDorsaFormo.lineTo(-0o67/0o100, 0);
  duaDorsaFormo.closePath();
  const duaDorsa = kreiNaĝilon(duaDorsaFormo, naĝilaMaterialo, 0, 0o13/0o100, 0);
  duaDorsa.name = "dorsa";
  mezo.add(duaDorsa);

  const analaFormo = new THREE.Shape();
  analaFormo.moveTo(0, 0);
  analaFormo.quadraticCurveTo(-0o12/0o100, -0o12/0o100, -0o26/0o100, -0o10/0o100);
  analaFormo.quadraticCurveTo(-0o42/0o100, -0o7/0o100, -0o50/0o100, -0o3/0o100);
  analaFormo.lineTo(-0o50/0o100, 0);
  analaFormo.closePath();
  const anala = kreiNaĝilon(analaFormo, naĝilaMaterialo, 0, -0o13/0o100, -0o1/0o10);
  anala.name = "analo";
  mezo.add(anala);

  const unuaDorsaFormo = new THREE.Shape();
  unuaDorsaFormo.moveTo(0, 0);
  unuaDorsaFormo.quadraticCurveTo(-0o5/0o100, 0o14/0o100, -0o13/0o100, 0o11/0o100);
  unuaDorsaFormo.lineTo(-0o22/0o100, 0);
  unuaDorsaFormo.closePath();
  const unuaDorsa = kreiNaĝilon(unuaDorsaFormo, naĝilaMaterialo, 0, 0o12/0o100, -0o3/0o10);
  unuaDorsa.name = "dorsa";
  kapo.add(unuaDorsa);

  const okulaZ = GLACIFISA_OKULA_Z;
  const okulaStacio = densigitaj.reduce((najbara, stacio) =>
    Math.abs(stacio.z - okulaZ) < Math.abs(najbara.z - okulaZ) ? stacio : najbara);
  const okulaGeometrio = new THREE.SphereGeometry(okulaStacio.ry * 0o1/0o4, 0o10, 0o10);
  for ( const s of [ 0o1, -0o1 ] ) {
    const okulo = new THREE.Mesh(okulaGeometrio, okulaMaterialo);
    okulo.name = "okulo";
    okulo.position.set(s * okulaStacio.rx * GLACIFISA_OKULA_FLANKO,
      okulaStacio.ry * GLACIFISA_OKULA_FLANKO, okulaZ);
    okulo.scale.set(0o7/0o10, 0o1, 0o1);
    kapo.add(okulo);
  }

  const buŝaZ = -0o1/0o12;
  const buŝaStacio = densigitaj.reduce((najbara, stacio) =>
    Math.abs(stacio.z - buŝaZ) < Math.abs(najbara.z - buŝaZ) ? stacio : najbara);
  const buŝo = new THREE.Mesh(
    new THREE.CylinderGeometry(buŝaStacio.rx * 0o35/0o100, buŝaStacio.rx * 0o7/0o10,
      0o6/0o100, 0o12, 1, true), buŝaMaterialo);
  buŝo.name = "busxo";
  buŝo.rotation.x = Math.PI / 0o2;
  buŝo.position.set(0, 0, buŝaZ);
  kapo.add(buŝo);

  const brustaFormo = new THREE.Shape();
  brustaFormo.moveTo(0, 0);
  brustaFormo.quadraticCurveTo(-0o10/0o100, -0o11/0o100, -0o24/0o100, -0o13/0o100);
  brustaFormo.quadraticCurveTo(-0o37/0o100, -0o10/0o100, -0o33/0o100, 0o1/0o100);
  brustaFormo.quadraticCurveTo(-0o17/0o100, 0o6/0o100, -0o4/0o100, 0o3/0o100);
  brustaFormo.closePath();
  for ( const s of [ 0o1, -0o1 ] ) {
    const brusta = kreiNaĝilon(brustaFormo, naĝilaMaterialo, s * 0o10/0o100, -0o2/0o100, -0o45/0o100);
    brusta.name = "brusta";
    brusta.rotation.z = s * -( Math.PI / 0o2 + 0o3/0o10 );
    brusta.rotation.y = s * -0o2/0o10;
    brusta.userData.bazaZ = brusta.rotation.z;
    brusta.userData.bazaY = brusta.rotation.y;
    kapo.add(brusta);
  }

  const pelvaFormo = new THREE.Shape();
  pelvaFormo.moveTo(0, 0);
  pelvaFormo.quadraticCurveTo(-0o10/0o100, -0o7/0o100, -0o22/0o100, -0o12/0o100);
  pelvaFormo.quadraticCurveTo(-0o32/0o100, -0o10/0o100, -0o20/0o100, -0o3/0o100);
  pelvaFormo.closePath();
  for ( const s of [ 0o1, -0o1 ] ) {
    const pelva = kreiNaĝilon(pelvaFormo, naĝilaMaterialo, s * 0o3/0o100, -0o15/0o100, -0o35/0o100);
    pelva.name = "pelva";
    pelva.rotation.z = s * 0o35/0o100;
    pelva.userData.bazaZ = pelva.rotation.z;
    kapo.add(pelva);
  }

  return {
    malneto: grupo, platigxo: new THREE.Vector3(0o1, 0o1, 0o1),
      supro: 0o25/0o100, speco: "glacifiso", fundaMergo: 0o5/0o10,
    rapidaMultoblo: 0o5/0o10, ampleksaMultoblo: 0o6/0o10,
  };
}

export function gxisdatigiGlacifison(b: Besto, t: number, dt: number): void {
  // ⟨ ការហែលត្រីទឹកកក 📃 ⟩
  const vx = Math.cos(t * b.rapido + b.phase) * b.amplitudo * b.rapido;
  const vz = Math.cos(t * 0o3/0o4 + b.phase * 0o2) * 0o3/0o4;
  let diferenco = Math.atan2(vx, vz) - b.direkto;
  diferenco = Math.atan2(Math.sin(diferenco), Math.cos(diferenco));
  const turno = diferenco * Math.min(1, 0o4 * dt);
  b.direkto += turno;
  b.turno = turno / dt;
  b.grupo.rotation.y = b.direkto;
  b.grupo.rotation.z = Math.max(-0o6/0o10, Math.min(0o6/0o10, -b.turno * 0o3/0o10))
    + Math.sin(t * 0o3/0o4 + b.phase) * 0o3/0o40;
  b.grupo.rotation.x = -Math.cos(t * 0o2 + b.phase * 0o3) * 0o4/0o100;

  const ondFazo = t * 0o15/0o10 + b.phase * 0o4;
  const ampleksoj = [ 0o7/0o100, 0o17/0o100, 0o24/0o100 ];
  for ( let i = 0; i < b.segmentoj.length; i++ ) {
    const segmento = b.segmentoj[i];
    const fazo = ondFazo - ( i + 1 ) * 0o12/0o10;
    segmento.rotation.y = Math.sin(fazo) * ampleksoj[i];
    segmento.rotation.z = Math.cos(fazo) * 0o3/0o100 * ( i + 1 );
  }
  if ( b.vosto ) {
    const vostaFazo = ondFazo - 0o3;
    b.vosto.rotation.y = Math.sin(vostaFazo) * ampleksoj[2];
    b.vosto.rotation.x = Math.cos(vostaFazo) * 0o5/0o100;
  }

  const remFazo = t * 0o11/0o4 + b.phase;
  const remForto = 0o4/0o5 + Math.sin(t * 0o7/0o10 + b.phase * 0o2) * 0o2/0o10;
  for ( const naĝilo of b.naĝiloj ) {
    const bazaZ = naĝilo.userData.bazaZ as number | undefined;
    const bazaY = naĝilo.userData.bazaY as number | undefined;
    if ( naĝilo.name === "brusta" && bazaZ !== undefined ) {
      const flanko = Math.sign(bazaZ) || 1;
      const malfruo = naĝilo.position.x > 0 ? 0 : 0o2/0o10;
      const fazo = remFazo + malfruo;
      naĝilo.rotation.z = bazaZ + Math.sin(fazo) * 0o45/0o100 * remForto * flanko;
      if ( bazaY !== undefined ) {
        naĝilo.rotation.y = bazaY + Math.cos(fazo) * 0o3/0o10 * flanko;
      }
      naĝilo.rotation.x = Math.cos(fazo) * 0o1/0o10;
    } else if ( naĝilo.name === "pelva" && bazaZ !== undefined ) {
      naĝilo.rotation.x = Math.sin(t * 0o2 + b.phase) * 0o1/0o10;
      naĝilo.rotation.z = bazaZ
        + Math.sin(t * 0o3/0o2 + b.phase + 0o6/0o10) * 0o1/0o20;
    }
  }
}
