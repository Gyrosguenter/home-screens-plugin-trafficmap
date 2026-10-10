import { describe, expect, it } from 'vitest';
import { looksLikeApiKey, readSettings } from './map-logic';

describe('readSettings', () => {
  it('nimmt Standardwerte (Johann-Clanze-Straße, Zoom 13, dunkel, Markierung)', () => {
    expect(readSettings({})).toEqual({
      apiKey: '',
      lat: 48.11275,
      lng: 11.533847,
      zoom: 13,
      dark: true,
      marker: true,
    });
  });

  it('übernimmt gültige Werte, auch mit Komma als Dezimaltrenner', () => {
    const s = readSettings({
      apiKey: '  abc  ',
      centerLat: '48,2',
      centerLng: 11.6,
      zoom: 15.4,
      darkMap: false,
      showMarker: false,
    });
    expect(s).toEqual({ apiKey: 'abc', lat: 48.2, lng: 11.6, zoom: 15, dark: false, marker: false });
  });

  it('fällt bei unmöglichen Koordinaten auf die Standardmitte zurück', () => {
    const s = readSettings({ centerLat: 480, centerLng: 11.5 });
    expect(s.lat).toBe(48.11275);
    expect(s.lng).toBe(11.533847);
  });

  it('begrenzt den Zoom', () => {
    expect(readSettings({ zoom: 99 }).zoom).toBe(18);
    expect(readSettings({ zoom: 1 }).zoom).toBe(8);
  });
});

describe('looksLikeApiKey', () => {
  it('erkennt typische Google-Keys', () => {
    expect(looksLikeApiKey('AIzaSyA-1234567890abcdefghijklmnopqrstu')).toBe(true);
    expect(looksLikeApiKey('kurz')).toBe(false);
    expect(looksLikeApiKey('mit leerzeichen und so weiter bla bla')).toBe(false);
  });
});
