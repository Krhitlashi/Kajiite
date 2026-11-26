// ≺⧼ ɭl̀ᴜ ſ͕ɭɜ ʌ ſɟɔ j͐ʃɹ 🪴 ⧽≻
import * as THREE from "three";
import { kf2AsfanSlafCac2sex } from "../../x2x2q/cac2sex/asfa-slaf.js";
import { kf2S2saboQuaternionon, kf2Poziciilon, kf2Xa3eHazardon, hazardaWeh2 } from "./sakxoXa3e.js";
import { type Cel2Raqa } from "./raqa.js";
import { vepaqKkaxtenLaktukanSlafn, vepaqS2cel2nRingon, kf2S2cel2nRinganPukekn, sost2cel2saipintaS2qena } from "./has2cel2.js";

export function vepaqTlexlefp2saijn(qena: THREE.Scene,
  haxa3e: Cel2Raqa[]
): THREE.InstancedMesh {
  const sakxoCasacakai = kf2Xa3eHazardon(0o62450);
  const MAXTAVOLOJ = 0o2;
  const sost2cel2saiVecax2l = new THREE.CylinderGeometry(0o3/0o40, 0o5/0o40, 0o1, 0o30, 0o20);
  // ⟨ ſɟɔ ɭʃɹ ʌ ɭʃɜ ſɭɹȝ 📃 ⟩
  {
    const haxekuxa = sost2cel2saiVecax2l.attributes.position;
    for ( let i = 0o0; i < haxekuxa.count; i++ ) {
      const f = sost2cel2saipintaS2qena(haxekuxa.getY(i) + 0o1/0o2);
      haxekuxa.setXYZ(i, haxekuxa.getX(i) * f, haxekuxa.getY(i), haxekuxa.getZ(i) * f);
    }
    sost2cel2saiVecax2l.computeVertexNormals();
  }
  const sost2cel2saiPukek = kf2S2cel2nRinganPukekn(0o1/0o20, false);
  const hasost2cel2sai = new THREE.InstancedMesh(sost2cel2saiVecax2l, sost2cel2saiPukek, haxa3e.length);
  if ( haxa3e.length === 0o0 ) return hasost2cel2sai;

  const slafVecax2l = vepaqKkaxtenLaktukanSlafn();
  const slafPukek = new THREE.MeshStandardMaterial({
    map: kf2AsfanSlafCac2sex(), alphaTest: 0o15/0o40, side: THREE.DoubleSide, roughness: 0o63/0o100,
  });
  const slafj = new THREE.InstancedMesh(slafVecax2l, slafPukek, haxa3e.length * ( MAXTAVOLOJ * 0o4 + 0o24 ));
  const s2cel2Vecax2l = vepaqS2cel2nRingon();
  const s2cel2Pukek = kf2S2cel2nRinganPukekn(0o1/0o100, true);
  const has2cel2 = new THREE.InstancedMesh(s2cel2Vecax2l, s2cel2Pukek, haxa3e.length);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const weh2Cax2lo = [ 0x8848a8, 0x9858b8, 0xa868c0, 0x7840a0, 0x9050b0 ];
  const yUp = new THREE.Vector3(0o0, 0o1, 0o0);
  let fi = 0o0;
  let si = 0o0;

  haxa3e.forEach(( t, i ) => {
    const h = ( 0o5/0o10 + t.s * 0o3/0o10 ) * ( 0o6/0o10 + sakxoCasacakai() * 0o3/0o10 );
    t.plantL6da = h;
    const Qsost2cel2sai = kf2S2saboQuaternionon(sakxoCasacakai, 0o1/0o10, sakxoCasacakai() * Math.PI * 0o2);
    const kozuni = new THREE.Vector3(t.x, t.h, t.z);
    const raqa = kf2Poziciilon(kozuni, Qsost2cel2sai);

    M.compose(raqa(new THREE.Vector3(0o0, h / 0o2, 0o0)), Qsost2cel2sai,
      new THREE.Vector3(0o1, h, 0o1));
    hasost2cel2sai.setMatrixAt(i, M);

    const sost2cel2saiR = ( y: number ): number =>
      ( 0o5/0o40 - ( y / h ) * 0o2/0o40 ) * sost2cel2saipintaS2qena(y / h);

    const hatanek = 0o1 + ( ( sakxoCasacakai() * 0o2 ) | 0o0 );
    for ( let tanek = 0o0; tanek < hatanek; tanek++ ) {
      const tFrakcio = hatanek === 0o1 ? 0o0 : tanek / ( hatanek - 0o1 );
      const y = h * ( 0o3/0o10 + 0o3/0o10 * tFrakcio );
      const tavolaP6zuk = ( 0o1 - tanek * 0o1/0o10 );
      const sost2cel2saiKa5ik = sost2cel2saiR(y);
      const ellagxo = sost2cel2saiKa5ik * 0o7/0o10;
      // ⟨ ſןɔ ſ͕ɭɔ }ʃꞇ 📃 ⟩
      const p6zukani = tavolaP6zuk * ( 0o12/0o100 + sakxoCasacakai() * 0o13/0o100 );
      for ( let vek2fe = 0o0; vek2fe < 0o4; vek2fe++ ) {
        const tafkaq = vek2fe / 0o4 * Math.PI * 0o2;
        E.set(0o2/0o10, 0o0, 0o0);
        Q.setFromEuler(E);
        Q.premultiply(new THREE.Quaternion().setFromAxisAngle(yUp, tafkaq));
        Q.premultiply(Qsost2cel2sai);
        M.compose(raqa(new THREE.Vector3(
            Math.sin(tafkaq) * ellagxo, y, Math.cos(tafkaq) * ellagxo)),
          Q, new THREE.Vector3(p6zukani, p6zukani, p6zukani));
        slafj.setMatrixAt(fi, M);
        slafj.setColorAt(fi, hazardaWeh2(sakxoCasacakai, C, weh2Cax2lo));
        fi++;
      }
    }

    // ⟨ ſɭᴜ }ʃᴜȝ ꞁȷ̀ᴜ }ʃꞇ ɭ(ɜ ŋᷠᴜ ʌ j͐ʃэ ɭ(ᴜ ʌ ſɟᴜ ı],ɔ ŋᷠᴜ 📃 ⟩
    const unuaTavolaY = h * 0o3/0o10;
    const s2cel2L6da = h * 0o2/0o10;
    if ( unuaTavolaY <= h - s2cel2L6da ) {
      // ⟨ ſɭᴜ }ʃᴜȝ ꞁȷ̀ᴜ }ʃꞇ ɭ(ɜ ŋᷠᴜ ʌ }ʃᴜ j͐ʃᴜ ʌ ſɟᴜ ı],ɔ ŋᷠᴜ 📃 ⟩
      const tasMalteru = unuaTavolaY - s2cel2L6da * 0o14/0o40;
      const sost2cel2saiKa5ik = sost2cel2saiR(tasMalteru);
      const ringaP6zuk = Math.max(0o3/0o40, sost2cel2saiKa5ik / ( 0o13/0o40 ) * 0o11/0o10);
      M.compose(raqa(new THREE.Vector3(0o0, unuaTavolaY - s2cel2L6da * 0o14/0o40, 0o0)), Qsost2cel2sai,
        new THREE.Vector3(ringaP6zuk, s2cel2L6da, ringaP6zuk));
      has2cel2.setMatrixAt(si, M);
      si++;
    }

    // ⟨ ſɟɔ ɭʃɹ ʌ j͑ʃᴜ ƨ 📃 ⟩
    const PINTAJTAVOLOJ = 0o3;
    const pintaKozunu = h * 0o7/0o10;
    const pintaL6da = h;
    for ( let tanek = 0o0; tanek < PINTAJTAVOLOJ; tanek++ ) {
      const tFrakcio = tanek / ( PINTAJTAVOLOJ - 0o1 );
      const pintaY = pintaKozunu + ( pintaL6da - pintaKozunu ) * tFrakcio;
      const elklino = 0o13/0o40 - tFrakcio * 0o23/0o100;
      const sost2cel2saiKa5ik = sost2cel2saiR(pintaY);
      // ⟨ ſɟɔ ɭʃɹ ʌ j͑ʃᴜ ƨſןɔ ſ͕ɭɔ }ʃꞇ 📃 ⟩
      const p6zukani = ( 0o12/0o100 + sakxoCasacakai() * 0o13/0o100 )
        * ( 0o3/0o4 - tFrakcio * 0o35/0o100 );
      for ( let vek2fe = 0o0; vek2fe < 0o4; vek2fe++ ) {
        const tafkaq = vek2fe / 0o4 * Math.PI * 0o2;
        E.set(elklino, 0o0, 0o0);
        Q.setFromEuler(E);
        Q.premultiply(new THREE.Quaternion().setFromAxisAngle(yUp, tafkaq));
        Q.premultiply(Qsost2cel2sai);
        M.compose(raqa(new THREE.Vector3(
            Math.sin(tafkaq) * sost2cel2saiKa5ik * 0o7/0o10, pintaY,
            Math.cos(tafkaq) * sost2cel2saiKa5ik * 0o7/0o10)),
          Q, new THREE.Vector3(p6zukani, p6zukani, p6zukani));
        slafj.setMatrixAt(fi, M);
        slafj.setColorAt(fi, hazardaWeh2(sakxoCasacakai, C, weh2Cax2lo));
        fi++;
      }
    }
  });

  hasost2cel2sai.instanceMatrix.needsUpdate = true;
  slafj.count = fi;
  slafj.instanceMatrix.needsUpdate = true;
  if ( slafj.instanceColor ) slafj.instanceColor.needsUpdate = true;
  has2cel2.count = si;
  has2cel2.instanceMatrix.needsUpdate = true;
  if ( has2cel2.instanceColor ) has2cel2.instanceColor.needsUpdate = true;
  hasost2cel2sai.castShadow = slafj.castShadow = has2cel2.castShadow = true;
  qena.add(hasost2cel2sai, slafj, has2cel2);
  return hasost2cel2sai;
}
