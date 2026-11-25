// ≺⧼ j͑ʃп́ꞇ ſɭɔƴ 🎵 ⧽≻
// j͑ʃп́ꞇ ſɭɔƴ ʌ ꞙɭı ʌ ꞙɭı ʌ swikez/ ⟅
// j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ j͑ʃп́ꞇ ʌ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ⟅

import type { SpuroDateno } from "./habal/hahunaq.js";
import { AIH } from "../../../kanta/gawe/baskakefani/aih.js";
import { buildTrack1 } from "./haswikez/t2bakobesai01.js";
import { buildTrack2 } from "./haswikez/t2bakobesai02.js";
import { buildTrack3 } from "./haswikez/t2bakobesai03.js";
import { buildTrack4 } from "./haswikez/t2bakobesai04.js";
import { buildTrack5 } from "./haswikez/t2bakobesai05.js";
import { buildTrack6 } from "./haswikez/t2bakobesai06.js";
import { buildTrack7 } from "./haswikez/t2bakobesai07.js";
import { buildTrack8 } from "./haswikez/t2bakobesai08.js";

// ⟪ j͑ʃп́ꞇ ſɭɔƴ ʌ ʃᴜ j͐ʃɹ 📃 ⟫

export interface Vek2fe {
  no: string;
  title: string;
  instrs: string[];
  data: SpuroDateno;
}

// ⟨ ſɭɔ˞ᴜ ſɭᴜ ʌ j͑ʃп́ꞇ ſɭɔƴ ʌ }ʃᴜ j͐ʃᴜ ʌ aih ⟅ ſɭɔ˞ᴜ ſɭᴜ ʌ j͑ʃɜ j͑ʃƨɹ , ſɭɔ˞ᴜ ſɭᴜ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ⟅ 📃 ⟩
export const KANTOJ: Vek2fe[] = [
  { no: "01", title: AIH["muzikT2bakobesai0"], instrs: [ "siku", "ocarina", "guiro", "inanga", "hiwe" ], data: buildTrack1() },
  { no: "02", title: AIH["muzikT2bakobesai1"], instrs: [ "didj", "tjurunga", "mbira", "inanga", "kiiqflak" ], data: buildTrack2() },
  { no: "03", title: AIH["muzikT2bakobesai2"], instrs: [ "slenthem", "mbira", "ocarina", "guiro", "kiiqflak" ], data: buildTrack3() },
  { no: "04", title: AIH["muzikT2bakobesai3"], instrs: [ "inanga", "siku", "tjurunga", "mbira", "guiro", "kiiqflak", "hiwe" ], data: buildTrack4() },
  { no: "05", title: AIH["muzikT2bakobesai4"], instrs: [ "siku", "didj", "guiro", "tjurunga", "slenthem", "inanga", "mbira", "ocarina", "hiwe" ], data: buildTrack5() },
  { no: "06", title: AIH["muzikT2bakobesai5"], instrs: [ "siku", "didj", "guiro", "tjurunga", "slenthem", "inanga", "mbira", "ocarina" ], data: buildTrack6() },
  { no: "07", title: AIH["muzikT2bakobesai6"], instrs: [ "siku", "didj", "guiro", "tjurunga", "slenthem", "inanga", "mbira", "ocarina", "hiwe" ], data: buildTrack7() },
  { no: "08", title: AIH["muzikT2bakobesai7"], instrs: [ "siku", "didj", "guiro", "tjurunga", "slenthem", "inanga", "mbira", "ocarina" ], data: buildTrack8() },
];