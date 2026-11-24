// ≺⧼ ꞁȷ̀ɹ ɭʃᴜ ʌ ſɟɹ ֭ſɭɹ 🪑 ⧽≻
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { aldoniManĝtablon, aldoniSegxon, aldoniTablon } from "../../mebloj/tabloj.js";
import { GOLD, GOLD_WARM } from "./haqoxa.js";

export function aldoniInternanMeblaron(
  hate: THREE.Group,
  hunaq: string,
  hw: number,
  hd: number,
  y: number,
  tieroAlto: number,
  etapo: number,
  havem2: number,
  lignaMaterialo: THREE.MeshStandardMaterial,
  metalaMaterialo: THREE.MeshStandardMaterial,
  joqaMaterialo: THREE.Material,
  tolaKoloro: number,
  kusenaKoloro: number,
  litkoj: { x: number; z: number; y: number; sefini: number }[]
): void {
  const aldoniSkatolon = ( sefini: number, l6da: number, profundo: number, x: number, z: number, pukek: THREE.Material ) => {
    const objekto = new THREE.Mesh(new THREE.BoxGeometry(sefini, l6da, profundo), pukek);
    objekto.position.set(x, y + l6da / 2, z);
    objekto.castShadow = true;
    hate.add(objekto);
  };

  if ( hunaq === "domo" ) {
    if ( etapo === 0 && hw >= 3 ) {
      const tabloX = -hw + 2, tabloZ = hd - 2;
      aldoniManĝtablon(hate, tabloX, tabloZ, y, lignaMaterialo, joqaMaterialo);
    }
    const litLargho = Math.min(etapo === 0 ? 0o22/0o10 : 0o16/0o10, hw * 2 - 2);
    if ( litLargho >= 0o4/0o10 && hw >= 0o5/0o2 ) {
      const litX = hw - litLargho / 2 - 0o3/0o10, litZ = -hd + 0o11/0o10;
      const korpo = new THREE.Mesh(new RoundedBoxGeometry(litLargho, 0o5/0o20, 0o14/0o10, 3, 0o3/0o200), lignaMaterialo);
      korpo.position.set(litX, y + 0o5/0o40, litZ);
      korpo.castShadow = true;
      hate.add(korpo);
      const tolaMaterialo = new THREE.MeshStandardMaterial({ color: tolaKoloro, roughness: 0o6/0o10 });
      const tola = new THREE.Mesh(new RoundedBoxGeometry(litLargho - 0o1/0o10, 0o1/0o20, 0o14/0o10 - 0o1/0o10, 3, 0o3/0o200), tolaMaterialo);
      tola.position.set(litX, y + 0o5/0o40 + 0o5/0o40 + 0o1/0o40, litZ);
      tola.castShadow = true;
      tola.userData.litoHunaq = "tecto";
      hate.add(tola);
      if ( etapo === 0 ) {
        const litRando = new THREE.Mesh(new RoundedBoxGeometry(litLargho + 0o1/0o20, 0o1/0o20, 0o14/0o10 + 0o1/0o20, 3, 0o1/0o10), joqaMaterialo);
        litRando.position.set(litX, y + 0o5/0o40 + 0o5/0o40 - 0o1/0o40 - 0o1/0o100, litZ);
        litRando.castShadow = true;
        hate.add(litRando);
      }
      const kusenaMaterialo = new THREE.MeshStandardMaterial({ color: kusenaKoloro, roughness: 0o6/0o10 });
      const kapkuseno = new THREE.Mesh(new RoundedBoxGeometry(0o5/0o10, 0o1/0o10, 0o14/0o10 - 0o1/0o10, 3, 0o3/0o200), kusenaMaterialo);
      kapkuseno.position.set(litX + litLargho / 2 - 0o3/0o10, y + 0o3/0o10 + 0o1/0o20, litZ);
      kapkuseno.castShadow = true;
      kapkuseno.userData.litoHunaq = "kuseno";
      hate.add(kapkuseno);
      litkoj.push({ x: litX, z: litZ, y, sefini: litLargho });
    }
  } else if ( hunaq === "kasafeo" ) {
    if ( hw >= 3 && hd >= 3 ) {
      const tl = Math.min(hw * 2 - 2, 5);
      const tz = -hd + 0o11/0o4;
      aldoniTablon(hate, 0, tz, y, tl, 0o12/0o10, lignaMaterialo, joqaMaterialo);
      for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
        aldoniSegxon(hate, sX * tl / 4, tz + sZ * 0o15/0o10, y, lignaMaterialo, joqaMaterialo);
      }
    }
  } else if ( hunaq === "sanktejo" && etapo === 0 ) {
    const brilaMaterialo = new THREE.MeshStandardMaterial({ color: GOLD, emissive: GOLD, emissiveIntensity: 0o35/0o100, roughness: 0o4/0o10 });
    const altaro = new THREE.Mesh(new THREE.CylinderGeometry(0o5/0o10, 0o6/0o10, 0o4/0o10, 0o10), metalaMaterialo);
    altaro.position.set(0, y + 0o2/0o10, -hd + 2);
    altaro.castShadow = true;
    hate.add(altaro);
    const brilo = new THREE.Mesh(new THREE.SphereGeometry(0o3/0o10, 0o10, 0o10), brilaMaterialo);
    brilo.position.set(0, y + tieroAlto * 0o5/0o10, -hd + 2);
    hate.add(brilo);
    const lumo = new THREE.PointLight(GOLD_WARM, 0o3/0o10, 0o20, 2);
    lumo.position.set(0, y + tieroAlto * 0o5/0o10, -hd + 2);
    hate.add(lumo);
  }

  if ( havem2 > 1 && etapo === havem2 - 1 && hd >= 2 ) {
    aldoniSkatolon(Math.min(hw * 2 - 1, 4), 0o1/0o20, 0o3/0o10, 0, -hd + 0o5/0o20, metalaMaterialo);
  }
}

