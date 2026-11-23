// ≺⧼ ſɭᴜ ı],ƨɔ 🏙️ ⧽≻
import * as THREE from "three";
import { vepaqKradanKaxten } from "./kaxte/krada-kaxte.js";
import { vepaqMetitajnObjektojn } from "./kaxte/metitaj.js";
import { kf2KvarLampAldonilon, kf2LampAldonilon, type LampLoko } from "./kaxte/lampoj.js";
import type { NebulaSistemo, UrbaSistemo, SkulptaKaxte, SkulptaK6h6 } from "./kaxte/hahunaq.js";
import { RiverData, vepaqRiveron,
  vepaqRiveronNordan, vepaqLagon, vepaqSkulptitanAkvon } from "../../eskekoj/medio/akvo.js";
import { vepaqHapagan, vepaqHatemekn } from "../../eskekoj/shalaj-hapudal/hapaga.js";
import type { VojDifino } from "../../eskekoj/medio/hak6h6/hahunaq.js";
import { superajElDatumo } from "./krado/superoj.js";
import { Kanoto } from "../../eskekoj/medio/transporto.js";
import type { Figuro, Vesto } from "../../eskekoj/shalaj-hapudal/hamaz.js";
import type { InternaSistemo } from "../../eskekoj/hapaq/internoj/hahunaq.js";
import { akvo, alteco, riveroZ, RIVERA_DUONSEFINI, LAGO_X, LAGO_RZ, RIVERA_BUŜO_X, riveraAkvaVem2, lagoZ, lagoVem2, lagoRadio,
  akvaVem2, riveroNordOrientaX, riveraNordOrientaVem2, RIVERA_NORDORIENTA_FONTO_Z, RIVERA_NORDORIENTA_DUONSEFINI, RIVERA_NORDORIENTA_BUŜO_Z, skulptitaAkvo, skulptaAkvaLimoj, akvaMeshVem2, SKULPTA_PASO, SKULPTA_AKTIVA } from "./tereno.js";
import { SKULPTA_N, SKULPTA_ORIGINO } from "../tero-datumaro/aktiva.js";
import { vepaqTlexlefhxakaijn } from "../../eskekoj/shalaj-hapudal/vegetajxo/tlexlefhxakai.js";
import { vepaqTlexlefp2saijn } from "../../eskekoj/shalaj-hapudal/vegetajxo/tlexlefp2sai.js";
import { vepaqArbaron } from "../../eskekoj/shalaj-hapudal/vegetajxo/halam2v/arbaro.js";
import { vepaqLarikon } from "../../eskekoj/shalaj-hapudal/vegetajxo/hataksal.js";
import { vepaqFiguron } from "../../eskekoj/shalaj-hapudal/hamaz.js";
import { VESTOJ } from "../../eskekoj/vestaro/vestoj.js";
import { vepaqHak6h6n } from "../../eskekoj/medio/hak6h6.js";
import { ANGULA_PROVOLIRO } from "../../eskekoj/medio/hak6h6/habakaweKatoma.js";
import { vepaqIntersekcajnHapa12n } from "../../eskekoj/medio/hak6h6/hapa12.js";
import { kf2NebulanCac2sex } from "../../eskekoj/komunajxoj/cac2sex/nebulo.js";
import { kronaRadiusoLarika,
  kronaRadiusoHxsxaksxlefa } from "../../eskekoj/shalaj-hapudal/vegetajxo/hasoza.js";
import { VALAJ_BIOMOJ, EBENAJAJ_BIOMOJ,
  MONTAJ_BIOMOJ, EKVIZETO_BIOMOJ } from "../../eskekoj/shalaj-hapudal/vegetajxo/habs2.js";
import { metiArbojn, metiMontajnArbojn,
  metiTlexlefp2saijn, metiArbojnCxirkauLagon } from "../../eskekoj/shalaj-hapudal/vegetajxo/xa3eRaqa.js";
import { vepaqF2majn,
  vepaqTrunkajnF2majn } from "../../eskekoj/shalaj-hapudal/vegetajxo/haf2ma.js";
import { vepaqMusxajnMontetojn } from "../../eskekoj/shalaj-hapudal/vegetajxo/hac6x.js";
import { vepaqSo3akaknHasost2cel2sain } from "../../eskekoj/shalaj-hapudal/vegetajxo/so3akak-hasost2cel2sai.js";
import { vepaqCetkuojn, vepaqCakeojn } from "../../eskekoj/shalaj-hapudal/vegetajxo/hatsake.js";
import { vepaqFe1afn,
  vepaqFe1afnCxirkauLagon } from "../../eskekoj/shalaj-hapudal/vegetajxo/fe1af/tufoj.js";
import { vepaqHerbanTavolon } from "../../eskekoj/shalaj-hapudal/vegetajxo/fe1af/gazono.js";
import { k6h6Supro, k6h6SuproDeVeb6kek } from "../../eskekoj/medio/hak6h6/haqoxa.js";
import { KEUXFHXESO_KA5IK } from "../../eskekoj/mebloj/keuxfhxeso.js";
import {
  VOJA_AKVA_KLARANCO, VOJA_DIORITA_DUONO, VOJA_EKSTERA_DUONO, VOJA_TRUA_DUONO,
  VOJA_SUPRO_LEVIGXO, surGrid } from "../../eskekoj/medio/hak6h6/havecax2l.js";
import { vepaqPeriferiajnPlathaqoxan } from "../../eskekoj/medio/hak6h6/periferio.js";
import { vepaqQakaj2n } from "../../eskekoj/medio/qakaj2.js";
import { PONT_FINA_LEVIGXO, PONT_AKVA_KLARANCO, vepaqPonton } from "../../eskekoj/medio/qakaj2/ponto.js";
import { kf2DokanStuparon } from "../../eskekoj/medio/qakaj2/stuparo.js";
import { troviK6h6RetajnHaveb6kekn, kunigajBrakojElHak6h6,
  K6h6RetoK6h6, K6h6RetoVeb6kek } from "../../eskekoj/medio/voj-reto.js";
import { gluiK6h6Finon } from "../../eskekoj/medio/hak6h6/gluado.js";
import { kf2BazanK6h6Alton, kf2K6h6Alton } from "../../eskekoj/medio/hak6h6/alto.js";
import { vepaqPontanProfilon, havasAkvanTrunkon, kf2PontanAkvanTeston,
  type PontoTrako } from "../../eskekoj/medio/hak6h6/ponto-profilo.js";
import { kf2Brakojn, kunigaPlataAlto } from "../../eskekoj/medio/hak6h6/hapa12.js";
import { qakaj2AltoCxe } from "../../eskekoj/medio/hak6h6/kunig-havem2.js";
import { surPosxtelefono } from "../bildo/scena/aparato.js";
import { skulptitaPaga, aktivajHakaxte, aktivajHak6h6, aktivajHaqakaj2,
  aktivajObjektoj, tsekeGeneritaSetlejo, mondiaHazardo } from "../tero-datumaro/rultempo.js";
import { vepaqHxeuxfojn } from "../../eskekoj/hapaq/hxeuxfa/lampoj.js";
import { vepaqXabejn } from "../../eskekoj/shalaj-hapudal/vegetajxo/haxabe.js";
import { vepaqAsfajnPlantojn,
  vepaqAsfajnXabejn, vepaqAltajnAsfajnXabejn } from "../../eskekoj/shalaj-hapudal/vegetajxo/hasfa.js";
import { vepaqLikenSxtonojn, vepaqBordajnSxtonojn } from "../../eskekoj/shalaj-hapudal/vegetajxo/hat6keq.js";
import { vepaqMontajnSubkreskajxojn,
  vepaqLaganSubkreskajxojn } from "../../eskekoj/shalaj-hapudal/vegetajxo/psazXa3e.js";
import { vepaqMontajnHat6keqn } from "../../eskekoj/shalaj-hapudal/vegetajxo/hat6keq.js";
import { kf2Tlexlefp2saijnBerojn } from "../../eskekoj/mebloj/mangxajxoj/beroj.js";
import { kf2InternanSistemon } from "../../eskekoj/hapaq/internoj/sistemo.js";

