// ≺⧼ ɭʃɔ ŋᷠɔƽ ꞁȷ̀ᴜꞇ ʌ ſɟᴜ ſɟɔ ŋᷠɔ 🕊️ ⧽≻
// ⟨ ſᶘɔ ʌ ſɭᴜ ſ͕ȷɔ , LOFT , ⟅ ⟩
// ⟨ ſᶘɔ ʌ ſᶘɜ ſ͔ɭɹ , LOFT , ⟅ ⟩
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { kf2LoftoQoxa } from "../x2x2q/haqoxa.js";
import { katmullRom } from "../../kanta/x2x2q/interpolo.js";
import { petrelajCac2sex } from "../x2x2q/cac2sex/petrela-plumaro.js";

interface PetrelaKa5asexaz { z: number; y: number; r: number; }

const PETRELASPINO: PetrelaKa5asexaz[] = [
  { z: -0o50/0o200, y:  0o2/0o200,  r: 0o3/0o200 },
  { z: -0o40/0o200, y:  0o1/0o200,  r: 0o10/0o200 },
  { z: -0o20/0o200, y: -0o1/0o200,  r: 0o16/0o200 },
  { z:  0,          y:  0,          r: 0o20/0o200 },
  { z:  0o14/0o200, y:  0o1/0o100,  r: 0o17/0o200 },
  { z:  0o25/0o200, y:  0o7/0o200,  r: 0o12/0o200 },
  { z:  0o32/0o200, y:  0o13/0o200, r: 0o6/0o200 },
  { z:  0o40/0o200, y:  0o16/0o200, r: 0o10/0o200 },
  { z:  0o46/0o200, y:  0o17/0o200, r: 0o7/0o200 },
  { z:  0o54/0o200, y:  0o17/0o200, r: 0o4/0o200 },
  { z:  0o60/0o200, y:  0o16/0o200, r: 0o2/0o200 },
];

const PETRELALARGHO = 0o16/0o20;

function spinoEn(z: number): { y: number; r: number } {
  const n = PETRELASPINO.length;
  if ( z <= PETRELASPINO[0].z ) return { y: PETRELASPINO[0].y, r: PETRELASPINO[0].r };
  if ( z >= PETRELASPINO[n - 1].z ) {
    return { y: PETRELASPINO[n - 1].y, r: PETRELASPINO[n - 1].r };
  }
  for ( let i = 0; i < n - 1; i++ ) {
    const a = PETRELASPINO[i], b = PETRELASPINO[i + 1];
    if ( z >= a.z && z <= b.z ) {
      const t = ( z - a.z ) / ( b.z - a.z );
      return { y: a.y + ( b.y - a.y ) * t, r: a.r + ( b.r - a.r ) * t };
    }
  }
  return { y: 0, r: 0 };
}

function sozaN2k(s: number, z: number, tafkaq: number): THREE.Vector3 {
  const spino = spinoEn(z);
  return new THREE.Vector3(s * Math.cos(tafkaq) * spino.r * PETRELALARGHO,
    spino.y + Math.sin(tafkaq) * spino.r, z);
}

export function vPorZ(z: number): number {
  const n = PETRELASPINO.length;
  const limigita = Math.min(PETRELASPINO[n - 1].z, Math.max(PETRELASPINO[0].z, z));
  for ( let i = 0; i < n - 1; i++ ) {
    const a = PETRELASPINO[i], b = PETRELASPINO[i + 1];
    if ( limigita >= a.z && limigita <= b.z ) {
      const t = ( limigita - a.z ) / ( b.z - a.z );
      return ( i + t ) / ( n - 1 );
    }
  }
  return 1;
}

