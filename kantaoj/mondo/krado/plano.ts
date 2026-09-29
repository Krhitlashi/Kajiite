// ≺⧼ La plena plano 🗺️ ⧽≻
// La plena krada urbo ( konstruaĵoj, vojoj, spronoj ) kiel PURAJ datumoj — la
// sama loĝiko kiel konstruiKradanUrbon en urbo.ts, sed sen la meshoj
// ( kreiKradanPlanon ). Se oni ŝanĝas la vojan aŭ spronan logikon en urbo.ts,
// oni ŝanĝu ankaŭ ĉi tiun planon — la skulptilo montras la saman logikon.
import { kreiKradon, tipoDeBloko } from "./celoj.js";
import { aplikiSuperojn } from "./superoj.js";
import { kradajDerivajoj } from "./derivajoj.js";
import { skaniVojanReton } from "./skanado.js";
import type { AldonaBloko, CellType, KradaArangxo, KradaKonstruajxo, KradaPlano,
  KradaSpono, KradaVojSegmento } from "./tipoj.js";
// kreiKradanPlanon — la plenan kradan urbon ( konstruaĵoj, vojoj, spronoj )
// kiel PURAJN datumojn. Ĝi reflektas la loĝikan strukturon de
// konstruiKradanUrbon en urbo.ts ( sen la meshoj ). la samaj pozicioj,
// rotacioj, vojo-linioj, ekstentoj kaj spronoj. La terena skulptilo montras
// ĉi tiun planon — se la ludo ŝanĝiĝas, la plano devas ŝanĝiĝi same.
// superoj — manaj ĉel-superoj de la terena skulptilo. la ŝlosilo estas
// "c,r", la valoro la ĉela tipo. Anstataŭigo de ekzistanta ĉelo ŝanĝas ĝian
// tipon; nova ŝlosilo ALDONAS ĉelon ( la voja reto konstruiĝas ĉirkaŭ ĝi
// kiel ĉe la generitaj ĉeloj ).
// aldonajBlokoj — la EXTRAJ blokoj de la urbo ( la skulptilo metas ilin
// aparte de la krado — la spacosxipa stacio de la cefa urbo estas unu ). Ili
// konstruigxas kiel konstrumajxoj cxe siaj pozicioj, sen vojoj kaj sen
// spronoj ( la voja reto koncernas nur la generitajn ĉelojn ).
export function kreiKradanPlanon(arangxo: KradaArangxo, superoj?: Map<string, CellType>, aldonajBlokoj?: AldonaBloko[]): KradaPlano {
  const { PASXO, nordaPinto, ringoX, ringoSuda, sudaVojo, stacioZ, staciaRingaNordo, BLOKO } = kradajDerivajoj(arangxo);
  const n = arangxo.arangxaGrando;
  const ĉeloj = kreiKradon(arangxo);
  aplikiSuperojn(ĉeloj, superoj);
  // ⟨ Konstruaĵoj 📃 ⟩
  const konstruaĵoj: KradaKonstruajxo[] = [];
  const aldoni = ( x: number, z: number, rot: number, tipo: CellType, sub: KradaKonstruajxo["sub"], stacia: boolean, ekstra = false, konektita = false ) => {
    konstruaĵoj.push({ x, z, rot, tipo, cx: Math.round(x / PASXO), cz: Math.round(z / PASXO), sub, stacia, ekstra, konektita });
  };
  for ( const [ col, row, tipo ] of ĉeloj ) {
    const cx = col * PASXO, cz = row * PASXO;
    if ( col === 0 && row === 0 ) {
      // La centro — la centra konstruaĵo ( sanktejo ), aŭ la STACIO en la
      // kvar-bloka krado ( "centra konstruaĵo aŭ stacio en la centro" ).
      if ( arangxo.blokaGrando === "kvar" ) aldoni(0, 0, 0, "sanktejo", "centro", true);
      else aldoni(0, 0, 0, tipo, "centro", false);
      continue;
    }
    if ( arangxo.blokaGrando === "kvar" ) {
      // Kvar-konstruajxa bloko — la ORIGINALA aranĝo. la kvar konstruaĵoj
      // sidas ĉe la kvar anguloj ( NE, NW, SW, SE je ±BLOKO ), ĉiu rotaciita
      // al sia bloka flanko ( nordo, okcidento, sudo, oriento ). La supero
      // "c,r,SUB" ( SUB = NE/NW/SW/SE ) ŝanĝas la INDIVIDUAN konstruajxon
      // super la blokan miksadon — la sub-redaktado de la skulptilo.
      const suboj: [ number, number, number, KradaKonstruajxo["sub"] ][] = [
        [ BLOKO,  BLOKO,  0,            "NE" ],
        [ -BLOKO,  BLOKO,  -Math.PI / 2, "NW" ],
        [ -BLOKO, -BLOKO,   Math.PI,     "SW" ],
        [ BLOKO, -BLOKO,   Math.PI / 2, "SE" ],
      ];
      for ( const [ blx, blz, rot, sub ] of suboj ) {
        const subTipo = superoj?.get(`${col},${row},${sub}`);
        aldoni(cx + blx, cz + blz, rot, subTipo ?? tipoDeBloko(tipo, col, row, blx, blz), sub, false);
      }
    } else {
      aldoni(cx, cz, 0, tipo, "centro", false);
    }
  }
  // La fronta regulo ( unu-bloka ) — frontu al la centro laŭ la domina akso
  // ( la sama regulo kiel en urbo.ts ). La diamanta formo havas NENIAN
  // izolitan korneran ĉelon, do ĉiu pordo trovas kradan vojon antaŭ si. La
  // ALDONAJ blokoj havas fiksan rotacion ( la skulptilo metas ilin mane ).
  if ( arangxo.blokaGrando === "unu" ) {
    for ( const k of konstruaĵoj ) {
      if ( k.stacia || k.ekstra || ( k.x === 0 && k.z === 0 ) ) continue;
      if ( Math.abs(k.x) > Math.abs(k.z) ) k.rot = k.x > 0 ? -Math.PI / 2 : Math.PI / 2;
      else k.rot = k.z > 0 ? Math.PI : 0;
    }
  }
  // La aldonaj blokoj — la spacosxipa stacio kaj aliaj ekstraj konstruajxoj
  // cxe precizaj pozicioj, aparte de la krada generado. La KONEKTITA bloko
  // kunigxas kun la voja reto ( ĝia ĉelo aligxas al la reto sube kaj la
  // bloko ricevas spronon — kiel la malnova stacidoma ĉelo ); la ceteraj
  // staras solaj ( neniu vojo, neniu sprono ).
  for ( const b of aldonajBlokoj ?? [] ) {
    aldoni(b.x, b.z, b.rot ?? 0, b.tipo, b.sub ?? "centro", !!b.stacia, true, !!b.konektita);
  }
  // La konektitaj aldonaj blokoj aldonas sian ĉelon al la voja reto ( post
  // la konstrua buklo — la konstruajxo jam aldoniĝis, nur la reto bezonas la
  // ĉelon por la vicoj/kolumnoj kaj la spronoj ).
  for ( const b of aldonajBlokoj ?? [] ) {
    if ( !b.konektita ) continue;
    const c = Math.round(b.x / PASXO), r = Math.round(b.z / PASXO);
    if ( !ĉeloj.some(( [ lc, lr ] ) => lc === c && lr === r) ) ĉeloj.push([ c, r, "sanktejo" ]);
  }

  // ⟨ Voja reto 📃 ⟩
  const vojoj: KradaVojSegmento[] = [];
  const colSet = new Set<number>(), rowSet = new Set<number>();
  for ( const [ c, r, t ] of ĉeloj ) { if ( t !== null ) { colSet.add(c); rowSet.add(r); } }
  const KOLOJ = [ ...colSet ].sort(( a, b ) => a - b);
  const VICOJ = [ ...rowSet ].sort(( a, b ) => a - b);
  // NS-vojoj ( inter apudaj kolumnoj ) kaj EW-vojoj ( inter apudaj vicoj ).
  const RETO_X: number[] = [];
  for ( let ci = 0; ci < KOLOJ.length - 1; ci++ ) {
    if ( KOLOJ[ci + 1] - KOLOJ[ci] === 1 ) RETO_X.push(( KOLOJ[ci] + KOLOJ[ci + 1] ) / 2 * PASXO);
  }
  const RETO_Z: number[] = [];
  for ( let ri = 0; ri < VICOJ.length - 1; ri++ ) {
    if ( VICOJ[ri + 1] - VICOJ[ri] === 1 ) RETO_Z.push(( VICOJ[ri] + VICOJ[ri + 1] ) / 2 * PASXO);
  }
  // La eksteraj vojoj ( unu pasxon preter la plej ekstera vico/kolumno ). la
  // kvar-bloka krado bezonas ilin, ĉar ĉiu bloko havas konstruaĵojn sur ĉiuj
  // kvar flankoj ( la voja bloko ). La unu-bloka krado ne bezonas ilin — ĉiuj
  // konstruaĵoj frontas al la centro, do la plej ekstera vojo-linio kuŝas
  // inter la du plej eksteraj vicoj/kolumnoj. Ili etendiĝas nur kie reale
  // ekzistas blokoj ( vidu hasCellAt sube ) — la malplenaj korneroj de la
  // diamanto ricevas nenian vojon.
  if ( arangxo.blokaGrando === "kvar" ) {
    const e = ( n + 0o1/0o2 ) * PASXO;
    RETO_X.push(e, -e);
    RETO_Z.push(e, -e);
  }
  const hasCellAt = ( c: number, r: number ) =>
    ĉeloj.some(( [ lc, lr, lt ] ) => lc === c && lr === r && lt !== null);

  // La voja segmenta skanado — la komuna algoritmo kun urbo.ts
  // ( skaniVojanReton ). la uzeblaj perpendikularaj koordinatoj de ĉiu linio.
  const { EW, NS } = skaniVojanReton(RETO_X, RETO_Z, PASXO, 0, 0,
    arangxo.blokaGrando === "unu" ? ( n + 1 ) * PASXO : null, hasCellAt);
  // La ekstentoj de ĉiu vojo-linio ( kie la segmentoj reale ekzistas ) — por
  // la sprona gardo ( la samaj ekstentoj kiel en urbo.ts ).
  const NS_ekstentoj = new Map<number, [ number, number ]>();
  const EW_ekstentoj = new Map<number, [ number, number ]>();
  // EW-vojoj ( inter apudaj vicoj ) — segmentoj NUR inter intersekcaj NS-vojoj.
  for ( const [ roadZ, uzeblaj ] of EW ) {
    EW_ekstentoj.set(roadZ, [ uzeblaj[0], uzeblaj[uzeblaj.length - 1] ]);
    for ( let i = 0; i < uzeblaj.length - 1; i++ ) {
      const x1 = uzeblaj[i], x2 = uzeblaj[i + 1];
      if ( Math.abs(x2 - x1) > 0o1/0o10 ) vojoj.push({ orient: "EW", poz: roadZ, de: x1, al: x2 });
    }
  }
  // NS-vojoj ( inter apudaj kolumnoj ) — segmentoj NUR inter intersekcaj EW-vojoj.
  for ( const [ roadX, uzeblaj ] of NS ) {
    NS_ekstentoj.set(roadX, [ uzeblaj[0], uzeblaj[uzeblaj.length - 1] ]);
    for ( let i = 0; i < uzeblaj.length - 1; i++ ) {
      const z1 = uzeblaj[i], z2 = uzeblaj[i + 1];
      if ( Math.abs(z2 - z1) > 0o1/0o10 ) vojoj.push({ orient: "NS", poz: roadX, de: z1, al: z2 });
    }
  }

  // ⟨ Lampoj 📃 ⟩
  // La kvar-lampa strato-ŝablono — la sama geometrio kiel en
  // konstruiKradanUrbon ( urbo.ts ). kvar lampoj ĉirkaŭ ĉiu placo-nodo ( voja
  // linio-fino ) je 2.125, kaj kvar ĉirkaŭ ĉiu reala vojkruciĝo je 2.375, kun
  // la sama dedupo ( < 2 unuoj ) kiel la addLamp de la ludo. La L-korneroj
  // estas ankaŭ placo-nodoj, do la arka ŝablono ( 2.375 ) de la ludo
  // dedupiĝas per la placa ( 2.125 ) — neniu aldona lampo aperas tie. La ludo aldonas
  // la terenajn filtrilojn ( akvo, konstruajxoj ) poste; ĉi tiu plano montras
  // la puran strukturon. Ĉi tiu sekcio staras ANTAŬ la spronoj, ĉar la
  // sprona sekcio etendas la ringoX-ekstenton al la doka avenuo — la lampoj
  // de la ludo kovras nur la kradajn nodojn, ne la avenuon mem.
  const lampoj: { x: number; z: number }[] = [];
  if ( arangxo.lampoj !== false ) {
    const LAMPA_DEDUPO = 0o2;            // 2 — same kiel la addLamp de la ludo
    const aldoniLampon = ( x: number, z: number ) => {
      for ( const l of lampoj ) if ( Math.hypot(l.x - x, l.z - z) < LAMPA_DEDUPO ) return;
      lampoj.push({ x, z });
    };
    const placaKvaropo = 0o21/0o10;      // 2.125 — ĉirkaŭ la placo-nodoj
    const krucaKvaropo = 0o23/0o10;      // 2.375 — ĉirkaŭ la kruciĝoj
    const placaKvaropoOfsetoj = [ [ -placaKvaropo, -placaKvaropo ], [ placaKvaropo, -placaKvaropo ], [ -placaKvaropo, placaKvaropo ], [ placaKvaropo, placaKvaropo ] ];
    const krucaKvaropoOfsetoj = [ [ -krucaKvaropo, -krucaKvaropo ], [ krucaKvaropo, -krucaKvaropo ], [ -krucaKvaropo, krucaKvaropo ], [ krucaKvaropo, krucaKvaropo ] ];
    // Placo-nodoj — la du finoj de ĉiu vojo-linio ( la ekstentoj de la planaj
    // segmentoj, kiel la aldoniFinon de la ludo ).
    for ( const [ x, [ de, al ] ] of NS_ekstentoj ) {
      for ( const z of [ de, al ] ) {
        for ( const [ dx, dz ] of placaKvaropoOfsetoj ) aldoniLampon(x + dx, z + dz);
      }
    }
    for ( const [ z, [ de, al ] ] of EW_ekstentoj ) {
      for ( const x of [ de, al ] ) {
        for ( const [ dx, dz ] of placaKvaropoOfsetoj ) aldoniLampon(x + dx, z + dz);
      }
    }
    // Realaj kruciĝoj — kie NS- kaj EW-segmentoj reale krucas. La planaj
    // segmentoj ekzistas nur inter kruciĝoj, do ĉiu interkovro estas kruciĝo;
    // la kruciĝoj ĉe la linio-finoj dedupiĝas per la placa ŝablono supre.
    for ( const ns of vojoj ) {
      if ( ns.orient !== "NS" ) continue;
      for ( const ew of vojoj ) {
        if ( ew.orient !== "EW" ) continue;
        if ( ew.poz < ns.de - 1e-6 || ew.poz > ns.al + 1e-6 ) continue;
        if ( ns.poz < ew.de - 1e-6 || ns.poz > ew.al + 1e-6 ) continue;
        for ( const [ dx, dz ] of krucaKvaropoOfsetoj ) aldoniLampon(ns.poz + dx, ew.poz + dz);
      }
    }
  }

  // ⟨ Spronoj 📃 ⟩
  const spronoj: KradaSpono[] = [];
  // La doka avenuo ( mond-nivela vojo de la ĉefa urbo ) daŭrigas la NS-vojon
  // ĉe x=ringoX SUDEN de ĝia fino ( sudaVojo ) ĝis la kajo ( -0o130 ) — la
  // spronoj de la sudaj konstruaĵoj atingas ĝin, do la ekstento de tiu
  // vojo-linio etendiĝas tien ( nur unu-bloka ).
  if ( arangxo.blokaGrando === "unu" ) {
    const ekst = NS_ekstentoj.get(ringoX);
    if ( ekst ) ekst[0] = Math.min(ekst[0], -0o130);
  }
  for ( let i = 0; i < konstruaĵoj.length; i++ ) {
    const s = konstruaĵoj[i];
    // La aldonaj blokoj — la KONEKTITAJ ricevas spronon ( kiel la malnova
    // stacidoma ĉelo ), la ceteraj nenian.
    if ( s.ekstra && !s.konektita ) continue;
    if ( s.x === 0 && s.z === 0 ) continue;   // la centro ( kaj la kvar-bloka stacio )
    const rot = s.rot || 0;
    const duonD = 0o10 / 2;                        // d/2 — la konstruaĵoj estas kvadrataj ( w = d = 0o10 )
    const pordoOffset = duonD + 0o14/0o10;
    const pordoX = s.x + Math.sin(rot) * pordoOffset;
    const pordoZ = s.z + Math.cos(rot) * pordoOffset;
    const spronoX = s.x + Math.sin(rot) * duonD;   // la sprono komenciĝas ĉe la muro-bazo
    const spronoZ = s.z + Math.cos(rot) * duonD;
    const fX = Math.sin(rot), fZ = Math.cos(rot);
    const duonL = 0o7/0o10;
    let celX = 0, celZ = 0, celita = false;
    if ( Math.abs(fX) > Math.abs(fZ) ) {
      const signo = fX > 0 ? 1 : -1;
      celX = signo > 0 ? Math.max(...RETO_X) : Math.min(...RETO_X);
      for ( const rx of RETO_X ) {
        if ( signo > 0 && rx > pordoX && rx < celX ) celX = rx;
        if ( signo < 0 && rx < pordoX && rx > celX ) celX = rx;
      }
      // Neniu vojo antaŭ la pordo ( ekstera konstruaĵo frontanta for de la
      // urbo ) — nenia sprono anstataŭ vojo tra la konstruaĵo.
      if ( ( signo > 0 && celX <= spronoX ) || ( signo < 0 && celX >= spronoX ) ) continue;
      // La celo-vojo devas reale ekzisti ĉe la sprona pozicio ( la ekstenta
      // gardo de urbo.ts ) — nenia pendanta sprono al malplena tero.
      const ekstX = NS_ekstentoj.get(celX);
      if ( !ekstX || spronoZ < ekstX[0] - duonL || spronoZ > ekstX[1] + duonL ) continue;
      celZ = spronoZ;
      celita = true;
    } else {
      const signo = fZ > 0 ? 1 : -1;
      celZ = signo > 0 ? Math.max(...RETO_Z) : Math.min(...RETO_Z);
      for ( const rz of RETO_Z ) {
        if ( signo > 0 && rz > pordoZ && rz < celZ ) celZ = rz;
        if ( signo < 0 && rz < pordoZ && rz > celZ ) celZ = rz;
      }
      if ( ( signo > 0 && celZ <= spronoZ ) || ( signo < 0 && celZ >= spronoZ ) ) continue;
      const ekstZ = EW_ekstentoj.get(celZ);
      if ( !ekstZ || spronoX < ekstZ[0] - duonL || spronoX > ekstZ[1] + duonL ) continue;
      celX = spronoX;
      celita = true;
    }
    const celoX = celX - fX * duonL;
    const celoZ = celZ - fZ * duonL;
    if ( celita && Math.hypot(spronoX - celoX, spronoZ - celoZ) > 0o4/0o10 ) {
      spronoj.push({ de: [ spronoX, spronoZ ], al: [ celoX, celoZ ], konstruajxo: i });
    }
  }

  // La stacidoma ĉelo ( 0, n+1 ) ricevas siajn vojojn el la normala reto. la
  // EW-vojo ĉe ( n + 0.5 )·PASXO ( inter la pinta vico kaj la stacidoma
  // vico ) estas la suda flanko — la sprono de la stacio atingas ĝin — kaj la
  // NS-vojoj ĉe x=±ringoX estas la orienta/okcidenta flankoj. Neniu aparta
  // stacidoma ringo bezonatas. la norda pinta domo ( 0, n ) sidas inter la
  // vojoj ĉe z=( n − 0.5 )·PASXO kaj z=( n + 0.5 )·PASXO — neniu vojo
  // trairas ĝin. La diamanta limo ( supre ) tranĉas la kornonan vojon ĉe
  // z=( n + 0.5 )·PASXO al la stacidoma kolumno — la korneraj blokoj de la
  // pinta vico ricevas nenian vojon norde.

  return { arangxo, ĉeloj, PASXO, nordaPinto, ringoX, ringoSuda, sudaVojo, stacioZ, staciaRingaNordo, konstruaĵoj, vojoj, spronoj, spurXoj: RETO_X, spurZoj: RETO_Z, retoX: RETO_X, retoZ: RETO_Z, lampoj };
}
