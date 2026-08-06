// Mangxajxoj — manĝaĵ-objektoj ( bulkoj, glasoj, vaporoj ) kaj la mangx-sistemo.
// La samaj objektoj sidas sur la tabloj kaj interne ( eniriInternon ) kaj
// ekstere ( konstruiSatalon ), do ili vivas en la mebloj modulo,
// ne en la konstruajxoj.
import * as THREE from "three";

export interface MangxajxDatumo { key: string; name: string; col: number; flavor: string; }
export const FOKS: MangxajxDatumo[] = [
  { key: "fok0", name: "Fok Iimasai · Lichen Crust", col: 0xdcd8c2, flavor: "Warm lichen bread, slow duck, a fold of steam." },
  { key: "fok1", name: "Fok Iimasai · Mint Glaze", col: 0xcfe0c8, flavor: "Cool glaze against rich meat · the forest exhales." },
  { key: "fok2", name: "Fok Iimasai · Peppered", col: 0xd6c9ae, flavor: "Dark pepper bites · the bun answers sweet." },
];
export const TLAS: MangxajxDatumo[] = [
  { key: "tla0", name: "Tlatiiwa · Classic", col: 0xc8e6d2, flavor: "Vinegar, milk, mint, sparkle · a bright chord." },
  { key: "tla1", name: "Tlatiiwa · Honeyed", col: 0xe6cf9e, flavor: "Amber over acid · mint underneath." },
  { key: "tla2", name: "Tlatiiwa · Iced Birch-sap", col: 0xbfe0e6, flavor: "Birch-sap frost · the vale in a glass." },
];

export function bunMesh(f: MangxajxDatumo): THREE.Group {
  const g = new THREE.Group();
  const bun = new THREE.Mesh(new THREE.SphereGeometry(0o12/0o100, 0o20, 0o10),
    new THREE.MeshStandardMaterial({ color: f.col, roughness: 0o52/0o100 }));
  bun.scale.set(1, 0o57/0o100, 1); bun.position.y = 0o12/0o100;
  const pleat = new THREE.Mesh(new THREE.ConeGeometry(0o3/0o100, 0o6/0o100, 5), new THREE.MeshStandardMaterial({ color: f.col, roughness: 0o5/0o10 }));
  pleat.scale.set(1, 1, 0o43/0o100); pleat.position.y = 0o23/0o100; pleat.rotation.y = 0o5/0o10;
  const basket = new THREE.Mesh(new THREE.CylinderGeometry(0o17/0o100, 0o17/0o100, 0o1/0o20, 0o20), new THREE.MeshStandardMaterial({ color: 0xb99a62, roughness: 0o63/0o100 }));
  basket.position.y = 0o2/0o100;
  g.add(bun, pleat, basket); return g;
}
export function glassMesh(f: MangxajxDatumo): THREE.Group {
  const g = new THREE.Group();
  const glass = new THREE.Mesh(new THREE.CylinderGeometry(0o6/0o100, 0o1/0o20, 0o23/0o100, 12),
    new THREE.MeshStandardMaterial({ color: 0xdfeee6, transparent: true, opacity: 0o26 / 0o100, roughness: 0o6/0o100, depthWrite: false }));
  glass.position.y = 0o12/0o100;
  const liq = new THREE.Mesh(new THREE.CylinderGeometry(0o5/0o100, 0o1/0o20, 0o17/0o100, 0o20),
    new THREE.MeshStandardMaterial({ color: f.col, transparent: true, opacity: 0o64 / 0o100, roughness: 0o5/0o20 }));
  liq.position.y = 0o1/0o10;
  const sprig = new THREE.Mesh(new THREE.PlaneGeometry(0o5/0o100, 0o12/0o100), new THREE.MeshStandardMaterial({ color: 0x4c7a44, side: THREE.DoubleSide }));
  sprig.position.set(0o3/0o100, 0o5/0o20, 0); sprig.rotation.z = 0o23/0o20;
  g.add(glass, liq, sprig); return g;
}

