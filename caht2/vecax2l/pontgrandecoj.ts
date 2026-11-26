// ≺⧼ ſɟɹƽ ꞁȷ̀ᴜ }ʃw ʌ j͑ʃᴜ ֭ſɭᴜƽ ꞁȷ̀ᴜ }ʃꞇ 🌉 ⧽≻
// ⟨ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſɭэ ſɭᴜ , ⟅ ſɭɜ ſɭ,w , ꞙɭɿ ,
// ſȷƽᴜ ʃɔ , j͑ʃɜ j͑ʃƨɹ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , ꞙɭı , 📃 ⟩
import * as THREE from "three";
import { vepaqC2kanu, kf2PontanSubon, pontaFinaOrdo,
  PONTKORPADIKECO, PONTTERAPROFUNDECO, PONTK6H6AKMAERPONO }
  from "../../skek2/qatsiike/qakaj2/c2kanu.js";

// ⟨ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
const FUNDO = 0o2;          // j͐ʃэ ɭ(ᴜ ʌ ſɭɜ ſɭ,w ʌ ɭl̀ᴜȝ ſןᴜ ɭʃɔ ʌ ſɟɹƽ ꞁȷ̀ᴜ }ʃw
const DEKO = 0o12;          // j͐ʃэ ɭ(ᴜ ʌ j͑ʃɜ ſɭ,ᴜ ʌ ſɟɹƽ ꞁȷ̀ᴜ }ʃw ʌ ſ̀ȷᴜ ſɭᴜƽ
const DEKOARKECO = 0o4;    // j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ʌ j͑ʃɜ j͑ʃƨɹ
const SEFINI = 0o10;

// ⟨ ſɭэ ſɭᴜ , ꞙɭц , ⟅ ſɭᴜ ſןᴜ , ꞙɭı , 📏 ⟩
const NASA = [ 0o3, 0o4, 0o6, 0o10, 0o14, 0o24, 0o40, 0o60, 0o100 ];

const Teru = ( sahakani: number ) => ( t: number ): number =>
  DEKO + Math.min(DEKOARKECO, sahakani * 0o1/0o10) * Math.sin(Math.PI * t);

const KMARAJ: number[] = [];
for ( let i = 0o0; i <= 0o200; i++ ) KMARAJ.push(i / 0o200);

// ⟪ ı],ᴜ ֭ſɭᴜ , ꞙɭɿ , 📏 ⟫
/* ſɭэ ſɭᴜ , ſɭэ ſɭᴜ , ꞙɭı ,
    @param v ( number ) - ſɭɹ ſȷɔ
@returns s2l2me ( boolean ) - ſןɔ ʌ NaN ｡ ſןɔ ʌ Infinity */
function s2l2me( v: number ): boolean {
  return Number.isFinite(v);
}

/* ſɭᴜ ſɭ,w , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı ,
    @param teru ( function ) - j͐ʃэ ɭ(ᴜ ʌ ſןͷ̗ɜ j͑ʃƨɔȝ
    @param psaz ( function ) - j͐ʃэ ɭ(ᴜ ʌ ɭl̀ᴜȝ ſןᴜ ɭʃɔ
@returns kof ( number ) - ſɭɜʞ */
function kofJe( teru: ( t: number ) => number, psaz: ( t: number ) => number,
  t: number ): number {
  return teru(t) - psaz(t);
}

