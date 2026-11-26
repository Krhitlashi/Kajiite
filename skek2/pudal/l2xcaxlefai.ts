// ≺⧼ j͐ʃɹ ı],ᴜ̭ᴜ ı],ͷ̗ɔ ſȷᴜꞇ 🪼 ⧽≻
// ⟨ j͑ʃᴜꞇ ʌ ſɭᴜͷ̗ ɭʃɜƽ 📃 ⟩
// ⟨ j͐ʃᴜ ſןɔȝ ʌ ſᶘɔ ŋᷠɹ ŋᷠɹ ʌ ſɭɔƽ 📃 ⟩
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import type { Paga, PudalMalneto } from "./pudal-hahunaq.js";
import { tlunakKombohax2pan, aplikiLiixnPulson, gluuSurfacxon, kf2KombilanPukekn,
  kf2Korpon, liixPulsaFazo,
  sozaParto } from "./l2x-hax2x2q.js";
import { kf2GelanCac2sex } from "../x2x2q/cac2sex/l2x-gelo.js";

const S2qena: [ number, number ][] = [
  [ 0o23/0o100, -0o50/0o100 ],
  [ 0o35/0o100, -0o43/0o100 ],
  [ 0o43/0o100, -0o33/0o100 ],
  [ 0o46/0o100, -0o20/0o100 ],
  [ 0o47/0o100, -0o3/0o100 ],
  [ 0o45/0o100, 0o20/0o100 ],
  [ 0o37/0o100, 0o33/0o100 ],
  [ 0o27/0o100, 0o43/0o100 ],
  [ 0o15/0o100, 0o47/0o100 ],
  [ 0o5/0o100, 0o50/0o100 ],
];

function kf2Lobon(): THREE.ExtrudeGeometry {
  const qoxa = new THREE.Shape();
  qoxa.moveTo(0o0, 0o0);
  qoxa.quadraticCurveTo(0o34/0o100, -0o5/0o100, 0o30/0o100, -0o34/0o100);
  qoxa.quadraticCurveTo(0o24/0o100, -0o52/0o100, 0o12/0o100, -0o56/0o100);
  qoxa.quadraticCurveTo(0o5/0o100, -0o44/0o100, -0o2/0o100, -0o50/0o100);
  qoxa.quadraticCurveTo(-0o10/0o100, -0o40/0o100, -0o12/0o100, -0o46/0o100);
  qoxa.quadraticCurveTo(-0o16/0o100, -0o30/0o100, -0o10/0o100, -0o10/0o100);
  qoxa.quadraticCurveTo(-0o6/0o100, -0o2/0o100, 0o0, 0o0);
  return new THREE.ExtrudeGeometry(qoxa, { depth: 0o2/0o100, bevelEnabled: false });
}

