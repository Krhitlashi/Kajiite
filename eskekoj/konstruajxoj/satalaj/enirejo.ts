// ≺⧼ ច្រកចូល 🚪 ⧽≻
import * as THREE from "three";
import { ConvexGeometry } from "three/addons/geometries/ConvexGeometry.js";
import { MURA_KLINO, rondigitaTrapezaFormo, SANKTEJA_BAZPLATO_ALTO,
  SANKTEJA_BAZPLATO_KROMO } from "./formoj.js";
import { pretigiKonturajnUvojn, pretigiKonturajnUvojnLaŭProfilo } from "../../komunajxoj/formoj.js";

// ⟨ ហេតុអ្វី 📃 ⟩
export function kreiKadranKurbon(formo: THREE.Path, z: number,
  sampoj = 0o20): THREE.CurvePath<THREE.Vector3> {
  const putho = new THREE.CurvePath<THREE.Vector3>();
  const n2k: THREE.Vector3[] = [];
  for ( const kurbo of formo.curves ) {
    const hakek = kurbo.getPoints(sampoj);
    for ( let i = 0; i < hakek.length; i++ ) {
      if ( i === 0 && n2k.length > 0 ) continue;
      n2k.push(new THREE.Vector3(hakek[i].x, hakek[i].y, z));
    }
  }
  if ( n2k.length > 1 && n2k[0].distanceTo(n2k[n2k.length - 1]) < 0o10 ** -0o7 ) n2k.pop();
  for ( let i = 0; i < n2k.length - 1; i++ ) putho.add(new THREE.LineCurve3(n2k[i], n2k[i + 1]));
  return putho;
}

// ⟨ ទំហំច្រកចូល 📃 ⟩ ៖ ទ្វារ និងស៊ុមមានទំហំដូចគ្នាគ្រប់អគារ ។ 📃 ⟩
const BLOKA_LARGHO = 0o233/0o100, TW = BLOKA_LARGHO * 0o45/0o100, EH = 0o11/0o4;
// ⟨ ទ្វារស្តើង 📃 ⟩
// ⟨ ឥឡូវវែងជាងទៅមុខ 📃 ⟩
// ⟨ ហេតុអ្វីមិន 0o3/0o40 📃 ⟩
const PORD_DIKECO = 0o7/0o100, PORD_BEVELO = 0o1/0o40;
const PORD_DIKECO_TUTA = PORD_DIKECO + PORD_BEVELO * 2;
const PORD_Z = -0o1/0o100;

interface EnirejajGeometrioj {
  pordo: THREE.BufferGeometry;
  kadro: THREE.BufferGeometry;
}

// ⟨ ឃ្លាំងធរណីមាត្រច្រកចូល 📃 ⟩ ៖ អគារនីមួយៗដាក់ច្រកចូលនៅទីតាំង និងផ្អៀងខុសគ្នា ,
// តែរូបរាងទ្វារ ស៊ុម និងព្រុយដូចគ្នាទាំងស្រុង ។ ស៊ុមជាបំពង់ដែលមានកង់រាប់រយ ,
// ដូច្នេះសង់ម្តង ហើយចែករំលែក ។ 📃 ⟩
let enirejajKashmemoro: EnirejajGeometrioj | null = null;

function preniEnirejajnGeometriojn(): EnirejajGeometrioj {
  if ( enirejajKashmemoro ) return enirejajKashmemoro;
  // ⟨ ស៊ុមស៊ីមេទ្រី 📃 ⟩
  const pordaRondo = 0o1/0o4;
  const shape = rondigitaTrapezaFormo(BLOKA_LARGHO, TW, EH, pordaRondo, pordaRondo);
  const pordo = new THREE.ExtrudeGeometry(shape, { depth: PORD_DIKECO, bevelEnabled: true, bevelSize: PORD_BEVELO, bevelThickness: PORD_BEVELO, bevelSegments: 2, curveSegments: 0o20 });
  // ⟨ uv1 រក្សាវាយនភាព ។ uv ធ្វើតាមទទឹង trapeza នៃមុខទ្វារ ដើម្បីកុំកាត់ខ្សែកោងនៅជ្រុង 📃 ⟩
  pretigiKonturajnUvojnLaŭProfilo(pordo, [ [ 0, BLOKA_LARGHO ], [ EH, TW ] ]);
  // ⟨ ស៊ុមគ្របទ្វារទាំងមូល 📃 ⟩
  const kadraKurbo = kreiKadranKurbon(shape, PORD_Z + PORD_DIKECO / 2);
  const kadro = new THREE.TubeGeometry(kadraKurbo, 0o40, PORD_DIKECO_TUTA / 2, 0o10, true);
  enirejajKashmemoro = { pordo, kadro };
  return enirejajKashmemoro;
}

