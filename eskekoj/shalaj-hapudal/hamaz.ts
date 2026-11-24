// ≺⧼ ŋᷠᴜƴ 🧍 ⧽≻
import * as THREE from "three";
import { HARSTILOJ } from "../vestaro/vestoj.js";
import type { Vesto, Harstilo } from "../vestaro/vestoj.js";

export type { Vesto };
import { figurajGeometriojn } from "./hamaz/geometrioj.js";
import { HARO_Y, haraMaterialo, harKoloro, harKoloroA, harKoloroB, haranGeometrion } from "./hamaz/haroj.js";
import { ceqaMaterialo, ledajMaterialoj, ungaMaterialo, vestajMaterialoj } from "./hamaz/materialoj.js";
import { HALTO_GAMO, INTERNO_PIVOTO_Y, KOLO_Y, KUBUTO_Y, MALEOLO_Y, SASA_Y } from "./hamaz/havecax2l.js";
import { T2BANUJ_ELEKTOJ, PALPEBRA_DAURO, PALPEBRA_FERMO, PALPEBRA_INTERVALO, t2banuMaterialo } from "./hamaz/okuloj.js";
import { palpebraPivoto } from "./hamaz/vizagxo.js";

// ⟨ ſᶘᴜȝ , ᶅſɔ ֭ſɭɹ , ꞙɭı ⟅ j͑ʃᴜ ſɭᶗ‹ɜ , ᶅſɔ ֭ſɭɹ ,
//   MeshPhysicalMaterial , ꞙɭı , ꞙɭı , ſןw ſɭɔƽ , ⟅ 📃 ⟩
const HARAJ_NUANCOJ = 0o20;

export interface Figuro {
  group: THREE.Group;
  agordiVeston: ( o: Vesto ) => void;
  agordiHaranStilon: ( stilo: Harstilo ) => void;
  agordiHaranKoloron: ( weh2: number ) => void;
  hejmo: THREE.Vector3;
  celo: THREE.Vector3;
  atendo: number;
  rapido: number;
  // ⟨ ſɭᴜ ſ͕ȷɔ , j͐ʃэ ɭ(ᴜ , ⟅ 📏 ⟩
  l6da: number;
  marsoFazo: number;
  movoFaktoro: number;
  // ⟨ j͐ʃэ ɭ(ᴜ , ſɭɜ ſɭ,w , ꞙɭı ⟅ ꞙɭı , ꞙɭı ,
  //   j͐ʃэ ɭ(ᴜ , ꞙɭɔ , ꞙɭɔ , ꞙɭı , ꞙɭɔ , ꞙɭı ,
  //   j͐ʃэ ɭ(ᴜ , ⟅ 📃 ⟩
  grundaY: number;
  // ⟨ ɭʃɹ ʃᴜ }ʃw , ꞙɭı , ſɭᴜ ſןᴜ , ⟅ ⟩
  palpebraFazo: number;
  palpebroj: THREE.Object3D;
  kruroj: [ THREE.Object3D, THREE.Object3D ];
  haknece: [ THREE.Object3D, THREE.Object3D ];
  // ⟨ ɭʃᴜc̭ ſɟɹƽ , ⟅ ⟩
  genuoj: [ THREE.Object3D, THREE.Object3D ];
  kubutoj: [ THREE.Object3D, THREE.Object3D ];
  // ⟨ j͑ʃɜȝ ɭʃɔ , ſɭэ ɭʃᴜ , ⟅ ⟩
  roboGrupo: THREE.Object3D;
  kapoGrupo: THREE.Object3D;
  // ⟨ ſɭᴜ ſןᴜ , ꞙɭı , ⟅ ⟩
  torsoGrupo: THREE.Object3D;
  sxuoj: [ THREE.Object3D, THREE.Object3D ];
  haroGrupo: THREE.Object3D;
  manikoj: THREE.Object3D[];
  // ⟨ j͑ʃɜȝ ɭʃɔ , ꞙɭı , ſɭэ ſɭ,w , ⟅ ⟩
  internoGrupo: THREE.Object3D;
  // ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭɿ , ⟅ ⟩
  korpoj: THREE.Object3D[];
  vestoj: THREE.Object3D[];
}

