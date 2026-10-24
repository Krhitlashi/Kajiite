// ≺⧼ ស្ពានគ្រប់ប្រវែង 🌉 ⧽≻
// ⟨ ស្ពានត្រូវប្រើបានគ្រប់ប្រវែង ៖ ចុងទាំងពីរចុះដល់ដី , កណ្តាលស្តើង ,
// ធ្នូនៅកណ្តាល , និងគ្មានកន្លែងប៉ោងឡើងវិញ ។ ស្គ្រីបនេះសាងសង់ស្ពាន
// សាមញ្ញគ្រប់ប្រវែង ហើយវាស់រូបរាងរបស់វា ។ 📃 ⟩
import * as THREE from "three";
import { konstruiPonton, kreiPontanSubon, pontaFinaOrdo,
  PONT_KORPA_DIKECO, PONT_TERA_PROFUNDECO }
  from "../../eskekoj/medio/doko/ponto.js";

// ⟨ ស្ពានពិសោធន៍ ៖ ដីទាបជាងផ្ទៃស្ពានគ្រប់កន្លែង 📃 ⟩
const FUNDO = 0o2;          // កម្ពស់ដីក្រោមស្ពាន
const DEKO = 0o12;          // កម្ពស់ផ្ទៃស្ពាននៅចុង
const DEKO_ARKECO = 0o4;    // ប៉ោងខ្ពស់បំផុតនៅកណ្តាល
const LARĜO = 0o10;

// ⟨ ប្រវែងត្រូវសាកល្បង ៖ ខ្លីជាង ១ ដង , លើសពីចាន , និងវែងខ្លាំង 📏 ⟩
const NASA = [ 0o3, 0o4, 0o6, 0o10, 0o14, 0o24, 0o40, 0o60, 0o100 ];

const SUPRA = ( longo: number ) => ( t: number ): number =>
  DEKO + Math.min(DEKO_ARKECO, longo * 0o1/0o10) * Math.sin(Math.PI * t);

const SUPRAJ: number[] = [];
for ( let i = 0; i <= 0o200; i++ ) SUPRAJ.push(i / 0o200);

// ⟪ មុខងារតូចៗ 📏 ⟫
/*តើលេខមួយគឺជាលេខពិតដែលប្រើបាន
    @param v ( number ) - លេខ
@returns valida ( boolean ) - មិនមែន NaN , មិនមែន Infinity */
function valida( v: number ): boolean {
  return Number.isFinite(v);
}

/*កម្រាស់ជញ្ជាំងស្ពាននៅ t
    @param supra ( function ) - កម្ពស់កំពូល
    @param subo ( function ) - កម្ពស់បាត
@returns dikeco ( number ) - កម្រាស់ */
function dikecoCxe( supra: ( t: number ) => number, subo: ( t: number ) => number,
  t: number ): number {
  return supra(t) - subo(t);
}

