// ≺⧼ La korpo 🧍 ⧽≻
// La korpo de la homo kaj la pantalono — la torso ( kreiKorpanTorson ), la kruroj
// ( kreiKorpanKruropon ), la brakoj ( kreiKorpanBrakon ), la manoj kun la ungoj
// ( kreiKorpanManon ), la piedo ( kreiKorpanPiedon ) kaj la pantalono
// ( kreiPantalonan ).
import * as THREE from "three";
import { kunfandiGeometriojn } from "../../komunajxoj/kunfandajxoj.js";
import { superelipso, kreiRinganSurfacon, kreiArtikanSferon } from "./formoj.js";

// kreiKorpanTorson — La torso de la homa modelo — la koksoj, la brusto kaj la
// ŝultroj kiel unu fermita konko. Ĝi sidas tute INTERNE de la interna ĉemizo
// ( la ĉemizo nun supreniras super la ŝultrojn — vidu kreiInternanSxelon — do ankaŭ
// la ŝultra haŭto estas kaŝita ), kaj ĝi videblas kiam la tuta vesto kaŝiĝas.
// ⟨ La torso havas ANATOMION 📃 ⟩ — antaŭe ĝi estis preskaŭ vertikala tubo kun
// ŝultra flanĝo. Nun ĝi havas la verajn apartaĵojn — la brusto, la talio ( la plej
// mallarĝa ) kaj la koksoj — kaj la trapezio malsupreniras de la kolo al la
// ŝultro tra multaj ringoj, do la kolo elkreskas el deklivo anstataŭ el tranĉita
// plato.
// ⟨ La koksoj kaj la ingveno 📃 ⟩ — la malsupra duono havas la veran pelvon: la
// talio estas la plej mallarĝa ( 0.117 ), la koksoj larĝiĝas malsupren ĝis 0.160
// ĉe 0.578 ( la sama alto, kie la femuroj eniras la torson ), kaj poste la korpo
// FINIĜAS per RONDA ingveno ( la lastaj ringoj malgrandiĝas 0.140 → 0.109 →
// 0.0625 ) anstataŭ per PLATA tranĉo ĉe 0.5. La malnova plata tranĉo aspektis
// kiel mallonga jupo: la torso finiĝis per horizontala disko kaj la kruroj
// eliris sub ĝi. Nun la ingveno kurbiĝas malsupren inter la femuroj, la kruroj
// konverĝas kaj la du formoj kunfandiĝas kiel vera pelvo.
// ⟨ La ŝultron faras la BRAKO 📃 ⟩ — la akromio de la torso estas 0.160, dum la
// deltoido de la brako ( vidu kreiKorpanBrakon ) atingas 0.258. Vera ŝultro
// funkcias same: la torso finiĝas per la trapezio kaj la RONDA deltoido de la
// brako faras la eksteran konturon. Antaŭe la torso mem estis larĝa ( 0.172 ) kaj
// la brako sidadis interne — la du formoj fandis sin en unu blokon kaj la brako
// aspektis enfalinta en la torson.
// ⟨ La brusto estas la PLEJ ANTAŬA punkto 📃 ⟩ — ĉiu ringo portas antaŭen-ŝovon
// ( dz ) de 0.0156 maksimume, kaj la antaŭa rando de la torso neniam iras preter
// 0.125. Antaŭe la ŝultro- kaj brustoringoj portis ŝovon ĝis 0.047, do la plej
// antaŭa punkto de la torso estis la ŝultro ( 0.176 ) — ne nur malreala ( la
// brusto devas elstari, ne la klaviklo ) sed ankaŭ danĝera: la ĉemiza ŝultro-
// kovrilo lasis nur 0.015 da spaco, kaj ĉar la robo ruliĝas ĉirkaŭ la zono dum
// ĉiu paŝo ( vidu marŝSvingon ), la brusto trapikis la ĉemizon ĉe la ŝultro. Nun
// la plej mallarĝa tavolo ( la ĉemizo ) havas pli ol 0.03 da spaco ĉie.
// ⟨ La sekco estas ELIPSO 📃 ⟩ — la eksponento estas 0o2 ( antaŭe 0o3 ). La
// superelipso de la eksponento 0o3 buliĝas 1.07-oble ĉe la diagonaloj, kaj ĉar
// la ĉemizo estas premata al 0.75 en z, ĝuste tiuj diagonalaj punktoj estis la
// plej proksimaj al la ŝtofo — la brusto fakte trapikis la ĉemizon kaj dum la
// marŝa svingo komplete montriĝis. Vra homa torso estas elipso, do la pli simpla
// sekco estas ankaŭ la pli reala.
// ⟨ La spino 📃 ⟩ — ĉiu ringo moviĝas iomete antaŭen aŭ malantaŭen ( la brusto
// antaŭen, la postaĵo malantaŭen ), do la torso havas la etan S-kurbiĝon de
// staranta homo anstataŭ esti tute rekta tubo.
//     @returns geometrio ( THREE.BufferGeometry ) - La torso, en la mondaj unuoj.
export function kreiKorpanTorson(): THREE.BufferGeometry {
  const K = 0o20;
  const ringoj: [ number, number, number, number ][] = [   // [ y, a, b, z-ŝovo ]
    [ 0o137/0o100, 0o20/0o400, 0o12/0o400,  0        ],  // 1.4844 — ĝi malaperas en la kolon
    [ 0o136/0o100, 0o22/0o400, 0o14/0o400,  0        ],  // 1.4688
    [ 0o135/0o100, 0o24/0o400, 0o20/0o400,  0        ],  // 1.4531 — la bazo de la kolo
    [ 0o271/0o200, 0o26/0o400, 0o22/0o400,  0        ],  // 1.4453 — la malsupra kolo
    [ 0o134/0o100, 0o32/0o400, 0o24/0o400,  0o2/0o400 ],  // 1.4375 — la trapezio
    [ 0o267/0o200, 0o41/0o400, 0o30/0o400,  0o3/0o400 ],  // 1.4297 — la ŝultra deklivo
    [ 0o133/0o100, 0o51/0o400, 0o34/0o400,  0o4/0o400 ],  // 1.4219 — la ŝultro ( 0.160 — la rando de la brako apudiĝas )
    [ 0o265/0o200, 0o51/0o400, 0o35/0o400,  0o3/0o400 ],  // 1.4141 — la akromio ( la plej larĝa: 0.160 )
    [ 0o132/0o100, 0o47/0o400, 0o35/0o400,  0o3/0o400 ],  // 1.4063 — la deltoido ( mola deklivo malsupren )
    [ 0o263/0o200, 0o44/0o400, 0o35/0o400,  0o2/0o400 ],  // 1.3984 — sub la ŝultroj
    [ 0o131/0o100, 0o43/0o400, 0o36/0o400,  0o2/0o400 ],  // 1.3906 — la supra brusto ( la akselo )
    // ⟨ La suba torso MALPLIIĜIS 📃 ⟩ — antaŭe la talio estis ĉe 0.9531 kaj la
    // ingveno ĉe 0.5, do la torso mezuris 0.98 kaj la kruroj nur 0.31 de la
    // alto. La sama mapo ( la linia kuntiriĝo de la du regionoj ) validas por la
    // ĉemizo kaj por la mantelo, do la tavoloj restas vicigitaj.
    [ 0o256/0o200, 0o43/0o400, 0o36/0o400,  0o3/0o400 ],  // 1.3594 — la brusto ( la plej antaŭa: 0.129 )
    [ 0o241/0o200, 0o42/0o400, 0o35/0o400,  0o2/0o400 ],  // 1.2578 — la malsupra brusto ( pli larĝa ol profunda )
    [ 0o225/0o200, 0o40/0o400, 0o33/0o400,  0o1/0o400 ],  // 1.1641 — la malsupraj ripoj ( la ventro )
    [ 0o212/0o200, 0o36/0o400, 0o32/0o400,  0        ],  // 1.0781 — la talio ( la plej mallarĝa: 0.117, SASA_Y )
    [ 0o204/0o200, 0o40/0o400, 0o33/0o400,  0        ],  // 1.0313 — la kresto de la kokso
    [ 0o175/0o200, 0o44/0o400, 0o35/0o400, -0o1/0o400 ],  // 0.9766 — la kokso
    [ 0o167/0o200, 0o46/0o400, 0o37/0o400, -0o3/0o400 ],  // 0.9297 — la kokso ( la pivoto de la kruroj ) kaj la postaĵo
    // ⟨ La pelvo MALALTIĜAS GLATE 📃 ⟩ — kiam la tuta suba torso kuntiriĝis, la
    // malnova fino ( 0.1367 → 0.0625 dum 0.016 ) igxis platatabula rando supre de
    // la femuroj ( la figuro aspektis kiel en vindotuko ). Nun la pelvo malaltiĝas
    // tra sep ringoj ĝis 0.8047 — meze inter la femuroj, kie la du kruroj jam
    // kuniĝas — do la ingvena V estas glata kiel ĉe vera homo.
    [ 0o161/0o200, 0o51/0o400, 0o37/0o400, -0o4/0o400 ],  // 0.8828 — la femuroj eniras la kokson ( la plej larĝa: 0.160 )
    [ 0o155/0o200, 0o44/0o400, 0o34/0o400,  0        ],  // 0.8516 — la ingveno
    [ 0o153/0o200, 0o37/0o400, 0o27/0o400,  0        ],  // 0.8359
    [ 0o151/0o200, 0o31/0o400, 0o21/0o400,  0        ],  // 0.8203
    [ 0o150/0o200, 0o23/0o400, 0o16/0o400,  0        ],  // 0.8125
    [ 0o147/0o200, 0o15/0o400, 0o11/0o400,  0        ],  // 0.8047 — la RONDA pinto ( inter la femuroj )
  ];
  const centro = ( y: number, dz: number ) => Array.from({ length: K },
    () => [ 0, y, dz ] as [ number, number, number ]);
  return kreiRinganSurfacon([ centro(ringoj[0][0], ringoj[0][3]),
    ...ringoj.map(([ y, a, b, dz ]) => Array.from({ length: K }, ( _, i ) => {
      const [ x, z ] = superelipso(i / K * Math.PI * 0o2, a, b, 0o2);
      return [ x, y, z + dz ] as [ number, number, number ];
    })), centro(ringoj[ringoj.length - 0o1][0], ringoj[ringoj.length - 0o1][3]) ]);
}

