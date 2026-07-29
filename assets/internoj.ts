// Interna modulo — pluretagxaj internaj spacoj por piediri tra ili
// Cxiu konstruajxa tier estas aparta planko kun muroj, sxtuparo, fenestroj, mebloj.
// La grupo estas aldonita rekte al la cxefa sceno por ke la ludanto povu marŝi interne.
import * as THREE from "three";
import { KonstruSpec, TIPARO } from "./zigurato-konstruilo.js";
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
}

// kreiInternanSistemon — Kreu internan sistemon (sen propra sceno — ni uzas la cxefan).
export function kreiInternanSistemon(): InternaSistemo {
  return { currentGroup: null, animated: [], plankoj: [] };
}

// eniriInternon — Konstruu pluretagxan internon aldonitan al la cxefa sceno.
//     @param sys ( InternaSistemo ) - La interna sistemo.
//     @param spec ( KonstruSpec ) - Konstruajxa specifo.
//     @param dioritaMaterialo ( THREE.MeshStandardMaterial ) - Materialo por muroj.
//     @param andezitaMaterialo
//     @param oraMaterialo
//     @param eniraMaterialo
//     @param cxefaSceno ( THREE.Scene ) - La cxefa sceno por aldoni la internon.
//     @returns { InternaEnirPunkto } - Kie meti la ludanton.
export function eniriInternon(
  sys: InternaSistemo,
  spec: KonstruSpec,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  oraMaterialo: THREE.MeshStandardMaterial,
  eniraMaterialo: THREE.MeshStandardMaterial,
  cxefaSceno: THREE.Scene
): InternaEnirPunkto {
  // Malplenigu antauxan
  if (sys.currentGroup) {
    cxefaSceno.remove(sys.currentGroup);
    sys.currentGroup = null;
  }
  sys.animated = [];
  sys.plankoj = [];

  const w = Math.min(spec.w, 0o10);
  const d = Math.min(spec.d, 7);
  const tieroAlto = spec.tieroAlto;
  const niveloj = Math.min(spec.niveloj, 0o10);
  const tipo = TIPARO[spec.type] || TIPARO.domo;
  const muraKoloro = tipo.wall;
  const kadraKoloro = tipo.frame;

  const group = new THREE.Group();

  // Materialoj
  const muraMaterialo = new THREE.MeshStandardMaterial({
    color: muraKoloro, roughness: 35/64, side: THREE.DoubleSide,
  });
  const plankoMaterialo = new THREE.MeshStandardMaterial({
    color: 0x989888, roughness: 15/64,
  });
  const plafonaMaterialo = new THREE.MeshStandardMaterial({
    color: 0x182818, roughness: 45/64,
  });
  const listelaMaterialo = new THREE.MeshStandardMaterial({
    color: kadraKoloro, metalness: 5/8, roughness: 11/32,
  });
  const fenestraMaterialo = new THREE.MeshStandardMaterial({
    color: 0x0d2a26, emissive: 0x688888, emissiveIntensity: 3/16,
    roughness: 3/16, metalness: 3/16, transparent: true, opacity: 83/64,
  });
  const sxtupMaterialo = new THREE.MeshStandardMaterial({
    color: 0x686868, roughness: 45/64,
  });

  // Konstruu cxiun etaĝon
  for (let et = 0; et < niveloj; et++) {
    const y = et * tieroAlto;
    // Cxiu sekva etaĝo iomete pli malgranda (zigurata efiko)
    const redukto = et * 1.2;
    const hw = Math.max(1.5, w / 2 - redukto);
    const hd = Math.max(1.5, d / 2 - redukto);

    sys.plankoj.push({ y, hw, hd, alto: tieroAlto });

    // ⟪ Planko 📃 ⟫
    const planko = new THREE.Mesh(new THREE.PlaneGeometry(hw * 2, hd * 2)
      .rotateX(-Math.PI / 2), plankoMaterialo);
    planko.position.set(0, y + 1/32, 0);
    group.add(planko);

    // ⟪ Muroj (4 flankoj kun aperturoj) 📃 ⟫
    const muroDikeco = 3/16;

    // Antauxa muro ( +Z ) — kun pordo aperturo sur teretaĝo
    if (et === 0) {
      // Maldekstra parto
      konstruiMuron(group, -hw, 0, hw - 1, y, tieroAlto, muroDikeco, muraMaterialo, 0, hd);
      // Dekstra parto
      konstruiMuron(group, 1, 0, hw, y, tieroAlto, muroDikeco, muraMaterialo, 0, hd);
      // Supra parto super pordo
      konstruiMuron(group, -1, tieroAlto * 35/64, 2, y, tieroAlto * 29/64, muroDikeco / 2, muraMaterialo, 0, hd);
    } else {
      konstruiMuron(group, -hw, 0, hw * 2, y, tieroAlto, muroDikeco, muraMaterialo, 0, hd);
    }

    // Malantauxa muro ( -Z )
    konstruiMuron(group, -hw, 0, hw * 2, y, tieroAlto, muroDikeco, muraMaterialo, 0, -hd);

    // Dekstra muro ( +X )
    konstruiMuron(group, -hd, 0, hd * 2, y, tieroAlto, muroDikeco, muraMaterialo, hw, 0);

    // Maldekstra muro ( -X ) — kun fenestroj
    if (hw > 2.5) {
      konstruiMuron(group, -hd, tieroAlto * 13/32, hd * 2, y, tieroAlto * 19/32, muroDikeco, muraMaterialo, -hw, 0);
      // Fenestroj sube
      for (let f = -1; f <= 1; f += 2) {
        const fx = f * 0.8;
        const fen = new THREE.Mesh(new THREE.PlaneGeometry(4/8, 7/16), fenestraMaterialo);
        fen.position.set(-hw + 1/32, y + tieroAlto * 4/8, fx);
        group.add(fen);
        const fenKadro = new THREE.Mesh(new THREE.BoxGeometry(3/16, 7/16 + 3/16, 1/16), listelaMaterialo);
        fenKadro.position.set(-hw + muroDikeco / 2, y + tieroAlto * 4/8, fx);
        group.add(fenKadro);
      }
      // Muro sub fenestroj
      konstruiMuron(group, -1.2, 0, 2.4, y, tieroAlto * 13/32, muroDikeco, muraMaterialo, -hw, 0);
    } else {
      konstruiMuron(group, -hd, 0, hd * 2, y, tieroAlto, muroDikeco, muraMaterialo, -hw, 0);
    }

    // ⟪ Plafono (nur se ne lasta etaĝo) 📃 ⟫
    if (et < niveloj - 1) {
      const plafono = new THREE.Mesh(new THREE.PlaneGeometry(hw * 2, hd * 2)
        .rotateX(Math.PI / 2), plafonaMaterialo);
      plafono.position.set(0, y + tieroAlto - 1/32, 0);
      group.add(plafono);
    }

    // ⟪ Oraj angulaj kolonetoj 📃 ⟫
    for (const sX of [-1, 1]) for (const sZ of [-1, 1]) {
      const kol = new THREE.Mesh(new THREE.BoxGeometry(5/32, tieroAlto, 5/32), listelaMaterialo);
      kol.position.set(sX * (hw - 3/16), y + tieroAlto / 2, sZ * (hd - 3/16));
      group.add(kol);
    }

    // ⟪ Murlampetoj 📃 ⟫
    const lampNombro = Math.max(1, Math.floor(hw) - 1);
    for (let i = 0; i < lampNombro; i++) {
      const lx = -hw + (i + 1) * hw * 2 / (lampNombro + 1);
      const lampo = new THREE.Mesh(new THREE.BoxGeometry(4/32, 5/32, 4/32), listelaMaterialo);
      lampo.position.set(lx, y + tieroAlto * 45/64, hd - 1/16);
      group.add(lampo);
      const lumo = new THREE.PointLight(0xf8d898, 3/16, 4, 2);
      lumo.position.set(lx, y + tieroAlto * 45/64, hd - 4/8);
      group.add(lumo);
    }

    // ⟪ Skripta plakedo sur antauxa muro 📃 ⟫
    if (et === 0 && spec.name) {
      const plakedInk = "#" + kadraKoloro.toString(16).padStart(6, "0");
      const plakedo = generiSkriptanTeksajxon({
        seedName: spec.name, w: 0o140, h: 0o200, ink: plakedInk, bg: "#082018",
      });
      const surfaco = new THREE.Mesh(
        new THREE.PlaneGeometry(10/8, 12/8),
        new THREE.MeshStandardMaterial({ map: plakedo, transparent: true, roughness: 19/64, metalness: 45/64 })
      );
      surfaco.position.set(0, y + tieroAlto * 28/64, hd - 3/32);
      group.add(surfaco);
      const pkadro = new THREE.Mesh(new THREE.BoxGeometry(12/8, 14/8, 3/16), listelaMaterialo);
      pkadro.position.set(0, y + tieroAlto * 28/64, hd - 1/16);
      group.add(pkadro);
    }

    // ⟪ Sxtuparo al sekva etaĝo (malantauxe, en -Z direkto) 📃 ⟫
    if (et < niveloj - 1) {
      const sxtupNombro = Math.max(4, Math.floor(tieroAlto / 3));
      const sxtupAlto = tieroAlto / sxtupNombro;
      const sxtupProf = 1.2 / sxtupNombro;
      for (let s = 0; s < sxtupNombro; s++) {
        const step = new THREE.Mesh(
          new THREE.BoxGeometry(Math.min(hw * 2 * 23/64, 4), sxtupAlto * 0.9, sxtupProf),
          sxtupMaterialo
        );
        step.position.set(0, y + (s + 0.5) * sxtupAlto * 0.9, -hd + (s + 0.5) * sxtupProf + 0.3);
        group.add(step);
      }
      // Flankaj muroj de sxtuparo
      for (const sX of [-1, 1]) {
        const sxtupMuro = new THREE.Mesh(
          new THREE.BoxGeometry(1/16, tieroAlto, 1.5),
          muraMaterialo
        );
        sxtupMuro.position.set(sX * Math.min(hw * 23/64, 2), y + tieroAlto / 2, -hd + 1.0);
        group.add(sxtupMuro);
      }
    }

    // ⟪ Plafonaj traboj 📃 ⟫
    if (spec.type !== "stacio" && hw > 1.5) {
      const trabaMaterialo = new THREE.MeshStandardMaterial({ color: 0x302818, roughness: 51/64 });
      for (let i = 0; i < 2; i++) {
        const tx = (i - 0.5) * hw * 0.8;
        const trabo = new THREE.Mesh(new THREE.BoxGeometry(4/32, 4/32, hd * 2 - 0.5), trabaMaterialo);
        trabo.position.set(tx, y + tieroAlto - 2/32, 0);
        group.add(trabo);
      }
    }

    // ⟪ Mebloj nur sur teretaĝo 📃 ⟫
    if (et === 0) {
      const mebloG = new THREE.Group();
      if (spec.type === "domo") aldoniDomajnMeblojn(mebloG, hw, hd, tieroAlto, listelaMaterialo);
      else if (spec.type === "manĝejo") aldoniManĝajnMeblojn(mebloG, hw, hd, tieroAlto, listelaMaterialo, sys.animated);
      else if (spec.type === "stacio") aldoniStaciajnMeblojn(mebloG, hw, hd, tieroAlto, listelaMaterialo);
      else if (spec.type === "turo") aldoniTurajnMeblojn(mebloG, hw, hd, tieroAlto, listelaMaterialo);
      else if (spec.type === "sanktejo") aldoniSanktejajnMeblojn(mebloG, hw, hd, tieroAlto, listelaMaterialo, eniraMaterialo, sys.animated);
      mebloG.position.y = y;
      group.add(mebloG);
    }

    // ⟪ Planko randaj oraj strioj 📃 ⟫
    for (const sX of [-1, 1]) {
      const strio = new THREE.Mesh(new THREE.BoxGeometry(hw * 2 - 0.4, 2/64, 2/16), listelaMaterialo);
      strio.position.set(0, y + 2/64, sX * (hd - 0.2));
      group.add(strio);
    }
    for (const sZ of [-1, 1]) {
      const strio = new THREE.Mesh(new THREE.BoxGeometry(2/16, 2/64, hd * 2 - 0.4), listelaMaterialo);
      strio.position.set(sZ * (hw - 0.2), y + 2/64, 0);
      group.add(strio);
    }
  }

  // Aldonu lumojn al la interno
  const varmaKoloro = spec.type === "sanktejo" ? 0xf8d898 : 0xf8e8d8;
  const cxefaLumo = new THREE.DirectionalLight(varmaKoloro, 0.4);
  cxefaLumo.position.set(0, niveloj * tieroAlto * 0.8, 0);
  group.add(cxefaLumo);
  
  const ambiento = new THREE.HemisphereLight(0xc8e0e8, 0x202828, 0.3);
  group.add(ambiento);

  // Aldonu al cxefa sceno
  group.position.set(spec.x, spec.h0 || 0, spec.z);
  group.rotation.y = spec.rot || 0;
  cxefaSceno.add(group);
  sys.currentGroup = group;

  // Enirpunkto: antaux la pordo (uzu la teretaĝan hd)
  const lastaHd = d / 2; // hd sen redukto (teretaĝo)
  const enirX = 0;
  const enirZ = lastaHd + 2;
  const enirY = 0.5;
  const enirDirekto = 0;

  return { x: enirX, z: enirZ, y: enirY, direkto: enirDirekto };
}

