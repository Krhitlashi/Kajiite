// NPC-modulo — figuroj vagantaj tra la sxtupurbo de ornaveth-v2
// Malalt-poligonaj figuroj kun tavoligitaj vestoj, foliaj manikoj, kvarstelo/rombo-motivoj
import * as THREE from "three";

// --- Vesto tipo ---
export interface Vesto {
  name: string;
  main: number;
  accent: number;
  interno: number;
  pantalono: number;  // kutime hela aŭ malhela bluo
  botoj: number;      // kutime bruno
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
  // La pantalono uzas sian propran bazkoloron ( bluan ); la cetero la ĉefan.
  const M = deksesuma(kind === "pantalono" ? o.pantalono : o.main), A = deksesuma(o.accent), I = deksesuma(o.interno);
  kunteksto.fillStyle = M; kunteksto.fillRect(0, 0, 0o400, 0o1000);
  kunteksto.fillStyle = A; kunteksto.fillRect(0, 0o726, 0o400, 0o32);
  kunteksto.fillStyle = A; kunteksto.globalAlpha = 13/32; kunteksto.fillRect(0, 0o704, 0o400, 6); kunteksto.globalAlpha = 1;

  if ( kind === "upper" ) {
    // Frontaj motivoj — stelo kun rombo kaj butona plateto sur la fermita brusto.
    // La stelo ( 0o120 ± 0o44 ) restas inter la kolumaj punktoj supre kaj la
    // plateto sube, por ke neniu elemento interkovru.
    kvarStelo(kunteksto, 0o200, 0o120, 0o44, A);
    rombo(kunteksto, 0o200, 0o120, 0o60, 0o60, null, A);
    kunteksto.fillStyle = A;
    for ( let i = 0; i < 4; i++ ) { kunteksto.beginPath(); kunteksto.arc(0o200, 0o6 + i * 0o14, 5, 0, Math.PI * 2); kunteksto.fill(); }
    // Butona plateto — vertikala akcenta linio kun butonoj laŭ la fronta centro
    // ( jako-stilo ). Ĝi komenciĝas sub la stelo ( 0o170 ) kaj sidas alta sur la
    // fermita brusto ( super la levita fronto-hemo, y ≈ 1.14 ), por ke ĝi ne
    // malaperu en la malfermaĵo.
    kunteksto.strokeStyle = A; kunteksto.lineWidth = 3;
    kunteksto.beginPath(); kunteksto.moveTo(0o200, 0o170); kunteksto.lineTo(0o200, 0o240); kunteksto.stroke();
    kunteksto.fillStyle = A;
    for ( let i = 0; i < 3; i++ ) { kunteksto.beginPath(); kunteksto.arc(0o200, 0o200 + i * 0o22, 4, 0, Math.PI * 2); kunteksto.fill(); }
    // Dorsaj motivoj — sama stelo ĉe la kudro ( x = 0 kaj x = 0o400 ), ĉar la
    // malantaŭo estas la tekstura rando post la ŝovo ( 1/2 ).
    for ( const x of [ 0, 0o400 ] ) {
      kvarStelo(kunteksto, x, 0o130, 0o40, A);
      rombo(kunteksto, x, 0o130, 0o54, 0o54, null, A);
      kvarStelo(kunteksto, x, 0o560, 0o32, A);
    }
    // Flankaj romboj — sur la pendantaj flankoj, sub la malfermaĵo.
    rombo(kunteksto, 0o124, 0o440, 0o30, 0o40, I, A);
    rombo(kunteksto, 0o254, 0o440, 0o30, 0o40, I, A);
  } else {
    for (let i = 0; i < 3; i++) {
      rombo(kunteksto, 0o200, 0o120 + i * 0o156, 0o36, 0o50, null, A);
      // Dorsa ripeto ĉe la kudro ( x = 0 / x = 0o400 ).
      rombo(kunteksto, 0, 0o120 + i * 0o156, 0o36, 0o50, null, A);
      rombo(kunteksto, 0o400, 0o120 + i * 0o156, 0o36, 0o50, null, A);
    }
    kunteksto.globalAlpha = 2/8; kunteksto.fillStyle = A;
    for (let i = 0; i < 6; i++) for (let j = 0; j < 3; j++) rombo(kunteksto, 0o50 + j * 0o130, 0o50 + i * 0o124, 0o12, 0o16, A, null);
    kunteksto.globalAlpha = 1;
  }
  const t = new THREE.CanvasTexture(kanvasa); t.colorSpace = THREE.SRGBColorSpace;
  // La motivoj aperu ĉe la fronto: la ŝovo ( 1/2 ) alportas la teksturcentron,
  // kie la steloj/romboj kaj la butona plateto estas, al la fronto ( +z ).
  t.wrapS = THREE.RepeatWrapping; t.offset.x = 1/2;
  return t;
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

// kreiRobanSxelon — Robo kun oblikva malsupra rando: la dorso pendas pli
// malsupren ol la antaŭo ( mantelo-stilo ). La antaŭa rando leviĝas V-forme,
// malfermante la robon kaj montrante la internan ĉemizon sube.
//     @param suproR ( number ) - Supra radiuso.
//     @param malsuproR ( number ) - Malsupra radiuso.
//     @param alto ( number ) - Alto de la robo.
//     @param levo ( number ) - Kiom la antaŭa rando leviĝas.
//     @returns geometrio ( THREE.BufferGeometry ) - La rob-geometrio.
function kreiRobanSxelon( suproR: number, malsuproR: number, alto: number, levo: number ): THREE.BufferGeometry {
  const geometrio = new THREE.CylinderGeometry( suproR, malsuproR, alto, 0o14, 1, true );
  const pozicioj = geometrio.attributes.position;
  const v = new THREE.Vector3();
  for ( let i = 0; i < pozicioj.count; i++ ) {
    v.fromBufferAttribute( pozicioj, i );
    if ( v.y < 0 ) {
      // zFrakcio: -1 malantaŭe, 0 flanke, +1 antaŭe. La kvara potenco faras
      // mallarĝan, altan V-forman levaĵon — la malfermaĵo estas alta sed ne larĝa.
      const zFrakcio = v.z / malsuproR;
      v.y += levo * Math.pow( ( zFrakcio + 1 ) / 2, 4 );
      pozicioj.setXYZ( i, v.x, v.y, v.z );
    }
  }
  geometrio.computeVertexNormals();
  return geometrio;
}

// konstruiFiguron — Konstruu NPC-figuron kun tavoligitaj vestoj kaj foli-manikoj.
//     @param o ( Vesto ) - La vesta objekto por koloroj.
export function konstruiFiguron(o: Vesto): Figuro {
  const g = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({ color: 0x605050, roughness: 45/64 });
  const head = new THREE.Mesh(new THREE.SphereGeometry(11/64, 0o12, 0o10), skin); head.position.y = 13/8;
  const hair = new THREE.Mesh( new THREE.SphereGeometry(3/16, 0o12, 0o10),
    new THREE.MeshStandardMaterial({ color: 0x282818, roughness: 29/32 }) );
  hair.scale.set(1, 23/32, 1); hair.position.y = 109/64;

  // Kolo — plenigas la breĉon inter la kapo kaj la ĉemizo, por ke neniu truo videblu.
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(3/32, 7/64, 5/32, 0o14, 1), skin); neck.position.y = 93/64;

