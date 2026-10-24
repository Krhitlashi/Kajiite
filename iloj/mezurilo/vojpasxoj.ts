// ≺⧼ ការលោតកម្ពស់ផ្លូវ 🧪 ⧽≻
// ⟨ ផ្លូវសាងសង់ជាជំហាន ។ បើជំហានមួយខ្ពស់ជាងមុនច្រើន ផ្លូវលោតឡើងភ្លាមៗ ។
// ស្គ្រីបនេះរកជំហានធំបំផុតតាមផ្លូវនីមួយៗ , រណ្តៅខ្លី , និងការកប់ក្នុងដី ។
// ស្ពានត្រូវបានរំលង ៖ ផ្ទៃរបស់វារលូន , ដែល `pontoj2.ts` វាស់រួចហើយ ។ 📃 ⟩
import * as THREE from "three";
import { konstruiVojojn } from "../../eskekoj/medio/vojoj.js";
import { vojSuprajxoj } from "../../eskekoj/medio/vojoj/tipoj.js";
import { aktivajVojoj, aktivajDokoj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { troviVojaRetajnKunigojn } from "../../eskekoj/medio/voj-reto.js";
import { kreiDioritanMaterialon,
  kreiAndezitanMaterialon } from "../../eskekoj/komunajxoj/materialoj.js";
import { havasAkvanTrunkon, kreiPontanAkvanTeston } from "../../kantaoj/mondo/urbo/ponto-profilo.js";
import { surGrid, VOJA_TRUA_DUONO } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { akvaFino, cxuVeraAkvo } from "./komunaj.js";

// ⟨ ជំហានផ្លូវលើសពីនេះគឺជាការលោតដែលគួរកែ 📏 ⟩
const SALTO_LIMO = 0o1/0o2 + 0o1/0o4;

// ⟨ រណ្តៅខ្លីជាងចម្ងាយនេះមិនគួរមាន ៖ ផ្លូវត្រូវរាបលើវា ។ 📃 ⟩
const DIP_LIMO = 0o1/0o4;
const DIP_DISTO = 0o6;

const sceno = new THREE.Scene();
const diorito = kreiDioritanMaterialon(new THREE.Texture());
const andezito = kreiAndezitanMaterialon(new THREE.Texture());
const VOJOJ = aktivajVojoj();
const retaj = VOJOJ.filter(v => v.punktoj.length >= 2)
  .map(v => ( { punktoj: v.punktoj, larĝo: v.larĝo } ));
const kunigoj = troviVojaRetajnKunigojn(retaj, aktivajDokoj());
const kunigajPunktoj = kunigoj.map(k => [ k.x, k.z ] as [ number, number ]);

// ⟪ ចម្ងាយទៅរន្ធភ្ជាប់ 📏 ⟫
/*ចម្ងាយទៅរន្ធភ្ជាប់ជិតបំផុត
    @param x, z ( number ) - ចំណុច
@returns disto ( number ) - ចម្ងាយ , ឬ Infinity បើគ្មាន */
function distoAlKunigo( x: number, z: number ): number {
  let plej = Infinity;
  for ( const [ kx, kz ] of kunigajPunktoj )
    plej = Math.min(plej, Math.hypot(kx - x, kz - z));
  return plej;
}

// ⟪ រណ្តៅខ្លី 📏 ⟫
/*រករណ្តៅដែលធ្លាក់ចុះរួចឡើងវិញក្នុងចម្ងាយខ្លី
    @param suproj ( { y , x , z } [ ] ) - កម្ពស់ផ្ទៃតាមលំដាប់
@returns dipo ( { profundo , x , z } | null ) - រណ្តៅជ្រៅបំផុត */
function plejProfundaDipo(
  suproj: readonly { y: number; x: number; z: number }[]
): { profundo: number; x: number; z: number } | null {
  let dipo: { profundo: number; x: number; z: number } | null = null;
  for ( let i = 0; i < suproj.length; i++ ) {
    let maldekstra = -Infinity, dekstra = -Infinity;
    let disto = 0;
    for ( let j = i - 1; j >= 0; j-- ) {
      disto += Math.hypot(suproj[j + 1].x - suproj[j].x, suproj[j + 1].z - suproj[j].z);
      if ( disto > DIP_DISTO ) break;
      maldekstra = Math.max(maldekstra, suproj[j].y);
    }
    disto = 0;
    for ( let j = i + 1; j < suproj.length; j++ ) {
      disto += Math.hypot(suproj[j].x - suproj[j - 1].x, suproj[j].z - suproj[j - 1].z);
      if ( disto > DIP_DISTO ) break;
      dekstra = Math.max(dekstra, suproj[j].y);
    }
    const profundo = Math.min(maldekstra, dekstra) - suproj[i].y;
    if ( profundo > ( dipo?.profundo ?? 0 ) )
      dipo = { profundo, x: suproj[i].x, z: suproj[i].z };
  }
  return dipo;
}

let tutaMaks = 0, difektaj = 0, provitaj = 0, pontoj = 0, tutaBurial = 0, tutaDipo = 0;
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
  konstruiVojojn(sceno,
    [ { pts: vojo.punktoj, w: vojo.larĝo / 2, kapoj: true } ],
    alteco, diorito, andezito, kunigajPunktoj,
    { akvaFn: akvaFino });
  // ⟨ គែមនីមួយៗជាប់គ្នា ៖ លំដាប់នៃការសាងសង់គឺតាមផ្លូវ 📃 ⟩
  let maks = 0, maksLoko = -1, kalkulo = 0;
  for ( let k = 1; k < vojSuprajxoj.length; k++ ) {
    const antaŭa = vojSuprajxoj[k - 1], nuna = vojSuprajxoj[k];
    if ( Math.hypot(antaŭa.x2 - nuna.x1, antaŭa.z2 - nuna.z1) > 0o1/0o10000 ) continue;
    // ⟨ ចន្លោះរន្ធភ្ជាប់ ៖ ចានគ្របដណ្តប់ទីនោះ 📃 ⟩
    if ( distoAlKunigo(nuna.x1, nuna.z1) <= VOJA_TRUA_DUONO * 0o2 ) continue;
    kalkulo++;
    const salto = Math.abs(nuna.y0 - antaŭa.y0);
    if ( salto > maks ) { maks = salto; maksLoko = k; }
  }
  // ⟨ ការចំណាំងក្រោមដី ៖ ផ្លូវមិនអាចកប់ក្នុងដី ។ 📃 ⟩
  const suproj: { y: number; x: number; z: number }[] = [];
  let maksBurial = 0, burialLoko: [ number, number ] | null = null;
  for ( const peco of vojSuprajxoj ) {
    // ⟨ ចានភ្ជាប់គ្របដណ្តប់ផ្លូវ ៖ ដូច្នេះមិនរាប់ទីនោះទេ 📃 ⟩
    if ( distoAlKunigo( peco.x1, peco.z1 ) <= VOJA_TRUA_DUONO * 0o2 ) continue;
    suproj.push({ y: peco.y0, x: ( peco.x1 + peco.x2 ) / 2, z: ( peco.z1 + peco.z2 ) / 2 });
    for ( const f of [ 0, 0o1/0o4, 0o1/0o2, 0o3/0o4, 1 ] ) {
      const px = peco.x1 + ( peco.x2 - peco.x1 ) * f;
      const pz = peco.z1 + ( peco.z2 - peco.z1 ) * f;
      const diferenco = alteco( px, pz ) - peco.y0;
      if ( diferenco > maksBurial ) { maksBurial = diferenco; burialLoko = [ px, pz ]; }
    }
  }
  const dipo = plejProfundaDipo(suproj);
  if ( maks > tutaMaks ) tutaMaks = maks;
  if ( maks > SALTO_LIMO ) difektaj++;
  if ( maksBurial > tutaBurial ) tutaBurial = maksBurial;
  if ( dipo && dipo.profundo > tutaDipo ) tutaDipo = dipo.profundo;
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
    ( maksBurial > 0o1/0o4 ? "  ⚠" : "" ) +
    ( dipo ? ` , រណ្តៅខ្លី ${dipo.profundo.toFixed(3)} @${dipo.x.toFixed(1)},${dipo.z.toFixed(1)}` : "" ) +
    ( dipo && dipo.profundo > DIP_LIMO ? "  ⚠" : "" ));
}

