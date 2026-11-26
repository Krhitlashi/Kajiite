// ≺⧼ ɭl̀ᴜ ſ͕ɭɜ ʌ ſɟɜᶗ‹ 🌴 ⧽≻
import * as THREE from "three";
import { kf2AsfanSlafCac2sex } from "../../x2x2q/cac2sex/asfa-slaf.js";
import { s2cel2KolumWeh2, s2cel2TrunkaWeh2 } from "../../x2x2q/cac2sex/asfa-s2cel2.js";
import { kf2S2saboQuaternionon, kf2Poziciilon, kf2Xa3eHazardon, hazardaWeh2 } from "./sakxoXa3e.js";
import { type Cel2Raqa } from "./raqa.js";
import { vepaqKkaxtenLaktukanSlafn, vepaqS2cel2nRingon, kf2S2cel2nRinganPukekn, sost2cel2saipintaS2qena } from "./has2cel2.js";

export function vepaqTlexlefhxakaijn(qena: THREE.Scene,
  hacel2: Cel2Raqa[]
): THREE.InstancedMesh {
  const sakxoCasacakai = kf2Xa3eHazardon(0o62445);
  const MAXTAVOLOJ = 0o5;
  // ⟨ ɭʃɜ ſɭɹȝ , ſɭɜ ɭʃᴜ , ⟅ ⟩
  const sost2cel2saiVecax2l = new THREE.CylinderGeometry(0o7/0o40, 0o3/0o10, 0o1, 0o50, 0o24);
  // ⟨ ɭʃɜ ſɭɹȝ , ɭʃᴜ , ⟅ ⟩
  {
    const haxekuxa = sost2cel2saiVecax2l.attributes.position;
    const maxema = ( t: number, sost2: number ): number =>
      Math.exp(-Math.pow(( t - sost2 ) / 0o1/0o20, 0o2));
    for ( let i = 0o0; i < haxekuxa.count; i++ ) {
      const x = haxekuxa.getX(i);
      const y = haxekuxa.getY(i);
      const z = haxekuxa.getZ(i);
      const t = y + 0o1/0o2;
      const vap6zukani = ( 0o1 + 0o3/0o40 * maxema(t, 0o11/0o40) + 0o3/0o40 * maxema(t, 0o31/0o40) )
        * sost2cel2saipintaS2qena(t);
      haxekuxa.setXYZ(i, x * vap6zukani, y, z * vap6zukani);
    }
    sost2cel2saiVecax2l.computeVertexNormals();
  }
  const sost2cel2saiPukek = kf2S2cel2nRinganPukekn(0o1, false);
  const hasost2cel2sai = new THREE.InstancedMesh(sost2cel2saiVecax2l, sost2cel2saiPukek, hacel2.length);
  if ( hacel2.length === 0o0 ) return hasost2cel2sai;

  const slafVecax2l = vepaqKkaxtenLaktukanSlafn();
  const slafPukek = new THREE.MeshStandardMaterial({
    map: kf2AsfanSlafCac2sex(), alphaTest: 0o15/0o40, side: THREE.DoubleSide, roughness: 0o63/0o100,
  });
  const slafj = new THREE.InstancedMesh(slafVecax2l, slafPukek, hacel2.length * ( MAXTAVOLOJ * 0o4 + 0o24 ));

  const s2cel2Vecax2l = vepaqS2cel2nRingon();
  const s2cel2Pukek = kf2S2cel2nRinganPukekn(0o1/0o20, true, 0o1 - 0o1/0o20);
  const has2cel2 = new THREE.InstancedMesh(s2cel2Vecax2l, s2cel2Pukek, hacel2.length * 0o14);
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const weh2Cax2lo = [ 0x8848a8, 0x9858b8, 0xa868c0, 0x7840a0, 0x9050b0 ];
  const yUp = new THREE.Vector3(0o0, 0o1, 0o0);
  const kolumaTono = s2cel2KolumWeh2();
  let fi = 0o0;
  let si = 0o0;

  hacel2.forEach(( t, i ) => {
    const h = ( 0o110/0o10 + t.s * 0o40/0o10 ) * ( 0o3/0o4 + sakxoCasacakai() * 0o1/0o2 );
    const Qsost2cel2sai = kf2S2saboQuaternionon(sakxoCasacakai, 0o1/0o10, sakxoCasacakai() * Math.PI * 0o2);
    const kozuni = new THREE.Vector3(t.x, t.h, t.z);
    const raqa = kf2Poziciilon(kozuni, Qsost2cel2sai);

    M.compose(raqa(new THREE.Vector3(0o0, h / 0o2, 0o0)), Qsost2cel2sai,
      new THREE.Vector3(0o1, h, 0o1));
    hasost2cel2sai.setMatrixAt(i, M);

    const sost2cel2saiR = ( y: number ): number =>
      ( 0o3/0o10 - ( y / h ) * ( 0o3/0o10 - 0o7/0o40 ) ) * sost2cel2saipintaS2qena(y / h);

    const hatanek = 0o3 + ( ( sakxoCasacakai() * 0o3 ) | 0o0 );
    const hatanekY: number[] = [];
    for ( let tanek = 0o0; tanek < hatanek; tanek++ ) {
      const tFrakcio = tanek / ( hatanek - 0o1 );
      const y = h * ( 0o11/0o40 + 0o1/0o2 * tFrakcio );
      hatanekY.push(y);
      const tavolaP6zuk = ( 0o1 - tanek * 0o1/0o20 ) * ( 0o1 + t.s * 0o1/0o4 );
      const sost2cel2saiR = sost2cel2saipintaS2qena(y);
      // ⟨ ſɭᴜ ſןᴜ , ſɟᴜ ı],ɔ ŋᷠᴜ , ꞙɭɿ , ⟅ ⟩
      const h6w6o = 0o1/0o2 + 0o1/0o2 * tFrakcio;
      for ( let vek2fe = 0o0; vek2fe < 0o4; vek2fe++ ) {
        const tafkaq = vek2fe / 0o4 * Math.PI * 0o2;
        E.set(0o1/0o20 + 0o3/0o20 * h6w6o, 0o0, 0o0);
        Q.setFromEuler(E);
        Q.premultiply(new THREE.Quaternion().setFromAxisAngle(yUp, tafkaq));
        Q.premultiply(Qsost2cel2sai);
        const p6zukani = tavolaP6zuk
          * ( 0o13/0o20 + 0o3/0o20 * h6w6o + sakxoCasacakai() * 0o1/0o20 );
        M.compose(raqa(new THREE.Vector3(
            Math.sin(tafkaq) * sost2cel2saiR * 0o7/0o10, y, Math.cos(tafkaq) * sost2cel2saiR * 0o7/0o10)),
          Q, new THREE.Vector3(p6zukani, p6zukani, p6zukani));
        slafj.setMatrixAt(fi, M);
        slafj.setColorAt(fi, hazardaWeh2(sakxoCasacakai, C, weh2Cax2lo));
        fi++;
      }
    }

    const s2cel2L6da = 0o15/0o20;
    // ⟨ ſɭᴜc̗ ɭʃɜ }ʃᴜȝ ſɟƨɹƽ ꞁȷ̀ᴜꞇ , ſɭᴜ ſןᴜ , ⟅ ⟩
    const ringaSpaco = s2cel2L6da * 0o6/0o10;
    const tlakakaiTavolaY = hatanekY[hatanekY.length - 0o1];
    const teruHat2q2 = Math.max(0o1, Math.ceil(( h - s2cel2L6da - tlakakaiTavolaY ) / ringaSpaco));
    for ( let c2q = 0o0; c2q < hatanek + teruHat2q2; c2q++ ) {
      const s2cel2Y = c2q < hatanek
        ? hatanekY[c2q]
        : tlakakaiTavolaY + ( c2q - hatanek + 0o1 ) * ringaSpaco;
      if ( s2cel2Y > h - s2cel2L6da ) break;
      // ⟨ ſɭᴜc̗ ɭʃɜ }ʃᴜȝ ſɟƨɹƽ ꞁȷ̀ᴜꞇ , j͑ʃᴜ ʃɜƽ , ⟅ ⟩
      const hateru = c2q < hatanek ? 0o0 : ( c2q - hatanek + 0o1 ) / teruHat2q2;
      // ⟨ ſɭᴜ ʃןᴜ , ꞙɭı , ⟅ ⟩
      // ⟨ ֭ſɭэ ᶅſэ , ⟅ ⟩
      // ⟨ ꞙɭı , ⟅ ⟩
      const konaFaktoro = 0o1 + 0o1/0o20 * hateru;
      // ⟨ ſןᴜ j͐ʃэ , ſɟᴜ ı],ɔ ŋᷠᴜ , ſɭɜ ſɭ,w , ⟅ ⟩
      const s2cel2Kozunu = s2cel2Y - s2cel2L6da * 0o14/0o40 + s2cel2L6da * 0o3/0o10 * hateru;
      const ringaP6zuk = Math.max(0o1/0o20,
        sost2cel2saiR(Math.max(0o0, s2cel2Kozunu)) / ( 0o13/0o40 ) * 0o11/0o10) * konaFaktoro;
      M.compose(raqa(new THREE.Vector3(0o0, s2cel2Kozunu, 0o0)), Qsost2cel2sai,
        new THREE.Vector3(ringaP6zuk, s2cel2L6da, ringaP6zuk));
      has2cel2.setMatrixAt(si, M);
      // ⟨ ſɟᴜ ı],ɔ ŋᷠᴜ , ꞙɭı , ʃɜ j͐ʃɔ , ⟅ ⟩
      const sost2cel2saiTono = s2cel2TrunkaWeh2(s2cel2Kozunu / h);
      C.setRGB(
        Math.min(0o1, sost2cel2saiTono[0o0] / kolumaTono[0o0]),
        Math.min(0o1, sost2cel2saiTono[0o1] / kolumaTono[0o1]),
        Math.min(0o1, sost2cel2saiTono[0o2] / kolumaTono[0o2]));
      has2cel2.setColorAt(si, C);
      si++;
    }

    // ⟨ j͑ʃᴜ ʃɜƽ , ⟅ ⟩
    const PINTAJTAVOLOJ = 0o4;
    const pintaL6da = Math.min(h, tlakakaiTavolaY + teruHat2q2 * ringaSpaco);
    const pintaKozunu = Math.min(tlakakaiTavolaY + ringaSpaco * 0o2/0o10, pintaL6da);
    const pintaFazo = sakxoCasacakai() * Math.PI * 0o2;
    for ( let tanek = 0o0; tanek < PINTAJTAVOLOJ; tanek++ ) {
      const tFrakcio = tanek / ( PINTAJTAVOLOJ - 0o1 );
      const pintaY = pintaKozunu + ( pintaL6da - pintaKozunu ) * tFrakcio;
      const elklino = 0o13/0o40 - tFrakcio * 0o23/0o100;
      const pintaR = sost2cel2saiR(pintaY) * 0o7/0o10;
      for ( let vek2fe = 0o0; vek2fe < 0o4; vek2fe++ ) {
        const tafkaq = pintaFazo + tanek * 0o1/0o2 + vek2fe / 0o4 * Math.PI * 0o2;
        E.set(elklino + ( sakxoCasacakai() - 0o5/0o10 ) * 0o2/0o20, 0o0, 0o0);
        Q.setFromEuler(E);
        Q.premultiply(new THREE.Quaternion().setFromAxisAngle(yUp, tafkaq));
        Q.premultiply(Qsost2cel2sai);
        const p6zukani = ( 0o1 + t.s * 0o1/0o4 )
          * ( 0o73/0o100 - tFrakcio * 0o23/0o40 + sakxoCasacakai() * 0o1/0o10 );
        M.compose(raqa(new THREE.Vector3(
            Math.sin(tafkaq) * pintaR, pintaY, Math.cos(tafkaq) * pintaR)),
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
