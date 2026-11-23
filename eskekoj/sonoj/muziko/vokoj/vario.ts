// ≺⧼ }ʃɔ ſ̀ȷw }ʃᴜƽ ꞁȷ̀ᴜ }ʃꞇ ʌ ʃɜ j͐ʃɔ 🎲 ⧽≻
// ឧបករណ៍ពិតមិនដែលឮដូចគ្នារាល់ដងទេ ។ អនុគមន៍ទាំងនេះបន្ថែមភាពខុសគ្នាតូចៗ
// ទៅកម្ពស់ កម្រិត និងរយៈពេល ដើម្បីកុំឱ្យសំឡេងឮថាដដែលៗ។

/* តម្លៃចៃដន្យក្នុងចន្លោះ -amp ទៅ +amp
    @param amp ( number ) - ទំហំភាពខុសគ្នា
@returns តម្លៃដែលប្រែប្រួល ( number ) */
export function devio( amp: number ): number {
  return ( Math.random() * 0o2 - 0o1 ) * amp;
}

/* គុណនឹងតម្លៃចៃដន្យជុំវិញ 0o1
    @param amplekso ( number ) - ទំហំភាពខុសគ្នាជាផ្នែកនៃតម្លៃដើម
@returns កត្តាគុណ ( number ) */
export function faktoro( amplekso: number ): number {
  return 0o1 + devio( amplekso );
}
