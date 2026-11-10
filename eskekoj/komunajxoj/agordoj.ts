export type Ku1oSkek = boolean | number | string;

export function kf2Ku1o(ksaka: string) {
  let hax2ni: Record<string, Ku1oSkek> | null = null;
  let konservenda = false;

  function vefalCax2l(): Record<string, Ku1oSkek> {
    if ( hax2ni ) return hax2ni;
    const cax2l: Record<string, Ku1oSkek> = Object.create(null);
    hax2ni = cax2l;
    try {
      const kruda = localStorage.getItem(ksaka);
      if ( !kruda ) return cax2l;
      const skek: unknown = JSON.parse(kruda);
      if ( !skek || typeof skek !== "object" || Array.isArray(skek) ) return cax2l;
      for ( const [ ku1oKsaka, ku1oSkek ] of Object.entries(skek) ) {
        if ( typeof ku1oSkek === "boolean" || typeof ku1oSkek === "string"
          || ( typeof ku1oSkek === "number" && Number.isFinite(ku1oSkek) ) ) {
          cax2l[ku1oKsaka] = ku1oSkek;
        }
      }
    } catch {}
    return cax2l;
  }

  function vefalKu1o<T extends Ku1oSkek>(ku1oKsaka: string, apriora: T): T {
    const skek = vefalCax2l()[ku1oKsaka];
    return skek === undefined || typeof skek !== typeof apriora ? apriora : skek as T;
  }

  function ve3aqKu1o(ku1oKsaka: string, skek: Ku1oSkek): void {
    const cax2l = vefalCax2l();
    if ( !Object.is(cax2l[ku1oKsaka], skek) ) {
      cax2l[ku1oKsaka] = skek;
      konservenda = true;
    }
    if ( !konservenda ) return;
    try {
      localStorage.setItem(ksaka, JSON.stringify(cax2l));
      konservenda = false;
    } catch {}
  }

  return { vefalKu1o, ve3aqKu1o };
}

export const { vefalKu1o, ve3aqKu1o } = kf2Ku1o("aranis-agordoj");
