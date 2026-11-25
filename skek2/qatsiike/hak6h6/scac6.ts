// ≺⧼ j͑ʃɔ ſןw ſɭᴜƴ ʌ ſɭэ ֭ſɭэ ʌ j͑ʃ'ɔ ŋᷠᴜ }ʃɹ }ʃw }ʃꞇ 🧲 ⧽≻
// ⟨ ſɭэ ֭ſɭэ , ꞙɭı , ſɭɜ j͑ʃᴜ , ſɭᴜ ſןᴜ , ⟅ ſȷɔ ſᶘᴜʞ , ſɭэ ɭʃᴜ , ſɭᴜ ſןᴜ ,
//   ſɭэ ֭ſɭэ , ſɭɜ j͑ʃᴜ , ſɭᴜ ſןᴜ , ꞙɭı , ſɭэ ſɭ,w , ⟅ ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ꞙɭı ,
//   ꞙɭı , ſɭɜ ſɭ,w , ꞙɭɔ , ⟅ ſןɔ˞ᴜƴ , ſɭэ ſɭ,w , ꞙɭı , ⟅ 📃 ⟩

export const GLUADISTO = 0o6;

// ⟨ ſɭɹ ſןᴜ , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı , ſɭɹ ſןᴜ , ꞙɭı , ꞙɭɔ , 📃 ⟩
export const GLUATLOHK2 = 0o3;

/* ſɭэ ֭ſɭэ , ſɭэ ɭʃᴜ , ſɭɜ j͑ʃᴜ , ꞙɭı
    @param n2k ( [ number , number ] [ ] ) - ſɭэ ֭ſɭэ , ꞙɭɿ ,
    @param hakxawa ( [ number , number ] [ ] ) - ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı ,
    @param hakotaraqasai ( { x , z } [ ] ) - ſɭэ ɭʃᴜ , ꞙɭɔ , ꞙɭı ( ɭʃᴜ , ꞙɭı )
    @param has2tonome ( [ number , number ] [ ] [ ] ) - ſɭэ ֭ſɭэ , ꞙɭı , ſɭэ ɭʃᴜ ,
@returns n2k ( [ number , number ] [ ] ) - ſɭэ ֭ſɭэ , ꞙɭı ( ꞙɭɔ , ꞙɭı ) */
export function gluiK6h6tlakakn(
  n2k: readonly ( readonly [ number, number ] )[],
  hakxawa: readonly ( readonly [ number, number ] )[],
  hakotaraqasai: readonly { x: number; z: number }[] = [],
  has2tonome: readonly ( readonly ( readonly [ number, number ] )[] )[] = []
): [ number, number ][] {
  if ( n2k.length < 2 ) return n2k.map( p => [ p[0], p[1] ] as [ number, number ] );
  const tseuni = n2k.map( p => [ p[0], p[1] ] as [ number, number ] );
  for ( const tlakak of [ true, false ] ) {
    const i = tlakak ? tseuni.length - 1 : 0;
    const e = tseuni[i];
    if ( hakotaraqasai.some( m => Math.hypot(m.x - e[0], m.z - e[1]) < 0o1 ) ) continue;
    const tsiike = tseuni[tlakak ? i - 1 : i + 1];
    const dx = e[0] - tsiike[0], dz = e[1] - tsiike[1];
    const sahakani = Math.hypot(dx, dz);
    if ( sahakani < 0o1/0o100 ) continue;
    let kmaXobe: [ number, number ] | null = null, kmaDisto = GLUADISTO;
    for ( const natakatomasai of hakxawa ) {
      const h6kuni = Math.hypot(natakatomasai[0] - e[0], natakatomasai[1] - e[1]);
      if ( h6kuni < 0o1/0o10 || h6kuni >= kmaDisto ) continue;
      // ⟨ ꞙɭı , ꞙɭɔ , ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
      if ( ( ( natakatomasai[0] - e[0] ) * dx + ( natakatomasai[1] - e[1] ) * dz ) / ( h6kuni * sahakani ) < 0o1/0o2 ) continue;
      kmaXobe = [ natakatomasai[0], natakatomasai[1] ]; kmaDisto = h6kuni;
    }
    // ⟨ ꞙɭɔ , ſɭᴜ ſןᴜ ⟅ ſɭэ ֭ſɭэ , ſɭэ ɭʃᴜ , ꞙɭı ⟅ ſɭэ ֭ſɭэ , ſɭэ ɭʃᴜ ,
    //   ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ , ꞙɭı ,
    //   ꞙɭɔ , ſȷɔ ſᶘᴜʞ , ſɭэ ɭʃᴜ , ſɭᴜ ſןᴜ , ⟅ 📃 ⟩
    if ( !kmaXobe ) {
      let kmaTlohk2 = GLUATLOHK2;
      for ( const k6h6 of has2tonome ) {
        for ( let k = 0; k < k6h6.length - 1; k++ ) {
          const a = k6h6[k], b = k6h6[k + 1];
          const sx = b[0] - a[0], sz = b[1] - a[1];
          const l2 = sx * sx + sz * sz;
          if ( l2 < 0o10 ** -0o6 ) continue;
          const t = Math.max(0, Math.min(1, ( ( e[0] - a[0] ) * sx + ( e[1] - a[1] ) * sz ) / l2));
          const px = a[0] + sx * t, pz = a[1] + sz * t;
          const h6kuni = Math.hypot(px - e[0], pz - e[1]);
          if ( h6kuni < 0o1/0o10 || h6kuni >= kmaDisto ) continue;
          if ( ( ( px - e[0] ) * dx + ( pz - e[1] ) * dz ) / ( h6kuni * sahakani ) < 0o1/0o2 ) continue;
          // ⟨ ſɭɹ ſןᴜ , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı ⟅ ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
          if ( h6kuni > 0o3 + 0o1/0o2 ) continue;
          kmaTlohk2 = h6kuni; kmaXobe = [ px, pz ];
        }
      }
      if ( kmaXobe ) kmaDisto = kmaTlohk2;
    }
    if ( kmaXobe ) tseuni[i] = kmaXobe;
  }
  return tseuni;
}
