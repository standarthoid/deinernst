# Dein Ernst?! Podcast Website

Eine Pop-Art-inspirierte Website für den Podcast "Dein Ernst?!" mit Spotify-Integration, Blog und Newsletter-Anmeldung.

## 🎨 Design

Die Website folgt dem Pop-Art-Stil des Podcast-Logos mit:
- Leuchtenden Orange/Gelb-Tönen
- Lila und Grün Akzentfarben
- Comic-Elementen (Sprechblasen, Sterne, Blitze)
- Dicken schwarzen Konturen
- Halftone-Punkten
- Verspielten Animationen

## 📁 Dateistruktur

```
dein-ernst-podcast/
├── index.html          # Startseite
├── episoden.html       # Alle Episoden mit Spotify-Playern
├── blog.html           # Blog-Übersicht
├── ueber-uns.html      # Über uns / Team-Vorstellung
├── styles.css          # Alle Styles im Pop-Art-Stil
├── script.js           # JavaScript für Interaktivität
├── rss-feed.js         # 🆕 Automatisches Laden der Episoden aus RSS-Feed
├── logo.png            # Podcast-Logo
├── README.md           # Diese Datei
├── RSS-INTEGRATION.md  # 🆕 Anleitung zur RSS-Feed-Integration
└── DEPLOYMENT.md       # Deployment-Anleitung
```

## 🚀 GitHub Pages Deployment

### Schritt 1: Repository erstellen

1. Erstelle ein neues Repository auf GitHub
2. Name: z.B. `dein-ernst-podcast` oder beliebig
3. Repository sollte **public** sein

### Schritt 2: Dateien hochladen

1. Lade alle Dateien in das Repository hoch:
   - index.html
   - episoden.html
   - blog.html
   - ueber-uns.html
   - styles.css
   - script.js
   - logo.png

2. Via Git Command Line:
```bash
git init
git add .
git commit -m "Initial commit: Dein Ernst?! Website"
git branch -M main
git remote add origin https://github.com/DEIN-USERNAME/DEIN-REPO-NAME.git
git push -u origin main
```

### Schritt 3: GitHub Pages aktivieren

1. Gehe zu deinem Repository auf GitHub
2. Klicke auf **Settings** (Einstellungen)
3. Scrolle zu **Pages** im linken Menü
4. Under **Source**, wähle **main** Branch
5. Wähle **/ (root)** als Verzeichnis
6. Klicke auf **Save**

### Schritt 4: Domain verbinden (Optional)

Wenn du eine eigene Domain hast:

1. In GitHub Pages Settings, unter **Custom domain**
2. Gib deine Domain ein (z.B. `www.deinnernst-podcast.de`)
3. Klicke auf **Save**
4. Bei deinem Domain-Provider:
   - Erstelle einen CNAME-Eintrag für `www` → `DEIN-USERNAME.github.io`
   - ODER erstelle A-Records für die root-Domain:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

## 🎵 Spotify Integration einrichten

### ✨ AUTOMATISCH: RSS-Feed Integration (EMPFOHLEN!)

Die Website lädt **automatisch** alle Episoden aus deinem RSS-Feed!

**Dein RSS-Feed**: `https://anchor.fm/s/fc415c4c/podcast/rss`

**Was passiert:**
- Neue Episoden erscheinen automatisch auf der Website
- Keine manuelle Arbeit nötig
- Episode-Titel, Beschreibung, Datum werden automatisch geladen
- Spotify-Player oder Audio-Player wird automatisch eingebunden

**Siehe `RSS-INTEGRATION.md` für Details!**

### Alternative: Manuell Episode IDs finden:

1. Gehe zu deiner Episode auf Spotify
2. Klicke auf **Teilen** → **Episode-Link kopieren**
3. Der Link sieht so aus: `https://open.spotify.com/episode/EPISODE_ID?si=...`
4. Kopiere die `EPISODE_ID`

### In HTML einfügen:

Suche in den HTML-Dateien nach:
```html
src="https://open.spotify.com/embed/episode/DEINE_EPISODE_ID?utm_source=generator&theme=0"
```

Ersetze `DEINE_EPISODE_ID` mit deiner echten Episode-ID.

## 📧 Newsletter-Integration

Die Website hat ein vorbereitetes Newsletter-Formular. Um es zu aktivieren:

### Option 1: Mailchimp

1. Erstelle ein Mailchimp-Konto
2. Erstelle eine Audience (Liste)
3. Gehe zu **Audience** → **Signup forms** → **Form builder**
4. Kopiere den Embed-Code oder die API-Details
5. Passe `script.js` an (siehe Kommentare im Code)

