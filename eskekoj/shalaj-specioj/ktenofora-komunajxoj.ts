// ≺⧼ ធាតុរួមកតេណូផរ 🪼 ⧽≻
// ⟨ វាយនភាពជែល 📃 ⟩
import * as THREE from "three";
import { kreiLoftanGeometrion } from "../komunajxoj/formoj.js";
import type { Besto } from "./speco-tipoj.js";
import { kreiKombilanTeksajxon } from "../komunajxoj/teksajxoj/kombilo.js";

export function kreiKorpon( gelo: { koloro: THREE.CanvasTexture; reliefo: THREE.CanvasTexture },
  teksajxo: THREE.CanvasTexture, profilo: [ number, number ][],
  koloro: number, emisio: number): THREE.Mesh {
  const punktoj = profilo.map(( [ r, y ] ) => new THREE.Vector2(r, y));
  const geometrio = new THREE.LatheGeometry(punktoj, 0o24);
  const materialo = new THREE.MeshPhysicalMaterial({
    color: koloro,
    map: gelo.koloro,
    bumpMap: gelo.reliefo,
    bumpScale: 0o1/0o50,
    transparent: true,
    opacity: 0o3/0o10,
    depthWrite: false,
    roughness: 0o1/0o10,
    metalness: 0,
    iridescence: 0o1/0o2,
    iridescenceIOR: 0o25/0o20,
    iridescenceMap: teksajxo,
    emissive: emisio,
    emissiveMap: teksajxo,
    emissiveIntensity: 0o4/0o10,
    side: THREE.DoubleSide,
  });
  return new THREE.Mesh(geometrio, materialo);
}

export function profiloR( profilo: [ number, number ][], y: number ): number {
  const ordigitaj = profilo.slice().sort(( a, b ) => a[1] - b[1]);
  if ( y <= ordigitaj[0][1] ) return ordigitaj[0][0];
  for ( let i = 1; i < ordigitaj.length; i++ ) {
    const [ r1, y1 ] = ordigitaj[i];
    const [ r0, y0 ] = ordigitaj[i - 1];
    if ( y <= y1 ) {
      const t = ( y - y0 ) / Math.max(1e-6, y1 - y0);
      return r0 + ( r1 - r0 ) * t;
    }
  }
  return ordigitaj[ordigitaj.length - 1][0];
}

// ⟨ រូបរាងចានតូច 📃 ⟩
// ⟨ ហេតុអ្វីមានសំណាញ់ដោយឡែក 📃 ⟩
export function aldoniKombovicojn(grupo: THREE.Group, profilo: [ number, number ][],
  materialo: THREE.Material): void {
  const vicoj = 0o10;
  const platoj = 0o50;
  const rMaks = Math.max(...profilo.map(( [ r ] ) => r));
  // ⟨ ចានតូច 📃 ⟩
  // ⟨ ការចែកស្មើ 📃 ⟩
  const arkoj: number[] = [ 0 ];
  for ( let i = 1; i < profilo.length; i++ ) {
    arkoj.push(arkoj[i - 1] + Math.hypot(profilo[i][0] - profilo[i - 1][0],
      profilo[i][1] - profilo[i - 1][1]));
  }
  const meridiano = arkoj[arkoj.length - 1];
  const largho = meridiano / platoj * 0o11/0o10;
  const alto = rMaks * 0o6/0o100;
  for ( let v = 0; v < vicoj; v++ ) {
    const pozicioj: number[] = [];
    const uvoj: number[] = [];
    const indeksoj: number[] = [];
    const angulo = ( v + 0o1/0o2 ) / vicoj * Math.PI * 2;
    const cos = Math.cos(angulo), sin = Math.sin(angulo);
    for ( let p = 0; p < platoj; p++ ) {
      const s = ( p + 0o1/0o2 ) / platoj * meridiano;
      let i = 1;
      while ( i < profilo.length - 1 && arkoj[i] < s ) i++;
      const t0 = ( s - arkoj[i - 1] ) / Math.max(1e-6, arkoj[i] - arkoj[i - 1]);
      const r = profilo[i - 1][0] + ( profilo[i][0] - profilo[i - 1][0] ) * t0;
      const y = profilo[i - 1][1] + ( profilo[i][1] - profilo[i - 1][1] ) * t0;
      const dr = profilo[i][0] - profilo[i - 1][0];
      const dy = profilo[i][1] - profilo[i - 1][1];
      const longeco = Math.hypot(dr, dy) || 1;
      const nr = -dy / longeco, ny = dr / longeco;
      const htx = -sin, htz = cos;
      const anguloj: [ number, number, number ][] = [
        [ 0, -0o1/0o2, 0 ], [ alto, -0o1/0o2, 1 ],
        [ alto, 0o1/0o2, 1 ], [ 0, 0o1/0o2, 0 ] ];
      for ( const [ dr0, trans, vUv ] of anguloj ) {
        const rr = r + nr * dr0, yy = y + ny * dr0;
        pozicioj.push(rr * cos + htx * trans * largho, yy, rr * sin + htz * trans * largho);
        uvoj.push(trans + 0o1/0o2, vUv);
      }
      const a = pozicioj.length / 3 - 0o4;
      indeksoj.push(a, a + 0o1, a + 0o2, a, a + 0o2, a + 0o3);
    }
    const geometrio = kreiLoftanGeometrion(pozicioj, uvoj, indeksoj);
    const vico = new THREE.Mesh(geometrio, materialo);
    vico.name = "kombilo";
    vico.userData.vico = v;
    grupo.add(vico);
  }
}