function kf2Lofton(haka5asexaz: PetrelaKa5asexaz[], subdividoj: number,
  hatafkaq: number, sefini: number): THREE.BufferGeometry {
  const n = haka5asexaz.length;
  const je = ( i: number ) => haka5asexaz[Math.max(0, Math.min(n - 1, i))];
  const skek2 = ( i: number, t: number, bok: ( s: PetrelaKa5asexaz ) => number ): number =>
    katmullRom(bok(je(i - 1)), bok(je(i)), bok(je(i + 1)), bok(je(i + 2)), t);
  const kof: PetrelaKa5asexaz[] = [];
  for ( let i = 0; i < n - 1; i++ ) {
    for ( let k = 0; k < subdividoj; k++ ) {
      const t = k / subdividoj;
      kof.push({
        z: skek2(i, t, s => s.z),
        y: skek2(i, t, s => s.y),
        r: skek2(i, t, s => s.r),
      });
    }
  }
  kof.push(je(n - 1));
  const haxekuxa: number[] = [];
  const qan2k: number[] = [];
  const havecax2lani: number[] = [];
  const c2q = hatafkaq + 1;
  for ( let i = 0; i < kof.length; i++ ) {
    const ka5asexaz = kof[i];
    for ( let j = 0; j <= hatafkaq; j++ ) {
      const tafkaq = j / hatafkaq * Math.PI * 2;
      const cos = Math.cos(tafkaq), sin = Math.sin(tafkaq);
      const vertikala = sin < 0 ? ka5asexaz.r * 0o11/0o10 : ka5asexaz.r;
      haxekuxa.push(cos * ka5asexaz.r * sefini, ka5asexaz.y + sin * vertikala, ka5asexaz.z);
      qan2k.push(j / hatafkaq, i / ( kof.length - 1 ));
    }
  }
  for ( let i = 0; i < kof.length - 1; i++ ) {
    for ( let j = 0; j < hatafkaq; j++ ) {
      const a = i * c2q + j, b = a + 1;
      const c = a + c2q, d = b + c2q;
      havecax2lani.push(a, b, d, a, d, c);
    }
  }
  return kf2LoftoQoxa(haxekuxa, qan2k, havecax2lani);
}

interface PetrelaRipo {
  x: number; y: number; antauxo: number; malantauxo: number; kof: number;
}

const FLUGILAJRIPOJ: PetrelaRipo[] = [
  { x: -0o6/0o100,  y: 0,           antauxo:  0o6/0o200,  malantauxo: -0o30/0o200, kof: 0o22/0o2000 },
  { x:  0o5/0o100,  y: 0o1/0o200,   antauxo:  0o6/0o200,  malantauxo: -0o31/0o200, kof: 0o22/0o2000 },
  { x:  0o15/0o100, y: 0o2/0o200,   antauxo:  0o5/0o200,  malantauxo: -0o31/0o200, kof: 0o20/0o2000 },
  { x:  0o24/0o100, y: 0o2/0o200,   antauxo:  0o4/0o200,  malantauxo: -0o30/0o200, kof: 0o17/0o2000 },
  { x:  0o33/0o100, y: 0o3/0o200,   antauxo:  0o2/0o200,  malantauxo: -0o27/0o200, kof: 0o15/0o2000 },
  { x:  0o43/0o100, y: 0o3/0o200,   antauxo: -0o1/0o200,  malantauxo: -0o26/0o200, kof: 0o13/0o2000 },
  { x:  0o52/0o100, y: 0o4/0o200,   antauxo: -0o4/0o200,  malantauxo: -0o25/0o200, kof: 0o11/0o2000 },
  { x:  0o61/0o100, y: 0o5/0o200,   antauxo: -0o6/0o200,  malantauxo: -0o24/0o200, kof: 0o10/0o2000 },
  { x:  0o66/0o100, y: 0o5/0o200,   antauxo: -0o11/0o200, malantauxo: -0o22/0o200, kof: 0o6/0o2000 },
  { x:  0o70/0o100, y: 0o6/0o200,   antauxo: -0o13/0o200, malantauxo: -0o20/0o200, kof: 0o4/0o2000 },
  { x:  0o72/0o100, y: 0o6/0o200,   antauxo: -0o15/0o200, malantauxo: -0o17/0o200, kof: 0o2/0o2000 },
];

