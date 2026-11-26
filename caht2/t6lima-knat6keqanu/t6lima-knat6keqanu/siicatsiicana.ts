// ≺⧼ j͑ʃɹ ſɟᴜ ſᶘɹ ſɟᴜ }ʃᴜ 🖌️ ⧽≻
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭɜ ᶗ‹ , ꞙɭɿ ,
// ( ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭɜ ſɭ,w , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
import { katmullRom } from "../../../kanta/x2x2q/interpolo.js";
import { kozonuL6da } from "../../../kanta/nala/t6limaSoza.js";
import { REZ, mondoxAlPikselo, mondozAlPikselo } from "./havecax2l.js";
import type { KradaRektangulo } from "./havecax2l.js";
import { pentri, revek2feDeklik6h6n } from "./tsane.js";
import { s2tasTsasaS23ohk2sain, tsekeTsasaK2pa } from "./tsasa.js";

// ⟪ ſɭᴜ ſןᴜ , 📃 ⟫
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭɜ ſɭ,w , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
/* ſɭᴜ ſןᴜ , ꞙɭɿ ,
   ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ｡ ſɭɹ ſןᴜ ｡ ſɭᴜ ｡
    @param x ( number ) - ʃᴜ j͐ʃɹ x ｡
    @param z ( number ) - ʃᴜ j͐ʃɹ z ｡
@returns j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ( number ) ｡ */
export function l6daInterp(x: number, z: number): number {
  const fx = ( x - X0 ) / Tona;
  const fz = ( z - Z0 ) / Tona;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const k2pa = ( i: number, j: number ): number => hal6da[Math.max(0o0, Math.min(N - 0o1, j)) * N + Math.max(0o0, Math.min(N - 0o1, i))];
  const x2pa = ( j: number ): number => katmullRom(k2pa(i0 - 0o1, j), k2pa(i0, j), k2pa(i0 + 0o1, j), k2pa(i0 + 0o2, j), u);
  return katmullRom(x2pa(j0 - 0o1), x2pa(j0), x2pa(j0 + 0o1), x2pa(j0 + 0o2), v);
}
/* ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
    @param x ( number ) - ʃᴜ j͐ʃɹ x ｡
    @param z ( number ) - ʃᴜ j͐ʃɹ z ｡
@returns j͑ʃ'ɔ ŋᷠɹ ( number ) ｡ */
export function maskoInterp(x: number, z: number): number {
  const fx = Math.max(0o0, Math.min(N - 0o1, ( x - X0 ) / Tona));
  const fz = Math.max(0o0, Math.min(N - 0o1, ( z - Z0 ) / Tona));
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const i1 = Math.min(i0 + 0o1, N - 0o1), j1 = Math.min(j0 + 0o1, N - 0o1);
  const a = k6liqani[j0 * N + i0], b = k6liqani[j0 * N + i1];
  const c = k6liqani[j1 * N + i0], d = k6liqani[j1 * N + i1];
  return a + ( b - a ) * u + ( c - a ) * v + ( a - b - c + d ) * u * v;
}

/* ſɭɜ ſɭ,w , ꞙɭɿ ,
    @param ix ( number ) - j͑ʃᴜ ｡ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ｡
    @param iz ( number ) - j͑ʃᴜ ｡ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ｡
@returns j͑ʃᴜ ( number ) ｡ */
export function l6daK2pa(ix: number, iz: number): number {
  const ii = Math.max(0o0, Math.min(N - 0o1, ix));
  const jj = Math.max(0o0, Math.min(N - 0o1, iz));
  return hal6da[jj * N + ii];
}

// ⟪ ſɭᴜ ſןᴜ , 📃 ⟫
// ⟨ ſɭэ ſɭw , ✋ 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭɜ ᶗ‹ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
export let siicatsiicanaAktiva = "movigi";
export let bs2Aktiva = 0o1;           // ɭʃэ ſɟᴜ ｡ j͑ʃᴜ j͑ʃᴜ ｡ ( ı=ɭl̀ᴜ ſ͕ɭɜ, ɿ=j͐ʃɜ ɭʃᴜ, ц=ᶅſɔ ɽ͑ʃ'ɔ, э=ſᶘꞇȝ ſɟwƽ, ꞟ=tsake, ɔ=ſɭᴜ ｡ )
export let pagaAktiva = 0o1;           // ɭʃэ ſɟᴜ ｡ ſןᴜ ſ͔ɭᴜ ｡ ( ı=ſᶘꞇȝ ſןᴜ ſ͔ɭᴜ, ɿ=ſɟɜ ŋᷠᴜ ֭ſɭᴜƽ, э=NPC )
export let pagaForvisxa = false;      // ſןᴜ ſ͔ɭᴜ ｡ ſɟᴜᴜ̩ ɭʃɹ ｡ ֭ſɭɹͷ̗ ｡ ſɭɹʞ ｡
// ſɭэ ſɭw , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
export function tsekeMovigi(): boolean { return siicatsiicanaAktiva === "movigi"; }
export const ka5ik = () => +ka5ikKama.value;
export const g2sa = () => +g2saKama.value;

