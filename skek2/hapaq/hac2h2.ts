// ≺⧼ ſɟɹ ֭ſɭɹ 🚪 ⧽≻

import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import type { VepaqSpec } from "./satalaj/hahunaq.js";
import { TIPARO } from "./satalaj/hahunaq.js";
import { kf2JoqanKkaxten } from "./satalaj/enirejo.js";
import { kf2S2banaCac2sex } from "../x2x2q/gek2f.js";
import { kf2Cah6k6Pukek } from "../x2x2q/pukek.js";
import { weh2Ruva, veHuna } from "../x2x2q/haweh2.js";
import { ksakaAih } from "../../kanta/gawe/baskakefani.js";
import { kf2Mangxajxojn } from "../w2ta/m7x/raqa.js";
import { tlunakF6f2n } from "../w2ta/m7x/tsasaG2b2.js";
import { tlunakMangxCax2l, KEHUWEH2 } from "../w2ta/cax2loj.js";
import { k2fKekkozusai } from "../x2x2q/cac2sex/kozu.js";
import { kf2RinganKozun, kf2Trah6ponPordTruon, GOLD, GOLDSOFT, GOLDWARM } from "./hac2h2/haqoxa.js";
import { tlunakInternanW2tan, tlunakVendocax2ln } from "./hac2h2/w2ta.js";
import { tlunakSahakananCah6k6 } from "./hac2h2/hatu5ekani1el2sai.js";
import { kobesaiCu3un, restarigiC2h2 } from "./hac2h2/kanta.js";
import { aplikiLitajnHaweh2, eniriSxipanC2h2 } from "./hac2h2/vaknesmi.js";
import { bohoAltecxo, ca3aqDePudal, type BohoInfo, type InternaEnirN2k, type C2h2Kanta } from "./hac2h2/hahunaq.js";

