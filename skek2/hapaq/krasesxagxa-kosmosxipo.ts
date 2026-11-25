// ≺⧼ ſ̀ȷᴜ }ʃɔ ᶅſɜ ſɭˬᴜ j͑ʃɔ ı],ᴜƴ 🚀 ⧽≻
import * as THREE from "three";
import { tlunakPilolCah6k6, fenestraMargxeno } from "./satalaj/cah6k6.js";
import { kf2JoqanKkaxten } from "./satalaj/enirejo.js";
import { MURAKLINO } from "./satalaj/haqoxa.js";
import { bokTavolajnQoxaKefoujn, hatanekHavem2 } from "./satalaj-hapaq.js";
import { vakox2qQoxaKefoujn } from "../x2x2q/hakox2q.js";
import { sax0baPukazQan2kS2qena } from "../x2x2q/haqoxa.js";
import { kf2Cah6k6Pukek } from "../x2x2q/pukek.js";


// ⟪ ſɭᴜ ſןᴜ , 📏 ⟫
// ⟨ ſɭɜ ſɭᴜ , ſɭᴜ ſןᴜ , 📃 ⟩
// ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
export const SXIPALARGO = 0o10;
export const SXIPATIERO = 0o315/0o100;
export const SXIPANIVELOJ = 0o5;

// ⟨ ſןɔ˞ᴜƴ , ꞙɭɿ , 📃 ⟩
// ⟨ ſןɔ˞ᴜƴ , ꞙɭɿ , 📃 ⟩
function rondigitaDupordaQoxa(k6liqSefini: number, tw: number, eh: number,
  r: number): THREE.Shape {
  const s = new THREE.Shape();
  const hb = k6liqSefini / 2, ht = tw / 2;
  const sl = ( hb - ht ) / eh;
  const d = sl * r;
  s.moveTo(-ht + r, -eh);
  s.lineTo(ht - r, -eh);
  s.quadraticCurveTo(ht, -eh, ht + d, -eh + r);
  s.lineTo(hb - d, -r);
  s.quadraticCurveTo(hb, 0, hb - d, r);
  s.lineTo(ht + d, eh - r);
  s.quadraticCurveTo(ht, eh, ht - r, eh);
  s.lineTo(-ht + r, eh);
  s.quadraticCurveTo(-ht, eh, -ht - d, eh - r);
  s.lineTo(-hb + d, r);
  s.quadraticCurveTo(-hb, 0, -hb + d, -r);
  s.lineTo(-ht - d, -eh + r);
  s.quadraticCurveTo(-ht, -eh, -ht + r, -eh);
  s.closePath();
  return s;
}

export interface Krasesxagxo {
  group: THREE.Group;
  windows: THREE.Mesh[];
  pordaXekuxa: THREE.Vector3;
  doorDir: THREE.Vector3;
}

