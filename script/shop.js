/* ===================================
   SHOP JAVASCRIPT
   Stripe Checkout Integration + Size Selection
   =================================== */

// WICHTIG: Ersetze diese mit deinen echten Keys
const STRIPE_PUBLIC_KEY = 'pk_test_DEIN_STRIPE_PUBLIC_KEY'; // Stripe Public Key (live oder test)
const MAKE_WEBHOOK_URL = 'https://hook.eu2.make.com/DEIN_WEBHOOK'; // Make.com Webhook URL

// Stripe initialisieren
const stripe = Stripe(STRIPE_PUBLIC_KEY);

// Globale Variablen für aktuelles Produkt
let currentProduct = {
    id: '',
    name: '',
    price: 0,
    gelatoSku: '',
    size: '',
    color: 'Schwarz' // Default
};

// Size Modal Funktionen
function openSizeModal(productData) {
    currentProduct = {
        id: productData.productId,
        name: productData.productName,
        price: productData.productPrice,
        gelatoSku: productData.gelatoSku,
        size: '',
        color: 'Schwarz'
    };

    // Modal öffnen
    const modal = document.getElementById('size-modal');
    modal.classList.add('active');
    
    // Produktname setzen
    document.getElementById('modal-product-name').textContent = productData.productName;
    
    // Size Selection anzeigen oder verstecken basierend auf Produkttyp
    const needsSize = productData.productId.includes('tshirt') || productData.productId.includes('hoodie');
    const sizeSelection = document.getElementById('size-selection');
    
    if (needsSize) {
        sizeSelection.style.display = 'block';
    } else {
        sizeSelection.style.display = 'none';
        // Für Produkte ohne Größe direkt aktivieren
        document.getElementById('proceed-to-checkout').disabled = false;
    }
    
    // Reset selections
    document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('selected'));
    document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('selected'));
    currentProduct.size = '';
}

function closeSizeModal() {
    const modal = document.getElementById('size-modal');
    modal.classList.remove('active');
}

// Event Listeners für alle Buy Buttons
document.addEventListener('DOMContentLoaded', function() {
    
    // Buy Button Clicks
    const buyButtons = document.querySelectorAll('.btn-buy');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productData = {
                productId: this.dataset.productId,
                productName: this.dataset.productName,
                productPrice: parseInt(this.dataset.productPrice),
                gelatoSku: this.dataset.gelatoSku
            };
            openSizeModal(productData);
        });
    });
    
    // Size Button Clicks
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove selected from all
            sizeButtons.forEach(btn => btn.classList.remove('selected'));
            // Add selected to clicked
            this.classList.add('selected');
            currentProduct.size = this.dataset.size;
            
            // Enable checkout button
            document.getElementById('proceed-to-checkout').disabled = false;
        });
    });
    
    // Color Button Clicks
    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove selected from all
            colorButtons.forEach(btn => btn.classList.remove('selected'));
            // Add selected to clicked
            this.classList.add('selected');
            currentProduct.color = this.dataset.color;
        });
    });
    
    // Proceed to Checkout Button
    document.getElementById('proceed-to-checkout').addEventListener('click', function() {
        proceedToCheckout();
    });
    
    // Close modal when clicking backdrop
    document.querySelector('.modal-backdrop')?.addEventListener('click', closeSizeModal);
});

// Checkout Funktion
async function proceedToCheckout() {
    try {
        // Loading State
        const checkoutBtn = document.getElementById('proceed-to-checkout');
        checkoutBtn.textContent = 'Lädt...';
        checkoutBtn.disabled = true;
        
        // Produktname mit Größe/Farbe
        let fullProductName = currentProduct.name;
        if (currentProduct.size) {
            fullProductName += ` - Größe ${currentProduct.size}`;
        }
        if (currentProduct.color && currentProduct.color !== 'Schwarz') {
            fullProductName += ` - ${currentProduct.color}`;
        }
        
        // Stripe Checkout Session erstellen
        const { error } = await stripe.redirectToCheckout({
            lineItems: [{
                price: currentProduct.price, // Das ist die Price ID von Stripe
                quantity: 1
            }],
            mode: 'payment',
            successUrl: `${window.location.origin}/erfolg.html?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: `${window.location.origin}/shop.html`,
            customerEmail: '', // Optional: kann leer bleiben
            metadata: {
                product_id: currentProduct.id,
                product_name: fullProductName,
                size: currentProduct.size,
                color: currentProduct.color,
                gelato_sku: currentProduct.gelatoSku
            }
        });
        
        if (error) {
            console.error('Stripe Error:', error);
            alert('Es gab einen Fehler beim Checkout. Bitte versuche es erneut.');
            checkoutBtn.textContent = 'Weiter zum Checkout';
            checkoutBtn.disabled = false;
        }
        
    } catch (error) {
        console.error('Checkout Error:', error);
        alert('Es gab einen Fehler. Bitte versuche es erneut.');
        const checkoutBtn = document.getElementById('proceed-to-checkout');
        checkoutBtn.textContent = 'Weiter zum Checkout';
        checkoutBtn.disabled = false;
    }
}

// Alternative: Direct Stripe Payment Links (einfachere Variante)
// Wenn du nicht die volle Stripe Checkout Integration willst, 
// kannst du auch direkt Stripe Payment Links verwenden:
/*
function proceedToCheckoutSimple() {
    // Erstelle Payment Links in Stripe Dashboard
    const paymentLinks = {
        'tshirt_logo_S': 'https://buy.stripe.com/DEIN_LINK_1',
        'tshirt_logo_M': 'https://buy.stripe.com/DEIN_LINK_2',
        // etc.
    };
    
    const linkKey = `${currentProduct.id}_${currentProduct.size}`;
    const paymentLink = paymentLinks[linkKey];
    
    if (paymentLink) {
        window.location.href = paymentLink;
    }
}
*/
