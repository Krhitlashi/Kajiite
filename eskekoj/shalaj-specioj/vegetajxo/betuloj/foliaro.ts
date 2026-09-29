// ≺⧼ La betula foliaro 🌳 ⧽≻
// La bonsajeca betula krono — la nuba kuseno ( la malhela kerno kun siaj
// elstaraĵoj ) kaj la folikartoj de la rando ( konstruiBetulanFoliaranGeometrion ).
// La krono venas en DU partoj — la maso kun la foliara teksaĵo kaj la unuopaj
// folioj kun la unu-folia teksaĵo. La instancigilo vivas en arbaro.ts.
import * as THREE from "three";
import { kunfandiGeometriojnSenIndekson } from "../../../komunajxoj/kunfandajxoj.js";

// konstruiBetulanFoliaranGeometrion — Konstruu kompaktan "nuban kusenon" por
// la bonsajeca betula krono. Ĉiu kuseno estas plata, densa folia maseto kun
// neregula rando; la tuta krono konsistas el pluraj tiaj apartaj kusenoj
// sidiĝantaj sur videblaj branĉoj, kun malplenoj inter ili.
// funkcio konstruiBetulanFoliaranGeometrion
// ⟨ Rezulto 📃 ⟩ — la krono venas en DU partoj: la MASO ( la kusenoj kaj la
// branĉetoj, kun la foliara teksaĵo ) kaj la FOLIKARTOJ ( la unuopaj folioj,
// kun la unu-folia teksaĵo kaj alphaTest ). Antaŭe ĉio estis unu geometrio uzanta
// la foliaran teksaĵon, do ĉiu folikarto montris makulojn de cent folioj kaj
// aspektis kiel verda peco — la komuna kaŭzo de la "verdaj steloj" en la krono.
export function konstruiBetulanFoliaranGeometrion(): { maso: THREE.BufferGeometry; folioj: THREE.BufferGeometry } {
  const partoj: THREE.BufferGeometry[] = [];
  const foliajPartoj: THREE.BufferGeometry[] = [];
  // ⟨ La kuseno 📃 ⟩ — antaŭe la kuseno havis sep grandajn interkovrantajn
  // sferojn ( radiuso ĝis 0.28 ) plus dek plenigaĵojn. Ĝi estis malregula, sed
  // nur je la skalo de tiuj sep sferoj: de proksime — kaj en la ilo — ĉiu
  // kuseno ankoraŭ montriĝis kiel PILKO, kaj la krono kiel aro da verdaj
  // pilkoj. Nun la maso estas la MALHELPA INTERNO de la kuseno — la ombro
  // inter la folioj, kiu NE estas videblaĵo mem.
  // ⟨ Kial unu kerno, ne pufoj 📃 ⟩ — du provoj de pufoj montriĝis same: se la
  // pufoj estas grandaj, ĉiu kuseno montriĝas kiel amaso da verdaj globoj; se
  // ili estas etaj, oni bezonas centojn por plenigi la saman volumon kaj ĉiu
  // verto-buĝeto triobliĝas por 768 betuloj. La kerno estas do UNU malregula
  // bulo ( dudekedro de 80 facetoj, kies vertojn ŝovas malalta ondofunkcio de
  // la direkto — neniu kudro, ĉar la duplikataj vertoj ricevas la saman ŝovon )
  // kaj nur KELKE da malgrandaj elstaraĵoj sur ĝi, por ke la rando de la kerno
  // ne estu glata sfero. La kerno de 0.27 sidas profunde ene de la folia ŝelo
  // ( la folikartoj de la rando startas je 0.33–0.40 ), do la videbla plej
  // eksteraĵo de ĉiu kuseno estas ĉiam folio, kaj la malhelaĵo aperas nur tra
  // la malplenoj inter ili, kiel en vera betula krono.
  // ⟨ La per-vertaj nuancoj 📃 ⟩ — la kunfando konservas la koloratributon nur
  // se ĈIU parto portas ĝin ( vidu kunfandiDuGeometriojn ). Ĉiu parto ricevas
  // sian propran nuance multobligilon, do la kerno ne estas unu egala maso.
  const kunTinto = ( g: THREE.BufferGeometry, r: number, gn: number, b: number ): THREE.BufferGeometry => {
    const n = g.getAttribute("position").count;
    const koloroj = new Float32Array(n * 3);
    for ( let i = 0; i < n; i++ ) {
      koloroj[i * 3] = r; koloroj[i * 3 + 1] = gn; koloroj[i * 3 + 2] = b;
    }
    g.setAttribute("color", new THREE.BufferAttribute(koloroj, 3));
    return g;
  };
  // ⟨ Vertikala gradiento 📃 ⟩ — la sama per-verta nuanco, sed laŭ la ALTO de la
  // verto: malsupre malhela, supre hela. La kerno tion bezonas, ĉar de SUPRE la
  // folioj de la pinto ne kovras ĉion: la malhela bulo videblis kiel malhelaj
  // makuloj sur la supro de ĉiu betulo. Kun la gradiento la kerno montriĝas kiel
  // ombro inter la folioj de flanke, sed kiel lumigita foliaro de supre.
  const kunVertikalaTinto = ( g: THREE.BufferGeometry,
    mR: number, mG: number, mB: number,
    hR: number, hG: number, hB: number ): THREE.BufferGeometry => {
    g.computeBoundingBox();
    const bb = g.boundingBox ?? new THREE.Box3(new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, 1, 1));
    const yMin = bb.min.y, yMax = bb.max.y;
    const p = g.getAttribute("position");
    const koloroj = new Float32Array(p.count * 3);
    for ( let i = 0; i < p.count; i++ ) {
      const t = yMax > yMin ? ( p.getY(i) - yMin ) / ( yMax - yMin ) : 0o1/0o2;
      koloroj[i * 3] = mR + ( hR - mR ) * t;
      koloroj[i * 3 + 1] = mG + ( hG - mG ) * t;
      koloroj[i * 3 + 2] = mB + ( hB - mB ) * t;
    }
    g.setAttribute("color", new THREE.BufferAttribute(koloroj, 3));
    return g;
  };
  // ⟨ Kiom da facetoj 📃 ⟩ — dudekedro de unu divido havas 80 facetojn de
  // ~0.15 sur 0.27-radiusa bulo ( ~0.37 unuojn en la mondo ) — tro grandaj: la
  // kerno montriĝis kiel fasetita kristalo. Kun du dividoj la facetoj estas
  // kvaronon tiel larĝaj kaj la malregula bulo legiĝas kiel ombro, dum la
  // kosto restas 960 vertoj kontraŭ la 12000 de la folikartoj.
  const KERNELO_PLATIGO = 0.62;
  const kerno = new THREE.IcosahedronGeometry(0.24, 2);
  {
    const p = kerno.getAttribute("position");
    const n = kerno.getAttribute("normal");
    for ( let i = 0; i < p.count; i++ ) {
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      const l = Math.hypot(x, y, z) || 1;
      const nx = x / l, ny = y / l, nz = z / l;
      // ⟨ Malalta frekvenco 📃 ⟩ — la bulo devas esti malregula je la skalo de
      // la tuta kuseno, ne je la skalo de la facetoj: kun altfrekvenca bruo la
      // vertoj de najbaraj facetoj disiĝas kaj la kerno montriĝas kiel
      // kristalo. Tri malsamaj ondolongoj donas bulon de neregula, sed glata
      // konturo.
      const ondo = 1 + 0.17 * Math.sin(nx * 4.1 + 1.3) * Math.cos(ny * 3.3 - 0.7)
        + 0.12 * Math.sin(nz * 5.7 + 2.2) + 0.07 * Math.cos(nx * 7.3 + nz * 6.1);
      p.setXYZ(i, x * ondo, y * ondo * KERNELO_PLATIGO, z * ondo);
      // ⟨ Glataj normaloj 📃 ⟩ — dudekedro NE estas indeksita: ĉiu verto
      // apartenas al unu faceto, do computeVertexNormals donas al ĉiu faceto
      // UNU normalon kaj la kerno montriĝis kiel papera poliedro kun grandaj
      // ebenaj kolorpecoj. La normalon oni skribu mem, el la direkto de la
      // sfero — ĝi estas la normalo de la plata sfero, transformita per la
      // inversa skalo ( la plataĵo de la akso Y ).
      const vn = Math.hypot(nx, ny / KERNELO_PLATIGO, nz) || 1;
      n.setXYZ(i, nx / vn, ny / KERNELO_PLATIGO / vn, nz / vn);
    }
  }
  // ⟨ La kerno ne estu UNUTONA 📃 ⟩ — antaŭe la tuta kerno ricevis unu nudon
  // ( 0.92 ) kaj ĝia supro restis malhela egale kiel ĝia malsupro.
  partoj.push(kunVertikalaTinto(kerno, 0.55, 0.60, 0.42, 1.45, 1.50, 1.20));
  // Kelkaj malgrandaj elstaraĵoj — ili rompas la glatan randon de la kerno
  // tie, kie ĝi montriĝas tra malpleno inter la folioj.
  for ( let i = 0; i < 0o10; i++ ) {
    const z = Math.random() * 2 - 1;
    const ang = Math.random() * Math.PI * 2;
    const rFlanko = Math.sqrt(Math.max(0, 1 - z * z));
    const r = 0.20 + Math.random() * 0.10;
    const elstaro = new THREE.IcosahedronGeometry(0.035 + Math.random() * 0.04, 1);
    elstaro.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(
      Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)));
    elstaro.applyMatrix4(new THREE.Matrix4().makeScale(
      0.8 + Math.random() * 0.4,
      0.6 + Math.random() * 0.4,
      0.8 + Math.random() * 0.4));
    elstaro.translate(rFlanko * Math.cos(ang) * r, z * r * 0o1/0o2, rFlanko * Math.sin(ang) * r);
    partoj.push(kunTinto(elstaro, 0.82 + Math.random() * 0.36, 0.84 + Math.random() * 0.36,
      0.76 + Math.random() * 0.34));
  }

  // kreiFolianKarteton — UNU betula folio: simpla ortangulo, kies UV-oj
  // kovras la tutan kanvason de la folia teksaĵo ( kreiBetulanFolianTeksajxon ).
  //
  // ⟨ Kial ortangulo 📃 ⟩ — la geometrio antaŭe DESEGNIS sian propran folian
  // konturon ( ok segmentoj, segildentado, faldita klingo ) KAJ ricevis la
  // folian teksaĵon, kiu portas SIAN propran konturon. Du malsamaj konturoj
  // devis koincidi, kaj ili ne povis: la teksaĵa folio estis tondita de la
  // geometria rando, la UV-oj streĉiĝis — de proksime ĉiu folio aspektis
  // distordita. Nun la teksaĵo portas la tutan formon ( pinto, tigo,
  // segildenta rando, vejnoj ) kaj alphaTest eltranĉas ĝin; la geometrio estas
  // nur kadro. La folio ankaŭ kreskas el sia BAZO ( la tigo sidas ĉe la origino
  // de la kartono ), do ĝi pendas de la branĉeto kiel vera folio.
  const kreiFolianKarteton = ( longo: number, largho: number ): THREE.BufferGeometry => {
    // ⟨ La klingo kurbiĝas 📃 ⟩ — plata ortangulo spegulas la lumon EGALE el
    // ĉiu angulo, kaj amaso da tiaj kartoj aspektas kiel paperaj teleroj. Kun
    // 2×2 subdivido oni povas faldi la folion: la du duonoj leviĝas laŭ la
    // mezvejno kaj la pinto malleviĝas, do ĉiu folio havas du lumigatajn
    // flankojn kaj la foliaro havas profundon. La faldo profundis de 0.30 al
    // 0.36 de la larĝo — ju pli profunda la angulo, des pli da ombro ĝi tenas
    // kaj des malpli la folio legiĝas kiel plata plato.
    const geometrio = new THREE.PlaneGeometry(longo, largho, 0o2, 0o2)
      .translate(longo / 2, 0, 0);
    const pozicioj = geometrio.attributes.position;
    const kurboLarĝe = largho * 0.36;
    const kurboLonge = largho * 0.28;
    for ( let i = 0; i < pozicioj.count; i++ ) {
      const x = pozicioj.getX(i);
      const y = pozicioj.getY(i);
      const trans = y / ( largho / 2 );
      const laux = x / longo;
      pozicioj.setZ(i, kurboLarĝe * trans * trans + kurboLonge * laux * laux);
    }
    geometrio.computeVertexNormals();
    // ⟨ La nuanco de ĉiu unuopa folio 📃 ⟩ — ĉiuj folioj de la tuta Betularo
    // dividas UNU teksaĵon kaj po-kusene UNU instanc-koloron. Sen plua variado
    // ĉiu kuseno estis unutona kaj la krono legiĝis kiel unu verda materio
    // anstataŭ kiel foliaro: la okulo ne ricevas la etajn helo-diferencojn,
    // kiujn ĝi uzas por distingi foliojn unu de la alia. Ĉiu kartono do portas
    // sian propran per-vertan nuancon — iom pli hela, iom pli flava, iom pli
    // malhela — kaj la materialo multiplikas ĝin ( vertexColors ).
    const helo = 0.80 + Math.random() * 0.46;
    const varmo = 0.86 + Math.random() * 0.14;   // malpli da bluo = pli varma verdo
    const koloroj = new Float32Array(pozicioj.count * 3);
    for ( let i = 0; i < pozicioj.count; i++ ) {
      koloroj[i * 3] = helo * ( 0.96 + Math.random() * 0.08 );
      koloroj[i * 3 + 1] = helo * ( 0.97 + Math.random() * 0.07 );
      koloroj[i * 3 + 2] = helo * varmo * ( 0.94 + Math.random() * 0o1/0o10 );
    }
    geometrio.setAttribute("color", new THREE.BufferAttribute(koloroj, 3));
    return geometrio;
  };

  // kreiFolitufon — Malgranda tufo da betulaj folioj ĉirkaŭ komuna punkto.
  //
  // ⟨ Kial 📃 ⟩ — ĉiu fasko estis TRI KRUCITAJ kartoj je fiksaj anguloj
  // ( 0°, +60°, −60° ĉirkaŭ la vertikala akso ), ĉiuj en la sama ebeno. De
  // flanko tio aspektas kiel SESPINTA ASTERISKO de maldikaj klingoj, kaj ĝuste
  // tion oni vidis en la krono: verdaj steloj anstataŭ folioj. Nun ĉiu folio
  // de la tufo ricevas sian propran direkton ( plenan cirklon, ne fiksajn
  // angulojn ), sian propran klinon, sian propran rulon kaj sian propran
  // longon — de iu ajn flanko la tufo estas tufo da folioj.
  const kreiFolitufon = ( longo: number, largho: number, kvanto: number ): THREE.BufferGeometry => {
    const folioj: THREE.BufferGeometry[] = [];
    const bazo = Math.random() * Math.PI * 2;
    for ( let j = 0; j < kvanto; j++ ) {
      const folio = kreiFolianKarteton(
        longo * ( 0o7/0o10 + Math.random() * 0o5/0o10 ),
        largho * ( 0o4/0o5 + Math.random() * 0o5/0o10 ));
      // ⟨ La ordo de la turnoj 📃 ⟩ — kun la defaŭlta ordo "XYZ" la lasta
      // turno okazas ĉirkaŭ la MONDA X-akso, kiu post la kurbiĝo kaj la turno
      // ne plu estas la longa akso de la klingo: la "rulo" do ne rulis la
      // folion ĉirkaŭ ĝia propra vejno, sed ĝin klinis flanken. Kun "YXZ" la
      // sinsekvo estas ĝusta — unue la klino en la ebeno de la folio, poste la
      // rulo ĉirkaŭ ĝia propra longa akso, fine la turno ĉirkaŭ la vertikalo.
      folio.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(
        // rulo — la klingo turniĝas ĉirkaŭ sia propra longa akso
        ( Math.random() - 0o5/0o10 ) * 0o4/0o5,
        // turno — ĉiu folio direktiĝas al sia propra flanko
        bazo + j / kvanto * Math.PI * 2 + ( Math.random() - 0o5/0o10 ) * 0o6/0o10,
        // klino — la folioj pendas malsupren sub sia propra pezo
        -0o15/0o100 - Math.random() * 0o5/0o10, "YXZ")));
      folioj.push(folio);
    }
    return kunfandiGeometriojnSenIndekson(folioj);
  };

  // ⟨ Kiom larĝa la klingo 📃 ⟩ — la kartono devas havi la SAMAN proporcion
  // kiel la folio desegnita en la teksaĵo ( ~2:1 ), alie la teksaĵo streĉiĝas
  // kaj la folio aspektas dika kaj distordita. Ĉiuj folioj de la krono uzas
  // ĉi tiun proporcion.
  const LARĜA_PROPORCIO = 0o1/0o2;

  // ⟨ La folioj estas tro grandaj 📃 ⟩ — la kusenoj estas 2–5 unuojn larĝaj,
  // do folio de 0.13–0.19 unuoj montriĝas sur la krono kiel brasiko: ĉiu
  // kuseno vidigas kelkajn MEGALAJN foliojn anstataŭ centojn da etaj. Veraj
  // betulaj folioj estas etaj kompare kun la arbo; per ĉi tiu faktoro la krono
  // reakiras sian fajnan foligran teksturon. La kusenoj ricevas pli da folioj
  // ( vidu faskoj kaj randaj ) por ke la mantelo restu densa.
  const FOLIA_SKALO = 0.8;

  // Foliaj faskoj — la folioj grupiĝas en malgrandajn faskojn ĉirkaŭ
  // maldikaj branĉetoj, kiuj kreskas el la centra maso de la kuseno.
  // Tri kompaktaj radialaj tavoloj — la kuseno restas malgranda ( r ĝis ~0.4 ).
  // Pluraj folifaskoj po kuseno ( 8 → 12 ) — la krono densiĝas kaj la folioj
  // legiĝas kiel foliaro, ne kiel kelkaj apartaj branĉetoj.
  const faskoj = 0o17;
  for ( let i = 0; i < faskoj; i++ ) {
    const a = i / faskoj * Math.PI * 2 + ( Math.random() - 0o5/0o10 ) * 0o5/0o10;
    const tavolo = i % 0o3;
    const ekstera = tavolo / 0o2;
    // ⟨ La folioj sidas SUR la kuseno 📃 ⟩ — la foliaj tufoj antaŭe iris ĝis
    // 0.32 de la centro de la kuseno, dum la kusena MASO mem atingas nur ~0.46
    // ( kaj kun la skalo de la granda supra kuseno tio estas pli ol duoble la
    // larĝo de la maso ). La folioj do ŝvebis ekster la kuseno, kaj la krono
    // aspektis kiel nubo el disaj folioj. Nun ili sidas ene de la maso.
    const r = 0o14/0o100 + tavolo * 0o10/0o100 + ( Math.random() - 0o5/0o10 ) * 0o1/0o40;
    // ⟨ Ne ĉio en unu ebeno 📃 ⟩ — kun y-variado de nur ±0.05 la folifaskoj de
    // la tri "tavoloj" sidis preskaŭ sur unu horizontala ebeno, kaj la kuseno
    // montriĝis plata kiel telero. Veraj folioj sidas je malsamaj altoj kaj
    // superkovras sin unu la alian en profundo.
    const y = ( Math.random() - 0o5/0o10 ) * 0o14/0o100;
    const celo = new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r);
    // Maldika branĉeto de la centro ĝis la fasko — ĝi videble ligas la
    // foliojn al la centra maso.
    if ( celo.length() > 0o1/0o100 ) {
      const direkto = celo.clone().normalize();
      const branĉeto = new THREE.CylinderGeometry(0o10/0o1000, 0o20/0o1000, celo.length(), 4)
        .translate(0, celo.length() / 2, 0);
      branĉeto.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(
        new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direkto)));
      partoj.push(kunTinto(branĉeto, 0.62, 0.6, 0.54));
    }
    // Tri aŭ kvar foliaj tufoj ĉirkaŭ la pinto de la branĉeto — ĉiu tufo
    // portas siajn proprajn foliojn kun propraj anguloj.
    const folioj = 0o3 + ( ( Math.random() * 0o2 ) | 0 );
    for ( let j = 0; j < folioj; j++ ) {
      const longo = ( 0o13/0o100 + Math.random() * 0o6/0o100 )
        * ( 1 - ekstera * 0o1/0o4 ) * FOLIA_SKALO;
      const largho = longo * LARĜA_PROPORCIO * ( 0o4/0o5 + Math.random() * 0o5/0o10 );
      const folio = kreiFolitufon(longo, largho, 0o3);
      // Natura klino — la tufo pendas iomete malsupren kaj turniĝas ĉirkaŭ
      // sia tigo, neniam uniforme radiale.
      const klino = new THREE.Euler(
        -0o2/0o10 - Math.random() * 0o4/0o10,
        ( Math.random() - 0o5/0o10 ) * 0o7/0o10,
        ( Math.random() - 0o5/0o10 ) * 0o6/0o10);
      folio.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(klino));
      if ( j > 0 ) {
        folio.translate(
          celo.x + ( Math.random() - 0o5/0o10 ) * 0o3/0o20,
          celo.y + ( Math.random() - 0o5/0o10 ) * 0o3/0o20,
          celo.z + ( Math.random() - 0o5/0o10 ) * 0o3/0o20);
      } else {
        folio.translate(celo.x, celo.y, celo.z);
      }
      foliajPartoj.push(folio);
    }
  }
  // ⟨ La folia supro 📃 ⟩ — la kuseno ne rajtas finiĝi per glata VERDA PILKO.
  // La folioj de la flanka zono kaj de la rando portas la silueton, sed la
  // SUPRAĵO de la kuseno restis nuda sfero ( de supre la krono aspektis kiel
  // aro de verdaj pilkoj ). Nun tavolo de folioj kuŝas sur la supra duonsfero,
  // ĉiu kline gxuste tiom, ke ĝiaj klingoj sekvu la kurbiĝon de la kuseno.
  // ⟨ La sunflora disdono 📃 ⟩ — la folioj de la supro estis dismetitaj tute
  // HAZARDE, do iuj lokoj de la kupolo ricevis tri tufojn kaj aliaj neniun; tra
  // la malplenoj la MALHELA kerno de la kuseno montriĝis, kaj de supre ĉiu
  // betulo portis malhelajn makulojn sur la pinto de la krono. Nun la tufoj sidas
  // sur la sunflora spiralo ( la ora angulo ) kiel la semoj de sunfloro: la
  // disdono estas egala kaj sen amasiĝoj, do la sama nombro da folioj kovras la
  // tutan kupolon. Nur la klino de ĉiu folio restas hazarda — la krono ne
  // aspektas maŝina.
  const suprajFolioj = 0o66;
  const oraAngulo = Math.PI * ( 3 - Math.sqrt(5) );
  for ( let i = 0; i < suprajFolioj; i++ ) {
    const frakcio = Math.sqrt(( i + 0o1/0o2 ) / suprajFolioj );
    const spirala = i * oraAngulo;
    const rSupra = 0o30/0o100 * frakcio * Math.cos(spirala);
    const zSupra = 0o30/0o100 * frakcio * Math.sin(spirala);
    // La alteco sekvas la sf erojn de la kuseno. La KUPOLO estas la centra
    // sfero ( radiuso 0.21 ); la antaŭa 0.17 metis la foliojn de la pinto
    // INTERNE de tiu sfero, do la supro restis nuda kaj glata. Nun ili sidas
    // sur la surfaco — kaj iomete super ĝi, por ke ili ne dronu.
    const rNun = Math.hypot(rSupra, zSupra);
    const ySupra = 0.20 * Math.sqrt(Math.max(0, 1 - Math.pow(rNun / 0.30, 2))) + 0.012;
    const celo = new THREE.Vector3(rSupra, ySupra, zSupra);
    const longo = ( 0o12/0o100 + Math.random() * 0o6/0o100 ) * FOLIA_SKALO;
    const folio = kreiFolitufon(longo, longo * LARĜA_PROPORCIO * 0.9, 0o3);
    // La klino sekvas la deklivon de la sfero — sur la pinto la folioj kuŝas
    // preskaŭ horizontale, ĉe la flankoj ili pendas malsupren laŭ la kurbiĝo.
    const deklivo = Math.min(1, rNun / 0.30) * 0.85;
    const a = Math.atan2(zSupra, rSupra);
    folio.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(
      0,
      -a + ( Math.random() - 0o1/0o2 ) * 0.9,
      -deklivo - Math.random() * 0o1/0o4, "YXZ")));
    folio.translate(celo.x, celo.y, celo.z);
    foliajPartoj.push(folio);
  }
  // ⟨ La folia rando 📃 ⟩ — la kuseno ne rajtas finiĝi per glata sfera rando:
  // vera betula kuseno havas faskojn kaj maldikajn branĉetojn elstarantajn tra
  // sia rando. La rando ankaŭ iomete PENDAS — la folioj kliniĝas malsupren,
  // kio donas al la krono la maldensan, aeran betulan silueton.
  const randaj = 0o34;   // densa, foliplena rando
  for ( let i = 0; i < randaj; i++ ) {
    const a = i / randaj * Math.PI * 2 + ( Math.random() - 0o5/0o10 ) * 0o2/0o10;
    // ⟨ Ĝuste ĉe la rando de la kusena maso 📃 ⟩ — la kerno nun atingas 0.34
    // ( plus la radiuso de la pufo ), do la branĉetoj de la rando startas
    // iomete PLI ekstere ol antaŭe. Tiel la folioj — ne la malhela kerno —
    // estas la plej eksteraĵo de la kuseno, kio donas la maldikan, aeran
    // betulan silueton.
    const r = 0o33/0o100 + Math.random() * 0o7/0o100;
    const celo = new THREE.Vector3(Math.cos(a) * r,
      -0o4/0o100 + ( Math.random() - 0o5/0o10 ) * 0o26/0o100, Math.sin(a) * r);
    const branĉeto = new THREE.CylinderGeometry(0o6/0o1000, 0o16/0o1000, r, 4)
      .translate(0, r / 2, 0);
    branĉeto.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(
      new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0),
        celo.clone().normalize())));
    partoj.push(kunTinto(branĉeto, 0.62, 0.6, 0.54));
    // Tri folioj ĉe la pinto de ĉiu randa branĉeto, klinitaj malsupren.
    for ( let j = 0; j < 0o3; j++ ) {
      // ⟨ La randa foliaro 📃 ⟩ — la folioj de la randaj branĉetoj estas pli
      // grandaj ol tiuj interne ( la lumo estas ĉe la rando ), kaj ili estas la
      // UNUAĵO, kion la okulo vidas ĉe la silueto de la krono: antaŭe ili estis
      // tiel etaj, ke la kusenoj finiĝis per nuda, glata sfera rando.
      const longo = ( 0o13/0o100 + Math.random() * 0o6/0o100 ) * FOLIA_SKALO;
      // ⟨ La larĝo 📃 ⟩ — ĉi tie estis 0.55 ( preskaŭ 3× la longo ). Tri
      // krucitaj tiaj kartoj faris GRANDAN PLATAN DISKON ĉe la rando de ĉiu
      // kuseno — videblaj verdaj teleroj elstarantaj el la krono. Nun la karto
      // portas unu veran folion ( vidu LARĜA_PROPORCIO ).
      const largho = longo * LARĜA_PROPORCIO * ( 0o4/0o5 + Math.random() * 0o4/0o10 );
      const folio = kreiFolitufon(longo, largho, 0o3);
      // La randa tufo pendas pli forte malsupren — ĝi estas la silueto de la
      // krono kontraŭ la ĉielo.
      folio.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(
        -0o5/0o10 - Math.random() * 0o4/0o10,
        ( Math.random() - 0o5/0o10 ) * 0o7/0o10,
        ( Math.random() - 0o5/0o10 ) * 0o5/0o10, "YXZ")));
      folio.translate(celo.x, celo.y, celo.z);
      foliajPartoj.push(folio);
    }
  }
  // ⟨ La folioj SUB la kuseno 📃 ⟩ — betulaj folioj pendas ankaŭ sub la
  // kuseno, kie la branĉetoj estas pli malhelaj kaj la lumo nur trafas ilin
  // de malantaŭe. Sen ili la malsupra rando de ĉiu kuseno estis glata sfero,
  // kaj la krono aspektis kiel pilko de malsupre.
  const subaj = 0o12;
  for ( let i = 0; i < subaj; i++ ) {
    const a = i / subaj * Math.PI * 2 + ( Math.random() - 0o5/0o10 ) * 0o4/0o10;
    const r = 0o14/0o100 + Math.random() * 0o16/0o100;
    const celo = new THREE.Vector3(Math.cos(a) * r,
      -0o1/0o12 - Math.random() * 0o10/0o100, Math.sin(a) * r);
    const longo = ( 0o10/0o100 + Math.random() * 0o5/0o100 ) * FOLIA_SKALO;
    const folio = kreiFolitufon(longo, longo * LARĜA_PROPORCIO, 0o2);
    // Forta klino malsupren — ĉi tiuj folioj pendas, ili ne leviĝas.
    folio.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(
      -0o2/0o10,
      a + ( Math.random() - 0o5/0o10 ) * 0o5/0o10,
      -0o4/0o5 - Math.random() * 0o4/0o10, "YXZ")));
    folio.translate(celo.x, celo.y, celo.z);
    foliajPartoj.push(folio);
  }
  // Neniu centra vertikala cilindro — la malnova akso montriĝis kiel malhela
  // vertikala konuso inter la du kronoj. La foliaj kusenetoj kaj kartoj mem
  // tenas la foliaron ligita al la trunko.
  return { maso: kunfandiGeometriojnSenIndekson(partoj),
    folioj: kunfandiGeometriojnSenIndekson(foliajPartoj) };
}