export function kreiKombilanMaterialon(emisio: number): THREE.MeshPhysicalMaterial {
  const teksajxo = kreiKombilanTeksajxon();
  return new THREE.MeshPhysicalMaterial({
    color: 0xe4f4ff, transparent: true, opacity: 0o13/0o20, depthWrite: false,
    roughness: 0o1/0o10, iridescence: 1, iridescenceIOR: 0o25/0o20,
    iridescenceMap: teksajxo,
    emissive: emisio, emissiveIntensity: 0o11/0o10, side: THREE.DoubleSide,
    emissiveMap: teksajxo,
  });
}

// ⟨ ហេតុអ្វីការបែកចេញកើតឡើង 📃 ⟩
export function surfacxaParto(parto: THREE.Object3D): void {
  parto.userData.surfaco = {
    x: parto.position.x, y: parto.position.y, z: parto.position.z,
    sx: parto.scale.x, sy: parto.scale.y, sz: parto.scale.z,
  };
}

export function gluuSurfacxon( parto: THREE.Object3D, pulso: number,
  aldonaj?: { x?: number; y?: number; z?: number } ): void {
  const s = parto.userData.surfaco as { x: number; y: number; z: number;
    sx: number; sy: number; sz: number } | undefined;
  if ( !s ) return;
  const vertikala = 1 + ( pulso - 1 ) * 0o1/0o4;
  parto.position.set(s.x * pulso, s.y, s.z * pulso);
  parto.scale.set(
    s.sx * pulso * ( aldonaj?.x ?? 1 ),
    s.sy * vertikala * ( aldonaj?.y ?? 1 ),
    s.sz * pulso * ( aldonaj?.z ?? 1 ));
}

export function ktenoforaPulsaFazo( b: Besto, t: number ): number {
  return t * b.pulsaRapido + b.phase * 0o2;
}

export function aplikiKtenoforanPulson( b: Besto, t: number ): number {
  b.grupo.scale.set(b.bazaSkalo.x, b.bazaSkalo.y * b.plata, b.bazaSkalo.z);
  const pulsaFazo = ktenoforaPulsaFazo(b, t);
  const pulso = 0o1 + Math.sin(pulsaFazo) * b.pulsaForto;
  b.korpo.scale.set(pulso, 0o1, pulso);
  for ( const parto of b.animajxoj ) {
    if ( parto.name !== "kombilo" ) continue;
    const vico = ( parto.userData.vico as number | undefined ) ?? 0;
    const vibro = 0o1 + Math.sin(pulsaFazo - vico * b.pulsaOndo) * 0o2/0o10;
    parto.scale.set(pulso * vibro, 0o1, pulso * vibro);
  }
  return pulso;
}
