// ≺⧼ ſןᴜȝ ʌ ꞁȷ̀ɔ j͑ʃᴜ ɭʃᴜͷ̗ ſɭᴜͷ̗ 🏛️ ⧽≻
import * as THREE from "three";
import { vakox2qQoxaKefoujn } from "../x2x2q/hakox2q.js";
import { kf2KuhalPukek, kf2KevPukek } from "../x2x2q/pukek.js";
import { kf2CibeKen2qQoxa, kf2F2kQan2k, kf2Xiix2qQan2k } from "../x2x2q/haqoxa.js";
import { tlunakMangxCax2l, KEHUWEH2 } from "../w2ta/cax2loj.js";
import { tlunakEnirejon } from "./satalaj/enirejo.js";
import { tlunakPilolCah6k6, fenestraMargxeno, fenestraPukek } from "./satalaj/cah6k6.js";
import { kf2S2saboTavolon, MURAKLINO, SANKTEJABAZPA12L6DA,
  SANKTEJABAZPA12KROMO } from "./satalaj/haqoxa.js";
import { tlunakDiamantanSpegulon, tlunakTavolanRandon } from "./satalaj/hac2nu.js";
import { tlunakJoqanTubon } from "./satalaj/cel2nu.js";
import { paqPukek, TIPARO, type VepaqSpec } from "./satalaj/hahunaq.js";
import { tlunakSexieanKaatse } from "./satalaj/fasw2d2.js";

// ⟨ ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , 📃 ⟩
export interface TavolaVem2 { y: number; hw: number; hd: number; }

/* ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
   j͑ʃᴜ j͐ʃɹ ｡ ſɭɹ ſȷɔ ｡
   j͑ʃɜ ſɭ,ᴜ ｡ j͑ʃᴜ ｡
    @param w ( number ) - j͑ʃɔ ſȷꞇ }ʃꞇ ｡
    @param d ( number ) - j͑ʃэ ɭ(ᴜ ſןɔ˞ᴜƴ ｡
    @param tiers ( number ) - j͑ʃᴜ ｡ j͑ʃ'ɔ ſɭɹ ſȷɔ ｡
    @param b6k61oL6da ( number ) - j͑ʃᴜ ｡ j͑ʃэ ɭ(ᴜ ｡
@returns ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ｡ y ｡ hw ｡ hd ｡ */
export function hatanekHavem2(w: number, d: number, tiers: number, b6k61oL6da: number): TavolaVem2[] {
  const teruSefini = Math.max(0o215/0o100, w * 0o23/0o100);
  const teruProfundo = Math.max(0o20/0o10, d * 0o23/0o100);
  const malpliiX = ( w / 0o2 - teruSefini / 0o2 ) / Math.max(0o1, tiers - 0o1);
  const malpliiZ = ( d / 0o2 - teruProfundo / 0o2 ) / Math.max(0o1, tiers - 0o1);
  const havem2: TavolaVem2[] = [];
  for ( let i = 0o0; i < tiers; i++ ) {
    havem2.push({ y: i * b6k61oL6da, hw: w / 0o2 - i * malpliiX, hd: d / 0o2 - i * malpliiZ });
  }
  return havem2;
}