// eliriInternon — Forigu la internan grupon el la cxefa sceno.
export function eliriInternon(sys: InternaSistemo, cxefaSceno: THREE.Scene): void {
  if (sys.currentGroup) {
    cxefaSceno.remove(sys.currentGroup);
    sys.currentGroup = null;
  }
  sys.animated = [];
  sys.plankoj = [];
}

// gxisdatigiInternon — Gxisdatigu internajn animaciojn.
export function gxisdatigiInternon(sys: InternaSistemo, t: number): void {
  for (const a of sys.animated) a.update(t);
}

// Helfunkcio: konstrui muron el skatolo
function konstruiMuron(
  g: THREE.Group,
  lokalX: number, lokalY: number, largho: number,
  bazaY: number, alto: number, dikeco: number,
  materialo: THREE.MeshStandardMaterial,
  cx: number, cz: number
): void {
  if (largho <= 0 || alto <= 0) return;
  const muro = new THREE.Mesh(new THREE.BoxGeometry(largho, alto, dikeco), materialo);
  muro.position.set(cx + lokalX + largho / 2, bazaY + lokalY + alto / 2, cz);
  g.add(muro);
}

// ——————————————————————————————————————————————————————————————————————
// ⟪ Meblo-funkcioj 📃 ⟫
// ——————————————————————————————————————————————————————————————————————