// kreiKorpanKruropon — La kruro de la homa modelo — la femuro kaj la tibio. La
// geometrio mezuriĝas de la GENUO ( la mondo 0.5, la grundo 0.5 sub ĝi );
// la mesho sidas ĉe genuoKompenso en la kruro-grupo, kies pivoto estas nun la
// KOKSO ( vidu konstruiFiguron ). La
// PIEDO estas aparta geometrio ( vidu kreiKorpanPiedon ). Ĝi sidas interne de la pantalono kaj de la boto, do ĝi videblas
// nur se la vestoj kaŝiĝas — sed sen ĝi la homa modelo ne staras sola.
// ⟨ La kruro havas formon 📃 ⟩ — la femuro estas la plej dika ĉe la supro
// ( 0.094 ), la genuo estas la plej mallarĝa ( 0.062 ) kaj la suro pufiĝas
// malsupre ( 0.070 kontraŭ 0.059 ĉe la tibio ), do la kruro legiĝas kiel kruro
// anstataŭ kiel stango. La sekco estas elipso ( la eksponento 0o2, same kiel la
// torso ) — la maleolo estas pli mallarĝa ol profunda, kiel vera maleolo.
// ⟨ La kruro komenciĝas INTERNE de la torso 📃 ⟩ — la plej supra ringo sidas ĉe
// la mondo 0.9297 ( la sama alto kiel la plej larĝa koksa ringo de la torso kaj
// la pivoto de la kruro ), do ĝi malaperas ene de la pelvo — la torso estas
// 0.160 larĝa tie kaj la krura ringo 0.164 ( ± 0.075 + 0.082 = 0.157 ).
// ⟨ La kruro PLILONGIS 📃 ⟩ — antaŭe la geometrio mezuris de la genuo 0.3125
// supren 0.2656 kaj malsupren 0.1875, do la femuro estis 0.25 kaj la tibio 0.31.
// Nun la femuro mezuras 0.43 ( la kokso 0.9297 − la genuo 0.5 ) kaj la tibio 0.41
// ( la genuo − la maleolo 0.09375 ) — la proporcioj de vera homo.
// Ĉiuj ringoj restas ene de la pantalona tubo kaj de la bota ŝtipo kun spaco, do
// la haŭto ne trapikas la ŝtofon aŭ la ledon.
// ⟨ La kruro estas DISIGITA ĉe la genuo 📃 ⟩ — la kruro nun venas en du partojn,
// supre kaj malsupre de la genua ringo, ĉar la figuro fleksas la genuon dum la
// paŝo ( vidu marŝSvingon ) kaj la du partoj turniĝas ĉirkaŭ la genuo aparte. La
// du partoj KUNHAVAS la genuan ringon, do rekte ili sidas rando al rando sen
// fendo, kaj kiam la genuo fleksiĝas la kojno inter ili pleniĝas per la artika
// sfero ( vidu kreiArtikanSferon ), kiu sidas sur la pivoto mem.
//     @returns ( { supra, malsupra } ) - La du partoj de la kruro. La geometrio
//         mezuriĝas de la GENUO, do la « malsupra » parto jam sidas ĉe la pivoto
//         kaj la « supra » parto portas la kompenson en la koksa grupo.
export function kreiKorpanKruropon(): { supra: THREE.BufferGeometry; malsupra: THREE.BufferGeometry } {
  const K = 0o20;
  const GENUO = 0o4;                  // la indekso de la genua ringo de la tabelo
  // ⟨ La kruro havas GENUON 📃 ⟩ — antaŭe la genuo estis simple la plej mallarĝa
  // ringo de egala tubo, do la kruro estis konuso sen artiko. Vera genuo estas pli
  // larĝa ol la tibio super ĝi kaj ĝia patelo PUŜIĜAS antaŭen, dum la kavo malantaŭe
  // ( la poplito ) retiriĝas. Nun ĉiu ringo povas porti antaŭen-ŝovon ( la kvara
  // kolumno ), la genuo havas 0.0664 kun +0.0078 antaŭen kaj la ringo sub ĝi
  // −0.0039 malantaŭen — la etan S-kurbiĝon de staranta kruro.
  // ⟨ La suro estas MUSKOLO 📃 ⟩ — la malnova suro estis unu ringo ( 0.0547 larĝa,
  // 0.0664 profunda ) kaj la tibio sub ĝi iris rekte al la maleolo. Nun la
  // gastroknemio havas du ringojn, ĝi PUŜIĜAS malantaŭen ( la ringoj portas
  // negativan ŝovon ) kaj la tibio antaŭe restas plata — la suro do legiĝas kiel
  // muskolo anstataŭ kiel dikaĵo. La ringo tuj sub la genuo ankaŭ MALLARĜIĜIS
  // ( 0.0625 kontraŭ la 0.0703 de la antaŭa versio ) — la antaŭa valoro estis
  // precize egala al la pantalona ringo ĉe la sama alto, do la haŭto kaj la ŝtofo
  // kuntuŝiĝis kaj povis z-fajfi dum la paŝo.
  // ⟨ La supra femuro SEKVAS la pantalonon 📃 ⟩ — la du supraj ringoj maldikiĝis
  // kune kun la pantalono ( vidu kreiPantalonan ), ĉar ili sidas ene de ĝi. La
  // haŭto ĉe la kokso estas 0.0664 kaj ĉe la femuro-supra 0.0859, do la pantalono
  // ( 0.09375 ) restas egale super ĝi sen kuntuŝiĝi — la antaŭa valoro estis 0.09375
  // kontraŭ la nova 0.09375 kaj la du tavoloj z-fajfus dum la paŝo. La videbla
  // femuro komenciĝas malsupre de tio, kie la ĉemizo finiĝas.
  const ringoj: [ number, number, number, number ][] = [    // [ y, a, b, z-ŝovo ] de la kokso malsupren
    [  0o67/0o200, 0o21/0o400, 0o20/0o400,  0           ],   // 0.4297 — ene de la torso ( la kokso estas la pivoto )
    [  0o51/0o200, 0o26/0o400, 0o25/0o400,  0o1/0o400   ],   // 0.3203 — la femuro-supra ( sub la pantalono )
    [  0o30/0o200, 0o26/0o400, 0o25/0o400,  0o1/0o400   ],   // 0.1875 — la meza femuro
    [  0o14/0o200, 0o23/0o400, 0o23/0o400,  0           ],   // 0.0938 — super la genuo
    [  0,          0o21/0o400, 0o21/0o400,  0o2/0o400   ],   // 0 — la GENUO ( la patelo antaŭen )
    [ -0o15/0o200, 0o20/0o400, 0o21/0o400, -0o1/0o400   ],   // −0.1016 — sub la genuo ( la kavo malantaŭen )
    [ -0o27/0o200, 0o17/0o400, 0o21/0o400, -0o1/0o400   ],   // −0.1875 — la gastroknemio komenciĝas
    [ -0o37/0o200, 0o16/0o400, 0o21/0o400, -0o1/0o400   ],   // −0.2422 — la suro ( la plej profunda )
    [ -0o52/0o200, 0o14/0o400, 0o16/0o400, -0o1/0o400   ],   // −0.3438 — la malsupra suro
    [ -0o64/0o200, 0o13/0o400, 0o14/0o400,  0           ],   // −0.4063 — la maleolo ( MALEOLO_Y )
  ];
  const centro = ( y: number, z: number ) => Array.from({ length: K },
    () => [ 0, y, z ] as [ number, number, number ]);
  const vicoj = ringoj.map(([ y, a, b, dz ]) => Array.from({ length: K }, ( _, i ) => {
    const [ x, z ] = superelipso(i / K * Math.PI * 0o2, a, b, 0o2);
    return [ x, y, z + dz ] as [ number, number, number ];
  }));
  const lasta = ringoj[ringoj.length - 0o1][0];
  const supra = kreiRinganSurfacon([ centro(ringoj[0][0], 0),
    ...vicoj.slice(0, GENUO + 0o1) ]);
  const malsupra = kreiRinganSurfacon([ ...vicoj.slice(GENUO), centro(lasta, 0) ]);
  // ⟨ La patelo 📃 ⟩ — la artika sfero sidas iomete antaŭen, ĉar la genua ringo mem
  // portas antaŭen-ŝovon. La malantaŭa flanko restas ronda, ĉar la poplita kavo
  // apartenas al la suba parto.
  const g = ringoj[GENUO];
  const artiko = kreiArtikanSferon([ 0, 0, g[3] ], g[1] - 0o1/0o1000, 0o7/0o10);
  return { supra, malsupra: kunfandiGeometriojn([ malsupra, artiko ]) };
}

