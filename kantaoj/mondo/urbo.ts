// ≺⧼ ទីក្រុង 🏙️ ⧽≻
import * as THREE from "three";
import { konstruiKradanUrbon } from "./urbo/krada-urbo.js";
import { konstruiMetitajnObjektojn } from "./urbo/metitaj.js";
import { kreiLampAldonilon } from "./urbo/lampoj.js";
import type { NebulaSistemo, UrbaSistemo, SkulptaUrbo,
  SkulptaVojo, SkulptaPlatformo, MetitaObjekto } from "./urbo/tipoj.js";
import { RiverData, konstruiRiveron,
  konstruiRiveronNordan, konstruiLagon, konstruiSkulptitanAkvon } from "../../eskekoj/medio/akvo.js";
import { konstruiBestojn, konstruiPetrelojn } from "../../eskekoj/shalaj-specioj/bestoj.js";
import type { VojDifino } from "../../eskekoj/medio/vojoj/tipoj.js";
import { superajElDatumo } from "./krado/superoj.js";
import { Kanoto } from "../../eskekoj/medio/transporto.js";
import type { Figuro, Vesto } from "../../eskekoj/shalaj-specioj/homoj.js";
import type { InternaSistemo } from "../../eskekoj/konstruajxoj/internoj/tipoj.js";
import { akvo, alteco, riveroZ, RIVERA_DUONLARĜO, LAGO_X, LAGO_RZ, RIVERA_BUŜO_X, riveraAkvaNivelo, lagoZ, lagoNivelo, lagoRadio,
  akvaNivelo, riveroNordOrientaX, riveraNordOrientaNivelo, RIVERA_NORDORIENTA_FONTO_Z, RIVERA_NORDORIENTA_DUONLARĜO, RIVERA_NORDORIENTA_BUŜO_Z, skulptitaAkvo, skulptaAkvaLimoj, akvaMeshNivelo, SKULPTA_PASO, SKULPTA_AKTIVA } from "./tereno.js";
import { SKULPTA_OBJEKTOJ, SKULPTA_URBOJ, SKULPTA_VOJOJ,
  SKULPTA_DOKOJ, SKULPTA_N, SKULPTA_ORIGINO } from "../tero-datumaro/aktiva.js";
import { konstruiHxsxaksxlefojn } from "../../eskekoj/shalaj-specioj/vegetajxo/hxsxaksxlefo.js";
import { konstruiPussxlefojn } from "../../eskekoj/shalaj-specioj/vegetajxo/pussxlefo.js";
import { konstruiArbaron } from "../../eskekoj/shalaj-specioj/vegetajxo/betuloj/arbaro.js";
import { konstruiLarikon } from "../../eskekoj/shalaj-specioj/vegetajxo/larikoj.js";
import { konstruiFiguron } from "../../eskekoj/shalaj-specioj/homoj.js";
import { VESTOJ } from "../../eskekoj/vestaro/vestoj.js";
import { konstruiVojojn } from "../../eskekoj/medio/vojoj.js";
import { konstruiIntersekcajnPlatojn } from "../../eskekoj/medio/vojoj/platoj.js";
import { kreiNebulanTeksajxon } from "../../eskekoj/komunajxoj/teksajxoj/nebulo.js";
import { kronaRadiusoLarika,
  kronaRadiusoHxsxaksxlefa } from "../../eskekoj/shalaj-specioj/vegetajxo/kronoj.js";
import { VALAJ_BIOMOJ, EBENAJAJ_BIOMOJ,
  MONTAJ_BIOMOJ, EKVIZETO_BIOMOJ } from "../../eskekoj/shalaj-specioj/vegetajxo/biomoj.js";
import { metiArbojn, metiMontajnArbojn,
  metiPussxlefojn, metiArbojnCxirkauLagon } from "../../eskekoj/shalaj-specioj/vegetajxo/metoj.js";
import { konstruiLikenojn,
  konstruiTrunkajnLikenojn } from "../../eskekoj/shalaj-specioj/vegetajxo/likenoj.js";
import { konstruiMusxajnMontetojn } from "../../eskekoj/shalaj-specioj/vegetajxo/muskoj.js";
import { konstruiFalintajnTrunkojn } from "../../eskekoj/shalaj-specioj/vegetajxo/falintaj-trunkoj.js";
import { konstruiCetkuojn, konstruiCakeojn } from "../../eskekoj/shalaj-specioj/vegetajxo/ekvizetoj.js";
import { konstruiHerbon,
  konstruiHerbonCxirkauLagon } from "../../eskekoj/shalaj-specioj/vegetajxo/herbo/tufoj.js";
