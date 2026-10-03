// ≺⧼ មនុស្ស 🧍 ⧽≻
import * as THREE from "three";
import { HARSTILOJ } from "../vestaro/vestoj.js";
import type { Vesto, Harstilo } from "../vestaro/vestoj.js";

export type { Vesto };
import { figurajGeometriojn } from "./homoj/geometrioj.js";
import { HARO_Y, haraMaterialo, harKoloro, harKoloroA, harKoloroB, haranGeometrion } from "./homoj/haroj.js";
import { ledajMaterialoj, ungaMaterialo, vestajMaterialoj } from "./homoj/materialoj.js";
import { HALTO_GAMO, INTERNO_PIVOTO_Y, KOLO_Y, KUBUTO_Y, MALEOLO_Y, SASA_Y } from "./homoj/mezuroj.js";
import { OKULAJ_ELEKTOJ, PALPEBRA_DAURO, PALPEBRA_FERMO, PALPEBRA_INTERVALO, okulaMaterialo } from "./homoj/okuloj.js";
import { palpebraPivoto } from "./homoj/vizagxo.js";

export interface Figuro {
  group: THREE.Group;
  agordiVeston: ( o: Vesto ) => void;
  agordiHaranStilon: ( stilo: Harstilo ) => void;
  agordiHaranKoloron: ( koloro: number ) => void;
  hejmo: THREE.Vector3;
  celo: THREE.Vector3;
  atendo: number;
  rapido: number;
  // ⟨ រូបមានកម្ពស់ផ្ទាល់ខ្លួន 📏 ⟩
  alto: number;
  marsoFazo: number;
  movoFaktoro: number;
  // ⟨ ការបែកភ្នែកមាននាឡិកាផ្ទាល់ 📃 ⟩
  palpebraFazo: number;
  palpebroj: THREE.Object3D;
  kruroj: [ THREE.Object3D, THREE.Object3D ];
  brakoj: [ THREE.Object3D, THREE.Object3D ];
  // ⟨ សន្លាក់ 📃 ⟩
  genuoj: [ THREE.Object3D, THREE.Object3D ];
  kubutoj: [ THREE.Object3D, THREE.Object3D ];
  // ⟨ ក្រណាត់ និងក្បាលជាផ្នែកអាចចលនា 📃 ⟩
  roboGrupo: THREE.Object3D;
  kapoGrupo: THREE.Object3D;
  // ⟨ ផ្នែកអាចចលនាដទៃ 📃 ⟩
  torsoGrupo: THREE.Object3D;
  sxuoj: [ THREE.Object3D, THREE.Object3D ];
  haroGrupo: THREE.Object3D;
  manikoj: THREE.Object3D[];
  // ⟨ អាវក្នុងមានអ័ក្សផ្ទាល់ 📃 ⟩
  internoGrupo: THREE.Object3D;
  // ⟨ គំរូទាំងពីរ 📃 ⟩
  korpoj: THREE.Object3D[];
  vestoj: THREE.Object3D[];
}

