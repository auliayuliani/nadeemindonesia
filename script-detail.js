/* GALERI DETAIL PRODUK + AUTO SLIDE */
const mainProductImage = document.getElementById('main-product-image');
const semuaThumb = Array.from(document.querySelectorAll('.thumb-img'));


const thumbnailTrack = document.getElementById('thumb-container');
const thumbnailWindow = document.getElementById('thumb-window');
const btnLeft = document.getElementById('scroll-left');
const btnRight = document.getElementById('scroll-right');


let detailIndex = Math.max(0, semuaThumb.findIndex(thumb => thumb.classList.contains('active')));
let thumbnailIndex = 0;
let touchStartX = 0;
let detailAutoTimer = null;


const detailAutoDelay = 3000; // 3000 = 3 detik


function getSlideWidth() {
    const firstThumb = thumbnailTrack ? thumbnailTrack.querySelector('.thumb-img') : null;
    return firstThumb ? firstThumb.offsetWidth + 15 : 105;
}


function getVisibleImages() {
    const firstThumb = thumbnailTrack ? thumbnailTrack.querySelector('.thumb-img') : null;
    return firstThumb && thumbnailWindow
        ? Math.floor(thumbnailWindow.offsetWidth / (firstThumb.offsetWidth + 15))
        : 4;
}


function getMaxThumbnailIndex() {
    return Math.max(0, semuaThumb.length - getVisibleImages());
}


function updateThumbnailCarousel() {
    if (!thumbnailTrack || !btnLeft || !btnRight) return;


    thumbnailIndex = Math.max(0, Math.min(thumbnailIndex, getMaxThumbnailIndex()));


    thumbnailTrack.style.transform = `translateX(-${thumbnailIndex * getSlideWidth()}px)`;


    btnLeft.style.opacity = thumbnailIndex <= 0 ? '0.3' : '1';
    btnRight.style.opacity = thumbnailIndex >= getMaxThumbnailIndex() ? '0.3' : '1';
}


function tampilkanGambarDetail(indexBaru, resetTimer = true) {
    if (!mainProductImage || !semuaThumb.length) return;


    if (indexBaru >= semuaThumb.length) indexBaru = 0;
    if (indexBaru < 0) indexBaru = semuaThumb.length - 1;


    detailIndex = indexBaru;


    const thumbAktif = semuaThumb[detailIndex];


    mainProductImage.src = thumbAktif.src;


    semuaThumb.forEach(thumb => thumb.classList.remove('active'));
    thumbAktif.classList.add('active');


    const jumlahTerlihat = getVisibleImages();


    if (detailIndex < thumbnailIndex) {
        thumbnailIndex = detailIndex;
    }


    if (detailIndex >= thumbnailIndex + jumlahTerlihat) {
        thumbnailIndex = detailIndex - jumlahTerlihat + 1;
    }


    updateThumbnailCarousel();


    if (resetTimer) {
        mulaiAutoSlideDetail();
    }
}


function gantiGambar(sumberGambarBaru, elemenThumb) {
    const indexKlik = semuaThumb.indexOf(elemenThumb);


    if (indexKlik !== -1) {
        tampilkanGambarDetail(indexKlik);
        return;
    }


    if (!mainProductImage || !elemenThumb) return;


    mainProductImage.src = sumberGambarBaru;
    semuaThumb.forEach(img => img.classList.remove('active'));
    elemenThumb.classList.add('active');


    mulaiAutoSlideDetail();
}


function mulaiAutoSlideDetail() {
    if (detailAutoTimer) {
        clearInterval(detailAutoTimer);
    }


    if (semuaThumb.length <= 1) return;


    detailAutoTimer = setInterval(() => {
        tampilkanGambarDetail(detailIndex + 1, false);
    }, detailAutoDelay);
}


if (mainProductImage && semuaThumb.length) {
    mainProductImage.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });


    mainProductImage.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;


        if (Math.abs(diff) <= 40) return;


        if (diff > 0) {
            tampilkanGambarDetail(detailIndex + 1);
        } else {
            tampilkanGambarDetail(detailIndex - 1);
        }
    });


    semuaThumb.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            tampilkanGambarDetail(index);
        });
    });


    tampilkanGambarDetail(detailIndex, false);
    mulaiAutoSlideDetail();
}


if (btnLeft) {
    btnLeft.addEventListener('click', () => {
        thumbnailIndex--;
        updateThumbnailCarousel();
        mulaiAutoSlideDetail();
    });
}


if (btnRight) {
    btnRight.addEventListener('click', () => {
        thumbnailIndex++;
        updateThumbnailCarousel();
        mulaiAutoSlideDetail();
    });
}


window.addEventListener('resize', () => {
    thumbnailIndex = 0;
    updateThumbnailCarousel();
});


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