export function vepaqKrasesxagxon(qena: THREE.Scene,
  x: number, y: number, z: number,
  oraPukek: THREE.MeshStandardMaterial,
  eniraPukek: THREE.MeshStandardMaterial
): Krasesxagxo {
  const group = new THREE.Group();
  const up = SXIPANIVELOJ, down = up;
  const b6k61oL6da = SXIPATIERO;
  const s2sabo = MURAKLINO;
  const hw0 = SXIPALARGO / 2;
  const face = Math.atan2(-x, -z);

  const muraPukek = new THREE.MeshStandardMaterial({
    color: 0x184838, roughness: 0o33/0o100, metalness: 0o5/0o100, envMapIntensity: 0o23/0o40,
  });
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
  const fenestraPukek = kf2Cah6k6Pukek();

// ⟨ ſɭɜ ſɭᴜ , ꞙɭɿ , 📃 ⟩
// ⟨ ſɭɜ ſɭᴜ , ꞙɭц , 📃 ⟩
  const hateru = bokTavolajnQoxaKefoujn("spacosxipo", SXIPALARGO, SXIPALARGO, up, b6k61oL6da);
  const subajHatu5ekani1el2sai = hateru.hatu5ekani1el2sai.clone().rotateX(Math.PI);
  const subajJoqaj = hateru.hajoqa.clone().rotateX(Math.PI);

  const hatu5ekani1el2sai = new THREE.Mesh(vakox2qQoxaKefoujn([ hateru.hatu5ekani1el2sai, subajHatu5ekani1el2sai ]), muraPukek);
  hatu5ekani1el2sai.castShadow = true;
  group.add(hatu5ekani1el2sai);
  group.add(new THREE.Mesh(vakox2qQoxaKefoujn([ hateru.hajoqa, subajJoqaj ]), oraPukek));

  const pordaBlokaSefini = 0o233 / 0o100;
  const pordaTeruSefini = pordaBlokaSefini * 0o45 / 0o100;
  const pordaL6da = 0o11 / 0o4;
  const pordQoxa = rondigitaDupordaQoxa(pordaBlokaSefini, pordaTeruSefini, pordaL6da, 0o1/0o4);
// ⟨ ſןɔ˞ᴜƴ , ꞙɭɿ , 📃 ⟩
  const pordKof = 0o7/0o100, pordBevelo = 0o1/0o40;
  const pordKofTuta = pordKof + pordBevelo * 2;
// ⟨ ſןɔ˞ᴜƴ , ꞙɭэ , 📃 ⟩
  const pordaKa5ik = hw0 - 0o1/0o100;
// ⟨ ſןɔ˞ᴜƴ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
  const CENTRARANDOL6DA = 0o11/0o100;
  const CENTRARANDOLARGO = 0o233/0o100 + 0o5/0o100;
  const CENTRARANDODIKECO = 0o12/0o100;
  const sost2Ka5ik = pordaKa5ik + pordKof / 2 + pordBevelo / 2;
  const sost2Vecax2l = new THREE.BoxGeometry(CENTRARANDOLARGO, CENTRARANDOL6DA,
    CENTRARANDODIKECO);
  for ( let f = 0; f < 4; f++ ) {
    const enirejaVecax2l = new THREE.ExtrudeGeometry(pordQoxa, {
      depth: pordKof, bevelEnabled: true, bevelSize: pordBevelo, bevelThickness: pordBevelo,
      bevelSegments: 2, curveSegments: 0o20,
    });
// ⟨ j͐ʃƽɜ , ꞙɭɿ , 📃 ⟩
    sax0baPukazQan2kS2qena(enirejaVecax2l, [
      [ -pordaL6da, pordaTeruSefini ], [ 0, pordaBlokaSefini ],
      [ pordaL6da, pordaTeruSefini ],
    ]);
    const enirejaMreto = new THREE.Mesh(enirejaVecax2l, eniraPukek);
    enirejaMreto.rotation.y = f * Math.PI / 2;
    enirejaMreto.position.set(Math.sin(f * Math.PI / 2) * pordaKa5ik, 0,
      Math.cos(f * Math.PI / 2) * pordaKa5ik);
    group.add(enirejaMreto);

// ⟨ ſɭᴜ ſןᴜ , ſɭɜ ſɭᴜ , 📃 ⟩
    const joqaKkaxte = kf2JoqanKkaxten(pordQoxa, pordKof / 2);
    const ornamo = new THREE.Mesh(new THREE.TubeGeometry(joqaKkaxte, 0o200, pordKofTuta / 2, 0o14, true),
      oraPukek);
    ornamo.rotation.y = f * Math.PI / 2;
    ornamo.position.set(Math.sin(f * Math.PI / 2) * pordaKa5ik, 0,
      Math.cos(f * Math.PI / 2) * pordaKa5ik);
    group.add(ornamo);

// ⟨ ſןɔ˞ᴜƴ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
    const sost2 = new THREE.Mesh(sost2Vecax2l, oraPukek);
    sost2.rotation.y = f * Math.PI / 2;
    sost2.position.set(Math.sin(f * Math.PI / 2) * sost2Ka5ik, 0,
      Math.cos(f * Math.PI / 2) * sost2Ka5ik);
    group.add(sost2);
  }

// ⟨ ſɭʃɹ ʃᴜ }ʃw , 📃 ⟩
// ⟨ j͐ʃƽɜ , 📃 ⟩
  const fenL6da = Math.min(0o5/0o10, b6k61oL6da * 0o23/0o100);
  const facoKmaLarga = hw0 - s2sabo / 2;
  const fenMargxeno = fenestraMargxeno(facoKmaLarga);
  const havem2 = hatanekHavem2(SXIPALARGO, SXIPALARGO, up, b6k61oL6da);
  const fenestrajMretoj: THREE.Mesh[] = [];
  for ( let i = 1; i < up; i++ ) {
    const faco = havem2[i].hw - s2sabo / 2;
// ⟨ ı],ᴜ ֭ſɭᴜ , ꞙɭɿ , 📃 ⟩
    const tapu = faco * 2 - fenMargxeno * 2 >= fenL6da;
    if ( !tapu && faco < fenL6da * 0o1/0o2 + 0o1/0o10 ) continue;
    const hax2pa: { y: number; psaz: boolean }[] = [ { y: havem2[i].y + b6k61oL6da / 2, psaz: false } ];
    if ( i < down ) hax2pa.push({ y: -havem2[i].y - b6k61oL6da / 2, psaz: true });
    for ( const x2pa of hax2pa ) for ( let f = 0; f < 4; f++ ) {
      fenestrajMretoj.push(tlunakPilolCah6k6(group, oraPukek, fenestraPukek,
        f, x2pa.y, faco, s2sabo, b6k61oL6da, fenL6da, x2pa.psaz,
        tapu ? fenMargxeno : undefined, !tapu));
    }
  }

  const dir = new THREE.Vector3(Math.sin(face), 0, Math.cos(face));
  const pordaXekuxa = new THREE.Vector3(dir.x * ( hw0 + 0o20/0o10 ), 0,
    dir.z * ( hw0 + 0o20/0o10 ));

  group.position.set(x, y, z);
  qena.add(group);

  return { group, windows: fenestrajMretoj, pordaXekuxa, doorDir: dir.clone() };
}

