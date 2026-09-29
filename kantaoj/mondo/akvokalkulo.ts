// ≺⧼ Akvokalkulo 🌊 ⧽≻
// La akva tavolo estas DERIVITA — neniu pentras gxin. La fontoj ( akvofontoj.ts )
// donas la akvon: cxio fluas malsupren laux la tereno, cxiu kavo sub la akva
// nivelo plenigxas, kaj la kanaloj eltrancxas sian liton.
//
// La modulo estas PURA — gxi ricevas la terenon kaj la formon kiel parametrojn,
// do la ludo ( tereno.ts ) kaj la terena skulptilo ( iloj/tero-skulptilo/ )
// uzas la SAMAN kalkulon.
//
// Modelo:
//   · Fonto ( x, z, fluo ) — la fluo eniras la kradon cxe la fonta cxelo.
//   · Fluado — cxelo sekvas la plej malaltan najbaron. Sur platajxoj ( kaj en
//     fermitaj kavoj ) la drena arbo de la inunda kalkulo ( priority-flood )
//     diras la direkton, do la rivero trairas ebenajxojn gxis la mondrando
//     anstataux halti post kelkaj pasoj. La fluo akumuligxas malsupren — du
//     riveroj kunfluantaj kune malfermigxas malsupren.
//   · Kanalo — la profundo kreskas kun la akumulita fluo ( 1 − e^(−fluo/skalo) ).
//     La lito eltrancxigxas ( kavoj ) kaj la akva surfaco sekvas la terenon
//     malsupren — la rivero vere sekvas la geografion. La eltrancxo vivas
//     APARTE de la skulptitaj deltoj, do sxangxi la fontojn aux la nivelon ne
//     difektas la manan terenon.
//   · Baseno — cxelo sub la akva nivelo plenigxas al la nivelo kiam la akvo
//     atingas gxin ( aux kiam la malnova pentrita masko sxemas gxin ). La tuta
//     konektita kavo plenigxas — la truoj plenigxas memage.
//   · Kavo super la nivelo ( montara terno ) — la inunda alteco de la kavo
//     plenigxas gxis la superfluo, kaj la rivero daŭras de tie.

export interface AkvaFonto {
  x: number;
  z: number;
  fluo: number;
}

export interface AkvaAgordoj {
  // La akva nivelo — la suprajxo de la basenoj ( monda Y ).
  nivelo: number;
  // La plej profunda kanala eltrancxo ( mondaj unuoj ) cxe grandega fluo.
  profundoMaks?: number;
  // La fluo, cxe kiu la kanalo atingas ~0o63/0o100 de la maksimuma profundo.
  fluoSkalo?: number;
  // Sub cxi tiu profundo la kanalo ne ekzistas ( neniu akvo, neniu eltrancxo ).
  minimumaProfundo?: number;
}

export interface AkvaKalkulo {
  // 1 = akvo, 0 = seka.
  masko: Uint8Array;
  // La akvosurfaca Y cxe cxelo ( NaN cxe sekaj celoj ).
  niveloj: Float32Array;
  // Kiom la kanalo eltrancxas sub la sekan terenon ( 0 = ne eltrancxita ).
  kavoj: Float32Array;
  // La inunda ( plenigita ) surfaco kaj la dren-orientoj — la iloj montras
  // ilin kaj la rutado uzas ilin.
  inundoj: Float32Array;
  statistikoj: { fontoj: number; kanaloj: number; akvaj: number; ternoj: number };
}

const NAJBAROJ: [number, number][] = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0], [1, 0],
  [-1, 1], [0, 1], [1, 1],
];

// EPS — la krada kvantigo ( 0o1/0o20 = 1/16 ). Sub tiu alto la tereno estas
// rigardata plata.
const EPS = 0o1/0o20;

