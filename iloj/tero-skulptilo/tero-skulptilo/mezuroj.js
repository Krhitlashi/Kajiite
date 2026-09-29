// ≺⧼ Mezuradoj 📏 ⧽≻
// La geometrio de la mondkanvaso — la mondlarĝo, la piksela rezolucio kaj la
// mond↔piksela konverto. Ilon uzas la 2D-bako ( bako.js ), la vido kaj la
// okazaĵoj. La mapo montras nordon supre kaj orienton dekstren — la sama
// orientiĝo kiel la minimapo de la ludo.
export const MONDO = 0o1400;                           // 768 — mondlarĝo [ -384, 384 )
export const MONDO_HALFO = 0o600;                      // 384
export const REZ = 0o1400;                             // 768 — pikseloj sur la mondkanvaso

// mondoxAlPikselo — la mond-x al la kanvasa pikselo ( oriento dekstren ).
//     @param x ( number ) - La mond-x.
//     @returns ( number ) - La kanvasa kolumno.
export function mondoxAlPikselo(x) { return Math.round(( MONDO_HALFO - x ) / MONDO * REZ); }

// mondozAlPikselo — la mond-z al la kanvasa pikselo ( la nordo supre, do la
// z-akso renversiĝas ).
//     @param z ( number ) - La mond-z.
//     @returns ( number ) - La kanvasa vico.
export function mondozAlPikselo(z) { return Math.round(( MONDO_HALFO - z ) / MONDO * REZ); }
