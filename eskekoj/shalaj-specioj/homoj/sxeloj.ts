// ≺⧼ La korpaj ŝeloj 👕 ⧽≻
// La foli-tondita tubo de la maniko ( kreiFoliaTonditanTubon ) kaj la du ŝeloj
// de la vesto — la malferma robo ( kreiMalfermanRobonSxelon ) kaj la interna
// ĉemizo ( kreiInternanSxelon ) — kun la anguloj de la antaŭa malfermaĵo
// ( rondigiMalfermanAngulon ). La malfermaĵa matematiko venas el malfermo.ts.
import * as THREE from "three";
import { kreiBuferanGeometrion } from "../../komunajxoj/kunfandajxoj.js";
import { MALFERMA_RONDO, malfermaDuono, robLevigho } from "./malfermo.js";
import { INTERNO_ALTO, INTERNO_Y_MALSUPRO, INTERNO_Y_SUPRO, ROB_ALTO, ROB_PROFUNDO, ROB_Y_MALSUPRO } from "./mezuroj.js";

// --- Folia maniko ---
// kreiFoliaTonditanTubon — Konstruu tubon kies malsupra rando estas tondita en
// ripetatajn foliformajn lobojn. La rando mem sekvas foli-siluetojn ( pintoj
// pendantaj malsupren, V-noĉoj leviĝantaj inter la folioj ) — ne apartaj
// elstarantaj folioj. La geometrio ricevas ankaŭ UV-koordinatojn ( u ĉirkaŭ la
// tubo, v laŭ la alto ), por ke teksturaj aplikoj mapu glate.
//     @param suproR ( number ) - Supra radiuso.
//     @param malsuproR ( number ) - Malsupra radiuso.
//     @param suproY ( number ) - Alto de la supro-ringo.
//     @param bazoY ( number ) - Baza alto de la malsupra rando.
//     @param segmentoj ( number ) - Cirkla rezolucio.
//     @param loboj ( number ) - Kiom da foli-loboj ĉirkaŭ la rando.
//     @param profundo ( number ) - Kiom profunde la foli-pintoj pendas.
//     @param nocho ( number ) - Kiom alte la noĉoj leviĝas en la tubon.
//     @param fermitaSupro ( boolean = false ) - Ĉu fermi la supran ringon per kupolo
//         ( la ŝultro de la maniko ).
//     @returns geometrio ( THREE.BufferGeometry ) - La tondita tubo.
export function kreiFoliaTonditanTubon(suproR: number, malsuproR: number, suproY: number,
  bazoY: number, segmentoj: number, loboj: number, profundo: number, nocho: number,
  fermitaSupro = false): THREE.BufferGeometry {
  const q = 0o3/0o4; // folia profilo — akra sed plena pinto
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const indeksoj: number[] = [];
  for ( let i = 0; i <= segmentoj; i++ ) {
    const ang = i / segmentoj * Math.PI * 0o2;
    const kx = Math.cos(ang), kz = Math.sin(ang);
    // Supro ringo.
    pozicioj.push(kx * suproR, suproY, kz * suproR);
    uvoj.push(i / segmentoj, 0);
    // Malsupro ringo — la folia tondo.
    const u = ( ang * loboj / ( Math.PI * 0o2 ) ) % 0o1; // 0 ĉe foli-pinto
    const v = Math.min(u, 0o1 - u) * 0o2;              // 0 pinto, 1 noĉo
    const folio = 0o1 - Math.pow(v, q);                // 1 pinto, 0 noĉo
    const y = bazoY + nocho - ( nocho + profundo ) * folio;
    pozicioj.push(kx * malsuproR, y, kz * malsuproR);
    uvoj.push(i / segmentoj, 1);
  }
  // La pozicioj estas interplektitaj ( supro_i, malsupro_i ), do ĉiu kvadrato
  // ligas la parajn suprojn ( 2i, 2i+2 ) al la neparaj malsuproj ( 2i+1, 2i+3 ).
  for ( let i = 0; i < segmentoj; i++ ) {
    const a = 0o2 * i, b = 0o2 * i + 0o2, c = 0o2 * i + 0o1, d = 0o2 * i + 0o3;
    // Ekstera orientiĝo — la normaloj montru eksteren.
    indeksoj.push(a, b, c, b, d, c);
  }
  // ⟨ La pinto de la maniko estas PLATA sed FERMITA 📃 ⟩ — la malnova ventumilo
  // turniĝis MALĜUSTE: ĝiaj normaloj montris MALSupren, do la fronta flanko estis
  // forĵetita de la bildigilo kaj la ŝultro de la maniko aspektis kiel MALFERMA
  // truo — oni vidis la INTERNON de la tubo ĉe la ŝultro. Nun la ventumilo
  // rondiras la ĝustan vojon ( la normaloj montras supren ), do la pinto estas
  // fermita plato.
  // ⟨ La plato estas la ŝultro mem 📃 ⟩ — ĝia alto ( suproY ) egalas la supran
  // randon de la ĉemiza ŝultro-kovrilo ( vidu kreiInternanSxelon ). Antaŭe la
  // maniko eliris el la ĉemizo 0.0156 SUB la kovila rando, do la ŝultro havis
  // ŝtupon kaj oni povis rigardi en la kavon inter la du tavoloj. Nun la du
  // randoj staras samalte, kaj la maniko legiĝas kiel daŭrigo de la ĉemiza
  // ŝultro ( la ronda disko de la manika pinto ricevas la saman konturon ).
  // ⟨ La pinto de la maniko estas MALALTA KUPOLO 🫧 ⟩ — antaŭe ĝi estis PLATA
  // disko kun la sama radiuso kiel la tubo, do la ŝultro de la brako finiĝis per
  // kvadrata breto, kiu elstaris el la ĉemizo. La plato nun rondiĝas supren per du
  // malgrandaj ringoj kaj pinto, do la deltoido finiĝas per RONDA ŝultro-kapo —
  // la sama form-lingvo kiel la sferoj de la kapo, sed multe pli malalta
  // ( 0.3 · la radiuso ), ĉar la ŝultro ne rajtas ŝveliĝi super la ĉemizan kolumon.
  // La pinto ankaŭ ricevas la saman UV-vicon kiel la tuba pinto, do la teksajxo
  // daŭriĝas sur la kupolon sen kudro.
  if ( !fermitaSupro ) return kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj });
  const kupolAlto = suproR * 0.3;
  const etapoj: [ number, number ][] = [ [ 0.62, 0.55 ], [ 0.30, 0.86 ] ];
  const bazoj: number[] = [];
  for ( const [ rF, yF ] of etapoj ) {
    bazoj.push(pozicioj.length / 0o3);
    for ( let i = 0; i <= segmentoj; i++ ) {
      const ang = i / segmentoj * Math.PI * 0o2;
      pozicioj.push(Math.cos(ang) * suproR * rF, suproY + kupolAlto * yF,
        Math.sin(ang) * suproR * rF);
      uvoj.push(i / segmentoj, 0);
    }
  }
  const pinto = pozicioj.length / 0o3;
  pozicioj.push(0, suproY + kupolAlto, 0);
  uvoj.push(0o1/0o2, 0);
  // ⟨ La ventumiloj montras EKSTEREN 📃 ⟩ — la kupolo mallarĝiĝas supren, do la
  // SUPRA ringo de ĉiu paro estas la « a » de la ventumilo ( la malo de la tubo,
  // kie la malsupra ringo estas la a ). Sen la inversigo la normaloj montrus
  // INTERNEN kaj la tuta ŝultro malaperus.
  for ( let i = 0; i < segmentoj; i++ ) {
    indeksoj.push(bazoj[0] + i, bazoj[0] + i + 0o1, 0o2 * i,
      bazoj[0] + i + 0o1, 0o2 * i + 0o2, 0o2 * i);
    indeksoj.push(bazoj[1] + i, bazoj[1] + i + 0o1, bazoj[0] + i,
      bazoj[1] + i + 0o1, bazoj[0] + i + 0o1, bazoj[0] + i);
    indeksoj.push(bazoj[1] + i + 0o1, bazoj[1] + i, pinto);
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj });
}