// kalkuliAkvon — la tuta akva kalkulo.
//     @param n ( number ) - La krada flanko ( SKULPTA_N ).
//     @param paso ( number ) - La krada pasxo ( SKULPTA_PASO ).
//     @param origino ( [number, number] ) - La krada origino ( SKULPTA_ORIGINO ).
//     @param alto ( funkcio ) - La SEKA terena alto ( sen la akva eltrancxo ).
//     @param enFormo ( funkcio ) - Cxu la punkto estas ene de la mondo.
//     @param fontoj ( AkvaFonto[] ) - La fontoj.
//     @param semoj ( Uint8Array | null ) - La malnova pentrita akva masko
//         ( 0/1 po cxelo ) — la basenoj de la antaŭaj mapoj.
//     @param agordoj ( AkvaAgordoj ) - La nivelo kaj la kanalaj mezuroj.
//     @returns La masko, la niveloj, la eltrancxoj kaj la inunda surfaco.
export function kalkuliAkvon(
  n: number,
  paso: number,
  origino: [number, number],
  alto: ( x: number, z: number ) => number,
  enFormo: ( x: number, z: number ) => boolean,
  fontoj: AkvaFonto[],
  semoj: Uint8Array | null,
  agordoj: AkvaAgordoj,
): AkvaKalkulo {
  const N = n * n;
  const x0 = origino[0], z0 = origino[1];
  const nivelo = agordoj.nivelo;
  const profundoMaks = agordoj.profundoMaks ?? 0o6/0o10;          // 0.6
  const fluoSkalo = agordoj.fluoSkalo ?? 0o10;                    // 8
  const minimumaProfundo = agordoj.minimumaProfundo ?? 0o1/0o40;  // 0.03125

  // ⟨ La krado 📃 ⟩ — la seka alto, la mondformo kaj la randocxeloj.
  const H = new Float32Array(N);
  const ene = new Uint8Array(N);
  const rando = new Uint8Array(N);   // cxelo apud la ekstero ( la klifo )
  for ( let j = 0; j < n; j++ ) {
    const z = z0 + j * paso;
    for ( let i = 0; i < n; i++ ) {
      const id = j * n + i;
      H[id] = alto(x0 + i * paso, z);
      ene[id] = enFormo(x0 + i * paso, z) ? 1 : 0;
    }
  }
  for ( let j = 0; j < n; j++ ) {
    for ( let i = 0; i < n; i++ ) {
      const id = j * n + i;
      if ( !ene[id] ) continue;
      for ( const [di, dj] of NAJBAROJ ) {
        const ni = i + di, nj = j + dj;
        if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) { rando[id] = 1; break; }
        if ( !ene[nj * n + ni] ) { rando[id] = 1; break; }
      }
    }
  }

  // ⟨ La inunda kalkulo 📃 ⟩ — priority-flood de la mondrando: la plenigita
  // surfaco inundoj ( la alto, cxe kiu kavo superfluas ) kaj la ordo de la
  // elfluo. Sur platajxo la ordo donas la dren-direkton ( cxelo iras al la
  // najbaro, kiu elfluis pli frue — tio estas pli proksime al la mondrando ).
  const inundoj = new Float32Array(N).fill(Infinity);
  const ordo = new Int32Array(N).fill(-1);
  {
    const amaso = new Amaso(N);
    for ( let id = 0; id < N; id++ ) {
      if ( ene[id] && rando[id] ) { inundoj[id] = H[id]; amaso.aldoni(H[id], id); }
    }
    let kalkulilo = 0;
    while ( amaso.length > 0 ) {
      const [altoNun, id] = amaso.preni();
      if ( ordo[id] >= 0 ) continue;
      ordo[id] = kalkulilo++;
      const i = id % n, j = ( id - i ) / n;
      for ( const [di, dj] of NAJBAROJ ) {
        const ni = i + di, nj = j + dj;
        if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) continue;
        const nid = nj * n + ni;
        if ( !ene[nid] || ordo[nid] >= 0 ) continue;
        const nova = Math.max(H[nid], altoNun);
        if ( nova < inundoj[nid] ) { inundoj[nid] = nova; amaso.aldoni(nova, nid); }
      }
    }
  }

  const masko = new Uint8Array(N);
  const niveloj = new Float32Array(N).fill(NaN);
  const kavoj = new Float32Array(N);
  const fluo = new Float32Array(N);
  const kanalo = new Uint8Array(N);

  // ⟨ La fluado 📃 ⟩ — de cxiu fonto malsupren.
  let ternoj = 0;
  const fontajCxeloj: number[] = [];
  for ( const fonto of fontoj ) {
    const fi = Math.round(( fonto.x - x0 ) / paso );
    const fj = Math.round(( fonto.z - z0 ) / paso );
    if ( fi < 0 || fj < 0 || fi >= n || fj >= n ) continue;
    const starto = fj * n + fi;
    if ( !ene[starto] ) continue;
    const restanta = Math.max(0, fonto.fluo);
    if ( restanta > 0 ) fontajCxeloj.push(starto);
    let id = starto;
    let sekuraj = 0;
    while ( restanta > 0 && sekuraj++ < N && id >= 0 ) {
      if ( rando[id] ) break;                      // la rivero falas de la mondo
      fluo[id] += restanta;
      if ( !masko[id] ) kanalo[id] = 1;
      // La sekva cxelo.
      const i = id % n, j = ( id - i ) / n;
      let sekv = -1, sekvAlto = H[id];
      let plejFruta = -1, plejFrutaOrdo = ordo[id];
      for ( const [di, dj] of NAJBAROJ ) {
        const ni = i + di, nj = j + dj;
        if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) continue;
        const nid = nj * n + ni;
        if ( !ene[nid] ) continue;
        if ( H[nid] < sekvAlto - EPS ) { sekvAlto = H[nid]; sekv = nid; }
        if ( ordo[nid] >= 0 && ordo[nid] < plejFrutaOrdo ) { plejFrutaOrdo = ordo[nid]; plejFruta = nid; }
      }
      if ( sekv < 0 ) {
        // Neniu pli malalta najbaro. Se ni estas en kavo super la akva nivelo,
        // la kavo plenigxas gxis sia superfluo ( la inunda alto ) kaj la rivero
        // daŭras de tie — montara terno kun elfluo.
        if ( inundoj[id] > H[id] + EPS ) {
          markiBasenon( H, masko, niveloj, ene, n, id, inundoj[id] );
          kanalo[id] = 0;
        }
        sekv = plejFruta;
        if ( sekv < 0 ) {
          // Fermita truo sen elfluo — malgranda terno kaj fino.
          if ( !masko[id] ) { ternoj++; markiTernon( H, masko, niveloj, ene, n, id, nivelo ); kanalo[id] = 0; }
          break;
        }
      }
      if ( H[sekv] < nivelo ) { markiBasenon( H, masko, niveloj, ene, n, sekv, nivelo ); break; }
      id = sekv;
    }
  }

  // ⟨ La kanaloj 📃 ⟩ — la profundo laux la akumulita fluo. La kanalo ne
  // eltrancxas sub la akvan nivelon ( la basena surfaco restas plata ), do la
  // rivero alproksimigxas al la lago kun levigxanta lito.
  for ( let id = 0; id < N; id++ ) {
    if ( !kanalo[id] || masko[id] || H[id] < nivelo ) continue;
    const profundo0 = profundoMaks * ( 1 - Math.exp(-fluo[id] / fluoSkalo) );
    const profundo = Math.min(profundo0, Math.max(0, H[id] - nivelo));
    if ( profundo < minimumaProfundo ) continue;
    kavoj[id] = profundo;
    // La surfaco iom sub la seka tereno ( la libera bordo ), do la akvo sidas
    // en la eltrancxita lito anstataux flosi super la grundo.
    const surfaco = H[id] - profundo * ( 0o1/0o4 );
    niveloj[id] = surfaco;
    masko[id] = 1;
    // La riverbordo — la flankoj eltrancxigxas malpli, do la rivero larghxas
    // laux la fluo ( malgranda rivereto restas unu cxelon, granda rivero kovras
    // tri ). La akva surfaco restas egala trans la larghxo, kiel vera rivero.
    const larghxo = profundo / profundoMaks;
    const i = id % n, j = ( id - i ) / n;
    for ( const [di, dj] of NAJBAROJ ) {
      const ni = i + di, nj = j + dj;
      if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) continue;
      const nid = nj * n + ni;
      if ( !ene[nid] || !kanalo[nid] || masko[nid] || H[nid] < nivelo ) continue;
      const orta = di === 0 || dj === 0;
      const kav = profundo * ( orta ? 0o1/0o2 : 0o1/0o20 ) * larghxo;
      // La bordo malsekigxas nur se la akvo vere kovras gxin — sur kruta
      // deklivo la surfaco de la kanalo sidas sub la pli alta bordo, do la
      // planko restas seka ( nenia akvo en la montodeklivo ).
      if ( H[nid] - kav >= surfaco ) continue;
      if ( kav > kavoj[nid] ) kavoj[nid] = kav;
      if ( Number.isNaN(niveloj[nid]) || niveloj[nid] > surfaco ) niveloj[nid] = surfaco;
      masko[nid] = 1;
    }
  }

  // ⟨ La surfaco de la kanalo 📃 ⟩ — neniu glatigado: la rivera surfaco estas
  // `lito + profundo` cxe cxiu cxelo, kaj la SAMA krado portas la terenon, do la
  // specimenoj de ambaux ( dulinearaj super la samaj anguloj ) malsupreniras
  // kune — la rivero sekvas la terenon sen stupoj. Glatigado super la kanalo
  // ( provita ) egaligus la surfacon laux la tuta rivero: la fonto FALUS gxis
  // sia lito kaj la malsupra rivero sxvelus. Nur la gardo restas.
  for ( let id = 0; id < N; id++ ) {
    if ( !masko[id] || kavoj[id] <= 0 || !kanalo[id] ) continue;
    const fundo = H[id] - kavoj[id];
    const minimumo = fundo + minimumaProfundo * ( 0o3/0o4 );
    if ( niveloj[id] < minimumo ) niveloj[id] = minimumo;
  }

  // ⟨ La basenoj 📃 ⟩ — la semoj estas la malnova pentrita masko ( la basenoj
  // de la antaŭaj mapoj ) kaj la fontoj mem; la riveroj jam semas siajn buŝojn
  // dum la fluado.
  if ( semoj ) {
    for ( let id = 0; id < N; id++ ) {
      if ( semoj[id] && ene[id] && H[id] < nivelo ) markiBasenon( H, masko, niveloj, ene, n, id, nivelo );
    }
  }
  for ( const id of fontajCxeloj ) {
    if ( H[id] < nivelo ) markiBasenon( H, masko, niveloj, ene, n, id, nivelo );
  }

  let akvaj = 0, kanaloj = 0;
  for ( let id = 0; id < N; id++ ) {
    if ( masko[id] ) {
      akvaj++;
      if ( kavoj[id] > 0 ) kanaloj++;
    }
  }
  return { masko, niveloj, kavoj, inundoj, statistikoj: { fontoj: fontoj.length, kanaloj, akvaj, ternoj } };
}

