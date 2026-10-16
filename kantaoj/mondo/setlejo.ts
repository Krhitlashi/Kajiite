// ≺⧼ ទីក្រុង និងផ្លូវ 🏙️ ⧽≻
// បង្កើតអ្វីដែលមនុស្សសាងសង់ ពីគ្រាប់ពូជ និងពីដីដែលបានបង្កើតរួច ។
// ទីក្រុងមួយសំខាន់ ក្រុងតូចមួយពេលខ្លះ ផ្លូវទៅចំណត ផ្លូវជនបទ ចំណត
// និងវត្ថុដែលបានដាក់ ( កប៉ាល់អវកាស ទូកកាណូ ចង្កៀង ) ។ ឯកសារនេះសុទ្ធ
// ( គ្មាន DOM គ្មានផ្ទុកក្នុងម៉ាស៊ីន ) ដូច្នេះការធ្វើតេស្តខាងក្រៅអាចនាំចូលបាន ។
// រូបរាងទាំងអស់ស្របនឹងអ្វីដែលក្រឡាទីក្រុងរបស់ហ្គេមអាន
// ( kantaoj/mondo/krado ) និងនឹងឧបករណ៍ឆ្លាក់ដី ។
import type { SkulptaUrbo, SkulptaVojo, SkulptaPlatformo,
  MetitaObjekto } from "./urbo/tipoj.js";
import type { GeneritaTero } from "./generilo.js";
import { kreiKradanPlanon } from "./krado/plano.js";
import { subSemo } from "./semo.js";

// ⟨ ឆានែលគ្រាប់ពូជរង 📃 ⟩
const KANALO_EJOJ = 0o1;
const KANALO_URBOJ = 0o2;
const KANALO_KROMPOJ = 0o3;
const KANALO_ORNAMOJ = 0o4;

// ⟨ ថេរិននៃការជ្រើសទីតាំង 📃 ⟩
const EJA_PASXO = 0o40;
const EJA_MARGXENO = 0o400;
const EJA_KRUDEJO = 0o100;
const EJA_DISTANCO_DE_RANDO = 0o240;
const EJA_KRUDA_ALTO = 0o12;
const EJA_SEKURA_PROFUNDO = 0o6;
const EJA_MONTA_LIMO = 0o21;

// ⟨ ថេរិននៃទីក្រុង 📃 ⟩
const URBA_PASXO_UNU = 0o30;
const URBA_PASXO_KVAR = 0o40;

// ⟨ ថេរិននៃចំណត និងផ្លូវ 📃 ⟩
const DOKA_DISTANCO_MIN = 0o100;
const DOKA_DISTANCO_MAKS = 0o700;
const DOKA_APARTO = 0o200;
const DOKA_KVANTO = 0o3;
const DOKA_PROFUNDO = 0o20;
const DOKA_ALTERANDO = 0o12;

// ⟨ ថេរិននៃចង្កៀង និងទូក ់ 📃 ⟩
const LAMPA_PASXO = 0o60;
const LAMPA_ALTERANDO = 0o6;
const KANUOTA_DISTANCO = 0o10;

/*អ្វីដែលមនុស្សសាងសង់នៅក្នុងពិភពលោកមួយ
    @param urboj ( SkulptaUrbo[] ) - ទីក្រុង និងក្រុងតូច
    @param vojoj ( SkulptaVojo[] ) - ផ្លូវកម្រិតពិភពលោក
    @param dokoj ( SkulptaPlatformo[] ) - ចំណត
    @param objektoj ( MetitaObjekto[] ) - វត្ថុដាក់ */
export interface GeneritaSetlejo {
  urboj: SkulptaUrbo[];
  vojoj: SkulptaVojo[];
  dokoj: SkulptaPlatformo[];
  objektoj: MetitaObjekto[];
}

/*លក្ខខណ្ឌនៃពិភពលោកសម្រាប់ការជ្រើសទីតាំង
    @param nivelo ( number ) - កម្រិតទឹក
    @param enFormo ( ( x , z ) => boolean ) - តើចំណុចនៅក្នុងរូបរាងពិភពលោក
    @param randoDeFormo ( ( x , z ) => number ) - ចម្ងាយទៅគែមរូបរាង ( ខាងក្នុងអវិជ្ជមាន ) */
