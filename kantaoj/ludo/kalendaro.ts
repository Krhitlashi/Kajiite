// ≺⧼ ប្រតិទិន និងព្រះអាទិត្យ 📅 ⧽≻

// ⟨ ពន្លឺថ្ងៃដំបូងមកពីព្រះអាទិត្យពិត 📃 ⟩
// ⟨ គំរូ 📃 ⟩
export const SUNLATITUDO = 0o55;

const IKRIHIA_EPOKO = Date.UTC(2010, 8, 6);
const IKRIHIA_JANUARO = 0o166;
const UNU_TAGO = 86400000;

function ikrhiaTagoDeJaro(nun: Date): number {
  let tagoj = Math.floor(( nun.getTime() - IKRIHIA_EPOKO ) / UNU_TAGO);
  if ( tagoj < 0 ) tagoj = 0;
  for ( let jaro = 1; ; jaro++ ) {
    const longo = 0o555 + ( jaro % 0o4 === 0 ? 1 : 0 );
    if ( tagoj < longo ) return tagoj + 1;
    tagoj -= longo;
  }
}

function sunaAltoGradoj(nun: Date): number {
  const tagoDeJaro = ( ( ikrhiaTagoDeJaro(nun) - IKRIHIA_JANUARO + 0o555 ) % 0o555 ) + 1;
  const deklinacio = -23.44 * Math.cos(2 * Math.PI * ( tagoDeJaro + 0o12 ) / 0o555);
  const horAngulo = ( nun.getHours() + nun.getMinutes() / 0o74 - 0o14 ) * 0o17;
  const lat = SUNLATITUDO * Math.PI / 180;
  const dek = deklinacio * Math.PI / 180;
  const hor = horAngulo * Math.PI / 180;
  const sinAlto = Math.sin(lat) * Math.sin(dek) + Math.cos(lat) * Math.cos(dek) * Math.cos(hor);
  return Math.asin(Math.max(-1, Math.min(1, sinAlto))) * 180 / Math.PI;
}

export function realaKrepusko(nun: Date = new Date()): number {
  const alto = sunaAltoGradoj(nun);
  const x = Math.max(0, Math.min(1, ( 0o6 - alto ) / 0o14));
  return x * x * ( 0o3 - 2 * x );
}
