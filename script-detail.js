/* GALERI DETAIL PRODUK */
function gantiGambar(sumberGambarBaru, elemenThumb) {
    const mainProductImage = document.getElementById('main-product-image');
    const semuaThumb = document.querySelectorAll('.thumb-img');

    if (!mainProductImage || !elemenThumb) return;

    mainProductImage.src = sumberGambarBaru;
    semuaThumb.forEach(img => img.classList.remove('active'));
    elemenThumb.classList.add('active');
}

const mainProductImage = document.getElementById('main-product-image');
let touchStartX = 0;

if (mainProductImage) {
    mainProductImage.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    mainProductImage.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        const allThumbs = Array.from(document.querySelectorAll('.thumb-img'));
        const activeIndex = allThumbs.findIndex(thumb => thumb.classList.contains('active'));

        if (Math.abs(diff) <= 40 || activeIndex === -1) return;

        const nextIndex = Math.max(0, Math.min(diff > 0 ? activeIndex + 1 : activeIndex - 1, allThumbs.length - 1));
        const nextThumb = allThumbs[nextIndex];

        if (nextThumb) {
            gantiGambar(nextThumb.src, nextThumb);
        }
    });
}

/* CAROUSEL THUMBNAIL DETAIL PRODUK */
const thumbnailTrack = document.getElementById('thumb-container');
const thumbnailWindow = document.getElementById('thumb-window');
const btnLeft = document.getElementById('scroll-left');
const btnRight = document.getElementById('scroll-right');

if (thumbnailTrack && thumbnailWindow && btnLeft && btnRight) {
    let index = 0;
    const totalImages = thumbnailTrack.querySelectorAll('.thumb-img').length;

    function getSlideWidth() {
        const firstThumb = thumbnailTrack.querySelector('.thumb-img');
        return firstThumb ? firstThumb.offsetWidth + 15 : 105;
    }

    function getVisibleImages() {
        const firstThumb = thumbnailTrack.querySelector('.thumb-img');
        return firstThumb ? Math.floor(thumbnailWindow.offsetWidth / (firstThumb.offsetWidth + 15)) : 4;
    }

    function getMaxIndex() {
        return Math.max(0, totalImages - getVisibleImages());
    }

    function updateThumbnailCarousel() {
        index = Math.min(index, getMaxIndex());
        thumbnailTrack.style.transform = `translateX(-${index * getSlideWidth()}px)`;
        btnLeft.style.opacity = index <= 0 ? '0.3' : '1';
        btnRight.style.opacity = index >= getMaxIndex() ? '0.3' : '1';
    }

    btnLeft.addEventListener('click', () => {
        if (index <= 0) return;
        index--;
        updateThumbnailCarousel();
    });

    btnRight.addEventListener('click', () => {
        if (index >= getMaxIndex()) return;
        index++;
        updateThumbnailCarousel();
    });

    window.addEventListener('resize', () => {
        index = 0;
        updateThumbnailCarousel();
    });

    updateThumbnailCarousel();
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