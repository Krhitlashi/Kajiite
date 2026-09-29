// ≺⧼ Kalendaro kaj suno 📅 ⧽≻
// La Iikrhia kalendaro ( vidu CAX2L.md ) kaj la suna modelo de la ludo. La
// krepuska valoro de la ĉielo ne venas el fiksa nombro sed el la REALA suno, do
// la ludo malfermiĝas en la lumo, kiu vere estas ekstere. Nenio ĉi tie tuŝas la
// scenon — la modulo nur kalkulas.

// ⟨ La komenca taglumo venas el la reala suno 📃 ⟩ — la unua krepuska valoro ne
// plu estas fiksa 0 ( tute taga ). Ĝi deriviĝas el la nuna loka horloĝo KAJ la
// nuna dato, do la ludo malfermiĝas en la lumo, kiu vere estas ekstere — nokte
// la urbo atendas en la krepusko, tagmeze en la plena suno, kaj aŭtune la
// krepusko venas pli frue ol somere.
// ⟨ La modelo 📃 ⟩ — la klasika proksimumo de la suna pozicio. La DEKLINACIO
// venas el la tagnombro de la jaro ( la tera akso kliniĝas 23.44° kaj la
// rivoluo ne estas cirkla — la kosinusa proksimumo sufiĉas por la lumo de la
// ludo ) kaj la HOR-ANGULO el la loka horloĝo, kiu proksimumas la lokan sunan
// tempon. La latitudo estas supozata ( la mondo de Aranis ne havas rektan
// geografian ekvivalenton ) — 0o55 gradoj estas meza norda latitudo kun veraj
// sezonoj; ŝanĝu SUNLATITUDO por alia klimato.
export const SUNLATITUDO = 0o55;

// La epoko estas 2010-09-06 ( 1.1.1 ) kaj la jaro havas 0o15 monatojn — la
// monatoj 1..0o13 po 0o34 tagojn, la monato 0o13 ricevas la supertagon, kaj la
// lasta monato havas 0o35 tagojn. Ordinara jaro do havas 0o555 tagojn kaj
// superjaro ( kiam la jara numero divideblas per 0o4 ) 0o556. La jaroj de la
// mondo longas same kiel la realaj, do la suna lumo de la ludo restas kongrua
// kun la fenestro — nur la tagnombro devenas de la kalendaro de la mondo
// ( la malsamo restas sub unu tago ).
const IKRIHIA_EPOKO = Date.UTC(2010, 8, 6);   // 1.1.1
const IKRIHIA_JANUARO = 0o166;                // 118 — la 1-a de januaro en la kalendaro de la mondo
const UNU_TAGO = 86400000;                    // unu tago en ms ( la horloĝo de JS )

// ikrhiaTagoDeJaro — la tagnombro ( 1 .. 0o555/0o556 ) de la Iikrhia jaro en
// kiu la horloĝo sidas.
//     @param nun ( Date ) - La horloĝo.
//     @returns ( number ) - La tagnombro de la Iikrhia jaro.
function ikrhiaTagoDeJaro(nun: Date): number {
  let tagoj = Math.floor(( nun.getTime() - IKRIHIA_EPOKO ) / UNU_TAGO);
  if ( tagoj < 0 ) tagoj = 0;                 // antaŭ la epoko — ne atingebla en la ludo
  for ( let jaro = 1; ; jaro++ ) {
    const longo = 0o555 + ( jaro % 0o4 === 0 ? 1 : 0 );
    if ( tagoj < longo ) return tagoj + 1;
    tagoj -= longo;
  }
}

// sunaAltoGradoj — la proksimuma alto de la suno super la horizonto ( gradoj,
// negativa nokte ) ĉe la nuna momento kaj la nuna loko. La dekliniĝo venas el
// la tagnombro de la Iikrhia jaro, turnita al la januara fazo ( la modelo de la
// suna pozicio mezuriĝas de la vintra solstico ).
//     @param nun ( Date ) - La horloĝo.
//     @returns alto ( number ) - La suna alto en gradoj.
function sunaAltoGradoj(nun: Date): number {
  const tagoDeJaro = ( ( ikrhiaTagoDeJaro(nun) - IKRIHIA_JANUARO + 0o555 ) % 0o555 ) + 1;
  const deklinacio = -23.44 * Math.cos(2 * Math.PI * ( tagoDeJaro + 0o12 ) / 0o555);   // gradoj ( 23.44 = la aksa dekliniĝo )
  const horAngulo = ( nun.getHours() + nun.getMinutes() / 0o74 - 0o14 ) * 0o17;          // gradoj
  const lat = SUNLATITUDO * Math.PI / 180;
  const dek = deklinacio * Math.PI / 180;
  const hor = horAngulo * Math.PI / 180;
  const sinAlto = Math.sin(lat) * Math.sin(dek) + Math.cos(lat) * Math.cos(dek) * Math.cos(hor);
  return Math.asin(Math.max(-1, Math.min(1, sinAlto))) * 180 / Math.PI;
}

// realaKrepusko — la krepuska valoro ( 0 = plena tago, 1 = plena krepusko )
// kongrua kun la reala suno. La suno 0o6 gradojn super la horizonto estas plena
// tago kaj 0o6 gradojn sub ĝi estas plena krepusko; intere la valoro glate
// pasas ( la glata paŝo 3x^2 - 2x^3 ), do la tagiĝo kaj la noktiĝo havas veran
// daŭron anstataŭ salti.
//     @param nun ( Date = new Date() ) - La horloĝo.
//     @returns valoro ( number ) - 0..1 por aplikiRezimon.
export function realaKrepusko(nun: Date = new Date()): number {
  const alto = sunaAltoGradoj(nun);
  const x = Math.max(0, Math.min(1, ( 0o6 - alto ) / 0o14));
  return x * x * ( 0o3 - 2 * x );
}
