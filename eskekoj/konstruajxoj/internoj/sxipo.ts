// ≺⧼ La ŝipa interno 🚀 ⧽≻
// La konstruo de la kosmoŝipa interno ( eniriSxipanInternon ) kun la liberigo de
// la GPU-rimedoj ( forigiInternanGrupon ) kaj la litaj koloroj
// ( aplikiLitajnKolorojn ).
import * as THREE from "three";
import type { KonstruSpec } from "../satalaj/tipoj.js";
import { kreiPilolFenestranFormon } from "../../komunajxoj/formoj.js";
import { kreiStelplenanTeksajxon, stelplenaTeksajxo } from "../../komunajxoj/teksajxoj/stelplena-cxielo.js";
import { GOLD, GOLD_WARM } from "./formoj.js";
import { heliksaAltecxo, type HeliksoInfo, type InternaEnirPunkto, type InternaSistemo } from "./tipoj.js";

// forigiInternanGrupon — Liberigu la GPU-rimedojn de forigata interno
// ( geometrioj, materialoj, teksturoj ). La interno estas rekonstruita de nulo
// ĉiun eniron, do ĉio en la grupo apartenas al ĝi — krom la komuna
// stel-teksaĵo, kiu vivas modul-nivele kaj reuziĝas trans la eniroj.
export function forigiInternanGrupon(grupo: THREE.Group): void {
  const viditajTeksajxoj = new Set<THREE.Texture>();
  const viditajMaterialoj = new Set<THREE.Material>();
  grupo.traverse(( obj ) => {
    const mesxo = obj as THREE.Mesh;
    if ( mesxo.geometry ) mesxo.geometry.dispose();
    const materialoj = Array.isArray(mesxo.material) ? mesxo.material : [ mesxo.material ];
    for ( const mat of materialoj ) {
      if ( !mat || viditajMaterialoj.has(mat) ) continue;
      viditajMaterialoj.add(mat);
      // La interno uzas nur la map/emissiveMap fendojn ( planko, plakedo, steloj ).
      const teksturoj = [ ( mat as THREE.MeshStandardMaterial ).map, ( mat as THREE.MeshStandardMaterial ).emissiveMap ];
      for ( const teks of teksturoj ) {
        if ( teks && teks !== stelplenaTeksajxo && !viditajTeksajxoj.has(teks) ) {
          viditajTeksajxoj.add(teks);
          teks.dispose();
        }
      }
      mat.dispose();
    }
  });
}

