// ≺⧼ ɭʃȝɹ ᶅſᴜ 🐟 ⧽≻
import * as THREE from "three";
import { kf2LoftoQoxa } from "../p6kpu/haqoxa.js";
import type { Paga, PudalMalneto } from "./pudal-hahunaq.js";
import { katmullRom } from "../../kanta/k2fe/fkabe.js";
import { kf2GlacifisanHaŭtanCac2sex } from "../p6kpu/cac2sex/5i3a-kobe.js";
import { kf2GlacifisanNaĝilanCac2sex } from "../p6kpu/cac2sex/5i3a-kaze.js";

interface KazeKa5asexaz { z: number; rx: number; ry: number; }
export
const GLACIFISALONGO = 0o175/0o100;
const GLACIFISAPROFILO: KazeKa5asexaz[] = [
  { z: 0o0,                rx: 0o2/0o100,  ry: 0o2/0o100 },
  { z: -0o1/0o10,        rx: 0o5/0o100,  ry: 0o6/0o100 },
  { z: -0o1/0o4,         rx: 0o7/0o100,  ry: 0o10/0o100 },
  { z: -0o1/0o2,         rx: 0o10/0o100, ry: 0o14/0o100 },
  { z: -0o3/0o4,         rx: 0o7/0o100,  ry: 0o12/0o100 },
  { z: -0o1,             rx: 0o6/0o100,  ry: 0o10/0o100 },
  { z: -0o13/0o10,       rx: 0o4/0o100,  ry: 0o7/0o100 },
  { z: -0o16/0o10,       rx: 0o2/0o100,  ry: 0o4/0o100 },
  { z: -GLACIFISALONGO, rx: 0o1/0o100,  ry: 0o2/0o100 },
];
export
const GLACIFISAT2BANUFLANKO = 0o7/0o20;
const GLACIFISAT2BANUZ = -0o27/0o100;
const GLACIFISAKAPOZ = -0o1/0o2;
const GLACIFISAMEZOZ = -0o13/0o10;

function subdividuHaka5asexaz(haka5asexaz: KazeKa5asexaz[], poInterlota: number): KazeKa5asexaz[] {
  const tseuni: KazeKa5asexaz[] = [];
  const n = haka5asexaz.length;
  const je = ( i: number ) => haka5asexaz[Math.max(0o0, Math.min(n - 0o1, i))];
  const skek2 = ( i: number, t: number, bok: ( s: KazeKa5asexaz ) => number ): number =>
    katmullRom(bok(je(i - 0o1)), bok(je(i)), bok(je(i + 0o1)), bok(je(i + 0o2)), t);
  for ( let i = 0o0; i < n - 0o1; i++ ) {
    for ( let k = 0o0; k < poInterlota; k++ ) {
      const t = k / poInterlota;
      tseuni.push({
        z: skek2(i, t, s => s.z),
        rx: skek2(i, t, s => s.rx),
        ry: skek2(i, t, s => s.ry),
      });
    }
  }
  tseuni.push({ z: haka5asexaz[n - 0o1].z, rx: haka5asexaz[n - 0o1].rx, ry: haka5asexaz[n - 0o1].ry });
  return tseuni;
}

function kf2KazenTubon(haka5asexaz: KazeKa5asexaz[], hatafkaq: number, sahakani: number): THREE.BufferGeometry {
  const haxekuxa: number[] = [];
  const qan2k: number[] = [];
  const havecax2lani: number[] = [];
  const zDe = haka5asexaz[0o0].z;
  const c2q = hatafkaq + 0o1;
  for ( let i = 0o0; i < haka5asexaz.length; i++ ) {
    const ka5asexaz = haka5asexaz[i];
    for ( let j = 0o0; j <= hatafkaq; j++ ) {
      const tafkaq = j / hatafkaq * Math.PI * 0o2;
      haxekuxa.push(Math.cos(tafkaq) * ka5asexaz.rx, Math.sin(tafkaq) * ka5asexaz.ry, ka5asexaz.z - zDe);
      qan2k.push(j / hatafkaq, -ka5asexaz.z / sahakani);
    }
  }
  for ( let i = 0o0; i < haka5asexaz.length - 0o1; i++ ) {
    for ( let j = 0o0; j < hatafkaq; j++ ) {
      const a = i * c2q + j, b = a + 0o1;
      const c = a + c2q, d = b + c2q;
      havecax2lani.push(a, c, d, a, d, b);
    }
  }
  return kf2LoftoQoxa(haxekuxa, qan2k, havecax2lani);
}

