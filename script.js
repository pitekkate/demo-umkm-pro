
'use strict';
// --- Fallback Data (embedded from generator) ---
const fallbackHeroImages = {"Kuliner":"https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1600&auto=format&fit=crop","Jasa":"https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1600&auto=format&fit=crop","Bimbel":"https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1600&auto=format&fit=crop","Fashion":"https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1600&auto=format&fit=crop","Lainnya":"https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop"};
const fallbackGalleryImages = {"Kuliner":["https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800&auto=format&fit=crop"],"Jasa":["https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1581092921462-2b61a454891f?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"],"Bimbel":["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1531482615713-2c657695c2b7?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1549472013-a19c59502a7b?q=80&w=800&auto=format&fit=crop"],"Fashion":["https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1598554747436-c9293d0a5131?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?q=80&w=800&auto=format&fit=crop"],"Lainnya":["https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1586940252199-31e8a9363e48?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=800&auto=format&fit=crop"]};

// --- RENDER FUNCTIONS (Embedded) ---
function renderProductsHtml(products) {
    if (!products || products.length === 0)
        return '<div class="container mx-auto px-6 text-center"><p>Belum ada produk untuk ditampilkan.</p></div>';
    return `
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-3xl font-bold mb-8">Produk & Layanan Kami</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                ${products.map(product => `
                    <div class="product-card">
                        <img src="${product.imageUrl || `https://source.unsplash.com/400x400/?${encodeURIComponent(product.name)}`}" alt="${product.name}" class="product-image" loading="lazy" width="400" height="400">
                        <div class="product-info">
                            <h3 class="product-name">${product.name}</h3>
                            <p class="product-price">Rp ${new Intl.NumberFormat('id-ID').format(Number(product.price || 0))}</p>
                            <p class="product-description">${product.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderLocationHtml(alamat, jamBuka) {
    if (!alamat)
        return '';
    const mapQuery = encodeURIComponent(alamat);
    return `
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold text-center mb-8">Lokasi & Jam Buka</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div class="location-map-container">
                    <iframe
                        class="location-map"
                        loading="lazy"
                        width="600"
                        height="450"
                        allowfullscreen
                        referrerpolicy="no-referrer-when-downgrade"
                        src="https://maps.google.com/maps?q=${mapQuery}&output=embed">
                    </iframe>
                </div>
                <div class="text-center md:text-left">
                    <h3 class="text-2xl font-semibold mb-3">Alamat Kami</h3>
                    <p class="text-lg text-muted-foreground mb-6">${alamat}</p>
                    <h3 class="text-2xl font-semibold mb-3">Jam Operasional</h3>
                    <p class="text-lg text-muted-foreground whitespace-pre-line">${jamBuka}</p>
                </div>
            </div>
        </div>
    `;
}

function renderTestimonialsHtml(testimonials) {
    if (!testimonials || testimonials.length === 0)
        return '<div class="container mx-auto px-6 text-center"><p>Belum ada testimoni.</p></div>';
    return `
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-3xl font-bold mb-8">Apa Kata Mereka?</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${testimonials.map(t => `
                    <div class="testimonial-card">
                        <svg class="quote-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="currentColor">
                            <path d="M14 17h3l2-4V7h-6v6h3M6 17h3l2-4V7H5v6h3l-2 4z"></path>
                        </svg>
                        <p class="testimonial-quote">"${t.quote}"</p>
                        <div class="testimonial-author">
                            ${t.imageUrl ? `<img src="${t.imageUrl}" alt="${t.name}" class="w-10 h-10 rounded-full mr-3 object-cover" loading="lazy" width="40" height="40">` : ''}
                            <span class="font-semibold">${t.name}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderFaqsHtml(faqs) {
    if (!faqs || faqs.length === 0)
        return '<div class="container mx-auto px-6 text-center"><p>Belum ada pertanyaan.</p></div>';
    return `
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-3xl font-bold mb-2">Tanya Jawab</h2>
            <p class="text-lg text-muted-foreground mb-8">Pertanyaan yang sering diajukan oleh pelanggan kami.</p>
            <div class="max-w-3xl mx-auto text-left space-y-4">
                ${faqs.map(faq => `
                    <details class="faq-item group">
                        <summary class="faq-question">
                            <span>${faq.question}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="faq-chevron">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </summary>
                        <div class="faq-answer">
                            <p>${faq.answer}</p>
                        </div>
                    </details>
                `).join('')}
            </div>
        </div>
    `;
}

function renderGalleryHtml(galleryImages, storeName, businessType) {
    const images = galleryImages && galleryImages.length > 0 ? galleryImages : fallbackGalleryImages[businessType];
    if (!images)
        return '';
    return `
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold text-center mb-8">Galeri Kami</h2>
            <div class="gallery-grid">
                ${images.map((src, index) => `<div class="gallery-item"><img src="${src}" alt="Galeri ${storeName} ${index + 1}" class="gallery-image" loading="lazy" width="400" height="400"></div>`).join('')}
            </div>
        </div>
    `;
}

function renderNavLinks(data) {
    const hasProducts = data.products && data.products.length > 0;
    const hasTestimonials = data.testimonials && data.testimonials.length > 0;
    const hasFaqs = data.faqs && data.faqs.length > 0;
    let links = '';
    if (hasProducts)
        links += '<a href="#produk" class="nav-link">Produk</a>';
    if (hasTestimonials)
        links += '<a href="#testimonials" class="nav-link">Testimoni</a>';
    links += '<a href="#lokasi" class="nav-link">Lokasi</a>';
    if (hasFaqs)
        links += '<a href="#faq" class="nav-link">FAQ</a>';
    links += '<a href="#kontak" class="nav-link">Kontak</a>';
    return links;
}

function getHeaderHtml(data) {
    return `
    <header class="header">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="#" class="header-title text-xl font-bold">
                ${data.logo ? `<img src="${data.logo}" alt="${data.storeName} Logo" class="header-logo mr-3">` : ''}
                <span>${data.storeName}</span>
            </a>
            <nav class="hidden md:flex space-x-6">
                ${renderNavLinks(data)}
            </nav>
        </div>
    </header>
    `;
}

function getHeroHtml(data) {
    const heroImage = data.images?.hero || fallbackHeroImages[data.businessType];
    return `
    <section class="hero" id="hero-section" style="background-image: url('${heroImage}');">
        <div class="hero-overlay"></div>
        <div class="container mx-auto px-6 text-center hero-content">
            <h1 id="storeName-hero" class="text-4xl md:text-6xl font-bold mb-4">${data.storeName}</h1>
            <p id="slogan-hero" class="text-lg md:text-2xl mb-8">${data.slogan}</p>
            <a id="whatsapp-hero" href="https://wa.me/62${data.whatsapp.substring(1)}" class="cta-button" target="_blank" rel="noopener noreferrer">Hubungi Kami via WhatsApp</a>
        </div>
    </section>
    `;
}

function getFooterHtml(data) {
    return `
    <footer id="kontak" class="footer">
        <div class="container mx-auto px-6 py-8 text-center">
            <h3 class="text-2xl font-semibold mb-4">Hubungi Kami</h3>
            <p class="text-lg text-muted-foreground mb-6">Punya pertanyaan atau siap untuk memesan? <br class="hidden sm:block">Klik tombol WhatsApp di pojok kanan bawah untuk chat langsung dengan kami!</p>
            <p class="text-xs text-muted-foreground mt-8">&copy; ${new Date().getFullYear()} ${data.storeName}. All Rights Reserved.</p>
        </div>
    </footer>
    `;
}

function getWhatsappFabHtml(data) {
    return `
    <a href="https://wa.me/62${data.whatsapp.substring(1)}" class="whatsapp-fab" target="_blank" rel="noopener noreferrer" aria-label="Chat di WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.651 4.383 1.89 6.286l-.99 3.638 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
    </a>
    `;
}

// --- CORE RENDER LOGIC ---
function renderContent(data) {
    if (!data || typeof data !== 'object') {
        console.error('Received invalid data for rendering:', data);
        return;
    }
    
    // Fallback for missing images object
    if (!data.images) {
      data.images = { hero: '', gallery: [] };
    }
    data.businessType = data.businessType || 'Kuliner';


    try {
        // Simple and robust DOM updates
        const updateHTML = (selector, html) => {
            const el = document.querySelector(selector);
            if (el) el.innerHTML = html;
        };
        
        updateHTML('header', getHeaderHtml(data));
        updateHTML('#hero-section-container', getHeroHtml(data));
        updateHTML('#produk', renderProductsHtml(data.products));
        updateHTML('#testimonials', renderTestimonialsHtml(data.testimonials));
        updateHTML('#lokasi', renderLocationHtml(data.alamat, data.jamBuka));
        updateHTML('#galeri', renderGalleryHtml(data.images.gallery, data.storeName, data.businessType));
        updateHTML('#faq', renderFaqsHtml(data.faqs));
        updateHTML('#footer-container', getFooterHtml(data));
        updateHTML('#fab-container', getWhatsappFabHtml(data));

    } catch(e) {
        console.error("A critical error occurred while rendering page content:", e);
    }
}

// --- DATA LOADING ---
document.addEventListener('DOMContentLoaded', () => {
    
        fetch('data.json?t=' + new Date().getTime())
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch data.json');
                return response.json();
            })
            .then(data => renderContent(data))
            .catch(error => console.error('Error loading dynamic content:', error));
        
});
