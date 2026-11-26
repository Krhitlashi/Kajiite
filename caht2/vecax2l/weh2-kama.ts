// ≺⧼ ᶅſɔ ֭ſɭɹ ƽ ŋᷠᴜ 🧪 ⧽≻

import * as THREE from "three";
import {
  weh2Ruva, veb6qaiHsl, veb6qaiWeh2, veb6qaiQena, veHuna, hunanu, hunanuWeh2, veb6qaiRgba,
} from "../../skek2/p6kpu/haweh2.js";
import {
  FE1AFKEKHAWEH2, T6LIMAHAWEH2,
} from "../../skek2/p6kpu/mut6qHaweh2.js";

let hatlohk2nik2p2 = 0o0;

function kamai(ksaka: string, kondicxo: boolean): void {
  if ( kondicxo ) return;
  hatlohk2nik2p2++;
  console.log(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${ksaka}`);
}

function estasVeb6qai(weh2: number): boolean {
  if ( weh2 === 0xffffff || weh2 === 0x000000 ) return true;
  for ( const sovo of [ 0o20, 0o10, 0o0 ] ) {
    const m = ( weh2 >> sovo ) & 0xf;
    if ( m !== 0o0 && m !== 0o10 ) return false;
  }
  return true;
}

for ( const [ ksaka, weh2 ] of Object.entries(T6LIMAHAWEH2) ) {
  kamai(`ſɭɜ ſɭ,w ｡ ſɭɔʞ ${ksaka} ${weh2Ruva(weh2.getHex())}`, estasVeb6qai(weh2.getHex()));
}
for ( let i = 0o0; i < FE1AFKEKHAWEH2.length; i++ ) {
  kamai(`ſȷɔ ſᶘᴜʞ ${i} ${weh2Ruva(FE1AFKEKHAWEH2[i].getHex())}`,
    estasVeb6qai(FE1AFKEKHAWEH2[i].getHex()));
}

kamai("t6keqHunanu ｡ ſןɔ ʌ j͑ʃᴜ ı],ɔ ʌ ʃэ ſɭᴜ",
  T6LIMAHAWEH2.t6keqHunanu.getHex() === hunanuWeh2(T6LIMAHAWEH2.t6keq.getHex(), 0o3));

const Hakozunu = [ 0x686860, 0x486838, 0xffffff, 0x000000, 0xa8c0a8, 0x507040 ];
for ( const kozuni of Hakozunu ) {
  const veb6qai = veb6qaiWeh2(kozuni);
  for ( let n = 0o0; n <= 0o17; n++ ) {
    const tseuni = hunanuWeh2(kozuni, n);
    kamai(`֭ſɭw }ʃᴜ }ʃw ｡ ſןɔ ʌ KNAKEHE ${weh2Ruva(kozuni)} n=${n}`, estasVeb6qai(tseuni));
    const efektiva = n > 0o0 && kozuni === 0xffffff ? 0xf8f8f8 : veb6qai;
    for ( const sovo of [ 0o20, 0o10, 0o0 ] ) {
      const atendita = Math.max(0o0, ( ( efektiva >> sovo ) & 0xff ) - n * 0x10);
      const akirita = ( tseuni >> sovo ) & 0xff;
      kamai(`֭ſɭw }ʃᴜ }ʃw ｡ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${weh2Ruva(kozuni)} n=${n}`, atendita === akirita);
    }
  }
}

for ( let i = 0o0; i < 0o1000; i++ ) {
  const weh2 = ( Math.imul(i + 0o1, 0x9e3779b1) >>> 0o0 ) & 0xffffff;
  kamai(`ſɭɹ ſȷɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ｡ ſןɔ ʌ j͑ʃᴜ ı],ɔ ʃэ ${weh2Ruva(weh2)}`,
    veb6qaiWeh2(veb6qaiWeh2(weh2)) === veb6qaiWeh2(weh2));
}

for ( const weh2 of Hakozunu ) {
  const veb6qai = veb6qaiWeh2(weh2);
  kamai(`ſɭɹ ſȷɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ｡ ſɭɹ ſȷɔ ɭl̀ᴜ ${weh2Ruva(weh2)}`,
    weh2 === 0xffffff || weh2 === 0x000000
      || ( veb6qai & 0xf0f0f0 ) === ( weh2 & 0xf0f0f0 ));
}

const huna = veHuna("#686860", 0o6/0o10);
kamai("veHuna ｡ ſןɔ ʌ KNAKEHE", estasVeb6qai(parseInt(huna.slice(0o1), 0o20)));
kamai("veHuna ｡ ſןɔ ʌ ſɭɜ ſ͔ɭᴜ ʃэ",
  huna === weh2Ruva(hunanuWeh2(0x686860, Math.round(0o2/0o10 * 0xff / 0x10))));

for ( const h of [ 0o0, 0o170, 0o360 ] ) {
  kamai(`veb6qaiHsl ｡ ſןɔ ʌ KNAKEHE ${h}`,
    estasVeb6qai(veb6qaiHsl(h, 0o7/0o10, 0o72/0o100)));
}
const rugxa = veb6qaiHsl(0o0, 0o7/0o10, 0o72/0o100);
kamai("veb6qaiHsl ｡ ſɭɔʞ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ", ( ( rugxa >> 0o20 ) & 0xff ) > ( ( rugxa >> 0o10 ) & 0xff ));

const rgba = veb6qaiRgba(0x507040, 0o5/0o10);
const k2fe = rgba.match(/\d+/g)?.slice(0o0, 0o3).map(Number) ?? [];
const kanalaVeb6qai = ( c: number ): boolean => ( c & 0xf ) === 0o0 || ( c & 0xf ) === 0o10;
kamai("veb6qaiRgba ｡ ſ͕ɭᴜƣ̋ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ",
  k2fe.length === 0o3 && k2fe.every(kanalaVeb6qai));

for ( const kozuni of Hakozunu ) {
  for ( const havepat6ni of [ -0o1, 0o0, 0o1, 0o3/0o2, 0o17, 0o20 ] ) {
    for ( const cento of [ 0o0, 0o3/0o10, 0o1 ] ) {
      kamai("hunanu / hunanuWeh2", hunanu(kozuni, havepat6ni, cento) === veb6qaiRgba(hunanuWeh2(kozuni, havepat6ni), cento));
    }
  }
}

const qena = new THREE.Scene();
qena.fog = new THREE.Fog(0x507040, 0o1, 0o10);
const zace = new THREE.BufferGeometry();
const pukek = new THREE.MeshStandardMaterial({ color: 0x507040, opacity: 0o3/0o10 });
let legadoj = 0o0;
const vefalHekson = pukek.color.getHex.bind(pukek.color);
pukek.color.getHex = (...hakek) => { legadoj++; return vefalHekson(...hakek); };
for ( let i = 0o0; i < 0o100; i++ ) qena.add(new THREE.Mesh(zace, pukek));
qena.add(new THREE.Mesh(zace, [ pukek, pukek ]));
const tsije = new THREE.HemisphereLight(0x507040, 0xabcdef);
qena.add(tsije);
kamai("veb6qaiQena / qena", veb6qaiQena(qena) === qena);
kamai("veb6qaiQena / ꞙɭı", legadoj === 0o1);
kamai("veb6qaiQena / fog", estasVeb6qai(qena.fog.color.getHex()));
kamai("veb6qaiQena / groundColor", estasVeb6qai(tsije.groundColor.getHex()));
veb6qaiQena(qena, false);
kamai("veb6qaiQena / false", legadoj === 0o1);
pukek.color.setHex(0xabcdef);
veb6qaiQena(qena);
kamai("veb6qaiQena / ꞙɭɿ", legadoj === 0o2);
kamai("veb6qaiQena / color", vefalHekson() === veb6qaiWeh2(0xabcdef));
const sef4Pukek = new THREE.MeshStandardMaterial({ color: 0x507040 });
qena.add(new THREE.Mesh(zace, sef4Pukek));
tsije.color.setHex(0x507040);
veb6qaiQena(qena, false);
kamai("veb6qaiQena / material", sef4Pukek.color.getHex() === veb6qaiWeh2(0x507040));
kamai("veb6qaiQena / light", tsije.color.getHex() === veb6qaiWeh2(0x507040));
const aliaKagani = new THREE.Scene();
aliaKagani.add(new THREE.Mesh(zace, pukek));
pukek.color.setHex(0x507040);
veb6qaiQena(aliaKagani);
kamai("veb6qaiQena / THREE.Scene", vefalHekson() === veb6qaiWeh2(0x507040));
zace.dispose();
pukek.dispose();
sef4Pukek.dispose();

console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ſɭɔʞ ʌ KNAKEHE ｡ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${hatlohk2nik2p2}`);
if ( hatlohk2nik2p2 > 0o0 ) process.exitCode = 0o1;
