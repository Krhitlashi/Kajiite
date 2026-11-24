// ≺⧼ ſɟɹƽ ꞁȷ̀ᴜ }ʃw ʌ j͑ʃᴜ ֭ſɭᴜƽ ꞁȷ̀ᴜ }ʃꞇ 🌉 ⧽≻
// ⟨ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſɭэ ſɭᴜ , ⟅ ſɭɜ ſɭ,w , ꞙɭɿ ,
// ſȷƽᴜ ʃɔ , j͑ʃɜ j͑ʃƨɹ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , ꞙɭı , 📃 ⟩
import * as THREE from "three";
import { vepaqPonton, kf2PontanSubon, pontaFinaOrdo,
  PONT_KORPA_DIKECO, PONT_TERA_PROFUNDECO, PONT_VOJA_SUPERPONO }
  from "../../eskekoj/medio/qakaj2/ponto.js";

// ⟨ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
const FUNDO = 0o2;          // j͐ʃэ ɭ(ᴜ ʌ ſɭɜ ſɭ,w ʌ ɭl̀ᴜȝ ſןᴜ ɭʃɔ ʌ ſɟɹƽ ꞁȷ̀ᴜ }ʃw
const DEKO = 0o12;          // j͐ʃэ ɭ(ᴜ ʌ j͑ʃɜ ſɭ,ᴜ ʌ ſɟɹƽ ꞁȷ̀ᴜ }ʃw ʌ ſ̀ȷᴜ ſɭᴜƽ
const DEKO_ARKECO = 0o4;    // j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ʌ j͑ʃɜ j͑ʃƨɹ
const SEFINI = 0o10;

// ⟨ ſɭэ ſɭᴜ , ꞙɭц , ⟅ ſɭᴜ ſןᴜ , ꞙɭı , 📏 ⟩
const NASA = [ 0o3, 0o4, 0o6, 0o10, 0o14, 0o24, 0o40, 0o60, 0o100 ];

const SUPRA = ( sahakani: number ) => ( t: number ): number =>
  DEKO + Math.min(DEKO_ARKECO, sahakani * 0o1/0o10) * Math.sin(Math.PI * t);

const SUPRAJ: number[] = [];
for ( let i = 0; i <= 0o200; i++ ) SUPRAJ.push(i / 0o200);

// ⟪ ı],ᴜ ֭ſɭᴜ , ꞙɭɿ , 📏 ⟫
/* ſɭэ ſɭᴜ , ſɭэ ſɭᴜ , ꞙɭı ,
    @param v ( number ) - ſɭɹ ſȷɔ
@returns valida ( boolean ) - ſןɔ ʌ NaN ｡ ſןɔ ʌ Infinity */
function valida( v: number ): boolean {
  return Number.isFinite(v);
}

/* ſɭᴜ ſɭ,w , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı ,
    @param teru ( function ) - j͐ʃэ ɭ(ᴜ ʌ ſןͷ̗ɜ j͑ʃƨɔȝ
    @param subo ( function ) - j͐ʃэ ɭ(ᴜ ʌ ɭl̀ᴜȝ ſןᴜ ɭʃɔ
@returns dikeco ( number ) - ſɭɜʞ */
function dikecoCxe( teru: ( t: number ) => number, subo: ( t: number ) => number,
  t: number ): number {
  return teru(t) - subo(t);
}

