// ≺⧼ Internoj 🚪 ⧽≻
// Pluretagxaj internaj spacoj por piediri tra ili
// Rezajnita por kongrui al la malhel-verda/oro satala estetiko de Priskribo.md.
//   • Muroj en la sama koloro kiel la eksteraj muroj de la konstruajxo, varmaj oraj kadroj ( #d8b068 )
//   • Nesimetraj rondigitaj anguloj (32px/16px)
//   • Dikaj oraj angulaj kadroj kiuj flairas eksteren supre
//   • Longaj horizontalaj rondigitaj fenestroj
//   • Rondigita trapeza porda arko sur teretaĝo
//   • Varma atmosfera ora lumigado
//   • Vertikalaj skriptplatoj de malsupro al supro
//   • Minimalismaj rondangulaj mebloj kun oraj akcentoj

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
  // Konservu la antauxan internon en la kasxo ( anstataŭ forjxeti ĝin ) — la
  // sekva eniro al la sama konstruaĵo estos tuja, sen rekonstruado.
  kasxiNunan(sys, cxefaSceno);

  // Ĉu ĉi tiu konstruaĵo jam havas konstruita internon? Re-aldonu ĝin tuj.
  const sxlosilo = sxlosiloDeSpeco(spec);
  const restarigita = restarigiInternon(sys, spec, cxefaSceno, pordaAngulo);
  if ( restarigita ) {
    // La kasxita interno portas la litajn kolorojn de sia konstru-tempo —
    // gxisdatigu ilin al la nuna vesto de la ludanto.
    aplikiLitajnKolorojn(sys.currentGroup!, tolaKoloro, kusenaKoloro);
    return restarigita;
  }
  sys.nunaSxlosilo = sxlosilo;
  sys.animated = [];
  sys.plankoj = [];
  sys.helikso = null;
  sys.litkoj = [];

  // La kosmoporda stacio transportas rekte en la spacosxipon.
  if ( spec.type === "stacioxipo" ) {
    sys.manĝaĵoj = [];
    sys.vaporNuboj = [];
    sys.litkoj = [];
    return eniriSxipanInternon(sys, spec, cxefaSceno);
  }

  const w = Math.min(spec.w, 0o10);
  const d = Math.min(spec.d, 0o10);
  const tieroAlto = spec.tieroAlto;
  // La niveloj baziĝas SUR LA TAVOLOJ de la ekstera konstruajxo ( spec.niveloj )
  // — neniu kroma plafono. La sub-teraj niveloj same venas rekte de la spec
  // ( sube = la nombro da tavoloj ), por ke la interno ĉiam kongruu al la
  // ekstera strukturo.
  const niveloj = spec.niveloj;
  const sube = spec.sube || 0;
  const tieroAltoSub = spec.tieroAltoSub || tieroAlto;
  // Helica ŝtuparo. Unu plena turno po etaĝo, atingante ĉiujn etaĝojn ( supre
  // kaj la sub-terajn nivelojn). La ringa planko-truo egalas la eksteran rampan
  // radion, do oni povas paŝi rekte de la ŝtupoj sur la etaĝon.
  const helikso: HeliksoInfo | null = niveloj > 1 ? {
    rKol: 0o3/0o10, rEkster: 1, perTurno: 0o14, turnoAlto: tieroAlto, turnoAltoSub: tieroAltoSub,
    turnoj: niveloj - 1, turnojSube: sube,
  } : null;
  sys.helikso = helikso;
  // La truo estas ĝuste ĉe la ekstera rampa rando, do la ringa planko komenciĝas
  // kie la ŝtupoj finiĝas — la ludanto povas foriri de la spiralo al la etaĝoj.
  const sxaktaR = helikso ? helikso.rEkster : 0;

  // Materialoj — la internaj muroj uzas la SAMAN koloron kiel la eksteraj
  // muroj de la koncerna konstruajxo ( TIPARO[type].wall ).
  const muraTipo = TIPARO[spec.type] || TIPARO.domo;

  const muraMaterialo = new THREE.MeshStandardMaterial({
    color: muraTipo.wall, roughness: 0o43/0o100, side: THREE.DoubleSide,
  });
  // Planko kun generita simetria desegno en la koloroj de la konstruajxo.
  // La semo venas de la pozicio kaj nomo, do ĉiu konstruajxo ricevas sian
  // propran STABILAN varianton ( la sama konstruajxo ĉiam samas ).
  const plankSemo = ( ( spec.x * 0x9E3779B1 ) ^ ( spec.z * 0x85EBCA77 ) ^
    spec.name.split("").reduce(( h, ch ) => ( h * 31 + ch.charCodeAt(0) ) | 0, 0) ) >>> 0;
  const plankoMaterialo = new THREE.MeshStandardMaterial({
    color: 0xffffff, map: generiPlankanTeksajxon(muraTipo.wall, muraTipo.frame, plankSemo), roughness: 0o55/0o100,
  });
  const plafonaMaterialo = new THREE.MeshStandardMaterial({
    color: 0x081008, roughness: 0o67/0o100,
  });
  const kadraMaterialo = new THREE.MeshStandardMaterial({ color: muraTipo.frame, metalness: 0o7/0o10, roughness: 0o13/0o40 });
  // La sama vitro kiel la ekstera ( kreiFenestranMaterialon ). Antaŭe la difino
  // estis kopiita ĉi tien, do ŝanĝo de la ekstera vitro ne atingis la internon.
  const fenestraMaterialo = kreiFenestranMaterialon();
  // Stupoj — malheligita versio de la konstruajxa muro-koloro.
  const sxtupMaterialo = new THREE.MeshStandardMaterial({
    color: parseInt(malheligi(deksesuma(muraTipo.wall), 0o6/0o10).slice(1), 16), roughness: 0o67/0o100,
  });
  // Komunaj materialoj por dekoracioj
  const oraBazaMaterialo = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0o3/0o10 });

  const group = new THREE.Group();
  // Meblaro-materialoj — preferu la KOLOROJN de la konstruajxo ( muraTipo .
  // la muro kaj la ora kadro ), anstataux fiksitaj fremdaj koloroj.
  const lignaMaterialo = new THREE.MeshStandardMaterial({ color: LIGNA_KOLORO, roughness: 0o7/0o10 });
  const metalaMaterialo = new THREE.MeshStandardMaterial({ color: muraTipo.frame, metalness: 0o5/0o10, roughness: 0o5/0o10 });

  // Konstruu ĉiujn etaĝojn — sub-terajn (negativaj y) kaj suprajn — per la sama
  // reuzebla kodo, por ke oni povu malsupreniri al la subaj niveloj.
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

    // Dimensioj de la EKSTERAN pordo sur la fronta muro (aldoniEnirejon) —
    // uzataj de la pordmalfermo, la lampoj kaj la plato. Neniu margineto.
    // la porda bevelo (0o1/0o40) kaj la maldika folio kuŝas en la muro aŭ antaŭ
    // ĝi, do la truo
    // kongruas al la PLATA pordokorpo (la malnova margineto lasis videblan
    // interspacon ĉirkaŭ la pordo).
    const pordBazo = 0o233/0o100;
    const pordDuon = pordBazo / 2;

    sys.plankoj.push({ y, hw, hd, alto });

    // Planko ( kun cirkla truo por la helika ŝtuparo sur ĉiuj etaĝoj; la
    // teretaĝo ricevas la truon ankaŭ kiam ekzistas sub-teraj etaĝoj, por ke
    // oni povu malsupreniri la ŝtuparon en la kelon ).
    const planko = new THREE.Mesh(
      helikso && ( et !== 0 || sube > 0 )
        ? kreiRinganPlankon(hw, hd, sxaktaR, -Math.PI / 2)
        : new THREE.PlaneGeometry(hw * 2, hd * 2).rotateX(-Math.PI / 2),
      plankoMaterialo
);
    planko.position.set(0, y + 0o1/0o40, 0);
    group.add(planko);

    // Ora planka bordero kun nesimetriaj rondigitaj anguloj
    // Mallongaj oraj strioj ĉe la kvar plankaj anguloj
    for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
      // L-forma angula krampo el du maldikaj skatoloj
      for ( const [ dx, dz, lx, lz ] of [ [ 1, 0, 0o3/0o10, 0o1/0o20 ], [ 0, 1, 0o1/0o20, 0o3/0o10 ] ] as [ number, number, number, number ][] ) {
        const b = new THREE.Mesh(new THREE.BoxGeometry(lx, 0o1/0o40, lz), oraBazaMaterialo);
        b.position.set(sX * ( hw - 0o1/0o10 * dx ), y + 0o2/0o40, sZ * ( hd - 0o1/0o10 * dz ));
        group.add(b);
      }
    }

    // Plafono krom cxe la supra etagxo ( kun truo por la helika ŝtuparo )
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

    // Antauxa muro kun rondigita pordo en la teretaĝo. La sanktejo ricevas
    // pordojn sur CXIUJ kvar flankoj ( turnitaj kopioj de la sama muro ); la
    // ceteraj konstruajxoj havas nur la frontan.
    if ( et === 0 ) {
      // Pordo-formo kongruas EXAKTE al la EKSTERAN pordo ( aldoniEnirejon ).
      // rondigita trapezoido — bazo 0o233/0o100, supro ×0o45/0o100, alto
      // 0o11/0o4, kun la SAMAJ rondigitaj anguloj ( ĉiuj kvar je 0o1/0o4,
      // samkiel la ekstera kadro, kiu nun estas SIMETRIA ). La malnova
      // rektangula truo kun arko montris la trapezan pordon
      // en kvadrata eltranĉo, do la malfermo mem estas la trapezo. Tro granda
      // margeno lasis malplenan interspacon ĉirkaŭ la pordo kaj super ĝi.
      const pordSupro = 0o233/0o100 * 0o45/0o100;             // ≈ 1.4
      // Sama alto kiel la pordo, sed neniam super la plafono de mallonga
      // etaĝo — alie la truo elstarus el la muro-rektangulo (degenera formo).
      const pordAlto = Math.min(0o11/0o4, alto - 0o1/0o10);  // ≈ 2.25, sama kiel la pordo
      const pordRadiBazo = 0o1/0o4;                          // samaj rondigitaj anguloj
      const pordRadiSupro = 0o1/0o4;                         // kiel la ekstera pordo
      const muraDikeco = 0o3/0o20;
      const pordMuro = new THREE.Group();

      // Unu mura panelo kun trapezoida truo ( anstataŭ tri skatoloj + arko )
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

      // Ora rando laŭ la trapezoida konturo — tubo ĝuste antaŭ la interna
      // muro-faco (sama ideo kiel la ekstera ora rando ĉirkaŭ la pordo), kaj nun
      // la SAMA ronda tubo kaj la sama sinteno sur la konturo ( kreiKadranKurbon )
      // kiel la ekstera kadro, por ke la interno kaj la ekstero de la pordo
      // legiĝu kiel unu sola kadro.
      const truKonturo = kreiKadranKurbon(kreiTrapezanPordTruon(pordBazo, pordSupro, pordAlto, pordRadiBazo, pordRadiSupro), 0);
      const pordRando = new THREE.Mesh(
        new THREE.TubeGeometry(truKonturo, 0o200, 0o1/0o20, 0o14, true),
        kadraMaterialo
);
      pordRando.position.set(0, y, hd - muraDikeco / 2 - 0o5/0o100);
      pordMuro.add(pordRando);

      // Malgranda ora sojlo sub la pordo
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
      // ⟨ La antaŭa muro ricevas fenestron 📃 ⟩ — la teretaĝa antaŭa muro enhavas
      // la pordon, sed sur la supraj kaj sub-teraj etaĝoj ĝi estis PLENA muro, dum
      // la tri aliaj muroj havis fenestrojn. Nun la ĉambro havas fenestron sur ĉiu
      // el la kvar flankoj, krom kie estas pordo.
      aldoniLonganFenestron(group, 0, hd, y, alto, hw, "antaŭ", muraMaterialo, fenestraMaterialo, kadraMaterialo);
    }

    // La tri ceteraj muroj ricevas fenestrojn — krom sur la teretaĝo de la
    // sanktejo, kie ili cxuj havas pordojn.
    const kvarPordoj = et === 0 && spec.type === "sanktejo";
    // Malantaŭa muro. Unu centrita longa horizontala rondigita fenestro
    // La fenestroj uzas la oran kadran materialon de la konstruajxo — la sama
    // metalluma oro kiel la stela kadro ekstere ( ne la malnovaj du travideblaj
    // oraj materialoj de la interna fenestro ).
    if ( !kvarPordoj ) aldoniLonganFenestron(group, 0, -hd, y, alto, hw, "malantaŭ", muraMaterialo, fenestraMaterialo, kadraMaterialo);

    // Maldekstra muro. Unu centrita longa horizontala rondigita fenestro
    if ( !kvarPordoj ) aldoniLonganFenestron(group, -hw, 0, y, alto, hd, "maldekstra", muraMaterialo, fenestraMaterialo, kadraMaterialo);

    // Dekstra muro. Unu centrita longa horizontala rondigita fenestro
    if ( !kvarPordoj ) aldoniLonganFenestron(group, hw, 0, y, alto, hd, "dekstra", muraMaterialo, fenestraMaterialo, kadraMaterialo);

    // Dikaj oraj angulaj kolonoj kun supra ekflaro — RONDIGITAJ, ne rektangulaj
    // poloj. La kapoj/bazoj estas centritaj por ke iliaj eksteraj facoj kuŝu
    // ĜUSTE ĉe la muro ( la malnovaj pli larĝaj skatoloj eniris la muron kaj
    // montris duon-entombigitajn orajn rektangulojn ĉe la anguloj ).
    const kolDikeco = 0o7/0o40;
    const kolAlto = alto;
    for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
      // Ĉefa kolona korpo
      const kol = new THREE.Mesh(
        new RoundedBoxGeometry(kolDikeco, kolAlto, kolDikeco, 3, 0o3/0o200),
        kadraMaterialo
);
      kol.position.set(sX * ( hw - kolDikeco / 2 ), y + kolAlto / 2, sZ * ( hd - kolDikeco / 2 ));
      group.add(kol);

      // Supra iom pli larĝa kapo — ekstera faco ĝuste ĉe la muro
      const flara = new THREE.Mesh(
        new RoundedBoxGeometry(kolDikeco * 0o15/0o10, kolAlto * 0o1/0o40, kolDikeco * 0o15/0o10, 3, 0o3/0o200),
        kadraMaterialo
);
      flara.position.set(sX * ( hw - ( kolDikeco * 0o15/0o10 ) / 2 ), y + kolAlto - kolAlto * 0o1/0o40, sZ * ( hd - ( kolDikeco * 0o15/0o10 ) / 2 ));
      group.add(flara);

      // Malgranda ora bazo — ekstera faco ĝuste ĉe la muro
      const bazo = new THREE.Mesh(
        new RoundedBoxGeometry(kolDikeco * 0o5/0o4, kolAlto * 0o1/0o40, kolDikeco * 0o5/0o4, 3, 0o3/0o200),
        new THREE.MeshStandardMaterial({ color: GOLD_SOFT, metalness: 0o5/0o10, roughness: 0o13/0o40 })
);
      bazo.position.set(sX * ( hw - ( kolDikeco * 0o5/0o4 ) / 2 ), y + kolAlto * 0o1/0o100, sZ * ( hd - ( kolDikeco * 0o5/0o4 ) / 2 ));
      group.add(bazo);
    }

    // Muraj lampoj kun varma ora brilo
    const lampNombro = Math.max(1, Math.floor(hw) - 1);
    // ⟨ Neniu lampo en la porda malfermo 📃 ⟩ — sur la teretaĝo la pordo okupas
    // la centron de la fronta muro. La antaŭa kondiĉo forigis nur la lampojn
    // rekte super la porda CENTRO ( |lx| < pordDuon ), sed la malfermo estas
    // larĝa je pordBazo ( ≈ 2.42 ) kaj la lampoj de malgranda konstruajxo sidis
    // ĉe |lx| = 1 — do EN la malfermo, ŝvebantaj en la aero apud la pordo. Ili
    // estis la du "hazardaj brilaj kvadratoj" ( la ora krampo plus la brilanta
    // sfero ) kiujn oni vidis venante en la konstruajxon. Nun ĉiu lampo, kiu ajn
    // parte interkovras la malfermon, tute mankas sur la teretaĝo.
    const lampLargho = 0o3/0o40;   // la globo
    for ( let i = 0; i < lampNombro; i++ ) {
      const lx = -hw + ( i + 1 ) * hw * 2 / ( lampNombro + 1 );
      // ⟨ Se la lampo falus en la pordan malfermon 📃 ⟩ — la lampoj sidas sur la
      // FRONTA muro, do sur la teretaĝo de malgranda konstruajxo ĉiuj falas en la
      // pordan malfermon ( la malfermo estas ~2.42 larĝa kaj la lampoj sidas ĉe
      // |lx| = 1 ). Antaŭe ili simple malaperis, do la malgrandaj konstruajxoj
      // restis sen lampoj kaj ilia interno mallumiĝis. Nun tia lampo translokiĝas
      // al la plej proksima FLANKA muro — same bela lumo, nenio apud la pordo.
      const enPordaMalfermo = et === 0 && Math.abs(lx) - lampLargho < pordDuon;
      const flankSigno = Math.sign(lx) || 1;
      const lampY = y + alto * 0o5/0o10;
      // ⟨ Nenia krampa skatolo 📃 ⟩ — la lampo havis malgrandan oran KUBON
      // ( 0.125 × 0.125 ) sur la muro apud la gloo. De malproksime ĝi ne legiĝis
      // kiel lampo sed kiel hazarda brila KVADRATO sur la muro — kaj ĉar la muroj
      // kovras la tutan ĉambron, ili abundis. La skatolo forfalis.
      // ⟨ La mura brako 📃 ⟩ — anstataŭ la skatolo, maldika ora stango el la
      // muro ( cilindro laŭ −z ), kiu portas la globon. Sen ĝi la lampo estus
      // soleca luma punkto ŝvebanta antaŭ la muro, sen ia ligo al la ĉambro.
      const brako = new THREE.Mesh(
        new THREE.CylinderGeometry(0o1/0o100, 0o1/0o100, 0o3/0o10, 6).rotateX(Math.PI / 2),
        kadraMaterialo
);
      brako.position.set(enPordaMalfermo ? flankSigno * ( hw - 0o3/0o20 ) : lx,
        lampY + 0o3/0o40, enPordaMalfermo ? 0 : hd - 0o3/0o20);
      // La stango estas simetria, do nur la turno de la muro gravas.
      brako.rotation.y = enPordaMalfermo ? Math.PI / 2 : 0;
      group.add(brako);
      const lampX = enPordaMalfermo ? flankSigno * ( hw - 0o3/0o10 ) : lx;
      const lampZ = enPordaMalfermo ? 0 : hd - 0o3/0o10;
      // Varma punktolumo
      const lumo = new THREE.PointLight(GOLD_WARM, 0o2/0o10, 5, 2);
      lumo.position.set(lampX, lampY, lampZ);
      group.add(lumo);
      // Malgranda brila sfero
      const glo = new THREE.Mesh(
        new THREE.SphereGeometry(0o3/0o40, 0o10, 0o10),
        new THREE.MeshBasicMaterial({ color: GOLD_WARM, transparent: true, opacity: 0o3/0o20 })
);
      glo.position.set(lampX, lampY, lampZ);
      group.add(glo);
    }

    // Vertikala skribplato sur la antauxa muro
    if ( et === 0 && spec.name ) {
      const plakedInk = deksesuma(GOLD);
      // Sennomaj konstruajxoj montru la defauxtan nomon de ilia tipo ( TIPARO ).
      const plakedNomo = nomoAih(spec.name, spec.type);
      // Larĝo 0o136 (94) kongruas la aspekton de la plato (4/5 × 0o15/0o10).
      // Travidebla plato. Nur la teksto montrigxas super la muro ( neniu nigra bloko ).
      const plakedo = generiSkribanTeksajxon(plakedNomo, {
        w: 0o136, h: 0o300, ink: plakedInk,
      });
      // Alta vertikala skribplato
      const surfaco = new THREE.Mesh(
        new THREE.PlaneGeometry(4/5, 0o15/0o10),
        new THREE.MeshStandardMaterial({ map: plakedo, transparent: true, roughness: 0o23/0o100, metalness: 0o55/0o100 })
);
      // La plato staras sur la fronta muro DEKSTRE de la pordo (la pordo mem
      // okupas la centron) — la malnova centro flosis en la porda malfermo.
      const pkX = pordDuon + ( hw - pordDuon ) / 2;
      surfaco.position.set(pkX, y + alto * 0o3/0o10, hd - 0o1/0o20);
      group.add(surfaco);
      // Dekora ora kadro ĉirkaŭ la plato
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

    // Plafonaj traboj kun oraj akcentoj
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

  // Helica ŝtuparo tra la tuta turo — unu plena turno po etaĝo, kun ora
  // spirala manrelo. La spiralo kovras kaj la suprajn kaj la sub-terajn etaĝojn;
  // la piedira alteco sekvas la spiralon (vidu sperto.ts).
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
    // Centra kolono — la AKCENTA ( ora ) koloro de la konstruajxo, ne la ligno.
    const akcentaMaterialo = new THREE.MeshStandardMaterial({ color: muraTipo.frame, metalness: 0o55/0o100, roughness: 0o23/0o100 });
    const kolono = new THREE.Mesh(
      new THREE.CylinderGeometry(helikso.rKol, helikso.rKol * 0o106/0o100, suproY - fundoY, 0o20),
      akcentaMaterialo
);
    kolono.position.set(0, ( fundoY + suproY ) / 2, 0);
    kolono.castShadow = true;
    group.add(kolono);
    // Paŝoj ĉirkaŭ la kolono — sub-teraj turnoj (negativaj) kaj supraj turnoj
    for ( let p = -nSube; p < nSupre; p++ ) {
      const ang = p * paŝoAngulo;
      const paŝoAlto = p < 0 ? paŝoAltoSube : paŝoAltoSupre;
      const y = heliksaAltecxo(helikso, p / helikso.perTurno);
      // Paŝo kun IOMETe rondigitaj anguloj ( radiuso 0o3/0o200 ) — sufiĉe por
      // mola konturo, sed la paŝo restas klare rekta.
      const paso = new THREE.Mesh(
        new RoundedBoxGeometry(paŝoLargho, paŝoAlto, radiala, 3, 0o3/0o200),
        sxtupMaterialo
);
      paso.position.set(rMezo * Math.sin(ang), y + paŝoAlto / 2, rMezo * Math.cos(ang));
      paso.rotation.y = ang;
      paso.castShadow = true;
      group.add(paso);
      // Ora rimo kiu VOLVAS la paŝon kiel U — maldikaj opakaj bendoj tuj EKSTER
      // la paŝaj facoj ( ekstera faco + la du flankoj ), NENIAM ene de la paŝo.
      // La malnovaj versioj sidis sur/en la paŝa supro — ilia supra faco koincidis
      // kun la paŝa plato kaj z-fajfis ( la oro ŝajnis klipi en la ŝtupon ). Ĉi tiuj
      // bendoj kuŝas apud la paŝo, do neniu superkovro kaj neniu klipo. La alto
      // neniam superas la paŝan leviĝon ( paŝoAlto ), do ili ne enrampas en la
      // najbarajn paŝojn.
      const nazoAlto = Math.min(0o1/0o40, paŝoAlto);
      const rimY = y + paŝoAlto - nazoAlto / 2;
      const ux = Math.sin(ang), uz = Math.cos(ang);    // radiale eksteren
      const tx = Math.cos(ang), tz = -Math.sin(ang);   // tanĝe
      // Ekstera bendo — tuj ekster la ekstera faco ( [rEkster, rEkster + 0.05] ),
      // kun iomete rondigitaj anguloj ( RoundedBoxGeometry, radiuso 0o3/0o400 ).
      const nazo = new THREE.Mesh(
        new RoundedBoxGeometry(paŝoLargho + 0o1/0o10, nazoAlto, 0o1/0o20, 3, 0o3/0o400),
        akcentaMaterialo
);
      nazo.position.set(( helikso.rEkster + 0o1/0o40 ) * ux, rimY, ( helikso.rEkster + 0o1/0o40 ) * uz);
      nazo.rotation.y = ang;
      group.add(nazo);
      // Du flankaj bendoj — ĉiu tuj ekster sia paŝo-flanko, laŭ la tuta radia
      // longo, kun la samaj rondigitaj anguloj.
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
    // Ora spirala manrelo laŭ la ekstera rando (tra la tuta spiralo)
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

  // Atmosfera lumigado
  // Ĉefa varma direkta lumo de supre
  const cxefaLumo = new THREE.DirectionalLight(0xf8d898, 0o3/0o10);
  cxefaLumo.position.set(0, niveloj * tieroAlto * 4/5, 0);
  group.add(cxefaLumo);
  // Varma pleniga lumo de sube
  const subLumo = new THREE.DirectionalLight(0xd8b068, 0o1/0o10);
  subLumo.position.set(0, -1, 0);
  group.add(subLumo);
  // Ambienta lumo kun varma nuanco
  const ambiento = new THREE.HemisphereLight(0xd8b068, 0x081810, 0o2/0o10);
  group.add(ambiento);

  // Specialaj mebloj por mangxejo
  if ( spec.type === "mangxejo" ) {
    const mw = Math.min(spec.w, 0o10), md = Math.min(spec.d, 0o10);
    // La vendotablo staras TUTE ene de la ĉambro. la malnova centro
    // ( -md/2 + 0o1/0o10 ) lasis pli ol duonon de la tablo tra la malantaŭa
    // muro — videbla ligna bloko el la ekstero. 0o2/0o10 libero de la muro.
    const vendProfundo = 0o12/0o10;
    const vendZ = -md / 2 + 0o2/0o10 + vendProfundo / 2;
    const vendSupro = aldoniVendotablon(group, vendZ,
      Math.min(mw * 2 - 1, 6), vendProfundo, 0, lignaMaterialo, kadraMaterialo);
    // La poto sidas SUR la vendotablo — la nivelo venas de la tablo mem.
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
    // La tabloj eniras por ke la flankaj benkoj ( ±0o14/0o10, duonprofundo
    // 0o1/0o4 ) ne tuŝu la flankajn murojn — la malnova tabloX 0o22/0o10 lasis
    // la benkojn ĜUSTE ĉe la muro ( nula libero ). La malantaŭa vico
    // malproksimiĝas de la vendotablo, por ke la tabloj ne eniru la tablon.
    const tabloX = Math.min(0o20/0o10, Math.max(0o7/0o10, mw / 2 - 0o5/0o4));
    const tabloZ = Math.min(0o22/0o10, Math.max(0o7/0o10, md / 2 - 0o5/0o4));
    const malantaŭaZ = Math.min(0o14/0o10, Math.max(0o7/0o10, md / 2 - 0o14/0o10));
    const tabloLokoj = mw >= 0o50/0o10 && md >= 0o50/0o10
      ? [ [ tabloX, tabloZ ], [ -tabloX, tabloZ ], [ tabloX, -malantaŭaZ ], [ -tabloX, -malantaŭaZ ] ]
      : [];
    const tabloj: { x: number; z: number }[] = [];
    for ( const [ tx, tz ] of tabloLokoj ) {
      // La tablo kun benkoj — nur tri flankoj por la malantauxa vico ( tz < 0 ),
      // por ke la flanko kontraŭ la vendotablo restu libera.
      aldoniManĝtablon(group, tx, tz, 0, lignaMaterialo, kadraMaterialo, tz < 0);
      tabloj.push({ x: tx, z: tz });
    }
    // Manĝaĵoj sidas sur la tabloj ( ne en la aero )
    const items = kreiMangxajxojn(group, 0, 0, tabloj);
    sys.manĝaĵoj = items;
  }

  // Aldonu la internan grupon
  group.position.set(spec.x, spec.h0 || 0, spec.z);
  group.rotation.y = spec.rot || 0;
  cxefaSceno.add(group);
  sys.currentGroup = group;

  // Enira punkto tuj interne de la pordo tra kiu la ludanto eniris
  // ( pordaAngulo; 0 = la fronta pordo ). La ludanto frontas la centron.
  const enirR = Math.max(0o3/0o2, d / 2) - 0o4/0o10;
  const enirX = Math.sin(pordaAngulo) * enirR;
  const enirZ = Math.cos(pordaAngulo) * enirR;
  const enirY = 0o4/0o10;
  const enirDirekto = pordaAngulo;

  return { x: enirX, z: enirZ, y: enirY, direkto: enirDirekto };
}

export function eliriInternon(sys: InternaSistemo, cxefaSceno: THREE.Scene): void {
  // Konservu la internon en la kasxo — ne forjxetu gxin. La sekva eniro al la
  // sama konstruaĵo estos tuja.
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
