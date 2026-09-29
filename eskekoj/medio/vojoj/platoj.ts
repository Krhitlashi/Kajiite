// ≺⧼ La kunigaj platoj 🔲 ⧽≻
// La kruciĝaj platoj — la sama plato por la kvarvoja kruciĝo, la T-kunigo, la
// L-kornero kaj la porda sprono ( konstruiIntersekcajnPlatojn ).
import * as THREE from "three";
import { ANGULA_PROVOLIRO, kreiGeometriajnBufrojn, kreiVojojnMaterialojn } from "./bufroj.js";
import { kreiArkPunktojn, kreiEksteranKurbanArkon, kreiEnanKornanArkon, kreiFormonElPunktoj, kreiKvaronanRingon, plataAltoj } from "./formoj.js";
import { KORNA_ENA_R, KORNA_R, VOJA_DIORITA_DUONO, VOJA_EKSTERA_DUONO } from "./mezuroj.js";

// konstruiIntersekcajnPlatojn — Kovru ĉiun kunigon per unu solida plato ( la
// tuta 0o26/0o10 = 2.75 voja larĝo ) kiu POSEDAS sian kvadraton. La vojoj
// mem haltas ĉe la rando de la kvadrato ( konstruiVojojn forlasas la kunigajn
// truojn ), do la plato estas la sola supraĵo ene — la andezitaj flankoj de la
// vojoj NE povas kuŝi super la dioritaj partoj de la plato. La sama funkcio
// konstruas la kvarvojajn kruciĝojn, la T-kunigojn kaj la L-kornerojn; la
// kvadranto-logiko ( kiuj brakoj ekzistas kaj kiel la anguloj rondiĝas )
// estas priskribita en la funkcio mem.
//
// La platoj de ĉiuj kunigoj kunigas po materialo ( du desegnaj alvokoj
// anstataŭ kvin po plato ). La SUPRO restas je la malalta originala nivelo
// en plata tereno ( tereno + dikeco ) kaj leviĝas ĝis la maksimuma angula
// alto nur en deklivoj — la andezitaj partoj sekvas la saman supron kiel
// partoj de la plato mem; la profundo etendiĝas sub la terenon ( la sama
// konformeco kiel la vojaj ŝtupoj ).
export function konstruiIntersekcajnPlatojn(sceno: THREE.Scene,
  punktoj: [ number, number ][],
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  fermitaj: Map<string, [ number, number ]> = new Map(),
  rotacioj: Map<string, number> = new Map(),
  direktoj: Map<string, [ number, number ][]> = new Map()
): void {
  if ( punktoj.length === 0 ) return;
  // La plato sidas super la vojoj kaj ĝiaj offsetoj estas la PLEJ FORTAJ (
  // -3/-2 por la diorito, -4/-5 por la andezito — kontraŭ la voja centro
  // -2/-4 kaj la voja bordo -1/-1 ). La plato do decidas ĉie ene de sia
  // kvadrato; la vojoj sub ĝi ne povas trarampi, kaj ĉar la vojoj haltas ĉe
  // la rando de la kvadrato ( konstruiVojojn lasas la kunigajn truojn ), la
  // plato estas la sola supraĵo ene.
  const { supraMaterialo, bordaMaterialo } = kreiVojojnMaterialojn(dioritaMaterialo, andezitaMaterialo, -3, -2, -4, -5);
  const bufroj = kreiGeometriajnBufrojn();
  for ( const [ x, z ] of punktoj ) {
    // La brakoj de la kunigo — ĉiu komponento de la fermita direkto (±1 aŭ 0)
    // forprenas unu brakon. T-kunigo havas unu, L-kornero du, kaj la kvarvoja
    // kruciĝo neniun; la brako laŭ la kvadranto ( sx, sz ) ekzistas ĝuste kiam
    // sx NE estas la fermita direkto laŭ x ( kaj same laŭ z ).
    const ferma = fermitaj.get(x + "," + z);
    const fx = ferma ? ferma[0] : 0, fz = ferma ? ferma[1] : 0;
    const rotacio = rotacioj.get(x + "," + z) ?? 0;
    const rotKos = Math.cos( rotacio ), rotSin = Math.sin( rotacio );
    // ⟨ Angula specimenado 📃 ⟩ — la SUPRO restas je la malalta terena nivelo
    // ( tereno + VOJA_SUPRO_LEVIGXO ) kaj leviĝas ĝis la maksimuma angula alto
    // nur en deklivoj. La profundo etendiĝas sub la minimuman angulan altecon +
    // margxeno — la flankaj muroj ĉiam enfosiĝas ( neniu ŝvebanta rando ).
    const altoj = plataAltoj(x, z, rotacio, heightFn);
    const supro = altoj.supro;
    const platoDikeco = supro - ( altoj.minimumo - ANGULA_PROVOLIRO );
    const bazo = supro - platoDikeco;
    // ⟨ La kvadrantoj 📃 ⟩ — la plato konsistas el la kvar kvadrantoj, ĉiu kun
    // sia diorita parto ( la strioj de la vojoj kiuj trapasas ĝin ) kaj sia
    // andezita parto. La samaj offsetoj kaj la sama profundo por ĉiuj, do la
    // partoj najbaras sen interkovri kaj neniu koincidaj-facoj batalo ekzistas.
    const aldoni = ( punktoj2: [ number, number ][], materialo: THREE.MeshStandardMaterial ): void => {
      // ⟨ Neniu plato preter braka fino 📃 ⟩ — la plato rajtas kovri nur la
      // truon de la kunigo; preter la fino-linio de iu brako kusxas la vojo
      // mem. La perpendikularaj brakoj jam respektas ĉiun limon ( iliaj arkoj
      // estas tangeantaj kaj la stumpoj atingas la finon ekzakte ), do ĉi tiu
      // tranĉo estas NE-AGO por la krada urbo kaj por ĉiu orta kunigo — ĝi
      // forprenas nur la kojnojn, kiujn la OBLIKVAJ brakoj lasus. Sen ĝi la
      // plato etendigxas gxis 0.4 unuojn en la vojon kaj ĝia rekta andezita
      // rando aperas trans la kurbo de la korno.
      let randaj = punktoj2;
      for ( const d of lokajBrakoj ) {
        randaj = tranĉi(randaj, d);
        if ( randaj.length < 3 ) return;
      }
      const rotaciitaj = randaj.map( p => [
        rotKos * p[0] - rotSin * p[1],
        rotSin * p[0] + rotKos * p[1],
      ] as [ number, number ] );
      const geometrio = new THREE.ExtrudeGeometry(kreiFormonElPunktoj(rotaciitaj), { depth: platoDikeco, bevelEnabled: false });
      geometrio.rotateX(-Math.PI / 2);
      bufroj.aldoni(geometrio, materialo, new THREE.Matrix4().makeTranslation(x, bazo, z));
    };
    // ⟨ La kvadranta kadro 📃 ⟩ — ĉiu punkto skribiĝas kiel ( trans, laŭ ) paro
    // en la kvadranto ( sx, sz ), kie `trans` estas la perpendikulara ofseto de
    // la braka akso kaj `laŭ` la distanco laŭ gxi. `lauxX` ( la brako laŭ x )
    // mapas trans → z kaj laŭ → x, `lauxZ` male. Ambaŭ uzas la SAMAN argumentan
    // ordon, do unu formulo priskribas la sekcon en ĉiu kvadranto.
    const diorita = VOJA_DIORITA_DUONO, ekstera = VOJA_EKSTERA_DUONO;
    const stumpofino = ekstera + KORNA_R;
    // ⟨ La VERAJ brakoj 📃 ⟩ — la skulptitaj kunigoj liveras la direktojn de
    // siaj brakoj, la kradaj ne ( ties brakoj ĉiam kuŝas sur la aksoj, do la
    // aksa kadro estas ekzakta por ili ). La direktoj venas en mondaj
    // koordinatoj, do ni turnas ilin en la lokan kadron per la INVERSO de la
    // turno, kiun `aldoni` uzas ( rotKos·x + rotSin·z, −rotSin·x + rotKos·z ).
    //
    // ⟨ Kial la brakoj gravas 📃 ⟩ — la plato konstruiĝas en LOKA kadro kaj
    // la anguloj ( la arkoj, la randaj stumpoj ) supozis, ke la brakoj kuŝas
    // sur la aksoj. Ĉe malperpendikulara kunigo — la avenuo renkontas la
    // kajon je 0o10 gxıs 0o13 gradoj — la OBLIKVA brako tiam NE kongruas kun
    // la aksa stumpo: ĝia rekta andezita bordo ( kiu finigxas 2.075 unuojn
    // de la centro ) tralikigxas en la rondigitan kornon de la plato kaj
    // aperas kiel rekta linio trans la kurbo. Kun la veraj direktoj la
    // stumpo, la tangentopunktoj kaj la arkoj sekvas la brakon mem, kaj la
    // vojoj daŭras senfende en la platon.
    const lokajBrakoj: [ number, number ][] = ( direktoj.get(x + "," + z) ?? [] )
      .map( d => [ rotKos * d[0] + rotSin * d[1], -rotSin * d[0] + rotKos * d[1] ] as [ number, number ] )
      .filter( d => Math.hypot(d[0], d[1]) > 0o1/0o1000 );
    // unuo — la vektoro normaligita al longo 1.
    const unuo = ( d: [ number, number ] ): [ number, number ] => {
      const longo2 = Math.hypot(d[0], d[1]);
      return [ d[0] / longo2, d[1] / longo2 ];
    };
    // normalo — la perpendikularo de d turnita al la flanko de `celo` ( la
    // alia brako aŭ la kvadranta direkto ) — do la ofsetoj iras EN la kornon.
    const normalo = ( d: [ number, number ], celo: [ number, number ] ): [ number, number ] => {
      const n: [ number, number ] = [ -d[1], d[0] ];
      return n[0] * celo[0] + n[1] * celo[1] < 0 ? [ d[1], -d[0] ] : n;
    };
    // ⟨ Tranĉo laŭ la braka fino 📃 ⟩ — la plato NE rajtas etendiĝi preter la
    // finoj de siaj brakoj ( la vojaj truoj, VOJA_TRUA_DUONO ), alie ĝi kovrus
    // la vojon mem per diorito. La perpendikularaj brakoj atingas sian finon
    // ekzakte ( la anguloj estas tangeantaj al la bezonataj linioj ), sed la
    // OBLIKVAJ NE — iliaj tangentpunktoj falas preter la fino-linio. Ni do
    // tranĉas ĉiun angulan parton per la du duonaj ebenoj p · u ≤ fino.
    const tranĉi = ( punktoj2: [ number, number ][], direkto: [ number, number ] ): [ number, number ][] => {
      const ena: [ number, number ][] = [];
      for ( let i = 0; i < punktoj2.length; i++ ) {
        const a = punktoj2[i], b = punktoj2[( i + 1 ) % punktoj2.length];
        const da = a[0] * direkto[0] + a[1] * direkto[1] - stumpofino;
        const db = b[0] * direkto[0] + b[1] * direkto[1] - stumpofino;
        if ( da <= 0 ) ena.push(a);
        if (( da < 0 && db > 0 ) || ( da > 0 && db < 0 )) {
          const t = da / ( da - db );
          ena.push([ a[0] + ( b[0] - a[0] ) * t, a[1] + ( b[1] - a[1] ) * t ]);
        }
      }
      return ena;
    };
    // arko — la INTERNajn punktojn de cirkla arko ĉirkaŭ c kun radiuso r, de
    // la punkto a al la punkto b, laŭ la pli mallonga vojo ( la konveksa
    // korno ). La finoj mem jam estas verticoj de la plurangulo.
    const arko = ( c: [ number, number ], r: number, a: [ number, number ], b: [ number, number ] ): [ number, number ][] => {
      const a0 = Math.atan2(a[1] - c[1], a[0] - c[0]);
      let a1 = Math.atan2(b[1] - c[1], b[0] - c[0]);
      while ( a1 - a0 > Math.PI ) a1 -= 2 * Math.PI;
      while ( a0 - a1 > Math.PI ) a1 += 2 * Math.PI;
      const punktoj2: [ number, number ][] = [];
      for ( let i = 1; i < 0o10; i++ ) {
        const ang = a0 + ( a1 - a0 ) * i / 0o10;
        punktoj2.push([ c[0] + Math.cos(ang) * r, c[1] + Math.sin(ang) * r ]);
      }
      return punktoj2;
    };
    for ( const sx of [ -1, 1 ] ) {
      for ( const sz of [ -1, 1 ] ) {
        const lauxX = ( trans: number, lauv: number ): [ number, number ] => [ sx * lauv, sz * trans ];
        const lauxZ = ( trans: number, lauv: number ): [ number, number ] => [ sx * trans, sz * lauv ];
        const brakoX = sx !== fx, brakoZ = sz !== fz;
        // La brakoj de la kunigo, kiuj kuŝas en ĉi tiu kvadranto.
        const kvadrantaj = lokajBrakoj.filter( d => sx * d[0] >= -0o1/0o1000 && sz * d[1] >= -0o1/0o1000 );
        if ( brakoX && brakoZ && kvadrantaj.length === 2 ) {
          // ⟨ DU brakoj, laŭ iliaj VERAJ direktoj 📃 ⟩ — u estas la pli
          // aksa brako ( la trapasanta vojo ), w la alia ( la finigxanta ).
          // nu kaj nw estas iliaj perpendikularoj EN la kornon. La korno-centro
          // C kuŝas sur la komuna punkto de la du randoj ofsetitaj eksteren per
          // ekstera + KORNA_R — la samaj du linioj, al kiuj la ekstera kurbo
          // ( r = KORNA_R ) kaj la ena diorita rando ( r = KORNA_ENA_R ) estas
          // tangeantaj, ĉar KORNA_ENA_R = KORNA_R + la borda larĝo.
          const unuaAksa = Math.abs(kvadrantaj[0][0]) >= Math.abs(kvadrantaj[1][0]);
          const u = unuo(unuaAksa ? kvadrantaj[0] : kvadrantaj[1]);
          const w = unuo(unuaAksa ? kvadrantaj[1] : kvadrantaj[0]);
          const nu = normalo(u, w), nw = normalo(w, u);
          const det = u[1] * w[0] - u[0] * w[1];
          if ( Math.abs(det) > 0o1/0o1000 ) {
            const b0 = stumpofino * ( nw[0] - nu[0] ), b1 = stumpofino * ( nw[1] - nu[1] );
            const alfa = ( -b0 * w[1] + w[0] * b1 ) / det;
            const c: [ number, number ] = [ stumpofino * nu[0] + alfa * u[0], stumpofino * nu[1] + alfa * u[1] ];
            const rEna = KORNA_ENA_R, rEkstera = KORNA_R;
            const enaU: [ number, number ] = [ c[0] - rEna * nu[0], c[1] - rEna * nu[1] ];
            const enaW: [ number, number ] = [ c[0] - rEna * nw[0], c[1] - rEna * nw[1] ];
            const ekU: [ number, number ] = [ c[0] - rEkstera * nu[0], c[1] - rEkstera * nu[1] ];
            const ekW: [ number, number ] = [ c[0] - rEkstera * nw[0], c[1] - rEkstera * nw[1] ];
            const punkto = ( t: number, lauv: number ): [ number, number ] =>
              [ u[0] * lauv + nu[0] * t, u[1] * lauv + nu[1] * t ];
            const punktoW = ( t: number, lauv: number ): [ number, number ] =>
              [ w[0] * lauv + nw[0] * t, w[1] * lauv + nw[1] * t ];
            const diorito = tranĉi([ [ 0, 0 ], punkto(0, stumpofino), punkto(diorita, stumpofino), enaU,
              ...arko(c, rEna, enaU, enaW), enaW, punktoW(diorita, stumpofino), punktoW(0, stumpofino) ], u);
            const diorito2 = tranĉi(diorito, w);
            if ( diorito2.length >= 3 ) aldoni(diorito2, supraMaterialo);
            const bordo = tranĉi([ punkto(diorita, stumpofino), punkto(ekstera, stumpofino), ekU,
              ...arko(c, rEkstera, ekU, ekW), ekW, punktoW(ekstera, stumpofino), punktoW(diorita, stumpofino),
              enaW, ...arko(c, rEna, enaW, enaU), enaU ], u);
            const bordo2 = tranĉi(bordo, w);
            if ( bordo2.length >= 3 ) aldoni(bordo2, bordaMaterialo);
            continue;
          }
        }
        if ( brakoX && brakoZ ) {
          // DU brakoj — la du vojoj renkontigxas en cxi tiu kvadranto. La korno
          // inkluzivas la konektitan vojon laux ties TUTA largxo kaj atingas
          // gxis la tangentopunktoj ( S1 kaj E1 ), kiujn la vojaj truoj lasas
          // liberaj. La diorito sekvas la glatan U-arkon de stumpo-fino al
          // stumpo-fino kaj la andezito estas la uniforma strio inter la ena
          // kaj la ekstera arkoj ( amabaux samcentraj, largxo la bordo ). La
          // stumpoj reparas la truan intervalon per la sama sekco kiel la
          // vojoj, do la vojaj sekcoj dauras senfende en la kornon. Neniu
          // akra angulo restas, nek interne nek ekstere.
          const enaArko = kreiEnanKornanArkon(sx, sz, ekstera);
          const eksteraArko = kreiEksteranKurbanArkon(sx, sz, ekstera);
          aldoni([ [ 0, 0 ], lauxX(0, stumpofino), ...enaArko, lauxZ(0, stumpofino) ], supraMaterialo);
          aldoni([ lauxX(diorita, stumpofino), [ sx * stumpofino, sz * ekstera ],
            ...eksteraArko.slice().reverse().slice(1, -1),
            [ sx * ekstera, sz * stumpofino ], lauxZ(diorita, stumpofino),
            ...enaArko.slice().reverse().slice(1, -1) ], bordaMaterialo);
        } else if ( ( brakoX || brakoZ ) && kvadrantaj.length === 1 ) {
          // UNU brako, laŭ sia VERA direkto — la voja sekco daŭras rekte tra
          // la rando de la plato kaj atingas gxis la fino, kiun la voja truo
          // lasas libera. Neniu angulo ekzistas, do nenio por rondigi.
          const u = unuo(kvadrantaj[0]);
          const nu = normalo(u, brakoX ? [ 0, sz ] : [ sx, 0 ]);
          const p = ( t: number, lauv: number ): [ number, number ] =>
            [ u[0] * lauv + nu[0] * t, u[1] * lauv + nu[1] * t ];
          aldoni([ p(0, 0), p(0, stumpofino), p(diorita, stumpofino), p(diorita, 0) ], supraMaterialo);
          aldoni([ p(diorita, 0), p(diorita, stumpofino), p(ekstera, stumpofino), p(ekstera, 0) ], bordaMaterialo);
        } else if ( brakoX || brakoZ ) {
          // UNU brako, aksa kadro ( la krado ). La voja sekco daŭras rekte tra
          // la rando de la plato; neniu angulo ekzistas, do nenio por rondigi.
          const l = brakoX ? lauxX : lauxZ;
          aldoni([ l(0, 0), l(0, stumpofino), l(diorita, stumpofino), l(diorita, 0) ], supraMaterialo);
          aldoni([ l(diorita, 0), l(diorita, stumpofino), l(ekstera, stumpofino), l(ekstera, 0) ], bordaMaterialo);
        } else {
          // NUL brakoj — la libera kvadranto de L-kornero ( nek vojo nek arko
          // eniras gxin ). La kvarona disko por la diorito kaj la kvarona ringo
          // el kreiKvaronanRingon por la andezito, kun la vojaj duonoj kiel
          // radiusoj. La ringo kovras la tutan kvadranton, do ankaux la libera
          // korno estas tuta rondigita angulo.
          aldoni([ [ 0, 0 ], ...kreiArkPunktojn(0, 0, diorita, sx, sz) ], supraMaterialo);
          aldoni(kreiKvaronanRingon(0, 0, diorita, ekstera, sx, sz), bordaMaterialo);
        }
      }
    }
  }
  bufroj.kunigi(sceno);
}

