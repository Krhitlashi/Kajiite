// ≺⧼ j͑ʃɹ ſɟᴜ ſᶘɹ ſɟᴜ }ʃᴜ 🖌️ ⧽≻
// ការគំរូតាមសំណាញ់ ( ការបញ្ចូល Katmull-Rom លើសំណាញ់ឆ្លាក់ ) និង
// ជក់ទាំងឡាយ គឺជក់កំពុងប្រើ ជក់រងរបស់វា កម្មវិធីអនុវត្តទាំងពីរ
// ( penikoApliki សម្រាប់ក្រឡាមួយ penikoPasxo សម្រាប់ជំហានរបស់កណ្ដុរ ) និង
// ការជំនួសដី។ ស្ថានភាពរបស់ជក់ស្ថិតនៅទីនេះ ហើយមានតែ
// អនុគមន៍កំណត់ប៉ុណ្ណោះដែលផ្លាស់ប្តូរវា។
import { katmullRom } from "../../../kantaoj/komunajxoj/interpolo.js";
import { bazaAlteco } from "../../../kantaoj/mondo/tereno.js";
import { REZ, mondoxAlPikselo, mondozAlPikselo } from "./havecax2l.js";
import type { KradaRektangulo } from "./havecax2l.js";
import { pentri, rekalkuliDeklivojn } from "./bako.js";
import { markiAkvonMalpuran, tsekeAkvoCxelo } from "./akvo.js";

// ⟪ គំរូតាមសំណាញ់ 📃 ⟫
// ការបញ្ចូលតាមសំណាញ់ ( katmullRom )។ ខ្សែកោង C1 រលូន គ្មានផ្នត់តាមអង្កត់ទ្រូង
// ដូចការបញ្ចូលទ្វេលីនេអ៊ែរ ដូច្នេះជម្រាលភ្នំមិនបង្ហាញកំពូលតាម
// អង្កត់ទ្រូងសំណាញ់ទេ។ ខ្សែកោងមកពីម៉ូឌុលរួម kantaoj/komunajxoj/interpolo.ts គឺដូច
// ហ្គេម និងប្រភេទ ដូច្នេះច្បាប់ចម្លងមិនអាចបង្វែរបានទេ។
// l6daInterp គឺការបញ្ចូលទ្វេកោង ( Katmull-Rom ) លើសំណាញ់ឆ្លាក់។
// តម្លៃនៅថ្នាំងសំណាញ់នៅតែស្មើតម្លៃក្រឡាពិត ហើយរវាងថ្នាំង
// ផ្ទៃរលូន C1 គ្មានកំពូលអង្កត់ទ្រូងនៃការបញ្ចូលទ្វេលីនេអ៊ែរ។
/* ការបញ្ចូលទ្វេកោង ( Katmull-Rom ) លើសំណាញ់ឆ្លាក់ គឺតម្លៃនៅ
   ថ្នាំងសំណាញ់នៅតែស្មើតម្លៃក្រឡាពិត។
    @param x ( number ) - ពិភពលោក x។
    @param z ( number ) - ពិភពលោក z។
@returns ដេលតាដែលបញ្ចូល ( number )។ */
export function l6daInterp(x: number, z: number): number {
  const fx = ( x - X0 ) / PASO;
  const fz = ( z - Z0 ) / PASO;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const cxelo = ( i: number, j: number ): number => hal6da[Math.max(0, Math.min(N - 1, j)) * N + Math.max(0, Math.min(N - 1, i))];
  const x2pa = ( j: number ): number => katmullRom(cxelo(i0 - 1, j), cxelo(i0, j), cxelo(i0 + 1, j), cxelo(i0 + 2, j), u);
  return katmullRom(x2pa(j0 - 1), x2pa(j0), x2pa(j0 + 1), x2pa(j0 + 2), v);
}
/* តម្លៃម៉ាសទ្វេលីនេអ៊ែរ ( ទឹកចាស់ដែលគូរដោយជក់ ) នៅចំណុចនោះ។
    @param x ( number ) - ពិភពលោក x។
    @param z ( number ) - ពិភពលោក z។
@returns តម្លៃម៉ាស ( number )។ */
export function maskoInterp(x: number, z: number): number {
  const fx = Math.max(0, Math.min(N - 1, ( x - X0 ) / PASO));
  const fz = Math.max(0, Math.min(N - 1, ( z - Z0 ) / PASO));
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const i1 = Math.min(i0 + 1, N - 1), j1 = Math.min(j0 + 1, N - 1);
  const a = k6liqani[j0 * N + i0], b = k6liqani[j0 * N + i1];
  const c = k6liqani[j1 * N + i0], d = k6liqani[j1 * N + i1];
  return a + ( b - a ) * u + ( c - a ) * v + ( a - b - c + d ) * u * v;
}

