// ≺⧼ អេកវីសេត 🌾 ⧽≻
import * as THREE from "three";
import { kreiCakeanTeksajxon } from "../../komunajxoj/teksajxoj/bakeo.js";
import { kreiCetkuanTeksajxon } from "../../komunajxoj/teksajxoj/cetkuo.js";
import { kreiBuferanGeometrion, kunfandiGeometriojnSenIndekson } from "../../komunajxoj/kunfandajxoj.js";
import { biomo, type Biomo } from "../../../kantaoj/mondo/tereno.js";
import { kreiVegetajxanHazardon } from "./hazardoj.js";

function kreiRibitanSegmenton(rMalsupra: number, rSupra: number, alto: number,
  flankoj: number, kresta: number): THREE.BufferGeometry {
  const ringo = flankoj * 2;
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const indeksoj: number[] = [];
  for ( let k = 0; k < ringo; k++ ) {
    const ang = k / ringo * Math.PI * 2;
    const faktoro = ( k % 2 === 0 ) ? 1 : ( 1 - kresta );
    pozicioj.push(Math.cos(ang) * rMalsupra * faktoro, 0, Math.sin(ang) * rMalsupra * faktoro);
    uvoj.push(k / ringo, 0);
    pozicioj.push(Math.cos(ang) * rSupra * faktoro, alto, Math.sin(ang) * rSupra * faktoro);
    uvoj.push(k / ringo, 1);
  }
  for ( let k = 0; k < ringo; k++ ) {
    const a = k * 2, b = k * 2 + 1;
    const c = ( ( k + 1 ) % ringo ) * 2, d = c + 1;
    indeksoj.push(a, b, c, b, d, c);
  }
  const cM = ringo * 2, cS = cM + 1;
  pozicioj.push(0, 0, 0); uvoj.push(0o1/0o2, 0);
  pozicioj.push(0, alto, 0); uvoj.push(0o1/0o2, 1);
  for ( let k = 0; k < ringo; k++ ) {
    const a = k * 2, b = ( ( k + 1 ) % ringo ) * 2;
    indeksoj.push(a, b, cM);
    indeksoj.push(a + 1, cS, b + 1);
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj });
}

