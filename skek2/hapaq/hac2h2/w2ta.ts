// ≺⧼ ꞁȷ̀ɹ ɭʃᴜ ʌ ſɟɹ ֭ſɭɹ ʌ ᶅſɹ ɭʃᴜ 🪑 ⧽≻
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { tlunakMangxCax2l, tlunakCacap2baz2, tlunakCax2l } from "../../w2ta/cax2loj.js";
import { GOLD, GOLDWARM } from "./haqoxa.js";

export function tlunakInternanW2tan(
  hate2: THREE.Group,
  hunaq: string,
  hw: number,
  hd: number,
  y: number,
  b6k61oL6da: number,
  etapo: number,
  havem2: number,
  lignaPukek: THREE.MeshStandardMaterial,
  metalaPukek: THREE.MeshStandardMaterial,
  joqaPukek: THREE.Material,
  tolaWeh2: number,
  kusenaWeh2: number,
  hacamu1a: { x: number; z: number; y: number; sefini: number }[]
): void {
  const tlunakSkatolon = ( sefini: number, l6da: number, jufu: number, x: number, z: number, pukek: THREE.Material ) => {
    const zace = new THREE.Mesh(new THREE.BoxGeometry(sefini, l6da, jufu), pukek);
    zace.position.set(x, y + l6da / 0o2, z);
    zace.castShadow = true;
    hate2.add(zace);
  };

  if ( hunaq === "kap2" ) {
    if ( etapo === 0o0 && hw >= 0o3 ) {
      const cax2lX = -hw + 0o2, cax2lZ = hd - 0o2;
      tlunakMangxCax2l(hate2, cax2lX, cax2lZ, y, lignaPukek, joqaPukek);
    }
    const camu1aSefini = Math.min(etapo === 0o0 ? 0o22/0o10 : 0o16/0o10, hw * 0o2 - 0o2);
    if ( camu1aSefini >= 0o4/0o10 && hw >= 0o5/0o2 ) {
      const litX = hw - camu1aSefini / 0o2 - 0o3/0o10, litZ = -hd + 0o11/0o10;
      const soq = new THREE.Mesh(new RoundedBoxGeometry(camu1aSefini, 0o5/0o20, 0o14/0o10, 0o3, 0o3/0o200), lignaPukek);
      soq.position.set(litX, y + 0o5/0o40, litZ);
      soq.castShadow = true;
      hate2.add(soq);
      const tolaPukek = new THREE.MeshStandardMaterial({ color: tolaWeh2, roughness: 0o6/0o10 });
      const tola = new THREE.Mesh(new RoundedBoxGeometry(camu1aSefini - 0o1/0o10, 0o1/0o20, 0o14/0o10 - 0o1/0o10, 0o3, 0o3/0o200), tolaPukek);
      tola.position.set(litX, y + 0o5/0o40 + 0o5/0o40 + 0o1/0o40, litZ);
      tola.castShadow = true;
      tola.userData.camutsaHunaq = "tecto";
      hate2.add(tola);
      if ( etapo === 0o0 ) {
        const litRando = new THREE.Mesh(new RoundedBoxGeometry(camu1aSefini + 0o1/0o20, 0o1/0o20, 0o14/0o10 + 0o1/0o20, 0o3, 0o1/0o10), joqaPukek);
        litRando.position.set(litX, y + 0o5/0o40 + 0o5/0o40 - 0o1/0o40 - 0o1/0o100, litZ);
        litRando.castShadow = true;
        hate2.add(litRando);
      }
      const kusenaPukek = new THREE.MeshStandardMaterial({ color: kusenaWeh2, roughness: 0o6/0o10 });
      const kapkuseno = new THREE.Mesh(new RoundedBoxGeometry(0o5/0o10, 0o1/0o10, 0o14/0o10 - 0o1/0o10, 0o3, 0o3/0o200), kusenaPukek);
      kapkuseno.position.set(litX + camu1aSefini / 0o2 - 0o3/0o10, y + 0o3/0o10 + 0o1/0o20, litZ);
      kapkuseno.castShadow = true;
      kapkuseno.userData.camutsaHunaq = "kuseno";
      hate2.add(kapkuseno);
      hacamu1a.push({ x: litX, z: litZ, y, sefini: camu1aSefini });
    }
  } else if ( hunaq === "kasafeo" ) {
    if ( hw >= 0o3 && hd >= 0o3 ) {
      const tl = Math.min(hw * 0o2 - 0o2, 0o5);
      const tz = -hd + 0o11/0o4;
      tlunakCax2l(hate2, 0o0, tz, y, tl, 0o12/0o10, lignaPukek, joqaPukek);
      for ( const sX of [ -0o1, 0o1 ] ) for ( const sZ of [ -0o1, 0o1 ] ) {
        tlunakCacap2baz2(hate2, sX * tl / 0o4, tz + sZ * 0o15/0o10, y, lignaPukek, joqaPukek);
      }
    }
  } else if ( hunaq === "qaman2" && etapo === 0o0 ) {
    const brilaPukek = new THREE.MeshStandardMaterial({ color: GOLD, emissive: GOLD, emissiveIntensity: 0o35/0o100, roughness: 0o4/0o10 });
    const altaro = new THREE.Mesh(new THREE.CylinderGeometry(0o5/0o10, 0o6/0o10, 0o4/0o10, 0o10), metalaPukek);
    altaro.position.set(0o0, y + 0o2/0o10, -hd + 0o2);
    altaro.castShadow = true;
    hate2.add(altaro);
    const dci = new THREE.Mesh(new THREE.SphereGeometry(0o3/0o10, 0o10, 0o10), brilaPukek);
    dci.position.set(0o0, y + b6k61oL6da * 0o5/0o10, -hd + 0o2);
    hate2.add(dci);
    const tsije = new THREE.PointLight(GOLDWARM, 0o3/0o10, 0o20, 0o2);
    tsije.position.set(0o0, y + b6k61oL6da * 0o5/0o10, -hd + 0o2);
    hate2.add(tsije);
  }

  if ( havem2 > 0o1 && etapo === havem2 - 0o1 && hd >= 0o2 ) {
    tlunakSkatolon(Math.min(hw * 0o2 - 0o1, 0o4), 0o1/0o20, 0o3/0o10, 0o0, -hd + 0o5/0o20, metalaPukek);
  }
}

