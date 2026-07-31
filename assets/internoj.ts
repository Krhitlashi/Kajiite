// Interna modulo — pluretagxaj internaj spacoj por piediri tra ili
// Rezajnita por kongrui al la malhel-verda/oro zigurata estetiko de Priskribo.md.
//   • Malhel-pinaj muroj (#0b1a14), varmaj oraj kadroj (#d9b36a)
//   • Nesimetraj rondigitaj anguloj (32px/16px)
//   • Dikaj oraj angulaj kadroj kiuj flairas eksteren supre
//   • Longaj horizontalaj rondigitaj fenestroj
//   • Rondigita trapeza porda arko sur teretaĝo
//   • Varma atmosfera ora lumigado
//   • Vertikalaj skriptplatoj de malsupro al supro
//   • Minimalismaj rondangulaj mebloj kun oraj akcentoj

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

// Dezajnaj konstantaj valoroj
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

// Helpilo por segmentita arkformo ( por pordo kaj fenestroj )
function kreiArkFormon( radiuso: number, segmentoj: number, largho: number ): THREE.BufferGeometry {
  const g = new THREE.BufferGeometry();
  const verts: number[] = [];
  const idx: number[] = [];
  for ( let i = 0; i <= segmentoj; i++ ) {
    const ang = (i / segmentoj) * Math.PI;
    const x = Math.cos(ang) * radiuso;
    const y = Math.sin(ang) * radiuso;
    // Antaŭa flanko
    verts.push(x, y, largho / 2);
    // Malantaŭa flanko
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

function aldoniInternanMeblaron(
  grupo: THREE.Group,
  tipo: string,
  hw: number,
  hd: number,
  y: number,
  tieroAlto: number,
  etapo: number,
  niveloj: number,
  lignaMaterialo: THREE.MeshStandardMaterial,
  metalaMaterialo: THREE.MeshStandardMaterial,
  helaMaterialo: THREE.MeshStandardMaterial
): void {
  const aldoniSkatolon = ( largho: number, alto: number, profundo: number, x: number, z: number, materialo: THREE.Material ) => {
    const objekto = new THREE.Mesh( new THREE.BoxGeometry( largho, alto, profundo ), materialo );
    objekto.position.set( x, y + alto / 2, z );
    objekto.castShadow = true;
    grupo.add( objekto );
  };

  const aldoniSferon = ( radiuso: number, x: number, alto: number, z: number, materialo: THREE.Material ) => {
    const objekto = new THREE.Mesh( new THREE.SphereGeometry( radiuso, 0o10, 0o6 ), materialo );
    objekto.position.set( x, y + alto, z );
    objekto.castShadow = true;
    grupo.add( objekto );
  };

  if ( tipo === "domo" ) {
    const benkaLargho = Math.min( hw * 2 - 2, 7/2 );
    aldoniSkatolon( benkaLargho, 3/8, 3/8, 0, -hd + 4/8, lignaMaterialo );
    aldoniSkatolon( benkaLargho, 3/8, 3/8, 0, hd - 4/8, lignaMaterialo );
    aldoniSkatolon( 5/8, 1/8, 5/8, 0, 0, metalaMaterialo );
    aldoniSkatolon( Math.min( hw, 3/2 ), 3/16, 11/8, 0, 0, lignaMaterialo );
    aldoniSkatolon( 7/8, 1/16, 5/8, 0, -1/8, helaMaterialo );
    aldoniSkatolon( 5/8, tieroAlto * 4/8, 1/8, -hw + 5/16, -hd + 5/16, lignaMaterialo );
  } else if ( tipo === "turo" ) {
    const bretaLargho = Math.min( hw * 2 - 1, 5/2 );
    aldoniSkatolon( bretaLargho, 1/16, 4/8, 0, -hd + 5/16, lignaMaterialo );
    aldoniSkatolon( 7/8, 3/16, 7/8, 0, 0, metalaMaterialo );
    aldoniSferon( 3/16, 0, tieroAlto * 5/8, 0, helaMaterialo );
    for ( const sX of [ -1, 1 ] ) {
      aldoniSkatolon( 1/8, tieroAlto * 4/8, 1/8, sX * ( hw - 5/16 ), -hd + 3/8, metalaMaterialo );
    }
  } else if ( tipo === "stacio" ) {
    const benkaLargho = Math.min( hw * 2 - 1, 3 );
    aldoniSkatolon( benkaLargho, 3/8, 3/8, 0, -hd + 4/8, helaMaterialo );
    aldoniSkatolon( benkaLargho, 3/8, 3/8, 0, hd - 4/8, helaMaterialo );
    aldoniSkatolon( 3/8, 5/8, 5/8, -hw + 4/8, 0, metalaMaterialo );
    aldoniSkatolon( 3/8, 5/8, 5/8, hw - 4/8, 0, metalaMaterialo );
  } else if ( tipo === "sanktejo" && etapo === 0 ) {
    const altaro = new THREE.Mesh( new THREE.CylinderGeometry( 5/8, 6/8, 4/8, 0o12 ), metalaMaterialo );
    altaro.position.set( 0, y + 2/8, 0 );
    altaro.castShadow = true;
    grupo.add( altaro );
    const brilo = new THREE.Mesh( new THREE.SphereGeometry( 3/8, 0o12, 0o10 ), helaMaterialo );
    brilo.position.set( 0, y + tieroAlto * 5/8, 0 );
    grupo.add( brilo );
    const lumo = new THREE.PointLight( GOLD_WARM, 3/8, 0o20, 2 );
    lumo.position.set( 0, y + tieroAlto * 5/8, 0 );
    grupo.add( lumo );
  } else if ( tipo === "manĝejo" && etapo === 0 ) {
    aldoniSkatolon( Math.min( hw * 2 - 1, 5 ), 3/8, 3/8, 0, -hd + 4/8, lignaMaterialo );
  }

  if ( niveloj > 1 && etapo === niveloj - 1 ) {
    aldoniSkatolon( Math.min( hw * 2 - 1, 4 ), 1/16, 3/8, 0, -hd + 5/16, metalaMaterialo );
  }
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
  // Forigu la antauxan internon
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

  // Materialoj
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
    color: 0x0a1a18, emissive: 0x688888, emissiveIntensity: 3/16,
    roughness: 3/16, metalness: 3/16,
    transparent: true, opacity: 7/8,
  });
  const sxtupMaterialo = new THREE.MeshStandardMaterial({
    color: 0x3a3a32, roughness: 55/64,
  });
  // Komunaj materialoj por dekoracioj
  const oraBazaMaterialo = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 3/8 });
  const oraKadroMaterialo = new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 4/8 });
  const oraMullionoMaterialo = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 2/8 });
  const oraNazoMaterialo = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 3/8 });
  const oraTrimMaterialo = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 3/8 });
  const oraCxapoMaterialo = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 4/8 });

  const group = new THREE.Group();
  const lignaMaterialo = new THREE.MeshStandardMaterial({ color: 0x54402e, roughness: 7/8 });
  const metalaMaterialo = new THREE.MeshStandardMaterial({ color: 0x806838, metalness: 5/8, roughness: 5/8 });
  const helaMaterialo = new THREE.MeshStandardMaterial({ color: 0xb8d8c8, emissive: 0x385848, emissiveIntensity: 4/8, roughness: 4/8 });

  // Konstruu cxiun etaĝon kun apartaj funkciaj mebloj

  for ( let et = 0; et < niveloj; et++ ) {
    const y = et * tieroAlto;
    const redukto = et * 6/5;
    const hw = Math.max(3/2, w / 2 - redukto);
    const hd = Math.max(3/2, d / 2 - redukto);

    sys.plankoj.push({ y, hw, hd, alto: tieroAlto });

    // Planko
    const planko = new THREE.Mesh(
      new THREE.PlaneGeometry(hw * 2, hd * 2).rotateX(-Math.PI / 2),
      plankoMaterialo
    );
    planko.position.set(0, y + 1/32, 0);
    group.add(planko);

    // Ora planka bordero kun nesimetriaj rondigitaj anguloj
    // Mallongaj oraj strioj ĉe la kvar plankaj anguloj
    for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
      // L-forma angula krampo el du maldikaj skatoloj
      for ( const [dx, dz, lx, lz] of [ [ 1, 0, 3/8, 1/16 ], [ 0, 1, 1/16, 3/8 ] ] as [number, number, number, number][] ) {
        const b = new THREE.Mesh(new THREE.BoxGeometry(lx, 1/32, lz), oraBazaMaterialo);
        b.position.set( sX * ( hw - 1/8 * dx ), y + 2/32, sZ * ( hd - 1/8 * dz ));
        group.add(b);
      }
    }

    // Plafono krom cxe la supra etagxo
    if ( et < niveloj - 1 ) {
      const plafono = new THREE.Mesh(
        new THREE.PlaneGeometry(hw * 2, hd * 2).rotateX(Math.PI / 2),
        plafonaMaterialo
      );
      plafono.position.set(0, y + tieroAlto - 1/32, 0);
      group.add(plafono);
    }

    // Antauxa muro kun rondigita pordo en la teretaĝo
    if ( et === 0 ) {
      // Porda larĝo kaj alto kun arka supro
      const pordLargho = 3/2;
      const pordAlto = tieroAlto * 5/8;
      const arkRadiuso = pordLargho / 2;
      const arkSegmentoj = 0o10;

      // Muro maldekstre de la pordo
      konstruiMuron(group, -hw, 0, hw - pordLargho / 2, y, tieroAlto, 3/16, muraMaterialo, 0, hd);
      // Muro dekstre de la pordo
      konstruiMuron(group, pordLargho / 2, 0, hw - pordLargho / 2, y, tieroAlto, 3/16, muraMaterialo, 0, hd);
      // Muro super la pordo
      konstruiMuron(group, -pordLargho / 2, pordAlto, pordLargho, y, tieroAlto - pordAlto, 3/16, muraMaterialo, 0, hd);

      // Arka porda kapo kun rondigita trapeza formo
      const arkGeo = kreiArkFormon(arkRadiuso, arkSegmentoj, 3/16);
      const ark = new THREE.Mesh(arkGeo, muraMaterialo);
      ark.position.set(0, y + pordAlto, hd);
      group.add(ark);

      // Ora pordokadro kun arka bordero
      const kadroGeo = new THREE.EdgesGeometry(
        new THREE.BoxGeometry( pordLargho + 1/8, pordAlto + 1/16, 1/32 )
      );
      const kadroLinio = new THREE.LineSegments(
        kadroGeo,
        new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 4/8 })
      );
      kadroLinio.position.set( 0, y + pordAlto / 2, hd + 1/32 );
      group.add(kadroLinio);

      // Malgranda ora sojlo
      const sojlo = new THREE.Mesh(
        new THREE.BoxGeometry( pordLargho + 1/8, 2/32, 3/16 ),
        new THREE.MeshStandardMaterial({ color: GOLD, roughness: 19/64, metalness: 45/64 })
      );
      sojlo.position.set(0, y, hd - 1/16);
      group.add(sojlo);
    } else {
      // Plena muro sur la supraj etagxoj
      konstruiMuron(group, -hw, 0, hw * 2, y, tieroAlto, 3/16, muraMaterialo, 0, hd);
    }

    // Malantaŭa muro kun longa horizontala fenestro
    const fenLargho = Math.min( hw * 2 - 1, 5 );
    const fenAlto = tieroAlto * 2/8;
    const fenY = y + tieroAlto * 4/8 - fenAlto / 2;
    // Muraj segmentoj ĉirkaŭ la fenestro
    konstruiMuron(group, -hw, 0, (hw * 2 - fenLargho) / 2, y, tieroAlto, 3/16, muraMaterialo, 0, -hd);
    konstruiMuron(group, (hw * 2 - fenLargho) / 2 + fenLargho, 0, (hw * 2 - fenLargho) / 2, y, tieroAlto, 3/16, muraMaterialo, 0, -hd);
    konstruiMuron(group, -hw, 0, hw * 2, y, fenY - y, 3/16, muraMaterialo, 0, -hd);
    konstruiMuron(group, -hw, fenY + fenAlto - y, hw * 2, y, tieroAlto - fenY - fenAlto, 3/16, muraMaterialo, 0, -hd);

    // Longa horizontala rondigita fenestro
    const fenSegmentoj = 0o14;
    const fenArkRadiuso = fenAlto / 2;
    // Fenestra panelo
    const fenGeo = new THREE.PlaneGeometry(fenLargho, fenAlto);
    const fen = new THREE.Mesh(fenGeo, fenestraMaterialo);
    fen.position.set( 0, fenY + fenAlto / 2, -hd + 1/32 );
    group.add(fen);
    // Ora fenestrokadro
    const fenKadro = new THREE.LineSegments(
      new THREE.EdgesGeometry( new THREE.BoxGeometry( fenLargho + 1/8, fenAlto + 1/8, 1/32 )),
      oraKadroMaterialo
    );
    fenKadro.position.set( 0, fenY + fenAlto / 2, -hd + 1/32 );
    group.add(fenKadro);
    // Vertikalaj oraj fenestrokrucoj
    for ( let m = -1; m <= 1; m += 2 ) {
      const mul = new THREE.Mesh(
        new THREE.BoxGeometry( 1/32, fenAlto - 1/8, 1/16 ),
        oraMullionoMaterialo
      );
      mul.position.set( m * fenLargho * 2/8, fenY + fenAlto / 2, -hd + 1/32 );
      group.add(mul);
    }

    // Maldekstra muro kun fenestro laŭ la Z-akso
    konstruiMuron(group, -hd, 0, (hd * 2 - fenLargho) / 2, y, tieroAlto, 3/16, muraMaterialo, -hw, 0, Math.PI / 2);
    konstruiMuron(group, (hd * 2 - fenLargho) / 2 + fenLargho, 0, (hd * 2 - fenLargho) / 2, y, tieroAlto, 3/16, muraMaterialo, -hw, 0, Math.PI / 2);
    konstruiMuron(group, -hd, 0, hd * 2, y, fenY - y, 3/16, muraMaterialo, -hw, 0, Math.PI / 2);
    konstruiMuron(group, -hd, fenY + fenAlto - y, hd * 2, y, tieroAlto - fenY - fenAlto, 3/16, muraMaterialo, -hw, 0, Math.PI / 2);
    const fenL = new THREE.Mesh(new THREE.PlaneGeometry(fenAlto, fenLargho), fenestraMaterialo);
    fenL.position.set( -hw + 1/32, fenY + fenAlto / 2, 0 );
    fenL.rotation.y = Math.PI / 2;
    group.add(fenL);
    const fenLk = new THREE.LineSegments(
      new THREE.EdgesGeometry( new THREE.BoxGeometry( 1/32, fenAlto + 1/8, fenLargho + 1/8 )),
      oraKadroMaterialo
    );
    fenLk.position.set( -hw + 1/32, fenY + fenAlto / 2, 0 );
    group.add(fenLk);

    // Dekstra muro kun fenestro laŭ la Z-akso
    konstruiMuron(group, -hd, 0, (hd * 2 - fenLargho) / 2, y, tieroAlto, 3/16, muraMaterialo, hw, 0, -Math.PI / 2);
    konstruiMuron(group, (hd * 2 - fenLargho) / 2 + fenLargho, 0, (hd * 2 - fenLargho) / 2, y, tieroAlto, 3/16, muraMaterialo, hw, 0, -Math.PI / 2);
    konstruiMuron(group, -hd, 0, hd * 2, y, fenY - y, 3/16, muraMaterialo, hw, 0, -Math.PI / 2);
    konstruiMuron(group, -hd, fenY + fenAlto - y, hd * 2, y, tieroAlto - fenY - fenAlto, 3/16, muraMaterialo, hw, 0, -Math.PI / 2);
    const fenR = new THREE.Mesh(new THREE.PlaneGeometry(fenAlto, fenLargho), fenestraMaterialo);
    fenR.position.set( hw - 1/32, fenY + fenAlto / 2, 0 );
    fenR.rotation.y = -Math.PI / 2;
    group.add(fenR);
    const fenRk = new THREE.LineSegments(
      new THREE.EdgesGeometry( new THREE.BoxGeometry( 1/32, fenAlto + 1/8, fenLargho + 1/8 )),
      oraKadroMaterialo
    );
    fenRk.position.set( hw - 1/32, fenY + fenAlto / 2, 0 );
    group.add(fenRk);

    // Dikaj oraj angulaj kolonoj kun supra ekflaro
    const kolDikeco = 7/32;
    const kolAlto = tieroAlto;
    for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
      // Ĉefa kolona korpo
      const kol = new THREE.Mesh(
        new THREE.BoxGeometry(kolDikeco, kolAlto, kolDikeco),
        kadraMaterialo
      );
      kol.position.set(sX * (hw - kolDikeco / 2), y + kolAlto / 2, sZ * (hd - kolDikeco / 2));
      group.add(kol);

      // Supra iom pli larĝa kapo
      const flara = new THREE.Mesh(
        new THREE.BoxGeometry( kolDikeco * 13/8, kolAlto * 1/32, kolDikeco * 13/8 ),
        kadraMaterialo
      );
      flara.position.set( sX * ( hw - kolDikeco / 2 ), y + kolAlto - kolAlto * 1/32, sZ * ( hd - kolDikeco / 2 ));
      group.add(flara);

      // Malgranda ora bazo
      const bazo = new THREE.Mesh(
        new THREE.BoxGeometry( kolDikeco * 5/4, kolAlto * 1/32, kolDikeco * 5/4 ),
        new THREE.MeshStandardMaterial({ color: GOLD_SOFT, metalness: 5/8, roughness: 11/32 })
      );
      bazo.position.set( sX * ( hw - kolDikeco / 2 ), y + kolAlto * 1/64, sZ * ( hd - kolDikeco / 2 ));
      group.add(bazo);
    }

    // Muraj lampoj kun varma ora brilo
    const lampNombro = Math.max( 1, Math.floor( hw ) - 1 );
    for ( let i = 0; i < lampNombro; i++ ) {
      const lx = -hw + ( i + 1 ) * hw * 2 / ( lampNombro + 1 );
      // Ora krampo
      const lampBazo = new THREE.Mesh(
        new THREE.BoxGeometry( 1/8, 1/8, 1/8 ),
        kadraMaterialo
      );
      lampBazo.position.set( lx, y + tieroAlto * 5/8, hd - 1/32 );
      group.add(lampBazo);
      // Varma punktolumo
      const lumo = new THREE.PointLight( GOLD_WARM, 2/8, 5, 2 );
      lumo.position.set( lx, y + tieroAlto * 5/8, hd - 3/8 );
      group.add(lumo);
      // Malgranda brila sfero
      const glo = new THREE.Mesh(
        new THREE.SphereGeometry( 1/16, 0o10, 0o6 ),
        new THREE.MeshBasicMaterial({ color: GOLD_WARM, transparent: true, opacity: 3/16 })
      );
      glo.position.set( lx, y + tieroAlto * 5/8, hd - 3/8 );
      group.add(glo);
    }

    // Vertikala skribplato sur la antauxa muro
    if ( et === 0 && spec.name ) {
      const plakedInk = "#" + GOLD.toString(16).padStart(6, "0");
      const plakedo = generiSkriptanTeksajxon({
        seedName: spec.name, w: 0o120, h: 0o300, ink: plakedInk, bg: "#" + DEEP.toString(16).padStart(6, "0"),
      });
      // Alta vertikala skribplato
      const surfaco = new THREE.Mesh(
        new THREE.PlaneGeometry( 4/5, 13/8 ),
        new THREE.MeshStandardMaterial({ map: plakedo, transparent: true, roughness: 19/64, metalness: 45/64 })
      );
      surfaco.position.set( 0, y + tieroAlto * 3/8, hd - 1/16 );
      group.add(surfaco);
      // Dekora ora kadro ĉirkaŭ la plato
      const pkadro = new THREE.LineSegments(
        new THREE.EdgesGeometry( new THREE.BoxGeometry( 1, 14/8, 1/32 )),
        new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 4/8 })
      );
      pkadro.position.set( 0, y + tieroAlto * 3/8, hd - 1/32 );
      group.add(pkadro);
    }

    // Sxtupoj al la sekva etagxo
    if ( et < niveloj - 1 ) {
      const sxtupNombro = Math.max(4, Math.floor(tieroAlto / 3));
      const sxtupAlto = tieroAlto / sxtupNombro;
      const sxtupProf = 4/5 / sxtupNombro;
      const sxLargho = Math.min( hw * 2 * 3/8, 7/2 );
      for ( let s = 0; s < sxtupNombro; s++ ) {
        const step = new THREE.Mesh(
          new THREE.BoxGeometry( sxLargho, sxtupAlto * 15/16, sxtupProf ),
          sxtupMaterialo
        );
        step.position.set( 0, y + ( s + 4/8 ) * sxtupAlto * 15/16, -3/8 + ( s + 4/8 ) * sxtupProf );
        group.add(step);
        // Ora rando de la sxtupoj
        if ( s < sxtupNombro - 1 ) {
          const nazo = new THREE.Mesh(
            new THREE.BoxGeometry( sxLargho - 1/8, 1/32, sxtupProf * 3/8 ),
            oraNazoMaterialo
          );
          nazo.position.set( 0, y + ( s + 1 ) * sxtupAlto * 15/16, -3/8 + ( s + 1 ) * sxtupProf );
          group.add(nazo);
        }
      }
      // Centritaj flankaj muroj de la sxtupoj
      for ( const sX of [ -1, 1 ] ) {
        const sxtupMuro = new THREE.Mesh(
          new THREE.BoxGeometry( 1/16, tieroAlto, 13/8 ),
          muraMaterialo
        );
        sxtupMuro.position.set( sX * ( sxLargho / 2 + 1/8 ), y + tieroAlto / 2, 0 );
        group.add(sxtupMuro);
        // Ora bordero sur la sxtupaj muroj
        const trim = new THREE.Mesh(
          new THREE.BoxGeometry( 1/32, tieroAlto * 1/64, 13/8 ),
          oraTrimMaterialo
        );
        trim.position.set( sX * ( sxLargho / 2 + 3/16 ), y + tieroAlto * 31/32, 0 );
        group.add(trim);
      }
    }

    aldoniInternanMeblaron( group, spec.type, hw, hd, y, tieroAlto, et, niveloj,
      lignaMaterialo, metalaMaterialo, helaMaterialo );

    // Plafonaj traboj kun oraj akcentoj
    if ( spec.type !== "stacio" && hw > 3/2 ) {
      const trabaMaterialo = new THREE.MeshStandardMaterial({ color: 0x1a1810, roughness: 55/64 });
      for ( let i = 0; i < 2; i++ ) {
        const tx = ( i - 4/8 ) * hw * 7/8;
        const trabo = new THREE.Mesh(
          new THREE.BoxGeometry( 5/32, 5/32, hd * 2 - 3/8 ),
          trabaMaterialo
        );
        trabo.position.set(tx, y + tieroAlto - 2/32, 0);
        group.add(trabo);
        // Ora trabokapo
        const cxapo = new THREE.Mesh(
          new THREE.BoxGeometry(7/32, 3/32, 4/32),
          oraCxapoMaterialo
        );
        cxapo.position.set( tx, y + tieroAlto - 2/32 + 4/32, hd - 1/4 );
        group.add(cxapo);
        cxapo.position.set( tx, y + tieroAlto - 2/32 + 4/32, -hd + 1/4 );
        group.add(cxapo.clone());
      }
    }
  }

  // Atmosfera lumigado
  // Ĉefa varma direkta lumo de supre
  const cxefaLumo = new THREE.DirectionalLight( 0xf8d898, 3/8 );
  cxefaLumo.position.set( 0, niveloj * tieroAlto * 4/5, 0 );
  group.add(cxefaLumo);
  // Varma pleniga lumo de sube
  const subLumo = new THREE.DirectionalLight( 0xd9b36a, 1/8 );
  subLumo.position.set( 0, -1, 0 );
  group.add(subLumo);
  // Ambienta lumo kun varma nuanco
  const ambiento = new THREE.HemisphereLight( 0xd9b36a, 0x08140e, 2/8 );
  group.add(ambiento);

  // Specialaj mebloj por mangxejo
  if ( spec.type === "manĝejo" ) {
    const mw = Math.min(spec.w, 0o10), md = Math.min(spec.d, 0o10);
    const counter = new THREE.Mesh(
      new THREE.BoxGeometry( Math.min( mw * 2 - 1, 6 ), 1, 10/8 ),
      new THREE.MeshStandardMaterial({ color: 0x54402e, roughness: 7/8 })
    );
    counter.position.set( 5/8, 4/8, -md / 2 + 1/8 );
    group.add(counter);
    const pot = new THREE.Mesh(
      new THREE.CylinderGeometry( 3/8, 3/8, 4/8, 0o16 ),
      new THREE.MeshStandardMaterial({ color: 0x8a6f4a, roughness: 4/8, metalness: 3/8 })
    );
    pot.position.set( -5/8, 10/8, counter.position.z );
    group.add(pot);
    const items = kreiManĝaĵojn(group, 0, 0);
    sys.manĝaĵoj = items;
    const steamPos = new THREE.Vector3( -5/8, 13/8, counter.position.z );
    const vapor = aldoniVaporon(group, steamPos);
    sys.vaporNuboj = [{ ...vapor, ph: 0 }];
    const tabloX = Math.min( 18/8, Math.max( 7/8, mw / 2 - 5/4 ));
    const tabloZ = Math.min( 18/8, Math.max( 7/8, md / 2 - 5/4 ));
    const tabloLokoj = mw >= 40/8 && md >= 40/8
      ? [ [ tabloX, tabloZ ], [ -tabloX, tabloZ ], [ tabloX, -tabloZ ], [ -tabloX, -tabloZ ] ]
      : [];
    for ( const [tx, tz] of tabloLokoj ) {
      const tb = new THREE.Mesh(
        new THREE.BoxGeometry( 14/8, 3/8, 10/8 ),
        new THREE.MeshStandardMaterial({ color: 0x54402e, roughness: 7/8 })
      );
      tb.position.set( tx, 2/8, tz );
      tb.castShadow = true;
      group.add( tb );
      const seĝajOfsetoj = [ [ -10/8, 0 ], [ 10/8, 0 ], [ 0, -10/8 ], [ 0, 10/8 ] ];
      for ( const [ox, oz] of seĝajOfsetoj ) {
        const seĝo = new THREE.Mesh(
          new THREE.CylinderGeometry( 3/16, 4/16, 3/8, 0o10 ),
          new THREE.MeshStandardMaterial({ color: 0x806038, roughness: 7/8 })
        );
        seĝo.position.set( tx + ox, 3/16, tz + oz );
        seĝo.castShadow = true;
        group.add( seĝo );
      }
    }
  }

  // Aldonu la internan grupon
  group.position.set(spec.x, spec.h0 || 0, spec.z);
  group.rotation.y = spec.rot || 0;
  cxefaSceno.add(group);
  sys.currentGroup = group;

  // Enira punkto tuj interne de la pordo
  const enirX = 0;
  const enirZ = Math.max(3/2, d / 2) - 4/8;
  const enirY = 4/8;
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
  for ( const a of sys.animated ) a.update( t );
  for ( const v of sys.vaporNuboj ) {
    const pos = v.cloud.geometry.attributes.position;
    if (pos) {
      for ( let i = 0; i < pos.count; i++ ) {
        const y = pos.getY( i ) + 3/1000;
        if ( y > 7/5 ) pos.setY( i, -1/10 );
        else pos.setY(i, y);
      }
      pos.needsUpdate = true;
    }
  }
}

// Helfunkcio por konstrui muron el skatolo
// rotacio estas Y-rotacio en radianoj por flankaj muroj
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
