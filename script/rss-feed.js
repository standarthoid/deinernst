// ===================================
// Dein Ernst?! - RSS Feed Integration
// ===================================

// RSS Feed URL
const RSS_FEED_URL = 'https://anchor.fm/s/fc415c4c/podcast/rss';

// API Key von rss2json.com (Optional - für mehr als 10 Episoden)
// Registriere dich kostenlos auf https://rss2json.com/ um einen Key zu bekommen
// Siehe API-KEY-ANLEITUNG.md für Details
const RSS_API_KEY = 'k0zcye7bzkg5pn3wdhgceepcbq0ofpkgmcsork2n'; // Füge hier deinen API-Key ein, z.B.: 'abcdef123456789'

// Maximale Anzahl der Episoden
// OHNE API-Key: max 10 Episoden
// MIT API-Key: max 100 Episoden
const MAX_EPISODES = RSS_API_KEY ? 100 : 10;

// Funktion zum Laden des RSS Feeds
async function loadPodcastEpisodes() {
    try {
        console.log('🎵 Lade Podcast-Episoden...');
        
        // Baue die API-URL
        let apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_FEED_URL)}`;
        
        // Füge API-Key und count hinzu, falls vorhanden
        if (RSS_API_KEY) {
            apiUrl += `&api_key=${RSS_API_KEY}&count=${MAX_EPISODES}`;
            console.log(`🔑 Verwende API-Key (max ${MAX_EPISODES} Episoden)`);
        } else {
            console.log(`⚠️ Kein API-Key - zeige nur 10 Episoden. Siehe API-KEY-ANLEITUNG.md`);
        }
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
            console.log(`✅ ${data.items.length} Episoden erfolgreich geladen`);
            
            // Zeige Hinweis, wenn nur 10 Episoden ohne API-Key
            if (!RSS_API_KEY && data.items.length === 10) {
                console.log(`💡 Tipp: Registriere dich auf rss2json.com für mehr Episoden!`);
            }
            
            return data.items;
        }
        
        console.error('❌ Fehler beim Laden des RSS Feeds:', data.message || 'Unbekannter Fehler');
        return [];
        
    } catch (error) {
        console.error('❌ Fehler beim Laden der Episoden:', error);
        return [];
    }
}

// Die Show-ID von "Dein Ernst?!" Podcast
const DEIN_ERNST_SHOW_ID = '5ziSaDXlfa1JpgyEpP7iw8';

// Funktion zum Extrahieren der Spotify Episode ID aus der Beschreibung
function extractSpotifyId(description) {
    // Prüfe zuerst, ob ein fremder Podcast-Show-Link in der Beschreibung ist
    const showMatch = description.match(/open\.spotify\.com\/show\/([a-zA-Z0-9]+)/);
    
    if (showMatch) {
        const showId = showMatch[1];
        // Wenn es ein fremder Podcast ist, gebe null zurück (ignoriere Episode-Links)
        if (showId !== DEIN_ERNST_SHOW_ID) {
            console.log('⚠️ Fremder Podcast-Link erkannt - wird ignoriert:', showId);
            return null;
        }
    }
    
    // Versuche, Spotify Episode-Link aus der Beschreibung zu extrahieren
    const episodeMatch = description.match(/open\.spotify\.com\/episode\/([a-zA-Z0-9]+)/);
    if (episodeMatch) {
        return episodeMatch[1];
    }
    
    return null;
}

// Funktion zum Prüfen ob es eine Bonusfolge ist
function isBonusEpisode(title) {
    const bonusKeywords = ['bonus', 'special', 'jubiläum', 'jubilaeum', 'sonderfolge', 'interview', 'trailer'];
    const lowerTitle = title.toLowerCase();
    return bonusKeywords.some(keyword => lowerTitle.includes(keyword));
}

// Funktion zum Extrahieren des Bonus-Labels
function getBonusLabel(title) {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('jubiläum') || lowerTitle.includes('jubilaeum')) {
        return '🎉 JUBILÄUM';
    }
    if (lowerTitle.includes('interview')) {
        return '🎤 INTERVIEW';
    }
    if (lowerTitle.includes('trailer')) {
        return '🎬 TRAILER';
    }
    if (lowerTitle.includes('special')) {
        return '⭐ SPECIAL';
    }
    return '🎁 BONUS';
}

// Funktion zum Formatieren des Datums
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('de-DE', options);
}

// Funktion zum Erstellen der Episode-Karte
function createEpisodeCard(episode, index, totalEpisodes, regularEpisodeCount) {
    const spotifyId = extractSpotifyId(episode.description);
    const pubDate = formatDate(episode.pubDate);
    const isBonus = isBonusEpisode(episode.title);
    
    // Bereinige die Beschreibung von HTML-Tags
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = episode.description;
    let cleanDescription = tempDiv.textContent || tempDiv.innerText || '';
    
    // Berechne die Episodennummer: neueste Episode = höchste Nummer
    // Bonusfolgen bekommen keine Nummer
    let episodeNumber = null;
    if (!isBonus) {
        episodeNumber = episode.title.match(/#(\d+)/) 
            ? episode.title.match(/#(\d+)/)[1] 
            : regularEpisodeCount;
    }
    
    // Prüfe ob Beschreibung länger als 200 Zeichen ist
    const needsToggle = cleanDescription.length > 200;
    const shortDescription = needsToggle ? cleanDescription.substring(0, 200) + '...' : cleanDescription;
    
    return `
        <div class="episode-full-card" data-episode-index="${index}">
            <div class="episode-header-row">
                <div class="episode-badges">
                    ${index === 0 ? '<span class="episode-badge-neu">NEU</span>' : ''}
                    ${isBonus 
                        ? `<span class="episode-badge-bonus">${getBonusLabel(episode.title)}</span>`
                        : `<span class="episode-number-large">Folge #${episodeNumber}</span>`
                    }
                </div>
                <span class="episode-date-large">📅 ${pubDate}</span>
            </div>
            <h3>${episode.title}</h3>
            <div class="episode-description-wrapper">
                <p class="episode-description-full" data-full-text="${cleanDescription.replace(/"/g, '&quot;')}">
                    ${shortDescription}
                </p>
                ${needsToggle ? `
                    <button class="description-toggle" onclick="toggleDescription(this)">
                        <span class="toggle-text">Mehr anzeigen</span> 
                        <span class="toggle-icon">▼</span>
                    </button>
                ` : ''}
            </div>
            ${spotifyId ? `
                <div class="spotify-embed-full">
                    <iframe style="border-radius:12px" 
                            src="https://open.spotify.com/embed/episode/${spotifyId}?utm_source=generator&theme=0" 
                            width="100%" 
                            height="152" 
                            frameBorder="0" 
                            allowfullscreen="" 
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                            loading="lazy"></iframe>
                </div>
            ` : `
                <div class="episode-audio">
                    <audio controls style="width: 100%; margin-top: 15px;">
                        <source src="${episode.enclosure.link}" type="audio/mpeg">
                        Dein Browser unterstützt das Audio-Element nicht.
                    </audio>
                </div>
            `}
        </div>
    `;
}

// Funktion zum Erstellen einer kompakten Episode-Karte für die Startseite
function createCompactEpisodeCard(episode, episodeNumber) {
    const spotifyId = extractSpotifyId(episode.description);
    const pubDate = formatDate(episode.pubDate);
    const isBonus = isBonusEpisode(episode.title);
    
    return `
        <div class="episode-item">
            <div class="episode-thumbnail">
                <img src="${episode.thumbnail || 'logo.png'}" alt="${episode.title}">
                <div class="play-overlay">▶</div>
            </div>
            <div class="episode-details">
                ${isBonus 
                    ? `<span class="episode-num">${getBonusLabel(episode.title)}</span>`
                    : `<span class="episode-num">#${episodeNumber}</span>`
                }
                <h4>${episode.title}</h4>
                <p>${episode.description.substring(0, 100)}...</p>
                <span class="episode-date">${pubDate}</span>
            </div>
        </div>
    `;
}

// Funktion zum Erstellen der neuesten Episode auf der Startseite
function createLatestEpisodeCard(episode, episodeNumber) {
    const spotifyId = extractSpotifyId(episode.description);
    const pubDate = formatDate(episode.pubDate);
    const isBonus = isBonusEpisode(episode.title);
    
    // Bereinige die Beschreibung
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = episode.description;
    let cleanDescription = tempDiv.textContent || tempDiv.innerText || '';
    
    // Prüfe ob Beschreibung länger als 300 Zeichen ist
    const needsToggle = cleanDescription.length > 300;
    const shortDescription = needsToggle ? cleanDescription.substring(0, 300) + '...' : cleanDescription;
    
    return `
        <div class="episode-content">
            <div class="episode-info">
                <span class="episode-badge">NEU</span>
                ${isBonus 
                    ? `<span class="episode-number">${getBonusLabel(episode.title)}</span>`
                    : `<span class="episode-number">Folge #${episodeNumber}</span>`
                }
                <h3>${episode.title}</h3>
                <div class="episode-description-wrapper">
                    <p class="episode-description" data-full-text="${cleanDescription.replace(/"/g, '&quot;')}">
                        ${shortDescription}
                    </p>
                    ${needsToggle ? `
                        <button class="description-toggle" onclick="toggleDescription(this)">
                            <span class="toggle-text">Mehr anzeigen</span> 
                            <span class="toggle-icon">▼</span>
                        </button>
                    ` : ''}
                </div>
                <div class="episode-meta">
                    <span class="meta-item">📅 ${pubDate}</span>
                </div>
            </div>
            <div class="spotify-player">
                ${spotifyId ? `
                    <iframe style="border-radius:12px" 
                            src="https://open.spotify.com/embed/episode/${spotifyId}?utm_source=generator&theme=0" 
                            width="100%" 
                            height="232" 
                            frameBorder="0" 
                            allowfullscreen="" 
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                            loading="lazy"></iframe>
                ` : `
                    <audio controls style="width: 100%; border-radius: 12px;">
                        <source src="${episode.enclosure.link}" type="audio/mpeg">
                        Dein Browser unterstützt das Audio-Element nicht.
                    </audio>
                `}
                <p class="spotify-hint">🎧 Auch auf Spotify, Apple Podcasts & überall wo es Podcasts gibt!</p>
            </div>
        </div>
    `;
}

// Lade und zeige Episoden auf der Episoden-Seite
async function displayAllEpisodes() {
    const container = document.querySelector('.episodes-list-page .container');
    
    if (!container) return;
    
    // Zeige Lade-Indikator
    container.innerHTML = `
        <div style="text-align: center; padding: 60px 0;">
            <div class="loading-spinner">
                <div style="font-size: 3rem; animation: spin 1s linear infinite;">⏳</div>
                <p style="margin-top: 20px; font-size: 1.2rem;">Lade Episoden...</p>
            </div>
        </div>
    `;
    
    const episodes = await loadPodcastEpisodes();
    
    if (episodes.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 0;">
                <div style="font-size: 4rem; margin-bottom: 20px;">😕</div>
                <h3 style="font-size: 1.5rem; margin-bottom: 15px;">Keine Episoden gefunden</h3>
                <p style="font-size: 1.1rem; margin-bottom: 20px;">
                    Der RSS-Feed konnte nicht geladen werden. Das kann verschiedene Gründe haben:
                </p>
                <ul style="text-align: left; max-width: 500px; margin: 0 auto 30px; line-height: 1.8;">
                    <li>Der RSS-Service ist vorübergehend nicht erreichbar</li>
                    <li>Zu viele Anfragen in kurzer Zeit (Rate Limit)</li>
                    <li>Netzwerkproblem</li>
                </ul>
                <p style="font-size: 1.1rem; margin-bottom: 20px;">
                    <strong>Lösungen:</strong>
                </p>
                <ul style="text-align: left; max-width: 500px; margin: 0 auto 30px; line-height: 1.8;">
                    <li>Warte 1-2 Minuten und lade die Seite neu (F5)</li>
                    <li>Öffne die Browser-Konsole (F12) für Details</li>
                    <li>Höre die Episoden direkt auf <a href="https://open.spotify.com/show/DEINE_SHOW_ID" target="_blank" style="color: #FF1493; font-weight: bold;">Spotify</a></li>
                </ul>
                <button onclick="window.location.reload()" style="
                    padding: 15px 30px;
                    background: #FF1493;
                    color: white;
                    border: 4px solid black;
                    border-radius: 30px;
                    font-size: 1.1rem;
                    font-weight: bold;
                    cursor: pointer;
                    box-shadow: 5px 5px 0 rgba(0,0,0,0.3);
                    text-transform: uppercase;
                ">
                    🔄 Seite neu laden
                </button>
            </div>
        `;
        return;
    }
    
    // Zähle reguläre Episoden (ohne Bonusfolgen) für die richtige Nummerierung
    let regularEpisodeCount = episodes.filter(ep => !isBonusEpisode(ep.title)).length;
    
    // Erstelle HTML für alle Episoden
    const totalEpisodes = episodes.length;
    const episodesHTML = episodes.map((episode, index) => {
        const html = createEpisodeCard(episode, index, totalEpisodes, regularEpisodeCount);
        // Reduziere den Counter nur für reguläre Episoden
        if (!isBonusEpisode(episode.title)) {
            regularEpisodeCount--;
        }
        return html;
    }).join('');
    
    container.innerHTML = episodesHTML;
    
    // Zeige Hinweis, wenn nur 10 Episoden (kein API-Key)
    if (episodes.length === 10 && !RSS_API_KEY) {
        const hint = document.createElement('div');
        hint.style.cssText = `
            background: #FFF8E7;
            border: 4px solid #FFA500;
            border-radius: 20px;
            padding: 30px;
            margin-top: 40px;
            text-align: center;
            box-shadow: 6px 6px 0 rgba(0,0,0,0.2);
        `;
        hint.innerHTML = `
            <div style="font-size: 2.5rem; margin-bottom: 15px;">💡</div>
            <h3 style="font-family: Arial Black, sans-serif; font-size: 1.5rem; margin-bottom: 15px; color: #000;">
                Möchtest du alle Episoden sehen?
            </h3>
            <p style="font-size: 1.1rem; margin-bottom: 20px; line-height: 1.6;">
                Aktuell werden nur die 10 neuesten Episoden angezeigt.<br>
                Um <strong>alle Episoden</strong> zu sehen, registriere dich kostenlos bei rss2json.com!
            </p>
            <a href="https://rss2json.com/" target="_blank" style="
                display: inline-block;
                padding: 12px 25px;
                background: #FF1493;
                color: white;
                text-decoration: none;
                border: 3px solid #000;
                border-radius: 25px;
                font-weight: bold;
                box-shadow: 4px 4px 0 rgba(0,0,0,0.3);
                transition: all 0.3s ease;
            ">
                🔑 Kostenlosen API-Key holen
            </a>
            <p style="font-size: 0.9rem; margin-top: 15px; color: #666;">
                Siehe <strong>API-KEY-ANLEITUNG.md</strong> im Repository für Details
            </p>
        `;
        container.appendChild(hint);
    }
}