// ⟨ La maniko 📃 ⟩ — Antaŭe la maniko estis tubo PLUS aparta akcenta ringo
// ( du meshoj por ĉiu brako ). Nun la akcenta bordo de la tondita rando estas
// PENTRITA en la tekston de la tubo ( vestaTeksajxo, parto "maniko" ), do la
// maniko estas unu mesho — kaj la bordo ankaŭ sekvas la foliojn pli fidele ol la
// maldika ringo, ĉar ĝi estas desegnita laŭ la UV-oj de la tubo mem.

// ⟪ La anguloj de la malfermaĵo 🚪 ⟫
// rondigiMalfermanAngulon — Rondigu la angulon, kie la rando de la antaŭa
// malfermaĵo renkontas la suban randon de la robo. Tiuj du randoj renkontiĝis per
// proksimume 44°-a angulo, do la fronta rando de la robo finiĝis per PINTO ( la
// stilo volas rondon ). La tri randaj verticoj ĉe la angulo moviĝas sur malgrandan
// arkon — la du tanĝantaj punktoj kaj la mezo de la arko — do la rando kurbiĝas de
// la malfermaĵo en la tukon sen angulo. La arko estas malgranda ( 0.0078 ), do la
// silueto de la robo ne ŝanĝiĝas; nur la angulo mem malaperas.
// ⟨ Kial la verticoj kaj ne la profilo 📃 ⟩ — la leviĝo de la suba rando estas
// funkcio de la AZIMUTO, kaj la azimutoj de la ringo estas egale spacitaj; la
// rando de la malfermaĵo do neniam povas kurbiĝi supren per la profilo sola.
//     @param pozicioj ( number[] ) - La pozicioj de la lofto ( modifiĝas ).
//     @param kolonoj ( number ) - Kiom da kolonoj havas ĉiu ringo.
//     @param flanko ( number ) - +1 la maldekstra rando, −1 la dekstra.
function rondigiMalfermanAngulon(pozicioj: number[], kolonoj: number, flanko: number): void {
  const k = flanko > 0 ? kolonoj : 0;
  const najbaro = flanko > 0 ? kolonoj - 0o1 : 0o1;
  const indekso = ( v: number, kk: number ) => ( v * ( kolonoj + 0o1 ) + kk ) * 0o3;
  const legi = ( v: number, kk: number ) => new THREE.Vector3(pozicioj[indekso(v, kk)],
    pozicioj[indekso(v, kk) + 0o1], pozicioj[indekso(v, kk) + 0o2]);
  const skribi = ( v: number, kk: number, p: THREE.Vector3 ) => {
    pozicioj[indekso(v, kk)] = p.x;
    pozicioj[indekso(v, kk) + 0o1] = p.y;
    pozicioj[indekso(v, kk) + 0o2] = p.z;
  };
  const angulo = legi(0, k), tuko = legi(0, najbaro), rando = legi(0o1, k);
  const lauTuko = tuko.clone().sub(angulo).normalize();     // laŭ la suba rando
  const lauRando = rando.clone().sub(angulo).normalize();   // laŭ la malfermaĵo
  const turno = Math.acos(Math.max(-0o1, Math.min(0o1, lauTuko.dot(lauRando))));
  const duono = ( Math.PI - turno ) * 0o1/0o2;               // la duona angulo de la angulo
  const disto = MALFERMA_RONDO / Math.tan(duono);            // ĝis la tanĝantaj punktoj
  const enen = MALFERMA_RONDO / Math.sin(duono) - MALFERMA_RONDO;
  const mezo = lauTuko.clone().add(lauRando).normalize();
  skribi(0, k, angulo.clone().addScaledVector(mezo, enen));
  skribi(0, najbaro, angulo.clone().addScaledVector(lauTuko, disto));
  skribi(0o1, k, angulo.clone().addScaledVector(lauRando, disto));
}

