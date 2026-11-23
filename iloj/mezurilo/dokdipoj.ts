// ≺⧼ ֭ſɭэ ſɭэ ʌ j͐ʃэ ɭ(ᴜ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ʌ ſɟɹƽ ꞁȷ̀ᴜ }ʃw 🧪 ⧽≻
// ⟨ ផ្លូវទៅចំណត និងទៅស្ពានធ្លាក់ចុះរួចឡើងវិញ ។ ការវាស់ចាស់លោតតំបន់រន្ធភ្ជាប់
// ចេញ , ដូច្នេះរណ្តៅនៅមាត់ចានមិនត្រូវរាប់ ។ វាស់នៅទីនេះតាមកម្រិតផ្លូវពិត ,
// ទាំងផ្លូវជំហានធម្មតា និងផ្លូវរលូនរបស់ស្ពាន ។ 📃 ⟩
import { aktivajHak6h6, aktivajHaqakaj2 } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco, akvaVem2 } from "../../kantaoj/mondo/tereno.js";
import { troviK6h6RetajnHaveb6kekn } from "../../eskekoj/medio/voj-reto.js";
import { gluiK6h6Finon } from "../../eskekoj/medio/hak6h6/gluado.js";
import { kf2K6h6Alton } from "../../eskekoj/medio/hak6h6/alto.js";
import { kf2NivelanProfilon } from "../../eskekoj/medio/hak6h6/havem2.js";
import { VOJA_EKSTERA_DUONO,
  VOJA_TRUA_DUONO, surGrid, k6h6LarghoDuono } from "../../eskekoj/medio/hak6h6/havecax2l.js";
import { k6h6SuproDeVeb6kek } from "../../eskekoj/medio/hak6h6/haqoxa.js";
import { havasAkvanTrunkon, kf2PontanAkvanTeston,
  vepaqPontanProfilon } from "../../eskekoj/medio/hak6h6/ponto-profilo.js";
import { akvaFino, tsekeVeraAkvo, k6h6Supro, punktoCxe as punktoCxeBaza } from "./komunaj.js";
import type { K6h6Punkto } from "../../eskekoj/medio/voj-reto/hahunaq.js";

// ⟨ រណ្តៅខ្លី ៖ ចុះហើយឡើងវិញក្នុងចម្ងាយនេះ 📏 ⟩
const DIP_DISTO = 0o10;
// ⟨ រណ្តៅជ្រៅជាងនេះគួរកែ 📏 ⟩
const DIP_LIMO = 0o1/0o4;
// ⟨ ចម្ងាយពីមាត់ចំណត ឬមាត់ទឹក ដែលរាប់ថាជិត 📏 ⟩
const PROKSIMA = 0o20;
const PAŜO = 0o1/0o4;

const VOJOJ = aktivajHak6h6().filter(v => v.n2k.length >= 2);
const DOKOJ = aktivajHaqakaj2();
const retaj = VOJOJ.map(v => ( { n2k: v.n2k, sefini: v.sefini } ));
const landoj = DOKOJ.map(d => {
  const r = d.rotacio ?? 0;
  return [ d.x + Math.sin(r) * ( d.profundo / 2 ),
    d.z + Math.cos(r) * ( d.profundo / 2 ) ] as K6h6Punkto;
});
const ne3ak2 = troviK6h6RetajnHaveb6kekn(retaj, DOKOJ);
const celoj: K6h6Punkto[] = ne3ak2.map(k => [ k.x, k.z ] as K6h6Punkto);
const gluitaj = VOJOJ.map((v, i) => gluiK6h6Finon(v.n2k, celoj,
  landoj.map(p => ( { x: p[0], z: p[1] } )),
  VOJOJ.filter((_, j) => j !== i).map(o => o.n2k)));
const haveb6kek = troviK6h6RetajnHaveb6kekn(
  VOJOJ.map((v, i) => ( { n2k: gluitaj[i], sefini: v.sefini } )), DOKOJ);
const k6h6Alteco = kf2K6h6Alton(alteco, haveb6kek);

