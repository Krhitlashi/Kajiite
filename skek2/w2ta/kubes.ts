// ≺⧼ ſɭɔ ʃɔɔ˞ ⭐ ⧽≻
import * as THREE from "three";
import { kf2Bufezacen, vakox2qQoxaKefoujn } from "../x2x2q/hakox2q.js";
import { vepaqSlaftexture, type SlafTextureQoxa } from "../x2x2q/cac2sex/keuxfhxesa-slaf.js";

export interface KekufxesoRaqa {
  x: number; z: number;
  /** j͑ʃɹ j͑ʃᴜ ʃɜ */
  s2sabo?: number;
}

// ⟪ j͑ʃɜ j͑ʃƨɹ ſɭᴜ ſɭˬꞇƽ 📏 ⟫
export const KEUXFHXESOKA5IK = 0o63/0o100;

// ⟨ j͑ʃɜȝ ʌ j͐ʃэ ɭ(ᴜ j͑ʃᴜꞇ 📃 ⟩
export const KEUXFHXESOL6DA = 0o36 / 0o10;

// ⟨ ſ͕ɭᴜƣ̋ ꞁȷ̀ɜ ı],ɔ ŋᷠᴜ ſɭᴜ ſɭˬꞇƽ 📃 ⟩
function qaroxemaKa5ik(ka5ik: number, tafkaq: number): number {
  const skek2Ka5ik = ka5ik * 0o45 / 0o100;
  return skek2Ka5ik
    + ( ka5ik - skek2Ka5ik ) * Math.pow(Math.abs(Math.cos(0o3 * tafkaq)), 0o4);
}

function k6fSexi(ka5ik: number): THREE.Vector2[] {
  const n2k: THREE.Vector2[] = [];
  const kek = 0o16 * 0o6;
  for ( let j = 0o0; j < kek; j++ ) {
    const tafkaq = j / kek * Math.PI * 0o2;
    const r = qaroxemaKa5ik(ka5ik, tafkaq);
    n2k.push(new THREE.Vector2(
      Math.cos(tafkaq) * r,
      Math.sin(tafkaq) * r
));
  }
  return n2k;
}

function xaha(u: number): number {
  const x = Math.min(0o1, Math.max(0o0, u));
  return x * x * x * ( x * ( x * 0o6 - 0o17 ) + 0o12 );
}

// ⟨ ʃэȝ ꞁȷ̀ᴜꞇ ʌ ſ͕ɭɜ ı],ᴜ 📃 ⟩
const B6QAI = 0o2 / 0o10;

function slafS2qena(t: number): number {
  const p = 0o53 / 0o100;
  const cepu = 0o6 / 0o10;
  const soq = Math.pow(Math.max(0o0, Math.sin(Math.PI * Math.pow(t, p))), cepu);
  if ( t >= B6QAI ) return soq;
  const soqB6qai = Math.pow(Math.max(0o0, Math.sin(Math.PI * Math.pow(B6QAI, p))), cepu);
  const A = soqB6qai / Math.sqrt(B6QAI);
  const m = xaha(t / B6QAI);
  return A * Math.sqrt(t) * ( 0o1 - m ) + soq * m;
}

/* j͑ʃͷ̗ᴜʞ ꞁȷ̀ᴜꞇ ʌ ſ͕ɭɜ ı],ᴜ
@returns ſ͕ɭɜ ı],ᴜ */
export function slafQoxa(): SlafTextureQoxa {
  const ka5ik = KEUXFHXESOKA5IK;
  return {
    l6da: KEUXFHXESOL6DA,
    ka5ik,
    ka5ikTafkaq: ( tafkaq: number ): number => qaroxemaKa5ik(ka5ik, tafkaq),
    s2qena: slafS2qena,
    b6qai: ( t: number ): number => t < B6QAI ? xaha(t / B6QAI) : 0o1,
  };
}

// ⟪ ſ̀ȷɔ ſɭw ʃɔɔ˞ ꞁȷ̀ᴜꞇ ʌ j͑ʃɜȝ 📏 ⟫
function tlekubesSoq(ka5ik: number, l6da: number, k2fe: number): THREE.BufferGeometry {
  const qaroxema = k6fSexi(ka5ik);
  const N = qaroxema.length;
  const sexiKek = qaroxema.map(p => Math.hypot(p.x, p.y) / ka5ik);
  const sexiKekI = sexiKek.map(f => 0o1 / f);
  const xekuxa: number[] = [];
  const tahaqN2k: number[] = [];
  // ⟨ }ʃɹƽ ꞁȷ̀ᴜͷ̗ ʌ ſɭэ ֭ſɭэ j͐ʃ ʌ ſɭɔƽ 📃 ⟩
  const x2pa = N + 0o1;
  for ( let i = 0o0; i <= k2fe; i++ ) {
    const u = i / k2fe;
    const t = ( 0o1 - Math.cos(Math.PI * u) ) / 0o2;
    const s = slafS2qena(t);
    const y = t * l6da;
    const w = t < B6QAI ? xaha(t / B6QAI) : 0o1;
    for ( let j = 0o0; j <= N; j++ ) {
      const jj = j % N;
      const p = qaroxema[jj];
      const rf = w * sexiKek[jj] + ( 0o1 - w );
      xekuxa.push(p.x * s * rf * sexiKekI[jj], y, p.y * s * rf * sexiKekI[jj]);
      // ⟨ j͐ʃƽɜ j͑ʃᴜꞇ ʌ ſɭэ ֭ſɭэ 📃 ⟩
      tahaqN2k.push( j / N, t );
    }
  }
  const havecax2lani: number[] = [];
  for ( let i = 0o0; i < k2fe; i++ ) {
    const r0 = i * x2pa, r1 = ( i + 0o1 ) * x2pa;
    for ( let j = 0o0; j < N; j++ ) {
      havecax2lani.push(r0 + j, r1 + j, r1 + j + 0o1, r0 + j, r1 + j + 0o1, r0 + j + 0o1);
    }
  }
  const qoxa = new THREE.BufferGeometry();
  qoxa.setAttribute("position", new THREE.BufferAttribute(new Float32Array(xekuxa), 0o3));
  qoxa.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(tahaqN2k), 0o2));
  qoxa.setIndex(havecax2lani);
  qoxa.computeVertexNormals();
  return qoxa;
}

