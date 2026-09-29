// ≺⧼ La instrumenta dissendilo 🎛️ ⧽≻
// La sola publika enirejo de la voĉoj — gxi elektas la instrumenton laux la
// nomo de la sono-evento ( instrumento ).
import { siku } from "./siku.js";
import { ocarina } from "./ocarina.js";
import { didj } from "./didj.js";
import { guiro } from "./guiro.js";
import { bull } from "./bull.js";
import { slenthem } from "./slenthem.js";
import { inanga } from "./inanga.js";
import { mbira } from "./mbira.js";
import type { SonoEvento } from "./tipoj.js";
export function instrumento(ctx: AudioContext, out: AudioNode, e: SonoEvento, t: number) {
  const f = e.f ?? 0;
  const v = ( e.v == null ? 1 : e.v );
  const d = ( e.d == null ? 1 : e.d );

  switch ( e.i ) {
    case "siku":     siku(ctx, out, t, d, f, v); break;
    case "ocarina":  ocarina(ctx, out, t, d, f, v); break;
    case "didj":     didj(ctx, out, t, d, f, v, e.toot || false); break;
    case "guiro":    guiro(ctx, out, t, d, v, e); break;
    case "bull":     bull(ctx, out, t, d, f, v); break;
    case "slenthem": slenthem(ctx, out, t, f, v); break;
    case "inanga":   inanga(ctx, out, t, f, v, e); break;
    case "mbira":    mbira(ctx, out, t, f, v); break;
  }
}
