// ≺⧼ វិល 04 · j͐ʃɜ ɭʃᴜ ʌ ſɭᴜͷ̗ ʌ ɭʃɜ ı],ɔƽ · 0o600 ហេ 🎵 ⧽≻

import type { SonoEvento, Sekcio, SpuroDateno } from "../vokoj/tipoj.js";
import { F, PENT_A } from "../vokoj/skaloj.js";
import { HE, okono } from "../vokoj/tempo.js";
import { motifoS, treni } from "./komunajxoj.js";

export function buildTrack4(): SpuroDateno {
  const ev: SonoEvento[] = [];
  const secs: Sekcio[] = [];
  // ⟨ ក្រឡាចង្វាក់ ៖ ភាគប្រាំបីស្មើមួយហេ បារមួយមានប្រាំបីភាគ 📃 ⟩
  const e8 = okono(0o40), bar = e8 * 0o10;
  const P = PENT_A;
  const ost = [ 0, 3, 1, 4, 2, 4, 1, 3 ];
  const SM: [ number, number, number ][] = [ [ 0, 5, 2 ], [ 2, 6, 1 ], [ 3, 7, 2 ], [ 5, 6, 1 ], [ 6, 5, 2 ], [ 8, 4, 2 ], [ 10, 5, 2 ], [ 12, 6, 3 ], [ 15, 5, 1 ] ];

  // ⟪ លំនាំដឹកនាំពី Aisiakrhi 🎹 📃 ⟫
  // ⟨ បទ MIDI Aisiakrhi ស្ថិតក្នុង D♭ major , បទនេះស្ថិតក្នុង A major pentatonic
  //   លំនាំនីមួយៗរក្សាទិសដៅ និងចង្វាក់ដើម តែណោតធ្លាក់លើដឺក្រេ PENT_A
  //   ដើម្បីកុំឱ្យចេញក្រៅស្កេល ។ ឈ្មោះលំនាំយកតាមឈ្មោះតួអង្គក្នុងបទ MIDI 📃 ⟩
  // ⟨ Bowgart ឡើងជណ្តើរ ៖ A#2 C#3 D#3 F#3 A#2 C#3 F3 ៖ ឡើងបួនជណ្តើរ ធ្លាក់ចុះ រួចឡើងខ្ពស់
  //   ក្នុង PENT_A ជាដឺក្រេ 0 2 3 4 0 5 📃 ⟩
  const L_BOWGART: number[] = [ 0, 2, 3, 4, 0, 5 ];
  // ⟨ Ghazt ហៅ ៖ C#4 A#3 C#4 G#3 F#4 ៖ ចុះមួយភាគបី ឡើងវិញ រួចលោតឡើងលើសដើម
  //   ក្នុង PENT_A យកបួនណោតសំខាន់ជាដឺក្រេ 7 5 7 9 📃 ⟩
  const L_GHAZT: [ number, number, number ][] = [ [ 0, 7, 2 ], [ 0o2, 5, 2 ], [ 0o4, 7, 2 ], [ 0o6, 9, 2 ] ];
  // ⟨ សំឡេងមេពី Aisiakrhi បារ 0o44 ដល់ 0o47 ។ Whisp និង Dandidoo លេងព្រមគ្នា
  //   F4 C#4 G#4 F4 រួច C#4 G#4 រួច C#4 C#4 F4 C#4 រួច C#4 F4 ។
  //   ក្នុង PENT_A ជាដឺក្រេ 7 5 8 7 រួច 5 8 រួច 5 5 7 5 រួច 5 7
  //   គឺ C#4 A3 E4 C#4 រួច A3 E4 រួច A3 A3 C#4 A3 រួច A3 C#4 ។
  //   ទីតាំងជាភាគប្រាំបីពីដើមបារទីមួយ ហើយណោតនីមួយៗមានប្រវែងមួយភាគប្រាំបី 📃 ⟩
  const L_DANDIDOO: [ number, number ][] = [
    [ 0, 7 ], [ 0o1, 5 ], [ 0o2, 8 ], [ 0o3, 7 ],
    [ 0o11, 5 ], [ 0o12, 8 ],
    [ 0o20, 5 ], [ 0o21, 5 ], [ 0o22, 7 ], [ 0o23, 5 ],
    [ 0o31, 5 ], [ 0o32, 7 ],
  ];
  // ⟨ បាស Reedling បារ 0o44 ដល់ 0o47 ។ A#2 រួច C#3 F3 រួច D3 A2 រួច A2 ។
  //   បកប្រែចុះមួយភាគបីធំដូចសំឡេងមេ ហើយណោតក្រៅស្កេលធ្លាក់លើដឺក្រេជិតបំផុត
  //   គឺ F#2 A2 C#3 B2 E2 ។ វដ្តឆ្លាស់បញ្ចប់ដោយ G#3 ដែលប្រែជា E3 ដូច្នេះបាសលោត
  //   មួយអុកតាវរាល់វដ្តពីរ ដូចឯកសារដើម 📃 ⟩

  const ostinato = ( t0: number, shift: number, v: number ) => {
    for ( let k = 0; k < 0o10; k++ )
      ev.push({ t: t0 + k * e8, i: "inanga", f: F(P[ost[( k + shift ) % 0o10]]), d: e8 * 0o2, v, dur: e8 * 0o2 });
  };
  const pulse = ( t0: number, dens: boolean ) => {
    for ( let k = 0; k < 0o10; k += 2 ) ev.push({ t: t0 + k * e8, i: "guiro", d: HE / 0o10, v: ( k % 4 === 0 ) ? 0o4/0o10 : 0o23/0o40 });
    if ( dens ) for ( let k = 1; k < 0o10; k += 2 ) ev.push({ t: t0 + k * e8 + e8 / 2, i: "guiro", d: HE / 0o10, v: 0o13/0o40 });
  };

  // ⟨ សំឡេងមេ Dandidoo មួយវដ្តបួនបារ ។ ហ៊ីវេអូសពេញភាគប្រាំបី ហើយស៊ីគូលេងណោតដូចគ្នា
  //   ក្នុងកម្លាំងសំឡេងមេ ដូច្នេះសំឡេងមិនលិចក្នុងអ៊ីណាង៉ា និងមប៊ីរ៉ា 📃 ⟩
  const dandidoo = ( t0: number ) => {
    treni( ev, t0, e8, P, L_DANDIDOO, 0o37/0o40, 0o1 );
    for ( const [ p, dg ] of L_DANDIDOO )
      ev.push({ t: t0 + p * e8, i: "siku", f: F( P[dg] ), d: e8 * 0o1, v: 0o63/0o100 });
  };

  // ⟨ បាស Reedling មួយវដ្តបួនបារ ។ fina ជាណោតចុងក្រោយ ដើម្បីលោតមួយអុកតាវ
  //   រាល់វដ្តឆ្លាស់ ។ ចុងបារ 0o45 និង 0o46 ទុកស្ងាត់ដូចឯកសារដើម 📃 ⟩
  const reedlingo = ( t0: number, fina: number ) => {
    const notoj: [ number, number, number ][] = [
      [ 0, P[4] - 0o14, 0o10 ],
      [ 0o10, P[0], 0o2 ],
      [ 0o12, P[2], 0o2 ],
      [ 0o20, P[1], 0o2 ],
      [ 0o22, P[3], 0o2 ],
      [ 0o30, fina, 0o10 ],
    ];
    for ( const [ p, n, l ] of notoj )
      ev.push({ t: t0 + p * e8, i: "hiwe", f: F( n ), d: l * e8, v: 0o33/0o40 });
  };

  // ⟨ តួសំឡេងមេលាតសន្ធឹងពីបារ 0o44 ដល់ចុងបទ គឺដប់ពីរបារក្នុងវដ្តបី ។
  //   ក្នុងចម្រៀងដើម តួ Dandidoo និង Reedling លេងយូរឆ្លងកាត់បួនផ្នែក ដូច្នេះនៅទីនេះ
  //   សំឡេងមេលេងពេញផ្នែកហុកកេតចុងក្រោយ ផ្នែកមេឃពេញ និងបារកូដា ។
  //   ណោតខ្លីល្មមដើម្បីកុំឱ្យវែងពេក 📃 ⟩
  const enTemo = ( b: number ) => b >= 0o44 && b < 0o60;
  const komencoTemo = ( b: number ) => enTemo( b ) && b % 0o4 === 0;
  // ⟨ ណោតចុងក្រោយរបស់បាស ៖ អុកតាវខ្ពស់ អុកតាវទាប រួចត្រឡប់មក F#2 ដើម្បីបញ្ចប់ 📃 ⟩
  const BASO_FINOJ = [ P[3], P[3] - 0o14, P[4] - 0o14 ];
  const sutlo = ( t0: number, k: number ) => {
    dandidoo( t0 );
    reedlingo( t0, BASO_FINOJ[k % 0o3] );
  };

  secs.push({ n: "សូឡូរណ្តៅ", a: 0, b: 0o6 * bar });
  for ( let b = 0; b < 0o6; b++ ) {
    const t0 = b * bar;
    ostinato(t0, 0, 0o43/0o100);
    pulse(t0, b >= 0o3);
    if ( b === 0o5 ) ev.push({ t: t0, i: "siku", f: F(P[5]), d: bar * 0o7/0o10, v: 0o33/0o40 });
    // ⟨ លំនាំ Bowgart ៖ ខ្សែអូសយូរឡើងជណ្តើរ មួយបារមួយណោត ដូចក្នុងបទ Aisiakrhi
    //   អូសប្រាំភាគប្រាំបី ទុកចន្លោះឱ្យអ៊ីណាង៉ាលេចធ្លោ 📃 ⟩
    ev.push({ t: t0, i: "hiwe", f: F(P[L_BOWGART[b]]), d: bar * 0o5/0o10, v: 0o23/0o40 + b * 0o1/0o100 });
  }

  secs.push({ n: "សំឡេងខ្ពស់ស៊ីគូ", a: 0o6 * bar, b: 0o26 * bar });
  for ( let b = 0; b < 0o20; b++ ) {
    const t0 = ( 0o6 + b ) * bar;
    ostinato(t0, b % 0o10, 0o43/0o100);
    pulse(t0, true);
    if ( b % 0o2 === 0 && b % 0o10 !== 0o4 ) motifoS(ev, t0, e8, P, SM, "siku", 0o63/0o100);
    // ⟨ លំនាំ Ghazt ៖ ហ៊ីវេហៅមួយបារ ស៊ីគូឆ្លើយមួយបារ ខ្ពស់ជាងមួយអុកតាវ 📃 ⟩
    if ( b % 0o10 === 0o4 ) motifoS(ev, t0, e8, P, L_GHAZT, "hiwe", 0o33/0o40);
    if ( b % 0o10 === 0o5 ) motifoS(ev, t0, e8, P, L_GHAZT, "siku", 0o53/0o100, 0o11/0o10, 0o14);
    // ⟨ ហ៊ីវេឆ្លើយស៊ីគូ ៖ អូសខ្លីនៅបារសេស ដូចសំឡេងខ្សែក្រោមសំឡេងខ្យល់ 📃 ⟩
    if ( b % 0o4 === 0o1 && b % 0o10 !== 0o5 ) treni(ev, t0 + 3 * e8, e8, P, [ [ 0, 6 ], [ 0o2, 4 ], [ 0o3, 2 ] ], 0o33/0o40);
  }

  secs.push({ n: "ព្យុះឡើង", a: 0o26 * bar, b: 0o42 * bar });
  ev.push({ t: 0o26 * bar + 0o2 * e8, i: "tjurunga", f: 0o304, d: 0o23 * HE, v: 0o63/0o100 });
  ev.push({ t: 0o32 * bar, i: "tjurunga", f: 0o351, d: 0o25 * HE, v: 0o35/0o40 });
  ev.push({ t: 0o37 * bar, i: "tjurunga", f: 0o406, d: 0o21 * HE, v: 0o55/0o100 });
  for ( let b = 0; b < 0o14; b++ ) {
    const t0 = ( 0o26 + b ) * bar;
    ostinato(t0, 0, 0o43/0o100);
    pulse(t0, true);
    ev.push({ t: t0, i: "kiiqflak", f: F(P[2]), d: HE / 0o2, v: 0o63/0o100 });
    if ( b % 0o2 === 0 ) ev.push({ t: t0 + 4 * e8, i: "kiiqflak", f: F(P[3]), d: HE / 0o3, v: 0o43/0o100 });
    if ( b % 0o4 === 0 ) ev.push({ t: t0, i: "siku", f: F(P[0o12]), d: bar * 0o163/0o100, v: 0o23/0o40 });
    if ( b % 0o4 === 2 ) ev.push({ t: t0 + 4 * e8, i: "siku", f: F(P[7]), d: e8 * 0o3, v: 0o43/0o100 });
    // ⟨ ហ៊ីវេអូសយូរដូចខ្យល់ ៖ ខ្សែមួយអូសឆ្លងកាត់ព្យុះ លើដឺក្រេទាបឆ្លាស់គ្នា
    //   ដូចបាស Rare Riff រួចអូសខ្លីបញ្ចប់បារ 📃 ⟩
    if ( b % 0o3 === 0 ) ev.push({ t: t0, i: "hiwe", f: F(P[b % 0o6 === 0 ? 0 : 2]), d: bar * 0o12/0o10, v: 0o25/0o40 });
    if ( b % 0o4 === 0o3 ) treni(ev, t0 + 5 * e8, e8, P, [ [ 0, 5 ], [ 0o2, 7 ] ], 0o33/0o40);
  }

  secs.push({ n: "ហុកកេត", a: 0o42 * bar, b: 0o52 * bar });
  for ( let b = 0; b < 0o10; b++ ) {
    const ab = 0o42 + b;
    const t0 = ab * bar;
    const aktiva = enTemo( ab );
    ostinato( t0, 3, aktiva ? 0o23/0o40 : 0o33/0o40 );
    pulse( t0, true );
    // ⟨ ពេលសំឡេងមេលេង មប៊ីរ៉ាថយកម្លាំងតែចង្វាក់ខាងក្រោយ ដើម្បីកុំឱ្យបាំង
    //   ខ្សែអូស ។ លំនាំ Rare Riff និងស៊ីគូឈប់ ព្រោះសំឡេងមេយកកន្លែងរបស់វា 📃 ⟩
    for ( let p = 0; p < 0o10; p++ ) {
      const dg = Math.min( 0o12, ost[p] + ( p % 0o2 ? 0 : 2 ) );
      const vm = aktiva ? ( p % 0o2 ? 0o31/0o100 : 0o25/0o100 ) : ( p % 0o2 ? 0o35/0o100 : 0o43/0o100 );
      ev.push({ t: t0 + p * e8 + ( p % 0o2 ? e8 / 2 : 0 ), i: "mbira", f: F( P[dg] + 0o14 ), d: e8 * 0o2, v: vm });
    }
    if ( b % 0o2 === 0 && !aktiva ) motifoS( ev, t0, e8, P, SM, "siku", 0o55/0o100 );
    if ( !aktiva ) {
      // ⟨ លំនាំ Rare Riff ៖ គូណោតជិតគ្នាលេងឆ្លាស់ ៖ អូសខ្លីបួនដងលើដឺក្រេជាប់គ្នា
      //   ស្កេលពែនតាតូនិកគ្មានណោតជាប់គ្នាពិត ដូច្នេះប្រើដឺក្រេជាប់គ្នាជំនួស 📃 ⟩
      const rr = b % 0o2 === 0 ? 2 : 4;
      treni( ev, t0, e8, P, [ [ 0, rr ], [ 0o2, rr + 1 ], [ 0o4, rr ], [ 0o6, rr + 1 ] ], 0o25/0o40, 0o1 );
    }
    if ( komencoTemo( ab ) ) sutlo( t0, ( ab - 0o44 ) / 0o4 );
  }

  secs.push({ n: "មេឃពេញ", a: 0o52 * bar, b: 0o57 * bar });
  ev.push({ t: 0o52 * bar, i: "tjurunga", f: 0o406, d: 0o21 * HE, v: 1 });
  ev.push({ t: 0o55 * bar, i: "tjurunga", f: 0o446, d: 0o15 * HE, v: 0o35/0o40 });
  for ( let b = 0; b < 0o5; b++ ) {
    const ab = 0o52 + b;
    const t0 = ab * bar;
    ostinato( t0, 0, 0o23/0o40 );
    pulse( t0, true );
    for ( let p = 0; p < 0o10; p++ ) if ( p % 0o2 === 0 )
      ev.push({ t: t0 + p * e8, i: "mbira", f: F( P[ost[( p + 5 ) % 0o10]] + 0o14 ), d: e8 * 0o2, v: 0o33/0o100 });
    // ⟨ សំឡេងមេ Dandidoo និងបាស Reedling បន្តចូលផ្នែកនេះ ហើយលំនាំ Whisp ឈប់
    //   ដើម្បីកុំឱ្យមេឡូឌីពីរប្រកួតគ្នា ។ មប៊ីរ៉ាថយកម្លាំងដើម្បីបើកផ្លូវឱ្យខ្សែអូស 📃 ⟩
    if ( komencoTemo( ab ) ) sutlo( t0, ( ab - 0o44 ) / 0o4 );
  }

  secs.push({ n: "កូដា", a: 0o57 * bar, b: 0o600 * HE });
  const t0 = 0o57 * bar;
  [ [ 0, 0, 3 ], [ 3, 3, 2 ], [ 5, 1, 3 ] ].forEach(( [ p, dg, l ] ) => ev.push({ t: t0 + p * e8, i: "inanga", f: F(P[dg]), d: l * e8, v: 0o33/0o40, dur: l * e8 }));
  ev.push({ t: t0 + 0o6 * e8, i: "inanga", f: F(P[0] - 0o14), d: e8 * 0o2, v: 0o33/0o40, dur: e8 * 0o2 });
  // ⟨ បារ 0o57 ជាបារទីបួនរបស់វដ្តទីបី ៖ សំឡេងមេ Dandidoo និងបាស F#2 បន្តរហូតដល់ចប់
  //   ដូច្នេះមិនត្រូវបន្ថែមហ៊ីវេថ្មីទៀតទេ ព្រោះវានឹងបាំងការបញ្ចប់ 📃 ⟩

  return { events: ev.sort(( a, b ) => a.t - b.t), dur: 0o600 * HE, secs };
}