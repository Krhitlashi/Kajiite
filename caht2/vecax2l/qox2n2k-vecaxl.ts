// ≺⧼ ſ͕ɭɜ ı],ɹ }ʃɹƽ ʌ j͑ʃ'ɔ ſɟᴜᶗ‹ͷ̗ 📃 ⧽≻

import * as THREE from "three";
import { vepaqQox2n2kKaxten } from "../../kanta/nala/kaxte/qox2n2k-kaxte.js";
import { l6da } from "../../kanta/nala/mut6q-soza.js";
import { kf2K6h6L6dan } from "../../skek2/qa12ke/hak6h6/l6da.js";
import { kf2NivelanS2qena } from "../../skek2/qa12ke/hak6h6/havem2.js";
import { vepaqHak6h6n } from "../../skek2/qa12ke/hak6h6.js";
import { vepaqIntersekcajnHapa12n } from "../../skek2/qa12ke/hak6h6/hapa12.js";
import { k6h6TeruDeVeb6kek } from "../../skek2/qa12ke/hak6h6/haqoxa.js";
import { kf2EksteranP2somani } from "../../skek2/qa12ke/hak6h6/has2nasce.js";
import { kf2K6h6jnBendojn } from "../../skek2/qa12ke/hak6h6/habakawe-katoma.js";
import { kf2T6g6Pukek,
  kf2T6hnaPukek } from "../../skek2/p6kpu/pukek.js";
import { K6H6AEKSTERAP2SOMANI, K6H6ATRUAP2SOMANI, surGrid } from "../../skek2/qa12ke/hak6h6/havecax2l.js";

const qena = new THREE.Scene();
const pukek = new THREE.MeshStandardMaterial();
const kaxte = vepaqQox2n2kKaxten(qena, { ptaluPal6: 0o3, k6liqPal6: "vakox2qita" },
  [ 0o0, 0o0 ], pukek);
const haveb6kek = kaxte.tamc2kHan2k.map(([ x, z ]) => {
  const nece3e = kaxte.tamc2kHanece3e.get(x + "," + z);
  return { x, z, c2w2qa: nece3e ? [ nece3e ] : [] };
});
const k6h6L6da = kf2K6h6L6dan(l6da, haveb6kek);
const t6g6 = kf2T6g6Pukek(new THREE.Texture());
const t6hna = kf2T6hnaPukek(new THREE.Texture());
vepaqHak6h6n(qena, kaxte.kas2kantaHavop2ni, k6h6L6da, t6g6, t6hna,
  kaxte.tamc2kHan2k, {});
vepaqIntersekcajnHapa12n(qena, kaxte.tamc2kHan2k, k6h6L6da, t6g6, t6hna,
  kaxte.tamc2kHanece3e);
const rc = new THREE.Raycaster();

for ( const natakatomasai of [ [ 0o24, -0o154 ], [ 0o104, -0o204 ] ] ) {
  const [ cx, cz ] = natakatomasai;
  const ca3aq = cx + "," + cz;
  const nece3e = kaxte.tamc2kHanece3e.get(ca3aq);
  const b6qaiQafej2 = surGrid(k6h6TeruDeVeb6kek(cx, cz, nece3e ? [ nece3e ] : [],
    K6H6AEKSTERAP2SOMANI, k6h6L6da).hateru);
  console.log(`⟨ ( ${cx}, ${cz} ) ⟩ ｡ ſןw ſɭᶗ‹ɔ ${JSON.stringify(nece3e)}` +
    ` ｡ ᶅſɔ ɽ͑ʃ'ɔ ${k6h6L6da(cx, cz).toFixed(0o3)} ｡ ſןᴜ ſᶘɹ ${b6qaiQafej2.toFixed(0o3)}` +
    ` ｡ ſɭɜ ſɭ,w ${l6da(cx, cz).toFixed(0o3)}`);
  for ( const [ ksaka, ux, uz ] of [ [ "ſɟɹ ᶅſɹȝ ɔ", 0o1, 0o0 ], [ "ſɟɹ ᶅſɹȝ ı", -0o1, 0o0 ],
    [ "ſɟɹ ᶅſɹȝ ɿ", 0o0, -0o1 ], [ "ſɟɹ ᶅſɹȝ ц", 0o0, 0o1 ] ] as const ) {
    const hax2pa: string[] = [];
    for ( let r = 0o0; r <= 0o6; r += (0o1/0o2) ) {
      rc.set(new THREE.Vector3(cx + ux * r, 0o120, cz + uz * r), new THREE.Vector3(0o0, -0o1, 0o0));
      const h = rc.intersectObjects(qena.children, true).find(x => x.object.visible);
      hax2pa.push(`${r}:${h ? h.point.y.toFixed(0o2) : "-"}`);
    }
    console.log(`  ${ksaka} ｡ ${hax2pa.join(" ")}`);
  }

  for ( const d of kaxte.kas2kantaHavop2ni ) {
    for ( let k = 0o0; k < d.pts.length - 0o1; k++ ) {
      const [ ax, az ] = d.pts[k], [ bx, bz ] = d.pts[k + 0o1];
      const dx = bx - ax, dz = bz - az;
      const sahakani = Math.hypot(dx, dz);
      const t = Math.max(0o0, Math.min(0o1, ( ( cx - ax ) * dx + ( cz - az ) * dz ) / ( sahakani * sahakani )));
      const px = ax + dx * t, pz = az + dz * t;
      const dist = Math.hypot(cx - px, cz - pz);
      if ( dist > K6H6ATRUAP2SOMANI ) continue;
      const hasiitsii = kf2K6h6jnBendojn(d.w, t6g6, t6hna);
      const ekstera = kf2EksteranP2somani(hasiitsii);
      const s2qena = kf2NivelanS2qena(d.pts as [ number, number ][], ekstera, k6h6L6da);
      const s = t * sahakani;
      console.log(`  ſɭэ ֭ſɭэ ( ${ax},${az} ) ｡ ( ${bx},${bz} ) ｡ ſɭᴜc̗ ɭʃɜ ${dist.toFixed(0o2)}` +
        ` ｡ s ${s.toFixed(0o2)} ｡ j͑ʃ'ɔ ŋᷠɹ ${s2qena.l6daJe(s).toFixed(0o2)}` +
        ` ｡ ſɭэ ᶗ‹ ${s2qena.hakxawa[ Math.round(s / ( s2qena.sahakani /
          Math.max(0o1, Math.ceil(s2qena.sahakani / (0o1/0o2))) ) ) ].toFixed(0o2)}` +
        ` ｡ j͑ʃɜ j͑ʃᴜ ʌ jɐ ɭʃᴜ ${s2qena.l6daJe(Math.max(0o0, s - K6H6ATRUAP2SOMANI)).toFixed(0o2)}` +
        `/${s2qena.l6daJe(Math.min(s2qena.sahakani, s + K6H6ATRUAP2SOMANI)).toFixed(0o2)}`);
    }
  }
}