// markiBasenon — plenigu la konektitan kavon sub la donita nivelo al tiu
// nivelo, per vico. La tuta kavo plenigxas, ne nur la sema cxelo.
function markiBasenon(
  H: Float32Array, masko: Uint8Array, niveloj: Float32Array, ene: Uint8Array,
  n: number, starto: number, nivelo: number,
): void {
  if ( H[starto] >= nivelo ) return;
  const vico = new Int32Array(n * n);
  let kapo = 0, vosto = 0;
  vico[vosto++] = starto;
  masko[starto] = 1;
  niveloj[starto] = nivelo;
  while ( kapo < vosto ) {
    const id = vico[kapo++];
    const i = id % n, j = ( id - i ) / n;
    for ( const [di, dj] of NAJBAROJ ) {
      const ni = i + di, nj = j + dj;
      if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) continue;
      const nid = nj * n + ni;
      if ( masko[nid] || !ene[nid] || H[nid] >= nivelo ) continue;
      masko[nid] = 1;
      niveloj[nid] = nivelo;
      vico[vosto++] = nid;
    }
  }
}

// markiTernon — fermita truo: malgranda terno cxe la plej malalta punkto. La
// akvo haltas tie ( la fluo ne plu havas eliron ).
function markiTernon(
  H: Float32Array, masko: Uint8Array, niveloj: Float32Array, ene: Uint8Array,
  n: number, starto: number, nivelo: number,
): void {
  const surfaco = Math.max(H[starto] + 0o1/0o10, nivelo);
  const i0 = starto % n, j0 = ( starto - i0 ) / n;
  for ( let dj = -1; dj <= 1; dj++ ) {
    for ( let di = -1; di <= 1; di++ ) {
      const ni = i0 + di, nj = j0 + dj;
      if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) continue;
      const nid = nj * n + ni;
      if ( !ene[nid] || H[nid] > surfaco ) continue;
      masko[nid] = 1;
      niveloj[nid] = surfaco;
    }
  }
}

