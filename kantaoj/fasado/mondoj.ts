// ≺⧼ }ʃᴜ j͐ʃᴜ ʌ ı],ɔ ŋᷠᴜ }ʃꞇ 💾 ⧽≻
import { traduki } from "../lingvo/tradukoj.js";

/* ſɭэ ſɭᴜ , ꞙɭı ,
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

/* ſɭᴜ ſןᴜ , ꞙɭɿ ,
    @param id ( string , optional ) - លេខសម្គាល់ បើទុកជាមុន
    @param ca3aq ( string , optional ) - សោបកប្រែឈ្មោះ
    @param ksaka ( string , optional ) - ឈ្មោះផ្ទាល់
    @param smino ( string , optional ) - គ្រាប់ពូជ */
export interface KreaMondoHasukf2qani {
  id?: string;
  ca3aq?: string;
  ksaka?: string;
  smino?: string;
}

// ⟪ ſɭэ ᶗ‹ , 📃 ⟫
const MONDA_SXLOSILO = "aranis-mondoj";
const AKTIVA_SXLOSILO = "aranis-aktiva-mondo";
const CXEF_ANO = "aranis";

/* ſɭэ ſɭᴜ , ꞙɭц ,
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

/* ſɭэ ſɭᴜ , ꞙɭэ ,
    @param mondoj ( MondoRecordo[] ) - បញ្ជីថ្មី */
export function skribiMondojn( mondoj: MondoRecordo[] ): void {
  try {
    localStorage.setItem(MONDA_SXLOSILO, JSON.stringify(mondoj));
  } catch {
/* ſɭᴜ ſןᴜ , */
  }
}

/* ſɭэ ᶗ‹ , ꞙɭɩ ,
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

/* ſɭэ ᶗ‹ , ꞙɭꞟ ,
@return id */
function sef4Id(): string {
  return Date.now().toString(0o10) + Math.random().toString(0o10).slice(2, 0o10);
}

/* ſɭэ ᶗ‹ , ꞙɭꞟı ,
    @param mondo ( MondoRecordo ) - កំណត់ត្រា
@return ksaka */
export function montriNomon( mondo: MondoRecordo ): string {
  if ( mondo.ca3aq ) return traduki(mondo.ca3aq);
  return mondo.ksaka;
}

/* ſɭэ ſɭᴜ , ꞙɭꞟɿ ,
    @param hasukf2qani ( KreaMondoHasukf2qani = {} ) - ជម្រើស
@return registro កំណត់ត្រាថ្មី */
export function kf2Mondon( hasukf2qani: KreaMondoHasukf2qani = {} ): MondoRecordo {
  const mondoj = legiMondojn();
  const smino = ( hasukf2qani.smino ?? "" ).trim();
  const ksaka = ( hasukf2qani.ksaka ?? "" ).trim() || smino || ( traduki("mondNomo") + " " + ( mondoj.length + 0o1 ).toString(8) );
  const registro: MondoRecordo = {
    id: hasukf2qani.id ?? sef4Id(),
    ca3aq: hasukf2qani.ca3aq ?? "",
    ksaka,
    smino,
    tempo: Date.now(),
  };
  mondoj.push(registro);
  skribiMondojn(mondoj);
  return registro;
}

/* ſɭэ ᶗ‹ , ꞙɭꞟц ,
@return mondo ពិភពលោកចម្បង */
export function certigiCxefanMondon(): MondoRecordo {
  const mondoj = legiMondojn();
  const ekzista = mondoj.find(m => m.id === CXEF_ANO);
  if ( ekzista ) {
    if ( ekzista.ca3aq !== "titoloKaxte" ) {
      ekzista.ca3aq = "titoloKaxte";
      skribiMondojn(mondoj);
    }
    return ekzista;
  }
  return kf2Mondon({ id: CXEF_ANO, ca3aq: "titoloKaxte" });
}

/* ſɭэ ᶗ‹ , ꞙɭıə ,
    @param id ( string ) - លេខសម្គាល់ */
export function forigiMondon( id: string ): void {
  skribiMondojn(legiMondojn().filter(m => m.id !== id));
  if ( legiAktivanId() === id ) foriguAktivan();
}

/* ſɭэ ᶗ‹ , ꞙɭıı ,
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
    id: sef4Id(),
    ca3aq: "",
    ksaka,
    smino: origino.smino,
    tempo: Date.now(),
  };
  mondoj.splice(indico + 0o1, 0, kopio);
  skribiMondojn(mondoj);
  return kopio;
}

/* ſɭэ ᶗ‹ , ꞙɭıɿ ,
@return id ឬ "" */
export function legiAktivanId(): string {
  try {
    return localStorage.getItem(AKTIVA_SXLOSILO) || "";
  } catch {
    return "";
  }
}

/* ſɭэ ᶗ‹ , ꞙɭıц ,
    @param id ( string ) - លេខសម្គាល់ */
export function agordiAktivanMondon( id: string ): void {
  try {
    localStorage.setItem(AKTIVA_SXLOSILO, id);
  } catch {
/* ſɭᴜ ſןᴜ , */
  }
}

/* ſɭэ ᶗ‹ , ꞙɭıэ ,
@return mondo ឬ null បើរកមិនឃើញ */
export function aktivaMondo(): MondoRecordo | null {
  const id = legiAktivanId();
  if ( !id ) return null;
  return legiMondojn().find(m => m.id === id) ?? null;
}

/* ſɭэ ᶗ‹ , ꞙɭıɩ ,
@return smino ( string ) - ទទេ បើពិភពលោកនេះប្រើដីដែលឆ្លាក់ដោយដៃ */
export function aktivaSemo(): string {
  return ( aktivaMondo()?.smino ?? "" ).trim();
}

/* ſɭэ ᶗ‹ , ꞙɭıꞟ , */
function foriguAktivan(): void {
  try {
    localStorage.removeItem(AKTIVA_SXLOSILO);
  } catch {
/* ſɭᴜ ſןᴜ , */
  }
}

/* ſɭэ ᶗ‹ , ꞙɭıꞟı , */
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
