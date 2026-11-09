// ≺⧼ កម្រិតនៅចំណុចប្រសព្វក្រឡា 🔬 ⧽≻
// ⟨ បង្ហាញកម្ពស់វាល , ចានភ្ជាប់ , ដី , កម្រិតផ្លូវជិតចំណុចមួយ ,
// និងកម្ពស់ផ្ទៃពិតតាមកាំរស្មី ។ ដើម្បីដឹងថាជញ្ជាំងមកពីចានទាប ឬផ្លូវខ្ពស់ ។ 📃 ⟩
import * as THREE from "three";
import { konstruiKradanUrbon } from "../../kantaoj/mondo/urbo/krada-urbo.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { kreiVojoAlton } from "../../eskekoj/medio/vojoj/alto.js";
import { kreiNivelanProfilon } from "../../eskekoj/medio/vojoj/niveloj.js";
import { konstruiVojojn } from "../../eskekoj/medio/vojoj.js";
import { konstruiIntersekcajnPlatojn } from "../../eskekoj/medio/vojoj/platoj.js";
import { vojaSuproDeKunigo } from "../../eskekoj/medio/vojoj/formoj.js";
import { kreiEksteranDuonon } from "../../eskekoj/medio/vojoj/segmentoj.js";
import { kreiVojajnBendojn } from "../../eskekoj/medio/vojoj/bufroj.js";
import { kreiDioritanMaterialon,
  kreiAndezitanMaterialon } from "../../eskekoj/komunajxoj/materialoj.js";
import { VOJA_EKSTERA_DUONO, VOJA_TRUA_DUONO, surGrid } from "../../eskekoj/medio/vojoj/mezuroj.js";

const sceno = new THREE.Scene();
const materialo = new THREE.MeshStandardMaterial();
const urbo = konstruiKradanUrbon(sceno, { arangxaGrando: 3, blokaGrando: "unu" },
  [ 0, 0 ], materialo);
const kunigoj = urbo.kunigajPunktoj.map(([ x, z ]) => {
  const fermita = urbo.kunigajFermitaj.get(x + "," + z);
  return { x, z, direktaj: fermita ? [ fermita ] : [] };
});
const vojoAlteco = kreiVojoAlton(alteco, kunigoj);
const diorito = kreiDioritanMaterialon(new THREE.Texture());
const andezito = kreiAndezitanMaterialon(new THREE.Texture());
konstruiVojojn(sceno, urbo.vojDifinoj, vojoAlteco, diorito, andezito,
  urbo.kunigajPunktoj, {});
konstruiIntersekcajnPlatojn(sceno, urbo.kunigajPunktoj, vojoAlteco, diorito, andezito,
  urbo.kunigajFermitaj);
const rc = new THREE.Raycaster();

for ( const celo of [ [ 0o24, -0o154 ], [ 0o104, -0o204 ] ] ) {
  const [ cx, cz ] = celo;
  const klavo = cx + "," + cz;
  const fermita = urbo.kunigajFermitaj.get(klavo);
  const plato = surGrid(vojaSuproDeKunigo(cx, cz, fermita ? [ fermita ] : [],
    VOJA_EKSTERA_DUONO, vojoAlteco).supro);
  console.log(`⟨ ( ${cx}, ${cz} ) ⟩ បិទ ${JSON.stringify(fermita)}` +
    ` , វាល ${vojoAlteco(cx, cz).toFixed(3)} , ចាន ${plato.toFixed(3)}` +
    ` , ដី ${alteco(cx, cz).toFixed(3)}`);
  for ( const [ nomo, ux, uz ] of [ [ "កើត", 1, 0 ], [ "លិច", -1, 0 ],
    [ "ជើង", 0, -1 ], [ "ត្បូង", 0, 1 ] ] as const ) {
    const vicoj: string[] = [];
    for ( let r = 0; r <= 6; r += 0.5 ) {
      rc.set(new THREE.Vector3(cx + ux * r, 0o120, cz + uz * r), new THREE.Vector3(0, -1, 0));
      const h = rc.intersectObjects(sceno.children, true).find(x => x.object.visible);
      vicoj.push(`${r}:${h ? h.point.y.toFixed(2) : "-"}`);
    }
    console.log(`  ${nomo} ៖ ${vicoj.join(" ")}`);
  }
  // ⟨ ផ្លូវដែលឆ្លងកាត់ជិតចំណុចនេះ 📃 ⟩
  for ( const d of urbo.vojDifinoj ) {
    for ( let k = 0; k < d.pts.length - 1; k++ ) {
      const [ ax, az ] = d.pts[k], [ bx, bz ] = d.pts[k + 1];
      const dx = bx - ax, dz = bz - az;
      const longo = Math.hypot(dx, dz);
      const t = Math.max(0, Math.min(1, ( ( cx - ax ) * dx + ( cz - az ) * dz ) / ( longo * longo )));
      const px = ax + dx * t, pz = az + dz * t;
      const dist = Math.hypot(cx - px, cz - pz);
      if ( dist > VOJA_TRUA_DUONO ) continue;
      const bendoj = kreiVojajnBendojn(d.w, diorito, andezito);
      const ekstera = kreiEksteranDuonon(bendoj);
      const profilo = kreiNivelanProfilon(d.pts as [ number, number ][], ekstera, vojoAlteco);
      const s = t * longo;
      console.log(`  ផ្លូវ ( ${ax},${az} ) ំ ( ${bx},${bz} ) ឆ្លងកាត់ ${dist.toFixed(2)}` +
        ` ស ${s.toFixed(2)} កម្រិត ${profilo.altoCxe(s).toFixed(2)}` +
        ` គោល ${profilo.celoj[ Math.round(s / ( profilo.longo /
          Math.max(1, Math.ceil(profilo.longo / 0.5)) ) ) ].toFixed(2)}` +
        ` កន្លែងកាត់ ${profilo.altoCxe(Math.max(0, s - VOJA_TRUA_DUONO)).toFixed(2)}` +
        `/${profilo.altoCxe(Math.min(profilo.longo, s + VOJA_TRUA_DUONO)).toFixed(2)}`);
    }
  }
}
