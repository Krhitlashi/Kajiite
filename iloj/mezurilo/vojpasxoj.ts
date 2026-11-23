// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ j͐ʃэ ɭ(ᴜ ʌ ſןw ֭ſɭᴜ }ʃꞇ 🧪 ⧽≻
// ⟨ ផ្លូវសាងសង់ជាជំហាន ។ បើជំហានមួយខ្ពស់ជាងមុនច្រើន ផ្លូវលោតឡើងភ្លាមៗ ។
// ស្គ្រីបនេះរកជំហានធំបំផុតតាមផ្លូវនីមួយៗ , រណ្តៅខ្លី , និងការកប់ក្នុងដី ។
// ស្ពានត្រូវបានរំលង ៖ ផ្ទៃរបស់វារលូន , ដែល `pontoj2.ts` វាស់រួចហើយ ។ 📃 ⟩
import * as THREE from "three";
import { vepaqHak6h6n } from "../../eskekoj/medio/hak6h6.js";
import { vojSuprajxoj } from "../../eskekoj/medio/hak6h6/hahunaq.js";
import { aktivajHak6h6, aktivajHaqakaj2 } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { troviK6h6RetajnHaveb6kekn } from "../../eskekoj/medio/voj-reto.js";
import { kf2T6g6Pukek,
  kf2T6hnaPukek } from "../../eskekoj/komunajxoj/materialoj.js";
import { havasAkvanTrunkon, kf2PontanAkvanTeston } from "../../eskekoj/medio/hak6h6/ponto-profilo.js";
import { surGrid, VOJA_TRUA_DUONO } from "../../eskekoj/medio/hak6h6/havecax2l.js";
import { akvaFino, tsekeVeraAkvo } from "./komunaj.js";

// ⟨ ជំហានផ្លូវលើសពីនេះគឺជាការលោតដែលគួរកែ 📏 ⟩
const SALTO_LIMO = 0o1/0o2 + 0o1/0o4;

// ⟨ រណ្តៅខ្លីជាងចម្ងាយនេះមិនគួរមាន ៖ ផ្លូវត្រូវរាបលើវា ។ 📃 ⟩
const DIP_LIMO = 0o1/0o4;
const DIP_DISTO = 0o6;

// ⟨ មុខជំហានចោតលើសនេះគឺជាជញ្ជាំងស្ទើរ 📏 ⟩ ៖ ១ គឺ ៤៥ ដឺក្រេ , លើសតែបន្តិចទុកឱ្យការបង្គត់ ។
const DEKLIVO_LIMO = 0o1 + 0o1/0o20;

const qena = new THREE.Scene();
const t6g6 = kf2T6g6Pukek(new THREE.Texture());
const t6hna = kf2T6hnaPukek(new THREE.Texture());
const VOJOJ = aktivajHak6h6();
const retaj = VOJOJ.filter(v => v.n2k.length >= 2)
  .map(v => ( { n2k: v.n2k, sefini: v.sefini } ));
const haveb6kek = troviK6h6RetajnHaveb6kekn(retaj, aktivajHaqakaj2());
const kunigajPunktoj = haveb6kek.map(k => [ k.x, k.z ] as [ number, number ]);

// ⟪ ចម្ងាយទៅរន្ធភ្ជាប់ 📏 ⟫
/*ចម្ងាយទៅរន្ធភ្ជាប់ជិតបំផុត
    @param x, z ( number ) - ចំណុច
@returns h6kuni ( number ) - ចម្ងាយ , ឬ Infinity បើគ្មាន */
function distoAlVeb6kek( x: number, z: number ): number {
  let plej = Infinity;
  for ( const [ kx, kz ] of kunigajPunktoj )
    plej = Math.min(plej, Math.hypot(kx - x, kz - z));
  return plej;
}

// ⟪ រណ្តៅខ្លី 📏 ⟫
/*រករណ្តៅដែលធ្លាក់ចុះរួចឡើងវិញក្នុងចម្ងាយខ្លី
    @param hateru ( { y , x , z } [ ] ) - កម្ពស់ផ្ទៃតាមលំដាប់
@returns dipo ( { profundo , x , z } | null ) - រណ្តៅជ្រៅបំផុត */
function plejProfundaDipo(
  hateru: readonly { y: number; x: number; z: number }[]
): { profundo: number; x: number; z: number } | null {
  let dipo: { profundo: number; x: number; z: number } | null = null;
  for ( let i = 0; i < hateru.length; i++ ) {
    let maldekstra = -Infinity, dekstra = -Infinity;
    let h6kuni = 0;
    for ( let j = i - 1; j >= 0; j-- ) {
      h6kuni += Math.hypot(hateru[j + 1].x - hateru[j].x, hateru[j + 1].z - hateru[j].z);
      if ( h6kuni > DIP_DISTO ) break;
      maldekstra = Math.max(maldekstra, hateru[j].y);
    }
    h6kuni = 0;
    for ( let j = i + 1; j < hateru.length; j++ ) {
      h6kuni += Math.hypot(hateru[j].x - hateru[j - 1].x, hateru[j].z - hateru[j - 1].z);
      if ( h6kuni > DIP_DISTO ) break;
      dekstra = Math.max(dekstra, hateru[j].y);
    }
    const profundo = Math.min(maldekstra, dekstra) - hateru[i].y;
    if ( profundo > ( dipo?.profundo ?? 0 ) )
      dipo = { profundo, x: hateru[i].x, z: hateru[i].z };
  }
  return dipo;
}

