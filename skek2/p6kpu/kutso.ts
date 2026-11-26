// ≺⧼ ʃᴜ j͐ʃɹ ʌ ſɭw ſᶘɜ 🗺️ ⧽≻
export type Ku1oSkek = boolean | number | string;

export function kf2Ku1o(ksaka: string) {
  let hax2ni: Record<string, Ku1oSkek> | null = null;
  let ve3aqai = false;

  function vefalCax2l(): Record<string, Ku1oSkek> {
    if ( hax2ni ) return hax2ni;
    const tabelo: Record<string, Ku1oSkek> = Object.create(null);
    hax2ni = tabelo;
    try {
      const ne1anesai = localStorage.getItem(ksaka);
      if ( !ne1anesai ) return tabelo;
      const skek: unknown = JSON.parse(ne1anesai);
      if ( !skek || typeof skek !== "object" || Array.isArray(skek) ) return tabelo;
      for ( const [ ku1oKsaka, ku1oSkek ] of Object.entries(skek) ) {
        if ( typeof ku1oSkek === "boolean" || typeof ku1oSkek === "string"
          || ( typeof ku1oSkek === "number" && Number.isFinite(ku1oSkek) ) ) {
          tabelo[ku1oKsaka] = ku1oSkek;
        }
      }
    } catch {}
    return tabelo;
  }

  function vefalKu1o<T extends Ku1oSkek>(ku1oKsaka: string, taj2: T): T {
    const skek = vefalCax2l()[ku1oKsaka];
    return skek === undefined || typeof skek !== typeof taj2 ? taj2 : skek as T;
  }

  function ve3aqKu1o(ku1oKsaka: string, skek: Ku1oSkek): void {
    const tabelo = vefalCax2l();
    if ( !Object.is(tabelo[ku1oKsaka], skek) ) {
      tabelo[ku1oKsaka] = skek;
      ve3aqai = true;
    }
    if ( !ve3aqai ) return;
    try {
      localStorage.setItem(ksaka, JSON.stringify(tabelo));
      ve3aqai = false;
    } catch {}
  }

  return { vefalKu1o, ve3aqKu1o };
}

export const { vefalKu1o, ve3aqKu1o } = kf2Ku1o("aranis-haku1o");
