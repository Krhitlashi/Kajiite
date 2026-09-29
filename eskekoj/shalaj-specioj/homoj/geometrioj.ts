// ≺⧼ La konstantaj geometrioj 🧩 ⧽≻
// La KAŜMEMORO de la figuroj — la figuroj de ĉiuj NPC-oj uzas la SAMAJN formojn
// ( la kapo, la robo, la pantalono, la botoj, la manikoj, la haroj ktp. ), do ili
// konstruiĝas UNUFOJE ( figurajGeometriojn ) kaj dividiĝas inter ĉiuj figuroj. La
// sama materialo neniam bezonas du meshojn — ĉio, kio dividas la materialon,
// kunfandiĝas en unu geometrion antaŭ la bildigo, do la desegnaj alvokoj de la
// tuta NPC-aro malmultiĝas je preskaŭ triono.
import * as THREE from "three";
import { kunfandiGeometriojn } from "../../komunajxoj/kunfandajxoj.js";
import { kreiBotan } from "./boto.js";
import { kreiArtikanSferon, remapiUVon } from "./formoj.js";
import { kreiKorpanTorson, kreiKorpanKruropon, kreiKorpanBrakon, kreiKorpanManon, kreiKorpanPiedon, kreiPantalonan } from "./korpo.js";
import { OKULA_ALTO, OKULA_DX, OKULA_DY, OKULA_DZ, OKULA_LARĜO } from "./okuloj.js";
import { KOLO_Y, KUBUTO_Y } from "./mezuroj.js";
import { kreiFoliaTonditanTubon, kreiMalfermanRobonSxelon, kreiInternanSxelon } from "./sxeloj.js";
import { kreiOkulon, kreiPalpebrojn, kreiNazon, kreiKapanKranion, kreiOrelon, kreiVizaĝajnStrikojn, kreiBuŝon } from "./vizagxo.js";


// ⟨ Konstantaj geometrioj 📃 ⟩ — la figuroj de ĉiuj NPC-oj uzas la SAMAJN
// formojn ( la kapo, la robo, la pantalono, la botoj, la manikoj, la haroj ktp. ),
// do ili konstruiĝas UNUFOJE ĉi tie kaj dividiĝas inter ĉiuj figuroj.
// ⟨ La kunigado 📃 ⟩ La sama materialo neniam bezonas du meshojn. Antaŭe la
// kapo kaj la kolo estis du meshoj, la bota ŝafto kaj la piedo du pliaj, kaj la
// longa hararo kvar ( la ĉapo, la kurteno kaj la du flankaj strioj ). Ĉio, kio
// dividas la materialon, kunfandiĝas en unu geometrion antaŭ la bildigo — la
// desegnaj alvokoj de la tuta NPC-aro malmultiĝas je preskaŭ triono, dum la
// modeloj ricevas PLI da detaloj ( la oreloj, la nazo, la okuloj kaj la manoj
// aldoneblas sen nova mesho ).