// kreiKorpanBrakon — La brako de la homa modelo — la ŝultro, la kubuto, la
// antaŭbrako kaj la pojno, en la kadro de la braka pivot-grupo ( la ŝultro estas
// la nulo, la pojno je −0.53 ).
// ⟨ La brako MANKIS 📃 ⟩ — la homa modelo havis neniun brakon; la manoj flosis
// en la manikoj kaj, kiam la vesto kaŝiĝis, restis nur la torso kaj du ovoj. Nun
// la brako estas vera konko kiu eniras la manikon — ĝi estas kaŝita de la ŝtofo,
// sed la homa modelo staras sola kaj la maniko RILATAS al la brako interne.
// La sekco estas elipso ( ok-flanka, do malalt-poligona — la brako estas preskaŭ
// tute kaŝita ).
//     @returns ( { supra, malsupra } ) - La du partoj de la brako. La « malsupra »
//         parto mezuriĝas de la KUBUTO, do la mesho sidas ĉe la nulo en la kubuta
//         grupo ( la supra parto restas en la kadro de la ŝultro ).
export function kreiKorpanBrakon(): { supra: THREE.BufferGeometry; malsupra: THREE.BufferGeometry } {
  // ⟨ La brako estas RONDA, ne okflanka 📃 ⟩ — kun 0o10 flankoj la sekco estis
  // videble poligona ĉe la ŝultro ( la sola parto de la brako kiun la maniko
  // preskaŭ atingas ). Nun ĝi havas la saman nombron da flankoj kiel la torso
  // ( 0o20 ), do la du formoj kunfandiĝas sen kudro; la brako restas unu mesho en
  // la kaŝita tavolo.
  const K = 0o20;
  // ⟨ La brako havas ARTIKOJN 📃 ⟩ — antaŭe la ringoj nur larĝiĝis kaj
  // mallarĝiĝis, do la brako estis unu longa konuso sen kubuto. Nun ĉiu ringo
  // portas antaŭen-ŝovon ( la kvara kolumno ), kiel la kruro — la bicepso
  // elstaras antaŭen, la kubuto RETIRIĜAS malantaŭen kaj la antaŭbraka muskolo
  // elstaras denove. La olekrano ( la pinta osto malantaŭ la kubuto ) estas pli
  // larĝa ol la ringo super ĝi, do la kubuto legiĝas kiel vera artiko.
  // ⟨ La antaŭbrako MALGRANDIĜIS 📃 ⟩ — la olekrano kaj la antaŭbraka muskolo estis
  // 0.0547 … 0.0566, dum la maniko mallarĝiĝas al 0.0547 ĉe la manumo — la brako
  // do preskaŭ kuntuŝiĝis kun la ŝtofo kaj trapikis ĝin per 0.004 dum ĉiu paŝo
  // ( la manikaj retoj RULIĜAS kontraŭ la brako ). Nun la tri lastaj ringoj estas
  // ĝis 0.0508, do la marĝeno estas 0.005 … 0.010 sur la tuta manika longo.
  // ⟨ La brako 📃 ⟩ — la pojno sidas ĉe −0.6 ( 0.553 de la ŝultro ), la kubuto ĉe
  // −0.34 ( apud la talio ) kaj la fingropintoj finiĝas iomete sub la mezo de la
  // femuro. La deltoido malfermiĝas per KVAR ringoj ( ĝia plej larĝa ringo estas
  // 0.0625 kaj la maniko mezuras 0.0547 … 0.0703, do la brako restas INTERNE ) kaj
  // la pojno PLATIĜAS kaj mallarĝiĝas, do la braka fino kaŝiĝas en la mano anstataŭ
  // montri sian randon super ĝi.
  // ⟨ La ŝultro sidas SUR la torso 📃 ⟩ — la pivoto de la brako estas ± 0.219,
  // do pli malproksime ol la akromio de la torso ( 0.160 ). La plej supraj ringoj
  // de la brako antaŭe estis rondaj ĉirkaŭ la pivoto, do ili flosis 0.02 for de la
  // torso kaj ilia FERMA ventumilo montriĝis kiel plata tranĉaĵo supre de la
  // ŝultro ( oni vidis ĝin kiam la vesto kaŝiĝis ). Nun ĉiu ringo havas ankaŭ
  // FLANKAN ŝovon ( la kvina kolumno ), do la deltoido klinas sin INTERNEN al la
  // torso kaj la du formoj kunfandiĝas ĉe la akselo. La ekstera rando restas ene
  // de la maniko ( la ŝovo plus la duonlarĝo neniam superas 0.07 ).
  // ⟨ La supro de la brako SEKVAS la torson 📃 ⟩ — super la pivoto la maniko ne
  // ekzistas ( ĝi komenciĝas ĉe la pivoto ), do la brako tie estas kovrita nur de
  // la ŝultro de la ĉemizo ( 0.141 … 0.188 ). La unua versio tenis la brakon
  // centre sur la pivoto ankaŭ supre, do ĝi finiĝis per PINTO en la aero apud la
  // ŝultro ( videbla kiam la vesto kaŝiĝis ). Nun la supraj ringoj ŝoviĝas
  // INTERNEN tiom ke ilia ekstera rando sekvas la kranion de la torso — la
  // deltoido do elkreskas el la ŝultro anstataŭ pendi apud ĝi.
  const ringoj: [ number, number, number, number, number ][] = [   // [ y, a, b, dz, centro-x ]
    [  0o14/0o1000,  0o4/0o1000,  0o4/0o1000,  0,          -0o112/0o1000 ], // +0.023 — sur la trapezio
    [  0o10/0o1000,  0o6/0o1000,  0o6/0o1000,  0,          -0o100/0o1000 ], // +0.016
    [  0o4/0o1000,   0o11/0o1000, 0o10/0o1000, 0,          -0o66/0o1000  ], // +0.008 — la deltoido malfermiĝas
    [  0,            0o17/0o1000, 0o16/0o1000, 0,          -0o54/0o1000  ], // 0 — la akromio ( la pivoto )
    [ -0o12/0o1000,  0o25/0o1000, 0o22/0o1000, 0,          -0o40/0o1000  ], // −0.020
    [ -0o15/0o1000,  0o33/0o1000, 0o30/0o1000, 0,          -0o17/0o1000  ], // −0.025
    [ -0o26/0o1000,  0o40/0o1000, 0o34/0o1000, 0,          -0o5/0o1000   ], // −0.043 — la ŝultro ( la plej larĝa )
    [ -0o42/0o1000,  0o37/0o1000, 0o33/0o1000, 0,          -0o2/0o1000   ], // −0.066 — la akselo ( pli mallarĝa ol la deltoido )
    [ -0o103/0o1000, 0o37/0o1000, 0o35/0o1000, 0o2/0o1000,  0            ], // −0.131 — la bicepso ( antaŭen )
    [ -0o160/0o1000, 0o35/0o1000, 0o35/0o1000, 0o3/0o1000,  0           ],  // −0.219
    [ -0o227/0o1000, 0o34/0o1000, 0o34/0o1000, 0o1/0o1000,  0           ],  // −0.295
    [ -0o256/0o1000, 0o33/0o1000, 0o33/0o1000, -0o3/0o1000, 0           ],  // −0.340 — la KUBUTO ( malantaŭen )
    [ -0o277/0o1000, 0o32/0o1000, 0o32/0o1000, -0o2/0o1000, 0           ],  // −0.373 — la olekrano ( la kubuta osto )
    [ -0o334/0o1000, 0o31/0o1000, 0o32/0o1000, 0o1/0o1000,  0           ],  // −0.430 — la antaŭbraka muskolo ( antaŭen )
    [ -0o400/0o1000, 0o30/0o1000, 0o31/0o1000, 0o2/0o1000,  0           ],  // −0.500
    [ -0o437/0o1000, 0o21/0o1000, 0o24/0o1000, 0o2/0o1000,  0           ],  // −0.561 — la pojno ( PLATA )
    [ -0o473/0o1000, 0o10/0o1000, 0o12/0o1000, 0,           0           ],  // −0.600 — kaŝita ene de la mano
  ];
  const centro = ( y: number, dz: number, cx: number ) => Array.from({ length: K },
    () => [ cx, y, dz ] as [ number, number, number ]);
  const vicoj = ringoj.map(([ y, a, b, dz, cx ]) => Array.from({ length: K }, ( _, i ) => {
    const [ x, z ] = superelipso(i / K * Math.PI * 0o2, a, b, 0o2);
    return [ cx + x, y, z + dz ] as [ number, number, number ];
  }));
  // ⟨ La brako estas DISIGITA ĉe la KUBUTO 📃 ⟩ — la sama konstruo kiel la kruro
  // ( vidu kreiKorpanKruropon ). La kruro kaj la brako de la sama figuro fleksiĝas
  // en la sama ritmo, do la du membroj havas la saman strukturon. La kruro
  // mezuriĝas de la genuo kaj tial jam havas sian pivoton ĉe la nulo; la brako
  // mezuriĝas de la ŝultro, do la malsupra parto estas ŜOVITA tien, kie la kubuto
  // estas — la mesho de la antaŭbrako do sidas ĉe y = 0 en sia propra grupo.
  const KUBUTO = 0o13;                // la indekso de la kubuta ringo de la tabelo
  // ( la ringo ĉe −0.3398 = KUBUTO_Y; la olekrano sub ĝi apartenas al la antaŭbrako )
  const lasta = ringoj[ringoj.length - 0o1];
  const supra = kreiRinganSurfacon([ centro(ringoj[0][0], ringoj[0][3], ringoj[0][4]),
    ...vicoj.slice(0, KUBUTO + 0o1) ]);
  const yKubuto = ringoj[KUBUTO][0];
  const malsupra = kreiRinganSurfacon([ ...vicoj.slice(KUBUTO),
    centro(lasta[0], lasta[3], lasta[4]) ]);
  malsupra.translate(0, -yKubuto, 0);
  // ⟨ La kubuta osto 📃 ⟩ — la artika sfero sidas ĉe la olekrano kaj plenigas la
  // kubuton kiam la brako fleksiĝas. Ĝi estas iomete pli malgranda ol la braka
  // ringo, do rekte ĝi malaperas ene de la brako ( vidu kreiArtikanSferon ) — kaj
  // ĝi havas multe da spaco ene de la maniko ( 0.0579 ĉe tiu alto ).
  const kubuto = ringoj[KUBUTO];
  const artiko = kreiArtikanSferon([ 0, 0, kubuto[3] ],
    kubuto[1] - 0o1/0o1000, 0o7/0o10);
  return { supra, malsupra: kunfandiGeometriojn([ malsupra, artiko ]) };
}