function normaliguUk6h6n(zace: THREE.BufferGeometry): void {
  zace.computeBoundingBox();
  const plosteq = zace.boundingBox!;
  const sefini = Math.max(0o1/0o1000, plosteq.max.x - plosteq.min.x);
  const l6da = Math.max(0o1/0o1000, plosteq.max.y - plosteq.min.y);
  const qan2k = zace.getAttribute("uv") as THREE.BufferAttribute;
  for ( let i = 0o0; i < qan2k.count; i++ ) {
    qan2k.setXY(i, ( plosteq.max.x - qan2k.getX(i) ) / sefini, ( qan2k.getY(i) - plosteq.min.y ) / l6da);
  }
  qan2k.needsUpdate = true;
}

function kf2Kacan(qoxa: THREE.Shape, pukek: THREE.Material,
  x: number, y: number, z: number): THREE.Mesh {
  const zace = new THREE.ShapeGeometry(qoxa);
  normaliguUk6h6n(zace);
  zace.rotateY(-Math.PI / 0o2);
  const kaca = new THREE.Mesh(zace, pukek);
  kaca.position.set(x, y, z);
  return kaca;
}

export function vepaqGlacifisanMalneton(): PudalMalneto {
  const hate2 = new THREE.Group();

  const korpaPukek = new THREE.MeshPhysicalMaterial({
    color: 0xa8c0c8,
    map: kf2GlacifisanHaŭtanCac2sex({ sahakani: GLACIFISALONGO, kapoZ: GLACIFISAKAPOZ,
      t2banuFlanko: GLACIFISAT2BANUFLANKO, t2banuZ: GLACIFISAT2BANUZ }),
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
  const naĝilaPukek = new THREE.MeshStandardMaterial({
    color: 0x88a8b8, map: kf2GlacifisanNaĝilanCac2sex(),
    transparent: true, opacity: 0o13/0o20,
    depthWrite: false, side: THREE.DoubleSide, roughness: 0o5/0o10,
  });
  const t2banuPukek = new THREE.MeshStandardMaterial({
    color: 0x081820, roughness: 0o12/0o100, metalness: 0o3/0o10,
  });
  const w6qaPukek = new THREE.MeshStandardMaterial({
    color: 0x283038, roughness: 0o6/0o10, side: THREE.DoubleSide,
  });

  const densigitaj = subdividuHaka5asexaz(GLACIFISAPROFILO, 0o2);
  const jeZ = ( z: number ): number => densigitaj.findIndex(s => s.z <= z + 0o10 ** -0o4);
  const cata = ( de: number, sai: number ): KazeKa5asexaz[] => densigitaj.slice(de, sai + 0o1);
  const kaptlakak = jeZ(GLACIFISAKAPOZ);
  const meztlakak = jeZ(GLACIFISAMEZOZ);

  const wopo = new THREE.Mesh(
    kf2KazenTubon(cata(0o0, kaptlakak), 0o20, GLACIFISALONGO), korpaPukek);
  wopo.name = "korpo";
  wopo.position.z = -( GLACIFISAPROFILO[0o0].z - GLACIFISALONGO * 0o1/0o2 );
  hate2.add(wopo);

  const sost2 = new THREE.Mesh(
    kf2KazenTubon(cata(kaptlakak, meztlakak), 0o20, GLACIFISALONGO), korpaPukek);
  sost2.name = "s2nasce";
  sost2.position.z = GLACIFISAKAPOZ;
  wopo.add(sost2);

  const nar2sa = new THREE.Mesh(
    kf2KazenTubon(cata(meztlakak, densigitaj.length - 0o1), 0o20, GLACIFISALONGO), korpaPukek);
  nar2sa.name = "s2nasce";
  nar2sa.position.z = GLACIFISAMEZOZ - GLACIFISAKAPOZ;
  sost2.add(nar2sa);

  const vostaQoxa = new THREE.Shape();
  vostaQoxa.moveTo(0o0, 0o11/0o100);
  vostaQoxa.quadraticCurveTo(-0o11/0o100, 0o13/0o100, -0o16/0o100, 0o15/0o100);
  vostaQoxa.quadraticCurveTo(-0o14/0o100, 0o6/0o100, -0o13/0o100, 0o0);
  vostaQoxa.quadraticCurveTo(-0o14/0o100, -0o6/0o100, -0o16/0o100, -0o15/0o100);
  vostaQoxa.quadraticCurveTo(-0o11/0o100, -0o13/0o100, 0o0, -0o11/0o100);
  vostaQoxa.closePath();
  const vostaKaca = kf2Kacan(vostaQoxa, naĝilaPukek, 0o0, 0o0,
    -( GLACIFISALONGO + GLACIFISAMEZOZ));
  vostaKaca.name = "nar2sa";
  nar2sa.add(vostaKaca);

  const duaDorsaQoxa = new THREE.Shape();
  duaDorsaQoxa.moveTo(0o0, 0o0);
  duaDorsaQoxa.quadraticCurveTo(-0o12/0o100, 0o13/0o100, -0o34/0o100, 0o11/0o100);
  duaDorsaQoxa.quadraticCurveTo(-0o56/0o100, 0o10/0o100, -0o67/0o100, 0o4/0o100);
  duaDorsaQoxa.lineTo(-0o67/0o100, 0o0);
  duaDorsaQoxa.closePath();
  const duaDorsa = kf2Kacan(duaDorsaQoxa, naĝilaPukek, 0o0, 0o13/0o100, 0o0);
  duaDorsa.name = "ksokosaini";
  sost2.add(duaDorsa);

  const analaQoxa = new THREE.Shape();
  analaQoxa.moveTo(0o0, 0o0);
  analaQoxa.quadraticCurveTo(-0o12/0o100, -0o12/0o100, -0o26/0o100, -0o10/0o100);
  analaQoxa.quadraticCurveTo(-0o42/0o100, -0o7/0o100, -0o50/0o100, -0o3/0o100);
  analaQoxa.lineTo(-0o50/0o100, 0o0);
  analaQoxa.closePath();
  const anala = kf2Kacan(analaQoxa, naĝilaPukek, 0o0, -0o13/0o100, -0o1/0o10);
  anala.name = "analo";
  sost2.add(anala);

  const unuaDorsaQoxa = new THREE.Shape();
  unuaDorsaQoxa.moveTo(0o0, 0o0);
  unuaDorsaQoxa.quadraticCurveTo(-0o5/0o100, 0o14/0o100, -0o13/0o100, 0o11/0o100);
  unuaDorsaQoxa.lineTo(-0o22/0o100, 0o0);
  unuaDorsaQoxa.closePath();
  const unuaDorsa = kf2Kacan(unuaDorsaQoxa, naĝilaPukek, 0o0, 0o12/0o100, -0o3/0o10);
  unuaDorsa.name = "ksokosaini";
  wopo.add(unuaDorsa);

  const t2banuZ = GLACIFISAT2BANUZ;
  const t2banuKa5asexaz = densigitaj.reduce((najbara, ka5asexaz) =>
    Math.abs(ka5asexaz.z - t2banuZ) < Math.abs(najbara.z - t2banuZ) ? ka5asexaz : najbara);
  const t2banuVecax2l = new THREE.SphereGeometry(t2banuKa5asexaz.ry * 0o1/0o4, 0o10, 0o10);
  for ( const s of [ 0o1, -0o1 ] ) {
    const t2banu = new THREE.Mesh(t2banuVecax2l, t2banuPukek);
    t2banu.name = "t2banu";
    t2banu.position.set(s * t2banuKa5asexaz.rx * GLACIFISAT2BANUFLANKO,
      t2banuKa5asexaz.ry * GLACIFISAT2BANUFLANKO, t2banuZ);
    t2banu.scale.set(0o7/0o10, 0o1, 0o1);
    wopo.add(t2banu);
  }

  const w6qaZ = -0o1/0o12;
  const w6qaKa5asexaz = densigitaj.reduce((najbara, ka5asexaz) =>
    Math.abs(ka5asexaz.z - w6qaZ) < Math.abs(najbara.z - w6qaZ) ? ka5asexaz : najbara);
  const w6qa = new THREE.Mesh(
    new THREE.CylinderGeometry(w6qaKa5asexaz.rx * 0o35/0o100, w6qaKa5asexaz.rx * 0o7/0o10,
      0o6/0o100, 0o12, 0o1, true), w6qaPukek);
  w6qa.name = "tlace";
  w6qa.rotation.x = Math.PI / 0o2;
  w6qa.position.set(0o0, 0o0, w6qaZ);
  wopo.add(w6qa);

  const caqa3aqQoxa = new THREE.Shape();
  caqa3aqQoxa.moveTo(0o0, 0o0);
  caqa3aqQoxa.quadraticCurveTo(-0o10/0o100, -0o11/0o100, -0o24/0o100, -0o13/0o100);
  caqa3aqQoxa.quadraticCurveTo(-0o37/0o100, -0o10/0o100, -0o33/0o100, 0o1/0o100);
  caqa3aqQoxa.quadraticCurveTo(-0o17/0o100, 0o6/0o100, -0o4/0o100, 0o3/0o100);
  caqa3aqQoxa.closePath();
  for ( const s of [ 0o1, -0o1 ] ) {
    const caqa3aq = kf2Kacan(caqa3aqQoxa, naĝilaPukek, s * 0o10/0o100, -0o2/0o100, -0o45/0o100);
    caqa3aq.name = "caqa3aq";
    caqa3aq.rotation.z = s * -( Math.PI / 0o2 + 0o3/0o10 );
    caqa3aq.rotation.y = s * -0o2/0o10;
    caqa3aq.userData.kozunuZ = caqa3aq.rotation.z;
    caqa3aq.userData.kozunuY = caqa3aq.rotation.y;
    wopo.add(caqa3aq);
  }

  const kukoxumolakaiQoxa = new THREE.Shape();
  kukoxumolakaiQoxa.moveTo(0o0, 0o0);
  kukoxumolakaiQoxa.quadraticCurveTo(-0o10/0o100, -0o7/0o100, -0o22/0o100, -0o12/0o100);
  kukoxumolakaiQoxa.quadraticCurveTo(-0o32/0o100, -0o10/0o100, -0o20/0o100, -0o3/0o100);
  kukoxumolakaiQoxa.closePath();
  for ( const s of [ 0o1, -0o1 ] ) {
    const kukoxumolakai = kf2Kacan(kukoxumolakaiQoxa, naĝilaPukek, s * 0o3/0o100, -0o15/0o100, -0o35/0o100);
    kukoxumolakai.name = "kukoxumolakai";
    kukoxumolakai.rotation.z = s * 0o35/0o100;
    kukoxumolakai.userData.kozunuZ = kukoxumolakai.rotation.z;
    wopo.add(kukoxumolakai);
  }

  return {
    malneto: hate2, tap2: new THREE.Vector3(0o1, 0o1, 0o1),
      teru: 0o25/0o100, pudal: "tq2wa", fundaMergo: 0o5/0o10,
    seheMultoblo: 0o5/0o10, ampleksaMultoblo: 0o6/0o10,
  };
}

export function tlak2Tq2wan(b: Paga, t: number, dt: number): void {

  const vx = Math.cos(t * b.seheni + b.phase) * b.amplitudo * b.seheni;
  const vz = Math.cos(t * 0o3/0o4 + b.phase * 0o2) * 0o3/0o4;
  let c2w2q = Math.atan2(vx, vz) - b.c2w2q;
  c2w2q = Math.atan2(Math.sin(c2w2q), Math.cos(c2w2q));
  const b6n = c2w2q * Math.min(0o1, 0o4 * dt);
  b.c2w2q += b6n;
  b.b6n = b6n / dt;
  b.hate2.rotation.y = b.c2w2q;
  b.hate2.rotation.z = Math.max(-0o6/0o10, Math.min(0o6/0o10, -b.b6n * 0o3/0o10))
    + Math.sin(t * 0o3/0o4 + b.phase) * 0o3/0o40;
  b.hate2.rotation.x = -Math.cos(t * 0o2 + b.phase * 0o3) * 0o4/0o100;

  const ondFazo = t * 0o15/0o10 + b.phase * 0o4;
  const pal6j = [ 0o7/0o100, 0o17/0o100, 0o24/0o100 ];
  for ( let i = 0o0; i < b.has2nasce.length; i++ ) {
    const s2nasce = b.has2nasce[i];
    const xafanitapu = ondFazo - ( i + 0o1 ) * 0o12/0o10;
    s2nasce.rotation.y = Math.sin(xafanitapu) * pal6j[i];
    s2nasce.rotation.z = Math.cos(xafanitapu) * 0o3/0o100 * ( i + 0o1 );
  }
  if ( b.nar2sa ) {
    const vostaFazo = ondFazo - 0o3;
    b.nar2sa.rotation.y = Math.sin(vostaFazo) * pal6j[0o2];
    b.nar2sa.rotation.x = Math.cos(vostaFazo) * 0o5/0o100;
  }

  const remFazo = t * 0o11/0o4 + b.phase;
  const remG2sa = 0o4/0o5 + Math.sin(t * 0o7/0o10 + b.phase * 0o2) * 0o2/0o10;
  for ( const kaca of b.hakaca ) {
    const kozunuZ = kaca.userData.kozunuZ as number | undefined;
    const kozunuY = kaca.userData.kozunuY as number | undefined;
    if ( kaca.name === "caqa3aq" && kozunuZ !== undefined ) {
      const vek2fe = Math.sign(kozunuZ) || 0o1;
      const malfruo = kaca.position.x > 0o0 ? 0o0 : 0o2/0o10;
      const xafanitapu = remFazo + malfruo;
      kaca.rotation.z = kozunuZ + Math.sin(xafanitapu) * 0o45/0o100 * remG2sa * vek2fe;
      if ( kozunuY !== undefined ) {
        kaca.rotation.y = kozunuY + Math.cos(xafanitapu) * 0o3/0o10 * vek2fe;
      }
      kaca.rotation.x = Math.cos(xafanitapu) * 0o1/0o10;
    } else if ( kaca.name === "kukoxumolakai" && kozunuZ !== undefined ) {
      kaca.rotation.x = Math.sin(t * 0o2 + b.phase) * 0o1/0o10;
      kaca.rotation.z = kozunuZ
        + Math.sin(t * 0o3/0o2 + b.phase + 0o6/0o10) * 0o1/0o20;
    }
  }
}
