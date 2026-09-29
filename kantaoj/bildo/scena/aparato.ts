// ≺⧼ Aparato 📱 ⧽≻
// La aparata buĝeto — la tri gravaj buĝetoj, kiuj dependas de la aparato. La
// signoj legiĝas unufoje, ĉe la modulo-ŝarĝo, do ĉi tiu modulo havas neniajn
// flankajn efikojn kaj povas esti importata de ie ajn ( urbo.ts faras tion ).

// ⟪ La aparata buĝeto 📃 ⟫ — ĉu la aparato estas tuŝa aŭ poŝtelefona. Ĉi tio
// malaltigas la TRI gravajn buĝetojn ( la ekrandenso, la MSAA, la ombra mapo )
// nur tie, kie ili vere doloras; la surtabla bildo restas gxuste tia, kia ĝi
// estis. La signoj de la aparato legiĝas unufoje, ĉe la modulo-ŝarĝo.
//
// ⟨ Kial la ekrandenso 📃 ⟩ — sur poŝtelefono la ekrandenso estas 2 ĝis 3, do
// `setPixelRatio( 2 )` pentras 4-oble pli da fragmentoj ol 1× kaj 1.8-oble pli
// ol 1.5×. La fragmenta pasumo ( la grundo, la ĉielo, la nebulo, la ombroj )
// estas la plej granda unuopa kosto de la kadro, kaj ĝi skvamas kun la KVADRATO
// de la denso. Sur la malgranda ekrano de telefono 1.5 vide ne diferenciĝas de
// 2, sed kostas 44% malpli da fragmentoj.
//
// ⟨ Kial malŝalti la MSAA ĉe alta denso 📃 ⟩ — la multspecimena rando
// ( antialias ) multiplikas kaj la fragmentan koston kaj la GPU-memoron ( 4
// specimenoj = 4× la kolorbufro kaj la profundo-bufro ). Kun 2× aŭ 3× ekrandenso
// la randoj jam estas glataj pro la denso, do MSAA sur tia ekrano apenaŭ
// videblas — ĝi nur kostas.
//
// ⟨ Kial pli malgranda ombra mapo 📃 ⟩ — la ombra pasumo estas la dua plej
// granda kosto. 512 sur telefono apenaŭ diferenciĝas de 1024 ( la ombro-
// volumeno estas 200 × 200 unuoj, do la tekselo estas 0.39 unuoj anstataŭ 0.2 ).
// La ombra dekliniĝo tiam duoniĝas, por ke la ombroj restu samaj ( vidu la
// ombran agordon sube ).
export const surPosxtelefono: boolean = ( () => {
  const kohera = typeof matchMedia === "function" && matchMedia("(pointer: coarse)").matches;
  const ua = /Android|iPhone|iPad|iPod|Mobile|Silk|Kindle/i.test(navigator.userAgent);
  return kohera || ua;
} )();
// MAKS_RATIO — la maksimuma ekrandenso por la bildilo. 0o14/0o10 ( 1.5 ) sur la
// tuŝaj aparatoj ( malgranda ekrano, malforta GPU ), 0o2 surtablue.
export const MAKS_RATIO = surPosxtelefono ? 0o14/0o10 : 0o2;
// OMBRA_MAPO — la ombra mapo. 0o1000 ( 512 ) sur la tuŝaj aparatoj, 0o2000
// ( 1024 ) surtablue.
export const OMBRA_MAPO = surPosxtelefono ? 0o1000 : 0o2000;
// MULT_SAMPLEA — ĉu la bildilo uzu MSAA. Malŝaltita nur sur la tuŝaj aparatoj
// kun densa ekrano, kie ĝi kostas multe kaj videblas preskaŭ neniom.
export const MULT_SAMPLEA = !( surPosxtelefono && devicePixelRatio >= 0o14/0o10 );