/* ដេលតាដែលឆ្លាក់នៃក្រឡាសំណាញ់ ( ជិតបំផុតទៅចំណុច )។
    @param ix ( number ) - ជួរឈរសំណាញ់។
    @param iz ( number ) - ជួរសំណាញ់។
@returns ដេលតា ( number )។ */
export function l6daCxelo(ix: number, iz: number): number {
  const ii = Math.max(0, Math.min(N - 1, ix));
  const jj = Math.max(0, Math.min(N - 1, iz));
  return hal6da[jj * N + ii];
}

// ⟪ ជក់ទាំងឡាយ 📃 ⟫
// ⟨ ឧបករណ៍លំនាំដើម = ដៃ ✋ 📃 ⟩ ។ ការបើកទំព័រចាប់ផ្តើមក្នុងរបៀបផ្លាស់ទី
// ទិដ្ឋភាព ( អូសផែនទី ) , ដូច្នេះការអូសមិនឆ្លាក់ដីដោយអចេតនា ។ ជក់ដីចាប់ផ្តើម
// ពេលអ្នកប៉ះប៊ូតុងជក់ណាមួយ ។
export let penikoAktiva = "movigi";
export let bs2Aktiva = 1;           // ជក់រងរបស់ឧបករណ៍តំបន់ជីវៈ ( 1=ភ្នំ, 2=ជ្រលង, 3=វាលរាប, 4=រុក្ខជាតិទឹក, 5=tsake, 0=ស្វ័យប្រវត្តិ )
export let pagaAktiva = 1;           // ជក់រងរបស់ឧបករណ៍សត្វ ( 1=សត្វទឹក, 2=បក្សីព្រិល, 4=NPC )
export let pagaForvisxa = false;      // តើឧបករណ៍សត្វកំពុងលុប ( ឧបករណ៍ដូចគ្នា ) ជំនួសការគូរ
// movigi គឺជាឧបករណ៍មើល។ ក្នុងផែនទី 2D វាអូសផែនទី ហើយក្នុងទិដ្ឋភាព 3D វា
// បង្វិលកាមេរ៉ា។ ការអនុវត្តជក់មិនដែលទទួលវាទេ ព្រោះព្រឹត្តិការណ៍
// ចាត់ចែងវាដោយឡែក ប៉ុន្តែតក្កវិជ្ជាឧបករណ៍កំពុងប្រើនៅតែរួមគ្នា។
export function tsekeMovigi(): boolean { return penikoAktiva === "movigi"; }
export const ka5ik = () => +radiusoKama.value;
export const forto = () => +fortoKama.value;

