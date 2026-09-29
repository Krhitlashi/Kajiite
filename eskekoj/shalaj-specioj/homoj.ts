// ≺⧼ Homoj 🧍 ⧽≻
// NPC-modulo. figuroj vagantaj tra la sxtupurbo de ornaveth-v2
// Malalt-poligonaj figuroj kun tavoligitaj vestoj, foliaj manikoj, kvarstelo/rombo-motivoj
import * as THREE from "three";
import { HARSTILOJ } from "../vestaro/vestoj.js";
import type { Vesto, Harstilo } from "../vestaro/vestoj.js";

export type { Vesto };
import { figurajGeometriojn } from "./homoj/geometrioj.js";
import { HARO_Y, haraMaterialo, harKoloro, harKoloroA, harKoloroB, haranGeometrion } from "./homoj/haroj.js";
import { ledajMaterialoj, ungaMaterialo, vestajMaterialoj } from "./homoj/materialoj.js";
import { HALTO_GAMO, INTERNO_PIVOTO_Y, KOLO_Y, KUBUTO_Y, MALEOLO_Y, SASA_Y } from "./homoj/mezuroj.js";
import { OKULAJ_ELEKTOJ, PALPEBRA_DAURO, PALPEBRA_FERMO, PALPEBRA_INTERVALO, okulaMaterialo } from "./homoj/okuloj.js";
import { palpebraPivoto } from "./homoj/vizagxo.js";

// --- Figuro ---
export interface Figuro {
  group: THREE.Group;
  agordiVeston: ( o: Vesto ) => void;
  agordiHaranStilon: ( stilo: Harstilo ) => void;
  agordiHaranKoloron: ( koloro: number ) => void;
  hejmo: THREE.Vector3;
  celo: THREE.Vector3;
  atendo: number;
  rapido: number;
  // ⟨ La figuro havas propran ALTON 📏 ⟩ — la grupo mem estas skaliita per eta
  // faktoro ( vidu HALTO_GAMO kaj konstruiFiguron ), do la mondo havas homojn de
  // malsamaj altoj. La nombro restas ĉi tie por kalkuloj, kiuj bezonas la realan
  // alton de la figuro ( ekzemple etikedo super la kapo aŭ celo de rigardo ).
  alto: number;
  marsoFazo: number;          // akumulita marŝa fazo ( paŝa oscilo )
  movoFaktoro: number;        // 0 = staras, 1 = marŝas ( glata transiro )
  // ⟨ La palpebrumo havas sian propran tempilon 📃 ⟩ — la palpebrumo okazas
  // sendepende de la marŝo ( homo ankaŭ palpebrumas starante ), do ĝi ne povas
  // sekvi la paŝan FAZON — ĝi havas propran horloĝon. Ĉiu figuro ricevas hazardan
  // ekvaloron, do homamaso ne palpebrumas unisone.
  palpebraFazo: number;       // akumulita palpebra tempo ( sekundoj )
  palpebroj: THREE.Object3D;  // la haŭta folio super la okuloj
  kruroj: [ THREE.Object3D, THREE.Object3D ]; // pivot-grupoj [maldekstra, dekstra]
  brakoj: [ THREE.Object3D, THREE.Object3D ]; // pivot-grupoj [maldekstra, dekstra]
  // ⟨ La artikoj 📃 ⟩ — la genuo kaj la kubuto havas siajn proprajn pivot-grupojn
  // sub la kokso kaj la ŝultro, do la figuro fleksas la membrojn anstataŭ svingi
  // ĉiun membron kiel unu rigidan stangon. Vidu kreiKorpanKruropon kaj
  // kreiKorpanBrakon por la disigo de la geometrioj.
  genuoj: [ THREE.Object3D, THREE.Object3D ];
  kubutoj: [ THREE.Object3D, THREE.Object3D ];
  // ⟨ La ŝtofo kaj la kapo kiel animacieblaj partoj 📃 ⟩ — la robo kaj la
  // interna ĉemizo pendas de la zono ( roboGrupo ), la kapo kaj la haroj turniĝas
  // ĉirkaŭ la kolo ( kapoGrupo ), kaj la manikoj svingiĝas iomete MALFRUE
  // kontraŭ siaj brakoj. Sen ili la vestoj estus velditaj al la korpo kaj la
  // marŝo aspektus kiel unu rigida bloko.
  roboGrupo: THREE.Object3D;
  kapoGrupo: THREE.Object3D;
  // ⟨ La ceteraj animacieblaj partoj 📃 ⟩ — la torso ( la zono kiel pivoto, por
  // ke la ŝultroj turniĝu kontraŭ la koksoj kaj la supra korpo kliniĝu antaŭen ),
  // la maleolaj grupoj ( la ruliĝo de la plando ) kaj la har-grupo ( la malfruo de
  // la hararo kontraŭ la kapo ).
  torsoGrupo: THREE.Object3D;
  sxuoj: [ THREE.Object3D, THREE.Object3D ];
  haroGrupo: THREE.Object3D;
  manikoj: THREE.Object3D[];
  // ⟨ La interna ĉemizo havas sian propran pivoton 📃 ⟩ — la ĉemizo sidas en sia
  // propra grupo kies origino estas la ZONO, kaj tiu grupo sidas en la robo-grupo
  // ( la du tavoloj restas unu super la alia ). La geometrio de la ĉemizo estas en
  // la mondaj unuoj, do la mesho mem kompensas per −SASA_Y; sen la grupo la mesha
  // origino estus la GRUNDO kaj turno de la ĉemizo balancus ĝin per 1.5 metra
  // levilo. Kun la grupo la tuko sekvas la paŝon memstare — la mantelo kaj la
  // ĉemizo estas du tavoloj kaj ne pendas egale ( vidu marŝSvingon ).
  internoGrupo: THREE.Object3D;
  // ⟨ La du modeloj 📃 ⟩ — la meshoj de la homa modelo kaj tiuj de la vesto.
  // Vidu la blokon en konstruiFiguron; la du listoj estas ankaŭ markitaj per
  // userData.speco ( "korpo" / "vesto" ).
  korpoj: THREE.Object3D[];
  vestoj: THREE.Object3D[];
}