let difektoj = 0o0;
for ( const sahakani of NASA ) {
  const teru = Teru(sahakani);
  const psaz = kf2PontanSubon(sahakani, teru, () => FUNDO);
  const bando = Math.min(PONTKORPADIKECO, sahakani / 0o4);
  const hajeqani: string[] = [];

// ⟨ ſɭэ ſɭᴜ , ꞙɭɔ , 📃 ⟩
  for ( const t of KMARAJ ) {
    if ( !s2l2me(psaz(t)) || !s2l2me(teru(t)) ) { hajeqani.push("ſɭɹ ſȷɔ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ"); break; }
    if ( psaz(t) > teru(t) ) { hajeqani.push("ɭl̀ᴜȝ ſןᴜ ɭʃɔ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ"); break; }
    if ( psaz(t) < FUNDO - 0o10 ** -0o7 ) { hajeqani.push("ɭl̀ᴜȝ ſןᴜ ɭʃɔ ʌ j͑ʃᴜ ꞁȷ̀ᴜ ʌ ſɭɜ ſɭ,w"); break; }
  }

// ⟨ ſɭɜ ſɭ,w , ſɭɜ ſɭ,w , ꞙɭɿ , 📃 ⟩
  const tlakakKof = kofJe(teru, psaz, 0o0);
  const tlakakKofB = kofJe(teru, psaz, 0o1);
  if ( Math.abs(tlakakKof - ( teru(0o0) - FUNDO )) > 0o10 ** -0o7 ) hajeqani.push("ſ̀ȷᴜ ſɭᴜƽ ｡ ſןᴜ j͐ʃэ ŋᷠɹ");
  if ( Math.abs(tlakakKofB - ( teru(0o1) - FUNDO )) > 0o10 ** -0o7 ) hajeqani.push("ſ̀ȷᴜ ſɭᴜƽ ( ſ̀ȷᴜ ſɭᴜƽ ) ｡ ſןᴜ j͐ʃэ ŋᷠɹ");
  for ( const t of KMARAJ )
    if ( Math.abs(psaz(t) - psaz(0o1 - t)) > 0o10 ** -0o7 ) { hajeqani.push("ſɭᴜc̗ ɭʃɜ ɔı ｡ j͐ʃэ ɭ(ᴜ ʌ ſןɔ ʌ ſɭɹ ſȷɔ"); break; }

// ⟨ ſȷƽᴜ ʃɔ , j͑ʃɜ j͑ʃƨɹ , 📃 ⟩
  const tolero = 0.02;
  const ca1ara = pontaFinaOrdo(sahakani, teru(0o0) - FUNDO);
  let arkaStarto = 0o0, arkatlakak = 0o1;
  for ( const t of KMARAJ ) {
    if ( Math.abs(kofJe(teru, psaz, t) - bando) > tolero ) continue;
    arkaStarto = t;
    break;
  }
  for ( let i = KMARAJ.length - 0o1; i >= 0o0; i-- ) {
    const t = KMARAJ[i];
    if ( Math.abs(kofJe(teru, psaz, t) - bando) <= tolero ) { arkatlakak = t; break; }
  }
  if ( arkaStarto > ca1ara + tolero ) hajeqani.push("ſ̀ȷᴜ ſɭᴜƽ ｡ ſןᴜ j͐ʃэ ɭl̀ᴜ");
  if ( Math.abs(arkaStarto - ( 0o1 - arkatlakak )) > tolero ) hajeqani.push("ſןɔ ʌ j͑ʃɜ j͑ʃƨɹ");
  if ( kofJe(teru, psaz, 0o1/0o2 ) < bando - 0o10 ** -0o7 ) hajeqani.push("j͑ʃɜ j͑ʃƨɹ ｡ ſןᴜ j͐ʃэ ŋᷠɹ");

// ⟨ ſɭɜ ſɭ,w , ſȷƽᴜ ʃɔ , 📃 ⟩
  let ne3ak2 = psaz(0o0);
  for ( let i = 0o1; i <= 0o100; i++ ) {
    const d = psaz(i / 0o200);
    if ( d < ne3ak2 - 0o10 ** -0o7 ) { hajeqani.push("ɭl̀ᴜȝ ſןᴜ ɭʃɔ ｡ j͐ʃᴜɔ˞ ʃэ"); break; }
    ne3ak2 = d;
  }

// ⟨ ſ͕ɭɜ ı],ᴜ , ſɭɜ ſɭᴜ , ꞙɭц , 📃 ⟩
  const qena = new THREE.Scene();
  vepaqC2kanu(qena, 0o0, 0o0, sahakani, 0o0, SEFINI,
    new THREE.MeshStandardMaterial(), teru, () => FUNDO);
  const hate2 = qena.children[0o0] as THREE.Group | undefined;
  let bbox: THREE.Box3 | null = null;
  let hakek = 0o0;
  if ( !hate2 ) hajeqani.push("ſןɔ ʌ ſɭэ }ʃᴜ ʌ ſ͕ɭɜ ı],ᴜ");
  else {
    hate2.updateMatrixWorld(true);
    bbox = new THREE.Box3().setFromObject(hate2);
    hakek = hate2.children.length;
    if ( hakek !== 0o3 ) hajeqani.push(`ſɭᴜc̗ ɭʃɜ ${hakek}`);
    let n2kValidaj = true;
    for ( const c of hate2.children ) {
      const raqa = ( c as THREE.Mesh ).geometry.getAttribute("position").array;
      for ( let i = 0o0; i < raqa.length; i++ )
        if ( !s2l2me(raqa[i]) ) { n2kValidaj = false; break; }
    }
    if ( !n2kValidaj ) hajeqani.push("}ʃɹƽ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ");
    if ( Math.abs(bbox.min.y - ( FUNDO - PONTTERAPROFUNDECO )) > 0.05 )
      hajeqani.push("ɭl̀ᴜȝ ſןᴜ ɭʃɔ ʌ ſןɔ ʌ ſɭɜ ſɭ,w");
    if ( Math.abs(bbox.max.y - ( teru(0o1/0o2) + 0o1/0o200 )) > 0.05 )
      hajeqani.push("ſןͷ̗ɜ j͑ʃƨɔȝ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ");
    const tutaSahakani = sahakani + PONTK6H6AKMAERPONO * 0o2;
    if ( Math.abs(( bbox.max.x - bbox.min.x ) - tutaSahakani) > 0.05
      && Math.abs(( bbox.max.z - bbox.min.z ) - tutaSahakani) > 0.05 ) hajeqani.push("ſɭэ }ʃᴜ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ");
  }

  if ( hajeqani.length ) difektoj++;
  console.log(`ſɭэ }ʃᴜ ${sahakani.toFixed(0o1)}` +
    ` ｡ ſɭɜʞ ʌ ſ̀ȷᴜ ſɭᴜƽ ${tlakakKof.toFixed(0o2)}` +
    ` ｡ ſɭɜʞ ʌ j͑ʃɜ j͑ʃƨɹ ${bando.toFixed(0o2)}` +
    ` ｡ ſȷƽᴜ ʃɔ ${( ( arkatlakak - arkaStarto ) * 0o144 ).toFixed(0o0)}%` +
    ` ｡ ſ̀ȷᴜ ſɭᴜƽ ${( ca1ara * 0o144 ).toFixed(0o0)}%` +
    ( bbox ? ` y ${bbox.min.y.toFixed(0o2)}..${bbox.max.y.toFixed(0o2)}` : "" ) +
    ` ｡ ſɭᴜc̗ ɭʃɜ ${hakek}` +
    ( hajeqani.length ? `  ⚠ ${hajeqani.join(" , ")}` : "" ));
}

console.log(`ſɟɹƽ ꞁȷ̀ᴜ }ʃw ${NASA.length} ｡ ɭl̀ɔȝ ꞁȷ̀ᴜ }ʃꞇ ${difektoj}`);