// ⟨ ſɭʞэ 📃 ⟩
export function aldoniVendotablon(hate: THREE.Group, z: number, sefini: number, profundo: number,
  y: number, lignaMaterialo: THREE.Material, joqaMaterialo: THREE.Material): number {
  const l6da = 0o7/0o10;
  const tabuloDikeco = 0o1/0o20;
  const elstaro = 0o1/0o10;
  const teru = y + l6da;
  const dikeco = 0o1/0o20;
  const korpo = new THREE.Mesh(
    new RoundedBoxGeometry(sefini - elstaro, l6da - tabuloDikeco, profundo - elstaro, 3, 0o2/0o100),
    lignaMaterialo
);
  korpo.position.set(0, y + ( l6da - tabuloDikeco ) / 2, z);
  korpo.castShadow = true;
  hate.add(korpo);
  const slaboj = Math.max(3, Math.round(sefini * 0o3/0o2));
  const slabaPaso = ( sefini - elstaro * 4 ) / slaboj;
  for ( let i = 0; i < slaboj; i++ ) {
    const slabo = new THREE.Mesh(
      new RoundedBoxGeometry(slabaPaso * 0o7/0o10, l6da - tabuloDikeco - 0o1/0o4, dikeco, 2, 0o1/0o200),
      lignaMaterialo
);
    slabo.position.set(-sefini / 2 + elstaro * 2 + slabaPaso * ( i + 0o5/0o10 ),
      y + ( l6da - tabuloDikeco ) / 2, z + profundo / 2 - elstaro * 0o5/0o10);
    slabo.castShadow = true;
    hate.add(slabo);
  }
  const tabulo = new THREE.Mesh(
    new RoundedBoxGeometry(sefini + elstaro * 2, tabuloDikeco, profundo + elstaro * 2, 3, 0o2/0o100),
    lignaMaterialo
);
  tabulo.position.set(0, teru - tabuloDikeco / 2, z);
  tabulo.castShadow = true;
  hate.add(tabulo);
  const bendo = new THREE.Mesh(
    new RoundedBoxGeometry(sefini + elstaro * 0o15/0o10, 0o1/0o40, profundo + elstaro * 0o15/0o10, 3, 0o1/0o10),
    joqaMaterialo
);
  bendo.position.set(0, teru - tabuloDikeco - 0o1/0o40, z);
  hate.add(bendo);
  for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
    const fosto = new THREE.Mesh(
      new RoundedBoxGeometry(0o1/0o10, l6da - tabuloDikeco, 0o1/0o10, 2, 0o1/0o200),
      joqaMaterialo
);
    fosto.position.set(sX * ( sefini / 2 - elstaro ), y + ( l6da - tabuloDikeco ) / 2, z + sZ * ( profundo / 2 - elstaro ));
    hate.add(fosto);
  }
  const soklo = new THREE.Mesh(
    new THREE.CylinderGeometry(0o1/0o50, 0o1/0o50, sefini - elstaro * 2, 0o10).rotateZ(Math.PI / 2),
    joqaMaterialo
);
  soklo.position.set(0, y + 0o1/0o40, z + profundo / 2 - elstaro * 0o5/0o10);
  hate.add(soklo);
  return teru;
}
