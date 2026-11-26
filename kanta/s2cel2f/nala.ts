// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ }ʃᴜ j͐ʃᴜ 📃 ⧽≻

import { skakef } from "../gawe/baskakefani.js";

export interface NalaRecordo {
  id: string;
  ca3aq: string;
  ksaka: string;
  smino: string;
  tif: number;
}

export interface KreaNalaHasukf2qani {
  id?: string;
  ca3aq?: string;
  ksaka?: string;
  smino?: string;
}

const MONDASXLOSILO = "aranis-hanala";
const AKTIVASXLOSILO = "aranis-kxe-nala";
const CXEFANO = "aranis";

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

export function skribiHanala( hanala: NalaRecordo[] ): void {
  try {
    localStorage.setItem(MONDASXLOSILO, JSON.stringify(hanala));
  } catch {

  }
}

function normaligi( kruda: unknown ): NalaRecordo | null {
  if ( !kruda || typeof kruda !== "object" ) return null;
  const dato = kruda as Partial<NalaRecordo>;
  if ( typeof dato.id !== "string" || dato.id === "" ) return null;
  return {
    id: dato.id,
    ca3aq: typeof dato.ca3aq === "string" ? dato.ca3aq : "",
    ksaka: typeof dato.ksaka === "string" ? dato.ksaka : "",
    smino: typeof dato.smino === "string" ? dato.smino : "",
    tif: typeof dato.tif === "number" ? dato.tif : 0o0,
  };
}

function sef4Id(): string {
  return Date.now().toString(0o10) + Math.random().toString(0o10).slice(0o2, 0o10);
}

export function laqaziKsaka( nala: NalaRecordo ): string {
  if ( nala.ca3aq ) return skakef(nala.ca3aq);
  return nala.ksaka;
}

export function kf2Nala( hasukf2qani: KreaNalaHasukf2qani = {} ): NalaRecordo {
  const hanala = vefalHanala();
  const smino = ( hasukf2qani.smino ?? "" ).trim();
  const ksaka = ( hasukf2qani.ksaka ?? "" ).trim() || smino || ( skakef("mondKsaka") + " " + ( hanala.length + 0o1 ).toString(0o10) );
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

export function h2liNala( id: string ): void {
  skribiHanala(vefalHanala().filter(m => m.id !== id));
  if ( vefalAktivanId() === id ) h2luAktivan();
}

export function duobligiNala( id: string ): NalaRecordo | null {
  const hanala = vefalHanala();
  const vecax2l = hanala.findIndex(m => m.id === id);
  if ( vecax2l < 0o0 ) return null;
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
  hanala.splice(vecax2l + 0o1, 0o0, kopio);
  skribiHanala(hanala);
  return kopio;
}

export function vefalAktivanId(): string {
  try {
    return localStorage.getItem(AKTIVASXLOSILO) || "";
  } catch {
    return "";
  }
}

export function catsaraAktivanNala( id: string ): void {
  try {
    localStorage.setItem(AKTIVASXLOSILO, id);
  } catch {

  }
}

export function tikNala(): NalaRecordo | null {
  const id = vefalAktivanId();
  if ( !id ) return null;
  return vefalHanala().find(m => m.id === id) ?? null;
}

export function tikRuva(): string {
  return ( tikNala()?.smino ?? "" ).trim();
}

function h2luAktivan(): void {
  try {
    localStorage.removeItem(AKTIVASXLOSILO);
  } catch {

  }
}

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