  const innerM = new THREE.MeshStandardMaterial({
    map: vestaTeksajxo(o, "interno"), roughness: 27/32, side: THREE.DoubleSide,
  });
  const upperM = new THREE.MeshStandardMaterial({
    map: vestaTeksajxo(o, "upper"), roughness: 51/64, side: THREE.DoubleSide,
  });
  const pantsM = new THREE.MeshStandardMaterial({
    map: vestaTeksajxo(o, "pantalono"), roughness: 51/64, side: THREE.DoubleSide,
  });
  const bootM = new THREE.MeshStandardMaterial({ color: o.botoj, roughness: 27/32 });
  // Plando — la akcenta koloro ĉe la malsupro de la ŝuo.
  const plandoM = new THREE.MeshStandardMaterial({ color: o.accent, roughness: 51/64 });

  // Interna ĉemizo — pli granda, iras de la kolo ĝis la talio kaj montriĝas
  // sub la antaŭa rando de la robo. La malsupro ( 31/64 ) enŝoviĝas iomete
  // sub la pantalono-supro ( 1/2 ), por ke neniu koincida rando flagru.
  const interno = new THREE.Mesh( new THREE.CylinderGeometry(3/16, 11/32, 1, 0o14, 1, true), innerM ); interno.position.y = 63/64;
  // Ekstera robo — pli granda, kun oblikva rando: la dorso pendas super la
  // pantalono ( y = 25/64 ) kaj la antaŭo leviĝas alte ( y = 73/64 ) sed mallarĝe
  // ( la flankoj restas malsupre, y ≈ 28/64 ), malfermiĝante kiel jako — sed la
  // supro restas fermita ĉirkaŭ la kolo.
  const upper = new THREE.Mesh( kreiRobanSxelon(7/32, 3/8, 9/8, 3/4), upperM ); upper.position.y = 61/64;