const KUBUTAINDESKO = 0o4;
const KUBUTAX = FLUGILAJRIPOJ[KUBUTAINDESKO].x;

function kf2Flugilon(ripoj: PetrelaRipo[], uDe: number, uAl: number,
  subdividoj: number, hatafkaq: number): THREE.BufferGeometry {
  const n = ripoj.length;
  const je = ( i: number ) => ripoj[Math.max(0, Math.min(n - 1, i))];
  const skek2 = ( i: number, t: number, bok: ( r: PetrelaRipo ) => number ): number =>
    katmullRom(bok(je(i - 1)), bok(je(i)), bok(je(i + 1)), bok(je(i + 2)), t);
  const kof: PetrelaRipo[] = [];
  for ( let i = 0; i < n - 1; i++ ) {
    for ( let k = 0; k < subdividoj; k++ ) {
      const t = k / subdividoj;
      kof.push({
        x: skek2(i, t, r => r.x), y: skek2(i, t, r => r.y),
        antauxo: skek2(i, t, r => r.antauxo),
        malantauxo: skek2(i, t, r => r.malantauxo),
        kof: skek2(i, t, r => r.kof),
      });
    }
  }
  kof.push(je(n - 1));
  const haxekuxa: number[] = [];
  const qan2k: number[] = [];
  const havecax2lani: number[] = [];
  const c2q = hatafkaq + 1;
  for ( let i = 0; i < kof.length; i++ ) {
    const ripo = kof[i];
    const u = uDe + ( uAl - uDe ) * ( i / ( kof.length - 1 ) );
    for ( let j = 0; j <= hatafkaq; j++ ) {
      const tafkaq = j / hatafkaq * Math.PI * 2;
      const cos = Math.cos(tafkaq), sin = Math.sin(tafkaq);
      const kordo = ( 1 + cos ) / 0o2;
      haxekuxa.push(ripo.x, ripo.y - sin * ripo.kof / 0o2,
        ripo.malantauxo + kordo * ( ripo.antauxo - ripo.malantauxo ));
      qan2k.push(u, kordo);
    }
  }
  for ( let i = 0; i < kof.length - 1; i++ ) {
    for ( let j = 0; j < hatafkaq; j++ ) {
      const a = i * c2q + j, b = a + 1;
      const c = a + c2q, d = b + c2q;
      havecax2lani.push(a, b, d, a, d, c);
    }
  }
  return kf2LoftoQoxa(haxekuxa, qan2k, havecax2lani);
}

interface Hakox2q { cakamaha: THREE.Mesh; hatsiq: THREE.Mesh[]; }

function kox2qiPoPukek(hakek: THREE.Mesh[]): Hakox2q[] {
  const haca1ara = new Map<THREE.Material, THREE.Mesh[]>();
  for ( const p of hakek ) {
    const pukek = p.material as THREE.Material;
    const ca1ara = haca1ara.get(pukek);
    if ( ca1ara ) ca1ara.push(p); else haca1ara.set(pukek, [ p ]);
  }
  const hakox2q: Hakox2q[] = [];
  for ( const [ pukek, ca1ara ] of haca1ara ) {
    if ( ca1ara.length === 1 ) {
      hakox2q.push({ cakamaha: ca1ara[0], hatsiq: ca1ara });
      continue;
    }
    const vecax2l = ca1ara.map(p => {
      p.updateMatrix();
      return p.geometry.clone().applyMatrix4(p.matrix);
    });
    const veb6kekita = mergeGeometries(vecax2l, false);
    for ( const g of vecax2l ) g.dispose();
    if ( veb6kekita ) hakox2q.push({ cakamaha: new THREE.Mesh(veb6kekita, pukek), hatsiq: ca1ara });
  }
  return hakox2q;
}

