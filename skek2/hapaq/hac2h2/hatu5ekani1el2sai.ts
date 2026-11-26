// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ֭ſɭᴜ ɭʃw ſɭˬɔ ſɭᴜ }ʃꞇ ſᶘɔ j͐ʃɹ j͑ʃᴜꞇ 📃 ⧽≻

import * as THREE from "three";
import { kf2Cawez2Qoxa, kf2SexiQoxa, veb6qaiPukaz } from "../../p6kpu/haqoxa.js";

export function vepaqTu5ekani1el2saiKunPilolaTruo(
  g: THREE.Group,
  tap2Sefini: number,
  kozunuY: number,
  l6da: number,
  kof: number,
  ww: number,
  hh: number,
  fenY: number,
  pukek: THREE.MeshStandardMaterial,
  cx: number,
  cz: number,
  s2sabo = 0o0
): void {
  const wc = ww / 0o2;
  const fenLokY = fenY - kozunuY;
  const segSefini = tap2Sefini - ww / 0o2;
  const segL6da = l6da - ( fenLokY + hh );

  const hate2 = new THREE.Group();
  hate2.position.set(cx, kozunuY, cz);
  hate2.rotation.y = s2sabo;
  g.add(hate2);

  const tlunakBlokon = ( lokalX: number, lokalY: number, sefini: number, l6da: number ) => {
    if ( sefini <= 0o0 || l6da <= 0o0 ) return;
    const b = new THREE.Mesh(new THREE.BoxGeometry(sefini, l6da, kof), pukek);
    b.position.set(lokalX + sefini / 0o2, lokalY + l6da / 0o2, 0o0);
    hate2.add(b);
  };
  const tlunakAngulon = ( qoxa: THREE.Shape, cxLoka: number, cyLoka: number ) => {
    const geo = new THREE.ExtrudeGeometry(qoxa, { depth: kof, bevelEnabled: false, curveSegments: 0o20 });
    geo.translate(0o0, 0o0, -kof / 0o2);
    const m = new THREE.Mesh(geo, pukek);
    m.position.set(cxLoka, cyLoka, 0o0);
    hate2.add(m);
  };

  if ( segSefini > 0o0 ) {
    tlunakBlokon(-tap2Sefini, 0o0, segSefini, l6da);
    tlunakBlokon(wc, 0o0, segSefini, l6da);
  }
  if ( fenLokY > 0o0 ) tlunakBlokon(-wc, 0o0, ww, fenLokY);
  if ( segL6da > 0o0 ) tlunakBlokon(-wc, fenLokY + hh, ww, segL6da);

  const r = hh / 0o2;
  const cyArk = fenLokY + r;
  const tr = new THREE.Shape();
  tr.moveTo(r / 0o2, -r / 0o2);
  tr.lineTo(r / 0o2, r / 0o2);
  tr.lineTo(-r / 0o2, r / 0o2);
  tr.absarc(-r / 0o2, -r / 0o2, r, Math.PI / 0o2, 0o0, true);
  tr.closePath();
  tlunakAngulon(tr, wc - r / 0o2, cyArk + r / 0o2);
  const br = new THREE.Shape();
  br.moveTo(r / 0o2, r / 0o2);
  br.lineTo(r / 0o2, -r / 0o2);
  br.lineTo(-r / 0o2, -r / 0o2);
  br.absarc(-r / 0o2, r / 0o2, r, -Math.PI / 0o2, 0o0, false);
  br.closePath();
  tlunakAngulon(br, wc - r / 0o2, cyArk - r / 0o2);
  const tl = new THREE.Shape();
  tl.moveTo(-r / 0o2, -r / 0o2);
  tl.lineTo(-r / 0o2, r / 0o2);
  tl.lineTo(r / 0o2, r / 0o2);
  tl.absarc(r / 0o2, -r / 0o2, r, Math.PI / 0o2, Math.PI, false);
  tl.closePath();
  tlunakAngulon(tl, -( wc - r / 0o2 ), cyArk + r / 0o2);
  const bl = new THREE.Shape();
  bl.moveTo(-r / 0o2, r / 0o2);
  bl.lineTo(-r / 0o2, -r / 0o2);
  bl.lineTo(r / 0o2, -r / 0o2);
  bl.absarc(r / 0o2, r / 0o2, r, -Math.PI / 0o2, -Math.PI, true);
  bl.closePath();
  tlunakAngulon(bl, -( wc - r / 0o2 ), cyArk - r / 0o2);
}