export function vepaqFiguron(o: Vesto, haroKlavo = "haroMalalta",
  l6da?: number): Figuro {
  const g = new THREE.Group();
  // ⟨ j͐ʃэ ɭ(ᴜ , ꞙɭı , ꞙɭı , ⟅ 📏 ⟩
  // ⟨ ſᶘɔ ʌ ſ͕ɭɜ ı],ᴜ , ꞙɭɔ , ⟅ ⟩
  const altaFaktoro = l6da ?? ( 0o1 + ( Math.random() * 0o2 - 0o1 ) * HALTO_GAMO );
  g.scale.setScalar(altaFaktoro);
  const G = figurajGeometriojn();
  const ceqo = ceqaMaterialo();
  const torso = new THREE.Mesh(G.korpo, ceqo);
  const wopo = new THREE.Mesh(G.kapa, ceqo);
  // ⟨ ᶅſɔ ֭ſɭɹ , ɭʃɹ ʃᴜ }ʃw , ⟅ ⟩
  const vizaĝo = new THREE.Mesh(G.vizaĝo,
    t2banuMaterialo(T2BANUJ_ELEKTOJ[Math.floor(Math.random() * T2BANUJ_ELEKTOJ.length)]));

  harKoloro.lerpColors(harKoloroA, harKoloroB,
    Math.floor(Math.random() * HARAJ_NUANCOJ) / ( HARAJ_NUANCOJ - 1 ));
  const haroM = haraMaterialo(harKoloro.getHex());
  // ⟨ ſ̀ȷᴜ ſɟɔ ɭʃɹ ʃᴜ }ʃw j͑ʃᴜꞇ , ſᶘᴜȝ , ⟅ ⟩
  const strikoj = new THREE.Mesh(G.vizaĝajStrikoj, haroM);
  strikoj.position.y = -KOLO_Y;
  // ⟨ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ɭʃɹ ʃᴜ }ʃw j͑ʃᴜꞇ , ⟅ ⟩
  const palpebroj = new THREE.Mesh(G.palpebroj, ceqo);
  palpebroj.position.y = palpebraPivoto();

  const { internoM, eksteraM, pantalonoM, manikoM } = vestajMaterialoj(o);
  const { botoM, akcentaM } = ledajMaterialoj(o);

  const interno = new THREE.Mesh(G.interna, internoM);
  interno.position.y = -INTERNO_PIVOTO_Y;
  const ekstera = new THREE.Mesh(G.roba, eksteraM);
  ekstera.position.y = -SASA_Y;
  // ⟨ j͑ʃɜȝ ɭʃɔ , ꞙɭı , ꞙɭı , ⟅ ⟩
  // ⟨ j͑ʃɜȝ ɭʃɔ , j͑ʃᴜ ʃɜ , ⟅ ⟩
  const roboGrupo = new THREE.Group();
  roboGrupo.position.y = SASA_Y;
  const internoGrupo = new THREE.Group();
  internoGrupo.position.y = INTERNO_PIVOTO_Y - SASA_Y;
  internoGrupo.add(interno);
  roboGrupo.add(internoGrupo, ekstera);

  // ⟨ }ʃᴜ j͑ʃᴜ̭ɔ , ⟅ ⟩
  // ⟨ ꞙɭı , ſɭᴜ ſ͕ȷɔ , ꞙɭɔ , ɭʃᴜʞ ꞁȷ̀ᴜ }ʃꞇ ɭʃᴜc̭ ſɟɔ j͑ʃᴜꞇ , ⟅ ⟩
  // ⟨ ꞙɭı , ɭʃᴜʞ ꞁȷ̀ᴜ }ʃꞇ ɭʃᴜc̭ ſɟɔ j͑ʃᴜꞇ 0.4297 , ꞙɭı , ⟅ ⟩
  const koksoY = 0o167/0o200;
  const genuoKompenso = -0o67/0o200;
  const kruroL = new THREE.Group(); kruroL.position.y = koksoY;
  const kruroR = new THREE.Group(); kruroR.position.y = koksoY;
  // ⟨ }ʃᴜ j͑ʃᴜ̭ɔ , ꞙɭı , ꞙɭı , ⟅ ⟩
  // ⟨ ꞙɭɿ , ꞙɭı , ꞙɭɿ , ⟅ ⟩
  const pL = new THREE.Mesh(G.pantalonaSupra, pantalonoM); pL.position.set(-0o3/0o40, genuoKompenso, 0);
  const pR = new THREE.Mesh(G.pantalonaSupra, pantalonoM); pR.position.set(0o3/0o40, genuoKompenso, 0);
  // ⟨ }ʃᴜ j͑ʃᴜ̭ɔ , ꞙɭı , ⟅ ⟩
  const korpoL = new THREE.Mesh(G.kruroSupra, ceqo); korpoL.position.set(-0o3/0o40, genuoKompenso, 0);
  const korpoR = new THREE.Mesh(G.kruroSupra, ceqo); korpoR.position.set(0o3/0o40, genuoKompenso, 0);
  // ⟨ ɭʃᴜʞ ꞁȷ̀ᴜ }ʃꞇ ɭʃᴜc̭ ſɟɔ j͑ʃᴜꞇ , ꞙɭı , ⟅ ⟩
  // ⟨ ꞙɭı , ꞙɭɔ , ⟅ ⟩
  const genuoL = new THREE.Group(); genuoL.position.y = genuoKompenso;
  const genuoR = new THREE.Group(); genuoR.position.y = genuoKompenso;
  const pSubL = new THREE.Mesh(G.pantalonaMalsupra, pantalonoM);
  const pSubR = new THREE.Mesh(G.pantalonaMalsupra, pantalonoM);
  const kSubL = new THREE.Mesh(G.kruroMalsupra, ceqo);
  const kSubR = new THREE.Mesh(G.kruroMalsupra, ceqo);
  pSubL.position.set(-0o3/0o40, 0, 0); pSubR.position.set(0o3/0o40, 0, 0);
  kSubL.position.set(-0o3/0o40, 0, 0); kSubR.position.set(0o3/0o40, 0, 0);
  // ⟨ }ʃᴜ j͑ʃᴜ̭ɔ , ſןᴜ ɭʃэ ɭʃɔ , ⟅ ⟩
  const korpaPiedoL = new THREE.Mesh(G.korpaPiedo, ceqo);
  const korpaPiedoR = new THREE.Mesh(G.korpaPiedo, ceqo);
  korpaPiedoL.position.set(-0o3/0o40, -MALEOLO_Y, 0);
  korpaPiedoR.position.set(0o3/0o40, -MALEOLO_Y, 0);
  // ⟨ ɭʃᴜ , ſןᴜ ɭʃэ , ⟅ ⟩
  // ⟨ ɭʃᴜ , ɭʃᴜʞ ꞁȷ̀ᴜ }ʃꞇ ɭʃᴜc̭ ſɟɔ j͑ʃᴜꞇ , ⟅ ⟩
  const sxuoL = new THREE.Group(); sxuoL.position.y = MALEOLO_Y;
  const sxuoR = new THREE.Group(); sxuoR.position.y = MALEOLO_Y;
  const bL = new THREE.Mesh(G.boto, botoM);
  const bR = new THREE.Mesh(G.boto, botoM);
  const akcL = new THREE.Mesh(G.akcenta, akcentaM);
  const akcR = new THREE.Mesh(G.akcenta, akcentaM);
  bL.position.set(-0o3/0o40, -MALEOLO_Y, 0);
  bR.position.set(0o3/0o40, -MALEOLO_Y, 0);
  akcL.position.set(-0o3/0o40, -MALEOLO_Y, 0);
  akcR.position.set(0o3/0o40, -MALEOLO_Y, 0);
  sxuoL.add(bL, akcL, korpaPiedoL);
  sxuoR.add(bR, akcR, korpaPiedoR);
  genuoL.add(pSubL, kSubL, sxuoL);
  genuoR.add(pSubR, kSubR, sxuoR);
  kruroL.add(pL, korpoL, genuoL);
  kruroR.add(pR, korpoR, genuoR);

  // ⟨ ɭʃꞇƽ , ⟅ ⟩
  // ⟨ ꞙɭı , j͑ʃᴜ ʃɜ , ꞙɭı , ⟅ ⟩
  // ⟨ ɭʃꞇƽ , ꞙɭı , ⟅ ⟩
  // ⟨ ꞙɭı , ꞙɭı , ⟅ ⟩
  const brakoL = new THREE.Group(); brakoL.position.set(-0o70/0o400, 0o265/0o200, 0);
  const brakoR = new THREE.Group(); brakoR.position.set(0o70/0o400, 0o265/0o200, 0);
  const manikoj: THREE.Mesh[] = [];
  const manikajMeshoj: THREE.Mesh[] = [];
  const manoj: THREE.Mesh[] = [];
  const ungoj: THREE.Mesh[] = [];
  const haknece: THREE.Mesh[] = [];
  const kubutajGrupoj: THREE.Group[] = [];
  for ( const [ knece, dir ] of [ [ brakoL, -0o1 ], [ brakoR, 0o1 ] ] as [ THREE.Group, number ][] ) {
    const klino = new THREE.Group();
    // ⟨ ɭʃꞇƽ , ꞙɭı , ⟅ ⟩
    klino.rotation.z = dir * 0o27/0o1000;
    const maniko = new THREE.Mesh(G.manikaSupra, manikoM);
    const manikoSub = new THREE.Mesh(G.manikaMalsupra, manikoM);
    const ceqaBrakо = new THREE.Mesh(G.brakoSupra, ceqo);
    const ceqaBrakоSub = new THREE.Mesh(G.brakoMalsupra, ceqo);
    const mano = new THREE.Mesh(G.mano, ceqo);
    // ⟨ ɭʃꞇƽ , ᶅſɜ ֭ſɭᴜ , ⟅ ⟩
    ceqaBrakо.scale.x = dir;
    ceqaBrakоSub.scale.x = dir;
    // ⟨ ɭʃꞇƽ , ᶅſɜ ֭ſɭᴜ , ꞙɭı , ⟅ ⟩
    mano.scale.x = dir;
    // ⟨ ɭʃꞇƽ , ꞙɭı , ꞙɭı , ⟅ ⟩
    mano.rotation.y = -dir * Math.PI / 0o2;
    // ⟨ ſɟᴜ j͑ʃ'ᴜ ı],ᴜ ֭ſɭᴜ , ɭʃꞇƽ , ⟅ ⟩
    const ungo = new THREE.Mesh(G.ungoj, ungaMaterialo());
    ungo.castShadow = false;
    mano.add(ungo);
    ungoj.push(ungo);
    manoj.push(mano);
    haknece.push(ceqaBrakо, ceqaBrakоSub);
    // ⟨ ɭʃꞇƽ , j͑ʃɜȝ ɭʃɔ , ꞙɭı , ⟅ ⟩
    // ⟨ ɭʃᴜʞ ꞁȷ̀ᴜ }ʃꞇ ɭʃᴜc̭ ſɟɔ j͑ʃᴜꞇ , ꞙɭı , ⟅ ⟩
    // ⟨ ɭʃꞇƽ , j͑ʃɜȝ ɭʃɔ , ꞙɭɔ , ⟅ ⟩
    const kubuto = new THREE.Group();
    kubuto.position.y = KUBUTO_Y;
    mano.position.y = -0o36/0o64 - KUBUTO_Y;
    kubuto.add(ceqaBrakоSub, manikoSub, mano);
    kubutajGrupoj.push(kubuto);
    klino.add(ceqaBrakо, maniko, kubuto);
    manikoj.push(maniko);
    manikajMeshoj.push(maniko, manikoSub);
    knece.add(klino);
  }

  // ⟨ ſᶘᴜȝ , ꞙɭı , ⟅ ⟩
  const haroMeshoj = new Map<string, THREE.Mesh>();
  for ( const stilo of HARSTILOJ ) haroMeshoj.set(stilo.ksaka, new THREE.Mesh(haranGeometrion(stilo), haroM));
  const aktivaHaro = haroMeshoj.has(haroKlavo) ? haroKlavo : "haroMalalta";

  // ⟨ ſɭэ ɭʃᴜ , ꞙɭı , ɭʃᴜ , ⟅ ⟩
  const kapoGrupo = new THREE.Group();
  kapoGrupo.position.y = KOLO_Y;
  wopo.position.y = -KOLO_Y;
  vizaĝo.position.y = -KOLO_Y;
  kapoGrupo.add(wopo, vizaĝo, strikoj, palpebroj);
  // ⟨ ſᶘᴜȝ , ſɭэ ɭʃᴜ , ꞙɭı , ⟅ ⟩
  const haroGrupo = new THREE.Group();
  haroGrupo.position.set(0, HARO_Y - KOLO_Y, -0o3/0o40);
  kapoGrupo.add(haroGrupo);
  for ( const [ ca3aq, mesho ] of haroMeshoj ) {
    mesho.visible = ca3aq === aktivaHaro;
    mesho.position.set(0, -HARO_Y, 0o3/0o40);
    haroGrupo.add(mesho);
  }

  // ⟨ ſɭᴜ ſ͕ȷɔ , ꞙɭı , ꞙɭı , ⟅ ⟩
  const torsoGrupo = new THREE.Group();
  torsoGrupo.position.y = SASA_Y;
  roboGrupo.position.y = 0;
  torso.position.y = -SASA_Y;
  kapoGrupo.position.y = KOLO_Y - SASA_Y;
  brakoL.position.y = 0o133/0o100 - SASA_Y;
  brakoR.position.y = 0o133/0o100 - SASA_Y;
  torsoGrupo.add(roboGrupo, torso, kapoGrupo, brakoL, brakoR);

  // ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭɿ , ⟅ ⟩
  const korpoj: THREE.Mesh[] = [ wopo, vizaĝo, strikoj, palpebroj, torso, korpoL, korpoR,
    kSubL, kSubR, korpaPiedoL, korpaPiedoR, ...haknece, manoj[0], manoj[1], ...ungoj,
    ...haroMeshoj.values() ];
  const vestoj: THREE.Mesh[] = [ interno, ekstera, pL, pR, pSubL, pSubR,
    bL, bR, akcL, akcR, ...manikajMeshoj ];
  for ( const m of korpoj ) m.userData.pudal = "korpo";
  for ( const m of vestoj ) m.userData.pudal = "vesto";

  g.add(torsoGrupo, kruroL, kruroR);
  g.traverse(m => { if ( ( m as THREE.Mesh ).isMesh ) (m as THREE.Mesh).castShadow = true; });
  // ⟨ ſɭᴜ ſןᴜ , ꞙɭɔ , ꞙɭı , ᶅſɜ ֭ſɭᴜ , ⟅ ⟩
  torso.castShadow = false;
  korpoL.castShadow = false;
  korpoR.castShadow = false;
  kSubL.castShadow = false;
  kSubR.castShadow = false;
  korpaPiedoL.castShadow = false;
  korpaPiedoR.castShadow = false;
  for ( const b of haknece ) b.castShadow = false;
  manoj[0].castShadow = false;
  manoj[1].castShadow = false;
  for ( const ungo of ungoj ) ungo.castShadow = false;

  const fig: Figuro = {
    group: g,
    l6da: altaFaktoro,
    hejmo: new THREE.Vector3(),
    celo: new THREE.Vector3(),
    atendo: 0, rapido: 0o63/0o100,
    marsoFazo: Math.random() * Math.PI * 0o2,
    movoFaktoro: 0,
    grundaY: Number.NaN,
    palpebraFazo: Math.random() * PALPEBRA_INTERVALO,
    palpebroj,
    kruroj: [ kruroL, kruroR ],
    haknece: [ brakoL, brakoR ],
    genuoj: [ genuoL, genuoR ],
    kubutoj: [ kubutajGrupoj[0], kubutajGrupoj[1] ],
    roboGrupo,
    kapoGrupo,
    torsoGrupo,
    sxuoj: [ sxuoL, sxuoR ],
    haroGrupo,
    manikoj,
    internoGrupo,
    korpoj,
    vestoj,
    agordiVeston(sef4: Vesto) {
      const sef4Vesta = vestajMaterialoj(sef4);
      interno.material = sef4Vesta.internoM;
      ekstera.material = sef4Vesta.eksteraM;
      pL.material = sef4Vesta.pantalonoM;
      pR.material = sef4Vesta.pantalonoM;
      for ( const maniko of manikajMeshoj ) maniko.material = sef4Vesta.manikoM;
      const sef4Ledo = ledajMaterialoj(sef4);
      bL.material = sef4Ledo.botoM; bR.material = sef4Ledo.botoM;
      akcL.material = sef4Ledo.akcentaM; akcR.material = sef4Ledo.akcentaM;
    },
    agordiHaranStilon(stilo: Harstilo) {
      const aktiva = haroMeshoj.has(stilo.ksaka) ? stilo.ksaka : "haroMalalta";
      for ( const [ ca3aq, mesho ] of haroMeshoj ) mesho.visible = ca3aq === aktiva;
    },
    agordiHaranKoloron(weh2: number) {
      const sef4 = haraMaterialo(weh2);
      for ( const mesho of haroMeshoj.values() ) mesho.material = sef4;
      // ⟨ ſ̀ȷᴜ ſɟɔ ɭʃɹ ʃᴜ }ʃw j͑ʃᴜꞇ , ꞙɭı , ⟅ ⟩
      strikoj.material = sef4;
    },
  };
  return fig;
}