// ⟨ La homa modelo kaj la vesto-modelo 📃 ⟩ La geometrioj apartenas al du grupoj —
// la HOMA modelo ( la kapo, la vizaĝo, la mano, la torso kaj la kruroj — la
// haŭto ) kaj la VESTA modelo ( la robo, la interna ĉemizo, la pantalono, la
// manikoj, la botoj kaj iliaj akcentaj partoj ). Ili dividas neniun geometrion kaj
// ĉiu mesho de la figuro ricevas sian grupon en userData.speco, do la figuro
// ankaŭ portas la du listojn ( korpo kaj vesto ) — la vesto povas kaŝiĝi, ŝanĝiĝi
// aŭ anstataŭiĝi sendepende de la korpo.
let figurajGeometrioj: {
  kapa: THREE.BufferGeometry;       // la kapo, la oreloj, la nazo kaj la kolo ( la haŭto )
  vizaĝo: THREE.BufferGeometry;     // la okuloj ( malhela materialo, dividita )
  vizaĝajStrikoj: THREE.BufferGeometry; // la brovoj kaj la okulharoj ( hara materialo )
  palpebroj: THREE.BufferGeometry;  // la palpebroj ( haŭto, moviĝas dum palpebrumo )
  korpo: THREE.BufferGeometry;      // la torso ( la homa modelo, sub la ĉemizo )
  // ⟨ La membroj venas en DU partojn 📃 ⟩ — la kruro kaj la brako disiĝas ĉe la
  // genuo kaj la kubuto, ĉar ili fleksiĝas tie ( vidu marŝSvingon ). La malsupraj
  // partoj mezuriĝas de la artiko, do iliaj meshoj sidas ĉe la nulo en la artika
  // grupo; la supraj partoj restas en la kadro de la kokso kaj de la ŝultro.
  kruroSupra: THREE.BufferGeometry; // la femuro
  kruroMalsupra: THREE.BufferGeometry; // la tibio plus la patelo
  korpaPiedo: THREE.BufferGeometry; // la homa piedo ( en la maleola grupo de la ŝuo )
  brakoSupra: THREE.BufferGeometry; // la ŝultro kaj la bicepso
  brakoMalsupra: THREE.BufferGeometry; // la antaŭbrako plus la kubuta osto
  mano: THREE.BufferGeometry;       // la manplato, la dikfingro kaj la fingroj
  ungoj: THREE.BufferGeometry;      // la ungoj de la fingroj ( sia materialo )
  interna: THREE.BufferGeometry;    // la interna ĉemizo ( kun la kolumo )
  roba: THREE.BufferGeometry;       // ↓ la vesto-modelo
  pantalonaSupra: THREE.BufferGeometry;
  pantalonaMalsupra: THREE.BufferGeometry;
  boto: THREE.BufferGeometry;       // la bota ŝafto kaj la piedo ( unu materialo )
  akcenta: THREE.BufferGeometry;    // la plando kaj la akcentaj randoj de la ŝuo
  manikaSupra: THREE.BufferGeometry;    // la foli-tondita tubo super la kubuto
  manikaMalsupra: THREE.BufferGeometry; // la tubo sub la kubuto ( la tondita rando )
} | null = null;