// kreiMalfermanRobonSxelon — La ekstera ĉemizo, kiel TAVOLO de ringoj ( lofto ).
// Malsame ol la antaŭa konuso, la robo nun estas vera mantelo. La antaŭa parto
// estas MALFERMITA — la du bordoj disiĝas malsupren kaj montras la internan
// ĉemizon — la suba rando leviĝas V-forme ĉe la fronto, la talio pinĉiĝas, la
// brusto reflarĝiĝas kaj la supraĵo FERMIĜAS per ŝultra jugo kaj kolumo ( vidu
// la kolumajn ringojn sube ).
// ⟨ La UV-oj 📃 ⟩ La horizontala koordinato u venas el la SAMA funkcio kiel la
// malfermaĵo — u = 0 estas la fronta centro ( kiu, post la tekstura ŝovo 0o1/0o2,
// troviĝas meze de la kanvaso ), u pligrandiĝas al unu flanko, kaj u = 0o1/0o2
// estas la dorso. La vertikala koordinato estas la altfrakcio, do la motivoj de
// la kanvaso vicigas sin laŭ la mondo.
// ⟨ Kial lofto 📃 ⟩ La malfermaĵo ne eblas per cilindro — la truo antaŭe devas
// esti vera truo, ne pentrita. La lofto ankaŭ portas la pinĉitan talion kaj la
// ruliĝantan kolumon sen aldonaj meshoj.
//     @returns geometrio ( THREE.BufferGeometry ) - La robo, laŭ la mondaj unuoj.
export function kreiMalfermanRobonSxelon(): THREE.BufferGeometry {
  // ⟨ La profilo 📃 ⟩ — mola A-linio kun malgranda talia pinĉo. La unua versio
  // havis radiuson 0o30/0o100 ĉe la suba rando — pli larĝa ol la ŝultroj plus la
  // brakoj — do la robo ne legiĝis kiel longa ĉemizo sed kiel vasta mantelo, kaj
  // la granda levo de la antaŭa rando ( 0o3/0o4 ) streĉis la unuajn vicojn en
  // platajn "flugilojn". Nun la profilo malkreskas de 0.254 ĉe la tuko ĝis
  // 0.219 ĉe la kolumo, kaj la lasta vico RULIĜAS la kolumon iomete eksteren —
  // la sama eksteren-kurbiĝanta rando kiel la oraj kadroj de la konstruaĵoj.
  // ⟨ La mantelo NE rajtas engluti la brakojn 📃 ⟩ — ĝi estas la plej LARĜA tavolo,
  // do ĉio, kio estas pli mallarĝa ol ĝi, malaperas. Antaŭe la tuko estis 0.273
  // dum la manumo de la maniko atingis nur 0.242 — la tutaj brakoj estis kaŝitaj
  // malantaŭ la verdaj flankoj de la mantelo kaj la figuro aspektis kiel sako kun
  // kapo. Nun la tuko estas 0.254 kaj la brakoj sidas pli malproksime ( vidu
  // konstruiFiguron ), do la manikoj elstaras el la mantelo kaj la brakoj LEGIĜAS
  // kiel brakoj. La mantelo ankaŭ malaltiĝas nur ĝis 0.39, dum la manikoj finiĝas
  // ĉe 0.61 — la manumoj do estas super la suba rando de la mantelo.
  // ⟨ La kolumo restas sub la ĉemizo 📃 ⟩ — la supra ringo estas 0.211, do ĝi
  // estas iomete PLI MALGRANDA ol la ŝultro-kovrilo de la ĉemizo ( 0.203, vidu
  // kreiInternanSxelon ) super ĝi. Alie la rando de la mantelo elstarus super la
  // ŝultroj kiel tendo kaj la ŝultro de la ĉemizo aspektus kiel ŝtupo.
  // ⟨ La sekco estas ELIPSO 📃 ⟩ — ĉiu radiuso ĉi tie estas la DUONLARĜO; la
  // profundo venas el ROB_PROFUNDO, do la sekco estas elipso — pli larĝa ol
  // profunda, kiel vera korpo ( antaŭe la robo estis rondo ).
  // La interna ĉemizo ( 0.227 malsupre, 0.195 supre ) kaj la torso restas ene kun
  // pli ol 0.027 da spaco sur la tuta alteco, do la tavoloj neniam tuŝiĝas.
  // ⟨ La mantelo devas ĉirkaŭi la svingiĝantajn krurojn 📃 ⟩ — la pantalono sidas
  // je ± 0.075 kun duonlarĝo 0.102, do ĝia ekstera rando atingas 0.177 ĉe la
  // kokso. Dum la paŝo la koksa parto de la pleto svingiĝas proksimume 0.06 antaŭen
  // kaj la mantelo mem ruliĝos malantaŭen; la pantalono do devas resti inter la
  // ĉemizo ( 0.227 ) kaj la mantelo ( 0.254 ).
  // ⟨ La supera duono MALLARĜIĜIS 📃 ⟩ — la tuta mantelo estis 0.25 larĝa ĝis la
  // kolumo, do la manikoj ( la plej ekstera punkto 0.30 ) elstaris nur 0.05 el ĝi
  // kaj la brakoj ne legiĝis kiel brakoj — la figuro aspektis kiel sako sen
  // manikoj. Nun la profilo estas MALLARĜA tra la tuta braka regiono ( 0.207 …
  // 0.227 ) kaj mallarĝiĝas nur malsupre al la tuko ( 0.246 ), do la manikoj
  // elstaras 0.08 … 0.10 — la brakoj legiĝas.
  // ⟨ La tavoloj restas vicigitaj 📃 ⟩ — la interna ĉemizo mallarĝiĝis per la sama
  // mapo ( vidu kreiInternanSxelon ), do la marĝeno inter la du tavoloj restas
  // 0.016 … 0.035 sur la tuta alteco kaj la mantelo neniam eniras la ĉemizon.
  const radiusoj = [ 0o77/0o400, 0o77/0o400, 0o72/0o400, 0o71/0o400, 0o70/0o400,
    0o67/0o400, 0o66/0o400, 0o66/0o400, 0o65/0o400 ];
  const vicoj = radiusoj.length;
  const kolonoj = 0o40;
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const indeksoj: number[] = [];
  for ( let v = 0; v < vicoj; v++ ) {
    const t = v / ( vicoj - 0o1 );
    const r = radiusoj[v];
    const duono = malfermaDuono(t);
    for ( let k = 0; k <= kolonoj; k++ ) {
      const u = duono + ( 0o1 - 0o2 * duono ) * ( k / kolonoj );
      const ang = u * Math.PI * 0o2;
      const y = ROB_Y_MALSUPRO + ROB_ALTO * t + robLevigho(ang, t);
      pozicioj.push(Math.sin(ang) * r, y, Math.cos(ang) * r * ROB_PROFUNDO);
      uvoj.push(u, t);
    }
  }
  // ⟨ La supraĵo FERMIĜAS per jugo kaj kolumo 📃 ⟩ — la mantelo finiĝis per
  // VERTIKALA tubo kies lasta ringo estis malfermita cirklo ( 0.207 ), do de supre
  // oni vidis la mantelon kiel malplenan sitelon ĉirkaŭ la kolo — la rando estis
  // rekta tranĉo de cilindro, ne vestaĵo. Nun la tubo fermas sin per SXULTRA JUGO:
  // la ringoj supreniras kaj samtempe MALLARĜIĜAS ĝis la kolo, poste la rando
  // RULIĜAS malsupren kaj reen, do la kolumo havas dikecon kaj randon anstataŭ
  // maldika folio. La kolo ( 0.0898 … 0.1113 ) kaj la kolumo de la ĉemizo ( 0.0703
  // supre de 1.4531 ) sidas komforte ene de la novaj ringoj.
  // ⟨ La jugo restas EKSTERE de la ĉemizo 📃 ⟩ — la ĉemiza ŝultro-kovrilo estas
  // 0.1875 ( ĝis 1.4219 ) kaj ĝia koluma faldo 0.1563 ĉe 1.4453, do la jugo portas
  // 0.0195 … 0.0313 da marĝeno super ĝi. Tiu marĝeno estas bezonata : la robo
  // turniĝas ĉirkaŭ la zono dum la paŝo ( vidu marŝSvingon ) kaj ĝia supraĵo moviĝas
  // ĝis 0.013, dum la ĉemizo pendas de la ŝultra pivoto kaj apenaŭ moviĝas. Kun
  // pli malgranda marĝeno la ĉemiza ŝultro trapikus la jugon ĉe la plej forta
  // kliniĝo de la paŝo.
  // ⟨ La jugo ankaŭ sekvas la manikojn 📃 ⟩ — la ŝultra kupolo de la maniko
  // ( supro 1.443, vidu kreiFoliaTonditanTubon ) atingas 0.0703 de la manika akso,
  // do la ringoj de la jugo ( 0.1914 … 0.1797 ĉe tiuj altoj ) trapasas ĝin kaj
  // restas kaŝitaj ĝis la kupolo finiĝas; nur la plej supra parto de la kolumo
  // leviĝas super la ŝultroj.
  // ⟨ La UV-oj de la kolumo 📃 ⟩ — la jugaj ringoj uzas v = 1, la SAMAN vicon kiel
  // la supra rando de la tubo, do la koluma bendo de la kanvaso daŭriĝas supren
  // tra la tuta jugo sen kudro ( kaj la kubutaj motivoj de la kanvaso ne
  // pligrandiĝas ).
  // [ y, duonlarĝo ] de la jugo kaj de la kolumo, de malsupre supren
  const kolumajRingoj: [ number, number ][] = [
    [ 0o133/0o100, 0o65/0o400 ],   // 1.4219 — la ŝultro ( iomete sub la kovilo )
    [ 0o134/0o100, 0o64/0o400 ],   // 1.4375 — la deklivo
    [ 0o271/0o200, 0o60/0o400 ],   // 1.4453 — la bazo de la kolumo
    [ 0o135/0o100, 0o51/0o400 ],   // 1.4531 — la kolo ( 0.1602, pli larĝa ol la kolo )
    [ 0o273/0o200, 0o47/0o400 ],   // 1.4609 — la koluma deklivo
    [ 0o274/0o200, 0o45/0o400 ],   // 1.46875 — la pinto de la kolumo ( 0.1445 )
    [ 0o273/0o200, 0o51/0o400 ],   // 1.4609 — la faldo RULIĜAS reen ( la dikeco )
  ];
  for ( const [ y, r ] of kolumajRingoj ) {
    for ( let k = 0; k <= kolonoj; k++ ) {
      const ang = k / kolonoj * Math.PI * 0o2;
      pozicioj.push(Math.sin(ang) * r, y, Math.cos(ang) * r * ROB_PROFUNDO);
      uvoj.push(k / kolonoj, 0o1);
    }
  }
  const ĉiujVicoj = vicoj + kolumajRingoj.length;
  for ( let v = 0; v < ĉiujVicoj - 0o1; v++ ) {
    for ( let k = 0; k < kolonoj; k++ ) {
      const a = v * ( kolonoj + 0o1 ) + k, b = a + 0o1;
      const c = a + kolonoj + 0o1, d = c + 0o1;
      indeksoj.push(a, c, b, b, c, d);
    }
  }
  // ⟨ La anguloj de la malfermaĵo RONDIĜAS 📃 ⟩ — la du malsupraj anguloj de la
  // malfermaĵo ( vidu rondigiMalfermanAngulon ).
  for ( const flanko of [ -0o1, 0o1 ] ) rondigiMalfermanAngulon(pozicioj, kolonoj, flanko);
  return kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj });
}

