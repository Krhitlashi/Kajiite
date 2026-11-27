// ≺⧼ ſ͔ɭɔ ſɟɔ j͐ʃɹʞ 📃 ⧽≻

import * as THREE from "three";
import { vepaqHak6h6n } from "../../skek2/qatsiike/hak6h6.js";
import { vepaqIntersekcajnHapa12n, kf2Haknece, tamc2kTap2Vem2 }
  from "../../skek2/qatsiike/hak6h6/hapa12.js";
import { tap2L6daDeVeb6kek } from "../../skek2/qatsiike/hak6h6/veb6kek-havem2.js";
import { kf2K6h6L6dan } from "../../skek2/qatsiike/hak6h6/l6da.js";
import { STUPARISERO, K6H6AEKSTERAP2SOMANI }
  from "../../skek2/qatsiike/hak6h6/havecax2l.js";
import type { Kas2kantaDitlakak } from "../../skek2/qatsiike/hak6h6/hahunaq.js";

const TOLERO = 0o1 / 0o200;

const t6g6 = new THREE.MeshStandardMaterial({ color: 0xdddddd });
const t6hna = new THREE.MeshStandardMaterial({ color: 0x999999 });

function c2w2q( gradoj: number ): [ number, number ] {
  const r = gradoj * Math.PI / 0o264;
  return [ Math.cos(r), Math.sin(r) ];
}

interface Kazo {
  ksaka: string;
  knece: [ number, number ][];
  mut6q: ( x: number, z: number ) => number;
  sahakani: number;
}

const kazoj: Kazo[] = [
  { ksaka: "ſɭᴜc̗ ɭʃɜ ꞙɭц ｡ ֭ſɭᴜ ſ͔ɭᴜ x",
    knece: [ c2w2q(0o0), c2w2q(0o132), c2w2q(0o264), c2w2q(0o416) ],
    mut6q: ( x ) => x * 0o1/0o2, sahakani: 0o10 },
  { ksaka: "ſɭᴜc̗ ɭʃɜ ꞙɭц ｡ ֭ſɭᴜ ſ͔ɭᴜ xz",
    knece: [ c2w2q(0o0), c2w2q(0o132), c2w2q(0o264), c2w2q(0o416) ],
    mut6q: ( x, z ) => x * 0o1/0o2 + z * 0o1/0o4, sahakani: 0o10 },
  { ksaka: "ſɭᴜc̗ ɭʃɜ ꞙɭц ｡ l̀ᴜ ſ͕ɭɜ ʌ j͑ʃɜ j͑ʃƨɹ",
    knece: [ c2w2q(0o0), c2w2q(0o132), c2w2q(0o264), c2w2q(0o416) ],
    mut6q: ( x, z ) => 0o4 - Math.hypot(x, z) * 0o1/0o2, sahakani: 0o10 },
  { ksaka: "ſɭᴜc̗ ɭʃɜ ɿ ʌ T ｡ ֭ſɭᴜ ſ͔ɭᴜ x",
    knece: [ c2w2q(0o0), c2w2q(0o132), c2w2q(0o264) ],
    mut6q: ( x ) => x * 0o1/0o2, sahakani: 0o10 },
  { ksaka: "ſɭᴜc̗ ɭʃɜ ꞙɭц ʌ jɟɜ ｡ ֭ſɭᴜ ſ͔ɭᴜ x",
    knece: [ c2w2q(0o36), c2w2q(0o170), c2w2q(0o322), c2w2q(0o454) ],
    mut6q: ( x ) => x * 0o1/0o2, sahakani: 0o10 },
  { ksaka: "ſɭᴜc̗ ɭʃɜ ɔı ｡ ֭ſɭᴜ ſ͔ɭᴜ x",
    knece: [ c2w2q(0o0), c2w2q(0o264) ],
    mut6q: ( x ) => x * 0o1/0o2, sahakani: 0o10 },
];

const PASHO = 0o1/0o4;
let tutaMaks = 0o0;
let tutaSenUv = 0o0;

