// ≺⧼ ɭl̀ᴜ ſ͕ɭɜ ʌ ſɟɜᶗ‹ 🌴 ⧽≻
import * as THREE from "three";
import { kf2AsfanSlafCac2sex } from "../../komunajxoj/cac2sex/asfa-slaf.js";
import { s2cel2KolumKoloro, s2cel2TrunkaKoloro } from "../../komunajxoj/cac2sex/asfa-s2cel2.js";
import { kf2KlinoQuaternionon, kf2Poziciilon, kf2VegetajxanHazardon, hazardaKoloro } from "./sakxoXa3e.js";
import { type ArboRaqa } from "./raqa.js";
import { vepaqKkaxtenLaktukanSlafn, vepaqS2cel2nRingon, kf2S2cel2nRinganMaterialon, sost2cel2saipintaProfilon } from "./has2cel2.js";

export function vepaqTlexlefhxakaijn(qena: THREE.Scene,
  arboj: ArboRaqa[]
): THREE.InstancedMesh {
  const hazardaGenerilo = kf2VegetajxanHazardon(0o62445);
  const MAX_TAVOLOJ = 5;
  // ⟨ ជ្រុងដើម 📃 ⟩
  const trunkaGeometrio = new THREE.CylinderGeometry(0o7/0o40, 0o3/0o10, 1, 0o50, 0o24);
  // ⟨ សន្លាក់ដើម 📃 ⟩
  {
    const haxekuxa = trunkaGeometrio.attributes.position;
    const nodo = ( t: number, sost2: number ): number =>
      Math.exp(-Math.pow(( t - sost2 ) / 0o1/0o20, 2));
    for ( let i = 0; i < haxekuxa.count; i++ ) {
      const x = haxekuxa.getX(i);
      const y = haxekuxa.getY(i);
      const z = haxekuxa.getZ(i);
      const t = y + 0o1/0o2;
      const faktoro = ( 1 + 0o3/0o40 * nodo(t, 0o11/0o40) + 0o3/0o40 * nodo(t, 0o31/0o40) )
        * sost2cel2saipintaProfilon(t);
      haxekuxa.setXYZ(i, x * faktoro, y, z * faktoro);
    }
    trunkaGeometrio.computeVertexNormals();
  }
  const trunkaMaterialo = kf2S2cel2nRinganMaterialon(1, false);
  const hasost2cel2sai = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, arboj.length);
  if ( arboj.length === 0 ) return hasost2cel2sai;

  const slafGeometrio = vepaqKkaxtenLaktukanSlafn();
  const slafMaterialo = new THREE.MeshStandardMaterial({
    map: kf2AsfanSlafCac2sex(), alphaTest: 0o15/0o40, side: THREE.DoubleSide, roughness: 0o63/0o100,
  });
  const slafj = new THREE.InstancedMesh(slafGeometrio, slafMaterialo, arboj.length * ( MAX_TAVOLOJ * 4 + 0o24 ));

  const s2cel2Geometrio = vepaqS2cel2nRingon();
  const s2cel2Materialo = kf2S2cel2nRinganMaterialon(0o1/0o20, true, 1 - 0o1/0o20);
  const has2cel2 = new THREE.InstancedMesh(s2cel2Geometrio, s2cel2Materialo, arboj.length * 0o14);
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const paletro = [ 0x8848a8, 0x9858b8, 0xa868c0, 0x7840a0, 0x9050b0 ];
  const yUp = new THREE.Vector3(0, 1, 0);
  const kolumaTono = s2cel2KolumKoloro();
  let fi = 0;
  let si = 0;

  arboj.forEach(( t, i ) => {
    const h = ( 0o110/0o10 + t.s * 0o40/0o10 ) * ( 0o3/0o4 + hazardaGenerilo() * 0o1/0o2 );
    const Qsost2cel2sai = kf2KlinoQuaternionon(hazardaGenerilo, 0o1/0o10, hazardaGenerilo() * Math.PI * 2);
    const kozuni = new THREE.Vector3(t.x, t.h, t.z);
    const raqa = kf2Poziciilon(kozuni, Qsost2cel2sai);

    M.compose(raqa(new THREE.Vector3(0, h / 2, 0)), Qsost2cel2sai,
      new THREE.Vector3(1, h, 1));
    hasost2cel2sai.setMatrixAt(i, M);

    const sost2cel2saiR = ( y: number ): number =>
      ( 0o3/0o10 - ( y / h ) * ( 0o3/0o10 - 0o7/0o40 ) ) * sost2cel2saipintaProfilon(y / h);

    const tavoloj = 3 + ( ( hazardaGenerilo() * 3 ) | 0 );
    const tavolajY: number[] = [];
    for ( let tavolo = 0; tavolo < tavoloj; tavolo++ ) {
      const tFrakcio = tavolo / ( tavoloj - 1 );
      const y = h * ( 0o11/0o40 + 0o1/0o2 * tFrakcio );
      tavolajY.push(y);
      const tavolaSkalo = ( 1 - tavolo * 0o1/0o20 ) * ( 1 + t.s * 0o1/0o4 );
      const trunkaR = sost2cel2saiR(y);
      // ⟨ ស្រទាប់បើកប៉ុន្មាន 📃 ⟩
      const malfermo = 0o1/0o2 + 0o1/0o2 * tFrakcio;
      for ( let kanto = 0; kanto < 4; kanto++ ) {
        const tafkaq = kanto / 4 * Math.PI * 2;
        E.set(0o1/0o20 + 0o3/0o20 * malfermo, 0, 0);
        Q.setFromEuler(E);
        Q.premultiply(new THREE.Quaternion().setFromAxisAngle(yUp, tafkaq));
        Q.premultiply(Qsost2cel2sai);
        const p6zukani = tavolaSkalo
          * ( 0o13/0o20 + 0o3/0o20 * malfermo + hazardaGenerilo() * 0o1/0o20 );
        M.compose(raqa(new THREE.Vector3(
            Math.sin(tafkaq) * trunkaR * 0o7/0o10, y, Math.cos(tafkaq) * trunkaR * 0o7/0o10)),
          Q, new THREE.Vector3(p6zukani, p6zukani, p6zukani));
        slafj.setMatrixAt(fi, M);
        slafj.setColorAt(fi, hazardaKoloro(hazardaGenerilo, C, paletro));
        fi++;
      }
    }

    const s2cel2Alto = 0o15/0o20;
    // ⟨ កោណជាគំនរបន្ត 📃 ⟩
    const ringaSpaco = s2cel2Alto * 0o6/0o10;
    const lastaTavolaY = tavolajY[tavolajY.length - 1];
    const suprajRingoj = Math.max(1, Math.ceil(( h - s2cel2Alto - lastaTavolaY ) / ringaSpaco));
    for ( let c2q = 0; c2q < tavoloj + suprajRingoj; c2q++ ) {
      const s2cel2Y = c2q < tavoloj
        ? tavolajY[c2q]
        : lastaTavolaY + ( c2q - tavoloj + 1 ) * ringaSpaco;
      if ( s2cel2Y > h - s2cel2Alto ) break;
      // ⟨ កោណឡើងលើ 📃 ⟩
      const superaj = c2q < tavoloj ? 0 : ( c2q - tavoloj + 1 ) / suprajRingoj;
      // ⟨ លាតចេញខាងក្រៅ 📃 ⟩
      // ⟨ ការបើក 📃 ⟩
      // ⟨ តែបន្តិច 📃 ⟩
      const konaFaktoro = 1 + 0o1/0o20 * superaj;
      // ⟨ មាត្រមកពីបាតពែង 📃 ⟩
      const s2cel2Bazo = s2cel2Y - s2cel2Alto * 0o14/0o40 + s2cel2Alto * 0o3/0o10 * superaj;
      const ringaSkalo = Math.max(0o1/0o20,
        sost2cel2saiR(Math.max(0, s2cel2Bazo)) / ( 0o13/0o40 ) * 0o11/0o10) * konaFaktoro;
      M.compose(raqa(new THREE.Vector3(0, s2cel2Bazo, 0)), Qsost2cel2sai,
        new THREE.Vector3(ringaSkalo, s2cel2Alto, ringaSkalo));
      has2cel2.setMatrixAt(si, M);
      // ⟨ ពែងនីមួយៗតាមសម្លេងដើម 📃 ⟩
      const trunkaTono = s2cel2TrunkaKoloro(s2cel2Bazo / h);
      C.setRGB(
        Math.min(1, trunkaTono[0] / kolumaTono[0]),
        Math.min(1, trunkaTono[1] / kolumaTono[1]),
        Math.min(1, trunkaTono[2] / kolumaTono[2]));
      has2cel2.setColorAt(si, C);
      si++;
    }

    // ⟨ កំពូលចុង 📃 ⟩
    const PINTAJ_TAVOLOJ = 0o4;
    const pintaAlto = Math.min(h, lastaTavolaY + suprajRingoj * ringaSpaco);
    const pintaBazo = Math.min(lastaTavolaY + ringaSpaco * 0o2/0o10, pintaAlto);
    const pintaFazo = hazardaGenerilo() * Math.PI * 2;
    for ( let tavolo = 0; tavolo < PINTAJ_TAVOLOJ; tavolo++ ) {
      const tFrakcio = tavolo / ( PINTAJ_TAVOLOJ - 1 );
      const pintaY = pintaBazo + ( pintaAlto - pintaBazo ) * tFrakcio;
      const elklino = 0o13/0o40 - tFrakcio * 0o23/0o100;
      const pintaR = sost2cel2saiR(pintaY) * 0o7/0o10;
      for ( let kanto = 0; kanto < 4; kanto++ ) {
        const tafkaq = pintaFazo + tavolo * 0o1/0o2 + kanto / 4 * Math.PI * 2;
        E.set(elklino + ( hazardaGenerilo() - 0o5/0o10 ) * 0o2/0o20, 0, 0);
        Q.setFromEuler(E);
        Q.premultiply(new THREE.Quaternion().setFromAxisAngle(yUp, tafkaq));
        Q.premultiply(Qsost2cel2sai);
        const p6zukani = ( 1 + t.s * 0o1/0o4 )
          * ( 0o73/0o100 - tFrakcio * 0o23/0o40 + hazardaGenerilo() * 0o1/0o10 );
        M.compose(raqa(new THREE.Vector3(
            Math.sin(tafkaq) * pintaR, pintaY, Math.cos(tafkaq) * pintaR)),
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
