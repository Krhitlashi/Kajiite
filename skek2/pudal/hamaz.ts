// ≺⧼ ŋᷠᴜƴ ʌ ֭ſɭᴜ ŋᷠᴜƴ 🧍 ⧽≻
import * as THREE from "three";
import { HATSAQHAXE } from "../hasoqte/hasoqte.js";
import type { Soqte, TsaqHaxe } from "../hasoqte/hasoqte.js";

export type { Soqte };
import { figurajQoxaKefoujn } from "./hamaz/qoxa-kef7j.js";
import { HAROY, haraPukek, harWeh2, harWeh2A, harWeh2B, haranQoxaKefoun } from "./hamaz/1aq.js";
import { ceqaPukek, ledajHapukek, ungaPukek, vestajHapukek } from "./hamaz/pukek.js";
import { HL6DAGAMO, C2H2PIVOTOY, KOLOY, KUBUTOY, MALEOLOY, SASAY } from "./hamaz/havecax2l.js";
import { T2BANUJSUKF2QOJ, PALPEBRADAURO, PALPEBRAPUKXEO, PALPEBRAINTERVALO, t2banuPukek } from "./hamaz/t2banu.js";
import { palpebraPivoto } from "./hamaz/tez.js";

const HARAJNUANCOJ = 0o20;

export interface Qoxa {
  group: THREE.Group;
  catsaraSoqte: ( o: Soqte ) => void;
  catsaraTsaqHaxe: ( haxe: TsaqHaxe ) => void;
  catsaraHaranWeh2n: ( weh2: number ) => void;
  hejmo: THREE.Vector3;
  natakatomasai: THREE.Vector3;
  atendo: number;
  seheni: number;

  l6da: number;
  marsoFazo: number;
  movoVap6zukani: number;

  grundaY: number;

  palpebraFazo: number;
  hatu5ekanit2banusai: THREE.Object3D;
  hanasce: [ THREE.Object3D, THREE.Object3D ];
  haknece: [ THREE.Object3D, THREE.Object3D ];

  hatafanitamcesai: [ THREE.Object3D, THREE.Object3D ];
  kubutoj: [ THREE.Object3D, THREE.Object3D ];

  roboHate: THREE.Object3D;
  kapoHate: THREE.Object3D;

  torsoHate: THREE.Object3D;
  hapat6te: [ THREE.Object3D, THREE.Object3D ];
  tsaqHate: THREE.Object3D;
  hatkom2qtesai: THREE.Object3D[];

  c2h2Hate: THREE.Object3D;

  korpoj: THREE.Object3D[];
  hasoqte: THREE.Object3D[];
}