/* អនុវត្តជក់ទៅចំណុចមួយ ( ក្រឡានៅក្នុងកាំ )។ ជក់ជាពេជ្រ ( មិនមែនរង្វង់ ) ៖ ចម្ងាយជា
   |dx| + |dz| , ដូច្នេះគែមជក់តាមអ័ក្សក្រឡា ហើយជ្រុងស្រួចបួនស្ថិតលើអ័ក្ស x និង z ។
    @param cx ( number ) - ពិភពលោក x របស់ជក់។
    @param cz ( number ) - ពិភពលោក z របស់ជក់។
    @param r ( number ) - កាំរបស់ជក់ ( ចម្ងាយពីកណ្តាលទៅជ្រុងស្រួច )។
    @param fortoVal ( number ) - កម្លាំង ( គ្រាប់រំកិល )។
    @param hunaq ( string ) - ជក់កំពុងប្រើ។
    @param t12na ( Map<number, number> ) - ក្រឡាដែលបានប៉ះក្នុងជំហាន
        ជក់បច្ចុប្បន្ន ( ក្រឡាទទួលជក់តែម្តងក្នុងមួយជំហាន )។
@returns ចតុកោណកែងសំណាញ់ដែលបានប៉ះ ( KradaRektangulo )។ */
export function penikoApliki(cx: number, cz: number, r: number, fortoVal: number,
  hunaq: string, t12na: Map<number, number>): KradaRektangulo {
  // ស្ថានភាពកណ្ដុរ ( គោលដៅរាបស្មើ និងរទេះបច្ចុប្បន្ន ) ដែលកម្មវិធីកែសម្រួល
  // កាន់កាប់ ហើយធ្វើឱ្យស្រស់រាល់ការហៅ។
  ( { platigaCelo, treno } = preniMuson() );
  const ix0 = Math.max(0, Math.floor(( cx - r - X0 ) / PASO));
  const ix1 = Math.min(N - 1, Math.floor(( cx + r - X0 ) / PASO));
  const iz0 = Math.max(0, Math.floor(( cz - r - Z0 ) / PASO));
  const iz1 = Math.min(N - 1, Math.floor(( cz + r - Z0 ) / PASO));
  for ( let iz = iz0; iz <= iz1; iz++ ) {
    const z = Z0 + iz * PASO;
    for ( let ix = ix0; ix <= ix1; ix++ ) {
      const x = X0 + ix * PASO;
      // ចម្ងាយពេជ្រ ៖ |dx| + |dz| ជំនួសរង្វង់ , ដូច្នេះក្រឡាដែលបានជក់ជាពេជ្រ ។
      const d = Math.abs(x - cx) + Math.abs(z - cz);
      if ( d > r ) continue;
      const f = 1 - ( d / r ) * ( d / r );       // ការស្រអាប់រលូនទៅគែម
      const idx = iz * N + ix;
      // ក្រឡានីមួយៗទទួលជក់តែម្តងក្នុងមួយជំហាន ព្រោះការបញ្ចូល
      // ( ជំហាន 0.6 ) បើមិនដូច្នេះនឹងប្រមូលកម្លាំងរហូតដល់ប្រហែល 0o50 ដងក្នុងការអូសលឿន
      // ហើយការគូរមួយលើកលើកដីឡើងដប់ឯកតា។ ការប៉ះដំបូងរបស់
      // ជក់ដែលផ្លាស់ទីតែងតែជាគែមជក់ ( f ≈ 0 ) ដូច្នេះក្រឡា
      // កត់ត្រាការប៉ះខ្លាំងបំផុត ( f អតិបរមា ) មិនមែនការប៉ះដំបូងទេ។
      const s23ohk2saiF = t12na.get(idx);
      if ( s23ohk2saiF !== undefined && f <= s23ohk2saiF ) continue;
      // អនុវត្តតែការកើនឡើងរវាងកម្លាំងចាស់ និងថ្មី ដូច្នេះក្រឡា
      // ទទួលសរុប fortoVal × f_maks ក្នុងមួយជំហាន ( មិនមែនជាផលបូក
      // នៃការអនុវត្តទាំងអស់ដែលកាត់កាត់ )។ ជក់រាបស្មើដូច្នេះរលូន
      // ដោយជំហានតូចម្តង ជំនួសការពេញភ្លាមទៅគោលដៅ។
      const df = s23ohk2saiF === undefined ? f : f - s23ohk2saiF;
      t12na.set(idx, f);
      if ( hunaq === "levi" ) {
        hal6da[idx] += fortoVal * 2 * df;
      } else if ( hunaq === "malsuprenigi" ) {
        hal6da[idx] -= fortoVal * 2 * df;
      } else if ( hunaq === "platigi" && platigaCelo !== null ) {
        const sef4 = platigaCelo - bazaAlteco(x, z);
        hal6da[idx] += ( sef4 - hal6da[idx] ) * fortoVal * df;
      } else if ( hunaq === "glatigi" ) {
        const sost2 = ( l6daCxelo(ix - 1, iz) + l6daCxelo(ix + 1, iz)
          + l6daCxelo(ix, iz - 1) + l6daCxelo(ix, iz + 1) ) / 4;
        hal6da[idx] += ( sost2 - hal6da[idx] ) * fortoVal * df;
      } else if ( hunaq === "forvisxi" ) {
        hal6da[idx] = 0;
        k6liqani[idx] = 0;
      } else if ( hunaq === "bs2" ) {
        // ឧបករណ៍តំបន់ជីវៈគូរតំបន់ជីវៈផ្ទាល់លើស្រទាប់តំបន់ជីវៈ។ តំបន់ជីវៈ
        // ទឹក ( 4=រុក្ខជាតិទឹក, 5=tsake ) មានតែនៅលើ
        // ទឹក ដូច្នេះជក់គូរវាតែក្នុងក្រឡាទឹក រីឯតំបន់ជីវៈលើដី
        // ( 1=ភ្នំ, 2=ជ្រលង, 3=វាលរាប ) មិនដែលគូរលើទឹកទេ។        // ស្វ័យប្រវត្តិលុបការគូរនៅគ្រប់កន្លែង ។ ដីផ្ទាល់មិនផ្លាស់ប្តូរទេ ។
        // ⟨ ទឹកពិត 📃 ⟩ ៖ ការគូរជីវភូមិអានទឹកដេរីវេ ( ប្រភព , អាង , ទន្លេ ) ,
        // មិនមែនម៉ាសចាស់ដែលបានគូរទេ ។ បើមិនដូច្នេះ ជីវភូមិទឹកគូរលើទន្លេមិនបាន ។
        const akva = tsekeAkvoCxelo(ix, iz);
        if ( bs2Aktiva === 0 ) habs2[idx] = 0;
        else if ( bs2Aktiva >= 4 ? akva : !akva ) habs2[idx] = bs2Aktiva;
      } else if ( hunaq === "hapaga" ) {
        // ឧបករណ៍សត្វគូរតំបន់សត្វលើស្រទាប់សត្វជា
        // ប៊ីត។ 1=សត្វទឹក, 2=បក្សីព្រិល, 4=NPC ដូច្នេះក្រឡាអាចផ្ទុក
        // ច្រើនប្រភេទក្នុងពេលតែមួយ ដូច្នេះការគូរប្រភេទទីពីរលើទីមួយផ្សំ
        // ពួកវាចូលគ្នា។ សត្វទឹកហែលតែក្នុងទឹក ( ក្រឡាទឹក ) រីឯ
        // បក្សីព្រិលអាចហោះលើកន្លែងណាមួយ ( ដី ឬទឹក ) ហើយ NPC
        // ដើរតែលើដី ( មិនដែលលើទឹក )។ ការលុប ( ឧបករណ៍ដូចគ្នា
        // ដែលបើកដោយប៊ូតុង លុប 🧽 ក្នុងបន្ទះពណ៌ ) លុបតែ
        // ប្រភេទដែលបានជ្រើស រីឯអ្វីផ្សេងទៀតនៅដដែល។ ដីផ្ទាល់មិនផ្លាស់ប្តូរទេ។
        // ⟨ ទឹកពិត 📃 ⟩ ៖ សត្វទឹកហែលតែក្នុងទឹកដេរីវេ , មិនមែនក្នុងម៉ាសចាស់ទេ ។
        const akva = tsekeAkvoCxelo(ix, iz);
        if ( pagaForvisxa ) hapaga[idx] &= ~pagaAktiva;
        else if ( pagaAktiva === 1 ? akva : pagaAktiva === 4 ? !akva : true ) hapaga[idx] |= pagaAktiva;
      }
      // movigi មិនមែនជាជក់ទេ ព្រោះព្រឹត្តិការណ៍ចាត់ចែងវាដោយឡែក។
    }
  }
  return { ix0, ix1, iz0, iz1 };
}
/* ជំហានរបស់កណ្ដុរ គឺអនុវត្តជក់តាមផ្លូវទាំងមូល ( មិនត្រឹមតែចំណុចចុងក្រោយ )។
    @param cx ( number ) - ពិភពលោក x ថ្មី។
    @param cz ( number ) - ពិភពលោក z ថ្មី។ */
