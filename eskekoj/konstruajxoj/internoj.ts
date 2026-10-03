// ≺⧼ ខាងក្នុង 🚪 ⧽≻

import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import type { KonstruSpec } from "./satalaj/tipoj.js";
import { TIPARO } from "./satalaj/tipoj.js";
import { kreiKadranKurbon } from "./satalaj/enirejo.js";
import { generiSkribanTeksajxon } from "../komunajxoj/skripto-rivelilo.js";
import { kreiFenestranMaterialon } from "../komunajxoj/materialoj.js";
import { deksesuma, malheligi } from "../komunajxoj/koloroj.js";
import { nomoAih } from "../../kantaoj/lingvo/tradukoj.js";
import { kreiMangxajxojn } from "../mebloj/mangxajxoj/metado.js";
import { aldoniVaporon } from "../mebloj/mangxajxoj/vaporo.js";
import { aldoniManĝtablon, LIGNA_KOLORO } from "../mebloj/tabloj.js";
import { generiPlankanTeksajxon } from "../komunajxoj/teksajxoj/planko.js";
import { kreiRinganPlankon, kreiTrapezanPordTruon, GOLD, GOLD_SOFT, GOLD_WARM } from "./internoj/formoj.js";
import { aldoniInternanMeblaron, aldoniVendotablon } from "./internoj/mebloj.js";
import { aldoniLonganFenestron } from "./internoj/muroj.js";
import { kasxiNunan, restarigiInternon } from "./internoj/sistemo.js";
import { aplikiLitajnKolorojn, eniriSxipanInternon } from "./internoj/sxipo.js";
import { heliksaAltecxo, sxlosiloDeSpeco, type HeliksoInfo, type InternaEnirPunkto, type InternaSistemo } from "./internoj/tipoj.js";

