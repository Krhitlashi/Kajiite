// ≺⧼ គីហ្វហេសូ ⭐ ⧽≻
import * as THREE from "three";
import { kreiBuferanGeometrion, kunfandiGeometriojn } from "../komunajxoj/kunfandajxoj.js";
import { kreiFolianTeksajxon } from "../komunajxoj/teksajxoj/keuxfhxesa-folio.js";

export interface KeuxfhxesoLoko {
  x: number; z: number;
  /** ការតម្រង់ទិសស្រេចចិត្ត , រចនាសម្ព័ន្ធមានស៊ីមេទ្រី 6 ជ្រុង , ដូច្នេះវាគ្រាន់តែរៀបជួរឆ្អឹងជំនី។ */
  rot?: number;
}

function sespintaStelo(rEkstera: number): THREE.Vector2[] {
  const punktoj: THREE.Vector2[] = [];
  const segmentoj = 0o16 * 6;
  const valoraRadiuso = rEkstera * 0o45/0o100;
  const pintoAkrecajxo = 0o4;
  for ( let j = 0; j < segmentoj; j++ ) {
    const ang = j / segmentoj * Math.PI * 0o2;
    const pinto = Math.pow(Math.abs(Math.cos(3 * ang)), pintoAkrecajxo);
    const radiuso = valoraRadiuso + ( rEkstera - valoraRadiuso ) * pinto;
    punktoj.push(new THREE.Vector2(
      Math.cos(ang) * radiuso,
      Math.sin(ang) * radiuso
));
  }
  return punktoj;
}

function glataPaso(u: number): number {
  const x = Math.min(1, Math.max(0, u));
  return x * x * x * ( x * ( x * 6 - 0o17 ) + 0o12 );
}
function folioProfilo(t: number): number {
  const pezo = 0o53 / 0o100;
  const vertikalo = 0o6 / 0o10;
  const korpo = Math.pow(Math.max(0, Math.sin(Math.PI * Math.pow(t, pezo))), vertikalo);
  const PINTO = 0o2 / 0o10;
  if ( t >= PINTO ) return korpo;
  const korpoP = Math.pow(Math.max(0, Math.sin(Math.PI * Math.pow(PINTO, pezo))), vertikalo);
  const A = korpoP / Math.sqrt(PINTO);
  const blendo = glataPaso(t / PINTO);
  return A * Math.sqrt(t) * ( 1 - blendo ) + korpo * blendo;
}

function starfruktKorpo(rEkstera: number, alto: number, ringoj: number): THREE.BufferGeometry {
  const sekco = sespintaStelo(rEkstera);
  const N = sekco.length;
  const L = N / 6;
  const stelFrakcioj = sekco.map(p => Math.hypot(p.x, p.y) / rEkstera);
  const stelFrakciojRecip = stelFrakcioj.map(f => 1 / f);
  const RONDO = 0o2 / 0o10;
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  for ( let i = 0; i <= ringoj; i++ ) {
    const u = i / ringoj;
    const t = ( 1 - Math.cos(Math.PI * u) ) / 0o2;
    const s = folioProfilo(t);
    const y = t * alto;
    const w = t < RONDO ? glataPaso(t / RONDO) : 1;
    for ( let j = 0; j < N; j++ ) {
      const p = sekco[j];
      const rf = w * stelFrakcioj[j] + ( 1 - w );
      pozicioj.push(p.x * s * rf * stelFrakciojRecip[j], y, p.y * s * rf * stelFrakciojRecip[j]);
      uvoj.push(( j % L ) / ( L - 1 ), t);
    }
  }
  const indeksoj: number[] = [];
  for ( let i = 0; i < ringoj; i++ ) {
    const r0 = i * N, r1 = ( i + 1 ) * N;
    for ( let j = 0; j < N; j++ ) {
      const j2 = ( j + 1 ) % N;
      indeksoj.push(r0 + j, r1 + j, r1 + j2, r0 + j, r1 + j2, r0 + j2);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pozicioj), 3));
  g.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(uvoj), 2));
  g.setIndex(indeksoj);
  g.computeVertexNormals();
  return g;
}

