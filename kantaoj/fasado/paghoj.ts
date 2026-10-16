// ≺⧼ ទំព័រពេញ 📄 ⧽≻
// ការបង្កើត UI រួមសម្រាប់ម៉ឺនុយទាំងអស់ ៖ ទំព័រពេញ និងផ្ទាំងលេចឡើង ។
// ម៉ឺនុយមួយមានលេខសម្គាល់តែមួយ ៖ ការហៅដូចគ្នាពីរដងត្រឡប់វត្ថុដូចគ្នា ។
// ពេលម៉ឺនុយមួយបើក ម៉ឺនុយផ្សេងទាំងអស់បិទ ។ ប៊ូតុងត្រឡប់ ( id + Reeniri )
// ត្រឡប់ទៅម៉ឺនុយមុនវិញ មិនមែនគ្រាន់តែបិទទេ ។
export interface Stato {
  malfermi(): void;
  /*ត្រឡប់ ៖ បិទម៉ឺនុយនេះ រួចបើកម៉ឺនុយមុនវិញ , បើមាន */
  fermi(): void;
  /*លាក់តែប៉ុណ្ណោះ ៖ មិនបើកម៉ឺនុយមុនវិញទេ */
  kasxi(): void;
  cxuMalfermita(): boolean;
}
export type Pagho = Stato;
export type Panelo = Stato;

const statoj = new Map<string, Stato>();
const malfermoj = new Map<string, ( () => void )[]>();
let nunId: string | null = null;
let antauaId: string | null = null;

/*បង្កើតម៉ឺនុយមួយ ( ទំព័រពេញ ឬ ផ្ទាំងលេចឡើង ) ដោយអនុសញ្ញាប៊ូតុងត្រឡប់
    @param id ( string ) - លេខសម្គាល់ , ប៊ូតុងត្រឡប់គឺ id + Reeniri
    @param onMalfermi ( function , optional ) - ដំណើរការមុនបើក
    @param jeSxangxo ( function , optional ) - ដំណើរការពេលបើក ឬបិទ
@returns stato */
export function kreiStaton( id: string, onMalfermi?: () => void, jeSxangxo?: () => void ): Stato {
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
    cxuMalfermita: () => elemento!.classList.contains("montri"),
  };
  statoj.set(id, stato);

  document.getElementById(id + "Reeniri")?.addEventListener("click", () => stato.fermi());
  elemento.addEventListener("click", ( e ) => {
    if ( e.target === elemento ) stato.fermi();
  });
  return stato;
}

/*ទំព័រពេញ ៖ ដូចម៉ឺនុយដទៃ តែពេញអេក្រង់ និងជំនួសមាតិកាខាងក្រោយ
    @param paghoId ( string ) - លេខសម្គាល់ទំព័រ
    @param onMalfermi ( function , optional ) - ដំណើរការមុនបើក
    @param jeSxangxo ( function , optional ) - ដំណើរការពេលបើក ឬបិទ
@returns pagho */
export function kreiPaghon( paghoId: string, onMalfermi?: () => void, jeSxangxo?: () => void ): Pagho {
  return kreiStaton(paghoId, onMalfermi, jeSxangxo);
}

/*ផ្ទាំងលេចឡើង ៖ ដូចទំព័រពេញ តែអណ្តែតលើពិភពលោក ។ ប្រើក្នុងហ្គេម
    @param paneloId ( string ) - លេខសម្គាល់ផ្ទាំង
    @param onMalfermi ( function , optional ) - ដំណើរការមុនបើក
    @param jeSxangxo ( function , optional ) - ដំណើរការពេលបើក ឬបិទ
@returns panelo */
export function kreiPanelon( paneloId: string, onMalfermi?: () => void, jeSxangxo?: () => void ): Panelo {
  return kreiStaton(paneloId, onMalfermi, jeSxangxo);
}

/*បិទម៉ឺនុយទាំងអស់ និងលុបប្រវត្តិ ៖ ប្រើពេលចូលពិភពលោក */
export function fermiCxiujnPaghojn(): void {
  for ( const stato of statoj.values() ) stato.kasxi();
  nunId = null;
  antauaId = null;
}
