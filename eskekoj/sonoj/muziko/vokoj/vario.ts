// ≺⧼ }ʃɔ ſ̀ȷw }ʃᴜƽ ꞁȷ̀ᴜ }ʃꞇ ʌ ʃɜ j͐ʃɔ 🎲 ⧽≻
// ⟨ ſɟᴜᴜ̩ ɭʃɹ ʌ ſᶘᴜ j͐ʃɹ ꞙɭɔ ʃɜ j͐ʃɔ ſɭᴜ ⟅ ſɭɜ ʃɔ ʌ ſɭɜ ,
//   ɭl̀ɹ ᶅſᴜ }ʃꞇ , j͐ʃэ ɭ(ᴜ ı],э ŋᷠꞇ j͑ʃᴜꞇ , ſɭᴜ ſןᴜ , ſᶘɔ ʌ ſɭᴜ , ʃɜ j͐ʃɔ ꞙɭɔ ⟅

/* ʃɜ j͐ʃɔ ⟅ -amp ⟅ +amp
    @param amp ( number ) - ſןᴜ j͐ʃэ ʌ ſɭᴜ , ʃɜ j͐ʃɔ ʌ ſɭᴜ
@returns ʃɜ j͐ʃɔ ʌ ſɭᴜ ( number ) */
export function devio( amp: number ): number {
  return ( Math.random() * 0o2 - 0o1 ) * amp;
}

/* ꞙɭı , ʃɜ j͐ʃɔ ( ſɭᴜ j͑ʃᴜꞇ )
    @param amplekso ( number ) - ſןᴜ j͐ʃэ ʌ ſɭᴜ , ſɭɔƽ ʌ ʃɜ j͐ʃɔ ʌ ſɭᴜ
@returns ʃɜ j͐ʃɔ ʌ ſɭᴜ ( number ) */
export function faktoro( amplekso: number ): number {
  return 0o1 + devio( amplekso );
}
