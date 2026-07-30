// Interna modulo — pluretagxaj internaj spacoj por piediri tra ili
// Redesigned to match Priskribo.md dark-green/gold ziggurat aesthetic.
//   • Dark pine walls (#0b1a14), warm gold frames (#d9b36a)
//   • Asymmetrical rounded corners motif (32px/16px)
//   • Thick golden corner frames that flare outward at top
//   • Long horizontal rounded windows
//   • Rounded trapezoidal door arch on ground floor
//   • Warm atmospheric gold lighting
//   • Vertical bottom-to-top script plaques
//   • Minimalist rounded-corner furniture with gold accents

import * as THREE from "three";
import { KonstruSpec, kreiManĝaĵojn, ManĝaĵItemo, aldoniVaporon } from "./zigurato-konstruilo.js";
import { generiSkriptanTeksajxon } from "./skripto-rivelilo.js";

export interface PlankoInfo {
  /** Y-nivelo de la planko */
  y: number;
  /** Duon-largho de la etaĝa spaco */
  hw: number;
  /** Duon-profundo de la etaĝa spaco */
  hd: number;
  /** Alto de la etaĝo */
  alto: number;
}

export interface InternaEnirPunkto {
  x: number;
  z: number;
  y: number;
  direkto: number;
}

export interface InternaSistemo {
  currentGroup: THREE.Group | null;
  animated: { update: (t: number) => void }[];
  plankoj: PlankoInfo[];
  manĝaĵoj: ManĝaĵItemo[];
  vaporNuboj: { cloud: THREE.Points; basePos: THREE.Vector3; ph: number }[];
}

// Design constants
const PINE = 0x0b1a14;
const DEEP = 0x08140e;
const MIST = 0xe6efe9;
const DIM = 0x9db8a4;
const GOLD = 0xd9b36a;
const GOLD_SOFT = 0xc8a45a;
const GOLD_WARM = 0xf8d898;

// Helpilo. krei Materialon por oro
function oroMaterialo(metalness = 7/8, roughness = 11/32): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: GOLD, metalness, roughness,
  });
}

