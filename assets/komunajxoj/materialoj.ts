// Materiala modulo — komunaj materialaj fabrikoj por la tuta mondo
import * as THREE from "three";
import {
  kreiDioritanTeksajxon, kreiAndezitanTeksajxon,
  kreiDioritanBumpanTeksajxon, kreiAndezitanBumpanTeksajxon,
} from "./teksajxoj.js";

// kreiDioritanMaterialon — Diorita ŝtonmaterialo ( helgriza, POLURITA,
// glata kaj reflekta ). La defaŭlta teksajxo montras la interplektitajn
// kristalojn de diorito, la bump-teksajxo donas nur subtilan reliefon ( la
// polurita ŝtono estas preskaŭ glata ), kaj la malalta roughnesso kun la
// eta metalnesso donas la brilan poluron.
//     @param map ( THREE.Texture, nedeviga ) - Diorita teksturo ( defaŭlte la
//     komuna kristala teksajxo, kiun reuzas la vojoj, dokoj kaj lampoj ).
//     @param envMapIntensity ( number, nedeviga ) - Reflekta intenseco ( en la
//     sceno 0o6/0o10; en la doko la defaŭlto ).
export function kreiDioritanMaterialon( map?: THREE.Texture, envMapIntensity?: number ): THREE.MeshStandardMaterial {
  const m = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: map ?? kreiDioritanTeksajxon(),
    bumpMap: kreiDioritanBumpanTeksajxon(),
    bumpScale: 0o1/0o100,
    roughness: 0o1/0o10,
    metalness: 0o1/0o20,
  });
  if ( envMapIntensity !== undefined ) m.envMapIntensity = envMapIntensity;
  return m;
}

// kreiAndezitanMaterialon — Andezita ŝtonmaterialo ( malhela verdgriza,
// malebena ). La defaŭlta teksajxo montras la fajngrajnan afanitan mason kaj
// la bump-teksajxo donas subtilan malebenecon.
//     @param map ( THREE.Texture, nedeviga ) - Andezita teksturo ( defaŭlte la
//     komuna fajngrajna teksajxo, kiun reuzas la vojoj kaj dokoj ).
export function kreiAndezitanMaterialon( map?: THREE.Texture ): THREE.MeshStandardMaterial {
  const m = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: map ?? kreiAndezitanTeksajxon(),
    bumpMap: kreiAndezitanBumpanTeksajxon(),
    bumpScale: 0o3/0o100,
    roughness: 0o63/0o100,
  });
  return m;
}

// kreiEniranMaterialon — Malhela enira pordo-materialo kun oranĝa emisia brilo.
export function kreiEniranMaterialon(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: 0x082018, roughness: 0o23/0o40, emissive: 0xf89840, emissiveIntensity: 0o3/0o100 });
}

// kreiOranMaterialon — Ora kadro-materialo ( brila metala, kun varma emisio ).
//     @param koloro ( number ) - La ora nuanco ( 0xd8b068 en la sceno, la
//     kadro-koloro en la satalaj konstruaĵoj ).
export function kreiOranMaterialon( koloro: number ): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: koloro, metalness: 0o33/0o40, roughness: 0o13/0o40, emissive: 0x302808, emissiveIntensity: 0o13/0o40, envMapIntensity: 0o12/0o10 });
}
