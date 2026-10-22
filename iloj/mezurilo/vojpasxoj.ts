// ≺⧼ ការលោតកម្ពស់ផ្លូវ 🧪 ⧽≻
// ⟨ ផ្លូវសាងសង់ជាជំហាន ។ បើជំហានមួយខ្ពស់ជាងមុនច្រើន ផ្លូវលោតឡើងភ្លាមៗ ។
// ស្គ្រីបនេះរកជំហានធំបំផុតតាមផ្លូវនីមួយៗ ។ ស្ពានត្រូវបានរំលង ៖
// ផ្ទៃរបស់វារលូនតាមប្រវត្តិរូប , ដែល `pontoj2.ts` វាស់រួចហើយ ។ 📃 ⟩
import * as THREE from "three";
import { konstruiVojojn } from "../../eskekoj/medio/vojoj.js";
import { vojSuprajxoj } from "../../eskekoj/medio/vojoj/tipoj.js";
import { aktivajVojoj, aktivajDokoj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco, skulptitaAkvo, akvaNivelo } from "../../kantaoj/mondo/tereno.js";
import { troviVojaRetajnKunigojn } from "../../eskekoj/medio/voj-reto.js";
import { kreiDioritanMaterialon,
  kreiAndezitanMaterialon } from "../../eskekoj/komunajxoj/materialoj.js";
import { havasAkvanTrunkon, kreiPontanAkvanTeston } from "../../kantaoj/mondo/urbo/ponto-profilo.js";
import { VOJA_TRUA_DUONO, VOJA_EKSTERA_DUONO } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { vojaSuproDeKunigo } from "../../eskekoj/medio/vojoj/formoj.js";
import type { VojKunigoAlto } from "../../eskekoj/medio/vojoj/tipoj.js";

// ⟨ ជំហានផ្លូវលើសពីនេះគឺជាការលោតដែលគួរកែ 📏 ⟩
const SALTO_LIMO = 0o1/0o2 + 0o1/0o4;

// ⟨ ទឹកពិត ៖ ដូច urbo.ts 📃 ⟩
const cxuVeraAkvo = ( x: number, z: number ) =>
  skulptitaAkvo(x, z) && alteco(x, z) < akvaNivelo(x, z) - 0o1/0o200;
const akvaFino = ( x: number, z: number ): number =>
  cxuVeraAkvo(x, z) ? akvaNivelo(x, z) + 0o1/0o2 : -Infinity;

const sceno = new THREE.Scene();
const diorito = kreiDioritanMaterialon(new THREE.Texture());
const andezito = kreiAndezitanMaterialon(new THREE.Texture());
const VOJOJ = aktivajVojoj();
const retaj = VOJOJ.filter(v => v.punktoj.length >= 2)
  .map(v => ( { punktoj: v.punktoj, larĝo: v.larĝo } ));
const kunigoj = troviVojaRetajnKunigojn(retaj, aktivajDokoj());
const kunigajPunktoj = kunigoj.map(k => [ k.x, k.z ] as [ number, number ]);
// ⟨ កម្រិតចានភ្ជាប់ ៖ ត្រូវជាមួយកម្រិតផ្លូវដល់ចានភ្ជាប់ ដើម្បីឱ្យចានភ្ជាប់ជាមួយផ្លូវ ។ 📃 ⟩
const kunigoAltoj: VojKunigoAlto[] = kunigoj.map( k => ( {
  x: k.x, z: k.z,
  alto: vojaSuproDeKunigo( k.x, k.z, k.direktaj, VOJA_EKSTERA_DUONO, alteco ).supro } ) );

// ⟨ ចម្ងាយទៅរន្ធភ្ជាប់ជិតបំផុត ៖ ការលោតនៅទីនោះជារឿងធម្មតា 📏 ⟩
function distoAlKunigo( x: number, z: number ): number {
  let plej = Infinity;
  for ( const [ kx, kz ] of kunigajPunktoj )
    plej = Math.min(plej, Math.hypot(kx - x, kz - z));
  return plej;
}