/* ſɭᴜ ſןᴜ , ꞙɭı ,
   |dx| + |dz| ｡ ſɭɹ ſןᴜ ｡ ı],ɔ j͑ʃᴜ̭ɔ ɭʃꞇ ｡ x ｡ z ｡
    @param cx ( number ) - ʃᴜ j͐ʃɹ x ｡ ı],ɔ j͑ʃᴜ̭ɔ ɭʃꞇ ｡
    @param cz ( number ) - ʃᴜ j͐ʃɹ z ｡ ı],ɔ j͑ʃᴜ̭ɔ ɭʃꞇ ｡
    @param r ( number ) - j͑ʃɜ j͑ʃƨɹ ｡ ı],ɔ j͑ʃᴜ̭ɔ ɭʃꞇ ｡
    @param g2saVal ( number ) - ſ͕ɭɜ ｡
    @param hunaq ( string ) - ı],ɔ j͑ʃᴜ̭ɔ ɭʃꞇ ｡ j͑ʃᴜ j͑ʃᴜ ｡
    @param t12na ( Map<number, number> ) - ſɭɹ ſןᴜ ｡ ſɭᴜ ｡
        ı],ɔ j͑ʃᴜ̭ɔ ɭʃꞇ ｡ ſɭɹ ſןᴜ ｡ ſɭᴜ ｡
@returns ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ( KradaRektangulo ) ｡ */
export function siicatsiicanaApliki(cx: number, cz: number, r: number, g2saVal: number,
  hunaq: string, t12na: Map<number, number>): KradaRektangulo {
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
  ( { platigaCelo, treno } = bokMuson() );
  const ix0 = Math.max(0o0, Math.floor(( cx - r - X0 ) / Tona));
  const ix1 = Math.min(N - 0o1, Math.floor(( cx + r - X0 ) / Tona));
  const iz0 = Math.max(0o0, Math.floor(( cz - r - Z0 ) / Tona));
  const iz1 = Math.min(N - 0o1, Math.floor(( cz + r - Z0 ) / Tona));
  for ( let iz = iz0; iz <= iz1; iz++ ) {
    const z = Z0 + iz * Tona;
    for ( let ix = ix0; ix <= ix1; ix++ ) {
      const x = X0 + ix * Tona;
// ſ͕ɭɜ ı],ᴜ , ꞙɭɿ ,
      const d = Math.abs(x - cx) + Math.abs(z - cz);
      if ( d > r ) continue;
      const f = 0o1 - ( d / r ) * ( d / r );       // j͑ʃɜ j͑ʃƨɹ ｡ ſןw ſɭᴜƴ ｡
      const idx = iz * N + ix;
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ( ſןɔ˞ᴜƴ , ꞙɭɿɔ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
      const h2y2kF = t12na.get(idx);
      if ( h2y2kF !== undefined && f <= h2y2kF ) continue;
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
      const df = h2y2kF === undefined ? f : f - h2y2kF;
      t12na.set(idx, f);
      if ( hunaq === "levi" ) {
        hal6da[idx] += g2saVal * 0o2 * df;
      } else if ( hunaq === "maltiknigi" ) {
        hal6da[idx] -= g2saVal * 0o2 * df;
      } else if ( hunaq === "platigi" && platigaCelo !== null ) {
        const sef4 = platigaCelo - kozonuL6da(x, z);
        hal6da[idx] += ( sef4 - hal6da[idx] ) * g2saVal * df;
      } else if ( hunaq === "glatigi" ) {
        const sost2 = ( l6daK2pa(ix - 0o1, iz) + l6daK2pa(ix + 0o1, iz)
          + l6daK2pa(ix, iz - 0o1) + l6daK2pa(ix, iz + 0o1) ) / 0o4;
        hal6da[idx] += ( sost2 - hal6da[idx] ) * g2saVal * df;
      } else if ( hunaq === "forvisxi" ) {
        hal6da[idx] = 0o0;
        k6liqani[idx] = 0o0;
      } else if ( hunaq === "bs2" ) {
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭɿ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭц ,
// ⟨ ſᶘᴜ j͑ʃᴜ , 📃 ⟩ , ſᶘᴜ j͑ʃᴜ , ꞙɭэ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭɩ ,
        const tsasa = tsekeTsasaK2pa(ix, iz);
        if ( bs2Aktiva === 0o0 ) habs2[idx] = 0o0;
        else if ( bs2Aktiva >= 0o4 ? tsasa : !tsasa ) habs2[idx] = bs2Aktiva;
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
        const tsasa = tsekeTsasaK2pa(ix, iz);
        if ( pagaForvisxa ) hapaga[idx] &= ~pagaAktiva;
        else if ( pagaAktiva === 0o1 ? tsasa : pagaAktiva === 0o4 ? !tsasa : true ) hapaga[idx] |= pagaAktiva;
      }
// ſɭэ ſɭw , ꞙɭı ,
    }
  }
  return { ix0, ix1, iz0, iz1 };
}
/* ſɭᴜ ſןᴜ , ꞙɭɿ ,
    @param cx ( number ) - ʃᴜ j͐ʃɹ x ｡ ſȷэⅎ ｡
    @param cz ( number ) - ʃᴜ j͐ʃɹ z ｡ ſȷэⅎ ｡ */
export function siicatsiicanaTona(cx: number, cz: number): void {
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
  ( { platigaCelo, treno } = bokMuson() );
  const t = treno;
  if ( !t ) return;
  const h6kuni = Math.hypot(cx - t.lastX, cz - t.lastZ);
  const havepat6ni = Math.max(0o1, Math.ceil(h6kuni / ( 0o23/0o40 )));
  for ( let k = 0o1; k <= havepat6ni; k++ ) {
    const px = t.lastX + ( cx - t.lastX ) * k / havepat6ni;
    const pz = t.lastZ + ( cz - t.lastZ ) * k / havepat6ni;
    siicatsiicanaApliki(px, pz, ka5ik(), g2sa(), siicatsiicanaAktiva, t.t12na);
  }
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
  const deX = t.lastX, deZ = t.lastZ;
  t.lastX = cx; t.lastZ = cz;
  s2tasVeq6k2itan();
// ſɭɜ ſɭ,w , ꞙɭɿ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭц ,
  s2tasTsasaS23ohk2sain();
  statuso("j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ｡ ſɭɜ ſȷɔ ſɭ,ꞇ");
  const r = ka5ik();
  const px0 = Math.max(0o0, Math.min(REZ - 0o1, mondoxAlPikselo(Math.max(deX, cx) + r + 0o1)));
  const px1 = Math.max(0o0, Math.min(REZ - 0o1, mondoxAlPikselo(Math.min(deX, cx) - r - 0o1)));
  const py0 = Math.max(0o0, Math.min(REZ - 0o1, mondozAlPikselo(Math.max(deZ, cz) + r + 0o1)));
  const py1 = Math.max(0o0, Math.min(REZ - 0o1, mondozAlPikselo(Math.min(deZ, cz) - r - 0o1)));
  revek2feDeklik6h6n(px0 - 0o2, py0 - 0o2, px1 + 0o2, py1 + 0o2);
  pentri(px0, py0, px1, py1);
  s2tasDesegnon();
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
interface MusoS2k61o {
  platigaCelo: number | null;
  treno: PenikaTreno | null;
}
interface PenikaLigo {
  hal6da: Float32Array;
  k6liqani: Uint8Array;
  habs2: Uint8Array;
  hapaga: Uint8Array;
  N: number;
  Tona: number;
  X0: number;
  Z0: number;
  statuso: ( s2banani: string ) => void;
  s2tasDesegnon: () => void;
  s2tasVeq6k2itan: () => void;
  ka5ikKama: HTMLInputElement;
  g2saKama: HTMLInputElement;
  muso: () => MusoS2k61o;
}
let hal6da: Float32Array;
let k6liqani: Uint8Array;
let habs2: Uint8Array;
let hapaga: Uint8Array;
let N: number;
let Tona: number;
let X0: number;
let Z0: number;
let statuso: ( s2banani: string ) => void = () => { };
let s2tasDesegnon: () => void = () => { };
let s2tasVeq6k2itan: () => void = () => { };
let ka5ikKama: HTMLInputElement;
let g2saKama: HTMLInputElement;
let platigaCelo: number | null = null;
let treno: PenikaTreno | null = null;
let bokMuson: () => MusoS2k61o = () => ( { platigaCelo: null, treno: null } );

/* ſɭэ ᶗ‹ , ꞙɭɿ ,
    @param L ( PenikaLigo ) - j͑ʃᴜ j͑ʃᴜ ｡ ſɭɜ ſȷᴜ ｡ ſɟᴜᴜ̩ ɭʃɹ ｡ */
export function catsaraPenikojn(L: PenikaLigo): void {
  ( { hal6da, k6liqani, habs2, hapaga, N, Tona, X0, Z0, statuso, s2tasDesegnon,
    s2tasVeq6k2itan, ka5ikKama, g2saKama } = L );
  bokMuson = L.muso;
}

// ⟪ ſɭэ ᶗ‹ , ꞙɭц , 📃 ⟫ , ſɭэ ᶗ‹ ,
// ſɭэ ᶗ‹ , ꞙɭэ ,
export function catsaraSiicatsiicana(ksaka: string): void { siicatsiicanaAktiva = ksaka; }
export function catsaraBs2n(n: number): void { bs2Aktiva = n; }
export function catsaraPagan(n: number): void { pagaAktiva = n; }
export function catsaraPagaForvisxon(v: boolean): void { pagaForvisxa = v; }
