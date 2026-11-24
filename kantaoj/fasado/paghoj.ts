// ≺⧼ j͑ʃ'ɔ ɭʃɔ ŋᷠɹ ꞁȷ̀ᴜ }ʃꞇ ʌ j͑ʃ'w j͐ʃᴜ 📄 ⧽≻
// ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , ꞙɭı , ⟅ ſɭᴜ ſןᴜ , ſɭᴜ ſ͕ɭᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭı , ⟅ j͑ʃᴜ ſɭ,w , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭɿ , ⟅ ſɭᴜ ſןᴜ , ſɭɹ ſןᴜ ,
// ſɭɹ ſןᴜ , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
export interface Stato {
  malfermi(): void;
/* ſɭɹ ſןᴜ , ⟅ ſɭᴜ ſןᴜ , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩ */
  fermi(): void;
/* ſɭᴜ ſןᴜ , ꞙɭı , ⟅ ſɭᴜ ſןᴜ , ꞙɭɿ , ꞙɭɔ , 📃 ⟩ */
  kasxi(): void;
  tsekeMalfermita(): boolean;
}

const statoj = new Map<string, Stato>();
const malfermoj = new Map<string, ( () => void )[]>();
let nunId: string | null = null;
let antauaId: string | null = null;

/* ſɭᴜ ſןᴜ , ꞙɭı , ⟅ ſɭᴜ ſןᴜ , ſɭᴜ ſ͕ɭᴜ , ꞙɭɿ ,
    @param id ( string ) - លេខសម្គាល់ , ប៊ូតុងត្រឡប់គឺ id + Reeniri
    @param onMalfermi ( function , optional ) - ដំណើរការមុនបើក
    @param jeSxangxo ( function , optional ) - ដំណើរការពេលបើក ឬបិទ
@returns stato */
export function kf2Staton( id: string, onMalfermi?: () => void, jeSxangxo?: () => void ): Stato {
  const jam = statoj.get(id);
  if ( jam ) {
    if ( onMalfermi ) malfermoj.get(id)!.push(onMalfermi);
    return jam;
  }
  const elemento = document.getElementById(id);
  if ( !elemento ) throw new Error("mankas menuo : " + id);
  malfermoj.set(id, onMalfermi ? [ onMalfermi ] : []);

  function kasxi(): void {
    if ( !elemento!.classList.contains("montri") ) return;
    elemento!.classList.remove("montri");
    if ( nunId === id ) nunId = null;
    jeSxangxo?.();
  }

  const stato: Stato = {
    malfermi(): void {
      if ( elemento!.classList.contains("montri") ) return;
      const antaua = nunId;
      if ( antaua && antaua !== id ) {
        antauaId = antaua;
        statoj.get(antaua)?.kasxi();
      } else {
        antauaId = null;
      }
      nunId = id;
      elemento!.classList.add("montri");
      jeSxangxo?.();
      for ( const f of malfermoj.get(id)! ) f();
    },
    fermi(): void {
      if ( !elemento!.classList.contains("montri") ) return;
      const celo = antauaId && antauaId !== id ? antauaId : null;
      elemento!.classList.remove("montri");
      if ( nunId === id ) nunId = null;
      antauaId = null;
      jeSxangxo?.();
      if ( celo ) statoj.get(celo)?.malfermi();
    },
    kasxi,
    tsekeMalfermita: () => elemento!.classList.contains("montri"),
  };
  statoj.set(id, stato);

  document.getElementById(id + "Reeniri")?.addEventListener("click", () => stato.fermi());
  elemento.addEventListener("click", ( e ) => {
    if ( e.target === elemento ) stato.fermi();
  });
  return stato;
}

/* ſɭᴜ ſןᴜ , ꞙɭɿ , ⟅ ſɭэ ſɭᴜ , ꞙɭı , 📃 ⟩ */
export function fermiCxiujnPaghojn(): void {
  for ( const stato of statoj.values() ) stato.kasxi();
  nunId = null;
  antauaId = null;
}