function konstruiKanGeometrion(nodoj: number, kunBrancetoj: boolean, kunStrobilo: boolean): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  const segmentaAlto = 1 / nodoj;
  const rBazo = 0o3/0o40;
  const rSupro = 0o1/0o40;
  // ⟨ ឆ្អឹងជំនីរជ្រៅជាង 📃 ⟩
  const flankoj = 0o10;
  const kresta = kunBrancetoj ? 0o16/0o100 : 0o22/0o100;
  for ( let i = 0; i < nodoj; i++ ) {
    const y0 = i * segmentaAlto;
    const r0 = rBazo - ( rBazo - rSupro ) * ( i / nodoj );
    const r1 = rBazo - ( rBazo - rSupro ) * ( ( i + 1 ) / nodoj );
    partoj.push(kreiRibitanSegmenton(r0, r1, segmentaAlto, flankoj, kresta).translate(0, y0, 0));
    // ⟨ រូបរាងស្រោម 📃 ⟩
    if ( i > 0 ) {
      const ingaAlto = segmentaAlto * 0o35/0o100;
      const kolumeto = new THREE.CylinderGeometry(r0 * 0o14/0o10, r0 * 0o11/0o10,
        ingaAlto, flankoj, 1).translate(0, y0, 0);
      partoj.push(kolumeto);
      if ( kunBrancetoj ) {
        const brancetoj = 0o12;
        const profilo = Math.sin(Math.PI * Math.min(1, ( i + 1 ) / nodoj));
        const longeco = segmentaAlto * ( 0o43/0o40 + 0o103/0o40 * profilo );
        const eliro = 0o3/0o40 + 0o35/0o100 * ( i / nodoj );
        for ( let b = 0; b < brancetoj; b++ ) {
          const ang = b / brancetoj * Math.PI * 2 + i * 0o3/0o10;
          // ⟨ មែកកោង 📃 ⟩
          const unua = longeco * 0o43/0o100, dua = longeco * 0o43/0o100;
          const anguloj = [ eliro, eliro + 0o43/0o100 ];
          const longoj = [ unua, dua ];
          let bazo = new THREE.Vector3(Math.sin(ang) * r0, y0, Math.cos(ang) * r0);
          for ( let s = 0; s < 2; s++ ) {
            const a = anguloj[s], L = longoj[s];
            const peco = new THREE.ConeGeometry(
              r0 * ( s === 0 ? 0o13/0o40 : 0o17/0o100 ), L, 4).translate(0, L / 2, 0);
            const Mb = new THREE.Matrix4().makeRotationY(ang);
            Mb.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2 - a));
            peco.applyMatrix4(Mb);
            peco.translate(bazo.x, bazo.y, bazo.z);
            partoj.push(peco);
            const direkto = new THREE.Vector3(
              Math.sin(ang) * Math.cos(a), Math.sin(a), Math.cos(ang) * Math.cos(a));
            bazo = bazo.clone().add(direkto.multiplyScalar(L));
            if ( s === 0 ) {
              const artiko = new THREE.CylinderGeometry(r0 * 0o23/0o100, r0 * 0o23/0o100,
                r0 * 0o1/0o2, 4).translate(0, r0 * 0o1/0o4, 0);
              const Ma = new THREE.Matrix4().makeRotationY(ang);
              Ma.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2 - a));
              artiko.applyMatrix4(Ma);
              artiko.translate(bazo.x, bazo.y, bazo.z);
              partoj.push(artiko);
            }
          }
        }
      } else {
        // ⟨ ហេតុអ្វីវាមើលទៅដូចស្លឹក 📃 ⟩
        // ⟨ ធ្មេញមួយក្នុងមួយឆ្អឹងជំនីរ 📃 ⟩
        const dentoj = flankoj;
        const dentoAlto = segmentaAlto * 0o55/0o100;
        for ( let d = 0; d < dentoj; d++ ) {
          const ang = d / dentoj * Math.PI * 2;
          const dento = new THREE.ConeGeometry(r0 * 0o1/0o2, dentoAlto, 3);
          const M = new THREE.Matrix4().makeRotationY(ang);
          M.multiply(new THREE.Matrix4().makeRotationX(0o7/0o40));
          dento.applyMatrix4(M);
          dento.translate(Math.sin(ang) * r0 * 0o12/0o10,
            y0 + dentoAlto * 0o35/0o100, Math.cos(ang) * r0 * 0o12/0o10);
          partoj.push(dento);
        }
      }
    }
  }
  if ( kunStrobilo ) {
    const strobilaLargho = rSupro * 0o3/0o2;
    const pedunklo = new THREE.CylinderGeometry(rSupro * 0o6/0o10, rSupro * 0o6/0o10,
      0o4/0o100, 6).translate(0, 1 + 0o2/0o100, 0);
    partoj.push(pedunklo);
    const skvamoj = 5;
    for ( let s = 0; s < skvamoj; s++ ) {
      const t = s / skvamoj;
      const rS = strobilaLargho * ( 1 - t * 0o6/0o10 );
      const ringo = new THREE.CylinderGeometry(rS * 0o7/0o10, rS, 0o3/0o100, 0o10)
        .translate(0, 1 + 0o4/0o100 + s * 0o3/0o100, 0);
      partoj.push(ringo);
    }
    const pinto = new THREE.ConeGeometry(strobilaLargho * 0o3/0o10, 0o3/0o100, 6)
      .translate(0, 1 + 0o4/0o100 + skvamoj * 0o3/0o100 + 0o15/0o1000, 0);
    partoj.push(pinto);
  } else {
    const pinto = new THREE.ConeGeometry(0o1/0o100, 0o3/0o100, 6)
      .translate(0, 1 + 0o1/0o100, 0);
    partoj.push(pinto);
  }
  // ⟨ សមាមាត្រដើម 📃 ⟩
  const geometrio = kunfandiGeometriojnSenIndekson(partoj);
  geometrio.scale(0o33/0o100, 1, 0o33/0o100);
  return geometrio;
}

function konstruiCetkuanGeometrion(): THREE.BufferGeometry {
  return konstruiKanGeometrion(0o13, false, true);
}