// Helpilo. segmentita arkformo (por pordo kaj fenestroj)
function kreiArkFormon(radiuso: number, segmentoj: number, largho: number): THREE.BufferGeometry {
  const g = new THREE.BufferGeometry();
  const verts: number[] = [];
  const idx: number[] = [];
  for (let i = 0; i <= segmentoj; i++) {
    const ang = (i / segmentoj) * Math.PI;
    const x = Math.cos(ang) * radiuso;
    const y = Math.sin(ang) * radiuso;
    // Front face
    verts.push(x, y, largho / 2);
    // Back face
    verts.push(x, y, -largho / 2);
    if (i > 0) {
      const a = (i - 1) * 2, b = i * 2;
      idx.push(a, a + 1, b, b, a + 1, b + 1);
    }
  }
  g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

export function kreiInternanSistemon(): InternaSistemo {
  return { currentGroup: null, animated: [], plankoj: [], manĝaĵoj: [], vaporNuboj: [] };
}

export function eniriInternon(
  sys: InternaSistemo,
  spec: KonstruSpec,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  oraMaterialo: THREE.MeshStandardMaterial,
  eniraMaterialo: THREE.MeshStandardMaterial,
  cxefaSceno: THREE.Scene
): InternaEnirPunkto {
  // Clear previous interior
  if (sys.currentGroup) {
    cxefaSceno.remove(sys.currentGroup);
    sys.currentGroup = null;
  }
  sys.animated = [];
  sys.plankoj = [];

  const w = Math.min(spec.w, 0o12);
  const d = Math.min(spec.d, 0o12);
  const tieroAlto = spec.tieroAlto;
  const niveloj = Math.min(spec.niveloj, 0o10);
  const isSanktejo = spec.type === "sanktejo";

  // materials ──────────────────────────────────────────────
  const koloro = isSanktejo ? 0x0d2218 : PINE;

  const muraMaterialo = new THREE.MeshStandardMaterial({
    color: koloro, roughness: 35/64, side: THREE.DoubleSide,
  });
  const plankoMaterialo = new THREE.MeshStandardMaterial({
    color: 0x0a1812, roughness: 45/64,
  });
  const plafonaMaterialo = new THREE.MeshStandardMaterial({
    color: 0x060e0a, roughness: 55/64,
  });
  const kadraMaterialo = oroMaterialo();
  const fenestraMaterialo = new THREE.MeshStandardMaterial({
    color: 0x0a1a18, emissive: 0x688888, emissiveIntensity: 0.12,
    roughness: 3/16, metalness: 3/16,
    transparent: true, opacity: 0.7,
  }  );
  const sxtupMaterialo = new THREE.MeshStandardMaterial({
    color: 0x3a3a32, roughness: 55/64,
  });
  // Shared materials for decorations (extracted from loops)
  const oraBazaMaterialo = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.3 });
  const oraKadroMaterialo = new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.4 });
  const oraMullionoMaterialo = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.25 });
  const oraNazoMaterialo = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.3 });
  const oraTrimMaterialo = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.35 });
  const oraCxapoMaterialo = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.4 });

  const group = new THREE.Group();

  // build each tier ──────────────────────────────────────
  for (let et = 0; et < niveloj; et++) {
    const y = et * tieroAlto;
    const redukto = et * 1.2;
    const hw = Math.max(1.5, w / 2 - redukto);
    const hd = Math.max(1.5, d / 2 - redukto);

    sys.plankoj.push({ y, hw, hd, alto: tieroAlto });

    // ── Floor ──
    const planko = new THREE.Mesh(
      new THREE.PlaneGeometry(hw * 2, hd * 2).rotateX(-Math.PI / 2),
      plankoMaterialo
    );
    planko.position.set(0, y + 1/32, 0);
    group.add(planko);

    // ── Floor gold border (asymmetrical rounded-corner motif) ──
    // short gold strips at the four corners of the floor, like corner brackets
    for (const sX of [-1, 1]) for (const sZ of [-1, 1]) {
      // L-shaped corner bracket using two thin boxes
      for (const [dx, dz, lx, lz] of [[1, 0, 0.6, 0.08], [0, 1, 0.08, 0.6]] as [number, number, number, number][]) {
        const b = new THREE.Mesh(new THREE.BoxGeometry(lx, 1/32, lz), oraBazaMaterialo);
        b.position.set(sX * (hw - 0.15 * dx), y + 2/32, sZ * (hd - 0.15 * dz));
        group.add(b);
      }
    }

    // ── Ceiling (except top tier) ──
    if (et < niveloj - 1) {
      const plafono = new THREE.Mesh(
        new THREE.PlaneGeometry(hw * 2, hd * 2).rotateX(Math.PI / 2),
        plafonaMaterialo
      );
      plafono.position.set(0, y + tieroAlto - 1/32, 0);
      group.add(plafono);
    }

    // ── Front wall (+Z) — with rounded trapezoidal door on ground floor ──
    if (et === 0) {
      // Door width. 1.5 units. height. ~70% of tier height, arched top
      const pordLargho = 1.5;
      const pordAlto = tieroAlto * 0.65;
      const arkRadiuso = pordLargho / 2;
      const arkSegmentoj = 8;

      // Wall left of door
      konstruiMuron(group, -hw, 0, hw - pordLargho / 2, y, tieroAlto, 3/16, muraMaterialo, 0, hd);
      // Wall right of door
      konstruiMuron(group, pordLargho / 2, 0, hw - pordLargho / 2, y, tieroAlto, 3/16, muraMaterialo, 0, hd);
      // Wall above door (rectangular part)
      konstruiMuron(group, -pordLargho / 2, pordAlto, pordLargho, y, tieroAlto - pordAlto, 3/16, muraMaterialo, 0, hd);

      // Arched door header — a rounded trapezoid shape
      const arkGeo = kreiArkFormon(arkRadiuso, arkSegmentoj, 3/16);
      const ark = new THREE.Mesh(arkGeo, muraMaterialo);
      ark.position.set(0, y + pordAlto, hd);
      group.add(ark);

      // Gold door frame — arched trim
      const kadroGeo = new THREE.EdgesGeometry(
        new THREE.BoxGeometry(pordLargho + 0.12, pordAlto + 0.08, 0.04)
      );
      const kadroLinio = new THREE.LineSegments(
        kadroGeo,
        new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.5 })
      );
      kadroLinio.position.set(0, y + pordAlto / 2, hd + 0.02);
      group.add(kadroLinio);

      // Small gold step at door threshold
      const sojlo = new THREE.Mesh(
        new THREE.BoxGeometry(pordLargho + 0.2, 2/32, 3/16),
        new THREE.MeshStandardMaterial({ color: GOLD, roughness: 19/64, metalness: 45/64 })
      );
      sojlo.position.set(0, y, hd - 1/16);
      group.add(sojlo);
    } else {
      // Full wall on upper floors (no door)
      konstruiMuron(group, -hw, 0, hw * 2, y, tieroAlto, 3/16, muraMaterialo, 0, hd);
    }

    // ── Back wall (-Z) — with long horizontal rounded window ──
    const fenLargho = Math.min(hw * 2 - 1, 5);
    const fenAlto = tieroAlto * 0.25;
    const fenY = y + tieroAlto * 0.5 - fenAlto / 2;
    // Wall segments around window
    konstruiMuron(group, -hw, 0, (hw * 2 - fenLargho) / 2, y, tieroAlto, 3/16, muraMaterialo, 0, -hd);
    konstruiMuron(group, (hw * 2 - fenLargho) / 2 + fenLargho, 0, (hw * 2 - fenLargho) / 2, y, tieroAlto, 3/16, muraMaterialo, 0, -hd);
    konstruiMuron(group, -hw, 0, hw * 2, y, fenY - y, 3/16, muraMaterialo, 0, -hd);
    konstruiMuron(group, -hw, fenY + fenAlto - y, hw * 2, y, tieroAlto - fenY - fenAlto, 3/16, muraMaterialo, 0, -hd);

    // Long horizontal rounded window
    const fenSegmentoj = 12;
    const fenArkRadiuso = fenAlto / 2;
    // Window pane
    const fenGeo = new THREE.PlaneGeometry(fenLargho, fenAlto);
    const fen = new THREE.Mesh(fenGeo, fenestraMaterialo);
    fen.position.set(0, fenY + fenAlto / 2, -hd + 0.02);
    group.add(fen);
    // Gold window frame
    const fenKadro = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(fenLargho + 0.1, fenAlto + 0.1, 0.02)),
      oraKadroMaterialo
    );
    fenKadro.position.set(0, fenY + fenAlto / 2, -hd + 0.02);
    group.add(fenKadro);
    // Vertical mullions (thin gold lines across the window)
    for (let m = -1; m <= 1; m += 2) {
      const mul = new THREE.Mesh(
        new THREE.BoxGeometry(1/32, fenAlto - 0.1, 0.04),
        oraMullionoMaterialo
      );
      mul.position.set(m * fenLargho * 0.25, fenY + fenAlto / 2, -hd + 0.02);
      group.add(mul);
    }

    // ── Left wall (-X) — with long horizontal rounded window (rotated 90° so width runs along Z) ──
    konstruiMuron(group, -hd, 0, (hd * 2 - fenLargho) / 2, y, tieroAlto, 3/16, muraMaterialo, -hw, 0, Math.PI / 2);
    konstruiMuron(group, (hd * 2 - fenLargho) / 2 + fenLargho, 0, (hd * 2 - fenLargho) / 2, y, tieroAlto, 3/16, muraMaterialo, -hw, 0, Math.PI / 2);
    konstruiMuron(group, -hd, 0, hd * 2, y, fenY - y, 3/16, muraMaterialo, -hw, 0, Math.PI / 2);
    konstruiMuron(group, -hd, fenY + fenAlto - y, hd * 2, y, tieroAlto - fenY - fenAlto, 3/16, muraMaterialo, -hw, 0, Math.PI / 2);
    const fenL = new THREE.Mesh(new THREE.PlaneGeometry(fenAlto, fenLargho), fenestraMaterialo);
    fenL.position.set(-hw + 0.02, fenY + fenAlto / 2, 0);
    fenL.rotation.y = Math.PI / 2;
    group.add(fenL);
    const fenLk = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(0.02, fenAlto + 0.1, fenLargho + 0.1)),
      oraKadroMaterialo
    );
    fenLk.position.set(-hw + 0.02, fenY + fenAlto / 2, 0);
    group.add(fenLk);

    // ── Right wall (+X) — same long horizontal rounded window (rotated -90° so width runs along Z) ──
    konstruiMuron(group, -hd, 0, (hd * 2 - fenLargho) / 2, y, tieroAlto, 3/16, muraMaterialo, hw, 0, -Math.PI / 2);
    konstruiMuron(group, (hd * 2 - fenLargho) / 2 + fenLargho, 0, (hd * 2 - fenLargho) / 2, y, tieroAlto, 3/16, muraMaterialo, hw, 0, -Math.PI / 2);
    konstruiMuron(group, -hd, 0, hd * 2, y, fenY - y, 3/16, muraMaterialo, hw, 0, -Math.PI / 2);
    konstruiMuron(group, -hd, fenY + fenAlto - y, hd * 2, y, tieroAlto - fenY - fenAlto, 3/16, muraMaterialo, hw, 0, -Math.PI / 2);
    const fenR = new THREE.Mesh(new THREE.PlaneGeometry(fenAlto, fenLargho), fenestraMaterialo);
    fenR.position.set(hw - 0.02, fenY + fenAlto / 2, 0);
    fenR.rotation.y = -Math.PI / 2;
    group.add(fenR);
    const fenRk = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(0.02, fenAlto + 0.1, fenLargho + 0.1)),
      oraKadroMaterialo
    );
    fenRk.position.set(hw - 0.02, fenY + fenAlto / 2, 0);
    group.add(fenRk);

    // ── Golden corner columns — thick, with outward flare at top ──
    const kolDikeco = 7/32;
    const kolAlto = tieroAlto;
    for (const sX of [-1, 1]) for (const sZ of [-1, 1]) {
      // Main column body
      const kol = new THREE.Mesh(
        new THREE.BoxGeometry(kolDikeco, kolAlto, kolDikeco),
        kadraMaterialo
      );
      kol.position.set(sX * (hw - kolDikeco / 2), y + kolAlto / 2, sZ * (hd - kolDikeco / 2));
      group.add(kol);

      // Flared cap at top (slightly wider, simulates "curving outward")
      const flara = new THREE.Mesh(
        new THREE.BoxGeometry(kolDikeco * 1.6, kolAlto * 0.04, kolDikeco * 1.6),
        kadraMaterialo
      );
      flara.position.set(sX * (hw - kolDikeco / 2), y + kolAlto - kolAlto * 0.02, sZ * (hd - kolDikeco / 2));
      group.add(flara);

      // Small gold fillet at base
      const bazo = new THREE.Mesh(
        new THREE.BoxGeometry(kolDikeco * 1.3, kolAlto * 0.03, kolDikeco * 1.3),
        new THREE.MeshStandardMaterial({ color: GOLD_SOFT, metalness: 5/8, roughness: 11/32 })
      );
      bazo.position.set(sX * (hw - kolDikeco / 2), y + kolAlto * 0.015, sZ * (hd - kolDikeco / 2));
      group.add(bazo);
    }

    // ── Wall lamps with warm gold glow ──
    const lampNombro = Math.max(1, Math.floor(hw) - 1);
    for (let i = 0; i < lampNombro; i++) {
      const lx = -hw + (i + 1) * hw * 2 / (lampNombro + 1);
      // Gold bracket
      const lampBazo = new THREE.Mesh(
        new THREE.BoxGeometry(1/8, 1/8, 1/8),
        kadraMaterialo
      );
      lampBazo.position.set(lx, y + tieroAlto * 0.6, hd - 0.02);
      group.add(lampBazo);
      // Warm point light
      const lumo = new THREE.PointLight(GOLD_WARM, 0.2, 5, 2);
      lumo.position.set(lx, y + tieroAlto * 0.6, hd - 0.3);
      group.add(lumo);
      // Small glow sphere
      const glo = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 8, 6),
        new THREE.MeshBasicMaterial({ color: GOLD_WARM, transparent: true, opacity: 0.15 })
      );
      glo.position.set(lx, y + tieroAlto * 0.6, hd - 0.3);
      group.add(glo);
    }

    // ── Vertical script plaque on front wall (ground floor only) ──
    if (et === 0 && spec.name) {
      const plakedInk = "#" + GOLD.toString(16).padStart(6, "0");
      const plakedo = generiSkriptanTeksajxon({
        seedName: spec.name, w: 0o120, h: 0o300, ink: plakedInk, bg: "#" + DEEP.toString(16).padStart(6, "0"),
      });
      // Tall vertical plaque (bottom-to-top script)
      const surfaco = new THREE.Mesh(
        new THREE.PlaneGeometry(0.8, 1.6),
        new THREE.MeshStandardMaterial({ map: plakedo, transparent: true, roughness: 19/64, metalness: 45/64 })
      );
      surfaco.position.set(0, y + tieroAlto * 0.35, hd - 0.04);
      group.add(surfaco);
      // Decorative gold frame around plaque
      const pkadro = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(1.0, 1.8, 0.02)),
        new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.5 })
      );
      pkadro.position.set(0, y + tieroAlto * 0.35, hd - 0.02);
      group.add(pkadro);
    }

    // ── Stairs to next tier (centered at z=0) ──
    if (et < niveloj - 1) {
      const sxtupNombro = Math.max(4, Math.floor(tieroAlto / 3));
      const sxtupAlto = tieroAlto / sxtupNombro;
      const sxtupProf = 0.8 / sxtupNombro;
      const sxLargho = Math.min(hw * 2 * 0.35, 3.5);
      for (let s = 0; s < sxtupNombro; s++) {
        const step = new THREE.Mesh(
          new THREE.BoxGeometry(sxLargho, sxtupAlto * 0.92, sxtupProf),
          sxtupMaterialo
        );
        step.position.set(0, y + (s + 0.5) * sxtupAlto * 0.92, -0.4 + (s + 0.5) * sxtupProf);
        group.add(step);
        // Gold stair nosing
        if (s < sxtupNombro - 1) {
          const nazo = new THREE.Mesh(
            new THREE.BoxGeometry(sxLargho - 0.1, 1/32, sxtupProf * 0.3),
            oraNazoMaterialo
          );
          nazo.position.set(0, y + (s + 1) * sxtupAlto * 0.92, -0.4 + (s + 1) * sxtupProf);
          group.add(nazo);
        }
      }
      // Stair side walls (gold-trimmed, centered)
      for (const sX of [-1, 1]) {
        const sxtupMuro = new THREE.Mesh(
          new THREE.BoxGeometry(1/16, tieroAlto, 1.3),
          muraMaterialo
        );
        sxtupMuro.position.set(sX * (sxLargho / 2 + 0.1), y + tieroAlto / 2, 0);
        group.add(sxtupMuro);
        // Gold trim on stair walls
        const trim = new THREE.Mesh(
          new THREE.BoxGeometry(1/32, tieroAlto * 0.02, 1.3),
          oraTrimMaterialo
        );
        trim.position.set(sX * (sxLargho / 2 + 0.17), y + tieroAlto * 0.98, 0);
        group.add(trim);
      }
    }

    // ── Ceiling beams with gold accents ──
    if (spec.type !== "stacio" && hw > 1.5) {
      const trabaMaterialo = new THREE.MeshStandardMaterial({ color: 0x1a1810, roughness: 55/64 });
      for (let i = 0; i < 2; i++) {
        const tx = (i - 0.5) * hw * 0.7;
        const trabo = new THREE.Mesh(
          new THREE.BoxGeometry(5/32, 5/32, hd * 2 - 0.4),
          trabaMaterialo
        );
        trabo.position.set(tx, y + tieroAlto - 2/32, 0);
        group.add(trabo);
        // Gold beam cap
        const cxapo = new THREE.Mesh(
          new THREE.BoxGeometry(7/32, 3/32, 4/32),
          oraCxapoMaterialo
        );
        cxapo.position.set(tx, y + tieroAlto - 2/32 + 4/32, hd - 0.2);
        group.add(cxapo);
        cxapo.position.set(tx, y + tieroAlto - 2/32 + 4/32, -hd + 0.2);
        group.add(cxapo.clone());
      }
    }
  }

  // ── Atmospheric lighting ──
  // Main warm directional light from above
  const cxefaLumo = new THREE.DirectionalLight(0xf8d898, 0.35);
  cxefaLumo.position.set(0, niveloj * tieroAlto * 0.8, 0);
  group.add(cxefaLumo);
  // Warm fill light from below (firelight effect)
  const subLumo = new THREE.DirectionalLight(0xd9b36a, 0.08);
  subLumo.position.set(0, -1, 0);
  group.add(subLumo);
  // Ambient with warm tint
  const ambiento = new THREE.HemisphereLight(0xd9b36a, 0x08140e, 0.25);
  group.add(ambiento);

  // ── Manĝejo-specific furniture ──
  if (spec.type === "manĝejo") {
    const mw = Math.min(spec.w, 0o10), md = Math.min(spec.d, 0o10);
    const counter = new THREE.Mesh(
      new THREE.BoxGeometry(Math.min(mw * 2 - 1, 6), 1.0, 1.3),
      new THREE.MeshStandardMaterial({ color: 0x54402e, roughness: 0.7 })
    );
    counter.position.set(0.6, 0.5, -md / 2 + 0.1);
    group.add(counter);
    const pot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.42, 0.42, 0.5, 14),
      new THREE.MeshStandardMaterial({ color: 0x8a6f4a, roughness: 0.5, metalness: 0.4 })
    );
    pot.position.set(-0.6, 1.28, counter.position.z);
    group.add(pot);
    const items = kreiManĝaĵojn(group, 0, 0);
    sys.manĝaĵoj = items;
    const steamPos = new THREE.Vector3(-0.6, 1.6, counter.position.z);
    const vapor = aldoniVaporon(group, steamPos);
    sys.vaporNuboj = [{ ...vapor, ph: 0 }];
    const tabloLokoj = [
      [2.2, 1.2], [-1.6, 2.2], [2.2, -1.6], [-1.6, -1.6],
    ];
    for (const [tx, tz] of tabloLokoj) {
      const tb = new THREE.Mesh(
        new THREE.BoxGeometry(1.7, 0.4, 1.2),
        new THREE.MeshStandardMaterial({ color: 0x54402e, roughness: 0.7 })
      );
      tb.position.set(tx, 0.22, tz);
      group.add(tb);
    }
  }

  // Place the interior group
  group.position.set(spec.x, spec.h0 || 0, spec.z);
  group.rotation.y = spec.rot || 0;
  cxefaSceno.add(group);
  sys.currentGroup = group;

  // Entry point. just inside the door
  const enirX = 0;
  const enirZ = Math.max(1.5, d / 2) - 0.5;
  const enirY = 0.5;
  const enirDirekto = 0;

  return { x: enirX, z: enirZ, y: enirY, direkto: enirDirekto };
}

