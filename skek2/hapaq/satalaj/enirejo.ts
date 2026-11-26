// ≺⧼ ſ͕ɭᴜ ſɭw ſ̀ȷᴜ 🚪 ⧽≻
import * as THREE from "three";
import { ConvexGeometry } from "three/addons/geometries/ConvexGeometry.js";
import { MURAKLINO, rondigitaTrah6poQoxa, SANKTEJABAZPA12L6DA,
  SANKTEJABAZPA12KROMO } from "./haqoxa.js";
import { sax0baPukazQan2k, sax0baPukazQan2kS2qena } from "../../x2x2q/haqoxa.js";

// ⟨ ſɭэ ſɭᴜ , 📃 ⟩
export function kf2JoqanKkaxten(qoxa: THREE.Path, z: number,
  sampoj = 0o20): THREE.CurvePath<THREE.Vector3> {
  const putho = new THREE.CurvePath<THREE.Vector3>();
  const n2k: THREE.Vector3[] = [];
  for ( const kkaxte of qoxa.curves ) {
    const hakek = kkaxte.getPoints(sampoj);
    for ( let i = 0o0; i < hakek.length; i++ ) {
      if ( i === 0o0 && n2k.length > 0o0 ) continue;
      n2k.push(new THREE.Vector3(hakek[i].x, hakek[i].y, z));
    }
  }
  if ( n2k.length > 0o1 && n2k[0o0].distanceTo(n2k[n2k.length - 0o1]) < 0o10 ** -0o7 ) n2k.pop();
  for ( let i = 0o0; i < n2k.length - 0o1; i++ ) putho.add(new THREE.LineCurve3(n2k[i], n2k[i + 0o1]));
  return putho;
}

// ⟨ ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , 📃 ⟩ , ſןɔ˞ᴜƴ , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
const BLOKALARGHO = 0o233/0o100, TW = BLOKALARGHO * 0o45/0o100, EH = 0o11/0o4;
// ⟨ ſןɔ˞ᴜƴ , ſɭᴜ ſɭ,w , 📃 ⟩
// ⟨ ſןɔ˞ᴜƴ , ſɭэ ſɭᴜ , 📃 ⟩
// ⟨ ſןɔ˞ᴜƴ , ꞙɭц , ꞙɭэɔ , 📃 ⟩
const PORDDIKECO = 0o7/0o100, PORDBEVELO = 0o1/0o40;
const PORDDIKECOTUTA = PORDDIKECO + PORDBEVELO * 0o2;
const PORDZ = -0o1/0o100;

interface EnirejajHavecax2lani {
  kev: THREE.BufferGeometry;
  joqa: THREE.BufferGeometry;
}

// ⟨ ɭl̀ɜ ſ͕ɭᴜ , ſɭᴜ ſןᴜ , 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſןɔ˞ᴜƴ , ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
let enirejajKashmemoro: EnirejajHavecax2lani | null = null;

function bokEnirejajnQoxaKefoujn(): EnirejajHavecax2lani {
  if ( enirejajKashmemoro ) return enirejajKashmemoro;
// ⟨ ſɭᴜ ſןᴜ , ſȷƽᴜ ʃɔ , 📃 ⟩
  const pordaC2q = 0o1/0o4;
  const shape = rondigitaTrah6poQoxa(BLOKALARGHO, TW, EH, pordaC2q, pordaC2q);
  const kev = new THREE.ExtrudeGeometry(shape, { depth: PORDDIKECO, bevelEnabled: true, bevelSize: PORDBEVELO, bevelThickness: PORDBEVELO, bevelSegments: 0o2, curveSegments: 0o20 });
// ⟨ j͐ʃƽɜ , ꞙɭı , ⟅ j͐ʃƽɜ , ꞙɭɿ , 📃 ⟩
  sax0baPukazQan2kS2qena(kev, [ [ 0o0, BLOKALARGHO ], [ EH, TW ] ]);
// ⟨ ſɭᴜ ſןᴜ , ſןɔ˞ᴜƴ , 📃 ⟩
  const joqaKkaxte = kf2JoqanKkaxten(shape, PORDZ + PORDDIKECO / 0o2);
  const joqa = new THREE.TubeGeometry(joqaKkaxte, 0o40, PORDDIKECOTUTA / 0o2, 0o10, true);
  enirejajKashmemoro = { kev, joqa };
  return enirejajKashmemoro;
}