// ⟨ La specimenaj helpiloj 📃 ⟩ — la ludo ( tereno.ts ) kaj la skulptilo legas
// la rezulton per la samaj funkcioj, do la du ne povas devojiĝi.

// specimenoDulineara — dulineara specimeno de unu-cela krado cxe monda pozicio.
//     @param krado ( Float32Array | Uint8Array ) - La krada kampo.
//     @param x, z ( number ) - La monda pozicio.
//     @returns La specimeno ( la difinita valoro ekster la krado ).
export function specimenoDulineara( krado: Float32Array | Uint8Array,
  n: number, paso: number, origino: number[], x: number, z: number ): number {
  const fx = ( x - origino[0] ) / paso, fz = ( z - origino[1] ) / paso;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  if ( i0 < 0 || j0 < 0 || i0 + 1 >= n || j0 + 1 >= n ) return 0;
  const u = fx - i0, v = fz - j0;
  const a = krado[j0 * n + i0], b = krado[j0 * n + i0 + 1];
  const c = krado[( j0 + 1 ) * n + i0], d = krado[( j0 + 1 ) * n + i0 + 1];
  return a * ( 1 - u ) * ( 1 - v ) + b * u * ( 1 - v ) + c * ( 1 - u ) * v + d * u * v;
}

// akvoCxe — Cxu la punkto estas akvo ( la dulineara masko >= 0o1/0o2 ).
export function akvoCxe( rezulto: AkvaKalkulo, n: number, paso: number,
  origino: number[], x: number, z: number ): boolean {
  return specimenoDulineara(rezulto.masko, n, paso, origino, x, z) >= 0o1/0o2;
}

