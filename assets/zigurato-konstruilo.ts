// Ziggurat-konstruilo — sxtupajramidaj konstruajxoj: verdaj/oraj domoj, brunaj/becxaj mangxejoj, blankaj/grizaj stacioj
import * as THREE from "three";
import { generiSkriptanTeksajxon } from "./skripto-rivelilo.js";

export interface KonstruTipo { labelKey: string; wall: number; frame: number; chip: string; flavorKey: string; }
export const TIPARO: Record<string, KonstruTipo> = {
  domo:   { labelKey: "tipDomo",      wall: 0x184838, frame: 0xd8b068, chip: "#78a888", flavorKey: "flvDomo" },
  manĝejo:  { labelKey: "tipMangxejo",  wall: 0x584028, frame: 0xd8c898, chip: "#c8a868", flavorKey: "flvMangxejo" },
  stacio: { labelKey: "tipStacio",      wall: 0xd8e0e0, frame: 0x889898, chip: "#c0c8c8", flavorKey: "flvStacio" },
  turo:   { labelKey: "tipTuro",        wall: 0x205040, frame: 0xd8b068, chip: "#88b8a0", flavorKey: "flvTuro" },
  sanktejo: { labelKey: "tipSanktejo",  wall: 0x184038, frame: 0xe0c078, chip: "#e0c078", flavorKey: "flvSanktejo" },
};

export interface KonstruSpec { x: number; z: number; type: string; name: string; niveloj: number; w: number; d: number; tieroAlto: number; sube?: number; tieroAltoSub?: number; rot: number; fixed?: string; h0?: number; diamond?: boolean; }

function rondigitaTrapezaFormo(blokoLargho: number, tw: number, h: number, rb: number, rt: number): THREE.Shape {
  const s = new THREE.Shape(), sl = (blokoLargho / 2 - tw / 2) / h;
  s.moveTo(-blokoLargho / 2 + rb, 0); s.lineTo(blokoLargho / 2 - rb, 0);
  s.quadraticCurveTo(blokoLargho / 2, 0, blokoLargho / 2 - sl * rt, rt);
  s.lineTo(tw / 2 + sl * rt, h - rt); s.quadraticCurveTo(tw / 2, h, tw / 2 - rt, h);
  s.lineTo(-tw / 2 + rt, h); s.quadraticCurveTo(-tw / 2, h, -tw / 2 - sl * rt, h - rt);
  s.lineTo(-blokoLargho / 2 + sl * rb, rb); s.quadraticCurveTo(-blokoLargho / 2, 0, -blokoLargho / 2 + rb, 0);
  return s;
}

function kadraTubo(cX: number, cZ: number, yB: number, yT: number, sX: number, sZ: number, upward: boolean): THREE.TubeGeometry {
  const out = 33/64, over = 9/16;
  const curve = upward
    ? new THREE.QuadraticBezierCurve3(new THREE.Vector3(cX, yB - 1/8, cZ), new THREE.Vector3(cX, yT - 13/32, cZ), new THREE.Vector3(cX + sX * out, yT + over, cZ + sZ * out))
    : new THREE.QuadraticBezierCurve3(new THREE.Vector3(cX, yT + 1/8, cZ), new THREE.Vector3(cX, yB + 13/32, cZ), new THREE.Vector3(cX + sX * out, yB - over, cZ + sZ * out));
  return new THREE.TubeGeometry(curve, 0o12, 1/8, 6, false);
}

