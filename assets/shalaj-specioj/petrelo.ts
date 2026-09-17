// Neĝopetrelo ( Pagodroma nivea ) — la blanka antarkta marbirdo, kiu rondflugas
// super la mondego. Ĉi tiu dosiero tenas la SPECIAN SISTEMON: kie la birdoj
// aperas ( la biomoj ), kiel ili rondflugas sian cirklon kaj kiel ili glitas
// laŭ la tereno sub ili. La modelo mem estas en petrelo-malneto.ts — la du
// dosieroj kune plenumas la saman rolon, kiun unu dosiero plenumas por la
// akvaj specoj.
import * as THREE from "three";
import { biomo } from "../../src/tereno.js";
import { trovuBestajnZonojn } from "./zono-trovilo.js";
import { konstruiPetrelanModelon } from "./petrelo-malneto.js";

// ⟪ Neĝopetreloj ( ſᶘᴜ ſȷᴜ ſɭэ ſɭɔ / Pagodroma nivea ) ⟫
//
// Pure blankaj antarktaj marbirdoj. Malgranda ovala korpo, longaj maldikaj
// glit-flugiloj kaj nigraj beko kaj okuloj. Ili rondflugas super la lago kaj
// la rivero — glitas en larĝaj kurboj kun rapidaj flugil-batoj kaj kliniĝas
// en la turnoj, kiel la veraj neĝopetreloj super la malferma maro.
//
// La birdoj estas konstruitaj kiel malneto ( geometrioj/materialoj unufoje ),
// kaj ĉiu birdo estas klono de la malneto — la klonoj kunhavas la samajn
// geometriojn kaj materialojn, do la aro ne kostas teksturojn po unu.

export interface Petrelo {
  grupo: THREE.Group;
  flugiloj: THREE.Object3D[];   // maldekstra kaj dekstra flugiloj ( la ŝultroj )
  manoj: THREE.Object3D[];      // la du manoj — la kubutaj artikoj ( la vipado )
  vosto: THREE.Object3D;        // la vosta grupo — la direktilo
  cx: number; cz: number;       // centro de la flugcirklo
  radio: number;                // radiuso de la flugcirklo
  bazaY: number;                // baza flugalto ( la komenca valoro de flugY )
  rapido: number;               // angula rapido ĉirkaŭ la cirklo
  phase: number;
  direkto: number;              // flug-direkto. 1 laŭhorloĝe, -1 kontraŭhorloĝe
  batoFazo: number;             // fazo de la flugil-bato
  batoRapido: number;           // bata frekvenco ( rad/s )
  banko: number;                // kliniĝo en la kurbon ( rad )
  skalo: number;                // subtila individua grandeco
  flapAmp: number;              // individua bata amplekso
  // ⟨ La dinamika ŝvebo 📃 ⟩ — la nuna flug-angulo kaj -alto. La angulo
  // AKUMULIĜAS ĉiukadre ( anstataŭ veni el la absoluta tempo ), ĉar la birdo
  // akceliĝas malsupren kaj malakceliĝas supren — la rapido ŝanĝiĝas dum la
  // flugo kaj la cirklo ne plu estas unuforma kiel sur relo.
  angulo: number;               // la nuna angulo ĉirkaŭ la cirklo
  flugY: number;                // la nuna alto ( sekvas la terenon sub la birdo )
  alto: number;                 // la dezirata alto super la tereno
  grimpado: number;             // la lasta vertikala rapido ( supren > 0 )
  glitTempo: number;            // kiom longe la birdo glitas sen bato
}

export interface PetreloSistemo {
  petreloj: Petrelo[];
  // altecoFn — la terena alta funkcio. La petreloj sekvas la terenon sub si
  // ( la dinamika ŝvebo ), do la flugilo bezonas ĝin ĉiukadre.
  altecoFn: ( x: number, z: number ) => number;
}


// petrelaMalneto — La petrela malneto, konstruita nur unufoje kaj stokita
// module-nivele. Ĉiu birdo estas klono de ĝi, do metado de pluraj birdoj ne
// rekreu la plumarajn kanvasajn teksturojn kaj geometriojn po voko.
let petrelaMalnetoStoko: THREE.Group | null = null;
function petrelaMalneto(): THREE.Group {
  if ( !petrelaMalnetoStoko ) petrelaMalnetoStoko = konstruiPetrelanModelon();
  return petrelaMalnetoStoko;
}