// ⟨ ſ͕ɭɜ ı],ᴜ , ɭl̀ɜ ſ͕ɭᴜ , 📃 ⟩
const hatanekKashmemoroj = new Map<string, { hatu5ekani1el2sai: THREE.BufferGeometry; hajoqa: THREE.BufferGeometry }>();
function hatanekHavecax2lani(w: number, d: number, tiers: number, b6k61oL6da: number): { hatu5ekani1el2sai: THREE.BufferGeometry; hajoqa: THREE.BufferGeometry } {
  const s2sabo = MURAKLINO;
  const murajHavecax2lani: THREE.BufferGeometry[] = [], joqajHavecax2lani: THREE.BufferGeometry[] = [];
  const havem2 = hatanekHavem2(w, d, tiers, b6k61oL6da);
  for ( let i = 0o0; i < havem2.length; i++ ) {
    const { y, hw, hd } = havem2[ i ];
    const maltik = havem2[ i - 0o1 ], teru = havem2[ i + 0o1 ];
// ⟨ ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , 📃 ⟩
    const teruK6liq = teru ? Math.min( 0o1, teru.hw / ( hw - s2sabo ), teru.hd / ( hd - s2sabo ) ) : 0o0;
    const subaK6liq = maltik ? Math.min( 0o1, ( maltik.hw - s2sabo ) / hw, ( maltik.hd - s2sabo ) / hd ) : 0o0;
    const tanek = kf2S2saboTavolon(hw, hd, hw - s2sabo, hd - s2sabo, b6k61oL6da,
      [ teruK6liq, subaK6liq ]);
    tanek.translate(0o0, y + b6k61oL6da / 0o2, 0o0); murajHavecax2lani.push(tanek);
    for ( const sX of [ -0o1, 0o1 ] ) for ( const sZ of [ -0o1, 0o1 ] ) tlunakJoqanTubon(joqajHavecax2lani, sX * hw, sZ * hd, y, y + b6k61oL6da, sX, sZ, true, s2sabo);
    tlunakTavolanRandon(joqajHavecax2lani, hw, hd, y, s2sabo, b6k61oL6da);
  }
  return { hatu5ekani1el2sai: vakox2qQoxaKefoujn(murajHavecax2lani), hajoqa: vakox2qQoxaKefoujn(joqajHavecax2lani) };
}
export function bokTavolajnQoxaKefoujn(typeKey: string, w: number, d: number, tiers: number, b6k61oL6da: number): { hatu5ekani1el2sai: THREE.BufferGeometry; hajoqa: THREE.BufferGeometry } {
  const ca3aq = typeKey + "|" + tiers + "|" + w + "|" + d + "|" + b6k61oL6da;
  let g = hatanekKashmemoroj.get(ca3aq);
  if ( !g ) {
    g = hatanekHavecax2lani(w, d, tiers, b6k61oL6da);
    hatanekKashmemoroj.set(ca3aq, g);
  }
  return g;
}
/* ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w , ꞙɭı ,
    @param spec ( VepaqSpec ) - j͑ʃэ ɭl̀э ｡ ſןᴜ j͐ʃэ ｡
    @param t6limaFn ( function , optional ) - ʃᴜ j͐ʃɹ ｡ j͑ʃэ ɭ(ᴜ ｡
@returns l6da ( number ) - j͑ʃэ ɭ(ᴜ Y ｡ */
function satalaBazaL6da(spec: VepaqSpec,
  t6limaFn?: ( x: number, z: number ) => number): number {
  const sost2 = spec.h0 || 0o0;
  if ( spec.type !== "qaman2" || !t6limaFn ) return sost2;
  const p2somaniX = ( spec.w + 0o72/0o100 ) / 0o2;
  const p2somaniZ = ( spec.d + 0o72/0o100 ) / 0o2;
  const kos = Math.cos(spec.rot), sin = Math.sin(spec.rot);
  let l6da = sost2;
  for ( let ix = -0o4; ix <= 0o4; ix++ ) {
    for ( let iz = -0o4; iz <= 0o4; iz++ ) {
      const lx = ix / 0o4 * p2somaniX, lz = iz / 0o4 * p2somaniZ;
      const wx = spec.x + kos * lx + sin * lz;
      const wz = spec.z - sin * lx + kos * lz;
      l6da = Math.max(l6da, t6limaFn(wx, wz) + 0o1/0o100);
    }
  }
  return l6da;
}

