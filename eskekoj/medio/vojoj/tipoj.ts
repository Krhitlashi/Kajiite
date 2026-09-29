// ≺⧼ La vojaj tipoj 🛣️ ⧽≻
// La datumaj tipoj de la voja modulo — la difino de unu vojo ( VojDifino )
// kaj la registraj strioj de la piedeblaj supraĵoj ( VojSuprajxo, vojSuprajxoj ),
// kiujn la promenanto kaj la kolizioj demandas por sekvi la vojan supron.

// stuparo — Historia marko por la doko-malsupreniro ( `stuparo: true` ). ĈIU vojo
// nun ŝtupas ( vidu konstruiSegmentonEnBufrojn ) — la kampo restas nur por ke la
// malnovaj difinoj kaj la ĉap-logiko ( kiuj ankoraŭ legas ĝin ) plu funkciu; ĝi
// ne plu ŝanĝas la generacion. La doka ŝtuparo do venas el la SAMA voja maŝinaro
// kiel ĉiu strato ( la sama diorita/andezita sekco ).
export interface VojDifino { pts: [ number, number ][]; w: number; heightFn?: ( x: number, z: number ) => number; stuparo?: boolean; kapoj?: boolean; glata?: boolean; }

// ⟨ Vojaj supraĵoj por kolizio 📃 ⟩ — ĉiu ŝtupo de la voja konstruado
// registru sian piedeblan supraĵon ( la centrolinio-segmento, la duona
// vasteco kaj la randaj suproj y0/y1 ). La promenanto demandas ĉi tiujn
// striojn ( vojaSuproY en sperto.ts ) anstataŭ trairi la vojojn. La strioj
// uzas la SAMAJN valorojn kiuj konstruis la geometrion, do la demandoj
// estas precizaj per konstruado — ankaŭ sur la klinitaj deklivoj kaj la
// eskaleraj plataĵoj.
export interface VojSuprajxo { x1: number; z1: number; x2: number; z2: number; duono: number; y0: number; y1: number; }
export const vojSuprajxoj: VojSuprajxo[] = [];