let tutaMaks = 0, difektaj = 0, provitaj = 0, pontoj = 0, tutaBurial = 0;
for ( let v = 0; v < VOJOJ.length; v++ ) {
  const vojo = VOJOJ[v];
  if ( vojo.punktoj.length < 2 ) continue;
  const larĝo = vojo.pontoLarĝo ?? vojo.larĝo;
  if ( havasAkvanTrunkon(vojo.punktoj, kreiPontanAkvanTeston(vojo.punktoj, larĝo, cxuVeraAkvo)) ) {
    pontoj++;
    continue;
  }
  provitaj++;
  vojSuprajxoj.length = 0;
  const altojDeKunigo = new Map<string, number>();
  konstruiVojojn(sceno,
    [ { pts: vojo.punktoj, w: vojo.larĝo / 2, kapoj: true } ],
    alteco, diorito, andezito, kunigajPunktoj,
    { akvaFn: akvaFino, kunigoAltoj, altojDeKunigo });
  // ⟨ គែមនីមួយៗជាប់គ្នា ៖ ឧបមាថាលំដាប់នៃការសាងសង់គឺតាមផ្លូវ 📃 ⟩
  let maks = 0, maksLoko = -1, kalkulo = 0;
  for ( let k = 1; k < vojSuprajxoj.length; k++ ) {
    const antaŭa = vojSuprajxoj[k - 1], nuna = vojSuprajxoj[k];
    if ( Math.hypot(antaŭa.x2 - nuna.x1, antaŭa.z2 - nuna.z1) > 0o1/0o10000 ) continue;
    // ⟨ ចន្លោះរន្ធភ្ជាប់ ៖ ចានគ្របដណ្តប់ទីនោះ ។ ចន្លោះនោះធំជាងជំហានធម្មតា 📃 ⟩
    if ( distoAlKunigo(nuna.x1, nuna.z1) <= VOJA_TRUA_DUONO * 0o2 ) continue;
    kalkulo++;
    const salto = Math.abs(nuna.y0 - antaŭa.y0);
    if ( salto > maks ) { maks = salto; maksLoko = k; }
  }
  // ⟨ ការចំណាំងក្រោមដី ៖ ផ្លូវមិនអាចកប់ក្នុងដី ។ 📃 ⟩
  let maksBurial = 0, burialLoko: [ number, number ] | null = null;
  for ( const peco of vojSuprajxoj ) {
    // ⟨ ចានភ្ជាប់ ៖ បទាឆ់បង្ក្កានមិនមានរូបភាពត្រូវកាន់តែចានភ្ជាប់គ្របដណ្តប់ ។ 📃 ⟩
    if ( distoAlKunigo( peco.x1, peco.z1 ) <= VOJA_TRUA_DUONO * 0o2 ) continue;
    for ( const f of [ 0, 0o1/0o4, 0o1/0o2, 0o3/0o4, 1 ] ) {
      const px = peco.x1 + ( peco.x2 - peco.x1 ) * f;
      const pz = peco.z1 + ( peco.z2 - peco.z1 ) * f;
      const diferenco = alteco( px, pz ) - peco.y0;
      if ( diferenco > maksBurial ) { maksBurial = diferenco; burialLoko = [ px, pz ]; }
    }
  }
  if ( maks > tutaMaks ) tutaMaks = maks;
  if ( maks > SALTO_LIMO ) difektaj++;
  if ( maksBurial > tutaBurial ) tutaBurial = maksBurial;
  const loko = maksLoko >= 0 ? vojSuprajxoj[maksLoko] : null;
  const antaŭaPeco = maksLoko > 0 ? vojSuprajxoj[maksLoko - 1] : null;
  const tero = loko && antaŭaPeco
    ? ` , ដី ${alteco(loko.x1, loko.z1).toFixed(3)}` +
      ` ( មុន ${alteco(antaŭaPeco.x1, antaŭaPeco.z1).toFixed(3)} )`
    : "";
  console.log(`ផ្លូវ ${v} ${vojo.nomo} , ជំហាន ${kalkulo}` +
    ` , លោតខ្ពស់បំផុត ${maks.toFixed(3)}` +
    ( loko ? ` @${loko.x1.toFixed(1)},${loko.z1.toFixed(1)}` : "" ) + tero +
    ( maks > SALTO_LIMO ? "  ⚠" : "" ) +
    ` , ចំណាំងក្រោមដី ${maksBurial.toFixed(3)}` +
    ( burialLoko ? ` @${burialLoko[0].toFixed(1)},${burialLoko[1].toFixed(1)}` : "" ) +
    ( maksBurial > 0o1/0o4 ? "  ⚠" : "" ));
}

// ⟨ លទ្ធផលសង្ខេប 📃 ⟩
console.log(`ផ្លូវ ${provitaj} ( ស្ពាន ${pontoj} រំលង )` +
  ` , លោតខ្ពស់បំផុត ${tutaMaks.toFixed(3)}` +
  ` , លើសលីមីត ${difektaj}` +
  ` , ចំណាំងក្រោមដីបំផុត ${tutaBurial.toFixed(3)}`);

// ⟨ កានភ្ជាប់ ៖ កម្រិតផ្លូវនៅចានភ្ជាប់ត្រូវគ្រប់គ្នា ។ 📃 ⟩
// ⟨ សង្កត់ផ្លូវទាំងមូល ដើម្បីរកកម្រិតចានភ្ជាប់ដែលបានកំណតដោយផ្លូវទាំងអស់ ។ 📃 ⟩
vojSuprajxoj.length = 0;
const altojDeKunigo = new Map<string, number>();
konstruiVojojn(sceno,
  VOJOJ.filter(v => v.punktoj.length >= 2)
    .map(v => ( { pts: v.punktoj, w: v.larĝo / 2, kapoj: true } )),
  alteco, diorito, andezito, kunigajPunktoj,
  { akvaFn: akvaFino, kunigoAltoj, altojDeKunigo });
let kunigoMaks = 0, kunigoLoko = "";
for ( const [ klavo, alto ] of altojDeKunigo ) {
  const [ kx, kz ] = klavo.split( "," ).map( v => parseFloat( v ) );
  for ( const peco of vojSuprajxoj ) {
    const mezaX = ( peco.x1 + peco.x2 ) / 2, mezaZ = ( peco.z1 + peco.z2 ) / 2;
    if ( Math.hypot( mezaX - kx, mezaZ - kz ) > VOJA_TRUA_DUONO + 0o1/0o100 ) continue;
    const diferenco = Math.abs( peco.y0 - alto );
    if ( diferenco > kunigoMaks ) { kunigoMaks = diferenco; kunigoLoko = klavo; }
  }
}
console.log(`ចានភ្ជាប់ ${altojDeKunigo.size} , ខុសគ្នាបំផុត ${kunigoMaks.toFixed(3)}` +
  ( kunigoLoko ? ` @${kunigoLoko}` : "" ) + ( kunigoMaks > 0o1/0o4 ? "  ⚠" : "" ));
