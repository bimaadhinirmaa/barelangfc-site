<<<<<<< HEAD
// Objek teks untuk setiap bahasa
const translations = {
    id: {
        home: "BERANDA",
        news: "BERITA",
        team: "TIM",
        robot: "ROBOT",
        achievements: "PENCAPAIAN",
        contact: "KONTAK",
        welcome: "Selamat Datang di Tim Barelang FC",
        description: "Ini adalah tim penelitian robot humanoid"
    },
    en: {
        home: "HOME",
        news: "NEWS",
        team: "TEAM",
        robot: "ROBOT",
        achievements: "ACHIEVEMENTS",
        contact: "CONTACT",
        welcome: "Welcome to Barelang FC Team",
        description: "This is a team humanoid robot research"
    }
};

// Fungsi untuk mengubah bahasa
function changeLanguage(lang) {
    const elements = document.querySelectorAll("[data-lang]");
    elements.forEach(element => {
        const key = element.getAttribute("data-lang");
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        } else {
            console.warn(`Terjemahan untuk kunci "${key}" tidak ditemukan.`);
        }
    });
}

// Fungsi untuk mengganti bahasa dan bendera
function toggleLanguageAndFlag() {
    const activeFlag = document.getElementById("flag-active");
    const currentLang = activeFlag.getAttribute("data-lang");
    const newLang = currentLang === "id" ? "en" : "id";

    changeLanguage(newLang); // Tidak perlu mengulang logika

    // Update bendera
    const flagDetails = {
        id: { src: "assets/indonesia flag.png", alt: "ID" },
        en: { src: "assets/english flag.jpeg", alt: "EN" }
    };
    activeFlag.setAttribute("src", flagDetails[newLang].src);
    activeFlag.setAttribute("alt", flagDetails[newLang].alt);
    activeFlag.setAttribute("data-lang", newLang);
}

// Event listener untuk bendera aktif
document.getElementById("flag-active").addEventListener("click", toggleLanguageAndFlag);

// Smooth scrolling untuk navigasi menu
document.querySelectorAll('.nav-menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').substring(1); // Mengambil ID tujuan (tanpa #)

        // Cek apakah itu link eksternal
        const isExternalLink = this.hasAttribute('target') && this.getAttribute('target') === '_blank';

        if (isExternalLink) {
            // Jika link eksternal, biarkan browser membuka halaman baru
            return;
        }

        // Mencegah navigasi default
        e.preventDefault();

        // Cek apakah target section ada di halaman
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Jika ada target section, lakukan smooth scroll ke bagian tersebut
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start' // Posisi scroll di atas (start) target
            });
        } else {
            // Jika target section tidak ditemukan, beri tahu pengguna
            console.warn(`Target dengan ID "${targetId}" tidak ditemukan.`);
        }
    });
});

// Fungsi untuk menampilkan loading
function showLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'flex'; // Tampilkan loading
    } else {
        console.error('Elemen loading tidak ditemukan!');
    }
}

// Fungsi untuk menyembunyikan loading
function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'none'; // Sembunyikan loading
    } else {
        console.error('Elemen loading tidak ditemukan!');
    }
}

// Mengatur efek loading saat navigasi menu navbar
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Mencegah navigasi default

        // Tampilkan loading
        showLoading();

        const targetUrl = this.getAttribute('href'); // Ambil URL target

        // Tunda 2 detik sebelum berpindah halaman
        setTimeout(() => {
            window.location.href = targetUrl; // Navigasi ke halaman target
        }, 1500); // 1.5 detik delay
    });
});

// Fungsi untuk membaca file berita ketika tombol "Read More" diklik
document.querySelectorAll('.read-more-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const fileName = `berita${index + 1}.html`; // berita1.html, berita2.html, dst.
        window.location.href = fileName; // Navigasi ke file berita
    });
});

// Variabel global untuk menyimpan indeks slide saat ini dan jumlah item yang akan ditampilkan
let currentIndex = 0;
let itemsPerView = 3;  // Default jumlah item yang ditampilkan (untuk desktop)
const carouselWrapper = document.querySelector('.carousel-wrapper');
const carouselItems = document.querySelectorAll('.carousel-item');
const totalItems = carouselItems.length;  // Total item dalam carousel

// Fungsi untuk mengupdate posisi carousel
function updateCarousel() {
    const offset = -(currentIndex * (100 / itemsPerView)); // Hitung offset berdasarkan jumlah item per tampilan
    carouselWrapper.style.transform = `translateX(${offset}%)`;
    carouselWrapper.style.transition = "transform 0.5s ease"; // Efek smooth scroll

    // Menyembunyikan atau menampilkan tombol navigasi sesuai dengan posisi slide
    document.getElementById('prev').disabled = currentIndex === 0;  // Nonaktifkan tombol prev jika di awal
    document.getElementById('next').disabled = currentIndex >= totalItems - itemsPerView;  // Nonaktifkan tombol next jika di akhir
}

