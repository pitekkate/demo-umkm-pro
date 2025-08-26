
// --- CONFIGURATION ---
const DATA_SOURCE = 'json'; // 'json', 'firebase', or 'sheets'
const SHEETS_URL = 'GANTI_DENGAN_URL_GOOGLE_APPS_SCRIPT_ANDA'; // Only for 'sheets' mode

const FALLBACK_HERO_IMAGES = {
    "Kuliner": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1600&auto=format&fit=crop",
    "Jasa": "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1600&auto=format&fit=crop",
    "Bimbel": "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1600&auto=format&fit=crop",
    "Fashion": "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1600&auto=format&fit=crop",
    "Lainnya": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop"
};
const FALLBACK_GALLERY_IMAGES = {
    "Kuliner": [
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1579684947214-c2a792db8c21?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1559329007-447de37f035f?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800&auto=format&fit=crop"
    ],
    "Jasa": [
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581092921462-2b61a454891f?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
    ],
    "Bimbel": [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1531482615713-2c657695c2b7?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1549472013-a19c59502a7b?q=80&w=800&auto=format&fit=crop"
    ],
    "Fashion": [
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1598554747436-c9293d0a5131?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?q=80&w=800&auto=format&fit=crop"
    ],
    "Lainnya": [
        "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1586940252199-31e8a9363e48?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=800&auto=format&fit=crop"
    ]
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Content is pre-rendered. This function will now UPDATE the content.
    loadContent();
});

async function loadContent() {
    try {
        let data;
        if (DATA_SOURCE === 'firebase') {
            // Firebase SDK must be loaded and initialized in firebase-config.js
            const { getFirestore, doc, getDoc } = window.firebase.firestore;
            const db = getFirestore();
            const docRef = doc(db, 'websiteData', 'main');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                data = docSnap.data();
            } else {
                console.warn("Could not find website data in Firebase. Displaying initial data.");
                return;
            }
        } else if (DATA_SOURCE === 'sheets') {
             if (SHEETS_URL.startsWith('GANTI_DENGAN')) {
                console.error("Please configure the SHEETS_URL in script.js");
                // The site will still work with pre-rendered data, so we don't show a fatal error.
                return;
            }
            const response = await fetch(SHEETS_URL);
            data = await response.json();
        } else { // 'json'
            const response = await fetch('data.json');
            data = await response.json();
        }
        renderContent(data);
    } catch (error) {
        console.error('Error loading dynamic content:', error);
        // Don't kill the page, just log the error. The pre-rendered content is still visible.
    }
}

// --- HTML GENERATION HELPERS ---
function getProductsHtml(products) {
    if (!products || products.length === 0) return '';
    return `
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-3xl font-bold mb-8">Produk & Layanan Kami</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                ${products.map(product => `
                    <div class="product-card">
                        <img src="${product.imageUrl || `https://source.unsplash.com/400x400/?${product.name}`}" alt="${product.name}" class="product-image" loading="lazy" width="400" height="400">
                        <div class="product-info">
                            <h3 class="product-name">${product.name}</h3>
                            <p class="product-price">Rp ${new Intl.NumberFormat('id-ID').format(Number(product.price))}</p>
                            <p class="product-description">${product.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function getLocationHtml(data) {
    if (!data.alamat) return '';
    const mapQuery = encodeURIComponent(data.alamat);
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
                    <p class="text-lg text-muted-foreground mb-6">${data.alamat}</p>
                    <h3 class="text-2xl font-semibold mb-3">Jam Operasional</h3>
                    <p class="text-lg text-muted-foreground whitespace-pre-line">${data.jamBuka}</p>
                </div>
            </div>
        </div>
    `;
}

function getTestimonialsHtml(testimonials) {
    if (!testimonials || testimonials.length === 0) return '<div class="container mx-auto px-6 text-center"><p>Belum ada testimoni.</p></div>';
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

function getFaqsHtml(faqs) {
    if (!faqs || faqs.length === 0) return '<div class="container mx-auto px-6 text-center"><p>Belum ada pertanyaan.</p></div>';
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

function getGalleryHtml(galleryImages, storeName, businessType) {
    const images = galleryImages && galleryImages.length > 0 ? galleryImages : FALLBACK_GALLERY_IMAGES[businessType];
    if (!images) return '';
    return `
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold text-center mb-8">Galeri Kami</h2>
            <div class="gallery-grid">
                ${images.map((src, index) => `<div class="gallery-item"><img src="${src}" alt="Galeri ${storeName} ${index + 1}" class="gallery-image" loading="lazy" width="400" height="400"></div>`).join('')}
            </div>
        </div>
    `;
}

function getNavLinks(data) {
    const hasProducts = data.products && data.products.length > 0;
    const hasTestimonials = data.testimonials && data.testimonials.length > 0;
    const hasFaqs = data.faqs && data.faqs.length > 0;

    let links = '';
    if (hasProducts) links += '<a href="#produk" class="nav-link">Produk</a>';
    if (hasTestimonials) links += '<a href="#testimonials" class="nav-link">Testimoni</a>';
    links += '<a href="#lokasi" class="nav-link">Lokasi</a>';
    if (hasFaqs) links += '<a href="#faq" class="nav-link">FAQ</a>';
    links += '<a href="#kontak" class="nav-link">Kontak</a>';
    return links;
}


// --- DOM MANIPULATION ---
function renderContent(data) {
    const whatsappLink = `https://wa.me/62${data.whatsapp.substring(1)}`;
    const heroImage = data.images?.hero || FALLBACK_HERO_IMAGES[data.businessType];

    document.title = data.storeName;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', data.deskripsiUsaha.substring(0, 160));
    
    document.documentElement.style.setProperty('--primary', data.themeColor);

    const heroSection = document.getElementById('hero-section');
    if (heroSection && heroImage) {
        heroSection.style.backgroundImage = `url('${heroImage}')`;
    }

    const headerBrandEl = document.getElementById('storeName-header');
    if (headerBrandEl) {
        // Re-render the header content with logo and new name
        headerBrandEl.innerHTML = `
            ${data.logo ? `<img src="${data.logo}" alt="${data.storeName} Logo" class="header-logo mr-3">` : ''}
            <span>${data.storeName}</span>
        `;
    }

    document.getElementById('storeName-hero').textContent = data.storeName;
    document.getElementById('slogan-hero').textContent = data.slogan;
    const heroButton = document.getElementById('whatsapp-hero');
    if(heroButton) heroButton.href = whatsappLink;

    const fab = document.querySelector('.whatsapp-fab');
    if(fab) fab.href = whatsappLink;

    document.getElementById('copyright-footer').textContent = `© ${new Date().getFullYear()} ${data.storeName}. All Rights Reserved.`;

    document.getElementById('nav-links').innerHTML = getNavLinks(data);
    document.getElementById('produk').innerHTML = getProductsHtml(data.products);
    document.getElementById('testimonials').innerHTML = getTestimonialsHtml(data.testimonials);
    document.getElementById('lokasi').innerHTML = getLocationHtml(data);
    document.getElementById('galeri').innerHTML = getGalleryHtml(data.images?.gallery, data.storeName, data.businessType);
    document.getElementById('faq').innerHTML = getFaqsHtml(data.faqs);
}
    