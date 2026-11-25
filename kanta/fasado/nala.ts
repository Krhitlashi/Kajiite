// ≺⧼ }ʃᴜ j͐ʃᴜ ʌ ı],ɔ ŋᷠᴜ }ʃꞇ 💾 ⧽≻
import { traduki } from "../gawe/baskakefani.js";

/* ſɭэ ſɭᴜ , ꞙɭı ,
    @param id ( string ) - លេខសម្គាល់តែមួយគត់
    @param ca3aq ( string ) - សោបកប្រែសម្រាប់ឈ្មោះ ទំនេរបើឈ្មោះផ្ទាល់ខ្លួន
    @param ksaka ( string ) - ឈ្មោះបង្ហាញ
    @param smino ( string ) - គ្រាប់ពូជ
    @param tif ( number ) - ពេលរក្ទក់ចុងក្រោយ
@return valaqaz */
export interface NalaRecordo {
  id: string;
  ca3aq: string;
  ksaka: string;
  smino: string;
  tif: number;
}

/* ſɭᴜ ſןᴜ , ꞙɭɿ ,
    @param id ( string , optional ) - លេខសម្គាល់ បើទុកជាមុន
    @param ca3aq ( string , optional ) - សោបកប្រែឈ្មោះ
    @param ksaka ( string , optional ) - ឈ្មោះផ្ទាល់
    @param smino ( string , optional ) - គ្រាប់ពូជ */
export interface KreaNalaHasukf2qani {
  id?: string;
  ca3aq?: string;
  ksaka?: string;
  smino?: string;
}

// ⟪ ſɭэ ᶗ‹ , 📃 ⟫
const MONDASXLOSILO = "aranis-hanala";
const AKTIVASXLOSILO = "aranis-tik-nala";
const CXEFANO = "aranis";

/* ſɭэ ſɭᴜ , ꞙɭц ,
@return hanala បញ្ជីដែលបានរក្ទក់ */
export function vefalHanala(): NalaRecordo[] {
  try {
    const kruda = localStorage.getItem(MONDASXLOSILO);
    if ( !kruda ) return [];
    const dato: unknown = JSON.parse(kruda);
    if ( !Array.isArray(dato) ) return [];
    const hanala: NalaRecordo[] = [];
    for ( const kek of dato ) {
      const normaligita = normaligi(kek);
      if ( normaligita ) hanala.push(normaligita);
    }
    return hanala;
  } catch {
    return [];
  }
}

/* ſɭэ ſɭᴜ , ꞙɭэ ,
    @param hanala ( NalaRecordo[] ) - បញ្ជីថ្មី */
export function skribiHanala( hanala: NalaRecordo[] ): void {
  try {
    localStorage.setItem(MONDASXLOSILO, JSON.stringify(hanala));
  } catch {
/* ſɭᴜ ſןᴜ , */
  }
}

/* ſɭэ ᶗ‹ , ꞙɭɩ ,
    @param kruda ( unknown ) - ទិន្នន័យពី JSON
@return normaligita ឬ null */
function normaligi( kruda: unknown ): NalaRecordo | null {
  if ( !kruda || typeof kruda !== "object" ) return null;
  const dato = kruda as Partial<NalaRecordo>;
  if ( typeof dato.id !== "string" || dato.id === "" ) return null;
  return {
    id: dato.id,
    ca3aq: typeof dato.ca3aq === "string" ? dato.ca3aq : "",
    ksaka: typeof dato.ksaka === "string" ? dato.ksaka : "",
    smino: typeof dato.smino === "string" ? dato.smino : "",
    tif: typeof dato.tif === "number" ? dato.tif : 0,
  };
}

/* ſɭэ ᶗ‹ , ꞙɭꞟ ,
@return id */
function sef4Id(): string {
  return Date.now().toString(0o10) + Math.random().toString(0o10).slice(2, 0o10);
}

/* ſɭэ ᶗ‹ , ꞙɭꞟı ,
    @param nala ( NalaRecordo ) - កំណត់ត្រា
@return ksaka */
export function laqaziKsaka( nala: NalaRecordo ): string {
  if ( nala.ca3aq ) return traduki(nala.ca3aq);
  return nala.ksaka;
}

