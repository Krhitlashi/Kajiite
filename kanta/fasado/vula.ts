// ≺⧼ j͑ʃ'ɔ ɭʃɔ ŋᷠɹ ꞁȷ̀ᴜ }ʃꞇ ʌ j͑ʃ'w j͐ʃᴜ 📄 ⧽≻
// ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , ꞙɭı , ⟅ ſɭᴜ ſןᴜ , ſɭᴜ ſ͕ɭᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭı , ⟅ j͑ʃᴜ ſɭ,w , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭɿ , ⟅ ſɭᴜ ſןᴜ , ſɭɹ ſןᴜ ,
// ſɭɹ ſןᴜ , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
export interface S2k61o {
  h6w6i(): void;
/* ſɭɹ ſןᴜ , ⟅ ſɭᴜ ſןᴜ , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩ */
  pukxei(): void;
/* ſɭᴜ ſןᴜ , ꞙɭı , ⟅ ſɭᴜ ſןᴜ , ꞙɭɿ , ꞙɭɔ , 📃 ⟩ */
  hidden(): void;
  tsekeH6w6ita(): boolean;
}

const s2k61oBal2 = new Map<string, S2k61o>();
const h6w6oj = new Map<string, ( () => void )[]>();
let nunId: string | null = null;
let antauaId: string | null = null;

/* ſɭᴜ ſןᴜ , ꞙɭı , ⟅ ſɭᴜ ſןᴜ , ſɭᴜ ſ͕ɭᴜ , ꞙɭɿ ,
    @param id ( string ) - j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ｡ ſɟᴜ ſᶘɹ }ʃᴜ ｡ id + Reeniri ｡
    @param onH6w6i ( function , optional ) - j͑ʃɜ ｡ j͑ʃᴜ ｡
    @param jeVasaka ( function , optional ) - j͑ʃɜ ｡ j͑ʃᴜ j͑ʃᴜ ｡
@returns s2k61o */
export function kf2S2k61o( id: string, onH6w6i?: () => void, jeVasaka?: () => void ): S2k61o {
  const jam = s2k61oBal2.get(id);
  if ( jam ) {
    if ( onH6w6i ) h6w6oj.get(id)!.push(onH6w6i);
    return jam;
  }
  const kfe = document.getElementById(id);
  if ( !kfe ) throw new Error("mankas menuo : " + id);
  h6w6oj.set(id, onH6w6i ? [ onH6w6i ] : []);

  function hidden(): void {
    if ( !kfe!.classList.contains("laqazi") ) return;
    kfe!.classList.remove("laqazi");
    if ( nunId === id ) nunId = null;
    jeVasaka?.();
  }

  const s2k61o: S2k61o = {
    h6w6i(): void {
      if ( kfe!.classList.contains("laqazi") ) return;
      const z2hakai = nunId;
      if ( z2hakai && z2hakai !== id ) {
        antauaId = z2hakai;
        s2k61oBal2.get(z2hakai)?.hidden();
      } else {
        antauaId = null;
      }
      nunId = id;
      kfe!.classList.add("laqazi");
      jeVasaka?.();
      for ( const f of h6w6oj.get(id)! ) f();
    },
    pukxei(): void {
      if ( !kfe!.classList.contains("laqazi") ) return;
      const natakatomasai = antauaId && antauaId !== id ? antauaId : null;
      kfe!.classList.remove("laqazi");
      if ( nunId === id ) nunId = null;
      antauaId = null;
      jeVasaka?.();
      if ( natakatomasai ) s2k61oBal2.get(natakatomasai)?.h6w6i();
    },
    hidden,
    tsekeH6w6ita: () => kfe!.classList.contains("laqazi"),
  };
  s2k61oBal2.set(id, s2k61o);

  document.getElementById(id + "Reeniri")?.addEventListener("click", () => s2k61o.pukxei());
  kfe.addEventListener("click", ( e ) => {
    if ( e.target === kfe ) s2k61o.pukxei();
  });
  return s2k61o;
}

/* ſɭᴜ ſןᴜ , ꞙɭɿ , ⟅ ſɭэ ſɭᴜ , ꞙɭı , 📃 ⟩ */
export function pukxeiCxiujnPaghojn(): void {
  for ( const s2k61oUnu of s2k61oBal2.values() ) s2k61oUnu.hidden();
  nunId = null;
  antauaId = null;
}