function konstruiCakeanGeometrion(): THREE.BufferGeometry {
  return konstruiKanGeometrion(6, true, false);
}

function instanciiKavalerbojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  semo: number,
  geometrio: THREE.BufferGeometry,
  teksajxo: THREE.CanvasTexture,
  koloro: number,
  minAlto: number,
  maxAlto: number,
  proponu: ( h: () => number ) => { x: number; z: number } | null
): void {
  const hazardaGenerilo = kreiVegetajxanHazardon(semo);
  const materialo = new THREE.MeshStandardMaterial({ map: teksajxo, roughness: 0o7/0o10, color: 0xffffff });
  const kavalerboj = new THREE.InstancedMesh(geometrio, materialo, kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  let ki = 0;
  let gardilo = 0;

  while ( ki < kvanto && gardilo++ < 0o10000 ) {
    const loko = proponu(hazardaGenerilo);
    if ( !loko ) continue;
    const x = loko.x, z = loko.z;
    const alto = minAlto + hazardaGenerilo() * ( maxAlto - minAlto );
    E.set(0, hazardaGenerilo() * Math.PI * 2, ( hazardaGenerilo() - 0o4/0o10 ) * 0o4/0o10);
    Q.setFromEuler(E);
    // ⟨ មូលដ្ឋានលើដី 📃 ⟩
    // ⟨ មាត្រឯកសណ្ឋាន 📃 ⟩
    const y = heightFn(x, z);
    M.compose(new THREE.Vector3(x, y, z), Q, new THREE.Vector3(alto, alto, alto));
    kavalerboj.setMatrixAt(ki, M);
    kavalerboj.setColorAt(ki, C.setHex(koloro).multiplyScalar(0o111/0o100 + hazardaGenerilo() * 0o15/0o100));
    ki++;
  }

  kavalerboj.count = ki;
  kavalerboj.instanceMatrix.needsUpdate = true;
  if ( kavalerboj.instanceColor ) kavalerboj.instanceColor.needsUpdate = true;
  sceno.add(kavalerboj);
}

export function konstruiCetkuojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  riverZFn: ( x: number ) => number,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  biomojFiltro?: readonly Biomo[]
): void {
  instanciiKavalerbojn(sceno, kvanto, heightFn, 0o26511, konstruiCetkuanGeometrion(),
    kreiCetkuanTeksajxon(), 0xf0f8e8, 0o14/0o10, 0o30/0o10, ( h ) => {
      const angulo = h() * Math.PI * 2;
      const radiuso = 0o20 + 0o177 * Math.sqrt(h());
      const x = Math.sin(angulo) * radiuso;
      const z = Math.cos(angulo) * radiuso;
      if ( Math.abs(x) > 0o200 || Math.abs(z) > 0o200 ) return null;
      if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) return null;
      if ( Math.abs(z - riverZFn(x)) > 0o10 ) return null;
      if ( excludeBuildings(x, z, 3) || excludePaths(x, z, 0o2) ) return null;
      if ( Math.hypot(x, z) < 0o16 ) return null;
      return { x, z };
    });
}

export function konstruiCakeojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  cx: number, cz: number,
  radioFn: ( ang: number ) => number,
  akvoNiveloFn: ( x: number, z: number ) => number,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  semo = 0o26525,
  biomojFiltro?: readonly Biomo[]
): void {
  instanciiKavalerbojn(sceno, kvanto, heightFn, semo, konstruiCakeanGeometrion(),
    kreiCakeanTeksajxon(), 0xe8f8e0, 0o12/0o10, 0o24/0o10, ( h ) => {
      const angulo = h() * Math.PI * 2;
      const radiuso = radioFn(angulo) + h() * 0o10;
      const x = cx + Math.cos(angulo) * radiuso;
      const z = cz + Math.sin(angulo) * radiuso;
      if ( Math.abs(x) > 0o450 || Math.abs(z) > 0o450 ) return null;
      if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) return null;
      if ( excludeBuildings(x, z, 3) || excludePaths(x, z, 0o2) ) return null;
      if ( heightFn(x, z) > akvoNiveloFn(x, z) + 2 ) return null;
      return { x, z };
    });
}
