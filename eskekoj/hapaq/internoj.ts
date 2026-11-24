// ≺⧼ ſɟɹ ֭ſɭɹ 🚪 ⧽≻

import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import type { VepaqSpec } from "./satalaj/hahunaq.js";
import { TIPARO } from "./satalaj/hahunaq.js";
import { kf2JoqanKkaxten } from "./satalaj/enirejo.js";
import { generiSkribanCac2sex } from "../komunajxoj/skripto-rivelilo.js";
import { kf2Cah6k6Pukek } from "../komunajxoj/materialoj.js";
import { weh2Ruva, veHuna } from "../komunajxoj/koloroj.js";
import { nomoAih } from "../../kantaoj/lingvo/tradukoj.js";
import { kf2Mangxajxojn } from "../mebloj/mangxajxoj/raqa.js";
import { aldoniVaporon } from "../mebloj/mangxajxoj/vaporo.js";
import { aldoniManĝtablon, LIGNA_KOLORO } from "../mebloj/tabloj.js";
import { k2fKekkozusai } from "../komunajxoj/cac2sex/planko.js";
import { kf2RinganPlankon, kf2TrapezanPordTruon, GOLD, GOLD_SOFT, GOLD_WARM } from "./internoj/haqoxa.js";
import { aldoniInternanMeblaron, aldoniVendotablon } from "./internoj/mebloj.js";
import { aldoniLonganFenestron } from "./internoj/muroj.js";
import { kasxiNunan, restarigiInternon } from "./internoj/sistemo.js";
import { aplikiLitajnKolorojn, eniriSxipanInternon } from "./internoj/sxipo.js";
import { heliksaAltecxo, sxlosiloDePudal, type HeliksoInfo, type InternaEnirPunkto, type InternaSistemo } from "./internoj/hahunaq.js";

