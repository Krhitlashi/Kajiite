// ≺⧼ ការទាញចុងផ្លូវ 🧲 ⧽≻
// ⟨ ចុងផ្លូវដែលឈប់ខ្លីពីចានភ្ជាប់ ៖ នៅសល់ចន្លោះស្មៅរវាងចុងផ្លូវ និងចានភ្ជាប់ ។
// ចុងផ្លូវត្រូវទាញទៅចានភ្ជាប់ជិតបំផុត ដែលនៅត្រង់ទៅមុខ , ដើម្បីឱ្យផ្លូវដល់ចានពិត ។
// បើចុងផ្លូវនៅចំណត , មិនទាញទេ ៖ ជណ្តើរចំណតចាប់ពីទីនោះ ។ 📃 ⟩

export const GLUA_DISTO = 0o6;

// ⟨ ចន្លោះអតិបរមា ៖ ចុងផ្លូវឆ្ងាយជាងនេះគឺជាផ្លូវដាច់ដោយចេតនា , មិនមែនជាចន្លោះខុសទេ 📃 ⟩
export const GLUA_FENDO = 0o3;

/*ទាញចុងផ្លូវទៅផ្លូវជិតបំផុត
    @param punktoj ( [ number , number ] [ ] ) - បន្ទាត់ផ្លូវ
    @param celoj ( [ number , number ] [ ] ) - ចានភ្ជាប់ដែលអាចទាញទៅ
    @param malpermesoj ( { x , z } [ ] ) - ចំណុចដែលមិនត្រូវទាញចេញ ( មាត់ចំណត )
    @param aliaj ( [ number , number ] [ ] [ ] ) - ផ្លូវផ្សេង , ដើម្បីទាញទៅខ្សែកណ្តាល
@returns punktoj ( [ number , number ] [ ] ) - បន្ទាត់ថ្មី ( មិនកែដើម ) */
export function gluiVojaFinon(
  punktoj: readonly ( readonly [ number, number ] )[],
  celoj: readonly ( readonly [ number, number ] )[],
  malpermesoj: readonly { x: number; z: number }[] = [],
  aliaj: readonly ( readonly ( readonly [ number, number ] )[] )[] = []
): [ number, number ][] {
  if ( punktoj.length < 2 ) return punktoj.map( p => [ p[0], p[1] ] as [ number, number ] );
  const rezulto = punktoj.map( p => [ p[0], p[1] ] as [ number, number ] );
  for ( const fina of [ true, false ] ) {
    const i = fina ? rezulto.length - 1 : 0;
    const e = rezulto[i];
    if ( malpermesoj.some( m => Math.hypot(m.x - e[0], m.z - e[1]) < 0o1 ) ) continue;
    const najbaro = rezulto[fina ? i - 1 : i + 1];
    const dx = e[0] - najbaro[0], dz = e[1] - najbaro[1];
    const longo = Math.hypot(dx, dz);
    if ( longo < 0o1/0o100 ) continue;
    let plejBona: [ number, number ] | null = null, plejDisto = GLUA_DISTO;
    for ( const celo of celoj ) {
      const disto = Math.hypot(celo[0] - e[0], celo[1] - e[1]);
      if ( disto < 0o1/0o10 || disto >= plejDisto ) continue;
      // ⟨ ត្រង់ទៅមុខ ៖ កុំទាញចុងផ្លូវទៅចំហៀងដោយបង្ខំ 📃 ⟩
      if ( ( ( celo[0] - e[0] ) * dx + ( celo[1] - e[1] ) * dz ) / ( disto * longo ) < 0o1/0o2 ) continue;
      plejBona = [ celo[0], celo[1] ]; plejDisto = disto;
    }
    // ⟨ គ្មានចានភ្ជាប់ ៖ ទាញទៅខ្សែកណ្តាលផ្លូវជិតបំផុត ។ ផ្លូវដែលដល់ខ្សែកណ្តាល
    // បង្កើតចានភ្ជាប់ដោយខ្លួនឯង , ហើយចាននោះគ្របលើចុងផ្លូវ ។
    // ដូច្នេះចន្លោះបិទ ៖ មិននៅសល់ស្មៅរវាងចុងផ្លូវ និងចានទេ ។ 📃 ⟩
    if ( !plejBona ) {
      let plejFendo = GLUA_FENDO;
      for ( const vojo of aliaj ) {
        for ( let k = 0; k < vojo.length - 1; k++ ) {
          const a = vojo[k], b = vojo[k + 1];
          const sx = b[0] - a[0], sz = b[1] - a[1];
          const l2 = sx * sx + sz * sz;
          if ( l2 < 0o1/0o1000000 ) continue;
          const t = Math.max(0, Math.min(1, ( ( e[0] - a[0] ) * sx + ( e[1] - a[1] ) * sz ) / l2));
          const px = a[0] + sx * t, pz = a[1] + sz * t;
          const disto = Math.hypot(px - e[0], pz - e[1]);
          if ( disto < 0o1/0o10 || disto >= plejDisto ) continue;
          if ( ( ( px - e[0] ) * dx + ( pz - e[1] ) * dz ) / ( disto * longo ) < 0o1/0o2 ) continue;
          // ⟨ ចន្លោះតូច ៖ ចុងផ្លូវគួរតែជាប់ ។ ផ្លូវធំជាងនេះគឺជាផ្លូវដាច់ ។ 📃 ⟩
          if ( disto > 0o3 + 0o1/0o2 ) continue;
          plejFendo = disto; plejBona = [ px, pz ];
        }
      }
      if ( plejBona ) plejDisto = plejFendo;
    }
    if ( plejBona ) rezulto[i] = plejBona;
  }
  return rezulto;
}
