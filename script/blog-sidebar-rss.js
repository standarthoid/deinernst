/**
 * Dynamische Sidebar für Blog-Posts aus RSS-Feed
 * Lädt die beliebtesten/neuesten Blog-Posts AUTOMATISCH aus dem RSS-Feed
 * 
 * WICHTIG: Du musst zuerst blog-feed.xml mit dem Generator erstellen!
 */

async function loadBlogPostsFromRSS() {
    try {
        // Deine Blog RSS-Feed URL
const RSS_FEED_URL = 'https://standarthoid.github.io/deinernst/blog-feed.xml';
        
        // Lade den RSS-Feed
        let response = await fetch(RSS_FEED_URL);
        
        // Falls CORS-Fehler bei externer URL, nutze einen Proxy
        if (!response.ok && RSS_FEED_URL.startsWith('http')) {
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
        
        // Hole alle <item> Elemente (Blog-Posts)
        const items = Array.from(xmlDoc.querySelectorAll('item'));
        
        if (items.length === 0) {
            throw new Error('Keine Blog-Posts im RSS-Feed gefunden');
        }
        
        // Nehme die 3 neuesten (oder sortiere nach Views, falls vorhanden)
        const posts = items.slice(0, 3).map((item) => {
            // Extrahiere Daten aus dem RSS-Feed
            const title = item.querySelector('title')?.textContent || 'Unbekannter Post';
            const link = item.querySelector('link')?.textContent || item.querySelector('guid')?.textContent || '#';
            const pubDate = item.querySelector('pubDate')?.textContent;
            const description = item.querySelector('description')?.textContent || '';
            
            // Bereinige den Titel
            const cleanTitle = title.replace(/&amp;/g, '&')
                                    .replace(/&lt;/g, '<')
                                    .replace(/&gt;/g, '>')
                                    .replace(/&quot;/g, '"')
                                    .trim();
            
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
                dateFormatted,
                description
            };
        });
        
        // Finde die Sidebar für beliebte Posts
        const sidebarContainer = document.querySelector('.sidebar-widget.popular-posts .sidebar-posts');
        
        if (sidebarContainer) {
            // Generiere HTML für die Posts
            sidebarContainer.innerHTML = posts.map(post => `
                <div class="sidebar-post">
                    <a href="${post.link}">${post.title}</a>
                    ${post.dateFormatted ? `<span class="post-date">${post.dateFormatted}</span>` : ''}
                </div>
            `).join('');
            
            console.log('✓ Blog-Posts aus RSS geladen:', posts.length);
        } else {
            console.warn('⚠️ Sidebar-Container für Blog-Posts nicht gefunden');
            console.log('Stelle sicher, dass ein Element mit der Klasse ".sidebar-widget.popular-posts .sidebar-posts" existiert');
        }
        
    } catch (error) {
        console.error('❌ Fehler beim Laden der Blog-Posts aus RSS:', error);
        
        // Fallback: Zeige Fehlermeldung in der Sidebar
        const sidebarContainer = document.querySelector('.sidebar-widget.popular-posts .sidebar-posts');
        if (sidebarContainer) {
            sidebarContainer.innerHTML = `
                <div class="sidebar-post">
                    <p style="color: #999; font-size: 0.9rem; line-height: 1.5;">
                        Posts können momentan nicht geladen werden.<br>
                        <small>Stelle sicher, dass blog-feed.xml existiert.</small>
                    </p>
                </div>
            `;
        }
    }
}

// Lade Blog-Posts wenn die Seite fertig geladen ist
document.addEventListener('DOMContentLoaded', loadBlogPostsFromRSS);