// ⟨ កម្ពស់ចានភ្ជាប់ 📏 ⟩ ៖ វាស់ដូចហ្គេម ៖ កម្រិតផ្លូវត្រូវដល់កម្រិតចាន ។ 📃 ⟩
const hapa12 = new Map<string, number>();
const pa12Cxe = ( x: number, z: number ): number => {
  const ca3aq = x + "," + z;
  let l6da = hapa12.get(ca3aq);
  if ( l6da === undefined ) {
    l6da = surGrid(k6h6SuproDeVeb6kek(x, z, [], VOJA_EKSTERA_DUONO, k6h6Alteco).hateru);
    hapa12.set(ca3aq, l6da);
  }
  return l6da;
};
const ankroj = haveb6kek.map(k => ( { x: k.x, z: k.z, l6da: pa12Cxe(k.x, k.z) } ));

// ⟪ កម្ពស់ចានភ្ជាប់ 📏 ⟫
/*កម្ពស់ផ្ទៃចាននៅចុងផ្លូវ , ដូច kaxte.ts
    @param x, z ( number ) - ចុងផ្លូវ
    @param sefini ( number ) - ទទឹងផ្លូវ
@returns l6da ( number ) - កម្ពស់ចាន */
function pontaFinAlto( x: number, z: number, sefini: number ): number {
  let plejProksima: typeof haveb6kek[number] | null = null, plejMallonga = Infinity;
  for ( const k of haveb6kek ) {
    const d = Math.hypot(k.x - x, k.z - z);
    if ( d < plejMallonga ) { plejMallonga = d; plejProksima = k; }
  }
  if ( plejProksima && plejMallonga < VOJA_EKSTERA_DUONO + VOJA_TRUA_DUONO )
    return k6h6SuproDeVeb6kek(plejProksima.x, plejProksima.z, plejProksima.direktaj,
      VOJA_EKSTERA_DUONO, k6h6Alteco).hateru;
  return k6h6Supro(x, z, sefini);
}

// ⟪ កម្ពស់ផ្ទៃតាមចំណុច 📃 ⟫
interface K6h6Supra {
  l6da: ( x: number, z: number ) => number;
  sost2cel2sai: boolean;
  akvaStarto: number;
  akvaFino: number;
}

/*កម្ពស់ផ្ទៃផ្លូវពិត តាមផ្លូវមួយ
    @param i ( number ) - លេខផ្លូវ
@returns teru ( K6h6Supra ) - អនុគមន៍កម្ពស់ និងដែនទឹក */
function supraDeK6h6( i: number ): K6h6Supra {
  const n2k = gluitaj[i];
  const sefini = VOJOJ[i].pontoSefini ?? VOJOJ[i].sefini;
  const tsekePontaAkvo = kf2PontanAkvanTeston(n2k, sefini, tsekeVeraAkvo);
  const sost2cel2sai = havasAkvanTrunkon(n2k, tsekePontaAkvo);
  if ( sost2cel2sai ) {
    const s2qena = vepaqPontanProfilon(n2k, sefini, k6h6Supro,
      ( x, z ) => tsekePontaAkvo(x, z) ? akvaVem2(x, z) : -Infinity,
      pontaFinAlto, alteco);
    const trako = s2qena.trakoj[0];
    const akvaStarto = trako
      ? distancoDe(n2k, trako.ax, trako.az) : 0;
    const akvaFino = trako
      ? distancoDe(n2k, trako.bx, trako.bz) : 0;
    return {
      l6da: ( x, z ) => s2qena.l6da(x, z),
      sost2cel2sai, akvaStarto, akvaFino };
  }
  const s2qena = kf2NivelanProfilon(n2k, k6h6LarghoDuono( sefini ),
    k6h6Alteco, akvaFino, ankroj);
  return { l6da: ( x, z ) => s2qena.altoCxe(distancoDe(n2k, x, z)),
    sost2cel2sai, akvaStarto: 0, akvaFino: s2qena.sahakani };
}

