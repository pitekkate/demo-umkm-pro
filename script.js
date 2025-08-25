
const STORAGE_KEY = 'umkmProData';
// This default data will be replaced by the generator
const DEFAULT_DATA = {
  "storeName": "Kopi Janda ",
  "slogan": "Enak, Murah, Langsung Antar!",
  "whatsapp": "08564864884",
  "themeColor": "#3b82f6",
  "products": [
    "Kopi Janda",
    "Kopi Ambon",
    "Kopi Asem",
    "Kopi Manis"
  ],
  "prices": [
    "12000",
    "9000",
    "3000",
    "5000"
  ],
  "templateStyle": "Teknologi",
  "productGalleryUrls": "https://picsum.photos/seed/makanan1/400/300\nhttps://picsum.photos/seed/minuman2/400/300\nhttps://picsum.photos/seed/cafe3/400/300",
  "images": {
    "hero": "https://picsum.photos/seed/KopiJanda/1200/800",
    "gallery": [
      "https://picsum.photos/seed/gal1KopiJanda/400/300",
      "https://picsum.photos/seed/gal2KopiJanda/400/300",
      "https://picsum.photos/seed/gal3KopiJanda/400/300",
      "https://picsum.photos/seed/gal4KopiJanda/400/300"
    ]
  }
};

/**
 * Formats a number or string into Indonesian Rupiah currency format.
 */
function formatRupiah(angka) {
    const cleanString = String(angka).replace(/[^0-9]/g, '');
    if (cleanString === '') {
        return String(angka) || 'Harga Spesial';
    }
    const number = parseInt(cleanString, 10);
    return 'Rp ' + number.toLocaleString('id-ID');
}


function renderContent() {
    let data;
    try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
            data = JSON.parse(storedData);
        } else {
            data = DEFAULT_DATA;
            // Initialize localStorage so the admin panel can see the data on first load.
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
    } catch (error) {
        console.error("Failed to parse data from localStorage, using default.", error);
        data = DEFAULT_DATA;
        // Attempt to self-heal by resetting corrupted data in localStorage.
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    const storeName = data.storeName || 'Nama Toko Anda';
    const waNumber = data.whatsapp || '';
    const themeColor = data.themeColor || '#3b82f6';
    const slogan = data.slogan || 'Solusi terbaik untuk kebutuhan Anda.';
    
    // 1. Update Theme Color
    document.documentElement.style.setProperty('--theme-color', themeColor);

    // 2. Update Texts & Titles
    document.getElementById('title-tag').textContent = storeName;
    document.getElementById('nav-store-name').textContent = storeName;
    document.getElementById('hero-store-name').textContent = `Selamat Datang di ${storeName}`;
    document.getElementById('hero-slogan').textContent = slogan;
    document.getElementById('footer-store-name').textContent = storeName;
    
    // 3. Update WhatsApp Links
    const waBaseUrl = waNumber ? `https://wa.me/62${waNumber.replace(/^0+/, '')}` : '#kontak';
    document.getElementById('cta-wa-link').href = waBaseUrl;
    document.getElementById('floating-wa-link').href = waBaseUrl;

    const waPesanLink = waNumber ? `${waBaseUrl}?text=Halo%2C%20saya%20ingin%20pesan%3A%20` : '#';
    const pesanWaButtonContainer = document.getElementById('cta-wa-button-container');
    if(pesanWaButtonContainer && waNumber) {
        pesanWaButtonContainer.innerHTML = `
            <a href="${waPesanLink}" target="_blank" class="inline-block w-full max-w-sm bg-[#25D366] hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                Pesan via WhatsApp
            </a>
        `;
    } else if (pesanWaButtonContainer) {
        pesanWaButtonContainer.innerHTML = '';
    }


    // 4. Update Images (Atmosphere Gallery)
    const heroSection = document.getElementById('hero-section');
    const heroImageUrl = (data.images && data.images.hero) || 'https://picsum.photos/seed/hero/1200/800';
    heroSection.style.backgroundImage = `url('${heroImageUrl}')`;
    
    const galleryGrid = document.getElementById('gallery-grid');
    galleryGrid.innerHTML = '';
    const galleryImages = (data.images && data.images.gallery) || [];
    for (let i = 0; i < 4; i++) {
        const imgUrl = galleryImages[i] || `https://picsum.photos/seed/galeri${i+1}/400/300`;
        const imgElement = document.createElement('img');
        imgElement.src = imgUrl;
        imgElement.alt = `Galeri ${i + 1}`;
        imgElement.className = 'rounded-lg shadow-lg w-full h-full object-cover';
        galleryGrid.appendChild(imgElement);
    }

    // 5. Render Product List
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    const products = data.products || [];
    const prices = data.prices || [];
    const templateStyle = data.templateStyle || 'Modern';

    // This is a simplified map. Real implementation has more varied HTML. This is a fallback.
    const cardClasses = {
        'Modern': "bg-gray-50 p-6 rounded-lg shadow-md", 'Elegan': "bg-white p-6 rounded-md border border-gray-200", 'Ceria': "bg-white p-6 rounded-2xl shadow-lg",
        'Minimalis': "border border-gray-200 p-6", 'Gelap': "bg-gray-800 border border-gray-700 p-6 rounded-lg text-white", 'Korporat': "bg-white p-6 rounded-lg border-l-4 border-theme shadow-sm",
        'Gradasi': "bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 text-white", 'Rustic': "bg-[#fdfbf7] border border-[#dcd8cf] p-6 rounded-md", 'Organik': "bg-white p-6 rounded-xl border border-gray-200 text-center",
        'Teknologi': "bg-slate-900/50 border border-slate-700 p-6 rounded-md text-white"
    };
    const cardClass = cardClasses[templateStyle] || cardClasses['Modern'];

    if (products.length > 0) {
        products.forEach((product, index) => {
            const rawPrice = prices[index] || 'Hubungi kami';
            const price = formatRupiah(rawPrice);
            const cardHtml = `
                <div class="${cardClass} transition hover:shadow-xl hover:-translate-y-1">
                    <h4 class="text-xl font-bold mb-2">${product}</h4>
                    <p class="text-lg font-semibold text-theme">${price}</p>
                </div>
            `;
            productList.innerHTML += cardHtml;
        });
    } else {
        productList.innerHTML = '<p class="text-center col-span-full">Belum ada produk yang ditambahkan.</p>';
    }

    // 6. Render Product Gallery
    const productGalleryGrid = document.getElementById('product-gallery-grid');
    if (productGalleryGrid) {
        productGalleryGrid.innerHTML = '';
        const productUrls = (data.productGalleryUrls || '').split('\n').map(url => url.trim()).filter(Boolean);
        if (productUrls.length > 0) {
            productUrls.forEach(url => {
                const itemHtml = `<div class="gallery-item"><img src="${url}" alt="Galeri Produk" loading="lazy" /></div>`;
                productGalleryGrid.innerHTML += itemHtml;
            });
        } else {
            productGalleryGrid.innerHTML = '<p class="text-center col-span-full">Belum ada gambar produk untuk ditampilkan.</p>';
        }
    }
}

// Re-render content when admin panel saves new data
window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) {
        renderContent();
    }
});

// Initial render
document.addEventListener('DOMContentLoaded', renderContent);