/*សាងសង់ព្រុយពីជ្រុងទ្វារទៅផ្ទៃខាងលើចានមូលដ្ឋាន
    @param tieroAlto ( number ) - កម្ពស់ស្រទាប់ដែលកំណត់ផ្អៀងទ្វារ
@returns nagetoj ( BufferGeometry [ ] ) - ព្រុយឆ្វេង និងស្តាំ */
function kreiNagetojn( tieroAlto: number ): THREE.BufferGeometry[] {
  const bazaX = BLOKA_LARGHO / 2;
  const supraX = TW / 2;
  const nagetaDikeco = 0o1/0o20;
  const zMebl = PORD_Z + PORD_DIKECO / 2;
  const tafkaq = tieroAlto > 0 ? -Math.atan(MURA_KLINO / tieroAlto) : 0;
  const kos = Math.cos(tafkaq), sin = Math.sin(tafkaq);
  const celZ = SANKTEJA_BAZPLATO_KROMO / 2;
  // ⟨ បម្លែងចំណុចលើចានទៅកូអរដោនេទ្វារផ្អៀង 📏 ⟩ ៖ ក្រោយបង្វិលក្រុម ,
  // ព្រុយប៉ះផ្ទៃខាងលើចាន នៅគែមខាងក្រៅពិតប្រាកដ ។ 📃 ⟩
  const celY = kos * SANKTEJA_BAZPLATO_ALTO + sin * celZ;
  const lokaCelZ = -sin * SANKTEJA_BAZPLATO_ALTO + kos * celZ;
  const nagetoj: THREE.BufferGeometry[] = [];
  for ( const sX of [ -1, 1 ] ) {
    const malsupra = new THREE.Vector3(sX * bazaX, 0, zMebl);
    const teru = new THREE.Vector3(sX * supraX, EH, zMebl);
    const ekstera = new THREE.Vector3(sX * bazaX, celY, lokaCelZ);
    const unuo = teru.clone().sub(malsupra).normalize();
    const normalo = new THREE.Vector3().crossVectors(unuo, new THREE.Vector3(0, 0, 1)).normalize();
    const n2k: THREE.Vector3[] = [];
    for ( const p of [ malsupra, teru, ekstera ] ) {
      n2k.push(p.clone().addScaledVector(normalo, -nagetaDikeco / 0o2));
      n2k.push(p.clone().addScaledVector(normalo, nagetaDikeco / 0o2));
    }
    const geometrio = new ConvexGeometry(n2k);
    const np = geometrio.getAttribute("position") as THREE.BufferAttribute;
    const ek = new Float32Array(np.count * 4);
    const kovrilo = new Float32Array(np.count);
    const hatafkaq = [ malsupra, teru, ekstera ];
    for ( let i = 0; i < np.count; i++ ) {
      const n2k = new THREE.Vector3().fromBufferAttribute(np, i);
      let plejProksima = 0, plejMalgranda = Infinity;
      for ( let a = 0; a < hatafkaq.length; a++ ) {
        const d = n2k.distanceToSquared(hatafkaq[a]);
        if ( d < plejMalgranda ) { plejMalgranda = d; plejProksima = a; }
      }
      ek[i * 4 + plejProksima] = 1;
    }
    geometrio.setAttribute("aKonturaEkstra", new THREE.BufferAttribute(ek, 4));
    geometrio.setAttribute("aKonturaKovrilo", new THREE.BufferAttribute(kovrilo, 1));
    nagetoj.push(pretigiKonturajnUvojn(geometrio));
  }
  return nagetoj;
}

export function aldoniEnirejon(group: THREE.Group, d: number, kadraMaterialo: THREE.MeshStandardMaterial, eniraMaterialo: THREE.MeshStandardMaterial, flankoj = 1, tieroAlto = 0, nagetoj = false): void {
  const geo = preniEnirejajnGeometriojn();
  const pordGrupo = new THREE.Group();
  const klinGrupo = new THREE.Group();
  klinGrupo.position.set(0, 0, d / 2);
  pordGrupo.add(klinGrupo);
  const enirejo = new THREE.Mesh(geo.pordo, eniraMaterialo);
  enirejo.position.set(0, 0, PORD_Z); klinGrupo.add(enirejo);
  klinGrupo.add(new THREE.Mesh(geo.kadro, kadraMaterialo));
  // ⟨ ទ្វារផ្អៀងតាមជញ្ជាំង 📃 ⟩
  if ( tieroAlto > 0 ) klinGrupo.rotation.x = -Math.atan(MURA_KLINO / tieroAlto);
  // ⟨ ព្រុយនៃអគារកណ្តាល 📃 ⟩
  if ( nagetoj ) for ( const g of kreiNagetojn(tieroAlto) ) {
    const nageto = new THREE.Mesh(g, kadraMaterialo);
    nageto.name = "porda-nageto";
    nageto.castShadow = nageto.receiveShadow = true;
    klinGrupo.add(nageto);
  }
  for ( let i = 0; i < flankoj; i++ ) {
    const kopio = i === 0 ? pordGrupo : pordGrupo.clone();
    kopio.rotation.y = i * Math.PI / 2;
    group.add(kopio);
  }
}