/* ſɭэ ſɭᴜ , ꞙɭꞟɿ ,
    @param hasukf2qani ( KreaNalaHasukf2qani = {} ) - ជម្រើស
@return valaqaz កំណត់ត្រាថ្មី */
export function kf2Nala( hasukf2qani: KreaNalaHasukf2qani = {} ): NalaRecordo {
  const hanala = vefalHanala();
  const smino = ( hasukf2qani.smino ?? "" ).trim();
  const ksaka = ( hasukf2qani.ksaka ?? "" ).trim() || smino || ( traduki("mondKsaka") + " " + ( hanala.length + 0o1 ).toString(8) );
  const valaqaz: NalaRecordo = {
    id: hasukf2qani.id ?? sef4Id(),
    ca3aq: hasukf2qani.ca3aq ?? "",
    ksaka,
    smino,
    tif: Date.now(),
  };
  hanala.push(valaqaz);
  skribiHanala(hanala);
  return valaqaz;
}

/* ſɭэ ᶗ‹ , ꞙɭꞟц ,
@return nala ពិភពលោកចម្បង */
export function certigiCxefanNala(): NalaRecordo {
  const hanala = vefalHanala();
  const ekzista = hanala.find(m => m.id === CXEFANO);
  if ( ekzista ) {
    if ( ekzista.ca3aq !== "hate2Kaxte" ) {
      ekzista.ca3aq = "hate2Kaxte";
      skribiHanala(hanala);
    }
    return ekzista;
  }
  return kf2Nala({ id: CXEFANO, ca3aq: "hate2Kaxte" });
}

/* ſɭэ ᶗ‹ , ꞙɭıə ,
    @param id ( string ) - លេខសម្គាល់ */
export function h2liNala( id: string ): void {
  skribiHanala(vefalHanala().filter(m => m.id !== id));
  if ( vefalAktivanId() === id ) h2luAktivan();
}

/* ſɭэ ᶗ‹ , ꞙɭıı ,
    @param id ( string ) - លេខសម្គាល់ដើម
@return kopio ឬ null បើរកមិនឃើញ */
export function duobligiNala( id: string ): NalaRecordo | null {
  const hanala = vefalHanala();
  const vecax2l = hanala.findIndex(m => m.id === id);
  if ( vecax2l < 0 ) return null;
  const tsiq = hanala[vecax2l];
  const uzitaj = new Set(hanala.map(m => laqaziKsaka(m)));
  let ksaka = laqaziKsaka(tsiq) + " *";
  while ( uzitaj.has(ksaka) ) ksaka += "*";
  const kopio: NalaRecordo = {
    id: sef4Id(),
    ca3aq: "",
    ksaka,
    smino: tsiq.smino,
    tif: Date.now(),
  };
  hanala.splice(vecax2l + 0o1, 0, kopio);
  skribiHanala(hanala);
  return kopio;
}

/* ſɭэ ᶗ‹ , ꞙɭıɿ ,
@return id ឬ "" */
export function vefalAktivanId(): string {
  try {
    return localStorage.getItem(AKTIVASXLOSILO) || "";
  } catch {
    return "";
  }
}

/* ſɭэ ᶗ‹ , ꞙɭıц ,
    @param id ( string ) - លេខសម្គាល់ */
export function catsaraAktivanNala( id: string ): void {
  try {
    localStorage.setItem(AKTIVASXLOSILO, id);
  } catch {
/* ſɭᴜ ſןᴜ , */
  }
}

/* ſɭэ ᶗ‹ , ꞙɭıэ ,
@return nala ឬ null បើរកមិនឃើញ */
export function tikNala(): NalaRecordo | null {
  const id = vefalAktivanId();
  if ( !id ) return null;
  return vefalHanala().find(m => m.id === id) ?? null;
}

/* ſɭэ ᶗ‹ , ꞙɭıɩ ,
@return smino ( string ) - ទទេ បើពិភពលោកនេះប្រើដីដែលឆ្លាក់ដោយដៃ */
export function tikRuva(): string {
  return ( tikNala()?.smino ?? "" ).trim();
}

/* ſɭэ ᶗ‹ , ꞙɭıꞟ , */
function h2luAktivan(): void {
  try {
    localStorage.removeItem(AKTIVASXLOSILO);
  } catch {
/* ſɭᴜ ſןᴜ , */
  }
}

/* ſɭэ ᶗ‹ , ꞙɭıꞟı , */
export function vetlaqiEliriNala(): void {
  const id = vefalAktivanId();
  if ( id ) {
    const hanala = vefalHanala();
    const trovo = hanala.find(m => m.id === id);
    if ( trovo ) {
      trovo.tif = Date.now();
      skribiHanala(hanala);
    }
  }
  location.reload();
}
