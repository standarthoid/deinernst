/**
 * Dynamische Sidebar für Podcast-Episoden (mit CORS-Fallback)
 * Lädt die neuesten Episoden AUTOMATISCH aus dem RSS-Feed
 * Nutzt CORS-Proxy wenn direkter Zugriff blockiert wird
 */

async function loadLatestEpisodesFromRSS() {
    // WICHTIG: Ersetze YOUR_PODCAST_ID mit deiner echten Podcast-ID
    const RSS_FEED_URL = 'https://anchor.fm/s/fc415c4c/podcast/rss';
    
    try {
        // Versuche zuerst direkten Zugriff
        let response = await fetch(RSS_FEED_URL);
        
        // Falls CORS-Fehler, nutze einen Proxy
        if (!response.ok) {
            console.log('Direkter Zugriff fehlgeschlagen, nutze CORS-Proxy...');
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(RSS_FEED_URL)}`;
            response = await fetch(proxyUrl);
        }
        
        if (!response.ok) {
            throw new Error('RSS-Feed konnte nicht geladen werden');
        }
        
        const rssText = await response.text();
        
        // Parse das XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(rssText, 'text/xml');
        
        // Prüfe auf Parse-Fehler
        const parseError = xmlDoc.querySelector('parsererror');
        if (parseError) {
            throw new Error('RSS-Feed konnte nicht geparst werden');
        }
        
        // Hole alle <item> Elemente (Episoden)
        const items = Array.from(xmlDoc.querySelectorAll('item'));
        
        if (items.length === 0) {
            throw new Error('Keine Episoden im RSS-Feed gefunden');
        }
        
        // Nehme nur die 3 neuesten
        const latestEpisodes = items.slice(0, 3).map((item) => {
            // Extrahiere Daten aus dem RSS-Feed
            const title = item.querySelector('title')?.textContent || 'Unbekannte Episode';
            const link = item.querySelector('link')?.textContent || item.querySelector('guid')?.textContent || '#';
            const pubDate = item.querySelector('pubDate')?.textContent;
            
            // Bereinige den Titel (entferne HTML-Entities, etc.)
            const cleanTitle = title.replace(/&amp;/g, '&')
                                    .replace(/&lt;/g, '<')
                                    .replace(/&gt;/g, '>')
                                    .replace(/&quot;/g, '"')
                                    .trim();
            
            // Extrahiere Episode-Nummer aus dem Titel
            // Unterstützt: "#20", "Episode 20", "Folge 20", "E20"
            const episodeMatch = cleanTitle.match(/#(\d+)|Episode\s+(\d+)|Folge\s+(\d+)|E(\d+)/i);
            const episodeNumber = episodeMatch ? 
                (episodeMatch[1] || episodeMatch[2] || episodeMatch[3] || episodeMatch[4]) : '';
            
            // Formatiere das Datum
            let dateFormatted = '';
            if (pubDate) {
                try {
                    const date = new Date(pubDate);
                    if (!isNaN(date.getTime())) {
                        dateFormatted = date.toLocaleDateString('de-DE', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        });
                    }
                } catch (e) {
                    console.warn('Datum konnte nicht formatiert werden:', pubDate);
                }
            }
            
            return {
                title: cleanTitle,
                link,
                episodeNumber,
                dateFormatted
            };
        });
        
        // Finde die Sidebar für neueste Episoden
        const sidebarContainer = document.querySelector('.sidebar-widget.latest-episodes .sidebar-episodes');
        
        if (sidebarContainer) {
            // Generiere HTML für die Episoden
            sidebarContainer.innerHTML = latestEpisodes.map(episode => `
                <div class="sidebar-episode">
                    ${episode.episodeNumber ? `<span class="episode-num-small">#${episode.episodeNumber}</span>` : ''}
                    <div class="episode-info">
                        <a href="${episode.link}" target="_blank">${episode.title}</a>
                        ${episode.dateFormatted ? `<span class="episode-date-small">${episode.dateFormatted}</span>` : ''}
                    </div>
                </div>
            `).join('');
            
            console.log('✓ Neueste Episoden aus RSS geladen:', latestEpisodes.length);
        } else {
            console.warn('⚠️ Sidebar-Container für Episoden nicht gefunden');
            console.log('Stelle sicher, dass ein Element mit der Klasse ".sidebar-widget.latest-episodes .sidebar-episodes" existiert');
        }
        
    } catch (error) {
        console.error('❌ Fehler beim Laden der Episoden aus RSS:', error);
        
        // Fallback: Zeige hilfreiche Fehlermeldung in der Sidebar
        const sidebarContainer = document.querySelector('.sidebar-widget.latest-episodes .sidebar-episodes');
        if (sidebarContainer) {
            sidebarContainer.innerHTML = `
                <div class="sidebar-episode">
                    <p style="color: #999; font-size: 0.9rem; line-height: 1.5;">
                        Episoden können momentan nicht geladen werden.<br>
                        <small>Prüfe die RSS-Feed-URL in der Konsole.</small>
                    </p>
                </div>
            `;
        }
    }
}

// Lade Episoden wenn die Seite fertig geladen ist
document.addEventListener('DOMContentLoaded', loadLatestEpisodesFromRSS);