export interface SetlejajOpcioj {
  nivelo: number;
  enFormo: ( x: number, z: number ) => boolean;
  randoDeFormo: ( x: number, z: number ) => number;
}

// ⟨ ជំនួយខាងដី 📃 ⟩

/*ភាពមិនស្មើនៃដីក្នុងរង្វង់មួយ
    @param tero ( GeneritaTero ) - ដីដែលបានបង្កើត
    @param x,z ( number ) - ចំណុចកណ្តាល
    @param duono ( number ) - កាំនៃការវាស់
@returns krudo ( number ) - ផលខ្ពស់បំផុតដកទាបបំផុត */
function krudecoDe(
  tero: GeneritaTero, x: number, z: number, duono: number,
): number {
  let plejMalalta = Infinity, plejAlta = -Infinity;
  for ( const [ dx, dz ] of [ [ 0, 0 ], [ duono, 0 ], [ -duono, 0 ], [ 0, duono ], [ 0, -duono ],
    [ duono, duono ], [ -duono, duono ], [ duono, -duono ], [ -duono, -duono ] ] ) {
    const h = tero.alteco(x + dx, z + dz);
    if ( h < plejMalalta ) plejMalalta = h;
    if ( h > plejAlta ) plejAlta = h;
  }
  return plejAlta - plejMalalta;
}

/*តើចំណុចនៅលើគោក ឆ្ងាយពីទឹក
    @param tero ( GeneritaTero ) - ដីដែលបានបង្កើត
    @param nivelo ( number ) - កម្រិតទឹក
    @param x,z ( number ) - ចំណុច
@returns sekura ( boolean ) */
function surSekuraTero(
  tero: GeneritaTero, nivelo: number, x: number, z: number,
): boolean {
  return tero.alteco(x, z) > nivelo + EJA_SEKURA_PROFUNDO
    && Math.max(krudecoDe(tero, x, z, EJA_KRUDEJO), 0) < EJA_KRUDA_ALTO;
}

/*ពិន្ទុនៃទីតាំង ។ ខ្ពស់ = ល្អ , ដីរាប នៅលើគោក មិនខ្ពស់ជាងភ្នំ ។
    @param tero ( GeneritaTero ) - ដីដែលបានបង្កើត
    @param opcioj ( SetlejajOpcioj ) - លក្ខខណ្ឌនៃពិភពលោក
    @param x,z ( number ) - ចំណុច
    @param hazardo ( number ) - ការរំកិលតាមគ្រាប់ពូជ
@returns punkto ( number ) */
function punktoDeEjo(
  tero: GeneritaTero, opcioj: SetlejajOpcioj, x: number, z: number, hazardo: number,
): number {
  const h = tero.alteco(x, z);
  const sup = h - opcioj.nivelo;
  const krudo = krudecoDe(tero, x, z, EJA_KRUDEJO);
  let punkto = -krudo * 0o4;
  if ( sup < EJA_SEKURA_PROFUNDO ) punkto -= ( EJA_SEKURA_PROFUNDO - sup ) * 0o12;
  if ( h > EJA_MONTA_LIMO ) punkto -= ( h - EJA_MONTA_LIMO ) * 0o4;
  punkto += hazardo;
  return punkto;
}