// Lade und zeige neueste Episode auf der Startseite
async function displayLatestEpisode() {
    const container = document.querySelector('.latest-episode .episode-card');
    
    if (!container) return;
    
    const episodes = await loadPodcastEpisodes();
    
    if (episodes.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px;">Keine Episoden verfügbar.</p>';
        return;
    }
    
    const latestEpisode = episodes[0];
    // Zähle nur reguläre Episoden für die Nummerierung
    const regularEpisodeCount = episodes.filter(ep => !isBonusEpisode(ep.title)).length;
    container.innerHTML = createLatestEpisodeCard(latestEpisode, regularEpisodeCount);
}

// Lade und zeige die letzten 3 Episoden auf der Startseite
async function displayRecentEpisodes() {
    const container = document.querySelector('.recent-episodes .episodes-grid');
    
    if (!container) return;
    
    const episodes = await loadPodcastEpisodes();
    
    if (episodes.length === 0) return;
    
    // Zeige die Episoden 2-4 (überspringt die neueste, die bereits oben angezeigt wird)
    const recentEpisodes = episodes.slice(1, 4);
    
    // Zähle reguläre Episoden für die richtige Nummerierung
    let regularEpisodeCount = episodes.filter(ep => !isBonusEpisode(ep.title)).length;
    
    // Reduziere um 1, falls die erste Episode regulär war
    if (!isBonusEpisode(episodes[0].title)) {
        regularEpisodeCount--;
    }
    
    const episodesHTML = recentEpisodes.map((episode) => {
        const currentNumber = regularEpisodeCount;
        const html = createCompactEpisodeCard(episode, currentNumber);
        // Reduziere nur für reguläre Episoden
        if (!isBonusEpisode(episode.title)) {
            regularEpisodeCount--;
        }
        return html;
    }).join('');
    
    container.innerHTML = episodesHTML;
}

