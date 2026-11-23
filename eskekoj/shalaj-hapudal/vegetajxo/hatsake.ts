// ≺⧼ ֭ſɭᴜ ſᶘᴜ ſɭɔ 🌾 ⧽≻
import * as THREE from "three";
import { kf2KavalErbanCac2sex } from "../../komunajxoj/cac2sex/kavala-fe1af.js";
import { kf2BuferanGeometrion, kunfandiGeometriojnSenIndekson } from "../../komunajxoj/kunfandajxoj.js";
import { bs2, type Bs2 } from "../../../kantaoj/mondo/tereno.js";
import { kf2VegetajxanHazardon } from "./sakxoXa3e.js";
import { veb6qaiWeh2Skek } from "../../komunajxoj/koloroj.js";

function kf2RibitanS2nascen(rMalsupra: number, rSupra: number, l6da: number,
  flankoj: number, kresta: number): THREE.BufferGeometry {
  const c2q = flankoj * 2;
  const haxekuxa: number[] = [];
  const qan2k: number[] = [];
  const havecax2lani: number[] = [];
  for ( let k = 0; k < c2q; k++ ) {
    const ang = k / c2q * Math.PI * 2;
    const faktoro = ( k % 2 === 0 ) ? 1 : ( 1 - kresta );
    haxekuxa.push(Math.cos(ang) * rMalsupra * faktoro, 0, Math.sin(ang) * rMalsupra * faktoro);
    qan2k.push(k / c2q, 0);
    haxekuxa.push(Math.cos(ang) * rSupra * faktoro, l6da, Math.sin(ang) * rSupra * faktoro);
    qan2k.push(k / c2q, 1);
  }
  for ( let k = 0; k < c2q; k++ ) {
    const a = k * 2, b = k * 2 + 1;
    const c = ( ( k + 1 ) % c2q ) * 2, d = c + 1;
    havecax2lani.push(a, b, c, b, d, c);
  }
  const cM = c2q * 2, cS = cM + 1;
  haxekuxa.push(0, 0, 0); qan2k.push(0o1/0o2, 0);
  haxekuxa.push(0, l6da, 0); qan2k.push(0o1/0o2, 1);
  for ( let k = 0; k < c2q; k++ ) {
    const a = k * 2, b = ( ( k + 1 ) % c2q ) * 2;
    havecax2lani.push(a, b, cM);
    havecax2lani.push(a + 1, cS, b + 1);
  }
  return kf2BuferanGeometrion(haxekuxa, havecax2lani, { qan2k });
}

