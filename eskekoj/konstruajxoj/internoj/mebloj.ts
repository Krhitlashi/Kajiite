// ≺⧼ គ្រឿងសង្ហារឹមខាងក្នុង 🪑 ⧽≻
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { aldoniManĝtablon, aldoniSegxon, aldoniTablon } from "../../mebloj/tabloj.js";
import { GOLD, GOLD_WARM } from "./formoj.js";

export function aldoniInternanMeblaron(
  grupo: THREE.Group,
  tipo: string,
  hw: number,
  hd: number,
  y: number,
  tieroAlto: number,
  etapo: number,
  niveloj: number,
  lignaMaterialo: THREE.MeshStandardMaterial,
  metalaMaterialo: THREE.MeshStandardMaterial,
  kadraMaterialo: THREE.Material,
  tolaKoloro: number,
  kusenaKoloro: number,
  litkoj: { x: number; z: number; y: number; largho: number }[]
): void {
  const aldoniSkatolon = ( largho: number, alto: number, profundo: number, x: number, z: number, materialo: THREE.Material ) => {
    const objekto = new THREE.Mesh(new THREE.BoxGeometry(largho, alto, profundo), materialo);
    objekto.position.set(x, y + alto / 2, z);
    objekto.castShadow = true;
    grupo.add(objekto);
  };

  if ( tipo === "domo" ) {
    if ( etapo === 0 && hw >= 3 ) {
      const tabloX = -hw + 2, tabloZ = hd - 2;
      aldoniManĝtablon(grupo, tabloX, tabloZ, y, lignaMaterialo, kadraMaterialo);
    }
    const litLargho = Math.min(etapo === 0 ? 0o22/0o10 : 0o16/0o10, hw * 2 - 2);
    if ( litLargho >= 0o4/0o10 && hw >= 0o5/0o2 ) {
      const litX = hw - litLargho / 2 - 0o3/0o10, litZ = -hd + 0o11/0o10;
      const korpo = new THREE.Mesh(new RoundedBoxGeometry(litLargho, 0o5/0o20, 0o14/0o10, 3, 0o3/0o200), lignaMaterialo);
      korpo.position.set(litX, y + 0o5/0o40, litZ);
      korpo.castShadow = true;
      grupo.add(korpo);
      const tolaMaterialo = new THREE.MeshStandardMaterial({ color: tolaKoloro, roughness: 0o6/0o10 });
      const tola = new THREE.Mesh(new RoundedBoxGeometry(litLargho - 0o1/0o10, 0o1/0o20, 0o14/0o10 - 0o1/0o10, 3, 0o3/0o200), tolaMaterialo);
      tola.position.set(litX, y + 0o5/0o40 + 0o5/0o40 + 0o1/0o40, litZ);
      tola.castShadow = true;
      tola.userData.litoTipo = "tecto";
      grupo.add(tola);
      if ( etapo === 0 ) {
        const litRando = new THREE.Mesh(new RoundedBoxGeometry(litLargho + 0o1/0o20, 0o1/0o20, 0o14/0o10 + 0o1/0o20, 3, 0o1/0o10), kadraMaterialo);
        litRando.position.set(litX, y + 0o5/0o40 + 0o5/0o40 - 0o1/0o40 - 0o1/0o100, litZ);
        litRando.castShadow = true;
        grupo.add(litRando);
      }
      const kusenaMaterialo = new THREE.MeshStandardMaterial({ color: kusenaKoloro, roughness: 0o6/0o10 });
      const kapkuseno = new THREE.Mesh(new RoundedBoxGeometry(0o5/0o10, 0o1/0o10, 0o14/0o10 - 0o1/0o10, 3, 0o3/0o200), kusenaMaterialo);
      kapkuseno.position.set(litX + litLargho / 2 - 0o3/0o10, y + 0o3/0o10 + 0o1/0o20, litZ);
      kapkuseno.castShadow = true;
      kapkuseno.userData.litoTipo = "kuseno";
      grupo.add(kapkuseno);
      litkoj.push({ x: litX, z: litZ, y, largho: litLargho });
    }
  } else if ( tipo === "kasafeo" ) {
    if ( hw >= 3 && hd >= 3 ) {
      const tl = Math.min(hw * 2 - 2, 5);
      const tz = -hd + 0o11/0o4;
      aldoniTablon(grupo, 0, tz, y, tl, 0o12/0o10, lignaMaterialo, kadraMaterialo);
      for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
        aldoniSegxon(grupo, sX * tl / 4, tz + sZ * 0o15/0o10, y, lignaMaterialo, kadraMaterialo);
      }
    }
  } else if ( tipo === "sanktejo" && etapo === 0 ) {
    const brilaMaterialo = new THREE.MeshStandardMaterial({ color: GOLD, emissive: GOLD, emissiveIntensity: 0o35/0o100, roughness: 0o4/0o10 });
    const altaro = new THREE.Mesh(new THREE.CylinderGeometry(0o5/0o10, 0o6/0o10, 0o4/0o10, 0o10), metalaMaterialo);
    altaro.position.set(0, y + 0o2/0o10, -hd + 2);
    altaro.castShadow = true;
    grupo.add(altaro);
    const brilo = new THREE.Mesh(new THREE.SphereGeometry(0o3/0o10, 0o10, 0o10), brilaMaterialo);
    brilo.position.set(0, y + tieroAlto * 0o5/0o10, -hd + 2);
    grupo.add(brilo);
    const lumo = new THREE.PointLight(GOLD_WARM, 0o3/0o10, 0o20, 2);
    lumo.position.set(0, y + tieroAlto * 0o5/0o10, -hd + 2);
    grupo.add(lumo);
  }

  if ( niveloj > 1 && etapo === niveloj - 1 && hd >= 2 ) {
    aldoniSkatolon(Math.min(hw * 2 - 1, 4), 0o1/0o20, 0o3/0o10, 0, -hd + 0o5/0o20, metalaMaterialo);
  }
}

