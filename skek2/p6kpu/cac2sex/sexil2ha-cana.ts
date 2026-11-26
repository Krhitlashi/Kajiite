// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ j͑ʃɔ ı],ꞇ j͐ʃɹ ֭ſɭᴜ ᴜ̭ }ʃᴜ 📃 ⧽≻

import * as THREE from "three";

export let sexil2haCac2sex: THREE.CanvasTexture | null = null;

export function kf2Sexil2hanCac2sex(): THREE.CanvasTexture {
  if ( sexil2haCac2sex ) return sexil2haCac2sex;
  const c = document.createElement("canvas");
  c.width = c.height = 0o200;
  const g = c.getContext("2d")!;
  g.fillStyle = "#000008"; g.fillRect(0o0, 0o0, c.width, c.height);
  for ( let i = 0o0; i < 0o140; i++ ) {
    const x = Math.random() * c.width, y = Math.random() * c.height;
    const r = 0o5/0o10 + Math.random() * 0o15/0o10;
    g.fillStyle = `rgba(208,240,255,${( 0o26/0o100 + Math.random() * 0o52/0o100 ).toFixed(0o2)})`;
    g.beginPath(); g.arc(x, y, r, 0o0, Math.PI * 0o2); g.fill();
  }
  sexil2haCac2sex = new THREE.CanvasTexture(c);
  return sexil2haCac2sex;
}