// niveloCxe — La akvosurfaca Y cxe la punkto, aux NaN ekster la akvo. Nur la
// malsekaj cxeloj de la 2×2-bloko pezas ( la sekaj portas NaN ).
export function niveloCxe( rezulto: AkvaKalkulo, n: number, paso: number,
  origino: number[], x: number, z: number, r = 0o1 ): number {
  const fx = ( x - origino[0] ) / paso, fz = ( z - origino[1] ) / paso;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  let sumo = 0, pezo = 0;
  for ( let k = 0; k < 4; k++ ) {
    const i = i0 + ( k & 1 ), j = j0 + ( k >> 1 );
    if ( i < 0 || j < 0 || i >= n || j >= n ) continue;
    const nivelo = rezulto.niveloj[j * n + i];
    if ( Number.isNaN(nivelo) ) continue;
    const w = ( k & 1 ? u : 1 - u ) * ( k >> 1 ? v : 1 - v );
    sumo += nivelo * w;
    pezo += w;
  }
  if ( pezo > 0 ) return sumo / pezo;
  return niveloProksima(rezulto, n, paso, origino, x, z, r);
}

// niveloProksima — La nivelo de la plej proksima akva cxelo ( gxis r cxeloj
// for ), aux NaN. Por la tera akvoborda tavolo, kiu bezonas la nivelon ankaux
// kelkajn unuojn super la akvo.
export function niveloProksima( rezulto: AkvaKalkulo, n: number, paso: number,
  origino: number[], x: number, z: number, r = 0o1 ): number {
  const ic = Math.round(( x - origino[0] ) / paso );
  const jc = Math.round(( z - origino[1] ) / paso );
  for ( let ringo = 0; ringo <= r; ringo++ ) {
    for ( let dj = -ringo; dj <= ringo; dj++ ) {
      for ( let di = -ringo; di <= ringo; di++ ) {
        if ( ringo > 0 && Math.abs(di) !== ringo && Math.abs(dj) !== ringo ) continue;
        const i = ic + di, j = jc + dj;
        if ( i < 0 || j < 0 || i >= n || j >= n ) continue;
        const nivelo = rezulto.niveloj[j * n + i];
        if ( !Number.isNaN(nivelo) ) return nivelo;
      }
    }
  }
  return NaN;
}

