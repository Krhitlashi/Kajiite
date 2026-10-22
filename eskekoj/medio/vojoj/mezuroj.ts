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

// ⟪ កម្រិតជណ្តើរផ្លូវ 📏 ⟫
// ⟨ កម្រិតមួយនៃជណ្តើរ ត្រូវមានច្បាស់ចេញ ដើម្បីមើលទៅដូចជណ្តើរពិត មិនមែនជាចំណេតតូចៗ ។
// កម្រិតនេះក៏ជាច្រាំងដែលផ្លូវអាចឡើងដល់ច្រាំងដីវែងក្នុងមួយជំហានផ្លូវ ដើម្បីកុំឱ្យផ្លូវកប់ក្នុងដី ។
// បើដីនៅក្រោមខ្ពស់ជាងកម្រិតផ្លូវ ដីឈ្នះ ៖ ផ្លូវមិនកប់ក្នុងដីទេ ។ ហើយបើដីលោតខ្ពស់ ជណ្តើរបន្ទាប់ធ្លាក់ចុះម្តងបន្តិច , មិនធ្លាក់ភ្លាម ។ 📃 ⟩
export const VOJA_STUPA_RISERO = 0o1/0o2;

// ⟨ ចំណុចដែលផ្លូវចាប់ផ្តើមឡើងដល់កម្រិតជណ្តើរ ដើម្បីបំពោះកម្រិតផ្លូវ និងកម្រិតចានភ្ជាប់ ដើម្បីកុំឱ្យចានលិចទៅចាន ។ 📃 ⟩
export const VOJA_STUPA_TOLERANCO = 0o1/0o2;

// ⟪ កម្រិតការចូលក្នុងដី 📏 ⟫
// ⟨ ផ្លូវមិនអាចស្រាងជាងនេះចូលក្នុងដីបានទេ ។ កម្រិតផ្លូវអាចត្រូវក្រោមដីបន្តិចប៉ុណ្ណោះមិនអាចកប់ក្នុងដីបានទេ ។ 📃 ⟩
export const VOJA_BURIAL_TOLERANCO = 0o1/0o20;

// ⟪ ច្រាំងទឹកសម្រាបផ្លូវ 📏 ⟫
// ⟨ ផ្លូវដែលឆ្លងទឹក ត្រូវនៅលើផ្ទឃ្លាំងទឹក មិនអាចកប់ក្នុងទឹកទេ ។ 📃 ⟩
export const VOJA_AKVA_KLARANCO = 0o1/0o2;