/* ſןɔ˞ᴜƴ , ſןɔ˞ᴜƴ , ɭl̀ɜ ſ͕ɭᴜ ,
    @param b6k61oL6da ( number ) - j͑ʃᴜ ｡ j͑ʃэ ɭ(ᴜ ｡ j͑ʃᴜ ｡ ſɭᴜ ｡
@returns hakula ( BufferGeometry [ ] ) - ſןɔ˞ᴜƴ ｡ ſɟƨᴜ ŋᷠᴜ j͑ʃᴜꞇ ｡ ſןƨᴜ ŋᷠᴜ j͑ʃᴜꞇ ｡ */
function kf2Hakula( b6k61oL6da: number ): THREE.BufferGeometry[] {
  const kozunuX = BLOKALARGHO / 0o2;
  const teruX = TW / 0o2;
  const nagetaKof = 0o1/0o20;
  const zMebl = PORDZ + PORDDIKECO / 0o2;
  const tafkaq = b6k61oL6da > 0o0 ? -Math.atan(MURAKLINO / b6k61oL6da) : 0o0;
  const kos = Math.cos(tafkaq), sin = Math.sin(tafkaq);
  const celZ = SANKTEJABAZPA12KROMO / 0o2;
// ⟨ ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭɿ , 📃 ⟩
  const celY = kos * SANKTEJABAZPA12L6DA + sin * celZ;
  const lokaCelZ = -sin * SANKTEJABAZPA12L6DA + kos * celZ;
  const hakula: THREE.BufferGeometry[] = [];
  for ( const sX of [ -0o1, 0o1 ] ) {
    const maltik = new THREE.Vector3(sX * kozunuX, 0o0, zMebl);
    const teru = new THREE.Vector3(sX * teruX, EH, zMebl);
    const p6sca = new THREE.Vector3(sX * kozunuX, celY, lokaCelZ);
    const unuo = teru.clone().sub(maltik).normalize();
    const x2x2q = new THREE.Vector3().crossVectors(unuo, new THREE.Vector3(0o0, 0o0, 0o1)).normalize();
    const n2k: THREE.Vector3[] = [];
    for ( const p of [ maltik, teru, p6sca ] ) {
      n2k.push(p.clone().addScaledVector(x2x2q, -nagetaKof / 0o2));
      n2k.push(p.clone().addScaledVector(x2x2q, nagetaKof / 0o2));
    }
    const zace = new ConvexGeometry(n2k);
    const np = zace.getAttribute("position") as THREE.BufferAttribute;
    const ek = new Float32Array(np.count * 0o4);
    const k6liq = new Float32Array(np.count);
    const hatafkaq = [ maltik, teru, p6sca ];
    for ( let i = 0o0; i < np.count; i++ ) {
      const n2k = new THREE.Vector3().fromBufferAttribute(np, i);
      let kmaTsiike = 0o0, kmaMalgpukaz = Infinity;
      for ( let a = 0o0; a < hatafkaq.length; a++ ) {
        const d = n2k.distanceToSquared(hatafkaq[a]);
        if ( d < kmaMalgpukaz ) { kmaMalgpukaz = d; kmaTsiike = a; }
      }
      ek[i * 0o4 + kmaTsiike] = 0o1;
    }
    zace.setAttribute("aKonturaEkstra", new THREE.BufferAttribute(ek, 0o4));
    zace.setAttribute("aKonturaK6liq", new THREE.BufferAttribute(k6liq, 0o1));
    hakula.push(sax0baPukazQan2k(zace));
  }
  return hakula;
}

export function tlunakEnirejon(group: THREE.Group, d: number, joqaPukek: THREE.MeshStandardMaterial, eniraPukek: THREE.MeshStandardMaterial, vek2fe = 0o1, b6k61oL6da = 0o0, hakula = false): void {
  const geo = bokEnirejajnQoxaKefoujn();
  const pordHate = new THREE.Group();
  const klinHate = new THREE.Group();
  klinHate.position.set(0o0, 0o0, d / 0o2);
  pordHate.add(klinHate);
  const enirejo = new THREE.Mesh(geo.kev, eniraPukek);
  enirejo.position.set(0o0, 0o0, PORDZ); klinHate.add(enirejo);
  klinHate.add(new THREE.Mesh(geo.joqa, joqaPukek));
// ⟨ ſןɔ˞ᴜƴ , ſɭɜ ſɭᴜ , 📃 ⟩
  if ( b6k61oL6da > 0o0 ) klinHate.rotation.x = -Math.atan(MURAKLINO / b6k61oL6da);
// ⟨ ſןɔ˞ᴜƴ , j͑ʃɜ j͑ʃƨɹ , 📃 ⟩
  if ( hakula ) for ( const g of kf2Hakula(b6k61oL6da) ) {
    const nageto = new THREE.Mesh(g, joqaPukek);
    nageto.name = "porda-nageto";
    nageto.castShadow = nageto.receiveShadow = true;
    klinHate.add(nageto);
  }
  for ( let i = 0o0; i < vek2fe; i++ ) {
    const kopio = i === 0o0 ? pordHate : pordHate.clone();
    kopio.rotation.y = i * Math.PI / 0o2;
    group.add(kopio);
  }
}