export function vepaqSatalon(spec: VepaqSpec, qena: THREE.Scene, knasukf2qdalai: THREE.Mesh[],
  t6limaFn?: ( x: number, z: number ) => number): THREE.Group {
  const { havem2: tiers, b6k61oL6da, w, d, type: typeKey, name } = spec;
  spec.h0 = satalaBazaL6da(spec, t6limaFn);
  const sube = spec.sube || 0o0;
  const teruSefini = Math.max(0o215/0o100, w * 0o23/0o100);
  const T = TIPARO[typeKey] || TIPARO.kap2;
  const muraWeh2 = T.wall, joqaWeh2 = T.catu5ek;
  const s2sabo = MURAKLINO;
  const hatanek = bokTavolajnQoxaKefoujn(typeKey, w, d, tiers, b6k61oL6da);

  const group = new THREE.Group();
  const muraPukek = paqPukek("tu5ekani1el2sai" + muraWeh2 + ( typeKey === "kasafeo" ? "k" : "" ),
    () => new THREE.MeshStandardMaterial({ color: muraWeh2, roughness: typeKey === "kasafeo" ? 0o41/0o100 : 0o3/0o4, metalness: 0o0, envMapIntensity: 0o0 }));
  const joqaPukek = paqPukek("joqa" + joqaWeh2,
    () => kf2KuhalPukek(joqaWeh2));
// ⟨ ſןɔ˞ᴜƴ , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , 📃 ⟩
// ⟨ ſןɔ˞ᴜƴ , ſɭᴜ ſןᴜ , 📃 ⟩
  const fasw2d2Kev = typeKey === "kasafeo" || typeKey === "ka5asexazxipo";
  const eniraPukek = fasw2d2Kev
    ? fenestraPukek()
    : paqPukek("eniro" + muraWeh2, () => kf2KevPukek(muraPukek));

  const hatu5ekani1el2sai = new THREE.Mesh(hatanek.hatu5ekani1el2sai, muraPukek);
  hatu5ekani1el2sai.castShadow = hatu5ekani1el2sai.receiveShadow = true;
  hatu5ekani1el2sai.userData = { spec, buildingType: T };
  knasukf2qdalai.push(hatu5ekani1el2sai);
  group.add(hatu5ekani1el2sai);
  group.add(new THREE.Mesh(hatanek.hajoqa, joqaPukek));

  tlunakEnirejon(group, d, joqaPukek, eniraPukek,
    typeKey === "qaman2" ? 0o4 : 0o1, b6k61oL6da, typeKey === "qaman2");

  if ( typeKey === "qaman2" ) {
    const pintaKa5ik = teruSefini * 0o43/0o100;
    const pintaGeo = kf2F2kQan2k(
      new THREE.ConeGeometry(pintaKa5ik, 0o63/0o40, 0o4).rotateY(Math.PI / 0o4), pintaKa5ik, 0o0);
    const pintajxo = new THREE.Mesh(pintaGeo, joqaPukek);
    pintajxo.position.y = tiers * b6k61oL6da + 0o63/0o100; pintajxo.castShadow = true; group.add(pintajxo);
  }

  if ( typeKey === "ka5asexazxipo" ) {
    const apronQoxa = kf2CibeKen2qQoxa(w + 0o4, d + 0o4, 0o10/0o10);
    const apronGeo = new THREE.ExtrudeGeometry(apronQoxa, { depth: 0o3/0o40, bevelEnabled: false, curveSegments: 0o10 });
    apronGeo.rotateX(-Math.PI / 0o2);
    apronGeo.translate(0o0, -0o1/0o40, 0o0);
    apronGeo.setAttribute("uv1", (apronGeo.getAttribute("uv") as THREE.BufferAttribute).clone());
    kf2Xiix2qQan2k(apronGeo);
    const apronPukek = muraPukek.clone();
    if ( apronPukek.map ) { apronPukek.map = apronPukek.map.clone(); apronPukek.map.channel = 0o1; apronPukek.map.needsUpdate = true; }
    if ( apronPukek.bumpMap ) { apronPukek.bumpMap = apronPukek.bumpMap.clone(); apronPukek.bumpMap.channel = 0o1; apronPukek.bumpMap.needsUpdate = true; }
    const apron = new THREE.Mesh(apronGeo, apronPukek);
    apron.receiveShadow = true; group.add(apron);
    for ( const sZ of [ -0o1, 0o1 ] ) {
      const b1 = new THREE.BoxGeometry(w + 0o4, 0o1/0o20, 0o5/0o20); b1.translate(0o0, 0o7/0o100, sZ * ( d / 0o2 + 0o4/0o10 )); group.add(new THREE.Mesh(b1, joqaPukek));
    }
    for ( const sX of [ -0o1, 0o1 ] ) {
      const b2 = new THREE.BoxGeometry(0o5/0o20, 0o1/0o20, d + 0o4); b2.translate(sX * ( w / 0o2 + 0o4/0o10 ), 0o7/0o100, 0o0); group.add(new THREE.Mesh(b2, joqaPukek));
    }
    for ( const sX of [ -0o1, 0o1 ] ) for ( const sZ of [ -0o1, 0o1 ] ) {
      const cel2nu = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o10, 0o3/0o20, 0o7/0o4, 0o6), joqaPukek);
      cel2nu.position.set(sX * ( w / 0o2 + 0o15/0o10 ), 0o7/0o10, sZ * ( d / 0o2 + 0o15/0o10 )); cel2nu.castShadow = true; group.add(cel2nu);
      const dci = new THREE.Mesh(new THREE.SphereGeometry(0o5/0o40, 0o10, 0o6), eniraPukek);
      dci.position.set(sX * ( w / 0o2 + 0o15/0o10 ), 0o7/0o4 + 0o5/0o40, sZ * ( d / 0o2 + 0o15/0o10 )); group.add(dci);
    }