/*រកទីតាំងសម្រាប់ការតាំងទីក្រុង
    @param semo ( number ) - គ្រាប់ពូជរង
    @param tero ( GeneritaTero ) - ដីដែលបានបង្កើត
    @param opcioj ( SetlejajOpcioj ) - លក្ខខណ្ឌនៃពិភពលោក
    @param malpermesoj ( [ number , number , number ][] ) - រង្វង់ដែលហាម ( x , z , r )
@returns ejo ( { x, z } | null ) */
function trovuEjon(
  semo: number, tero: GeneritaTero, opcioj: SetlejajOpcioj,
  malpermesoj: [ number, number, number ][],
): { x: number; z: number } | null {
  const bruo = ( i: number ): number =>
    ( ( subSemo(semo, i) % 0o1000 ) / 0o1000 - 0o1/0o2 ) * 0o4;
  let plejBona: { x: number; z: number } | null = null;
  let plejPunkto = -Infinity;
  let rezervo: { x: number; z: number } | null = null;
  let rezervaPunkto = -Infinity;
  let i = 0;
  for ( let z = -EJA_MARGXENO; z <= EJA_MARGXENO; z += EJA_PASXO ) {
    for ( let x = -EJA_MARGXENO; x <= EJA_MARGXENO; x += EJA_PASXO ) {
      i++;
      if ( !opcioj.enFormo(x, z) ) continue;
      if ( opcioj.randoDeFormo(x, z) > -EJA_DISTANCO_DE_RANDO ) continue;
      let proksima = false;
      for ( const [ mx, mz, mr ] of malpermesoj ) {
        if ( Math.hypot(x - mx, z - mz) < mr ) { proksima = true; break; }
      }
      if ( proksima ) continue;
      const sekura = surSekuraTero(tero, opcioj.nivelo, x, z);
      const punkto = punktoDeEjo(tero, opcioj, x, z, bruo(i));
      if ( sekura && punkto > plejPunkto ) { plejPunkto = punkto; plejBona = { x, z }; }
      if ( punkto > rezervaPunkto ) { rezervaPunkto = punkto; rezervo = { x, z }; }
    }
  }
  return plejBona ?? rezervo;
}

// ⟨ ជ្រុងផ្លូវនៃទីក្រុង 📃 ⟩
// ផ្លូវរបស់ទីក្រុងរត់ចន្លោះប្លុក ដូច្នេះបន្ទាត់ផ្លូវស្ថិតនៅពាក់កណ្តាលរវាងក្រឡា ។
// ផ្លូវពិភពលោក ( ទៅចំណត , ទៅក្រុងតូច , ផ្លូវជនបទ ) ចេញពីជ្រុងទាំងនេះ
// ដូច្នេះវាតភ្ជាប់ទៅបណ្តាញផ្លូវរបស់ទីក្រុងដោយធម្មជាតិ ។

/*ជ្រុងផ្លូវទាំងអស់នៃទីក្រុង , ជាមួយទិសដែលផ្លូវរត់បន្ត ។ ជ្រុងដែលផ្លូវអត់បន្ត
  ទៅទិសណាមួយ គឺជាជ្រុងរឹម ដែលផ្លូវពិភពលោកអាចចេញបាន ។ ផែនការក្រឡាមកពី
  កូដតែមួយដែលហ្គេមប្រើ ( krado/plano.ts ) ដូច្នេះជ្រុងស្របនឹងផ្លូវពិត ។
    @param urbo ( SkulptaUrbo ) - ទីក្រុង
@returns anguloj ( { x, z, liberaj }[] ) - ជ្រុង ( កូអរដោនេពិភពលោក ) និងទិសទំនេរ */
function angulojDeUrbo( urbo: SkulptaUrbo ): { x: number; z: number; liberaj: [ number, number ][] }[] {
  const plano = kreiKradanPlanon(
    { arangxaGrando: urbo.arangxaGrando, blokaGrando: urbo.blokaGrando },
    undefined, urbo.aldonajBlokoj ?? []);
  const NS = plano.vojoj.filter(v => v.orient === "NS");
  const EW = plano.vojoj.filter(v => v.orient === "EW");
  const EPS = 0o1/0o100;
  const anguloj: { x: number; z: number; liberaj: [ number, number ][] }[] = [];
  const viditaj = new Set<string>();
  for ( const ns of NS ) {
    for ( const ew of EW ) {
      const lx = ns.poz, lz = ew.poz;
      if ( lz < ns.de - EPS || lz > ns.al + EPS ) continue;
      if ( lx < ew.de - EPS || lx > ew.al + EPS ) continue;
      const k = lx + "," + lz;
      if ( viditaj.has(k) ) continue;
      viditaj.add(k);
      // ⟨ តើផ្លូវរត់បន្តទៅទិសណា ។ ទិសដែលអត់បន្តគឺទំនេរ ។ 📃 ⟩
      const liberaj: [ number, number ][] = [];
      if ( !NS.some(v => Math.abs(v.poz - lx) < EPS && v.al > lz + EPS) ) liberaj.push([ 0, 1 ]);
      if ( !NS.some(v => Math.abs(v.poz - lx) < EPS && v.de < lz - EPS) ) liberaj.push([ 0, -1 ]);
      if ( !EW.some(v => Math.abs(v.poz - lz) < EPS && v.al > lx + EPS) ) liberaj.push([ 1, 0 ]);
      if ( !EW.some(v => Math.abs(v.poz - lz) < EPS && v.de < lx - EPS) ) liberaj.push([ -1, 0 ]);
      if ( !liberaj.length ) continue;
      anguloj.push({ x: urbo.ofsX + lx, z: urbo.ofsZ + lz, liberaj });
    }
  }
  return anguloj;
}

