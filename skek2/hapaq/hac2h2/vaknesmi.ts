// ≺⧼ ſɟɹ ֭ſɭɹ ʌ ſɭˬᴜȝ 🚀 ⧽≻
import * as THREE from "three";
import type { VepaqSpec } from "../satalaj/hahunaq.js";
import { kf2Cawez2Qoxa } from "../../x2x2q/haqoxa.js";
import { kf2Sexil2hanCac2sex, sexil2haCac2sex } from "../../x2x2q/cac2sex/sexil2ha-cana.js";
import { SXIPANIVELOJ, SXIPATIERO } from "../krasesxagxa-kosmosxipo.js";
import { GOLD, GOLDWARM } from "./haqoxa.js";
import { bohoAltecxo, type BohoInfo, type InternaEnirN2k, type C2h2Kanta } from "./hahunaq.js";

export function h2liInternanHate(hate2: THREE.Group): void {
  const viditajCac2sex = new Set<THREE.Texture>();
  const viditajHapukek = new Set<THREE.Material>();
  hate2.traverse(( obj ) => {
    const mesxo = obj as THREE.Mesh;
    if ( mesxo.geometry ) mesxo.geometry.dispose();
    const pukek = Array.isArray(mesxo.material) ? mesxo.material : [ mesxo.material ];
    for ( const mat of pukek ) {
      if ( !mat || viditajHapukek.has(mat) ) continue;
      viditajHapukek.add(mat);
      const teksturoj = [ ( mat as THREE.MeshStandardMaterial ).map, ( mat as THREE.MeshStandardMaterial ).emissiveMap ];
      for ( const teks of teksturoj ) {
        if ( teks && teks !== sexil2haCac2sex && !viditajCac2sex.has(teks) ) {
          viditajCac2sex.add(teks);
          teks.dispose();
        }
      }
      mat.dispose();
    }
  });
}

export function aplikiLitajnHaweh2(hate2: THREE.Group, tolaWeh2: number, kusenaWeh2: number): void {
  let tola: THREE.MeshStandardMaterial | null = null;
  let kusena: THREE.MeshStandardMaterial | null = null;
  hate2.traverse(( obj ) => {
    const mesxo = obj as THREE.Mesh;
    const hunaq = mesxo.userData.camutsaHunaq;
    if ( hunaq !== "tecto" && hunaq !== "kuseno" ) return;
    if ( hunaq === "tecto" ) {
      if ( !tola ) tola = new THREE.MeshStandardMaterial({ color: tolaWeh2, roughness: 0o6/0o10 });
      if ( mesxo.material !== tola ) (mesxo.material as THREE.Material).dispose();
      mesxo.material = tola;
    } else {
      if ( !kusena ) kusena = new THREE.MeshStandardMaterial({ color: kusenaWeh2, roughness: 0o6/0o10 });
      if ( mesxo.material !== kusena ) (mesxo.material as THREE.Material).dispose();
      mesxo.material = kusena;
    }
  });
}