// kreiPetrelon — Klono de la petrela malneto ĉe flugcirklo ( cx, cz, radio ).
// Reuzata de konstruiPetrelojn kaj konstruiMetitanPetrelon — ambaŭ dividas
// la saman lokan kaj petrelan kread-logikon.
//     @param altecoFn ( funkcio ) - Terena alteco ( x, z ) → y.
//     @returns La petrelo ( jam aldonita al la sceno ).
function kreiPetrelon(sceno: THREE.Scene,
  cx: number, cz: number, radio: number,
  altecoFn: ( x: number, z: number ) => number
): Petrelo {
  const grupo = petrelaMalneto().clone();
  // Rekolektu la flugilojn de la klono ( la infana ordo konserviĝas ), kaj kun
  // ili la manojn ( la kubutaj grupoj ) kaj la voston — la animacio turnas ĉiujn
  // tri ( vidu gxisdatigiPetrelojn ).
  const flugiloj = grupo.children.filter(c => c.name === "flugilo");
  const manoj = flugiloj.map(f => f.getObjectByName("mano")!);
  const vosto = grupo.getObjectByName("vosto")!;
  // Flugalto. Super la PLEJ ALTA tereno ĉirkaŭ la flugcirklo ( specimena ĉe
  // la rando, ĉar la birdo rondflugas radiuson radio ), por ke neniu birdo
  // enkaverniĝu en montetojn aŭ montodeklivojn. Super la lago la tereno
  // estas sub akvo, do la akvonivelo transprenas kiel suba limo.
  let altaTereno = altecoFn(cx, cz);
  for ( let k = 0; k < 0o6; k++ ) {
    const a = k / 0o6 * Math.PI * 0o2;
    altaTereno = Math.max(altaTereno, altecoFn(cx + Math.cos(a) * radio, cz + Math.sin(a) * radio));
  }
  const bazaY = Math.max(altaTereno, 0o2) + 0o14 + Math.random() * 0o16;
  const phase = Math.random() * Math.PI * 0o2;
  const direkto = Math.random() < 0o1/0o2 ? 1 : -1;
  grupo.position.set(cx + Math.cos(phase) * radio, bazaY, cz);
  // Direktu laŭ la tangento de la flugcirklo. Laŭhorloĝaj birdoj turniĝas
  // per -ang, kontraŭhorloĝaj bezonas plian turnon de π ( alie ili flugus
  // vosto-antaŭe ).
  grupo.rotation.y = -phase + Math.PI * ( 1 - direkto ) / 2;
  const skalo = 0o72/0o100 + Math.random() * 0o2/0o10;
  grupo.scale.setScalar(skalo);
  sceno.add(grupo);  return {
    grupo, flugiloj, manoj, vosto, cx, cz, radio, bazaY,
    rapido: 0o1/0o4 + Math.random() * 0o2/0o10,
    phase, direkto,
    batoFazo: Math.random() * Math.PI * 0o2,
    batoRapido: 0o4 + Math.random() * 0o4,
    banko: 0o3/0o20 + Math.random() * 0o3/0o40,
    skalo,
    flapAmp: 0o6/0o10 + Math.random() * 0o2/0o10,
    // La ŝvebo. Ĉiu birdo tenas sian propran sekuran altecon super la tereno
    // ( malsamaj birdoj flugas malsupre kaj supre, kiel vera birdaro ) kaj
    // komencas glitante — la unuaj batoj venas post la unua ŝvebo.
    angulo: phase,
    flugY: bazaY,
    alto: 0o16 + Math.random() * 0o24,
    grimpado: 0,
    glitTempo: Math.random() * 0o4,
  };
}