// Fungsi untuk berpindah ke slide berikutnya
function nextSlide() {
    if (currentIndex < totalItems - itemsPerView) {
        currentIndex++;
        updateCarousel();
    }
}

// Fungsi untuk berpindah ke slide sebelumnya
function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
}

// Mengatur perpindahan otomatis setiap 3 detik
function autoSlide() {
    setInterval(() => {
        if (currentIndex < totalItems - itemsPerView) {
            nextSlide();
        } else {
            currentIndex = 0; // Reset ke awal jika sudah sampai akhir
            updateCarousel();
        }
    }, 3000); // Setiap 3 detik
}

// Event listener untuk tombol navigasi (next dan prev)
document.getElementById('next').addEventListener('click', nextSlide);
document.getElementById('prev').addEventListener('click', prevSlide);

// Menjalankan perpindahan otomatis
autoSlide();

// Memanggil updateCarousel pada awal untuk menyesuaikan posisi carousel
updateCarousel();

// Responsif terhadap ukuran layar (resize event)
window.addEventListener('resize', () => {
    const screenWidth = window.innerWidth; // Mengambil lebar layar saat ini

    // Menyesuaikan jumlah item yang ditampilkan berdasarkan lebar layar
    if (screenWidth < 768) {
        itemsPerView = 1; // 1 item untuk mobile
    } else if (screenWidth < 1024) {
        itemsPerView = 2; // 2 item untuk tablet
    } else {
        itemsPerView = 3; // 3 item untuk desktop
    }

    updateCarousel(); // Perbarui posisi carousel setelah perubahan ukuran layar
});

// Fungsi untuk mengubah jumlah item yang terlihat saat ukuran layar berubah
function setItemsPerView() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
        return 1; // 1 item untuk mobile
    } else if (screenWidth < 1024) {
        return 2; // 2 item untuk tablet
    } else {
        return 3; // 3 item untuk desktop
    }
}

// Kontrol Music Play/Pause
document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById('background-music');
    
});
=======
// Objek teks untuk setiap bahasa
const translations = {
    id: {
        home: "BERANDA",
        news: "BERITA",
        team: "TIM",
        robot: "ROBOT",
        achievements: "PENCAPAIAN",
        contact: "KONTAK",
        welcome: "Selamat Datang di Tim Barelang FC",
        description: "Ini adalah tim penelitian robot humanoid"
    },
    en: {
        home: "HOME",
        news: "NEWS",
        team: "TEAM",
        robot: "ROBOT",
        achievements: "ACHIEVEMENTS",
        contact: "CONTACT",
        welcome: "Welcome to Barelang FC Team",
        description: "This is a team humanoid robot research"
    }
};

// Fungsi untuk mengubah bahasa
function changeLanguage(lang) {
    const elements = document.querySelectorAll("[data-lang]");
    elements.forEach(element => {
        const key = element.getAttribute("data-lang");
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        } else {
            console.warn(`Terjemahan untuk kunci "${key}" tidak ditemukan.`);
        }
    });
}

// Fungsi untuk mengganti bahasa dan bendera
function toggleLanguageAndFlag() {
    const activeFlag = document.getElementById("flag-active");
    const currentLang = activeFlag.getAttribute("data-lang");
    const newLang = currentLang === "id" ? "en" : "id";

    changeLanguage(newLang); // Tidak perlu mengulang logika

    // Update bendera
    const flagDetails = {
        id: { src: "assets/indonesia flag.png", alt: "ID" },
        en: { src: "assets/english flag.jpeg", alt: "EN" }
    };
    activeFlag.setAttribute("src", flagDetails[newLang].src);
    activeFlag.setAttribute("alt", flagDetails[newLang].alt);
    activeFlag.setAttribute("data-lang", newLang);
}

// Event listener untuk bendera aktif
document.getElementById("flag-active").addEventListener("click", toggleLanguageAndFlag);

// Smooth scrolling untuk navigasi menu
document.querySelectorAll('.nav-menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').substring(1); // Mengambil ID tujuan (tanpa #)

        // Cek apakah itu link eksternal
        const isExternalLink = this.hasAttribute('target') && this.getAttribute('target') === '_blank';

        if (isExternalLink) {
            // Jika link eksternal, biarkan browser membuka halaman baru
            return;
        }

        // Mencegah navigasi default
        e.preventDefault();

        // Cek apakah target section ada di halaman
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Jika ada target section, lakukan smooth scroll ke bagian tersebut
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start' // Posisi scroll di atas (start) target
            });
        } else {
            // Jika target section tidak ditemukan, beri tahu pengguna
            console.warn(`Target dengan ID "${targetId}" tidak ditemukan.`);
        }
    });
});

