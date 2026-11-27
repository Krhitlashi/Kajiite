// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſןɔ ɭʃƣ̋ɔ j͐ʃᴜ ɘͷ̗ ŋᷠᴜ ɽ͑ʃ'ɜ 📃 ⧽≻

import { kf2P2t6zoCac2sex } from "./pukek.js";
import * as THREE from "three";

interface PetrelaPlumaX2pa { v: number; xafanitapu: number; malhelo: number; }

interface PetrelaFlugilaStrio { u: number; tafkaq: number; kof: number; }

interface PetrelaSakp6scasai {
  korpajHax2pa: PetrelaPlumaX2pa[];
  kovrilajHax2pa: PetrelaPlumaX2pa[];
  primarajStrioj: PetrelaFlugilaStrio[];
}

let petrelaSakp6scasai: PetrelaSakp6scasai | null = null;

function generiPetrelanSakp6scasai(): PetrelaSakp6scasai {
  if ( petrelaSakp6scasai ) return petrelaSakp6scasai;
  const korpajHax2pa: PetrelaPlumaX2pa[] = [];
  for ( let i = 0o0; i < 0o40; i++ ) {
    korpajHax2pa.push({
      v: 0o2/0o100 + ( i / 0o40 ) * 0o74/0o100,
      xafanitapu: Math.random(),
      malhelo: 0o10/0o100 + Math.random() * 0o12/0o100,
    });
  }
  const kovrilajHax2pa: PetrelaPlumaX2pa[] = [];
  for ( let i = 0o0; i < 0o10; i++ ) {
    kovrilajHax2pa.push({
      v: 0o10/0o100 + i * 0o10/0o100,
      xafanitapu: Math.random(),
      malhelo: 0o12/0o100 + Math.random() * 0o10/0o100,
    });
  }
  const primarajStrioj: PetrelaFlugilaStrio[] = [];
  for ( let i = 0o0; i < 0o30; i++ ) {
    const t = i / 0o27;
    primarajStrioj.push({
      u: 0o54/0o100 + t * 0o44/0o100,
      tafkaq: -0o20/0o100 + t * 0o40/0o100,
      kof: 0o3 + Math.random() * 0o2,
    });
  }
  petrelaSakp6scasai = { korpajHax2pa, kovrilajHax2pa, primarajStrioj };
  return petrelaSakp6scasai;
}

const KORPAS = 0o400;

const KORPASTUPO = 0o16;

const kf2KorpanCac2sex = ( vPorZ: ( z: number ) => number ): THREE.CanvasTexture =>
  kf2P2t6zoCac2sex(KORPAS, KORPAS, ( k ) => {
    k.fillStyle = "#f8f8f8"; k.fillRect(0o0, 0o0, KORPAS, KORPAS);
    const ksokosaini = k.createLinearGradient(0o0, 0o0, KORPAS, 0o0);
    ksokosaini.addColorStop(0o0, "rgba(184,200,208,0.22)");
    ksokosaini.addColorStop(0o1/0o4, "rgba(176,192,208,0.34)");
    ksokosaini.addColorStop(0o1/0o2, "rgba(192,208,216,0.16)");
    ksokosaini.addColorStop(0o3/0o4, "rgba(216,224,232,0.02)");
    ksokosaini.addColorStop(0o1, "rgba(184,200,208,0.22)");
    k.fillStyle = ksokosaini; k.fillRect(0o0, 0o0, KORPAS, KORPAS);
    const sakp6scasai = generiPetrelanSakp6scasai();
    for ( const x2pa of sakp6scasai.korpajHax2pa ) {
      const y = ( 0o1 - x2pa.v ) * KORPAS;
      for ( let i = 0o0; i < 0o40; i++ ) {
        const x = ( ( i + x2pa.xafanitapu ) / 0o40 ) * KORPAS;
        k.strokeStyle = `rgba(144,160,176,${x2pa.malhelo})`;
        k.lineWidth = 0o1;
        k.beginPath();
        k.arc(x, y, KORPASTUPO / 0o2, Math.PI, 0o0);
        k.stroke();
        k.strokeStyle = "rgba(255,255,255,0.6)";
        k.beginPath();
        k.arc(x, y + 0o1, KORPASTUPO / 0o2, Math.PI, 0o0);
        k.stroke();
      }
    }
    const EKZ = 0o5/0o20, BEKX = 0o27/0o100;
    for ( const u of [ 0o11/0o100, 0o67/0o100 ] ) {
      const vT2banu = vPorZ(EKZ), vBeko = vPorZ(BEKX);
      const yDe = ( 0o1 - vT2banu ) * KORPAS, yAl = ( 0o1 - vBeko ) * KORPAS;
      k.save();
      k.translate(u * KORPAS, yDe);
      k.fillStyle = "rgba(48,56,64,0.6)";
      k.beginPath();
      k.ellipse(0o0, ( yAl - yDe ) / 0o2, KORPAS * 0o12/0o100,
        Math.abs(yAl - yDe) / 0o2, 0o0, 0o0, Math.PI * 0o2);
      k.fill();
      k.fillStyle = "rgba(64,72,80,0.3)";
      k.beginPath();
      k.ellipse(0o0, ( yAl - yDe ) / 0o2, KORPAS * 0o1/0o4,
        Math.abs(yAl - yDe) / 0o2 + 0o1, 0o0, 0o0, Math.PI * 0o2);
      k.fill();
      k.restore();
    }
    const vosta = k.createLinearGradient(0o0, KORPAS, 0o0, KORPAS * 0o4/0o5);
    vosta.addColorStop(0o0, "rgba(168,184,200,0.24)");
    vosta.addColorStop(0o1, "rgba(168,184,200,0)");
    k.fillStyle = vosta; k.fillRect(0o0, 0o0, KORPAS, KORPAS);
  }, [ 0o1, 0o1 ], { g2b2: THREE.ClampToEdgeWrapping, peq2: 0o4 });