let difektoj = 0;
for ( const sahakani of NASA ) {
  const teru = SUPRA(sahakani);
  const subo = kf2PontanSubon(sahakani, teru, () => FUNDO);
  const bando = Math.min(PONT_KORPA_DIKECO, sahakani / 0o4);
  const problemoj: string[] = [];

// ⟨ ſɭэ ſɭᴜ , ꞙɭɔ , 📃 ⟩
  for ( const t of SUPRAJ ) {
    if ( !valida(subo(t)) || !valida(teru(t)) ) { problemoj.push("ſɭɹ ſȷɔ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ"); break; }
    if ( subo(t) > teru(t) ) { problemoj.push("ɭl̀ᴜȝ ſןᴜ ɭʃɔ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ"); break; }
    if ( subo(t) < FUNDO - 0o10 ** -0o7 ) { problemoj.push("ɭl̀ᴜȝ ſןᴜ ɭʃɔ ʌ j͑ʃᴜ ꞁȷ̀ᴜ ʌ ſɭɜ ſɭ,w"); break; }
  }

// ⟨ ſɭɜ ſɭ,w , ſɭɜ ſɭ,w , ꞙɭɿ , 📃 ⟩
  const finaDikeco = dikecoCxe(teru, subo, 0);
  const finaDikecoB = dikecoCxe(teru, subo, 1);
  if ( Math.abs(finaDikeco - ( teru(0) - FUNDO )) > 0o10 ** -0o7 ) problemoj.push("ſ̀ȷᴜ ſɭᴜƽ ｡ ſןᴜ j͐ʃэ ŋᷠɹ");
  if ( Math.abs(finaDikecoB - ( teru(1) - FUNDO )) > 0o10 ** -0o7 ) problemoj.push("ſ̀ȷᴜ ſɭᴜƽ ( ſ̀ȷᴜ ſɭᴜƽ ) ｡ ſןᴜ j͐ʃэ ŋᷠɹ");
  for ( const t of SUPRAJ )
    if ( Math.abs(subo(t) - subo(1 - t)) > 0o10 ** -0o7 ) { problemoj.push("ſɭᴜc̗ ɭʃɜ ɔı ｡ j͐ʃэ ɭ(ᴜ ʌ ſןɔ ʌ ſɭɹ ſȷɔ"); break; }

// ⟨ ſȷƽᴜ ʃɔ , j͑ʃɜ j͑ʃƨɹ , 📃 ⟩
  const tolero = 0.02;
  const ca1ara = pontaFinaOrdo(sahakani, teru(0) - FUNDO);
  let arkaStarto = 0, arkaFino = 1;
  for ( const t of SUPRAJ ) {
    if ( Math.abs(dikecoCxe(teru, subo, t) - bando) > tolero ) continue;
    arkaStarto = t;
    break;
  }
  for ( let i = SUPRAJ.length - 1; i >= 0; i-- ) {
    const t = SUPRAJ[i];
    if ( Math.abs(dikecoCxe(teru, subo, t) - bando) <= tolero ) { arkaFino = t; break; }
  }
  if ( arkaStarto > ca1ara + tolero ) problemoj.push("ſ̀ȷᴜ ſɭᴜƽ ｡ ſןᴜ j͐ʃэ ɭl̀ᴜ");
  if ( Math.abs(arkaStarto - ( 1 - arkaFino )) > tolero ) problemoj.push("ſןɔ ʌ j͑ʃɜ j͑ʃƨɹ");
  if ( dikecoCxe(teru, subo, 0o1/0o2 ) < bando - 0o10 ** -0o7 ) problemoj.push("j͑ʃɜ j͑ʃƨɹ ｡ ſןᴜ j͐ʃэ ŋᷠɹ");

// ⟨ ſɭɜ ſɭ,w , ſȷƽᴜ ʃɔ , 📃 ⟩
  let ne3ak2 = subo(0);
  for ( let i = 1; i <= 0o100; i++ ) {
    const d = subo(i / 0o200);
    if ( d < ne3ak2 - 0o10 ** -0o7 ) { problemoj.push("ɭl̀ᴜȝ ſןᴜ ɭʃɔ ｡ j͐ʃᴜɔ˞ ʃэ"); break; }
    ne3ak2 = d;
  }

// ⟨ ſ͕ɭɜ ı],ᴜ , ſɭɜ ſɭᴜ , ꞙɭц , 📃 ⟩
  const qena = new THREE.Scene();
  vepaqPonton(qena, 0, 0, sahakani, 0, SEFINI,
    new THREE.MeshStandardMaterial(), teru, () => FUNDO);
  const hate = qena.children[0] as THREE.Group | undefined;
  let bbox: THREE.Box3 | null = null;
  let hakek = 0;
  if ( !hate ) problemoj.push("ſןɔ ʌ ſɭэ }ʃᴜ ʌ ſ͕ɭɜ ı],ᴜ");
  else {
    hate.updateMatrixWorld(true);
    bbox = new THREE.Box3().setFromObject(hate);
    hakek = hate.children.length;
    if ( hakek !== 0o3 ) problemoj.push(`ſɭᴜc̗ ɭʃɜ ${hakek}`);
    let punktojValidaj = true;
    for ( const c of hate.children ) {
      const raqa = ( c as THREE.Mesh ).geometry.getAttribute("position").array;
      for ( let i = 0; i < raqa.length; i++ )
        if ( !valida(raqa[i]) ) { punktojValidaj = false; break; }
    }
    if ( !punktojValidaj ) problemoj.push("}ʃɹƽ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ");
    if ( Math.abs(bbox.min.y - ( FUNDO - PONT_TERA_PROFUNDECO )) > 0.05 )
      problemoj.push("ɭl̀ᴜȝ ſןᴜ ɭʃɔ ʌ ſןɔ ʌ ſɭɜ ſɭ,w");
    if ( Math.abs(bbox.max.y - ( teru(0o1/0o2) + 0o1/0o200 )) > 0.05 )
      problemoj.push("ſןͷ̗ɜ j͑ʃƨɔȝ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ");
    const tutaLongo = sahakani + PONT_VOJA_SUPERPONO * 0o2;
    if ( Math.abs(( bbox.max.x - bbox.min.x ) - tutaLongo) > 0.05
      && Math.abs(( bbox.max.z - bbox.min.z ) - tutaLongo) > 0.05 ) problemoj.push("ſɭэ }ʃᴜ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ");
  }

  if ( problemoj.length ) difektoj++;
  console.log(`ſɭэ }ʃᴜ ${sahakani.toFixed(1)}` +
    ` ｡ ſɭɜʞ ʌ ſ̀ȷᴜ ſɭᴜƽ ${finaDikeco.toFixed(2)}` +
    ` ｡ ſɭɜʞ ʌ j͑ʃɜ j͑ʃƨɹ ${bando.toFixed(2)}` +
    ` ｡ ſȷƽᴜ ʃɔ ${( ( arkaFino - arkaStarto ) * 100 ).toFixed(0)}%` +
    ` ｡ ſ̀ȷᴜ ſɭᴜƽ ${( ca1ara * 100 ).toFixed(0)}%` +
    ( bbox ? ` y ${bbox.min.y.toFixed(2)}..${bbox.max.y.toFixed(2)}` : "" ) +
    ` ｡ ſɭᴜc̗ ɭʃɜ ${hakek}` +
    ( problemoj.length ? `  ⚠ ${problemoj.join(" , ")}` : "" ));
}

console.log(`ſɟɹƽ ꞁȷ̀ᴜ }ʃw ${NASA.length} ｡ ɭl̀ɔȝ ꞁȷ̀ᴜ }ʃꞇ ${difektoj}`);