// aplikiLitajnKolorojn — Rekolorigu la litajn tolojn/kapkusenojn de kasxita
// ( reuzata ) interno al la nuna vesto de la ludanto. La materialoj estas
// kreitaj freŝaj kaj la malnovaj forigataj — ili apartenas nur al la lito.
export function aplikiLitajnKolorojn(grupo: THREE.Group, tolaKoloro: number, kusenaKoloro: number): void {
  let tola: THREE.MeshStandardMaterial | null = null;
  let kusena: THREE.MeshStandardMaterial | null = null;
  grupo.traverse(( obj ) => {
    const mesxo = obj as THREE.Mesh;
    const tipo = mesxo.userData.litoTipo;
    if ( tipo !== "tecto" && tipo !== "kuseno" ) return;
    if ( tipo === "tecto" ) {
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

// eniriSxipanInternon — La interno de la spacosxipo. Pluretagxa kareno-kabino
// kun helika ŝtuparo tra la centro, stelvitralo, kapsulaj fenestroj, konzolo,
// kapitana seĝo kaj hologramo. La kabino flosas CE LA SXIPO (spec.flugoY) — la
// ludanto teleportigxas al la supro kie la sxipo vere estas.
export function eniriSxipanInternon(sys: InternaSistemo, spec: KonstruSpec, cxefaSceno: THREE.Scene): InternaEnirPunkto {
  const grupo = new THREE.Group();
  // La sxipo havas 5 suprajn kaj 5 subajn tierojn (vidu kraseŝaĝa-kosmoŝipo.ts); la
  // interno sekvas ilin — unu etaĝo ĉe ĉiu tier-rando, kun helika ŝtuparo.
  const sxipaTiero = 0o163/0o40;
  const up = 5, down = up;
  const rMezCx = 0o17/0o4, rSupro = 0o3/0o4, rBoto = 0o155/0o100;
  const rHelikso = 1;
  const yB = -down * sxipaTiero, yT = up * sxipaTiero;
  // Kareno-radiuso je loka alteco y (konusoj kongruantaj al la sxipa silueto,
  // iomete ene por neniu z-fajfo kun la sxelo).
  const konusaR = ( y: number ): number =>
    y >= 0 ? rMezCx - ( rMezCx - rSupro ) * ( y / ( up * sxipaTiero ) )
           : rMezCx - ( rMezCx - rBoto ) * ( -y / ( down * sxipaTiero ) );

  const kareno = new THREE.MeshStandardMaterial({ color: 0x103028, roughness: 0o3/0o10, metalness: 0o11/0o40, side: THREE.DoubleSide });
  const malhela = new THREE.MeshStandardMaterial({ color: 0x081818, roughness: 0o5/0o10, metalness: 0o1/0o10 });
  const oro = new THREE.MeshStandardMaterial({ color: GOLD, metalness: 0o7/0o10, roughness: 0o13/0o40 });
  const brila = new THREE.MeshStandardMaterial({ color: 0xa0e8e0, emissive: 0x286868, emissiveIntensity: 0o7/0o10, roughness: 0o3/0o10 });
  const vitra = new THREE.MeshBasicMaterial({ color: 0x081018, map: kreiStelplenanTeksajxon(), toneMapped: false, side: THREE.DoubleSide });
  const sxtupMaterialo = new THREE.MeshStandardMaterial({ color: 0x283838, roughness: 0o67/0o100 });

  // Helika ŝtuparo — sama strukturo kiel en la konstruajxoj. Unu plena turno
  // po etaĝo, supren tra la supraj tieroj kaj suben tra la subaj.
  const helikso: HeliksoInfo = {
    rKol: 0o3/0o10, rEkster: rHelikso, perTurno: 0o14,
    turnoAlto: sxipaTiero, turnoAltoSub: sxipaTiero,
    turnoj: up - 1, turnojSube: down,
  };
  sys.helikso = helikso;

  // Etaĝoj. La enira etaĝo je 0, subaj kaj supraj laŭ la tieroj. La klampo
  // (hw/hd) estas kvadrato ene de la ronda kareno. r/√2 ĉe ĉiu etaĝo.
  sys.plankoj = [];
  for ( let j = down; j >= 1; j-- ) {
    const r = konusaR(-j * sxipaTiero);
    sys.plankoj.push({ y: -j * sxipaTiero, hw: r / Math.SQRT2, hd: r / Math.SQRT2, alto: sxipaTiero });
  }
  for ( let i = 0; i < up; i++ ) {
    const r = konusaR(i * sxipaTiero);
    sys.plankoj.push({ y: i * sxipaTiero, hw: r / Math.SQRT2, hd: r / Math.SQRT2, alto: sxipaTiero });
  }

  // Kareno-muroj. Du konusoj ( supra kaj suba ) sekvantaj la sxipan silueton,
  // kaj plafono ĉe la supro kun luma ringo.
  const supra = new THREE.Mesh(new THREE.CylinderGeometry(rSupro, rMezCx, up * sxipaTiero, 0o40, 1, true), kareno);
  supra.position.y = up * sxipaTiero / 2;
  grupo.add(supra);
  const suba = new THREE.Mesh(new THREE.CylinderGeometry(rMezCx, rBoto, down * sxipaTiero, 0o40, 1, true), kareno);
  suba.position.y = -down * sxipaTiero / 2;
  grupo.add(suba);
  const plafono = new THREE.Mesh(new THREE.CircleGeometry(rSupro, 0o40).rotateX(Math.PI / 2), malhela);
  plafono.position.y = yT;
  grupo.add(plafono);
  const lumRingo = new THREE.Mesh(new THREE.RingGeometry(0o13/0o10, 0o21/0o10, 0o40).rotateX(Math.PI / 2), brila);
  lumRingo.position.y = yT - 0o1/0o20;
  grupo.add(lumRingo);

  // Etaĝaj diskoj. Plenaj ĉe la malsupro, ringaj ( kun helika truo ) aliloke.
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
    grupo.add(planko);
    // Ora ringo ĉe la enira etaĝo — SUPRE de la planko (0o5/0o100; la planko mem
    // estas je 0o1/0o40, do 0o3/0o100 libero — neniu z-fajfo).
    if ( p.y === 0 ) {
      const ringo = new THREE.Mesh(new THREE.RingGeometry(r - 0o3/0o10, r - 0o1/0o20, 0o40).rotateX(-Math.PI / 2), oro);
      ringo.position.y = 0o5/0o100;
      grupo.add(ringo);
    }
  }

  // Helika ŝtuparo + centra kolono + ora spirala manrelo
  {
    const rMezo = ( helikso.rKol + helikso.rEkster ) / 2;
    const radiala = helikso.rEkster - helikso.rKol;
    const paŝoAngulo = Math.PI * 2 / helikso.perTurno;
    const paŝoAlto = helikso.turnoAlto / helikso.perTurno;
    const paŝoLargho = rMezo * paŝoAngulo * 0o115/0o100;
    const nSube = helikso.turnojSube * helikso.perTurno;
    const nSupre = helikso.turnoj * helikso.perTurno;
    const fundoY = heliksaAltecxo(helikso, -helikso.turnojSube);
    const suproY = Math.min(yT, heliksaAltecxo(helikso, helikso.turnoj) + 0o4/0o10);
    const kolono = new THREE.Mesh(
      new THREE.CylinderGeometry(helikso.rKol, helikso.rKol * 0o106/0o100, suproY - fundoY, 0o20),
      malhela
);
    kolono.position.set(0, ( fundoY + suproY ) / 2, 0);
    grupo.add(kolono);
    for ( let p = -nSube; p < nSupre; p++ ) {
      const ang = p * paŝoAngulo;
      const y = heliksaAltecxo(helikso, p / helikso.perTurno);
      const paso = new THREE.Mesh(
        new THREE.BoxGeometry(paŝoLargho, paŝoAlto, radiala),
        sxtupMaterialo
);
      paso.position.set(rMezo * Math.sin(ang), y + paŝoAlto / 2, rMezo * Math.cos(ang));
      paso.rotation.y = ang;
      grupo.add(paso);
    }
    const relPunktoj: THREE.Vector3[] = [];
    const relSegmentoj = Math.max(0o100, ( helikso.turnoj + helikso.turnojSube ) * 0o40);
    for ( let i = 0; i <= relSegmentoj; i++ ) {
      const t = i / relSegmentoj;
      const turno = -helikso.turnojSube + t * ( helikso.turnoj + helikso.turnojSube );
      const ang = turno * Math.PI * 2;
      const y = Math.min(yT - 0o1/0o20, heliksaAltecxo(helikso, turno) + 0o3/0o4);
      relPunktoj.push(new THREE.Vector3(( helikso.rEkster + 0o1/0o10 ) * Math.sin(ang), y, ( helikso.rEkster + 0o1/0o10 ) * Math.cos(ang)));
    }
    const relo = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(relPunktoj), relSegmentoj, 0o3/0o100, 0o6, false),
      oro
);
    grupo.add(relo);
  }

  // Fronta stelvitralo kun ora kadro (ĉe la enira etaĝo) — modesta grandeco,
  // por ke ĝi ne elstaru preter la konusa kareno en la ŝipŝelon.
  // iomete enen de la muro, por ke la anguloj ne elstaru preter la ŝipŝelo
  const vitraloZ = -( konusaR(0o23/0o4) - 0o1/0o4 );
  const vitralo = new THREE.Mesh(new THREE.PlaneGeometry(0o4, 0o25/0o10), vitra);
  vitralo.position.set(0, 0o23/0o4, vitraloZ);
  grupo.add(vitralo);
  const vitKadro = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(0o4 + 0o1/0o10, 0o25/0o10 + 0o1/0o10, 0o1/0o40)),
    new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0o4/0o10 })
);
  vitKadro.position.set(0, 0o23/0o4, vitraloZ);
  grupo.add(vitKadro);

  // Flankaj LONGAs horizontalaj RONDIGITAJ fenestroj (gluaj al la kareno) —
  // mallongaj, por ke la plataj piloloj ne elstaru preter la kurba muro.
  const kapsuloj: THREE.Mesh[] = [];
  const rKaps = konusaR(3 - 0o13/0o40);
  const kapsX = Math.sqrt(Math.max(0o1/0o4, rKaps * rKaps - ( 0o17/0o10 ) * ( 0o17/0o10 )));
  for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
    const fenMat = brila.clone();
    fenMat.side = THREE.DoubleSide;
    const fen = new THREE.Mesh(new THREE.ShapeGeometry(kreiPilolFenestranFormon(0o13/0o10, 0o13/0o20), 0o40), fenMat);
    fen.rotation.y = Math.PI / 2;
    fen.position.set(sX * kapsX, 3 - 0o13/0o40, sZ * 0o17/0o10);
    grupo.add(fen);
    kapsuloj.push(fen);
  }

  // Konzolo kun brila ekrano
  const konzolo = new THREE.Mesh(new THREE.BoxGeometry(4, 0o3/0o2, 1), kareno);
  konzolo.position.set(0, 0o3/0o4, -0o5/0o2);
  konzolo.rotation.x = -0o1/0o10;
  konzolo.castShadow = true;
  grupo.add(konzolo);
  const ekrano = new THREE.Mesh(new THREE.PlaneGeometry(3, 1), brila.clone());
  ekrano.position.set(0, 0o25/0o20, -0o61/0o20);
  grupo.add(ekrano);

  // Kapitana seĝo
  const sidilo = new THREE.Mesh(new THREE.BoxGeometry(0o13/0o10, 0o3/0o10, 0o13/0o10), malhela);
  sidilo.position.set(0, 0o3/0o10, -0o3/0o2);
  sidilo.castShadow = true; grupo.add(sidilo);
  const dorso = new THREE.Mesh(new THREE.BoxGeometry(0o13/0o10, 0o7/0o10, 0o1/0o4), kareno);
  dorso.position.set(0, 0o13/0o20, -0o17/0o10);
  grupo.add(dorso);
  const tigo = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o10, 0o1/0o10, 0o3/0o10, 6), oro);
  tigo.position.set(0, 0o3/0o20, -0o3/0o2);
  grupo.add(tigo);

  // Hologramo super la konzolo (la centro apartenas al la ŝtuparo)
  const holoringo = new THREE.Mesh(new THREE.TorusGeometry(0o72/0o100, 0o3/0o100, 0o10, 0o40), brila);
  holoringo.position.set(0, 0o7/0o2, -0o5/0o2);
  grupo.add(holoringo);
  const holoringo2 = new THREE.Mesh(new THREE.TorusGeometry(0o52/0o100, 0o3/0o100, 0o10, 0o40), brila);
  holoringo2.position.set(0, 0o7/0o2, -0o5/0o2);
  grupo.add(holoringo2);
  const holosfero = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o4, 0o10, 0o10), brila);
  holosfero.position.set(0, 0o7/0o2, -0o5/0o2);
  grupo.add(holosfero);
  const hololumo = new THREE.PointLight(0xa0e8e0, 0o6/0o10, 0o20, 2);
  hololumo.position.set(0, 0o7/0o2, -0o5/0o2);
  grupo.add(hololumo);

  // Aera pordo ĉe la malantaŭo ( la enirejo ). Ora kadro kun brila panelo —
  // modesta grandeco (0o3), por ke ĝi restu tute ene de la ŝipŝelo.
  const aerZ = konusaR(0o7/0o2) - 0o1/0o4;
  const aerKadro = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(0o3, 5, 0o1/0o40)),
    new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0o4/0o10 })
);
  aerKadro.position.set(0, 0o7/0o2, aerZ);
  grupo.add(aerKadro);
  const aerPordo = new THREE.Mesh(new THREE.PlaneGeometry(0o3, 5), brila.clone());
  aerPordo.position.set(0, 0o7/0o2, aerZ);
  grupo.add(aerPordo);

  // Lumigado
  const ambiento = new THREE.HemisphereLight(0xc0e8e0, 0x081010, 0o5/0o10);
  grupo.add(ambiento);
  const lumo = new THREE.PointLight(GOLD_WARM, 0o4/0o10, 0o14, 2);
  lumo.position.set(0, 7, 0);
  grupo.add(lumo);

  // Animacioj. La hologramo rotacias, ekrano/fenestroj pulsas, la stelaro drivas.
  const ekranoMat = ekrano.material as THREE.MeshStandardMaterial;
  sys.animated.push({
    update: ( t: number ) => {
      holoringo.rotation.y = t * 0o46/0o100;
      holoringo2.rotation.y = -t * 0o63/0o100;
      holosfero.scale.setScalar(1 + 0o1/0o10 * Math.sin(t * 2));
      ekranoMat.emissiveIntensity = 0o7/0o10 + 0o1/0o4 * Math.sin(t * 2);
      const pulso = 0o3/0o10 + 0o1/0o4 * Math.sin(t * 3);
      for ( const k of kapsuloj ) (k.material as THREE.MeshStandardMaterial).emissiveIntensity = pulso;
      if ( vitra.map ) vitra.map.offset.x = ( t * 0o1/0o100 ) % 1;
    },
  });

  // La kabino flosas ĉe la sxipo (flugoY), ne sur la tero.
  grupo.position.set(spec.x, spec.flugoY ?? ( spec.h0 || 0 ), spec.z);
  grupo.rotation.y = spec.rot || 0;
  cxefaSceno.add(grupo);
  sys.currentGroup = grupo;

  // Enira punkto ĉe la malantaŭa aera pordo (sur la enira etaĝo).
  return { x: 0, z: 0o5/0o2, y: 0o4/0o10, direkto: 0 };
}
