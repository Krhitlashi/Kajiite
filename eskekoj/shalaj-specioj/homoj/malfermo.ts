// ≺⧼ La antaŭa malfermaĵo de la robo 🚪 ⧽≻
// La antaŭa malfermaĵo de la robo — kiom da la cirkonferenco ĉiu duono prenas ĉe
// la suba rando ( MALFERMA_DUONO, malfermaDuono ) kaj kiom la supra malfermaĵo
// leviĝas ( ROB_LEVO, robLevigho ). La sama matematiko servas al la kanvasaj
// pentristoj ( pentristoj.ts ) kaj al la ŝeloj de la robo ( la anguloj de la
// malfermaĵo en homoj.ts ).

// ⟪ La antaŭa malfermaĵo de la robo 🚪 ⟫
// MALFERMA_DUONO — kiom da la cirkonferenco ( kiel frakcio de plena turno )
// ĉiu duono de la antaŭa malfermaĵo prenas ĉe la suba rando. La malfermaĵo estas
// nulo ĉe la kolumo — la supra parto de la ekstera ĉemizo estas fermita aŭ
// butonumita — kaj malfermiĝas malsupren, ĝuste kiel la stilo priskribas.
// ⟨ La RONDO estas la KURBO Malsupren, ne la buŝo 📃 ⟩ — la malfermaĵo mem
// malfermiĝas per glata ( 1 − t )², do ĝiaj bordoj kunkuras supren al la fino de
// la plakedo — tio restas. La rondaĵo kiun la stilo postulas estas la SUB en la
// malsupra rando : la tuko leviĝas antaŭe per RONDA arko ( vidu robLevighon ), ne
// per pinto, do la antaŭa malfermaĵo estas ronda valo kaj ne akra triangulo.
//     @param t ( number ) - La altfrakcio ( 0 la suba rando, 1 la kolumo ).
//     @returns duono ( number ) - La duonlarĝo en frakcioj de plena turno.
const MALFERMA_DUONO = 0o1/0o14;
// MALFERMA_RONDO — la radiuso de la rondujo ĉe la malsupraj anguloj de la
// malfermaĵo ( vidu rondigiMalfermanAngulon ).
export const MALFERMA_RONDO = 0o4/0o1000;   // 0.0078
export function malfermaDuono(t: number): number {
  return MALFERMA_DUONO * ( 0o1 - t ) * ( 0o1 - t );
}

// robLevigho — Kiom la robo leviĝas ĉe la angulo ang kaj la altfrakcio t. La
// suba rando de la robo leviĝas antaŭe ( la mantelo-stilo de la stilo )
// kaj la levo malkreskas LINEARE supren, do la antaŭaj bordoj de la malfermaĵo
// iĝas preskaŭ rektaj diagonaloj de la suba rando ĝis la kolumo. Lineara
// malkresko ( anstataŭ kurba ) tenas la saman ŝtof-densecon laŭ la tuta bordo —
// kun ( 0o1 − t )² la unuaj vicoj premegiĝus kaj la rando montrus sulkon.
// ⟨ La levo estas RONDA, ne pinta 📃 ⟩ — kun la eksponento 4 la levo preskaŭ
// nuliĝis jam 45° for de la fronto, do la suba rando leviĝis en akran pinton
// ( la mantelo havis pikan antaŭan « voston » ). Kun la eksponento 2 la levo
// disvastiĝas pli glate ĉirkaŭ la fronto kaj la rando legiĝas kiel ronda arko.
//     @param ang ( number ) - La cirkla angulo ( 0 antaŭe ).
//     @param t ( number ) - La altfrakcio ( 0 la suba rando, 1 la kolumo ).
//     @returns levigho ( number ) - La levita alto ( mondunuoj ).
const ROB_LEVO = 0o1/0o4;
export function robLevigho(ang: number, t: number): number {
  const profilo = Math.pow(( Math.cos(ang) + 0o1 ) / 0o2, 0o2);
  return ROB_LEVO * profilo * ( 0o1 - t );
}