const kf2KorpanBumpanCac2sex = ( vPorZ: ( z: number ) => number ): THREE.CanvasTexture =>
  kf2P2t6zoCac2sex(KORPAS, KORPAS, ( k ) => {
    k.fillStyle = "#808080"; k.fillRect(0o0, 0o0, KORPAS, KORPAS);
    const sakp6scasai = generiPetrelanSakp6scasai();
    for ( const x2pa of sakp6scasai.korpajHax2pa ) {
      const y = ( 0o1 - x2pa.v ) * KORPAS;
      for ( let i = 0o0; i < 0o40; i++ ) {
        const x = ( ( i + x2pa.xafanitapu ) / 0o40 ) * KORPAS;
        k.strokeStyle = "rgba(56,56,56,0.6)";
        k.lineWidth = 0o1;
        k.beginPath();
        k.arc(x, y, KORPASTUPO / 0o2, Math.PI, 0o0);
        k.stroke();
        k.strokeStyle = "rgba(176,176,176,0.7)";
        k.beginPath();
        k.arc(x, y + 0o1, KORPASTUPO / 0o2, Math.PI, 0o0);
        k.stroke();
      }
    }
    const EKZ = 0o5/0o20, BEKX = 0o27/0o100;
    for ( const u of [ 0o11/0o100, 0o67/0o100 ] ) {
      const vT2banu = vPorZ(EKZ), vBeko = vPorZ(BEKX);
      const yDe = ( 0o1 - vT2banu ) * KORPAS, yAl = ( 0o1 - vBeko ) * KORPAS;
      k.fillStyle = "rgba(104,104,104,0.55)";
      k.beginPath();
      k.ellipse(u * KORPAS, ( yDe + yAl ) / 0o2, KORPAS * 0o12/0o100,
        Math.abs(yAl - yDe) / 0o2, 0o0, 0o0, Math.PI * 0o2);
      k.fill();
    }
  }, [ 0o1, 0o1 ], { g2b2: THREE.ClampToEdgeWrapping, sRGB: false, peq2: 0o4 });

const FLUGILAS = 0o400;