// kreiInternanSxelon — La interna ĉemizo, kiel TAVOLO de ringoj ( lofto ), la
// sama konstruo kiel la robo. Antaŭe ĝi estis 0o14-flanka CILINDRO — ĝia supra
// rando estis horizontala tranĉo ĉe la ŝultra linio, do la ĉemizo legiĝis kiel
// tubo kaj la ŝultroj restis nudaj. Nun ĝi havas SURLINION.
// ⟨ La ĉemizo ĉirkaŭas la kolon 📃 ⟩ — la supra parto supreniras super la
// ŝultrojn ( samlarĝe kiel la ŝultroj, do la haŭto neniam trapikas ) kaj finiĝas
// per mallonga kolumo ĉirkaŭ la kolo. La kolumo estas PLI MALLLARĜA ol la roba
// kolumo ( 0.219 ), do la ĉemizo ne ŝveliĝas preter la mantelo — ĝi nur leviĝas
// el ĝi, kiel vera ĉemizo sub mantelo.
// ⟨ La sekco sekvas la robon 📃 ⟩ — la KORPAJ ringoj uzas la saman elipson (
// la profundo 0.75 de la larĝo ) kaj la saman angulan konvencion ( u = 0 ĉe la
// fronto, u = 0o1/0o2 ĉe la dorso ), do la motivoj de la interna kanvaso
// vicigas sin kun la ekstera. Nur la KOLUMO estas preskaŭ RONDA — la kolo mem
// estas cilindro, do ronda kolumo ĉirkaŭas ĝin sen trapiki ĝin antaŭe aŭ
// malantaŭe ( vidu la ringojn en kreiInternanSxelon ).
//     @returns geometrio ( THREE.BufferGeometry ) - La ĉemizo, laŭ la mondaj unuoj.
export function kreiInternanSxelon(): THREE.BufferGeometry {
  // [ y, duonlarĝo, profundo ] de la malsupro supren. La KORPAJ ringoj sekvas la
  // torson ( 0.227 malsupre, 0.203 supre ) kun la elipsa profundo ROB_PROFUNDO;
  // la supraj ringoj portas propran profundon, ĉar la kolumo ĉirkaŭas la RONDAN
  // kolon anstataŭ la elipsan torson.
  // ⟨ La subaj ringoj sekvas la NOVAN torson 📃 ⟩ — la talio supreniris al 1.0781
  // kaj la ingveno al 0.8359, do la ringoj de la korpo ( la kokso 0.9297, la
  // talio 1.0781, la brusto 1.2578 ) sekvas la samajn altojn kiel la torso — la
  // ĉemizo do restas egala tavolo super la korpo, nur pli mallonga.
  // ⟨ La ŝultro-kovrilo estas MALLARĜA 📃 ⟩ — ĝi estas 0.203, nome iomete pli ol
  // la duono de la ekstera rando de la maniko ( 0.266, vidu konstruiFiguron ).
  // Antaŭe ĝi estis 0.227, do ĝi preskaŭ atingis la manikon kaj la tuta ŝultro
  // de la brako malaperis SUB la ŝtofon — la brakoj aspektis kiel enfalintaj en
  // la torson. La profundo ( 0.84 ) estas pli granda ol la larĝo de la elipso,
  // ĉar la ŝultro de la korpo estas pli cirkla ol la brusto kaj la mantelo
  // ruliĝas ĉirkaŭ la zono dum ĉiu paŝo ( vidu marŝSwingon ).
  // ⟨ Ankaŭ la ĉemizo MALPLIIĜIS 📃 ⟩ — la mantelo mallarĝiĝis ĝis 0.207 … 0.246,
  // do la ĉemizo sekvis per la sama mapo ( 0.1875 malsupre … 0.1875 supre ) kaj
  // la marĝeno inter la du tavoloj restas 0.016 … 0.035. La ĉemizo restas
  // SUFĈE LARĜA ĉirkaŭ la ŝultroj ( 0.1875 kontraŭ la torso 0.160 ) — la torso
  // ruliĝas ± 0.023 dum la paŝo, do la haŭto ankoraŭ ne trapikas la ŝtofon.
  // ⟨ La kokso kaj la tuko PLILARĜIĜIS 📃 ⟩ — la malsupraj ringoj estas 0.0078
  // pli larĝaj ol antaŭe. La kokso de la figuro estas 0.1914 larĝa ( la kruroj ± 0.09375
  // kun la pantalona radiuso 0.0977 ) kaj la malnova ĉemizo atingis 0.1953 tie — nome
  // nur 0.004 da spaco, do la pantalono trapikis la ĉemizon per 0.034 dum la paŝo ( la
  // kruro puŝas la tukon antaŭen kaj la torso kliniĝas malantaŭen ). La pli larĝa tuko
  // lasas 0.019 da aero ĉe la sama alto, kaj la mantelo ( 0.2188 … 0.2461 ) ankoraŭ
  // restas 0.012 ekstere de ĝi. La supra parto de la ĉemizo NE ŝanĝiĝis — la ŝultroj
  // devas resti mallarĝaj, ĉar la manikoj eliras el sub ili.
  const ringoj: [ number, number, number, number ][] = [
    [ INTERNO_Y_MALSUPRO, 0o70/0o400, ROB_PROFUNDO, 0o1 ],      // 0.578125 — la tuko
    [ 0o3/0o4,            0o66/0o400, ROB_PROFUNDO, 0o1/0o2 ],  // 0.7500
    [ 0o167/0o200,        0o64/0o400, ROB_PROFUNDO, 0 ],        // 0.9297 — la kokso
    [ 0o212/0o200,        0o60/0o400, ROB_PROFUNDO, 0 ],        // 1.0781 — la talio
    [ 0o241/0o200,        0o60/0o400, ROB_PROFUNDO, 0 ],        // 1.2578 — la brusto
    [ 0o131/0o100,        0o60/0o400, ROB_PROFUNDO, 0 ],        // 1.3906 — la ŝultra linio ( ene de la roba kolumo )
    [ 0o132/0o100,        0o60/0o400, 0o33/0o40, 0 ],           // 1.4063 — la ŝultro-kovrilo ( pli RONDA )
    [ 0o133/0o100,        0o60/0o400, 0o33/0o40, 0 ],           // 1.4219 — la rando de la kovrilo ( la maniko eliras ĉi tie )
    [ 0o134/0o100,        0o55/0o400, 0o33/0o40, 0 ],           // 1.4375 — la ŝultra deklivo supren
    [ 0o271/0o200,        0o50/0o400, 0o34/0o40, 0 ],           // 1.4453 — la koluma faldo ( ruliĝas eksteren )
    [ 0o135/0o100,        0o22/0o200, 0o1, 0 ],                 // 1.4531 — la kolumo, nun RONDA
    [ 0o273/0o200,        0o22/0o200, 0o1, 0 ],                 // 1.4609
    [ INTERNO_Y_SUPRO,    0o23/0o200, 0o1, 0 ],                 // 1.46875 — la pinto
  ];
  // ⟨ La tuko estas pli MALALTA antaŭe ol malantaŭe 📃 ⟩ — la interna ĉemizo havas
  // KLINITAN tukon: la rando sidas pli supre antaŭe ( la ventro liberiĝas kaj la
  // pantalono montriĝas tra la antaŭa malfermaĵo de la robo ) kaj pli malalte
  // malantaŭe ( la dorso de la ĉemizo restas longa ), — sed ĝi estas ankoraŭ
  // FERMITA tubo: la interna ĉemizo havas NENIAN antaŭan malfermaĵon, nur la
  // klinitan randon. La lasta kolumno de la tabelo ( p ) diras kiom da la klino
  // ĉiu ringo portas, do nur la du plej malsupraj ringoj klinas sin.
  const TUKA_LEVO = 0o1/0o10;   // 0.1 — kiom la antaŭa tuko estas pli alta ol la malantaŭa
  const tukaLevo = (ang: number, p: number) => TUKA_LEVO * p * ( Math.cos(ang) + 0o1 ) / 0o2;
  // 0o24 kolonoj ( ne 0o20 ) — la kolumo ĉirkaŭas la kolon kun 0.04 … 0.05 da
  // spaco, do pli malalta poligono tranĉus la kolon per siaj kordoj.
  const kolonoj = 0o24;
  const vicoj = ringoj.length;
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const indeksoj: number[] = [];
  for ( let v = 0; v < vicoj; v++ ) {
    const [ y, r, prof, p ] = ringoj[v];
    for ( let k = 0; k <= kolonoj; k++ ) {
      const u = k / kolonoj;
      const ang = u * Math.PI * 0o2;
      pozicioj.push(Math.sin(ang) * r, y + tukaLevo(ang, p), Math.cos(ang) * r * prof);
      uvoj.push(u, ( y - INTERNO_Y_MALSUPRO ) / INTERNO_ALTO);
    }
  }
  for ( let v = 0; v + 0o1 < vicoj; v++ ) {
    for ( let k = 0; k < kolonoj; k++ ) {
      const a = v * ( kolonoj + 0o1 ) + k, b = a + 0o1;
      const c = a + kolonoj + 0o1, d = c + 0o1;
      indeksoj.push(a, c, b, b, c, d);
    }
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj });
}

// ⟨ kreiRondanKeston foriĝis 📃 ⟩ — ĉiu ŝua parto uzas la ringan surfacon de
// kreiBotan kaj la kapo uzas sferojn, do la ekstrudita skatolo ( la malnova
// piedo, la malnova plando kaj la malnova nazo ) ne plu havas uzanton. La
// formo-modulo restas por la ceteraj partoj de la mondo.