export function penikoPasxo(cx: number, cz: number): void {
  // ស្ថានភាពកណ្ដុរ ( គោលដៅរាបស្មើ និងរទេះបច្ចុប្បន្ន ) ដែលកម្មវិធីកែសម្រួល
  // កាន់កាប់ ហើយធ្វើឱ្យស្រស់រាល់ការហៅ។
  ( { platigaCelo, treno } = preniMuson() );
  const t = treno;
  if ( !t ) return;
  const h6kuni = Math.hypot(cx - t.lastX, cz - t.lastZ);
  const havepat6ni = Math.max(1, Math.ceil(h6kuni / ( 0o23/0o40 )));
  for ( let k = 1; k <= havepat6ni; k++ ) {
    const px = t.lastX + ( cx - t.lastX ) * k / havepat6ni;
    const pz = t.lastZ + ( cz - t.lastZ ) * k / havepat6ni;
    penikoApliki(px, pz, ka5ik(), forto(), penikoAktiva, t.t12na);
  }
  // ចំណុចចាស់មុនការធ្វើបច្ចុប្បន្នភាព ដូច្នេះការគូរគ្របដណ្តប់ផ្លូវ
  // ទាំងមូលនៃជំហាន មិនត្រឹមតែចំណុចបច្ចុប្បន្នទេ ( t.lastX ផ្លាស់ប្តូរ
  // ភ្លាមៗក្រោយមក ដូច្នេះ max( lastX, cx ) នឹងតែងតែគ្រាន់តែ cx )។
  const deX = t.lastX, deZ = t.lastZ;
  t.lastX = cx; t.lastZ = cz;
  markiSxangxitan();
  // ដីបានផ្លាស់ប្តូរ ដូច្នេះទឹក ( អាង ទន្លេ ព្រែកកាត់ )
  // អាស្រ័យលើវា ដូច្នេះទឹកនឹងត្រូវគណនាឡើងវិញនៅចុងបញ្ចប់នៃជំហានជក់។
  markiAkvonMalpuran();
  statuso("ការផ្លាស់ប្តូរមិនបានរក្សាទុក");
  const r = ka5ik();
  const px0 = Math.max(0, Math.min(REZ - 1, mondoxAlPikselo(Math.max(deX, cx) + r + 1)));
  const px1 = Math.max(0, Math.min(REZ - 1, mondoxAlPikselo(Math.min(deX, cx) - r - 1)));
  const py0 = Math.max(0, Math.min(REZ - 1, mondozAlPikselo(Math.max(deZ, cz) + r + 1)));
  const py1 = Math.max(0, Math.min(REZ - 1, mondozAlPikselo(Math.min(deZ, cz) - r - 1)));
  rekalkuliDeklivojn(px0 - 2, py0 - 2, px1 + 2, py1 + 2);
  pentri(px0, py0, px1, py1);
  markiDesegnon();
}


