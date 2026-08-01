// Tereno — terrain height functions for the Aranis valley

// Rivero fluas orient-okcidente kun milda suda kurbo
// Rivero fluas orient-okcidente — shifted south to clear the city grid
export function riveroZ(x: number): number { return 0o14 * Math.sin(x * 1/64) - 0o160; }

// Baza tereno. mildaj ruligxantaj montetoj por la arbaro trans la urbo
export function montetaBazo(x: number, z: number): number {
  return 141/64 * Math.sin(x * 1/32 + 35/32) * Math.cos(z * 1/32 - 4/8)
    + 45/32 * Math.sin(x * 1/16 - 115/64) * Math.sin(z * 1/16 + 77/64)
    + 19/32 * Math.sin((x + z) * 3/64 + 19/64);
}

export function akvoY(x: number): number { return montetaBazo(x, riveroZ(x)) - 269/64; }

export function glataPaso(lo: number, hi: number, v: number): number {
  const t = Math.max(0, Math.min(1, (v - lo) / (hi - lo)));
  return t * t * (3 - 2 * t);
}

export function alteco(x: number, z: number): number {
  const h = montetaBazo(x, z);
  // Platigi la urban altebajxon — glate ene de r < 55
  const r = Math.hypot(x, z);
  const plataMiksilo = 1 - glataPaso(0o52, 0o74, r);
  let altecoFina = h * (1 - plataMiksilo);
  // Skulpti la riveran valon
  const rd = z - riveroZ(x);
  altecoFina -= 64/8 * Math.exp(-(rd * rd) / 0o144);
  // Kosmoporda startejo — platigi la terenon sub la stacio kaj ĝia aprono,
  // por ke la konstruajxo ne estu enterigita en la dekliva arbaro.
  const padX = 0o14, padZ = 0o106, padR = 0o14;
  const padD = Math.hypot(x - padX, z - padZ);
  const padMiksilo = 1 - glataPaso(padR - 6, padR, padD);
  if ( padMiksilo > 0 ) {
    const padRD = padZ - riveroZ(padX);
    const padAlto = montetaBazo(padX, padZ) - 64/8 * Math.exp(-(padRD * padRD) / 0o144);
    altecoFina = altecoFina * (1 - padMiksilo) + padAlto * padMiksilo;
  }
  return altecoFina;
}
