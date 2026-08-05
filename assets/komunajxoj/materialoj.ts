// Materiala modulo — komunaj materialaj fabrikoj por la tuta mondo
import * as THREE from "three";

// kreiDioritanMaterialon — Diorita ŝtonmaterialo ( helgriza, iomete metala ).
//     @param map ( THREE.Texture, nedeviga ) - Diorita teksturo por vojoj/dokoj.
//     @param envMapIntensity ( number, nedeviga ) - Reflekta intenseco ( en la
//     sceno 0o35/0o40; en la doko la defaŭlto ).
export function kreiDioritanMaterialon( map?: THREE.Texture, envMapIntensity?: number ): THREE.MeshStandardMaterial {
  const m = new THREE.MeshStandardMaterial({ color: 0xc8c8c8, roughness: 0o3/0o20, metalness: 0o1/0o100 });
  if ( map ) m.map = map;
  if ( envMapIntensity !== undefined ) m.envMapIntensity = envMapIntensity;
  return m;
}

// kreiAndezitanMaterialon — Andezita ŝtonmaterialo ( malhela verdgriza ).
//     @param map ( THREE.Texture, nedeviga ) - Andezita teksturo por bordoj.
export function kreiAndezitanMaterialon( map?: THREE.Texture ): THREE.MeshStandardMaterial {
  const m = new THREE.MeshStandardMaterial({ color: 0x586860, roughness: 0o63/0o100 });
  if ( map ) m.map = map;
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