// Fungsi untuk menampilkan loading
function showLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'flex'; // Tampilkan loading
    } else {
        console.error('Elemen loading tidak ditemukan!');
    }
}

// Fungsi untuk menyembunyikan loading
function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'none'; // Sembunyikan loading
    } else {
        console.error('Elemen loading tidak ditemukan!');
    }
}

// Mengatur efek loading saat navigasi menu navbar
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Mencegah navigasi default

        // Tampilkan loading
        showLoading();

        const targetUrl = this.getAttribute('href'); // Ambil URL target

        // Tunda 2 detik sebelum berpindah halaman
        setTimeout(() => {
            window.location.href = targetUrl; // Navigasi ke halaman target
        }, 1500); // 1.5 detik delay
    });
});

// Fungsi untuk membaca file berita ketika tombol "Read More" diklik
document.querySelectorAll('.read-more-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const fileName = `berita${index + 1}.html`; // berita1.html, berita2.html, dst.
        window.location.href = fileName; // Navigasi ke file berita
    });
});

// Variabel global untuk menyimpan indeks slide saat ini dan jumlah item yang akan ditampilkan
let currentIndex = 0;
let itemsPerView = 3;  // Default jumlah item yang ditampilkan (untuk desktop)
const carouselWrapper = document.querySelector('.carousel-wrapper');
const carouselItems = document.querySelectorAll('.carousel-item');
const totalItems = carouselItems.length;  // Total item dalam carousel

// Fungsi untuk mengupdate posisi carousel
function updateCarousel() {
    const offset = -(currentIndex * (100 / itemsPerView)); // Hitung offset berdasarkan jumlah item per tampilan
    carouselWrapper.style.transform = `translateX(${offset}%)`;
    carouselWrapper.style.transition = "transform 0.5s ease"; // Efek smooth scroll

    // Menyembunyikan atau menampilkan tombol navigasi sesuai dengan posisi slide
    document.getElementById('prev').disabled = currentIndex === 0;  // Nonaktifkan tombol prev jika di awal
    document.getElementById('next').disabled = currentIndex >= totalItems - itemsPerView;  // Nonaktifkan tombol next jika di akhir
}

// Fungsi untuk berpindah ke slide berikutnya
function nextSlide() {
    if (currentIndex < totalItems - itemsPerView) {
        currentIndex++;
        updateCarousel();
    }
}

// Fungsi untuk berpindah ke slide sebelumnya
function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
}

// Mengatur perpindahan otomatis setiap 3 detik
function autoSlide() {
    setInterval(() => {
        if (currentIndex < totalItems - itemsPerView) {
            nextSlide();
        } else {
            currentIndex = 0; // Reset ke awal jika sudah sampai akhir
            updateCarousel();
        }
    }, 3000); // Setiap 3 detik
}

// Event listener untuk tombol navigasi (next dan prev)
document.getElementById('next').addEventListener('click', nextSlide);
document.getElementById('prev').addEventListener('click', prevSlide);

// Menjalankan perpindahan otomatis
autoSlide();

// Memanggil updateCarousel pada awal untuk menyesuaikan posisi carousel
updateCarousel();

// Responsif terhadap ukuran layar (resize event)
window.addEventListener('resize', () => {
    const screenWidth = window.innerWidth; // Mengambil lebar layar saat ini

    // Menyesuaikan jumlah item yang ditampilkan berdasarkan lebar layar
    if (screenWidth < 768) {
        itemsPerView = 1; // 1 item untuk mobile
    } else if (screenWidth < 1024) {
        itemsPerView = 2; // 2 item untuk tablet
    } else {
        itemsPerView = 3; // 3 item untuk desktop
    }

    updateCarousel(); // Perbarui posisi carousel setelah perubahan ukuran layar
});

// Fungsi untuk mengubah jumlah item yang terlihat saat ukuran layar berubah
function setItemsPerView() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
        return 1; // 1 item untuk mobile
    } else if (screenWidth < 1024) {
        return 2; // 2 item untuk tablet
    } else {
        return 3; // 3 item untuk desktop
    }
}

// Kontrol Music Play/Pause
document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById('background-music');
    
});
>>>>>>> aabccaefaa1f2772ee041d0753d27547226c5235
