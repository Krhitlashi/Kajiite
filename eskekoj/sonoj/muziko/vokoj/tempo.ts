// ≺⧼ ចង្វាក់ CAX2L 🎼 ⧽≻
// គ្រប់បទចាក់លើក្រឡាចង្វាក់ដែលទាញពីហេ និងគុយអេ ។ ចង្វាក់គិតជាបាតក្នុងមួយគុយអេ ជាលេខគោលប្រាំបី ។

import { SEKUNDOJ_PO_HE, SEKUNDOJ_PO_QE } from "../../../../kantaoj/komunajxoj/unuoj.js";

// ⟪ ឯកតាពេល 📃 ⟫

export const HE = SEKUNDOJ_PO_HE;
export const QE = SEKUNDOJ_PO_QE;

// ⟪ ក្រឡាចង្វាក់ 📃 ⟫

/* ប្រវែងណោតភាគប្រាំបីគិតជាវិនាទី ពាក់កណ្តាលបាតក
    @param bpq ( number ) - បាតក្នុងមួយគុយអេ ជាគោលប្រាំបី
@returns វិនាទី ( number ) */
export function okono( bpq: number ): number {
  return QE / bpq / 0o2;
}
