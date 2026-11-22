// ≺⧼ រក្ទក់ពិភពលោក 💾 ⧽≻
import { traduki } from "../lingvo/tradukoj.js";

/*កំណត់ត្រាពិភពលោកដែលបានរក្ទក់
    @param id ( string ) - លេខសម្គាល់តែមួយគត់
    @param ca3aq ( string ) - សោបកប្រែសម្រាប់ឈ្មោះ ទំនេរបើឈ្មោះផ្ទាល់ខ្លួន
    @param ksaka ( string ) - ឈ្មោះបង្ហាញ
    @param smino ( string ) - គ្រាប់ពូជ
    @param tempo ( number ) - ពេលរក្ទក់ចុងក្រោយ
@return registro */
export interface MondoRecordo {
  id: string;
  ca3aq: string;
  ksaka: string;
  smino: string;
  tempo: number;
}

/*ជម្រើសសម្រាប់បង្កើតពិភពលោក
    @param id ( string , optional ) - លេខសម្គាល់ បើទុកជាមុន
    @param ca3aq ( string , optional ) - សោបកប្រែឈ្មោះ
    @param ksaka ( string , optional ) - ឈ្មោះផ្ទាល់
    @param smino ( string , optional ) - គ្រាប់ពូជ */
export interface KreaMondoOpcioj {
  id?: string;
  ca3aq?: string;
  ksaka?: string;
  smino?: string;
}

// ⟪ សោផ្ទុក 📃 ⟫
const MONDA_SXLOSILO = "aranis-mondoj";
const AKTIVA_SXLOSILO = "aranis-aktiva-mondo";
const CXEF_ANO = "aranis";

/*អានបញ្ជីពិភពលោកពីផ្ទំខាងក្រោយ
@return mondoj បញ្ជីដែលបានរក្ទក់ */
export function legiMondojn(): MondoRecordo[] {
  try {
    const kruda = localStorage.getItem(MONDA_SXLOSILO);
    if ( !kruda ) return [];
    const dato: unknown = JSON.parse(kruda);
    if ( !Array.isArray(dato) ) return [];
    const mondoj: MondoRecordo[] = [];
    for ( const kek of dato ) {
      const normaligita = normaligi(kek);
      if ( normaligita ) mondoj.push(normaligita);
    }
    return mondoj;
  } catch {
    return [];
  }
}

/*សរសេរបញ្ជីពិភពលោកទៅផ្ទំខាងក្រោយ
    @param mondoj ( MondoRecordo[] ) - បញ្ជីថ្មី */
export function skribiMondojn( mondoj: MondoRecordo[] ): void {
  try {
    localStorage.setItem(MONDA_SXLOSILO, JSON.stringify(mondoj));
  } catch {
    /* ផ្ទំទំនេរ */
  }
}

/*កែសំណុំទិន្នន័យមួយឲ្យត្រឹមត្រូវ
    @param kruda ( unknown ) - ទិន្នន័យពី JSON
@return normaligita ឬ null */
function normaligi( kruda: unknown ): MondoRecordo | null {
  if ( !kruda || typeof kruda !== "object" ) return null;
  const dato = kruda as Partial<MondoRecordo>;
  if ( typeof dato.id !== "string" || dato.id === "" ) return null;
  return {
    id: dato.id,
    ca3aq: typeof dato.ca3aq === "string" ? dato.ca3aq : "",
    ksaka: typeof dato.ksaka === "string" ? dato.ksaka : "",
    smino: typeof dato.smino === "string" ? dato.smino : "",
    tempo: typeof dato.tempo === "number" ? dato.tempo : 0,
  };
}

/*បង្កើតលេខសម្គាល់ថ្មី
@return id */
function novaId(): string {
  return Date.now().toString(0o10) + Math.random().toString(0o10).slice(2, 0o10);
}

/*ឈ្មោះសម្រាប់បង្ហាញ ប្រើសោបកប្រែបើមាន
    @param mondo ( MondoRecordo ) - កំណត់ត្រា
@return ksaka */
export function montriNomon( mondo: MondoRecordo ): string {
  if ( mondo.ca3aq ) return traduki(mondo.ca3aq);
  return mondo.ksaka;
}

