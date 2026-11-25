// ≺⧼ ſןɔ ɭʃƣ̋ɔ j͐ʃᴜ j͑ʃᴜꞇ ʌ ſןͷ̗w ŋᷠᴜ ɽ͑ʃ'ɜ j͑ʃᴜꞇ ʌ j͐ʃƽɜ }ʃꞇ 🕊️ ⧽≻
import { kf2P2t6zoCac2sex } from "./mafezi.js";
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
  for ( let i = 0; i < 0o40; i++ ) {
    korpajHax2pa.push({
      v: 0o2/0o100 + ( i / 0o40 ) * 0o74/0o100,
      xafanitapu: Math.random(),
      malhelo: 0o10/0o100 + Math.random() * 0o12/0o100,
    });
  }
  const kovrilajHax2pa: PetrelaPlumaX2pa[] = [];
  for ( let i = 0; i < 0o10; i++ ) {
    kovrilajHax2pa.push({
      v: 0o10/0o100 + i * 0o10/0o100,
      xafanitapu: Math.random(),
      malhelo: 0o12/0o100 + Math.random() * 0o10/0o100,
    });
  }
  const primarajStrioj: PetrelaFlugilaStrio[] = [];
  for ( let i = 0; i < 0o30; i++ ) {
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
    k.fillStyle = "#f8f8f8"; k.fillRect(0, 0, KORPAS, KORPAS);
    const dorsa = k.createLinearGradient(0, 0, KORPAS, 0);
    dorsa.addColorStop(0, "rgba(184,200,208,0.22)");
    dorsa.addColorStop(0o1/0o4, "rgba(176,192,208,0.34)");
    dorsa.addColorStop(0o1/0o2, "rgba(192,208,216,0.16)");
    dorsa.addColorStop(0o3/0o4, "rgba(216,224,232,0.02)");
    dorsa.addColorStop(1, "rgba(184,200,208,0.22)");
    k.fillStyle = dorsa; k.fillRect(0, 0, KORPAS, KORPAS);
    const sakp6scasai = generiPetrelanSakp6scasai();
    for ( const x2pa of sakp6scasai.korpajHax2pa ) {
      const y = ( 1 - x2pa.v ) * KORPAS;
      for ( let i = 0; i < 0o40; i++ ) {
        const x = ( ( i + x2pa.xafanitapu ) / 0o40 ) * KORPAS;
        k.strokeStyle = `rgba(144,160,176,${x2pa.malhelo})`;
        k.lineWidth = 1;
        k.beginPath();
        k.arc(x, y, KORPASTUPO / 0o2, Math.PI, 0);
        k.stroke();
        k.strokeStyle = "rgba(255,255,255,0.6)";
        k.beginPath();
        k.arc(x, y + 1, KORPASTUPO / 0o2, Math.PI, 0);
        k.stroke();
      }
    }
    const EKZ = 0o5/0o20, BEKX = 0o27/0o100;
    for ( const u of [ 0o11/0o100, 0o67/0o100 ] ) {
      const vOkulo = vPorZ(EKZ), vBeko = vPorZ(BEKX);
      const yDe = ( 1 - vOkulo ) * KORPAS, yAl = ( 1 - vBeko ) * KORPAS;
      k.save();
      k.translate(u * KORPAS, yDe);
      k.fillStyle = "rgba(48,56,64,0.6)";
      k.beginPath();
      k.ellipse(0, ( yAl - yDe ) / 0o2, KORPAS * 0o12/0o100,
        Math.abs(yAl - yDe) / 0o2, 0, 0, Math.PI * 2);
      k.fill();
      k.fillStyle = "rgba(64,72,80,0.3)";
      k.beginPath();
      k.ellipse(0, ( yAl - yDe ) / 0o2, KORPAS * 0o1/0o4,
        Math.abs(yAl - yDe) / 0o2 + 1, 0, 0, Math.PI * 2);
      k.fill();
      k.restore();
    }
    const vosta = k.createLinearGradient(0, KORPAS, 0, KORPAS * 0o4/0o5);
    vosta.addColorStop(0, "rgba(168,184,200,0.24)");
    vosta.addColorStop(1, "rgba(168,184,200,0)");
    k.fillStyle = vosta; k.fillRect(0, 0, KORPAS, KORPAS);
  }, [ 1, 1 ], { g2b2: THREE.ClampToEdgeWrapping, anisotropio: 0o4 });

