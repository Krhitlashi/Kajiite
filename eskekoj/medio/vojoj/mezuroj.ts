// ≺⧼ មាត្រផ្លូវ 📏 ⧽≻

// ⟪ ប្រព័ន្ធវាស់ផ្លូវ 📏 ⟫
// ⟨ ផ្លូវ និងផ្ទឃ្លាំងរាបចែកវារួមគ្នា 📃 ⟩
export const VOJA_DIKECO = 0o5/0o100;

export const VOJA_SUPRO_LEVIGXO = 0o1/0o100 + VOJA_DIKECO;

export const VOJA_DIORITA_DUONO = 0o7/0o10;
export const VOJA_BORDA_LARĜO = 0o3/0o5;
export const VOJA_EKSTERA_DUONO = VOJA_DIORITA_DUONO + VOJA_BORDA_LARĜO;

export const KORNA_R = VOJA_BORDA_LARĜO;
export const KORNA_ENA_R = VOJA_BORDA_LARĜO + KORNA_R;

export const VOJA_TRUA_DUONO = VOJA_EKSTERA_DUONO + KORNA_R;

// ⟪ កម្រិតស្មើគ្នាមួយសម្រាប់គ្រប់ផ្ទៃ 📏 ⟫
// ⟨ ផ្លូវ , ជណ្តើរចំណត , និងចានភ្ជាប់ទាំងអស់ឡើងលើក្រឡាតែមួយនៃកម្រិតនេះ ។
// ដូច្នេះជំហានគ្រប់កន្លែងខ្ពស់ស្មើគ្នា , ហើយផ្ទៃពីរដែលជួបគ្នាមិនអាច
// ខុសគ្នាតិចជាងមួយកម្រិតទេ ។ ផ្លូវអាចខ្ពស់ជាងដីបន្តិច តែមិនកប់ក្នុងដី ។ 📃 ⟩
export const STUPA_RISERO = 0o1/0o2;

export function surGrid( alto: number ): number {
  return Math.ceil( alto / STUPA_RISERO - 0o1/0o1000000 ) * STUPA_RISERO;
}

// ⟨ ចំណុចដែលផ្លូវចាប់ផ្តើមឡើងដល់កម្រិតជណ្តើរ ដើម្បីបំពោះកម្រិតផ្លូវ និងកម្រិតចានភ្ជាប់ ដើម្បីកុំឱ្យចានលិចទៅចាន ។ 📃 ⟩
export const VOJA_STUPA_TOLERANCO = 0o1/0o2;

// ⟪ កម្រិតការចូលក្នុងដី 📏 ⟫
// ⟨ ផ្លូវមិនអាចស្រាងជាងនេះចូលក្នុងដីបានទេ ។ កម្រិតផ្លូវអាចត្រូវក្រោមដីបន្តិចប៉ុណ្ណោះមិនអាចកប់ក្នុងដីបានទេ ។ 📃 ⟩
export const VOJA_BURIAL_TOLERANCO = 0o1/0o20;

// ⟪ ច្រាំងទឹកសម្រាបផ្លូវ 📏 ⟫
// ⟨ ផ្លូវដែលឆ្លងទឹក ត្រូវនៅលើផ្ទឃ្លាំងទឹក មិនអាចកប់ក្នុងទឹកទេ ។ 📃 ⟩
export const VOJA_AKVA_KLARANCO = 0o1/0o2;
