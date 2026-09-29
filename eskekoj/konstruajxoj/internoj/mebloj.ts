// ≺⧼ La internaj mebloj 🪑 ⧽≻
// La mebloj de la internaj spacoj — la bankoj, la tabloj kaj la litoj po speco
// ( aldoniInternanMeblaron ) kaj la vendotablo de la manĝejo ( aldoniVendotablon ).
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
    // Tablo en la restoracia stilo — rondangula ligna tablo kun ora rando kaj seĝoj
    if ( etapo === 0 && hw >= 3 ) {
      // La tablo staras en la kontraŭa angulo de la lito ( antaŭ-maldekstre ).
      const tabloX = -hw + 2, tabloZ = hd - 2;
      // La tablo kun la kvar benkoj ĉirkaŭ ĝi — la sama manĝa arangxo kiel en
      // la mangxejoj ( aldoniManĝtablon el la mebloj-modulo ).
      aldoniManĝtablon(grupo, tabloX, tabloZ, y, lignaMaterialo, kadraMaterialo);
    }
    // Lito — simpla rondangula hela beiga ligna bloko rekte sur la planko, kun
    // larĝa rondangula kapkuseno ĉe la kapo (+x). La lito staras en la
    // malantaŭ-dekstra angulo kun malgranda libero de la muroj. La kapo (+x)
    // kaj la dorso (−z) ambaŭ kuŝas 0o3/0o10 for de la muro, ne plu tuŝante
    // nek enirante la muron; sur etajoj tro malgrandaj (hw < 0o5/0o2) neniu
    // lito eniras sen trui la helikon.
    const litLargho = Math.min(etapo === 0 ? 0o22/0o10 : 0o16/0o10, hw * 2 - 2);
    if ( litLargho >= 0o4/0o10 && hw >= 0o5/0o2 ) {
      // Kapo 0o3/0o10 for de la dekstra muro; dorso 0o3/0o10 for de la
      // malantaŭa muro — pli da libero ol antaŭe ( 0o1/0o10 ), por ke la lito
      // ne ŝajnu eniri la murojn.
      const litX = hw - litLargho / 2 - 0o3/0o10, litZ = -hd + 0o11/0o10;
      // Korpo — rondangula hela beiga ligna bloko sur la planko. Pli alta ol
      // antaŭe ( 0o5/0o20 ), kun diskretaj rondigitaj anguloj ( 0o3/0o200 ) por
      // ke la VERTIKALAJ randoj ne ŝvelu — nur molaj horizontalaj eĝoj supre.
      const korpo = new THREE.Mesh(new RoundedBoxGeometry(litLargho, 0o5/0o20, 0o14/0o10, 3, 0o3/0o200), lignaMaterialo);
      korpo.position.set(litX, y + 0o5/0o40, litZ);
      korpo.castShadow = true;
      grupo.add(korpo);
      // Tola — maldika litaĵo kovranta la supron de la korpo, en la ĈEFA
      // koloro de la vesto de la ludanto. La materialo rekolorigxas laux la
      // vesto cxiun eniron ( aplikiLitajnKolorojn por kasxitaj internoj ).
      const tolaMaterialo = new THREE.MeshStandardMaterial({ color: tolaKoloro, roughness: 0o6/0o10 });
      const tola = new THREE.Mesh(new RoundedBoxGeometry(litLargho - 0o1/0o10, 0o1/0o20, 0o14/0o10 - 0o1/0o10, 3, 0o3/0o200), tolaMaterialo);
      tola.position.set(litX, y + 0o5/0o40 + 0o5/0o40 + 0o1/0o40, litZ);
      tola.castShadow = true;
      tola.userData.litoTipo = "tecto";
      grupo.add(tola);
      // Rando de la akcenta koloro sur la ĉefa baza parto de la lito — la sama
      // maldika bendo kiel sur la tabloj/benkoj, tuj sub la supro de la korpo.
      // Nur sur la ĉefa ( tera ) etaĝo — la "baza parto" de la konstruajxo.
      if ( etapo === 0 ) {
        const litRando = new THREE.Mesh(new RoundedBoxGeometry(litLargho + 0o1/0o20, 0o1/0o20, 0o14/0o10 + 0o1/0o20, 3, 0o1/0o10), kadraMaterialo);
        litRando.position.set(litX, y + 0o5/0o40 + 0o5/0o40 - 0o1/0o40 - 0o1/0o100, litZ);
        litRando.castShadow = true;
        grupo.add(litRando);
      }
      // Kapkuseno — rondangula rektangulo preskaŭ la tuta profundo de la lito
      // ( 0o14/0o10 − 0o1/0o10 ), kun egala malgranda libero ( 0o1/0o20 ) sur
      // la tri flankoj. Kapo (+x), dorso (−z) kaj fronto (+z). En la AKCENTA
      // koloro de la vesto, sidante SUR la tola ( malsupro = tola-supro ).
      const kusenaMaterialo = new THREE.MeshStandardMaterial({ color: kusenaKoloro, roughness: 0o6/0o10 });
      const kapkuseno = new THREE.Mesh(new RoundedBoxGeometry(0o5/0o10, 0o1/0o10, 0o14/0o10 - 0o1/0o10, 3, 0o3/0o200), kusenaMaterialo);
      kapkuseno.position.set(litX + litLargho / 2 - 0o3/0o10, y + 0o3/0o10 + 0o1/0o20, litZ);
      kapkuseno.castShadow = true;
      kapkuseno.userData.litoTipo = "kuseno";
      grupo.add(kapkuseno);
      // Registru la liton por la kuŝ-interago ( lokaj koordinatoj + larĝo ).
      litkoj.push({ x: litX, z: litZ, y, largho: litLargho });
    }
  } else if ( tipo === "kasafeo" ) {
    // Kunvenoĉambro. Longa rondangula tablo kun seĝoj ambaŭflanke
    if ( hw >= 3 && hd >= 3 ) {
      const tl = Math.min(hw * 2 - 2, 5);
      const tz = -hd + 0o11/0o4;
      aldoniTablon(grupo, 0, tz, y, tl, 0o12/0o10, lignaMaterialo, kadraMaterialo);
      // Seĝoj ambaŭflanke laŭ la longa flanko (ne ĉe la helika truo) — la sama
      // ora rando kiel la tablo ( kadraMaterialo ), laŭ la longa akso.
      for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
        aldoniSegxon(grupo, sX * tl / 4, tz + sZ * 0o15/0o10, y, lignaMaterialo, kadraMaterialo);
      }
    }
  } else if ( tipo === "sanktejo" && etapo === 0 ) {
    // La brila sfero — forta varma ora brilo ( GOLD ), pli hela ol la meblara
    // hela materialo, por ke la sankteja fokuso restu videbla.
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

// aldoniVendotablon — La vendotablo ( baro ) de la mangxejo: ligna korpo, SUPRA
// tabulo kun elstara rando kaj ora bendo, vertikalaj lignaj slaboj sur la
// gastoflanko (+z), oraj angulaj fostoj kaj sokla stango ĉe la planko.
// ⟨ Kial 📃 ⟩ — la antaŭa vendotablo estis unu plena ligna SKATOLO unu unuon
// alta kaj 1.25 profundaj: ĝi aspektis kiel murero meze de la ĉambro, kaj ĝiaj
// kvadrataj anguloj konkuris kun la rondigitaj mebloj. Nun ĝi legiĝas kiel la
// ceteraj mebloj de la restoracio.
//     @param grupo ( THREE.Group ) - La grupo.
//     @param z ( number ) - La z-centro de la tablo.
//     @param largho ( number ) - La larĝo ( laŭ x ).
//     @param profundo ( number ) - La profundo ( laŭ z ).
//     @param y ( number ) - La planko-nivelo.
//     @param lignaMaterialo, kadraMaterialo ( Material ) - La ligno kaj la oro.
//     @returns supro ( number ) - La nivelo de la SUPRA tabulo ( kie la poto
//              sidas ), por ke la vokanto metu objektojn sur ĝin anstataŭ per
//              fiksaj y-valoroj.
export function aldoniVendotablon(grupo: THREE.Group, z: number, largho: number, profundo: number,
  y: number, lignaMaterialo: THREE.Material, kadraMaterialo: THREE.Material): number {
  const alto = 0o7/0o10;                 // 0.875 — la labor-alto de baro
  const tabuloDikeco = 0o1/0o20;
  const elstaro = 0o1/0o10;              // kiom la supra tabulo elstaras
  const supro = y + alto;
  const dikeco = 0o1/0o20;
  // 1. La korpo — iomete enen de la tabulo, do la elstara rando videblas.
  const korpo = new THREE.Mesh(
    new RoundedBoxGeometry(largho - elstaro, alto - tabuloDikeco, profundo - elstaro, 3, 0o2/0o100),
    lignaMaterialo
);
  korpo.position.set(0, y + ( alto - tabuloDikeco ) / 2, z);
  korpo.castShadow = true;
  grupo.add(korpo);
  // 2. La vertikalaj slaboj — la antaŭa flanko de baro, kiel la slataj benkoj.
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
  // 3. La supra tabulo — kun la sama ora bendo kiel la tabloj de la restoracio.
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
  // 4. Oraj angulaj fostoj kaj sokla stango — la kadro, kiu tenas la tablon.
  for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
    const fosto = new THREE.Mesh(
      new RoundedBoxGeometry(0o1/0o10, alto - tabuloDikeco, 0o1/0o10, 2, 0o1/0o200),
      kadraMaterialo
);
    fosto.position.set(sX * ( largho / 2 - elstaro ), y + ( alto - tabuloDikeco ) / 2, z + sZ * ( profundo / 2 - elstaro ));
    grupo.add(fosto);
  }
  const soklo = new THREE.Mesh(
    new THREE.CylinderGeometry(0o1/0o50, 0o1/0o50, largho - elstaro * 2, 8).rotateZ(Math.PI / 2),
    kadraMaterialo
);
  soklo.position.set(0, y + 0o1/0o40, z + profundo / 2 - elstaro * 0o5/0o10);
  grupo.add(soklo);
  return supro;
}
