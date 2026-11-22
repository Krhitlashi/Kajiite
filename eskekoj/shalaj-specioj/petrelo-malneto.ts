// ≺⧼ គំរូផេត្រេល 🕊️ ⧽≻
// ⟨ ហេតុអ្វីតួជា LOFT 📃 ⟩
// ⟨ ហេតុអ្វីស្លាបក៏ LOFT 📃 ⟩
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { kreiLoftanGeometrion } from "../komunajxoj/formoj.js";
import { katmullRom } from "../../kantaoj/komunajxoj/interpolo.js";
import { petrelajTeksajxoj } from "../komunajxoj/teksajxoj/petrela-plumaro.js";

interface PetrelaStacio { z: number; y: number; r: number; }

const PETRELA_SPINO: PetrelaStacio[] = [
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

const PETRELA_LARGHO = 0o16/0o20;

function spinoEn(z: number): { y: number; r: number } {
  const n = PETRELA_SPINO.length;
  if ( z <= PETRELA_SPINO[0].z ) return { y: PETRELA_SPINO[0].y, r: PETRELA_SPINO[0].r };
  if ( z >= PETRELA_SPINO[n - 1].z ) {
    return { y: PETRELA_SPINO[n - 1].y, r: PETRELA_SPINO[n - 1].r };
  }
  for ( let i = 0; i < n - 1; i++ ) {
    const a = PETRELA_SPINO[i], b = PETRELA_SPINO[i + 1];
    if ( z >= a.z && z <= b.z ) {
      const t = ( z - a.z ) / ( b.z - a.z );
      return { y: a.y + ( b.y - a.y ) * t, r: a.r + ( b.r - a.r ) * t };
    }
  }
  return { y: 0, r: 0 };
}

function surfacxaPunkto(s: number, z: number, tafkaq: number): THREE.Vector3 {
  const spino = spinoEn(z);
  return new THREE.Vector3(s * Math.cos(tafkaq) * spino.r * PETRELA_LARGHO,
    spino.y + Math.sin(tafkaq) * spino.r, z);
}

export function vPorZ(z: number): number {
  const n = PETRELA_SPINO.length;
  const limigita = Math.min(PETRELA_SPINO[n - 1].z, Math.max(PETRELA_SPINO[0].z, z));
  for ( let i = 0; i < n - 1; i++ ) {
    const a = PETRELA_SPINO[i], b = PETRELA_SPINO[i + 1];
    if ( limigita >= a.z && limigita <= b.z ) {
      const t = ( limigita - a.z ) / ( b.z - a.z );
      return ( i + t ) / ( n - 1 );
    }
  }
  return 1;
}

function kreiLofton(stacioj: PetrelaStacio[], subdividoj: number,
  hatafkaq: number, sefini: number): THREE.BufferGeometry {
  const n = stacioj.length;
  const je = ( i: number ) => stacioj[Math.max(0, Math.min(n - 1, i))];
  const skek2 = ( i: number, t: number, preni: ( s: PetrelaStacio ) => number ): number =>
    katmullRom(preni(je(i - 1)), preni(je(i)), preni(je(i + 1)), preni(je(i + 2)), t);
  const densaj: PetrelaStacio[] = [];
  for ( let i = 0; i < n - 1; i++ ) {
    for ( let k = 0; k < subdividoj; k++ ) {
      const t = k / subdividoj;
      densaj.push({
        z: skek2(i, t, s => s.z),
        y: skek2(i, t, s => s.y),
        r: skek2(i, t, s => s.r),
      });
    }
  }
  densaj.push(je(n - 1));
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const havecax2lani: number[] = [];
  const c2q = hatafkaq + 1;
  for ( let i = 0; i < densaj.length; i++ ) {
    const stacio = densaj[i];
    for ( let j = 0; j <= hatafkaq; j++ ) {
      const tafkaq = j / hatafkaq * Math.PI * 2;
      const cos = Math.cos(tafkaq), sin = Math.sin(tafkaq);
      const vertikala = sin < 0 ? stacio.r * 0o11/0o10 : stacio.r;
      pozicioj.push(cos * stacio.r * sefini, stacio.y + sin * vertikala, stacio.z);
      uvoj.push(j / hatafkaq, i / ( densaj.length - 1 ));
    }
  }
  for ( let i = 0; i < densaj.length - 1; i++ ) {
    for ( let j = 0; j < hatafkaq; j++ ) {
      const a = i * c2q + j, b = a + 1;
      const c = a + c2q, d = b + c2q;
      havecax2lani.push(a, b, d, a, d, c);
    }
  }
  return kreiLoftanGeometrion(pozicioj, uvoj, havecax2lani);
}

interface PetrelaRipo {
  x: number; y: number; antauxo: number; malantauxo: number; dikeco: number;
}

const FLUGILAJ_RIPOJ: PetrelaRipo[] = [
  { x: -0o6/0o100,  y: 0,           antauxo:  0o6/0o200,  malantauxo: -0o30/0o200, dikeco: 0o22/0o2000 },
  { x:  0o5/0o100,  y: 0o1/0o200,   antauxo:  0o6/0o200,  malantauxo: -0o31/0o200, dikeco: 0o22/0o2000 },
  { x:  0o15/0o100, y: 0o2/0o200,   antauxo:  0o5/0o200,  malantauxo: -0o31/0o200, dikeco: 0o20/0o2000 },
  { x:  0o24/0o100, y: 0o2/0o200,   antauxo:  0o4/0o200,  malantauxo: -0o30/0o200, dikeco: 0o17/0o2000 },
  { x:  0o33/0o100, y: 0o3/0o200,   antauxo:  0o2/0o200,  malantauxo: -0o27/0o200, dikeco: 0o15/0o2000 },
  { x:  0o43/0o100, y: 0o3/0o200,   antauxo: -0o1/0o200,  malantauxo: -0o26/0o200, dikeco: 0o13/0o2000 },
  { x:  0o52/0o100, y: 0o4/0o200,   antauxo: -0o4/0o200,  malantauxo: -0o25/0o200, dikeco: 0o11/0o2000 },
  { x:  0o61/0o100, y: 0o5/0o200,   antauxo: -0o6/0o200,  malantauxo: -0o24/0o200, dikeco: 0o10/0o2000 },
  { x:  0o66/0o100, y: 0o5/0o200,   antauxo: -0o11/0o200, malantauxo: -0o22/0o200, dikeco: 0o6/0o2000 },
  { x:  0o70/0o100, y: 0o6/0o200,   antauxo: -0o13/0o200, malantauxo: -0o20/0o200, dikeco: 0o4/0o2000 },
  { x:  0o72/0o100, y: 0o6/0o200,   antauxo: -0o15/0o200, malantauxo: -0o17/0o200, dikeco: 0o2/0o2000 },
];

const KUBUTA_INDESKO = 0o4;
const KUBUTA_X = FLUGILAJ_RIPOJ[KUBUTA_INDESKO].x;

function kreiFlugilon(ripoj: PetrelaRipo[], uDe: number, uAl: number,
  subdividoj: number, hatafkaq: number): THREE.BufferGeometry {
  const n = ripoj.length;
  const je = ( i: number ) => ripoj[Math.max(0, Math.min(n - 1, i))];
  const skek2 = ( i: number, t: number, preni: ( r: PetrelaRipo ) => number ): number =>
    katmullRom(preni(je(i - 1)), preni(je(i)), preni(je(i + 1)), preni(je(i + 2)), t);
  const densaj: PetrelaRipo[] = [];
  for ( let i = 0; i < n - 1; i++ ) {
    for ( let k = 0; k < subdividoj; k++ ) {
      const t = k / subdividoj;
      densaj.push({
        x: skek2(i, t, r => r.x), y: skek2(i, t, r => r.y),
        antauxo: skek2(i, t, r => r.antauxo),
        malantauxo: skek2(i, t, r => r.malantauxo),
        dikeco: skek2(i, t, r => r.dikeco),
      });
    }
  }
  densaj.push(je(n - 1));
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const havecax2lani: number[] = [];
  const c2q = hatafkaq + 1;
  for ( let i = 0; i < densaj.length; i++ ) {
    const ripo = densaj[i];
    const u = uDe + ( uAl - uDe ) * ( i / ( densaj.length - 1 ) );
    for ( let j = 0; j <= hatafkaq; j++ ) {
      const tafkaq = j / hatafkaq * Math.PI * 2;
      const cos = Math.cos(tafkaq), sin = Math.sin(tafkaq);
      const kordo = ( 1 + cos ) / 0o2;
      pozicioj.push(ripo.x, ripo.y - sin * ripo.dikeco / 0o2,
        ripo.malantauxo + kordo * ( ripo.antauxo - ripo.malantauxo ));
      uvoj.push(u, kordo);
    }
  }
  for ( let i = 0; i < densaj.length - 1; i++ ) {
    for ( let j = 0; j < hatafkaq; j++ ) {
      const a = i * c2q + j, b = a + 1;
      const c = a + c2q, d = b + c2q;
      havecax2lani.push(a, b, d, a, d, c);
    }
  }
  return kreiLoftanGeometrion(pozicioj, uvoj, havecax2lani);
}

interface Kunfandajxo { mesho: THREE.Mesh; fontoj: THREE.Mesh[]; }

function kunfandiPoMaterialo(hakek: THREE.Mesh[]): Kunfandajxo[] {
  const haca1ara = new Map<THREE.Material, THREE.Mesh[]>();
  for ( const p of hakek ) {
    const pukek = p.material as THREE.Material;
    const ca1ara = haca1ara.get(pukek);
    if ( ca1ara ) ca1ara.push(p); else haca1ara.set(pukek, [ p ]);
  }
  const kunfandajxoj: Kunfandajxo[] = [];
  for ( const [ pukek, ca1ara ] of haca1ara ) {
    if ( ca1ara.length === 1 ) {
      kunfandajxoj.push({ mesho: ca1ara[0], fontoj: ca1ara });
      continue;
    }
    const geometrioj = ca1ara.map(p => {
      p.updateMatrix();
      return p.geometry.clone().applyMatrix4(p.matrix);
    });
    const kunigita = mergeGeometries(geometrioj, false);
    for ( const g of geometrioj ) g.dispose();
    if ( kunigita ) kunfandajxoj.push({ mesho: new THREE.Mesh(kunigita, pukek), fontoj: ca1ara });
  }
  return kunfandajxoj;
}

// ⟨ មាត្រ 📃 ⟩
export function konstruiPetrelanModelon(): THREE.Group {
  const hate = new THREE.Group();
  const teksajxoj = petrelajTeksajxoj(vPorZ);
  const blanka = new THREE.MeshStandardMaterial({
    color: 0xffffff, map: teksajxoj.korpo, bumpMap: teksajxoj.korpoBump,
    bumpScale: 0o1/0o200, roughness: 0o3/0o4, metalness: 0,
  });
  // ⟨ វត្ថុស្លាប 📃 ⟩
  const flugilaMaterialo = new THREE.MeshStandardMaterial({
    color: 0xffffff, map: teksajxoj.flugilo, bumpMap: teksajxoj.flugiloBump,
    bumpScale: 0o1/0o200, roughness: 0o3/0o4, metalness: 0,
    side: THREE.DoubleSide,
  });
  const nigra = new THREE.MeshStandardMaterial({
    color: 0x101018, roughness: 0o1/0o4, metalness: 0,
  });

  // ⟨ តួ 📃 ⟩
  const korpo = new THREE.Mesh(kreiLofton(PETRELA_SPINO, 0o4, 0o20, PETRELA_LARGHO), blanka);
  korpo.name = "korpo";
  hate.add(korpo);

  // ⟨ ចំពុះ 📃 ⟩
  // ⟨ កម្រាស់ចំពុះ 📃 ⟩
  // ⟨ ប្រវែងកាត់ចំពុះ 📃 ⟩
  const bekajStacioj: PetrelaStacio[] = [
    { z: 0o60/0o200, y: 0o16/0o200, r: 0o2/0o200 },
    { z: 0o66/0o200, y: 0o16/0o200, r: 0o6/0o1000 },
    { z: 0o72/0o200, y: 0o15/0o200, r: 0o5/0o1000 },
    { z: 0o75/0o200, y: 0o13/0o200, r: 0o3/0o1000 },
  ];
  const beko = new THREE.Mesh(kreiLofton(bekajStacioj, 0o3, 0o10, 0o6/0o10), nigra);
  beko.name = "beko";
  hate.add(beko);
  const naztubo = new THREE.Mesh(new THREE.CylinderGeometry(
    0o6/0o1000, 0o6/0o1000, 0o4/0o100, 0o6), nigra);
  naztubo.rotation.x = Math.PI / 0o2 - 0o1/0o20;
  naztubo.position.set(0, 0o17/0o200, 0o64/0o200);
  hate.add(naztubo);

  // ⟨ ភ្នែក 📃 ⟩
  const OKULA_Z = 0o50/0o200, OKULA_ANGULO = 0o7/0o20;
  const okulaRadiuso = 0o5/0o1000;
  for ( const s of [ 0o1, -0o1 ] ) {
    const soza = surfacxaPunkto(s, OKULA_Z, OKULA_ANGULO);
    const interna = new THREE.Vector3(s * Math.cos(OKULA_ANGULO),
      Math.sin(OKULA_ANGULO), 0).multiplyScalar(okulaRadiuso * 0o1/0o2);
    const okulo = new THREE.Mesh(
      new THREE.SphereGeometry(okulaRadiuso, 0o10, 0o10), nigra);
    okulo.position.copy(soza).sub(interna);
    okulo.name = "okulo";
    hate.add(okulo);
  }
    for ( const s of [ 0o1, -0o1 ] ) {
      const piedo = new THREE.Mesh(new THREE.SphereGeometry(0o10/0o1000, 0o10, 0o10), nigra);
      piedo.scale.set(0o5/0o10, 0o5/0o10, 0o16/0o10);
      piedo.position.set(s * 0o14/0o1000, -0o10/0o100, -0o34/0o200);
      hate.add(piedo);
    }

  // ⟨ កន្ទុយ 📃 ⟩
  const vostaGrupo = new THREE.Group();
  vostaGrupo.name = "vosto";
  vostaGrupo.position.set(0, 0o2/0o200, -0o50/0o200);
  const vostaj: THREE.BufferGeometry[] = [];
  for ( let k = -0o2; k <= 0o2; k++ ) {
    const sahakani = 0o15/0o100 - Math.abs(k) * 0o1/0o100;
    const p2somani = 0o3/0o200;
    const formo = new THREE.Shape();
    formo.moveTo(0, -p2somani);
    formo.quadraticCurveTo(sahakani * 0o7/0o10, -p2somani * 0o11/0o10, sahakani, 0);
    formo.quadraticCurveTo(sahakani * 0o7/0o10, p2somani * 0o11/0o10, 0, p2somani);
    formo.closePath();
    const plumo = new THREE.ExtrudeGeometry(formo, {
      depth: 0o4/0o1000, bevelEnabled: false, curveSegments: 0o10,
    });
    plumo.rotateX(Math.PI / 0o2);
    plumo.rotateY(Math.PI / 0o2 + k * 0o13/0o100);
    plumo.translate(0, 0o1/0o200, 0);
    vostaj.push(plumo);
  }
  const vostajKunigitaj = mergeGeometries(vostaj, false);
  for ( const g of vostaj ) g.dispose();
  if ( vostajKunigitaj ) {
    const vostaMesho = new THREE.Mesh(vostajKunigitaj, blanka);
    vostaMesho.name = "vostoplumoj";
    vostaGrupo.add(vostaMesho);
    hate.add(vostaGrupo);
  }

  // ⟨ ស្លាប 📃 ⟩
  const brakaGeometrio = kreiFlugilon(
    FLUGILAJ_RIPOJ.slice(0, KUBUTA_INDESKO + 1), 0, 0o52/0o100, 0o3, 0o12);
  const manajRipoj = FLUGILAJ_RIPOJ.slice(KUBUTA_INDESKO)
    .map(r => ({ ...r, x: r.x - KUBUTA_X }));
  const manaGeometrio = kreiFlugilon(manajRipoj, 0o52/0o100, 1, 0o3, 0o12);

  // ⟨ ការឆ្លុះ 📃 ⟩
  for ( const s of [ 0o1, -0o1 ] ) {
    const flugilaGrupo = new THREE.Group();
    flugilaGrupo.name = "flugilo";
    flugilaGrupo.position.set(-s * 0o6/0o100, 0o11/0o200, 0o15/0o100);
    const spegulo = -s;
    const knece = new THREE.Mesh(brakaGeometrio, flugilaMaterialo);
    knece.name = "brako";
    knece.scale.x = spegulo;
    flugilaGrupo.add(knece);

    // ⟨ ដៃ 📃 ⟩
    const manoGrupo = new THREE.Group();
    manoGrupo.name = "mano";
    manoGrupo.position.set(-s * KUBUTA_X, 0, 0);
    manoGrupo.scale.x = spegulo;
    const mano = new THREE.Mesh(manaGeometrio, flugilaMaterialo);
    mano.name = "mano";
    manoGrupo.add(mano);
    flugilaGrupo.add(manoGrupo);
    hate.add(flugilaGrupo);
  }

  // ⟪ ការរលាយ 📃 ⟫
  const statikaj = hate.children.filter(c => ( c as THREE.Mesh ).isMesh) as THREE.Mesh[];
  for ( const k of kunfandiPoMaterialo(statikaj) ) {
    if ( k.fontoj.length === 1 ) continue;
    for ( const m of k.fontoj ) hate.remove(m);
    hate.add(k.mesho);
  }

  return hate;
}