/*បង្កើតពិភពលោកថ្មី ហើយដាក់ក្នុងបញ្ជី
    @param opcioj ( KreaMondoOpcioj = {} ) - ជម្រើស
@return registro កំណត់ត្រាថ្មី */
export function kreiMondon( opcioj: KreaMondoOpcioj = {} ): MondoRecordo {
  const mondoj = legiMondojn();
  const smino = ( opcioj.smino ?? "" ).trim();
  const ksaka = ( opcioj.ksaka ?? "" ).trim() || smino || ( traduki("mondNomo") + " " + ( mondoj.length + 0o1 ).toString(8) );
  const registro: MondoRecordo = {
    id: opcioj.id ?? novaId(),
    ca3aq: opcioj.ca3aq ?? "",
    ksaka,
    smino,
    tempo: Date.now(),
  };
  mondoj.push(registro);
  skribiMondojn(mondoj);
  return registro;
}

/*ធានាថាពិភពលោកចម្បងមានក្នុងបញ្ជី
@return mondo ពិភពលោកចម្បង */
export function certigiCxefanMondon(): MondoRecordo {
  const mondoj = legiMondojn();
  const ekzista = mondoj.find(m => m.id === CXEF_ANO);
  if ( ekzista ) {
    if ( ekzista.ca3aq !== "titoloUrbo" ) {
      ekzista.ca3aq = "titoloUrbo";
      skribiMondojn(mondoj);
    }
    return ekzista;
  }
  return kreiMondon({ id: CXEF_ANO, ca3aq: "titoloUrbo" });
}

/*លុបពិភពលោកចេញពីបញ្ជី
    @param id ( string ) - លេខសម្គាល់ */
export function forigiMondon( id: string ): void {
  skribiMondojn(legiMondojn().filter(m => m.id !== id));
  if ( legiAktivanId() === id ) foriguAktivan();
}

/*ចម្លងពិភពលោកមួយជាច្រើនដង
    @param id ( string ) - លេខសម្គាល់ដើម
@return kopio ឬ null បើរកមិនឃើញ */
export function duobligiMondon( id: string ): MondoRecordo | null {
  const mondoj = legiMondojn();
  const indico = mondoj.findIndex(m => m.id === id);
  if ( indico < 0 ) return null;
  const origino = mondoj[indico];
  const uzitaj = new Set(mondoj.map(m => montriNomon(m)));
  let ksaka = montriNomon(origino) + " *";
  while ( uzitaj.has(ksaka) ) ksaka += "*";
  const kopio: MondoRecordo = {
    id: novaId(),
    ca3aq: "",
    ksaka,
    smino: origino.smino,
    tempo: Date.now(),
  };
  mondoj.splice(indico + 0o1, 0, kopio);
  skribiMondojn(mondoj);
  return kopio;
}

/*អានលេខពិភពលោកសកម្ម
@return id ឬ "" */
export function legiAktivanId(): string {
  try {
    return localStorage.getItem(AKTIVA_SXLOSILO) || "";
  } catch {
    return "";
  }
}

/*កំណត់ពិភពលោកសកម្ម
    @param id ( string ) - លេខសម្គាល់ */
export function agordiAktivanMondon( id: string ): void {
  try {
    localStorage.setItem(AKTIVA_SXLOSILO, id);
  } catch {
    /* ផ្ទំទំនេរ */
  }
}

/*អានកំណត់ត្រារបស់ពិភពលោកសកម្ម
@return mondo ឬ null បើរកមិនឃើញ */
export function aktivaMondo(): MondoRecordo | null {
  const id = legiAktivanId();
  if ( !id ) return null;
  return legiMondojn().find(m => m.id === id) ?? null;
}

/*អានគ្រាប់ពូជរបស់ពិភពលោកសកម្ម
@return smino ( string ) - ទទេ បើពិភពលោកនេះប្រើដីដែលឆ្លាក់ដោយដៃ */
export function aktivaSemo(): string {
  return ( aktivaMondo()?.smino ?? "" ).trim();
}

/*លុបការកំណត់ពិភពលោកសកម្ម */
function foriguAktivan(): void {
  try {
    localStorage.removeItem(AKTIVA_SXLOSILO);
  } catch {
    /* ផ្ទំទំនេរ */
  }
}

/*រក្ទក់ពិភពលោកសកម្ម រួចចេញទៅទំព័រចាប់ផ្តើម */
export function konserviEliriMondon(): void {
  const id = legiAktivanId();
  if ( id ) {
    const mondoj = legiMondojn();
    const trovo = mondoj.find(m => m.id === id);
    if ( trovo ) {
      trovo.tempo = Date.now();
      skribiMondojn(mondoj);
    }
  }
  location.reload();
}