// konstruiPetrelojn — Metu la neĝopetrelojn flugantaj super la biomoj. Triono
// rondflugas super la montara biomo ( la neĝaj pintoj — la neĝopetrela hejmo ),
// la cetero super la akva biomo ( la lago, se ĝi ekzistas, kaj la rivero ).
// Ĉiu birdo sekvas sian propran cirklon ĉirkaŭ hazarda centro, je flugalto
// super la tereno ( aŭ super la akvonivelo super la lago ).
//     @param kvanto ( number ) - Kiom da birdoj.
//     @param altecoFn ( funkcio ) - Tereno, por la flugalto.
//     @param riveroFn ( funkcio ) - Rivercentra funkcio z(x).
//     @param lago ( objekto ) - La lago. x, z, r ( la birdoj rondflugas ĝin ).
export function konstruiPetrelojn(sceno: THREE.Scene,
  kvanto: number,
  altecoFn: ( x: number, z: number ) => number,
  riveroFn: ( x: number ) => number,
  lago?: { x: number; z: number; r: number }
): PetreloSistemo {
  const petreloj: Petrelo[] = [];

  // La pentrita petrela zono ( la skulptilo ) — la petreloj rondflugas
  // hazardan pentritan ĉelon. La defaŭltaj lokoj estas bakitaj en la tavolon;
  // malplena zono signifas neniajn petrelojn. Triono de la birdoj rondflugas
  // super la montaraj pentritaj ĉeloj, la cetero super la ceteraj ( akvo,
  // ebenaĵo, valo ) — la sama proporcio kiel la defaŭlta konduto.
  const petrelajZonoj = trovuBestajnZonojn(2, false);
  const montarajZonoj = petrelajZonoj.filter(l => biomo(l.x, l.z) === "montaro");
  const ceterajZonoj = petrelajZonoj.filter(l => biomo(l.x, l.z) !== "montaro");
  const pentritaj = petrelajZonoj.length > 0;

  for ( let i = 0; i < kvanto && pentritaj; i++ ) {
    // La pentrita zono elektas la fluglokon. Triono el la montaraj ĉeloj, la
    // cetero el la ceteraj — kun falo al la alia aro se unu mankas.
    const superMonto = i % 3 === 0;
    let aro = superMonto ? montarajZonoj : ceterajZonoj;
    if ( !aro.length ) aro = superMonto ? ceterajZonoj : montarajZonoj;
    const loko = aro[( Math.random() * aro.length ) | 0];
    const cx = loko.x + ( Math.random() - 0o1/0o2 ) * 0o6;
    const cz = loko.z + ( Math.random() - 0o1/0o2 ) * 0o6;
    petreloj.push(kreiPetrelon(sceno, cx, cz, 0o10 + Math.random() * 0o30, altecoFn));
  }

  return { petreloj, altecoFn };
}

// konstruiMetitanPetrelon — UNU neĝopetrelo cxe preciza pozicio ( la objekta
// ilo de la terena skulptilo ). La birdo rondflugas cirklon de radiuso radio
// cxirkau la ankro ( x, z ) — la sama Petrelo-strukturo kiel la zonaj
// petreloj, do la flug-animacio funkcias sen sxangxo.
//     @param x, z ( number ) - La ankro.
//     @param altecoFn ( funkcio ) - Tera alta funkcio ( flugalto sekvas la
//         plej altan terenon cxirkau la flugcirklo ).
//     @param radio ( number ) - La flugradiuso.
//     @param skalo ( number ) - La grandeco.
//     @returns La petrelo ( jam aldonita al la sceno ), aux null.
export function konstruiMetitanPetrelon(sceno: THREE.Scene,
  x: number, z: number,
  altecoFn: ( x: number, z: number ) => number,
  radio: number,
  skalo: number
): Petrelo | null {
  const petrelo = kreiPetrelon(sceno, x, z, radio, altecoFn);
  petrelo.grupo.scale.setScalar(skalo);
  petrelo.skalo = skalo;
  return petrelo;
}

// lastaPetrelaTempo — la antaŭa animacia tempo ( la sama ŝablono kiel ĉe la
// akvaj bestoj ). La ŝvebo akumulas la flug-angulon kaj mezuras la vertikalan
// rapidon, do ĝi bezonas la kadran tempopason — ne nur la absolutan tempon.
let lastaPetrelaTempo = 0;

