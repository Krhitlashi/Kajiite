// ≺⧼ j͑ʃɔ j͑ʃɜȝ ʌ ſɭɔ ſ͕ɭɜ ı],ᴜ 🧩 ⧽≻
import * as THREE from "three";
import { vakox2qQoxaKefoujn } from "../../x2x2q/hakox2q.js";
import { kf2Botan } from "./pat6Soqte.js";
import { kf2ArtikanSferon, remapiUVon } from "./haqoxa.js";
import { kf2KorpanTorson, kf2KorpanKruropon, kf2KorpanBrakon, kf2KorpanManon, kf2KorpanPiedon, kf2Pantalonan } from "./soq.js";
import { T2BANUL6DA, T2BANUDX, T2BANUDY, T2BANUDZ, T2BANUSEFINI } from "./t2banu.js";
import { KOLOY, KUBUTOY } from "./havecax2l.js";
import { kf2SlafTonditanTubon, kf2H6w6anRobonS2cel2n, kf2InternanS2cel2n } from "./has2cel2.js";
import { kf2Okulon, kf2Palpebrojn, kf2Nazon, kf2KapanKranion, kf2Orelon, kf2VizaĝajnStrikojn, kf2Buŝon } from "./tez.js";

// ⟨ ſ͕ɭɜ ı],ᴜ ʌ ſɭᴜ ſןᴜ , ⟅ ⟩
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , ⟅ ⟩

// ⟨ ſɭᴜ ſ͕ȷɔ , j͑ʃɜȝ ɭʃɔ , ⟅ ⟩
let figurajHavecax2lani: {
  kapa: THREE.BufferGeometry;
  vizaĝo: THREE.BufferGeometry;
  vizaĝajStrikoj: THREE.BufferGeometry;
  hatu5ekanit2banusai: THREE.BufferGeometry;
  soq: THREE.BufferGeometry;
// ⟨ ſɭᴜ ſ͕ȷɔ , ꞙɭɿ , ⟅ ⟩
  kruroTeru: THREE.BufferGeometry;
  kruroMaltik: THREE.BufferGeometry;
  korpaPiedo: THREE.BufferGeometry;
  brakoTeru: THREE.BufferGeometry;
  brakoMaltik: THREE.BufferGeometry;
  tama: THREE.BufferGeometry;
  hacavaxaha: THREE.BufferGeometry;
  c2h2: THREE.BufferGeometry;
  roba: THREE.BufferGeometry;
  pantalonaTeru: THREE.BufferGeometry;
  pantalonaMaltik: THREE.BufferGeometry;
  boto: THREE.BufferGeometry;
  akcenta: THREE.BufferGeometry;
  manikaTeru: THREE.BufferGeometry;
  manikaMaltik: THREE.BufferGeometry;
} | null = null;