export function eniriInternon(
  sys: InternaSistemo,
  spec: VepaqSpec,
  cxefaSceno: THREE.Scene,
  pordaAngulo = 0,
  tolaKoloro: number,
  kusenaKoloro: number
): InternaEnirPunkto {
  kasxiNunan(sys, cxefaSceno);

  const sxlosilo = sxlosiloDePudal(spec);
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
    sys.m7x = [];
    sys.vaporNuboj = [];
    sys.litkoj = [];
    return eniriSxipanInternon(sys, spec, cxefaSceno);
  }

  const w = Math.min(spec.w, 0o10);
  const d = Math.min(spec.d, 0o10);
  const tieroAlto = spec.tieroAlto;
  const havem2 = spec.havem2;
  const sube = spec.sube || 0;
  const tieroAltoSub = spec.tieroAltoSub || tieroAlto;
  const helikso: HeliksoInfo | null = havem2 > 1 ? {
    rKol: 0o3/0o10, rEkster: 1, perTurno: 0o14, turnoAlto: tieroAlto, turnoAltoSub: tieroAltoSub,
    turnoj: havem2 - 1, turnojSube: sube,
  } : null;
  sys.helikso = helikso;
  const sxaktaR = helikso ? helikso.rEkster : 0;

  const muraHunaq = TIPARO[spec.type] || TIPARO.domo;

  const muraMaterialo = new THREE.MeshStandardMaterial({
    color: muraHunaq.wall, roughness: 0o43/0o100, side: THREE.DoubleSide,
  });
  const plankSemo = ( ( spec.x * 0x9E3779B1 ) ^ ( spec.z * 0x85EBCA77 ) ^
    spec.name.split("").reduce(( h, ch ) => ( h * 0o37 + ch.charCodeAt(0) ) | 0, 0) ) >>> 0;
  const plankoMaterialo = new THREE.MeshStandardMaterial({
    color: 0xffffff, map: k2fKekkozusai(muraHunaq.wall, muraHunaq.frame, plankSemo), roughness: 0o55/0o100,
  });
  const plafonaMaterialo = new THREE.MeshStandardMaterial({
    color: 0x081008, roughness: 0o67/0o100,
  });
  const joqaMaterialo = new THREE.MeshStandardMaterial({ color: muraHunaq.frame, metalness: 0o7/0o10, roughness: 0o13/0o40 });
  const fenestraMaterialo = kf2Cah6k6Pukek();
  const sxtupMaterialo = new THREE.MeshStandardMaterial({
    color: parseInt(veHuna(weh2Ruva(muraHunaq.wall), 0o6/0o10).slice(1), 0o20), roughness: 0o67/0o100,
  });
  const oraBazaMaterialo = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0o3/0o10 });

  const group = new THREE.Group();
  const lignaMaterialo = new THREE.MeshStandardMaterial({ color: LIGNA_KOLORO, roughness: 0o7/0o10 });
  const metalaMaterialo = new THREE.MeshStandardMaterial({ color: muraHunaq.frame, metalness: 0o5/0o10, roughness: 0o5/0o10 });

  const etaĝoj: { y: number; hw: number; hd: number; l6da: number; et: number }[] = [];
  for ( let j = sube; j >= 1; j-- ) {
    const redukto = j * 6/5;
    etaĝoj.push({ y: -j * tieroAltoSub, hw: Math.max(0o3/0o2, w / 2 - redukto), hd: Math.max(0o3/0o2, d / 2 - redukto), l6da: tieroAltoSub, et: -j });
  }
  for ( let et = 0; et < havem2; et++ ) {
    const redukto = et * 6/5;
    etaĝoj.push({ y: et * tieroAlto, hw: Math.max(0o3/0o2, w / 2 - redukto), hd: Math.max(0o3/0o2, d / 2 - redukto), l6da: tieroAlto, et });
  }

  for ( const etaĝo of etaĝoj ) {
    const { y, hw, hd, l6da, et } = etaĝo;

    const pordBazo = 0o233/0o100;
    const pordDuon = pordBazo / 2;

    sys.plankoj.push({ y, hw, hd, l6da });

    const planko = new THREE.Mesh(
      helikso && ( et !== 0 || sube > 0 )
        ? kf2RinganPlankon(hw, hd, sxaktaR, -Math.PI / 2)
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

    if ( et < havem2 - 1 ) {
      const plafono = new THREE.Mesh(
        helikso
          ? kf2RinganPlankon(hw, hd, sxaktaR, Math.PI / 2)
          : new THREE.PlaneGeometry(hw * 2, hd * 2).rotateX(Math.PI / 2),
        plafonaMaterialo
);
      plafono.position.set(0, y + l6da - 0o1/0o40, 0);
      group.add(plafono);
    }

    if ( et === 0 ) {
      const pordSupro = 0o233/0o100 * 0o45/0o100;
      const pordAlto = Math.min(0o11/0o4, l6da - 0o1/0o10);
      const pordRadiBazo = 0o1/0o4;
      const pordRadiSupro = 0o1/0o4;
      const muraDikeco = 0o3/0o20;
      const pordMuro = new THREE.Group();

      const muroQoxa = new THREE.Shape();
      muroQoxa.moveTo(-hw, 0); muroQoxa.lineTo(hw, 0);
      muroQoxa.lineTo(hw, l6da); muroQoxa.lineTo(-hw, l6da);
      muroQoxa.closePath();
      muroQoxa.holes.push(kf2TrapezanPordTruon(pordBazo, pordSupro, pordAlto, pordRadiBazo, pordRadiSupro));
      const muroGeo = new THREE.ExtrudeGeometry(muroQoxa, { depth: muraDikeco, bevelEnabled: false, curveSegments: 0o20 });
      muroGeo.translate(0, 0, -muraDikeco / 2);
      const muro = new THREE.Mesh(muroGeo, muraMaterialo);
      muro.position.set(0, y, hd);
      pordMuro.add(muro);

      const truKonturo = kf2JoqanKkaxten(kf2TrapezanPordTruon(pordBazo, pordSupro, pordAlto, pordRadiBazo, pordRadiSupro), 0);
      const pordRando = new THREE.Mesh(
        new THREE.TubeGeometry(truKonturo, 0o200, 0o1/0o20, 0o14, true),
        joqaMaterialo
);
      pordRando.position.set(0, y, hd - muraDikeco / 2 - 0o5/0o100);
      pordMuro.add(pordRando);

      const plosteq = new THREE.Mesh(
        new THREE.BoxGeometry(pordBazo + 0o1/0o10, 0o2/0o40, muraDikeco),
        new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0o23/0o100, metalness: 0o55/0o100 })
);
      plosteq.position.set(0, y, hd - 0o1/0o20);
      pordMuro.add(plosteq);

      const pordoj = spec.type === "sanktejo" ? 4 : 1;
      for ( let i = 0; i < pordoj; i++ ) {
        const kopio = i === 0 ? pordMuro : pordMuro.clone();
        kopio.rotation.y = i * Math.PI / 2;
        group.add(kopio);
      }
    } else {
      // ⟨ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ʌ ſɟᴜ ֭ſɭэ ſɭэ 📃 ⟩
      aldoniLonganFenestron(group, 0, hd, y, l6da, hw, "ne3ak2", muraMaterialo, fenestraMaterialo, joqaMaterialo);
    }

    const kvarPordoj = et === 0 && spec.type === "sanktejo";
    if ( !kvarPordoj ) aldoniLonganFenestron(group, 0, -hd, y, l6da, hw, "neteru", muraMaterialo, fenestraMaterialo, joqaMaterialo);

    if ( !kvarPordoj ) aldoniLonganFenestron(group, -hw, 0, y, l6da, hd, "maldekstra", muraMaterialo, fenestraMaterialo, joqaMaterialo);

    if ( !kvarPordoj ) aldoniLonganFenestron(group, hw, 0, y, l6da, hd, "dekstra", muraMaterialo, fenestraMaterialo, joqaMaterialo);

    const kolDikeco = 0o7/0o40;
    const kolAlto = l6da;
    for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
      const kol = new THREE.Mesh(
        new RoundedBoxGeometry(kolDikeco, kolAlto, kolDikeco, 3, 0o3/0o200),
        joqaMaterialo
);
      kol.position.set(sX * ( hw - kolDikeco / 2 ), y + kolAlto / 2, sZ * ( hd - kolDikeco / 2 ));
      group.add(kol);

      const flara = new THREE.Mesh(
        new RoundedBoxGeometry(kolDikeco * 0o15/0o10, kolAlto * 0o1/0o40, kolDikeco * 0o15/0o10, 3, 0o3/0o200),
        joqaMaterialo
);
      flara.position.set(sX * ( hw - ( kolDikeco * 0o15/0o10 ) / 2 ), y + kolAlto - kolAlto * 0o1/0o40, sZ * ( hd - ( kolDikeco * 0o15/0o10 ) / 2 ));
      group.add(flara);

      const kozuni = new THREE.Mesh(
        new RoundedBoxGeometry(kolDikeco * 0o5/0o4, kolAlto * 0o1/0o40, kolDikeco * 0o5/0o4, 3, 0o3/0o200),
        new THREE.MeshStandardMaterial({ color: GOLD_SOFT, metalness: 0o5/0o10, roughness: 0o13/0o40 })
);
      kozuni.position.set(sX * ( hw - ( kolDikeco * 0o5/0o4 ) / 2 ), y + kolAlto * 0o1/0o100, sZ * ( hd - ( kolDikeco * 0o5/0o4 ) / 2 ));
      group.add(kozuni);
    }

    const lampNombro = Math.max(1, Math.floor(hw) - 1);
    // ⟨ = ꞙɭɔ ʌ ֭ſɭwʞ ᶅſw ſɭɹ ʌ ſȷwɔ˞ ʌ ſɭɔⰱ 📃 ⟩
    const lampLargho = 0o3/0o40;
    for ( let i = 0; i < lampNombro; i++ ) {
      const lx = -hw + ( i + 1 ) * hw * 2 / ( lampNombro + 1 );
      // ⟨ = ʌ ֭ſɭwʞ ᶅſw ſɭɹ ʌ ſȷwɔ˞ ʌ ſɭɔⰱ 📃 ⟩
      const enPordaMalfermo = et === 0 && Math.abs(lx) - lampLargho < pordDuon;
      const flankSigno = Math.sign(lx) || 1;
      const lampY = y + l6da * 0o5/0o10;
      // ⟨ = ꞙɭɔ ʌ ſɭw ʃᴜ ʌ ſɟᴜ ſɟɹ ᶅſɹƽ 📃 ⟩
      // ⟨ ſɭᴜ ŋᷠᴜ ʌ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ 📃 ⟩
      const knece = new THREE.Mesh(
        new THREE.CylinderGeometry(0o1/0o100, 0o1/0o100, 0o3/0o10, 6).rotateX(Math.PI / 2),
        joqaMaterialo
);
      knece.position.set(enPordaMalfermo ? flankSigno * ( hw - 0o3/0o20 ) : lx,
        lampY + 0o3/0o40, enPordaMalfermo ? 0 : hd - 0o3/0o20);
      knece.rotation.y = enPordaMalfermo ? Math.PI / 2 : 0;
      group.add(knece);
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
      const plakedInk = weh2Ruva(GOLD);
      const plakedNomo = nomoAih(spec.name, spec.type);
      const plakedo = generiSkribanCac2sex(plakedNomo, {
        w: 0o136, h: 0o300, ink: plakedInk,
      });
      const soza = new THREE.Mesh(
        new THREE.PlaneGeometry(4/5, 0o15/0o10),
        new THREE.MeshStandardMaterial({ map: plakedo, transparent: true, roughness: 0o23/0o100, metalness: 0o55/0o100 })
);
      const pkX = pordDuon + ( hw - pordDuon ) / 2;
      soza.position.set(pkX, y + l6da * 0o3/0o10, hd - 0o1/0o20);
      group.add(soza);
      const pjoqa = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 0o16/0o10, 0o1/0o40)),
        new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0o4/0o10 })
);
      pjoqa.position.set(pkX, y + l6da * 0o3/0o10, hd - 0o1/0o40);
      group.add(pjoqa);
    }

    aldoniInternanMeblaron(group, spec.type, hw, hd, y, l6da, et, havem2,
      lignaMaterialo, metalaMaterialo, joqaMaterialo,
      tolaKoloro, kusenaKoloro, sys.litkoj);

    if ( spec.type !== "kasafeo" && hw > 0o3/0o2 ) {
      const trabaMaterialo = new THREE.MeshStandardMaterial({ color: parseInt(veHuna(weh2Ruva(muraHunaq.wall), 0o3/0o10).slice(1), 0o20), roughness: 0o67/0o100 });
      for ( let i = 0; i < 2; i++ ) {
        const tx = ( i - 0o4/0o10 ) * hw * 0o7/0o10;
        const trabo = new THREE.Mesh(
          new THREE.BoxGeometry(0o5/0o40, 0o5/0o40, hd * 2 - 0o3/0o10),
          trabaMaterialo
);
        trabo.position.set(tx, y + l6da - 0o2/0o40, 0);
        group.add(trabo);
      }
    }
  }

  if ( helikso ) {
    const rMezo = ( helikso.rKol + helikso.rEkster ) / 2;
    const radiala = helikso.rEkster - helikso.rKol;
    const tonaAngulo = Math.PI * 2 / helikso.perTurno;
    const tonaAltoSupre = helikso.turnoAlto / helikso.perTurno;
    const tonaAltoSube = helikso.turnoAltoSub / helikso.perTurno;
    const tonaLargho = rMezo * tonaAngulo * 0o115/0o100;
    const nSube = helikso.turnojSube * helikso.perTurno;
    const nSupre = helikso.turnoj * helikso.perTurno;
    const fundoY = heliksaAltecxo(helikso, -helikso.turnojSube);
    const suproY = heliksaAltecxo(helikso, helikso.turnoj) + 0o4/0o10;
    const akcentaMaterialo = new THREE.MeshStandardMaterial({ color: muraHunaq.frame, metalness: 0o55/0o100, roughness: 0o23/0o100 });
    const cel2nu = new THREE.Mesh(
      new THREE.CylinderGeometry(helikso.rKol, helikso.rKol * 0o106/0o100, suproY - fundoY, 0o20),
      akcentaMaterialo
);
    cel2nu.position.set(0, ( fundoY + suproY ) / 2, 0);
    cel2nu.castShadow = true;
    group.add(cel2nu);
    for ( let p = -nSube; p < nSupre; p++ ) {
      const ang = p * tonaAngulo;
      const tonaAlto = p < 0 ? tonaAltoSube : tonaAltoSupre;
      const y = heliksaAltecxo(helikso, p / helikso.perTurno);
      const vepat6ni = new THREE.Mesh(
        new RoundedBoxGeometry(tonaLargho, tonaAlto, radiala, 3, 0o3/0o200),
        sxtupMaterialo
);
      vepat6ni.position.set(rMezo * Math.sin(ang), y + tonaAlto / 2, rMezo * Math.cos(ang));
      vepat6ni.rotation.y = ang;
      vepat6ni.castShadow = true;
      group.add(vepat6ni);
      const nazoAlto = Math.min(0o1/0o40, tonaAlto);
      const rimY = y + tonaAlto - nazoAlto / 2;
      const ux = Math.sin(ang), uz = Math.cos(ang);
      const tx = Math.cos(ang), tz = -Math.sin(ang);
      const nazo = new THREE.Mesh(
        new RoundedBoxGeometry(tonaLargho + 0o1/0o10, nazoAlto, 0o1/0o20, 3, 0o3/0o400),
        akcentaMaterialo
);
      nazo.position.set(( helikso.rEkster + 0o1/0o40 ) * ux, rimY, ( helikso.rEkster + 0o1/0o40 ) * uz);
      nazo.rotation.y = ang;
      group.add(nazo);
      for ( const s of [ -1, 1 ] ) {
        const kanto = new THREE.Mesh(
          new RoundedBoxGeometry(0o1/0o20, nazoAlto, radiala, 3, 0o3/0o400),
          akcentaMaterialo
);
        kanto.position.set(
          rMezo * ux + s * ( tonaLargho / 2 + 0o1/0o40 ) * tx,
          rimY,
          rMezo * uz + s * ( tonaLargho / 2 + 0o1/0o40 ) * tz
);
        kanto.rotation.y = ang;
        group.add(kanto);
      }
    }
    const relPunktoj: THREE.Vector3[] = [];
    const relHas2nasce = Math.max(0o100, ( helikso.turnoj + helikso.turnojSube ) * 0o40);
    for ( let i = 0; i <= relHas2nasce; i++ ) {
      const t = i / relHas2nasce;
      const turno = -helikso.turnojSube + t * ( helikso.turnoj + helikso.turnojSube );
      const ang = turno * Math.PI * 2;
      const y = heliksaAltecxo(helikso, turno) + 0o3/0o4;
      relPunktoj.push(new THREE.Vector3(( helikso.rEkster + 0o1/0o10 ) * Math.sin(ang), y, ( helikso.rEkster + 0o1/0o10 ) * Math.cos(ang)));
    }
    const relo = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(relPunktoj), relHas2nasce, 0o3/0o100, 0o6, false),
      joqaMaterialo
);
    group.add(relo);
  }

  const cxefaLumo = new THREE.DirectionalLight(0xf8d898, 0o3/0o10);
  cxefaLumo.position.set(0, havem2 * tieroAlto * 4/5, 0);
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
      Math.min(mw * 2 - 1, 6), vendProfundo, 0, lignaMaterialo, joqaMaterialo);
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
    const neteruaZ = Math.min(0o14/0o10, Math.max(0o7/0o10, md / 2 - 0o14/0o10));
    const tabloLokoj = mw >= 0o50/0o10 && md >= 0o50/0o10
      ? [ [ tabloX, tabloZ ], [ -tabloX, tabloZ ], [ tabloX, -neteruaZ ], [ -tabloX, -neteruaZ ] ]
      : [];
    const tabloj: { x: number; z: number }[] = [];
    for ( const [ tx, tz ] of tabloLokoj ) {
      aldoniManĝtablon(group, tx, tz, 0, lignaMaterialo, joqaMaterialo, tz < 0);
      tabloj.push({ x: tx, z: tz });
    }
    const items = kf2Mangxajxojn(group, 0, 0, tabloj);
    sys.m7x = items;
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

  return { x: enirX, z: enirZ, y: enirY, c2w2q: enirDirekto };
}

export function eliriInternon(sys: InternaSistemo, cxefaSceno: THREE.Scene): void {
  kasxiNunan(sys, cxefaSceno);
}

export function gxisdatigiInternon(sys: InternaSistemo, t: number): void {
  for ( const a of sys.animated ) a.update(t);
  for ( const v of sys.vaporNuboj ) {
    const haxekuxa = v.cloud.geometry.attributes.position;
    if ( haxekuxa ) {
      for ( let i = 0; i < haxekuxa.count; i++ ) {
        const y = haxekuxa.getY(i) + 0o3/0o2000;
        if ( y > 7/5 ) haxekuxa.setY(i, -0o6/0o100);
        else haxekuxa.setY(i, y);
      }
      haxekuxa.needsUpdate = true;
    }
  }
}