function aldoniDomajnMeblojn(
  g: THREE.Group, hw: number, hd: number, h: number,
  listelaMaterialo: THREE.MeshStandardMaterial,
): void {
  const ligno = new THREE.MeshStandardMaterial({ color: 0x385840, roughness: 45/64 });
  const teksajxo = new THREE.MeshStandardMaterial({ color: 0x486848, roughness: 27/32 });
  const oro = new THREE.MeshStandardMaterial({ color: 0xd8b068, roughness: 19/64, metalness: 45/64 });

  // Lito
  const lito = new THREE.Mesh(new THREE.BoxGeometry(141/64, 13/32, 45/32), ligno);
  lito.position.set(-hw + 115/64, 13/64, -hd + 77/64);
  g.add(lito);
  const matraco = new THREE.Mesh(new THREE.BoxGeometry(16/8, 3/16, 77/64), teksajxo);
  matraco.position.set(-hw + 115/64, 31/64, -hd + 77/64);
  g.add(matraco);

  // Rako
  const rako = new THREE.Mesh(new THREE.BoxGeometry(19/64, 115/64, 16/8), ligno);
  rako.position.set(hw - 4/8, 29/32, 0);
  g.add(rako);

  // Tapiso
  const tapiso = new THREE.Mesh(new THREE.BoxGeometry(6, 1/16, 51/64),
    new THREE.MeshStandardMaterial({ color: 0x583838, roughness: 7/8 }));
  tapiso.position.set(0, 1/32, -hd + 51/64);
  g.add(tapiso);
}

