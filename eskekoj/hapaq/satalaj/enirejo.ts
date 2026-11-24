// ≺⧼ ſ͕ɭᴜ ſɭw ſ̀ȷᴜ 🚪 ⧽≻
import * as THREE from "three";
import { ConvexGeometry } from "three/addons/geometries/ConvexGeometry.js";
import { MURA_KLINO, rondigitaTrapezaQoxa, SANKTEJA_BAZPLATO_ALTO,
  SANKTEJA_BAZPLATO_KROMO } from "./haqoxa.js";
import { sax0baPukazQan2k, sax0baPukazQan2kS2qena } from "../../komunajxoj/haqoxa.js";

// ⟨ ſɭэ ſɭᴜ , 📃 ⟩
export function kf2JoqanKkaxten(qoxa: THREE.Path, z: number,
  sampoj = 0o20): THREE.CurvePath<THREE.Vector3> {
  const putho = new THREE.CurvePath<THREE.Vector3>();
  const n2k: THREE.Vector3[] = [];
  for ( const kkaxte of qoxa.curves ) {
    const hakek = kkaxte.getPoints(sampoj);
    for ( let i = 0; i < hakek.length; i++ ) {
      if ( i === 0 && n2k.length > 0 ) continue;
      n2k.push(new THREE.Vector3(hakek[i].x, hakek[i].y, z));
    }
  }
  if ( n2k.length > 1 && n2k[0].distanceTo(n2k[n2k.length - 1]) < 0o10 ** -0o7 ) n2k.pop();
  for ( let i = 0; i < n2k.length - 1; i++ ) putho.add(new THREE.LineCurve3(n2k[i], n2k[i + 1]));
  return putho;
}

// ⟨ ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , 📃 ⟩ , ſןɔ˞ᴜƴ , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
const BLOKA_LARGHO = 0o233/0o100, TW = BLOKA_LARGHO * 0o45/0o100, EH = 0o11/0o4;
// ⟨ ſןɔ˞ᴜƴ , ſɭᴜ ſɭ,w , 📃 ⟩
// ⟨ ſןɔ˞ᴜƴ , ſɭэ ſɭᴜ , 📃 ⟩
// ⟨ ſןɔ˞ᴜƴ , ꞙɭц , ꞙɭэɔ , 📃 ⟩
const PORD_DIKECO = 0o7/0o100, PORD_BEVELO = 0o1/0o40;
const PORD_DIKECO_TUTA = PORD_DIKECO + PORD_BEVELO * 2;
const PORD_Z = -0o1/0o100;

interface EnirejajGeometrioj {
  pordo: THREE.BufferGeometry;
  joqa: THREE.BufferGeometry;
}

// ⟨ ɭl̀ɜ ſ͕ɭᴜ , ſɭᴜ ſןᴜ , 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſןɔ˞ᴜƴ , ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
let enirejajKashmemoro: EnirejajGeometrioj | null = null;

function preniEnirejajnGeometriojn(): EnirejajGeometrioj {
  if ( enirejajKashmemoro ) return enirejajKashmemoro;
// ⟨ ſɭᴜ ſןᴜ , ſȷƽᴜ ʃɔ , 📃 ⟩
  const pordaC2q = 0o1/0o4;
  const shape = rondigitaTrapezaQoxa(BLOKA_LARGHO, TW, EH, pordaC2q, pordaC2q);
  const pordo = new THREE.ExtrudeGeometry(shape, { depth: PORD_DIKECO, bevelEnabled: true, bevelSize: PORD_BEVELO, bevelThickness: PORD_BEVELO, bevelSegments: 2, curveSegments: 0o20 });
// ⟨ j͐ʃƽɜ , ꞙɭı , ⟅ j͐ʃƽɜ , ꞙɭɿ , 📃 ⟩
  sax0baPukazQan2kS2qena(pordo, [ [ 0, BLOKA_LARGHO ], [ EH, TW ] ]);
// ⟨ ſɭᴜ ſןᴜ , ſןɔ˞ᴜƴ , 📃 ⟩
  const joqaKkaxte = kf2JoqanKkaxten(shape, PORD_Z + PORD_DIKECO / 2);
  const joqa = new THREE.TubeGeometry(joqaKkaxte, 0o40, PORD_DIKECO_TUTA / 2, 0o10, true);
  enirejajKashmemoro = { pordo, joqa };
  return enirejajKashmemoro;
}

/* ſןɔ˞ᴜƴ , ſןɔ˞ᴜƴ , ɭl̀ɜ ſ͕ɭᴜ ,
    @param tieroAlto ( number ) - កម្ពស់ស្រទាប់ដែលកំណត់ផ្អៀងទ្វារ
@returns nagetoj ( BufferGeometry [ ] ) - ព្រុយឆ្វេង និងស្តាំ */
function kf2Nagetojn( tieroAlto: number ): THREE.BufferGeometry[] {
  const bazaX = BLOKA_LARGHO / 2;
  const supraX = TW / 2;
  const nagetaDikeco = 0o1/0o20;
  const zMebl = PORD_Z + PORD_DIKECO / 2;
  const tafkaq = tieroAlto > 0 ? -Math.atan(MURA_KLINO / tieroAlto) : 0;
  const kos = Math.cos(tafkaq), sin = Math.sin(tafkaq);
  const celZ = SANKTEJA_BAZPLATO_KROMO / 2;
// ⟨ ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭɿ , 📃 ⟩
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
    nagetoj.push(sax0baPukazQan2k(geometrio));
  }
  return nagetoj;
}

export function aldoniEnirejon(group: THREE.Group, d: number, joqaMaterialo: THREE.MeshStandardMaterial, eniraMaterialo: THREE.MeshStandardMaterial, flankoj = 1, tieroAlto = 0, nagetoj = false): void {
  const geo = preniEnirejajnGeometriojn();
  const pordGrupo = new THREE.Group();
  const klinGrupo = new THREE.Group();
  klinGrupo.position.set(0, 0, d / 2);
  pordGrupo.add(klinGrupo);
  const enirejo = new THREE.Mesh(geo.pordo, eniraMaterialo);
  enirejo.position.set(0, 0, PORD_Z); klinGrupo.add(enirejo);
  klinGrupo.add(new THREE.Mesh(geo.joqa, joqaMaterialo));
// ⟨ ſןɔ˞ᴜƴ , ſɭɜ ſɭᴜ , 📃 ⟩
  if ( tieroAlto > 0 ) klinGrupo.rotation.x = -Math.atan(MURA_KLINO / tieroAlto);
// ⟨ ſןɔ˞ᴜƴ , j͑ʃɜ j͑ʃƨɹ , 📃 ⟩
  if ( nagetoj ) for ( const g of kf2Nagetojn(tieroAlto) ) {
    const nageto = new THREE.Mesh(g, joqaMaterialo);
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