const kf2KorpanBumpanCac2sex = ( vPorZ: ( z: number ) => number ): THREE.CanvasTexture =>
  kf2P2t6zoCac2sex(KORPAS, KORPAS, ( k ) => {
    k.fillStyle = "#808080"; k.fillRect(0, 0, KORPAS, KORPAS);
    const sakp6scasai = generiPetrelanSakp6scasai();
    for ( const x2pa of sakp6scasai.korpajHax2pa ) {
      const y = ( 1 - x2pa.v ) * KORPAS;
      for ( let i = 0; i < 0o40; i++ ) {
        const x = ( ( i + x2pa.xafanitapu ) / 0o40 ) * KORPAS;
        k.strokeStyle = "rgba(56,56,56,0.6)";
        k.lineWidth = 1;
        k.beginPath();
        k.arc(x, y, KORPASTUPO / 0o2, Math.PI, 0);
        k.stroke();
        k.strokeStyle = "rgba(176,176,176,0.7)";
        k.beginPath();
        k.arc(x, y + 1, KORPASTUPO / 0o2, Math.PI, 0);
        k.stroke();
      }
    }
    const EKZ = 0o5/0o20, BEKX = 0o27/0o100;
    for ( const u of [ 0o11/0o100, 0o67/0o100 ] ) {
      const vOkulo = vPorZ(EKZ), vBeko = vPorZ(BEKX);
      const yDe = ( 1 - vOkulo ) * KORPAS, yAl = ( 1 - vBeko ) * KORPAS;
      k.fillStyle = "rgba(104,104,104,0.55)";
      k.beginPath();
      k.ellipse(u * KORPAS, ( yDe + yAl ) / 0o2, KORPAS * 0o12/0o100,
        Math.abs(yAl - yDe) / 0o2, 0, 0, Math.PI * 2);
      k.fill();
    }
  }, [ 1, 1 ], { g2b2: THREE.ClampToEdgeWrapping, sRGB: false, anisotropio: 0o4 });

const FLUGILAS = 0o400;

