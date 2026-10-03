// ≺⧼ វាយនភាពមេឃពេញផ្កាយ ✨ ⧽≻
import * as THREE from "three";

export let stelplenaTeksajxo: THREE.CanvasTexture | null = null;

export function kreiStelplenanTeksajxon(): THREE.CanvasTexture {
  if ( stelplenaTeksajxo ) return stelplenaTeksajxo;
  const c = document.createElement("canvas");
  c.width = c.height = 0o200;
  const g = c.getContext("2d")!;
  g.fillStyle = "#000008"; g.fillRect(0, 0, c.width, c.height);
  for ( let i = 0; i < 0o140; i++ ) {
    const x = Math.random() * c.width, y = Math.random() * c.height;
    const r = 0o5/0o10 + Math.random() * 0o15/0o10;
    g.fillStyle = `rgba(214,240,255,${( 0o26/0o100 + Math.random() * 0o52/0o100 ).toFixed(2)})`;
    g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
  }
  stelplenaTeksajxo = new THREE.CanvasTexture(c);
  return stelplenaTeksajxo;
}