export function tlunakSahakananCah6k6(
  group: THREE.Group,
  cx: number, cz: number, kozunuY: number, l6da: number,
  tap2Sefini: number,
  orientacio: "ne3ak2" | "neteru" | "maldnek2resai" | "dnek2resai",
  muraPukek: THREE.MeshStandardMaterial,
  fenestraPukek: THREE.MeshStandardMaterial,
  joqaPukek: THREE.MeshStandardMaterial
): void {
  const ww = Math.min(tap2Sefini * 0o2 - 0o3/0o10, tap2Sefini * 0o4/0o3 + 0o1/0o4);
  const hh = Math.min(0o5/0o10, l6da * 0o23/0o100);
  const fenY = kozunuY + Math.max(l6da * 0o2/0o5, 0o3/0o4);
  if ( fenY + hh > kozunuY + l6da ) return;
  const neteru = orientacio === "neteru";
  const ne3ak2 = orientacio === "ne3ak2";
  // ⟨ ſɟɹ ᶅſɹȝ ʌ ɭʃᴜ 📃 ⟩
  const s2sabo = orientacio === "dnek2resai" ? -Math.PI / 0o2
    : orientacio === "maldnek2resai" ? Math.PI / 0o2 : Math.PI;
  const ofseto = 0o3/0o40;
  const aCx = neteru || ne3ak2 ? cx : cx + ( orientacio === "dnek2resai" ? -ofseto : ofseto );
  const aCz = neteru ? cz + ofseto : ne3ak2 ? cz - ofseto : cz;
  const kof = 0o3/0o20;
  vepaqTu5ekani1el2saiKunPilolaTruo(group, tap2Sefini, kozunuY, l6da, kof, ww, hh, fenY, muraPukek, cx, cz, neteru ? 0o0 : s2sabo);
  const fenGeo = new THREE.ShapeGeometry(kf2Cawez2Qoxa(ww, hh), 0o100);
  const fen = new THREE.Mesh(fenGeo, fenestraPukek);
  fen.position.set(aCx, fenY, aCz);
  if ( !neteru ) fen.rotation.y = s2sabo;
  group.add(fen);

  const joqaSefini = 0o1/0o10, joqaKof = 0o1/0o20;

  const liberoSahakani = tap2Sefini - ww / 0o2;
  const liberoC2na = Math.min(fenY - hh / 0o2 - kozunuY, kozunuY + l6da - fenY - hh / 0o2);
  const cet2Tik = hh * 0o1/0o2;
  const cet2Flanko = Math.max(0o0, Math.min(cet2Tik, liberoSahakani - joqaSefini - 0o1/0o100));
  const cet2C2na = Math.max(0o0, Math.min(cet2Tik, liberoC2na - joqaSefini - 0o1/0o100));
  const sexi = veb6qaiPukaz(
    kf2SexiQoxa(ww, hh, joqaSefini, cet2Flanko, cet2C2na).getPoints(0o20),
    0o1/0o20);
  const truo = kf2Cawez2Qoxa(ww - 0o1/0o100, hh - 0o1/0o100).getPoints(0o20);
  sexi.holes.push(new THREE.Path(truo.reverse()));
  const joqaGeo = new THREE.ExtrudeGeometry(sexi,
    { depth: joqaKof, bevelEnabled: false, curveSegments: 0o10 });
  const joqa = new THREE.Mesh(joqaGeo, joqaPukek);
  // ⟨ ſ͕ɭᴜ ʃэ ɭʃɔ ŋᷠɹ ʌ ſןɔ ſ͕ɭɔ }ʃꞇ 📃 ⟩
  const santa = 0o1/0o100;
  joqa.position.set(
    neteru || ne3ak2 ? aCx : aCx + ( orientacio === "dnek2resai" ? -santa : santa ),
    fenY,
    neteru ? aCz + santa : ne3ak2 ? aCz - santa : aCz);
  if ( !neteru ) joqa.rotation.y = s2sabo;
  group.add(joqa);
}