// ⟨ La kvar kunigaj specoj 📃 ⟩ — la kvarvoja kruciĝo ( neniun fermitan
// direkton ), la T-kunigo ( unu ), la L-kornero ( du ) kaj la porda sprono
// ( unu ) ĉiuj pasas tra ĉi tiu SAMA funkcio. La kvadranto-logiko supre jam
// kovras ilin ĉiujn — la libera kvadranto de L-kornero ricevas la kvaronan
// diskon kaj la ringon ( la arko de la tuta voja larĝo ), ĉiu angulo kie du
// brakoj renkontiĝas ricevas la tutan rondigitan kornon ( la ena diorita U,
// la uniforma andezita strio inter la samcentraj arkoj kaj la stumpoj gxis la
// tangentopunktoj per kreiEnanKornanArkon kaj kreiEksteranKurbanArkon ), la
// trapasantaj brakoj ricevas stumpojn gxis la vojaj truoj, kaj aliloke restas
// nenia angulo. Neniu aparta arka funkcio bezonatas — unu plato, unu paro da
// materialoj, unu kunigo por la tuta reto.

// ⟨ La spronoj estas ORDINARAJ vojoj 📃 ⟩ — la vojeto de konstruaĵa pordo al
// la strato NE plu havas propran konstruilon ( la malnova konstruiSpronon kun
// sia propra bufraro kaj sia propra polygonOffset-hierarkio ). Ĝi estas
// ordinara `VojDifino` en la SAMA listo kiel la kradaj kaj la skulptitaj
// vojoj — la sama sekco, la samaj materialoj, la sama ŝtupa generacio, kaj —
// ĉefe — la sama truo ĉe la kunigo kaj la sama kuniga plato. Tiel la sprono
// ne plu povas kuŝi ene de la strato, kiun ĝi atingas, nek tralasiĝi tra la
// rondigita korno de la plato.
