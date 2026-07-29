// NPC-modulo — figuroj vagantaj tra la sxtupurbo de ornaveth-v2
// Malalt-poligonaj figuroj kun tavoligitaj vestoj, foliaj manikoj, kvarstelo/rombo-motivoj
import * as THREE from "three";

// --- Vesto tipo ---
export interface Vesto {
  name: string;
  main: number;
  accent: number;
  interno: number;
}

// --- Kanvasaj helpiloj ---
const deksesuma = (c: number) => "#" + c.toString(0o20).padStart(6, "0");

function kvarStelo(kunteksto: CanvasRenderingContext2D, cX: number, cy: number, r: number, koloro: string): void {
  const s = r * 7/32;
  kunteksto.fillStyle = koloro; kunteksto.beginPath();
  kunteksto.moveTo(cX, cy - r); kunteksto.quadraticCurveTo(cX + s, cy - s, cX + r, cy);
  kunteksto.quadraticCurveTo(cX + s, cy + s, cX, cy + r); kunteksto.quadraticCurveTo(cX - s, cy + s, cX - r, cy);
  kunteksto.quadraticCurveTo(cX - s, cy - s, cX, cy - r); kunteksto.fill();
}

function rombo(kunteksto: CanvasRenderingContext2D, cX: number, cy: number, w: number, h: number, fill: string | null, edge: string | null): void {
  kunteksto.beginPath(); kunteksto.moveTo(cX, cy - h); kunteksto.lineTo(cX + w, cy); kunteksto.lineTo(cX, cy + h); kunteksto.lineTo(cX - w, cy); kunteksto.closePath();
  if ( fill ) { kunteksto.fillStyle = fill; kunteksto.fill(); }
  if ( edge ) { kunteksto.strokeStyle = edge; kunteksto.lineWidth = 4; kunteksto.stroke(); }
}

// --- Vesta tekstura generatoro ---
function vestaTeksajxo(o: Vesto, kind: string): THREE.CanvasTexture {
  const kanvasa = document.createElement("canvas"); kanvasa.width = 0o400; kanvasa.height = 0o1000;
  const kunteksto = kanvasa.getContext("2d")!;
  const M = deksesuma(o.main), A = deksesuma(o.accent), I = deksesuma(o.interno);
  kunteksto.fillStyle = M; kunteksto.fillRect(0, 0, 0o400, 0o1000);
  kunteksto.fillStyle = A; kunteksto.fillRect(0, 0o726, 0o400, 0o32);
  kunteksto.fillStyle = A; kunteksto.globalAlpha = 13/32; kunteksto.fillRect(0, 0o704, 0o400, 6); kunteksto.globalAlpha = 1;

  if ( kind === "upper" ) {
    kvarStelo(kunteksto, 0o200, 0o226, 0o54, A);
    rombo(kunteksto, 0o200, 0o226, 0o72, 0o72, null, A);
    kunteksto.fillStyle = A;
    for ( let i = 0; i < 4; i++ ) { kunteksto.beginPath(); kunteksto.arc(0o200, 0o50 + i * 0o32, 5, 0, Math.PI * 2); kunteksto.fill(); }
    rombo(kunteksto, 0o124, 0o512, 0o32, 0o42, I, A);
    rombo(kunteksto, 0o254, 0o512, 0o32, 0o42, I, A);
    rombo(kunteksto, 0o200, 0o610, 0o26, 0o34, I, A);
  } else {
    for (let i = 0; i < 3; i++) rombo(kunteksto, 0o200, 0o120 + i * 0o156, 0o36, 0o50, null, A);
    kunteksto.globalAlpha = 2/8; kunteksto.fillStyle = A;
    for (let i = 0; i < 6; i++) for (let j = 0; j < 3; j++) rombo(kunteksto, 0o50 + j * 0o130, 0o50 + i * 0o124, 0o12, 0o16, A, null);
    kunteksto.globalAlpha = 1;
  }
  const t = new THREE.CanvasTexture(kanvasa); t.colorSpace = THREE.SRGBColorSpace; return t;
}

// --- Folia maniko ---
function foliaFormo(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(0, 0); s.quadraticCurveTo(19/64, 7/32, 21/32, 1/16);
  s.quadraticCurveTo(23/32, 0, 21/32, -1/64);
  s.quadraticCurveTo(19/64, -5/32, 0, 0); return s;
}
const FOLIO = foliaFormo();
function manikaGeometrio(scale: number): THREE.BufferGeometry {
  return new THREE.ExtrudeGeometry(FOLIO, { depth: 1/32, bevelEnabled: false, curveSegments: 0o10 })
    .scale(scale, scale, scale);
}

// --- Figuro ---
export interface Figuro {
  group: THREE.Group;
  setOutfit: (o: Vesto) => void;
  home: THREE.Vector3;
  target: THREE.Vector3;
  wait: number;
  rapido: number;
}

