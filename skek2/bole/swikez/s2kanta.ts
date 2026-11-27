// ≺⧼ j͑ʃп́ꞇ ſɭɔƴ ʌ j͑ʃɹ ſɭᴜ }ʃƨᴜ 🎵 ⧽≻

import type { SpuroDateno } from "./habal/hahunaq.js";
import { AIH } from "../../../kanta/gawe/baskakefani/aih.js";
import { kf2Swikez1 } from "./haswikez/swikez-01.js";
import { kf2Swikez2 } from "./haswikez/swikez-02.js";
import { kf2Swikez3 } from "./haswikez/swikez-03.js";
import { kf2Swikez4 } from "./haswikez/swikez-04.js";
import { kf2Swikez5 } from "./haswikez/swikez-05.js";
import { kf2Swikez6 } from "./haswikez/swikez-06.js";
import { kf2Swikez7 } from "./haswikez/swikez-07.js";
import { kf2Swikez10 } from "./haswikez/swikez-10.js";

export interface Vek2fe {
  no: string;
  title: string;
  instrs: string[];
  data: SpuroDateno;
}

export const HASWIKEZ: Vek2fe[] = [
  { no: "01", title: AIH["muzikSwikez0"], instrs: [ "siku", "ocarina", "guiro", "inanga", "hiwe" ], data: kf2Swikez1() },
  { no: "02", title: AIH["muzikSwikez1"], instrs: [ "didj", "tjurunga", "mbira", "inanga", "kiiqflak" ], data: kf2Swikez2() },
  { no: "03", title: AIH["muzikSwikez2"], instrs: [ "slenthem", "mbira", "ocarina", "guiro", "kiiqflak" ], data: kf2Swikez3() },
  { no: "04", title: AIH["muzikSwikez3"], instrs: [ "inanga", "siku", "tjurunga", "mbira", "guiro", "kiiqflak", "hiwe" ], data: kf2Swikez4() },
  { no: "05", title: AIH["muzikSwikez4"], instrs: [ "siku", "didj", "guiro", "tjurunga", "slenthem", "inanga", "mbira", "ocarina", "hiwe" ], data: kf2Swikez5() },
  { no: "06", title: AIH["muzikSwikez5"], instrs: [ "siku", "didj", "guiro", "tjurunga", "slenthem", "inanga", "mbira", "ocarina" ], data: kf2Swikez6() },
  { no: "07", title: AIH["muzikSwikez6"], instrs: [ "siku", "didj", "guiro", "tjurunga", "slenthem", "inanga", "mbira", "ocarina", "hiwe" ], data: kf2Swikez7() },
  { no: "10", title: AIH["muzikSwikez7"], instrs: [ "siku", "didj", "guiro", "tjurunga", "slenthem", "inanga", "mbira", "ocarina" ], data: kf2Swikez10() },
];
