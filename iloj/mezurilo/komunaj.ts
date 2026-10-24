// ≺⧼ ជំនួយរួមសម្រាប់ការវាស់ 🧪 ⧽≻
// ⟨ ឧបករណ៍វាស់ទាំងអស់អានដីដូចហ្គេម ។ អនុគមន៍ទូទៅនៅទីនេះតែម្តង ,
// ដើម្បីកុំឱ្យស្គ្រីបនីមួយ ៗ មានច្បាប់ផ្ទាល់ខ្លួន ។ 📃 ⟩
import { alteco, akvaNivelo, skulptitaAkvo } from "../../kantaoj/mondo/tereno.js";
import { vojaSuproDeKunigo } from "../../eskekoj/medio/vojoj/formoj.js";
import { VOJA_BORDA_LARĜO, VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO,
  KORNA_R } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { VOJA_AKVA_KLARANCO } from "../../eskekoj/medio/vojoj/mezuroj.js";

// ⟪ ទឹកពិត 📏 ⟫
// ⟨ ទឹកត្រូវមានផ្ទៃលើដី ៖ មិនមែនត្រឹមដែនទឹកឆ្លាក់ទេ ។ 📃 ⟩
export function cxuVeraAkvo( x: number, z: number ): boolean {
  return skulptitaAkvo(x, z) && alteco(x, z) < akvaNivelo(x, z) - 0o1/0o200;
}

// ⟨ កម្ពស់ផ្ទៃទឹកបូកចន្លោះ , ឬ -Infinity លើដីគោក ។ 📃 ⟩
export function akvaFino( x: number, z: number ): number {
  return cxuVeraAkvo(x, z) ? akvaNivelo(x, z) + VOJA_AKVA_KLARANCO : -Infinity;
}

// ⟪ កម្ពស់ផ្លូវតាមដី 📏 ⟫
/*កម្ពស់ខ្ពស់បំផុតក្រោមផ្ទៃផ្លូវ តាមដី
    @param x, z ( number ) - ចំណុច
    @param larĝo ( number ) - ទទឹងផ្លូវ
@returns supro ( number ) - កម្ពស់ផ្ទៃផ្លូវ */
export function vojaSupro( x: number, z: number, larĝo: number ): number {
  const duon = larĝo / 4 + VOJA_BORDA_LARĜO;
  let maks = alteco(x, z);
  for ( let i = 0; i < 0o10; i++ ) {
    const ang = i * Math.PI / 4;
    maks = Math.max(maks, alteco(x + Math.cos(ang) * duon, z + Math.sin(ang) * duon));
  }
  return maks + VOJA_SUPRO_LEVIGXO;
}

/*កម្ពស់ផ្លូវនៅចុង ដែលត្រូវដូចចានភ្ជាប់ជិតបំផុត
    @param x, z ( number ) - ចំណុចចុងផ្លូវ
    @param larĝo ( number ) - ទទឹងផ្លូវ
    @param kunigoj ( [ number , number ] [ ] ) - ចំណុចចានភ្ជាប់
@returns supro ( number ) - កម្ពស់ផ្ទៃផ្លូវ */
export function pontaFinAlto( x: number, z: number, larĝo: number,
  kunigoj: readonly { x: number; z: number; direktaj: [ number, number ][] }[] ): number {
  let plejProksima: { x: number; z: number; direktaj: [ number, number ][] } | null = null;
  let plejMallonga = Infinity;
  for ( const k of kunigoj ) {
    const d = Math.hypot(k.x - x, k.z - z);
    if ( d < plejMallonga ) { plejMallonga = d; plejProksima = k; }
  }
  if ( plejProksima && plejMallonga < VOJA_EKSTERA_DUONO + KORNA_R )
    return vojaSuproDeKunigo(plejProksima.x, plejProksima.z, plejProksima.direktaj,
      VOJA_EKSTERA_DUONO, alteco).supro;
  return vojaSupro(x, z, larĝo);
}