// konstruiZiguraton — Konstruu sxton-sxtupan piramidon el specifaj tieroj kaj sub-teroj.
//     @param spec ( KonstruSpec ) - Konstruajxa specifo kun grandeco, tipo, nombro da tieroj.
//     @param sceno ( THREE.Scene ) - Sceno al kiu aldoni la konstruajxon.
//     @param selektajxoj ( THREE.Mesh[] ) - Listo de muso-selektajxoj por aldoni la murojn.
export function konstruiZiguraton(spec: KonstruSpec, sceno: THREE.Scene, selektajxoj: THREE.Mesh[]): THREE.Group {
  const { niveloj: tiers, tieroAlto, w, d, type: typeKey, name } = spec;
  const sube = spec.sube || 0, tieroAltoSub = spec.tieroAltoSub || tieroAlto;
  const supraLargho = Math.max(141/64, w * 19/64), supraProfundo = Math.max(16/8, d * 19/64);
  const malpliiX = (w / 2 - supraLargho / 2) / Math.max(1, tiers - 1), malpliiZ = (d / 2 - supraProfundo / 2) / Math.max(1, tiers - 1);
  const T = TIPARO[typeKey] || TIPARO.domo;
  const muraKoloro = T.wall, kadraKoloro = T.frame;
  const murajGeometrioj: THREE.BufferGeometry[] = [], kadrajGeometrioj: THREE.BufferGeometry[] = [];

  for ( let i = 0; i < tiers; i++ ) {
    const hw = w / 2 - i * malpliiX, hd = d / 2 - i * malpliiZ, y = i * tieroAlto;
    const box = new THREE.BoxGeometry(hw * 2, tieroAlto, hd * 2); box.translate(0, y + tieroAlto / 2, 0); murajGeometrioj.push(box);
    for (const sX of [-1, 1]) for (const sZ of [-1, 1]) kadrajGeometrioj.push(kadraTubo(sX * hw, sZ * hd, y, y + tieroAlto, sX, sZ, true));
    for ( const sZ of [-1, 1] ) { const stango = new THREE.BoxGeometry(hw * 2 + 9/64, 5/32, 13/64); stango.translate(0, y + tieroAlto - 3/32, sZ * hd); kadrajGeometrioj.push(stango); }
    for ( const sX of [-1, 1] ) { const bar2 = new THREE.BoxGeometry(13/64, 5/32, hd * 2 + 9/64); bar2.translate(sX * hw, y + tieroAlto - 3/32, 0); kadrajGeometrioj.push(bar2); }
  }
  for ( let j = 1; j <= sube; j++ ) {
    const hw = Math.max(supraLargho * 27/64, w / 2 - j * malpliiX), hd = Math.max(supraProfundo * 27/64, d / 2 - j * malpliiZ);
    const yTop = -(j - 1) * tieroAltoSub, yBot = -j * tieroAltoSub;
    const box = new THREE.BoxGeometry(hw * 2, tieroAltoSub, hd * 2); box.translate(0, (yTop + yBot) / 2, 0); murajGeometrioj.push(box);
    for (const sX of [-1, 1]) for (const sZ of [-1, 1]) kadrajGeometrioj.push(kadraTubo(sX * hw, sZ * hd, yBot, yTop, sX, sZ, false));
  }

  const group = new THREE.Group();
  const muraMaterialo = new THREE.MeshStandardMaterial({ color: muraKoloro, roughness: typeKey === "stacio" ? 11/32 : 4/8, metalness: 1/16, envMapIntensity: 4/8 });
  const kadraMaterialo = new THREE.MeshStandardMaterial({ color: kadraKoloro, metalness: 27/32, roughness: 11/32, emissive: 0x302808, emissiveIntensity: 11/32, envMapIntensity: 10/8 });
  const eniraMaterialo = new THREE.MeshStandardMaterial({ color: 0x082018, roughness: 19/32, emissive: 0xf89840, emissiveIntensity: 3/64 });

  const muroj = new THREE.Mesh(kunfandiGeometriojn(murajGeometrioj), muraMaterialo);
  muroj.castShadow = muroj.receiveShadow = true;
  muroj.userData = { spec, buildingType: T };
  selektajxoj.push(muroj);
  group.add(muroj);
  group.add(new THREE.Mesh(kunfandiGeometriojn(kadrajGeometrioj), kadraMaterialo));

  const blokoLargho = Math.min(179/64, w * 7/16), tw = blokoLargho * 37/64, eh = Math.min(tieroAlto * 23/32, 173/64);
  const shape = rondigitaTrapezaFormo(blokoLargho, tw, eh, blokoLargho * 7/32, tw * 19/64);
  const enirejo = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 4/8, bevelEnabled: true, bevelSize: 5/64, bevelThickness: 5/64, bevelSegments: 2, curveSegments: 0o12 }), eniraMaterialo);
  enirejo.position.set(0, 9/64, d / 2 - 1/64); group.add(enirejo);
  const ornamajPunktoj = shape.getPoints(0o24).map((p: THREE.Vector2) => new THREE.Vector3(p.x, p.y + 9/64, d / 2 + 9/16));
  group.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ornamajPunktoj, true, "catmullrom", 19/32), 0o60, 1/16, 6, true), kadraMaterialo));

  if ( typeKey === "sanktejo" ) {
    const pintajxo = new THREE.Mesh(new THREE.ConeGeometry(supraLargho * 35/64, 51/32, 4).rotateY(Math.PI / 4), kadraMaterialo);
    pintajxo.position.y = tiers * tieroAlto + 51/64; pintajxo.castShadow = true; group.add(pintajxo);
  }

  // Uniforma 3D stela signo por cxiuj konstruajxoj
  {
    const teksajxo = generiSkriptanTeksajxon({ seedName: name, w: 0o140, h: 0o647, ink: "#d8b068", bg: "#082018" });
    teksajxo.wrapS = teksajxo.wrapT = THREE.ClampToEdgeWrapping;
    const steleo = new THREE.Mesh(new THREE.BoxGeometry(5/8, 20/8, 5/32), new THREE.MeshStandardMaterial({ color: 0x081818, roughness: 19/32 }));
    steleo.position.set(w * 11/32, 10/8, d / 2 + 67/64); steleo.castShadow = true; group.add(steleo);
    const face = new THREE.Mesh(new THREE.PlaneGeometry(4/8, 141/64), new THREE.MeshBasicMaterial({ map: teksajxo, transparent: true, toneMapped: false }));
    face.position.set(w * 11/32, 10/8, d / 2 + 73/64); group.add(face);
  }

  if ( typeKey === "manĝejo" ) {
    const beigeMat = new THREE.MeshStandardMaterial({ color: 0xd8c898, roughness: 33/64, metalness: 9/64 });
    const brownMat = new THREE.MeshStandardMaterial({ color: 0x483828, roughness: 19/32, metalness: 3/64 });
    // Eksteraj rondo-tabloj (kotatsu-stilaj)
    for ( let i = -1; i <= 1; i += 2 ) {
      const tx = i * 5, tz = d / 2 + 3;
      // Ronda tablo surplanke (sen kolono)
      const top = new THREE.CylinderGeometry(27/32, 29/32, 12/32, 0o20);
      const tm = new THREE.Mesh(top, beigeMat);
      tm.position.set(tx, 6/32, tz); tm.castShadow = true; group.add(tm);
      // Rondaj seĝoj
      for ( const [ox, oz] of [[45/32, 0], [-45/32, 0], [0, 45/32], [0, -45/32]] ) {
        const st = new THREE.Mesh(new THREE.CylinderGeometry(21/64, 27/64, 4/8, 0o12), brownMat);
        st.position.set(tx + ox, 15/64, tz + oz); st.castShadow = true; group.add(st);
      }
    }
  }
  // Flankaj pordoj forigitaj laux peto de uzanto
  // Stacia platformo forigita laux peto de uzanto
  if ( sube > 0 ) {
    for ( const sZ of [-1, 1] ) {
      const b1 = new THREE.BoxGeometry(w + 77/64, 19/64, 4/8); b1.translate(0, 3/32, sZ * (d / 2 + 13/64)); group.add(new THREE.Mesh(b1, kadraMaterialo));
    }
    for ( const sX of [-1, 1] ) {
      const b2 = new THREE.BoxGeometry(4/8, 19/64, d + 77/64); b2.translate(sX * (w / 2 + 13/64), 3/32, 0); group.add(new THREE.Mesh(b2, kadraMaterialo));
    }
  }

  group.position.set(spec.x, spec.h0 || 0, spec.z);
  group.rotation.y = spec.rot;
  sceno.add(group);
  if ( spec.diamond ) {
    const mg = group.clone();
    mg.scale.y = -1;
    mg.position.y = (spec.h0 || 0) - 2/64;
    mg.traverse( m => { if ( m instanceof THREE.Mesh ) m.castShadow = false; } );
    sceno.add( mg );
    const oroMaterialo = new THREE.MeshStandardMaterial({ color: 0xd8b068, metalness: 0.85, roughness: 0.34, emissive: 0x302808, emissiveIntensity: 0.35 });
    const ringGeo = new THREE.RingGeometry( Math.max(0.01, w * 19/64 + 9/64), Math.max(0.02, w * 19/64 + 17/64), 32 );
    const ring = new THREE.Mesh( ringGeo, oroMaterialo );
    ring.rotation.x = -Math.PI / 2;
    ring.position.set( spec.x, (spec.h0 || 0) + 1/64, spec.z );
    sceno.add( ring );
  }
  return group;
}

