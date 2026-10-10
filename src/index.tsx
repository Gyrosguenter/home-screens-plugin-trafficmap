import React from 'react';
import type { PluginComponentProps } from './hs-plugin';
import { hostFrameStyle, scalePx } from './host-style';
import {
  MAP_PAGE_ORIGIN,
  MAP_PAGE_URL,
  MSG_CONFIG,
  MSG_ERROR,
  MSG_READY,
  looksLikeApiKey,
  readSettings,
} from './map-logic';

function Notice({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: '0.5em',
        padding: scalePx(24),
      }}
    >
      <div style={{ fontSize: '1.3em', fontWeight: 600 }}>{title}</div>
      {lines.map((line, i) => (
        <div key={i} style={{ fontSize: '0.85em', opacity: 0.65, maxWidth: '32em' }}>
          {line}
        </div>
      ))}
    </div>
  );
}

export default function TrafficMapPlugin({ config, style }: PluginComponentProps) {
  const settings = readSettings(config);
  const frameRef = React.useRef<HTMLIFrameElement>(null);
  const [error, setError] = React.useState<string | null>(null);
  const keyOk = looksLikeApiKey(settings.apiKey);

  const post = React.useCallback(() => {
    const target = frameRef.current?.contentWindow;
    if (!target || !keyOk) return;
    target.postMessage({ type: MSG_CONFIG, ...settings }, MAP_PAGE_ORIGIN);
  }, [settings.apiKey, settings.lat, settings.lng, settings.zoom, settings.dark, settings.marker, keyOk]);

  // Kartenseite meldet "bereit" (oder einen Fehler) per postMessage.
  React.useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== MAP_PAGE_ORIGIN || event.source !== frameRef.current?.contentWindow) return;
      const data = event.data as { type?: string; message?: string } | null;
      if (data?.type === MSG_READY) post();
      if (data?.type === MSG_ERROR) setError(data.message || 'Die Karte meldet einen Fehler.');
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [post]);

  // Geänderte Einstellungen an eine bereits geladene Karte weitergeben.
  React.useEffect(() => {
    setError(null);
    post();
  }, [post]);

  let content: React.ReactNode;
  if (!keyOk) {
    content = (
      <Notice
        title="Verkehrskarte"
        lines={[
          'Es fehlt der Google-Maps-API-Key.',
          'Im Editor beim Modul unter „Karte“ eintragen (Maps JavaScript API).',
        ]}
      />
    );
  } else if (error) {
    content = <Notice title="Karte nicht verfügbar" lines={[error]} />;
  } else {
    content = (
      <iframe
        ref={frameRef}
        title="Verkehrslage"
        src={MAP_PAGE_URL}
        onLoad={post}
        referrerPolicy="origin"
        style={{ width: '100%', height: '100%', border: 0, display: 'block', pointerEvents: 'none' }}
      />
    );
  }

  return (
    <div style={{ ...hostFrameStyle(style), padding: 0 }}>
      {content}
    </div>
  );
}