// ⟨ j͑ʃɜȝ ɭʃɔ , ſɭᴜ ſ͕ȷɔ , ⟅ ⟩
// ⟨ ſᶘɔ ʌ FAZO , ⟅ ⟩
export function marŝSvingo(
  fig: Pick<Figuro, "group" | "kruroj" | "haknece" | "genuoj" | "kubutoj"
    | "roboGrupo" | "kapoGrupo" | "internoGrupo"
    | "torsoGrupo" | "sxuoj" | "haroGrupo" | "manikoj" | "palpebroj" | "palpebraFazo">,
  fazo: number, movo: number, deltaTempo = 0o1/0o60
): void {
  // ⟨ ꞙɭı ⟅ ſɭᴜ ſןᴜ , j͐ʃэ ɭ(ᴜ , += ⟅
  //   j͐ʃэ ɭ(ᴜ , j͐ʃэ ɭ(ᴜ , ꞙɭı , ⟅ 📃 ⟩
  const vepat6ni = Math.sin(fazo);
  const duobla = Math.sin(fazo * 0o2);
  // ⟨ }ʃᴜ j͑ʃᴜ̭ɔ , ⟅ ⟩
  // ⟨ }ʃᴜ j͑ʃᴜ̭ɔ , ꞙɭı , ꞙɭı , ⟅ ⟩
  const svingoKruro = 0o3/0o20 * movo * vepat6ni;
  fig.kruroj[0].rotation.x = -svingoKruro;
  fig.kruroj[1].rotation.x = svingoKruro;
  // ⟨ ɭʃᴜʞ ꞁȷ̀ᴜ }ʃꞇ ɭʃᴜc̭ ſɟɔ j͑ʃᴜꞇ , ⟅ ⟩
  // ⟨ ſɭэ ſɭ,w , ꞙɭı , ⟅ ⟩
  const fleksoGenuo = ( p: number ) =>
    ( 0o1/0o20 + 0o13/0o40 * Math.max(0, -Math.sin(p - 0o3/0o10)) ) * movo;
  fig.genuoj[0].rotation.x = fleksoGenuo(fazo);
  fig.genuoj[1].rotation.x = fleksoGenuo(fazo + Math.PI);
  // ⟨ ſןᴜ ɭʃэ , ꞙɭı , ⟅ ⟩
  // ⟨ ꞙɭı , ꞙɭı , ⟅ ⟩
  const maleolo = 0o5/0o200 * movo * Math.sin(fazo - 0o7/0o10);
  fig.sxuoj[0].rotation.x = -maleolo;
  fig.sxuoj[1].rotation.x = maleolo;
  // ⟨ j͑ʃᴜ ſןᴜ , ꞙɭı , ⟅ ⟩
  fig.group.position.y += ( 0o7/0o1000 + 0o7/0o1000 * Math.cos(fazo * 0o2) ) * movo;
  // ⟨ ɭʃꞇƽ , ⟅ ⟩
  const svingoBrako = 0o4/0o100 * movo * vepat6ni;
  fig.haknece[0].rotation.x = svingoBrako;
  fig.haknece[1].rotation.x = -svingoBrako;
  // ⟨ ɭʃᴜʞ ꞁȷ̀ᴜ }ʃꞇ ɭʃᴜc̭ ſɟɔ j͑ʃᴜꞇ , ⟅ ⟩
  const fleksoKubuto = ( p: number ) => -( 0o1/0o25
    + 0o1/0o50 * movo * ( 0o1/0o2 + 0o1/0o2 * Math.sin(p) ) );
  fig.kubutoj[0].rotation.x = fleksoKubuto(fazo);
  fig.kubutoj[1].rotation.x = fleksoKubuto(fazo + Math.PI);
  // ⟨ ſɭᴜ ſ͕ȷɔ , ⟅ ⟩
  fig.torsoGrupo.rotation.y = -0o4/0o100 * movo * vepat6ni;
  fig.torsoGrupo.rotation.x = 0o5/0o100 * movo - 0o1/0o100 * movo * duobla;
  fig.torsoGrupo.rotation.z = -0o3/0o100 * movo * vepat6ni;
  // ⟨ j͑ʃɜȝ ɭʃɔ , ⟅ ⟩
  // ⟨ j͑ʃᴜ ֭ſɭᴜƽ ɭʃɔ , ꞙɭı , ⟅ ⟩
  // ⟨ ꞙɭı , ꞙɭı , ⟅ ⟩
  fig.roboGrupo.rotation.z = 0o4/0o200 * movo * Math.sin(fazo - 0o5/0o10)
    - 0o1/0o2 * fig.torsoGrupo.rotation.z;
  fig.roboGrupo.rotation.x = 0o5/0o200 * movo * Math.sin(fazo * 0o2 - 0o5/0o10)
    - 0o1/0o2 * fig.torsoGrupo.rotation.x;
  fig.roboGrupo.rotation.y = 0o5/0o200 * movo * Math.sin(fazo - 0o6/0o10);
  // ⟨ j͑ʃɜȝ ɭʃɔ , ꞙɭı , ⟅ ⟩
  // ⟨ ꞙɭı , ꞙɭı , ⟅ ⟩
  fig.internoGrupo.rotation.y = 0o5/0o100 * movo * vepat6ni;
  // ⟨ ſɭᴜ ſ͕ȷɔ , ſןᴜ ɭʃэ , ⟅ ⟩
  // ⟨ j͑ʃɜȝ ɭʃɔ , ꞙɭı , ꞙɭı , ⟅ ⟩
  fig.internoGrupo.rotation.x = -0o1/0o10 * fig.torsoGrupo.rotation.x;
  fig.internoGrupo.rotation.z = 0o3/0o10 * fig.torsoGrupo.rotation.z;
  // ⟨ j͑ʃɜȝ ɭʃɔ , ꞙɭı , ⟅ ⟩
  fig.manikoj[0].rotation.x = -0o1/0o40 * movo * Math.sin(fazo - 0o5/0o10);
  fig.manikoj[1].rotation.x = 0o1/0o40 * movo * Math.sin(fazo - 0o5/0o10);
  // ⟨ ſɭэ ɭʃᴜ , ⟅ ⟩
  fig.kapoGrupo.rotation.x = 0o1/0o100 * movo * duobla + 0o1/0o100 * movo;
  fig.kapoGrupo.rotation.z = -0o1/0o100 * movo * vepat6ni;
  // ⟨ ſᶘᴜȝ , ⟅ ⟩
  // ⟨ ꞙɭı , ꞙɭı , ⟅ ⟩
  fig.haroGrupo.rotation.x = -0o4/0o100 * movo * Math.sin(fazo * 0o2 - 0o7/0o10);
  fig.haroGrupo.rotation.z = 0o3/0o100 * movo * Math.sin(fazo - 0o7/0o10);
  // ⟨ ɭʃɹ ʃᴜ }ʃw , ꞙɭı , ⟅ ⟩
  fig.palpebraFazo += deltaTempo;
  const palpebraCiklo = fig.palpebraFazo % PALPEBRA_INTERVALO;
  const fermiteco = palpebraCiklo < PALPEBRA_DAURO
    ? Math.sin(palpebraCiklo / PALPEBRA_DAURO * Math.PI) : 0;
  fig.palpebroj.scale.y = PALPEBRA_FERMO + ( 0o1 - PALPEBRA_FERMO ) * fermiteco;
}