// kreiKorpanManon — La mano de la homa modelo, en la kadro de la braka grupo.
// ⟨ Manplato kaj kvin tuboj 📃 ⟩ — unu ŝovita tubo por la manplato kaj unu por
// ĉiu fingro, inkluzive la dikfingron. Ĉiu fingro havas propran longon kaj rondan
// pinton, kaj ĝia baza ringo sidas INTERNE de la manplato, do la formoj
// kunfandiĝas sen fendo.
// ⟨ La proporcioj 📃 ⟩ — la manplato ( la pojno ĝis la fingra linio ) estas 0.072
// longa kaj 0.058 larĝa, la meza fingro 0.064 ( iom malpli ol la manplato, kiel
// ĉe vera mano ), kaj la dikfingro sidas ĉe la rando de la manplato kaj finiĝas
// SUPER la fingra linio. La mano turniĝas −90° ĉirkaŭ y ( vidu konstruiFiguron ),
// do ĝia larĝo iras laŭ la profundo de la brako.
// ⟨ La manoj portas UNGOJN 💅 ⟩ — ĉiu fingropinto nun havas ungon ( vidu la blokon
// sub la dikfingro ). Ĝi estas aparta geometrio, ĉar la ungo estas pli hela kaj
// pli brila ol la haŭto, do ĝi bezonas sian propran materialon; la fingroj mem
// kaj la ungoj tamen legas la SAMAN profilon ( FINGRAJ_SEKCOJ ), do la ungo sidas
// precize sur la dorso de ĉiu pinto.
//     @returns ( { mano, ungoj } ) - La du geometrioj de la mano — la haŭto kaj la
//         ungoj.
export function kreiKorpanManon(): { mano: THREE.BufferGeometry; ungoj: THREE.BufferGeometry } {
  const K = 0o20;                    // la flankoj de ĉiu ringo
  const centro = ( y: number, x: number, z = 0 ) => Array.from({ length: K },
    () => [ x, y, z ] as [ number, number, number ]);
  // tubo — ringoj kun elipsa aŭ rondigita-ortangula sekco, fermitaj per
  // ventumiloj ĉe ambaŭ finoj. [ y, centro-x, duonlarĝo, duondikeco, centro-z ]
  // La kvina nombro movas la tutan ringon laŭ la dikeca akso, do la fingroj
  // povas KURBIĝi anstataŭ pendi rekte. La ventumiloj sekvas sian ringon.
  const tubo = ( potenco: number,
    ringoj: [ number, number, number, number, number? ][] ) =>
    kreiRinganSurfacon([ centro(ringoj[0][0], ringoj[0][1], ringoj[0][4]),
      ...ringoj.map(([ y, cx, a, b, cz ]) => Array.from({ length: K }, ( _, i ) => {
        const [ x, z ] = superelipso(i / K * Math.PI * 0o2, a, b, potenco);
        return [ cx + x, y, ( cz ?? 0 ) + z ] as [ number, number, number ];
      })),
      centro(ringoj[ringoj.length - 0o1][0], ringoj[ringoj.length - 0o1][1],
        ringoj[ringoj.length - 0o1][4]) ]);
  // La manplato. La sekco estas ELIPSA ( potenco 0o2 ) kaj pli dika ol antaŭe,
  // do ĝi legiĝas kiel karno anstataŭ kiel plata plato. La plej larĝa ringo
  // tenas la fingran linion, kaj sub ĝi la manplato fermas sin tuj, do la
  // fingroj eliras el larĝa rando kaj neniu kudro videblas inter ili.
  const manplato = tubo(0o2, [
    [  0o54/0o1000, 0, 0o13/0o1000, 0o13/0o1000 ],
    [  0o34/0o1000, 0, 0o23/0o1000, 0o15/0o1000 ],
    [  0o20/0o1000, 0, 0o31/0o1000, 0o17/0o1000 ],
    [ -0o4/0o1000,  0, 0o33/0o1000, 0o17/0o1000 ],
    [ -0o20/0o1000, 0, 0o35/0o1000, 0o16/0o1000 ],
    [ -0o34/0o1000, 0, 0o35/0o1000, 0o15/0o1000 ],
    [ -0o42/0o1000, 0, 0o24/0o1000, 0o11/0o1000 ],
    [ -0o46/0o1000, 0, 0o11/0o1000, 0o6/0o1000  ],
    [ -0o50/0o1000, 0, 0o4/0o1000,  0o3/0o1000  ],
  ]);
  // interpolo — la vico de tabelo ĉe la pozicio k, lineare inter du vicoj. La
  // unua kolumno de ĉiu vico estas la ŝlosilo ( f aŭ y ), la ceteraj la valoroj.
  // ⟨ La ŝlosiloj povas MALSUPRENIRI 📃 ⟩ — la fingra tabelo iras de f = 0 supren,
  // sed la dikfingra tabelo estas skribita per la ALTO, do ĝiaj ŝlosiloj
  // malsupreniras ( de la bazo al la pinto ). La direkto de la ŝlosiloj do
  // mezuriĝas unue — sen tio ĉiu serĉo trovis la UNUAN vicon kaj la ungo de la
  // dikfingro kolapsis al unu alto.
  const interpolo = ( tabelo: number[][], k: number ): number[] => {
    const signo = tabelo[0][0] > tabelo[tabelo.length - 0o1][0] ? -0o1 : 0o1;
    if ( ( k - tabelo[0][0] ) * signo <= 0 ) return tabelo[0];
    for ( let i = 0; i + 0o1 < tabelo.length; i++ ) {
      const v0 = tabelo[i], v1 = tabelo[i + 0o1];
      if ( ( k - v1[0] ) * signo <= 0 ) {
        const t = ( k - v0[0] ) / ( v1[0] - v0[0] );
        return v0.map(( v, j ) => v + ( v1[j] - v ) * t );
      }
    }
    return tabelo[tabelo.length - 0o1];
  };
  // ⟨ La profilo de la fingro 📃 ⟩ — la duonlarĝo kaj la duondikeco laŭ la longo
  // de la fingro ( f = 0 ĉe la bazo, 1 ĉe la pinto ). La tabelo estas UNUOPA —
  // ankaŭ la ungo legas ĝin, do la ungo kuŝas sur la vera dorso de la pinto.
  // ⟨ La fingroj finiĝas per PLATA PULPO 📃 ⟩ — fingropinto ne estas pinto: ĝi
  // restas preskaŭ same larĝa ĝis la lasta dekon ( la pulpo, kiun la ungo kovras )
  // kaj nur poste rondiĝas, dum kvar vicoj ( ne du ), do la pinto estas RONDA
  // anstataŭ plata tranĉo. La pinto do larĝas 0.0117 anstataŭ 0.0039, kaj la ungo
  // ricevas pli larĝan liton el tio mem. La ungo komenciĝas ĉe la sama f kiel
  // antaŭe ( 0.844 ), do la ŝanĝo de la tabelo ne movas la ungojn laŭlonge.
  const FINGRAJ_SEKCOJ: [ number, number, number ][] = [   // [ f, duonlarĝo, duondikeco ]
    [ 0,           0o7/0o1000, 0o7/0o1000 ],
    [ 0o20/0o100,  0o6/0o1000, 0o6/0o1000 ],
    [ 0o42/0o100,  0o6/0o1000, 0o6/0o1000 ],
    [ 0o54/0o100,  0o6/0o1000, 0o5/0o1000 ],
    [ 0o64/0o100,  0o5/0o1000, 0o5/0o1000 ],
    [ 0o72/0o100,  0o5/0o1000, 0o4/0o1000 ],
    [ 0o74/0o100,  0o4/0o1000, 0o3/0o1000 ],
    [ 0o76/0o100,  0o3/0o1000, 0o3/0o1000 ],
    [ 0o1,         0o2/0o1000, 0o2/0o1000 ],
  ];
  const FINGRA_BAZO_Y = -0o30/0o1000;    // −0.0469 — la fingroj eliras el ĉi tie
  const fingraP = ( f: number, pinto: number ) =>
    FINGRA_BAZO_Y + ( pinto - FINGRA_BAZO_Y ) * f;
  const fingraC = ( f: number, bazoX: number, pintoX: number ) =>
    bazoX + ( pintoX - bazoX ) * f;
  // ⟨ La fingroj KURBIĝas antaŭen 📃 ⟩ — la fingroj pendas mole anstataŭ stari
  // rekte kiel kombiloj. La kurbiĝo ankaŭ apartenas al la profilo de la ungo —
  // la ungo nur havas ( x, y, z ) de ĉi tiuj tri funkcioj.
  const fingraZ = ( f: number ) => 0o16/0o1000 * f * f;
  const fingro = ( bazoX: number, pintoX: number, pinto: number ) => tubo(0o2,
    FINGRAJ_SEKCOJ.map(( [ f, a, b ] ) => [ fingraP(f, pinto),
      fingraC(f, bazoX, pintoX), a, b, fingraZ(f) ] as
        [ number, number, number, number, number ]));
  // La kvar fingroj, [ baza-x, pinta-x, la pinto ]. Ili kovras la tutan larĝon
  // de la fingra linio, do la manplato mem ne faras breton flanke, kaj ili
  // etete disiĝas. La meza estas la plej longa, la malgranda la plej mallonga.
  const FINGROJ: [ number, number, number ][] = [
    [ -0o25/0o1000, -0o27/0o1000, -0o124/0o1000 ],
    [ -0o7/0o1000,  -0o10/0o1000, -0o130/0o1000 ],
    [  0o7/0o1000,   0o10/0o1000, -0o125/0o1000 ],
    [  0o25/0o1000,  0o27/0o1000, -0o100/0o1000 ],
  ];
  const fingroj = FINGROJ.map(( [ bazoX, pintoX, pinto ] ) => fingro(bazoX, pintoX, pinto));
  // La dikfingro — el la INTERNO de la manplato, klinita eksteren. Ĝia baza
  // ventumilo sidas ene de la manplato, do ĝi ne aperas kiel kvina fingro.
  // ⟨ La dikfingro estas PULPO kun artiko 📃 ⟩ — vera dikfingro ne estas glata
  // kolbaso: la proksimaj du trionoj mallarĝiĝas ĝis la artiko IP ( tie la haŭto
  // sulkiĝas ), kaj la lasta triono estas preskaŭ SAMA larĝa — la plata pulpo, kiu
  // portas la ungon kaj finiĝas per BLUNTAĴO. La antaŭa tabelo tenis 0.0156 tra la
  // tuta proksima duono ( multe pli dika ol la artiko ) kaj finiĝis per 0.0078, do
  // la dikfingro legiĝis kiel dika tubo kun pinto. Nun la duonlarĝo sekvas la verajn
  // proporciojn — 0.0156 ( la MCP ) · 0.0137 ( la mezo ) · 0.0117 ( la artiko ) ·
  // 0.0117 ( la pulpo ) · 0.0098 · 0.0059 ( la pinto ). La pinto ankaŭ kliniĝas
  // iomete antaŭen ( la kvina kolumno ), kiel ripoza dikfingro, kaj en la pulpo la
  // duonlarĝo ( 0o6 ) superas la duondikecon ( 0o5 ), do la pulpo estas PLATA.
  const DIKFINGRAJ_SEKCOJ: [ number, number, number, number, number ][] = [   // [ y, centro-x, duonlarĝo, duondikeco, centro-z ]
    [  0o16/0o1000, 0o14/0o1000, 0o10/0o1000, 0o10/0o1000, 0 ],
    [ -0o4/0o1000,  0o25/0o1000, 0o10/0o1000, 0o10/0o1000, 0 ],
    [ -0o23/0o1000, 0o32/0o1000, 0o7/0o1000,  0o7/0o1000,  0 ],
    [ -0o31/0o1000, 0o36/0o1000, 0o6/0o1000,  0o6/0o1000,  0o1/0o1000 ],
    [ -0o41/0o1000, 0o42/0o1000, 0o6/0o1000,  0o6/0o1000,  0o1/0o1000 ],
    [ -0o46/0o1000, 0o44/0o1000, 0o6/0o1000,  0o5/0o1000,  0o2/0o1000 ],
    [ -0o52/0o1000, 0o46/0o1000, 0o5/0o1000,  0o4/0o1000,  0o3/0o1000 ],
    [ -0o56/0o1000, 0o47/0o1000, 0o3/0o1000,  0o3/0o1000,  0o4/0o1000 ],
  ];
  const dikfingro = tubo(0o2, DIKFINGRAJ_SEKCOJ);
  const DIKFINGRA_BAZO_Y = DIKFINGRAJ_SEKCOJ[0][0];
  const DIKFINGRA_PINTO_Y = DIKFINGRAJ_SEKCOJ[DIKFINGRAJ_SEKCOJ.length - 0o1][0];
  // ⟨ La dikfingro havas sian propran parametron 📃 ⟩ — la ungo bezonas la akson de
  // la fingro kiel funkcion, do la dikfingra tabelo ricevas f ( 0 ĉe la bazo, 1 ĉe
  // la pinto ) kaj la vicoj estas interpolataj laŭ la alto.
  const dikfingraSekco = ( f: number ): number[] => interpolo(DIKFINGRAJ_SEKCOJ,
    DIKFINGRA_BAZO_Y + ( DIKFINGRA_PINTO_Y - DIKFINGRA_BAZO_Y ) * f);
  // ⟪ La ungoj 💅 ⟫
  // ⟨ Kial la ungo estas LENSO 📃 ⟩ — vera ungo estas maldika plato, kiu kurbiĝas
  // kun la fingro. La ungo do estas malgranda tubo ( kiel la fingroj mem ) kun
  // tre plata sekco. La plato estas GRANDA parto de la fingra pinto ( ĝi kovras
  // preskaŭ la tutan dorson ) kaj ĝi elstaras nur kelkajn milimetrojn, do ĝi
  // legiĝas kiel ungo anstataŭ kiel glubendo.
  const UNGA_ELSTARO = 0o1/0o1000;   // 0.0020 — la baza elstaro ( meze )
  // ⟨ La konturo de vera ungo 📃 ⟩ — preskaŭ ortangulo kun rondaj anguloj, ne
  // folio. Ĉiu vico estas [ la pozicio , la konturo , la elstaro ]. La konturo
  // mezuriĝas de la PLEJ LARĜA vico de la ungo mem ( ne de la fingro ), do la sama
  // tabelo priskribas ĉiun ungon sendepende de ĝia larĝo. La ungo restas larĝa ĝis
  // la kutiklo, kaj ankaŭ la ELSTARO kreskas malsupren — vera ungo sidas glate ĉe
  // la kutiklo ( kie la haŭto ĝin tenas ) kaj LEVIĜAS ĉe la libera rando, kie ĝi
  // apartiĝas de la karno.
  // ⟨ La konturo estas GLATA 📃 ⟩ — antaŭe la tabelo havis nur kvar vicojn, do la
  // konturo kaj la elstaro salte ŝanĝiĝis kaj la plato havis kvar videblajn
  // FALDOJN ( ĝi aspektis kiel faldita papero ). Nun sep vicoj rampigas ilin, do
  // la ungo estas glata kupolo, kiu maldikiĝas ĉe la kutiklo kaj leviĝas ĉe la
  // libera rando.
  const UNGAJ_PROFILO: [ number, number, number ][] = [
    [ 0,           0o6/0o7,   0o1/0o10  ],   // la kutiklo — 0.857 / 0.125
    [ 0o1/0o10,    0o15/0o16, 0o3/0o10  ],
    [ 0o1/0o4,     0o1,       0o6/0o10  ],
    [ 0o1/0o2,     0o1,       0o10/0o10 ],   // la plej larĝa kaj plej dika
    [ 0o3/0o4,     0o1,       0o11/0o10 ],
    [ 0o7/0o10,    0o31/0o32, 0o12/0o10 ],
    [ 1,           0o31/0o32, 0o12/0o10 ],   // la libera rando — plej levita
  ];
  // ⟨ La ungo KURBIĝas laŭlarĝe 📃 ⟩ — vera ungo ne finiĝas per rekta tranĉo: la
  // kutiklo formas arkon AL LA POJNO kaj la libera rando arkon AL LA PINTO, do la
  // centro de ĉiu rando estas pli malproksima ol ĝiaj anguloj. La kurbo estas
  // proporcia al la larĝo de la ungo mem, do la sama nombro taŭgas por la dikfingro
  // kaj por la malgranda fingro.
  const UNGA_KURBO = 0o3/0o10;      // 0.375 — kiom la randoj kurbiĝas
  // ⟨ La ungo KUŜAS sur la fingro 📃 ⟩ — la plato ne estas globeto sur la pinto, ĝi
  // estas ŝelo, kiu sekvas la fingran elipson: ĝia supro sidas ELSTARO super la
  // haŭto, kaj ĝiaj flankaj randoj sidas SUR la haŭto, kie la elipso malaltiĝas. El
  // tio la dikeco de la plato sekvas mem — LARĜA ungo devas esti pli dika ol
  // mallarĝa, ĉar ĝi devas atingi la haŭton ĉe siaj du randoj. Sur dika kaj ronda
  // dikfingro larĝa ungo do ŝvelus kiel globeto anstataŭ kuŝi kiel plato — sed la
  // nova dikfingro estas plata, do lia ungo povas esti larĝa ( vidu larĝoF ).
  const ungaAlto = ( b: number, larĝo: number ) =>
    b * Math.sqrt(Math.max(0, 0o1 - larĝo * larĝo));   // la alto de la flankaj randoj
  const ungaDiko = ( b: number, larĝo: number, elstaro: number ) =>
    b + UNGA_ELSTARO * elstaro - ungaAlto(b, larĝo);   // de la rando ĝis la supro
  // kreiUngon — unu ungo sur la dorso de la pinta parto de unu fingro.
  //     @param akso ( f => [ x, y, z ] ) - La akso de la fingro.
  //     @param sekco ( f => [ duonlarĝo, duondikeco ] ) - La dikeco de la fingro.
  //     @param de, al ( number ) - La limoj de la ungo laŭ la fingro ( 0 … 1 ).
  //     @param dorsa ( [ number, number ] ) - La unuobla dorsa direkto en la
  //         ( x, z ) ebeno ( la dikfingro uzas la saman kiel la fingroj, ĉar
  //         lia akso kuŝas en la ( x, y ) ebeno, do −z estas ĝuste perpendikla ).
  //     @param larĝoF ( number = 0o7/0o10 , optional ) - Kiom de la fingra
  //         duonlarĝo la ungo kovras ĉe sia plej larĝa vico.
  //     @returns geometrio ( THREE.BufferGeometry ) - La ungo.
  const kreiUngon = ( akso: ( f: number ) => [ number, number, number ],
    sekco: ( f: number ) => [ number, number ], de: number, al: number,
    dorsa: [ number, number ], larĝoF = 0o7/0o10 ) => {
    const U = 0o20;                  // la flankoj de la unga sekco
    const [ dx, dz ] = dorsa;
    const lx = -dz, lz = dx;         // la perpendikularo — la larĝa akso
    // la kurbo de la randoj — negativa ĉe la kutiklo, pozitiva ĉe la pinto
    const kurbo = ( larĝo: number, t: number ) => UNGA_KURBO * larĝo * ( 0o2 * t - 0o1 );
    const centro = ( f: number, konturoF: number, t: number ) => {
      const [ x, y, z ] = akso(f);
      const [ a, b ] = sekco(f);
      const s = ungaAlto(b, larĝoF * konturoF);
      const k = kurbo(a * larĝoF * konturoF, t);
      return [ x + dx * s, y - k, z + dz * s ] as [ number, number, number ];
    };
    const ringo = ( f: number, konturoF: number, elstaroF: number, t: number ) => {
      const [ cx, cy, cz ] = centro(f, konturoF, t);
      const [ a, b ] = sekco(f);
      const larĝo = a * larĝoF * konturoF;
      const diko = ungaDiko(b, larĝoF * konturoF, elstaroF);
      const k = kurbo(larĝo, t);
      return Array.from({ length: U }, ( _, i ) => {
        const ang = i / U * Math.PI * 0o2;
        const kos = Math.cos(ang), sin = Math.sin(ang);
        // ⟨ La ringo sekvas la fingron 📃 ⟩ — la larĝa akso kaj la dika akso estas
        // tiuj de la fingro mem ( vidu tubon ), do la ventumiloj de la ungo montras
        // eksteren same kiel tiuj de la fingro. La centro de la ringo antaŭeniras
        // per la kurbo, kaj la anguloj restas sur la vico — tiel la randoj kurbiĝas.
        return [ cx + lx * larĝo * kos - dx * diko * sin, cy + k * kos * kos,
          cz + lz * larĝo * kos - dz * diko * sin ] as [ number, number, number ];
      });
    };
    const ventumilo = ( f: number, konturoF: number, t: number ):
      [ number, number, number ][] => Array.from({ length: U }, () => centro(f, konturoF, t));
    // ⟨ La kutikla ventumilo estas PLATA 📃 ⟩ — ĝi sidas sur la sama alto kiel la
    // unua sekco ( kiel la bazo de la fingroj mem, vidu tubon ), do la ungo finiĝas
    // per rekta rando anstataŭ per pinta tegmento. La libera rando etendas iomete
    // preter la lasta sekco, do ĝi rondiĝas.
    const preter = ( al - de ) * 0o1/0o20;     // 0.0625
    const lasta = UNGAJ_PROFILO[UNGAJ_PROFILO.length - 0o1];
    const fino = 0o1 + preter / ( al - de );   // la parametro de la libera ventumilo
    return kreiRinganSurfacon([
      ventumilo(de, UNGAJ_PROFILO[0][1], 0),
      ...UNGAJ_PROFILO.map(( [ t, konturoF, elstaroF ] ) =>
        ringo(de + ( al - de ) * t, konturoF, elstaroF, t)),
      ventumilo(al + preter, lasta[1], fino) ]);
  };
  // ⟨ La fingraj ungoj 📃 ⟩ — la sama ungo por ĉiu fingro, nur la akso malsamas.
  // La ungo kovras la lastan sesonon de la fingro kaj finiĝas antaŭ la pinto mem,
  // do la karno ĉirkaŭas ĝin kiel ĉe vera fingro. La ungo estas proksimume 1.3-oble
  // pli longa ol larĝa, kiel vera ungo ( la malnova estis duoble tro longa ).
  const UNGA_DE = 0o66/0o100, UNGA_AL = 0o76/0o100;    // 0.844 / 0.969
  const fingraSekco = ( f: number ): [ number, number ] => {
    const vico = interpolo(FINGRAJ_SEKCOJ, f);
    return [ vico[1], vico[2] ];
  };
  const ungoj = [
    ...FINGROJ.map(( [ bazoX, pintoX, pinto ] ) => kreiUngon(
      ( f ) => [ fingraC(f, bazoX, pintoX), fingraP(f, pinto), fingraZ(f) ],
      fingraSekco, UNGA_DE, UNGA_AL, [ 0, -0o1 ] )),
    // ⟨ La ungo de la dikfingro 📃 ⟩ — ĝi estas multe pli MALVARĜA ol la dikfingro
    // mem ( 0.625 de la duonlarĝo ). Tio estas la grava parto: la dikfingra sekco
    // estas preskaŭ ronda, do ungo de 0.875 volvus sin duone malsupren sur la
    // FLANKOJN de la fingro kaj legiĝus kiel ungo sur la flanko. Kun 0.625 la randoj
    // de la plato sidas alte sur la dorso ( 0.78 de la profundo ) kaj la haŭto
    // restas videbla flanke.
    // ⟨ La libera rando atingas la PINTON, sed la ungo restas KONCISA 📃 ⟩ — la
    // plato montriĝis tro longa kiam ĝi etendiĝis de la artiko al la pinto ( 1.6
    // unuojn longa kontraŭ 1.0 larĝa = ovo ). Nun ĝi estas preskaŭ kvadrata ( 1.0
    // je 1.0 , kiel vera dikfingra ungo ) kaj la tuta plato ŝoviĝis MALSupren, al la
    // pinto mem: la libera rando sidas 0.25 unuojn ( du milimetrojn ) antaŭ la pinto,
    // do la ungo finiĝas tie, kie la fingropinto rondiĝas, anstataŭ meze de la
    // falango. La kutiklo ankoraŭ restas sub la artiko IP.
    // Ĝi SIDAS rekte sur la dorso — la dikfingro estas klinita en la ( x, y ) ebeno,
    // do −z restas perpendikla al lia akso kaj la ungo ne devas kliniĝi flanken.
    kreiUngon(( f ) => {
      const vico = dikfingraSekco(f);
      return [ vico[1], vico[0], vico[4] ];
    }, ( f ) => {
      const vico = dikfingraSekco(f);
      return [ vico[2], vico[3] ];
    }, 0o27/0o32, 0o37/0o40, [ 0, -0o1 ], 0o5/0o10),
  ];
  return { mano: kunfandiGeometriojn([ manplato, ...fingroj, dikfingro ]),
    ungoj: kunfandiGeometriojn(ungoj) };
}

