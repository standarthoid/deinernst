// ===================================
// Dein Ernst?! - JavaScript
// ===================================

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
});

// Newsletter Form Handling
const newsletterForms = document.querySelectorAll('#newsletterForm');

newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('#emailInput') || this.querySelector('.email-input');
        const email = emailInput.value;
        
        // Hier würdest du normalerweise die Email an deinen Newsletter-Service senden
        // Zum Beispiel mit einer API-Anfrage an Mailchimp, ConvertKit, etc.
        
        // Beispiel für eine API-Anfrage (auskommentiert):
        /*
        fetch('DEINE_NEWSLETTER_API_URL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            showSuccessMessage();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        */
        
        // Für Demo-Zwecke: Zeige Erfolgs-Nachricht
        showSuccessMessage(form);
        emailInput.value = '';
    });
});

function showSuccessMessage(form) {
    // Verstecke das Formular
    form.style.display = 'none';
    
    // Zeige die Erfolgs-Nachricht
    const successMessage = document.getElementById('newsletter-success');
    if (successMessage) {
        successMessage.style.display = 'block';
        
        // Animiere die Nachricht
        setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.transition = 'opacity 0.5s ease';
        }, 3000);
        
        // Setze das Formular nach 4 Sekunden zurück
        setTimeout(() => {
            form.style.display = 'block';
            successMessage.style.display = 'none';
            successMessage.style.opacity = '1';
        }, 4000);
    } else {
        // Fallback: Alert-Nachricht
        alert('🎉 Willkommen an Bord! Check deine E-Mails!');
        form.style.display = 'block';
    }
}

// Smooth Scrolling für Anchor-Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignoriere leere Anchor-Links
        if (href === '#' || href === '#!') {
            return;
        }
        
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Schließe mobile Navigation wenn offen
            const navMenu = document.getElementById('navMenu');
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// Comic-Effekte: Zufällige Rotation für Episode-Thumbnails
document.addEventListener('DOMContentLoaded', function() {
    const episodeThumbnails = document.querySelectorAll('.episode-thumbnail img');
    
    episodeThumbnails.forEach((img, index) => {
        // Zufällige leichte Rotation zwischen -3 und 3 Grad
        const rotation = (Math.random() * 6) - 3;
        img.style.transform = `rotate(${rotation}deg)`;
    });
});

// Intersection Observer für Animationen beim Scrollen (optional)
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Elemente für Animation markieren
    const animateElements = document.querySelectorAll('.feature-card, .episode-item, .blog-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Spotify Embed Error Handling
document.addEventListener('DOMContentLoaded', function() {
    const spotifyIframes = document.querySelectorAll('iframe[src*="spotify.com"]');
    
    spotifyIframes.forEach(iframe => {
        iframe.addEventListener('error', function() {
            console.log('Spotify iframe failed to load');
            // Optional: Zeige eine Fehlermeldung
        });
    });
});

// Console Log mit Stil (Easter Egg für Entwickler)
console.log('%cDein Ernst?! 🎙️', 'font-size: 24px; font-weight: bold; color: #FF1493;');
console.log('%cDer Podcast, der die Dinge beim Namen nennt!', 'font-size: 14px; color: #8B4789;');
console.log('%cWebsite entwickelt mit ❤️ und Pop-Art-Vibes', 'font-size: 12px; color: #2D8B57;');