export function konstruiFiguron(o: Vesto, haroKlavo = "haroMalalta",
  alto?: number): Figuro {
  const g = new THREE.Group();
  // ⟨ កម្ពស់ប្រែប្រួលបន្តិច 📏 ⟩
  // ⟨ ហេតុអ្វីគ្មានធរណីមាត្រដោយឡែក 📃 ⟩
  const altaFaktoro = alto ?? ( 0o1 + ( Math.random() * 0o2 - 0o1 ) * HALTO_GAMO );
  g.scale.setScalar(altaFaktoro);
  const G = figurajGeometriojn();
  const haŭto = new THREE.MeshStandardMaterial({ color: 0x605050, roughness: 0o55/0o100 });
  const torso = new THREE.Mesh(G.korpo, haŭto);
  const kapo = new THREE.Mesh(G.kapa, haŭto);
  // ⟨ រូបនីមួយៗទទួលបាលេតភ្នែកផ្ទាល់ 📃 ⟩
  const vizaĝo = new THREE.Mesh(G.vizaĝo,
    okulaMaterialo(OKULAJ_ELEKTOJ[Math.floor(Math.random() * OKULAJ_ELEKTOJ.length)]));

  harKoloro.lerpColors(harKoloroA, harKoloroB, Math.random());
  const haroM = haraMaterialo(harKoloro.getHex());
  // ⟨ ចិញ្ចើម និងរោមភ្នែកពាក់វត្ថុសក់ 📃 ⟩
  const strikoj = new THREE.Mesh(G.vizaĝajStrikoj, haroM);
  strikoj.position.y = -KOLO_Y;
  // ⟨ ត្របកភ្នែក 📃 ⟩
  const palpebroj = new THREE.Mesh(G.palpebroj, haŭto);
  palpebroj.position.y = palpebraPivoto();

  const { internoM, eksteraM, pantalonoM, manikoM } = vestajMaterialoj(o);
  const { botoM, akcentaM } = ledajMaterialoj(o);

  const interno = new THREE.Mesh(G.interna, internoM);
  interno.position.y = -INTERNO_PIVOTO_Y;
  const ekstera = new THREE.Mesh(G.roba, eksteraM);
  ekstera.position.y = -SASA_Y;
  // ⟨ ក្រណាត់យោលនៅចង្កេះ 📃 ⟩
  // ⟨ អាវព្យួរពីស្មា 📃 ⟩
  const roboGrupo = new THREE.Group();
  roboGrupo.position.y = SASA_Y;
  const internoGrupo = new THREE.Group();
  internoGrupo.position.y = INTERNO_PIVOTO_Y - SASA_Y;
  internoGrupo.add(interno);
  roboGrupo.add(internoGrupo, ekstera);

  // ⟨ ជើង 📃 ⟩
  // ⟨ អ័ក្សនៅត្រគាក មិនមែនជង្គង់ 📃 ⟩
  // ⟨ អ័ក្សជាត្រគាក ជង្គង់នៅ 0.4297 ក្រោម 📃 ⟩
  const koksoY = 0o167/0o200;
  const genuoKompenso = -0o67/0o200;
  const kruroL = new THREE.Group(); kruroL.position.y = koksoY;
  const kruroR = new THREE.Group(); kruroR.position.y = koksoY;
  // ⟨ ជើងជិតកណ្តាលជាង 📃 ⟩
  // ⟨ ខោក៏មកជាពីរផ្នែក 📃 ⟩
  const pL = new THREE.Mesh(G.pantalonaSupra, pantalonoM); pL.position.set(-0o3/0o40, genuoKompenso, 0);
  const pR = new THREE.Mesh(G.pantalonaSupra, pantalonoM); pR.position.set(0o3/0o40, genuoKompenso, 0);
  // ⟨ ជើងមនុស្ស 📃 ⟩
  const korpoL = new THREE.Mesh(G.kruroSupra, haŭto); korpoL.position.set(-0o3/0o40, genuoKompenso, 0);
  const korpoR = new THREE.Mesh(G.kruroSupra, haŭto); korpoR.position.set(0o3/0o40, genuoKompenso, 0);
  // ⟨ ជង្គង់ជាក្រុមដោយឡែក 📃 ⟩
  // ⟨ ផ្នែកក្រោមនៅសូន្យ 📃 ⟩
  const genuoL = new THREE.Group(); genuoL.position.y = genuoKompenso;
  const genuoR = new THREE.Group(); genuoR.position.y = genuoKompenso;
  const pSubL = new THREE.Mesh(G.pantalonaMalsupra, pantalonoM);
  const pSubR = new THREE.Mesh(G.pantalonaMalsupra, pantalonoM);
  const kSubL = new THREE.Mesh(G.kruroMalsupra, haŭto);
  const kSubR = new THREE.Mesh(G.kruroMalsupra, haŭto);
  pSubL.position.set(-0o3/0o40, 0, 0); pSubR.position.set(0o3/0o40, 0, 0);
  kSubL.position.set(-0o3/0o40, 0, 0); kSubR.position.set(0o3/0o40, 0, 0);
  // ⟨ ជើងមនុស្សនៅក្រុមស្បែកជើង 📃 ⟩
  const korpaPiedoL = new THREE.Mesh(G.korpaPiedo, haŭto);
  const korpaPiedoR = new THREE.Mesh(G.korpaPiedo, haŭto);
  korpaPiedoL.position.set(-0o3/0o40, -MALEOLO_Y, 0);
  korpaPiedoR.position.set(0o3/0o40, -MALEOLO_Y, 0);
  // ⟨ កជើង 📃 ⟩
  // ⟨ ក្រុមកជើងនៅក្នុងក្រុមជង្គង់ 📃 ⟩
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

  // ⟨ ដៃ 📃 ⟩
  // ⟨ អ័ក្សនៅចុងស្មា 📃 ⟩
  // ⟨ ដៃនៅឆ្ងាយជាង 📃 ⟩
  // ⟨ អ័ក្សទៅខាងក្រៅជាង 📃 ⟩
  const brakoL = new THREE.Group(); brakoL.position.set(-0o70/0o400, 0o265/0o200, 0);
  const brakoR = new THREE.Group(); brakoR.position.set(0o70/0o400, 0o265/0o200, 0);
  const manikoj: THREE.Mesh[] = [];
  const manikajMeshoj: THREE.Mesh[] = [];
  const manoj: THREE.Mesh[] = [];
  const ungoj: THREE.Mesh[] = [];
  const brakoj: THREE.Mesh[] = [];
  const kubutajGrupoj: THREE.Group[] = [];
  for ( const [ brako, dir ] of [ [ brakoL, -0o1 ], [ brakoR, 0o1 ] ] as [ THREE.Group, number ][] ) {
    const klino = new THREE.Group();
    // ⟨ ដៃបើកបន្តិច 📃 ⟩
    klino.rotation.z = dir * 0o27/0o1000;
    const maniko = new THREE.Mesh(G.manikaSupra, manikoM);
    const manikoSub = new THREE.Mesh(G.manikaMalsupra, manikoM);
    const haŭtaBrakо = new THREE.Mesh(G.brakoSupra, haŭto);
    const haŭtaBrakоSub = new THREE.Mesh(G.brakoMalsupra, haŭto);
    const mano = new THREE.Mesh(G.mano, haŭto);
    // ⟨ ដៃក៏ឆ្លុះដែរ 📃 ⟩
    haŭtaBrakо.scale.x = dir;
    haŭtaBrakоSub.scale.x = dir;
    // ⟨ មេដៃឆ្លុះ 📃 ⟩
    mano.scale.x = dir;
    // ⟨ ប្រអប់ដៃបែរទៅត្រគាក 📃 ⟩
    mano.rotation.y = -dir * Math.PI / 0o2;
    // ⟨ ក្រចកជាកូននៃដៃ 📃 ⟩
    const ungo = new THREE.Mesh(G.ungoj, ungaMaterialo());
    ungo.castShadow = false;
    mano.add(ungo);
    ungoj.push(ungo);
    manoj.push(mano);
    brakoj.push(haŭtaBrakо, haŭtaBrakоSub);
    // ⟨ ដៃមើលឃើញក្រោមដៃអាវ 📃 ⟩
    // ⟨ កែងដៃជាក្រុមដោយឡែក 📃 ⟩
    // ⟨ កំភួនដៃ និងដៃអាវនៅសូន្យ 📃 ⟩
    const kubuto = new THREE.Group();
    kubuto.position.y = KUBUTO_Y;
    mano.position.y = -0o36/0o64 - KUBUTO_Y;
    kubuto.add(haŭtaBrakоSub, manikoSub, mano);
    kubutajGrupoj.push(kubuto);
    klino.add(haŭtaBrakо, maniko, kubuto);
    manikoj.push(maniko);
    manikajMeshoj.push(maniko, manikoSub);
    brako.add(klino);
  }

  // ⟨ បែបសក់ 📃 ⟩
  const haroMeshoj = new Map<string, THREE.Mesh>();
  for ( const stilo of HARSTILOJ ) haroMeshoj.set(stilo.nomo, new THREE.Mesh(haranGeometrion(stilo), haroM));
  const aktivaHaro = haroMeshoj.has(haroKlavo) ? haroKlavo : "haroMalalta";

  // ⟨ ក្បាលលំអៀងនៅក 📃 ⟩
  const kapoGrupo = new THREE.Group();
  kapoGrupo.position.y = KOLO_Y;
  kapo.position.y = -KOLO_Y;
  vizaĝo.position.y = -KOLO_Y;
  kapoGrupo.add(kapo, vizaĝo, strikoj, palpebroj);
  // ⟨ សក់ព្យួរពីកំពូលក្បាល 📃 ⟩
  const haroGrupo = new THREE.Group();
  haroGrupo.position.set(0, HARO_Y - KOLO_Y, -0o3/0o40);
  kapoGrupo.add(haroGrupo);
  for ( const [ klavo, mesho ] of haroMeshoj ) {
    mesho.visible = klavo === aktivaHaro;
    mesho.position.set(0, -HARO_Y, 0o3/0o40);
    haroGrupo.add(mesho);
  }

  // ⟨ តួបង្វិលនៅចង្កេះ 📃 ⟩
  const torsoGrupo = new THREE.Group();
  torsoGrupo.position.y = SASA_Y;
  roboGrupo.position.y = 0;
  torso.position.y = -SASA_Y;
  kapoGrupo.position.y = KOLO_Y - SASA_Y;
  brakoL.position.y = 0o133/0o100 - SASA_Y;
  brakoR.position.y = 0o133/0o100 - SASA_Y;
  torsoGrupo.add(roboGrupo, torso, kapoGrupo, brakoL, brakoR);

  // ⟨ គំរូទាំងពីរ 📃 ⟩
  const korpoj: THREE.Mesh[] = [ kapo, vizaĝo, strikoj, palpebroj, torso, korpoL, korpoR,
    kSubL, kSubR, korpaPiedoL, korpaPiedoR, ...brakoj, manoj[0], manoj[1], ...ungoj,
    ...haroMeshoj.values() ];
  const vestoj: THREE.Mesh[] = [ interno, ekstera, pL, pR, pSubL, pSubR,
    bL, bR, akcL, akcR, ...manikajMeshoj ];
  for ( const m of korpoj ) m.userData.speco = "korpo";
  for ( const m of vestoj ) m.userData.speco = "vesto";

  g.add(torsoGrupo, kruroL, kruroR);
  g.traverse(m => { if ( ( m as THREE.Mesh ).isMesh ) (m as THREE.Mesh).castShadow = true; });
  // ⟨ ផ្នែកលាក់មិនបញ្ចាំងស្រមោល 📃 ⟩
  torso.castShadow = false;
  korpoL.castShadow = false;
  korpoR.castShadow = false;
  kSubL.castShadow = false;
  kSubR.castShadow = false;
  korpaPiedoL.castShadow = false;
  korpaPiedoR.castShadow = false;
  for ( const b of brakoj ) b.castShadow = false;
  manoj[0].castShadow = false;
  manoj[1].castShadow = false;
  for ( const ungo of ungoj ) ungo.castShadow = false;

  const fig: Figuro = {
    group: g,
    alto: altaFaktoro,
    hejmo: new THREE.Vector3(),
    celo: new THREE.Vector3(),
    atendo: 0, rapido: 0o63/0o100,
    marsoFazo: Math.random() * Math.PI * 0o2,
    movoFaktoro: 0,
    palpebraFazo: Math.random() * PALPEBRA_INTERVALO,
    palpebroj,
    kruroj: [ kruroL, kruroR ],
    brakoj: [ brakoL, brakoR ],
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
    agordiVeston(nova: Vesto) {
      const novaVesta = vestajMaterialoj(nova);
      interno.material = novaVesta.internoM;
      ekstera.material = novaVesta.eksteraM;
      pL.material = novaVesta.pantalonoM;
      pR.material = novaVesta.pantalonoM;
      for ( const maniko of manikajMeshoj ) maniko.material = novaVesta.manikoM;
      const novaLedo = ledajMaterialoj(nova);
      bL.material = novaLedo.botoM; bR.material = novaLedo.botoM;
      akcL.material = novaLedo.akcentaM; akcR.material = novaLedo.akcentaM;
    },
    agordiHaranStilon(stilo: Harstilo) {
      const aktiva = haroMeshoj.has(stilo.nomo) ? stilo.nomo : "haroMalalta";
      for ( const [ klavo, mesho ] of haroMeshoj ) mesho.visible = klavo === aktiva;
    },
    agordiHaranKoloron(koloro: number) {
      const nova = haraMaterialo(koloro);
      for ( const mesho of haroMeshoj.values() ) mesho.material = nova;
      // ⟨ ចិញ្ចើម និងរោមភ្នែកប្រែតាម 📃 ⟩
      strikoj.material = nova;
    },
  };
  return fig;
}