/*ជ្រុងផ្លូវសម្រាប់ផ្លូវពិភពលោក ។ ជ្រើសជ្រុងជិតគោលដៅបំផុតដែលមានទិសទំនេរ
  ឆ្ពោះទៅគោលដៅ ដូច្នេះផ្លូវចេញពីទីក្រុងភ្លាម ។ ជ្រុងដែលផ្លូវផ្សេងប្រើរួចហើយ
  មានអាទិភាពទាប ដើម្បីកុំឱ្យផ្លូវច្រើនចេញពីជ្រុងតែមួយ ។ បើគ្មានជ្រុងបែបនោះ
  ( ចំណតក្នុងទីក្រុង ) យកជ្រុងជិតបំផុត ។ កុំចេញពីកណ្តាលទីក្រុង , នោះផ្លូវកាត់សំណង់ ។
    @param anguloj ( { x, z, liberaj }[] ) - ជ្រុងផ្លូវ
    @param celo ( { x , z } ) - គោលដៅ
    @param uzitaj ( Set<string> ) - ជ្រុងដែលផ្លូវផ្សេងបានប្រើ
@returns angulo ( { x , z } | null ) - ជ្រុង ឬ null */
function komencaAngulo(
  anguloj: { x: number; z: number; liberaj: [ number, number ][] }[],
  celo: { x: number; z: number },
  uzitaj: Set<string>,
): { x: number; z: number } | null {
  let plejBona: { x: number; z: number } | null = null;
  let plejBonaLibera: { x: number; z: number } | null = null;
  let plejBonaNova: { x: number; z: number } | null = null;
  let plejBonaLiberaNova: { x: number; z: number } | null = null;
  let plejDist = Infinity, plejDistLibera = Infinity;
  let plejDistNova = Infinity, plejDistLiberaNova = Infinity;
  for ( const a of anguloj ) {
    const dx = celo.x - a.x, dz = celo.z - a.z;
    const dist = Math.hypot(dx, dz);
    if ( dist < 0o1 ) continue;
    const nova = !uzitaj.has(a.x + "," + a.z);
    if ( dist < plejDist ) { plejDist = dist; plejBona = { x: a.x, z: a.z }; }
    if ( nova && dist < plejDistNova ) { plejDistNova = dist; plejBonaNova = { x: a.x, z: a.z }; }
    let libera = false;
    for ( const [ lx, lz ] of a.liberaj ) {
      if ( ( lx * dx + lz * dz ) / dist > 0o1/0o2 ) { libera = true; break; }
    }
    if ( libera && dist < plejDistLibera ) {
      plejDistLibera = dist; plejBonaLibera = { x: a.x, z: a.z };
    }
    if ( libera && nova && dist < plejDistLiberaNova ) {
      plejDistLiberaNova = dist; plejBonaLiberaNova = { x: a.x, z: a.z };
    }
  }
  return plejBonaLiberaNova ?? plejBonaNova ?? plejBonaLibera ?? plejBona;
}

// ⟨ ចំណត និងផ្លូវ 📃 ⟩

