# 📝 Blog-Posts Sidebar aktualisieren - Anleitung

Dieses README erklärt, wie du neue Blog-Posts zur automatischen Sidebar hinzufügst.

## 📊 Überblick

**Deine Blog-Sidebar lädt automatisch die neuesten Posts aus einem RSS-Feed!**

**Was automatisch ist:**
- ✅ Sidebar zeigt die neuesten Posts automatisch an
- ✅ Keine manuelle HTML-Bearbeitung der Sidebar nötig

**Was du machen musst:**
- ✍️ Neuen Blog-Post schreiben (HTML-Datei)
- ✍️ Post zu `blog-posts.json` hinzufügen
- ⚙️ RSS-Feed neu generieren (~2 Minuten)
- 📤 Dateien zu GitHub hochladen

**Zeit pro neuem Post:** ~5 Minuten

---

## 🚀 Workflow: Neuen Blog-Post hinzufügen

### Schritt 1: Schreibe den Blog-Post

Erstelle eine neue HTML-Datei im Ordner `blog-posts/`:

```
blog-posts/
├── blog-post.html
├── 2025warnichtscheisse.html
└── mein-neuer-post.html  ← NEU
```

**Wichtig:** Nutze eine der bestehenden Dateien als Vorlage!

---

### Schritt 2: Füge den Post zu `blog-posts.json` hinzu

**Öffne:** `blog-posts.json` (liegt im Root-Verzeichnis)

**Füge einen neuen Eintrag hinzu:**

```json
{
    "posts": [
        {
            "id": 1,
            "title": "Wie \"Dein Ernst?!\" entstanden ist",
            "url": "blog-posts/blog-post.html",
            "date": "2026-01-16",
            "dateFormatted": "16. Jan 2026",
            "excerpt": "Die Geschichte hinter unserem Podcast..."
        },
        {
            "id": 2,
            "title": "2025 war gar nicht so scheiße, wie es sich angefühlt hat!",
            "url": "blog-posts/2025warnichtscheisse.html",
            "date": "2026-01-05",
            "dateFormatted": "5. Jan 2026",
            "excerpt": "Wenn man das Weltgeschehen beobachtet..."
        },
        {
            "id": 3,
            "title": "DEIN NEUER POST TITEL",
            "url": "blog-posts/mein-neuer-post.html",
            "date": "2026-01-20",
            "dateFormatted": "20. Jan 2026",
            "excerpt": "Kurze Beschreibung des Posts..."
        }
    ]
}
```

**Wichtige Felder:**

| Feld | Beschreibung | Beispiel |
|------|--------------|----------|
| `id` | Eindeutige Nummer (aufsteigend) | `3` |
| `title` | Post-Titel (Anführungszeichen escapen: `\"`) | `"Mein Titel"` |
| `url` | Relativer Pfad zur HTML-Datei | `blog-posts/datei.html` |
| `date` | Datum im Format YYYY-MM-DD | `2026-01-20` |
| `dateFormatted` | Datum für Anzeige | `20. Jan 2026` |
| `excerpt` | Kurze Zusammenfassung | `Kurze Beschreibung...` |

**⚠️ Wichtig:**
- Nutze **relative Pfade** (`blog-posts/...`) - NICHT vollständige URLs!
- **Kein Komma** nach dem letzten Eintrag vor `]`
- Anführungszeichen im Titel escapen: `\"` statt `"`

---

### Schritt 3: Generiere den RSS-Feed neu

#### 3.1 Öffne den Generator