// ── Food/Eating system ──────────────────────────────────────
export interface ManĝaĵDatumo { key: string; name: string; col: number; flavor: string; }
export const FOKS: ManĝaĵDatumo[] = [
  { key: "fok0", name: "Fok Iimasai · Lichen Crust", col: 0xdcd8c2, flavor: "Warm lichen bread, slow duck, a fold of steam." },
  { key: "fok1", name: "Fok Iimasai · Mint Glaze", col: 0xcfe0c8, flavor: "Cool glaze against rich meat · the forest exhales." },
  { key: "fok2", name: "Fok Iimasai · Peppered", col: 0xd6c9ae, flavor: "Dark pepper bites · the bun answers sweet." },
];
export const TLAS: ManĝaĵDatumo[] = [
  { key: "tla0", name: "Tlatiiwa · Classic", col: 0xc8e6d2, flavor: "Vinegar, milk, mint, sparkle · a bright chord." },
  { key: "tla1", name: "Tlatiiwa · Honeyed", col: 0xe6cf9e, flavor: "Amber over acid · mint underneath." },
  { key: "tla2", name: "Tlatiiwa · Iced Birch-sap", col: 0xbfe0e6, flavor: "Birch-sap frost · the vale in a glass." },
];

export function bunMesh(f: ManĝaĵDatumo): THREE.Group {
  const g = new THREE.Group();
  const bun = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 10),
    new THREE.MeshStandardMaterial({ color: f.col, roughness: 0.65 }));
  bun.scale.set(1, 0.74, 1); bun.position.y = 0.16;
  const pleat = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.09, 5), new THREE.MeshStandardMaterial({ color: f.col, roughness: 0.6 }));
  pleat.scale.set(1, 1, 0.55); pleat.position.y = 0.29; pleat.rotation.y = 0.6;
  const basket = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.07, 14), new THREE.MeshStandardMaterial({ color: 0xb99a62, roughness: 0.8 }));
  basket.position.y = 0.035;
  g.add(bun, pleat, basket); return g;
}
export function glassMesh(f: ManĝaĵDatumo): THREE.Group {
  const g = new THREE.Group();
  const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.07, 0.3, 12),
    new THREE.MeshStandardMaterial({ color: 0xdfeee6, transparent: true, opacity: 22 / 64, roughness: 0.1, depthWrite: false }));
  glass.position.y = 0.15;
  const liq = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.058, 0.24, 12),
    new THREE.MeshStandardMaterial({ color: f.col, transparent: true, opacity: 52 / 64, roughness: 0.3 }));
  liq.position.y = 0.12;
  const sprig = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.16), new THREE.MeshStandardMaterial({ color: 0x4c7a44, side: THREE.DoubleSide }));
  sprig.position.set(0.05, 0.3, 0); sprig.rotation.z = 1.2;
  g.add(glass, liq, sprig); return g;
}