export function eniriSxipanC2h2(sys: C2h2Kanta, spec: VepaqSpec, gelesKagani: THREE.Scene): InternaEnirN2k {
  const hate2 = new THREE.Group();
  const vaknesmiB6k61oL6da = SXIPATIERO;
  const up = SXIPANIVELOJ, down = up;
  const rMezCx = 0o17/0o4, rTeru = 0o3/0o4, rBoto = 0o155/0o100;
  const rBoho = 1;
  const yB = -down * vaknesmiB6k61oL6da, yT = up * vaknesmiB6k61oL6da;
  const konusaR = ( y: number ): number =>
    y >= 0 ? rMezCx - ( rMezCx - rTeru ) * ( y / ( up * vaknesmiB6k61oL6da ) )
           : rMezCx - ( rMezCx - rBoto ) * ( -y / ( down * vaknesmiB6k61oL6da ) );

  const kareno = new THREE.MeshStandardMaterial({ color: 0x103028, roughness: 0o3/0o10, metalness: 0o11/0o40, side: THREE.DoubleSide });
  const huna = new THREE.MeshStandardMaterial({ color: 0x081818, roughness: 0o5/0o10, metalness: 0o1/0o10 });
  const oro = new THREE.MeshStandardMaterial({ color: GOLD, metalness: 0o7/0o10, roughness: 0o13/0o40 });
  const brila = new THREE.MeshStandardMaterial({ color: 0xa0e8e0, emissive: 0x286868, emissiveIntensity: 0o7/0o10, roughness: 0o3/0o10 });
  const glaso = new THREE.MeshBasicMaterial({ color: 0x081018, map: kf2Sexil2hanCac2sex(), toneMapped: false, side: THREE.DoubleSide });
  const sxtupPukek = new THREE.MeshStandardMaterial({ color: 0x283838, roughness: 0o67/0o100 });

  const boho: BohoInfo = {
    rKol: 0o3/0o10, rEkster: rBoho, perTurno: 0o14,
    turnoL6da: vaknesmiB6k61oL6da, turnoL6daSub: vaknesmiB6k61oL6da,
    hab6n: up - 1, hab6nSube: down,
  };
  sys.boho = boho;

  sys.hakozu = [];
  for ( let j = down; j >= 1; j-- ) {
    const r = konusaR(-j * vaknesmiB6k61oL6da);
    sys.hakozu.push({ y: -j * vaknesmiB6k61oL6da, hw: r / Math.SQRT2, hd: r / Math.SQRT2, l6da: vaknesmiB6k61oL6da });
  }
  for ( let i = 0; i < up; i++ ) {
    const r = konusaR(i * vaknesmiB6k61oL6da);
    sys.hakozu.push({ y: i * vaknesmiB6k61oL6da, hw: r / Math.SQRT2, hd: r / Math.SQRT2, l6da: vaknesmiB6k61oL6da });
  }

  const teru = new THREE.Mesh(new THREE.CylinderGeometry(rTeru, rMezCx, up * vaknesmiB6k61oL6da, 0o40, 1, true), kareno);
  teru.position.y = up * vaknesmiB6k61oL6da / 2;
  hate2.add(teru);
  const psaz = new THREE.Mesh(new THREE.CylinderGeometry(rMezCx, rBoto, down * vaknesmiB6k61oL6da, 0o40, 1, true), kareno);
  psaz.position.y = -down * vaknesmiB6k61oL6da / 2;
  hate2.add(psaz);
  const plafono = new THREE.Mesh(new THREE.CircleGeometry(rTeru, 0o40).rotateX(Math.PI / 2), huna);
  plafono.position.y = yT;
  hate2.add(plafono);
  const lumT2q2 = new THREE.Mesh(new THREE.RingGeometry(0o13/0o10, 0o21/0o10, 0o40).rotateX(Math.PI / 2), brila);
  lumT2q2.position.y = yT - 0o1/0o20;
  hate2.add(lumT2q2);

  for ( const p of sys.hakozu ) {
    const r = p.hw * Math.SQRT2;
    const estasMalteru = p.y === yB;
    const kozu = new THREE.Mesh(
      estasMalteru
        ? new THREE.CircleGeometry(r, 0o40).rotateX(-Math.PI / 2)
        : new THREE.RingGeometry(rBoho, Math.max(rBoho + 0o1/0o20, r - 0o1/0o40), 0o40).rotateX(-Math.PI / 2),
      huna
);
    kozu.position.y = p.y + 0o1/0o40;
    hate2.add(kozu);
    if ( p.y === 0 ) {
      const c2q = new THREE.Mesh(new THREE.RingGeometry(r - 0o3/0o10, r - 0o1/0o20, 0o40).rotateX(-Math.PI / 2), oro);
      c2q.position.y = 0o5/0o100;
      hate2.add(c2q);
    }
  }

  {
    const rMezo = ( boho.rKol + boho.rEkster ) / 2;
    const radiala = boho.rEkster - boho.rKol;
    const tonaTafkaq = Math.PI * 2 / boho.perTurno;
    const tonaL6da = boho.turnoL6da / boho.perTurno;
    const tonaSefini = rMezo * tonaTafkaq * 0o115/0o100;
    const nSube = boho.hab6nSube * boho.perTurno;
    const nTik = boho.hab6n * boho.perTurno;
    const fundoY = bohoAltecxo(boho, -boho.hab6nSube);
    const teruY = Math.min(yT, bohoAltecxo(boho, boho.hab6n) + 0o4/0o10);
    const cel2nu = new THREE.Mesh(
      new THREE.CylinderGeometry(boho.rKol, boho.rKol * 0o106/0o100, teruY - fundoY, 0o20),
      huna
);
    cel2nu.position.set(0, ( fundoY + teruY ) / 2, 0);
    hate2.add(cel2nu);
    for ( let p = -nSube; p < nTik; p++ ) {
      const ang = p * tonaTafkaq;
      const y = bohoAltecxo(boho, p / boho.perTurno);
      const vepat6ni = new THREE.Mesh(
        new THREE.BoxGeometry(tonaSefini, tonaL6da, radiala),
        sxtupPukek
);
      vepat6ni.position.set(rMezo * Math.sin(ang), y + tonaL6da / 2, rMezo * Math.cos(ang));
      vepat6ni.rotation.y = ang;
      hate2.add(vepat6ni);
    }
    const relHan2k: THREE.Vector3[] = [];
    const relHas2nasce = Math.max(0o100, ( boho.hab6n + boho.hab6nSube ) * 0o40);
    for ( let i = 0; i <= relHas2nasce; i++ ) {
      const t = i / relHas2nasce;
      const b6n = -boho.hab6nSube + t * ( boho.hab6n + boho.hab6nSube );
      const ang = b6n * Math.PI * 2;
      const y = Math.min(yT - 0o1/0o20, bohoAltecxo(boho, b6n) + 0o3/0o4);
      relHan2k.push(new THREE.Vector3(( boho.rEkster + 0o1/0o10 ) * Math.sin(ang), y, ( boho.rEkster + 0o1/0o10 ) * Math.cos(ang)));
    }
    const relo = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(relHan2k), relHas2nasce, 0o3/0o100, 0o6, false),
      oro
);
    hate2.add(relo);
  }

  const fasw2d2loZ = -( konusaR(0o23/0o4) - 0o1/0o4 );
  const fasw2d2lo = new THREE.Mesh(new THREE.PlaneGeometry(0o4, 0o25/0o10), glaso);
  fasw2d2lo.position.set(0, 0o23/0o4, fasw2d2loZ);
  hate2.add(fasw2d2lo);
  const vitJoqa = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(0o4 + 0o1/0o10, 0o25/0o10 + 0o1/0o10, 0o1/0o40)),
    new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0o4/0o10 })
);
  vitJoqa.position.set(0, 0o23/0o4, fasw2d2loZ);
  hate2.add(vitJoqa);

  const kapsuloj: THREE.Mesh[] = [];
  const rKaps = konusaR(3 - 0o13/0o40);
  const kapsX = Math.sqrt(Math.max(0o1/0o4, rKaps * rKaps - ( 0o17/0o10 ) * ( 0o17/0o10 )));
  for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
    const fenMat = brila.clone();
    fenMat.side = THREE.DoubleSide;
    const fen = new THREE.Mesh(new THREE.ShapeGeometry(kf2Cawez2Qoxa(0o13/0o10, 0o13/0o20), 0o40), fenMat);
    fen.rotation.y = Math.PI / 2;
    fen.position.set(sX * kapsX, 3 - 0o13/0o40, sZ * 0o17/0o10);
    hate2.add(fen);
    kapsuloj.push(fen);
  }

  const konzolo = new THREE.Mesh(new THREE.BoxGeometry(4, 0o3/0o2, 1), kareno);
  konzolo.position.set(0, 0o3/0o4, -0o5/0o2);
  konzolo.rotation.x = -0o1/0o10;
  konzolo.castShadow = true;
  hate2.add(konzolo);
  const ekrano = new THREE.Mesh(new THREE.PlaneGeometry(3, 1), brila.clone());
  ekrano.position.set(0, 0o25/0o20, -0o61/0o20);
  hate2.add(ekrano);

  const sidilo = new THREE.Mesh(new THREE.BoxGeometry(0o13/0o10, 0o3/0o10, 0o13/0o10), huna);
  sidilo.position.set(0, 0o3/0o10, -0o3/0o2);
  sidilo.castShadow = true; hate2.add(sidilo);
  const kaqani = new THREE.Mesh(new THREE.BoxGeometry(0o13/0o10, 0o7/0o10, 0o1/0o4), kareno);
  kaqani.position.set(0, 0o13/0o20, -0o17/0o10);
  hate2.add(kaqani);
  const tigo = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o10, 0o1/0o10, 0o3/0o10, 6), oro);
  tigo.position.set(0, 0o3/0o20, -0o3/0o2);
  hate2.add(tigo);

  const holoringo = new THREE.Mesh(new THREE.TorusGeometry(0o72/0o100, 0o3/0o100, 0o10, 0o40), brila);
  holoringo.position.set(0, 0o7/0o2, -0o5/0o2);
  hate2.add(holoringo);
  const holoringo2 = new THREE.Mesh(new THREE.TorusGeometry(0o52/0o100, 0o3/0o100, 0o10, 0o40), brila);
  holoringo2.position.set(0, 0o7/0o2, -0o5/0o2);
  hate2.add(holoringo2);
  const holosfero = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o4, 0o10, 0o10), brila);
  holosfero.position.set(0, 0o7/0o2, -0o5/0o2);
  hate2.add(holosfero);
  const hololumo = new THREE.PointLight(0xa0e8e0, 0o6/0o10, 0o20, 2);
  hololumo.position.set(0, 0o7/0o2, -0o5/0o2);
  hate2.add(hololumo);

  const aerZ = konusaR(0o7/0o2) - 0o1/0o4;
  const aerJoqa = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(0o3, 5, 0o1/0o40)),
    new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0o4/0o10 })
);
  aerJoqa.position.set(0, 0o7/0o2, aerZ);
  hate2.add(aerJoqa);
  const aerKev = new THREE.Mesh(new THREE.PlaneGeometry(0o3, 5), brila.clone());
  aerKev.position.set(0, 0o7/0o2, aerZ);
  hate2.add(aerKev);

  const ambiento = new THREE.HemisphereLight(0xc0e8e0, 0x081010, 0o5/0o10);
  hate2.add(ambiento);
  const tsije = new THREE.PointLight(GOLDWARM, 0o4/0o10, 0o14, 2);
  tsije.position.set(0, 7, 0);
  hate2.add(tsije);

  const ekranoMat = ekrano.material as THREE.MeshStandardMaterial;
  sys.animated.push({
    update: ( t: number ) => {
      holoringo.rotation.y = t * 0o46/0o100;
      holoringo2.rotation.y = -t * 0o63/0o100;
      holosfero.scale.setScalar(1 + 0o1/0o10 * Math.sin(t * 2));
      ekranoMat.emissiveIntensity = 0o7/0o10 + 0o1/0o4 * Math.sin(t * 2);
      const pulso = 0o3/0o10 + 0o1/0o4 * Math.sin(t * 3);
      for ( const k of kapsuloj ) (k.material as THREE.MeshStandardMaterial).emissiveIntensity = pulso;
      if ( glaso.map ) glaso.map.offset.x = ( t * 0o1/0o100 ) % 1;
    },
  });

  hate2.position.set(spec.x, spec.flugoY ?? ( spec.h0 || 0 ), spec.z);
  hate2.rotation.y = spec.rot || 0;
  gelesKagani.add(hate2);
  sys.currentGroup = hate2;

  return { x: 0, z: 0o5/0o2, y: 0o4/0o10, c2w2q: 0 };
}