export function figurajQoxaKefoujn(): NonNullable<typeof figurajHavecax2lani> {
  if ( figurajHavecax2lani ) return figurajHavecax2lani;

  // ⟨ ſɭэ ɭʃᴜ , ⟅ ⟩
  const wopo = kf2KapanKranion();
  // ⟨ ɭʃᴜ , ꞙɭı , ⟅ ⟩
  const laz = new THREE.CylinderGeometry(0o56/0o1000, 0o71/0o1000, 0o5/0o40, 0o14, 0o1);
  laz.translate(0, KOLOY, 0);
  const kapajHakek: THREE.BufferGeometry[] = [ wopo, laz ];
  // ⟨ ɭʃɜ ſɭɹȝ , ſɟɔȝ , ⟅ ⟩
  for ( const dir of [ -0o1, 0o1 ] ) kapajHakek.push(kf2Orelon(dir));
  // ⟨ j͑ʃɹ ŋᷠɹ , ɭʃᴜ , ⟅ ⟩
  kapajHakek.push(kf2Nazon());
  const kapa = vakox2qQoxaKefoujn(kapajHakek);

  // ⟨ j͑ʃᴜ ʃɜƽ , ɭʃɜ ſɭɹȝ , ⟅ ⟩
  // ⟨ ɭʃɹ ʃᴜ }ʃw , ⟅ ⟩
  // ⟨ ſᶘɔ ʌ ſ̀ȷᴜ ſɟɔ ɭʃɹ ʃᴜ }ʃw j͑ʃᴜꞇ ꞙɭɔ , ⟅ ⟩
  const hat2banu: THREE.BufferGeometry[] = [
    kf2Okulon(-0o1, T2BANUDX, T2BANUDY, T2BANUDZ, T2BANUSEFINI, T2BANUL6DA, -0o1/0o10),
    kf2Okulon(0o1, T2BANUDX, T2BANUDY, T2BANUDZ, T2BANUSEFINI, T2BANUL6DA, 0o1/0o10),
  ];
  // ⟨ ᶅſэ ſ͕ɭᴜ , ſ͕ɭɜ ı],ᴜ ʌ ɭʃɜ ſɭɹȝ , ⟅ ⟩
  const vizaĝo = vakox2qQoxaKefoujn([ ...hat2banu, kf2Buŝon() ]);
  // ⟨ ſ̀ȷᴜ ſɟɔ ɭʃɹ ʃᴜ }ʃw j͑ʃᴜꞇ , ⟅ ⟩
  const vizaĝajStrikoj = kf2VizaĝajnStrikojn();

  // ⟨ ſןᴜ ɭʃэ , j͑ʃɜȝ ɭʃɔ , ⟅ ⟩
  const { boto, akcentaj } = kf2Botan();

  // ⟨ ɭʃꞇƽ , ⟅ ⟩
  const nasce = kf2KorpanKruropon();
  const knece = kf2KorpanBrakon();
  const pantalono = kf2Pantalonan();
  // ⟨ ɭʃꞇƽ , ſɟᴜ j͑ʃ'ᴜ ı],ᴜ ֭ſɭᴜ , ⟅ ⟩
  const hatama = kf2KorpanManon();
  // ⟨ j͑ʃɜȝ ɭʃɔ , ſɭᴜc̭ ſɟɹƽ , ⟅ ⟩
  // ⟨ ꞙɭɿ , UV , ꞙɭı , ⟅ ⟩
  const MANIKAKMARO = 0o11/0o200;
  // ⟨ j͑ʃɜȝ ɭʃɔ , ɭʃꞇƽ , ⟅ ⟩
  const MANIKAMALKMARO = 0o50/0o1000;
  const KUBUTAY = KUBUTOY;
  // ⟨ j͑ʃɜȝ ɭʃɔ , ɔ.ɿꞟ , ſɭᴜc̭ ſɟɹƽ , ꞙɭı , ⟅ ⟩
  const MANUMOMALKMARO = 0o1/0o4;
  const MANIKABAZO = KUBUTAY - MANUMOMALKMARO;
  const KUBUTAV = KUBUTAY / MANIKABAZO;
  // ⟨ j͑ʃɜȝ ɭʃɔ , ꞙɭɔ , ꞙɭı , ⟅ ⟩
  const KUBUTAR = MANIKAKMARO + ( MANIKAMALKMARO - MANIKAKMARO ) * 0o1/0o4;
  const manikaTeru = remapiUVon(kf2SlafTonditanTubon(MANIKAKMARO, KUBUTAR, 0,
    KUBUTAY, 0o60, 0o4, 0, 0, true), 0, KUBUTAV);
  // ⟨ j͑ʃͷ̗ᴜʞ , j͑ʃᴜ ʃɜ , ſɭɜ ſɭᴜƽ , ⟅ ⟩
  // ⟨ ı],э ŋᷠꞇ , ꞙɭı , ɭʃꞇƽ , ⟅ ⟩
  const malprofundeco = 0o3/0o200;
  const manikaMaltik = kf2SlafTonditanTubon(KUBUTAR, MANIKAMALKMARO, KUBUTAY,
    MANIKABAZO, 0o60, 0o4, malprofundeco, 0o10/0o1000, false);
  remapiUVon(manikaMaltik, KUBUTAV, 0o1);
  manikaMaltik.translate(0, -KUBUTAY, 0);
  // ⟨ ɭʃᴜʞ ꞁȷ̀ᴜ }ʃꞇ ɭʃᴜc̭ ſɟɔ j͑ʃᴜꞇ , j͑ʃɜȝ ɭʃɔ , ⟅ ⟩
  // ⟨ ꞙɭı , ɭʃᴜʞ ꞁȷ̀ᴜ }ʃꞇ ɭʃᴜc̭ ſɟɔ j͑ʃᴜꞇ , ⟅ ⟩
  const manikaArtiko = kf2ArtikanSferon([ 0, 0, -0o3/0o1000 ], KUBUTAR, 0o7/0o10);
  figurajHavecax2lani = {
    // ⟨ ſɭᴜ ſ͕ȷɔ , ⟅ ⟩
    kapa,
    vizaĝo,
    vizaĝajStrikoj,
    hatu5ekanit2banusai: kf2Palpebrojn(),
    soq: kf2KorpanTorson(),
    kruroTeru: nasce.teru,
    kruroMaltik: nasce.maltik,
    korpaPiedo: kf2KorpanPiedon(),
    brakoTeru: knece.teru,
    brakoMaltik: knece.maltik,
    tama: hatama.tama,
    hacavaxaha: hatama.hacavaxaha,
    c2h2: kf2InternanS2cel2n(),
    // ⟨ j͑ʃɜȝ ɭʃɔ , ⟅ ⟩
    roba: kf2H6w6anRobonS2cel2n(),
    pantalonaTeru: pantalono.teru,
    pantalonaMaltik: pantalono.maltik,
    boto,
    akcenta: akcentaj,
    // ⟨ j͑ʃɜȝ ɭʃɔ , j͑ʃᴜ ֭ſɭᴜƽ ɭʃɔ , ⟅ ⟩
    // ⟨ j͑ʃɜȝ ɭʃɔ , ꞙɭɔ , ɭʃꞇƽ , ⟅ ⟩
    manikaTeru,
    manikaMaltik: vakox2qQoxaKefoujn([ manikaMaltik, manikaArtiko ]),
  };
  return figurajHavecax2lani;
}
