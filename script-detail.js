/* GALERI DETAIL PRODUK - VIDEO + GAMBAR */
const mainProductImage = document.getElementById('main-product-image');
const mainProductVideo = document.getElementById('main-product-video');
const thumbnailTrack = document.getElementById('thumb-container');
const thumbnailWindow = document.getElementById('thumb-window');
const btnLeft = document.getElementById('scroll-left');
const btnRight = document.getElementById('scroll-right');

const semuaMedia = Array.from(document.querySelectorAll('.media-thumb, .thumb-img'));
const mediaUnik = [...new Set(semuaMedia)];

let detailIndex = Math.max(0, mediaUnik.findIndex(media => media.classList.contains('active')));
let thumbnailIndex = 0;
let touchStartX = 0;
let detailAutoTimer = null;
const detailAutoDelay = 3000;

function getMediaType(media) {
    if (!media) return 'image';
    return media.dataset.type === 'video' ? 'video' : 'image';
}

function getSlideWidth() {
    if (!thumbnailTrack) return 105;
    const firstThumb = thumbnailTrack.querySelector('.media-thumb, .thumb-img');
    if (!firstThumb) return 105;
    const style = window.getComputedStyle(thumbnailTrack);
    const gap = parseFloat(style.gap) || 15;
    return firstThumb.offsetWidth + gap;
}

function getVisibleImages() {
    if (!thumbnailTrack || !thumbnailWindow) return 4;
    const firstThumb = thumbnailTrack.querySelector('.media-thumb, .thumb-img');
    if (!firstThumb) return 4;
    const style = window.getComputedStyle(thumbnailTrack);
    const gap = parseFloat(style.gap) || 15;
    return Math.max(1, Math.floor(thumbnailWindow.offsetWidth / (firstThumb.offsetWidth + gap)));
}

function getMaxThumbnailIndex() {
    return Math.max(0, mediaUnik.length - getVisibleImages());
}

function updateThumbnailCarousel() {
    if (!thumbnailTrack) return;

    thumbnailIndex = Math.max(0, Math.min(thumbnailIndex, getMaxThumbnailIndex()));
    thumbnailTrack.style.transform = `translateX(-${thumbnailIndex * getSlideWidth()}px)`;

    if (btnLeft) {
        const sudahAwal = thumbnailIndex <= 0;
        btnLeft.style.opacity = sudahAwal ? '0.3' : '1';
        btnLeft.disabled = sudahAwal;
    }

    if (btnRight) {
        const sudahAkhir = thumbnailIndex >= getMaxThumbnailIndex();
        btnRight.style.opacity = sudahAkhir ? '0.3' : '1';
        btnRight.disabled = sudahAkhir;
    }
}

function hentikanAutoSlide() {
    if (!detailAutoTimer) return;
    clearInterval(detailAutoTimer);
    detailAutoTimer = null;
}

function tampilkanMedia(indexBaru, resetTimer = true) {
    if (!mediaUnik.length) return;

    if (indexBaru >= mediaUnik.length) indexBaru = 0;
    if (indexBaru < 0) indexBaru = mediaUnik.length - 1;

    detailIndex = indexBaru;
    const mediaAktif = mediaUnik[detailIndex];
    const tipeMedia = getMediaType(mediaAktif);

    mediaUnik.forEach(media => media.classList.remove('active'));
    mediaAktif.classList.add('active');

    if (tipeMedia === 'video') {
        if (mainProductImage) mainProductImage.style.display = 'none';

        if (mainProductVideo) {
            mainProductVideo.style.display = 'block';
            const videoSrc = mediaAktif.dataset.src;

            if (videoSrc && mainProductVideo.getAttribute('src') !== videoSrc) {
                mainProductVideo.src = videoSrc;
                mainProductVideo.load();
            }
        }

        hentikanAutoSlide();
    } else {
        if (mainProductVideo) {
            mainProductVideo.pause();

            try {
                mainProductVideo.currentTime = 0;
            } catch (error) {}

            mainProductVideo.style.display = 'none';
        }

        if (mainProductImage) {
            const sumberGambar = mediaAktif.currentSrc || mediaAktif.src || mediaAktif.dataset.src;
            if (sumberGambar) mainProductImage.src = sumberGambar;
            mainProductImage.style.display = 'block';
        }

        if (resetTimer) mulaiAutoSlideDetail();
    }

    const jumlahTerlihat = getVisibleImages();

    if (detailIndex < thumbnailIndex) {
        thumbnailIndex = detailIndex;
    } else if (detailIndex >= thumbnailIndex + jumlahTerlihat) {
        thumbnailIndex = detailIndex - jumlahTerlihat + 1;
    }

    updateThumbnailCarousel();
}

