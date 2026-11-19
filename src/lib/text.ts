/**
 * Texto para comparar en búsquedas: minúsculas, sin tildes ni otras marcas diacríticas y sin espacios en los extremos.
 * "Últimos" → "ultimos", "Bámbola" → "bambola", "Hemingüey" → "heminguey" (la ü y la ñ pierden su marca: "ü" → "u", "ñ" → "n").
 * Función pura, sin APIs de navegador: también se ejecuta en el prerender.
 */
export const normalizeText = (s: string): string =>
  s.normalize("NFD").replace(/\p{Diacritic}|[̀-ͯ]/gu, "").toLowerCase().trim();
