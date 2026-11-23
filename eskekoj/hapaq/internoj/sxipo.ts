// ≺⧼ ſɟɹ ֭ſɭɹ ʌ ſɭˬᴜȝ 🚀 ⧽≻
import * as THREE from "three";
import type { VepaqSpec } from "../satalaj/hahunaq.js";
import { kf2Cawez2Qoxa } from "../../komunajxoj/haqoxa.js";
import { kf2StelplenanCac2sex, stelplenaCac2sex } from "../../komunajxoj/cac2sex/stelplena-cxielo.js";
import { SXIPA_NIVELOJ, SXIPA_TIERO } from "../krasesxagxa-kosmosxipo.js";
import { GOLD, GOLD_WARM } from "./haqoxa.js";
import { heliksaAltecxo, type HeliksoInfo, type InternaEnirPunkto, type InternaSistemo } from "./hahunaq.js";

export function forigiInternanGrupon(hate: THREE.Group): void {
  const viditajCac2sex = new Set<THREE.Texture>();
  const viditajMaterialoj = new Set<THREE.Material>();
  hate.traverse(( obj ) => {
    const mesxo = obj as THREE.Mesh;
    if ( mesxo.geometry ) mesxo.geometry.dispose();
    const pukek = Array.isArray(mesxo.material) ? mesxo.material : [ mesxo.material ];
    for ( const mat of pukek ) {
      if ( !mat || viditajMaterialoj.has(mat) ) continue;
      viditajMaterialoj.add(mat);
      const teksturoj = [ ( mat as THREE.MeshStandardMaterial ).map, ( mat as THREE.MeshStandardMaterial ).emissiveMap ];
      for ( const teks of teksturoj ) {
        if ( teks && teks !== stelplenaCac2sex && !viditajCac2sex.has(teks) ) {
          viditajCac2sex.add(teks);
          teks.dispose();
        }
      }
      mat.dispose();
    }
  });
}

export function aplikiLitajnKolorojn(hate: THREE.Group, tolaKoloro: number, kusenaKoloro: number): void {
  let tola: THREE.MeshStandardMaterial | null = null;
  let kusena: THREE.MeshStandardMaterial | null = null;
  hate.traverse(( obj ) => {
    const mesxo = obj as THREE.Mesh;
    const hunaq = mesxo.userData.litoHunaq;
    if ( hunaq !== "tecto" && hunaq !== "kuseno" ) return;
    if ( hunaq === "tecto" ) {
      if ( !tola ) tola = new THREE.MeshStandardMaterial({ color: tolaKoloro, roughness: 0o6/0o10 });
      if ( mesxo.material !== tola ) (mesxo.material as THREE.Material).dispose();
      mesxo.material = tola;
    } else {
      if ( !kusena ) kusena = new THREE.MeshStandardMaterial({ color: kusenaKoloro, roughness: 0o6/0o10 });
      if ( mesxo.material !== kusena ) (mesxo.material as THREE.Material).dispose();
      mesxo.material = kusena;
    }
  });
}

