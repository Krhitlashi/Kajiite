// ≺⧼ ដើមភ្នំ 🪴 ⧽≻
import * as THREE from "three";
import { kreiPurpuranFolianTeksajxon } from "../../komunajxoj/teksajxoj/purpura-folio.js";
import { kreiKlinoQuaternionon, kreiPoziciilon, kreiVegetajxanHazardon, hazardaKoloro } from "./hazardoj.js";
import { type ArboMetado } from "./metado.js";
import { konstruiKurbanLaktukanFolion, konstruiSxelanRingon, kreiSxelanRinganMaterialon, trunkopintaProfilon } from "./sxeloj.js";

export function konstruiPussxlefojn(sceno: THREE.Scene,
  plantoj: ArboMetado[]
): THREE.InstancedMesh {
  const hazardaGenerilo = kreiVegetajxanHazardon(0o62450);
  const MAX_TAVOLOJ = 2;
  const trunkaGeometrio = new THREE.CylinderGeometry(0o3/0o40, 0o5/0o40, 1, 0o30, 0o20);
  // ⟨ ចុងដើម 📃 ⟩
  {
    const pozicioj = trunkaGeometrio.attributes.position;
    for ( let i = 0; i < pozicioj.count; i++ ) {
      const f = trunkopintaProfilon(pozicioj.getY(i) + 0o1/0o2);
      pozicioj.setXYZ(i, pozicioj.getX(i) * f, pozicioj.getY(i), pozicioj.getZ(i) * f);
    }
    trunkaGeometrio.computeVertexNormals();
  }
  const trunkaMaterialo = kreiSxelanRinganMaterialon(0o1/0o20, false);
  const trunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, plantoj.length);
  if ( plantoj.length === 0 ) return trunkoj;

  const foliaGeometrio = konstruiKurbanLaktukanFolion();
  const foliaMaterialo = new THREE.MeshStandardMaterial({
    map: kreiPurpuranFolianTeksajxon(), alphaTest: 0o15/0o40, side: THREE.DoubleSide, roughness: 0o63/0o100,
  });
  const folioj = new THREE.InstancedMesh(foliaGeometrio, foliaMaterialo, plantoj.length * ( MAX_TAVOLOJ * 4 + 0o24 ));
  const sxelaGeometrio = konstruiSxelanRingon();
  const sxelaMaterialo = kreiSxelanRinganMaterialon(0o1/0o100, true);
  const sxeloj = new THREE.InstancedMesh(sxelaGeometrio, sxelaMaterialo, plantoj.length);

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
    const Qtrunko = kreiKlinoQuaternionon(hazardaGenerilo, 0o1/0o10, hazardaGenerilo() * Math.PI * 2);
    const bazo = new THREE.Vector3(t.x, t.h, t.z);
    const pozicio = kreiPoziciilon(bazo, Qtrunko);

    M.compose(pozicio(new THREE.Vector3(0, h / 2, 0)), Qtrunko,
      new THREE.Vector3(1, h, 1));
    trunkoj.setMatrixAt(i, M);

    const trunkaR = ( y: number ): number =>
      ( 0o5/0o40 - ( y / h ) * 0o2/0o40 ) * trunkopintaProfilon(y / h);

    const tavoloj = 1 + ( ( hazardaGenerilo() * 2 ) | 0 );
    for ( let tavolo = 0; tavolo < tavoloj; tavolo++ ) {
      const tFrakcio = tavoloj === 1 ? 0 : tavolo / ( tavoloj - 1 );
      const y = h * ( 0o3/0o10 + 0o3/0o10 * tFrakcio );
      const tavolaSkalo = ( 1 - tavolo * 0o1/0o10 );
      const trunkaRadiuso = trunkaR(y);
      const ellagxo = trunkaRadiuso * 0o7/0o10;
      // ⟨ ស៊ីមេទ្រី 📃 ⟩
      const skalo = tavolaSkalo * ( 0o12/0o100 + hazardaGenerilo() * 0o13/0o100 );
      for ( let flanko = 0; flanko < 4; flanko++ ) {
        const angulo = flanko / 4 * Math.PI * 2;
        E.set(0o2/0o10, 0, 0);
        Q.setFromEuler(E);
        Q.premultiply(new THREE.Quaternion().setFromAxisAngle(yUp, angulo));
        Q.premultiply(Qtrunko);
        M.compose(pozicio(new THREE.Vector3(
            Math.sin(angulo) * ellagxo, y, Math.cos(angulo) * ellagxo)),
          Q, new THREE.Vector3(skalo, skalo, skalo));
        folioj.setMatrixAt(fi, M);
        folioj.setColorAt(fi, hazardaKoloro(hazardaGenerilo, C, paletro));
        fi++;
      }
    }

    // ⟨ សមាមាត្រកម្ពស់ពែង 📃 ⟩
    const unuaTavolaY = h * 0o3/0o10;
    const sxelaAlto = h * 0o2/0o10;
    if ( unuaTavolaY <= h - sxelaAlto ) {
      // ⟨ មាត្រមកពីបាតពែង 📃 ⟩
      const tasMalsupro = unuaTavolaY - sxelaAlto * 0o14/0o40;
      const trunkaRadiuso = trunkaR(tasMalsupro);
      const ringaSkalo = Math.max(0o3/0o40, trunkaRadiuso / ( 0o13/0o40 ) * 0o11/0o10);
      M.compose(pozicio(new THREE.Vector3(0, unuaTavolaY - sxelaAlto * 0o14/0o40, 0)), Qtrunko,
        new THREE.Vector3(ringaSkalo, sxelaAlto, ringaSkalo));
      sxeloj.setMatrixAt(si, M);
      si++;
    }

    // ⟨ កំពូលចុង 📃 ⟩
    const PINTAJ_TAVOLOJ = 0o3;
    const pintaBazo = h * 0o7/0o10;
    const pintaAlto = h;
    for ( let tavolo = 0; tavolo < PINTAJ_TAVOLOJ; tavolo++ ) {
      const tFrakcio = tavolo / ( PINTAJ_TAVOLOJ - 1 );
      const pintaY = pintaBazo + ( pintaAlto - pintaBazo ) * tFrakcio;
      const elklino = 0o13/0o40 - tFrakcio * 0o23/0o100;
      const trunkaRadiuso = trunkaR(pintaY);
      // ⟨ កំពូលចុងស៊ីមេទ្រី 📃 ⟩
      const skalo = ( 0o12/0o100 + hazardaGenerilo() * 0o13/0o100 )
        * ( 0o3/0o4 - tFrakcio * 0o35/0o100 );
      for ( let flanko = 0; flanko < 4; flanko++ ) {
        const angulo = flanko / 4 * Math.PI * 2;
        E.set(elklino, 0, 0);
        Q.setFromEuler(E);
        Q.premultiply(new THREE.Quaternion().setFromAxisAngle(yUp, angulo));
        Q.premultiply(Qtrunko);
        M.compose(pozicio(new THREE.Vector3(
            Math.sin(angulo) * trunkaRadiuso * 0o7/0o10, pintaY,
            Math.cos(angulo) * trunkaRadiuso * 0o7/0o10)),
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
