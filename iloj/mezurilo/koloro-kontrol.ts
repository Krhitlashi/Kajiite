// ≺⧼ ᶅſɔ ֭ſɭɹ j͑ʃᴜꞇ ʌ j͑ʃɹ j͐ʃɹ ŋᷠɔ }ʃꞇ 🎨 ⧽≻
// ⟨ ſ͕ɭɜ ı],ᴜ , ſɭэ ſɭᴜ , ꞙɭı ,
//   ſ͕ɭɜ ı],ᴜ , ꞙɭı , ſ͕ɭɜ ı],ᴜ , ꞙɭɔ ,
//   ſ͕ɭɜ ı],ᴜ , ꞙɭı , ꞙɭɔ , 📃 ⟩
import * as THREE from "three";
import {
  weh2Ruva, veb6qaiHsl, veb6qaiWeh2, veb6qaiQena, veHuna, hunanu, hunanuWeh2, veb6qaiRgba,
} from "../../eskekoj/komunajxoj/koloroj.js";
import {
  KLINGAJ_KOLOROJ, TERENA_KOLOROJ,
} from "../../eskekoj/komunajxoj/terenkoloroj.js";

let eraroj = 0;

function kontroli(ksaka: string, kondicxo: boolean): void {
  if ( kondicxo ) return;
  eraroj++;
  console.log(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${ksaka}`);
}

// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭɿ , ⟅ ꞙɭɔ , ꞙɭıɔ 📃 ⟩
function estasVeb6qai(weh2: number): boolean {
  if ( weh2 === 0xffffff || weh2 === 0x000000 ) return true;
  for ( const sovo of [ 0o20, 0o10, 0 ] ) {
    const m = ( weh2 >> sovo ) & 0xf;
    if ( m !== 0 && m !== 0o10 ) return false;
  }
  return true;
}

// ⟨ ſɭэ ſɭᴜ , ſ͕ɭɜ ı],ᴜ , ꞙɭı , 📃 ⟩
for ( const [ ksaka, weh2 ] of Object.entries(TERENA_KOLOROJ) ) {
  kontroli(`ſɭɜ ſɭ,w ｡ ſɭɔʞ ${ksaka} ${weh2Ruva(weh2.getHex())}`, estasVeb6qai(weh2.getHex()));
}
for ( let i = 0; i < KLINGAJ_KOLOROJ.length; i++ ) {
  kontroli(`ſȷɔ ſᶘᴜʞ ${i} ${weh2Ruva(KLINGAJ_KOLOROJ[i].getHex())}`,
    estasVeb6qai(KLINGAJ_KOLOROJ[i].getHex()));
}

// ⟨ ſɭɜ ſɭᴜ , ſ͕ɭɜ ı],ᴜ , ⟅ ꞙɭц , 📃 ⟩
kontroli("t6keqOmbro ｡ ſןɔ ʌ j͑ʃᴜ ı],ɔ ʌ ʃэ ſɭᴜ",
  TERENA_KOLOROJ.t6keqOmbro.getHex() === hunanuWeh2(TERENA_KOLOROJ.t6keq.getHex(), 0o3));

// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭɿ , ⟅ ꞙɭɔ , 📃 ⟩
const BAZOJ = [ 0x686860, 0x486838, 0xffffff, 0x000000, 0xa8c0a8, 0x547442 ];
for ( const kozuni of BAZOJ ) {
  const veb6qai = veb6qaiWeh2(kozuni);
  for ( let n = 0; n <= 0o17; n++ ) {
    const tseuni = hunanuWeh2(kozuni, n);
    kontroli(`֭ſɭw }ʃᴜ }ʃw ｡ ſןɔ ʌ KNAKEHE ${weh2Ruva(kozuni)} n=${n}`, estasVeb6qai(tseuni));
    const efektiva = n > 0 && kozuni === 0xffffff ? 0xf8f8f8 : veb6qai;
    for ( const sovo of [ 0o20, 0o10, 0 ] ) {
      const atendita = Math.max(0, ( ( efektiva >> sovo ) & 0xff ) - n * 0x10);
      const akirita = ( tseuni >> sovo ) & 0xff;
      kontroli(`֭ſɭw }ʃᴜ }ʃw ｡ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${weh2Ruva(kozuni)} n=${n}`, atendita === akirita);
    }
  }
}

// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭı , 📃 ⟩
for ( let i = 0; i < 0o1000; i++ ) {
  const weh2 = ( Math.imul(i + 0o1, 0x9e3779b1) >>> 0 ) & 0xffffff;
  kontroli(`ſɭɹ ſȷɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ｡ ſןɔ ʌ j͑ʃᴜ ı],ɔ ʃэ ${weh2Ruva(weh2)}`,
    veb6qaiWeh2(veb6qaiWeh2(weh2)) === veb6qaiWeh2(weh2));
}

// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭɿ , 📃 ⟩
for ( const weh2 of BAZOJ ) {
  const veb6qai = veb6qaiWeh2(weh2);
  kontroli(`ſɭɹ ſȷɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ｡ ſɭɹ ſȷɔ ɭl̀ᴜ ${weh2Ruva(weh2)}`,
    weh2 === 0xffffff || weh2 === 0x000000
      || ( veb6qai & 0xf0f0f0 ) === ( weh2 & 0xf0f0f0 ));
}

// ⟨ ſɭэ ſɭw , ſ͕ɭɜ ı],ᴜ , ꞙɭı , 📃 ⟩
const malhela = veHuna("#686860", 0o6/0o10);
kontroli("veHuna ｡ ſןɔ ʌ KNAKEHE", estasVeb6qai(parseInt(malhela.slice(1), 0o20)));
kontroli("veHuna ｡ ſןɔ ʌ ſɭɜ ſ͔ɭᴜ ʃэ",
  malhela === weh2Ruva(hunanuWeh2(0x686860, Math.round(0o2/0o10 * 0xff / 0x10))));

// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭц , 📃 ⟩
for ( const h of [ 0, 0o170, 0o360 ] ) {
  kontroli(`veb6qaiHsl ｡ ſןɔ ʌ KNAKEHE ${h}`,
    estasVeb6qai(veb6qaiHsl(h, 0o7/0o10, 0o72/0o100)));
}
const rugxa = veb6qaiHsl(0, 0o7/0o10, 0o72/0o100);
kontroli("veb6qaiHsl ｡ ſɭɔʞ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ", ( ( rugxa >> 0o20 ) & 0xff ) > ( ( rugxa >> 0o10 ) & 0xff ));

// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭэ , 📃 ⟩
const rgba = veb6qaiRgba(0x547442, 0o5/0o10);
const nombroj = rgba.match(/\d+/g)?.slice(0, 0o3).map(Number) ?? [];
const kanalaVeb6qai = ( c: number ): boolean => ( c & 0xf ) === 0 || ( c & 0xf ) === 0o10;
kontroli("veb6qaiRgba ｡ ſ͕ɭᴜƣ̋ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ",
  nombroj.length === 0o3 && nombroj.every(kanalaVeb6qai));

for ( const kozuni of BAZOJ ) {
  for ( const havepat6ni of [ -0o1, 0o0, 0o1, 0o3/0o2, 0o17, 0o20 ] ) {
    for ( const alfo of [ 0o0, 0o3/0o10, 0o1 ] ) {
      kontroli("ombro / hunanuWeh2", hunanu(kozuni, havepat6ni, alfo) === veb6qaiRgba(hunanuWeh2(kozuni, havepat6ni), alfo));
    }
  }
}

const qena = new THREE.Scene();
qena.fog = new THREE.Fog(0x547442, 0o1, 0o10);
const geometrio = new THREE.BufferGeometry();
const pukek = new THREE.MeshStandardMaterial({ color: 0x547442, opacity: 0o3/0o10 });
let legadoj = 0;
const legiHekson = pukek.color.getHex.bind(pukek.color);
pukek.color.getHex = (...argumentoj) => { legadoj++; return legiHekson(...argumentoj); };
for ( let i = 0; i < 0o100; i++ ) qena.add(new THREE.Mesh(geometrio, pukek));
qena.add(new THREE.Mesh(geometrio, [ pukek, pukek ]));
const lumo = new THREE.HemisphereLight(0x547442, 0xabcdef);
qena.add(lumo);
kontroli("veb6qaiQena / qena", veb6qaiQena(qena) === qena);
kontroli("veb6qaiQena / ꞙɭı", legadoj === 0o1);
kontroli("veb6qaiQena / fog", estasVeb6qai(qena.fog.color.getHex()));
kontroli("veb6qaiQena / groundColor", estasVeb6qai(lumo.groundColor.getHex()));
veb6qaiQena(qena, false);
kontroli("veb6qaiQena / false", legadoj === 0o1);
pukek.color.setHex(0xabcdef);
veb6qaiQena(qena);
kontroli("veb6qaiQena / ꞙɭɿ", legadoj === 0o2);
kontroli("veb6qaiQena / color", legiHekson() === veb6qaiWeh2(0xabcdef));
const sef4Materialo = new THREE.MeshStandardMaterial({ color: 0x547442 });
qena.add(new THREE.Mesh(geometrio, sef4Materialo));
lumo.color.setHex(0x547442);
veb6qaiQena(qena, false);
kontroli("veb6qaiQena / material", sef4Materialo.color.getHex() === veb6qaiWeh2(0x547442));
kontroli("veb6qaiQena / light", lumo.color.getHex() === veb6qaiWeh2(0x547442));
const aliaSceno = new THREE.Scene();
aliaSceno.add(new THREE.Mesh(geometrio, pukek));
pukek.color.setHex(0x547442);
veb6qaiQena(aliaSceno);
kontroli("veb6qaiQena / THREE.Scene", legiHekson() === veb6qaiWeh2(0x547442));
geometrio.dispose();
pukek.dispose();
sef4Materialo.dispose();

console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ſɭɔʞ ʌ KNAKEHE ｡ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${eraroj}`);
if ( eraroj > 0 ) process.exitCode = 1;