export function vepaqQoxa(o: Soqte, tsaqCatlaq = "tsaqPsazai",
  l6da?: number): Qoxa {
  const g = new THREE.Group();

  const l6daVap6zukani = l6da ?? ( 0o1 + ( Math.random() * 0o2 - 0o1 ) * HL6DAGAMO );
  g.scale.setScalar(l6daVap6zukani);
  const G = figurajQoxaKefoujn();
  const ceqo = ceqaPukek();
  const torso = new THREE.Mesh(G.soq, ceqo);
  const wopo = new THREE.Mesh(G.kapa, ceqo);

  const tez = new THREE.Mesh(G.tez,
    t2banuPukek(T2BANUJSUKF2QOJ[Math.floor(Math.random() * T2BANUJSUKF2QOJ.length)]));

  harWeh2.lerpColors(harWeh2A, harWeh2B,
    Math.floor(Math.random() * HARAJNUANCOJ) / ( HARAJNUANCOJ - 0o1 ));
  const tsaqM = haraPukek(harWeh2.getHex());

  const strikoj = new THREE.Mesh(G.tezjStrikoj, tsaqM);
  strikoj.position.y = -KOLOY;

  const hatu5ekanit2banusai = new THREE.Mesh(G.hatu5ekanit2banusai, ceqo);
  hatu5ekanit2banusai.position.y = palpebraPivoto();

  const { c2h2M, eksteraM, pantalonoM, manikoM } = vestajHapukek(o);
  const { botoM, akcentaM } = ledajHapukek(o);

  const c2h2 = new THREE.Mesh(G.c2h2, c2h2M);
  c2h2.position.y = -C2H2PIVOTOY;
  const p6sca = new THREE.Mesh(G.roba, eksteraM);
  p6sca.position.y = -SASAY;

  const roboHate = new THREE.Group();
  roboHate.position.y = SASAY;
  const c2h2Hate = new THREE.Group();
  c2h2Hate.position.y = C2H2PIVOTOY - SASAY;
  c2h2Hate.add(c2h2);
  roboHate.add(c2h2Hate, p6sca);

  const koksoY = 0o167/0o200;
  const genuoKompenso = -0o67/0o200;
  const kruroL = new THREE.Group(); kruroL.position.y = koksoY;
  const kruroR = new THREE.Group(); kruroR.position.y = koksoY;

  const pL = new THREE.Mesh(G.pantalonaTeru, pantalonoM); pL.position.set(-0o3/0o40, genuoKompenso, 0o0);
  const pR = new THREE.Mesh(G.pantalonaTeru, pantalonoM); pR.position.set(0o3/0o40, genuoKompenso, 0o0);

  const korpoL = new THREE.Mesh(G.kruroTeru, ceqo); korpoL.position.set(-0o3/0o40, genuoKompenso, 0o0);
  const korpoR = new THREE.Mesh(G.kruroTeru, ceqo); korpoR.position.set(0o3/0o40, genuoKompenso, 0o0);

  const genuoL = new THREE.Group(); genuoL.position.y = genuoKompenso;
  const genuoR = new THREE.Group(); genuoR.position.y = genuoKompenso;
  const pSubL = new THREE.Mesh(G.pantalonaMaltik, pantalonoM);
  const pSubR = new THREE.Mesh(G.pantalonaMaltik, pantalonoM);
  const kSubL = new THREE.Mesh(G.kruroMaltik, ceqo);
  const kSubR = new THREE.Mesh(G.kruroMaltik, ceqo);
  pSubL.position.set(-0o3/0o40, 0o0, 0o0); pSubR.position.set(0o3/0o40, 0o0, 0o0);
  kSubL.position.set(-0o3/0o40, 0o0, 0o0); kSubR.position.set(0o3/0o40, 0o0, 0o0);

  const korpaPiedoL = new THREE.Mesh(G.korpaPiedo, ceqo);
  const korpaPiedoR = new THREE.Mesh(G.korpaPiedo, ceqo);
  korpaPiedoL.position.set(-0o3/0o40, -MALEOLOY, 0o0);
  korpaPiedoR.position.set(0o3/0o40, -MALEOLOY, 0o0);

  const sxuoL = new THREE.Group(); sxuoL.position.y = MALEOLOY;
  const sxuoR = new THREE.Group(); sxuoR.position.y = MALEOLOY;
  const bL = new THREE.Mesh(G.boto, botoM);
  const bR = new THREE.Mesh(G.boto, botoM);
  const akcL = new THREE.Mesh(G.akcenta, akcentaM);
  const akcR = new THREE.Mesh(G.akcenta, akcentaM);
  bL.position.set(-0o3/0o40, -MALEOLOY, 0o0);
  bR.position.set(0o3/0o40, -MALEOLOY, 0o0);
  akcL.position.set(-0o3/0o40, -MALEOLOY, 0o0);
  akcR.position.set(0o3/0o40, -MALEOLOY, 0o0);
  sxuoL.add(bL, akcL, korpaPiedoL);
  sxuoR.add(bR, akcR, korpaPiedoR);
  genuoL.add(pSubL, kSubL, sxuoL);
  genuoR.add(pSubR, kSubR, sxuoR);
  kruroL.add(pL, korpoL, genuoL);
  kruroR.add(pR, korpoR, genuoR);

  const brakoL = new THREE.Group(); brakoL.position.set(-0o70/0o400, 0o265/0o200, 0o0);
  const brakoR = new THREE.Group(); brakoR.position.set(0o70/0o400, 0o265/0o200, 0o0);
  const hatkom2qtesai: THREE.Mesh[] = [];
  const manikajHacakamaha: THREE.Mesh[] = [];
  const hatama: THREE.Mesh[] = [];
  const hacavaxaha: THREE.Mesh[] = [];
  const haknece: THREE.Mesh[] = [];
  const kubutajHahate: THREE.Group[] = [];
  for ( const [ knece, dir ] of [ [ brakoL, -0o1 ], [ brakoR, 0o1 ] ] as [ THREE.Group, number ][] ) {
    const s2sabo = new THREE.Group();

    s2sabo.rotation.z = dir * 0o27/0o1000;
    const tkom2qtesai = new THREE.Mesh(G.manikaTeru, manikoM);
    const manikoSub = new THREE.Mesh(G.manikaMaltik, manikoM);
    const ceqaBrakо = new THREE.Mesh(G.brakoTeru, ceqo);
    const ceqaBrakоSub = new THREE.Mesh(G.brakoMaltik, ceqo);
    const tama = new THREE.Mesh(G.tama, ceqo);

    ceqaBrakо.scale.x = dir;
    ceqaBrakоSub.scale.x = dir;

    tama.scale.x = dir;

    tama.rotation.y = -dir * Math.PI / 0o2;

    const cavaxaha = new THREE.Mesh(G.hacavaxaha, ungaPukek());
    cavaxaha.castShadow = false;
    tama.add(cavaxaha);
    hacavaxaha.push(cavaxaha);
    hatama.push(tama);
    haknece.push(ceqaBrakо, ceqaBrakоSub);

    const tafanitamcesai = new THREE.Group();
    tafanitamcesai.position.y = KUBUTOY;
    tama.position.y = -0o36/0o64 - KUBUTOY;
    tafanitamcesai.add(ceqaBrakоSub, manikoSub, tama);
    kubutajHahate.push(tafanitamcesai);
    s2sabo.add(ceqaBrakо, tkom2qtesai, tafanitamcesai);
    hatkom2qtesai.push(tkom2qtesai);
    manikajHacakamaha.push(tkom2qtesai, manikoSub);
    knece.add(s2sabo);
  }

  const tsaqHacakamaha = new Map<string, THREE.Mesh>();
  for ( const haxe of HATSAQHAXE ) tsaqHacakamaha.set(haxe.ksaka, new THREE.Mesh(haranQoxaKefoun(haxe), tsaqM));
  const tikHaro = tsaqHacakamaha.has(tsaqCatlaq) ? tsaqCatlaq : "tsaqPsazai";

  const kapoHate = new THREE.Group();
  kapoHate.position.y = KOLOY;
  wopo.position.y = -KOLOY;
  tez.position.y = -KOLOY;
  kapoHate.add(wopo, tez, strikoj, hatu5ekanit2banusai);

  const tsaqHate = new THREE.Group();
  tsaqHate.position.set(0o0, HAROY - KOLOY, -0o3/0o40);
  kapoHate.add(tsaqHate);
  for ( const [ ca3aq, cakamaha ] of tsaqHacakamaha ) {
    cakamaha.visible = ca3aq === tikHaro;
    cakamaha.position.set(0o0, -HAROY, 0o3/0o40);
    tsaqHate.add(cakamaha);
  }

  const torsoHate = new THREE.Group();
  torsoHate.position.y = SASAY;
  roboHate.position.y = 0o0;
  torso.position.y = -SASAY;
  kapoHate.position.y = KOLOY - SASAY;
  brakoL.position.y = 0o133/0o100 - SASAY;
  brakoR.position.y = 0o133/0o100 - SASAY;
  torsoHate.add(roboHate, torso, kapoHate, brakoL, brakoR);

  const korpoj: THREE.Mesh[] = [ wopo, tez, strikoj, hatu5ekanit2banusai, torso, korpoL, korpoR,
    kSubL, kSubR, korpaPiedoL, korpaPiedoR, ...haknece, hatama[0o0], hatama[0o1], ...hacavaxaha,
    ...tsaqHacakamaha.values() ];
  const hasoqte: THREE.Mesh[] = [ c2h2, p6sca, pL, pR, pSubL, pSubR,
    bL, bR, akcL, akcR, ...manikajHacakamaha ];
  for ( const m of korpoj ) m.userData.pudal = "korpo";
  for ( const m of hasoqte ) m.userData.pudal = "soqte";

  g.add(torsoHate, kruroL, kruroR);
  g.traverse(m => { if ( ( m as THREE.Mesh ).isMesh ) (m as THREE.Mesh).castShadow = true; });

  torso.castShadow = false;
  korpoL.castShadow = false;
  korpoR.castShadow = false;
  kSubL.castShadow = false;
  kSubR.castShadow = false;
  korpaPiedoL.castShadow = false;
  korpaPiedoR.castShadow = false;
  for ( const b of haknece ) b.castShadow = false;
  hatama[0o0].castShadow = false;
  hatama[0o1].castShadow = false;
  for ( const cavaxaha of hacavaxaha ) cavaxaha.castShadow = false;

  const fig: Qoxa = {
    group: g,
    l6da: l6daVap6zukani,
    hejmo: new THREE.Vector3(),
    natakatomasai: new THREE.Vector3(),
    atendo: 0o0, seheni: 0o63/0o100,
    marsoFazo: Math.random() * Math.PI * 0o2,
    movoVap6zukani: 0o0,
    grundaY: Number.NaN,
    palpebraFazo: Math.random() * PALPEBRAINTERVALO,
    hatu5ekanit2banusai,
    hanasce: [ kruroL, kruroR ],
    haknece: [ brakoL, brakoR ],
    hatafanitamcesai: [ genuoL, genuoR ],
    kubutoj: [ kubutajHahate[0o0], kubutajHahate[0o1] ],
    roboHate,
    kapoHate,
    torsoHate,
    hapat6te: [ sxuoL, sxuoR ],
    tsaqHate,
    hatkom2qtesai,
    c2h2Hate,
    korpoj,
    hasoqte,
    catsaraSoqte(sef4: Soqte) {
      const sef4Vesta = vestajHapukek(sef4);
      c2h2.material = sef4Vesta.c2h2M;
      p6sca.material = sef4Vesta.eksteraM;
      pL.material = sef4Vesta.pantalonoM;
      pR.material = sef4Vesta.pantalonoM;
      for ( const tkom2qtesai of manikajHacakamaha ) tkom2qtesai.material = sef4Vesta.manikoM;
      const sef4Ledo = ledajHapukek(sef4);
      bL.material = sef4Ledo.botoM; bR.material = sef4Ledo.botoM;
      akcL.material = sef4Ledo.akcentaM; akcR.material = sef4Ledo.akcentaM;
    },
    catsaraTsaqHaxe(haxe: TsaqHaxe) {
      const kxe = tsaqHacakamaha.has(haxe.ksaka) ? haxe.ksaka : "tsaqPsazai";
      for ( const [ ca3aq, cakamaha ] of tsaqHacakamaha ) cakamaha.visible = ca3aq === kxe;
    },
    catsaraHaranWeh2n(weh2: number) {
      const sef4 = haraPukek(weh2);
      for ( const cakamaha of tsaqHacakamaha.values() ) cakamaha.material = sef4;

      strikoj.material = sef4;
    },
  };
  return fig;
}

