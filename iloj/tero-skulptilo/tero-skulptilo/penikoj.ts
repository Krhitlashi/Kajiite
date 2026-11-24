// ≺⧼ j͑ʃɹ ſɟᴜ ſᶘɹ ſɟᴜ }ʃᴜ 🖌️ ⧽≻
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭɜ ᶗ‹ , ꞙɭɿ ,
// ( ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭɜ ſɭ,w , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
import { katmullRom } from "../../../kantaoj/komunajxoj/interpolo.js";
import { bazaAlteco } from "../../../kantaoj/mondo/tereno.js";
import { REZ, mondoxAlPikselo, mondozAlPikselo } from "./havecax2l.js";
import type { KradaRektangulo } from "./havecax2l.js";
import { pentri, rekalkuliDeklivojn } from "./bako.js";
import { markiAkvonMalpuran, tsekeAkvoCxelo } from "./akvo.js";

// ⟪ ſɭᴜ ſןᴜ , 📃 ⟫
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭɜ ſɭ,w , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
/* ſɭᴜ ſןᴜ , ꞙɭɿ ,
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
/* ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
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

/* ſɭɜ ſɭ,w , ꞙɭɿ ,
    @param ix ( number ) - ជួរឈរសំណាញ់។
    @param iz ( number ) - ជួរសំណាញ់។
@returns ដេលតា ( number )។ */
export function l6daCxelo(ix: number, iz: number): number {
  const ii = Math.max(0, Math.min(N - 1, ix));
  const jj = Math.max(0, Math.min(N - 1, iz));
  return hal6da[jj * N + ii];
}

// ⟪ ſɭᴜ ſןᴜ , 📃 ⟫
// ⟨ ſɭэ ſɭw , ✋ 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭɜ ᶗ‹ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
export let penikoAktiva = "movigi";
export let bs2Aktiva = 1;           // ជក់រងរបស់ឧបករណ៍តំបន់ជីវៈ ( ı=ភ្នំ, ɿ=ជ្រលង, ц=វាលរាប, э=រុក្ខជាតិទឹក, ꞟ=tsake, ɔ=ស្វ័យប្រវត្តិ )
export let pagaAktiva = 1;           // ជក់រងរបស់ឧបករណ៍សត្វ ( ı=សត្វទឹក, ɿ=បក្សីព្រិល, э=NPC )
export let pagaForvisxa = false;      // តើឧបករណ៍សត្វកំពុងលុប ( ឧបករណ៍ដូចគ្នា ) ជំនួសការគូរ
// ſɭэ ſɭw , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
export function tsekeMovigi(): boolean { return penikoAktiva === "movigi"; }
export const ka5ik = () => +radiusoKama.value;
export const forto = () => +fortoKama.value;

/* ſɭᴜ ſןᴜ , ꞙɭı ,
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
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
  ( { platigaCelo, treno } = preniMuson() );
  const ix0 = Math.max(0, Math.floor(( cx - r - X0 ) / PASO));
  const ix1 = Math.min(N - 1, Math.floor(( cx + r - X0 ) / PASO));
  const iz0 = Math.max(0, Math.floor(( cz - r - Z0 ) / PASO));
  const iz1 = Math.min(N - 1, Math.floor(( cz + r - Z0 ) / PASO));
  for ( let iz = iz0; iz <= iz1; iz++ ) {
    const z = Z0 + iz * PASO;
    for ( let ix = ix0; ix <= ix1; ix++ ) {
      const x = X0 + ix * PASO;
// ſ͕ɭɜ ı],ᴜ , ꞙɭɿ ,
      const d = Math.abs(x - cx) + Math.abs(z - cz);
      if ( d > r ) continue;
      const f = 1 - ( d / r ) * ( d / r );       // ការស្រអាប់រលូនទៅគែម
      const idx = iz * N + ix;
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ( ſןɔ˞ᴜƴ , ꞙɭɿɔ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
      const s23ohk2saiF = t12na.get(idx);
      if ( s23ohk2saiF !== undefined && f <= s23ohk2saiF ) continue;
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
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
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭɿ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭц ,
// ⟨ ſᶘᴜ j͑ʃᴜ , 📃 ⟩ , ſᶘᴜ j͑ʃᴜ , ꞙɭэ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭɩ ,
        const akva = tsekeAkvoCxelo(ix, iz);
        if ( bs2Aktiva === 0 ) habs2[idx] = 0;
        else if ( bs2Aktiva >= 4 ? akva : !akva ) habs2[idx] = bs2Aktiva;
      } else if ( hunaq === "hapaga" ) {
// ſ͕ɭɜ ı],ᴜ , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ⟨ ſᶘᴜ j͑ʃᴜ , 📃 ⟩ , ſᶘᴜ j͑ʃᴜ , ꞙɭɿ ,
        const akva = tsekeAkvoCxelo(ix, iz);
        if ( pagaForvisxa ) hapaga[idx] &= ~pagaAktiva;
        else if ( pagaAktiva === 1 ? akva : pagaAktiva === 4 ? !akva : true ) hapaga[idx] |= pagaAktiva;
      }
// ſɭэ ſɭw , ꞙɭı ,
    }
  }
  return { ix0, ix1, iz0, iz1 };
}
/* ſɭᴜ ſןᴜ , ꞙɭɿ ,
    @param cx ( number ) - ពិភពលោក x ថ្មី។
    @param cz ( number ) - ពិភពលោក z ថ្មី។ */
export function penikoPasxo(cx: number, cz: number): void {
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
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
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
  const deX = t.lastX, deZ = t.lastZ;
  t.lastX = cx; t.lastZ = cz;
  markiSxangxitan();
// ſɭɜ ſɭ,w , ꞙɭɿ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭц ,
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


// ⟪ ſɭэ ᶗ‹ , ꞙɭɩ , 📃 ⟫ , ſɭɜ ſɭ,w ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
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

/* ſɭэ ᶗ‹ , ꞙɭɿ ,
    @param L ( PenikaLigo ) - តារាង និងកម្មវិធីបង្ហាញរបស់កម្មវិធីកែសម្រួល។ */
export function agordiPenikojn(L: PenikaLigo): void {
  ( { hal6da, k6liqani, habs2, hapaga, N, PASO, X0, Z0, statuso, markiDesegnon,
    markiSxangxitan, radiusoKama, fortoKama } = L );
  preniMuson = L.muso;
}

// ⟪ ſɭэ ᶗ‹ , ꞙɭц , 📃 ⟫ , ſɭэ ᶗ‹ ,
// ſɭэ ᶗ‹ , ꞙɭэ ,
export function agordiPenikon(ksaka: string): void { penikoAktiva = ksaka; }
export function agordiBs2n(n: number): void { bs2Aktiva = n; }
export function agordiPagan(n: number): void { pagaAktiva = n; }
export function agordiPagaForvisxon(v: boolean): void { pagaForvisxa = v; }