let tutaMaks = 0, difektaj = 0, provitaj = 0, pontoj = 0, tutaBurial = 0, tutaDipo = 0;
let tutaDeklivo = 0, deklivoDifektaj = 0;
for ( let v = 0; v < VOJOJ.length; v++ ) {
  const k6h6 = VOJOJ[v];
  if ( k6h6.n2k.length < 2 ) continue;
  const sefini = k6h6.pontoSefini ?? k6h6.sefini;
  if ( havasAkvanTrunkon(k6h6.n2k, kf2PontanAkvanTeston(k6h6.n2k, sefini, tsekeVeraAkvo)) ) {
    pontoj++;
    continue;
  }
  provitaj++;
  vojSuprajxoj.length = 0;
  vepaqHak6h6n(qena,
    [ { pts: k6h6.n2k, w: k6h6.sefini / 2, hateruni: true } ],
    alteco, t6g6, t6hna, kunigajPunktoj,
    { akvaFn: akvaFino });
  // ⟨ គែមនីមួយៗជាប់គ្នា ៖ លំដាប់នៃការសាងសង់គឺតាមផ្លូវ 📃 ⟩
  let maks = 0, maksLoko = -1, kalkulo = 0;
  for ( let k = 1; k < vojSuprajxoj.length; k++ ) {
    const ne3ak2 = vojSuprajxoj[k - 1], nuna = vojSuprajxoj[k];
    if ( Math.hypot(ne3ak2.x2 - nuna.x1, ne3ak2.z2 - nuna.z1) > 0o10 ** -0o4 ) continue;
    // ⟨ ចន្លោះរន្ធភ្ជាប់ ៖ ចានគ្របដណ្តប់ទីនោះ 📃 ⟩
    if ( distoAlVeb6kek(nuna.x1, nuna.z1) <= VOJA_TRUA_DUONO * 0o2 ) continue;
    kalkulo++;
    const salto = Math.abs(nuna.y0 - ne3ak2.y0);
    if ( salto > maks ) { maks = salto; maksLoko = k; }
  }
  // ⟨ មុខជំហាន ៖ ជម្រាលមុខជំហានមិនគួរចោតជាង ៤៥ ដឺក្រេ ។ 📃 ⟩
  // ប្រអប់ជម្រាលមាន y0 ≠ y1 , ដូច្នេះវាស់ជម្រាលពីប្រអប់ទាំងនោះ ។ ១ គឺ ៤៥ ដឺក្រេ ។
  let deklivoMaks = 0, deklivoLoko: [ number, number ] | null = null;
  for ( const kek of vojSuprajxoj ) {
    const salto = Math.abs(kek.y1 - kek.y0);
    if ( salto < 0o1/0o1000 ) continue;
    const longoPeco = Math.hypot(kek.x2 - kek.x1, kek.z2 - kek.z1);
    if ( longoPeco < 0o1/0o1000 ) continue;
    const haga = salto / longoPeco;
    if ( haga > deklivoMaks ) {
      deklivoMaks = haga;
      deklivoLoko = [ ( kek.x1 + kek.x2 ) / 0o2, ( kek.z1 + kek.z2 ) / 0o2 ];
    }
  }
  // ⟨ ការចំណាំងក្រោមដី ៖ ផ្លូវមិនអាចកប់ក្នុងដី ។ 📃 ⟩
  const hateru: { y: number; x: number; z: number }[] = [];
  let maksBurial = 0, burialLoko: [ number, number ] | null = null;
  for ( const kek of vojSuprajxoj ) {
    // ⟨ ចានភ្ជាប់គ្របដណ្តប់ផ្លូវ ៖ ដូច្នេះមិនរាប់ទីនោះទេ 📃 ⟩
    if ( distoAlVeb6kek( kek.x1, kek.z1 ) <= VOJA_TRUA_DUONO * 0o2 ) continue;
    hateru.push({ y: kek.y0, x: ( kek.x1 + kek.x2 ) / 2, z: ( kek.z1 + kek.z2 ) / 2 });
    for ( const f of [ 0, 0o1/0o4, 0o1/0o2, 0o3/0o4, 1 ] ) {
      const px = kek.x1 + ( kek.x2 - kek.x1 ) * f;
      const pz = kek.z1 + ( kek.z2 - kek.z1 ) * f;
      const diferenco = alteco( px, pz ) - kek.y0;
      if ( diferenco > maksBurial ) { maksBurial = diferenco; burialLoko = [ px, pz ]; }
    }
  }
  const dipo = plejProfundaDipo(hateru);
  if ( maks > tutaMaks ) tutaMaks = maks;
  if ( maks > SALTO_LIMO ) difektaj++;
  if ( maksBurial > tutaBurial ) tutaBurial = maksBurial;
  if ( dipo && dipo.profundo > tutaDipo ) tutaDipo = dipo.profundo;
  if ( deklivoMaks > tutaDeklivo ) tutaDeklivo = deklivoMaks;
  if ( deklivoMaks > DEKLIVO_LIMO ) deklivoDifektaj++;
  const raqa = maksLoko >= 0 ? vojSuprajxoj[maksLoko] : null;
  const ne3ak2Peco = maksLoko > 0 ? vojSuprajxoj[maksLoko - 1] : null;
  const tero = raqa && ne3ak2Peco
    ? ` , ដី ${alteco(raqa.x1, raqa.z1).toFixed(3)}` +
      ` ( មុន ${alteco(ne3ak2Peco.x1, ne3ak2Peco.z1).toFixed(3)} )`
    : "";
  console.log(`ផ្លូវ ${v} ${k6h6.ksaka} , ជំហាន ${kalkulo}` +
    ` , លោតខ្ពស់បំផុត ${maks.toFixed(3)}` +
    ( raqa ? ` @${raqa.x1.toFixed(1)},${raqa.z1.toFixed(1)}` : "" ) + tero +
    ( maks > SALTO_LIMO ? "  ⚠" : "" ) +
    ` , ចំណាំងក្រោមដី ${maksBurial.toFixed(3)}` +
    ( burialLoko ? ` @${burialLoko[0].toFixed(1)},${burialLoko[1].toFixed(1)}` : "" ) +
    ( maksBurial > 0o1/0o4 ? "  ⚠" : "" ) +
    ( dipo ? ` , រណ្តៅខ្លី ${dipo.profundo.toFixed(3)} @${dipo.x.toFixed(1)},${dipo.z.toFixed(1)}` : "" ) +
    ( dipo && dipo.profundo > DIP_LIMO ? "  ⚠" : "" ) +
    ` , មុខចោត ${deklivoMaks.toFixed(2)}` +
    ( deklivoLoko ? ` @${deklivoLoko[0].toFixed(1)},${deklivoLoko[1].toFixed(1)}` : "" ) +
    ( deklivoMaks > DEKLIVO_LIMO ? "  ⚠" : "" ));
}