export function figurajGeometriojn(): NonNullable<typeof figurajGeometrioj> {
  if ( figurajGeometrioj ) return figurajGeometrioj;

  // ⟨ La kapo 📃 ⟩ — la kranio ( vidu kreiKapanKranion ) kun du oreloj kaj la
  // kolo, ĉiuj kunfanditaj en unu geometrion ( ili estas la sama haŭto ).
  const kapo = kreiKapanKranion();
  // ⟨ La kolo MALDIKIĜIS 📃 ⟩ — la malnova kolo estis 0.109 … 0.125, nome 0.22
  // larĝa, dum la kapo estas 0.34. Vera kolo estas proksimume 0.6 de la kapo, do
  // la malnova dika cilindro legis kiel la daŭrigo de la vizaĝo kaj la makzelo
  // neniam havis suban randon. Nun ĝi estas 0.09 … 0.11.
  const kolo = new THREE.CylinderGeometry(0o56/0o1000, 0o71/0o1000, 0o5/0o40, 0o14, 0o1);
  kolo.translate(0, KOLO_Y, 0);
  const kapajPartoj: THREE.BufferGeometry[] = [ kapo, kolo ];
  // ⟨ La oreloj nun estas ŜELOJ 📃 ⟩ — la malnova orelo estis premita GLOBO, do
  // ĝi havis la ĝustan grandon sed neniun konturon. Nun ĉiu orelo estas ŝelo el
  // sekcoj ( vidu kreiOrelon ) — ĝi elkreskas el la vango kaj finiĝas per rimo,
  // kiu staras for de la kapo. La antaŭa rando sidas ene de la kranio, do la du
  // formoj kunfandiĝas sen fendo, kaj la supra rimo restas sub la har-limo ( la
  // haroj pasas 0.008 super la orelo ĉe la flanko — vidu kreiHaranĈapon ).
  for ( const dir of [ -0o1, 0o1 ] ) kapajPartoj.push(kreiOrelon(dir));
  // ⟨ La nazo 📃 ⟩ — rondigita TRIANGULO sur la vizaĝa surfaco ( vidu kreiNazon ).
  // Ĝiaj antaŭaj versioj — skatolo ( kiu sidis tute INTERNE de la kapo kaj neniam
  // videblis ), poste globo ( kiu legiĝis kiel glata tubero ). La triangulo havas
  // la ponton supre, la pinton malsupre kaj la flugilojn flanken, kaj la pinto
  // elstaras pli ol la ponto — la vizaĝo do ricevas profilon sen beko.
  kapajPartoj.push(kreiNazon());
  const kapa = kunfandiGeometriojn(kapajPartoj);

  // ⟨ La vizaĝo 📃 ⟩ — la okuloj kaj la brovoj. Ili sidas PRESKAŬ tute en la
  // kapo ( nur malgranda ĉapo elstaras ), do ili legiĝas kiel okuloj anstataŭ
  // kiel globoj. Aparta geometrio, ĉar ili portas sian propran malhelan
  // materialon — unu dividitan meshon por ĉiuj figuroj.
  // ⟨ La okuloj 📃 ⟩ — almandoj ( vidu kreiOkulon ). Nun ili estas 0o4/0o200 da
  // mondunuoj larĝaj kaj 0o13/0o1000 altaj, do la okulo estas pli LARĜA ol alta —
  // la proporcio de vera okulo. La interna angulo sidas iomete pli malalte ol la
  // ekstera ( la klino ), do la rigardo havas direkton anstataŭ esti plata.
  // ⟨ Kial NENIAJ brovoj 📃 ⟩ — du maldikaj lensoj super la okuloj estis provitaj,
  // sed la facetoj de la kapa sfero estas interne de la ideala sfero ( la krano
  // estas malalt-poligona ), do maldika lenso aŭ flosis super la vizaĝo aŭ
  // malaperis interne de ĝi — la brovoj aspektis kiel du mallumaj naĝiloj. La
  // grandaj malhelaj okuloj mem portas la rigardon, do la brovoj foriĝis.
  const okuloj: THREE.BufferGeometry[] = [
    kreiOkulon(-0o1, OKULA_DX, OKULA_DY, OKULA_DZ, OKULA_LARĜO, OKULA_ALTO, -0o1/0o10),
    kreiOkulon(0o1, OKULA_DX, OKULA_DY, OKULA_DZ, OKULA_LARĜO, OKULA_ALTO, 0o1/0o10),
  ];
  // ⟨ La buŝo ALDONIĜAS al la vizaĝa geometrio 📃 ⟩ — la buŝo portas la saman
  // malhelan materialon kiel la okuloj, do ĝi aliĝas al ilia geometrio anstataŭ
  // fari trian meshon por ĉiu figuro — kaj ĝi restas kolorigita per la okula
  // paletro de la figuro.
  const vizaĝo = kunfandiGeometriojn([ ...okuloj, kreiBuŝon() ]);
  // ⟨ La brovoj kaj la okulharoj 📃 ⟩ — aparta geometrio, ĉar ili portas la HARAN
  // materialon ( la vizaĝa materialo estas dividita po okula paletro, do brovo
  // pentrita en ĝia kanvaso havus la saman koloron por ĉiuj figuroj ).
  const vizaĝajStrikoj = kreiVizaĝajnStrikojn();

  // ⟨ La botoj 📃 ⟩ — la tuta ŝuo ( la ŝtipo kun la ruliĝanta manumo, la piedo
  // kun la malaltiĝanta pinto ) kaj la plando venas el kreiBotan. La plando jam
  // SIDAS sub la piedo kaj la pinto de la boto kongruas kun la tero, do ĉi tie
  // restas nur la geometrio.
  const { boto, akcentaj } = kreiBotan();

  // ⟨ La brako kaj la mano 📃 ⟩ — la brako ( vidu kreiKorpanBrakon ) eniras la
  // manikon kaj finiĝas per la mano ( vidu kreiKorpanManon ). La du manoj uzas la
  // SAMAN geometrion — la spegulado okazas per scale.x en konstruiFiguron, ĉar la
  // dikfingro sidas ĉe la interna flanko.
  const kruro = kreiKorpanKruropon();
  const brako = kreiKorpanBrakon();
  const pantalono = kreiPantalonan();
  // ⟨ La mano kaj la ungoj 📃 ⟩ — la sama geometrio por ambaŭ manoj, sed la ungoj
  // estas aparta geometrio, ĉar ili portas alian materialon ( vidu ungaMaterialon ).
  const manoj = kreiKorpanManon();
  // ⟨ La maniko estas disigita ĉe la KUBUTO 📃 ⟩ — la sama alto kiel la brako ( vidu
  // kreiKorpanBrakon ), do la du partoj de la maniko fleksiĝas kune kun la brako.
  // La radiuso ĉe la kubuto estas la LINIA interpolo inter la ŝultro kaj la
  // manumo, do la du duonoj renkontiĝas per la sama cirklo — ne estas ŝtupo.
  // ⟨ La du duonoj RICEVAS la saman UV-mapadon 📃 ⟩ — la manika kanvaso portas la
  // PENTRITAN akcentan bordon de la tondita rando ( vidu vestaTeksajxon ), kaj ĝi
  // uzas v de 0 ( la ŝultro ) ĝis 1 ( la rando ). Sen la remapo ĉiu duono havus
  // sian propran v de 0 ĝis 1, do la bordo montriĝus ankaŭ ĉe la kubuto kaj la
  // teksajxo ripetiĝus dufoje.
  const MANIKA_SUPRO = 0o11/0o200;      // 0.0703 — la ŝultro
  // ⟨ La manumo nun KOVRAS la manon 📃 ⟩ — la pojno sidas 0.16 sub la kubuto kaj
  // la manŝtono etendiĝas de 0.15 ĝis 0.41 sub ĝi, do la malnova manumo ( 0.0547,
  // finiĝante 0.16 sub la kubuto ) lasis la tutan manon nudan. Nun la manumo estas
  // 0.0781 — iomete pli larĝa ol la ŝultro de la maniko, ĉar la ŝtofo DRAPIĜAS
  // super la manon — kaj la rando pendas 0.25 sub la kubuton, sur la DORSON de la
  // mano, dum la fingroj elstaras. La manŝtono atingas 0.0742 ĉe sia plej larĝa
  // punkto ( 0.30 sub la kubuto ), do la ŝtofo restas 0.004 … 0.008 ekstere de la
  // haŭto sur la tuta vojo malsupren ( mezurite per la verticoj de la manŝtono, kiuj
  // ankaŭ montris la malnovan manikon 0.02 tro mallarĝan super la fingroj ).
  const MANIKA_MALSUPRO = 0o50/0o1000;  // 0.0781 — la manumo ( super la mano )
  const KUBUTA_Y = KUBUTO_Y;                 // −0.3398 — la kubuto ( vidu KUBUTO_Y )
  // ⟨ La manumo pendas 0.25 sub la kubuton 📃 ⟩ — la malsupra rando de la maniko
  // mezuriĝas de la KUBUTO ( ne de la ŝultro ), ĉar la du duonoj renkontiĝas tie.
  const MANUMO_MALSUPRO = 0o1/0o4;           // 0.25 — kiom la rando pendas sub la kubuto
  const MANIKA_BAZO = KUBUTA_Y - MANUMO_MALSUPRO;   // −0.5898 — la manika fina alto
  const KUBUTA_V = KUBUTA_Y / MANIKA_BAZO;   // 0.576 — la kubuto laŭ la manika longo
  // ⟨ La maniko NE mallarĝiĝas plu 📃 ⟩ — la radiuso de la maniko sekvis la saman
  // lerpon kiel la longo ( 0.0597 ĉe la kubuto ), do la maniko mallarĝiĝis ĝuste
  // tie, kie la brako DIKIĜAS — la bicepso estas 0.0644 ( kun sia antaŭena ŝovo )
  // ĉe la sama alto kaj la ŝtofo atingis nur 0.0643, do la haŭto trapikis la
  // manikon per 0.005 dum la tuta paŝo ( mezurite per radioj ĉe azimuto 270, kie la
  // brako estas plej dika ). Nun la manumo estas pli larĝa ol la ŝultro, do la
  // maniko etendiĝas anstataŭ mallarĝiĝi kaj la kubuta radiuso estas 0.0723 — la
  // ŝtofo restas 0.008 ekstere de la bicepso sur la tuta manika longo, kaj la sama
  // radiuso pligrandigas la kubutan sferon ( manikaArtiko ) tiel ke la olekrano
  // ankaŭ restas kovrita.
  const KUBUTA_R = MANIKA_SUPRO + ( MANIKA_MALSUPRO - MANIKA_SUPRO ) * 0o1/0o4;
  const manikaSupra = remapiUVon(kreiFoliaTonditanTubon(MANIKA_SUPRO, KUBUTA_R, 0,
    KUBUTA_Y, 0o60, 0o4, 0, 0, true), 0, KUBUTA_V);
  // ⟨ La folia rando MALPROFUNDIĜIS 📃 ⟩ — la tonditaj loboj pendis 0.125 sub la
  // manumo kaj la noĉoj leviĝis 0.031, do la rando tondiĝis 0.156 — triono de la
  // tuta maniko. La brako estis videbla tra la larĝaj V-fendoj inter la loboj kaj
  // la manumo aspektis TRAPIKITA de la brako. Nun la loboj pendas 0.023, do la
  // rando ondas sen malfermi la brakon.
  // ⟨ La rando MALPLI ONDAS super la mano 📃 ⟩ — la manumo nun finiĝas super la
  // manŝtono, do larĝaj V-noĉoj montrus la haŭton tra la maniko mem. La folioj
  // do pendas nur 0.023 kaj la noĉoj leviĝas 0.016, do la rando restas preskaŭ
  // rekta linio kun mola undeto.
  const malprofundeco = 0o3/0o200;           // 0.0234 — kiom la loboj pendas
  const manikaMalsupra = kreiFoliaTonditanTubon(KUBUTA_R, MANIKA_MALSUPRO, KUBUTA_Y,
    MANIKA_BAZO, 0o60, 0o4, malprofundeco, 0o10/0o1000, false);
  remapiUVon(manikaMalsupra, KUBUTA_V, 0o1);
  manikaMalsupra.translate(0, -KUBUTA_Y, 0);
  // ⟨ La kubuto de la maniko 📃 ⟩ — la maniko havas sian propran artikon, kiel la
  // brako kaj la pantalono. Sen ĝi la kojno inter la du duonoj montrus la HAŬTON
  // de la brako ( la artiko de la brako estas nur 0.002 ene de la ŝtofo ), do la
  // kubuto aspektus kiel truo en la vesto.
  // ⟨ La sfero SIDAS kiel la braka olekrano 📃 ⟩ — la braka kubuto-ringo estas
  // ŝovita 0.0059 MALANTAŬEN ( la olekrano ), do ĝi atingas 0.0577 de la akso dum
  // la sfero de la maniko ( sen ŝovo, radiuso 0.0562 ) atingis nur 0.0562 — la
  // osto trapikis la kubuton de la vesto per mola tubero dum ĉiu flekso. Nun la
  // sfero portas la SAMAN ŝovon kaj la plenan radiuson KUBUTA_R, do la ŝtofo
  // ĉirkaŭas ĝin ĉie.
  const manikaArtiko = kreiArtikanSferon([ 0, 0, -0o3/0o1000 ], KUBUTA_R, 0o7/0o10);
  figurajGeometrioj = {
    // ⟨ La homa modelo 📃 ⟩ — la kapo, la vizaĝo, la torso, la brakoj, la kruroj
    // kaj la manoj.
    kapa,
    vizaĝo,
    vizaĝajStrikoj,
    palpebroj: kreiPalpebrojn(),
    korpo: kreiKorpanTorson(),
    kruroSupra: kruro.supra,
    kruroMalsupra: kruro.malsupra,
    korpaPiedo: kreiKorpanPiedon(),
    brakoSupra: brako.supra,
    brakoMalsupra: brako.malsupra,
    mano: manoj.mano,
    ungoj: manoj.ungoj,
    interna: kreiInternanSxelon(),
    // ⟨ La vesto-modelo 📃 ⟩ — la robo, la pantalono, la manikoj kaj la ŝuoj. La
    // pantalono finiĝas ene de la bota ŝtipo ( vidu kreiPantalonan ), do la du
    // modeloj kunvenas en la ŝuo kaj neniu rando flagras.
    roba: kreiMalfermanRobonSxelon(),
    pantalonaSupra: pantalono.supra,
    pantalonaMalsupra: pantalono.malsupra,
    boto,
    akcenta: akcentaj,
    // ⟨ La maniko mallongiĝis kun la robo 📃 ⟩ — la foli-pintoj antaŭe iris ĝis
    // −0.875 ( la mondo 0.539 ) kaj pendis sub la roba rando kiel vosto. Nun la
    // bazo estas −0.4375 kaj la pintoj finiĝas ĉe −0.5625 ( la mondo 0.859 ) — ili
    // restas 0.35 super la roba rando, kaj la fingropintoj de la mano ( −0.741 )
    // elstaras 0.18 SUB ili.
    // ⟨ La manumo ne plu trapikas la manon 📃 ⟩ — la bazo estis −0.5, do la
    // foli-pintoj pendis ĝis −0.6 kaj la PLEJ LARĜA parto de la mano ( 0.074 de
    // la braka akso, la dikfingra flanko ) trapikis la foliojn dum ĉiu paŝo. La
    // tubo mallongiĝis al la pojno (−0.4375, la foli-pintoj ĝis −0.5625), do la
    // manumo nun finiĝas SUPER la larĝa parto kaj la mankolo aperas nur sube.
    // La manumo restas MALVASTA ( 0.0547 ) — ĝi ĉirkaŭas la pojnon ( 0.033 … 0.047 )
    // kaj kaŝas la malferman buŝon de la tubo.
    manikaSupra,
    manikaMalsupra: kunfandiGeometriojn([ manikaMalsupra, manikaArtiko ]),
  };
  return figurajGeometrioj;
}