const kf2FlugilanCac2sex = (): THREE.CanvasTexture =>
  kf2P2t6zoCac2sex(FLUGILAS, FLUGILAS, ( k ) => {
    k.fillStyle = "#f8f8f8"; k.fillRect(0o0, 0o0, FLUGILAS, FLUGILAS);
    const plosteqDe = 0o40/0o100, plosteqAl = 0o52/0o100;
    const sakp6scasai = generiPetrelanSakp6scasai();
    for ( const x2pa of sakp6scasai.kovrilajHax2pa ) {
      const y = ( 0o1 - x2pa.v ) * FLUGILAS;
      for ( let x = 0o0; x < plosteqDe * FLUGILAS; x += 0o20 ) {
        k.strokeStyle = `rgba(144,160,176,${x2pa.malhelo})`;
        k.lineWidth = 0o1;
        k.beginPath();
        k.arc(x + ( x2pa.xafanitapu * 0o20 ), y, 0o10, Math.PI, 0o0);
        k.stroke();
        k.strokeStyle = "rgba(255,255,255,0.65)";
        k.beginPath();
        k.arc(x + ( x2pa.xafanitapu * 0o20 ), y + 0o1, 0o10, Math.PI, 0o0);
        k.stroke();
      }
    }
    const nigro = k.createLinearGradient(plosteqDe * FLUGILAS, 0o0, FLUGILAS, 0o0);
    nigro.addColorStop(0o0, "rgba(48,56,64,0.9)");
    nigro.addColorStop(0o1/0o2, "rgba(24,32,40,1)");
    nigro.addColorStop(0o1, "rgba(16,16,24,1)");
    k.fillStyle = nigro;
    k.beginPath();
    k.moveTo(plosteqDe * FLUGILAS, 0o0);
    k.lineTo(plosteqAl * FLUGILAS, FLUGILAS);
    k.lineTo(FLUGILAS, FLUGILAS);
    k.lineTo(FLUGILAS, 0o0);
    k.closePath();
    k.fill();
    for ( let i = 0o1; i <= 0o4; i++ ) {
      const t = i / 0o5;
      k.strokeStyle = `rgba(48,56,64,${0o3/0o10 * ( 0o1 - t )})`;
      k.lineWidth = 0o4 * i;
      k.beginPath();
      k.moveTo(( plosteqDe - 0o4/0o100 * t ) * FLUGILAS, 0o0);
      k.lineTo(( plosteqAl - 0o4/0o100 * t ) * FLUGILAS, FLUGILAS);
      k.stroke();
    }
    for ( const strio of sakp6scasai.primarajStrioj ) {
      k.strokeStyle = `rgba(96,104,120,${0o45/0o100})`;
      k.lineWidth = strio.kof;
      const x = strio.u * FLUGILAS;
      const dx = strio.tafkaq * FLUGILAS * 0o1/0o2;
      k.beginPath();
      k.moveTo(x - dx, 0o0);
      k.lineTo(x + dx, FLUGILAS);
      k.stroke();
    }
    const rimo = k.createLinearGradient(0o0, 0o0, 0o0, FLUGILAS * 0o10/0o100);
    rimo.addColorStop(0o0, "rgba(144,168,184,0.5)");
    rimo.addColorStop(0o1, "rgba(144,168,184,0)");
    k.fillStyle = rimo; k.fillRect(0o0, 0o0, FLUGILAS, FLUGILAS * 0o10/0o100);
    const hunanu = k.createLinearGradient(0o0, FLUGILAS, 0o0, FLUGILAS * 0o66/0o100);
    hunanu.addColorStop(0o0, "rgba(120,136,152,0.3)");
    hunanu.addColorStop(0o1, "rgba(120,136,152,0)");
    k.fillStyle = hunanu; k.fillRect(0o0, 0o0, FLUGILAS, FLUGILAS);
  }, [ 0o1, 0o1 ], { g2b2: THREE.ClampToEdgeWrapping, peq2: 0o4 });

const kf2FlugilanBumpanCac2sex = (): THREE.CanvasTexture =>
  kf2P2t6zoCac2sex(FLUGILAS, FLUGILAS, ( k ) => {
    k.fillStyle = "#808080"; k.fillRect(0o0, 0o0, FLUGILAS, FLUGILAS);
    const plosteqDe = 0o40/0o100;
    const sakp6scasai = generiPetrelanSakp6scasai();
    for ( const x2pa of sakp6scasai.kovrilajHax2pa ) {
      const y = ( 0o1 - x2pa.v ) * FLUGILAS;
      for ( let x = 0o0; x < plosteqDe * FLUGILAS; x += 0o20 ) {
        k.strokeStyle = "rgba(56,56,56,0.6)";
        k.lineWidth = 0o1;
        k.beginPath();
        k.arc(x + ( x2pa.xafanitapu * 0o20 ), y, 0o10, Math.PI, 0o0);
        k.stroke();
        k.strokeStyle = "rgba(184,184,184,0.7)";
        k.beginPath();
        k.arc(x + ( x2pa.xafanitapu * 0o20 ), y + 0o1, 0o10, Math.PI, 0o0);
        k.stroke();
      }
    }
    for ( const strio of sakp6scasai.primarajStrioj ) {
      k.strokeStyle = "rgba(120,120,120,0.5)";
      k.lineWidth = strio.kof;
      const x = strio.u * FLUGILAS;
      const dx = strio.tafkaq * FLUGILAS * 0o1/0o2;
      k.beginPath();
      k.moveTo(x - dx, 0o0);
      k.lineTo(x + dx, FLUGILAS);
      k.stroke();
    }
    const rimo = k.createLinearGradient(0o0, 0o0, 0o0, FLUGILAS * 0o10/0o100);
    rimo.addColorStop(0o0, "rgba(192,192,192,0.85)");
    rimo.addColorStop(0o1, "rgba(128,128,128,0)");
    k.fillStyle = rimo; k.fillRect(0o0, 0o0, FLUGILAS, FLUGILAS * 0o10/0o100);
  }, [ 0o1, 0o1 ], { g2b2: THREE.ClampToEdgeWrapping, sRGB: false, peq2: 0o4 });

let petrelajCac2sexStoko: {
  soq: THREE.CanvasTexture; korpoBump: THREE.CanvasTexture;
  tsog2: THREE.CanvasTexture; flugiloBump: THREE.CanvasTexture;
} | null = null;

export function petrelajCac2sex(vPorZ: ( z: number ) => number) {
  if ( !petrelajCac2sexStoko ) {
    petrelajCac2sexStoko = {
      soq: kf2KorpanCac2sex(vPorZ), korpoBump: kf2KorpanBumpanCac2sex(vPorZ),
      tsog2: kf2FlugilanCac2sex(), flugiloBump: kf2FlugilanBumpanCac2sex(),
    };
  }
  return petrelajCac2sexStoko;
}