export interface ManĝaĵItemo {
  mesh: THREE.Group;
  key: string;
  f: ManĝaĵDatumo;
  pos: THREE.Vector3;
  dead: boolean;
}
export function kreiManĝaĵojn(g: THREE.Group, cx: number, cz: number): ManĝaĵItemo[] {
  const items: ManĝaĵItemo[] = [];
  const foods: { p: [number, number, number]; k: string }[] = [
    { p: [cx + 0.4, 1.05, cz - 2.6], k: "fok0" }, { p: [cx + 1.1, 1.05, cz - 2.6], k: "fok2" },
    { p: [cx + 1.9, 1.05, cz - 2.6], k: "tla2" }, { p: [cx + 3.6, 0.8, cz + 2.4], k: "fok1" }, { p: [cx + 4.2, 0.8, cz + 2.4], k: "tla0" },
  ];
  for (const f of foods) {
    const meta = FOKS.find(x => x.key === f.k) || TLAS.find(x => x.key === f.k)!;
    const m = f.k.startsWith("fok") ? bunMesh(meta) : glassMesh(meta);
    m.position.set(f.p[0], f.p[1], f.p[2]);
    g.add(m);
    items.push({ mesh: m, key: f.k, f: meta, pos: new THREE.Vector3(f.p[0], f.p[1], f.p[2]), dead: false });
  }
  return items;
}
export function aldoniVaporon(g: THREE.Group, local: THREE.Vector3): { cloud: THREE.Points; basePos: THREE.Vector3 } {
  const n = 20, pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) pos.set([(Math.random() - 0.5) * 0.5, Math.random() * 1.2, (Math.random() - 0.5) * 0.5], i * 3);
  const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xe8efe9, size: 0.09, transparent: true, opacity: 22 / 64, depthWrite: false }));
  pts.position.copy(local);
  g.add(pts);
  return { cloud: pts, basePos: local.clone() };
}

function kunfandiGeometriojn(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  if (geos.length === 0) return new THREE.BufferGeometry();
  let tv = 0, ti = 0;
  for ( const g of geos ) { tv += g.getAttribute("position").count; ti += g.index ? g.index.count : g.getAttribute("position").count; }
  const pozicio = new Float32Array(tv * 3), normo = new Float32Array(tv * 3);
  const idxArr = tv > 65535 ? new Uint32Array(ti) : new Uint16Array(ti);
  let vo = 0, io = 0;
  for ( const g of geos ) {
    const p = g.getAttribute("position"), n = g.getAttribute("normal"), c = p.count;
    pozicio.set(p.array as Float32Array, vo * 3);
    if (n) normo.set(n.array as Float32Array, vo * 3);
    const indico = g.index;
    if ( indico ) { for (let i = 0; i < indico.array.length; i++) idxArr[io + i] = indico.array[i] + vo; io += indico.array.length; }
    else { for (let i = 0; i < c; i++) idxArr[io + i] = i + vo; io += c; }
    vo += c;
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(pozicio, 3));
  out.setAttribute("normal", new THREE.BufferAttribute(normo, 3));
  out.setIndex(new THREE.BufferAttribute(idxArr, 1));
  return out;
}
