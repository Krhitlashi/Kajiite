// ≺⧼ ការវាស់កម្ពស់ចំណត 🧪 ⧽≻
import * as THREE from "three";
import { konstruiDokon } from "../../eskekoj/medio/doko.js";
import { kreiStuparanAlton, kreiStuparajnPunktojn,
  STUPA_RISERO_DOKA } from "../../eskekoj/medio/doko/stuparo.js";
import { konstruiVojojn } from "../../eskekoj/medio/vojoj.js";
import { vojSuprajxoj } from "../../eskekoj/medio/vojoj/tipoj.js";
import { aktivajVojoj, aktivajDokoj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco, akvaNivelo } from "../../kantaoj/mondo/tereno.js";
import { troviVojaRetajnKunigojn } from "../../eskekoj/medio/voj-reto.js";
import { plataAltoj, vojaSuproDeKunigo } from "../../eskekoj/medio/vojoj/formoj.js";
import { kreiDioritanMaterialon, kreiAndezitanMaterialon } from "../../eskekoj/komunajxoj/materialoj.js";
import { VOJA_EKSTERA_DUONO, KORNA_R, VOJA_BORDA_LARĜO,
  VOJA_SUPRO_LEVIGXO } from "../../eskekoj/medio/vojoj/mezuroj.js";

const sceno = new THREE.Scene();
const diorito = kreiDioritanMaterialon(new THREE.Texture());
const andezito = kreiAndezitanMaterialon(new THREE.Texture());
const DOKOJ = aktivajDokoj();
const VOJOJ = aktivajVojoj();
const retaj = VOJOJ.filter(v => v.punktoj.length >= 2).map(v => ({ punktoj: v.punktoj, larĝo: v.larĝo }));
const kunigoj = troviVojaRetajnKunigojn(retaj, DOKOJ);

// ⟨ ដូច urbo.ts ៖ កម្ពស់ចានភ្ជាប់ 📃 ⟩
function vojaSupro( x: number, z: number, larĝo: number ): number {
  const duon = larĝo / 4 + VOJA_BORDA_LARĜO;
  let maks = alteco(x, z);
  for ( let i = 0; i < 0o10; i++ ) {
    const ang = i * Math.PI / 4;
    maks = Math.max(maks, alteco(x + Math.cos(ang) * duon, z + Math.sin(ang) * duon));
  }
  return maks + VOJA_SUPRO_LEVIGXO;
}
function pontaFinAlto( x: number, z: number, larĝo: number ): number {
  let plejProksima = null, plejMallonga = Infinity;
  for ( const k of kunigoj ) {
    const d = Math.hypot(k.x - x, k.z - z);
    if ( d < plejMallonga ) { plejMallonga = d; plejProksima = k; }
  }
  if ( plejProksima && plejMallonga < VOJA_EKSTERA_DUONO + KORNA_R )
    return vojaSuproDeKunigo(plejProksima.x, plejProksima.z, plejProksima.direktaj,
      VOJA_EKSTERA_DUONO, alteco).supro;
  return vojaSupro(x, z, larĝo);
}

for ( const d of DOKOJ ) {
  const rot = d.rotacio ?? 0;
  const doko = konstruiDokon(sceno, d.x, d.z, rot, alteco, akvaNivelo, d.profundo);
  const sinR = Math.sin(rot), cosR = Math.cos(rot);
  const landaX = d.x + sinR * ( d.profundo / 2 );
  const landaZ = d.z + cosR * ( d.profundo / 2 );
  console.log("\n<( doko " + d.x.toFixed(2) + ", " + d.z.toFixed(2) + " )>", {
    punktoj: doko.stuparajPunktoj.length,
    platformY: +doko.platformY.toFixed(4),
    landejaY: +doko.landejaY.toFixed(4),
    akvo: +akvaNivelo(d.x, d.z).toFixed(4),
  });
  if ( doko.stuparajPunktoj.length < 2 ) continue;
  const starto = pontaFinAlto(landaX, landaZ, doko.platformWidth);
  const falto = starto - doko.landejaY;
  const nombro = Math.max(1, Math.round(falto / STUPA_RISERO_DOKA));
  const risero = falto / nombro;
  const punktoj = kreiStuparajnPunktojn(doko.stuparajPunktoj[0], doko.stuparajPunktoj[1], nombro);
  const trunko = Math.hypot(punktoj[0][0] - punktoj[nombro][0], punktoj[0][1] - punktoj[nombro][1]);
  console.log("  starto " + starto.toFixed(4) + " , falto " + falto.toFixed(4) +
    " , nombro " + nombro + " , risero " + risero.toFixed(5) +
    " , paso " + ( trunko / nombro ).toFixed(5) );
  vojSuprajxoj.length = 0;
  konstruiVojojn(sceno, [ { pts: punktoj, w: doko.platformWidth, stuparo: true,
    stuparaRisero: risero,
    heightFn: kreiStuparanAlton(punktoj, starto - VOJA_SUPRO_LEVIGXO, risero) } ],
    alteco, diorito, andezito, []);
  const surfacoj = vojSuprajxoj.map(s => s.y0);
  const saltoj: number[] = [];
  for ( let i = 1; i < surfacoj.length; i++ ) saltoj.push(surfacoj[i] - surfacoj[i - 1]);
  console.log("  ជំហាន " + surfacoj.length + " , លើគេ " + surfacoj[0].toFixed(4) +
    " , ក្រោមគេ " + surfacoj[surfacoj.length - 1].toFixed(4) +
    " , ចន្លោះដល់ចំណត " + ( surfacoj[surfacoj.length - 1] - doko.landejaY ).toFixed(4));
  console.log("  សល្តូត " + [ ...new Set(saltoj.map(s => s.toFixed(5))) ].join(" , ") );
  // ⟨ ជាមួយរន្ធភ្ជាប់ពិត ៖ ចានភ្ជាប់កាត់ជំហានខាងលើឬអត់ 📃 ⟩
  vojSuprajxoj.length = 0;
  konstruiVojojn(sceno, [ { pts: punktoj, w: doko.platformWidth, stuparo: true,
    stuparaRisero: risero,
    heightFn: kreiStuparanAlton(punktoj, starto - VOJA_SUPRO_LEVIGXO, risero) } ],
    alteco, diorito, andezito, kunigoj.map(k => [ k.x, k.z ] as [ number, number ]));
  const kunSurfacoj = vojSuprajxoj.map(s => s.y0);
  console.log("  ជាមួយរន្ធ " + kunSurfacoj.length + " , លើគេ " +
    kunSurfacoj[0]?.toFixed(4) + " , ក្រោមគេ " +
    kunSurfacoj[kunSurfacoj.length - 1]?.toFixed(4));
  const kunSaltoj: number[] = [];
  for ( let i = 1; i < kunSurfacoj.length; i++ ) kunSaltoj.push(kunSurfacoj[i] - kunSurfacoj[i - 1]);
  console.log("  សល្តូតរន្ធ " + [ ...new Set(kunSaltoj.map(s => s.toFixed(5))) ].join(" , "));
}
