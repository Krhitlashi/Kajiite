// ≺⧼ j͑ʃп́ꞇ ſɭɔƴ 🎵 ⧽≻
// j͑ʃп́ꞇ ſɭɔƴ ʌ ꞙɭı ʌ ꞙɭı ʌ kantoj/ ⟅
// j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ j͑ʃп́ꞇ ʌ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ⟅

import type { SpuroDateno } from "./vokoj/hahunaq.js";
import { AIH } from "../../../kantaoj/lingvo/tradukoj/aih.js";
import { buildTrack1 } from "./kantoj/trako01.js";
import { buildTrack2 } from "./kantoj/trako02.js";
import { buildTrack3 } from "./kantoj/trako03.js";
import { buildTrack4 } from "./kantoj/trako04.js";
import { buildTrack5 } from "./kantoj/trako05.js";
import { buildTrack6 } from "./kantoj/trako06.js";
import { buildTrack7 } from "./kantoj/trako07.js";
import { buildTrack8 } from "./kantoj/trako08.js";

// ⟪ j͑ʃп́ꞇ ſɭɔƴ ʌ ʃᴜ j͐ʃɹ 📃 ⟫

export interface Kanto {
  no: string;
  title: string;
  instrs: string[];
  data: SpuroDateno;
}

// ⟨ ſɭɔ˞ᴜ ſɭᴜ ʌ j͑ʃп́ꞇ ſɭɔƴ ʌ }ʃᴜ j͐ʃᴜ ʌ aih ⟅ ſɭɔ˞ᴜ ſɭᴜ ʌ j͑ʃɜ j͑ʃƨɹ , ſɭɔ˞ᴜ ſɭᴜ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ⟅ 📃 ⟩
export const KANTOJ: Kanto[] = [
  { no: "01", title: AIH["muzikTrako0"], instrs: [ "siku", "ocarina", "guiro", "inanga", "hiwe" ], data: buildTrack1() },
  { no: "02", title: AIH["muzikTrako1"], instrs: [ "didj", "tjurunga", "mbira", "inanga", "kiiqflak" ], data: buildTrack2() },
  { no: "03", title: AIH["muzikTrako2"], instrs: [ "slenthem", "mbira", "ocarina", "guiro", "kiiqflak" ], data: buildTrack3() },
  { no: "04", title: AIH["muzikTrako3"], instrs: [ "inanga", "siku", "tjurunga", "mbira", "guiro", "kiiqflak", "hiwe" ], data: buildTrack4() },
  { no: "05", title: AIH["muzikTrako4"], instrs: [ "siku", "didj", "guiro", "tjurunga", "slenthem", "inanga", "mbira", "ocarina", "hiwe" ], data: buildTrack5() },
  { no: "06", title: AIH["muzikTrako5"], instrs: [ "siku", "didj", "guiro", "tjurunga", "slenthem", "inanga", "mbira", "ocarina" ], data: buildTrack6() },
  { no: "07", title: AIH["muzikTrako6"], instrs: [ "siku", "didj", "guiro", "tjurunga", "slenthem", "inanga", "mbira", "ocarina", "hiwe" ], data: buildTrack7() },
  { no: "08", title: AIH["muzikTrako7"], instrs: [ "siku", "didj", "guiro", "tjurunga", "slenthem", "inanga", "mbira", "ocarina" ], data: buildTrack8() },
];