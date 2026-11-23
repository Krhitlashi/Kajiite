// ≺⧼ j͑ʃͷ̗ᴜʞ ꞁȷ̀ᴜꞇ ʌ ʃᴜ ſɟᴜ ſɟɹ j͑ʃɔᶗ‹ ⭐ ⧽≻
import * as THREE from "three";

// ⟪ j͑ʃͷ̗ᴜʞ ꞁȷ̀ᴜͷ̗ ʌ j͐ʃƽɜ j͑ʃᴜꞇ ʌ ſ͕ɭɜ ı],ᴜ 📏 ⟫
export interface SlafLkoQoxa {
  l6da: number;
  ka5ik: number;
  ka5ikTafkaq: ( tafkaq: number ) => number;
  s2qena: ( t: number ) => number;
  b6qai: ( t: number ) => number;
}

// ⟪ ſȷw ſ̀ȷэ j͑ʃɔ ŋᷠᴜ 🖼️ ⟫
let fu36Sema: Promise<HTMLImageElement> | null = null;

function s2tosaxFu36Tahaq(): Promise<HTMLImageElement> {
  if ( !fu36Sema ) {
    fu36Sema = new Promise((sema, semaX) => {
      const tahaq = new Image();
      tahaq.onload = (): void => sema(tahaq);
      tahaq.onerror = (): void => semaX(new Error("ſ͕ȷɜ j͑ʃɹ ʌ ɭʃɜ ʌ j͑ʃᴜᶗ‹ ʌ ֭ſɭᴜ ʌ ſɟɹ }ʃw ⟅"));
      tahaq.src = new URL("./kubes.png", import.meta.url).href;
    });
  }
  return fu36Sema;
}

/* ſɭᶗ‹ɹ ᶅſɔ ֭ſɭɹ ֭ſɭᴜ ſɟɹ }ʃw
    @param p2t6zo ( HTMLCanvasElement ) - ſןɹ ɭʃэ ſɭ,ɜ
    @param tahaq ( HTMLImageElement ) - ɭʃᴜ ֭ſɭᴜȝ
@returns ſɭɜ j͑ʃƽɔ ſɭɹ */
function kx2weh2Hac2nu(p2t6zo: HTMLCanvasElement, tahaq: HTMLImageElement): void {
  const k = p2t6zo.getContext("2d")!;
  // ⟨ ſɭɔƽ ſɭᴜ ɭʃᴜ ֭ſɭᴜȝ 📃 ⟩
  const kekka = 0o6;
  const kekSefini = p2t6zo.width / kekka;
  for ( let j = 0o0; j < kekka; j++ ) {
    k.drawImage(tahaq, j * kekSefini, 0o0, kekSefini, p2t6zo.height);
  }
}

/* ſןw j͐ʃɹ ŋᷠɔ }ʃꞇ j͑ʃɜȝ
    @param k2fP2t6zo ( HTMLCanvasElement ) - ſןɹ ɭʃэ ſɭ,ɜ
    @param qoxa ( SlafLkoQoxa ) - ſ͕ɭɜ ı],ᴜ
    @param lko ( HTMLCanvasElement ) - ſןɹ ɭʃэ ſɭ,ɜ
@returns ſɭɜ j͑ʃƽɔ ſɭɹ */
function pul2meniSoq(k2fP2t6zo: HTMLCanvasElement, qoxa: SlafLkoQoxa, lko: HTMLCanvasElement): void {
  const W = lko.width, H = lko.height;
  const sefini = k2fP2t6zo.width, l6da = k2fP2t6zo.height;
  // ⟨ ᶅſɔ ɽ͑ʃ'ɔ 📃 ⟩
  const k = k2fP2t6zo.getContext("2d")!;
  k.fillStyle = "#a0c8b0";
  k.fillRect(0o0, 0o0, sefini, l6da);
  const c2ta = k.getImageData(0o0, 0o0, sefini, l6da);
  const tseuni = lko.getContext("2d")!.getImageData(0o0, 0o0, W, H);
  // ⟨ ſɭɔƽ ſɭᴜ ɭʃᴜʞ ſɭᴜȝ 📃 ⟩
  const kekka = 0o6;
  const kekSefini = W / kekka;
  for ( let y = 0o0; y < l6da; y++ ) for ( let t = 0o0; t < sefini; t++ ) {
    const gi = 0o1 - y / l6da;
    const b6qai = qoxa.b6qai(gi);
    const u = t / sefini;
    const kekN2k = Math.min(kekka - 0o1, Math.floor(u * kekka));
    const uL = u * kekka - kekN2k;
    const a = u * Math.PI * 0o2;
    const aL = uL * Math.PI;
    const w = b6qai;
    const sL = qoxa.s2qena(gi);
    // ⟨ ɽ͑ʃ'ᴜ ſ͕ɭᴜ ı],ɔ ſɭw ı],ᴜ 📃 ⟩
    const r = ( w * qoxa.ka5ikTafkaq(a) + ( 0o1 - w ) * qoxa.ka5ik ) / qoxa.ka5ik;
    const xekuxa = sL * r * Math.cos(aL);
    const sx = Math.floor(kekN2k * kekSefini + (xekuxa + 0o1) / 0o2 * kekSefini), sy = Math.floor(y / l6da * H);
    if ( sx < 0o0 || sx >= W || sy < 0o0 || sy >= H ) continue;
    const si = (sy * W + sx) * 0o4, di = (y * sefini + t) * 0o4;
    // ⟨ j͐ʃƽw 📃 ⟩
    if ( tseuni.data[si + 0o3] < 0o64 ) continue;
    for ( let b = 0o0; b < 0o4; b++ ) c2ta.data[di + b] = tseuni.data[si + b];
  }
  k.putImageData(c2ta, 0o0, 0o0);
}

/* ſɭʞɹ ʌ ʃᴜ ſɟᴜ ſɟɹ j͑ʃɔᶗ‹
    @param qoxa ( SlafLkoQoxa ) - ſ͕ɭɜ ı],ᴜ
@returns ʃᴜ ſɟᴜ ſɟɹ j͑ʃɔᶗ‹ */
export function vepaqSlaflko(qoxa: SlafLkoQoxa): THREE.CanvasTexture {
  const l6da = 0o2000;
  // ⟨ ſɭɔƽ ſɭᴜ j͑ʃɔ ſȷꞇ }ʃꞇ 📃 ⟩
  const sefini = 0o4400;
  const kf2P2t6zo = document.createElement("canvas");
  kf2P2t6zo.width = sefini; kf2P2t6zo.height = l6da;
  const kf = kf2P2t6zo.getContext("2d")!;
  kf.fillStyle = "#a0c8b0";
  kf.fillRect(0o0, 0o0, sefini, l6da);
  const lko = new THREE.CanvasTexture(kf2P2t6zo);
  lko.colorSpace = THREE.SRGBColorSpace;
  lko.anisotropy = 0o10;

  void s2tosaxFu36Tahaq().then((tahaq) => {
    const tsiq = document.createElement("canvas");
    tsiq.width = sefini; tsiq.height = l6da;
    kx2weh2Hac2nu(tsiq, tahaq);
    pul2meniSoq(kf2P2t6zo, qoxa, tsiq);
    lko.needsUpdate = true;
  }).catch((k3ohk2nik2p2) => {
    void k3ohk2nik2p2;
  });

  return lko;
}