import { konstruiHerbanTavolon } from "../../eskekoj/shalaj-specioj/vegetajxo/herbo/gazono.js";
import { plataAltoj } from "../../eskekoj/medio/vojoj/formoj.js";
import { KORNA_R, VOJA_BORDA_LARĜO,
  VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { konstruiPeriferiajnPlatformojn } from "../../eskekoj/medio/vojoj/periferio.js";
import { konstruiDokon } from "../../eskekoj/medio/doko.js";
import { PONT_FINA_LEVIGXO, pontaDeko, konstruiPonton } from "../../eskekoj/medio/doko/ponto.js";
import { troviVojaRetajnKunigojn, VojaRetoVojo, VojaRetoKunigo } from "../../eskekoj/medio/voj-reto.js";
import { surPosxtelefono } from "../bildo/scena/aparato.js";
import { skulptitaBesto } from "../tero-datumaro/rultempo.js";
import { konstruiHxeuxfojn } from "../../eskekoj/konstruajxoj/hxeuxfa/lampoj.js";
import { konstruiFilikojn } from "../../eskekoj/shalaj-specioj/vegetajxo/filikoj.js";
import { konstruiPurpurajnPlantojn,
  konstruiPurpurajnFilikojn, konstruiAltajnPurpurajnFilikojn } from "../../eskekoj/shalaj-specioj/vegetajxo/purpuraj.js";
import { konstruiLikenSxtonojn, konstruiBordajnSxtonojn } from "../../eskekoj/shalaj-specioj/vegetajxo/rokoj.js";
import { konstruiMontajnSubkreskajxojn,
  konstruiLaganSubkreskajxojn } from "../../eskekoj/shalaj-specioj/vegetajxo/subkreskajxoj.js";
import { konstruiMontajnRokojn } from "../../eskekoj/shalaj-specioj/vegetajxo/rokoj.js";
import { kreiPussxlefojnBerojn } from "../../eskekoj/mebloj/mangxajxoj/beroj.js";
import { kreiInternanSistemon } from "../../eskekoj/konstruajxoj/internoj/sistemo.js";

export async function konstruiUrbon(
  sceno: THREE.Scene,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  eniraMaterialo: THREE.MeshStandardMaterial,
  oraMaterialo: THREE.MeshStandardMaterial,
  raportiProgreson?: ( procento: number ) => void
): Promise<UrbaSistemo> {
  // ⟪ វឌ្ឍនភាពផ្ទុក 📃 ⟫
  const jesi = (): Promise<void> => new Promise(r => setTimeout(r, 0));
  const STAGOJ = 0o14;
  let stago = 0;
  const raporti = async (): Promise<void> => {
    stago = Math.min(STAGOJ, stago + 1);
    raportiProgreson?.(stago / STAGOJ);
    await jesi();
  };
  // ⟨ បំណែកនៃការសាងសង់ 📃 ⟩

  const urboListo: SkulptaUrbo[] = SKULPTA_URBOJ.length
    ? ( SKULPTA_URBOJ as SkulptaUrbo[] )
    : [ { nomo: "Ĉefa", arangxaGrando: 3, blokaGrando: "unu", ofsX: 0, ofsZ: 0 } ];
  const urboj = urboListo.map(u => konstruiKradanUrbon(sceno,
    { arangxaGrando: u.arangxaGrando, blokaGrando: u.blokaGrando, keuxfhxeso: !!u.keuxfhxeso, lampoj: u.lampoj !== false },
    [ u.ofsX, u.ofsZ ], oraMaterialo,
    u.aldonajBlokoj ?? [], superajElDatumo(u.superoj)));
  const cefa = urboj[0];
  await raporti();

  const konstruSpecoj = urboj.flatMap(r => r.konstruSpecoj);
  const kolizioj = urboj.flatMap(r => r.kolizioj);
  const selektajxoj = urboj.flatMap(r => r.selektajxoj);
  const konstruGrupoj = urboj.flatMap(r => r.konstruGrupoj);
  const placajNodoj = urboj.flatMap(r => r.placajNodoj);
  const keuxfhxesoLokoj = urboj.flatMap(r => r.keuxfhxesoLokoj);
  // ⟨ បណ្តាញផ្លូវក្រឡា , ជាទិន្នន័យ 📃 ⟩
  const kradajDifinoj: VojDifino[] = urboj.flatMap(r => r.vojDifinoj);
  const kradajKunigoj: [ number, number ][] = urboj.flatMap(r => r.kunigajPunktoj);
  const kradajFermitaj = new Map<string, [ number, number ]>(urboj.flatMap(r => [ ...r.kunigajFermitaj ]));
  // ⟪ ទន្លេ 📃 ⟫
  // ⟪ ទឹកនៃដីឆ្លាក់ 📃 ⟫
  const riverData: RiverData | null = SKULPTA_AKTIVA ? null
    : konstruiRiveron(sceno, riveroZ, riveraAkvaNivelo, RIVERA_DUONLARĜO, 0o600, RIVERA_BUŜO_X, 0o110, alteco);
  const riveroNordOrienta: RiverData | null = SKULPTA_AKTIVA ? null
    : konstruiRiveronNordan(sceno, riveroNordOrientaX, riveraNordOrientaNivelo,
        RIVERA_NORDORIENTA_DUONLARĜO, RIVERA_NORDORIENTA_FONTO_Z, RIVERA_NORDORIENTA_BUŜO_Z, 0o60, alteco);
  const lago: RiverData | null = SKULPTA_AKTIVA ? null
    : konstruiLagon(sceno, LAGO_X, lagoZ(), lagoRadio, lagoNivelo(), alteco);

  // ⟪ ទឹកដេរីវេ ( ការគណនាទឹក ) 📃 ⟫
  const limojSkulptaj = skulptaAkvaLimoj();
  const skulptaAkvo: RiverData | null = limojSkulptaj
    ? konstruiSkulptitanAkvon(sceno, limojSkulptaj.x0, limojSkulptaj.z0,
        limojSkulptaj.x1, limojSkulptaj.z1, SKULPTA_PASO, skulptitaAkvo,
        akvaMeshNivelo, alteco)
    : null;

  // ⟪ ចំណត , ច្រកចូលតាមច្រាំងទន្លេ 📃 ⟫
  const DOKOJ = SKULPTA_DOKOJ as SkulptaPlatformo[];
  const dokoKolizioj: { x: number; z: number; w: number; d: number; rot: number; y: number }[] = [];
  const dokoLandajAltoj: number[] = [];
  // ⟨ ជណ្តើរចំណតជាផ្លូវ 📃 ⟩
  const dokoStuparoj: VojDifino[] = [];
  for ( let i = 0; i < DOKOJ.length; i++ ) {
    const rotacio = DOKOJ[i].rotacio ?? 0;
    const doko = konstruiDokon(sceno, DOKOJ[i].x, DOKOJ[i].z, rotacio, alteco, akvaNivelo, DOKOJ[i].profundo);
    // ⟨ ការប៉ះទង្គិចមួយក្នុងមួយផ្នែក 📃 ⟩
    const kos = Math.cos(rotacio), sin = Math.sin(rotacio);
    for ( const s of doko.sekcioj ) {
      dokoKolizioj.push({ x: DOKOJ[i].x + kos * s.lx + sin * s.lz,
        z: DOKOJ[i].z - sin * s.lx + kos * s.lz, w: s.w, d: s.d, rot: rotacio, y: s.y });
    }
    dokoLandajAltoj.push(doko.platformY);
    if ( doko.stuparajPunktoj.length >= 2 ) {
      // ⟨ ពិដាន 📃 ⟩
      const plafono = doko.stuparaSupro;
      dokoStuparoj.push({ pts: doko.stuparajPunktoj, w: doko.platformWidth, stuparo: true,
        heightFn: ( sx, sz ) => Math.min(alteco(sx, sz), plafono) });
    }
  }
  // ⟪ ស្ពាន 📃 ⟫
  // ⟨ ហេតុអ្វីចំណតមិនកំណត់ស្ពានទៀត 📃 ⟩
  const dokaLandaj = DOKOJ.map(( d, i ) => {
    const rotacio = d.rotacio ?? 0;
    return { x: d.x + Math.sin(rotacio) * ( d.profundo / 2 ),
      z: d.z + Math.cos(rotacio) * ( d.profundo / 2 ), y: dokoLandajAltoj[i] + PONT_FINA_LEVIGXO };
  });
  await raporti();

  // ⟪ កំពង់ និងមហាវិថីចំណត ( ទីក្រុងចម្បង ) 📃 ⟫
  const vojDifinoj: VojDifino[] = [ ...dokoStuparoj ];

  // ⟨ ពីរដំណាក់កាល 📃 ⟩
  function pontaTrunko( vojo: SkulptaVojo ): { ax: number; az: number; bx: number; bz: number } | null {
    if ( vojo.punktoj.length < 2 ) return null;
    const [ ax, az ] = vojo.punktoj[0];
    const [ bx, bz ] = vojo.punktoj[vojo.punktoj.length - 1];
    if ( skulptitaAkvo(ax, az) || skulptitaAkvo(bx, bz) ) return null;
    const difX = bx - ax, difZ = bz - az;
    const longo = Math.hypot(difX, difZ);
    if ( longo < 0o10 ) return null;
    const specimenoj = Math.max(0o10, Math.round(longo));
    let akvaj = 0;
    for ( let i = 0; i <= specimenoj; i++ ) {
      const t = i / specimenoj;
      if ( skulptitaAkvo(ax + difX * t, az + difZ * t) ) akvaj++;
    }
    if ( akvaj / ( specimenoj + 1 ) < 0o2/0o5 ) return null;
    return { ax, az, bx, bz };
  }
  // ⟨ ចានភ្ជាប់លើចុង 📃 ⟩
  function pontaFinAlto( x: number, z: number, larĝo: number ): number {
    let plejProksima: VojaRetoKunigo | null = null, plejMallonga = Infinity;
    for ( const k of vojajKunigoj ) {
      const d = Math.hypot(k.x - x, k.z - z);
      if ( d < plejMallonga ) { plejMallonga = d; plejProksima = k; }
    }
    if ( plejProksima && plejMallonga < VOJA_EKSTERA_DUONO + KORNA_R )
      return plataAltoj(plejProksima.x, plejProksima.z, plejProksima.rotacio, alteco).supro;
    return vojaSupro(x, z, larĝo);
  }
  function vojaSupro( x: number, z: number, larĝo: number ): number {
    const duon = larĝo / 4 + VOJA_BORDA_LARĜO;
    let maks = alteco(x, z);
    for ( let i = 0; i < 0o10; i++ ) {
      const ang = i * Math.PI / 4;
      maks = Math.max(maks, alteco(x + Math.cos(ang) * duon, z + Math.sin(ang) * duon));
    }
    return maks + VOJA_SUPRO_LEVIGXO;
  }

  const pontaVojoj: { ax: number; az: number; ay: number; bx: number; bz: number; by: number; w: number }[] = [];

  const vojajRetajVojoj: VojaRetoVojo[] = [];
  // ⟨ ដំណាក់កាលទីមួយ , ទទឹងស្ពាន 📃 ⟩
  const pontajTrunkoj: ({ ax: number; az: number; bx: number; bz: number } | null)[] = [];
  for ( const vojo of SKULPTA_VOJOJ as SkulptaVojo[] ) {
    const trunko = vojo.punktoj.length < 2 ? null : pontaTrunko(vojo);
    pontajTrunkoj.push(trunko);
    if ( vojo.punktoj.length < 2 ) continue;
    const vojaLarĝo = trunko ? ( vojo.pontoLarĝo ?? vojo.larĝo ) : vojo.larĝo;
    vojajRetajVojoj.push( { punktoj: vojo.punktoj, larĝo: vojaLarĝo } );
  }
  // ⟨ ការភ្ជាប់រវាងដំណាក់កាល 📃 ⟩
  const vojajKunigoj = troviVojaRetajnKunigojn( vojajRetajVojoj, DOKOJ );
  const vojajKunigoPunktoj = vojajKunigoj.map( k => [ k.x, k.z ] as [ number, number ] );
  const vojajFermitaj = new Map( vojajKunigoj.map( k => [ k.x + "," + k.z, k.fermitaj ] ) );
  const vojajRotacioj = new Map( vojajKunigoj.map( k => [ k.x + "," + k.z, k.rotacio ] ) );
  // ⟨ ដៃពិតនៃការភ្ជាប់នីមួយៗ 📃 ⟩
  const vojajDirektoj = new Map( vojajKunigoj.map( k => [ k.x + "," + k.z, k.direktaj ] ) );
  // ⟨ ដំណាក់កាលទីពីរ , និយមន័យ 📃 ⟩
  for ( let vojaIndekso = 0; vojaIndekso < ( SKULPTA_VOJOJ as SkulptaVojo[] ).length; vojaIndekso++ ) {
    const vojo = ( SKULPTA_VOJOJ as SkulptaVojo[] )[vojaIndekso];
    if ( vojo.punktoj.length < 2 ) continue;
    const trunko = pontajTrunkoj[vojaIndekso];
    let ponto: { ax: number; az: number; ay: number; bx: number; bz: number; by: number } | null = null;
    const vojaLarĝo = trunko ? ( vojo.pontoLarĝo ?? vojo.larĝo ) : vojo.larĝo;
    if ( trunko ) ponto = { ...trunko, ay: pontaFinAlto(trunko.ax, trunko.az, vojaLarĝo),
      by: pontaFinAlto(trunko.bx, trunko.bz, vojaLarĝo) };
    let pontaHeight: (( x: number, z: number ) => number) | undefined;
    if ( ponto ) {
      const difX = ponto.bx - ponto.ax, difZ = ponto.bz - ponto.az;
      const kvadrato = difX * difX + difZ * difZ;
      pontaHeight = ( x, z ) => {
        const t = Math.max(0, Math.min(1, ( ( x - ponto.ax ) * difX + ( z - ponto.az ) * difZ ) / kvadrato));
        return pontaDeko(t, ponto.ay, ponto.by) - VOJA_SUPRO_LEVIGXO;
      };
    }
    if ( ponto ) pontaVojoj.push({ ...ponto, w: vojaLarĝo });
    // ⟨ និយមន័យមួយក្នុងមួយផ្លូវ 📃 ⟩
    const difino: VojDifino = { pts: vojo.punktoj, w: vojaLarĝo / 2, kapoj: true };
    // ⟨ មានតែដប់ស្ពាននៅរលូន 📃 ⟩
    if ( pontaHeight ) { difino.heightFn = pontaHeight; difino.glata = true; }
    vojDifinoj.push(difino);
  }
  const dockaLandaRando: [ number, number ][] =
    dokaLandaj.map(p => [ p.x, p.z ] as [ number, number ]);
  // ⟨ បណ្តាញមួយ ការសាងសង់មួយ 📃 ⟩
  const ĉiujDifinoj: VojDifino[] = [ ...kradajDifinoj, ...vojDifinoj ];
  const ĉiujKunigoj: [ number, number ][] = [ ...kradajKunigoj, ...vojajKunigoPunktoj ];
  const ĉiujFermitaj = new Map<string, [ number, number ]>([ ...kradajFermitaj, ...vojajFermitaj ]);
  const ĉefajVojSpecimenoj = konstruiVojojn(sceno, ĉiujDifinoj, alteco, dioritaMaterialo, andezitaMaterialo, ĉiujKunigoj );
  konstruiIntersekcajnPlatojn( sceno, ĉiujKunigoj, alteco, dioritaMaterialo, andezitaMaterialo, ĉiujFermitaj, vojajRotacioj, vojajDirektoj );
  for ( const p of pontaVojoj )
    konstruiPonton(sceno, p.ax, p.az, p.ay, p.bx, p.bz, p.by, p.w, alteco, skulptitaAkvo, andezitaMaterialo, oraMaterialo);

  placajNodoj.push([ -0o124, -0o140 ]);
  placajNodoj.push([ 0o124, -0o122 ]);
  for ( const [ dx, dz ] of dockaLandaRando ) placajNodoj.push([ dx, dz ]);
  const dokaPlacajNodoj: [ number, number ][] = [ [ -0o124, -0o140 ], [ 0o124, -0o122 ], ...dockaLandaRando ];

  await raporti();

  // ⟪ ចង្កៀង 📃 ⟫
  const lampLokoj: { x: number; z: number; y: number; rotacio?: number }[] = urboj.flatMap(r => r.lampLokoj);
  const addLamp = kreiLampAldonilon(konstruSpecoj, lampLokoj);
  for ( const [ aX, aZ ] of dokaPlacajNodoj ) {
    for ( const [ dx, dz ] of [ [ -0o21/0o10, -0o21/0o10 ], [ 0o21/0o10, -0o21/0o10 ], [ -0o21/0o10, 0o21/0o10 ], [ 0o21/0o10, 0o21/0o10 ] ] ) addLamp(aX + dx, aZ + dz);
  }

  for ( const o of SKULPTA_OBJEKTOJ ) {
    if ( o.speco === "hxeuxfo" ) {
      lampLokoj.push({ x: o.x, z: o.z, y: alteco(o.x, o.z) + 0o1/0o40, rotacio: o.rotacio });
    } else if ( o.speco === "hxeuxfoPlato" ) {
      konstruiPeriferiajnPlatformojn(sceno, [ [ o.x, o.z ] ], alteco, dioritaMaterialo, andezitaMaterialo);
      lampLokoj.push({ x: o.x, z: o.z, y: alteco(o.x, o.z) + 0o4/0o10 - 0o1/0o40, rotacio: o.rotacio });
    }
  }

  const lampSistemo = konstruiHxeuxfojn(sceno, lampLokoj, dioritaMaterialo, oraMaterialo);
  for ( const l of lampLokoj ) kolizioj.push({ x: l.x, z: l.z, r: 0o5/0o10 });
  await raporti();

  // ⟪ រុក្ខជាតិ 📃 ⟫
  const ekskluziviRiveron = ( x: number, z: number ) => akvo(x, z);
  const vojSpecimenoj = ĉefajVojSpecimenoj;
  // ⟪ លិបិក្រមក្រឡាសម្រាប់ការដកផ្លូវចេញ 📃 ⟫
  const VOJA_ĈELO = 0o10;
  const vojaKrado = new Map<number, THREE.Vector3[]>();
  for ( const p of vojSpecimenoj ) {
    const kx = Math.floor(p.x / VOJA_ĈELO), kz = Math.floor(p.z / VOJA_ĈELO);
    const klavo = kx * 0o100000 + kz;
    let ĉelo = vojaKrado.get(klavo);
    if ( !ĉelo ) { ĉelo = []; vojaKrado.set(klavo, ĉelo); }
    ĉelo.push(p);
  }
  const ekskluziviVojojn = ( x: number, z: number, m: number ) => {
    const r = Math.ceil(m / VOJA_ĈELO) + 1;
    const bx = Math.floor(x / VOJA_ĈELO), bz = Math.floor(z / VOJA_ĈELO);
    const m2 = m * m;
    for ( let dx = -r; dx <= r; dx++ ) {
      for ( let dz = -r; dz <= r; dz++ ) {
        const ĉelo = vojaKrado.get(( bx + dx ) * 0o100000 + ( bz + dz ));
        if ( !ĉelo ) continue;
        for ( const p of ĉelo ) {
          const ddx = x - p.x, ddz = z - p.z;
          if ( ddx * ddx + ddz * ddz < m2 ) return true;
        }
      }
    }
    for ( const o of SKULPTA_OBJEKTOJ ) {
      if ( o.speco !== "hxeuxfoPlato" ) continue;
      if ( Math.hypot(x - o.x, z - o.z) < m + 3 ) return true;
    }
    // ⟨ គែមតូច 📃 ⟩
    for ( const l of keuxfhxesoLokoj ) if ( Math.hypot(x - l.x, z - l.z) < m + 0o1/0o2 ) return true;
    return false;
  };
  const ekskluziviKonstruajxon = ( x: number, z: number, m: number ) => {
    for ( const s of konstruSpecoj ) if ( Math.hypot(x - s.x, z - s.z) < s.w * 0o23/0o40 + m ) return true;
    return false;
  };
  const arboj = metiArbojn(alteco, 0o1400, 0o600, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon,
    0o53104, [], 0o10, undefined, VALAJ_BIOMOJ);
  const betulajTrunkoj = konstruiArbaron(sceno, arboj);

  const larikoj = metiArbojn(alteco, 0o700, 0o600, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon,
    0o53114, arboj, 0o10, kronaRadiusoLarika, VALAJ_BIOMOJ);
  const larikajTrunkoj = konstruiLarikon(sceno, larikoj);

  const hxsxaksxlefoj = metiArbojn(alteco, 0o400, 0o600, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon,
    0o62445, [ ...arboj, ...larikoj ], 0o10, kronaRadiusoHxsxaksxlefa, VALAJ_BIOMOJ);
  const hxsxaksxlefojTrunkoj = konstruiHxsxaksxlefojn(sceno, hxsxaksxlefoj);

  konstruiTrunkajnLikenojn(sceno, [ betulajTrunkoj, larikajTrunkoj, hxsxaksxlefojTrunkoj ]);
  await raporti();

  konstruiFilikojn(sceno, 0o400, alteco, arboj, vojSpecimenoj, ekskluziviRiveron, ekskluziviVojojn, VALAJ_BIOMOJ);
  await jesi();

  konstruiPurpurajnPlantojn(sceno, 0o200, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, VALAJ_BIOMOJ);
  await jesi();

  konstruiPurpurajnFilikojn(sceno, 0o200, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, VALAJ_BIOMOJ);
  await jesi();
  konstruiAltajnPurpurajnFilikojn(sceno, 0o100, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon,
    [ ...arboj, ...larikoj, ...hxsxaksxlefoj ], VALAJ_BIOMOJ);
  await jesi();

  // ⟨ ថ្មរឹង 📃 ⟩
  const likenSxtonoj = konstruiLikenSxtonojn(sceno, 0o60, alteco, ekskluziviRiveron,
    ekskluziviVojojn, ekskluziviKonstruajxon);
  await jesi();

  // ⟪ គ្រួសតាមច្រាំងទឹក 📃 ⟫
  konstruiBordajnSxtonojn(sceno, alteco, ekskluziviVojojn, ekskluziviKonstruajxon);
  await jesi();

  konstruiLikenojn(sceno, 0o200, alteco, [ ...arboj, ...larikoj, ...hxsxaksxlefoj ], likenSxtonoj,
    ekskluziviRiveron, ekskluziviVojojn, false, ekskluziviKonstruajxon);

  konstruiHerbon(sceno, 0o1170, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, VALAJ_BIOMOJ);
  await jesi();

  // ⟪ ស្រទាប់ស្មៅ 📃 ⟫
  await konstruiHerbanTavolon(sceno, jesi, alteco, ekskluziviRiveron, ekskluziviVojojn,
    ekskluziviKonstruajxon, [ ...VALAJ_BIOMOJ, ...EBENAJAJ_BIOMOJ ],
    surPosxtelefono ? 0o5/0o10 : 0o10/0o10);

  // ⟪ វាលរាប 📃 ⟫
  await jesi();
  konstruiHerbon(sceno, 0o2000, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, EBENAJAJ_BIOMOJ);
  konstruiPurpurajnPlantojn(sceno, 0o1000, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, EBENAJAJ_BIOMOJ);
  await jesi();

  konstruiMusxajnMontetojn(sceno, 0o200, alteco, arboj, ekskluziviRiveron, ekskluziviVojojn,
    ekskluziviKonstruajxon);
  await jesi();

  const falintajTrunkoj = konstruiFalintajnTrunkojn(sceno, 0o40, alteco, arboj, ekskluziviRiveron,
    ekskluziviVojojn, ekskluziviKonstruajxon);
  await jesi();

  konstruiCetkuojn(sceno, 0o110, alteco, riveroZ,
    ( x: number, z: number ) => ekskluziviKonstruajxon(x, z, 3), ekskluziviVojojn, EKVIZETO_BIOMOJ);
  await raporti();

  // ⟪ រុក្ខជាតិជុំវិញបឹង 📃 ⟫
  const lagArboj = metiArbojnCxirkauLagon(alteco, 0o60, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53120, [ ...arboj, ...larikoj ], 0o10,
    undefined, VALAJ_BIOMOJ);
  const lagTrunkoj = konstruiArbaron(sceno, lagArboj);
  await jesi();
  const lagLarikoj = metiArbojnCxirkauLagon(alteco, 0o40, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53121, [ ...lagArboj, ...arboj, ...larikoj ], 0o10,
    kronaRadiusoLarika, VALAJ_BIOMOJ);
  const lagLarikajTrunkoj = konstruiLarikon(sceno, lagLarikoj);
  const lagHxsxaksxlefoj = metiArbojnCxirkauLagon(alteco, 0o30, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53126, [ ...lagArboj, ...lagLarikoj, ...arboj, ...larikoj ], 0o10,
    kronaRadiusoHxsxaksxlefa, VALAJ_BIOMOJ);
  const lagHxsxaksxlefojTrunkoj = konstruiHxsxaksxlefojn(sceno, lagHxsxaksxlefoj);
  await jesi();
  konstruiTrunkajnLikenojn(sceno, [ lagTrunkoj, lagLarikajTrunkoj, lagHxsxaksxlefojTrunkoj ], 0o62452);
  konstruiHerbonCxirkauLagon(sceno, 0o300, alteco, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53122);
  konstruiCakeojn(sceno, 0o110, alteco, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    ekskluziviKonstruajxon, ekskluziviVojojn, 0o26525, EKVIZETO_BIOMOJ);
  konstruiLaganSubkreskajxojn(sceno, 0o470, alteco, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    [ ...lagArboj, ...lagLarikoj, ...lagHxsxaksxlefoj ], [ ...lagArboj, ...lagLarikoj, ...lagHxsxaksxlefoj ],
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53134, VALAJ_BIOMOJ);
  await raporti();

  // ⟪ រុក្ខជាតិភ្នំ 📃 ⟫
  const montajBetuloj = metiMontajnArbojn(alteco, 0o100, 0o210, 0o270,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53132,
    [ ...arboj, ...larikoj ], 0o10, undefined, 0, 0o340, MONTAJ_BIOMOJ);
  const montajBetulaTrunkoj = konstruiArbaron(sceno, montajBetuloj);
  const montajLarikoj = metiMontajnArbojn(alteco, 0o200, 0o260, 0o420,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53130,
    [ ...montajBetuloj, ...arboj, ...larikoj ], 0o10, kronaRadiusoLarika, 0, 0o340, MONTAJ_BIOMOJ);
  const montajLarikaTrunkoj = konstruiLarikon(sceno, montajLarikoj);
  await jesi();
  const montajRokoj = konstruiMontajnRokojn(sceno, 0o100, alteco, ekskluziviRiveron, ekskluziviVojojn,
    undefined, 0, 0o340, 0o260, 0o160, MONTAJ_BIOMOJ, ekskluziviKonstruajxon);
  konstruiLikenojn(sceno, 0o150, alteco, [ ...montajLarikoj, ...montajBetuloj ], montajRokoj,
    ekskluziviRiveron, ekskluziviVojojn, true, ekskluziviKonstruajxon);
  konstruiTrunkajnLikenojn(sceno, [ montajLarikaTrunkoj, montajBetulaTrunkoj ], 0o62453);

  // ⟪ រុក្ខជាតិភ្នំភាគឦសាន 📃 ⟫
  const neBetuloj = metiMontajnArbojn(alteco, 0o40, 0o40, 0o140,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53135,
    [ ...arboj, ...larikoj ], 0o10, undefined, -0o350, 0o64, MONTAJ_BIOMOJ);
  const neBetulaTrunkoj = konstruiArbaron(sceno, neBetuloj);
  const neLarikoj = metiMontajnArbojn(alteco, 0o60, 0o40, 0o160,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53140,
    [ ...neBetuloj, ...montajBetuloj, ...montajLarikoj, ...arboj, ...larikoj ], 0o10, kronaRadiusoLarika,
    -0o350, 0o64, MONTAJ_BIOMOJ);
  const neLarikaTrunkoj = konstruiLarikon(sceno, neLarikoj);
  const neRokoj = konstruiMontajnRokojn(sceno, 0o40, alteco, ekskluziviRiveron, ekskluziviVojojn,
    0o2303601, -0o350, 0o64, 0o40, 0o100, MONTAJ_BIOMOJ, ekskluziviKonstruajxon);
  konstruiLikenojn(sceno, 0o60, alteco, [ ...neLarikoj, ...neBetuloj ], neRokoj,
    ekskluziviRiveron, ekskluziviVojojn, true, ekskluziviKonstruajxon);
  konstruiTrunkajnLikenojn(sceno, [ neLarikaTrunkoj, neBetulaTrunkoj ], 0o62450);
  konstruiMontajnSubkreskajxojn(sceno, 0o3000, alteco,
    [ ...arboj, ...larikoj, ...montajLarikoj, ...montajBetuloj ],
    [ ...arboj, ...larikoj, ...hxsxaksxlefoj, ...montajLarikoj, ...montajBetuloj ],
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53133, MONTAJ_BIOMOJ);
  await jesi();

  const pussxlefoj = metiPussxlefojn(alteco, 0o200, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon,
    0o62450, [ ...arboj, ...larikoj, ...hxsxaksxlefoj, ...montajLarikoj, ...montajBetuloj,
      ...neLarikoj, ...neBetuloj ]);
  konstruiPussxlefojn(sceno, pussxlefoj);
  const pussxlefoBeroj = kreiPussxlefojnBerojn(sceno, pussxlefoj);
  await raporti();

  // ⟪ ចំណុចអ័ព្ទ 📃 ⟫
  const nebulSistemo = ( (): NebulaSistemo => {
    const nebulaTeksajxo = kreiNebulanTeksajxon();
    const fiksitaj: number[][] = [
      [ -0o110, -0o110, 0o24/0o10, 0o60, 0o5/0o40 ], [ -0o40, -0o110, 0o215/0o100, 0o60, 0o3/0o20 ],
      [ 0o30, -0o110, 0o263/0o100, 0o60, 0o5/0o40 ], [ 0o70, -0o100, 0o115/0o40, 0o40, 0o5/0o40 ],
      [ -0o60, -0o60, 0o163/0o100, 0o40, 0o11/0o100 ], [ -0o110, 0o40, 0o63/0o40, 0o30, 0o3/0o40 ],
      [ 0o110, -0o60, 0o163/0o100, 0o30, 0o3/0o40 ], [ -0o70, 0o110, 0o14/0o10, 0o30, 0o3/0o40 ],
      [ 0o100, 0o110, 0o155/0o100, 0o30, 0o5/0o100 ], [ -0o130, 0o10, 0o55/0o40, 0o30, 0o1/0o10 ],
    ];
    const N = fiksitaj.length + 0o60;
    const pozicioj = new Float32Array(N * 3);
    const semoj = new Float32Array(N);
    const grandoj = new Float32Array(N);
    const opakecoj = new Float32Array(N);
    const rapidoj = new Float32Array(N);
    for ( let i = 0; i < N; i++ ) {
      let x, z, y, skalo, op, rapido;
      if ( i < fiksitaj.length ) {
        [ x, z, y, skalo, op ] = fiksitaj[i];
        rapido = 0o15/0o40 + Math.random() * 0o10/0o10;
      } else {
        const a = Math.random() * Math.PI * 2;
        const r = 0o130 + Math.random() * 0o300;
        x = Math.cos(a) * r; z = Math.sin(a) * r;
        y = alteco(x, z) + 0o4/0o10 + Math.random() * 3;
        skalo = 0o60 + Math.random() * 0o130;
        op = 0o1/0o10 + Math.random() * 0o5/0o40;
        rapido = 0o15/0o100 + Math.random() * 0o4/0o10;
      }
      pozicioj[i * 3] = x; pozicioj[i * 3 + 1] = y; pozicioj[i * 3 + 2] = z;
      grandoj[i] = skalo;
      opakecoj[i] = op;
      rapidoj[i] = rapido;
      semoj[i] = Math.random();
    }
    const geometrio = new THREE.BufferGeometry();
    geometrio.setAttribute("position", new THREE.BufferAttribute(pozicioj, 3));
    geometrio.setAttribute("aSeed", new THREE.BufferAttribute(semoj, 1));
    geometrio.setAttribute("aGrando", new THREE.BufferAttribute(grandoj, 1));
    geometrio.setAttribute("aOpakeco", new THREE.BufferAttribute(opakecoj, 1));
    geometrio.setAttribute("aRapido", new THREE.BufferAttribute(rapidoj, 1));
    const uTime = { value: 0 };
    const materialo = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, fog: false,
      uniforms: {
        uTime,
        uMap: { value: nebulaTeksajxo },
      },
      vertexShader: `
        uniform float uTime;
        attribute float aSeed;
        attribute float aGrando;
        attribute float aOpakeco;
        attribute float aRapido;
        varying float vOpakeco;
        void main() {
          // ចលនាជំរុញតាមទិសជាមួយការរុំជុំវិញ ( ការរុំចាស់នៅ
          vec3 p = position;
          float falo = uTime * aRapido;
          p.x = mod(p.x + falo + 160.0, 320.0) - 160.0;
          vOpakeco = aOpakeco;
          vec4 mv = viewMatrix * vec4(p, 1.0);
          // ទំហំពិភពលោក → ភិចសែល ( រូបមន្តបំប្លែងដូចព្រិល )។
          gl_PointSize = aGrando * ( 100.0 / -mv.z );
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform sampler2D uMap;
        varying float vOpakeco;
        void main() {
          vec4 tex = texture2D(uMap, gl_PointCoord);
          gl_FragColor = vec4(tex.rgb, tex.a * vOpakeco);
        }
      `,
    });
    const punktoj = new THREE.Points(geometrio, materialo);
    punktoj.frustumCulled = false;
    sceno.add(punktoj);
    return { punktoj, uTime };
  } )();
  await raporti();

  // ⟪ កតេណូផរ 📃 ⟫
  const bestoj = konstruiBestojn(sceno, 0o30, riveroZ, riveraAkvaNivelo,
    { x: LAGO_X, z: lagoZ(), r: LAGO_RZ, nivelo: lagoNivelo() });

  // ⟨ រុក្ខជាតិរឹង 📃 ⟩
  const trunkaR = 0o5/0o20;
  for ( const t of arboj ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of larikoj ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of hxsxaksxlefoj ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of montajBetuloj ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of montajLarikoj ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of neBetuloj ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of neLarikoj ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of lagArboj ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of lagLarikoj ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of lagHxsxaksxlefoj ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const r of likenSxtonoj ) kolizioj.push({ x: r.x, z: r.z, r: r.s });
  for ( const r of montajRokoj ) kolizioj.push({ x: r.x, z: r.z, r: r.s });
  for ( const r of neRokoj ) kolizioj.push({ x: r.x, z: r.z, r: r.s });
  const fTrunkoj = falintajTrunkoj as [ number, number ][][];
  for ( const ringo of fTrunkoj ) {
    for ( let k = 0; k < ringo.length; k++ ) {
      const [ x, z ] = ringo[k];
      kolizioj.push({ x, z, r: 0o3/0o20 });
    }
  }

  // ⟪ ផេត្រេលព្រិល 📃 ⟫
  const petreloj = konstruiPetrelojn(sceno, 0o20, alteco);
  await raporti();

  // ⟪ ការកំណត់ NPC 📃 ⟫
  const VESTA_LISTO: Vesto[] = VESTOJ;

  const npcZonoj: { x: number; z: number }[] = [];
  for ( let j = 0; j < SKULPTA_N; j++ ) {
    for ( let i = 0; i < SKULPTA_N; i++ ) {
      const x = SKULPTA_ORIGINO[0] + i * SKULPTA_PASO;
      const z = SKULPTA_ORIGINO[1] + j * SKULPTA_PASO;
      if ( ( skulptitaBesto(x, z) & 4 ) === 0 ) continue;
      if ( akvo(x, z) ) continue;
      npcZonoj.push({ x, z });
    }
  }

  const NPCLOKOJ: [ number, number ][] = [];
  const npcoj: Figuro[] = [];
  let provoj = 0;
  while ( npcoj.length < 0o230 && provoj < 0o2000 && npcZonoj.length > 0 ) {
    provoj++;
    const loko = npcZonoj[( Math.random() * npcZonoj.length ) | 0];
    const sX = loko.x + ( Math.random() - 0o1/0o2 ) * 0o3;
    const sZ = loko.z + ( Math.random() - 0o1/0o2 ) * 0o3;
    if ( ekskluziviRiveron(sX, sZ) || ekskluziviKonstruajxon(sX, sZ, 3) ) continue;
    const fig = konstruiFiguron(VESTA_LISTO[npcoj.length % VESTA_LISTO.length], Math.random() < 0o1/0o4 ? "haroLonga" : "haroMalalta");
    const h = alteco(sX, sZ);
    fig.group.position.set(sX, h, sZ);
    fig.hejmo.set(sX, h, sZ);
    fig.celo.set(sX, h, sZ);
    fig.atendo = Math.random() * 4;
    fig.rapido = 0o55/0o100 + Math.random() * 0o4/0o10;
    sceno.add(fig.group);
    npcoj.push(fig);
    NPCLOKOJ.push([ sX, sZ ]);
  }
  await raporti();

  // ⟪ វត្ថុដាក់ ( ឧបករណ៍វត្ថុនៃឧបករណ៍ឆ្លាក់ ) 📃 ⟫
  const kanuoj: Kanoto[] = [];
  const xipo = konstruiMetitajnObjektojn(sceno, SKULPTA_OBJEKTOJ as MetitaObjekto[],
    alteco, akvo, akvaNivelo, bestoj, petreloj, npcoj, kanuoj, oraMaterialo, eniraMaterialo,
    selektajxoj);
  const stacioSxipo = cefa.konstruSpecoj.find(s => s.type === "stacioxipo");
  if ( stacioSxipo && xipo ) stacioSxipo.flugoY = xipo.group.position.y;
  await raporti();

  // ⟪ ប្រព័ន្ធខាងក្នុង 📃 ⟫
  const internaSistemo: InternaSistemo = kreiInternanSistemon();

  return {
    konstruSpecoj, kolizioj, dokoKolizioj, selektajxoj, konstruGrupoj,
    vojSpecimenoj, placajNodoj,    riverData, riveroNordOrienta, lago, skulptaAkvo, bestoj, petreloj, lampSistemo,
    nebulSistemo, kanuoj, pussxlefoBeroj, npcoj, internaSistemo, xipo, vojDifinoj: ĉiujDifinoj, vojDuonLargho: ( _g: number ) => 0o7/0o10,
    NPCLOKOJ, VESTA_LISTO,
  };
}