// konstruiFiguron — Konstruu NPC-figuron kun tavoligitaj vestoj, foli-manikoj
// kaj har-stiloj. Ĉiuj har-stiloj estas konstruitaj ( nur la elektita videbla ),
// por ke agordiHaron povu ŝanĝi la stilon poste sen rekonstruado.
//     @param o ( Vesto ) - La vesta objekto por koloroj.
//     @param haroKlavo ( string = "haroMalalta" ) - La ŝlosilo de la elektita
//         har-stilo ( sama kiel la nomo en HARSTILOJ ).
//     @param alto ( number = hazarda ) - La alta faktoro de la figuro. Sen la
//         argumento ĉiu figuro ricevas hazardan valoron en ± HALTO_GAMO, do la
//         homamaso ne estas egala; oni povas doni difinitan valoron por rolulo
//         kun fiksita alto ( aŭ por la ludanto, se ĝia alto gravas ).
export function konstruiFiguron(o: Vesto, haroKlavo = "haroMalalta",
  alto?: number): Figuro {
  const g = new THREE.Group();
  // ⟨ La alto VARIAS iomete 📏 ⟩ — la grupo SKALIĜAS per eta faktoro, do ĉiuj
  // partoj ( la korpo, la vestoj kaj ĉiuj pivot-grupoj ) konservas siajn rilatojn
  // kaj la marŝa animacio restas ĝusta — la turnoj de la animacio estas ANGULOJ,
  // kiuj ne dependas de la skalo, kaj la artikaj altroj ( KUBUTO_Y, la koksoj )
  // skalas kune kun la geometrio, do la mantelo kaj la manikoj ne disiĝas. La
  // origino de la grupo estas ĉe la PIEDOJ, do la figuro restas sur la grundo.
  // ⟨ Kial ne aparta geometrio 📃 ⟩ — skalo kostas nenion kaj la tuta figuro
  // ( inkluzive de la kaŝitaj variantoj de la vesto kaj de la haro ) sekvas ĝin
  // aŭtomate; aparta geometrio por ĉiu alto signifus rekonstrui la kanvasojn.
  const altaFaktoro = alto ?? ( 0o1 + ( Math.random() * 0o2 - 0o1 ) * HALTO_GAMO );
  g.scale.setScalar(altaFaktoro);
  const G = figurajGeometriojn();
  // La haŭto — UNU materialo por la kapo kaj la manoj. La okuloj havas sian
  // propran dividitan malhelan materialon ( VIZAĜO_M ), ĉar la har-koloro ne
  // rajtas tuŝi ilin — blonda hararo ne faru blondajn okulojn.
  const haŭto = new THREE.MeshStandardMaterial({ color: 0x605050, roughness: 0o55/0o100 });
  // La torso de la homa modelo — la brusto kaj la koksoj, kaŝitaj de la interna
  // ĉemizo ( kiu nun supreniras super la ŝultrojn — vidu kreiKorpanTorson ).
  const torso = new THREE.Mesh(G.korpo, haŭto);
  // La kapo jam portas la orelojn, la nazon kaj la kolon — la geometrio estas
  // kunfandita kaj sidas ĉe la gusta mondo-alto, do la mesho ne transformiĝas.
  const kapo = new THREE.Mesh(G.kapa, haŭto);
  // ⟨ Ĉiu figuro ricevas propran okulan paletron 📃 ⟩ — la materialoj estas nur
  // kvar ( vidu okulaMaterialo ), do la homamaso ne kostas pli da teksturoj.
  const vizaĝo = new THREE.Mesh(G.vizaĝo,
    okulaMaterialo(OKULAJ_ELEKTOJ[Math.floor(Math.random() * OKULAJ_ELEKTOJ.length)]));

  // La haro-materialo venas el la kaŝo ( vidu haraMaterialo supre ). La koloro
  // miksiĝas hazarde inter malhelbruna kaj ruĝeta malhelbruna por ĉiu NPC, kaj
  // la materialo mem portas la fadenan teksajxon kaj la malvarmetan brilon.
  harKoloro.lerpColors(harKoloroA, harKoloroB, Math.random());
  const haroM = haraMaterialo(harKoloro.getHex());
  // ⟨ La brovoj kaj la okulharoj portas la HARAN materialon 📃 ⟩ — ili estas
  // kolorigitaj kiel la hararo de la figuro ( kaj agordiHaranKoloron tuŝas ilin
  // kune kun la haroj ). Ili sidas en la kapo-grupo, do ili turniĝas kun la kapo,
  // kaj ili apartenas al la HOMA modelo, do kaŝi la vestojn ne tuŝas ilin.
  const strikoj = new THREE.Mesh(G.vizaĝajStrikoj, haroM);
  strikoj.position.y = -KOLO_Y;
  // ⟨ La palpebroj 📃 ⟩ — du haŭtaj kupoloj super la okuloj ( vidu kreiPalpebrojn ).
  // Ili portas la SAMAN haŭton kiel la kapo, do malfermitaj ili preskaŭ malaperas
  // kontraŭ la vizaĝo — nur ilia antaŭeno super la haŭto montriĝas, kaj tio legiĝas
  // kiel la supra palpebro de la okulo. La mesho GRANDIĜAS malsupren dum la
  // palpebrumo ( vidu marŝSvingon ), do nur ĝia skalo ŝanĝiĝas.
  const palpebroj = new THREE.Mesh(G.palpebroj, haŭto);
  palpebroj.position.y = palpebraPivoto();

  // La vestaj materialoj venas el la komuna cacheo — la sama vesto dividas ilin
  // inter ĉiuj figuroj ( vidu vestajMaterialoj supre ).
  const { internoM, eksteraM, pantalonoM, manikoM } = vestajMaterialoj(o);
  // La botoj kaj la plandoj ankaŭ venas el komuna kaŝo ( vidu ledajMaterialoj ).
  const { botoM, akcentaM } = ledajMaterialoj(o);

  // Interna ĉemizo — iras de la tuko ĝis la kolumo kaj montriĝas tra la antaŭa
  // malfermaĵo de la robo kaj tra ĝiaj eltranĉoj. La malsupro enŝoviĝas iomete
  // sub la roban suban randon ( ROB_Y_MALSUPRO ), por ke neniu koincida rando
  // flagru, kaj la tuta ĉemizo restas INTERNE de la robo. La geometrio jam sidas
  // ĉe la mondaj unuoj kaj portas sian propran elipsan sekcon ( vidu
  // kreiInternanSxelon ), do la mesho nur kompensiĝas per la ŝovo de la pivota
  // grupo — la sama konstruo kiel la robo.
  const interno = new THREE.Mesh(G.interna, internoM);
  interno.position.y = -INTERNO_PIVOTO_Y;
  // Ekstera robo — la malfermita mantelo ( vidu kreiMalfermanRobonSxelon ). La
  // geometrio jam sidas ĉe la mondaj unuoj, do la mesho nur kompensiĝas per la
  // ŝovo de la pivota grupo.
  const ekstera = new THREE.Mesh(G.roba, eksteraM);
  ekstera.position.y = -SASA_Y;
  // ⟨ La tuko svingiĝas ĉe la zono 📃 ⟩ — la robo kaj la interna ĉemizo sidas en
  // komuna grupo kies pivoto estas la ZONO ( ne la grundo ). Vera ŝtofo pendas de
  // la talio kaj svingiĝas malsupre; turno ĉirkaŭ la zono do svingas la tukon
  // ĝuste. La grupo tenas ambaŭ tavolojn KUNE, ĉar ili estas tavoligitaj unu
  // super la alia kaj ne rajtas disiĝi.
  // ⟨ La ĉemizo pendas de la ŜULTROJ 📃 ⟩ — la interna ĉemizo havas sian propran
  // grupon ene de la robo-grupo, sed ĝia pivoto NE estas la zono — ĝi sidas sur la
  // ŝultra linio ( vidu INTERNO_PIVOTO_Y ). La mesho do kompensas per
  // −INTERNO_PIVOTO_Y anstataŭ per −SASA_Y. Turno de la ĉemizo ĉirkaŭ la ŝultroj
  // svingas la tukon 0.84 kaj preskaŭ ne movas la kolumon nek la ŝultrojn — ĝuste
  // kiel ĉemizo, kiu pendas de la ŝultroj. La turnoj ALDONIĜAS al tiuj de la
  // mantelo, do la ĉemizo povas sekvi la paŝon memstare ( vidu marŝSvingon ).
  const roboGrupo = new THREE.Group();
  roboGrupo.position.y = SASA_Y;
  const internoGrupo = new THREE.Group();
  internoGrupo.position.y = INTERNO_PIVOTO_Y - SASA_Y;
  internoGrupo.add(interno);
  roboGrupo.add(internoGrupo, ekstera);

  // ⟨ La kruroj 📃 ⟩ — ĉiu kruro ( pantalono + boto + plando ) sidas en sia
  // propra pivot-grupo ĉe la kokso, por ke la kruroj povu svingiĝi antaŭen kaj
  // malantaŭen dum marŝado. La pivoto estas la x-akso tra la kokso-alto — la
  // sama linio por ambaŭ kruroj, do la grupo restas ĉe x = 0 kaj la partoj
  // portas la ± deklino.
  // ⟨ La pivoto sidas ĉe la KOKSO, ne ĉe la genuo 📃 ⟩ — antaŭe la kruro turniĝis
  // ĉirkaŭ 0.3125 ( la genuo ), do la tuta femuro svingiĝis tiom kiom la piedo kaj
  // la supra parto de la kruro — kiu sidas INTERNE de la ĉemizo — eliris tra la
  // ŝtofo dum ĉiu paŝo ( videbla haŭta makulo ĉe la kokso ). Nun la pivoto estas
  // la kokso ( 0.5625 ) kaj nur la suba kruro svingiĝas, kiel vera marŝo. La kruraj
  // geometrioj mezuriĝas de la genuo, do ĉiu gefilo portas genuoKompenso.
  // ⟨ La pivoto estas la KOKSO, la genuo sidas 0.4297 sub ĝi 📃 ⟩ — la kruraj
  // kaj pantalonaj geometrioj mezuriĝas de la GENUO, do ĉiu gefilo portas la
  // kompenson −0.4297 ( la kokso 0.9297 − la genuo 0.5 ).
  const koksoY = 0o167/0o200;                    // 0.9297 — la kokso ( la pivoto )
  const genuoKompenso = -0o67/0o200;             // −0.4297 — la genuo sub la kokso
  const kruroL = new THREE.Group(); kruroL.position.y = koksoY;
  const kruroR = new THREE.Group(); kruroR.position.y = koksoY;
  // ⟨ La kruroj estas pli proksime al la mezo 📃 ⟩ — antaŭe ± 0.1875. Kun la
  // pantalona radiuso 0.156 la kruroj tiam atingis ± 0.34, do la tuta kruro
  // elstaris TRA la robo ( radiuso 0.234 ĉe tiu alto ) kaj la figuro aspektis
  // kiel portanta mallongajn pantalonojn SUPER la ĉemizo. La kruroj sidas je
  // ± 0.075 kaj la pantalona radiuso ( 0.141 ĉe la kokso ) nun restas INTERNE.
  // ⟨ La pantalono ankaŭ venas en DU partojn 📃 ⟩ — la supra parto sidas ĉi tie ( la
  // koksa grupo ) kaj la malsupra sidas en la genua grupo ( vidu sube ). La du
  // partoj kunhavas la genuan ringon, do la ŝtofo ne havas fendon.
  const pL = new THREE.Mesh(G.pantalonaSupra, pantalonoM); pL.position.set(-0o3/0o40, genuoKompenso, 0);
  const pR = new THREE.Mesh(G.pantalonaSupra, pantalonoM); pR.position.set(0o3/0o40, genuoKompenso, 0);
  // ⟨ La homaj kruroj 📃 ⟩ — sub la pantalono, en la sama pivota grupo. Ili
  // portas la saman haŭton kiel la kapo kaj la manoj, do la homa modelo havas 
  // krurojn ankaŭ kiam la vesto kaŝiĝas. Ili ricevas castShadow = false malsupre,
  // ĉar ili estas tute kaŝitaj de la vesto — la ombra pasumo ne pagas por ili.
  const korpoL = new THREE.Mesh(G.kruroSupra, haŭto); korpoL.position.set(-0o3/0o40, genuoKompenso, 0);
  const korpoR = new THREE.Mesh(G.kruroSupra, haŭto); korpoR.position.set(0o3/0o40, genuoKompenso, 0);
  // ⟨ La GENUO estas aparta grupo 📃 ⟩ — la pivoto sidas ĉe la genuo ( 0.4297 sub
  // la kokso ), kaj la grupo portas la tibion, la pantalonon sub la genuo kaj la
  // tutan ŝuon. Dum la paŝo ĝi turniĝas antaŭen ( la kalkano leviĝas malantaŭen ),
  // do la kruro fleksiĝas kiel vera kruro anstataŭ svingiĝi kiel rigida stango.
  // ⟨ La malsupraj partoj sidas ĉe la NULO 📃 ⟩ — iliaj geometrioj mezuriĝas de la
  // genuo, do la meshoj mem ne portas kompenson; la ŝuo portas la maleol-kompenSON
  // ( vidu MALEOLO_Y ) ĉar la bota geometrio mezuriĝas de la genuo.
  const genuoL = new THREE.Group(); genuoL.position.y = genuoKompenso;
  const genuoR = new THREE.Group(); genuoR.position.y = genuoKompenso;
  const pSubL = new THREE.Mesh(G.pantalonaMalsupra, pantalonoM);
  const pSubR = new THREE.Mesh(G.pantalonaMalsupra, pantalonoM);
  const kSubL = new THREE.Mesh(G.kruroMalsupra, haŭto);
  const kSubR = new THREE.Mesh(G.kruroMalsupra, haŭto);
  pSubL.position.set(-0o3/0o40, 0, 0); pSubR.position.set(0o3/0o40, 0, 0);
  kSubL.position.set(-0o3/0o40, 0, 0); kSubR.position.set(0o3/0o40, 0, 0);
  // ⟨ La homaj piedoj sidas en la ŝuo-grupoj 📃 ⟩ — la kruro finiĝas ĉe la
  // maleolo, kaj la piedo estas aparta mesho en la sama grupo kiel la boto ( kun
  // la sama kompenso -MALEOLO_Y, ĉar la grupo sidas ĉe la maleolo ). Dum la paŝo
  // la boto kaj la nuda piedo ruliĝas KUNE, do la haŭto neniam trapikas la ledon.
  const korpaPiedoL = new THREE.Mesh(G.korpaPiedo, haŭto);
  const korpaPiedoR = new THREE.Mesh(G.korpaPiedo, haŭto);
  korpaPiedoL.position.set(-0o3/0o40, -MALEOLO_Y, 0);
  korpaPiedoR.position.set(0o3/0o40, -MALEOLO_Y, 0);
  // ⟨ La maleolo 📃 ⟩ — la piedo ( la boto kaj la plando ) sidas en sia propra
  // grupo kies pivoto estas la MALEOLO, ne la kokso. Dum marŝado la piedo plantas
  // sin sur la tero kaj ruliĝas de la kalkano al la pinto; sen la aparta pivoto la
  // tuta kruro svingiĝus kiel rigida stango kaj la paŝoj legiĝus kiel glitado.
  // La tuta ŝuo estas UNU geometrio ( la ŝtipo kaj la piedo dividas la ledon ) kaj
  // la plando estas la dua, do ĉiu piedo kostas du desegnajn alvokojn.
  // ⟨ La maleola grupo sidas en la GENUA grupo 📃 ⟩ — antaŭe ĝi pendis de la
  // koksa grupo; nun la genuo estas inter ili, do la ŝuo sekvas la tibion kiam la
  // genuo fleksiĝas. La kompenso restas MALEOLO_Y, ĉar la geometrio de la boto
  // mezuriĝas de la genuo.
  const sxuoL = new THREE.Group(); sxuoL.position.y = MALEOLO_Y;
  const sxuoR = new THREE.Group(); sxuoR.position.y = MALEOLO_Y;
  const bL = new THREE.Mesh(G.boto, botoM);
  const bR = new THREE.Mesh(G.boto, botoM);
  const akcL = new THREE.Mesh(G.akcenta, akcentaM);
  const akcR = new THREE.Mesh(G.akcenta, akcentaM);
  bL.position.set(-0o3/0o40, -MALEOLO_Y, 0);
  bR.position.set(0o3/0o40, -MALEOLO_Y, 0);
  akcL.position.set(-0o3/0o40, -MALEOLO_Y, 0);
  akcR.position.set(0o3/0o40, -MALEOLO_Y, 0);
  sxuoL.add(bL, akcL, korpaPiedoL);
  sxuoR.add(bR, akcR, korpaPiedoR);
  genuoL.add(pSubL, kSubL, sxuoL);
  genuoR.add(pSubR, kSubR, sxuoR);
  kruroL.add(pL, korpoL, genuoL);
  kruroR.add(pR, korpoR, genuoR);

  // ⟨ La brakoj 📃 ⟩ — ĉiu maniko sidas en pivot-grupo ĉe la ŝultro, por ke la
  // brakoj povu svingiĝi kontraŭfaze al la kruroj dum marŝado. La maniko kaj la
  // mano sidas en komunaj subgrupoj, ĉar ili devas kliniĝi KUNE — la klino
  // ( rotation.z ) movas la pojnon 0o1/0o10 da mondunuoj flanken, kaj mano kiu
  // restus malantaŭe videble disiĝus de la tuko.
  // ⟨ La pivoto sidas ĉe la ŝultro-fino 📃 ⟩ — antaŭe la pivoto estis ± 0.156 dum
  // la maniko estis 0.102 dika, do la tubo kovris la duonon de la brusto kaj la
  // brako legiĝis kiel parto de la torso. Nun la maniko estas maldika ( 0.070 )
  // kaj la pivoto estas ± 0.195, do la deltoido atingas 0.258 kaj la maniko
  // eliras el sub la ĉemiza ŝultro-kovrilo ( 0.195 ) je 0.07 — la brako
  // montriĝas ĉe la flanko de la mantelo, kiel vera brako. La INTERNA rando de la
  // deltoido ( 0.133 ) restas ene de la akromio de la torso ( 0.152 ), do la du
  // formoj kunfandiĝas ĉe la ŝultro sen fendo.
  // ⟨ La brakoj sidas PLI MALPROKSIME 📃 ⟩ — mezurite sur la realaj meshoj, la
  // maniko ( 0.0703 duonlarĝa, centro ± 0.195 ) atingis 0.286 dum la robo atingas
  // 0.263 — nur 0.023 da marĝeno, kaj ĉar la robo RULIĜAS ĉirkaŭ la zono dum ĉiu
  // paŝo ( ± 0.023, vidu marŝSwingon ), la maniko duontempe malaperis malantaŭ
  // ĝi. Nun la pivoto estas ± 0.2109, do la maniko atingas 0.301 kaj la marĝeno
  // estas 0.038 — la manikoj restas videblaj dum la tuta paŝo.
  // ⟨ La pivoto iris PLI EKSTEREN 📃 ⟩ — kun la mallarĝigita mantelo ( 0.207 …
  // 0.227 en la braka regiono ) la pivoto ± 0.2188 lasas la manikon elstari
  // 0.078 … 0.10 — la brako legiĝas kiel brako. La INTERNA rando de la maniko
  // ( 0.148 ) restas ene de la ĉemiza ŝultro-kovrilo ( 0.1875 ), do la tubo
  // ankoraŭ eliras el sub la ŝtofo sen fendo.
  const brakoL = new THREE.Group(); brakoL.position.set(-0o70/0o400, 0o265/0o200, 0);
  const brakoR = new THREE.Group(); brakoR.position.set(0o70/0o400, 0o265/0o200, 0);
  const manikoj: THREE.Mesh[] = [];
  const manikajMeshoj: THREE.Mesh[] = [];
  const manoj: THREE.Mesh[] = [];
  const ungoj: THREE.Mesh[] = [];
  const brakoj: THREE.Mesh[] = [];
  const kubutajGrupoj: THREE.Group[] = [];
  for ( const [ brako, dir ] of [ [ brakoL, -0o1 ], [ brakoR, 0o1 ] ] as [ THREE.Group, number ][] ) {
    const klino = new THREE.Group();
    // ⟨ La brako malfermiĝas iomete 📃 ⟩ — la klino 0.045 ( 2.6° ) movas la
    // manikon 0.027 flanken ĉe la pojno. Vera homo staranta tenas la brakojn
    // iomete disigitaj ( la kubutoj ne tuŝas la talion ), kaj ĉi tie ĝi ankaŭ
    // elportas la manumon el la mantelo: la mantelo estas 0.242 ĉe la manuma
    // alto dum la manumo ( 0.1953 + 0.027 + 0.058 ) atingas 0.28.
    klino.rotation.z = dir * 0o27/0o1000;   // 23 / 512 = 0.0449
    const maniko = new THREE.Mesh(G.manikaSupra, manikoM);
    const manikoSub = new THREE.Mesh(G.manikaMalsupra, manikoM);
    const haŭtaBrakо = new THREE.Mesh(G.brakoSupra, haŭto);
    const haŭtaBrakоSub = new THREE.Mesh(G.brakoMalsupra, haŭto);
    const mano = new THREE.Mesh(G.mano, haŭto);
    // ⟨ Ankaŭ la BRAKO speguliĝas 📃 ⟩ — la braka geometrio ne estas simetria
    // rilate al x ( la supraj ringoj ŝoviĝas al la torso por ke la deltoido
    // kunfandiĝu kun la ŝultro ), do ĝi turnus sin al la SAMA flanko ĉe ambaŭ
    // brakoj kaj unu el la du flosus eksteren. La sama negativa skalado kiel la
    // mano spegulas ĝin.
    haŭtaBrakо.scale.x = dir;
    haŭtaBrakоSub.scale.x = dir;
    // ⟨ La dikfingro speguliĝas 📃 ⟩ — la du manoj dividas la saman geometrion, kaj
    // la dikfingro sidas ĉe unu rando de la manplato. Negativa skalado estas afina
    // transformo kun negativa determinanto — three.js inversigas la ventumilon
    // mem, do la normaloj restas eksteren.
    mano.scale.x = dir;
    // ⟨ La manplato rigardas la KOKSON 📃 ⟩ — la geometrio estas plata tabulo
    // kies larĝo iras laŭ x, do sen turno la manplato rigardus antaŭen ( la
    // anatomia pozicio de la brako, kiun staranta homo NE tenas ) kaj la
    // dikfingro elstarus FLANKEN. Turno −90° ĉirkaŭ y ( dir-obla, ĉar la
    // spegulado okazas antaŭe ) metas la manplaton kontraŭ la femuron kaj la
    // dikfingron antaŭen — la natura staranta mano de vera homo.
    mano.rotation.y = -dir * Math.PI / 0o2;
    // ⟨ La ungoj estas GEFILOJ de la mano 📃 ⟩ — ilia geometrio mezuriĝas en la
    // sama loka kadro kiel la manplato, do la spegulado, la turno kaj la alto de la
    // mano validas por ili sen pliaj kalkuloj, kaj kiam la vesto kaŝas la manon la
    // ungoj malaperas kun ĝi ( ili estas ankaŭ en la listo de la homa modelo ).
    const ungo = new THREE.Mesh(G.ungoj, ungaMaterialo());
    ungo.castShadow = false;
    mano.add(ungo);
    ungoj.push(ungo);
    manoj.push(mano);
    brakoj.push(haŭtaBrakо, haŭtaBrakоSub);
    // ⟨ La mano videblas sub la manumo 📃 ⟩ — la manika bazo estas −0.5 (± 0.0625
    // de la folioj), kaj la fingropintoj estas ĉe −0.73, do pli ol duono de la
    // mano elstaras el la manumo. La supra ringo de la manplato (+0.055) restas
    // ene de la maniko kaj de la antaŭbrako, do la formoj kunfandiĝas sen kudro.
    // ⟨ La KUBUTO estas aparta grupo 📃 ⟩ — la sama konstruo kiel la genuo: la
    // pivoto sidas ĉe la kubuto ( KUBUTO_Y sub la ŝultro ), kaj la grupo portas la
    // antaŭbrakon, la manikon sub la kubuto kaj la manon. Dum la paŝo ĝi turniĝas
    // antaŭen, do la brako mole fleksiĝas anstataŭ pendi kiel stango.
    // ⟨ La antaŭbrako kaj la maniko sidas ĉe la NULO 📃 ⟩ — iliaj geometrioj
    // mezuriĝas de la kubuto ( la brako kaj la maniko estas ŝovitaj dum la
    // konstruo, vidu kreiKorpanBrakon kaj figurajGeometriojn ), do la du meshoj
    // ne portas kompenson. Nur la MANO portas ĝin — ĝia geometrio ankoraŭ
    // mezuriĝas de la ŝultro, ĉar la manplato estas aparta geometrio.
    const kubuto = new THREE.Group();
    kubuto.position.y = KUBUTO_Y;
    mano.position.y = -0o36/0o64 - KUBUTO_Y;   // la manplato, sub la pojno
    kubuto.add(haŭtaBrakоSub, manikoSub, mano);
    kubutajGrupoj.push(kubuto);
    klino.add(haŭtaBrakо, maniko, kubuto);
    manikoj.push(maniko);
    manikajMeshoj.push(maniko, manikoSub);
    brako.add(klino);
  }

  // ⟨ Har-stiloj 📃 ⟩
  // Ĉiu stilo estas aparta mesho ( nur la elektita videbla ), por ke
  // agordiHaranStilon povu ŝanĝi la stilon poste sen rekonstrui la geometriojn.
  // La stiloj venas el HARSTILOJ ( la sama listo kiel la vestara UI ), do la
  // ŝlosiloj neniam povas disiĝi. Nekonata ŝlosilo falas reen al la mallonga.
  const haroMeshoj = new Map<string, THREE.Mesh>();
  for ( const stilo of HARSTILOJ ) haroMeshoj.set(stilo.nomo, new THREE.Mesh(haranGeometrion(stilo), haroM));
  const aktivaHaro = haroMeshoj.has(haroKlavo) ? haroKlavo : "haroMalalta";

  // ⟨ La kapo bobas ĉe la kolo 📃 ⟩ — la kapo, la vizaĝo kaj la haroj sidas en
  // komuna grupo kies pivoto estas la kolo. Dum marŝado la kapo etete kliniĝas
  // kontraŭ la paŝoj, kaj la haroj sekvas ĝin — sen la grupo la kapo estus
  // rigida parto de la korpo.
  const kapoGrupo = new THREE.Group();
  kapoGrupo.position.y = KOLO_Y;
  kapo.position.y = -KOLO_Y;
  vizaĝo.position.y = -KOLO_Y;
  kapoGrupo.add(kapo, vizaĝo, strikoj, palpebroj);
  // ⟨ La haroj pendas de la krono 📃 ⟩ — la haroj ricevas sian propran grupon
  // kies pivoto estas la krono ( super la kapo, iomete malantaŭe ). La kapo portas
  // la harojn, sed la haroj ankoraŭ malfruas kontraŭ la kapo — kiam la kapo kli-
  // niĝas aŭ turniĝas, la hararo svingiĝas poste, kaj la longa kurteno balanciĝas
  // dum la paŝoj. Sen la grupo la haroj estus velditaj al la kranio.
  const haroGrupo = new THREE.Group();
  haroGrupo.position.set(0, HARO_Y - KOLO_Y, -0o3/0o40);
  kapoGrupo.add(haroGrupo);
  for ( const [ klavo, mesho ] of haroMeshoj ) {
    mesho.visible = klavo === aktivaHaro;
    mesho.position.set(0, -HARO_Y, 0o3/0o40);
    haroGrupo.add(mesho);
  }

  // ⟨ La torso turniĝas ĉe la zono 📃 ⟩ — la robo, la kapo kaj la brakoj sidas en
  // komuna grupo kies pivoto estas la ZONO. Dum marŝado la ŝultroj turniĝas
  // kontraŭ la koksoj ( la sama kontraŭa ritmo kiel la brakoj kaj la kruroj ) kaj
  // la tuta supra korpo kliniĝas iomete antaŭen — la sama kurbiĝo kiel vera
  // marŝanto. La vestoj sekvas la torso-n turnon, ĉar ili estas ĝiaj gefiloj.
  // La gefiloj konservas siajn mondajn poziciojn per la subtraho de la zono.
  const torsoGrupo = new THREE.Group();
  torsoGrupo.position.y = SASA_Y;
  roboGrupo.position.y = 0;
  torso.position.y = -SASA_Y;
  kapoGrupo.position.y = KOLO_Y - SASA_Y;
  brakoL.position.y = 0o133/0o100 - SASA_Y;
  brakoR.position.y = 0o133/0o100 - SASA_Y;
  torsoGrupo.add(roboGrupo, torso, kapoGrupo, brakoL, brakoR);

  // ⟨ La du modeloj 📃 ⟩ — ĉiu mesho apartenas al la HOMA modelo aŭ al la
  // VESTA modelo. La du listoj estas la sama apartigo en datumoj ( userData.speco )
  // kaj en la interfaco ( fig.korpoj / fig.vestoj ), do ilo aŭ personigo povas
  // kaŝi, anstataŭi aŭ kolorigi unu modelon sen tuŝi la alian — la figuron oni ne
  // devas rekonsrui por tio.
  const korpoj: THREE.Mesh[] = [ kapo, vizaĝo, strikoj, palpebroj, torso, korpoL, korpoR,
    kSubL, kSubR, korpaPiedoL, korpaPiedoR, ...brakoj, manoj[0], manoj[1], ...ungoj,
    ...haroMeshoj.values() ];
  const vestoj: THREE.Mesh[] = [ interno, ekstera, pL, pR, pSubL, pSubR,
    bL, bR, akcL, akcR, ...manikajMeshoj ];
  for ( const m of korpoj ) m.userData.speco = "korpo";
  for ( const m of vestoj ) m.userData.speco = "vesto";

  g.add(torsoGrupo, kruroL, kruroR);
  g.traverse(m => { if ( ( m as THREE.Mesh ).isMesh ) (m as THREE.Mesh).castShadow = true; });
  // ⟨ La kaŝitaj partoj ne ombras 📃 ⟩ — la homa torso kaj la homaj kruroj sidas
  // tute sub la vesto, do ilia ombro estus kaŝita de la vesto mem. La ombra pasumo
  // ( la dua bildigo de la mondo ) ne pagu por ili.
  torso.castShadow = false;
  korpoL.castShadow = false;
  korpoR.castShadow = false;
  kSubL.castShadow = false;
  kSubR.castShadow = false;
  korpaPiedoL.castShadow = false;
  korpaPiedoR.castShadow = false;
  for ( const b of brakoj ) b.castShadow = false;
  manoj[0].castShadow = false;
  manoj[1].castShadow = false;
  for ( const ungo of ungoj ) ungo.castShadow = false;

  const fig: Figuro = {
    group: g,
    alto: altaFaktoro,
    hejmo: new THREE.Vector3(),
    celo: new THREE.Vector3(),
    atendo: 0, rapido: 0o63/0o100,
    marsoFazo: Math.random() * Math.PI * 0o2,
    movoFaktoro: 0,
    palpebraFazo: Math.random() * PALPEBRA_INTERVALO,
    palpebroj,
    kruroj: [ kruroL, kruroR ],
    brakoj: [ brakoL, brakoR ],
    genuoj: [ genuoL, genuoR ],
    kubutoj: [ kubutajGrupoj[0], kubutajGrupoj[1] ],
    roboGrupo,
    kapoGrupo,
    torsoGrupo,
    sxuoj: [ sxuoL, sxuoR ],
    haroGrupo,
    manikoj,
    internoGrupo,
    korpoj,
    vestoj,
    agordiVeston(nova: Vesto) {
      // La vestaj materialoj estas KOMUNAJ ( cacheitaj po vesto kaj dividitaj
      // inter ĉiuj figuroj ), do ili NE mutacieblas ĉi tie — alie ĉiu figuro
      // kun la sama vesto ŝanĝiĝus kune. Anstataŭe la MESH-OJ de ĉi tiu figuro
      // prenas la materialojn de la nova vesto el la cacheo ( nur referoj;
      // neniu kanvaso repentiĝas, neniu needsUpdate sur la teksturoj ).
      const novaVesta = vestajMaterialoj(nova);
      interno.material = novaVesta.internoM;
      ekstera.material = novaVesta.eksteraM;
      pL.material = novaVesta.pantalonoM;
      pR.material = novaVesta.pantalonoM;
      for ( const maniko of manikajMeshoj ) maniko.material = novaVesta.manikoM;
      // Same por la ledo — la materialoj estas kaŝmemoritaj po ( botoj, akcenta ),
      // do la ŝuoj nur prenas la materialojn de la nova vesto.
      const novaLedo = ledajMaterialoj(nova);
      bL.material = novaLedo.botoM; bR.material = novaLedo.botoM;
      akcL.material = novaLedo.akcentaM; akcR.material = novaLedo.akcentaM;
    },
    agordiHaranStilon(stilo: Harstilo) {
      const aktiva = haroMeshoj.has(stilo.nomo) ? stilo.nomo : "haroMalalta";
      for ( const [ klavo, mesho ] of haroMeshoj ) mesho.visible = klavo === aktiva;
    },
    agordiHaranKoloron(koloro: number) {
      // La haro-materialo estas kaŝmemorita po koloro, do ĝi NE mutacieblas ĉi
      // tie — alie ĉiu figuro kun la sama har-koloro ŝanĝiĝus kune. La meshoj
      // nur prenas la materialon de la nova koloro el la kaŝo.
      const nova = haraMaterialo(koloro);
      for ( const mesho of haroMeshoj.values() ) mesho.material = nova;
      // ⟨ La brovoj kaj la okulharoj SEKVE ŝanĝiĝas 📃 ⟩ — la strioj portas la
      // haran materialon, do sen ĉi tiu linio ili restus ĉe la koloro de la
      // konstruo dum la hararo alprenus la novan — la vizaĝo kaj la kapo havus
      // malsamajn kolorojn. La tuta kialo por konstrui la striojn kiel geometrion
      // ( anstataŭ pentri ilin en la vizaĝan kanvon ) estas ĝuste ke ili povu
      // sekvi la har-koloron.
      strikoj.material = nova;
    },
  };
  return fig;
}