function krestaRipo(rEkstera: number, alto: number, ang: number, dikeco: number): THREE.BufferGeometry {
  const ringoj = 0o40;
  const flankoj = 0o10;
  const tuboRadiuso = dikeco * 0o5 / 0o10;
  const centroR = rEkstera - tuboRadiuso;
  const pozicioj: number[] = [];
  const indeksoj: number[] = [];

  for ( let i = 0; i <= ringoj; i++ ) {
    const u = i / ringoj;
    const t = ( 1 - Math.cos(Math.PI * u) ) / 0o2;
    const s = folioProfilo(t);
    const cx = Math.cos(ang) * centroR * s;
    const cz = Math.sin(ang) * centroR * s;
    const r = tuboRadiuso * ( 0o4/0o10 + 0o16/0o100 * Math.pow(s, 0o20 / 0o10) );
    for ( let j = 0; j < flankoj; j++ ) {
      const a = j / flankoj * Math.PI * 0o2;
      pozicioj.push(cx + Math.cos(a) * r, t * alto, cz + Math.sin(a) * r);
    }
  }
  for ( let i = 0; i < ringoj; i++ ) {
    for ( let j = 0; j < flankoj; j++ ) {
      const j2 = ( j + 1 ) % flankoj;
      const a = i * flankoj + j;
      const b = ( i + 1 ) * flankoj + j;
      indeksoj.push(a, b, ( i + 1 ) * flankoj + j2, a, ( i + 1 ) * flankoj + j2, i * flankoj + j2);
    }
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj);
}

let foliaTeksajxoStoko: THREE.CanvasTexture | null = null;
let muraMaterialoStoko: THREE.MeshStandardMaterial | null = null;

export function konstruiKeuxfhxeso(sceno: THREE.Scene,
  lokoj: KeuxfhxesoLoko[],
  alteco: ( x: number, z: number ) => number,
  kadraMaterialo: THREE.MeshStandardMaterial
): THREE.Group {
  const murajGeometrioj: THREE.BufferGeometry[] = [];
  const kadrajGeometrioj: THREE.BufferGeometry[] = [];

  const R = 0o63/0o100;
  const ALTO = 0o36 / 0o10;

  const korpaSablono = starfruktKorpo(R, ALTO, 0o40);
  const ripajSablonoj: THREE.BufferGeometry[] = [];
  for ( let k = 0; k < 6; k++ ) {
    ripajSablonoj.push(krestaRipo(R, ALTO, k * Math.PI / 3, 0o4 / 0o100));
  }

  for ( const l of lokoj ) {
    const h0 = alteco(l.x, l.z);
    const rot = l.rot ?? 0;
    const M = new THREE.Matrix4().makeRotationY(rot);

    const korpo = korpaSablono.clone();
    korpo.applyMatrix4(M);
    korpo.translate(l.x, h0, l.z);
    murajGeometrioj.push(korpo);

    for ( let k = 0; k < 6; k++ ) {
      const ripo = ripajSablonoj[k].clone();
      ripo.applyMatrix4(M);
      ripo.translate(l.x, h0, l.z);
      kadrajGeometrioj.push(ripo);
    }
  }

  const grupo = new THREE.Group();
  if ( !muraMaterialoStoko ) {
    foliaTeksajxoStoko = kreiFolianTeksajxon();
    muraMaterialoStoko = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0o6 / 0o10, metalness: 0,
      map: foliaTeksajxoStoko,
    });
  }
  const muraMaterialo = muraMaterialoStoko;

  const korpoj = new THREE.Mesh(kunfandiGeometriojn(murajGeometrioj), muraMaterialo);
  korpoj.castShadow = korpoj.receiveShadow = true;
  grupo.add(korpoj);
  const kadroj = new THREE.Mesh(kunfandiGeometriojn(kadrajGeometrioj), kadraMaterialo);
  kadroj.castShadow = kadroj.receiveShadow = true;
  grupo.add(kadroj);  sceno.add(grupo);
  return grupo;
}
