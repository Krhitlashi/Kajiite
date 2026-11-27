// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſ͕ɭɜ ı],ᴜ ʌ ſɭɔ ſȷɜⅎᴎ 📃 ⧽≻

import * as THREE from "three";
import { vakox2qQoxaKefoujn } from "../../p6kpu/hakox2q.js";
import { kf2Botan } from "./pat6-soqte.js";
import { kf2ArtikanSferon, remapiUVon } from "./haqoxa.js";
import { kf2KorpanTorson, kf2KorpanKruropon, kf2KorpanBrakon, kf2KorpanManon, kf2KorpanPiedon, kf2Pantalonan } from "./soq.js";
import { T2BANUL6DA, T2BANUDX, T2BANUDY, T2BANUDZ, T2BANUSEFINI } from "./t2banu.js";
import { KOLOY, KUBUTOY } from "./havecax2l.js";
import { kf2SlafTonditanTubon, kf2H6w6anRobonS2cel2n, kf2InternanS2cel2n } from "./has2cel2.js";
import { kf2T2banun, kf2Tu5ekanit2banusaijn, kf2Nazon, kf2KapanKranion, kf2Orelon, kf2TezjnStrikojn, kf2Buŝon } from "./tez.js";

let figurajHavecax2lani: {
  kapa: THREE.BufferGeometry;
  tez: THREE.BufferGeometry;
  tezjStrikoj: THREE.BufferGeometry;
  hatu5ekanit2banusai: THREE.BufferGeometry;
  soq: THREE.BufferGeometry;

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

  const wopo = kf2KapanKranion();

  const laz = new THREE.CylinderGeometry(0o56/0o1000, 0o71/0o1000, 0o5/0o40, 0o14, 0o1);
  laz.translate(0o0, KOLOY, 0o0);
  const kapajHakek: THREE.BufferGeometry[] = [ wopo, laz ];

  for ( const dir of [ -0o1, 0o1 ] ) kapajHakek.push(kf2Orelon(dir));

  kapajHakek.push(kf2Nazon());
  const kapa = vakox2qQoxaKefoujn(kapajHakek);

  const hat2banu: THREE.BufferGeometry[] = [
    kf2T2banun(-0o1, T2BANUDX, T2BANUDY, T2BANUDZ, T2BANUSEFINI, T2BANUL6DA, -0o1/0o10),
    kf2T2banun(0o1, T2BANUDX, T2BANUDY, T2BANUDZ, T2BANUSEFINI, T2BANUL6DA, 0o1/0o10),
  ];

  const tez = vakox2qQoxaKefoujn([ ...hat2banu, kf2Buŝon() ]);

  const tezjStrikoj = kf2TezjnStrikojn();

  const { boto, akcentaj } = kf2Botan();

  const nasce = kf2KorpanKruropon();
  const knece = kf2KorpanBrakon();
  const pantalono = kf2Pantalonan();

  const hatama = kf2KorpanManon();

  const MANIKAKMARO = 0o11/0o200;

  const MANIKAMALKMARO = 0o50/0o1000;
  const KUBUTAY = KUBUTOY;

  const MANUMOMALKMARO = 0o1/0o4;
  const MANIKABAZO = KUBUTAY - MANUMOMALKMARO;
  const KUBUTAV = KUBUTAY / MANIKABAZO;

  const KUBUTAR = MANIKAKMARO + ( MANIKAMALKMARO - MANIKAKMARO ) * 0o1/0o4;
  const manikaTeru = remapiUVon(kf2SlafTonditanTubon(MANIKAKMARO, KUBUTAR, 0o0,
    KUBUTAY, 0o60, 0o4, 0o0, 0o0, true), 0o0, KUBUTAV);

  const malprofundeco = 0o3/0o200;
  const manikaMaltik = kf2SlafTonditanTubon(KUBUTAR, MANIKAMALKMARO, KUBUTAY,
    MANIKABAZO, 0o60, 0o4, malprofundeco, 0o10/0o1000, false);
  remapiUVon(manikaMaltik, KUBUTAV, 0o1);
  manikaMaltik.translate(0o0, -KUBUTAY, 0o0);

  const manikaArtiko = kf2ArtikanSferon([ 0o0, 0o0, -0o3/0o1000 ], KUBUTAR, 0o7/0o10);
  figurajHavecax2lani = {

    kapa,
    tez,
    tezjStrikoj,
    hatu5ekanit2banusai: kf2Tu5ekanit2banusaijn(),
    soq: kf2KorpanTorson(),
    kruroTeru: nasce.teru,
    kruroMaltik: nasce.maltik,
    korpaPiedo: kf2KorpanPiedon(),
    brakoTeru: knece.teru,
    brakoMaltik: knece.maltik,
    tama: hatama.tama,
    hacavaxaha: hatama.hacavaxaha,
    c2h2: kf2InternanS2cel2n(),

    roba: kf2H6w6anRobonS2cel2n(),
    pantalonaTeru: pantalono.teru,
    pantalonaMaltik: pantalono.maltik,
    boto,
    akcenta: akcentaj,

    manikaTeru,
    manikaMaltik: vakox2qQoxaKefoujn([ manikaMaltik, manikaArtiko ]),
  };
  return figurajHavecax2lani;
}