// ⟨ លទ្ធផលសង្ខេប 📃 ⟩
console.log(`ផ្លូវ ${provitaj} ( ស្ពាន ${pontoj} រំលង )` +
  ` , លោតខ្ពស់បំផុត ${tutaMaks.toFixed(3)}` +
  ` , លើសលីមីត ${difektaj}` +
  ` , ចំណាំងក្រោមដីបំផុត ${tutaBurial.toFixed(3)}` +
  ` , រណ្តៅខ្លីបំផុត ${tutaDipo.toFixed(3)}` +
  ` , មុខចោតបំផុត ${tutaDeklivo.toFixed(2)}` +
  ( deklivoDifektaj > 0 ? ` , ផ្លូវមុខចោត ${deklivoDifektaj}` : "" ));

// ⟨ ចានភ្ជាប់ ៖ ខ្ពស់ជាងផ្លូវដែលមកដល់តែមួយជំហានប៉ុណ្ណោះ ។ 📃 ⟩
vojSuprajxoj.length = 0;
vepaqHak6h6n(qena,
  VOJOJ.filter(v => v.n2k.length >= 2)
    .map(v => ( { pts: v.n2k, w: v.sefini / 2, hateruni: true } )),
  alteco, t6g6, t6hna, kunigajPunktoj,
  { akvaFn: akvaFino });
let plumboMaks = 0, plumboLoko = "";
for ( const [ kx, kz ] of kunigajPunktoj ) {
  const cxe = vojSuprajxoj.filter(p =>
    Math.hypot(( p.x1 + p.x2 ) / 2 - kx, ( p.z1 + p.z2 ) / 2 - kz) <= VOJA_TRUA_DUONO);
  const hateru = Math.max(...cxe.map(p => p.y0), -Infinity);
  const diferenco = surGrid(hateru) - hateru;
  if ( diferenco > plumboMaks ) { plumboMaks = diferenco; plumboLoko = kx + "," + kz; }
}
console.log(`ចានភ្ជាប់ ${kunigajPunktoj.length} , ជំហានចុងក្រោយទៅចាន ${plumboMaks.toFixed(3)} @${plumboLoko}`);