function mulaiAutoSlideDetail() {
    hentikanAutoSlide();
    if (mediaUnik.length <= 1) return;

    const mediaAktif = mediaUnik[detailIndex];
    if (!mediaAktif || getMediaType(mediaAktif) === 'video') return;

    detailAutoTimer = setInterval(() => {
        let indexBerikutnya = detailIndex + 1;
        let percobaan = 0;

        while (percobaan < mediaUnik.length) {
            if (indexBerikutnya >= mediaUnik.length) indexBerikutnya = 0;
            if (getMediaType(mediaUnik[indexBerikutnya]) === 'image') break;

            indexBerikutnya++;
            percobaan++;
        }

        if (getMediaType(mediaUnik[indexBerikutnya]) !== 'image') {
            hentikanAutoSlide();
            return;
        }

        tampilkanMedia(indexBerikutnya, false);
    }, detailAutoDelay);
}

/* KLIK THUMBNAIL */
mediaUnik.forEach((media, index) => {
    media.addEventListener('click', () => tampilkanMedia(index));
});

/* KOMPATIBILITAS HTML LAMA */
function gantiGambar(sumberGambarBaru, elemenThumb) {
    if (!elemenThumb) return;

    const indexKlik = mediaUnik.indexOf(elemenThumb);

    if (indexKlik !== -1) {
        tampilkanMedia(indexKlik);
        return;
    }

    if (mainProductImage) {
        mainProductImage.src = sumberGambarBaru;
        mainProductImage.style.display = 'block';
    }

    if (mainProductVideo) {
        mainProductVideo.pause();
        mainProductVideo.style.display = 'none';
    }
}

/* SETELAH VIDEO SELESAI */
if (mainProductVideo) {
    mainProductVideo.addEventListener('ended', () => {
        const gambarPertama = mediaUnik.findIndex(media => getMediaType(media) === 'image');
        if (gambarPertama !== -1) tampilkanMedia(gambarPertama);
    });
}

/* SWIPE MOBILE */
const mainMediaBox = document.querySelector('.main-image-box');

if (mainMediaBox) {
    mainMediaBox.addEventListener('touchstart', e => {
        if (e.target.closest('video')) return;
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    mainMediaBox.addEventListener('touchend', e => {
        if (mediaUnik[detailIndex] && getMediaType(mediaUnik[detailIndex]) === 'video') return;

        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) <= 40) return;

        if (diff > 0) tampilkanMedia(detailIndex + 1);
        else tampilkanMedia(detailIndex - 1);
    }, { passive: true });
}

/* PANAH THUMBNAIL */
if (btnLeft) {
    btnLeft.addEventListener('click', () => {
        thumbnailIndex--;
        updateThumbnailCarousel();
    });
}

if (btnRight) {
    btnRight.addEventListener('click', () => {
        thumbnailIndex++;
        updateThumbnailCarousel();
    });
}

/* RESPONSIVE */
window.addEventListener('resize', () => {
    thumbnailIndex = 0;
    updateThumbnailCarousel();
});

/* INISIALISASI GALERI */
if (mediaUnik.length) {
    tampilkanMedia(detailIndex, false);

    if (getMediaType(mediaUnik[detailIndex]) === 'image') {
        mulaiAutoSlideDetail();
    }
}

/* MOBILE MENU */
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');

    if (!mobileMenu || !navLinks || mobileMenu.dataset.menuReady) return;

    mobileMenu.dataset.menuReady = 'true';

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
});