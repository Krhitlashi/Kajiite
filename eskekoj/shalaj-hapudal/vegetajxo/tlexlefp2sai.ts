// ≺⧼ ɭl̀ᴜ ſ͕ɭɜ ʌ ſɟɔ j͐ʃɹ 🪴 ⧽≻
import * as THREE from "three";
import { kf2AsfanSlafCac2sex } from "../../komunajxoj/cac2sex/asfa-slaf.js";
import { kf2KlinoQuaternionon, kf2Poziciilon, kf2VegetajxanHazardon, hazardaKoloro } from "./sakxoXa3e.js";
import { type ArboRaqa } from "./raqa.js";
import { vepaqKkaxtenLaktukanSlafn, vepaqS2cel2nRingon, kf2S2cel2nRinganMaterialon, sost2cel2saipintaProfilon } from "./has2cel2.js";

export function vepaqTlexlefp2saijn(qena: THREE.Scene,
  plantoj: ArboRaqa[]
): THREE.InstancedMesh {
  const hazardaGenerilo = kf2VegetajxanHazardon(0o62450);
  const MAX_TAVOLOJ = 2;
  const trunkaGeometrio = new THREE.CylinderGeometry(0o3/0o40, 0o5/0o40, 1, 0o30, 0o20);
  // ⟨ ſɟɔ ɭʃɹ ʌ ɭʃɜ ſɭɹȝ 📃 ⟩
  {
    const haxekuxa = trunkaGeometrio.attributes.position;
    for ( let i = 0; i < haxekuxa.count; i++ ) {
      const f = sost2cel2saipintaProfilon(haxekuxa.getY(i) + 0o1/0o2);
      haxekuxa.setXYZ(i, haxekuxa.getX(i) * f, haxekuxa.getY(i), haxekuxa.getZ(i) * f);
    }
    trunkaGeometrio.computeVertexNormals();
  }
  const trunkaMaterialo = kf2S2cel2nRinganMaterialon(0o1/0o20, false);
  const hasost2cel2sai = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, plantoj.length);
  if ( plantoj.length === 0 ) return hasost2cel2sai;

  const slafGeometrio = vepaqKkaxtenLaktukanSlafn();
  const slafMaterialo = new THREE.MeshStandardMaterial({
    map: kf2AsfanSlafCac2sex(), alphaTest: 0o15/0o40, side: THREE.DoubleSide, roughness: 0o63/0o100,
  });
  const slafj = new THREE.InstancedMesh(slafGeometrio, slafMaterialo, plantoj.length * ( MAX_TAVOLOJ * 4 + 0o24 ));
  const s2cel2Geometrio = vepaqS2cel2nRingon();
  const s2cel2Materialo = kf2S2cel2nRinganMaterialon(0o1/0o100, true);
  const has2cel2 = new THREE.InstancedMesh(s2cel2Geometrio, s2cel2Materialo, plantoj.length);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const paletro = [ 0x8848a8, 0x9858b8, 0xa868c0, 0x7840a0, 0x9050b0 ];
  const yUp = new THREE.Vector3(0, 1, 0);
  let fi = 0;
  let si = 0;

  plantoj.forEach(( t, i ) => {
    const h = ( 0o5/0o10 + t.s * 0o3/0o10 ) * ( 0o6/0o10 + hazardaGenerilo() * 0o3/0o10 );
    t.plantAlto = h;
    const Qsost2cel2sai = kf2KlinoQuaternionon(hazardaGenerilo, 0o1/0o10, hazardaGenerilo() * Math.PI * 2);
    const kozuni = new THREE.Vector3(t.x, t.h, t.z);
    const raqa = kf2Poziciilon(kozuni, Qsost2cel2sai);

    M.compose(raqa(new THREE.Vector3(0, h / 2, 0)), Qsost2cel2sai,
      new THREE.Vector3(1, h, 1));
    hasost2cel2sai.setMatrixAt(i, M);

    const trunkaR = ( y: number ): number =>
      ( 0o5/0o40 - ( y / h ) * 0o2/0o40 ) * sost2cel2saipintaProfilon(y / h);

    const tavoloj = 1 + ( ( hazardaGenerilo() * 2 ) | 0 );
    for ( let tavolo = 0; tavolo < tavoloj; tavolo++ ) {
      const tFrakcio = tavoloj === 1 ? 0 : tavolo / ( tavoloj - 1 );
      const y = h * ( 0o3/0o10 + 0o3/0o10 * tFrakcio );
      const tavolaSkalo = ( 1 - tavolo * 0o1/0o10 );
      const trunkaRadiuso = trunkaR(y);
      const ellagxo = trunkaRadiuso * 0o7/0o10;
      // ⟨ ſןɔ ſ͕ɭɔ }ʃꞇ 📃 ⟩
      const p6zukani = tavolaSkalo * ( 0o12/0o100 + hazardaGenerilo() * 0o13/0o100 );
      for ( let kanto = 0; kanto < 4; kanto++ ) {
        const tafkaq = kanto / 4 * Math.PI * 2;
        E.set(0o2/0o10, 0, 0);
        Q.setFromEuler(E);
        Q.premultiply(new THREE.Quaternion().setFromAxisAngle(yUp, tafkaq));
        Q.premultiply(Qsost2cel2sai);
        M.compose(raqa(new THREE.Vector3(
            Math.sin(tafkaq) * ellagxo, y, Math.cos(tafkaq) * ellagxo)),
          Q, new THREE.Vector3(p6zukani, p6zukani, p6zukani));
        slafj.setMatrixAt(fi, M);
        slafj.setColorAt(fi, hazardaKoloro(hazardaGenerilo, C, paletro));
        fi++;
      }
    }

    // ⟨ ſɭᴜ }ʃᴜȝ ꞁȷ̀ᴜ }ʃꞇ ɭ(ɜ ŋᷠᴜ ʌ j͐ʃэ ɭ(ᴜ ʌ ſɟᴜ ı],ɔ ŋᷠᴜ 📃 ⟩
    const unuaTavolaY = h * 0o3/0o10;
    const s2cel2Alto = h * 0o2/0o10;
    if ( unuaTavolaY <= h - s2cel2Alto ) {
      // ⟨ ſɭᴜ }ʃᴜȝ ꞁȷ̀ᴜ }ʃꞇ ɭ(ɜ ŋᷠᴜ ʌ }ʃᴜ j͐ʃᴜ ʌ ſɟᴜ ı],ɔ ŋᷠᴜ 📃 ⟩
      const tasMalsupro = unuaTavolaY - s2cel2Alto * 0o14/0o40;
      const trunkaRadiuso = trunkaR(tasMalsupro);
      const ringaSkalo = Math.max(0o3/0o40, trunkaRadiuso / ( 0o13/0o40 ) * 0o11/0o10);
      M.compose(raqa(new THREE.Vector3(0, unuaTavolaY - s2cel2Alto * 0o14/0o40, 0)), Qsost2cel2sai,
        new THREE.Vector3(ringaSkalo, s2cel2Alto, ringaSkalo));
      has2cel2.setMatrixAt(si, M);
      si++;
    }

    // ⟨ ſɟɔ ɭʃɹ ʌ j͑ʃᴜ ƨ 📃 ⟩
    const PINTAJ_TAVOLOJ = 0o3;
    const pintaBazo = h * 0o7/0o10;
    const pintaAlto = h;
    for ( let tavolo = 0; tavolo < PINTAJ_TAVOLOJ; tavolo++ ) {
      const tFrakcio = tavolo / ( PINTAJ_TAVOLOJ - 1 );
      const pintaY = pintaBazo + ( pintaAlto - pintaBazo ) * tFrakcio;
      const elklino = 0o13/0o40 - tFrakcio * 0o23/0o100;
      const trunkaRadiuso = trunkaR(pintaY);
      // ⟨ ſɟɔ ɭʃɹ ʌ j͑ʃᴜ ƨſןɔ ſ͕ɭɔ }ʃꞇ 📃 ⟩
      const p6zukani = ( 0o12/0o100 + hazardaGenerilo() * 0o13/0o100 )
        * ( 0o3/0o4 - tFrakcio * 0o35/0o100 );
      for ( let kanto = 0; kanto < 4; kanto++ ) {
        const tafkaq = kanto / 4 * Math.PI * 2;
        E.set(elklino, 0, 0);
        Q.setFromEuler(E);
        Q.premultiply(new THREE.Quaternion().setFromAxisAngle(yUp, tafkaq));
        Q.premultiply(Qsost2cel2sai);
        M.compose(raqa(new THREE.Vector3(
            Math.sin(tafkaq) * trunkaRadiuso * 0o7/0o10, pintaY,
            Math.cos(tafkaq) * trunkaRadiuso * 0o7/0o10)),
          Q, new THREE.Vector3(p6zukani, p6zukani, p6zukani));
        slafj.setMatrixAt(fi, M);
        slafj.setColorAt(fi, hazardaKoloro(hazardaGenerilo, C, paletro));
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
