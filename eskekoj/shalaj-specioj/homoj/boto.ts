// ≺⧼ La boto 🥾 ⧽≻
// La boto de la figuro ( kreiBotan ) — du maldensegaj surfacoj konstruitaj el
// superelipsaj ringoj, kun la akcenta plando. La komunaj formoj ( superelipso,
// kreiRinganSurfacon, kreiArtikanSferon, remapiUVon ) vivas en formoj.ts.
import * as THREE from "three";
import { kunfandiGeometriojn, aplikiSkatolajnUvojn } from "../../komunajxoj/kunfandajxoj.js";
import { superelipso, kreiRinganSurfacon } from "./formoj.js";

// ⟪ La boto 🥾 ⟫ — la plej videbla ŝuo de la figuro. La robo kovras la genuojn
// kaj la botoj portas la tutan videblan kruron, do ilia formo gravas pli ol
// ilia grando. La unua versio estis cilindro kun manumo plus RONDIGITA SKATOLO
// kiel piedo, kaj la plando flosis 0o1/0o20 sub la piedo, do la ŝuo legiĝis kiel
// sitelo sur klakilo. Nun la boto estas du maldensegaj surfacoj konstruitaj el
// SUPERELIPSAJ ringoj — la sama rondigita ortangulo kiel la vojoj, la pordaj
// kadroj kaj la fenestroj de la mondo.

