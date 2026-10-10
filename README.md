# Verkehrskarte · Traffic Map

**[Deutsch](#deutsch) · [English](#english)** · Plugin für / for [Home Screens](https://github.com/home-screens/home-screens) · v0.1.0

## Deutsch

Eine dunkel gestaltete **Google-Maps-Karte mit Live-Verkehrslage** (grün/gelb/rot) um einen frei wählbaren Punkt.

### Was kann das Plugin?

- Verkehrslage live, alle 5 Minuten aufgefrischt
- Dunkle Karte (abschaltbar), ohne Bedienelemente
- Kartenmitte und Zoom frei wählbar, Markierung optional

### Installation – Schritt für Schritt

**Voraussetzung:** Du hast Home Screens bereits laufen (Server erreichbar im Browser).

1. Öffne den **Editor** deines Home-Screens-Servers im Browser an einem Computer (nicht am Handy; er braucht mindestens 768 Pixel Breite). Die Adresse ist meist `http://<Adresse-deines-Servers>:3000/editor`.
2. Klicke oben in der Leiste auf **Plugins** (neben „Einstellungen“ und „Vorschau“).
3. Klicke auf **Aus URL installieren …**.
4. Füge im Feld **Tarball-URL** diesen Link ein und klicke auf **Installieren**:

   ```
   https://github.com/Gyrosguenter/home-screens-plugin-trafficmap/releases/latest/download/traffic-map.tar.gz
   ```

   Home Screens weist darauf hin, dass das Plugin „nicht vom Home-Screens-Team geprüft“ ist. Das ist normal, denn es stammt nicht aus dem Marktplatz. Du siehst eine Übersicht, was das Plugin darf.
5. Warte, bis die Installation fertig ist, und klicke auf **Fertig**. Falls das Modul nicht sofort in der Liste auftaucht, lade die Seite neu (F5).
6. Ziehe das Modul auf den Bildschirm: Links in der Liste **MODULE** (Hinweis „Auf den Bildschirm ziehen“) findest du unter **REISE** das Modul **Verkehrskarte** (mit der Markierung „Plug-in“). Ziehe es auf deinen Bildschirm und passe Größe und Position an.
7. Klicke das Modul an: rechts erscheinen die **Einstellungen**. Der Editor **speichert automatisch**, einen Speichern-Knopf gibt es nicht.

### Google-Maps-Key anlegen (einmalig, ca. 10 Minuten)

Google verlangt für Karten einen eigenen Key. Der Key gehört dir, niemand sonst kann Kosten damit verursachen, wenn du ihn wie unten beschränkst.

1. Gehe zur [Google Cloud Console](https://console.cloud.google.com/) und melde dich mit deinem Google-Konto an.
2. Lege oben ein **neues Projekt** an (Name egal, z. B. „Home Screens“).
3. Öffne **APIs & Dienste → Bibliothek**, suche **„Maps JavaScript API“** und klicke auf **Aktivieren**.
4. Google verlangt dafür ein **Rechnungskonto** (Kreditkarte). Für einen einzelnen Spiegel liegst du üblicherweise im kostenlosen Monatskontingent (Preise und Kontingente legt Google fest und ändert sie gelegentlich, prüfe sie vorab). **Empfehlung:** Unter *Abrechnung → Budgets & Benachrichtigungen* ein Budget von z. B. 5 € mit E-Mail-Warnung einstellen.
5. Öffne **APIs & Dienste → Anmeldedaten → Anmeldedaten erstellen → API-Schlüssel** und kopiere den Schlüssel.
6. Klicke beim Schlüssel auf **Schlüssel einschränken** und stelle ein:
   - **Anwendungseinschränkung:** *Websites* → Eintrag hinzufügen: `https://gyrosguenter.github.io/*`
   - **API-Einschränkungen:** *Schlüssel einschränken* → nur **Maps JavaScript API**
7. Trage den Schlüssel in Home Screens beim Modul unter **Google-Maps-API-Key** ein. Es dauert nach dem Einfügen etwa 10–15 Sekunden, bis die Karte erscheint.

> **Warum diese Adresse?** Die Karte läuft aus technischen Gründen auf einer kleinen Seite dieses Projekts (`gyrosguenter.github.io`), die das Plugin einbettet. Dein Key wird dorthin nur im Browser deines Displays übergeben und nicht gespeichert. Durch die Einschränkung funktioniert der Key nur über diese Seite.

### Einstellungen

| Einstellung | Bedeutung |
|---|---|
| Google-Maps-API-Key | Dein eigener Key (siehe unten). **Ohne Key zeigt das Modul nur einen Hinweis.** |
| Kartenmitte Breite / Länge | Koordinaten der Kartenmitte, z. B. `48.1371` / `11.5754` (München, Marienplatz). |
| Zoom | 10 = Region, 13 = Stadtteil, 16 = Straßen (Standard 13). |
| Dunkle Karte | Dunkel gestalteter Kartenstil. |
| Punkt in der Kartenmitte | Blauer Punkt als Orientierung. |

### Aktualisieren

Wiederhole einfach die Installation mit **demselben Link** (Schritte 2–4). Er zeigt immer auf die neueste Version; deine Einstellungen bleiben erhalten.

### Hilfe bei Problemen

- **Karte bleibt grau oder zeigt eine Fehlermeldung?** Prüfe, ob die *Maps JavaScript API* aktiviert, ein Rechnungskonto verknüpft und die Website-Einschränkung exakt `https://gyrosguenter.github.io/*` ist.
- **Kachel-Aufbau dauert:** Nach jedem Screenwechsel braucht die Karte bis zu 15 Sekunden.
- **Installation schlägt fehl?** Dein Home-Screens-Server muss auf `github.com` zugreifen können (Internet). Prüfe, ob der Link vollständig kopiert wurde.
- **Modul bleibt leer nach dem Ziehen?** Seite neu laden (F5). Ein paar Sekunden warten, manche Module laden Daten erst nach dem Einfügen.

### Datenschutz und Hinweise

Die Karte läuft in einem iframe der Seite `https://gyrosguenter.github.io/home-screens-plugin-trafficmap/map.html` und lädt von dort die Google-Maps-Bibliothek. Dein API-Key wird per `postMessage` übergeben, nicht in der URL, und nicht gespeichert. Google erhält die üblichen Daten, die beim Laden von Google Maps anfallen (z. B. IP-Adresse des Displays).

---

## English

A dark-styled **Google Maps map with live traffic** (green/yellow/red) around a point of your choice.

### What does it do?

- Live traffic, refreshed every 5 minutes
- Dark map (can be turned off), no controls
- Free choice of map centre and zoom, optional marker

### Installation – step by step

**Prerequisite:** Home Screens is already running (server reachable in the browser).

1. Open the **editor** of your Home Screens server in a browser on a computer (not a phone; it needs at least 768 pixels width). The address is usually `http://<address-of-your-server>:3000/editor`.
2. Click **Plugins** in the top bar (next to "Settings" and "Preview").
3. Click **Install from URL…**.
4. Paste this link into the **Tarball URL** field and click **Install**:

   ```
   https://github.com/Gyrosguenter/home-screens-plugin-trafficmap/releases/latest/download/traffic-map.tar.gz
   ```

   Home Screens warns that the plugin "has not been reviewed by the Home Screens team". That is normal because it does not come from the marketplace. You will see an overview of what the plugin may do.
5. Wait until the installation has finished and click **Done**. If the module does not show up in the list immediately, reload the page (F5).
6. Drag the module onto the screen: in the **MODULES** list on the left ("Drag onto the screen") find **Verkehrskarte** under **TRAVEL** (marked "Plugin"). Drag it onto your screen and adjust size and position.
7. Click the module: the **settings** appear on the right. The editor **saves automatically**; there is no save button.

### Create a Google Maps key (one-time, about 10 minutes)

Google requires your own key for maps. The key is yours; if you restrict it as below, nobody else can run up costs with it.

1. Go to the [Google Cloud Console](https://console.cloud.google.com/) and sign in with your Google account.
2. Create a **new project** at the top (any name, e.g. "Home Screens").
3. Open **APIs & Services → Library**, search for **"Maps JavaScript API"** and click **Enable**.
4. Google requires a **billing account** (credit card). A single mirror is usually within the free monthly allowance (prices and allowances are set by Google and change occasionally, check them beforehand). **Recommendation:** set a budget of e.g. €5 with an email alert under *Billing → Budgets & alerts*.
5. Open **APIs & Services → Credentials → Create credentials → API key** and copy the key.
6. Click **Restrict key** on the key and set:
   - **Application restrictions:** *Websites* → add `https://gyrosguenter.github.io/*`
   - **API restrictions:** *Restrict key* → only **Maps JavaScript API**
7. Paste the key in Home Screens into the module's **Google Maps API key** field. After pasting it takes about 10–15 seconds for the map to appear.

> **Why this address?** For technical reasons the map runs on a small page of this project (`gyrosguenter.github.io`) which the plugin embeds. Your key is passed there only in your display's browser and not stored. With the restriction, the key only works through that page.

### Settings

| Setting | Meaning |
|---|---|
| Google Maps API key | Your own key (see below). **Without a key the module only shows a notice.** |
| Map centre latitude / longitude | Coordinates of the map centre, e.g. `48.1371` / `11.5754` (Munich, Marienplatz). |
| Zoom | 10 = region, 13 = district, 16 = streets (default 13). |
| Dark map | Dark map style. |
| Dot in the map centre | Blue dot for orientation. |

### Updating

Simply repeat the installation with the **same link** (steps 2–4). It always points to the latest version; your settings are kept.

### Troubleshooting

- **Map stays grey or shows an error?** Check that the *Maps JavaScript API* is enabled, a billing account is linked and the website restriction is exactly `https://gyrosguenter.github.io/*`.
- **Tiles take a while:** after each screen change the map needs up to 15 seconds.
- **Installation fails?** Your Home Screens server must be able to reach `github.com` (internet). Check that the link was copied completely.
- **Module stays empty after dragging?** Reload the page (F5). Wait a few seconds; some modules fetch data only after being added.

### Privacy and notes

The map runs in an iframe of `https://gyrosguenter.github.io/home-screens-plugin-trafficmap/map.html` and loads the Google Maps library from there. Your API key is passed via `postMessage`, not in the URL, and not stored. Google receives the usual data produced when loading Google Maps (e.g. the display's IP address).

---

## Technik / Technical notes

- **ID / Manifest:** `traffic-map` – Version 0.1.0, License MIT
- Bauen / Build: `npm install && npm run build && npm test`
- Release-Archiv für die Installation / Release archive used for installation: `traffic-map.tar.gz` (enthält / contains `traffic-map/manifest.json` + `traffic-map/dist/bundle.js`)
- Teil eines privaten Heim-Projekts (Magic-Mirror-Ersatz); als eigenes öffentliches Repo geführt, damit die Installations-URL ohne Anmeldung erreichbar ist / Part of a private home project (Magic Mirror replacement); kept as its own public repo so the install URL works without login.
- Dieses Plugin ist ein inoffizielles Community-Plugin und steht in keiner Verbindung zum Home-Screens-Team / This is an unofficial community plugin and is not affiliated with the Home Screens team.

MIT