// ⟪ ការភ្ជាប់ទៅកម្មវិធីកែសម្រួល 📃 ⟫ គឺតារាងរបស់ដី រង្វាស់សំណាញ់
// ស្ថានភាពកណ្ដុរ បន្ទាត់ស្ថានភាព កម្មវិធីបង្ហាញតម្លៃរបស់ជក់ និង
// ទង់គូរទាំងពីរ។
interface PenikaTreno {
  hunaq: string;
  lastX: number;
  lastZ: number;
  t12na: Map<number, number>;
}
interface MusoStato {
  platigaCelo: number | null;
  treno: PenikaTreno | null;
}
interface PenikaLigo {
  hal6da: Float32Array;
  k6liqani: Uint8Array;
  habs2: Uint8Array;
  hapaga: Uint8Array;
  N: number;
  PASO: number;
  X0: number;
  Z0: number;
  statuso: ( s2banani: string ) => void;
  markiDesegnon: () => void;
  markiSxangxitan: () => void;
  radiusoKama: HTMLInputElement;
  fortoKama: HTMLInputElement;
  muso: () => MusoStato;
}
let hal6da: Float32Array;
let k6liqani: Uint8Array;
let habs2: Uint8Array;
let hapaga: Uint8Array;
let N: number;
let PASO: number;
let X0: number;
let Z0: number;
let statuso: ( s2banani: string ) => void = () => { };
let markiDesegnon: () => void = () => { };
let markiSxangxitan: () => void = () => { };
let radiusoKama: HTMLInputElement;
let fortoKama: HTMLInputElement;
let platigaCelo: number | null = null;
let treno: PenikaTreno | null = null;
let preniMuson: () => MusoStato = () => ( { platigaCelo: null, treno: null } );

/* agordiPenikojn គឺការភ្ជាប់តែម្តងជាមួយឯកសារមេ។
    @param L ( PenikaLigo ) - តារាង និងកម្មវិធីបង្ហាញរបស់កម្មវិធីកែសម្រួល។ */
export function agordiPenikojn(L: PenikaLigo): void {
  ( { hal6da, k6liqani, habs2, hapaga, N, PASO, X0, Z0, statuso, markiDesegnon,
    markiSxangxitan, radiusoKama, fortoKama } = L );
  preniMuson = L.muso;
}

// ⟪ អនុគមន៍កំណត់របស់ជក់ 📃 ⟫ គឺការផ្លាស់ប្តូរជក់កំពុងប្រើ និង
// ជក់រងរបស់វាឆ្លងកាត់អនុគមន៍ទាំងនេះ ( ស្ថានភាពជាការភ្ជាប់ផ្ទាល់ )។
export function agordiPenikon(ksaka: string): void { penikoAktiva = ksaka; }
export function agordiBs2n(n: number): void { bs2Aktiva = n; }
export function agordiPagan(n: number): void { pagaAktiva = n; }
export function agordiPagaForvisxon(v: boolean): void { pagaForvisxa = v; }
