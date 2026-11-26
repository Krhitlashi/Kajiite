// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ j͑ʃ'w j͐ʃᴜ 📃 ⧽≻

export interface S2k61o {
  h6w6i(): void;

  pukxei(): void;

  kobe(): void;
  tsekeH6w6ita(): boolean;
}

const s2k61oBal2 = new Map<string, S2k61o>();
const h6w6iCa1ara = new Map<string, ( () => void )[]>();
let stih2Id: string | null = null;
let tlakakaiId: string | null = null;

export function kf2S2k61o( id: string, onH6w6i?: () => void, jeVasaka?: () => void ): S2k61o {
  const kxe = s2k61oBal2.get(id);
  if ( kxe ) {
    if ( onH6w6i ) h6w6iCa1ara.get(id)!.push(onH6w6i);
    return kxe;
  }
  const kfe = document.getElementById(id);
  if ( !kfe ) throw new Error("j͑ʃɹ ɭʃɜ }ʃᴜ ʌ }ʃɹ ɭʃᴜ }ʃw ｡ " + id);
  h6w6iCa1ara.set(id, onH6w6i ? [ onH6w6i ] : []);

  function kobe(): void {
    if ( !kfe!.classList.contains("laqazi") ) return;
    kfe!.classList.remove("laqazi");
    if ( stih2Id === id ) stih2Id = null;
    jeVasaka?.();
  }

  const s2k61o: S2k61o = {
    h6w6i(): void {
      if ( kfe!.classList.contains("laqazi") ) return;
      const z2hakai = stih2Id;
      if ( z2hakai && z2hakai !== id ) {
        tlakakaiId = z2hakai;
        s2k61oBal2.get(z2hakai)?.kobe();
      } else {
        tlakakaiId = null;
      }
      stih2Id = id;
      kfe!.classList.add("laqazi");
      jeVasaka?.();
      for ( const f of h6w6iCa1ara.get(id)! ) f();
    },
    pukxei(): void {
      if ( !kfe!.classList.contains("laqazi") ) return;
      const ca12na = tlakakaiId && tlakakaiId !== id ? tlakakaiId : null;
      kfe!.classList.remove("laqazi");
      if ( stih2Id === id ) stih2Id = null;
      tlakakaiId = null;
      jeVasaka?.();
      if ( ca12na ) s2k61oBal2.get(ca12na)?.h6w6i();
    },
    kobe,
    tsekeH6w6ita: () => kfe!.classList.contains("laqazi"),
  };
  s2k61oBal2.set(id, s2k61o);

  document.getElementById(id + "Reeniri")?.addEventListener("click", () => s2k61o.pukxei());
  kfe.addEventListener("click", ( e ) => {
    if ( e.target === kfe ) s2k61o.pukxei();
  });
  return s2k61o;
}

export function pukxeiCa1arajnVulajn(): void {
  for ( const s2k61oUnu of s2k61oBal2.values() ) s2k61oUnu.kobe();
  stih2Id = null;
  tlakakaiId = null;
}