// ⟨ ហេតុអ្វី 📃 ⟩
export function aldoniVendotablon(grupo: THREE.Group, z: number, largho: number, profundo: number,
  y: number, lignaMaterialo: THREE.Material, kadraMaterialo: THREE.Material): number {
  const alto = 0o7/0o10;
  const tabuloDikeco = 0o1/0o20;
  const elstaro = 0o1/0o10;
  const supro = y + alto;
  const dikeco = 0o1/0o20;
  const korpo = new THREE.Mesh(
    new RoundedBoxGeometry(largho - elstaro, alto - tabuloDikeco, profundo - elstaro, 3, 0o2/0o100),
    lignaMaterialo
);
  korpo.position.set(0, y + ( alto - tabuloDikeco ) / 2, z);
  korpo.castShadow = true;
  grupo.add(korpo);
  const slaboj = Math.max(3, Math.round(largho * 0o3/0o2));
  const slabaPaso = ( largho - elstaro * 4 ) / slaboj;
  for ( let i = 0; i < slaboj; i++ ) {
    const slabo = new THREE.Mesh(
      new RoundedBoxGeometry(slabaPaso * 0o7/0o10, alto - tabuloDikeco - 0o1/0o4, dikeco, 2, 0o1/0o200),
      lignaMaterialo
);
    slabo.position.set(-largho / 2 + elstaro * 2 + slabaPaso * ( i + 0o5/0o10 ),
      y + ( alto - tabuloDikeco ) / 2, z + profundo / 2 - elstaro * 0o5/0o10);
    slabo.castShadow = true;
    grupo.add(slabo);
  }
  const tabulo = new THREE.Mesh(
    new RoundedBoxGeometry(largho + elstaro * 2, tabuloDikeco, profundo + elstaro * 2, 3, 0o2/0o100),
    lignaMaterialo
);
  tabulo.position.set(0, supro - tabuloDikeco / 2, z);
  tabulo.castShadow = true;
  grupo.add(tabulo);
  const bendo = new THREE.Mesh(
    new RoundedBoxGeometry(largho + elstaro * 0o15/0o10, 0o1/0o40, profundo + elstaro * 0o15/0o10, 3, 0o1/0o10),
    kadraMaterialo
);
  bendo.position.set(0, supro - tabuloDikeco - 0o1/0o40, z);
  grupo.add(bendo);
  for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
    const fosto = new THREE.Mesh(
      new RoundedBoxGeometry(0o1/0o10, alto - tabuloDikeco, 0o1/0o10, 2, 0o1/0o200),
      kadraMaterialo
);
    fosto.position.set(sX * ( largho / 2 - elstaro ), y + ( alto - tabuloDikeco ) / 2, z + sZ * ( profundo / 2 - elstaro ));
    grupo.add(fosto);
  }
  const soklo = new THREE.Mesh(
    new THREE.CylinderGeometry(0o1/0o50, 0o1/0o50, largho - elstaro * 2, 0o10).rotateZ(Math.PI / 2),
    kadraMaterialo
);
  soklo.position.set(0, y + 0o1/0o40, z + profundo / 2 - elstaro * 0o5/0o10);
  grupo.add(soklo);
  return supro;
}