// konstruiFiguron — Konstruu NPC-figuron kun tavoligitaj vestoj kaj foli-manikoj.
//     @param o ( Vesto ) - La vesta objekto por koloroj.
export function konstruiFiguron(o: Vesto): Figuro {
  const g = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({ color: 0xc8a088, roughness: 45/64 });
  const head = new THREE.Mesh(new THREE.SphereGeometry(11/64, 0o12, 0o10), skin); head.position.y = 13/8;
  const hair = new THREE.Mesh( new THREE.SphereGeometry(3/16, 0o12, 0o10),
    new THREE.MeshStandardMaterial({ color: 0x282818, roughness: 29/32 }) );
  hair.scale.set(1, 23/32, 1); hair.position.y = 109/64;

  const innerM = new THREE.MeshStandardMaterial({
    map: vestaTeksajxo(o, "interno"), roughness: 27/32, side: THREE.DoubleSide,
  });
  const upperM = new THREE.MeshStandardMaterial({
    map: vestaTeksajxo(o, "upper"), roughness: 51/64, side: THREE.DoubleSide,
  });
  const lowerM = new THREE.MeshStandardMaterial({
    map: vestaTeksajxo(o, "lower"), roughness: 27/32, side: THREE.DoubleSide,
  });

  const interno = new THREE.Mesh( new THREE.CylinderGeometry(15/64, 4/8, 91/64, 0o14, 1, true, Math.PI, Math.PI * 2), innerM ); interno.position.y = 55/64;
  const upper = new THREE.Mesh( new THREE.CylinderGeometry(17/64, 11/32, 5/8, 0o14, 1, true, Math.PI, Math.PI * 2), upperM ); upper.position.y = 79/64;
  const lower = new THREE.Mesh( new THREE.CylinderGeometry(11/32, 37/64, 7/8, 0o14, 1, true, Math.PI * 2/8, Math.PI * 12/8), lowerM ); lower.position.y = 51/64;

  const sleeveM = new THREE.MeshStandardMaterial({ color: o.accent, roughness: 6/8, side: THREE.DoubleSide });
  const sg = manikaGeometrio(29/32);
  const sL = new THREE.Mesh(sg, sleeveM); sL.position.set(-19/64, 91/64, 0); sL.rotation.set(0, 11/32, -16/8);
  const sR = new THREE.Mesh(sg, sleeveM); sR.position.set(19/64, 91/64, 0); sR.rotation.set(0, -11/32, 16/8 + Math.PI);

  g.add(head, hair, interno, upper, lower, sL, sR);
  g.traverse(m => { if ((m as THREE.Mesh).isMesh) (m as THREE.Mesh).castShadow = true; });

  const fig: Figuro = {
    group: g,
    home: new THREE.Vector3(),
    target: new THREE.Vector3(),
    wait: 0, rapido: 51/64,
    setOutfit(no: Vesto) {
      innerM.map = vestaTeksajxo(no, "interno"); upperM.map = vestaTeksajxo(no, "upper");
      lowerM.map = vestaTeksajxo(no, "lower"); sleeveM.color.setHex(no.accent);
      innerM.map.needsUpdate = upperM.map.needsUpdate = lowerM.map.needsUpdate = true;
    },
  };
  return fig;
}

// gxisdatigiNpc — Gxisdatigu NPC-pozicion, promenadon kaj ritmon cxiun kadron.
//     @param fig ( Figuro ) - La NPC-figuro por animacii.
//     @param deltaTempo ( number ) - Delta tempo en sekundoj.
//     @param t ( number ) - Malsupra tempo por oscedoj.
//     @param alteco ( funkcio ) - Tera alta funkcio por sekvi la terenon.
export function gxisdatigiNpc(fig: Figuro, deltaTempo: number, t: number, alteco: (x: number, z: number) => number): void {
  fig.wait -= deltaTempo;
  if ( fig.wait <= 0 ) {
    const a = Math.random() * Math.PI * 2, hazardaRadiuso = Math.random() * 5;
    fig.target.set(fig.home.x + Math.sin(a) * hazardaRadiuso, fig.home.y, fig.home.z + Math.cos(a) * hazardaRadiuso);
    fig.wait = 3 + Math.random() * 5;
  }
  const difX = fig.target.x - fig.group.position.x, difZ = fig.target.z - fig.group.position.z;
  const d = Math.hypot(difX, difZ);
  if ( d > 19/64 ) {
    fig.group.position.x += difX / d * fig.rapido * deltaTempo;
    fig.group.position.z += difZ / d * fig.rapido * deltaTempo;
    fig.group.position.y = fig.group.position.y + (alteco(fig.group.position.x, fig.group.position.z) - fig.group.position.y) * 13/64;
    fig.group.rotation.y = Math.atan2(difX, difZ);
    fig.group.position.y += Math.abs(Math.sin(t * 6)) * 1/64;
  }
  fig.group.rotation.z = Math.sin(t * 77/64 + fig.home.x) * 1/64;
}