function aldoniManĝajnMeblojn(
  g: THREE.Group, hw: number, hd: number, h: number,
  listelaMaterialo: THREE.MeshStandardMaterial,
  animated: { update: (t: number) => void }[],
): void {
  const tablo = new THREE.MeshStandardMaterial({ color: 0xd8c898, roughness: 33/64 });
  const skabelo = new THREE.MeshStandardMaterial({ color: 0x483828, roughness: 19/32 });

  // Ronda kotatsu-tablo surplanke (sen kruroj)
  const tbl = new THREE.Mesh(new THREE.CylinderGeometry(27/32, 29/32, 3/32, 0o20), tablo);
  tbl.position.set(0, 3/64, 0);
  g.add(tbl);
  // Varma brilo sub la tablo (kotatsu-hejtilo)
  const varmLumo = new THREE.PointLight(0xf88840, 6/32, 4, 2);
  varmLumo.position.set(0, 1/32, 0);
  g.add(varmLumo);
  const varmGlo = new THREE.Mesh(
    new THREE.SphereGeometry(3/16, 8, 6),
    new THREE.MeshBasicMaterial({ color: 0xf88840, transparent: true, opacity: 5/32 })
  );
  varmGlo.position.set(0, 1/32, 0);
  g.add(varmGlo);
  // Rondaj seĝoj cxirkaux la tablo
  for ( let i = 0; i < 6; i++ ) {
    const ang = (i / 6) * Math.PI * 2;
    const r = 20/8;
    const sk = new THREE.Mesh(new THREE.CylinderGeometry(21/64, 27/64, 4/8, 0o12), skabelo);
    sk.position.set(Math.cos(ang) * r, 15/64, Math.sin(ang) * r);
    g.add(sk);
  }

  // Fajrujo
  const faj = new THREE.Mesh(new THREE.BoxGeometry(24/8, 64/8, 3/8),
    new THREE.MeshStandardMaterial({ color: 0x382818, roughness: 51/64 }));
  faj.position.set(0, 19/32, -hd + 19/32);
  g.add(faj);
  const fajraLumo = new THREE.PointLight(0xf88830, 19/32, 0o10, 2);
  fajraLumo.position.set(0, 45/32, -hd + 19/32);
  g.add(fajraLumo);
  const fajraGlo = new THREE.Mesh(
    new THREE.SphereGeometry(3/8, 8, 6),
    new THREE.MeshBasicMaterial({ color: 0xf88840, transparent: true, opacity: 11/32 })
  );
  fajraGlo.position.set(0, 41/32, -hd + 19/32);
  g.add(fajraGlo);
  animated.push({
    update: (t: number) => {
      fajraLumo.intensity = 4/8 + 5/32 * Math.sin(t * 6) + 3/32 * Math.sin(t * 11);
      fajraGlo.scale.setScalar(1 + 1/8 * Math.sin(t * 4));
      fajraGlo.material.opacity = 11/32 + 3/32 * Math.sin(t * 5);
    }
  });
}