// ⟪ ចម្ងាយតាមបណ្តោយ 📏 ⟫
/*ចម្ងាយតាមបណ្តោយផ្លូវ រហូតដល់ចំណុចជិតបំផុត
    @param n2k ( [ number , number ] [ ] ) - បន្ទាត់ផ្លូវ
    @param x, z ( number ) - ចំណុច
@returns s ( number ) - ចម្ងាយតាមបណ្តោយ */
function distancoDe( n2k: readonly K6h6Punkto[], x: number, z: number ): number {
  let kur = 0, plejBona = Infinity, plejS = 0;
  for ( let k = 0; k < n2k.length - 1; k++ ) {
    const a = n2k[k], b = n2k[k + 1];
    const dx = b[0] - a[0], dz = b[1] - a[1];
    const l2 = dx * dx + dz * dz;
    const sahakani = Math.sqrt(l2);
    if ( sahakani < 0o10 ** -0o6 ) continue;
    const t = Math.max(0, Math.min(1, ( ( x - a[0] ) * dx + ( z - a[1] ) * dz ) / l2));
    const d = Math.hypot(a[0] + dx * t - x, a[1] + dz * t - z);
    if ( d < plejBona ) { plejBona = d; plejS = kur + sahakani * t; }
    kur += sahakani;
  }
  return plejS;
}

// ⟪ ចំណុចតាមបណ្តោយ 📃 ⟫
/*ចំណុចនៅចម្ងាយ s លើផ្លូវ
    @param n2k ( [ number , number ] [ ] ) - បន្ទាត់ផ្លូវ
    @param s ( number ) - ចម្ងាយតាមបណ្តោយ
@returns p ( { x , z } ) - ចំណុច */
// ⟨ អនុគមន៍រួមនៅ komunaj ជាមួយកម្រិតធំជាងរបស់ឧបករណ៍នេះ 📃 ⟩
const punktoCxe = ( n2k: readonly K6h6Punkto[], s: number ): { x: number; z: number } =>
  punktoCxeBaza( n2k, s, 0o10 ** -0o6 );

// ⟪ រណ្តៅខ្លី 📏 ⟫
/*រករណ្តៅដែលធ្លាក់ចុះរួចឡើងវិញក្នុងចម្ងាយខ្លី
    @param hateru ( { x , z , y } [ ] ) - កម្ពស់ផ្ទៃតាមលំដាប់
@returns dipo ( { profundo , x , z , s } | null ) - រណ្តៅជ្រៅបំផុត */
function plejProfundaDipo(
  hateru: readonly { x: number; z: number; y: number; s: number }[]
): { profundo: number; x: number; z: number; s: number } | null {
  let dipo: { profundo: number; x: number; z: number; s: number } | null = null;
  for ( let i = 1; i < hateru.length - 1; i++ ) {
    let maldekstra = -Infinity, dekstra = -Infinity;
    for ( let j = i - 1; j >= 0; j-- ) {
      if ( hateru[i].s - hateru[j].s > DIP_DISTO ) break;
      maldekstra = Math.max(maldekstra, hateru[j].y);
    }
    for ( let j = i + 1; j < hateru.length; j++ ) {
      if ( hateru[j].s - hateru[i].s > DIP_DISTO ) break;
      dekstra = Math.max(dekstra, hateru[j].y);
    }
    const profundo = Math.min(maldekstra, dekstra) - hateru[i].y;
    if ( profundo > ( dipo?.profundo ?? 0 ) )
      dipo = { profundo, x: hateru[i].x, z: hateru[i].z, s: hateru[i].s };
  }
  return dipo;
}

// ⟪ ចម្ងាយទៅមាត់ចំណត 📏 ⟫
/*ចម្ងាយទៅមាត់ដីចំណតជិតបំផុត
    @param x, z ( number ) - ចំណុច
@returns h6kuni ( number ) - ចម្ងាយ , ឬ Infinity បើគ្មានចំណត */
function distoAlLandon( x: number, z: number ): number {
  let plej = Infinity;
  for ( const p of landoj ) plej = Math.min(plej, Math.hypot(p[0] - x, p[1] - z));
  return plej;
}

