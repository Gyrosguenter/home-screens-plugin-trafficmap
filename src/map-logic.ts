/** Adresse der Kartenseite (GitHub Pages dieses Repos). Der Hub erlaubt für
 *  Skripte nur 'self', das Google-Maps-Skript kann deshalb nicht direkt im
 *  Modul geladen werden – es läuft in dieser eigenen Seite im iframe. */
export const MAP_PAGE_URL = 'https://gyrosguenter.github.io/home-screens-plugin-trafficmap/map.html';
export const MAP_PAGE_ORIGIN = 'https://gyrosguenter.github.io';

/** Nachrichtentypen zwischen Modul und Kartenseite. */
export const MSG_CONFIG = 'hs-trafficmap-config';
export const MSG_READY = 'hs-trafficmap-ready';
export const MSG_ERROR = 'hs-trafficmap-error';

/** Haltestelle Johann-Clanze-Straße, München. */
const DEFAULT_LAT = 48.11275;
const DEFAULT_LNG = 11.533847;
const DEFAULT_ZOOM = 13;

export interface MapSettings {
  apiKey: string;
  lat: number;
  lng: number;
  zoom: number;
  dark: boolean;
  marker: boolean;
}

function num(value: unknown): number | null {
  const n = typeof value === 'string' ? Number(value.replace(',', '.')) : Number(value);
  return Number.isFinite(n) ? n : null;
}

/** Macht aus der Modul-Konfiguration geprüfte Karteneinstellungen. */
export function readSettings(config: Record<string, unknown>): MapSettings {
  const lat = num(config.centerLat);
  const lng = num(config.centerLng);
  const zoom = num(config.zoom);
  const validPoint = lat !== null && lng !== null && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
  return {
    apiKey: typeof config.apiKey === 'string' ? config.apiKey.trim() : '',
    lat: validPoint ? lat : DEFAULT_LAT,
    lng: validPoint ? lng : DEFAULT_LNG,
    zoom: Math.min(18, Math.max(8, Math.round(zoom ?? DEFAULT_ZOOM))),
    dark: config.darkMap !== false,
    marker: config.showMarker !== false,
  };
}

/** Wirkt wie ein Google-API-Key? (Nur grobe Plausibilität, der Server prüft.) */
export function looksLikeApiKey(value: string): boolean {
  return /^[A-Za-z0-9_-]{20,}$/.test(value);
}