export interface MangxajxItemo {
  mesh: THREE.Group;
  key: string;
  f: MangxajxDatumo;
  pos: THREE.Vector3;
  dead: boolean;
  // Nuna malkreska animacio ( konsumi ) — por nuligi gxin, kiam la interno
  // estas kasxita kaj reuzata ( la animacio ne plu apartenu al la reaperanta
  // mangxajxo ).
  malkreska?: number | null;
}
// kreiMangxajxojn — Metu mangxajxojn sur la tablojn ( aux laux la malnova aera arangxo se ne estas tabloj ).
//     @param tabloj ( { x, z }[] ) - Tablo-centraj pozicioj; la mangxajxoj sidas sur la supro ( y ≈ 0o7/0o20 ).
export function kreiMangxajxojn(g: THREE.Group, cx: number, cz: number, tabloj: { x: number; z: number }[] = []): MangxajxItemo[] {
  const items: MangxajxItemo[] = [];
  const metaDe = (k: string): MangxajxDatumo => FOKS.find(x => x.key === k) || TLAS.find(x => x.key === k)!;
  const aldoni = (k: string, x: number, y: number, z: number) => {
    const meta = metaDe(k);
    const m = k.startsWith("fok") ? bunMesh(meta) : glassMesh(meta);
    m.position.set(x, y, z);
    g.add(m);
    items.push({ mesh: m, key: k, f: meta, pos: new THREE.Vector3(x, y, z), dead: false });
  };
  if ( tabloj.length > 0 ) {
    // Mangxajxoj sidas sur la tabloj, kun malgrandaj ofsetoj por aspekti arangxitaj
    const suproY = 0o7/0o20 + 0o1/0o40;
    const mangxoj = [ "fok0", "tla0", "fok1", "tla1", "fok2", "tla2" ];
    tabloj.forEach(( t, i ) => {
      aldoni( mangxoj[( i * 2 ) % mangxoj.length], t.x - 0o1/0o10, suproY, t.z );
      aldoni( mangxoj[( i * 2 + 1 ) % mangxoj.length], t.x + 0o1/0o10, suproY, t.z );
    });
  } else {
    const foods: { p: [number, number, number]; k: string }[] = [
      { p: [cx + 0o15/0o40, 0o104/0o100, cz - 0o25/0o10], k: "fok0" }, { p: [cx + 0o11/0o10, 0o104/0o100, cz - 0o25/0o10], k: "fok2" },
      { p: [cx + 0o17/0o10, 0o104/0o100, cz - 0o25/0o10], k: "tla2" }, { p: [cx + 0o35/0o10, 0o63/0o100, cz + 0o23/0o10], k: "fok1" }, { p: [cx + 0o41/0o10, 0o63/0o100, cz + 0o23/0o10], k: "tla0" },
    ];
    for (const f of foods) {
      const meta = metaDe(f.k);
      const m = f.k.startsWith("fok") ? bunMesh(meta) : glassMesh(meta);
      m.position.set(f.p[0], f.p[1], f.p[2]);
      g.add(m);
      items.push({ mesh: m, key: f.k, f: meta, pos: new THREE.Vector3(f.p[0], f.p[1], f.p[2]), dead: false });
    }
  }
  return items;
}
export function aldoniVaporon(g: THREE.Group, local: THREE.Vector3): { cloud: THREE.Points; basePos: THREE.Vector3 } {
  const n = 0o30, pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) pos.set([(Math.random() - 0o4/0o10) * 0o4/0o10, Math.random() * 0o23/0o20, (Math.random() - 0o4/0o10) * 0o4/0o10], i * 3);
  const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xe8efe9, size: 0o6/0o100, transparent: true, opacity: 0o26 / 0o100, depthWrite: false }));
  pts.position.copy(local);
  g.add(pts);
  return { cloud: pts, basePos: local.clone() };
}