// gxisdatigiNpc — Gxisdatigu NPC-pozicion, promenadon kaj ritmon cxiun kadron.
// Dum la figuro moviĝas, la kruroj svingiĝas kontraŭfaze ĉirkaŭ la koksoj kaj
// la brakoj kontraŭe al la samflanka kruro; starante, la brakoj nur balanciĝas
// iomete. Transiroj inter stari kaj marŝi estas glataj ( movoFaktoro ).
//     @param fig ( Figuro ) - La NPC-figuro por animacii.
//     @param deltaTempo ( number ) - Delta tempo en la unuo de la retumila
//         tempigilo ( vidu kantaoj/komunajxoj/unuoj.ts por la konverto al He ).
//     @param t ( number ) - Malsupra tempo por oscedoj.
//     @param alteco ( funkcio ) - Tera alta funkcio por sekvi la terenon.
//     @param suprajxo ( funkcio ) - La piedebla supraĵo ( la vojoj, dokoj ) —
//         plena ol la tereno. La NPC-oj sekvas ĝin, do ili paŝas SUR la
//         pavimajn vojojn anstataŭ trairi ilin kiel la kruda tero sube.
// marŝSvingo — La komuna marŝa ritmo de ĉiuj figuroj ( ludanto, foraj ludantoj,
// NPC-oj ) — kontraŭfazaj kruroj kaj brakoj plus la eta paŝa bobado. La sama
// ritmo kiel la fotila bobado; movo = 0 donas la silentan sidan/sinkan pozon.
// ⟨ La ŝtofo sekvas la korpon 📃 ⟩ Nun la VESTO ankaŭ animaciiĝas, ne nur la
// membroj. La robo kaj la interna ĉemizo pendas de la zono, do ili svingiĝas
// ĉirkaŭ ĝi — flanken je la paŝa ofteco ( la koksoj alternas ) kaj
// antaŭen-malantaŭen je DUOBLA ofteco ( la genuoj puŝas la tukon dufoje po
// paŝciklo ). La manikoj malfruas kontraŭ siaj brakoj per proksimume kvarono de
// fazo, la kapo bobas duoble, kaj la haroj sekvas la kapon.
// ⟨ Kial la FAZO 📃 ⟩ La funkcio antaŭe ricevis sin(fazo). Malfruo ne esprimas
// per sola sinuso — ĝi bezonas la kosenon, kaj cos = ±√(1−sin²) havas du
// solvojn. La fazo mem do estas la parametro, kaj la sinuso kaj la koseno
// kalkuliĝas ĉi tie.
//     @param fig ( Pick<Figuro, ...> ) - La figuro por animacii.
//     @param fazo ( number ) - La marŝa fazo en radianoj ( ĉiu figuro havas
//         propran ekvaloron, do la homamaso ne paŝas unisone ).
//     @param movo ( number ) - 0 = staras, 1 = marŝas plenrapide.
export function marŝSvingo(
  fig: Pick<Figuro, "group" | "kruroj" | "brakoj" | "genuoj" | "kubutoj"
    | "roboGrupo" | "kapoGrupo" | "internoGrupo"
    | "torsoGrupo" | "sxuoj" | "haroGrupo" | "manikoj" | "palpebroj" | "palpebraFazo">,
  fazo: number, movo: number, deltaTempo = 0o1/0o60
): void {
  const paso = Math.sin(fazo);
  const duobla = Math.sin(fazo * 0o2);
  // ⟨ La kruroj 📃 ⟩ — la kontraŭfaza svingo ĉirkaŭ la koksoj. Pozitiva turno
  // ĉirkaŭ x movas la piedon MALANTAŬEN, do la maldekstra kruro (-sin) antaŭiĝas
  // kiam sin(fazo) = +1.
  // ⟨ La paŝo restas la sama, kvankam la kruroj plilongis 📃 ⟩ — la pivoto
  // supreniris de 0.5625 al 0.9297, do la sama angulo farus 1.65-oble pli longan
  // paŝon. La amplitudo malgrandiĝis de 0.3 al 0.1875, do la piedo svingiĝas la
  // saman distancon kiel antaŭe ( 0.9297 × sin 0.1875 ≈ 0.5625 × sin 0.3 ).
  const svingoKruro = 0o3/0o20 * movo * paso;
  fig.kruroj[0].rotation.x = -svingoKruro;
  fig.kruroj[1].rotation.x = svingoKruro;
  // ⟨ La GENUOJ 📃 ⟩ — la genuo fleksiĝas plej multe tuj post kiam la piedo
  // forlasas la teron ( la kalkano leviĝas malantaŭen ) kaj rektiĝas antaŭ la
  // sekva surmeto. La flekso sekvas la FAZON, ne la angulon de la kokso — kiam la
  // kruro trapasas la korpon moviĝante antaŭen ( sin( p ) tra nulo kun pozitiva
  // deklivo ) la genuo jam rektiĝis. Pozitiva turno movas la piedon malantaŭen, do
  // la flekso estas pozitiva kaj ĝia pinto sidas iomete post la malantaŭa
  // ekstremaĵo de la kruro ( sin( p ) = −1 ).
  // ⟨ La baza flekso 📃 ⟩ — vera genuo neniam tute rektiĝas dum marŝo, do la
  // figuro tenas 0.05 da flekso ankaŭ meze de la paŝo; sen ĝi la kruro legiĝus
  // kiel stango kun artiko. La dekstra kruro uzas la saman funkcion, ŝovitan duone
  // tra la ciklo.
  const fleksoGenuo = ( p: number ) =>
    ( 0o1/0o20 + 0o13/0o40 * Math.max(0, -Math.sin(p - 0o3/0o10)) ) * movo;
  fig.genuoj[0].rotation.x = fleksoGenuo(fazo);
  fig.genuoj[1].rotation.x = fleksoGenuo(fazo + Math.PI);
  // ⟨ La ruliĝo de la plando 📃 ⟩ — la maleolo sekvas la kruron, sed MALFRUE
  // ( 0o7/0o10 radianojn post ĝi ) — la plando plataj ĉe la surmeto, ruliĝas
  // trans la piedon kaj puŝas per la pinto poste. Sen la malfruo la piedo turniĝus
  // KUNE kun la kruro kaj la paŝo legiĝus kiel piedfingra glitado.
  // ⟨ La ruliĝo estas MALGRANDA 📃 ⟩ — la rando de la boto sidas 0.2188 super la
  // maleolo, do la malnova amplitudo 0.09375 movis ĝin 0.021 antaŭen kaj
  // malantaŭen, dum la pantalono restis SENMOVA. La buŝo de la boto do malfermiĝis
  // malegale — la rando ŝajne tranĉis la kruron. Kun 0.039 la rando moviĝas nur
  // 0.0085 kaj la buŝo restas egala, sed la piedo ankoraŭ ruliĝas de la kalkano
  // al la pinto.
  const maleolo = 0o5/0o200 * movo * Math.sin(fazo - 0o7/0o10);
  fig.sxuoj[0].rotation.x = -maleolo;
  fig.sxuoj[1].rotation.x = maleolo;
  // ⟨ La paŝa bobado 📃 ⟩ — la korpo leviĝas kiam unu kruro portas la tutan pezon
  // ( meze de la paŝo ) kaj malleviĝas kiam la kruroj disiĝas. Tio estas DUOBLA
  // ofteco po paŝciklo, do cos(2 × fazo); kun cos(fazo) la korpo levus sin unufoje
  // po paŝo kaj la marŝo legiĝus kiel saltado.
  fig.group.position.y += ( 0o7/0o1000 + 0o7/0o1000 * Math.cos(fazo * 0o2) ) * movo;
  // ⟨ La brakoj 📃 ⟩ — kontraŭe al la samflanka kruro, sed nur ETETE. La mantelo
  // estas FERMITA ŝtofo sen manik-truoj, do la manikoj devas svingiĝi INTERNE de
  // ĝi — kun la malnova amplitudo 0.25 la manumo ( 0.85 sub la ŝultro ) moviĝis
  // 0.34 antaŭen kaj eliris TRA la mantelo kiel folia flugilo. 0.094 lasas la tukon
  // ene, kun spaco ankaŭ por la malfruo de la maniko sube.
  const svingoBrako = 0o4/0o100 * movo * paso;
  fig.brakoj[0].rotation.x = svingoBrako;
  fig.brakoj[1].rotation.x = -svingoBrako;
  // ⟨ La KUBUTOJ 📃 ⟩ — la kubuto neniam estas tute rekta ĉe vivanta homo, do la
  // figuro tenas etan konstantan flekson ankaŭ starante; ĝi iomete pliiĝas meze de
  // la svingo. NEGATIVA turno movas la manon antaŭen ( la brako montras malsupren,
  // do ĝi sekvas la saman regulon kiel la kruro ). La flekso restas MALGRANDA — la
  // maniko pendas apud la mantelo kaj la antaŭbrako ne rajtas eliri tra la ŝtofo.
  const fleksoKubuto = ( p: number ) => -( 0o1/0o25
    + 0o1/0o50 * movo * ( 0o1/0o2 + 0o1/0o2 * Math.sin(p) ) );
  fig.kubutoj[0].rotation.x = fleksoKubuto(fazo);
  fig.kubutoj[1].rotation.x = fleksoKubuto(fazo + Math.PI);
  // ⟨ La torso 📃 ⟩ — la ŝultroj turniĝas kontraŭ la koksoj ( la dekstra ŝultro
  // antaŭiĝas kiam la maldekstra kruro antaŭiĝas ), la supra korpo kliniĝas iomete
  // antaŭen kaj ruliĝas super la plantita piedo. La manikoj kaj la kapo sekvas ĉi
  // tiun turnon, ĉar ili estas gefiloj de la torso-grupo.
  fig.torsoGrupo.rotation.y = -0o4/0o100 * movo * paso;
  fig.torsoGrupo.rotation.x = 0o5/0o100 * movo - 0o1/0o100 * movo * duobla;
  fig.torsoGrupo.rotation.z = -0o3/0o100 * movo * paso;
  // ⟨ La tuko 📃 ⟩ — la pivoto estas la zono, do la turnoj svingas la suban
  // parton de la robo, ne la tutan figuron. La ŝtofo MALFRUAS kontraŭ la korpo,
  // kaj la antaŭen-malantaŭena svingo okazas DUOBLE po ciklo, ĉar ĉiu genuo
  // puŝas la tukon aparte.
  // ⟨ La mantelo pendas PLUMBE 📃 ⟩ — la supra korpo kliniĝas antaŭen ( 0.078 ),
  // sed peza mantelo NE kliniĝas kun la brusto — ĝi pendas de la ŝultroj kaj la
  // tuko restas vertikala. Antaŭe la mantelo sekvis la kliniĝon kaj ĝia tuko ( 0.5
  // sub la zono ) iris 0.047 MALANTAŬEN ĝuste en la kadro, kiam la antaŭa femuro
  // puŝis la pantalonon 0.043 ANTAŬEN — la pantalono do trairis la ĉemizon per
  // 0.034 ( mezurite per radioj kontraŭ la realaj meshoj ). Nun la grupo
  // kontraŭ-turnas duonon de la klino. Plena kontraŭ-turno tro pendigus la tukon
  // antaŭen ( la malantaŭa femuro trairus ), do la duono estas la ekvilibro; la
  // kolumo apenaŭ moviĝas, ĉar ĝi sidas preskaŭ sur la pivoto mem.
  // ⟨ La svingo PLIGRANDIĜIS 📃 ⟩ — forpreninte la klinon de la kalkulo, la svingo
  // povas kreski sen trapiki ion ajn — 0.0234 → 0.0391 flanken kaj antaŭen, 0.0313
  // → 0.0391 turniĝe. La ŝtofo nun videble sekvas la paŝon anstataŭ glaĉi super la
  // korpo; la malnovaj nombroj estis malgrandaj ne ĉar la ŝtofo estis stifa, sed
  // ĉar la klino manĝis la tutan buĝeton de la spaco.
  fig.roboGrupo.rotation.z = 0o4/0o200 * movo * Math.sin(fazo - 0o5/0o10)
    - 0o1/0o2 * fig.torsoGrupo.rotation.z;
  fig.roboGrupo.rotation.x = 0o5/0o200 * movo * Math.sin(fazo * 0o2 - 0o5/0o10)
    - 0o1/0o2 * fig.torsoGrupo.rotation.x;
  fig.roboGrupo.rotation.y = 0o5/0o200 * movo * Math.sin(fazo - 0o6/0o10);
  // ⟨ La ĉemizo sekvas la paŝon 📃 ⟩ — la ĉemizo havas sian propran pivoton sur la
  // ŝultra linio, do ĝiaj turnoj ALDONIĜAS al tiuj de la mantelo kaj la ĉemizo povas
  // sekvi la paŝon memstare.
  // ⟨ La tordo 📃 ⟩ — la kokso de la antaŭa kruro puŝas la tukon antaŭen, do la
  // SAMA flanko de la ĉemizo sekvas ĝin — tio estas turno ĉirkaŭ la vertikala akso,
  // en fazo kun la paŝo ( ne malfrue kiel la mantelo ). La tuko larĝas 0.21, do
  // 0.078 radianoj movas ĝian flankon 0.016 — videbla sekvo sen streĉi la ŝtofon.
  // Turno ĉirkaŭ la vertikala akso NE ŝanĝas la radiuson de la tuko, do la tordo
  // estas la sola sekvo, kiu ne manĝas la aeron inter la tri tavoloj.
  fig.internoGrupo.rotation.y = 0o5/0o100 * movo * paso;
  // ⟨ La torso RULIĜAS super la plantita piedo 📃 ⟩ — la ŝultroj ruliĝas 0.0469
  // flanken kaj kliniĝas 0.078 antaŭen, kaj la tuko de la ĉemizo ( 0.84 sub la pivoto )
  // sekvas ĉiun el tiuj turnoj per 0.84-obla levilo. Mezurite sur la realaj meshoj
  // ( radioj de ekstere ) la surfaco de la ĉemizo ĉe la kokso falis de 0.203 al
  // 0.175 dum la antaŭa femuro svingis al 0.200 — la pantalono trairis la ŝtofon
  // per 0.022. La grupo do PLIGRANDIGAS la ruliĝon per 0.375 kaj kontraŭas la
  // klinon per 0.125 — la plej bona paro el la provitaj, mezurite per radioj de
  // ekstere kontraŭ ĉiuj kvar paroj ( la pantalono antaŭe, la ĉemizo supre kaj
  // malsupre, la torso ).
  // ⟨ La ĉemizo svingiĝas NUR kun la tordo 📃 ⟩ — propra antaŭen-malantaŭena svingo
  // ( la genuoj puŝas la tukon duoble po ciklo ) ankaŭ proviĝis, sed la ĉemizo sidas
  // inter du tavoloj kun nur 0.013 … 0.027 da aero, do ĉiu propra svingo estas
  // PURA PERDO — kun 0.025 la pantalono trairis la ŝtofon per 0.013 anstataŭ 0.001.
  // La mantelo portas la videblan svingon kaj la ĉemizo restas la trankvila tavolo
  // sub ĝi; la tordo jam donas al la tuko sian propran sekvon de la paŝo.
  fig.internoGrupo.rotation.x = -0o1/0o10 * fig.torsoGrupo.rotation.x;
  fig.internoGrupo.rotation.z = 0o3/0o10 * fig.torsoGrupo.rotation.z;
  // ⟨ La manikoj 📃 ⟩ — la ŝtofo malfruas kontraŭ la movo de sia brako. La
  // malfruo antaŭe estis preskaŭ nevidebla ( 0.0078 radianoj, nome 0.005 ĉe la
  // manumo ) — la manikoj legiĝis velditaj al la brakoj. Nun ĝi estas 0.025, do la
  // manumo malfruas proksimume 0.016 kaj la maniko ankoraŭ restas ene de la
  // mantelo dum la tuta paŝo ( la mezurita aero estas 0.03 ).
  fig.manikoj[0].rotation.x = -0o1/0o40 * movo * Math.sin(fazo - 0o5/0o10);
  fig.manikoj[1].rotation.x = 0o1/0o40 * movo * Math.sin(fazo - 0o5/0o10);
  // ⟨ La kapo 📃 ⟩ — unu kapbobo po paŝo ( do duoble po ciklo ), kaj iomete
  // flanken kun la koksoj.
  fig.kapoGrupo.rotation.x = 0o1/0o100 * movo * duobla + 0o1/0o100 * movo;
  fig.kapoGrupo.rotation.z = -0o1/0o100 * movo * paso;
  // ⟨ La haroj 📃 ⟩ — la hararo havas sian propran grupon ĉe la krono, do ĝi
  // malfruas kontraŭ la kapo kaj balanciĝas poste kiam la kapo bobas.
  // ⟨ La svingo estas MALGRANDA 📃 ⟩ — la kurteno pendas ĜUSTE apud la ŝtofo de
  // la mantelo, do ĝi ne havas multe da spaco. Kun la malnova amplitudo 0.06 ĝia
  // malsupra rando iris 0.03 antaŭen kaj eniĝis en la dorson de la ĉemizo dum
  // ĉiu paŝo — la hararo duontempe malaperis. Nun la tuta svingo estas sub 0.04
  // radianoj kaj la kurteno restas ekster la ŝtofo, sed ĝi ankoraŭ balanciĝas.
  fig.haroGrupo.rotation.x = -0o4/0o100 * movo * Math.sin(fazo * 0o2 - 0o7/0o10);
  fig.haroGrupo.rotation.z = 0o3/0o100 * movo * Math.sin(fazo - 0o7/0o10);
  // ⟨ La palpebrumo 📃 ⟩ — la palpebroj havas sian propran horloĝon ( vidu
  // palpebraFazon ), ĉar homo ankaŭ palpebrumas starante. La ciklo estas longa kaj
  // la palpebrumo mem tre mallonga; la sinuso faras la fermon kaj la malfermon
  // GLATAJ, do la okulo ne saltas. La mesho GRANDIĜAS — ĝia skalo iras de la
  // malfermita 0.05 ĝis 1, do la kupolo kreskas el punkto super la okulo kaj
  // kovras ĝin.
  fig.palpebraFazo += deltaTempo;
  const palpebraCiklo = fig.palpebraFazo % PALPEBRA_INTERVALO;
  const fermiteco = palpebraCiklo < PALPEBRA_DAURO
    ? Math.sin(palpebraCiklo / PALPEBRA_DAURO * Math.PI) : 0;
  fig.palpebroj.scale.y = PALPEBRA_FERMO + ( 0o1 - PALPEBRA_FERMO ) * fermiteco;
}