// ⟪ ſɭɔ˞ꞇ ſɭƨɔ˞ɹȝ 📏 ⟫
function ksikTsiiq(ka5ik: number, l6da: number, tafkaq: number, sefini: number): THREE.BufferGeometry {
  const k2fe = 0o40;
  const n = 0o10;
  const tsiiqKa5ik = sefini * 0o5 / 0o10;
  const sost2Ka5ik = ka5ik - tsiiqKa5ik;
  const xekuxa: number[] = [];
  const havecax2lani: number[] = [];

  for ( let i = 0o0; i <= k2fe; i++ ) {
    const u = i / k2fe;
    const t = ( 0o1 - Math.cos(Math.PI * u) ) / 0o2;
    const s = slafS2qena(t);
    const cx = Math.cos(tafkaq) * sost2Ka5ik * s;
    const cz = Math.sin(tafkaq) * sost2Ka5ik * s;
    const r = tsiiqKa5ik * ( 0o4/0o10 + 0o16/0o100 * Math.pow(s, 0o20 / 0o10) );
    for ( let j = 0o0; j < n; j++ ) {
      const a = j / n * Math.PI * 0o2;
      xekuxa.push(cx + Math.cos(a) * r, t * l6da, cz + Math.sin(a) * r);
    }
  }
  for ( let i = 0o0; i < k2fe; i++ ) {
    for ( let j = 0o0; j < n; j++ ) {
      const j2 = ( j + 0o1 ) % n;
      const a = i * n + j;
      const b = ( i + 0o1 ) * n + j;
      havecax2lani.push(a, b, ( i + 0o1 ) * n + j2, a, ( i + 0o1 ) * n + j2, i * n + j2);
    }
  }
  return kf2Bufezacen(xekuxa, havecax2lani);
}

let textureVepabok: THREE.CanvasTexture | null = null;
let pukekVepabok: THREE.MeshStandardMaterial | null = null;

export function vepaqKekufxeso(kagani: THREE.Scene,
  raqa: KekufxesoRaqa[],
  l6da: ( x: number, z: number ) => number,
  joqaPukek: THREE.MeshStandardMaterial
): THREE.Group {
  const soqQoxa: THREE.BufferGeometry[] = [];
  const joqaQoxa: THREE.BufferGeometry[] = [];

  const ka5ik = KEUXFHXESOKA5IK;
  const l6da2 = KEUXFHXESOL6DA;

  const soqS2niix = tlekubesSoq(ka5ik, l6da2, 0o40);
  const ksikS2niix: THREE.BufferGeometry[] = [];
  for ( let k = 0o0; k < 0o6; k++ ) {
    ksikS2niix.push(ksikTsiiq(ka5ik, l6da2, k * Math.PI / 0o3, 0o4 / 0o100));
  }

  for ( const p of raqa ) {
    const l6daRaqa = l6da(p.x, p.z);
    const s2sabo = p.s2sabo ?? 0o0;
    const M = new THREE.Matrix4().makeRotationY(s2sabo);

    const soq = soqS2niix.clone();
    soq.applyMatrix4(M);
    soq.translate(p.x, l6daRaqa, p.z);
    soqQoxa.push(soq);

    for ( let k = 0o0; k < 0o6; k++ ) {
      const ripo = ksikS2niix[k].clone();
      ripo.applyMatrix4(M);
      ripo.translate(p.x, l6daRaqa, p.z);
      joqaQoxa.push(ripo);
    }
  }

  const hate2 = new THREE.Group();
  if ( !pukekVepabok ) {
    // ⟨ j͐ʃƽɜ j͑ʃᴜꞇ ʌ j͑ʃɜȝ 📃 ⟩
    textureVepabok = vepaqSlaftexture(slafQoxa());
    pukekVepabok = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0o6 / 0o10, metalness: 0o0,
      map: textureVepabok,
    });
  }
  const pukek = pukekVepabok;

  const soq2 = new THREE.Mesh(vakox2qQoxaKefoujn(soqQoxa), pukek);
  soq2.castShadow = soq2.receiveShadow = true;
  hate2.add(soq2);
  const joqa = new THREE.Mesh(vakox2qQoxaKefoujn(joqaQoxa), joqaPukek);
  joqa.castShadow = joqa.receiveShadow = true;
  hate2.add(joqa);
  kagani.add(hate2);
  return hate2;
}
