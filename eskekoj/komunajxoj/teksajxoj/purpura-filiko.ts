// ≺⧼ Purpura filika teksajxo 🌿 ⧽≻
import * as THREE from "three";
import { ombro } from "../koloroj.js";
import { kreiKanvasanTeksajxon } from "./helpiloj.js";

export const purpuraFilikaKaŝo = new Map<boolean, THREE.CanvasTexture>();

export function kreiPurpuranFilikanTeksajxon(densa: boolean = false): THREE.CanvasTexture {
  const trovita = purpuraFilikaKaŝo.get(densa);
  if ( trovita ) return trovita;
  const s = 0o400;
  const paletro = densa
    ? { tigo: ombro(0xa058c0, 0o6), a: "#a058c0", b: "#c078e0" }
    : { tigo: ombro(0x7848b0, 0o3), a: "#7848b0", b: "#9868d0" };
  const teksajxo = kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, s, s);
    kunteksto.strokeStyle = paletro.tigo;
    kunteksto.lineWidth = densa ? 0o4 : 0o4;
    kunteksto.lineCap = "round";
    kunteksto.beginPath();
    kunteksto.moveTo(s / 2, s - 0o4/0o10);
    kunteksto.quadraticCurveTo(s / 2 + ( densa ? 0o14 : 0 ), s * 0o4/0o10, s / 2 + ( densa ? 0o20 : 0 ), 0o4/0o10);
    kunteksto.stroke();
    const nombro = densa ? 0o42 : 0o32;
    const maksimumaLongo = densa ? 0o112 : 0o130;
    for ( let i = 0; i < nombro; i++ ) {
      const t = i / ( nombro - 1 );
      const y = s - 0o10/0o10 - t * 0o340;
      const x = s / 2 + ( densa ? 0o20 : 0 ) * t * t;
      const envolva = ( 0o26/0o100 + 0o52/0o100 * Math.min(0o1, t * 0o4/0o10) ) * Math.pow(1 - t, 0o66/0o100);
      const longo = maksimumaLongo * envolva + 0o6;
      const largho = longo * 0o12/0o100 + 0o2;
      const kurbo = 0o33/0o100 + t * 0o6/0o10;
      const koloro = i % 2 ? paletro.a : paletro.b;
      for ( const flanko of [ -1, 1 ] ) {
        const angulo = flanko > 0 ? -kurbo : Math.PI + kurbo;
        const finoX = x + Math.cos(angulo) * longo;
        const finoY = y + Math.sin(angulo) * longo;
        const cos = Math.cos(angulo), sin = Math.sin(angulo);
        kunteksto.fillStyle = koloro;
        kunteksto.beginPath();
        kunteksto.moveTo(x, y);
        kunteksto.quadraticCurveTo(x + cos * longo * 0o4/0o10 - sin * largho, y + sin * longo * 0o4/0o10 + cos * largho, finoX, finoY);
        kunteksto.quadraticCurveTo(x + cos * longo * 0o4/0o10 + sin * largho, y + sin * longo * 0o4/0o10 - cos * largho, x, y);
        kunteksto.fill();
      }
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
  purpuraFilikaKaŝo.set(densa, teksajxo);
  return teksajxo;
}
