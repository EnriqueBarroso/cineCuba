/**
 * IMÁGENES DEL HERO (Backdrops)
 * Archivo: src/assets/hero/index.ts
 */

// === 1. IMÁGENES QUE YA TIENES (No tocar) ===
export { default as heroMemorias } from './memorias.jpg';
export { default as heroVampiros } from './vampiroshabana.jpg';
export { default as heroFresa } from './fresa-y-chocolate.jpg';
export { default as heroHabana } from './habana-blues.jpg';

// === 2. IMÁGENES VIEJAS (Necesarias para que catalog.ts no se rompa) ===
export { default as heroElpidio } from './elpidio.jpg';
export { default as heroJuan } from './juan-de-los-muertos.jpg';

// === 3. IMÁGENES NUEVAS (Marcadores de posición) ===
// IMPORTANTE: Como aún no has subido 'lucia-hero.jpg', 
// vamos a apuntar temporalmente a 'hero-memorias.jpg' para que el código no falle.
// (En el PASO 2 usaremos enlaces de internet para verlas visualmente)
export { default as heroLucia } from './lucia-hero.jpg';       
export { default as heroConducta } from './conducta-hero.jpg';