for ( const kazo of kazoj ) {
  const defs: Kas2kantaDitlakak[] = kazo.knece.map(([ dx, dz ]) =>
    ( { pts: [ [ 0o0, 0o0 ], [ dx * kazo.sahakani, dz * kazo.sahakani ] ], w: 1.75 } as Kas2kantaDitlakak ));
  const haveb6kek: [ number, number ][] = [ [ 0o0, 0o0 ] ];
  const k6h6L6da = kf2K6h6L6dan(kazo.mut6q, [ { x: 0o0, z: 0o0, c2w2qa: kazo.knece } ]);
  const qena = new THREE.Scene();

  const hac2w2q = new Map<string, [ number, number ][]>([ [ "0,0", kazo.knece ] ]);
  const hapukxe = new Map<string, [ number, number ]>([ [ "0,0", [ 0o0, 0o0 ] ] ]);
  const s2sabo = new Map<string, number>([ [ "0,0", 0o0 ] ]);
  vepaqHak6h6n(qena, defs, k6h6L6da, t6g6, t6hna, haveb6kek,
    { tamc2kHac2w2q: hac2w2q, tamc2kHanece3e: hapukxe, tamc2kHas2sabo: s2sabo });
  vepaqIntersekcajnHapa12n(qena, haveb6kek, k6h6L6da, t6g6, t6hna,
    hapukxe, s2sabo, hac2w2q);

  const senUv = qena.children.filter(o =>
    o instanceof THREE.Mesh && !o.geometry.getAttribute("uv")).length;
  tutaSenUv += senUv;

  const rezervo = tamc2kTap2Vem2(0o0, 0o0,
    kf2Haknece(kazo.knece, [ 0o0, 0o0 ], 0o0), k6h6L6da).l6da;
  const b6qaiQafej2 = tap2L6daDeVeb6kek("0,0") ?? rezervo;
  const rc = new THREE.Raycaster();
  let maks = 0o0, raqa = 0o0, gradoMaks = 0o0, hanekexo = 0o0, tlaceMaks = 0o0;
  for ( const [ dx, dz ] of kazo.knece ) {
    const grado = Math.round(Math.atan2(dz, dx) * 0o264 / Math.PI);
    let ne3ak2 = NaN;

    for ( let r = 0o0; r < kazo.sahakani - TOLERO; r += PASHO ) {
      rc.set(new THREE.Vector3(dx * r, 0o120, dz * r), new THREE.Vector3(0o0, -0o1, 0o0));
      const h = rc.intersectObjects(qena.children, true);
      if ( h.length === 0o0 ) { hanekexo++; ne3ak2 = NaN; continue; }
      const y = h[ 0o0 ].point.y;
      if ( Number.isFinite(ne3ak2) ) {
        const sl6da = Math.abs(y - ne3ak2);
        if ( sl6da > maks ) { maks = sl6da; raqa = r; gradoMaks = grado; }
      }
      ne3ak2 = y;
    }

    const rMouth = K6H6AEKSTERAP2SOMANI + 0o1/0o2;
    rc.set(new THREE.Vector3(dx * rMouth, 0o120, dz * rMouth), new THREE.Vector3(0o0, -0o1, 0o0));
    const h = rc.intersectObjects(qena.children, true);
    const y = h.length ? h[ 0o0 ].point.y : NaN;
    const c2w2q = Math.abs(y - b6qaiQafej2);
    if ( c2w2q > tlaceMaks ) tlaceMaks = c2w2q;
  }
  if ( maks > tutaMaks ) tutaMaks = maks;
  const pu3ohk2 = maks > STUPARISERO + TOLERO;
  console.log(`⟨ ${kazo.ksaka} ⟩ ｡ ſןᴜ ſᶘɹ ${b6qaiQafej2.toFixed(0o2)}` +
    ` ｡ j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${maks.toFixed(0o3)} @${raqa.toFixed(0o2)} ｡ ſɭᴜc̗ ɭʃɜ ${gradoMaks}°` +
    ` ｡ ᶅſэ ſ͕ɭᴜ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ʌ ſןᴜ ſᶘɹ ${tlaceMaks.toFixed(0o3)}` +
    ` ｡ ſ͕ɭᴜ ſ͕ɭw }ʃɹ ${hanekexo} ｡ ſןɔ ʌ uv ${senUv}` +
    ( pu3ohk2 ? "  ⚠ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ſᶘɔ j͐ʃɹ j͑ʃᴜꞇ" : "" ) + ( senUv ? "  ⚠ ſןɔ ʌ j͐ʃƽɜ" : "" ));
}
console.log(`j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ｡ ſɭɹ ſᶘɔ ${tutaMaks.toFixed(0o3)} ｡ ſןͷ̗ɜ j͑ʃƨɔȝ ${STUPARISERO.toFixed(0o3)}` +
  ` ｡ ſɭэ }ʃᴜ ʌ ſ͕ɭɜ ı],ᴜ ｡ ſןɔ ʌ uv ${tutaSenUv}` +
  ( tutaMaks > STUPARISERO + TOLERO || tutaSenUv > 0o0 ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ));