function aldoniStaciajnMeblojn(
  g: THREE.Group, hw: number, hd: number, h: number,
  listelaMaterialo: THREE.MeshStandardMaterial,
): void {
  const benka = new THREE.MeshStandardMaterial({ color: 0xb8b8b8, roughness: 11/32 });
  const benko = new THREE.Mesh(new THREE.BoxGeometry(hw * 2 * 45/64, 29/64, 51/64), benka);
  benko.position.set(0, 7/32, -hd + 51/64);
  g.add(benko);
  const tablo = new THREE.Mesh(new THREE.BoxGeometry(16/8, 29/32, 8/8), benka);
  tablo.position.set(hw - 12/8, 29/64, 0);
  g.add(tablo);
  const lampo = new THREE.PointLight(0xf8e8d8, 29/64, 0o12, 2);
  lampo.position.set(0, h * 45/64, 0);
  g.add(lampo);
}

function aldoniTurajnMeblojn(
  g: THREE.Group, hw: number, hd: number, h: number,
  listelaMaterialo: THREE.MeshStandardMaterial,
): void {
  const skrib = new THREE.MeshStandardMaterial({ color: 0x385840, roughness: 19/32 });
  const tablo = new THREE.Mesh(new THREE.BoxGeometry(77/32, 5/64, 77/64), skrib);
  tablo.position.set(0, 29/32, 0);
  g.add(tablo);
  for (let i = -1; i <= 1; i += 2) for (let j = -1; j <= 1; j += 2) {
    const kr = new THREE.Mesh(new THREE.BoxGeometry(3/32, 29/32, 3/32), skrib);
    kr.position.set(i * 10/8, 29/64, j * 10/8);
    g.add(kr);
  }
  // Bretoj
  const breta = new THREE.MeshStandardMaterial({ color: 0x486848, roughness: 45/64 });
  for (let i = 0; i < 3; i++) {
    const br = new THREE.Mesh(new THREE.BoxGeometry(hw * 2 * 4/8, 3/32, 4/8), breta);
    br.position.set(-hw + hw * 2 * 11/32, 115/64 + i * 77/64, -hd + 11/32);
    g.add(br);
  }
  const lampo = new THREE.PointLight(0xf8e8d8, 4/8, 0o14, 2);
  lampo.position.set(0, h * 6/8, 0);
  g.add(lampo);
}