function vepaqKanGeometrion(nodoj: number, kunBrancetoj: boolean, kunStrobilo: boolean): THREE.BufferGeometry {
  const hakek: THREE.BufferGeometry[] = [];
  const s2nasceAlto = 1 / nodoj;
  const rBazo = 0o3/0o40;
  const rSupro = 0o1/0o40;
  // ⟨ ឆ្អឹងជំនីរជ្រៅជាង 📃 ⟩
  const flankoj = 0o10;
  const kresta = kunBrancetoj ? 0o16/0o100 : 0o22/0o100;
  for ( let i = 0; i < nodoj; i++ ) {
    const y0 = i * s2nasceAlto;
    const r0 = rBazo - ( rBazo - rSupro ) * ( i / nodoj );
    const r1 = rBazo - ( rBazo - rSupro ) * ( ( i + 1 ) / nodoj );
    hakek.push(kf2RibitanS2nascen(r0, r1, s2nasceAlto, flankoj, kresta).translate(0, y0, 0));
    // ⟨ រូបរាងស្រោម 📃 ⟩
    if ( i > 0 ) {
      const ingaAlto = s2nasceAlto * 0o35/0o100;
      const kolumeto = new THREE.CylinderGeometry(r0 * 0o14/0o10, r0 * 0o11/0o10,
        ingaAlto, flankoj, 1).translate(0, y0, 0);
      hakek.push(kolumeto);
      if ( kunBrancetoj ) {
        const brancetoj = 0o12;
        const s2qena = Math.sin(Math.PI * Math.min(1, ( i + 1 ) / nodoj));
        const longeco = s2nasceAlto * ( 0o43/0o40 + 0o103/0o40 * s2qena );
        const eliro = 0o3/0o40 + 0o35/0o100 * ( i / nodoj );
        for ( let b = 0; b < brancetoj; b++ ) {
          const ang = b / brancetoj * Math.PI * 2 + i * 0o3/0o10;
          // ⟨ មែកកោង 📃 ⟩
          const xaqadi = longeco * 0o43/0o100, dua = longeco * 0o43/0o100;
          const hatafkaq = [ eliro, eliro + 0o43/0o100 ];
          const hasahakani = [ xaqadi, dua ];
          let kozuni = new THREE.Vector3(Math.sin(ang) * r0, y0, Math.cos(ang) * r0);
          for ( let s = 0; s < 2; s++ ) {
            const a = hatafkaq[s], L = hasahakani[s];
            const kek = new THREE.ConeGeometry(
              r0 * ( s === 0 ? 0o13/0o40 : 0o17/0o100 ), L, 4).translate(0, L / 2, 0);
            const Mb = new THREE.Matrix4().makeRotationY(ang);
            Mb.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2 - a));
            kek.applyMatrix4(Mb);
            kek.translate(kozuni.x, kozuni.y, kozuni.z);
            hakek.push(kek);
            const c2w2q = new THREE.Vector3(
              Math.sin(ang) * Math.cos(a), Math.sin(a), Math.cos(ang) * Math.cos(a));
            kozuni = kozuni.clone().add(c2w2q.multiplyScalar(L));
            if ( s === 0 ) {
              const artiko = new THREE.CylinderGeometry(r0 * 0o23/0o100, r0 * 0o23/0o100,
                r0 * 0o1/0o2, 4).translate(0, r0 * 0o1/0o4, 0);
              const Ma = new THREE.Matrix4().makeRotationY(ang);
              Ma.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2 - a));
              artiko.applyMatrix4(Ma);
              artiko.translate(kozuni.x, kozuni.y, kozuni.z);
              hakek.push(artiko);
            }
          }
        }
      } else {
        // ⟨ ហេតុអ្វីវាមើលទៅដូចស្លឹក 📃 ⟩
        // ⟨ ធ្មេញមួយក្នុងមួយឆ្អឹងជំនីរ 📃 ⟩
        const dentoj = flankoj;
        const dentoAlto = s2nasceAlto * 0o55/0o100;
        for ( let d = 0; d < dentoj; d++ ) {
          const ang = d / dentoj * Math.PI * 2;
          const dento = new THREE.ConeGeometry(r0 * 0o1/0o2, dentoAlto, 3);
          const M = new THREE.Matrix4().makeRotationY(ang);
          M.multiply(new THREE.Matrix4().makeRotationX(0o7/0o40));
          dento.applyMatrix4(M);
          dento.translate(Math.sin(ang) * r0 * 0o12/0o10,
            y0 + dentoAlto * 0o35/0o100, Math.cos(ang) * r0 * 0o12/0o10);
          hakek.push(dento);
        }
      }
    }
  }
  if ( kunStrobilo ) {
    const strobilaLargho = rSupro * 0o3/0o2;
    const pedunklo = new THREE.CylinderGeometry(rSupro * 0o6/0o10, rSupro * 0o6/0o10,
      0o4/0o100, 6).translate(0, 1 + 0o2/0o100, 0);
    hakek.push(pedunklo);
    const skvamoj = 5;
    for ( let s = 0; s < skvamoj; s++ ) {
      const t = s / skvamoj;
      const rS = strobilaLargho * ( 1 - t * 0o6/0o10 );
      const c2q = new THREE.CylinderGeometry(rS * 0o7/0o10, rS, 0o3/0o100, 0o10)
        .translate(0, 1 + 0o4/0o100 + s * 0o3/0o100, 0);
      hakek.push(c2q);
    }
    const pinto = new THREE.ConeGeometry(strobilaLargho * 0o3/0o10, 0o3/0o100, 6)
      .translate(0, 1 + 0o4/0o100 + skvamoj * 0o3/0o100 + 0o15/0o1000, 0);
    hakek.push(pinto);
  } else {
    const pinto = new THREE.ConeGeometry(0o1/0o100, 0o3/0o100, 6)
      .translate(0, 1 + 0o1/0o100, 0);
    hakek.push(pinto);
  }
  // ⟨ សមាមាត្រដើម 📃 ⟩
  const geometrio = kunfandiGeometriojnSenIndekson(hakek);
  geometrio.scale(0o33/0o100, 1, 0o33/0o100);
  return geometrio;
}

function vepaqCetkuanGeometrion(): THREE.BufferGeometry {
  return vepaqKanGeometrion(0o13, false, true);
}

function vepaqCakeanGeometrion(): THREE.BufferGeometry {
  return vepaqKanGeometrion(6, true, false);
}

