// Doko-modulo — vojaj etendoj kun subakvaj subtenoj
import * as THREE from "three";
import { kreiDioritanTeksajxon, kreiAndezitanTeksajxon } from "./teksajxoj.js";

export interface Doko {
  group: THREE.Group;
  x: number;
  z: number;
  platformWidth: number;
  platformDepth: number;
}

export function konstruiDokon(
  sceno: THREE.Scene,
  x: number,
  z: number,
  direkto: number,
  heightFn: ( x: number, z: number ) => number,
  waterFn: ( x: number ) => number
): Doko {
  const group = new THREE.Group();
  const vojaLargho = 14/8;
  const platformDepth = 0o14;
  const dikeco = 2/8;
  const dioritaTeksajxo = kreiDioritanTeksajxon();
  const andezitaTeksajxo = kreiAndezitanTeksajxon();
  const diorito = new THREE.MeshStandardMaterial({ map: dioritaTeksajxo, color: 0xc8c8c8, roughness: 3/16, metalness: 1/64 });
  const andezito = new THREE.MeshStandardMaterial({ map: andezitaTeksajxo, color: 0x586860, roughness: 51/64 });
  const subteno = new THREE.MeshStandardMaterial({ color: 0x302820, roughness: 7/8 });

  // La doko estas mallarĝa rekta etendo de la vojo, ne aparta ligna platformo.
  const surfaco = new THREE.Mesh(
    new THREE.BoxGeometry(vojaLargho, dikeco, platformDepth),
    diorito
  );
  surfaco.position.y = dikeco / 2;
  surfaco.castShadow = surfaco.receiveShadow = true;
  group.add(surfaco);

  // Malaltaj andezitaj randoj konservas la saman flankdesegnon kiel la vojoj.
  for ( const flanko of [ -1, 1 ] ) {
    const rando = new THREE.Mesh(
      new THREE.BoxGeometry(1/2, dikeco + 1/16, platformDepth + 2/8),
      andezito
    );
    rando.position.set( flanko * ( ( vojaLargho + 1 ) / 2 ), dikeco / 2, 0 );
    rando.castShadow = rando.receiveShadow = true;
    group.add(rando);
  }

  // Dikaj fostoj sub la akvo tenas la vojan etendon.
  const vojaY = heightFn( x, z );
  const akvaY = waterFn( x );
  const fostaAlto = Math.max( 1, vojaY - akvaY );
  for ( const localZ of [ -0o4, 0o4 ] ) {
    for ( const localX of [ -4/8, 4/8 ] ) {
      const fosto = new THREE.Mesh(
        new THREE.CylinderGeometry( 3/16, 5/16, fostaAlto, 6 ),
        subteno
      );
      fosto.position.set( localX, ( akvaY - vojaY ) / 2, localZ );
      fosto.castShadow = true;
      group.add( fosto );
    }
  }

  group.position.set( x, vojaY, z );
  group.rotation.y = direkto;
  sceno.add( group );

  return { group, x, z, platformWidth: vojaLargho, platformDepth };
}