// ⟨ ſɭʞэ 📃 ⟩
export function tlunakVendocax2ln(hate2: THREE.Group, z: number, sefini: number, jufu: number,
  y: number, lignaPukek: THREE.Material, joqaPukek: THREE.Material): number {
  const l6da = 0o7/0o10;
  const tabuloKof = 0o1/0o20;
  const santa = 0o1/0o10;
  const teru = y + l6da;
  const kof = 0o1/0o20;
  const soq = new THREE.Mesh(
    new RoundedBoxGeometry(sefini - santa, l6da - tabuloKof, jufu - santa, 0o3, 0o2/0o100),
    lignaPukek
);
  soq.position.set(0o0, y + ( l6da - tabuloKof ) / 0o2, z);
  soq.castShadow = true;
  hate2.add(soq);
  const hatanek = Math.max(0o3, Math.round(sefini * 0o3/0o2));
  const slabaTona = ( sefini - santa * 0o4 ) / hatanek;
  for ( let i = 0o0; i < hatanek; i++ ) {
    const slabo = new THREE.Mesh(
      new RoundedBoxGeometry(slabaTona * 0o7/0o10, l6da - tabuloKof - 0o1/0o4, kof, 0o2, 0o1/0o200),
      lignaPukek
);
    slabo.position.set(-sefini / 0o2 + santa * 0o2 + slabaTona * ( i + 0o5/0o10 ),
      y + ( l6da - tabuloKof ) / 0o2, z + jufu / 0o2 - santa * 0o5/0o10);
    slabo.castShadow = true;
    hate2.add(slabo);
  }
  const kehu = new THREE.Mesh(
    new RoundedBoxGeometry(sefini + santa * 0o2, tabuloKof, jufu + santa * 0o2, 0o3, 0o2/0o100),
    lignaPukek
);
  kehu.position.set(0o0, teru - tabuloKof / 0o2, z);
  kehu.castShadow = true;
  hate2.add(kehu);
  const siitsii = new THREE.Mesh(
    new RoundedBoxGeometry(sefini + santa * 0o15/0o10, 0o1/0o40, jufu + santa * 0o15/0o10, 0o3, 0o1/0o10),
    joqaPukek
);
  siitsii.position.set(0o0, teru - tabuloKof - 0o1/0o40, z);
  hate2.add(siitsii);
  for ( const sX of [ -0o1, 0o1 ] ) for ( const sZ of [ -0o1, 0o1 ] ) {
    const fosto = new THREE.Mesh(
      new RoundedBoxGeometry(0o1/0o10, l6da - tabuloKof, 0o1/0o10, 0o2, 0o1/0o200),
      joqaPukek
);
    fosto.position.set(sX * ( sefini / 0o2 - santa ), y + ( l6da - tabuloKof ) / 0o2, z + sZ * ( jufu / 0o2 - santa ));
    hate2.add(fosto);
  }
  const soklo = new THREE.Mesh(
    new THREE.CylinderGeometry(0o1/0o50, 0o1/0o50, sefini - santa * 0o2, 0o10).rotateZ(Math.PI / 0o2),
    joqaPukek
);
  soklo.position.set(0o0, y + 0o1/0o40, z + jufu / 0o2 - santa * 0o5/0o10);
  hate2.add(soklo);
  return teru;
}