// kreiKorpanPiedon — La piedo de la homa modelo, en la sama kadro kiel la BOTO
// ( la genuo estas la nulo, la tero je −0.5 ).
// ⟨ La piedo ruliĝas KUNE kun la ŝuo 📃 ⟩ — ĝi estas aparta geometrio, ĉar ĝi
// sidas en la MALEOLA grupo de la ŝuo ( vidu konstruiFiguron ). Dum la paŝo la boto
// ruliĝas de la kalkano al la pinto; se la nuda piedo restus veldita al la kruro,
// ĝi turniĝus kontraŭ la boto kaj trapikus ĝian pinton ĉe ĉiu paŝo ( la haŭto
// montriĝis kiel hela makulo sur la bota pinto dum la tuta marŝo ).
//     @returns geometrio ( THREE.BufferGeometry ) - La piedo ( la mondaj unuoj ).
export function kreiKorpanPiedon(): THREE.BufferGeometry {
  const K = 0o20;
  const centro = ( y: number, z: number ) => Array.from({ length: K },
    () => [ 0, y, z ] as [ number, number, number ]);
  // ⟨ La piedo 📃 ⟩ — sekcoj laŭ la LONGO de la piedo ( la sama konstruo kiel la
  // bota piedo, nur pli mallarĝa kaj pli malalta ), do la homa kruro finiĝas per
  // vera piedo anstataŭ per stumpo. La fundo sidas ĵuste super la plando.
  const FUNDO = -0o74/0o200;                 // −0.4688 — la malsupro, sur la plando
  const sekcoj: [ number, number, number ][] = [   // [ z, duonlarĝo, la supro ]
    [ -0o11/0o200, 0o6/0o200,  -0o72/0o200 ],   // la kalkano ( la mondo 0.047 )
    [ -0o5/0o200,  0o7/0o200,  -0o71/0o200 ],   // la arko
    [  0o1/0o200,  0o10/0o200, -0o70/0o200 ],   // la maleolo ( la mondo 0.0625 )
    [  0o16/0o200, 0o7/0o200,  -0o72/0o200 ],   // la pilko de la piedo
    [  0o25/0o200, 0o5/0o200,  -0o73/0o200 ],   // la fingroj ( sub la bota pinto )
  ];
  // La nudaj piedfingroj restas 0.008 … 0.02 sub la ledaj sekcoj kaj la maleolo
  // 0.031 sub la leda supraĵo, do la nudaj piedoj videblas nur kiam la ŝuoj
  // kaŝiĝas — ili neniam trapikas la ledon.
  const centroP = ( sekco: [ number, number, number ]) =>
    centro(( sekco[2] + FUNDO ) / 0o2, sekco[0]);
  const piedo = kreiRinganSurfacon([ centroP(sekcoj[0]),
    ...sekcoj.map(([ z, a, supro ]) => {
      const hh = ( supro - FUNDO ) / 0o2, yc = ( supro + FUNDO ) / 0o2;
      return Array.from({ length: K }, ( _, i ) => {
        const [ x, y ] = superelipso(i / K * Math.PI * 0o2, a, hh, 0o4);
        return [ x, yc + y, z ] as [ number, number, number ];
      });
    }), centroP(sekcoj[sekcoj.length - 0o1]) ]);
  return piedo;
}

