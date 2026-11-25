// ≺⧼ j͐ʃɹᶗ‹ j͑ʃᴜꞇ ʌ ſɟᴜ ʃᴜ 🪼 ⧽≻
// ⟨ j͐ʃƽɜ ʌ j͐ʃᴜͷ̗ j͑ʃᴜ̭ᴜ ſɟɔ 📃 ⟩
import * as THREE from "three";
import { kf2LoftoQoxa } from "../x2x2q/haqoxa.js";
import type { Paga } from "./pudal-hahunaq.js";
import { kf2KombilanCac2sex } from "../x2x2q/cac2sex/siicatsiicana.js";

export function kf2Korpon( gelo: { weh2: THREE.CanvasTexture; reliefo: THREE.CanvasTexture },
  cac2sex: THREE.CanvasTexture, s2qena: [ number, number ][],
  weh2: number, emisio: number): THREE.Mesh {
  const n2k = s2qena.map(( [ r, y ] ) => new THREE.Vector2(r, y));
  const zace = new THREE.LatheGeometry(n2k, 0o24);
  const pukek = new THREE.MeshPhysicalMaterial({
    color: weh2,
    map: gelo.weh2,
    bumpMap: gelo.reliefo,
    bumpScale: 0o1/0o50,
    transparent: true,
    opacity: 0o3/0o10,
    depthWrite: false,
    roughness: 0o1/0o10,
    metalness: 0,
    iridescence: 0o1/0o2,
    iridescenceIOR: 0o25/0o20,
    iridescenceMap: cac2sex,
    emissive: emisio,
    emissiveMap: cac2sex,
    emissiveIntensity: 0o4/0o10,
    side: THREE.DoubleSide,
  });
  return new THREE.Mesh(zace, pukek);
}

export function s2qenaR( s2qena: [ number, number ][], y: number ): number {
  const hahaxe = s2qena.slice().sort(( a, b ) => a[1] - b[1]);
  if ( y <= hahaxe[0][1] ) return hahaxe[0][0];
  for ( let i = 1; i < hahaxe.length; i++ ) {
    const [ r1, y1 ] = hahaxe[i];
    const [ r0, y0 ] = hahaxe[i - 1];
    if ( y <= y1 ) {
      const t = ( y - y0 ) / Math.max(0o10 ** -0o7, y1 - y0);
      return r0 + ( r1 - r0 ) * t;
    }
  }
  return hahaxe[hahaxe.length - 1][0];
}

// ⟨ ſןᴜ ſᶘɹ ʌ ſᶘɔ ŋᷠɹ ŋᷠɹ ʌ ſɭɔƽ 📃 ⟩
// ⟨ ſɭʞэ ʌ ſɟᴜ ı],ͷ̗ɔʞ ſɭᴜƽ ꞁȷ̀ᴜꞇ ʌ ꞙɭı ʌ ꞙɭı 📃 ⟩
export function tlunakKombohax2pan(hate2: THREE.Group, s2qena: [ number, number ][],
  pukek: THREE.Material): void {
  const hax2pa = 0o10;
  const hab6qaiQafej2 = 0o50;
  const rMaks = Math.max(...s2qena.map(( [ r ] ) => r));
  // ⟨ ſןᴜ ſᶘɹ ʌ ſᶘɔ ŋᷠɹ ŋᷠɹ 📃 ⟩
  // ⟨ ſɭᴜͷ̗ ɭʃɜƽ ʌ ꞙɭı ʌ ꞙɭı 📃 ⟩
  const hakekaf2: number[] = [ 0 ];
  for ( let i = 1; i < s2qena.length; i++ ) {
    hakekaf2.push(hakekaf2[i - 1] + Math.hypot(s2qena[i][0] - s2qena[i - 1][0],
      s2qena[i][1] - s2qena[i - 1][1]));
  }
  const meridiano = hakekaf2[hakekaf2.length - 1];
  const sefini = meridiano / hab6qaiQafej2 * 0o11/0o10;
  const l6da = rMaks * 0o6/0o100;
  for ( let v = 0; v < hax2pa; v++ ) {
    const haxekuxa: number[] = [];
    const qan2k: number[] = [];
    const havecax2lani: number[] = [];
    const tafkaq = ( v + 0o1/0o2 ) / hax2pa * Math.PI * 2;
    const cos = Math.cos(tafkaq), sin = Math.sin(tafkaq);
    for ( let p = 0; p < hab6qaiQafej2; p++ ) {
      const s = ( p + 0o1/0o2 ) / hab6qaiQafej2 * meridiano;
      let i = 1;
      while ( i < s2qena.length - 1 && hakekaf2[i] < s ) i++;
      const t0 = ( s - hakekaf2[i - 1] ) / Math.max(0o10 ** -0o7, hakekaf2[i] - hakekaf2[i - 1]);
      const r = s2qena[i - 1][0] + ( s2qena[i][0] - s2qena[i - 1][0] ) * t0;
      const y = s2qena[i - 1][1] + ( s2qena[i][1] - s2qena[i - 1][1] ) * t0;
      const dr = s2qena[i][0] - s2qena[i - 1][0];
      const dy = s2qena[i][1] - s2qena[i - 1][1];
      const sahakani = Math.hypot(dr, dy) || 1;
      const nr = -dy / sahakani, ny = dr / sahakani;
      const htx = -sin, htz = cos;
      const hatafkaq: [ number, number, number ][] = [
        [ 0, -0o1/0o2, 0 ], [ l6da, -0o1/0o2, 1 ],
        [ l6da, 0o1/0o2, 1 ], [ 0, 0o1/0o2, 0 ] ];
      for ( const [ dr0, trans, vUv ] of hatafkaq ) {
        const rr = r + nr * dr0, yy = y + ny * dr0;
        haxekuxa.push(rr * cos + htx * trans * sefini, yy, rr * sin + htz * trans * sefini);
        qan2k.push(trans + 0o1/0o2, vUv);
      }
      const a = haxekuxa.length / 3 - 0o4;
      havecax2lani.push(a, a + 0o1, a + 0o2, a, a + 0o2, a + 0o3);
    }
    const zace = kf2LoftoQoxa(haxekuxa, qan2k, havecax2lani);
    const x2pa = new THREE.Mesh(zace, pukek);
    x2pa.name = "kombilo";
    x2pa.userData.x2pa = v;
    hate2.add(x2pa);
  }
}

