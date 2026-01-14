// ===================================
// Dein Ernst?! - RSS Feed Integration
// ===================================

// RSS Feed URL
const RSS_FEED_URL = 'https://anchor.fm/s/fc415c4c/podcast/rss';

// Funktion zum Laden des RSS Feeds
async function loadPodcastEpisodes() {
    try {
        // RSS Feed über einen CORS-Proxy laden
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_FEED_URL)}`);
        const data = await response.json();
        
        if (data.status === 'ok') {
            return data.items;
        } else {
            console.error('Fehler beim Laden des RSS Feeds:', data.message);
            return [];
        }
    } catch (error) {
        console.error('Fehler beim Laden der Episoden:', error);
        return [];
    }
}

// Funktion zum Extrahieren der Spotify Episode ID aus der Beschreibung
function extractSpotifyId(description) {
    // Versuche, Spotify Link aus der Beschreibung zu extrahieren
    const spotifyMatch = description.match(/open\.spotify\.com\/episode\/([a-zA-Z0-9]+)/);
    if (spotifyMatch) {
        return spotifyMatch[1];
    }
    return null;
}

// Funktion zum Formatieren des Datums
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('de-DE', options);
}

// Funktion zum Erstellen der Episode-Karte
function createEpisodeCard(episode, index) {
    const spotifyId = extractSpotifyId(episode.description);
    const pubDate = formatDate(episode.pubDate);
    
    // Bereinige die Beschreibung von HTML-Tags
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = episode.description;
    let cleanDescription = tempDiv.textContent || tempDiv.innerText || '';
    
    // Kürze die Beschreibung auf ca. 200 Zeichen
    if (cleanDescription.length > 200) {
        cleanDescription = cleanDescription.substring(0, 200) + '...';
    }
    
    return `
        <div class="episode-full-card" data-episode-index="${index}">
            <div class="episode-header-row">
                <div class="episode-badges">
                    ${index === 0 ? '<span class="episode-badge-neu">NEU</span>' : ''}
                    <span class="episode-number-large">Episode #${episode.title.match(/#(\d+)/) ? episode.title.match(/#(\d+)/)[1] : index + 1}</span>
                </div>
                <span class="episode-date-large">📅 ${pubDate}</span>
            </div>
            <h3>${episode.title}</h3>
            <p class="episode-description-full">
                ${cleanDescription}
            </p>
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
function createCompactEpisodeCard(episode, index) {
    const spotifyId = extractSpotifyId(episode.description);
    const pubDate = formatDate(episode.pubDate);
    
    return `
        <div class="episode-item">
            <div class="episode-thumbnail">
                <img src="${episode.thumbnail || 'logo.png'}" alt="${episode.title}">
                <div class="play-overlay">▶</div>
            </div>
            <div class="episode-details">
                <span class="episode-num">#${episode.title.match(/#(\d+)/) ? episode.title.match(/#(\d+)/)[1] : index + 1}</span>
                <h4>${episode.title}</h4>
                <p>${episode.description.substring(0, 100)}...</p>
                <span class="episode-date">${pubDate}</span>
            </div>
        </div>
    `;
}

// Funktion zum Erstellen der neuesten Episode auf der Startseite
function createLatestEpisodeCard(episode) {
    const spotifyId = extractSpotifyId(episode.description);
    const pubDate = formatDate(episode.pubDate);
    
    // Bereinige die Beschreibung
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = episode.description;
    let cleanDescription = tempDiv.textContent || tempDiv.innerText || '';
    
    if (cleanDescription.length > 300) {
        cleanDescription = cleanDescription.substring(0, 300) + '...';
    }
    
    return `
        <div class="episode-content">
            <div class="episode-info">
                <span class="episode-badge">NEU</span>
                <span class="episode-number">Episode #${episode.title.match(/#(\d+)/) ? episode.title.match(/#(\d+)/)[1] : '1'}</span>
                <h3>${episode.title}</h3>
                <p class="episode-description">
                    ${cleanDescription}
                </p>
                <div class="episode-meta">
                    <span class="meta-item">📅 ${pubDate}</span>
                    <span class="meta-item">⏱️ ${episode.itunes?.duration || 'N/A'}</span>
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
                    <audio controls style="width: 100%; margin-top: 15px;">
                        <source src="${episode.enclosure.link}" type="audio/mpeg">
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
                <p style="font-size: 1.2rem;">Keine Episoden gefunden. Bitte versuche es später erneut.</p>
            </div>
        `;
        return;
    }
    
    // Erstelle HTML für alle Episoden
    const episodesHTML = episodes.map((episode, index) => createEpisodeCard(episode, index)).join('');
    
    container.innerHTML = episodesHTML;
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
    container.innerHTML = createLatestEpisodeCard(latestEpisode);
}

// Lade und zeige die letzten 3 Episoden auf der Startseite
async function displayRecentEpisodes() {
    const container = document.querySelector('.recent-episodes .episodes-grid');
    
    if (!container) return;
    
    const episodes = await loadPodcastEpisodes();
    
    if (episodes.length === 0) return;
    
    // Zeige die Episoden 2-4 (überspringt die neueste, die bereits oben angezeigt wird)
    const recentEpisodes = episodes.slice(1, 4);
    const episodesHTML = recentEpisodes.map((episode, index) => createCompactEpisodeCard(episode, index + 1)).join('');
    
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
`;
document.head.appendChild(style);

// Export für Verwendung in anderen Dateien
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadPodcastEpisodes,
        displayAllEpisodes,
        displayLatestEpisode,
        displayRecentEpisodes
    };
}