### Option 2: ConvertKit

1. Erstelle ein ConvertKit-Konto
2. Erstelle ein Formular
3. Kopiere den JavaScript-Code
4. Füge ihn in die HTML-Dateien ein

### Option 3: Einfache Email-Sammlung

Ändere in `script.js` die Newsletter-Funktion, um Emails z.B. an ein Google Sheet zu senden.

## ✏️ Inhalte anpassen

### Logo und Bilder

- Ersetze `logo.png` mit deinem Logo
- Für Host-Fotos auf der "Über uns"-Seite: Lade Fotos hoch und ändere die Bild-Pfade

### Texte

- **Podcast-Name**: Suche nach "Dein Ernst?!" und ersetze mit deinem Namen
- **Episoden**: Füge neue Episoden in `episoden.html` hinzu
- **Blog-Posts**: Bearbeite `blog.html`
- **Über uns**: Passe `ueber-uns.html` mit echten Infos an

### Farben anpassen

In `styles.css` unter `:root`:
```css
:root {
    --primary-orange: #FFA500;  /* Deine Hauptfarbe */
    --primary-purple: #8B4789;  /* Deine Akzentfarbe */
    /* etc. */
}
```

### Social Media Links

Suche in allen HTML-Dateien nach:
```html
<a href="#" target="_blank">🎵 Spotify</a>
```

Ersetze `#` mit deinen echten Social-Media-URLs.

## 📱 Responsive Design

Die Website ist vollständig responsive und funktioniert auf:
- Desktop (1200px+)
- Tablet (768px - 1200px)
- Mobile (< 768px)

## 🛠️ Technologien

- **HTML5** - Struktur
- **CSS3** - Styling (Custom Properties, Grid, Flexbox, Animationen)
- **JavaScript (Vanilla)** - Interaktivität
- **Spotify Embed** - Audio-Player
- **GitHub Pages** - Hosting

## 📝 To-Do nach dem Deployment

- [ ] Spotify Episode-IDs einfügen
- [ ] Newsletter-Service integrieren
- [ ] Eigene Texte und Beschreibungen hinzufügen
- [ ] Host-Fotos hochladen
- [ ] Social Media Links aktualisieren
- [ ] Domain verbinden
- [ ] Google Analytics hinzufügen (optional)
- [ ] Impressum & Datenschutz-Seiten erstellen

## 🎨 Weitere Anpassungen

### Neue Episode hinzufügen

Kopiere diesen Block in `episoden.html`:

```html
<div class="episode-full-card">
    <div class="episode-header-row">
        <div class="episode-badges">
            <span class="episode-number-large">Episode #XX</span>
        </div>
        <span class="episode-date-large">📅 Datum</span>
    </div>
    <h3>Titel der Episode</h3>
    <p class="episode-description-full">
        Beschreibung...
    </p>
    <div class="episode-tags-row">
        <span class="tag">Tag1</span>
        <span class="tag">Tag2</span>
    </div>
    <div class="spotify-embed-full">
        <iframe style="border-radius:12px" 
                src="https://open.spotify.com/embed/episode/EPISODE_ID?utm_source=generator&theme=0" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allowfullscreen="" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"></iframe>
    </div>
</div>
```

### Neuen Blog-Post hinzufügen

Kopiere diesen Block in `blog.html`:

```html
<article class="blog-card">
    <div class="blog-image">
        <img src="logo.png" alt="Blog Post">
        <span class="blog-category">Kategorie</span>
    </div>
    <div class="blog-content">
        <div class="blog-meta">
            <span class="blog-date">📅 Datum</span>
            <span class="blog-read-time">⏱️ X Min Lesezeit</span>
        </div>
        <h3>Titel des Blog-Posts</h3>
        <p>Kurze Beschreibung...</p>
        <a href="#" class="blog-read-more">Weiterlesen →</a>
    </div>
</article>
```

## 💡 Tipps

1. **Teste die Website lokal**: Öffne `index.html` direkt im Browser vor dem Upload
2. **Bilder optimieren**: Komprimiere Bilder für schnellere Ladezeiten
3. **SEO**: Füge Meta-Tags für bessere Google-Rankings hinzu
4. **Analytics**: Integriere Google Analytics für Besucherstatistiken

## 📞 Support

Bei Fragen zur Website:
- Prüfe die Kommentare im Code
- GitHub Issues für Bugs
- Dokumentation für GitHub Pages: https://pages.github.com/

## 📄 Lizenz

Diese Website-Template ist frei verwendbar für deinen Podcast.

---

**Viel Erfolg mit deiner Podcast-Website! 🎙️ Dein Ernst?!**