// limojDeAkvo — la plej malgranda kadro cxirkaŭ la akvo ( kun `libero` cxeloj da
// rando ), aux null se neniu akvo.
export function limojDeAkvo( rezulto: AkvaKalkulo, n: number, paso: number,
  origino: number[], libero = 0o2 ): { x0: number; z0: number; x1: number; z1: number } | null {
  let imin = n, imax = -1, jmin = n, jmax = -1;
  for ( let j = 0; j < n; j++ ) {
    for ( let i = 0; i < n; i++ ) {
      if ( rezulto.masko[j * n + i] ) {
        if ( i < imin ) imin = i;
        if ( i > imax ) imax = i;
        if ( j < jmin ) jmin = j;
        if ( j > jmax ) jmax = j;
      }
    }
  }
  if ( imax < 0 ) return null;
  return {
    x0: origino[0] + ( imin - libero ) * paso,
    z0: origino[1] + ( jmin - libero ) * paso,
    x1: origino[0] + ( imax + 1 + libero ) * paso,
    z1: origino[1] + ( jmax + 1 + libero ) * paso,
  };
}

// Amaso — la minimuma amaso ( duuma stako ) por la inunda kalkulo. Malgranda
// kaj sen dependajxoj — la sama konstruo en la skulptilo.
class Amaso {
  private valoroj: Float32Array;
  private indeksoj: Int32Array;
  length = 0;

  constructor( kapacito: number ) {
    this.valoroj = new Float32Array(kapacito + 1);
    this.indeksoj = new Int32Array(kapacito + 1);
  }

  aldoni( valoro: number, indekso: number ): void {
    let c = this.length++;
    this.valoroj[c] = valoro;
    this.indeksoj[c] = indekso;
    while ( c > 0 ) {
      const p = ( c - 1 ) >> 1;
      if ( this.valoroj[p] <= this.valoroj[c] ) break;
      this.interSxangxi(p, c);
      c = p;
    }
  }

  preni(): [number, number] {
    const valoro = this.valoroj[0], indekso = this.indeksoj[0];
    this.length--;
    if ( this.length > 0 ) {
      this.valoroj[0] = this.valoroj[this.length];
      this.indeksoj[0] = this.indeksoj[this.length];
      let p = 0;
      for ( ;; ) {
        const l = 2 * p + 1, r = l + 1;
        let m = p;
        if ( l < this.length && this.valoroj[l] < this.valoroj[m] ) m = l;
        if ( r < this.length && this.valoroj[r] < this.valoroj[m] ) m = r;
        if ( m === p ) break;
        this.interSxangxi(p, m);
        p = m;
      }
    }
    return [valoro, indekso];
  }

  private interSxangxi( a: number, b: number ): void {
    const v = this.valoroj[a]; this.valoroj[a] = this.valoroj[b]; this.valoroj[b] = v;
    const i = this.indeksoj[a]; this.indeksoj[a] = this.indeksoj[b]; this.indeksoj[b] = i;
  }
}