// Initialisiere basierend auf der aktuellen Seite
document.addEventListener('DOMContentLoaded', async function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'episoden.html' || currentPage === '') {
        // Auf der Episoden-Seite
        if (document.querySelector('.episodes-list-page')) {
            await displayAllEpisodes();
        }
    }
    
    if (currentPage === 'index.html' || currentPage === '' || currentPage === '/') {
        // Auf der Startseite
        if (document.querySelector('.latest-episode')) {
            await displayLatestEpisode();
        }
        if (document.querySelector('.recent-episodes')) {
            await displayRecentEpisodes();
        }
    }
});

// CSS für den Lade-Spinner
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .episode-audio audio {
        border-radius: 12px;
        margin-top: 15px;
    }
    
    /* Bonus Episode Badge */
    .episode-badge-bonus {
        background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
        color: #000;
        padding: 8px 16px;
        border-radius: 20px;
        font-family: 'Arial Black', sans-serif;
        font-size: 0.9rem;
        font-weight: bold;
        text-transform: uppercase;
        border: 3px solid #000;
        box-shadow: 4px 4px 0 rgba(0,0,0,0.2);
        display: inline-block;
        letter-spacing: 0.5px;
    }
    
    /* Ausklappbare Beschreibung */
    .episode-description-wrapper {
        position: relative;
    }
    
    .description-toggle {
        background: #FF1493;
        color: white;
        border: 3px solid #000;
        border-radius: 20px;
        padding: 8px 20px;
        font-family: 'Arial Black', sans-serif;
        font-size: 0.9rem;
        font-weight: bold;
        cursor: pointer;
        margin-top: 10px;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        box-shadow: 4px 4px 0 rgba(0,0,0,0.2);
        transition: all 0.2s ease;
        text-transform: uppercase;
    }
    
    .description-toggle:hover {
        background: #FF69B4;
        transform: translateY(-2px);
        box-shadow: 6px 6px 0 rgba(0,0,0,0.2);
    }
    
    .description-toggle:active {
        transform: translateY(0);
        box-shadow: 3px 3px 0 rgba(0,0,0,0.2);
    }
    
    .toggle-icon {
        transition: transform 0.3s ease;
        font-size: 0.8rem;
    }
    
    .description-toggle.expanded .toggle-icon {
        transform: rotate(180deg);
    }
    
    .episode-description-full {
        transition: max-height 0.3s ease;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Funktion zum Aus- und Einklappen der Episodenbeschreibung
window.toggleDescription = function(button) {
    const descriptionElement = button.previousElementSibling;
    const fullText = descriptionElement.getAttribute('data-full-text');
    const currentText = descriptionElement.textContent.trim();
    const toggleText = button.querySelector('.toggle-text');
    
    if (button.classList.contains('expanded')) {
        // Einklappen
        const shortText = fullText.substring(0, 200) + '...';
        descriptionElement.textContent = shortText;
        toggleText.textContent = 'Mehr anzeigen';
        button.classList.remove('expanded');
    } else {
        // Ausklappen
        descriptionElement.textContent = fullText;
        toggleText.textContent = 'Weniger anzeigen';
        button.classList.add('expanded');
    }
};

// Export für Verwendung in anderen Dateien
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadPodcastEpisodes,
        displayAllEpisodes,
        displayLatestEpisode,
        displayRecentEpisodes
    };
}