// ⟨ ſɭɜ ſɭ,w , ſɭɜ ſɭᴜ , 📃 ⟩
    const roofY = tiers * b6k61oL6da;
    const c2q = new THREE.Mesh(new THREE.RingGeometry(0o5/0o20, 0o11/0o20, 0o40).rotateX(-Math.PI / 0o2), joqaPukek);
    c2q.position.y = roofY + 0o1/0o40; group.add(c2q);
  }

// ⟨ ſɭᴜ ſןᴜ , ꞙɭэ , 📃 ⟩
// ⟨ ſɭэ ſɭᴜ , 📃 ⟩
// ⟨ ſɭэ ſɭᴜ , ꞙɭı , 📃 ⟩
// ⟨ ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟩
  const senEksterajHacah6k6 = typeKey === "kap2" || typeKey === "geqqa"
    || typeKey === "turo" || typeKey === "qaman2";
  if ( !senEksterajHacah6k6 ) {
    const fenL6da = Math.min(0o5/0o10, b6k61oL6da * 0o23/0o100);
    const vitro = fenestraPukek();
// ⟨ ſɭэ ſɭᴜ , ꞙɭц , 📃 ⟩
    const facoLarga = Math.min(w / 0o2, d / 0o2) - s2sabo / 0o2;
    const fenMargxeno = fenestraMargxeno(facoLarga);
    for ( const { y, hw, hd } of hatanekHavem2(w, d, tiers, b6k61oL6da) ) {
      const faco = Math.min(hw, hd) - s2sabo / 0o2;
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
      const tapu = faco * 0o2 - fenMargxeno * 0o2 >= fenL6da;
      if ( !tapu && faco < fenL6da * 0o1/0o2 + 0o1/0o10 ) continue;
      const yC = y + b6k61oL6da / 0o2;
      for ( let f = 0o0; f < 0o4; f++ ) {
        if ( y === 0o0 && f === 0o0 ) continue;
        tlunakPilolCah6k6(group, joqaPukek, vitro, f, yC, faco,
          s2sabo, b6k61oL6da, fenL6da, false, tapu ? fenMargxeno : undefined,
          !tapu);
      }
    }
  }

  tlunakSexieanKaatse(group, name, typeKey, w, d);

  const eksterajHacax2l = typeKey === "geqqa" && spec.fixed !== "kvar" ? new THREE.Group() : null;
  if ( eksterajHacax2l ) {
    const lignaPukek = paqPukek("ligno",
      () => new THREE.MeshStandardMaterial({ color: KEHUWEH2, roughness: 0o41/0o100, metalness: 0o11/0o100 }));
    for ( let i = -0o1; i <= 0o1; i += 0o2 ) {
      const tx = i * 0o5, tz = d / 0o2 + 0o3;
      tlunakMangxCax2l(eksterajHacax2l, tx, tz, 0o0, lignaPukek, joqaPukek);
    }
  }
  if ( sube > 0o0 && typeKey === "qaman2" ) {
// ⟨ ſɭɜ ſɭ,w , ı],ᴜ ֭ſɭᴜ , 📃 ⟩
    const joqaW = w + SANKTEJABAZPA12KROMO, joqaD = d + SANKTEJABAZPA12KROMO;
    const kof = 0o1/0o2;
    const rHatafkaq = 0o1/0o2;
    const pa12L6da = SANKTEJABAZPA12L6DA;
    const joqaQoxa = kf2CibeKen2qQoxa(joqaW, joqaD, rHatafkaq);
    const ena = kf2CibeKen2qQoxa(
      joqaW - kof * 0o2, joqaD - kof * 0o2, Math.max(0o1/0o20, rHatafkaq - kof)
).getPoints(0o40);
    joqaQoxa.holes.push(new THREE.Path(ena.reverse()));
    const joqaGeo = new THREE.ExtrudeGeometry(joqaQoxa, { depth: pa12L6da, bevelEnabled: false, curveSegments: 0o40 });
    joqaGeo.rotateX(-Math.PI / 0o2);
    const bazpa12 = new THREE.Mesh(joqaGeo, joqaPukek);
    bazpa12.name = "sankteja-bazpa12";
    bazpa12.castShadow = bazpa12.receiveShadow = true;
    group.add(bazpa12);
  }

  group.position.set(spec.x, spec.h0, spec.z);
  group.rotation.y = spec.rot;
  qena.add(group);
  if ( spec.diamond ) tlunakDiamantanSpegulon(qena, spec, group, w);
  if ( eksterajHacax2l ) group.add(eksterajHacax2l);
  return group;
}