export function gxisdatigiNpc(fig: Figuro, deltaTempo: number, t: number,
  alteco: ( x: number, z: number ) => number,
  suprajxo?: ( x: number, z: number ) => number): void {
  fig.atendo -= deltaTempo;
  if ( fig.atendo <= 0 ) {
    const a = Math.random() * Math.PI * 0o2, hazardaRadiuso = Math.random() * 0o4;
    const cx = fig.hejmo.x + Math.sin(a) * hazardaRadiuso, cz = fig.hejmo.z + Math.cos(a) * hazardaRadiuso;
    const cy = suprajxo ? suprajxo(cx, cz) : alteco(cx, cz);
    fig.celo.set(cx, Number.isFinite(cy) ? Math.max(cy, alteco(cx, cz)) : alteco(cx, cz), cz);
    fig.atendo = 0o3 + Math.random() * 0o4;
  }
  // ⟨ ſɭᴜ ſןᴜ , ꞙɭı , j͐ʃэ ɭ(ᴜ , ꞙɭı , ſɭᴜ ſ͕ȷɔ , ⟅ 📃 ⟩
  if ( Number.isNaN(fig.grundaY) ) fig.grundaY = fig.group.position.y;
  const difX = fig.celo.x - fig.group.position.x, difZ = fig.celo.z - fig.group.position.z;
  const d = Math.hypot(difX, difZ);
  const movas = d > 0o23/0o100;
  fig.movoFaktoro += ( ( movas ? 0o1 : 0 ) - fig.movoFaktoro ) * Math.min(0o1, deltaTempo * 0o10);
  const movo = fig.movoFaktoro;
  fig.marsoFazo += deltaTempo * fig.rapido * 0o4 * movo;
  if ( movas ) {
    fig.group.position.x += difX / d * fig.rapido * deltaTempo;
    fig.group.position.z += difZ / d * fig.rapido * deltaTempo;
    const teroY = alteco(fig.group.position.x, fig.group.position.z);
    const celoY = suprajxo ? Math.max(teroY, suprajxo(fig.group.position.x, fig.group.position.z)) : teroY;
    // ⟨ j͐ʃэ ɭ(ᴜ , ꞙɭı , j͐ʃэ ɭ(ᴜ , ꞙɭɔ , ⟅ 📃 ⟩
    fig.grundaY = fig.grundaY + ( celoY - fig.grundaY ) * 0o15/0o100;
    fig.group.rotation.y = Math.atan2(difX, difZ);
  }
  fig.group.position.y = fig.grundaY;
  fig.group.rotation.z = Math.sin(t * 0o115/0o100 + fig.hejmo.x) * 0o1/0o100 * ( 0o1 - movo );
  const idlaBrako = Math.sin(t * 0o7 + fig.hejmo.z) * 0o2/0o100 * ( 0o1 - movo );
  marŝSvingo(fig, fig.marsoFazo, movo, deltaTempo);
  fig.haknece[0].rotation.x += idlaBrako;
  fig.haknece[1].rotation.x -= idlaBrako;
}