export async function vepaqKaxten(
  qena: THREE.Scene,
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

  // ⟨ អ្វីដែលមនុស្សសាងសង់ ។ ក្នុងពិភពលោកដែលមានគ្រាប់ពូជ វាមកពីគ្រាប់ពូជ ,
  // ក្នុងពិភពលោកដែលឆ្លាក់ដោយដៃ វាមកពីថត cxefa ។ 📃 ⟩
  const hazardo = mondiaHazardo();
  const URBOJ = aktivajHakaxte();
  const VOJOJ = aktivajHak6h6();
  const DOKOJ = aktivajHaqakaj2();
  const OBJEKTOJ = aktivajObjektoj();
  const kaxteListo: SkulptaKaxte[] = URBOJ.length
    ? URBOJ
    : [ { ksaka: "Geles", arangxaGrando: 3, blokaGrando: "unu", ofsX: 0, ofsZ: 0 } ];
  const hakaxte = kaxteListo.map(u => vepaqKradanKaxten(qena,
    { arangxaGrando: u.arangxaGrando, blokaGrando: u.blokaGrando, keuxfhxeso: !!u.keuxfhxeso, lampoj: u.lampoj !== false },
    [ u.ofsX, u.ofsZ ], oraMaterialo,
    u.aldonajBlokoj ?? [], superajElDatumo(u.superoj)));
  const cefa = hakaxte[0];
  await raporti();

  const vepaqPudalj = hakaxte.flatMap(r => r.vepaqPudalj);
  const kolizioj = hakaxte.flatMap(r => r.kolizioj);
  const selektajxoj = hakaxte.flatMap(r => r.selektajxoj);
  const vepaqGrupoj = hakaxte.flatMap(r => r.vepaqGrupoj);
  const placajNodoj = hakaxte.flatMap(r => r.placajNodoj);
  const keuxfhxesoLokoj = hakaxte.flatMap(r => r.keuxfhxesoLokoj);
  // ⟨ បណ្តាញផ្លូវក្រឡា , ជាទិន្នន័យ 📃 ⟩
  const kradajDifinoj: VojDifino[] = hakaxte.flatMap(r => r.vojDifinoj);
  const kradajHaveb6kek: [ number, number ][] = hakaxte.flatMap(r => r.kunigajPunktoj);
  const kradajFermitaj = new Map<string, [ number, number ]>(hakaxte.flatMap(r => [ ...r.kunigajFermitaj ]));
  // ⟪ ទន្លេ 📃 ⟫
  // ⟪ ទឹកនៃដីឆ្លាក់ 📃 ⟫
  const riverData: RiverData | null = SKULPTA_AKTIVA ? null
    : vepaqRiveron(qena, riveroZ, riveraAkvaVem2, RIVERA_DUONSEFINI, 0o600, RIVERA_BUŜO_X, 0o110, alteco);
  const riveroNordOrienta: RiverData | null = SKULPTA_AKTIVA ? null
    : vepaqRiveronNordan(qena, riveroNordOrientaX, riveraNordOrientaVem2,
        RIVERA_NORDORIENTA_DUONSEFINI, RIVERA_NORDORIENTA_FONTO_Z, RIVERA_NORDORIENTA_BUŜO_Z, 0o60, alteco);
  const lago: RiverData | null = SKULPTA_AKTIVA ? null
    : vepaqLagon(qena, LAGO_X, lagoZ(), lagoRadio, lagoVem2(), alteco);

  // ⟪ ទឹកដេរីវេ ( ការគណនាទឹក ) 📃 ⟫
  const limojSkulptaj = skulptaAkvaLimoj();
  const skulptaAkvo: RiverData | null = limojSkulptaj
    ? vepaqSkulptitanAkvon(qena, limojSkulptaj.x0, limojSkulptaj.z0,
        limojSkulptaj.x1, limojSkulptaj.z1, SKULPTA_PASO, skulptitaAkvo,
        akvaMeshVem2, alteco)
    : null;


  // ⟨ ផ្ទៃផ្លូវឈរលើដីខ្ពស់ជិតខាង ហើយឡើងចុះទន់ៗ មិនកាត់ភ្នំ 📃 ⟩
  // ⟨ radius តូច និងជម្រាលចោទ 📏 ⟩ ៖ ផ្លូវគិតតែដីខ្ពស់ក្នុងរង្វង់ ៤ ឯកតា ។ មុននេះ
  // វាគិតដល់ ២០ ឯកតា , ដូច្នេះភ្នំមួយឆ្ងាយ ១៥ ឯកតាលើកផ្លូវទាំងរង្វង់ ំ ហើយផ្លូវដើរ
  // ខ្ពស់លើដីរាបដោយមិនចុះ ំ ជញ្ជាំងខាងក្រោមខ្ពស់ច្រើនជាន់ ។ ដីខ្ពស់ក្នុង
  // ៤ ឯកតានៅតែលើកផ្លូវ , ដូច្នេះផ្លូវមិនកាត់ចូលជញ្ជាំងថ្មជិត ។ 📃 ⟩
  // ⟨ វាលតែមួយសម្រាប់ផ្លូវទាំងអស់ , និងសម្រាប់ចំណតផង 📃 ⟩
  const bazaK6h6Alteco = kf2BazanK6h6Alton(alteco);
  let k6h6Alteco = bazaK6h6Alteco;

  // ⟪ ចំណត , ច្រកចូលតាមច្រាំងទន្លេ 📃 ⟫
  const qakaj2Kolizioj: { x: number; z: number; w: number; d: number; rot: number; y: number }[] = [];
  const qakaj2LandajAltoj: number[] = [];
  // ⟨ ជណ្តើរចំណតជាផ្លូវ ៖ បង្កើតក្រោយពេលដឹងកម្ពស់ចានភ្ជាប់ 📃 ⟩
  const qakaj2StuparajDatumoj: {
    landaX: number; landaZ: number; sefini: number; landejaY: number;
    saxeni: [ number, number ]; fino: [ number, number ];
  }[] = [];

  // ⟪ កំពង់ និងមហាវិថីចំណត ( ទីក្រុងចម្បង ) 📃 ⟫
  const vojDifinoj: VojDifino[] = [];

  // ⟨ ពីរដំណាក់កាល 📃 ⟩
  // ⟨ ដែនទឹកវែងគ្រប់គ្រាន់ធ្វើស្ពាន 📃 ⟩
  // ⟨ ទឹកពិត ៖ ចំណុចដែលនៅក្រោមផ្ទៃទឹក 📃 ⟩
  // ⟨ ទឹកឆ្លាក់មិនចាំបាច់ 📏 ⟩ ៖ មុននេះត្រូវការម៉ាសទឹកឆ្លាក់ ។ ដូច្នេះក្នុងពិភពលោក
  // ដែលមានគ្រាប់ពូជ ( ទន្លេធម្មជាតិ ) ផ្លូវមិនដឹងពីទឹក , ចុះដល់បាតទន្លេ , ហើយលិច ។
  // ឥឡូវគ្រប់កន្លែងដែលដីទាបជាងកម្រិតទឹកជាទឹក ។ 📃 ⟩
  function tsekeVeraAkvo( x: number, z: number ): boolean {
    return alteco(x, z) < akvaVem2(x, z) - 0o1/0o200;
  }
  // ⟨ ផ្ទឃ្លាំងទឹកសម្រាបផ្លូវ ៖ ផ្លូវដែលនៅលើទឹក ត្រូវនៅលើផ្ទឃ្លាំងទឹក មិនអាចកប់ក្នុងទឹកទេ ។ 📃 ⟩
  // ⟨ អានកម្រិតទឹកម្តង ⟩ ៖ ការធៀប និងលទ្ធផលប្រើកម្រិតតែមួយ ។ មុននេះហៅ
  // `tsekeVeraAkvo` រួចហៅម្តងទៀត , ដូច្នេះកម្រិតទឹកត្រូវគណនាពីរដងលើទឹក ។ 📃 ⟩
  const akvaFino = ( x: number, z: number ): number => {
    const vem2 = akvaVem2( x, z );
    return alteco( x, z ) < vem2 - 0o1/0o200 ? vem2 + VOJA_AKVA_KLARANCO : -Infinity;
  };
  // ⟨ ស្ពានតែពេលទឹកលាតលើសផ្លូវទាំងមូល ៖ ផ្លូវកំពង់នៅមាត់ទឹកនៅតែជាផ្លូវ 📃 ⟩
  function akvaTrunko( k6h6: SkulptaK6h6 ): boolean {
    if ( k6h6.n2k.length < 0o2 ) return false;
    const sefini = k6h6.pontoSefini ?? k6h6.sefini;
    return havasAkvanTrunkon(k6h6.n2k,
      kf2PontanAkvanTeston(k6h6.n2k, sefini, tsekeVeraAkvo));
  }
  // ⟨ ចានភ្ជាប់លើចុង 📃 ⟩
  function troviProksimanVeb6kekn( x: number, z: number ): K6h6RetoVeb6kek | null {
    let plejProksima: K6h6RetoVeb6kek | null = null, plejMallonga = Infinity;
    for ( const veb6kek of k6h6jHaveb6kek ) {
      const h6kuni = Math.hypot(veb6kek.x - x, veb6kek.z - z);
      if ( h6kuni < plejMallonga ) { plejMallonga = h6kuni; plejProksima = veb6kek; }
    }
    return plejMallonga < VOJA_TRUA_DUONO ? plejProksima : null;
  }
  function pontaFinAlto( x: number, z: number, sefini: number ): number {
    // ⟨ ចំណត ⚓ ⟩ ៖ ចានភ្ជាប់នៅមាត់ចំណតយកកម្រិតដែលចំណតបានចុះឈ្មោះ ។
    // ជណ្តើរចាប់ផ្តើមពីកម្រិតនោះ ហើយចុះដល់វេទិកាទាប ។ បើគណនាពីវាល
    // វិញ , កម្រាលទីមួយខុសពីចាន ហើយឃើញជញ្ជាំងនៅក្បាលជណ្តើរ ។ 📃 ⟩
    const qakaj2 = qakaj2AltoCxe(x, z);
    if ( qakaj2 !== undefined ) return qakaj2;
    // ⟨ កម្រិតចានភ្ជាប់ត្រូវដូចកម្រិតផ្លូវដែលឆ្លងចូលមក ដើម្បីកុំឱ្យចានលិចទៅផ្លូវ ។ 📃 ⟩
    const veb6kek = troviProksimanVeb6kekn(x, z);
    if ( veb6kek )
      return surGrid(k6h6SuproDeVeb6kek(veb6kek.x, veb6kek.z, veb6kek.direktaj,
        VOJA_EKSTERA_DUONO, k6h6Alteco).hateru - VOJA_SUPRO_LEVIGXO);
    return surGrid(k6h6Supro(x, z, sefini, k6h6Alteco) - VOJA_SUPRO_LEVIGXO);
  }

  const pontaHak6h6: ( PontoTrako & { w: number } )[] = [];

  const k6h6jRetajHak6h6: K6h6RetoK6h6[] = [];
  // ⟨ ដំណាក់កាលទីមួយ , ទទឹងស្ពាន 📃 ⟩
  const akvajHasost2cel2sai: boolean[] = [];
  for ( const k6h6 of VOJOJ ) {
    const sost2cel2sai = akvaTrunko(k6h6);
    akvajHasost2cel2sai.push(sost2cel2sai);
    if ( k6h6.n2k.length < 2 ) continue;
    const k6h6Sefini = sost2cel2sai ? ( k6h6.pontoSefini ?? k6h6.sefini ) : k6h6.sefini;
    k6h6jRetajHak6h6.push( { n2k: k6h6.n2k, sefini: k6h6Sefini } );
  }
  // ⟨ ការភ្ជាប់រវាងដំណាក់កាល 📃 ⟩
  // ⟨ ចុងផ្លូវដែលឈប់ខ្លីពីចានភ្ជាប់ ៖ ទាញទៅចានភ្ជាប់ជិតបំផុត ។
  // បើមិនទាញ , នៅសល់ចន្លោះស្មៅមួយជំហាននៅរវាងចុងផ្លូវ និងចានភ្ជាប់ ។
  // ចុងផ្លូវចំណតមិនត្រូវទាញទេ ៖ វាឈប់ត្រង់មាត់ចំណតដោយចេតនា ។ 📃 ⟩
  // ⟨ មាត់ដីចំណត ៖ ទីតាំងតែប៉ុណ្ណោះ ។ កម្ពស់មកពីចំណតដែលសាងសង់ក្រោយ វាលផ្លូវ ។ 📃 ⟩
  const qakaj2Landaj = DOKOJ.map(d => {
    const rotacio = d.rotacio ?? 0;
    return { x: d.x + Math.sin(rotacio) * ( d.profundo / 2 ),
      z: d.z + Math.cos(rotacio) * ( d.profundo / 2 ), y: 0 };
  });
  const ne3ak2Haveb6kek = troviK6h6RetajnHaveb6kekn( k6h6jRetajHak6h6, DOKOJ );
  const gluaCelo: [ number, number ][] = [ ...kradajHaveb6kek,
    ...ne3ak2Haveb6kek.map( k => [ k.x, k.z ] as [ number, number ] ) ];
  // ⟨ ផ្លូវក្រឡាអាចទាញចុងផ្លូវ ៖ ដូច្នេះផ្លូវដល់ផ្លូវ ។ ផ្លូវខ្លួនឯងមិនរាប់ ។ 📃 ⟩
  const kradajPunktoj = kradajDifinoj.map( d => d.pts );
  const gluitajPunktoj: [ number, number ][][] = [];
  for ( let vi = 0; vi < VOJOJ.length; vi++ ) {
    const originalaj = k6h6jRetajHak6h6[vi]?.n2k ?? [];
    const aliaj = [ ...kradajPunktoj,
      ...k6h6jRetajHak6h6.map(( v, i ) => i === vi ? [] : v.n2k ) ];
    const n2k = originalaj.length < 2
      ? originalaj.map( p => [ p[0], p[1] ] as [ number, number ] )
      : gluiK6h6Finon(originalaj, gluaCelo, qakaj2Landaj, aliaj);
    gluitajPunktoj.push(n2k);
    if ( n2k.length >= 2 ) k6h6jRetajHak6h6[vi] = { ...k6h6jRetajHak6h6[vi], n2k };
  }
  const k6h6jHaveb6kek = troviK6h6RetajnHaveb6kekn( k6h6jRetajHak6h6, DOKOJ );
  const k6h6jVeb6kekPunktoj = k6h6jHaveb6kek.map( k => [ k.x, k.z ] as [ number, number ] );
  const k6h6jFermitaj = new Map( k6h6jHaveb6kek.map( k => [ k.x + "," + k.z, k.fermitaj ] ) );
  const k6h6jRotacioj = new Map( k6h6jHaveb6kek.map( k => [ k.x + "," + k.z, k.rotacio ] ) );
  // ⟨ កន្លះទទឹងផ្លូវពិត 📏 ⟩ ៖ ចានភ្ជាប់ត្រូវធំល្មមនឹងផ្លូវដែលចូលមក ,
  // មិនមែនតាមតម្លៃថេរ ។ បើចានតូចជាងផ្លូវ , ស្មាងងឹតរបស់ផ្លូវលាតចេញ
  // ហួសចាន , ហើយឃើញជាខ្សែងងឹតកាត់ចំណុចភ្ជាប់ ។ 📃 ⟩
  const k6h6jDuonoj = new Map<string, number>(k6h6jHaveb6kek.map( k => [ k.x + "," + k.z, k.p2somani ] ) );
  // ⟪ ដៃពីផ្លូវទាំងអស់ 📏 ⟫
  // ⟨ ចំណុចក្រឡាគ្មានទិសដៃ 📃 ⟩ ៖ ចានរបស់វាសាងពីការបិទជ្រុង ។ តែផ្លូវដៃ
  // អាចមកដល់ចំណុចនោះ ។ បើចានមិនដឹងពីផ្លូវនោះ , ចាននៅតែពីរដៃ ( ជ្រុង ) ,
  // ហើយមាត់ផ្លូវទីបីកាត់ចូលជ្រុងមូល ។ ដូច្នេះដៃត្រូវមកពីផ្លូវពិតទាំងអស់ ។
  // ដៃនេះក៏ចូលវាលកម្ពស់ ដើម្បីឱ្យផ្លូវនិងចានអានកម្រិតដូចគ្នា ។ 📃 ⟩
  const k21eKunigajPunktoj: [ number, number ][] = [ ...kradajHaveb6kek, ...k6h6jVeb6kekPunktoj ];
  const k21eRetajHak6h6: K6h6RetoK6h6[] = [
    ...kradajDifinoj.map( d => ( { n2k: d.pts, sefini: 0o2 * d.w } ) ),
    ...k6h6jRetajHak6h6 ];
  const derivitajBrakoj = kunigajBrakojElHak6h6(k21eKunigajPunktoj, k21eRetajHak6h6);
  for ( const veb6kek of k6h6jHaveb6kek ) {
    const ca3aq = veb6kek.x + "," + veb6kek.z;
    const ca1ara = derivitajBrakoj.get(ca3aq) ?? [];
    for ( const d of veb6kek.direktaj )
      if ( !ca1ara.some( u => u[0] * d[0] + u[1] * d[1] > 0o1 - 0o1/0o1000 ) ) ca1ara.push(d);
    derivitajBrakoj.set(ca3aq, ca1ara);
    veb6kek.direktaj = ca1ara;
  }
  const k6h6jDirektoj = new Map<string, [ number, number ][]>(derivitajBrakoj);
  // ⟨ កម្រិតរួមសម្រាប់ចានភ្ជាប់ និងចុងផ្លូវ 📃 ⟩
  // ⟨ ផ្ទឃ្លាំងទឹក 📃 ⟩ ៖ បញ្ជូនផ្ទឃ្លាំងទឹកទៅវាលផ្លូវ ដូច្នេះកោណមិនលើកផ្លូវលើទឹក ។
  k6h6Alteco = kf2K6h6Alton(alteco, k21eKunigajPunktoj.map(([ x, z ]) =>
    ( { x, z, direktaj: derivitajBrakoj.get(x + "," + z) ?? [],
      p2somani: k6h6jDuonoj.get(x + "," + z) ?? VOJA_DIORITA_DUONO } )), akvaFino);
  await raporti();

  // ⟪ ចំណត ⚓ ⟫
  // ⟨ ចំណតអានវាលផ្លូវដូចគ្នា ៖ ដូច្នេះចំណតនិងផ្លូវឈរស្មើគ្នា ។ មុននេះចំណត
  // សាងសង់មុនវាល , ដូច្នេះវាឈរទាបជាងផ្លូវមួយជំហានឬច្រើននៅមាត់ដី ។ 📃 ⟩
  for ( let i = 0; i < DOKOJ.length; i++ ) {
    const rotacio = DOKOJ[i].rotacio ?? 0;
    const qakaj2 = vepaqQakaj2n(qena, DOKOJ[i].x, DOKOJ[i].z, rotacio,
      k6h6Alteco, akvaVem2, DOKOJ[i].profundo, alteco);
    // ⟨ ការប៉ះទង្គិចមួយក្នុងមួយផ្នែក 📃 ⟩
    const kos = Math.cos(rotacio), sin = Math.sin(rotacio);
    for ( const s of qakaj2.sekcioj ) {
      qakaj2Kolizioj.push({ x: DOKOJ[i].x + kos * s.lx + sin * s.lz,
        z: DOKOJ[i].z - sin * s.lx + kos * s.lz, w: s.w, d: s.d, rot: rotacio, y: s.y });
    }
    qakaj2LandajAltoj.push(qakaj2.platformY);
    qakaj2Landaj[i].y = qakaj2.platformY + PONT_FINA_LEVIGXO;
    if ( qakaj2.stuparajPunktoj.length >= 2 ) {
      qakaj2StuparajDatumoj.push({
        landaX: DOKOJ[i].x + sin * ( DOKOJ[i].profundo / 2 ),
        landaZ: DOKOJ[i].z + kos * ( DOKOJ[i].profundo / 2 ),
        sefini: qakaj2.platformWidth, landejaY: qakaj2.landejaY,
        saxeni: qakaj2.stuparajPunktoj[0], fino: qakaj2.stuparajPunktoj[1],
      });
    }
  }
  await raporti();
  // ⟨ ជណ្តើរចំណត ៖ រត់ពីផ្ទៃចានភ្ជាប់ ចុះដល់ផ្ទៃចំណត ។
  // កម្ពស់ជំហាន និងកម្រាលជំហានស្មើគ្នាទាំងអស់ ។ 📃 ⟩
  for ( const d of qakaj2StuparajDatumoj ) {
    // ⟨ ចាប់ផ្តើមត្រង់ផ្ទៃចានភ្ជាប់ ៖ មិនធ្លាក់ពីលើវាមួយកម្ពស់ធំ 📃 ⟩
    const starto = pontaFinAlto(d.landaX, d.landaZ, d.sefini);
    const veb6kek = troviProksimanVeb6kekn(d.landaX, d.landaZ);
    let saxeni = d.saxeni;
    if ( veb6kek ) {
      const diferencoX = d.fino[0] - veb6kek.x, diferencoZ = d.fino[1] - veb6kek.z;
      const sahakani = Math.hypot(diferencoX, diferencoZ);
      if ( sahakani > VOJA_TRUA_DUONO ) {
        const kek = VOJA_TRUA_DUONO / sahakani;
        saxeni = [ veb6kek.x + diferencoX * kek, veb6kek.z + diferencoZ * kek ];
      }
    }
    // ⟨ ជំហានដូចផ្លូវ ៖ កម្រិតតែមួយសម្រាប់គ្រប់ជណ្តើរ ។ 📃 ⟩
    // ⟨ ចំណតស្មើផ្លូវ ៖ គ្មានជណ្តើរ , ផ្លូវនិងចំណតជាប់គ្នាផ្ទាល់ 📃 ⟩
    const stuparo = kf2DokanStuparon(saxeni, d.fino, starto, d.landejaY);
    if ( !stuparo ) continue;
    // ⟨ ជណ្តើរមានគ្រឹះដូចផ្លូវ ៖ ចុះដល់ដីក្រោមទឹក , មិនអណ្តែតទេ 📃 ⟩
    // ⟨ កម្រាលទីមួយចុះមួយកម្ពស់ជំហាន ៖ ផ្ទៃផ្លូវនៅមាត់ចានភ្ជាប់គឺជាកម្រាលលើគេ ,
    // ដូច្នេះជំហានទាំងអស់ចុះមកត្រូវនឹងផ្ទៃចំណត , មិនខ្វះជំហានចុងក្រោយទេ ។ 📃 ⟩
    vojDifinoj.push({ pts: stuparo.n2k, w: d.sefini, stuparo: true,
      heightFn: stuparo.l6da, grundoFn: alteco });
  }
  // ⟨ ដំណាក់កាលទីពីរ , និយមន័យ 📃 ⟩
  for ( let k6h6Indekso = 0; k6h6Indekso < VOJOJ.length; k6h6Indekso++ ) {
    const k6h6 = VOJOJ[k6h6Indekso];
    if ( k6h6.n2k.length < 2 ) continue;
    const sost2cel2sai = akvajHasost2cel2sai[k6h6Indekso];
    // ⟨ ចំណុចដែលបានទាញទៅចានភ្ជាប់ ៖ ផ្លូវត្រូវចប់ត្រង់ចានភ្ជាប់ , មិនមែននៅមុនវាទេ 📃 ⟩
    const n2k = gluitajPunktoj[k6h6Indekso] ?? k6h6.n2k;
    // ⟨ ស្ពានធំទូលាយជាងផ្លូវ ៖ តែកម្ពស់ដូចផ្លូវ ។ 📃 ⟩
    const k6h6Sefini = sost2cel2sai ? ( k6h6.pontoSefini ?? k6h6.sefini ) : k6h6.sefini;
    let pontaHeight: (( x: number, z: number ) => number) | undefined;
    let pontaGrundo: (( x: number, z: number ) => number) | undefined;
    if ( sost2cel2sai ) {
      // ⟪ ផ្ទៃស្ពានផុតទឹក 📃 ⟫
      // ⟨ ធ្នូស្ពាន ៖ ផ្ទៃខ្ពស់នៅកណ្តាលទន្លេ , ហើយចុះដល់ច្រាំងទាំងពីរ ។
      // ដូច្នេះមាត់ស្ពានស្មើនឹងផ្លូវចូល , ហើយគ្មានជញ្ជាំងឈរនៅមាត់ទឹក ។ 📃 ⟩
      const tsekePontaAkvo = kf2PontanAkvanTeston(n2k, k6h6Sefini, tsekeVeraAkvo);
      const s2qena = vepaqPontanProfilon(
        n2k, k6h6Sefini, ( x, z, w ) => k6h6Supro( x, z, w, k6h6Alteco ),
        ( x, z ) => tsekePontaAkvo(x, z)
          ? akvaVem2(x, z) + PONT_AKVA_KLARANCO : -Infinity,
        pontaFinAlto, alteco);
      // ⟪ ជំហានលើដី , ធ្នូលើទឹក 📏 ⟫
      // ⟨ បញ្ហាដើម 📃 ⟩ ៖ ផ្លូវចូលស្ពានរលូនតាមដី ។ ដីជម្រាល , ដូច្នេះផ្លូវចូល
      // ជាជម្រាលវែងរអិល , មិនមែនជណ្តើរដូចផ្លូវដីធម្មតា ។ ឥឡូវលើដីកម្ពស់បង្គត់
      // ទៅក្រឡាជំហាន , ដូច្នេះផ្លូវចូលស្ពានជាជណ្តើរដូចផ្លូវឯទៀត ។
      // លើទឹកកម្ពស់នៅតែរលូន ៖ ធ្នូស្ពានមិនក្លាយជាជណ្តើរទេ ។ 📃 ⟩
      pontaHeight = ( x, z ) => {
        const l6da = s2qena.l6da(x, z);
        return ( tsekePontaAkvo(x, z) ? l6da : surGrid(l6da) ) - VOJA_SUPRO_LEVIGXO;
      };
      pontaGrundo = ( x, z ) => s2qena.grundo(x, z);
      // ⟨ តួធ្នូរលូន 📃 ⟩ ៖ ផ្ទៃស្ពានរលូនតាមធ្នូ , ដូច្នេះតួធ្នូក៏រលូនដែរ ។
      // បើតួធ្នូបង្គត់ទៅក្រឡាជំហាន , វាលាតឡើងលើផ្ទៃផ្លូវ ។ 📃 ⟩
      for ( const trako of s2qena.trakoj )
        pontaHak6h6.push({ ...trako, w: k6h6Sefini });
    }
    // ⟨ និយមន័យមួយក្នុងមួយផ្លូវ 📃 ⟩
    const difino: VojDifino = { pts: n2k, w: k6h6Sefini / 2, hateruni: true };
    // ⟨ ស្ពានជាចម្រៀករលូន 📃 ⟩ ៖ ផ្លូវឯទៀតជាជណ្តើរថ្ម , តែស្ពានជាធ្នូតែមួយ ។
    // វានៅតែសាងសង់ដោយ vepaqHak6h6n ជាមួយខ្សែ និងសម្ភារៈដូចគ្នា ។ 📃 ⟩
    if ( pontaHeight && pontaGrundo ) {
      difino.heightFn = pontaHeight;
      difino.grundoFn = pontaGrundo;
      difino.glata = true;
    }
    vojDifinoj.push(difino);
  }
  const dockaLandaRando: [ number, number ][] =
    qakaj2Landaj.map(p => [ p.x, p.z ] as [ number, number ]);
  // ⟨ បណ្តាញមួយ ការសាងសង់មួយ 📃 ⟩
  const k21eDifinoj: VojDifino[] = [ ...kradajDifinoj, ...vojDifinoj ];
  const k21eHaveb6kek: [ number, number ][] = [ ...kradajHaveb6kek, ...k6h6jVeb6kekPunktoj ];
  const k21eFermitaj = new Map<string, [ number, number ]>([ ...kradajFermitaj, ...k6h6jFermitaj ]);
  // ⟨ មាត់ផ្លូវមកដល់ចំណុចក្រឡា ៖ ចានភ្ជាប់ត្រូវបើកពេញ ដូចប្រសព្វក្នុងទីក្រុងចម្បង ។
  // ការបិទជ្រុងរបស់សំណាញ់សម្រាប់ចុងផ្លូវក្រឡា ។ បើផ្លូវភ្ជាប់មកដល់ទីនោះ
  // ផ្លូវនឹងជាប់នឹងជ្រុងដែលបិទ ។ ដូច្នេះលុបការបិទនៅចុងផ្លូវភ្ជាប់ទាំងអស់ ។ 📃 ⟩
  for ( const k6h6 of VOJOJ ) {
    if ( k6h6.n2k.length < 0o2 ) continue;
    for ( const p of [ k6h6.n2k[0], k6h6.n2k[k6h6.n2k.length - 1] ] )
      k21eFermitaj.delete(p[0] + "," + p[1]);
  }
  // ⟨ បាតផ្លូវចុះដល់ដីពិត 📏 ⟩ ៖ មុននេះបាតអានវាលផ្លូវ ( រលូនជាងដី ) , ដូច្នេះ
  // បាតនៅខ្ពស់ជាងដីដែលឃើញ , ហើយផ្លូវអណ្តែតលើស្មៅដោយចន្លោះខ្យល់ក្រោម ។
  // ឥឡូវបាតអានដីពិត , ហើយមុខចំហៀងខ្ពស់ក្លាយជាស្មាជម្រាល ( SKIRTA_KLINO ) ,
  // ដូច្នេះផ្លូវឈរលើដី ហើយគ្មានជញ្ជាំងថ្ម ។ 📃 ⟩
  const gelesVojSpecimenoj = vepaqHak6h6n(qena, k21eDifinoj, k6h6Alteco,
    dioritaMaterialo, andezitaMaterialo, k21eHaveb6kek,
    { akvaFn: akvaFino, grundoFn: alteco, kunigajDirektoj: k6h6jDirektoj,
      kunigajFermitaj: k21eFermitaj, kunigajRotacioj: k6h6jRotacioj,
      kunigajDuonoj: k6h6jDuonoj } );
  vepaqIntersekcajnHapa12n( qena, k21eHaveb6kek, k6h6Alteco,
    dioritaMaterialo, andezitaMaterialo, k21eFermitaj, k6h6jRotacioj, k6h6jDirektoj, alteco,
    k6h6jDuonoj );
  // ⟨ ស្ពាន ៖ ផ្ទៃស្ពានគឺជាកម្រិតចានភ្ជាប់ខ្លួនឯង , ដូច្នេះគ្មានជំហានលោតនៅមាត់ទឹក ។ 📃 ⟩
  for ( const p of pontaHak6h6 )
    vepaqPonton(qena, p.ax, p.az, p.bx, p.bz, p.w, andezitaMaterialo, p.deko, alteco);

  // ⟨ មហាវិថីកំពង់ ។ ក្នុងពិភពលោកដែលមានគ្រាប់ពូជ ចំណុចមកពីចុងផ្លូវ ,
  // ក្នុងពិភពលោកដែលឆ្លាក់ដោយដៃ ពួកវាជាចំណុចដើម ។ 📃 ⟩
  const placajTsiq: [ number, number ][] = !tsekeGeneritaSetlejo()
    ? [ [ -0o124, -0o140 ], [ 0o124, -0o122 ] ]
    : ( () => {
      const hatlakakani: [ number, number ][] = [];
      for ( const k6h6 of VOJOJ ) {
        if ( k6h6.n2k.length < 0o2 ) continue;
        const [ x, z ] = k6h6.n2k[k6h6.n2k.length - 1];
        // ⟨ ចុងផ្លូវដែលជាប់នឹងចំណតមានមហាវិថីរួចហើយ 📃 ⟩
        if ( qakaj2Landaj.some(p => Math.hypot(p.x - x, p.z - z) < 0o20) ) continue;
        hatlakakani.push([ x, z ]);
        if ( hatlakakani.length >= 0o2 ) break;
      }
      return hatlakakani;
    } )();
  for ( const p of placajTsiq ) placajNodoj.push([ p[0], p[1] ]);
  for ( const [ dx, dz ] of dockaLandaRando ) placajNodoj.push([ dx, dz ]);
  const qakaj2PlacajNodoj: [ number, number ][] = [ ...placajTsiq, ...dockaLandaRando ];

  await raporti();

  // ⟪ ចង្កៀង 📃 ⟫
  const lampLokoj: LampLoko[] = hakaxte.flatMap(r => r.lampLokoj);
  const addLamp = kf2LampAldonilon(vepaqPudalj, lampLokoj);
  const addLampGroup = kf2KvarLampAldonilon(addLamp, lampLokoj);
  for ( const [ aX, aZ ] of qakaj2PlacajNodoj ) {
    addLampGroup(aX, aZ, 0o21/0o10);
  }

  // ⟨ ចង្កៀងដែលមនុស្សដាក់ ៖ មិនរើ , មិនលុប ។ អ្នកសាងសង់ដាក់វាដោយចេតនា ។ 📃 ⟩
  const lampKvantoAntauxObjektoj = lampLokoj.length;
  for ( const o of OBJEKTOJ ) {
    if ( o.pudal === "hxeuxfo" ) {
      lampLokoj.push({ x: o.x, z: o.z, y: alteco(o.x, o.z) + 0o1/0o40, rotacio: o.rotacio });
    } else if ( o.pudal === "hxeuxfoPa12" ) {
      vepaqPeriferiajnPlathaqoxan(qena, [ [ o.x, o.z ] ], alteco, dioritaMaterialo, andezitaMaterialo);
      lampLokoj.push({ x: o.x, z: o.z, y: alteco(o.x, o.z) + 0o4/0o10 - 0o1/0o40, rotacio: o.rotacio });
    }
  }

  // ⟨ ចង្កៀងមិនឈរក្នុងទឹក ៖ ចង្កៀងជ្រុងក្រឡា ៗ អាចស្ថិតលើទឹក ។
  // ចង្កៀងទាំងនោះរើរួចហើយក្នុង `lampoj.ts` ។ នៅសល់តែចង្កៀងដែលរើរកដីគោកមិនបាន ,
  // ហើយចង្កៀងដែលមនុស្សដាក់ដោយដៃ ៖ រក្សាទុក ។ 📃 ⟩
  for ( let i = lampKvantoAntauxObjektoj - 1; i >= 0; i-- ) {
    const l = lampLokoj[i];
    if ( akvo(l.x, l.z) || l.y < akvaVem2(l.x, l.z) + 0o1/0o10 ) lampLokoj.splice(i, 1);
  }

  const lampSistemo = vepaqHxeuxfojn(qena, lampLokoj, dioritaMaterialo, oraMaterialo);
  for ( const l of lampLokoj ) kolizioj.push({ x: l.x, z: l.z, r: 0o5/0o10 });
  await raporti();

  // ⟪ រុក្ខជាតិ 📃 ⟫
  const ekskluziviRiveron = ( x: number, z: number ) => akvo(x, z);
  const vojSpecimenoj = gelesVojSpecimenoj;
  // ⟪ លិបិក្រមក្រឡាសម្រាប់ការដកផ្លូវចេញ 📃 ⟫
  const K6H6_KEKKOZUSAI = 0o10;
  const k6h6Krado = new Map<number, THREE.Vector3[]>();
  for ( const p of vojSpecimenoj ) {
    const kx = Math.floor(p.x / K6H6_KEKKOZUSAI), kz = Math.floor(p.z / K6H6_KEKKOZUSAI);
    const ca3aq = kx * 0o100000 + kz;
    let kekkozusai = k6h6Krado.get(ca3aq);
    if ( !kekkozusai ) { kekkozusai = []; k6h6Krado.set(ca3aq, kekkozusai); }
    kekkozusai.push(p);
  }
  const ekskluziviHak6h6n = ( x: number, z: number, m: number ) => {
    const r = Math.ceil(m / K6H6_KEKKOZUSAI) + 1;
    const bx = Math.floor(x / K6H6_KEKKOZUSAI), bz = Math.floor(z / K6H6_KEKKOZUSAI);
    const m2 = m * m;
    for ( let dx = -r; dx <= r; dx++ ) {
      for ( let dz = -r; dz <= r; dz++ ) {
        const kekkozusai = k6h6Krado.get(( bx + dx ) * 0o100000 + ( bz + dz ));
        if ( !kekkozusai ) continue;
        for ( const p of kekkozusai ) {
          const ddx = x - p.x, ddz = z - p.z;
          if ( ddx * ddx + ddz * ddz < m2 ) return true;
        }
      }
    }
    for ( const o of OBJEKTOJ ) {
      if ( o.pudal !== "hxeuxfoPa12" ) continue;
      if ( Math.hypot(x - o.x, z - o.z) < m + 3 ) return true;
    }
    for ( const l of keuxfhxesoLokoj ) if ( Math.hypot(x - l.x, z - l.z) < m + 0o1/0o2 ) return true;
    return false;
  };

  // ⟪ ចម្ងាយដល់បាតគីហ្វហេសូ , ដើម្បីឱ្យស្មៅមកដល់ជិតគីហ្វហេសូ និងកុំឱ្យមានកន្លែងទទេធំពេក ជាងចា។ច្ចាន់ តែងតែបាន 📃 ⟫
  const keuxfhxesoKlaro = ( x: number, z: number, maks: number ): number => {
    const limo = KEUXFHXESO_KA5IK + maks;
    const limo2 = limo * limo;
    let plejProkximo = Infinity;
    for ( const l of keuxfhxesoLokoj ) {
      const ddx = x - l.x, ddz = z - l.z;
      const d2 = ddx * ddx + ddz * ddz;
      if ( d2 < limo2 && d2 < plejProkximo ) plejProkximo = d2;
    }
    return Math.sqrt( plejProkximo ) - KEUXFHXESO_KA5IK;
  };

  // ⟪ ចម្ងាយដល់មជ្ឈប់ផ្លូវ , ដើម្បីកុំឱ្យស្មៅដុះចូលផ្លូវ និងដើម្បីកុំឱ្យមានកន្លែងទទេដែលធំ ជាងចា។ច្ចាន់ តែងតែបាន 📃 ⟫
  const k6h6Klaro = ( x: number, z: number, maks: number ): number => {
    const r = Math.ceil(maks / K6H6_KEKKOZUSAI) + 1;
    const bx = Math.floor(x / K6H6_KEKKOZUSAI), bz = Math.floor(z / K6H6_KEKKOZUSAI);
    let plejProkximo = Infinity;
    for ( let dx = -r; dx <= r; dx++ ) {
      for ( let dz = -r; dz <= r; dz++ ) {
        const kekkozusai = k6h6Krado.get(( bx + dx ) * 0o100000 + ( bz + dz ));
        if ( !kekkozusai ) continue;
        for ( const p of kekkozusai ) {
          const ddx = x - p.x, ddz = z - p.z;
          const d2 = ddx * ddx + ddz * ddz;
          if ( d2 < plejProkximo ) plejProkximo = d2;
        }
      }
    }
    return Math.sqrt( plejProkximo ) - VOJA_EKSTERA_DUONO;
  };
  const ekskluziviPaqn = ( x: number, z: number, m: number ) => {
    for ( const s of vepaqPudalj ) if ( Math.hypot(x - s.x, z - s.z) < s.w * 0o23/0o40 + m ) return true;
    return false;
  };
  const arboj = metiArbojn(alteco, 0o1400, 0o600, ekskluziviRiveron, ekskluziviHak6h6n, ekskluziviPaqn,
    0o53104, [], 0o10, undefined, VALAJ_BIOMOJ);
  const lam2vjHasost2cel2sai = vepaqArbaron(qena, arboj);

  const hataksal = metiArbojn(alteco, 0o700, 0o600, ekskluziviRiveron, ekskluziviHak6h6n, ekskluziviPaqn,
    0o53114, arboj, 0o10, kronaRadiusoLarika, VALAJ_BIOMOJ);
  const larikajHasost2cel2sai = vepaqLarikon(qena, hataksal);

  const tlexlefhxakaij = metiArbojn(alteco, 0o400, 0o600, ekskluziviRiveron, ekskluziviHak6h6n, ekskluziviPaqn,
    0o62445, [ ...arboj, ...hataksal ], 0o10, kronaRadiusoHxsxaksxlefa, VALAJ_BIOMOJ);
  const tlexlefhxakaijHasost2cel2sai = vepaqTlexlefhxakaijn(qena, tlexlefhxakaij);

  vepaqTrunkajnF2majn(qena, [ lam2vjHasost2cel2sai, larikajHasost2cel2sai, tlexlefhxakaijHasost2cel2sai ]);
  await raporti();

  vepaqXabejn(qena, 0o400, alteco, arboj, vojSpecimenoj, ekskluziviRiveron, ekskluziviHak6h6n, VALAJ_BIOMOJ);
  await jesi();

  vepaqAsfajnPlantojn(qena, 0o200, alteco, ekskluziviRiveron, ekskluziviHak6h6n, ekskluziviPaqn, VALAJ_BIOMOJ);
  await jesi();

  vepaqAsfajnXabejn(qena, 0o200, alteco, ekskluziviRiveron, ekskluziviHak6h6n, ekskluziviPaqn, VALAJ_BIOMOJ);
  await jesi();
  vepaqAltajnAsfajnXabejn(qena, 0o100, alteco, ekskluziviRiveron, ekskluziviHak6h6n, ekskluziviPaqn,
    [ ...arboj, ...hataksal, ...tlexlefhxakaij ], VALAJ_BIOMOJ);
  await jesi();

  // ⟨ ថ្មរឹង 📃 ⟩
  const likenSxtonoj = vepaqLikenSxtonojn(qena, 0o60, alteco, ekskluziviRiveron,
    ekskluziviHak6h6n, ekskluziviPaqn);
  await jesi();

  // ⟪ គ្រួសតាមច្រាំងទឹក 📃 ⟫
  vepaqBordajnSxtonojn(qena, alteco, ekskluziviHak6h6n, ekskluziviPaqn);
  await jesi();

  vepaqF2majn(qena, 0o200, alteco, [ ...arboj, ...hataksal, ...tlexlefhxakaij ], likenSxtonoj,
    ekskluziviRiveron, ekskluziviHak6h6n, false, ekskluziviPaqn);

  vepaqFe1afn(qena, 0o1170, alteco, ekskluziviRiveron, ekskluziviHak6h6n, ekskluziviPaqn, VALAJ_BIOMOJ);
  await jesi();

  // ⟪ ស្រទាប់ស្មៅ 📃 ⟫
  // ⟨ ចំនួនស្លឹកក្នុងដុំស្មៅ ៖ ស្មៅជាអ្នកចំណាយធំបំផុតក្នុងស៊ុម ( រាប់លានត្រីកោណ ) ។
  // បន្ថយពី 15 មក 11 គឺស្មើនឹងកម្រិតដែលទូរស័ព្ទប្រើស្រាប់ ។ 📃 ⟩
  await vepaqHerbanTavolon(qena, jesi, alteco, ekskluziviRiveron, ekskluziviHak6h6n,
    ekskluziviPaqn, [ ...VALAJ_BIOMOJ, ...EBENAJAJ_BIOMOJ ],
    surPosxtelefono ? 0o11 : 0o13, k6h6Klaro, keuxfhxesoKlaro);

  // ⟪ វាលរាប 📃 ⟫
  await jesi();
  vepaqFe1afn(qena, 0o2000, alteco, ekskluziviRiveron, ekskluziviHak6h6n, ekskluziviPaqn, EBENAJAJ_BIOMOJ);
  vepaqAsfajnPlantojn(qena, 0o1000, alteco, ekskluziviRiveron, ekskluziviHak6h6n, ekskluziviPaqn, EBENAJAJ_BIOMOJ);
  await jesi();

  vepaqMusxajnMontetojn(qena, 0o200, alteco, arboj, ekskluziviRiveron, ekskluziviHak6h6n,
    ekskluziviPaqn);
  await jesi();

  const so3akakHasost2cel2sai = vepaqSo3akaknHasost2cel2sain(qena, 0o40, alteco, arboj, ekskluziviRiveron,
    ekskluziviHak6h6n, ekskluziviPaqn);
  await jesi();

  vepaqCetkuojn(qena, 0o110, alteco, riveroZ,
    ( x: number, z: number ) => ekskluziviPaqn(x, z, 3), ekskluziviHak6h6n, EKVIZETO_BIOMOJ);
  await raporti();

  // ⟪ រុក្ខជាតិជុំវិញបឹង 📃 ⟫
  const lagArboj = metiArbojnCxirkauLagon(alteco, 0o60, LAGO_X, lagoZ(), lagoRadio, akvaVem2,
    ekskluziviRiveron, ekskluziviHak6h6n, ekskluziviPaqn, 0o53120, [ ...arboj, ...hataksal ], 0o10,
    undefined, VALAJ_BIOMOJ);
  const lagHasost2cel2sai = vepaqArbaron(qena, lagArboj);
  await jesi();
  const lagHataksal = metiArbojnCxirkauLagon(alteco, 0o40, LAGO_X, lagoZ(), lagoRadio, akvaVem2,
    ekskluziviRiveron, ekskluziviHak6h6n, ekskluziviPaqn, 0o53121, [ ...lagArboj, ...arboj, ...hataksal ], 0o10,
    kronaRadiusoLarika, VALAJ_BIOMOJ);
  const lagLarikajHasost2cel2sai = vepaqLarikon(qena, lagHataksal);
  const lagTlexlefhxakaij = metiArbojnCxirkauLagon(alteco, 0o30, LAGO_X, lagoZ(), lagoRadio, akvaVem2,
    ekskluziviRiveron, ekskluziviHak6h6n, ekskluziviPaqn, 0o53126, [ ...lagArboj, ...lagHataksal, ...arboj, ...hataksal ], 0o10,
    kronaRadiusoHxsxaksxlefa, VALAJ_BIOMOJ);
  const lagTlexlefhxakaijHasost2cel2sai = vepaqTlexlefhxakaijn(qena, lagTlexlefhxakaij);
  await jesi();
  vepaqTrunkajnF2majn(qena, [ lagHasost2cel2sai, lagLarikajHasost2cel2sai, lagTlexlefhxakaijHasost2cel2sai ], 0o62452);
  vepaqFe1afnCxirkauLagon(qena, 0o300, alteco, LAGO_X, lagoZ(), lagoRadio, akvaVem2,
    ekskluziviRiveron, ekskluziviHak6h6n, ekskluziviPaqn, 0o53122);
  vepaqCakeojn(qena, 0o110, alteco, LAGO_X, lagoZ(), lagoRadio, akvaVem2,
    ekskluziviPaqn, ekskluziviHak6h6n, 0o26525, EKVIZETO_BIOMOJ);
  vepaqLaganSubkreskajxojn(qena, 0o470, alteco, LAGO_X, lagoZ(), lagoRadio, akvaVem2,
    [ ...lagArboj, ...lagHataksal, ...lagTlexlefhxakaij ], [ ...lagArboj, ...lagHataksal, ...lagTlexlefhxakaij ],
    ekskluziviRiveron, ekskluziviHak6h6n, ekskluziviPaqn, 0o53134, VALAJ_BIOMOJ);
  await raporti();

  // ⟪ រុក្ខជាតិភ្នំ 📃 ⟫
  const montajHalam2v = metiMontajnArbojn(alteco, 0o100, 0o210, 0o270,
    ekskluziviRiveron, ekskluziviHak6h6n, ekskluziviPaqn, 0o53132,
    [ ...arboj, ...hataksal ], 0o10, undefined, 0, 0o340, MONTAJ_BIOMOJ);
  const montajLam2vHasost2cel2sai = vepaqArbaron(qena, montajHalam2v);
  const montajHataksal = metiMontajnArbojn(alteco, 0o200, 0o260, 0o420,
    ekskluziviRiveron, ekskluziviHak6h6n, ekskluziviPaqn, 0o53130,
    [ ...montajHalam2v, ...arboj, ...hataksal ], 0o10, kronaRadiusoLarika, 0, 0o340, MONTAJ_BIOMOJ);
  const montajLarikaHasost2cel2sai = vepaqLarikon(qena, montajHataksal);
  await jesi();
  const montajHat6keq = vepaqMontajnHat6keqn(qena, 0o100, alteco, ekskluziviRiveron, ekskluziviHak6h6n,
    undefined, 0, 0o340, 0o260, 0o160, MONTAJ_BIOMOJ, ekskluziviPaqn);
  vepaqF2majn(qena, 0o150, alteco, [ ...montajHataksal, ...montajHalam2v ], montajHat6keq,
    ekskluziviRiveron, ekskluziviHak6h6n, true, ekskluziviPaqn);
  vepaqTrunkajnF2majn(qena, [ montajLarikaHasost2cel2sai, montajLam2vHasost2cel2sai ], 0o62453);

  // ⟪ រុក្ខជាតិភ្នំភាគឦសាន 📃 ⟫
  const neHalam2v = metiMontajnArbojn(alteco, 0o40, 0o40, 0o140,
    ekskluziviRiveron, ekskluziviHak6h6n, ekskluziviPaqn, 0o53135,
    [ ...arboj, ...hataksal ], 0o10, undefined, -0o350, 0o64, MONTAJ_BIOMOJ);
  const neLam2vHasost2cel2sai = vepaqArbaron(qena, neHalam2v);
  const neHataksal = metiMontajnArbojn(alteco, 0o60, 0o40, 0o160,
    ekskluziviRiveron, ekskluziviHak6h6n, ekskluziviPaqn, 0o53140,
    [ ...neHalam2v, ...montajHalam2v, ...montajHataksal, ...arboj, ...hataksal ], 0o10, kronaRadiusoLarika,
    -0o350, 0o64, MONTAJ_BIOMOJ);
  const neLarikaHasost2cel2sai = vepaqLarikon(qena, neHataksal);
  const neHat6keq = vepaqMontajnHat6keqn(qena, 0o40, alteco, ekskluziviRiveron, ekskluziviHak6h6n,
    0o2303601, -0o350, 0o64, 0o40, 0o100, MONTAJ_BIOMOJ, ekskluziviPaqn);
  vepaqF2majn(qena, 0o60, alteco, [ ...neHataksal, ...neHalam2v ], neHat6keq,
    ekskluziviRiveron, ekskluziviHak6h6n, true, ekskluziviPaqn);
  vepaqTrunkajnF2majn(qena, [ neLarikaHasost2cel2sai, neLam2vHasost2cel2sai ], 0o62450);
  vepaqMontajnSubkreskajxojn(qena, 0o3000, alteco,
    [ ...arboj, ...hataksal, ...montajHataksal, ...montajHalam2v ],
    [ ...arboj, ...hataksal, ...tlexlefhxakaij, ...montajHataksal, ...montajHalam2v ],
    ekskluziviRiveron, ekskluziviHak6h6n, ekskluziviPaqn, 0o53133, MONTAJ_BIOMOJ);
  await jesi();

  const tlexlefp2saij = metiTlexlefp2saijn(alteco, 0o200, ekskluziviRiveron, ekskluziviHak6h6n, ekskluziviPaqn,
    0o62450, [ ...arboj, ...hataksal, ...tlexlefhxakaij, ...montajHataksal, ...montajHalam2v,
      ...neHataksal, ...neHalam2v ]);
  vepaqTlexlefp2saijn(qena, tlexlefp2saij);
  const tlexlefp2saiBeroj = kf2Tlexlefp2saijnBerojn(qena, tlexlefp2saij);
  await raporti();

  // ⟪ ចំណុចអ័ព្ទ 📃 ⟫
  const nebulSistemo = ( (): NebulaSistemo => {
    const nebulaCac2sex = kf2NebulanCac2sex();
    const fiksitaj: number[][] = [
      [ -0o110, -0o110, 0o24/0o10, 0o60, 0o5/0o40 ], [ -0o40, -0o110, 0o215/0o100, 0o60, 0o3/0o20 ],
      [ 0o30, -0o110, 0o263/0o100, 0o60, 0o5/0o40 ], [ 0o70, -0o100, 0o115/0o40, 0o40, 0o5/0o40 ],
      [ -0o60, -0o60, 0o163/0o100, 0o40, 0o11/0o100 ], [ -0o110, 0o40, 0o63/0o40, 0o30, 0o3/0o40 ],
      [ 0o110, -0o60, 0o163/0o100, 0o30, 0o3/0o40 ], [ -0o70, 0o110, 0o14/0o10, 0o30, 0o3/0o40 ],
      [ 0o100, 0o110, 0o155/0o100, 0o30, 0o5/0o100 ], [ -0o130, 0o10, 0o55/0o40, 0o30, 0o1/0o10 ],
    ];
    const N = fiksitaj.length + 0o60;
    const haxekuxa = new Float32Array(N * 3);
    const hatk2ni = new Float32Array(N);
    const grandoj = new Float32Array(N);
    const opakecoj = new Float32Array(N);
    const rapidoj = new Float32Array(N);
    for ( let i = 0; i < N; i++ ) {
      let x, z, y, p6zukani, op, rapido;
      if ( i < fiksitaj.length ) {
        [ x, z, y, p6zukani, op ] = fiksitaj[i];
        rapido = 0o15/0o40 + Math.random() * 0o10/0o10;
      } else {
        const a = Math.random() * Math.PI * 2;
        const r = 0o130 + Math.random() * 0o300;
        x = Math.cos(a) * r; z = Math.sin(a) * r;
        y = alteco(x, z) + 0o4/0o10 + Math.random() * 3;
        p6zukani = 0o60 + Math.random() * 0o130;
        op = 0o1/0o10 + Math.random() * 0o5/0o40;
        rapido = 0o15/0o100 + Math.random() * 0o4/0o10;
      }
      haxekuxa[i * 3] = x; haxekuxa[i * 3 + 1] = y; haxekuxa[i * 3 + 2] = z;
      grandoj[i] = p6zukani;
      opakecoj[i] = op;
      rapidoj[i] = rapido;
      hatk2ni[i] = Math.random();
    }
    const geometrio = new THREE.BufferGeometry();
    geometrio.setAttribute("position", new THREE.BufferAttribute(haxekuxa, 3));
    geometrio.setAttribute("aSeed", new THREE.BufferAttribute(hatk2ni, 1));
    geometrio.setAttribute("aGrando", new THREE.BufferAttribute(grandoj, 1));
    geometrio.setAttribute("aOpakeco", new THREE.BufferAttribute(opakecoj, 1));
    geometrio.setAttribute("aRapido", new THREE.BufferAttribute(rapidoj, 1));
    const uTime = { value: 0 };
    const pukek = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, fog: false,
      uniforms: {
        uTime,
        uMap: { value: nebulaCac2sex },
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
    const n2k = new THREE.Points(geometrio, pukek);
    n2k.frustumCulled = false;
    qena.add(n2k);
    return { n2k, uTime };
  } )();
  await raporti();

  // ⟪ កតេណូផរ 📃 ⟫
  const hapaga = vepaqHapagan(qena, 0o30, riveroZ, riveraAkvaVem2,
    { x: LAGO_X, z: lagoZ(), r: LAGO_RZ, vem2: lagoVem2() });

  // ⟨ រុក្ខជាតិរឹង 📃 ⟩
  const trunkaR = 0o5/0o20;
  for ( const t of arboj ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of hataksal ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of tlexlefhxakaij ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of montajHalam2v ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of montajHataksal ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of neHalam2v ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of neHataksal ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of lagArboj ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of lagHataksal ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of lagTlexlefhxakaij ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const r of likenSxtonoj ) kolizioj.push({ x: r.x, z: r.z, r: r.s });
  for ( const r of montajHat6keq ) kolizioj.push({ x: r.x, z: r.z, r: r.s });
  for ( const r of neHat6keq ) kolizioj.push({ x: r.x, z: r.z, r: r.s });
  const fHasost2cel2sai = so3akakHasost2cel2sai as [ number, number ][][];
  for ( const c2q of fHasost2cel2sai ) {
    for ( let k = 0; k < c2q.length; k++ ) {
      const [ x, z ] = c2q[k];
      kolizioj.push({ x, z, r: 0o3/0o20 });
    }
  }

  // ⟪ ផេត្រេលព្រិល 📃 ⟫
  const hatemek = vepaqHatemekn(qena, 0o20, alteco);
  await raporti();

  // ⟪ ការកំណត់ NPC 📃 ⟫
  const VESTA_LISTO: Vesto[] = VESTOJ;

  const npcZonoj: { x: number; z: number }[] = [];
  for ( let j = 0; j < SKULPTA_N; j++ ) {
    for ( let i = 0; i < SKULPTA_N; i++ ) {
      const x = SKULPTA_ORIGINO[0] + i * SKULPTA_PASO;
      const z = SKULPTA_ORIGINO[1] + j * SKULPTA_PASO;
      if ( ( skulptitaPaga(x, z) & 4 ) === 0 ) continue;
      if ( akvo(x, z) ) continue;
      npcZonoj.push({ x, z });
    }
  }

  const NPCLOKOJ: [ number, number ][] = [];
  const npcoj: Figuro[] = [];
  let provoj = 0;
  while ( npcoj.length < 0o230 && provoj < 0o2000 && npcZonoj.length > 0 ) {
    provoj++;
    const raqa = npcZonoj[( hazardo() * npcZonoj.length ) | 0];
    const sX = raqa.x + ( hazardo() - 0o1/0o2 ) * 0o3;
    const sZ = raqa.z + ( hazardo() - 0o1/0o2 ) * 0o3;
    if ( ekskluziviRiveron(sX, sZ) || ekskluziviPaqn(sX, sZ, 3) ) continue;
    const fig = vepaqFiguron(VESTA_LISTO[npcoj.length % VESTA_LISTO.length], hazardo() < 0o1/0o4 ? "haroLonga" : "haroMalalta");
    const h = alteco(sX, sZ);
    fig.group.position.set(sX, h, sZ);
    fig.hejmo.set(sX, h, sZ);
    fig.celo.set(sX, h, sZ);
    fig.atendo = hazardo() * 4;
    fig.rapido = 0o55/0o100 + hazardo() * 0o4/0o10;
    qena.add(fig.group);
    npcoj.push(fig);
    NPCLOKOJ.push([ sX, sZ ]);
  }
  await raporti();

  // ⟪ វត្ថុដាក់ ( ឧបករណ៍វត្ថុនៃឧបករណ៍ឆ្លាក់ ) 📃 ⟫
  const kanuoj: Kanoto[] = [];
  const xipo = vepaqMetitajnObjektojn(qena, OBJEKTOJ,
    alteco, akvo, akvaVem2, hapaga, hatemek, npcoj, kanuoj, oraMaterialo, eniraMaterialo,
    selektajxoj);
  const stacioSxipo = cefa.vepaqPudalj.find(s => s.type === "stacioxipo");
  if ( stacioSxipo && xipo ) stacioSxipo.flugoY = xipo.group.position.y;
  await raporti();

  // ⟪ ប្រព័ន្ធខាងក្នុង 📃 ⟫
  const internaSistemo: InternaSistemo = kf2InternanSistemon();

  // ⟨ ការវិភាគសម្រាប់ឧបករណ៍វាស់ 📏 ⟩ ៖ វាលកម្ពស់ផ្លូវ , ចំណុចភ្ជាប់ និងនិយមន័យផ្លូវ
  // ដែលសាងសង់ពិត ។ ឧបករណ៍វាស់អានវាដើម្បីវាស់ជាមួយពិភពលោកពិត ,
  // ដូច្នេះការវាស់និងហ្គេមអានលេខតែមួយ ។ 📃 ⟩
  ( globalThis as any ).__kaxteDiagnostiko = {
    k6h6Alteco, haveb6kek: k21eHaveb6kek, difinoj: k21eDifinoj, bazaK6h6Alteco,
  };

  return {
    vepaqPudalj, kolizioj, qakaj2Kolizioj, selektajxoj, vepaqGrupoj,
    vojSpecimenoj, placajNodoj,    riverData, riveroNordOrienta, lago, skulptaAkvo, hapaga, hatemek, lampSistemo,
    nebulSistemo, kanuoj, tlexlefp2saiBeroj, npcoj, internaSistemo, xipo, vojDifinoj: k21eDifinoj, vojDuonLargho: ( _g: number ) => 0o7/0o10,
    NPCLOKOJ, VESTA_LISTO,
  };
}