  // Pantalono — du pli dikaj kruroj, kutime hela aŭ malhela bluo kun rombaj
  // motivoj. La suproj ( 5/32 ) koincidas kun la interna ĉemiz-hemo ( 11/32 ),
  // kaj la fundoj ( 1/8 ) enŝoviĝas en la pli altajn botojn.
  const pantalonoGeometrio = new THREE.CylinderGeometry(5/32, 1/8, 3/8, 0o14, 1);
  const pL = new THREE.Mesh(pantalonoGeometrio, pantsM); pL.position.set(-3/16, 5/16, 0);
  const pR = new THREE.Mesh(pantalonoGeometrio, pantsM); pR.position.set(3/16, 5/16, 0);

  // Botoj — ŝafto supre de sxoforma piedo kiu etendiĝas antaŭen ( +z ), kiel
  // piedo sur homa kruro. La plando sube portas la akcentan koloron. La ŝafto
  // estas malfermita ( sen ĉapoj ) por ke neniu z-flagrado okazu.
  const botoSxafto = new THREE.CylinderGeometry(3/16, 1/8, 9/32, 0o14, 1, true);
  const bL1 = new THREE.Mesh(botoSxafto, bootM); bL1.position.set(-3/16, 7/32, 0);
  const bR1 = new THREE.Mesh(botoSxafto, bootM); bR1.position.set(3/16, 7/32, 0);
  // Piedo — malgranda sxoforma bloko antaŭen. La malsupro ( 1/64 ) enŝoviĝas
  // en la plandon ( 0 .. 1/32 ), por ke neniu koincida faco flagru.
  const piedaGeometrio = new THREE.BoxGeometry(1/4, 3/32, 1/4);
  const piedL = new THREE.Mesh(piedaGeometrio, bootM); piedL.position.set(-3/16, 1/16, 1/8);
  const piedR = new THREE.Mesh(piedaGeometrio, bootM); piedR.position.set(3/16, 1/16, 1/8);
  // Plando — maldika akcenta plato sub la piedo, iomete pli granda ol la piedo.
  const plandaGeometrio = new THREE.BoxGeometry(9/32, 1/32, 5/16);
  const plL = new THREE.Mesh(plandaGeometrio, plandoM); plL.position.set(-3/16, 1/64, 1/8);
  const plR = new THREE.Mesh(plandaGeometrio, plandoM); plR.position.set(3/16, 1/64, 1/8);

  const sleeveM = new THREE.MeshStandardMaterial({ color: o.accent, roughness: 6/8, side: THREE.DoubleSide });
  const sg = manikaGeometrio(31/32);
  const sL = new THREE.Mesh(sg, sleeveM); sL.position.set(-17/64, 91/64, 0); sL.rotation.set(0, 11/32, -16/8);
  const sR = new THREE.Mesh(sg, sleeveM); sR.position.set(17/64, 91/64, 0); sR.rotation.set(0, -11/32, 16/8 + Math.PI);

  g.add(head, hair, neck, interno, upper, pL, pR, bL1, bR1, piedL, piedR, plL, plR, sL, sR);
  g.traverse(m => { if ((m as THREE.Mesh).isMesh) (m as THREE.Mesh).castShadow = true; });

  const fig: Figuro = {
    group: g,
    home: new THREE.Vector3(),
    target: new THREE.Vector3(),
    wait: 0, rapido: 51/64,
    setOutfit(no: Vesto) {
      innerM.map = vestaTeksajxo(no, "interno"); upperM.map = vestaTeksajxo(no, "upper");
      pantsM.map = vestaTeksajxo(no, "pantalono");
      sleeveM.color.setHex(no.accent); bootM.color.setHex(no.botoj); plandoM.color.setHex(no.accent);
      innerM.map.needsUpdate = upperM.map.needsUpdate = pantsM.map.needsUpdate = true;
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
