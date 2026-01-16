# 🚀 GitHub Pages Deployment - Schritt für Schritt

## Voraussetzungen

- [ ] GitHub-Account (kostenlos bei github.com)
- [ ] Alle Website-Dateien heruntergeladen
- [ ] (Optional) Git installiert auf deinem Computer

---

## Methode 1: Upload via Web-Interface (Einfachste Methode)

### Schritt 1: Repository erstellen

1. Gehe zu [github.com](https://github.com) und melde dich an
2. Klicke oben rechts auf das **+** Symbol
3. Wähle **New repository**
4. Repository-Name: `dein-ernst-podcast` (oder ein anderer Name)
5. Beschreibung (optional): "Website für den Dein Ernst?! Podcast"
6. Wähle **Public** (wichtig für GitHub Pages!)
7. ✅ Hake "Add a README file" NICHT an (wir haben schon eine README)
8. Klicke auf **Create repository**

### Schritt 2: Dateien hochladen

1. Im neuen Repository, klicke auf **uploading an existing file**
2. Ziehe alle Dateien in das Fenster:
   - index.html
   - episoden.html
   - blog.html
   - ueber-uns.html
   - styles.css
   - script.js
   - logo.png
   - README.md

3. Füge eine Commit-Nachricht hinzu: "Initial commit: Website erstellt"
4. Klicke auf **Commit changes**

### Schritt 3: GitHub Pages aktivieren

1. Klicke in deinem Repository auf **Settings** (Zahnrad-Symbol oben)
2. Scrolle im linken Menü zu **Pages**
3. Unter **Source**:
   - Branch: Wähle **main**
   - Folder: Wähle **/ (root)**
4. Klicke auf **Save**
5. ✅ Warte 1-2 Minuten

### Schritt 4: Website aufrufen

1. Gehe zurück zu **Settings** → **Pages**
2. Oben siehst du: "Your site is live at `https://DEIN-USERNAME.github.io/dein-ernst-podcast/`"
3. Klicke auf den Link oder kopiere die URL
4. 🎉 Deine Website ist jetzt online!

---

## Methode 2: Mit Git (für Fortgeschrittene)

### Git installieren

- **Windows**: [git-scm.com/download/win](https://git-scm.com/download/win)
- **Mac**: Im Terminal: `brew install git` oder [git-scm.com/download/mac](https://git-scm.com/download/mac)
- **Linux**: `sudo apt-get install git`

### Repository klonen und Dateien hinzufügen

```bash
# Navigiere zu deinem gewünschten Ordner
cd ~/Dokumente

# Erstelle einen neuen Ordner für dein Projekt
mkdir dein-ernst-podcast
cd dein-ernst-podcast

# Initialisiere Git
git init

# Kopiere alle Website-Dateien in diesen Ordner
# (index.html, episoden.html, blog.html, ueber-uns.html, styles.css, script.js, logo.png, README.md)

# Füge alle Dateien hinzu
git add .

# Erstelle einen Commit
git commit -m "Initial commit: Website erstellt"

# Erstelle main Branch
git branch -M main

# Verbinde mit GitHub (ersetze USERNAME und REPO-NAME)
git remote add origin https://github.com/USERNAME/REPO-NAME.git

# Push zu GitHub
git push -u origin main
```

Danach folge **Schritt 3** von Methode 1 (GitHub Pages aktivieren).

---

## Eigene Domain verbinden

Wenn du eine eigene Domain hast (z.B. `www.deinnernst.de`):

### Bei GitHub:

1. Gehe zu **Settings** → **Pages**
2. Unter **Custom domain**, gib deine Domain ein: `www.deinnernst.de`
3. Klicke auf **Save**
4. ✅ Hake "Enforce HTTPS" an (nach ca. 24 Stunden)

### Bei deinem Domain-Provider:

Du musst DNS-Einträge hinzufügen. Es gibt zwei Optionen:

#### Option A: Mit Subdomain (www)

Erstelle einen **CNAME**-Eintrag:
```
Type: CNAME
Name: www
Value: DEIN-USERNAME.github.io
```

#### Option B: Ohne Subdomain (Root-Domain)

Erstelle **A**-Einträge für die IP-Adressen:
```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

**Wichtig**: DNS-Änderungen können 24-48 Stunden dauern!

---

## Änderungen vornehmen

### Via Web-Interface:

1. Gehe zu deinem Repository auf GitHub
2. Klicke auf die Datei, die du bearbeiten möchtest (z.B. `index.html`)
3. Klicke auf das **Bleistift-Symbol** (Edit)
4. Mache deine Änderungen
5. Scrolle nach unten zu **Commit changes**
6. Füge eine Beschreibung hinzu (z.B. "Episode 43 hinzugefügt")
7. Klicke auf **Commit changes**
8. ✅ Die Website wird automatisch aktualisiert (dauert 1-2 Minuten)

### Via Git:

```bash
# Navigiere zu deinem Projekt-Ordner
cd ~/Dokumente/dein-ernst-podcast

# Bearbeite Dateien mit deinem Editor
# z.B. nano index.html oder code index.html

# Sieh dir die Änderungen an
git status

# Füge geänderte Dateien hinzu
git add .

# Commit mit Beschreibung
git commit -m "Episode 43 hinzugefügt"

# Push zu GitHub
git push
```

---

## Häufige Probleme & Lösungen

### Problem: "404 - There isn't a GitHub Pages site here"

**Lösung**:
- Warte 1-2 Minuten nach der Aktivierung
- Prüfe, ob GitHub Pages unter Settings → Pages aktiviert ist
- Stelle sicher, dass `index.html` im Repository ist

### Problem: Website zeigt nur Text ohne Styling

**Lösung**:
- Prüfe, ob `styles.css` hochgeladen wurde
- Prüfe, ob in `index.html` die Zeile `<link rel="stylesheet" href="styles.css">` vorhanden ist
- Hard-Refresh im Browser: Strg+F5 (Windows) oder Cmd+Shift+R (Mac)

### Problem: Logo wird nicht angezeigt

**Lösung**:
- Prüfe, ob `logo.png` hochgeladen wurde
- Stelle sicher, dass der Dateiname exakt `logo.png` ist (Groß-/Kleinschreibung!)

### Problem: Spotify-Player zeigen nichts an

**Lösung**:
- Du musst die Platzhalter `DEINE_EPISODE_ID` durch echte Spotify Episode-IDs ersetzen
- Siehe README.md für Anleitung zum Finden der Episode-IDs

---

## Nächste Schritte

Nach dem erfolgreichen Deployment:

### 1. Inhalte anpassen

- [ ] Spotify Episode-IDs einfügen
- [ ] Texte auf "Über uns"-Seite anpassen
- [ ] Blog-Posts schreiben
- [ ] Host-Fotos hochladen

### 2. Newsletter einrichten

- [ ] Mailchimp oder ConvertKit-Account erstellen
- [ ] Newsletter-Integration in `script.js` einbauen
- [ ] Siehe README.md für Details

### 3. Social Media verlinken

- [ ] Instagram-Links hinzufügen
- [ ] Twitter/X-Links hinzufügen
- [ ] Facebook-Links hinzufügen
- [ ] Spotify-Podcast-Link hinzufügen

### 4. Rechtliches

- [ ] Impressum erstellen (impressum.html)
- [ ] Datenschutzerklärung erstellen (datenschutz.html)
- [ ] Cookie-Banner hinzufügen (falls nötig)

### 5. Analytics (optional)

- [ ] Google Analytics einrichten
- [ ] Tracking-Code in HTML einfügen

---

## Ressourcen & Links

- **GitHub Pages Dokumentation**: https://pages.github.com/
- **Git Tutorial**: https://git-scm.com/docs/gittutorial
- **Markdown Guide**: https://www.markdownguide.org/
- **HTML/CSS/JS lernen**: https://developer.mozilla.org/

---

## Support

Bei technischen Problemen:

1. Überprüfe die [GitHub Pages Dokumentation](https://docs.github.com/en/pages)
2. Suche bei [Stack Overflow](https://stackoverflow.com/questions/tagged/github-pages)
3. Frage im [GitHub Community Forum](https://github.community/)

---

**Viel Erfolg mit deiner neuen Podcast-Website! 🎉**

Bei Fragen zum Code, schau in die Kommentare in den HTML-, CSS- und JavaScript-Dateien.