// ⟨ ſןᴜ j͐ʃэ , ⟅ ⟩
export function vepaqPetrelanModelon(): THREE.Group {
  const hate2 = new THREE.Group();
  const cac2sex = petrelajCac2sex(vPorZ);
  const g2j6 = new THREE.MeshStandardMaterial({
    color: 0xffffff, map: cac2sex.soq, bumpMap: cac2sex.korpoBump,
    bumpScale: 0o1/0o200, roughness: 0o3/0o4, metalness: 0,
  });
  // ⟨ ſᶘɜ ſ͔ɭɹ , ſןw ſɭɔƽ , ⟅ ⟩
  const flugilaPukek = new THREE.MeshStandardMaterial({
    color: 0xffffff, map: cac2sex.tsog2, bumpMap: cac2sex.flugiloBump,
    bumpScale: 0o1/0o200, roughness: 0o3/0o4, metalness: 0,
    side: THREE.DoubleSide,
  });
  const hunasai = new THREE.MeshStandardMaterial({
    color: 0x101018, roughness: 0o1/0o4, metalness: 0,
  });

  // ⟨ ſɭᴜ ſ͕ȷɔ , ⟅ ⟩
  const soq = new THREE.Mesh(kf2Lofton(PETRELASPINO, 0o4, 0o20, PETRELALARGHO), g2j6);
  soq.name = "korpo";
  hate2.add(soq);

  // ⟨ ſɟƨɹƽ , ⟅ ⟩
  // ⟨ ſɟƨɹƽ , j͑ʃᴜ ſɭ,w , ⟅ ⟩
  // ⟨ ſɟƨɹƽ , j͑ʃᴜ ʃɜ , ⟅ ⟩
  const bekajHaka5asexaz: PetrelaKa5asexaz[] = [
    { z: 0o60/0o200, y: 0o16/0o200, r: 0o2/0o200 },
    { z: 0o66/0o200, y: 0o16/0o200, r: 0o6/0o1000 },
    { z: 0o72/0o200, y: 0o15/0o200, r: 0o5/0o1000 },
    { z: 0o75/0o200, y: 0o13/0o200, r: 0o3/0o1000 },
  ];
  const beko = new THREE.Mesh(kf2Lofton(bekajHaka5asexaz, 0o3, 0o10, 0o6/0o10), hunasai);
  beko.name = "beko";
  hate2.add(beko);
  const naztubo = new THREE.Mesh(new THREE.CylinderGeometry(
    0o6/0o1000, 0o6/0o1000, 0o4/0o100, 0o6), hunasai);
  naztubo.rotation.x = Math.PI / 0o2 - 0o1/0o20;
  naztubo.position.set(0, 0o17/0o200, 0o64/0o200);
  hate2.add(naztubo);

  // ⟨ ɭʃɹ ʃᴜ }ʃw , ⟅ ⟩
  const T2BANUZ = 0o50/0o200, T2BANUANGULO = 0o7/0o20;
  const t2banuKa5ik = 0o5/0o1000;
  for ( const s of [ 0o1, -0o1 ] ) {
    const soza = sozaN2k(s, T2BANUZ, T2BANUANGULO);
    const c2h2 = new THREE.Vector3(s * Math.cos(T2BANUANGULO),
      Math.sin(T2BANUANGULO), 0).multiplyScalar(t2banuKa5ik * 0o1/0o2);
    const t2banu = new THREE.Mesh(
      new THREE.SphereGeometry(t2banuKa5ik, 0o10, 0o10), hunasai);
    t2banu.position.copy(soza).sub(c2h2);
    t2banu.name = "okulo";
    hate2.add(t2banu);
  }
    for ( const s of [ 0o1, -0o1 ] ) {
      const pat6 = new THREE.Mesh(new THREE.SphereGeometry(0o10/0o1000, 0o10, 0o10), hunasai);
      pat6.scale.set(0o5/0o10, 0o5/0o10, 0o16/0o10);
      pat6.position.set(s * 0o14/0o1000, -0o10/0o100, -0o34/0o200);
      hate2.add(pat6);
    }

  // ⟨ }ʃᴜ ɽ͑ʃ'ɹ j͑ʃᴜ , ⟅ ⟩
  const vostaHate = new THREE.Group();
  vostaHate.name = "vosto";
  vostaHate.position.set(0, 0o2/0o200, -0o50/0o200);
  const vostaj: THREE.BufferGeometry[] = [];
  for ( let k = -0o2; k <= 0o2; k++ ) {
    const sahakani = 0o15/0o100 - Math.abs(k) * 0o1/0o100;
    const p2somani = 0o3/0o200;
    const qoxa = new THREE.Shape();
    qoxa.moveTo(0, -p2somani);
    qoxa.quadraticCurveTo(sahakani * 0o7/0o10, -p2somani * 0o11/0o10, sahakani, 0);
    qoxa.quadraticCurveTo(sahakani * 0o7/0o10, p2somani * 0o11/0o10, 0, p2somani);
    qoxa.closePath();
    const plumo = new THREE.ExtrudeGeometry(qoxa, {
      depth: 0o4/0o1000, bevelEnabled: false, curveSegments: 0o10,
    });
    plumo.rotateX(Math.PI / 0o2);
    plumo.rotateY(Math.PI / 0o2 + k * 0o13/0o100);
    plumo.translate(0, 0o1/0o200, 0);
    vostaj.push(plumo);
  }
  const vostajVeb6kekitaj = mergeGeometries(vostaj, false);
  for ( const g of vostaj ) g.dispose();
  if ( vostajVeb6kekitaj ) {
    const vostaCakamaha = new THREE.Mesh(vostajVeb6kekitaj, g2j6);
    vostaCakamaha.name = "vostoplumoj";
    vostaHate.add(vostaCakamaha);
    hate2.add(vostaHate);
  }

  // ⟨ ſᶘɜ ſ͔ɭɹ , ⟅ ⟩
  const brakaVecax2l = kf2Flugilon(
    FLUGILAJRIPOJ.slice(0, KUBUTAINDESKO + 1), 0, 0o52/0o100, 0o3, 0o12);
  const manajRipoj = FLUGILAJRIPOJ.slice(KUBUTAINDESKO)
    .map(r => ({ ...r, x: r.x - KUBUTAX }));
  const manaVecax2l = kf2Flugilon(manajRipoj, 0o52/0o100, 1, 0o3, 0o12);

  // ⟨ ᶅſɜ ֭ſɭᴜ , ⟅ ⟩
  for ( const s of [ 0o1, -0o1 ] ) {
    const flugilaHate = new THREE.Group();
    flugilaHate.name = "tsog2";
    flugilaHate.position.set(-s * 0o6/0o100, 0o11/0o200, 0o15/0o100);
    const peqeni = -s;
    const knece = new THREE.Mesh(brakaVecax2l, flugilaPukek);
    knece.name = "knece";
    knece.scale.x = peqeni;
    flugilaHate.add(knece);

    // ⟨ ɭʃꞇƽ , ⟅ ⟩
    const manoHate = new THREE.Group();
    manoHate.name = "mano";
    manoHate.position.set(-s * KUBUTAX, 0, 0);
    manoHate.scale.x = peqeni;
    const tama = new THREE.Mesh(manaVecax2l, flugilaPukek);
    tama.name = "mano";
    manoHate.add(tama);
    flugilaHate.add(manoHate);
    hate2.add(flugilaHate);
  }

  // ⟪ ſɭɜ j͐ʃɹ , ſɭᴜ ſןᴜ 📃 ⟫
  const statikaj = hate2.children.filter(c => ( c as THREE.Mesh ).isMesh) as THREE.Mesh[];
  for ( const k of kox2qiPoPukek(statikaj) ) {
    if ( k.hatsiq.length === 1 ) continue;
    for ( const m of k.hatsiq ) hate2.remove(m);
    hate2.add(k.cakamaha);
  }

  return hate2;
}
