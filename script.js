// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Update phone number - REPLACE WITH YOUR ACTUAL NUMBER
const phoneNumber = '254799178004'; // Change this to your WhatsApp number
const whatsappLink = document.getElementById('whatsapp-link');

if (whatsappLink) {
    whatsappLink.href = `https://wa.me/${phoneNumber}?text=Hello!%20I'm%20interested%20in%20your%20stickers`;
}

// Update all WhatsApp links on the page
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.href = link.href.replace(/wa\.me\/\d+/, `wa.me/${phoneNumber}`);
});

// Quote Calculator
const quantitySlider = document.getElementById('quantity');
const quantityValue = document.getElementById('quantity-value');
const sizeSelect = document.getElementById('size');
const estimatedPrice = document.getElementById('estimated-price');

const prices = {
    '2x2': 10,
    '3x3': 15,
    '4x4': 20
};

function updateQuote() {
    const quantity = parseInt(quantitySlider.value);
    const size = sizeSelect.value;
    const pricePerSticker = prices[size];
    const total = quantity * pricePerSticker;
    
    quantityValue.textContent = `${quantity} stickers`;
    estimatedPrice.textContent = `KES ${total.toLocaleString()}`;
    
    // Update WhatsApp link with quote info
    const whatsappQuoteLink = document.querySelector('.custom-form .primary-btn');
    const sizeText = sizeSelect.options[sizeSelect.selectedIndex].text;
    const message = `Hello! I'd like a custom sticker quote for ${quantity} stickers (${sizeText})`;
    const encodedMessage = encodeURIComponent(message);
    whatsappQuoteLink.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

if (quantitySlider && sizeSelect) {
    quantitySlider.addEventListener('input', updateQuote);
    sizeSelect.addEventListener('change', updateQuote);
    updateQuote(); // Initial calculation
}

// Order Product via WhatsApp
function orderProduct(productName) {
    const message = `Hello! I'd like to order ${productName}. Can you provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

// WhatsApp Preview Chat
function sendPreviewMessage() {
    const input = document.getElementById('preview-input');
    const message = input.value.trim();
    
    if (message) {
        const messagesContainer = document.querySelector('.preview-messages');
        
        // Create new message
        const newMessage = document.createElement('div');
        newMessage.className = 'message sent';
        newMessage.innerHTML = `
            <p>${message}</p>
            <span class="time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        `;
        
        messagesContainer.appendChild(newMessage);
        input.value = '';
        
        // Auto-reply after 1 second
        setTimeout(() => {
            const autoReply = document.createElement('div');
            autoReply.className = 'message received';
            autoReply.innerHTML = `
                <p>Great! For ${message.toLowerCase().includes('custom') ? 'custom orders' : 'that product'}, please send us the details on WhatsApp and we'll assist you immediately!</p>
                <span class="time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            `;
            messagesContainer.appendChild(autoReply);
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1000);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Allow Enter key in preview input
document.getElementById('preview-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendPreviewMessage();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements to animate
document.querySelectorAll('.product-card, .process-step, .whatsapp-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Sticker animation on hover
document.querySelectorAll('.sticker').forEach(sticker => {
    sticker.addEventListener('mouseenter', () => {
        sticker.style.transform = 'scale(1.2) rotate(10deg)';
    });
    
    sticker.addEventListener('mouseleave', () => {
        sticker.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Initialize with current time in preview
document.querySelectorAll('.message .time').forEach(timeElement => {
    timeElement.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
});

// WhatsApp online status
function updateOnlineStatus() {
    const now = new Date();
    const hours = now.getHours();
    const isOnline = hours >= 8 && hours < 18; // 8AM to 6PM
    
    const statusElement = document.querySelector('.whatsapp-note');
    if (statusElement) {
        if (isOnline) {
            statusElement.innerHTML = '<i class="fas fa-circle" style="color: #25D366;"></i> Online now • Replies instantly';
        } else {
            statusElement.innerHTML = '<i class="fas fa-clock"></i> We respond within 15 minutes';
        }
    }
}

updateOnlineStatus();
setInterval(updateOnlineStatus, 60000); // Update every minute

// Add sticker animation on page load
window.addEventListener('load', () => {
    document.querySelectorAll('.sticker').forEach((sticker, index) => {
        sticker.style.animationDelay = `${index * 0.5}s`;
    });
});