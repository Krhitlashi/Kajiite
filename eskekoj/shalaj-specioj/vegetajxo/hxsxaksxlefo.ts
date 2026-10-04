// ≺⧼ ដើមត្នោតភ្នំ 🌴 ⧽≻
import * as THREE from "three";
import { kreiPurpuranFolianTeksajxon } from "../../komunajxoj/teksajxoj/purpura-folio.js";
import { sxelaKolumKoloro, sxelaTrunkaKoloro } from "../../komunajxoj/teksajxoj/purpura-sxelo.js";
import { kreiKlinoQuaternionon, kreiPoziciilon, kreiVegetajxanHazardon, hazardaKoloro } from "./hazardoj.js";
import { type ArboMetado } from "./metado.js";
import { konstruiKurbanLaktukanFolion, konstruiSxelanRingon, kreiSxelanRinganMaterialon, trunkopintaProfilon } from "./sxeloj.js";

export function konstruiHxsxaksxlefojn(sceno: THREE.Scene,
  arboj: ArboMetado[]
): THREE.InstancedMesh {
  const hazardaGenerilo = kreiVegetajxanHazardon(0o62445);
  const MAX_TAVOLOJ = 5;
  // ⟨ ជ្រុងដើម 📃 ⟩
  const trunkaGeometrio = new THREE.CylinderGeometry(0o7/0o40, 0o3/0o10, 1, 0o50, 0o24);
  // ⟨ សន្លាក់ដើម 📃 ⟩
  {
    const pozicioj = trunkaGeometrio.attributes.position;
    const nodo = ( t: number, mezo: number ): number =>
      Math.exp(-Math.pow(( t - mezo ) / 0o1/0o20, 2));
    for ( let i = 0; i < pozicioj.count; i++ ) {
      const x = pozicioj.getX(i);
      const y = pozicioj.getY(i);
      const z = pozicioj.getZ(i);
      const t = y + 0o1/0o2;
      const faktoro = ( 1 + 0o3/0o40 * nodo(t, 0o11/0o40) + 0o3/0o40 * nodo(t, 0o31/0o40) )
        * trunkopintaProfilon(t);
      pozicioj.setXYZ(i, x * faktoro, y, z * faktoro);
    }
    trunkaGeometrio.computeVertexNormals();
  }
  const trunkaMaterialo = kreiSxelanRinganMaterialon(1, false);
  const trunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, arboj.length);
  if ( arboj.length === 0 ) return trunkoj;

  const foliaGeometrio = konstruiKurbanLaktukanFolion();
  const foliaMaterialo = new THREE.MeshStandardMaterial({
    map: kreiPurpuranFolianTeksajxon(), alphaTest: 0o15/0o40, side: THREE.DoubleSide, roughness: 0o63/0o100,
  });
  const folioj = new THREE.InstancedMesh(foliaGeometrio, foliaMaterialo, arboj.length * ( MAX_TAVOLOJ * 4 + 0o24 ));

  const sxelaGeometrio = konstruiSxelanRingon();
  const sxelaMaterialo = kreiSxelanRinganMaterialon(0o1/0o20, true, 1 - 0o1/0o20);
  const sxeloj = new THREE.InstancedMesh(sxelaGeometrio, sxelaMaterialo, arboj.length * 0o14);
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const paletro = [ 0x8848a8, 0x9858b8, 0xa868c0, 0x7840a0, 0x9050b0 ];
  const yUp = new THREE.Vector3(0, 1, 0);
  const kolumaTono = sxelaKolumKoloro();
  let fi = 0;
  let si = 0;

  arboj.forEach(( t, i ) => {
    const h = ( 0o110/0o10 + t.s * 0o40/0o10 ) * ( 0o3/0o4 + hazardaGenerilo() * 0o1/0o2 );
    const Qtrunko = kreiKlinoQuaternionon(hazardaGenerilo, 0o1/0o10, hazardaGenerilo() * Math.PI * 2);
    const bazo = new THREE.Vector3(t.x, t.h, t.z);
    const pozicio = kreiPoziciilon(bazo, Qtrunko);

    M.compose(pozicio(new THREE.Vector3(0, h / 2, 0)), Qtrunko,
      new THREE.Vector3(1, h, 1));
    trunkoj.setMatrixAt(i, M);

    const trunkoR = ( y: number ): number =>
      ( 0o3/0o10 - ( y / h ) * ( 0o3/0o10 - 0o7/0o40 ) ) * trunkopintaProfilon(y / h);

    const tavoloj = 3 + ( ( hazardaGenerilo() * 3 ) | 0 );
    const tavolajY: number[] = [];
    for ( let tavolo = 0; tavolo < tavoloj; tavolo++ ) {
      const tFrakcio = tavolo / ( tavoloj - 1 );
      const y = h * ( 0o11/0o40 + 0o1/0o2 * tFrakcio );
      tavolajY.push(y);
      const tavolaSkalo = ( 1 - tavolo * 0o1/0o20 ) * ( 1 + t.s * 0o1/0o4 );
      const trunkaR = trunkoR(y);
      // ⟨ ស្រទាប់បើកប៉ុន្មាន 📃 ⟩
      const malfermo = 0o1/0o2 + 0o1/0o2 * tFrakcio;
      for ( let flanko = 0; flanko < 4; flanko++ ) {
        const angulo = flanko / 4 * Math.PI * 2;
        E.set(0o1/0o20 + 0o3/0o20 * malfermo, 0, 0);
        Q.setFromEuler(E);
        Q.premultiply(new THREE.Quaternion().setFromAxisAngle(yUp, angulo));
        Q.premultiply(Qtrunko);
        const skalo = tavolaSkalo
          * ( 0o13/0o20 + 0o3/0o20 * malfermo + hazardaGenerilo() * 0o1/0o20 );
        M.compose(pozicio(new THREE.Vector3(
            Math.sin(angulo) * trunkaR * 0o7/0o10, y, Math.cos(angulo) * trunkaR * 0o7/0o10)),
          Q, new THREE.Vector3(skalo, skalo, skalo));
        folioj.setMatrixAt(fi, M);
        folioj.setColorAt(fi, hazardaKoloro(hazardaGenerilo, C, paletro));
        fi++;
      }
    }

    const sxelaAlto = 0o15/0o20;
    // ⟨ កោណជាគំនរបន្ត 📃 ⟩
    const ringaSpaco = sxelaAlto * 0o6/0o10;
    const lastaTavolaY = tavolajY[tavolajY.length - 1];
    const suprajRingoj = Math.max(1, Math.ceil(( h - sxelaAlto - lastaTavolaY ) / ringaSpaco));
    for ( let ringo = 0; ringo < tavoloj + suprajRingoj; ringo++ ) {
      const sxelaY = ringo < tavoloj
        ? tavolajY[ringo]
        : lastaTavolaY + ( ringo - tavoloj + 1 ) * ringaSpaco;
      if ( sxelaY > h - sxelaAlto ) break;
      // ⟨ កោណឡើងលើ 📃 ⟩
      const superaj = ringo < tavoloj ? 0 : ( ringo - tavoloj + 1 ) / suprajRingoj;
      // ⟨ លាតចេញខាងក្រៅ 📃 ⟩
      // ⟨ ការបើក 📃 ⟩
      // ⟨ តែបន្តិច 📃 ⟩
      const konaFaktoro = 1 + 0o1/0o20 * superaj;
      // ⟨ មាត្រមកពីបាតពែង 📃 ⟩
      const sxelaBazo = sxelaY - sxelaAlto * 0o14/0o40 + sxelaAlto * 0o3/0o10 * superaj;
      const ringaSkalo = Math.max(0o1/0o20,
        trunkoR(Math.max(0, sxelaBazo)) / ( 0o13/0o40 ) * 0o11/0o10) * konaFaktoro;
      M.compose(pozicio(new THREE.Vector3(0, sxelaBazo, 0)), Qtrunko,
        new THREE.Vector3(ringaSkalo, sxelaAlto, ringaSkalo));
      sxeloj.setMatrixAt(si, M);
      // ⟨ ពែងនីមួយៗតាមសម្លេងដើម 📃 ⟩
      const trunkaTono = sxelaTrunkaKoloro(sxelaBazo / h);
      C.setRGB(
        Math.min(1, trunkaTono[0] / kolumaTono[0]),
        Math.min(1, trunkaTono[1] / kolumaTono[1]),
        Math.min(1, trunkaTono[2] / kolumaTono[2]));
      sxeloj.setColorAt(si, C);
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
      const pintaR = trunkoR(pintaY) * 0o7/0o10;
      for ( let flanko = 0; flanko < 4; flanko++ ) {
        const angulo = pintaFazo + tavolo * 0o1/0o2 + flanko / 4 * Math.PI * 2;
        E.set(elklino + ( hazardaGenerilo() - 0o5/0o10 ) * 0o2/0o20, 0, 0);
        Q.setFromEuler(E);
        Q.premultiply(new THREE.Quaternion().setFromAxisAngle(yUp, angulo));
        Q.premultiply(Qtrunko);
        const skalo = ( 1 + t.s * 0o1/0o4 )
          * ( 0o73/0o100 - tFrakcio * 0o23/0o40 + hazardaGenerilo() * 0o1/0o10 );
        M.compose(pozicio(new THREE.Vector3(
            Math.sin(angulo) * pintaR, pintaY, Math.cos(angulo) * pintaR)),
          Q, new THREE.Vector3(skalo, skalo, skalo));
        folioj.setMatrixAt(fi, M);
        folioj.setColorAt(fi, hazardaKoloro(hazardaGenerilo, C, paletro));
        fi++;
      }
    }
  });

  trunkoj.instanceMatrix.needsUpdate = true;
  folioj.count = fi;
  folioj.instanceMatrix.needsUpdate = true;
  if ( folioj.instanceColor ) folioj.instanceColor.needsUpdate = true;
  sxeloj.count = si;
  sxeloj.instanceMatrix.needsUpdate = true;
  if ( sxeloj.instanceColor ) sxeloj.instanceColor.needsUpdate = true;
  trunkoj.castShadow = folioj.castShadow = sxeloj.castShadow = true;
  sceno.add(trunkoj, folioj, sxeloj);
  return trunkoj;
}
