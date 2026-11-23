// ≺⧼ j͑ʃƨɔ j͐ʃɘͷ̗ɔ }ʃᴜ j͑ʃᴜꞇ ʌ ſɟᶗ‹ꞇ ꞁȷ̀ɔ j͐ʃɜ j͑ʃᴜꞇ ʌ j͐ʃƽɜ }ʃꞇ ✨ ⧽≻
import * as THREE from "three";

export let stelplenaCac2sex: THREE.CanvasTexture | null = null;

export function kf2StelplenanCac2sex(): THREE.CanvasTexture {
  if ( stelplenaCac2sex ) return stelplenaCac2sex;
  const c = document.createElement("canvas");
  c.width = c.height = 0o200;
  const g = c.getContext("2d")!;
  g.fillStyle = "#000008"; g.fillRect(0, 0, c.width, c.height);
  for ( let i = 0; i < 0o140; i++ ) {
    const x = Math.random() * c.width, y = Math.random() * c.height;
    const r = 0o5/0o10 + Math.random() * 0o15/0o10;
    g.fillStyle = `rgba(208,240,255,${( 0o26/0o100 + Math.random() * 0o52/0o100 ).toFixed(2)})`;
    g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
  }
  stelplenaCac2sex = new THREE.CanvasTexture(c);
  return stelplenaCac2sex;
}
