// ≺⧼ ចម្រៀង 🎵 ⧽≻
// វិលនីមួយៗស្ថិតក្នុងឯកសារដាច់ដោយឡែកក្រោមថត kantoj/ ។
// ឯកសារនេះប្រមូលពួកវាជាបញ្ជីតែមួយសម្រាប់ឧបករណ៍លេង។

import type { SpuroDateno } from "./vokoj/tipoj.js";
import { buildTrack1 } from "./kantoj/trako01.js";
import { buildTrack2 } from "./kantoj/trako02.js";
import { buildTrack3 } from "./kantoj/trako03.js";
import { buildTrack4 } from "./kantoj/trako04.js";
import { buildTrack5 } from "./kantoj/trako05.js";
import { buildTrack6 } from "./kantoj/trako06.js";
import { buildTrack7 } from "./kantoj/trako07.js";
import { buildTrack8 } from "./kantoj/trako08.js";

// ⟪ ការនាំចេញត្រាក 📃 ⟫

export interface Kanto {
  no: string;
  title: string;
  instrs: string[];
  data: SpuroDateno;
}

export const KANTOJ: Kanto[] = [
  { no: "01", title: "អរុណខ្ពង់រាបខ្ពស់", instrs: [ "siku", "ocarina", "guiro", "inanga" ], data: buildTrack1() },
  { no: "02", title: "វដ្តនៃខ្យល់កួច", instrs: [ "didj", "bull", "mbira", "inanga", "kiiqflak" ], data: buildTrack2() },
  { no: "03", title: "ខ្សែបណ្តោយសំរិទ្ធ", instrs: [ "slenthem", "mbira", "ocarina", "guiro", "kiiqflak" ], data: buildTrack3() },
  { no: "04", title: "រណ្តៅ និងផ្គរ", instrs: [ "inanga", "siku", "bull", "mbira", "guiro", "kiiqflak" ], data: buildTrack4() },
  { no: "05", title: "អៃស៊ីអាគ្រីក្នុងក្រុង", instrs: [ "siku", "didj", "guiro", "bull", "slenthem", "inanga", "mbira", "ocarina" ], data: buildTrack5() },
  { no: "06", title: "អៃស៊ីអាគ្រីក្នុងផ្សារ", instrs: [ "siku", "didj", "guiro", "bull", "slenthem", "inanga", "mbira", "ocarina" ], data: buildTrack6() },
  { no: "07", title: "អៃស៊ីអាគ្រីពេលល្ងាច", instrs: [ "siku", "didj", "guiro", "bull", "slenthem", "inanga", "mbira", "ocarina" ], data: buildTrack7() },
  { no: "08", title: "អៃស៊ីអាគ្រីពេលយប់", instrs: [ "siku", "didj", "guiro", "bull", "slenthem", "inanga", "mbira", "ocarina" ], data: buildTrack8() },
];