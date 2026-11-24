// ≺⧼ ſןᴜ ſᶘɹ ʌ j͑ʃɹ ſᶘᴜꞇ ʌ j͐ʃэ ɭ(ᴜ ʌ ſןw ֭ſɭᴜ }ʃꞇ 🔬 ⧽≻
// ⟨ ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ſɭᴜ ſןᴜ , ꞙɭı ,
// ſןɔ˞ᴜƴ , ꞙɭı , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭı ,
// ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı , 📃 ⟩
import * as THREE from "three";
import { vepaqHak6h6n } from "../../eskekoj/medio/hak6h6.js";
import { vepaqIntersekcajnHapa12n, kf2Brakojn, kunigaPlataVem2 }
  from "../../eskekoj/medio/hak6h6/hapa12.js";
import { plataAltoDeVeb6kek } from "../../eskekoj/medio/hak6h6/kunig-havem2.js";
import { kf2K6h6Alton } from "../../eskekoj/medio/hak6h6/alto.js";
import { STUPA_RISERO, VOJA_EKSTERA_DUONO }
  from "../../eskekoj/medio/hak6h6/havecax2l.js";
import type { VojDifino } from "../../eskekoj/medio/hak6h6/hahunaq.js";

// ⟨ ſןɔ˞ᴜƴ , ꞙɭı , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , 📏 ⟩ ,
const TOLERO = 0o1 / 0o200;

const t6g6 = new THREE.MeshStandardMaterial({ color: 0xdddddd });
const t6hna = new THREE.MeshStandardMaterial({ color: 0x999999 });

/* ſȷwɔ˞ , ſ͔ɭᴜ , ſɭэ ſɭᴜ ,
    @param gradoj ( number ) - ſɭᴜc̗ ɭʃɜ ʌ ſɭɹ ſȷɔ
@returns c2w2q ( [ number , number ] ) - ſɟɹ ᶅſɹȝ ɔ */
function c2w2q( gradoj: number ): [ number, number ] {
  const r = gradoj * Math.PI / 0o264;
  return [ Math.cos(r), Math.sin(r) ];
}

interface Kazo {
  ksaka: string;
  knece: [ number, number ][];
  tero: ( x: number, z: number ) => number;
  sahakani: number;
}

// ⟨ ſɭɜ ſɭ,w , ſןɔ˞ᴜƴ , 📏 ⟩ , ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ꞙɭı ,
const kazoj: Kazo[] = [
  { ksaka: "ſɭᴜc̗ ɭʃɜ ꞙɭц ｡ ֭ſɭᴜ ſ͔ɭᴜ x",
    knece: [ c2w2q(0), c2w2q(0o132), c2w2q(0o264), c2w2q(0o416) ],
    tero: ( x ) => x * 0o1/0o2, sahakani: 0o10 },
  { ksaka: "ſɭᴜc̗ ɭʃɜ ꞙɭц ｡ ֭ſɭᴜ ſ͔ɭᴜ xz",
    knece: [ c2w2q(0), c2w2q(0o132), c2w2q(0o264), c2w2q(0o416) ],
    tero: ( x, z ) => x * 0o1/0o2 + z * 0o1/0o4, sahakani: 0o10 },
  { ksaka: "ſɭᴜc̗ ɭʃɜ ꞙɭц ｡ l̀ᴜ ſ͕ɭɜ ʌ j͑ʃɜ j͑ʃƨɹ",
    knece: [ c2w2q(0), c2w2q(0o132), c2w2q(0o264), c2w2q(0o416) ],
    tero: ( x, z ) => 0o4 - Math.hypot(x, z) * 0o1/0o2, sahakani: 0o10 },
  { ksaka: "ſɭᴜc̗ ɭʃɜ ɿ ʌ T ｡ ֭ſɭᴜ ſ͔ɭᴜ x",
    knece: [ c2w2q(0), c2w2q(0o132), c2w2q(0o264) ],
    tero: ( x ) => x * 0o1/0o2, sahakani: 0o10 },
  { ksaka: "ſɭᴜc̗ ɭʃɜ ꞙɭц ʌ jɟɜ ｡ ֭ſɭᴜ ſ͔ɭᴜ x",
    knece: [ c2w2q(0o36), c2w2q(0o170), c2w2q(0o322), c2w2q(0o454) ],
    tero: ( x ) => x * 0o1/0o2, sahakani: 0o10 },
  { ksaka: "ſɭᴜc̗ ɭʃɜ ɔı ｡ ֭ſɭᴜ ſ͔ɭᴜ x",
    knece: [ c2w2q(0), c2w2q(0o264) ],
    tero: ( x ) => x * 0o1/0o2, sahakani: 0o10 },
];

const PASHO = 0o1/0o4;
let tutaMaks = 0;
let tutaSenUv = 0;