/*រកចំណុចច្រាំងទឹកជិតទីក្រុង ។ ចំណុចច្រាំងគឺក្រឡាទឹកដែលមានក្រឡាគោក
  ជាប់ , ដូច្នេះចំណតអាចឈរនៅគែមទឹក ។
    @param tero ( GeneritaTero ) - ដីដែលបានបង្កើត
    @param opcioj ( SetlejajOpcioj ) - លក្ខខណ្ឌនៃពិភពលោក
    @param centro ( { x , z } ) - កណ្តាលទីក្រុង
    @param paso ( number ) - ទំហំក្រឡាស្កេន
@returns kronoj ( { x, z, nx, nz }[] ) - ចំណុចច្រាំង និងទិសទៅទឹក */
function troviCxefojn(
  tero: GeneritaTero, opcioj: SetlejajOpcioj, centro: { x: number; z: number }, paso: number,
): { x: number; z: number; nx: number; nz: number; dist: number }[] {
  const trovajxoj: { x: number; z: number; nx: number; nz: number; dist: number }[] = [];
  const montro = ( x: number, z: number ): number => tero.alteco(x, z) - opcioj.nivelo;
  for ( let z = -EJA_MARGXENO; z <= EJA_MARGXENO; z += paso ) {
    for ( let x = -EJA_MARGXENO; x <= EJA_MARGXENO; x += paso ) {
      if ( !opcioj.enFormo(x, z) ) continue;
      if ( montro(x, z) >= -0o1/0o10 ) continue;
      const dist = Math.hypot(x - centro.x, z - centro.z);
      if ( dist < DOKA_DISTANCO_MIN || dist > DOKA_DISTANCO_MAKS ) continue;
      // ⟨ ទិសទៅទឹក , ជាមធ្យមនៃក្រឡាជិតខាងដែលលិចទឹក 📃 ⟩
      let nx = 0, nz = 0, akvaj = 0;
      for ( const [ dx, dz ] of [ [ 1, 0 ], [ -1, 0 ], [ 0, 1 ], [ 0, -1 ] ] ) {
        if ( montro(x + dx * paso, z + dz * paso) < 0 ) { nx += dx; nz += dz; akvaj++; }
      }
      if ( akvaj === 0 ) continue;
      const longo = Math.hypot(nx, nz) || 1;
      trovajxoj.push({ x, z, nx: nx / longo, nz: nz / longo, dist });
    }
  }
  return trovajxoj;
}

/*ជ្រើសចំណតដែលឆ្ងាយពីគ្នា ហើយផ្លូវទៅរកគោកស្រួល
    @param kandidatoj ( { x, z, nx, nz, dist }[] ) - ចំណុចច្រាំង
    @param tero ( GeneritaTero ) - ដីដែលបានបង្កើត
    @param opcioj ( SetlejajOpcioj ) - លក្ខខណ្ឌនៃពិភពលោក
    @param centro ( { x , z } ) - កណ្តាលទីក្រុង
    @param kvanto ( number ) - ចំនួនចំណតដែលចង់បាន
@returns elektitaj - ចំណុចដែលបានជ្រើស */
function elektiCxefojn(
  kandidatoj: { x: number; z: number; nx: number; nz: number; dist: number }[],
  tero: GeneritaTero, opcioj: SetlejajOpcioj, centro: { x: number; z: number }, kvanto: number,
): { x: number; z: number; nx: number; nz: number }[] {
  const ordoj = kandidatoj.map(( k ) => {
    // ⟨ ផ្លូវកាន់តែគោក កាន់តែល្អ , ជិតទីក្រុងកាន់តែល្អ 📃 ⟩
    const al = Math.hypot(centro.x - k.x, centro.z - k.z);
    const pasoj = Math.max(0o2, Math.round(al / DOKA_ALTERANDO));
    let akvaj = 0;
    for ( let s = 1; s <= pasoj; s++ ) {
      const t = s / pasoj;
      if ( tero.alteco(k.x + ( centro.x - k.x ) * t, k.z + ( centro.z - k.z ) * t) < opcioj.nivelo ) akvaj++;
    }
    return { k, punkto: -akvaj * 0o10 - k.dist };
  });
  ordoj.sort(( a, b ) => b.punkto - a.punkto);
  const elektitaj: { x: number; z: number; nx: number; nz: number }[] = [];
  for ( const o of ordoj ) {
    if ( elektitaj.length >= kvanto ) break;
    const k = o.k;
    let proksima = false;
    for ( const e of elektitaj ) if ( Math.hypot(e.x - k.x, e.z - k.z) < DOKA_APARTO ) { proksima = true; break; }
    if ( proksima ) continue;
    elektitaj.push({ x: k.x, z: k.z, nx: k.nx, nz: k.nz });
  }
  return elektitaj;
}