export function eliriInternon(sys: InternaSistemo, cxefaSceno: THREE.Scene): void {
  if (sys.currentGroup) {
    cxefaSceno.remove(sys.currentGroup);
    sys.currentGroup = null;
  }
  sys.animated = [];
  sys.plankoj = [];
  sys.manĝaĵoj = [];
  sys.vaporNuboj = [];
}

export function gxisdatigiInternon(sys: InternaSistemo, t: number): void {
  for (const a of sys.animated) a.update(t);
  for (const v of sys.vaporNuboj) {
    const pos = v.cloud.geometry.attributes.position;
    if (pos) {
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i) + 0.003;
        if (y > 1.4) pos.setY(i, -0.1);
        else pos.setY(i, y);
      }
      pos.needsUpdate = true;
    }
  }
}

// Helfunkcio. konstrui muron el skatolo
// rotacio = Y-rotacio en radianoj (uzata por flankaj muroj)
function konstruiMuron(
  g: THREE.Group,
  lokalX: number, lokalY: number, largho: number,
  bazaY: number, alto: number, dikeco: number,
  materialo: THREE.MeshStandardMaterial,
  cx: number, cz: number,
  rotacio = 0
): void {
  if (largho <= 0 || alto <= 0) return;
  const muro = new THREE.Mesh(new THREE.BoxGeometry(largho, alto, dikeco), materialo);
  if (rotacio) {
    // Por flankaj muroj. lokalX estas Z-offset, cx estas X-ebeno
    muro.position.set(cx, bazaY + lokalY + alto / 2, cz + lokalX + largho / 2);
    muro.rotation.y = rotacio;
  } else {
    muro.position.set(cx + lokalX + largho / 2, bazaY + lokalY + alto / 2, cz);
  }
  g.add(muro);
}