// ⟨ ក្រណាត់តាមតួ 📃 ⟩
// ⟨ ហេតុអ្វី FAZO 📃 ⟩
export function marŝSvingo(
  fig: Pick<Figuro, "group" | "kruroj" | "brakoj" | "genuoj" | "kubutoj"
    | "roboGrupo" | "kapoGrupo" | "internoGrupo"
    | "torsoGrupo" | "sxuoj" | "haroGrupo" | "manikoj" | "palpebroj" | "palpebraFazo">,
  fazo: number, movo: number, deltaTempo = 0o1/0o60
): void {
  const paso = Math.sin(fazo);
  const duobla = Math.sin(fazo * 0o2);
  // ⟨ ជើង 📃 ⟩
  // ⟨ ជំហាននៅដូចដើម ទោះជើងវែងជាង 📃 ⟩
  const svingoKruro = 0o3/0o20 * movo * paso;
  fig.kruroj[0].rotation.x = -svingoKruro;
  fig.kruroj[1].rotation.x = svingoKruro;
  // ⟨ ជង្គង់ 📃 ⟩
  // ⟨ ការបត់មូលដ្ឋាន 📃 ⟩
  const fleksoGenuo = ( p: number ) =>
    ( 0o1/0o20 + 0o13/0o40 * Math.max(0, -Math.sin(p - 0o3/0o10)) ) * movo;
  fig.genuoj[0].rotation.x = fleksoGenuo(fazo);
  fig.genuoj[1].rotation.x = fleksoGenuo(fazo + Math.PI);
  // ⟨ ការរមៀលបាតជើង 📃 ⟩
  // ⟨ ការរមៀលតូច 📃 ⟩
  const maleolo = 0o5/0o200 * movo * Math.sin(fazo - 0o7/0o10);
  fig.sxuoj[0].rotation.x = -maleolo;
  fig.sxuoj[1].rotation.x = maleolo;
  // ⟨ ការលំអៀងពេលដើរ 📃 ⟩
  fig.group.position.y += ( 0o7/0o1000 + 0o7/0o1000 * Math.cos(fazo * 0o2) ) * movo;
  // ⟨ ដៃ 📃 ⟩
  const svingoBrako = 0o4/0o100 * movo * paso;
  fig.brakoj[0].rotation.x = svingoBrako;
  fig.brakoj[1].rotation.x = -svingoBrako;
  // ⟨ កែងដៃ 📃 ⟩
  const fleksoKubuto = ( p: number ) => -( 0o1/0o25
    + 0o1/0o50 * movo * ( 0o1/0o2 + 0o1/0o2 * Math.sin(p) ) );
  fig.kubutoj[0].rotation.x = fleksoKubuto(fazo);
  fig.kubutoj[1].rotation.x = fleksoKubuto(fazo + Math.PI);
  // ⟨ តួ 📃 ⟩
  fig.torsoGrupo.rotation.y = -0o4/0o100 * movo * paso;
  fig.torsoGrupo.rotation.x = 0o5/0o100 * movo - 0o1/0o100 * movo * duobla;
  fig.torsoGrupo.rotation.z = -0o3/0o100 * movo * paso;
  // ⟨ ក្រណាត់ 📃 ⟩
  // ⟨ អាវធំព្យួរបញ្ឈរ 📃 ⟩
  // ⟨ ការយោលធំជាង 📃 ⟩
  fig.roboGrupo.rotation.z = 0o4/0o200 * movo * Math.sin(fazo - 0o5/0o10)
    - 0o1/0o2 * fig.torsoGrupo.rotation.z;
  fig.roboGrupo.rotation.x = 0o5/0o200 * movo * Math.sin(fazo * 0o2 - 0o5/0o10)
    - 0o1/0o2 * fig.torsoGrupo.rotation.x;
  fig.roboGrupo.rotation.y = 0o5/0o200 * movo * Math.sin(fazo - 0o6/0o10);
  // ⟨ អាវតាមជំហាន 📃 ⟩
  // ⟨ ការបង្វិល 📃 ⟩
  fig.internoGrupo.rotation.y = 0o5/0o100 * movo * paso;
  // ⟨ តួរមៀលលើជើងចុះចត 📃 ⟩
  // ⟨ អាវយោលតែជាមួយការបង្វិល 📃 ⟩
  fig.internoGrupo.rotation.x = -0o1/0o10 * fig.torsoGrupo.rotation.x;
  fig.internoGrupo.rotation.z = 0o3/0o10 * fig.torsoGrupo.rotation.z;
  // ⟨ ដៃអាវ 📃 ⟩
  fig.manikoj[0].rotation.x = -0o1/0o40 * movo * Math.sin(fazo - 0o5/0o10);
  fig.manikoj[1].rotation.x = 0o1/0o40 * movo * Math.sin(fazo - 0o5/0o10);
  // ⟨ ក្បាល 📃 ⟩
  fig.kapoGrupo.rotation.x = 0o1/0o100 * movo * duobla + 0o1/0o100 * movo;
  fig.kapoGrupo.rotation.z = -0o1/0o100 * movo * paso;
  // ⟨ សក់ 📃 ⟩
  // ⟨ ការយោលតូច 📃 ⟩
  fig.haroGrupo.rotation.x = -0o4/0o100 * movo * Math.sin(fazo * 0o2 - 0o7/0o10);
  fig.haroGrupo.rotation.z = 0o3/0o100 * movo * Math.sin(fazo - 0o7/0o10);
  // ⟨ ការបែកភ្នែក 📃 ⟩
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
    fig.group.position.y = fig.group.position.y + ( celoY - fig.group.position.y ) * 0o15/0o100;
    fig.group.rotation.y = Math.atan2(difX, difZ);
  }
  fig.group.rotation.z = Math.sin(t * 0o115/0o100 + fig.hejmo.x) * 0o1/0o100 * ( 0o1 - movo );
  const idlaBrako = Math.sin(t * 0o7 + fig.hejmo.z) * 0o2/0o100 * ( 0o1 - movo );
  marŝSvingo(fig, fig.marsoFazo, movo, deltaTempo);
  fig.brakoj[0].rotation.x += idlaBrako;
  fig.brakoj[1].rotation.x -= idlaBrako;
}
