// File: script-detail.js

// 1. Fungsi Ganti Gambar Utama (Biarkan tetap ada)
function gantiGambar(sumberGambarBaru, elemenThumb) {
    document.getElementById('main-product-image').src = sumberGambarBaru;
    let semuaThumb = document.querySelectorAll('.thumb-img');
    semuaThumb.forEach(function(img) { img.classList.remove('active'); });
    elemenThumb.classList.add('active');
}

// ==========================================
// 2. FUNGSI BARU: CAROUSEL THUMBNAIL
// ==========================================

const track = document.getElementById('thumb-container'); // Kotak track yang panjang
const btnLeft = document.getElementById('scroll-left');
const btnRight = document.getElementById('scroll-right');

// Pastikan elemennya ada di halaman sebelum menjalankan rumus
if (track && btnLeft && btnRight) {
    
    // VARIABEL PENTING
    const imageWidth = 90;  // Lebar 1 gambar (sesuai CSS)
    const gap = 15;        // Jarak antar gambar (sesuai CSS)
    const slideWidth = imageWidth + gap; // Total lebar 1 slide (1 gambar + jarak) = 105 pixel

    // Kita akan memakai teknik "transform: translateX()" untuk menggeser.
    // Variabel index untuk melacak seberapa jauh kita telah bergeser ke kanan.
    let index = 0; 
    const totalImages = track.querySelectorAll('.thumb-img').length; // Total gambar (misal: 10)
    const visibleImages = 4; // Berapa gambar yang muat di jendela? (misal: 4)
    
    // Index maksimum yang bisa digeser adalah total gambar minus gambar yang terlihat.
    // Jika 10 gambar dan muat 4, kita bisa menggeser 6 kali.
    const maxIndex = totalImages - visibleImages;

    // Jika panah KIRI diklik
    btnLeft.addEventListener('click', function() {
        if (index > 0) { // Hanya geser jika kita sudah bergeser ke kanan
            index--; // Bergeser ke kiri 1 slide
            track.style.transform = `translateX(-${index * slideWidth}px)`; // Geser track
        }
    });

    // Jika panah KANAN diklik
    btnRight.addEventListener('click', function() {
        if (index < maxIndex) { // Hanya geser jika belum mencapai batas kanan
            index++; // Bergeser ke kanan 1 slide
            track.style.transform = `translateX(-${index * slideWidth}px)`; // Geser track
        }
    });
}