**Datei:** [standarthoid.github.io/deinernst/](https://standarthoid.github.io/deinernst/rss-feed-generator.html)
- Doppelklick auf die Datei
- Öffnet sich im Browser

#### 3.2 Fülle die Konfiguration aus

**Website URL:**
```
https://standarthoid.github.io/deinernst
```
⚠️ **Exakt mit `https://` am Anfang! Nur einmal!**

**Blog Titel:**
```
Dein Ernst?! - Blog
```

**Blog Beschreibung:**
```
Feministische Alltagsgeschichten – Deine besten Freundinnen für Feminismus
```

**Autor Name:**
```
Dein Ernst?! Team
```

**Autor E-Mail:**
```
podcast.dein.ernst@gmail.com
```

#### 3.3 Füge die aktualisierte JSON ein

- Öffne deine **aktualisierte** `blog-posts.json`
- Kopiere den **kompletten Inhalt**
- Füge ihn in das große Textfeld im Generator ein

#### 3.4 Generiere & Download

1. Klicke auf **"🚀 RSS generieren"**
2. Prüfe die Vorschau (sollte keine Fehler zeigen)
3. Klicke auf **"💾 RSS herunterladen"**
4. Datei wird als `blog-feed.xml` gespeichert

---

### Schritt 4: Dateien zu GitHub hochladen

Lade diese Dateien hoch (bzw. aktualisiere sie):

```
dein-repo/
├── blog-posts/
│   └── mein-neuer-post.html      ← NEU: Dein neuer Post
├── blog-posts.json               ← AKTUALISIERT: Mit neuem Post
└── blog-feed.xml                 ← AKTUALISIERT: Neu generiert
```

**Auf GitHub:**
1. Gehe zu deinem Repository
2. Klicke "Add file" → "Upload files"
3. Ziehe die Dateien rein oder wähle sie aus
4. Commit mit Message: `Neuer Blog-Post: [Titel]`

---

### Schritt 5: Warten & Testen

1. **Warte ~1-2 Minuten** (GitHub Pages braucht Zeit zum Aktualisieren)
2. **Öffne deine Website**
3. **Harter Reload:**
   - Mac: `Cmd + Shift + R`
   - Windows: `Ctrl + Shift + R`
4. **Prüfe die Sidebar** → Dein neuer Post sollte erscheinen! ✅

---

## 🔧 Troubleshooting

### Problem: Neuer Post erscheint nicht in der Sidebar

**Lösung:**
1. Öffne Browser-Console (F12)
2. Schaue nach Fehlermeldungen
3. Prüfe: Wurde `blog-feed.xml` hochgeladen?
4. Prüfe: Harter Reload gemacht?
5. Warte weitere 2-3 Minuten

### Problem: "RSS-Feed konnte nicht geladen werden"

**Lösung:**
- Prüfe: Liegt `blog-feed.xml` im Root-Verzeichnis?
- Prüfe in `blog-sidebar-rss.js`: Ist die URL korrekt?
  ```javascript
  const RSS_FEED_URL = 'https://standarthoid.github.io/deinernst/blog-feed.xml';
  ```

### Problem: JSON-Fehler beim Generieren

**Lösung:**
- Validiere deine JSON: https://jsonlint.com/
- Häufige Fehler:
  - Komma nach letztem Eintrag
  - Vergessene Anführungszeichen
  - Nicht escaped: `"` statt `\"`

### Problem: Links funktionieren nicht (doppeltes https://)

**Lösung:**
- In `blog-posts.json`: Nutze **nur relative Pfade**
  - ✅ Richtig: `"url": "blog-posts/post.html"`
  - ❌ Falsch: `"url": "https://deine-seite.de/blog-posts/post.html"`
- Generiere RSS-Feed neu

---

## 📋 Checkliste: Neuer Blog-Post

Nutze diese Checkliste für jeden neuen Post:

- [ ] HTML-Datei in `blog-posts/` erstellt
- [ ] Post zu `blog-posts.json` hinzugefügt
- [ ] JSON validiert (keine Syntax-Fehler)
- [ ] `blog-rss-generator.html` geöffnet
- [ ] Konfiguration ausgefüllt (Website URL mit `https://`)
- [ ] JSON in Generator eingefügt
- [ ] RSS-Feed generiert & heruntergeladen
- [ ] 3 Dateien zu GitHub hochgeladen:
  - [ ] `blog-posts/[neuer-post].html`
  - [ ] `blog-posts.json` (aktualisiert)
  - [ ] `blog-feed.xml` (neu generiert)
- [ ] 1-2 Minuten gewartet
- [ ] Website mit hartem Reload geöffnet
- [ ] Sidebar zeigt neuen Post ✅

---

## 🎯 Beispiel: Komplett-Workflow

**Du möchtest einen neuen Post "Unsere Podcast-Ausrüstung" hinzufügen:**

### 1. HTML erstellen
```
blog-posts/unsere-ausruestung.html
```

### 2. JSON updaten
```json
{
    "id": 3,
    "title": "Unsere Podcast-Ausrüstung",
    "url": "blog-posts/unsere-ausruestung.html",
    "date": "2026-01-25",
    "dateFormatted": "25. Jan 2026",
    "excerpt": "Welches Equipment wir für unseren Podcast nutzen..."
}
```

### 3. Generator nutzen
- Öffne `blog-rss-generator.html`
- Fülle Felder aus
- JSON einfügen
- Generieren + Download

### 4. Hochladen
- `blog-posts/unsere-ausruestung.html` ← neu
- `blog-posts.json` ← aktualisiert
- `blog-feed.xml` ← neu generiert

### 5. Fertig! 🎉
Nach 1-2 Minuten erscheint der Post in der Sidebar!

---

## 💡 Tipps & Best Practices

### Dateinamen
- Kleinbuchstaben
- Bindestriche statt Leerzeichen
- Keine Umlaute: `ue` statt `ü`
- Beispiel: `unsere-top-5-tipps.html`

### Excerpts (Zusammenfassungen)
- 1-2 Sätze
- Neugierig machen
- Nicht zu lang (max. 150 Zeichen)

### Datum-Format
- **ISO-Format:** `YYYY-MM-DD` (z.B. `2026-01-25`)
- **Anzeige-Format:** `DD. MMM YYYY` (z.B. `25. Jan 2026`)

### Post-IDs
- Fortlaufend nummerieren
- Nicht wiederverwenden
- Bei Löschung: ID nicht neu vergeben

---

## 🔄 Post bearbeiten oder löschen

### Post bearbeiten
1. Bearbeite die HTML-Datei
2. Optional: Aktualisiere `excerpt` in `blog-posts.json`
3. Optional: Generiere RSS neu (wenn Titel/Excerpt geändert)
4. Hochladen

### Post löschen
1. Entferne den Eintrag aus `blog-posts.json`
2. Generiere RSS-Feed neu
3. Hochladen
4. Optional: Lösche die HTML-Datei (oder behalte sie)

---

## 📞 Hilfe & Support

**Generator-Tool funktioniert nicht?**
- Nutze https://jsonlint.com/ zum Validieren
- Prüfe Browser-Console auf Fehler

**Sidebar zeigt nichts an?**
- Prüfe Browser-Console (F12)
- Schaue nach: `✓ Blog-Posts aus RSS geladen: X`
- Falls nicht: Prüfe HTML-Struktur (siehe SIDEBAR-ANLEITUNG.md)

**Weitere Fragen?**
- Siehe: `BLOG-RSS-ANLEITUNG.md` für Details
- Siehe: `QUICK-START-CHECKLISTE.md` für Setup

---

## 📚 Dateien-Übersicht

| Datei | Zweck | Wo liegt sie? |
|-------|-------|---------------|
| `blog-posts.json` | Liste aller Posts | Root |
| `blog-feed.xml` | RSS-Feed (generiert) | Root |
| `blog-rss-generator.html` | Generator-Tool | Lokal (nicht hochladen) |
| `blog-sidebar-rss.js` | Lädt Posts in Sidebar | Root oder `/script` |
| `blog-posts/*.html` | Einzelne Blog-Posts | `/blog-posts` |

---

## 🎉 Fertig!

Du hast jetzt ein **semi-automatisches** Blog-System:
- **Du pflegst:** JSON + RSS generieren (~5 Min pro Post)
- **Automatisch:** Sidebar lädt die neuesten Posts

Viel Spaß beim Bloggen! 📝✨

---

**Letzte Aktualisierung:** Januar 2026
**Version:** 1.0