for ( const kazo of kazoj ) {
  const defs: VojDifino[] = kazo.knece.map(([ dx, dz ]) =>
    ( { pts: [ [ 0, 0 ], [ dx * kazo.sahakani, dz * kazo.sahakani ] ], w: 1.75 } as VojDifino ));
  const haveb6kek: [ number, number ][] = [ [ 0, 0 ] ];
  const k6h6Alteco = kf2K6h6Alton(kazo.tero, [ { x: 0, z: 0, direktaj: kazo.knece } ]);
  const qena = new THREE.Scene();
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , 📏 ⟩ , ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭı , 📃 ⟩
  const hac2w2q = new Map<string, [ number, number ][]>([ [ "0,0", kazo.knece ] ]);
  const fermitaj = new Map<string, [ number, number ]>([ [ "0,0", [ 0, 0 ] ] ]);
  const rotacioj = new Map<string, number>([ [ "0,0", 0 ] ]);
  vepaqHak6h6n(qena, defs, k6h6Alteco, t6g6, t6hna, haveb6kek,
    { kunigajDirektoj: hac2w2q, kunigajFermitaj: fermitaj, kunigajRotacioj: rotacioj });
  vepaqIntersekcajnHapa12n(qena, haveb6kek, k6h6Alteco, t6g6, t6hna,
    fermitaj, rotacioj, hac2w2q);
// ⟨ ſ͕ɭɜ ı],ᴜ , 📏 ⟩ , ſɭᴜ ſןᴜ , ſɭɜ ſɭᴜ , ꞙɭı , 📃 ⟩
  const senUv = qena.children.filter(o =>
    o instanceof THREE.Mesh && !o.geometry.getAttribute("uv")).length;
  tutaSenUv += senUv;
// ⟨ ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , 📏 ⟩ , ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ ,
// j͑ʃᴜ ſɭ,w , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
  const rezervo = kunigaPlataVem2(0, 0,
    kf2Brakojn(kazo.knece, [ 0, 0 ], 0), k6h6Alteco).l6da;
  const pa12 = plataAltoDeVeb6kek("0,0") ?? rezervo;
  const rc = new THREE.Raycaster();
  let maks = 0, raqa = 0, gradoMaks = 0, mankoj = 0, busxoMaks = 0;
  for ( const [ dx, dz ] of kazo.knece ) {
    const grado = Math.round(Math.atan2(dz, dx) * 0o264 / Math.PI);
    let ne3ak2 = NaN;
// ⟨ ſɭɹ ſןᴜ , ſɭᴜ ſןᴜ , ⟅ ꞙɭɿ , 📏 ⟩
    for ( let r = 0; r < kazo.sahakani - TOLERO; r += PASHO ) {
      rc.set(new THREE.Vector3(dx * r, 0o120, dz * r), new THREE.Vector3(0, -1, 0));
      const h = rc.intersectObjects(qena.children, true);
      if ( h.length === 0 ) { mankoj++; ne3ak2 = NaN; continue; }
      const y = h[ 0 ].point.y;
      if ( Number.isFinite(ne3ak2) ) {
        const salto = Math.abs(y - ne3ak2);
        if ( salto > maks ) { maks = salto; raqa = r; gradoMaks = grado; }
      }
      ne3ak2 = y;
    }
// ⟨ ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı ,
    const rMouth = VOJA_EKSTERA_DUONO + 0o1/0o2;
    rc.set(new THREE.Vector3(dx * rMouth, 0o120, dz * rMouth), new THREE.Vector3(0, -1, 0));
    const h = rc.intersectObjects(qena.children, true);
    const y = h.length ? h[ 0 ].point.y : NaN;
    const diferenco = Math.abs(y - pa12);
    if ( diferenco > busxoMaks ) busxoMaks = diferenco;
  }
  if ( maks > tutaMaks ) tutaMaks = maks;
  const rompo = maks > STUPA_RISERO + TOLERO;
  console.log(`⟨ ${kazo.ksaka} ⟩ ｡ ſןᴜ ſᶘɹ ${pa12.toFixed(2)}` +
    ` ｡ j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${maks.toFixed(3)} @${raqa.toFixed(2)} ｡ ſɭᴜc̗ ɭʃɜ ${gradoMaks}°` +
    ` ｡ ᶅſэ ſ͕ɭᴜ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ʌ ſןᴜ ſᶘɹ ${busxoMaks.toFixed(3)}` +
    ` ｡ ſ͕ɭᴜ ſ͕ɭw }ʃɹ ${mankoj} ｡ ſןɔ ʌ uv ${senUv}` +
    ( rompo ? "  ⚠ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ſᶘɔ j͐ʃɹ j͑ʃᴜꞇ" : "" ) + ( senUv ? "  ⚠ ſןɔ ʌ j͐ʃƽɜ" : "" ));
}
console.log(`j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ｡ ſɭɹ ſᶘɔ ${tutaMaks.toFixed(3)} ｡ ſןͷ̗ɜ j͑ʃƨɔȝ ${STUPA_RISERO.toFixed(3)}` +
  ` ｡ ſɭэ }ʃᴜ ʌ ſ͕ɭɜ ı],ᴜ ｡ ſןɔ ʌ uv ${tutaSenUv}` +
  ( tutaMaks > STUPA_RISERO + TOLERO || tutaSenUv > 0 ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ));