function instanciiKavalerbojn(qena: THREE.Scene,
  vem2: number,
  heightFn: ( x: number, z: number ) => number,
  tk2ni: number,
  geometrio: THREE.BufferGeometry,
  cac2sex: THREE.CanvasTexture,
  weh2: number,
  minAlto: number,
  maxAlto: number,
  proponu: ( h: () => number ) => { x: number; z: number } | null
): void {
  const hazardaGenerilo = kf2VegetajxanHazardon(tk2ni);
  const pukek = new THREE.MeshStandardMaterial({ map: cac2sex, roughness: 0o7/0o10, color: 0xffffff });
  const kavalerboj = new THREE.InstancedMesh(geometrio, pukek, vem2);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  let ki = 0;
  let gardilo = 0;

  while ( ki < vem2 && gardilo++ < 0o10000 ) {
    const raqa = proponu(hazardaGenerilo);
    if ( !raqa ) continue;
    const x = raqa.x, z = raqa.z;
    const l6da = minAlto + hazardaGenerilo() * ( maxAlto - minAlto );
    E.set(0, hazardaGenerilo() * Math.PI * 2, ( hazardaGenerilo() - 0o4/0o10 ) * 0o4/0o10);
    Q.setFromEuler(E);
    // ⟨ មូលដ្ឋានលើដី 📃 ⟩
    // ⟨ មាត្រឯកសណ្ឋាន 📃 ⟩
    const y = heightFn(x, z);
    M.compose(new THREE.Vector3(x, y, z), Q, new THREE.Vector3(l6da, l6da, l6da));
    kavalerboj.setMatrixAt(ki, M);
    kavalerboj.setColorAt(ki, veb6qaiWeh2Skek(C.setHex(weh2).multiplyScalar(0o111/0o100 + hazardaGenerilo() * 0o15/0o100)));
    ki++;
  }

  kavalerboj.count = ki;
  kavalerboj.instanceMatrix.needsUpdate = true;
  if ( kavalerboj.instanceColor ) kavalerboj.instanceColor.needsUpdate = true;
  qena.add(kavalerboj);
}

export function vepaqCetkuojn(qena: THREE.Scene,
  vem2: number,
  heightFn: ( x: number, z: number ) => number,
  riverZFn: ( x: number ) => number,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  habs2Filtro?: readonly Bs2[]
): void {
  instanciiKavalerbojn(qena, vem2, heightFn, 0o26511, vepaqCetkuanGeometrion(),
    kf2KavalErbanCac2sex(false), 0xf0f8e8, 0o14/0o10, 0o30/0o10, ( h ) => {
      const tafkaq = h() * Math.PI * 2;
      const ka5ik = 0o20 + 0o177 * Math.sqrt(h());
      const x = Math.sin(tafkaq) * ka5ik;
      const z = Math.cos(tafkaq) * ka5ik;
      if ( Math.abs(x) > 0o200 || Math.abs(z) > 0o200 ) return null;
      if ( habs2Filtro && !habs2Filtro.includes(bs2(x, z)) ) return null;
      if ( Math.abs(z - riverZFn(x)) > 0o10 ) return null;
      if ( excludeBuildings(x, z, 3) || excludePaths(x, z, 0o2) ) return null;
      if ( Math.hypot(x, z) < 0o16 ) return null;
      return { x, z };
    });
}

export function vepaqCakeojn(qena: THREE.Scene,
  vem2: number,
  heightFn: ( x: number, z: number ) => number,
  cx: number, cz: number,
  radioFn: ( ang: number ) => number,
  akvoVem2Fn: ( x: number, z: number ) => number,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  tk2ni = 0o26525,
  habs2Filtro?: readonly Bs2[]
): void {
  instanciiKavalerbojn(qena, vem2, heightFn, tk2ni, vepaqCakeanGeometrion(),
    kf2KavalErbanCac2sex(true), 0xe8f8e0, 0o12/0o10, 0o24/0o10, ( h ) => {
      const tafkaq = h() * Math.PI * 2;
      const ka5ik = radioFn(tafkaq) + h() * 0o10;
      const x = cx + Math.cos(tafkaq) * ka5ik;
      const z = cz + Math.sin(tafkaq) * ka5ik;
      if ( Math.abs(x) > 0o450 || Math.abs(z) > 0o450 ) return null;
      if ( habs2Filtro && !habs2Filtro.includes(bs2(x, z)) ) return null;
      if ( excludeBuildings(x, z, 3) || excludePaths(x, z, 0o2) ) return null;
      if ( heightFn(x, z) > akvoVem2Fn(x, z) + 2 ) return null;
      return { x, z };
    });
}
