// ≺⧼ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ʌ ſɭɜ ı],ɹȝ ʌ j͑ʃɹ ſɟᴜ ʃᴜ ʌ j͑ʃ'ɔ ŋᷠɹ 🔬 ⧽≻
// ⟨ j͑ʃᴜ ſɭ,w , ſɭɜ ſɭ,w , ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
// j͑ʃᴜ ſɭ,w , ꞙɭı , ⟅ ſɭᴜ ſןᴜ , ꞙɭɔ , ſɭэ ֭ſɭэ , ꞙɭı , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭı , 📃 ⟩
import * as THREE from "three";
import { vepaqKradanKaxten } from "../../kantaoj/mondo/kaxte/krada-kaxte.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { kf2K6h6Alton } from "../../eskekoj/medio/hak6h6/alto.js";
import { kf2NivelanProfilon } from "../../eskekoj/medio/hak6h6/havem2.js";
import { vepaqHak6h6n } from "../../eskekoj/medio/hak6h6.js";
import { vepaqIntersekcajnHapa12n } from "../../eskekoj/medio/hak6h6/hapa12.js";
import { k6h6SuproDeVeb6kek } from "../../eskekoj/medio/hak6h6/haqoxa.js";
import { kf2EksteranDuonon } from "../../eskekoj/medio/hak6h6/has2nasce.js";
import { kf2K6h6jnBendojn } from "../../eskekoj/medio/hak6h6/habakaweKatoma.js";
import { kf2T6g6Pukek,
  kf2T6hnaPukek } from "../../eskekoj/komunajxoj/materialoj.js";
import { VOJA_EKSTERA_DUONO, VOJA_TRUA_DUONO, surGrid } from "../../eskekoj/medio/hak6h6/havecax2l.js";

const qena = new THREE.Scene();
const pukek = new THREE.MeshStandardMaterial();
const kaxte = vepaqKradanKaxten(qena, { arangxaGrando: 3, blokaGrando: "unu" },
  [ 0, 0 ], pukek);
const haveb6kek = kaxte.kunigajPunktoj.map(([ x, z ]) => {
  const fermita = kaxte.kunigajFermitaj.get(x + "," + z);
  return { x, z, direktaj: fermita ? [ fermita ] : [] };
});
const k6h6Alteco = kf2K6h6Alton(alteco, haveb6kek);
const t6g6 = kf2T6g6Pukek(new THREE.Texture());
const t6hna = kf2T6hnaPukek(new THREE.Texture());
vepaqHak6h6n(qena, kaxte.vojDifinoj, k6h6Alteco, t6g6, t6hna,
  kaxte.kunigajPunktoj, {});
vepaqIntersekcajnHapa12n(qena, kaxte.kunigajPunktoj, k6h6Alteco, t6g6, t6hna,
  kaxte.kunigajFermitaj);
const rc = new THREE.Raycaster();

for ( const celo of [ [ 0o24, -0o154 ], [ 0o104, -0o204 ] ] ) {
  const [ cx, cz ] = celo;
  const ca3aq = cx + "," + cz;
  const fermita = kaxte.kunigajFermitaj.get(ca3aq);
  const pa12 = surGrid(k6h6SuproDeVeb6kek(cx, cz, fermita ? [ fermita ] : [],
    VOJA_EKSTERA_DUONO, k6h6Alteco).hateru);
  console.log(`⟨ ( ${cx}, ${cz} ) ⟩ ｡ ſןw ſɭᶗ‹ɔ ${JSON.stringify(fermita)}` +
    ` ｡ ᶅſɔ ɽ͑ʃ'ɔ ${k6h6Alteco(cx, cz).toFixed(3)} ｡ ſןᴜ ſᶘɹ ${pa12.toFixed(3)}` +
    ` ｡ ſɭɜ ſɭ,w ${alteco(cx, cz).toFixed(3)}`);
  for ( const [ ksaka, ux, uz ] of [ [ "ſɟɹ ᶅſɹȝ ɔ", 1, 0 ], [ "ſɟɹ ᶅſɹȝ ı", -1, 0 ],
    [ "ſɟɹ ᶅſɹȝ ɿ", 0, -1 ], [ "ſɟɹ ᶅſɹȝ ц", 0, 1 ] ] as const ) {
    const hax2pa: string[] = [];
    for ( let r = 0; r <= 6; r += 0.5 ) {
      rc.set(new THREE.Vector3(cx + ux * r, 0o120, cz + uz * r), new THREE.Vector3(0, -1, 0));
      const h = rc.intersectObjects(qena.children, true).find(x => x.object.visible);
      hax2pa.push(`${r}:${h ? h.point.y.toFixed(2) : "-"}`);
    }
    console.log(`  ${ksaka} ｡ ${hax2pa.join(" ")}`);
  }
// ⟨ ſɭэ ֭ſɭэ , ꞙɭɿ , ꞙɭı , 📃 ⟩
  for ( const d of kaxte.vojDifinoj ) {
    for ( let k = 0; k < d.pts.length - 1; k++ ) {
      const [ ax, az ] = d.pts[k], [ bx, bz ] = d.pts[k + 1];
      const dx = bx - ax, dz = bz - az;
      const sahakani = Math.hypot(dx, dz);
      const t = Math.max(0, Math.min(1, ( ( cx - ax ) * dx + ( cz - az ) * dz ) / ( sahakani * sahakani )));
      const px = ax + dx * t, pz = az + dz * t;
      const dist = Math.hypot(cx - px, cz - pz);
      if ( dist > VOJA_TRUA_DUONO ) continue;
      const bendoj = kf2K6h6jnBendojn(d.w, t6g6, t6hna);
      const ekstera = kf2EksteranDuonon(bendoj);
      const s2qena = kf2NivelanProfilon(d.pts as [ number, number ][], ekstera, k6h6Alteco);
      const s = t * sahakani;
      console.log(`  ſɭэ ֭ſɭэ ( ${ax},${az} ) ｡ ( ${bx},${bz} ) ｡ ſɭᴜc̗ ɭʃɜ ${dist.toFixed(2)}` +
        ` ｡ s ${s.toFixed(2)} ｡ j͑ʃ'ɔ ŋᷠɹ ${s2qena.altoCxe(s).toFixed(2)}` +
        ` ｡ ſɭэ ᶗ‹ ${s2qena.celoj[ Math.round(s / ( s2qena.sahakani /
          Math.max(1, Math.ceil(s2qena.sahakani / 0.5)) ) ) ].toFixed(2)}` +
        ` ｡ j͑ʃɜ j͑ʃᴜ ʌ jɐ ɭʃᴜ ${s2qena.altoCxe(Math.max(0, s - VOJA_TRUA_DUONO)).toFixed(2)}` +
        `/${s2qena.altoCxe(Math.min(s2qena.sahakani, s + VOJA_TRUA_DUONO)).toFixed(2)}`);
    }
  }
}
