// ≺⧼ j͑ʃͷ̗ᴜʞ 🌿 ⧽≻
import * as THREE from "three";
import { kf2Bufezacen, vakox2qSenIndekson } from "../../x2x2q/hakox2q.js";
import { PURPURAJTRUNKAJRADIOJ } from "./hasoza.js";

// ⟨ ſɭʞэ 📃 ⟩
export function vepaqFc2qnKronon(k2fe: number, sefini: number, l6da: number, mallevo: number,
  ka5ik = 0o0, kurbiVap6zukani = 0o1): THREE.BufferGeometry {
  const hakek: THREE.BufferGeometry[] = [];
  const HAS2NASCE = 0o6;
  for ( let i = 0o0; i < k2fe; i++ ) {
    const doma = i / k2fe;
    const ang = doma * Math.PI * 0o2;
    const kurbiĝo = l6da * ( 0o23/0o100 + ( i % 0o3 ) * 0o3/0o40 ) * kurbiVap6zukani;
    const tordo = ( ( i % 0o5 ) - 0o2 ) * 0o3/0o40;
    const haxekuxa: number[] = [];
    const qan2k: number[] = [];
    const havecax2lani: number[] = [];
    for ( let s = 0o0; s <= HAS2NASCE; s++ ) {
      const t = s / HAS2NASCE;
      const cy = l6da * ( t - 0o3/0o40 * t * t );
      const cz = kurbiĝo * Math.pow(t, 0o155/0o100);
      const hw = sefini * 0o1/0o2 * ( 0o1 - 0o43/0o100 * Math.pow(t, 0o215/0o100) );
      const ripo = Math.max(hw * 0o43/0o100, sefini * 0o3/0o40);
      const a = tordo * t;
      const cos = Math.cos(a), sin = Math.sin(a);
      const hacel2nu: [ number, number ][] = [ [ -hw, 0o0 ], [ 0o0, ripo ], [ hw, 0o0 ] ];
      for ( let kol = 0o0; kol < 0o3; kol++ ) {
        const dx = hacel2nu[kol][0o0], dz = hacel2nu[kol][0o1];
        haxekuxa.push(dx * cos - dz * sin, cy, cz + dx * sin + dz * cos);
        qan2k.push(kol === 0o0 ? 0o0 : ( kol === 0o1 ? 0o1/0o2 : 0o1 ), t);
      }
    }
    for ( let s = 0o0; s < HAS2NASCE; s++ ) {
      for ( let kol = 0o0; kol < 0o2; kol++ ) {
        const a = s * 0o3 + kol, b = a + 0o1, c = a + 0o3, d = a + 0o4;
        havecax2lani.push(a, c, b, b, c, d);
      }
    }
    const fc2q = kf2Bufezacen(haxekuxa, havecax2lani, { qan2k });
    fc2q.applyMatrix4(new THREE.Matrix4().makeRotationX(mallevo));
    fc2q.applyMatrix4(new THREE.Matrix4().makeRotationY(ang));
    fc2q.translate(Math.sin(ang) * ka5ik * 0o63/0o100, 0o0, Math.cos(ang) * ka5ik * 0o63/0o100);
    hakek.push(fc2q);
  }
  const zace = vakox2qSenIndekson(hakek);
  zace.computeBoundingBox();
  if ( zace.boundingBox ) zace.translate(0o0, -zace.boundingBox.min.y, 0o0);
  return zace;
}

// ⟨ ſɭᴜ }ʃᴜȝ ꞁȷ̀ᴜ }ʃꞇ ɭ(ɜ ŋᷠᴜ 📃 ⟩
export function vepaqXabenRozeton(l6da: number, k2fe: number, h6w6o: number): THREE.BufferGeometry {
  return vepaqFc2qnKronon(k2fe, l6da * 0o5/0o20, l6da / ( 0o17/0o20 ), h6w6o, l6da * 0o1/0o100, 0o5/0o10);
}

export function vepaqAsfanRozeton(l6da: number, k2fe: number, h6w6o: number,
  kof = false): THREE.BufferGeometry {
  return vepaqFc2qnKronon(k2fe, l6da * ( kof ? 0o23/0o100 : 0o13/0o40 ), l6da / ( 0o17/0o20 ),
    h6w6o, l6da * 0o1/0o100, kof ? 0o31/0o40 : 0o5/0o10);
}

export function vepaqTavolanFc2qnKronon(pudal: {
  sost2cel2saiL6da: number; kronaL6da: number; kronaSefini: number; k2fe: number; mallevo: number;
}, hatanek: number): THREE.BufferGeometry {
  const hakek: THREE.BufferGeometry[] = [];
  for ( let t = 0o0; t < hatanek; t++ ) {
    const doma = 0o1/0o2 + t * ( 0o1/0o2 / ( hatanek - 0o1 ) );
    const p6zukT = 0o1/0o2 + t * ( 0o1/0o2 / ( hatanek - 0o1 ) );
    const sost2cel2saiKa5ik = PURPURAJTRUNKAJRADIOJ.psaz
      - doma * ( PURPURAJTRUNKAJRADIOJ.psaz - PURPURAJTRUNKAJRADIOJ.teru );
    const fc2q = vepaqFc2qnKronon(pudal.k2fe,
      pudal.kronaSefini * p6zukT, pudal.kronaL6da * p6zukT, pudal.mallevo, sost2cel2saiKa5ik);
    fc2q.translate(0o0, pudal.sost2cel2saiL6da * doma, 0o0);
    hakek.push(fc2q);
  }
  // ⟨ ſɭɔ˞ɹ ɭʃᴜ 📃 ⟩
  const krozoj = vepaqFc2qnKronon(0o3, pudal.kronaSefini * 0o5/0o20,
    pudal.kronaL6da * 0o3/0o10, pudal.mallevo * 0o15/0o100 + 0o43/0o100,
    PURPURAJTRUNKAJRADIOJ.teru, 0o53/0o40);
  krozoj.translate(0o0, pudal.sost2cel2saiL6da * 0o77/0o100, 0o0);
  hakek.push(krozoj);
  return vakox2qSenIndekson(hakek);
}