/*បង្កើតអ្វីដែលមនុស្សសាងសង់ទាំងអស់ពីគ្រាប់ពូជ
    @param semo ( number ) - លេខគ្រាប់ពូជមេ
    @param tero ( GeneritaTero ) - ដីដែលបានបង្កើតពីគ្រាប់ពូជតែមួយ
    @param opcioj ( SetlejajOpcioj ) - លក្ខខណ្ឌនៃពិភពលោក
@returns setlejo ( GeneritaSetlejo ) */
export function generiSetlejon(
  semo: number, tero: GeneritaTero, opcioj: SetlejajOpcioj,
): GeneritaSetlejo {
  const sEjoj = subSemo(semo, KANALO_EJOJ);
  const sUrboj = subSemo(semo, KANALO_URBOJ);
  const sKrompoj = subSemo(semo, KANALO_KROMPOJ);
  const sOrnamoj = subSemo(semo, KANALO_ORNAMOJ);

  const urboj: SkulptaUrbo[] = [];
  const vojoj: SkulptaVojo[] = [];
  const dokoj: SkulptaPlatformo[] = [];
  const objektoj: MetitaObjekto[] = [];

  // ⟪ ទីក្រុងសំខាន់ 📃 ⟫
  const cefa = trovuEjon(sEjoj, tero, opcioj, []);
  if ( !cefa ) return { urboj, vojoj, dokoj, objektoj };

  const cefaGrando = 0o2 + sUrboj % 0o2;
  const cefaPaso = URBA_PASXO_UNU;
  urboj.push({
    nomo: "Ĉefa",
    arangxaGrando: cefaGrando,
    blokaGrando: "unu",
    ofsX: cefa.x,
    ofsZ: cefa.z,
    keuxfhxeso: sUrboj % 0o3 !== 0,
    lampoj: true,
    // ⟨ ស្ថានីយយានអវកាសនៅចុងខាងជើង 📃 ⟩
    // ⟨ កូអរដោនេទាក់ទងនឹងកណ្តាលទីក្រុង ( ដូចឧបករណ៍ឆ្លាក់ដី ) , មិនមែនកូអរដោនេ
    // ពិភពលោក , ក្រឡាទីក្រុងផ្គុំវាជាមួយអុហ្វសិតរបស់វា ។ 📃 ⟩
    aldonajBlokoj: [
      {
        x: 0, z: ( cefaGrando + 0o1 ) * cefaPaso,
        tipo: "sanktejo", rot: Math.PI, sub: "centro", stacia: true, konektita: true,
      },
    ],
  });
  objektoj.push({ x: cefa.x, z: cefa.z + ( cefaGrando + 0o1 ) * cefaPaso, speco: "spacosxipo" });

  // ⟨ ក្រុងតូច , ពេលខ្លះ 📃 ⟫
  if ( sUrboj % 0o4 === 0o1 ) {
    const dua = trovuEjon(subSemo(semo, KANALO_EJOJ + 0o20), tero, opcioj,
      [ [ cefa.x, cefa.z, 0o400 ] ]);
    if ( dua ) {
      urboj.push({
        nomo: "Dua",
        arangxaGrando: 0o2 + ( sUrboj >>> 0o4 ) % 0o2,
        blokaGrando: "kvar",
        ofsX: dua.x,
        ofsZ: dua.z,
        keuxfhxeso: false,
        lampoj: true,
        aldonajBlokoj: [],
      });
    }
  }

  // ⟪ ចំណត និងផ្លូវទៅចំណត 📃 ⟫
  const centro = urboj[0];
  const anguloj = angulojDeUrbo(centro);
  // ⟨ ជ្រុងដែលផ្លូវមួយបានចេញរួច , ផ្លូវបន្ទាប់ជ្រើសជ្រុងផ្សេង ដើម្បីកុំឲ្យជាប់គ្នា 📃 ⟩
  const uzitajAnguloj = new Set<string>();
  const registri = ( a: { x: number; z: number } ): void => {
    uzitajAnguloj.add(a.x + "," + a.z);
  };
  const kronoj = troviCxefojn(tero, opcioj, { x: centro.ofsX, z: centro.ofsZ }, 0o4);
  const cxefoj = elektiCxefojn(kronoj, tero, opcioj, { x: centro.ofsX, z: centro.ofsZ },
    DOKA_KVANTO);
  for ( let i = 0; i < cxefoj.length; i++ ) {
    const k = cxefoj[i];
    // ⟨ ចំណតចង្អុលទៅគោក , ហើយលាតទៅទឹក 📃 ⟩
    const rotacio = Math.atan2(-k.nx, -k.nz);
    dokoj.push({ x: k.x, z: k.z, profundo: DOKA_PROFUNDO, rotacio });
    const landaX = k.x + Math.sin(rotacio) * ( DOKA_PROFUNDO / 0o2 );
    const landaZ = k.z + Math.cos(rotacio) * ( DOKA_PROFUNDO / 0o2 );
    const akvaX = k.x - Math.sin(rotacio) * KANUOTA_DISTANCO;
    const akvaZ = k.z - Math.cos(rotacio) * KANUOTA_DISTANCO;
    // ⟨ ផ្លូវពីជ្រុងផ្លូវក្បែរចំណត ទៅចំណត ។ ការចេញពីជ្រុងធ្វើឱ្យផ្លូវតភ្ជាប់
    // ទៅបណ្តាញផ្លូវទីក្រុងភ្លាម ។ បើរកជ្រុងមិនឃើញ ចេញពីកណ្តាលទីក្រុង ។ 📃 ⟩
    const komenco = komencaAngulo(anguloj, { x: landaX, z: landaZ }, uzitajAnguloj)
      ?? { x: centro.ofsX, z: centro.ofsZ };
    registri(komenco);
    vojoj.push({
      nomo: "Kajo " + ( i + 0o1 ).toString(8),
      larĝo: 0o340/0o100,
      punktoj: [
        [ komenco.x, komenco.z ],
        [ komenco.x + ( landaX - komenco.x ) * 0o1/0o4, komenco.z + ( landaZ - komenco.z ) * 0o1/0o4 ],
        [ komenco.x + ( landaX - komenco.x ) * 0o3/0o4, komenco.z + ( landaZ - komenco.z ) * 0o3/0o4 ],
        [ landaX, landaZ ],
      ],
    });
    // ⟨ ទូកកាណូនៅមុខចំណត 📃 ⟩
    if ( tero.alteco(akvaX, akvaZ) < opcioj.nivelo ) {
      objektoj.push({ x: akvaX, z: akvaZ, speco: "kanuo", rotacio: rotacio + Math.PI });
    }
  }

  // ⟪ ផ្លូវភ្ជាប់ទីក្រុង 📃 ⟫
  // បើមានក្រុងតូច , ផ្លូវភ្ជាប់ទីក្រុងទាំងពីរ ។ បើអត់ , ផ្លូវជនបទទៅចំណុច
  // ឆ្ងាយដែលនៅលើគោក , ដោយជ្រើសពីចំណុចបេក្ខជនតាមគ្រាប់ពូជ ។
  const ejoDeAvenuo = (): { x: number; z: number } | null => {
    let plejBona: { x: number; z: number } | null = null;
    let plejPunkto = -Infinity;
    for ( let a = 0; a < 0o20; a++ ) {
      const h = subSemo(sKrompoj, a);
      const angulo = ( h % 0o1000 ) / 0o1000 * Math.PI * 0o2;
      const distanco = 0o300 + ( h >>> 0o10 ) % 0o300;
      const x = centro.ofsX + Math.cos(angulo) * distanco;
      const z = centro.ofsZ + Math.sin(angulo) * distanco;
      if ( !opcioj.enFormo(x, z) ) continue;
      if ( opcioj.randoDeFormo(x, z) > -0o100 ) continue;
      const alto = tero.alteco(x, z);
      if ( alto < opcioj.nivelo + EJA_SEKURA_PROFUNDO ) continue;
      if ( alto > EJA_MONTA_LIMO ) continue;
      // ⟨ ចម្ងាយធំល្អ , ដីទាបល្អ 📃 ⟩
      const punkto = distanco - alto * 0o10;
      if ( punkto > plejPunkto ) { plejPunkto = punkto; plejBona = { x, z }; }
    }
    return plejBona;
  };

  const celo = urboj.length >= 0o2
    ? { x: urboj[1].ofsX, z: urboj[1].ofsZ }
    : ejoDeAvenuo();
  if ( celo ) {
    // ⟨ ផ្លូវជនបទក៏ចេញពីជ្រុងផ្លូវដែរ ។ បើរកមិនឃើញ ចេញពីកណ្តាលទីក្រុង ។ 📃 ⟩
    const ekiro = komencaAngulo(anguloj, celo, uzitajAnguloj)
      ?? { x: centro.ofsX, z: centro.ofsZ };
    registri(ekiro);
    const mezX = ( ekiro.x + celo.x ) / 0o2;
    const mezZ = ( ekiro.z + celo.z ) / 0o2;
    // ⟨ ពត់ផ្លូវបន្តិចតាមគ្រាប់ពូជ 📃 ⟩
    const flanko = ( sKrompoj % 0o2 ) === 0 ? 0o1 : -0o1;
    const bendX = mezX - ( celo.z - ekiro.z ) * 0o3/0o100 * flanko;
    const bendZ = mezZ + ( celo.x - ekiro.x ) * 0o3/0o100 * flanko;
    const punktoj: [ number, number ][] = [ [ ekiro.x, ekiro.z ] ];
    for ( const [ bx, bz ] of [ [ mezX, mezZ ], [ bendX, bendZ ] ] ) {
      if ( opcioj.enFormo(bx, bz) && tero.alteco(bx, bz) >= opcioj.nivelo ) punktoj.push([ bx, bz ]);
    }
    punktoj.push([ celo.x, celo.z ]);
    vojoj.push({ nomo: urboj.length >= 0o2 ? "Vojo inter urboj" : "Avenuo", larĝo: 0o340/0o100, punktoj });
  }

  // ⟪ ចង្កៀងតាមផ្លូវ 📃 ⟩
  for ( const vojo of vojoj ) {
    for ( let i = 0; i + 1 < vojo.punktoj.length; i++ ) {
      const [ ax, az ] = vojo.punktoj[i];
      const [ bx, bz ] = vojo.punktoj[i + 1];
      const longo = Math.hypot(bx - ax, bz - az);
      const pasoj = Math.max(0o1, Math.round(longo / LAMPA_PASXO));
      const nx = -( bz - az ) / ( longo || 1 ), nz = ( bx - ax ) / ( longo || 1 );
      for ( let s = 0; s <= pasoj; s++ ) {
        const t = s / pasoj;
        if ( i === 0 && s === 0 ) continue;
        const flanko = ( ( ( s + i ) & 1 ) === 0 ) ? 1 : -1;
        const x = ax + ( bx - ax ) * t + nx * LAMPA_ALTERANDO * flanko;
        const z = az + ( bz - az ) * t + nz * LAMPA_ALTERANDO * flanko;
        if ( !opcioj.enFormo(x, z) ) continue;
        if ( tero.alteco(x, z) < opcioj.nivelo + 0o1/0o2 ) continue;
        // ⟨ មួយចំណែកនៃចង្កៀងត្រូវលុបចោលក្នុងមួយពិភពលោក 📃 ⟩
        if ( ( sOrnamoj >>> ( ( s + i * 0o7 ) % 0o10 ) ) % 0o5 === 0 ) continue;
        objektoj.push({ x, z, speco: "hxeuxfoPlato", rotacio: Math.PI / 0o4 });
      }
    }
  }

  return { urboj, vojoj, dokoj, objektoj };
}