export function gxisdatigiNpc(fig: Figuro, deltaTempo: number, t: number,
  alteco: ( x: number, z: number ) => number,
  suprajxo?: ( x: number, z: number ) => number): void {
  fig.atendo -= deltaTempo;
  if ( fig.atendo <= 0 ) {
    const a = Math.random() * Math.PI * 0o2, hazardaRadiuso = Math.random() * 0o4;
    // Celu la piedeblan supraĵon, ne la krudan terenon — la vojoj estas
    // levitaj platformoj, do supraĵa celo tenas la marŝon sur la pavimon
    // ( la sekva grundo-kvanto tendencas al la pli alta vojo ).
    const cx = fig.hejmo.x + Math.sin(a) * hazardaRadiuso, cz = fig.hejmo.z + Math.cos(a) * hazardaRadiuso;
    const cy = suprajxo ? suprajxo(cx, cz) : alteco(cx, cz);
    fig.celo.set(cx, Number.isFinite(cy) ? Math.max(cy, alteco(cx, cz)) : alteco(cx, cz), cz);
    fig.atendo = 0o3 + Math.random() * 0o4;
  }
  const difX = fig.celo.x - fig.group.position.x, difZ = fig.celo.z - fig.group.position.z;
  const d = Math.hypot(difX, difZ);
  const movas = d > 0o23/0o100;
  // Glata transiro 0..1 inter stari kaj marŝi, por ke la svingoj ne saltu
  // kiam la figuro ekpaŝas aŭ haltas.
  fig.movoFaktoro += ( ( movas ? 0o1 : 0 ) - fig.movoFaktoro ) * Math.min(0o1, deltaTempo * 0o10);
  const movo = fig.movoFaktoro;
  // La marŝa fazo progresas nur dum la figuro moviĝas; pli rapidaj figuroj
  // paŝas pli ofte, kaj ĉiu havas propran fazo-ofseton ( marsoFazo ekvaloro ).
  fig.marsoFazo += deltaTempo * fig.rapido * 0o4 * movo;
  if ( movas ) {
    fig.group.position.x += difX / d * fig.rapido * deltaTempo;
    fig.group.position.z += difZ / d * fig.rapido * deltaTempo;
    // Sekvu la supraĵon ( vojoj + dokoj ) kiam ĝi kuŝas super la tereno —
    // la glata 0o15/0o100-eca blendado transiras la vojajn ramplojn.
    const teroY = alteco(fig.group.position.x, fig.group.position.z);
    const celoY = suprajxo ? Math.max(teroY, suprajxo(fig.group.position.x, fig.group.position.z)) : teroY;
    fig.group.position.y = fig.group.position.y + ( celoY - fig.group.position.y ) * 0o15/0o100;
    fig.group.rotation.y = Math.atan2(difX, difZ);
  }
  // Sta-svingo — eta balancado nur kiam oni staras, por ke la figuro ne ŝtoniĝu.
  fig.group.rotation.z = Math.sin(t * 0o115/0o100 + fig.hejmo.x) * 0o1/0o100 * ( 0o1 - movo );
  // Krura kaj braka svingo plus paŝa bobado — la komuna marŝa ritmo.
  const idlaBrako = Math.sin(t * 0o7 + fig.hejmo.z) * 0o2/0o100 * ( 0o1 - movo );
  marŝSvingo(fig, fig.marsoFazo, movo, deltaTempo);
  fig.brakoj[0].rotation.x += idlaBrako;
  fig.brakoj[1].rotation.x -= idlaBrako;
}