export function eniriInternon(
  sys: InternaSistemo,
  spec: KonstruSpec,
  cxefaSceno: THREE.Scene,
  pordaAngulo = 0,
  tolaKoloro: number,
  kusenaKoloro: number
): InternaEnirPunkto {
  kasxiNunan(sys, cxefaSceno);

  const sxlosilo = sxlosiloDeSpeco(spec);
  const restarigita = restarigiInternon(sys, spec, cxefaSceno, pordaAngulo);
  if ( restarigita ) {
    aplikiLitajnKolorojn(sys.currentGroup!, tolaKoloro, kusenaKoloro);
    return restarigita;
  }
  sys.nunaSxlosilo = sxlosilo;
  sys.animated = [];
  sys.plankoj = [];
  sys.helikso = null;
  sys.litkoj = [];

  if ( spec.type === "stacioxipo" ) {
    sys.manĝaĵoj = [];
    sys.vaporNuboj = [];
    sys.litkoj = [];
    return eniriSxipanInternon(sys, spec, cxefaSceno);
  }

  const w = Math.min(spec.w, 0o10);
  const d = Math.min(spec.d, 0o10);
  const tieroAlto = spec.tieroAlto;
  const niveloj = spec.niveloj;
  const sube = spec.sube || 0;
  const tieroAltoSub = spec.tieroAltoSub || tieroAlto;
  const helikso: HeliksoInfo | null = niveloj > 1 ? {
    rKol: 0o3/0o10, rEkster: 1, perTurno: 0o14, turnoAlto: tieroAlto, turnoAltoSub: tieroAltoSub,
    turnoj: niveloj - 1, turnojSube: sube,
  } : null;
  sys.helikso = helikso;
  const sxaktaR = helikso ? helikso.rEkster : 0;

  const muraTipo = TIPARO[spec.type] || TIPARO.domo;

  const muraMaterialo = new THREE.MeshStandardMaterial({
    color: muraTipo.wall, roughness: 0o43/0o100, side: THREE.DoubleSide,
  });
  const plankSemo = ( ( spec.x * 0x9E3779B1 ) ^ ( spec.z * 0x85EBCA77 ) ^
    spec.name.split("").reduce(( h, ch ) => ( h * 31 + ch.charCodeAt(0) ) | 0, 0) ) >>> 0;
  const plankoMaterialo = new THREE.MeshStandardMaterial({
    color: 0xffffff, map: generiPlankanTeksajxon(muraTipo.wall, muraTipo.frame, plankSemo), roughness: 0o55/0o100,
  });
  const plafonaMaterialo = new THREE.MeshStandardMaterial({
    color: 0x081008, roughness: 0o67/0o100,
  });
  const kadraMaterialo = new THREE.MeshStandardMaterial({ color: muraTipo.frame, metalness: 0o7/0o10, roughness: 0o13/0o40 });
  const fenestraMaterialo = kreiFenestranMaterialon();
  const sxtupMaterialo = new THREE.MeshStandardMaterial({
    color: parseInt(malheligi(deksesuma(muraTipo.wall), 0o6/0o10).slice(1), 16), roughness: 0o67/0o100,
  });
  const oraBazaMaterialo = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0o3/0o10 });

  const group = new THREE.Group();
  const lignaMaterialo = new THREE.MeshStandardMaterial({ color: LIGNA_KOLORO, roughness: 0o7/0o10 });
  const metalaMaterialo = new THREE.MeshStandardMaterial({ color: muraTipo.frame, metalness: 0o5/0o10, roughness: 0o5/0o10 });

  const etaĝoj: { y: number; hw: number; hd: number; alto: number; et: number }[] = [];
  for ( let j = sube; j >= 1; j-- ) {
    const redukto = j * 6/5;
    etaĝoj.push({ y: -j * tieroAltoSub, hw: Math.max(0o3/0o2, w / 2 - redukto), hd: Math.max(0o3/0o2, d / 2 - redukto), alto: tieroAltoSub, et: -j });
  }
  for ( let et = 0; et < niveloj; et++ ) {
    const redukto = et * 6/5;
    etaĝoj.push({ y: et * tieroAlto, hw: Math.max(0o3/0o2, w / 2 - redukto), hd: Math.max(0o3/0o2, d / 2 - redukto), alto: tieroAlto, et });
  }

  for ( const etaĝo of etaĝoj ) {
    const { y, hw, hd, alto, et } = etaĝo;

    const pordBazo = 0o233/0o100;
    const pordDuon = pordBazo / 2;

    sys.plankoj.push({ y, hw, hd, alto });

    const planko = new THREE.Mesh(
      helikso && ( et !== 0 || sube > 0 )
        ? kreiRinganPlankon(hw, hd, sxaktaR, -Math.PI / 2)
        : new THREE.PlaneGeometry(hw * 2, hd * 2).rotateX(-Math.PI / 2),
      plankoMaterialo
);
    planko.position.set(0, y + 0o1/0o40, 0);
    group.add(planko);

    for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
      for ( const [ dx, dz, lx, lz ] of [ [ 1, 0, 0o3/0o10, 0o1/0o20 ], [ 0, 1, 0o1/0o20, 0o3/0o10 ] ] as [ number, number, number, number ][] ) {
        const b = new THREE.Mesh(new THREE.BoxGeometry(lx, 0o1/0o40, lz), oraBazaMaterialo);
        b.position.set(sX * ( hw - 0o1/0o10 * dx ), y + 0o2/0o40, sZ * ( hd - 0o1/0o10 * dz ));
        group.add(b);
      }
    }

    if ( et < niveloj - 1 ) {
      const plafono = new THREE.Mesh(
        helikso
          ? kreiRinganPlankon(hw, hd, sxaktaR, Math.PI / 2)
          : new THREE.PlaneGeometry(hw * 2, hd * 2).rotateX(Math.PI / 2),
        plafonaMaterialo
);
      plafono.position.set(0, y + alto - 0o1/0o40, 0);
      group.add(plafono);
    }

    if ( et === 0 ) {
      const pordSupro = 0o233/0o100 * 0o45/0o100;
      const pordAlto = Math.min(0o11/0o4, alto - 0o1/0o10);
      const pordRadiBazo = 0o1/0o4;
      const pordRadiSupro = 0o1/0o4;
      const muraDikeco = 0o3/0o20;
      const pordMuro = new THREE.Group();

      const muroFormo = new THREE.Shape();
      muroFormo.moveTo(-hw, 0); muroFormo.lineTo(hw, 0);
      muroFormo.lineTo(hw, alto); muroFormo.lineTo(-hw, alto);
      muroFormo.closePath();
      muroFormo.holes.push(kreiTrapezanPordTruon(pordBazo, pordSupro, pordAlto, pordRadiBazo, pordRadiSupro));
      const muroGeo = new THREE.ExtrudeGeometry(muroFormo, { depth: muraDikeco, bevelEnabled: false, curveSegments: 0o20 });
      muroGeo.translate(0, 0, -muraDikeco / 2);
      const muro = new THREE.Mesh(muroGeo, muraMaterialo);
      muro.position.set(0, y, hd);
      pordMuro.add(muro);

      const truKonturo = kreiKadranKurbon(kreiTrapezanPordTruon(pordBazo, pordSupro, pordAlto, pordRadiBazo, pordRadiSupro), 0);
      const pordRando = new THREE.Mesh(
        new THREE.TubeGeometry(truKonturo, 0o200, 0o1/0o20, 0o14, true),
        kadraMaterialo
);
      pordRando.position.set(0, y, hd - muraDikeco / 2 - 0o5/0o100);
      pordMuro.add(pordRando);

      const sojlo = new THREE.Mesh(
        new THREE.BoxGeometry(pordBazo + 0o1/0o10, 0o2/0o40, muraDikeco),
        new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0o23/0o100, metalness: 0o55/0o100 })
);
      sojlo.position.set(0, y, hd - 0o1/0o20);
      pordMuro.add(sojlo);

      const pordoj = spec.type === "sanktejo" ? 4 : 1;
      for ( let i = 0; i < pordoj; i++ ) {
        const kopio = i === 0 ? pordMuro : pordMuro.clone();
        kopio.rotation.y = i * Math.PI / 2;
        group.add(kopio);
      }
    } else {
      // ⟨ ជញ្ជាំងមុខទទួលបង្អួច 📃 ⟩
      aldoniLonganFenestron(group, 0, hd, y, alto, hw, "antaŭ", muraMaterialo, fenestraMaterialo, kadraMaterialo);
    }

    const kvarPordoj = et === 0 && spec.type === "sanktejo";
    if ( !kvarPordoj ) aldoniLonganFenestron(group, 0, -hd, y, alto, hw, "malantaŭ", muraMaterialo, fenestraMaterialo, kadraMaterialo);

    if ( !kvarPordoj ) aldoniLonganFenestron(group, -hw, 0, y, alto, hd, "maldekstra", muraMaterialo, fenestraMaterialo, kadraMaterialo);

    if ( !kvarPordoj ) aldoniLonganFenestron(group, hw, 0, y, alto, hd, "dekstra", muraMaterialo, fenestraMaterialo, kadraMaterialo);

    const kolDikeco = 0o7/0o40;
    const kolAlto = alto;
    for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
      const kol = new THREE.Mesh(
        new RoundedBoxGeometry(kolDikeco, kolAlto, kolDikeco, 3, 0o3/0o200),
        kadraMaterialo
);
      kol.position.set(sX * ( hw - kolDikeco / 2 ), y + kolAlto / 2, sZ * ( hd - kolDikeco / 2 ));
      group.add(kol);

      const flara = new THREE.Mesh(
        new RoundedBoxGeometry(kolDikeco * 0o15/0o10, kolAlto * 0o1/0o40, kolDikeco * 0o15/0o10, 3, 0o3/0o200),
        kadraMaterialo
);
      flara.position.set(sX * ( hw - ( kolDikeco * 0o15/0o10 ) / 2 ), y + kolAlto - kolAlto * 0o1/0o40, sZ * ( hd - ( kolDikeco * 0o15/0o10 ) / 2 ));
      group.add(flara);

      const bazo = new THREE.Mesh(
        new RoundedBoxGeometry(kolDikeco * 0o5/0o4, kolAlto * 0o1/0o40, kolDikeco * 0o5/0o4, 3, 0o3/0o200),
        new THREE.MeshStandardMaterial({ color: GOLD_SOFT, metalness: 0o5/0o10, roughness: 0o13/0o40 })
);
      bazo.position.set(sX * ( hw - ( kolDikeco * 0o5/0o4 ) / 2 ), y + kolAlto * 0o1/0o100, sZ * ( hd - ( kolDikeco * 0o5/0o4 ) / 2 ));
      group.add(bazo);
    }

    const lampNombro = Math.max(1, Math.floor(hw) - 1);
    // ⟨ គ្មានចង្កៀងក្នុងការបើកទ្វារ 📃 ⟩
    const lampLargho = 0o3/0o40;
    for ( let i = 0; i < lampNombro; i++ ) {
      const lx = -hw + ( i + 1 ) * hw * 2 / ( lampNombro + 1 );
      // ⟨ បើចង្កៀងធ្លាក់ចូលការបើកទ្វារ 📃 ⟩
      const enPordaMalfermo = et === 0 && Math.abs(lx) - lampLargho < pordDuon;
      const flankSigno = Math.sign(lx) || 1;
      const lampY = y + alto * 0o5/0o10;
      // ⟨ គ្មានប្រអប់គៀប 📃 ⟩
      // ⟨ ដៃជញ្ជាំង 📃 ⟩
      const brako = new THREE.Mesh(
        new THREE.CylinderGeometry(0o1/0o100, 0o1/0o100, 0o3/0o10, 6).rotateX(Math.PI / 2),
        kadraMaterialo
);
      brako.position.set(enPordaMalfermo ? flankSigno * ( hw - 0o3/0o20 ) : lx,
        lampY + 0o3/0o40, enPordaMalfermo ? 0 : hd - 0o3/0o20);
      brako.rotation.y = enPordaMalfermo ? Math.PI / 2 : 0;
      group.add(brako);
      const lampX = enPordaMalfermo ? flankSigno * ( hw - 0o3/0o10 ) : lx;
      const lampZ = enPordaMalfermo ? 0 : hd - 0o3/0o10;
      const lumo = new THREE.PointLight(GOLD_WARM, 0o2/0o10, 5, 2);
      lumo.position.set(lampX, lampY, lampZ);
      group.add(lumo);
      const glo = new THREE.Mesh(
        new THREE.SphereGeometry(0o3/0o40, 0o10, 0o10),
        new THREE.MeshBasicMaterial({ color: GOLD_WARM, transparent: true, opacity: 0o3/0o20 })
);
      glo.position.set(lampX, lampY, lampZ);
      group.add(glo);
    }

    if ( et === 0 && spec.name ) {
      const plakedInk = deksesuma(GOLD);
      const plakedNomo = nomoAih(spec.name, spec.type);
      const plakedo = generiSkribanTeksajxon(plakedNomo, {
        w: 0o136, h: 0o300, ink: plakedInk,
      });
      const surfaco = new THREE.Mesh(
        new THREE.PlaneGeometry(4/5, 0o15/0o10),
        new THREE.MeshStandardMaterial({ map: plakedo, transparent: true, roughness: 0o23/0o100, metalness: 0o55/0o100 })
);
      const pkX = pordDuon + ( hw - pordDuon ) / 2;
      surfaco.position.set(pkX, y + alto * 0o3/0o10, hd - 0o1/0o20);
      group.add(surfaco);
      const pkadro = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 0o16/0o10, 0o1/0o40)),
        new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0o4/0o10 })
);
      pkadro.position.set(pkX, y + alto * 0o3/0o10, hd - 0o1/0o40);
      group.add(pkadro);
    }

    aldoniInternanMeblaron(group, spec.type, hw, hd, y, alto, et, niveloj,
      lignaMaterialo, metalaMaterialo, kadraMaterialo,
      tolaKoloro, kusenaKoloro, sys.litkoj);

    if ( spec.type !== "kasafeo" && hw > 0o3/0o2 ) {
      const trabaMaterialo = new THREE.MeshStandardMaterial({ color: parseInt(malheligi(deksesuma(muraTipo.wall), 0o3/0o10).slice(1), 16), roughness: 0o67/0o100 });
      for ( let i = 0; i < 2; i++ ) {
        const tx = ( i - 0o4/0o10 ) * hw * 0o7/0o10;
        const trabo = new THREE.Mesh(
          new THREE.BoxGeometry(0o5/0o40, 0o5/0o40, hd * 2 - 0o3/0o10),
          trabaMaterialo
);
        trabo.position.set(tx, y + alto - 0o2/0o40, 0);
        group.add(trabo);
      }
    }
  }

  if ( helikso ) {
    const rMezo = ( helikso.rKol + helikso.rEkster ) / 2;
    const radiala = helikso.rEkster - helikso.rKol;
    const paŝoAngulo = Math.PI * 2 / helikso.perTurno;
    const paŝoAltoSupre = helikso.turnoAlto / helikso.perTurno;
    const paŝoAltoSube = helikso.turnoAltoSub / helikso.perTurno;
    const paŝoLargho = rMezo * paŝoAngulo * 0o115/0o100;
    const nSube = helikso.turnojSube * helikso.perTurno;
    const nSupre = helikso.turnoj * helikso.perTurno;
    const fundoY = heliksaAltecxo(helikso, -helikso.turnojSube);
    const suproY = heliksaAltecxo(helikso, helikso.turnoj) + 0o4/0o10;
    const akcentaMaterialo = new THREE.MeshStandardMaterial({ color: muraTipo.frame, metalness: 0o55/0o100, roughness: 0o23/0o100 });
    const kolono = new THREE.Mesh(
      new THREE.CylinderGeometry(helikso.rKol, helikso.rKol * 0o106/0o100, suproY - fundoY, 0o20),
      akcentaMaterialo
);
    kolono.position.set(0, ( fundoY + suproY ) / 2, 0);
    kolono.castShadow = true;
    group.add(kolono);
    for ( let p = -nSube; p < nSupre; p++ ) {
      const ang = p * paŝoAngulo;
      const paŝoAlto = p < 0 ? paŝoAltoSube : paŝoAltoSupre;
      const y = heliksaAltecxo(helikso, p / helikso.perTurno);
      const paso = new THREE.Mesh(
        new RoundedBoxGeometry(paŝoLargho, paŝoAlto, radiala, 3, 0o3/0o200),
        sxtupMaterialo
);
      paso.position.set(rMezo * Math.sin(ang), y + paŝoAlto / 2, rMezo * Math.cos(ang));
      paso.rotation.y = ang;
      paso.castShadow = true;
      group.add(paso);
      const nazoAlto = Math.min(0o1/0o40, paŝoAlto);
      const rimY = y + paŝoAlto - nazoAlto / 2;
      const ux = Math.sin(ang), uz = Math.cos(ang);
      const tx = Math.cos(ang), tz = -Math.sin(ang);
      const nazo = new THREE.Mesh(
        new RoundedBoxGeometry(paŝoLargho + 0o1/0o10, nazoAlto, 0o1/0o20, 3, 0o3/0o400),
        akcentaMaterialo
);
      nazo.position.set(( helikso.rEkster + 0o1/0o40 ) * ux, rimY, ( helikso.rEkster + 0o1/0o40 ) * uz);
      nazo.rotation.y = ang;
      group.add(nazo);
      for ( const s of [ -1, 1 ] ) {
        const flanko = new THREE.Mesh(
          new RoundedBoxGeometry(0o1/0o20, nazoAlto, radiala, 3, 0o3/0o400),
          akcentaMaterialo
);
        flanko.position.set(
          rMezo * ux + s * ( paŝoLargho / 2 + 0o1/0o40 ) * tx,
          rimY,
          rMezo * uz + s * ( paŝoLargho / 2 + 0o1/0o40 ) * tz
);
        flanko.rotation.y = ang;
        group.add(flanko);
      }
    }
    const relPunktoj: THREE.Vector3[] = [];
    const relSegmentoj = Math.max(0o100, ( helikso.turnoj + helikso.turnojSube ) * 0o40);
    for ( let i = 0; i <= relSegmentoj; i++ ) {
      const t = i / relSegmentoj;
      const turno = -helikso.turnojSube + t * ( helikso.turnoj + helikso.turnojSube );
      const ang = turno * Math.PI * 2;
      const y = heliksaAltecxo(helikso, turno) + 0o3/0o4;
      relPunktoj.push(new THREE.Vector3(( helikso.rEkster + 0o1/0o10 ) * Math.sin(ang), y, ( helikso.rEkster + 0o1/0o10 ) * Math.cos(ang)));
    }
    const relo = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(relPunktoj), relSegmentoj, 0o3/0o100, 0o6, false),
      kadraMaterialo
);
    group.add(relo);
  }

  const cxefaLumo = new THREE.DirectionalLight(0xf8d898, 0o3/0o10);
  cxefaLumo.position.set(0, niveloj * tieroAlto * 4/5, 0);
  group.add(cxefaLumo);
  const subLumo = new THREE.DirectionalLight(0xd8b068, 0o1/0o10);
  subLumo.position.set(0, -1, 0);
  group.add(subLumo);
  const ambiento = new THREE.HemisphereLight(0xd8b068, 0x081810, 0o2/0o10);
  group.add(ambiento);

  if ( spec.type === "mangxejo" ) {
    const mw = Math.min(spec.w, 0o10), md = Math.min(spec.d, 0o10);
    const vendProfundo = 0o12/0o10;
    const vendZ = -md / 2 + 0o2/0o10 + vendProfundo / 2;
    const vendSupro = aldoniVendotablon(group, vendZ,
      Math.min(mw * 2 - 1, 6), vendProfundo, 0, lignaMaterialo, kadraMaterialo);
    const pot = new THREE.Mesh(
      new THREE.CylinderGeometry(0o3/0o10, 0o3/0o10, 0o4/0o10, 0o16),
      metalaMaterialo
);
    pot.position.set(-0o5/0o10, vendSupro + 0o2/0o10, vendZ);
    pot.castShadow = true;
    group.add(pot);
    const steamPos = new THREE.Vector3(-0o5/0o10, vendSupro + 0o5/0o10, vendZ);
    const vapor = aldoniVaporon(group, steamPos);
    sys.vaporNuboj = [ { ...vapor, ph: 0 } ];
    const tabloX = Math.min(0o20/0o10, Math.max(0o7/0o10, mw / 2 - 0o5/0o4));
    const tabloZ = Math.min(0o22/0o10, Math.max(0o7/0o10, md / 2 - 0o5/0o4));
    const malantaŭaZ = Math.min(0o14/0o10, Math.max(0o7/0o10, md / 2 - 0o14/0o10));
    const tabloLokoj = mw >= 0o50/0o10 && md >= 0o50/0o10
      ? [ [ tabloX, tabloZ ], [ -tabloX, tabloZ ], [ tabloX, -malantaŭaZ ], [ -tabloX, -malantaŭaZ ] ]
      : [];
    const tabloj: { x: number; z: number }[] = [];
    for ( const [ tx, tz ] of tabloLokoj ) {
      aldoniManĝtablon(group, tx, tz, 0, lignaMaterialo, kadraMaterialo, tz < 0);
      tabloj.push({ x: tx, z: tz });
    }
    const items = kreiMangxajxojn(group, 0, 0, tabloj);
    sys.manĝaĵoj = items;
  }

  group.position.set(spec.x, spec.h0 || 0, spec.z);
  group.rotation.y = spec.rot || 0;
  cxefaSceno.add(group);
  sys.currentGroup = group;

  const enirR = Math.max(0o3/0o2, d / 2) - 0o4/0o10;
  const enirX = Math.sin(pordaAngulo) * enirR;
  const enirZ = Math.cos(pordaAngulo) * enirR;
  const enirY = 0o4/0o10;
  const enirDirekto = pordaAngulo;

  return { x: enirX, z: enirZ, y: enirY, direkto: enirDirekto };
}

export function eliriInternon(sys: InternaSistemo, cxefaSceno: THREE.Scene): void {
  kasxiNunan(sys, cxefaSceno);
}

export function gxisdatigiInternon(sys: InternaSistemo, t: number): void {
  for ( const a of sys.animated ) a.update(t);
  for ( const v of sys.vaporNuboj ) {
    const pos = v.cloud.geometry.attributes.position;
    if ( pos ) {
      for ( let i = 0; i < pos.count; i++ ) {
        const y = pos.getY(i) + 0o3/0o2000;
        if ( y > 7/5 ) pos.setY(i, -0o6/0o100);
        else pos.setY(i, y);
      }
      pos.needsUpdate = true;
    }
  }
}