const kf2FlugilanCac2sex = (): THREE.CanvasTexture =>
  kf2P2t6zoCac2sex(FLUGILAS, FLUGILAS, ( k ) => {
    k.fillStyle = "#f8f8f8"; k.fillRect(0, 0, FLUGILAS, FLUGILAS);
    const plosteqDe = 0o40/0o100, plosteqAl = 0o52/0o100;
    const sakp6scasai = generiPetrelanSakp6scasai();
    for ( const x2pa of sakp6scasai.kovrilajHax2pa ) {
      const y = ( 1 - x2pa.v ) * FLUGILAS;
      for ( let x = 0; x < plosteqDe * FLUGILAS; x += 0o20 ) {
        k.strokeStyle = `rgba(144,160,176,${x2pa.malhelo})`;
        k.lineWidth = 1;
        k.beginPath();
        k.arc(x + ( x2pa.xafanitapu * 0o20 ), y, 0o10, Math.PI, 0);
        k.stroke();
        k.strokeStyle = "rgba(255,255,255,0.65)";
        k.beginPath();
        k.arc(x + ( x2pa.xafanitapu * 0o20 ), y + 1, 0o10, Math.PI, 0);
        k.stroke();
      }
    }
    const nigro = k.createLinearGradient(plosteqDe * FLUGILAS, 0, FLUGILAS, 0);
    nigro.addColorStop(0, "rgba(48,56,64,0.9)");
    nigro.addColorStop(0o1/0o2, "rgba(24,32,40,1)");
    nigro.addColorStop(1, "rgba(16,16,24,1)");
    k.fillStyle = nigro;
    k.beginPath();
    k.moveTo(plosteqDe * FLUGILAS, 0);
    k.lineTo(plosteqAl * FLUGILAS, FLUGILAS);
    k.lineTo(FLUGILAS, FLUGILAS);
    k.lineTo(FLUGILAS, 0);
    k.closePath();
    k.fill();
    for ( let i = 1; i <= 0o4; i++ ) {
      const t = i / 0o5;
      k.strokeStyle = `rgba(48,56,64,${0o3/0o10 * ( 1 - t )})`;
      k.lineWidth = 0o4 * i;
      k.beginPath();
      k.moveTo(( plosteqDe - 0o4/0o100 * t ) * FLUGILAS, 0);
      k.lineTo(( plosteqAl - 0o4/0o100 * t ) * FLUGILAS, FLUGILAS);
      k.stroke();
    }
    for ( const strio of sakp6scasai.primarajStrioj ) {
      k.strokeStyle = `rgba(96,104,120,${0o45/0o100})`;
      k.lineWidth = strio.kof;
      const x = strio.u * FLUGILAS;
      const dx = strio.tafkaq * FLUGILAS * 0o1/0o2;
      k.beginPath();
      k.moveTo(x - dx, 0);
      k.lineTo(x + dx, FLUGILAS);
      k.stroke();
    }
    const rimo = k.createLinearGradient(0, 0, 0, FLUGILAS * 0o10/0o100);
    rimo.addColorStop(0, "rgba(144,168,184,0.5)");
    rimo.addColorStop(1, "rgba(144,168,184,0)");
    k.fillStyle = rimo; k.fillRect(0, 0, FLUGILAS, FLUGILAS * 0o10/0o100);
    const hunanu = k.createLinearGradient(0, FLUGILAS, 0, FLUGILAS * 0o66/0o100);
    hunanu.addColorStop(0, "rgba(120,136,152,0.3)");
    hunanu.addColorStop(1, "rgba(120,136,152,0)");
    k.fillStyle = hunanu; k.fillRect(0, 0, FLUGILAS, FLUGILAS);
  }, [ 1, 1 ], { g2b2: THREE.ClampToEdgeWrapping, anisotropio: 0o4 });

const kf2FlugilanBumpanCac2sex = (): THREE.CanvasTexture =>
  kf2P2t6zoCac2sex(FLUGILAS, FLUGILAS, ( k ) => {
    k.fillStyle = "#808080"; k.fillRect(0, 0, FLUGILAS, FLUGILAS);
    const plosteqDe = 0o40/0o100;
    const sakp6scasai = generiPetrelanSakp6scasai();
    for ( const x2pa of sakp6scasai.kovrilajHax2pa ) {
      const y = ( 1 - x2pa.v ) * FLUGILAS;
      for ( let x = 0; x < plosteqDe * FLUGILAS; x += 0o20 ) {
        k.strokeStyle = "rgba(56,56,56,0.6)";
        k.lineWidth = 1;
        k.beginPath();
        k.arc(x + ( x2pa.xafanitapu * 0o20 ), y, 0o10, Math.PI, 0);
        k.stroke();
        k.strokeStyle = "rgba(184,184,184,0.7)";
        k.beginPath();
        k.arc(x + ( x2pa.xafanitapu * 0o20 ), y + 1, 0o10, Math.PI, 0);
        k.stroke();
      }
    }
    for ( const strio of sakp6scasai.primarajStrioj ) {
      k.strokeStyle = "rgba(120,120,120,0.5)";
      k.lineWidth = strio.kof;
      const x = strio.u * FLUGILAS;
      const dx = strio.tafkaq * FLUGILAS * 0o1/0o2;
      k.beginPath();
      k.moveTo(x - dx, 0);
      k.lineTo(x + dx, FLUGILAS);
      k.stroke();
    }
    const rimo = k.createLinearGradient(0, 0, 0, FLUGILAS * 0o10/0o100);
    rimo.addColorStop(0, "rgba(192,192,192,0.85)");
    rimo.addColorStop(1, "rgba(128,128,128,0)");
    k.fillStyle = rimo; k.fillRect(0, 0, FLUGILAS, FLUGILAS * 0o10/0o100);
  }, [ 1, 1 ], { g2b2: THREE.ClampToEdgeWrapping, sRGB: false, anisotropio: 0o4 });

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