export function vepaqMalneton(cac2sex: THREE.CanvasTexture): PudalMalneto {
  const hate2 = new THREE.Group();
  const gelo = kf2GelanCac2sex({
    kozuni: "rgb(224,240,240)", qar6xe: "rgb(160,192,208)",
    poluso: "rgb(192,224,232)", polusaG2sa: 0o45/0o100, hacehe: 0o460,
  });
  const soq = kf2Korpon(gelo, cac2sex, S2qena, 0xd8e8f0, 0x285878);
  soq.name = "korpo";
  hate2.add(soq);
  tlunakKombohax2pan(hate2, S2qena, kf2KombilanPukekn(0x78b8f0));

  const lobaPukek = new THREE.MeshPhysicalMaterial({
    color: 0xd0e8f8, transparent: true, opacity: 0o5/0o20, depthWrite: false,
    roughness: 0o1/0o4, emissive: 0x285878, emissiveIntensity: 0o3/0o10,
    side: THREE.DoubleSide,
  });
  const stomako = new THREE.Mesh(
    new THREE.CylinderGeometry(0o24/0o1000, 0o74/0o1000, 0o1, 0o10),
    new THREE.MeshPhysicalMaterial({
      color: 0x88b0c0, transparent: true, opacity: 0o4/0o20, depthWrite: false,
      roughness: 0o1/0o4, emissive: 0x285878, emissiveIntensity: 0o3/0o10,
      side: THREE.DoubleSide,
    }));
  stomako.name = "stomako";
  stomako.position.y = -0o1/0o4;
  sozaParto(stomako);
  hate2.add(stomako);

  const lobaQoxa = kf2Lobon();
  const w6qaY = -0o46/0o100 + 0o2/0o100;
  for ( const s of [ 0o1, -0o1 ] ) {
    // ⟨ ſןᴜ ɭʃᴜ 📃 ⟩
    const l6ksabosai = new THREE.Mesh(lobaQoxa, lobaPukek);
    l6ksabosai.name = "l6ksabosai";
    l6ksabosai.position.set(s * 0o24/0o100, w6qaY, 0o0);
    l6ksabosai.rotation.z = -s * 0o3/0o10;
    l6ksabosai.scale.set(s * 0o12/0o10, 0o12/0o10, 0o1);
    l6ksabosai.userData.vek2fe = s;
    sozaParto(l6ksabosai);
    hate2.add(l6ksabosai);
    for ( const t of [ 0o1, -0o1 ] ) {
      const auriklo = new THREE.Mesh(lobaQoxa, lobaPukek);
      auriklo.name = "l6ksabosai";
      auriklo.position.set(s * 0o16/0o100, w6qaY + 0o2/0o100, t * 0o16/0o100);
      auriklo.rotation.y = -s * t * 0o5/0o10;
      auriklo.scale.set(s * 0o5/0o10, 0o5/0o10, 0o1);
      auriklo.userData.vek2fe = s;
      sozaParto(auriklo);
      hate2.add(auriklo);
    }
    // ⟨ j͐ʃᴜ ſןɔȝ ʌ ſɟᴜ ɭʃᴜ 📃 ⟩
    const n2k: THREE.Vector3[] = [];
    for ( let i = 0o0; i <= 0o10; i++ ) {
      const u = i / 0o10;
      n2k.push(new THREE.Vector3(
        s * ( 0o20/0o100 + u * 0o10/0o100 + Math.sin(u * Math.PI * 0o2) * 0o4/0o100 ),
        w6qaY - u * 0o34/0o100,
        Math.sin(u * Math.PI) * 0o10/0o100));
    }
    const kkaxte = new THREE.CatmullRomCurve3(n2k);
    const hakek: THREE.BufferGeometry[] = [ new THREE.TubeGeometry(kkaxte, 0o12, 0o4/0o1000, 0o6) ];
    for ( let i = 0o1; i < 0o10; i++ ) {
      const p = kkaxte.getPoint(i / 0o10);
      const tsaq = new THREE.CylinderGeometry(0o1/0o200, 0o2/0o200, 0o10/0o100, 0o4);
      tsaq.rotateZ(s * ( 0o7/0o10 + ( i % 0o2 ? 0o1/0o10 : -0o1/0o10 )));
      tsaq.translate(p.x, p.y, p.z);
      hakek.push(tsaq);
    }
    const palpo = new THREE.Mesh(mergeGeometries(hakek)!, lobaPukek);
    palpo.name = "palpo";
    palpo.userData.vek2fe = s;
    sozaParto(palpo);
    hate2.add(palpo);
  }

  const s2k61ocisto = new THREE.Mesh(
    new THREE.SphereGeometry(0o4/0o100, 0o10, 0o6).scale(0o1, 0o6/0o10, 0o1),
    new THREE.MeshPhysicalMaterial({
      color: 0xe0f0f8, transparent: true, opacity: 0o3/0o5, depthWrite: false,
      roughness: 0o1/0o10, emissive: 0x78b8d8, emissiveIntensity: 0o7/0o10,
    }));
  s2k61ocisto.name = "s2k61ocisto";
  s2k61ocisto.position.y = 0o47/0o100;
  sozaParto(s2k61ocisto);
  hate2.add(s2k61ocisto);

  return { malneto: hate2, tap2: new THREE.Vector3(0o1, 0o1, 0o1),
    teru: 0o40/0o100, pudal: "liixcaxlefai",
    pulsaSeheni: 0o34/0o10, pulsaG2sa: 0o1/0o20, pulsaOndo: 0o1/0o20,
    tap2igxo: 0o6/0o10 };
}

export function tlak2Mnemiopsan(b: Paga, t: number): void {
  const pulso = aplikiLiixnPulson(b, t);
  const xafanitapu = liixPulsaFazo(b, t);
  let i = 0o0;
  for ( const kek of b.hatahalaqaz ) {
    if ( kek.name === "l6ksabosai" ) {
      const h6w6o = 0o1 + Math.max(0o0, Math.sin(xafanitapu + i * 0o5/0o10)) * 0o12/0o100;
      gluuSurfacxon(kek, pulso, { x: 0o1 + ( h6w6o - 0o1 ) * 0o4/0o5,
        y: h6w6o, z: 0o1 + ( h6w6o - 0o1 ) * 0o4/0o5 });
      kek.rotation.x = Math.sin(t * 0o2 + b.phase + i) * 0o2/0o10;
      i++;
    } else if ( kek.name === "palpo" ) {
      gluuSurfacxon(kek, pulso);
      kek.rotation.x = Math.sin(t * 0o15/0o10 + b.phase) * 0o15/0o100;
      kek.rotation.z = Math.cos(t * 0o11/0o10 + b.phase) * 0o1/0o10;
    } else if ( kek.name === "s2k61ocisto" || kek.name === "stomako" ) {
      gluuSurfacxon(kek, pulso);
    }
  }
  b.hate2.rotation.x = Math.sin(t * 0o1/0o2 + b.phase * 0o3) * 0o4/0o100;
}