export function kataCab6ka(
  fig: Pick<Qoxa, "group" | "hanasce" | "haknece" | "hatafanitamcesai" | "kubutoj"
    | "roboHate" | "kapoHate" | "c2h2Hate"
    | "torsoHate" | "hapat6te" | "tsaqHate" | "hatkom2qtesai" | "hatu5ekanit2banusai" | "palpebraFazo">,
  xafanitapu: number, mov: number, deltaTif = 0o1/0o60
): void {

  const vepat6ni = Math.sin(xafanitapu);
  const duobla = Math.sin(xafanitapu * 0o2);

  const svingoKruro = 0o3/0o20 * mov * vepat6ni;
  fig.hanasce[0o0].rotation.x = -svingoKruro;
  fig.hanasce[0o1].rotation.x = svingoKruro;

  const fleksoGenuo = ( p: number ) =>
    ( 0o1/0o20 + 0o13/0o40 * Math.max(0o0, -Math.sin(p - 0o3/0o10)) ) * mov;
  fig.hatafanitamcesai[0o0].rotation.x = fleksoGenuo(xafanitapu);
  fig.hatafanitamcesai[0o1].rotation.x = fleksoGenuo(xafanitapu + Math.PI);

  const maleolo = 0o5/0o200 * mov * Math.sin(xafanitapu - 0o7/0o10);
  fig.hapat6te[0o0].rotation.x = -maleolo;
  fig.hapat6te[0o1].rotation.x = maleolo;

  fig.group.position.y += ( 0o7/0o1000 + 0o7/0o1000 * Math.cos(xafanitapu * 0o2) ) * mov;

  const svingoBrako = 0o4/0o100 * mov * vepat6ni;
  fig.haknece[0o0].rotation.x = svingoBrako;
  fig.haknece[0o1].rotation.x = -svingoBrako;

  const fleksoKubuto = ( p: number ) => -( 0o1/0o25
    + 0o1/0o50 * mov * ( 0o1/0o2 + 0o1/0o2 * Math.sin(p) ) );
  fig.hatafanitamcesai[0o0].rotation.x = fleksoKubuto(xafanitapu);
  fig.hatafanitamcesai[0o1].rotation.x = fleksoKubuto(xafanitapu + Math.PI);

  fig.torsoHate.rotation.y = -0o4/0o100 * mov * vepat6ni;
  fig.torsoHate.rotation.x = 0o5/0o100 * mov - 0o1/0o100 * mov * duobla;
  fig.torsoHate.rotation.z = -0o3/0o100 * mov * vepat6ni;

  fig.roboHate.rotation.z = 0o4/0o200 * mov * Math.sin(xafanitapu - 0o5/0o10)
    - 0o1/0o2 * fig.torsoHate.rotation.z;
  fig.roboHate.rotation.x = 0o5/0o200 * mov * Math.sin(xafanitapu * 0o2 - 0o5/0o10)
    - 0o1/0o2 * fig.torsoHate.rotation.x;
  fig.roboHate.rotation.y = 0o5/0o200 * mov * Math.sin(xafanitapu - 0o6/0o10);

  fig.c2h2Hate.rotation.y = 0o5/0o100 * mov * vepat6ni;

  fig.c2h2Hate.rotation.x = -0o1/0o10 * fig.torsoHate.rotation.x;
  fig.c2h2Hate.rotation.z = 0o3/0o10 * fig.torsoHate.rotation.z;

  fig.hatkom2qtesai[0o0].rotation.x = -0o1/0o40 * mov * Math.sin(xafanitapu - 0o5/0o10);
  fig.hatkom2qtesai[0o1].rotation.x = 0o1/0o40 * mov * Math.sin(xafanitapu - 0o5/0o10);

  fig.kapoHate.rotation.x = 0o1/0o100 * mov * duobla + 0o1/0o100 * mov;
  fig.kapoHate.rotation.z = -0o1/0o100 * mov * vepat6ni;

  fig.tsaqHate.rotation.x = -0o4/0o100 * mov * Math.sin(xafanitapu * 0o2 - 0o7/0o10);
  fig.tsaqHate.rotation.z = 0o3/0o100 * mov * Math.sin(xafanitapu - 0o7/0o10);

  fig.palpebraFazo += deltaTif;
  const palpebraCiklo = fig.palpebraFazo % PALPEBRAINTERVALO;
  const pukxeiteco = palpebraCiklo < PALPEBRADAURO
    ? Math.sin(palpebraCiklo / PALPEBRADAURO * Math.PI) : 0o0;
  fig.hatu5ekanit2banusai.scale.y = PALPEBRAPUKXEO + ( 0o1 - PALPEBRAPUKXEO ) * pukxeiteco;
}