// ⟨ La femuro ne rajtas elstari 📃 ⟩ — la kruroj staras je ± 0.075 de la centro,
// kaj la FEMURO mem estas 0.094 larĝa kaj 0.086 PROFUNDA ĉe la kokso. La antaŭa
// pantalono estis pli malprofunda ol la femuro ( 0.070 ) kaj pinĉiĝis ĝuste ĉe la
// plej dika parto de la kruro, do la haŭto trapikis la ŝtofon ĵuste sub la ĉemiza
// rando kaj videblis kiel hela makulo antaŭ la blua ŝtofo. Nun la tri supraj
// ringoj estas pli profundaj ol la femuro ( 0.098 … 0.102 kontraŭ 0.086 ) kaj la
// profilo malkreskas GLATE — la ŝtofo ĉirkaŭas la kruron sen pinĉiĝo. La koksa
// ringo ( 0.102 ĉe ± 0.075 → 0.177 de la akso ) restas ene de la ĉemiza elipso
// ( 0.226 × 0.170 ) kaj sub la ĉemiza rando.
// kreiPantalonan — La pantalona kruro. Antaŭe ĝi estis 0o14-flanka cilindro
// ( 0.109 supre, 0.0703 malsupre ) — la tuta kruro do legiĝis kiel tubo. Nun ĝi
// estas konko kun la femuro, la genuo kaj la suro, kaj
// ĝia malsupro enŝoviĝas en la botan ŝtipon.
// ⟨ La tuko enŝoviĝas en la boton 📃 ⟩ — la kruro maldikas supren — ĉe la bota rando
// ( 0.03125 ) la tubo estas nur 0.0742 × 0.0742 dum la boto estas 0.0859 × 0.0938,
// do ĝi vere enŝoviĝas en la ŝtipon kaj la rando de la boto restas la plej larĝa
// parto. Tio ankaŭ gravas por la laŭta paŝo — la boto RULIĜAS ĉirkaŭ la maleolo
// ( vidu la ruliĝon en marŝSvingo ) kaj la tubo ne, do ĝi bezonas aeron en la
// direkto de la ruliĝo ( z ). La mallarĝiĝo sidas tute ene de la boto, do ĝi ne
// videblas — kaj la videbla parto ( super la rando ) restas maldika kaj taŭga.
// ⟨ Kiom da aero super la rando 📃 ⟩ — ĉe 0.03125 la tubo ( 0.0742 ) lasas 0.0196
// da aero antaŭe kaj malantaŭe, pli ol la 0.0168 kiujn la ruliĝo postulas — la
// ŝtofo do neniam trapikas la ledon dum la paŝo.
//     @returns ( { supra, malsupra } ) - La du partoj de la pantalona kruro.
export function kreiPantalonan(): { supra: THREE.BufferGeometry; malsupra: THREE.BufferGeometry } {
  const K = 0o20;
  // ⟨ La pantalono SEKVI la genuon 📃 ⟩ — la ŝtofo devas ĉirkaŭi la patelon
  // ( vidu kreiKorpanKruropon ), do ĝi havas propran genu-ringon ĉe la sama alto,
  // iomete antaŭenŝovitan. La ringoj ĉirkaŭ ĝi estas pli larĝaj ol la femuro kaj
  // ol la tibio — tiel la pantalono legiĝas kiel ŝtofo, kiu FALDIĜAS super la
  // genuo, anstataŭ kiel egala tubo.
  // ⟨ La kokso MALDIKIĜIS 📃 ⟩ — la du plej supraj ringoj havis radiuson 0.1016
  // ĉe la kokso dum la kruro sub ili estas 0.0859, do la pantalono ŝvelis 0.02 pli
  // larĝe ol la kruro ĝuste tie, kie ĝi devas resti ene de la ĉemizo ( la interna
  // ĉemizo atingas nur 0.2031 ĉe la sama alto ). Dum la paŝo la femuro puŝas la
  // ringon antaŭen 0.042, do la pinta radiuso de la pantalono ( 0.2044 ) superis la
  // ĉemizon je 0.034 kaj la ŝtofo de la kruro trairis la ĉemizon. Nun tiuj du
  // ringoj havas 0.09375 — la koksa tubo nur ĉirkaŭas la kruron ( 0.0664 … 0.0859 )
  // kaj la pinta radiuso falas al 0.1875, do la ĉemizo restas ekstere dum la tuta
  // paŝo. La ŝtofo estas tute kaŝita sub la ĉemizo ĉe tiu alto, do la maldikiĝo ne
  // videblas — la videbla femuro ( la ringo 0.2031 malsupren ) restas dika.
  const ringoj: [ number, number, number, number ][] = [    // [ y, a, b, z-ŝovo ] de la kokso malsupren
    [  0o67/0o200, 0o30/0o400, 0o30/0o400,  0        ],   // 0.4297 — la kokso ( sub la ĉemizo )
    [  0o51/0o200, 0o30/0o400, 0o30/0o400,  0        ],   // 0.3203 — la femuro-supra ( sub la ĉemizo )
    [  0o32/0o200, 0o32/0o400, 0o30/0o400,  0        ],   // 0.2031 — la femuro ( sub la rando )
    [  0o15/0o200, 0o31/0o400, 0o30/0o400,  0        ],   // 0.1016 — super la genuo
    [  0,          0o30/0o400, 0o31/0o400,  0o1/0o100 ],  // 0 — la GENUO ( la ŝtofo antaŭen )
    [ -0o15/0o200, 0o24/0o400, 0o24/0o400, -0o1/0o400 ],  // −0.1016 — la suro ( en la boto )
    [ -0o34/0o200, 0o23/0o400, 0o23/0o400,  0        ],   // −0.2188 — la tibio ( en la boto )
    [ -0o27/0o100, 0o21/0o400, 0o21/0o400,  0        ],   // −0.3594 — profunde ene de la ŝtipo
  ];
  // ⟨ La pantalono eniras PROFUNDE en la boton 📃 ⟩ — la tubo antaŭe finiĝis ĉe
  // −0.2188 ( la mondo 0.281 ), nur 0.031 sub la rando de la boto. La buŝo de la
  // boto do montris la ĝustan pantalonon nur ĉe la rando, kaj kiam la piedo
  // ruliĝis oni vidis la internon de la ŝtipo kaj la ferman ventumilon de la
  // pantalono. Nun la tubo malsupreniras al −0.3594 ( la mondo 0.14 ), do ĝi
  // plenigas la tutan buŝon kaj la ŝtipo ĉiam montras ŝtofon interne.
  const centro = ( y: number ) => Array.from({ length: K },
    () => [ 0, y, 0 ] as [ number, number, number ]);
  const vicoj = ringoj.map(([ y, a, b, dz ]) => Array.from({ length: K }, ( _, i ) => {
    // ⟨ La sekco estas ELIPSO, ne ortangulo 📃 ⟩ — la eksponento 0o4 donis al la
    // pantalono kvadratajn angulojn, kaj la 45° angulo ( 0.84 · a ) elstaris
    // 0.09 preter la mantelo kaj la ĉemizo dum la paŝo. La ronda sekco havas la
    // saman silueton ( la larĝo kaj la profundo ne ŝanĝiĝas ) sed la anguloj
    // retiriĝas al 0.71 · a, do la ŝtofo restas ene de la mantelo.
    const [ x, z ] = superelipso(i / K * Math.PI * 0o2, a, b, 0o2);
    return [ x, y, z + dz ] as [ number, number, number ];
  }));
  // ⟨ Ankaŭ la pantalono estas DISIGITA ĉe la genuo 📃 ⟩ — ĝi havas genuan ringon
  // ĉe la sama alto kiel la kruro ( vidu kreiKorpanKruropon ), do la du tavoloj
  // fleksiĝas KUNE kaj la genuo de la ŝtofo sekvas la genuon de la karno. La
  // artika sfero de la ŝtofo estas pli granda ol tiu de la kruro, ĉar la
  // pantalono estas pli larĝa — ĝi sidas ene de la mantelo ĉe tiu alto.
  const GENUO = 0o4;
  const lasta = ringoj[ringoj.length - 0o1][0];
  const supra = kreiRinganSurfacon([ centro(ringoj[0][0]),
    ...vicoj.slice(0, GENUO + 0o1) ]);
  const malsupra = kreiRinganSurfacon([ ...vicoj.slice(GENUO), centro(lasta) ]);
  // ⟨ La genuo FALDIĜAS antaŭen 📃 ⟩ — la tuko de pantalono ne faras patelon; ĝi
  // faras faldon. La sfero do estas pli plata ol tiu de la kruro kaj ĝi sidas
  // pli antaŭen, do la genuo legiĝas kiel ŝtofo kiu faldiĝis super la genuo.
  // ⟨ La sfero mezuriĝas per la LARĜO, ne per la profundo 📃 ⟩ — la silueto de la
  // kruro estas ĝia duonlarĝo, kaj la pantalono mallarĝiĝas Tuj sub la genuo
  // ( 0.0938 → 0.0781 en larĝo, sed nur 0.0977 → 0.0938 en profundo ). Sfero
  // egala al la PROFUNDO do elstarus preskaŭ trionon preter la tibio kaj la genuo
  // legiĝus kiel glata pilko. La larĝo plus eta leveto donas la faldon sen la
  // pilko.
  const g = ringoj[GENUO];
  const artiko = kreiArtikanSferon([ 0, 0, g[3] ], g[1] - 0o1/0o1000, 0o7/0o10);
  // ⟨ La UV-oj 📃 ⟩ — kreiRinganSurfacon NE faras UV-ojn, kaj la pantalona kanvaso
  // estas PENTRITA ( la akcenta rimeno, la steloj ). Ĝis nun la tuta tubo legis la
  // saman angulan punkton de la kanvaso ( uv = 0, 0 ) — la desegno do tute ne
  // montriĝis kaj la pantalono aspektis unukolora. Nun u rondiras la tubon kaj v
  // iras de la kokso ( v = 1 — la SUPRA vico de la kanvaso, ĉar la teksturo
  // renversiĝas ) malsupren ĝis la boto ( v = 0 ). La motivoj de la kanvaso tial
  // devas sidi en la videbla bendo — vidu pentriPantalonon.
  // ⟨ La UV-oj estas GLOBALAJ 📃 ⟩ — la vicoj estas numeritaj laŭ la TUTA tabelo
  // ( la kunigita geometrio havis naŭ vicojn ), do la du disigitaj partoj ricevas
  // la samajn v-valorojn kiel antaŭe kaj la teksajxo restas senkudra trans la
  // genuo. Nur la vicoj de ĉiu parto mem estas skribitaj.
  const vicojTutaj = ringoj.length + 0o2;
  const alUvoj = ( geometrio: THREE.BufferGeometry, indeksoj: number[] ) => {
    const uvoj: number[] = [];
    for ( const v of indeksoj ) {
      const vv = 0o1 - v / ( vicojTutaj - 0o1 );
      for ( let i = 0; i < K; i++ ) uvoj.push(i / K, vv);
    }
    geometrio.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(uvoj), 0o2));
    return geometrio;
  };
  const suprajVicoj = Array.from({ length: GENUO + 0o2 }, ( _, i ) => i );
  const malsuprajVicoj = Array.from({ length: vicojTutaj - GENUO - 0o1 },
    ( _, i ) => i + GENUO + 0o1 );
  return { supra: alUvoj(supra, suprajVicoj),
    malsupra: kunfandiGeometriojn([ alUvoj(malsupra, malsuprajVicoj), artiko ]) };
}