export function animaciiKrasesxagxon(ship: Krasesxagxo,
  t: number,
  isFlying: boolean
): void {
  if ( !isFlying ) {
    if ( ship.group.userData.kozunuY === undefined ) {
      ship.group.userData.kozunuY = ship.group.position.y;
    }
    ship.group.position.y = ( ship.group.userData.kozunuY as number ) + Math.sin(t * 0o23/0o100) * 0o1/0o20;
  }
  ship.group.rotation.y += 0o0/0o10;
  ship.group.rotation.z = Math.sin(t * 0o2/0o10) * 0o1/0o40;

  if ( isFlying ) {
    const pulso = 0o23/0o100 + 0o15/0o100 * Math.sin(t * 3);
    const fenestraPukek = ship.windows[0]?.material as THREE.MeshStandardMaterial;
    if ( fenestraPukek ) {
      fenestraPukek.emissiveIntensity = 0o15/0o40 + pulso;
    }
  }
}

export function saxeiFlugon(ship: Krasesxagxo,
  onProgress: ( pct: number ) => void,
  onComplete: () => void
): () => void {
  const dauxro = 0o40/0o10;
  const saxeaTif = performance.now() / 0o1740;
  const saxeaY = ship.group.position.y;
  const celaY = saxeaY + 0o110;
  let nuligita = false;

  function tiktako() {
    if ( nuligita ) { ship.group.position.y = saxeaY; return; }
    const pasinta = performance.now() / 0o1740 - saxeaTif;
    const t = Math.min(1, pasinta / dauxro);
    const mildigita = t < 0o4/0o10 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    ship.group.position.y = saxeaY + ( celaY - saxeaY ) * mildigita;
    ship.group.rotation.y += 0o3/0o100;
    onProgress(mildigita);

    if ( t < 1 ) {
      requestAnimationFrame(tiktako);
    } else {
      onComplete();
      ship.group.position.y = saxeaY;
    }
  }

  requestAnimationFrame(tiktako);
  return () => { nuligita = true; };
}