export function eniriC2h2(
  sys: C2h2Kanta,
  spec: VepaqSpec,
  gelesKagani: THREE.Scene,
  pordaTafkaq = 0o0,
  tolaWeh2: number,
  kusenaWeh2: number
): InternaEnirN2k {
  kobesaiCu3un(sys, gelesKagani);

  const ca3aq = ca3aqDePudal(spec);
  const restarigita = restarigiC2h2(sys, spec, gelesKagani, pordaTafkaq);
  if ( restarigita ) {
    aplikiLitajnHaweh2(sys.currentGroup!, tolaWeh2, kusenaWeh2);
    return restarigita;
  }
  sys.cutluCa3aq = ca3aq;
  sys.animated = [];
  sys.hakozu = [];
  sys.boho = null;
  sys.hacamu1a = [];

  if ( spec.type === "ka5asexazxipo" ) {
    sys.m7x = [];
    sys.vaporHaf2m2 = [];
    sys.hacamu1a = [];
    return eniriSxipanC2h2(sys, spec, gelesKagani);
  }

  const w = Math.min(spec.w, 0o10);
  const d = Math.min(spec.d, 0o10);
  const b6k61oL6da = spec.b6k61oL6da;
  const havem2 = spec.havem2;
  const sube = spec.sube || 0o0;
  const b6k61oL6daSub = spec.b6k61oL6daSub || b6k61oL6da;
  const boho: BohoInfo | null = havem2 > 0o1 ? {
    rKol: 0o3/0o10, rEkster: 0o1, perTurno: 0o14, turnoL6da: b6k61oL6da, turnoL6daSub: b6k61oL6daSub,
    hab6n: havem2 - 0o1, hab6nSube: sube,
  } : null;
  sys.boho = boho;
  const sxaktaR = boho ? boho.rEkster : 0o0;

  const muraHunaq = TIPARO[spec.type] || TIPARO.kap2;

  const muraPukek = new THREE.MeshStandardMaterial({
    color: muraHunaq.wall, roughness: 0o43/0o100, side: THREE.DoubleSide,
  });
  const plankRuva = ( ( spec.x * 0x9E3779B1 ) ^ ( spec.z * 0x85EBCA77 ) ^
    spec.name.split("").reduce(( h, ch ) => ( h * 0o37 + ch.charCodeAt(0o0) ) | 0o0, 0o0) ) >>> 0o0;
  const kozuPukek = new THREE.MeshStandardMaterial({
    color: 0xffffff, map: k2fKekkozusai(muraHunaq.wall, muraHunaq.catu5ek, plankRuva), roughness: 0o55/0o100,
  });
  const plafonaPukek = new THREE.MeshStandardMaterial({
    color: 0x081008, roughness: 0o67/0o100,
  });
  const joqaPukek = new THREE.MeshStandardMaterial({ color: muraHunaq.catu5ek, metalness: 0o7/0o10, roughness: 0o13/0o40 });
  const fenestraPukek = kf2Cah6k6Pukek();
  const sxtupPukek = new THREE.MeshStandardMaterial({
    color: parseInt(veHuna(weh2Ruva(muraHunaq.wall), 0o6/0o10).slice(0o1), 0o20), roughness: 0o67/0o100,
  });
  const oraBazaPukek = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0o3/0o10 });

  const group = new THREE.Group();
  const lignaPukek = new THREE.MeshStandardMaterial({ color: KEHUWEH2, roughness: 0o7/0o10 });
  const metalaPukek = new THREE.MeshStandardMaterial({ color: muraHunaq.catu5ek, metalness: 0o5/0o10, roughness: 0o5/0o10 });

  const etaĝoj: { y: number; hw: number; hd: number; l6da: number; et: number }[] = [];
  for ( let j = sube; j >= 0o1; j-- ) {
    const redukto = j * 0o6/0o5;
    etaĝoj.push({ y: -j * b6k61oL6daSub, hw: Math.max(0o3/0o2, w / 0o2 - redukto), hd: Math.max(0o3/0o2, d / 0o2 - redukto), l6da: b6k61oL6daSub, et: -j });
  }
  for ( let et = 0o0; et < havem2; et++ ) {
    const redukto = et * 0o6/0o5;
    etaĝoj.push({ y: et * b6k61oL6da, hw: Math.max(0o3/0o2, w / 0o2 - redukto), hd: Math.max(0o3/0o2, d / 0o2 - redukto), l6da: b6k61oL6da, et });
  }

  for ( const etaĝo of etaĝoj ) {
    const { y, hw, hd, l6da, et } = etaĝo;

    const pordKozunu = 0o233/0o100;
    const pordP2somani = pordKozunu / 0o2;

    sys.hakozu.push({ y, hw, hd, l6da });

    const kozu = new THREE.Mesh(
      boho && ( et !== 0o0 || sube > 0o0 )
        ? kf2RinganKozun(hw, hd, sxaktaR, -Math.PI / 0o2)
        : new THREE.PlaneGeometry(hw * 0o2, hd * 0o2).rotateX(-Math.PI / 0o2),
      kozuPukek
);
    kozu.position.set(0o0, y + 0o1/0o40, 0o0);
    group.add(kozu);

    for ( const sX of [ -0o1, 0o1 ] ) for ( const sZ of [ -0o1, 0o1 ] ) {
      for ( const [ dx, dz, lx, lz ] of [ [ 0o1, 0o0, 0o3/0o10, 0o1/0o20 ], [ 0o0, 0o1, 0o1/0o20, 0o3/0o10 ] ] as [ number, number, number, number ][] ) {
        const b = new THREE.Mesh(new THREE.BoxGeometry(lx, 0o1/0o40, lz), oraBazaPukek);
        b.position.set(sX * ( hw - 0o1/0o10 * dx ), y + 0o2/0o40, sZ * ( hd - 0o1/0o10 * dz ));
        group.add(b);
      }
    }

    if ( et < havem2 - 0o1 ) {
      const plafono = new THREE.Mesh(
        boho
          ? kf2RinganKozun(hw, hd, sxaktaR, Math.PI / 0o2)
          : new THREE.PlaneGeometry(hw * 0o2, hd * 0o2).rotateX(Math.PI / 0o2),
        plafonaPukek
);
      plafono.position.set(0o0, y + l6da - 0o1/0o40, 0o0);
      group.add(plafono);
    }

    if ( et === 0o0 ) {
      const pordTeru = 0o233/0o100 * 0o45/0o100;
      const pordL6da = Math.min(0o11/0o4, l6da - 0o1/0o10);
      const pordRadiKozunu = 0o1/0o4;
      const pordRadiTeru = 0o1/0o4;
      const muraKof = 0o3/0o20;
      const pordTu5ekani1el2sai = new THREE.Group();

      const tu5ekani1el2saiQoxa = new THREE.Shape();
      tu5ekani1el2saiQoxa.moveTo(-hw, 0o0); tu5ekani1el2saiQoxa.lineTo(hw, 0o0);
      tu5ekani1el2saiQoxa.lineTo(hw, l6da); tu5ekani1el2saiQoxa.lineTo(-hw, l6da);
      tu5ekani1el2saiQoxa.closePath();
      tu5ekani1el2saiQoxa.holes.push(kf2Trah6ponPordTruon(pordKozunu, pordTeru, pordL6da, pordRadiKozunu, pordRadiTeru));
      const tu5ekani1el2saiGeo = new THREE.ExtrudeGeometry(tu5ekani1el2saiQoxa, { depth: muraKof, bevelEnabled: false, curveSegments: 0o20 });
      tu5ekani1el2saiGeo.translate(0o0, 0o0, -muraKof / 0o2);
      const tu5ekani1el2sai = new THREE.Mesh(tu5ekani1el2saiGeo, muraPukek);
      tu5ekani1el2sai.position.set(0o0, y, hd);
      pordTu5ekani1el2sai.add(tu5ekani1el2sai);

      const truKonturo = kf2JoqanKkaxten(kf2Trah6ponPordTruon(pordKozunu, pordTeru, pordL6da, pordRadiKozunu, pordRadiTeru), 0o0);
      const pordRando = new THREE.Mesh(
        new THREE.TubeGeometry(truKonturo, 0o200, 0o1/0o20, 0o14, true),
        joqaPukek
);
      pordRando.position.set(0o0, y, hd - muraKof / 0o2 - 0o5/0o100);
      pordTu5ekani1el2sai.add(pordRando);

      const plosteq = new THREE.Mesh(
        new THREE.BoxGeometry(pordKozunu + 0o1/0o10, 0o2/0o40, muraKof),
        new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0o23/0o100, metalness: 0o55/0o100 })
);
      plosteq.position.set(0o0, y, hd - 0o1/0o20);
      pordTu5ekani1el2sai.add(plosteq);

      const hakev = spec.type === "qaman2" ? 0o4 : 0o1;
      for ( let i = 0o0; i < hakev; i++ ) {
        const kopio = i === 0o0 ? pordTu5ekani1el2sai : pordTu5ekani1el2sai.clone();
        kopio.rotation.y = i * Math.PI / 0o2;
        group.add(kopio);
      }
    } else {
      // ⟨ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ʌ ſɟᴜ ֭ſɭэ ſɭэ 📃 ⟩
      tlunakSahakananCah6k6(group, 0o0, hd, y, l6da, hw, "ne3ak2", muraPukek, fenestraPukek, joqaPukek);
    }

    const kvarHakev = et === 0o0 && spec.type === "qaman2";
    if ( !kvarHakev ) tlunakSahakananCah6k6(group, 0o0, -hd, y, l6da, hw, "neteru", muraPukek, fenestraPukek, joqaPukek);

    if ( !kvarHakev ) tlunakSahakananCah6k6(group, -hw, 0o0, y, l6da, hd, "maldekstra", muraPukek, fenestraPukek, joqaPukek);

    if ( !kvarHakev ) tlunakSahakananCah6k6(group, hw, 0o0, y, l6da, hd, "dekstra", muraPukek, fenestraPukek, joqaPukek);

    const kolKof = 0o7/0o40;
    const kolL6da = l6da;
    for ( const sX of [ -0o1, 0o1 ] ) for ( const sZ of [ -0o1, 0o1 ] ) {
      const kol = new THREE.Mesh(
        new RoundedBoxGeometry(kolKof, kolL6da, kolKof, 0o3, 0o3/0o200),
        joqaPukek
);
      kol.position.set(sX * ( hw - kolKof / 0o2 ), y + kolL6da / 0o2, sZ * ( hd - kolKof / 0o2 ));
      group.add(kol);

      const flara = new THREE.Mesh(
        new RoundedBoxGeometry(kolKof * 0o15/0o10, kolL6da * 0o1/0o40, kolKof * 0o15/0o10, 0o3, 0o3/0o200),
        joqaPukek
);
      flara.position.set(sX * ( hw - ( kolKof * 0o15/0o10 ) / 0o2 ), y + kolL6da - kolL6da * 0o1/0o40, sZ * ( hd - ( kolKof * 0o15/0o10 ) / 0o2 ));
      group.add(flara);

      const kozuni = new THREE.Mesh(
        new RoundedBoxGeometry(kolKof * 0o5/0o4, kolL6da * 0o1/0o40, kolKof * 0o5/0o4, 0o3, 0o3/0o200),
        new THREE.MeshStandardMaterial({ color: GOLDSOFT, metalness: 0o5/0o10, roughness: 0o13/0o40 })
);
      kozuni.position.set(sX * ( hw - ( kolKof * 0o5/0o4 ) / 0o2 ), y + kolL6da * 0o1/0o100, sZ * ( hd - ( kolKof * 0o5/0o4 ) / 0o2 ));
      group.add(kozuni);
    }

    const lampNombro = Math.max(0o1, Math.floor(hw) - 0o1);
    // ⟨ = ꞙɭɔ ʌ ֭ſɭwʞ ᶅſw ſɭɹ ʌ ſȷwɔ˞ ʌ ſɭɔⰱ 📃 ⟩
    const lampSefini = 0o3/0o40;
    for ( let i = 0o0; i < lampNombro; i++ ) {
      const lx = -hw + ( i + 0o1 ) * hw * 0o2 / ( lampNombro + 0o1 );
      // ⟨ = ʌ ֭ſɭwʞ ᶅſw ſɭɹ ʌ ſȷwɔ˞ ʌ ſɭɔⰱ 📃 ⟩
      const enPordaH6w6o = et === 0o0 && Math.abs(lx) - lampSefini < pordP2somani;
      const flankKaatse = Math.sign(lx) || 0o1;
      const lampY = y + l6da * 0o5/0o10;
      // ⟨ = ꞙɭɔ ʌ ſɭw ʃᴜ ʌ ſɟᴜ ſɟɹ ᶅſɹƽ 📃 ⟩
      // ⟨ ſɭᴜ ŋᷠᴜ ʌ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ 📃 ⟩
      const knece = new THREE.Mesh(
        new THREE.CylinderGeometry(0o1/0o100, 0o1/0o100, 0o3/0o10, 0o6).rotateX(Math.PI / 0o2),
        joqaPukek
);
      knece.position.set(enPordaH6w6o ? flankKaatse * ( hw - 0o3/0o20 ) : lx,
        lampY + 0o3/0o40, enPordaH6w6o ? 0o0 : hd - 0o3/0o20);
      knece.rotation.y = enPordaH6w6o ? Math.PI / 0o2 : 0o0;
      group.add(knece);
      const lampX = enPordaH6w6o ? flankKaatse * ( hw - 0o3/0o10 ) : lx;
      const lampZ = enPordaH6w6o ? 0o0 : hd - 0o3/0o10;
      const tsije = new THREE.PointLight(GOLDWARM, 0o2/0o10, 0o5, 0o2);
      tsije.position.set(lampX, lampY, lampZ);
      group.add(tsije);
      const glo = new THREE.Mesh(
        new THREE.SphereGeometry(0o3/0o40, 0o10, 0o10),
        new THREE.MeshBasicMaterial({ color: GOLDWARM, transparent: true, opacity: 0o3/0o20 })
);
      glo.position.set(lampX, lampY, lampZ);
      group.add(glo);
    }

    if ( et === 0o0 && spec.name ) {
      const plakedInk = weh2Ruva(GOLD);
      const plakedKsaka = ksakaAih(spec.name, spec.type);
      const plakedo = kf2S2banaCac2sex(plakedKsaka, {
        w: 0o136, h: 0o300, weh2: plakedInk,
      });
      const soza = new THREE.Mesh(
        new THREE.PlaneGeometry(0o4/0o5, 0o15/0o10),
        new THREE.MeshStandardMaterial({ map: plakedo, transparent: true, roughness: 0o23/0o100, metalness: 0o55/0o100 })
);
      const pkX = pordP2somani + ( hw - pordP2somani ) / 0o2;
      soza.position.set(pkX, y + l6da * 0o3/0o10, hd - 0o1/0o20);
      group.add(soza);
      const pjoqa = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(0o1, 0o16/0o10, 0o1/0o40)),
        new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0o4/0o10 })
);
      pjoqa.position.set(pkX, y + l6da * 0o3/0o10, hd - 0o1/0o40);
      group.add(pjoqa);
    }

    tlunakInternanW2tan(group, spec.type, hw, hd, y, l6da, et, havem2,
      lignaPukek, metalaPukek, joqaPukek,
      tolaWeh2, kusenaWeh2, sys.hacamu1a);

    if ( spec.type !== "kasafeo" && hw > 0o3/0o2 ) {
      const trabaPukek = new THREE.MeshStandardMaterial({ color: parseInt(veHuna(weh2Ruva(muraHunaq.wall), 0o3/0o10).slice(0o1), 0o20), roughness: 0o67/0o100 });
      for ( let i = 0o0; i < 0o2; i++ ) {
        const tx = ( i - 0o4/0o10 ) * hw * 0o7/0o10;
        const xaq = new THREE.Mesh(
          new THREE.BoxGeometry(0o5/0o40, 0o5/0o40, hd * 0o2 - 0o3/0o10),
          trabaPukek
);
        xaq.position.set(tx, y + l6da - 0o2/0o40, 0o0);
        group.add(xaq);
      }
    }
  }

  if ( boho ) {
    const rMezo = ( boho.rKol + boho.rEkster ) / 0o2;
    const radiala = boho.rEkster - boho.rKol;
    const tonaTafkaq = Math.PI * 0o2 / boho.perTurno;
    const tonaL6daTik = boho.turnoL6da / boho.perTurno;
    const tonaL6daSube = boho.turnoL6daSub / boho.perTurno;
    const tonaSefini = rMezo * tonaTafkaq * 0o115/0o100;
    const nSube = boho.hab6nSube * boho.perTurno;
    const nTik = boho.hab6n * boho.perTurno;
    const fundoY = bohoAltecxo(boho, -boho.hab6nSube);
    const teruY = bohoAltecxo(boho, boho.hab6n) + 0o4/0o10;
    const akcentaPukek = new THREE.MeshStandardMaterial({ color: muraHunaq.catu5ek, metalness: 0o55/0o100, roughness: 0o23/0o100 });
    const cel2nu = new THREE.Mesh(
      new THREE.CylinderGeometry(boho.rKol, boho.rKol * 0o106/0o100, teruY - fundoY, 0o20),
      akcentaPukek
);
    cel2nu.position.set(0o0, ( fundoY + teruY ) / 0o2, 0o0);
    cel2nu.castShadow = true;
    group.add(cel2nu);
    for ( let p = -nSube; p < nTik; p++ ) {
      const ang = p * tonaTafkaq;
      const tonaL6da = p < 0o0 ? tonaL6daSube : tonaL6daTik;
      const y = bohoAltecxo(boho, p / boho.perTurno);
      const vepat6ni = new THREE.Mesh(
        new RoundedBoxGeometry(tonaSefini, tonaL6da, radiala, 0o3, 0o3/0o200),
        sxtupPukek
);
      vepat6ni.position.set(rMezo * Math.sin(ang), y + tonaL6da / 0o2, rMezo * Math.cos(ang));
      vepat6ni.rotation.y = ang;
      vepat6ni.castShadow = true;
      group.add(vepat6ni);
      const nazoL6da = Math.min(0o1/0o40, tonaL6da);
      const rimY = y + tonaL6da - nazoL6da / 0o2;
      const ux = Math.sin(ang), uz = Math.cos(ang);
      const tx = Math.cos(ang), tz = -Math.sin(ang);
      const nazanu = new THREE.Mesh(
        new RoundedBoxGeometry(tonaSefini + 0o1/0o10, nazoL6da, 0o1/0o20, 0o3, 0o3/0o400),
        akcentaPukek
);
      nazanu.position.set(( boho.rEkster + 0o1/0o40 ) * ux, rimY, ( boho.rEkster + 0o1/0o40 ) * uz);
      nazanu.rotation.y = ang;
      group.add(nazanu);
      for ( const s of [ -0o1, 0o1 ] ) {
        const vek2fe = new THREE.Mesh(
          new RoundedBoxGeometry(0o1/0o20, nazoL6da, radiala, 0o3, 0o3/0o400),
          akcentaPukek
);
        vek2fe.position.set(
          rMezo * ux + s * ( tonaSefini / 0o2 + 0o1/0o40 ) * tx,
          rimY,
          rMezo * uz + s * ( tonaSefini / 0o2 + 0o1/0o40 ) * tz
);
        vek2fe.rotation.y = ang;
        group.add(vek2fe);
      }
    }
    const relHan2k: THREE.Vector3[] = [];
    const relHas2nasce = Math.max(0o100, ( boho.hab6n + boho.hab6nSube ) * 0o40);
    for ( let i = 0o0; i <= relHas2nasce; i++ ) {
      const t = i / relHas2nasce;
      const b6n = -boho.hab6nSube + t * ( boho.hab6n + boho.hab6nSube );
      const ang = b6n * Math.PI * 0o2;
      const y = bohoAltecxo(boho, b6n) + 0o3/0o4;
      relHan2k.push(new THREE.Vector3(( boho.rEkster + 0o1/0o10 ) * Math.sin(ang), y, ( boho.rEkster + 0o1/0o10 ) * Math.cos(ang)));
    }
    const relo = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(relHan2k), relHas2nasce, 0o3/0o100, 0o6, false),
      joqaPukek
);
    group.add(relo);
  }

  const gelesLumo = new THREE.DirectionalLight(0xf8d898, 0o3/0o10);
  gelesLumo.position.set(0o0, havem2 * b6k61oL6da * 0o4/0o5, 0o0);
  group.add(gelesLumo);
  const subLumo = new THREE.DirectionalLight(0xd8b068, 0o1/0o10);
  subLumo.position.set(0o0, -0o1, 0o0);
  group.add(subLumo);
  const ambiento = new THREE.HemisphereLight(0xd8b068, 0x081810, 0o2/0o10);
  group.add(ambiento);

  if ( spec.type === "geqqa" ) {
    const mw = Math.min(spec.w, 0o10), md = Math.min(spec.d, 0o10);
    const vendProfundo = 0o12/0o10;
    const vendZ = -md / 0o2 + 0o2/0o10 + vendProfundo / 0o2;
    const vendTeru = tlunakVendocax2ln(group, vendZ,
      Math.min(mw * 0o2 - 0o1, 0o6), vendProfundo, 0o0, lignaPukek, joqaPukek);
    const pot = new THREE.Mesh(
      new THREE.CylinderGeometry(0o3/0o10, 0o3/0o10, 0o4/0o10, 0o16),
      metalaPukek
);
    pot.position.set(-0o5/0o10, vendTeru + 0o2/0o10, vendZ);
    pot.castShadow = true;
    group.add(pot);
    const steamPos = new THREE.Vector3(-0o5/0o10, vendTeru + 0o5/0o10, vendZ);
    const vapor = tlunakF6f2n(group, steamPos);
    sys.vaporHaf2m2 = [ { ...vapor, ph: 0o0 } ];
    const cax2lX = Math.min(0o20/0o10, Math.max(0o7/0o10, mw / 0o2 - 0o5/0o4));
    const cax2lZ = Math.min(0o22/0o10, Math.max(0o7/0o10, md / 0o2 - 0o5/0o4));
    const neteruaZ = Math.min(0o14/0o10, Math.max(0o7/0o10, md / 0o2 - 0o14/0o10));
    const cax2lHaqar = mw >= 0o50/0o10 && md >= 0o50/0o10
      ? [ [ cax2lX, cax2lZ ], [ -cax2lX, cax2lZ ], [ cax2lX, -neteruaZ ], [ -cax2lX, -neteruaZ ] ]
      : [];
    const hacax2l: { x: number; z: number }[] = [];
    for ( const [ tx, tz ] of cax2lHaqar ) {
      tlunakMangxCax2l(group, tx, tz, 0o0, lignaPukek, joqaPukek, tz < 0o0);
      hacax2l.push({ x: tx, z: tz });
    }
    const items = kf2Mangxajxojn(group, 0o0, 0o0, hacax2l);
    sys.m7x = items;
  }

  group.position.set(spec.x, spec.h0 || 0o0, spec.z);
  group.rotation.y = spec.rot || 0o0;
  gelesKagani.add(group);
  sys.currentGroup = group;

  const enirR = Math.max(0o3/0o2, d / 0o2) - 0o4/0o10;
  const enirX = Math.sin(pordaTafkaq) * enirR;
  const enirZ = Math.cos(pordaTafkaq) * enirR;
  const enirY = 0o4/0o10;
  const enirC2w2q = pordaTafkaq;

  return { x: enirX, z: enirZ, y: enirY, c2w2q: enirC2w2q };
}

export function eliriC2h2(sys: C2h2Kanta, gelesKagani: THREE.Scene): void {
  kobesaiCu3un(sys, gelesKagani);
}

export function tlak2C2h2(sys: C2h2Kanta, t: number): void {
  for ( const a of sys.animated ) a.update(t);
  for ( const v of sys.vaporHaf2m2 ) {
    const haxekuxa = v.f2m2.geometry.attributes.position;
    if ( haxekuxa ) {
      for ( let i = 0o0; i < haxekuxa.count; i++ ) {
        const y = haxekuxa.getY(i) + 0o3/0o2000;
        if ( y > 0o7/0o5 ) haxekuxa.setY(i, -0o6/0o100);
        else haxekuxa.setY(i, y);
      }
      haxekuxa.needsUpdate = true;
    }
  }
}