let difektaj = 0, profunda = 0;
for ( let i = 0; i < VOJOJ.length; i++ ) {
  const teru = supraDeK6h6(i);
  const n2k = gluitaj[i];
  let sahakani = 0;
  for ( let k = 0; k < n2k.length - 1; k++ )
    sahakani += Math.hypot(n2k[k + 1][0] - n2k[k][0], n2k[k + 1][1] - n2k[k][1]);
  const hateru: { x: number; z: number; y: number; s: number }[] = [];
  const nombro = Math.max(1, Math.ceil(sahakani / PAŜO));
  for ( let k = 0; k <= nombro; k++ ) {
    const s = sahakani * k / nombro;
    const p = punktoCxe(n2k, s);
    hateru.push({ x: p.x, z: p.z, y: teru.l6da(p.x, p.z), s });
  }
  const dipo = plejProfundaDipo(hateru);
  const signo = teru.sost2cel2sai ? "ស្ពាន" : "ផ្លូវ";
  if ( !dipo ) {
    console.log(`  ${signo} ${i} ${VOJOJ[i].ksaka} , គ្មានរណ្តៅ , ប្រវែង ${sahakani.toFixed(1)}`);
    continue;
  }
  const landa = distoAlLandon(dipo.x, dipo.z);
  // ⟨ ចម្ងាយទៅមាត់ទឹក ៖ សម្រាប់ស្ពានតែប៉ុណ្ណោះ 📃 ⟩
  const akva = teru.sost2cel2sai
    ? Math.min(Math.abs(dipo.s - teru.akvaStarto), Math.abs(dipo.s - teru.akvaFino))
    : Infinity;
  const proksima = Math.min(landa, akva) < PROKSIMA;
  if ( dipo.profundo > DIP_LIMO && proksima ) difektaj++;
  if ( dipo.profundo > profunda ) profunda = dipo.profundo;
  console.log(`  ${signo} ${i} ${VOJOJ[i].ksaka} , រណ្តៅ ${dipo.profundo.toFixed(3)}` +
    ` @${dipo.x.toFixed(1)},${dipo.z.toFixed(1)} s=${dipo.s.toFixed(1)}` +
    ` , ចំណត ${landa === Infinity ? "-" : landa.toFixed(1)}` +
    ` , មាត់ទឹក ${akva === Infinity ? "-" : akva.toFixed(1)}` +
    ( dipo.profundo > DIP_LIMO && proksima ? "  ⚠" : "" ));
}
console.log(`ផ្លូវ ${VOJOJ.length} , រណ្តៅជិតចំណតឬស្ពានលើសលីមីត ${difektaj}` +
  ` , រណ្តៅជ្រៅបំផុត ${profunda.toFixed(3)}`);

// ⟪ ស្ពាន ៖ កម្ពស់ចុងស្ពាន និងចាន 📏 ⟫
// ⟨ កម្ពស់ផ្ទៃស្ពាននៅចុងត្រូវស្មើចាន ។ បើខុស , ផ្លូវលិចនៅមាត់ស្ពាន 📃 ⟩
console.log("<( ចុងស្ពាន )>");
for ( let i = 0; i < VOJOJ.length; i++ ) {
  const teru = supraDeK6h6(i);
  if ( !teru.sost2cel2sai ) continue;
  const n2k = gluitaj[i];
  const xaqadi = n2k[0], z2hak = n2k[ n2k.length - 1 ];
  const sefini = VOJOJ[i].pontoSefini ?? VOJOJ[i].sefini;
  const dezirata0 = pontaFinAlto(xaqadi[0], xaqadi[1], sefini);
  const dezirata1 = pontaFinAlto(z2hak[0], z2hak[1], sefini);
  console.log(`  ${i} ${VOJOJ[i].ksaka}` +
    ` , ដើម ${teru.l6da(xaqadi[0], xaqadi[1]).toFixed(3)} ចាន ${dezirata0.toFixed(3)}` +
    ` ខុស ${( teru.l6da(xaqadi[0], xaqadi[1]) - dezirata0 ).toFixed(3)}` +
    ` , ចុង ${teru.l6da(z2hak[0], z2hak[1]).toFixed(3)} ចាន ${dezirata1.toFixed(3)}` +
    ` ខុស ${( teru.l6da(z2hak[0], z2hak[1]) - dezirata1 ).toFixed(3)}`);
}