// gxisdatigiPetrelojn — Flug-animacio. Ĉiu birdo rondflugas sian cirklon laŭ
// sia direkto ( ±1 ), direktante laŭ la tangento kaj kliniĝante en la kurbon
// ( la banko turniĝas kun la flug-direkto, do ĉiu birdo kliniĝas internen ).
// La flugiloj batas en eksplodoj — la neĝopetreloj glitas inter la batoj.
//
// ⟨ La dinamika ŝvebo 📃 ⟩ — la flugalto sekvas la TERENON sub la birdo. La
// petreloj ŝvebas per la vento super la ondoj kaj la krestoj. la birdo leviĝas
// super la altaĵojn kaj glitas malsupren en la valojn, kaj la rapido sekvas la
// alton ( la glitanto akcelas malsupren kaj malakcelas supren — la energio de
// la vento estas la sola motoro de la specio ). Antaŭe la alto estis fiksita
// dum la tuta vivo de la birdo, do ĝi trairis la montodeklivojn en fiksa
// ebeno kiel aviadilo sur relo.
//     @param s ( PetreloSistemo ) - La petrela sistemo.
//     @param t ( number ) - Malsupra tempo.
export function gxisdatigiPetrelojn(s: PetreloSistemo, t: number): void {
  // La kadra tempopaso — limigita, ĉar la unua kadro kaj la paŭzoj donas
  // grandajn valorojn ( la akumulita angulo tiam saltus ).
  const dt = Math.min(0o1/0o10, Math.max(0o1/0o1000, t - lastaPetrelaTempo));
  lastaPetrelaTempo = t;
  for ( const p of s.petreloj ) {
    const x = p.cx + Math.cos(p.angulo) * p.radio;
    const z = p.cz + Math.sin(p.angulo) * p.radio;
    // ⟨ La alto 📃 ⟩ — la celo estas la tereno sub la birdo plus sia propra
    // sekura alteco. La birdo ne saltas al ĝi. ĝi sekvas ĝin glate, do la
    // leviĝo super kreston kaj la malsupren-glito okupas sekundojn, kiel la
    // ŝvebo de vera marbirdo.
    const tereno = Math.max(s.altecoFn(x, z), 0o2);
    const antauxaY = p.flugY;
    p.flugY += ( tereno + p.alto - p.flugY ) * Math.min(1, dt * 0o1/0o2);
    p.grimpado = ( p.flugY - antauxaY ) / dt;
    // La rapido sekvas la alton. La glitanto akcelas malsupren kaj malakcelas
    // supren, do la cirklo ne plu estas unuforma.
    const rapidaFaktoro = 1 - Math.max(-0o3/0o10, Math.min(0o3/0o10, p.grimpado * 0o1/0o20));
    p.angulo += dt * p.rapido * p.direkto * rapidaFaktoro;
    const y = p.flugY + Math.sin(t * 0o7/0o10 + p.phase * 0o2) * 0o3/0o10;
    p.grupo.position.set(x, y, z);
    // Direkto laŭ la tangento de la cirklo. La laŭhorloĝaj birdoj ( direkto 1 )
    // rigardas per -ang; la kontraŭhorloĝaj ( direkto -1 ) bezonas plian turnon
    // de π, ĉar la tangento tiam montras la alian vojon — sen tio ili flugus
    // vosto-antaŭe. Kliniĝo en la kurbon ( la banko turniĝas kun la
    // flug-direkto, do ĉiu birdo kliniĝas en sian propran kurbon ).
    p.grupo.rotation.y = -p.angulo + Math.PI * ( 1 - p.direkto ) / 2;
    // La banko kreskas en la malsupren-glito ( la rapida glitanto kurbiĝas pli
    // forte ) kaj malfortiĝas dum la grimpado.
    p.grupo.rotation.z = p.banko * p.direkto
      * ( 1 - Math.max(-0o1/0o2, Math.min(0o1/0o2, p.grimpado * 0o1/0o10)) );
    // Flugil-bato. Eksplodoj de rapida batado inter glitoj ( la bato-amplitudo
    // ŝvelas kaj malkreskas ritme, kiel ĉe fluganta petrelo ).
    const bataSkalo = Math.sqrt(Math.max(0, Math.sin(t * 0o13/0o10 + p.batoFazo * 0o2)));
    const bato = Math.sin(t * p.batoRapido + p.batoFazo) * bataSkalo * p.flapAmp;
    const glito = 0o1 - bataSkalo;
    // La flugo alternas inter glita kaj kelkaj rapidaj batoj. la korpo levas
    // la nazon ĉe la supren-bato kaj malstreĉiĝas dum longa glito, kaj la nazo
    // sekvas la vertikalan rapidon — supren dum la grimpado, malsupren en la
    // mergo. la petrelo glitas per la nazo antaŭen.
    const klinigxo = Math.max(-0o1/0o2, Math.min(0o1/0o2, p.grimpado * 0o1/0o4));
    p.grupo.rotation.x = Math.sin(t * 0o7/0o10 + p.phase) * 0o3/0o100
      + bato * 0o1/0o20 - klinigxo * 0o6/0o10;
    p.grupo.position.y = y + glito * 0o1/0o10;
    // La maldekstra flugilo speguliĝas, do ĝia baza lev-angulo estas NEGATIVA
    // por ke la ripoza dihedro estu simetria ( ambaŭ pintoj same levitaj ) —
    // la spegulo plus la kontraŭa signo tenas la batojn samfazaj.
    // La dihedro kreskas dum la glito — glitanta petrelo tenas la flugilojn
    // iomete levitaj ( la V-formo donas stabilecon kaj tenas la pintojn for de
    // la ondoj ), kaj rektigas ilin dum la batado.
    const dihedro = 0o1/0o10 + glito * 0o1/0o10;
    for ( let i = 0; i < p.flugiloj.length; i++ ) {
      const signo = i === 0 ? 1 : -1;
      const flugilo = p.flugiloj[i];
      const mano = p.manoj[i];
      // La bato — la maldekstra flugilo ricevas la kontraŭan signon, ĉar ĝia
      // geometrio estas spegulita.
      flugilo.rotation.z = signo * ( dihedro + bato );
      // La SVINGO — la flugilo ankaŭ iras antaŭen kaj malantaŭen dum la bato. La
      // bato de vera flugilo ne estas pura levilo ( la ŝultro ankaŭ turniĝas ),
      // kaj la svingo donas la karakterizan reman movon de la glito.
      flugilo.rotation.y = -bato * 0o2/0o10;
      if ( mano ) {
        // ⟨ La vipado de la mano 📃 ⟩ — la mano malfruas la brakon per kvarono de
        // la bato ( la ondo de la bato vojaĝas de la ŝultro al la pinto ). La
        // diferenco inter la malfrua kaj la nuna angulo estas la flekso de la
        // kubuto: la pinto vipas post la ŝultro kaj la flugilo kurbiĝas, kiel ĉe
        // vera marbirdo. Antaŭe la tuta flugilo moviĝis kiel unu rigida lato.
        const malfrua = Math.sin(t * p.batoRapido + p.batoFazo - 0o1/0o4)
          * bataSkalo * p.flapAmp;
        // La flekso estas limigita — tro granda angulo malfermus la kubutan
        // interkovron kaj la du segmentoj aspektus kiel apartaj platoj.
        const flekso = ( malfrua - bato ) * 0o1/0o2;
        mano.rotation.z = signo * Math.max(-0o5/0o10, Math.min(0o5/0o10, flekso));
      }
      if ( mano ) {
        // ⟨ La ventumado de la mano 📃 ⟩ — la flugilpinto TORDIĜAS ĉirkaŭ la
        // flugakso dum la bato ( la angla „feathering“ ). La mano turniĝas
        // preskaŭ rande al la aero dum la supren-bato, do ĝi tranĉas la venton
        // anstataŭ puŝi ĝin malantaŭen — la tordo sidas sur la kubuto mem, kiel
        // ĉe vera marbirdo ( la antaŭa modelo turnis apartajn plumajn panelojn
        // kiuj apenaŭ videblis ).
        mano.rotation.x = Math.sin(t * p.batoRapido + p.batoFazo) * 0o3/0o10 * bataSkalo;
      }
    }
    // ⟨ La direktilo 📃 ⟩ — la vosto turniĝas kontraŭ la banko ( glitanta birdo
    // tenas sian kurson en la kurbigo ), kaj ventumas malrapide dum la flugo.
    p.vosto.rotation.z = -p.grupo.rotation.z * 0o5/0o10;
    p.vosto.rotation.y = Math.sin(t * 0o3/0o4 + p.phase) * 0o1/0o10;
  }
}