// ⟨ លទ្ធផលសង្ខេប 📃 ⟩
console.log(`ផ្លូវ ${provitaj} ( ស្ពាន ${pontoj} រំលង )` +
  ` , លោតខ្ពស់បំផុត ${tutaMaks.toFixed(3)}` +
  ` , លើសលីមីត ${difektaj}` +
  ` , ចំណាំងក្រោមដីបំផុត ${tutaBurial.toFixed(3)}` +
  ` , រណ្តៅខ្លីបំផុត ${tutaDipo.toFixed(3)}`);

// ⟨ ចានភ្ជាប់ ៖ ខ្ពស់ជាងផ្លូវដែលមកដល់តែមួយជំហានប៉ុណ្ណោះ ។ 📃 ⟩
vojSuprajxoj.length = 0;
konstruiVojojn(sceno,
  VOJOJ.filter(v => v.punktoj.length >= 2)
    .map(v => ( { pts: v.punktoj, w: v.larĝo / 2, kapoj: true } )),
  alteco, diorito, andezito, kunigajPunktoj,
  { akvaFn: akvaFino });
let plumboMaks = 0, plumboLoko = "";
for ( const [ kx, kz ] of kunigajPunktoj ) {
  const cxe = vojSuprajxoj.filter(p =>
    Math.hypot(( p.x1 + p.x2 ) / 2 - kx, ( p.z1 + p.z2 ) / 2 - kz) <= VOJA_TRUA_DUONO);
  const supro = Math.max(...cxe.map(p => p.y0), -Infinity);
  const diferenco = surGrid(supro) - supro;
  if ( diferenco > plumboMaks ) { plumboMaks = diferenco; plumboLoko = kx + "," + kz; }
}
console.log(`ចានភ្ជាប់ ${kunigajPunktoj.length} , ជំហានចុងក្រោយទៅចាន ${plumboMaks.toFixed(3)} @${plumboLoko}`);