function aldoniSanktejajnMeblojn(
  g: THREE.Group, hw: number, hd: number, h: number,
  listelaMaterialo: THREE.MeshStandardMaterial,
  eniraMaterialo: THREE.MeshStandardMaterial,
  animated: { update: (t: number) => void }[],
): void {
  const altaro = new THREE.Mesh(new THREE.BoxGeometry(16/8, 8/8, 16/8),
    new THREE.MeshStandardMaterial({ color: 0x183828, roughness: 19/64, metalness: 5/32 }));
  altaro.position.set(0, 4/8, 0);
  g.add(altaro);

  const oraBrilo = new THREE.MeshStandardMaterial({
    color: 0xe0c078, metalness: 7/8, roughness: 11/32,
    emissive: 0x302808, emissiveIntensity: 11/32,
  });
  const ornamo = new THREE.Mesh(new THREE.BoxGeometry(16/8 + 3/16, 3/32, 16/8 + 3/16), oraBrilo);
  ornamo.position.set(0, 51/64, 0);
  g.add(ornamo);

  const altaraLumo = new THREE.PointLight(0xe0b068, 4/8, 0o12, 2);
  altaraLumo.position.set(0, 83/64, 0);
  g.add(altaraLumo);
  const lumGlo = new THREE.Mesh(
    new THREE.SphereGeometry(5/16, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xe0b068, transparent: true, opacity: 7/32 })
  );
  lumGlo.position.set(0, 83/64, 0);
  g.add(lumGlo);
  animated.push({
    update: (t: number) => {
      altaraLumo.intensity = 13/32 + 5/32 * Math.sin(t * 2) + 2/32 * Math.sin(t * 3.7);
      lumGlo.material.opacity = 7/32 + 3/32 * Math.sin(t * 2);
      lumGlo.scale.setScalar(1 + 1/8 * Math.sin(t * 2));
    }
  });
}