// kreiBotan — La boto kaj ĝia plando. La mondaj unuoj estas la sama kadro kiel la
// kruro-grupo de la figuro — la ternivelo estas je −0o5/0o20 ( la koksa grupo
// sidas je +0o5/0o20 ), do la malsupro de la plando kuŝas ĝuste sur la tero.
// ⟨ La du surfacoj 📃 ⟩ La ŜTIPO iras de la rando supre ( kie la akcenta manumo
// maleolo, kun vera tibia kurbo ( la suro estas la plej larĝa ringo ) kaj kun
// fina ringo KAŜITA ene de la piedo — la du surfacoj do kunfandiĝas sen videbla
// kudro. La PIEDO konsistas el sekcoj laŭ la LONGO de la ŝuo — ĉiu sekco estas
// superelipso en la XY-ebeno kun plata malsupro ( la plando ) kaj kurba supro, do
// la maleolo altiĝas kaj la pinto de la ŝuo vere malaltiĝas kaj mallarĝiĝas
// anstataŭ finiĝi per vertikala muro.
//     @returns ( { boto, akcentaj } ) - La leda geometrio de la boto kaj la
//         akcenta geometrio ( la plando, ĝia rando, la horizontala konturo sur la
//         piedo kaj la bendo ĉe la supro de la ŝtipo ).
export function kreiBotan(): { boto: THREE.BufferGeometry; akcentaj: THREE.BufferGeometry } {
  // ⟨ La tero venas de la GENUO 📃 ⟩ — la tuta bota geometrio mezuriĝas de la
  // genuo ( la mesho sidas ĉe −MALEOLO_Y en la maleola grupo, vidu
  // konstruiFiguron ), do kun la genuo ĉe la mondo 0.5 la tero sidas 0.5 sub la
  // nulo. Antaŭe la kruro estis pli mallonga kaj la tero estis ĉe −0.3125.
  // ⟨ La plando flosas 0.002 super la tero 📃 ⟩ — la malsupro de la plando sidis
  // ĜUSTE sur la tera ebeno ( la sama y ), do la du surfacoj batalis pri la sama
  // profundo ĉe ĉiu paŝo kaj la rando de la ŝuo makuliĝis per batalantaj facetoj.
  // La leveto estas nevidebla ( 2 mm ) kaj ĝi forigas la problemon ankaŭ en la
  // mondo, kie la figuro staras sur la ebeno de la tereno.
  const GRUNDO = -0o1/0o2 + 0.002;     // −0.498 — 2 mm super la tero
  const PLANDA_ALTO = 0o3/0o200;       // 0.0234375 — la dikeco de la plando
  const PLANDA_SUPRO = GRUNDO + PLANDA_ALTO;
  // ⟨ La ledo finiĝas SUB la plando 📃 ⟩ — la malsupro de la leda piedo sidas
  // iomete sub la supraĵo de la plando ( anstataŭ ĝuste sur ĝi ), alie la du
  // surfacoj estas KUNPLANAAJ kaj batalas pri la sama profundo ( z-fighting )
  // ĉe la pinto kaj ĉe la kalkano.
  const LEDA_FUNDO = PLANDA_SUPRO - 0o1/0o100;   // −0.4866 — 0.01 sub la plando
  const K = 0o20;                      // la punktoj ĉirkaŭ ĉiu ringo
  const r = ( i: number ) => i / K * Math.PI * 0o2;

  // ⟨ La V-forma supro 📃 ⟩ — la rando de la ŝtipo NE estas horizontala — la fronto
  // malleviĝas kaj la dorso leviĝas, do la bordo legiĝas kiel V de la flanko kaj
  // la malantaŭa flanko estas pli alta ol la fronta ( la klasika bot-supro ). La
  // kresto mezuriĝas po azimuto — 0 antaŭe, π malantaŭe — kaj ĉiu ringo portas
  // malpliiĝantan parton de ĝi ( la lasta kolono de la tabelo ), do la ŝtipo
  // DEKLINIĜAS anstataŭ turniĝi — la tubo restas vertikala kaj nur ĝia supro
  // dekliniĝas. La akcenta manumo sekvas la saman kreston ( vidu malsupre ).
  // ⟨ La kresto estas SIMETRIA 📃 ⟩ — la ringoj rondiras per ang = 0 ĉe +x ( la
  // flanko ), do la kresto NE rajtas mezuriĝi per la angulo mem — tiel ĝi estus 0 ĉe
  // unu flanko kaj maksimuma ĉe la alia, kaj la rando dekliniĝus flanken anstataŭ
  // malantaŭen. La kresto do venas el sin( ang ) — 1 ĉe la FRONTO ( ang = π/2 ),
  // −1 ĉe la dorso — do la rando estas simetria maldekstre kaj dekstre kaj la V
  // malfermiĝas ĝuste antaŭe.
  const KRESTA = 0o2/0o100;            // 0.03125 — kiom pli alta estas la dorso
  const kresto = (ang: number) => KRESTA * ( 0o1 - Math.sin(ang) ) / 0o2;
  // ⟨ La kvar anguloj 📃 ⟩ — la rando ankaŭ havas malgrandan noĉon ĉe ĉiu el la
  // KVAR anguloj de la superelipso ( la diagonaloj, kie la rondigita ortangulo
  // fakte rondiĝas ) — la absoluta sinuso de la duobla azimuto pintas ĝuste tie kaj
  // nuliĝas sur la aksoj, do alta potenco faras mallarĝan noĉon — la rando ondiĝas
  // kvarfoje anstataŭ havi kvar videblajn dentojn. Ĝi skaliĝas per la sama parto
  // ( p ) kiel la kresto, do la ledo kaj ĝia akcenta rando restas vicigitaj.
  const ANGULA_NOĈO = 0o1/0o100;       // 0.0156 — kiom profunda estas la noĉo
  const angulaNoĉo = (ang: number) =>
    ANGULA_NOĈO * Math.pow(Math.abs(Math.sin(ang * 0o2)), 0o10);
  // ⟨ La ŝtipo 📃 ⟩ — [ alto, duonlarĝo, duonprofundo, la parto de la kresto ].
  // ⟨ La ŝtipo ne disfloras kiel sitelo 📃 ⟩ — la plej larĝa ringo estas la SURO
  // ( la mondo 0.31 ) kaj la talio kaj la maleolo estas pli mallarĝaj ol ĝi, do
  // la ŝtipo sekvas la kruron, kiel luanta boto. Nur la rando ( la faldita
  // manumo, vidu malsupre ) estas iomete pli larĝa.
  // La ringo ĉe la talio estas la lasta kiu portas parton de la kresto ( p = 2/3 ),
  // do la tuta supra parto klinas kune kun la rando kaj la tubo restas vertikala.
  // ⟨ La rando de la ŝtipo LARĜIĜAS 📃 ⟩ — la rando havas 0.09375 × 0.1055, do
  // ĝi estas la plej larĝa parto de la ŝuo ( antaŭe ĝi estis pli mallarĝa ol la
  // suro ). Tio legas kiel faldita bot-manumo.
  // ⟨ La profundo MALLARĜIĜIS 📃 ⟩ — la rando estis 0.1172 profunda, do inter ĝi
  // kaj la pantalono restis 0.042 da aero ĉe la fronto kaj la dorso. La buŝo tial
  // aspektis kiel malfermita truo kaj la ruliĝo de la piedo movis ĝian randon
  // videble. Kun 0.1055 la aero malgrandiĝis al 0.030 kaj la ŝtipo ĉirkaŭas la
  // kruron pli proksime — la rando legiĝas kiel manumo, ne kiel sitelo.
  // ⟨ La ŝtipo MALLONGIĜIS PLU 📃 ⟩ — antaŭe la rando iris ĝis la GENUO ( la mondo
  // 0.52 ), poste al 0.375. Nun ĝi sidas ĉe la mondo 0.3125 ( trikvarone inter la
  // genuo kaj la maleolo ), do la pantalono videblas super la boto kaj la boto
  // legiĝas kiel ŝuo, ne kiel kruringo.
  const RANDO_Y = -0o3/0o16;           // −0.1875 — la rando ( la mondo 0.3125 )
  const RANDO_A = 0o30/0o400;          // 0.09375 — la duonlarĝo de la ŝtipo ĉe la rando
  const RANDO_B = 0o33/0o400;          // 0.1055 — la duonprofundo ĉe la rando
  const stipajRingoj: [ number, number, number, number ][] = [
    [ RANDO_Y,              RANDO_A,        RANDO_B,       0o1     ],   // −0.1875 — la rando ( la mondo 0.3125 )
    [ RANDO_Y - 0o1/0o200,  RANDO_A,        RANDO_B,       0o1     ],   // −0.195 — sub la rando
    [ RANDO_Y - 0o3/0o200,  0o27/0o400,     0o31/0o400,    0o2/0o3 ],   // −0.211 — la talio de la ŝtipo
    [ -0o1/0o4,             0o31/0o400,     0o32/0o400,    0       ],   // −0.25 — la suro ( la mondo 0.25 )
    [ -0o54/0o200,          0o31/0o400,     0o31/0o400,    0       ],   // −0.344 — la maleolo ( la mondo 0.156 )
    [ -0o66/0o200,          0o31/0o400,     0o30/0o400,    0       ],   // −0.422 — ene de la piedo
    [ -0o73/0o200,          0o27/0o400,     0o27/0o400,    0       ],   // −0.461 — profunde ene de la ledo
    [ -0o76/0o200,          0o16/0o400,     0o16/0o400,    0       ],   // −0.484 — en la plandon
  ];
  // ⟨ La ŝtipo FLUAS en la piedon 📃 ⟩ — la du malsupraj ringoj estas same larĝaj
  // kiel la pieda ledo ĉe la maleolo ( 0.0977 kontraŭ 0.1016 ), do la supraĵo de la
  // ŝtipo kaj tiu de la piedo kunfalas en UNU konturon — sen tio la ŝtipo legiĝus
  // kiel tubo enŝovita en pli grandan piedon. Samtempe la ringoj restas sub la
  // supraĵo de la piedo ( la piedo altiĝis al 0.164 ), do la buŝo de la ŝtipo ne
  // malfermiĝas kaj oni ne vidas la internon ( la pantalono aperis tra tia fendo ).
  // ⟨ La ŝtipo PLONĜAS tra la ledo ĝis la plando 📃 ⟩ — kun la malnova fermo la
  // ŝtipo finiĝis 0.016 SUPER la supraĵo de la ledo, do ĝia ferma ventumilo ( plata
  // disko ) videblis kiel ŝtupo inter la tubo kaj la piedo — la boto aspektis kiel
  // du pecoj. Nun la du lastaj ringoj ( 0.0898 kaj 0.0547 duonlarĝaj ) malsupreniras
  // SUB la ledan supraĵon kaj en la plandon mem, kaj la ferma ventumilo kaŝiĝas
  // tie — de la rando ĝis la grundo la boto do estas UNU kontinua formo.
  // ⟨ La fermaj ĉapoj 📃 ⟩ — ringo kun ĉiuj punktoj en la centro kolapsas en
  // ventumilon, do la ĉapo venas el la SAMA kunligo kiel la ceteraj ringoj kaj
  // ĝia ventumilo sekvas la saman regulon ( sen duobla kodo por la ĉapoj ). Sen
  // ili oni vidus en la malfermitajn tubojn — la unua versio havis malfermitan
  // manumon kaj oni povis rigardi interne de la boto.
  const centro = ( y: number, z: number ) => Array.from({ length: K },
    () => [ 0, y, z ] as [ number, number, number ] );
  // ringo — Unu ringo de konko ĉirkaŭ la vertikala akso. La kresto ( p ) levas la
  // punktojn laŭ la azimuto, do la akcentaj bendoj povas sekvi la saman supron
  // kiel la ledo — sen ĝi la kolumo restus horizontala super V-forma rando.
  // ⟨ La manumo ne portas la angulajn noĉojn 📃 ⟩ — la noĉoj apartenas al la leda
  // rando ( la kvar anguloj de la superelipso ). Sur la akcenta manumo ili faris
  // kronon da akraj pintoj super la buŝo de la boto, do oni vidas la ledon tra la
  // fendoj — la manumo lasas la noĉojn al la ŝtipo ( kiu estas kaŝita sub ĝi ).
  const ringo = ( y: number, a: number, b: number, p = 0, noĉoj = true ) =>
    Array.from({ length: K }, ( _, i ) => {
      const ang = r(i);
      const [ x, z ] = superelipso(ang, a, b, 0o4);
      const ondo = kresto(ang) - ( noĉoj ? angulaNoĉo(ang) : 0 );
      return [ x, y + ondo * p, z ] as [ number, number, number ];
    });
  const ŝtipajRingoj = [ centro(stipajRingoj[0][0], 0),
    ...stipajRingoj.map(([ y, a, b, p ]) => ringo(y, a, b, p)),
    centro(stipajRingoj[stipajRingoj.length - 0o1][0], 0) ];
  const ŝtipo = kreiRinganSurfacon(ŝtipajRingoj);

  // ⟨ La piedo estas TRAPEZO 📃 ⟩ — [ z, duonlarĝo, la supro de la sekco ]. La
  // kalkano estas malalta kaj mallarĝa, la maleolo ( z ≈ 0 ) estas la plej alta
  // punkto ( la mondo 0.094 = MALEOLO_Y, la pivoto de la piedo ), kaj la
  // supraĵo restas preskaŭ HORIZONTALA ĝis ĝi malkreskas ĉe la pinto. Antaŭe la
  // pinto mallarĝiĝis al 0.0156 kaj la supraĵo deklivis senĉese malsupren — la
  // ŝuo legiĝis kiel kojno. Nun la lasta sekco estas 0.0547 larĝa ( la sama
  // larĝo kiel la mallongaj flankoj de la superelipso, do la pinto legiĝas kiel
  // RONDIGITA ORTANGULO ) kaj ĝia supro restas 0.0157 super la plando.
  // ⟨ La piedo estas PLI ALTA 📃 ⟩ — la supraĵo de la piedo iris ĝis 0.094 super
  // la grundo ( plata pantoflo ), poste al 0.141. Nun ĝi atingas 0.164 ĉe la
  // maleolo kaj 0.102 ĉe la pinto, do la ledo vere KOVRAS la piedon kaj la boto
  // legiĝas kiel boto — la tuta pieda parto de la ŝuo altiĝis je 0.023, kaj la
  // sekcoj restas ekster la bota ŝtipo ( vidu supre ).
  const piedajSekcoj: [ number, number, number ][] = [
    [ -0o15/0o200, 0o10/0o200, -0o60/0o200 ],   // la kalkano ( la mondo 0.125 )
    [ -0o11/0o200, 0o13/0o200, -0o56/0o200 ],   // −0.086 ( la mondo 0.141 )
    [ -0o5/0o200,  0o14/0o200, -0o54/0o200 ],   // −0.039 ( la mondo 0.156 )
    [  0o1/0o200,  0o15/0o200, -0o53/0o200 ],   // 0.008 — la maleolo ( la plej alta : 0.164 )
    [  0o5/0o200,  0o15/0o200, -0o54/0o200 ],   // 0.039 ( la mondo 0.156 )
    [  0o16/0o200, 0o14/0o200, -0o56/0o200 ],   // 0.125 — la pilko de la piedo
    [  0o22/0o200, 0o13/0o200, -0o60/0o200 ],   // 0.172
    [  0o25/0o200, 0o12/0o200, -0o62/0o200 ],   // 0.203
    [  0o30/0o200, 0o7/0o200,  -0o63/0o200 ],   // 0.234 — la pinto ( LARĜA, restas super la plando )
  ];
  // ⟨ La pinto restas super la plando 📃 ⟩ — la lasta sekco antaŭe falis sub la
  // supran surfacon de la plando, do la sekco renversiĝis kaj la pinto farigxis
  // plata rubando. La supro de la pinto nun restas 0.0157 super la plando.
  // ⟨ La ledo finiĝas sub la plando 📃 ⟩ — la sekcoj mezuriĝas de LEDA_FUNDO ( ne
  // de PLANDA_SUPRO ), do la malsupro de la ledo kaŝiĝas 0.01 en la plandon — la
  // supraĵo ( kiu gravas por la akcenta konturo, vidu suproJe ) ne ŝanĝiĝas.
  const piedajRingoj = [ centro(piedajSekcoj[0][2] / 0o2 + PLANDA_SUPRO / 0o2, piedajSekcoj[0][0]),
    ...piedajSekcoj.map(([ z, a, supro ]) => {
      const hh = ( supro - LEDA_FUNDO ) / 0o2, yc = ( supro + LEDA_FUNDO ) / 0o2;
      return Array.from({ length: K }, ( _, i ) => {
        const [ x, y ] = superelipso(r(i), a, hh, 0o4);
        return [ x, yc + y, z ] as [ number, number, number ];
      });
    }),
    centro(piedajSekcoj[piedajSekcoj.length - 0o1][2] / 0o2 + PLANDA_SUPRO / 0o2,
      piedajSekcoj[piedajSekcoj.length - 0o1][0]) ];
  const piedo = kreiRinganSurfacon(piedajRingoj);


  // ⟨ La plando 📃 ⟩ — ĝi sekvas la SAMAN sekco-liston kiel la piedo, do la du
  // surfacoj neniam povas disiĝi ( la antaŭa versio estis aparta plata skatolo,
  // kaj la piedo flosis super ĝi ). La plando estas nur iomete pli larĝa ( la
  // rando de la ledo ).
  // ⟨ La plando estas EGALDika 📃 ⟩ — antaŭe ĝi dikiĝis je 0.015 ĉe la kalkano
  // kaj ĝiaj malsupraj flankoj kuntiriĝis al 0.85, do la ŝuo staris sur kojno.
  // Nun la plando estas FLATA tabulo kun vertikalaj flankoj — de la flanko la
  // ŝuo estas trapezo, kiel vera plata ŝuo.
  // ⟨ La plando kaj ĝia rando ELSTARAS laŭ la longo 📃 ⟩ — ili uzis la SAMAN
  // sekco-liston kiel la ledo, do iliaj fermaj ventumiloj ( ĉe la pinto kaj ĉe la
  // kalkano ) sidis en la SAMA ebeno kiel tiuj de la ledo. La profundaĵa bufro ne
  // povas apartigi du surfacojn en la sama ebeno, do la pinto de la ŝuo makuliĝis
  // per batalantaj facetoj ( la « ŝu-fundo » videble eniris la akcentan plandon ).
  // Nun ĉiu akcenta parto etendiĝas IOM PLI MALPROKSIMEN ol la ledo ĉe ambaŭ finoj
  // kaj estas iomete pli larĝa, do la ventumiloj de la ledo sidas TUTE INTERNE de
  // la akcenta plando kaj neniuj du surfacoj koincidas.
  const sekcojKunFinoj = ( etendo: number, largxo: number ): [ number, number, number ][] =>
    piedajSekcoj.map(( sect, i ) => [ i === 0 ? sect[0] - etendo
      : i === piedajSekcoj.length - 0o1 ? sect[0] + etendo : sect[0],
      sect[1] + largxo, sect[2] ] as [ number, number, number ] );
  const plandajSekcoj = sekcojKunFinoj(0o1/0o100, 0o3/0o400);   // la plando
  const randajSekcoj = sekcojKunFinoj(0o3/0o400, 0o1/0o200);    // la rando
  const plandaDuono = PLANDA_ALTO / 0o2;
  const plandaYc = ( PLANDA_SUPRO + GRUNDO ) / 0o2;
  const plando = kreiRinganSurfacon([
    centro(plandaYc, plandajSekcoj[0][0]),
    ...plandajSekcoj.map(([ z, a ]) => Array.from({ length: K }, ( _, j ) => {
      const [ x, y ] = superelipso(r(j), a, plandaDuono, 0o4);
      return [ x, plandaYc + y, z ] as [ number, number, number ];
    })),
    centro(plandaYc, plandajSekcoj[plandajSekcoj.length - 0o1][0]),
  ]);
  // ⟨ La rando ĉe la plando ( la "welt" ) 📃 ⟩ — maldika lipo kiu leviĝas el la
  // supraĵo de la plando kaj etendiĝas iomete preter ĝi. Sen ĝi la plando legiĝas
  // kiel aparta tabulo sub la ŝuo; kun ĝi ĝi legiĝas kiel rando ĉirkaŭ la piedo,
  // kaj la akcenta koloro sidas sur la limo inter la ledo kaj la grundo.
  const plandaRando = kreiRinganSurfacon([
    centro(PLANDA_SUPRO, randajSekcoj[0][0]),
    ...randajSekcoj.map(([ z, a ]) => Array.from({ length: K }, ( _, j ) => {
      // ⟨ La lipo ne leviĝas super la piedon 📃 ⟩ — ĝia duona alto estas 0o1/0o200
      // kaj ĝia supro sekvas la sekcon, do ĉe la pinto ( kie la sekco mem estas
      // preskaŭ plata ) la lipo restas SUB la supraĵo de la ledo. Kun pli dika
      // lipo la tuta pinto kovriĝis per la akcenta koloro.
      const [ x, y ] = superelipso(r(j), a + 0o1/0o200, 0o1/0o200, 0o4);
      return [ x, PLANDA_SUPRO + y, z ] as [ number, number, number ];
    })),
    centro(PLANDA_SUPRO, randajSekcoj[randajSekcoj.length - 0o1][0]),
  ]);
  // ⟨ La akcenta HORIZONTALA konturo sur la piedo 📃 ⟩ — antaŭe la akcento de la ŝuo
  // estis bendo ĉirkaŭ la MEZO de la ŝtipo ( meze de la kruro ), poste bendo TRANS la
  // vamfo ( kiu legiĝis kiel vertikala rimeno ), poste preskaŭ RONDA ovalo. La ovalo
  // ankoraŭ legiĝis kiel rimeno, ĉar ĝi ĉirkaŭis la piedon de ĉiu flanko. Nun la
  // desegno estas HORIZONTALA konturo sur la SUPRAĴO de la piedo — RONDIGITA
  // ORTANGULO ( la sama form-lingvo kiel la mondo — vidu formoj.ts ), kiu kuŝas sur
  // la vamfo, LARĜA trans la piedon kaj mallonga laŭ ĝia longo. La du longaj strekoj
  // sekvas la ledon de flanko al flanko kaj la du mallongaj fermas la konturon antaŭe
  // kaj malantaŭe, do de antaŭe kaj de supre oni vidas horizontalan konturon — ne
  // rimenon. Ĝi estas la plej supra tavolo de la piedo kaj sekvas ĝian kurbon.
  // ⟨ Kie la konturo sidas 📃 ⟩ — la sekco de la piedo je ajna z ( interpolo inter la
  // najbaraj sekcoj ) donas la duonlarĝon a kaj la supron; la punkto de la supraĵo je
  // donita x estas | y | = hh ( 1 − ( x / a )⁴ )^( 1/4 ), do la konturo sidas ĝuste sur
  // la ledo kaj neniam flosas super ĝi aŭ sinkas en ĝin.
  const sekcoJe = ( z: number ): [ number, number ] => {
    for ( let i = 0; i + 0o1 < piedajSekcoj.length; i++ ) {
      const a = piedajSekcoj[i], b = piedajSekcoj[i + 0o1];
      if ( z >= a[0] && z <= b[0] ) {
        const t = ( z - a[0] ) / ( b[0] - a[0] );
        return [ a[1] + ( b[1] - a[1] ) * t, a[2] + ( b[2] - a[2] ) * t ];
      }
    }
    const lasta = piedajSekcoj[piedajSekcoj.length - 0o1];
    return [ lasta[1], lasta[2] ];
  };
  // suproJe — La punkto sur la supraĵo de la piedo je ( x, z ) kaj ĝia normalo ( la
  // normalo de la superelipsa sekco, do ĝi montras supren kaj flanken, ne laŭlonge —
  // la deklivo de la piedo laŭ sia longo estas tro malgranda por gravi ).
  const suproJe = ( x: number, z: number ): [ THREE.Vector3, THREE.Vector3 ] => {
    const [ a, supro ] = sekcoJe(z);
    const hh = ( supro - PLANDA_SUPRO ) / 0o2, yc = ( supro + PLANDA_SUPRO ) / 0o2;
    const u = Math.min(Math.abs(x) / a, 0o1);
    const v = Math.pow(Math.max(0, 0o1 - Math.pow(u, 0o4)), 0o1/0o4);
    return [ new THREE.Vector3(x, yc + hh * v, z),
      new THREE.Vector3(Math.sign(x) * Math.pow(u, 0o3) / a, Math.pow(v, 0o3) / hh, 0)
        .normalize() ];
  };
  // ⟨ La konturo iras de la pinto ĝis la kalkano 📃 ⟩ — la ŝtipo estas tubo kiu
  // malsupreniĝas ĝis −0.281 kaj tie fermiĝas, do ĝi ĉirkaŭas la mezan parton de la
  // piedo kaj kaŝas ajnan desegnon tie ( la piedo "elkreskas" el la ŝtipo je
  // | z | ≈ 0.086 ). La konturo do NE plu estas malgranda ortangulo sur la vamfo —
  // ĝi estas MALDika STRIPO kiu iras de la pinto ĝis malantaŭ la ŝtipo. Ĝia
  // malantaŭa parto malaperas en la ŝtipo ( kiel la kudro de vera boto ) kaj tio
  // estas la celo — de antaŭe kaj de flanke oni vidas la du paralelajn strekojn
  // eliri el sub la ŝtipo kaj kuri antaŭen al la pinto, do la akcento legiĝas kiel
  // linio laŭ la tuta longo de la ŝuo anstataŭ kiel ringo sur la vamfo.
  const KONTURO_X = 0o13/0o400;       // 0.0430 — la duonlarĝo ( trans la piedon )
  const KONTURO_Z = 0o37/0o400;       // 0.1211 — la duonlongo ( laŭ la piedo )
  const KONTURO_CENTRO = 0o16/0o400;  // 0.0547 — la centro laŭ la longo de la ŝuo
  const KONTURO_DIKO = 0o3/0o400;     // 0.0117 — la larĝo de la streko
  // ⟨ La streko elstaras pli 📃 ⟩ — kun 0.0039 ĝi estis preskaŭ sur la ledo mem
  // kaj la du surfacoj batalis pri la profundo, kiam la figuro malproksimiĝis
  // ( la profundaĵa bufro de la bildigilo ne plu apartigas ilin ). Nun la streko
  // leviĝas 0.0078 — ankoraŭ mallarĝa, sed klare SUPER la ledo.
  const KONTURO_ALTO = 0o1/0o200;     // 0.0078 — kiom la streko elstaras el la ledo
  const KONTURO_PUNKTOJ = 0o40;       // la punktoj ĉirkaŭ la konturo
  // konturaPunkto — La punkto SUR la supraĵo de la piedo ( kaj ĝia normalo ) je
  // angulo de la konturo. La vojo estas superelipso kun la eksponento 0o4, do
  // RONDIGITA ORTANGULO — la mallongaj flankoj iras preskaŭ rekte trans la piedon kaj
  // la longaj preskaŭ rekte laŭ ĝia longo. La vojo estas esprimata en ( x, z ) kaj la
  // funkcio suproJe levas ĝin al la supraĵo de la ledo.
  const konturaPunkto = ( ang: number ): [ THREE.Vector3, THREE.Vector3 ] => {
    const [ x, z ] = superelipso(ang, KONTURO_X, KONTURO_Z, 0o4);
    return suproJe(x, KONTURO_CENTRO + z);
  };
  const konturajRingoj: [ number, number, number ][][] = [];
  for ( let i = 0; i <= KONTURO_PUNKTOJ; i++ ) {   // la lasta ringo ripetas la unuan
    const ang = i / KONTURO_PUNKTOJ * Math.PI * 0o2;
    const [ punkto, normalo ] = konturaPunkto(ang);
    // ⟨ La kadro de la streko 📃 ⟩ — la direkto laŭ la konturo ( el la najbaraj
    // punktoj de la kurbo ), la normalo de la supraĵo, kaj ilia vektora produto ( la
    // flanko ). La streko do turniĝas kun la kurbo — ĉe la mallongaj flankoj — kie la
    // kurbo iras trans la piedon — la streko sekvas tiun turnon anstataŭ stariĝi kiel
    // muro.
    const [ antauxa ] = konturaPunkto(ang - 0o1/0o20);
    const [ posta ] = konturaPunkto(ang + 0o1/0o20);
    const direkto = posta.clone().sub(antauxa).normalize();
    const flanko = normalo.clone().cross(direkto).normalize();
    const duono = flanko.clone().multiplyScalar(KONTURO_DIKO / 0o2);
    const supren = normalo.clone().multiplyScalar(KONTURO_ALTO);
    const interna = punkto.clone().sub(duono), ekstera = punkto.clone().add(duono);
    // la kvar anguloj de la streko — maldekstre, dekstre, supre, supre maldekstre
    // ( la ordo rondiras maldekstren ĉirkaŭ la progres-akso, kiel la piedo mem ).
    konturajRingoj.push([
      [ interna.x, interna.y, interna.z ],
      [ ekstera.x, ekstera.y, ekstera.z ],
      [ ekstera.x + supren.x, ekstera.y + supren.y, ekstera.z + supren.z ],
      [ interna.x + supren.x, interna.y + supren.y, interna.z + supren.z ],
    ]);
  }
  const piedaRando = kreiRinganSurfacon(konturajRingoj);
  // ⟨ La akcenta MANUMO ĉe la supro 📃 ⟩ — la akcento de la ŝuo estas vera MANUMO
  // ( la rando de la boto faldiĝinta eksteren kaj malsupren ) — ĝi etendiĝas de 0.0078
  // ĝis 0.0391 ( 0.031 alta ) kaj staras 0.0117 preter la leda ŝtipo, do de ĉiu
  // flanko oni klare vidas akcentan bendon ĉe la supro — antaŭe la akcento estis nur
  // 0.0039 elstara lipo, kiu preskaŭ perdiĝis kontraŭ la ledo. Ĝia supra rando sekvas
  // la V-forman kreston kaj la kvar angulojn ( p = 1, same kiel la leda rando sub
  // ĝi ), do la du randoj ondiĝas KUNE. Poste ĝi RULIĜAS INTERNEN ( ĝia interna
  // ringo sidas sur la leda rando mem ) kaj la ĉapo fermas la buŝon de la ŝuo — sen
  // ĝi oni vidus tra la ŝtipo, kaj de supre oni vidas akcentan ringon ĉirkaŭ la
  // pantalono anstataŭ truon.
  // ⟨ La manumo NE duobligas la ledan surfacon 📃 ⟩ — antaŭe ĉi tiu manumo havis
  // du ringojn ĝuste SAMRADIUSE kiel la rando de la leda ŝtipo ( 0.09375 ) kaj
  // nur 0.005 aparte en la alto, kaj ĝia lasta ringo sidadis SUPER la randon de
  // la ŝtipo ( −0.1825 kontraŭ −0.1875 ). La du surfacoj do batalis pri la sama
  // profundo ( z-fighting ) ĉe la tuta rando, kaj super la ŝtipo restis malfermita
  // poŝo, tra kiu oni vidis la pantalonon. Nun la interna ringo estas 0.004 pli
  // MALGRANDA ol la ŝtipo kaj la faldita parto malsupreniras SUB la randon de la
  // ŝtipo ( −0.1925 ), do la ferma ventumilo kaŝiĝas ene de la ŝtipo, kaj la
  // manumo estas nur ronda bendo, kiu elstaras el la ledo.
  const KUF_SUB = RANDO_Y - 0o1/0o50;    // la malsupra rando de la manumo ( 0.02 sub la rando )
  const KUF_SUPRO = RANDO_Y + 0o3/0o200; // ĝia supra rando ( 0.0117 super la rando )
  const KUF_ELSTARO = 0o3/0o400;         // 0.0117 — kiom la manumo elstaras el la ledo
  const krestaRando = kreiRinganSurfacon([
    ringo(KUF_SUB, RANDO_A - 0o1/0o50, RANDO_B - 0o1/0o50, 0o1, false),
    ringo(KUF_SUB, RANDO_A + KUF_ELSTARO, RANDO_B + KUF_ELSTARO, 0o1, false),
    ringo(KUF_SUPRO, RANDO_A + KUF_ELSTARO, RANDO_B + KUF_ELSTARO, 0o1, false),
    ringo(RANDO_Y - 0o1/0o200, RANDO_A - 0o1/0o100, RANDO_B - 0o1/0o100, 0o1, false),
    centro(RANDO_Y - 0o1/0o200, 0),
  ]);
  // ⟨ La kvar akcentaj partoj estas UNU geometrio 📃 ⟩ — la plando, la rando ĉe
  // la plando, la konturo sur la piedo kaj la bendo ĉe la supro portas la saman
  // akcentan materialon, do ili kunfandiĝas kaj la tuta akcento de unu piedo kostas
  // unu desegnan alvokon ( antaŭe la plando mem estis la dua alvoko ).
  const akcentaj = kunfandiGeometriojn([ plando, plandaRando, piedaRando, krestaRando ]);
  aplikiSkatolajnUvojn(akcentaj, 0o2);

  for ( const peco of [ ŝtipo, piedo ] ) aplikiSkatolajnUvojn(peco, 0o2);
  return { boto: kunfandiGeometriojn([ ŝtipo, piedo ]), akcentaj };
}
