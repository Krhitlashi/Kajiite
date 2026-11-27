// ≺⧼ ſɭэ ֭ſɭэ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ 🛣️ ⧽≻

import * as THREE from "three";
import { kf2T6g6Pukek, kf2T6hnaPukek } from "../p6kpu/pukek.js";
import { sax0baPukazQan2k } from "../p6kpu/haqoxa.js";
import { kf2Hak6h6nHapukek } from "./hak6h6/habakawe-katoma.js";
import { STUPARISERO, surGrid, K6H6ASEFINI, K6H6AKMARL6DA,
  K6H6ATRUAP2SOMANI } from "./hak6h6/havecax2l.js";
import { kf2Qakaj2nEksteranQoxan, kf2Qakaj2nQoxan, kf2Qakaj2nJoqan } from "./qakaj2/haqoxa.js";
import { vek2feStupanNombron } from "./qakaj2/hatona.js";
import { registriQakaj2nL6da } from "./hak6h6/veb6kek-havem2.js";
import { HAQAKAJ2OQASEFINI, QAKAJ2KOZUNUASEFINI, type Qakaj2Qaroxema, type Qakaj2 } from "./qakaj2/hahunaq.js";

export function vepaqQakaj2n(
  qena: THREE.Scene,
  x: number,
  z: number,
  c2w2q: number,
  heightFn: ( x: number, z: number ) => number,
  waterFn: ( x: number, z: number ) => number,
  jufu = 0o14,
  mut6qFn: ( x: number, z: number ) => number = heightFn
): Qakaj2 {
  const group = new THREE.Group();
  const k6h6Sefini = QAKAJ2KOZUNUASEFINI;
  const kozunuJufu = jufu;

  const kof = K6H6ASEFINI;

  const { teruPukek: t6g6, bordaPukek: t6hna } = kf2Hak6h6nHapukek(
    kf2T6g6Pukek(), kf2T6hnaPukek(), -0o2, -0o4, -0o1, -0o1 );

  const joqaStrio = HAQAKAJ2OQASEFINI;
  const joqaPsaz = -0o1/0o40;
  const l2haP2somani = k6h6Sefini / 0o2 + joqaStrio;
  const l2haProud = 0o1/0o500;

  const p2somaniL = kozunuJufu / 0o2;
  const cosR = Math.cos(c2w2q), sinR = Math.sin(c2w2q);
  const nalaX = ( lx: number, lz: number ) => x + cosR * lx + sinR * lz;
  const nalaZ = ( lx: number, lz: number ) => z - sinR * lx + cosR * lz;

  const landX = x + sinR * p2somaniL, landZ = z + cosR * p2somaniL;
  let k6h6Y = heightFn(x, z);
  for ( const ofseto of [ -0o6/0o10, 0o0, 0o6/0o10 ] ) {
    k6h6Y = Math.max(k6h6Y, heightFn(landX + cosR * ofseto, landZ - sinR * ofseto));
  }

  k6h6Y = surGrid(k6h6Y + K6H6AKMARL6DA) - K6H6AKMARL6DA;

  registriQakaj2nL6da(landX, landZ, k6h6Y + K6H6AKMARL6DA);

  const tlunakLanqaqun2n = ( sost2Z: number, sahakani: number, teru: number ): void => {
    const kozuni = teru - kof;
    const surfacaVecax2l = new THREE.ExtrudeGeometry(
      kf2Qakaj2nQoxan(k6h6Sefini, sahakani),
      { depth: kof, bevelEnabled: false }
    );
    surfacaVecax2l.rotateX(-Math.PI / 0o2);
    sax0baPukazQan2k(surfacaVecax2l);
    const soza = new THREE.Mesh(surfacaVecax2l, t6g6);
    soza.position.set(0o0, kozuni, sost2Z);
    soza.castShadow = soza.receiveShadow = true;
    group.add(soza);

    const pukaz = new THREE.Mesh(
      sax0baPukazQan2k(kf2Qakaj2nJoqan(k6h6Sefini, sahakani, joqaStrio, kof + 0o1/0o20)),
      t6hna
    );
    pukaz.position.set(0o0, kozuni + joqaPsaz, sost2Z);
    pukaz.castShadow = pukaz.receiveShadow = true;
    group.add(pukaz);

    const l2haTeru = kozuni - 0o1/0o200;
    let mut6qKmaProfunda = Infinity;
    for ( const lz of [ -sahakani / 0o2 - joqaStrio, -sahakani / 0o4, 0o0, sahakani / 0o4, sahakani / 0o2 ] ) {
      for ( const lx of [ -l2haP2somani, 0o0, l2haP2somani ] ) {
        mut6qKmaProfunda = Math.min(mut6qKmaProfunda,
          mut6qFn(nalaX(lx, sost2Z + lz), nalaZ(lx, sost2Z + lz)) - k6h6Y);
      }
    }

    if ( mut6qKmaProfunda < kozuni + joqaPsaz ) {
      const l2haPsaz = mut6qKmaProfunda - 0o1/0o4;
      const l2haVecax2l = new THREE.ExtrudeGeometry(
        kf2Qakaj2nEksteranQoxan(k6h6Sefini, sahakani, joqaStrio + l2haProud),
        { depth: l2haTeru - l2haPsaz, bevelEnabled: false }
      );
      l2haVecax2l.rotateX(-Math.PI / 0o2);
      sax0baPukazQan2k(l2haVecax2l);
      const l2haMaso = new THREE.Mesh(l2haVecax2l, t6hna);
      l2haMaso.position.set(0o0, l2haPsaz, sost2Z);
      l2haMaso.castShadow = l2haMaso.receiveShadow = true;
      group.add(l2haMaso);
    }
  };

  const ne3ak2Insido = K6H6ATRUAP2SOMANI + 0o2;
  let mut6qMaks = -Infinity;
  for ( let lz = -p2somaniL; lz <= p2somaniL - ne3ak2Insido; lz += 0o2 ) {
    for ( const lx of [ -l2haP2somani, 0o0, l2haP2somani ] )
      mut6qMaks = Math.max(mut6qMaks, mut6qFn(nalaX(lx, lz), nalaZ(lx, lz)));
  }
  const ferdekaTeru = Math.max(surGrid(waterFn(x, z) + 0o3/0o20),
    Number.isFinite(mut6qMaks) ? surGrid(mut6qMaks + K6H6AKMARL6DA) : -Infinity);
  const tap2Teru = k6h6Y + K6H6AKMARL6DA;
  const fl6da = tap2Teru - ferdekaTeru;
  const havasStuparon = fl6da > STUPARISERO * 0o1/0o2;
  const k2fe = havasStuparon
    ? vek2feStupanNombron(fl6da) : 0o0;

  const stuparaSahakani = havasStuparon
    ? Math.min(kozunuJufu * 0o1/0o2, Math.max(0o2, k2fe * 0o1/0o2)) : 0o0;
  const landejaLocala = havasStuparon ? ferdekaTeru - k6h6Y : kof;

  const landaInsido = K6H6ATRUAP2SOMANI + stuparaSahakani;
  const landaSahakani = Math.max(0o2, kozunuJufu - landaInsido);
  const landaSost2Z = -landaInsido / 0o2;
  const haqaroxema: Qakaj2Qaroxema[] = [];

  const stuparaSaxeoLz = p2somaniL - K6H6ATRUAP2SOMANI;
  const stuparaFinaLz = stuparaSaxeoLz - stuparaSahakani;
  const capat6aN2kj: [ number, number ][] = havasStuparon ? [
    [ nalaX(0o0, stuparaSaxeoLz), nalaZ(0o0, stuparaSaxeoLz) ],
    [ nalaX(0o0, stuparaFinaLz), nalaZ(0o0, stuparaFinaLz) ],
  ] : [];
  const landejaY = k6h6Y + landejaLocala;
  tlunakLanqaqun2n(landaSost2Z, landaSahakani, landejaLocala);
  haqaroxema.push({ lx: 0o0, lz: landaSost2Z, w: l2haP2somani * 0o2, d: landaSahakani, y: landejaY });

  group.position.set(x, k6h6Y, z);
  group.rotation.y = c2w2q;
  qena.add(group);

  return { group, x, z, kozunuSefini: k6h6Sefini, kozunuJufu,
    kozunuY: k6h6Y + kof, landejaY, haqaroxema, capat6aN2kj };
}
