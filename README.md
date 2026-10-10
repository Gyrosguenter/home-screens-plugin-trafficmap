# Verkehrskarte — Home Screens Plugin

Google-Maps-Karte mit Live-Verkehrslage (rot/gelb/grün) für [Home Screens](https://github.com/Gyrosguenter/home-screens-magic-mirror), dunkel gestaltet, Kartenmitte und Zoom frei wählbar.

## Aufbau

Der Hub erlaubt Skripte nur von sich selbst (CSP `script-src 'self'`). Das Google-Maps-Skript läuft deshalb in einer kleinen eigenen Seite ([`docs/map.html`](docs/map.html), per GitHub Pages ausgeliefert), die das Modul als iframe einbettet. Der API-Key wird per `postMessage` übergeben, nicht über die URL.

## Einrichtung

1. In der Google Cloud Console ein Projekt anlegen, die **Maps JavaScript API** aktivieren und Abrechnung hinterlegen.
2. Einen API-Key erzeugen und beschränken: Anwendungsbeschränkung *Websites* mit `https://gyrosguenter.github.io/*`, API-Beschränkung *Maps JavaScript API*.
3. Im Editor beim Modul unter „Karte“ den Key eintragen.

```bash
npm install && npm run build && npm test
```

MIT