export function eniriSxipanInternon(sys: InternaSistemo, spec: VepaqSpec, cxefaSceno: THREE.Scene): InternaEnirPunkto {
  const hate = new THREE.Group();
  const sxipaTiero = SXIPA_TIERO;
  const up = SXIPA_NIVELOJ, down = up;
  const rMezCx = 0o17/0o4, rSupro = 0o3/0o4, rBoto = 0o155/0o100;
  const rHelikso = 1;
  const yB = -down * sxipaTiero, yT = up * sxipaTiero;
  const konusaR = ( y: number ): number =>
    y >= 0 ? rMezCx - ( rMezCx - rSupro ) * ( y / ( up * sxipaTiero ) )
           : rMezCx - ( rMezCx - rBoto ) * ( -y / ( down * sxipaTiero ) );

  const kareno = new THREE.MeshStandardMaterial({ color: 0x103028, roughness: 0o3/0o10, metalness: 0o11/0o40, side: THREE.DoubleSide });
  const malhela = new THREE.MeshStandardMaterial({ color: 0x081818, roughness: 0o5/0o10, metalness: 0o1/0o10 });
  const oro = new THREE.MeshStandardMaterial({ color: GOLD, metalness: 0o7/0o10, roughness: 0o13/0o40 });
  const brila = new THREE.MeshStandardMaterial({ color: 0xa0e8e0, emissive: 0x286868, emissiveIntensity: 0o7/0o10, roughness: 0o3/0o10 });
  const fasw2d2 = new THREE.MeshBasicMaterial({ color: 0x081018, map: kf2StelplenanCac2sex(), toneMapped: false, side: THREE.DoubleSide });
  const sxtupMaterialo = new THREE.MeshStandardMaterial({ color: 0x283838, roughness: 0o67/0o100 });

  const helikso: HeliksoInfo = {
    rKol: 0o3/0o10, rEkster: rHelikso, perTurno: 0o14,
    turnoAlto: sxipaTiero, turnoAltoSub: sxipaTiero,
    turnoj: up - 1, turnojSube: down,
  };
  sys.helikso = helikso;

  sys.plankoj = [];
  for ( let j = down; j >= 1; j-- ) {
    const r = konusaR(-j * sxipaTiero);
    sys.plankoj.push({ y: -j * sxipaTiero, hw: r / Math.SQRT2, hd: r / Math.SQRT2, l6da: sxipaTiero });
  }
  for ( let i = 0; i < up; i++ ) {
    const r = konusaR(i * sxipaTiero);
    sys.plankoj.push({ y: i * sxipaTiero, hw: r / Math.SQRT2, hd: r / Math.SQRT2, l6da: sxipaTiero });
  }

  const teru = new THREE.Mesh(new THREE.CylinderGeometry(rSupro, rMezCx, up * sxipaTiero, 0o40, 1, true), kareno);
  teru.position.y = up * sxipaTiero / 2;
  hate.add(teru);
  const psaz = new THREE.Mesh(new THREE.CylinderGeometry(rMezCx, rBoto, down * sxipaTiero, 0o40, 1, true), kareno);
  psaz.position.y = -down * sxipaTiero / 2;
  hate.add(psaz);
  const plafono = new THREE.Mesh(new THREE.CircleGeometry(rSupro, 0o40).rotateX(Math.PI / 2), malhela);
  plafono.position.y = yT;
  hate.add(plafono);
  const lumRingo = new THREE.Mesh(new THREE.RingGeometry(0o13/0o10, 0o21/0o10, 0o40).rotateX(Math.PI / 2), brila);
  lumRingo.position.y = yT - 0o1/0o20;
  hate.add(lumRingo);

  for ( const p of sys.plankoj ) {
    const r = p.hw * Math.SQRT2;
    const estasMalsupro = p.y === yB;
    const planko = new THREE.Mesh(
      estasMalsupro
        ? new THREE.CircleGeometry(r, 0o40).rotateX(-Math.PI / 2)
        : new THREE.RingGeometry(rHelikso, Math.max(rHelikso + 0o1/0o20, r - 0o1/0o40), 0o40).rotateX(-Math.PI / 2),
      malhela
);
    planko.position.y = p.y + 0o1/0o40;
    hate.add(planko);
    if ( p.y === 0 ) {
      const c2q = new THREE.Mesh(new THREE.RingGeometry(r - 0o3/0o10, r - 0o1/0o20, 0o40).rotateX(-Math.PI / 2), oro);
      c2q.position.y = 0o5/0o100;
      hate.add(c2q);
    }
  }

  {
    const rMezo = ( helikso.rKol + helikso.rEkster ) / 2;
    const radiala = helikso.rEkster - helikso.rKol;
    const tonaAngulo = Math.PI * 2 / helikso.perTurno;
    const tonaAlto = helikso.turnoAlto / helikso.perTurno;
    const tonaLargho = rMezo * tonaAngulo * 0o115/0o100;
    const nSube = helikso.turnojSube * helikso.perTurno;
    const nSupre = helikso.turnoj * helikso.perTurno;
    const fundoY = heliksaAltecxo(helikso, -helikso.turnojSube);
    const suproY = Math.min(yT, heliksaAltecxo(helikso, helikso.turnoj) + 0o4/0o10);
    const cel2nu = new THREE.Mesh(
      new THREE.CylinderGeometry(helikso.rKol, helikso.rKol * 0o106/0o100, suproY - fundoY, 0o20),
      malhela
);
    cel2nu.position.set(0, ( fundoY + suproY ) / 2, 0);
    hate.add(cel2nu);
    for ( let p = -nSube; p < nSupre; p++ ) {
      const ang = p * tonaAngulo;
      const y = heliksaAltecxo(helikso, p / helikso.perTurno);
      const vepat6ni = new THREE.Mesh(
        new THREE.BoxGeometry(tonaLargho, tonaAlto, radiala),
        sxtupMaterialo
);
      vepat6ni.position.set(rMezo * Math.sin(ang), y + tonaAlto / 2, rMezo * Math.cos(ang));
      vepat6ni.rotation.y = ang;
      hate.add(vepat6ni);
    }
    const relPunktoj: THREE.Vector3[] = [];
    const relHas2nasce = Math.max(0o100, ( helikso.turnoj + helikso.turnojSube ) * 0o40);
    for ( let i = 0; i <= relHas2nasce; i++ ) {
      const t = i / relHas2nasce;
      const turno = -helikso.turnojSube + t * ( helikso.turnoj + helikso.turnojSube );
      const ang = turno * Math.PI * 2;
      const y = Math.min(yT - 0o1/0o20, heliksaAltecxo(helikso, turno) + 0o3/0o4);
      relPunktoj.push(new THREE.Vector3(( helikso.rEkster + 0o1/0o10 ) * Math.sin(ang), y, ( helikso.rEkster + 0o1/0o10 ) * Math.cos(ang)));
    }
    const relo = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(relPunktoj), relHas2nasce, 0o3/0o100, 0o6, false),
      oro
);
    hate.add(relo);
  }

  const fasw2d2loZ = -( konusaR(0o23/0o4) - 0o1/0o4 );
  const fasw2d2lo = new THREE.Mesh(new THREE.PlaneGeometry(0o4, 0o25/0o10), fasw2d2);
  fasw2d2lo.position.set(0, 0o23/0o4, fasw2d2loZ);
  hate.add(fasw2d2lo);
  const vitJoqa = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(0o4 + 0o1/0o10, 0o25/0o10 + 0o1/0o10, 0o1/0o40)),
    new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0o4/0o10 })
);
  vitJoqa.position.set(0, 0o23/0o4, fasw2d2loZ);
  hate.add(vitJoqa);

  const kapsuloj: THREE.Mesh[] = [];
  const rKaps = konusaR(3 - 0o13/0o40);
  const kapsX = Math.sqrt(Math.max(0o1/0o4, rKaps * rKaps - ( 0o17/0o10 ) * ( 0o17/0o10 )));
  for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
    const fenMat = brila.clone();
    fenMat.side = THREE.DoubleSide;
    const fen = new THREE.Mesh(new THREE.ShapeGeometry(kf2Cawez2Qoxa(0o13/0o10, 0o13/0o20), 0o40), fenMat);
    fen.rotation.y = Math.PI / 2;
    fen.position.set(sX * kapsX, 3 - 0o13/0o40, sZ * 0o17/0o10);
    hate.add(fen);
    kapsuloj.push(fen);
  }

  const konzolo = new THREE.Mesh(new THREE.BoxGeometry(4, 0o3/0o2, 1), kareno);
  konzolo.position.set(0, 0o3/0o4, -0o5/0o2);
  konzolo.rotation.x = -0o1/0o10;
  konzolo.castShadow = true;
  hate.add(konzolo);
  const ekrano = new THREE.Mesh(new THREE.PlaneGeometry(3, 1), brila.clone());
  ekrano.position.set(0, 0o25/0o20, -0o61/0o20);
  hate.add(ekrano);

  const sidilo = new THREE.Mesh(new THREE.BoxGeometry(0o13/0o10, 0o3/0o10, 0o13/0o10), malhela);
  sidilo.position.set(0, 0o3/0o10, -0o3/0o2);
  sidilo.castShadow = true; hate.add(sidilo);
  const dorso = new THREE.Mesh(new THREE.BoxGeometry(0o13/0o10, 0o7/0o10, 0o1/0o4), kareno);
  dorso.position.set(0, 0o13/0o20, -0o17/0o10);
  hate.add(dorso);
  const tigo = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o10, 0o1/0o10, 0o3/0o10, 6), oro);
  tigo.position.set(0, 0o3/0o20, -0o3/0o2);
  hate.add(tigo);

  const holoringo = new THREE.Mesh(new THREE.TorusGeometry(0o72/0o100, 0o3/0o100, 0o10, 0o40), brila);
  holoringo.position.set(0, 0o7/0o2, -0o5/0o2);
  hate.add(holoringo);
  const holoringo2 = new THREE.Mesh(new THREE.TorusGeometry(0o52/0o100, 0o3/0o100, 0o10, 0o40), brila);
  holoringo2.position.set(0, 0o7/0o2, -0o5/0o2);
  hate.add(holoringo2);
  const holosfero = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o4, 0o10, 0o10), brila);
  holosfero.position.set(0, 0o7/0o2, -0o5/0o2);
  hate.add(holosfero);
  const hololumo = new THREE.PointLight(0xa0e8e0, 0o6/0o10, 0o20, 2);
  hololumo.position.set(0, 0o7/0o2, -0o5/0o2);
  hate.add(hololumo);

  const aerZ = konusaR(0o7/0o2) - 0o1/0o4;
  const aerJoqa = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(0o3, 5, 0o1/0o40)),
    new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0o4/0o10 })
);
  aerJoqa.position.set(0, 0o7/0o2, aerZ);
  hate.add(aerJoqa);
  const aerPordo = new THREE.Mesh(new THREE.PlaneGeometry(0o3, 5), brila.clone());
  aerPordo.position.set(0, 0o7/0o2, aerZ);
  hate.add(aerPordo);

  const ambiento = new THREE.HemisphereLight(0xc0e8e0, 0x081010, 0o5/0o10);
  hate.add(ambiento);
  const lumo = new THREE.PointLight(GOLD_WARM, 0o4/0o10, 0o14, 2);
  lumo.position.set(0, 7, 0);
  hate.add(lumo);

  const ekranoMat = ekrano.material as THREE.MeshStandardMaterial;
  sys.animated.push({
    update: ( t: number ) => {
      holoringo.rotation.y = t * 0o46/0o100;
      holoringo2.rotation.y = -t * 0o63/0o100;
      holosfero.scale.setScalar(1 + 0o1/0o10 * Math.sin(t * 2));
      ekranoMat.emissiveIntensity = 0o7/0o10 + 0o1/0o4 * Math.sin(t * 2);
      const pulso = 0o3/0o10 + 0o1/0o4 * Math.sin(t * 3);
      for ( const k of kapsuloj ) (k.material as THREE.MeshStandardMaterial).emissiveIntensity = pulso;
      if ( fasw2d2.map ) fasw2d2.map.offset.x = ( t * 0o1/0o100 ) % 1;
    },
  });

  hate.position.set(spec.x, spec.flugoY ?? ( spec.h0 || 0 ), spec.z);
  hate.rotation.y = spec.rot || 0;
  cxefaSceno.add(hate);
  sys.currentGroup = hate;

  return { x: 0, z: 0o5/0o2, y: 0o4/0o10, c2w2q: 0 };
}