let difektoj = 0;
for ( const longo of NASA ) {
  const supra = SUPRA(longo);
  const subo = kreiPontanSubon(longo, supra, () => FUNDO);
  const bando = Math.min(PONT_KORPA_DIKECO, longo / 0o4);
  const problemoj: string[] = [];

  // ⟨ មិនត្រូវមានលេខខូច 📃 ⟩
  for ( const t of SUPRAJ ) {
    if ( !valida(subo(t)) || !valida(supra(t)) ) { problemoj.push("លេខខូច"); break; }
    if ( subo(t) > supra(t) ) { problemoj.push("បាតលើសកំពូល"); break; }
    if ( subo(t) < FUNDO - 1e-6 ) { problemoj.push("បាតក្រោមដី"); break; }
  }

  // ⟨ ចុងទាំងពីរចុះដល់ដី , និងស៊ីមេទ្រី 📃 ⟩
  const finaDikeco = dikecoCxe(supra, subo, 0);
  const finaDikecoB = dikecoCxe(supra, subo, 1);
  if ( Math.abs(finaDikeco - ( supra(0) - FUNDO )) > 1e-6 ) problemoj.push("ចុងខ្លី");
  if ( Math.abs(finaDikecoB - ( supra(1) - FUNDO )) > 1e-6 ) problemoj.push("ចុងខ្លី ( ចុង )");
  for ( const t of SUPRAJ )
    if ( Math.abs(subo(t) - subo(1 - t)) > 1e-6 ) { problemoj.push("មិនស៊ីមេទ្រី"); break; }

  // ⟨ ចំណែកចុងតោនទៅតាមជម្រៅ ៖ ធ្នូនៅកណ្តាល ។ 📃 ⟩
  const tolero = 0.02;
  const ordo = pontaFinaOrdo(longo, supra(0) - FUNDO);
  let arkaStarto = 0, arkaFino = 1;
  for ( const t of SUPRAJ ) {
    if ( Math.abs(dikecoCxe(supra, subo, t) - bando) > tolero ) continue;
    arkaStarto = t;
    break;
  }
  for ( let i = SUPRAJ.length - 1; i >= 0; i-- ) {
    const t = SUPRAJ[i];
    if ( Math.abs(dikecoCxe(supra, subo, t) - bando) <= tolero ) { arkaFino = t; break; }
  }
  if ( arkaStarto > ordo + tolero ) problemoj.push("ចុងធំពេក");
  if ( Math.abs(arkaStarto - ( 1 - arkaFino )) > tolero ) problemoj.push("មិននៅកណ្តាល");
  if ( dikecoCxe(supra, subo, 0o1/0o2 ) < bando - 1e-6 ) problemoj.push("កណ្តាលខ្លីពេក");

  // ⟨ បាតឡើងជាប់គ្នាពីចុងទៅកណ្តាល ៖ គ្មានកន្លែងចុះវិញ 📃 ⟩
  let antaŭa = subo(0);
  for ( let i = 1; i <= 0o100; i++ ) {
    const d = subo(i / 0o200);
    if ( d < antaŭa - 1e-6 ) { problemoj.push("បាតចុះវិញ"); break; }
    antaŭa = d;
  }

  // ⟨ ធរណីមាត្រពិត ៖ ក្រប , ចំនួនបំណែក , និងដែនកំណត់ 📃 ⟩
  const sceno = new THREE.Scene();
  konstruiPonton(sceno, 0, 0, longo, 0, LARĜO,
    new THREE.MeshStandardMaterial(), supra, () => FUNDO);
  const grupo = sceno.children[0] as THREE.Group | undefined;
  let bbox: THREE.Box3 | null = null;
  let pecoj = 0;
  if ( !grupo ) problemoj.push("គ្មានធរណីមាត្រ");
  else {
    grupo.updateMatrixWorld(true);
    bbox = new THREE.Box3().setFromObject(grupo);
    pecoj = grupo.children.length;
    if ( pecoj !== 0o3 ) problemoj.push(`បំណែក ${pecoj}`);
    let punktojValidaj = true;
    for ( const c of grupo.children ) {
      const pozicio = ( c as THREE.Mesh ).geometry.getAttribute("position").array;
      for ( let i = 0; i < pozicio.length; i++ )
        if ( !valida(pozicio[i]) ) { punktojValidaj = false; break; }
    }
    if ( !punktojValidaj ) problemoj.push("ចំណុចខូច");
    if ( Math.abs(bbox.min.y - ( FUNDO - PONT_TERA_PROFUNDECO )) > 0.05 )
      problemoj.push("បាតមិនដល់ដី");
    if ( Math.abs(bbox.max.y - ( supra(0o1/0o2) + 0o1/0o200 )) > 0.05 )
      problemoj.push("កំពូលខុស");
    if ( Math.abs(( bbox.max.x - bbox.min.x ) - longo) > 0.05
      && Math.abs(( bbox.max.z - bbox.min.z ) - longo) > 0.05 ) problemoj.push("ប្រវែងខុស");
  }

  if ( problemoj.length ) difektoj++;
  console.log(`ប្រវែង ${longo.toFixed(1)}` +
    ` កម្រាស់ចុង ${finaDikeco.toFixed(2)}` +
    ` កម្រាស់កណ្តាល ${bando.toFixed(2)}` +
    ` ធ្នូ ${( ( arkaFino - arkaStarto ) * 100 ).toFixed(0)}%` +
    ` ចុង ${( ordo * 100 ).toFixed(0)}%` +
    ( bbox ? ` y ${bbox.min.y.toFixed(2)}..${bbox.max.y.toFixed(2)}` : "" ) +
    ` បំណែក ${pecoj}` +
    ( problemoj.length ? `  ⚠ ${problemoj.join(" , ")}` : "" ));
}

console.log(`ស្ពាន ${NASA.length} , មានបញ្ហា ${difektoj}`);