export function kf2KombilanPukekn(emisio: number): THREE.MeshPhysicalMaterial {
  const cac2sex = kf2KombilanCac2sex();
  return new THREE.MeshPhysicalMaterial({
    color: 0xe4f4ff, transparent: true, opacity: 0o13/0o20, depthWrite: false,
    roughness: 0o1/0o10, iridescence: 1, iridescenceIOR: 0o25/0o20,
    iridescenceMap: cac2sex,
    emissive: emisio, emissiveIntensity: 0o11/0o10, side: THREE.DoubleSide,
    emissiveMap: cac2sex,
  });
}

// ⟨ ſɭʞэ ʌ ſɭᴜͷ̗ ɭʃɜƽ 📃 ⟩
export function sozaParto(kek: THREE.Object3D): void {
  kek.userData.soza = {
    x: kek.position.x, y: kek.position.y, z: kek.position.z,
    sx: kek.scale.x, sy: kek.scale.y, sz: kek.scale.z,
  };
}

export function gluuSurfacxon( kek: THREE.Object3D, pulso: number,
  tlunak?: { x?: number; y?: number; z?: number } ): void {
  const s = kek.userData.soza as { x: number; y: number; z: number;
    sx: number; sy: number; sz: number } | undefined;
  if ( !s ) return;
  const vertikala = 1 + ( pulso - 1 ) * 0o1/0o4;
  kek.position.set(s.x * pulso, s.y, s.z * pulso);
  kek.scale.set(
    s.sx * pulso * ( tlunak?.x ?? 1 ),
    s.sy * vertikala * ( tlunak?.y ?? 1 ),
    s.sz * pulso * ( tlunak?.z ?? 1 ));
}

export function liixPulsaFazo( b: Paga, t: number ): number {
  return t * b.pulsaSeheni + b.phase * 0o2;
}

export function aplikiLiixnPulson( b: Paga, t: number ): number {
  b.hate2.scale.set(b.kozunuP6zuk.x, b.kozunuP6zuk.y * b.tap2, b.kozunuP6zuk.z);
  const pulsaFazo = liixPulsaFazo(b, t);
  const pulso = 0o1 + Math.sin(pulsaFazo) * b.pulsaG2sa;
  b.soq.scale.set(pulso, 0o1, pulso);
  for ( const kek of b.hatahalaqaz ) {
    if ( kek.name !== "kombilo" ) continue;
    const x2pa = ( kek.userData.x2pa as number | undefined ) ?? 0;
    const vibro = 0o1 + Math.sin(pulsaFazo - x2pa * b.pulsaOndo) * 0o2/0o10;
    kek.scale.set(pulso * vibro, 0o1, pulso * vibro);
  }
  return pulso;
}