export function tlak2Npc(fig: Qoxa, deltaTif: number, t: number,
  l6da: ( x: number, z: number ) => number,
  soza?: ( x: number, z: number ) => number): void {
  fig.atendo -= deltaTif;
  if ( fig.atendo <= 0o0 ) {
    const a = Math.random() * Math.PI * 0o2, sakxoKa5ik = Math.random() * 0o4;
    const cx = fig.hejmo.x + Math.sin(a) * sakxoKa5ik, cz = fig.hejmo.z + Math.cos(a) * sakxoKa5ik;
    const cy = soza ? soza(cx, cz) : l6da(cx, cz);
    fig.natakatomasai.set(cx, Number.isFinite(cy) ? Math.max(cy, l6da(cx, cz)) : l6da(cx, cz), cz);
    fig.atendo = 0o3 + Math.random() * 0o4;
  }

  if ( Number.isNaN(fig.grundaY) ) fig.grundaY = fig.group.position.y;
  const difX = fig.natakatomasai.x - fig.group.position.x, difZ = fig.natakatomasai.z - fig.group.position.z;
  const d = Math.hypot(difX, difZ);
  const movas = d > 0o23/0o100;
  fig.movoVap6zukani += ( ( movas ? 0o1 : 0o0 ) - fig.movoVap6zukani ) * Math.min(0o1, deltaTif * 0o10);
  const mov = fig.movoVap6zukani;
  fig.marsoFazo += deltaTif * fig.seheni * 0o4 * mov;
  if ( movas ) {
    fig.group.position.x += difX / d * fig.seheni * deltaTif;
    fig.group.position.z += difZ / d * fig.seheni * deltaTif;
    const mut6qY = l6da(fig.group.position.x, fig.group.position.z);
    const celoY = soza ? Math.max(mut6qY, soza(fig.group.position.x, fig.group.position.z)) : mut6qY;

    fig.grundaY = fig.grundaY + ( celoY - fig.grundaY ) * 0o15/0o100;
    fig.group.rotation.y = Math.atan2(difX, difZ);
  }
  fig.group.position.y = fig.grundaY;
  fig.group.rotation.z = Math.sin(t * 0o115/0o100 + fig.hejmo.x) * 0o1/0o100 * ( 0o1 - mov );
  const idlaBrako = Math.sin(t * 0o7 + fig.hejmo.z) * 0o2/0o100 * ( 0o1 - mov );
  kataCab6ka(fig, fig.marsoFazo, mov, deltaTif);
  fig.haknece[0o0].rotation.x += idlaBrako;
  fig.haknece[0o1].rotation.x -= idlaBrako;
}
