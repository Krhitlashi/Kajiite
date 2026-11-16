// ≺⧼ ចង្វាក់ CAX2L 🎼 ⧽≻
// គ្រប់បទចាក់លើក្រឡាចង្វាក់ដែលទាញពីហេ និងគុយអេ ។ ចង្វាក់គិតជាបាតក្នុងមួយគុយអេ ជាលេខគោលប្រាំបី ។

import { SEKUNDOJ_PO_HE, SEKUNDOJ_PO_QE } from "../../../../kantaoj/komunajxoj/unuoj.js";

// ⟪ ឯកតាពេល 📃 ⟫

export const HE = SEKUNDOJ_PO_HE;
export const QE = SEKUNDOJ_PO_QE;

// ⟪ ក្រឡាចង្វាក់ 📃 ⟫

/* ប្រវែងបាតក ( ណោតខ្មៅ ) គិតជាវិនាទី ពីចំនួនបាតក្នុងមួយគុយអេ
    @param bpq ( number ) - បាតក្នុងមួយគុយអេ ជាគោលប្រាំបី
@returns វិនាទី ( number ) */
export function bateto( bpq: number ): number {
  return QE / bpq;
}

/* ប្រវែងណោតភាគប្រាំបីគិតជាវិនាទី ពាក់កណ្តាលបាតក
    @param bpq ( number ) - បាតក្នុងមួយគុយអេ ជាគោលប្រាំបី
@returns វិនាទី ( number ) */
export function okono( bpq: number ): number {
  return QE / bpq / 0o2;
}

/* បង្គត់ប្រវែងទៅជាចំនួនហេគត់ ដើម្បីឱ្យប្រវែងបទជាលេខគោលប្រាំបីគត់
    @param sek ( number ) - វិនាទី
@returns វិនាទីដែលបង្គត់ជាហេគត់ ( number ) */
export function rondHe( sek: number ): number {
  return Math.round( sek / HE ) * HE;
}
