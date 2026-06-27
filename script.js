/* AOS */
if (window.AOS) {
    AOS.init({
        duration: 900,
        easing: 'ease-out-cubic',
        once: true,
        offset: 120,
        mirror: false
    });
}

/* MOBILE MENU */
const mobileMenuBtn = document.getElementById('mobileMenu');
const navLinksList = document.getElementById('navLinks');

if (mobileMenuBtn && navLinksList && !mobileMenuBtn.dataset.menuReady) {
    mobileMenuBtn.dataset.menuReady = 'true';

    mobileMenuBtn.addEventListener('click', () => {
        navLinksList.classList.toggle('active');
    });

    navLinksList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksList.classList.remove('active');
        });
    });
}

/* PRODUK UNGGULAN CAROUSEL */
const trackProduk = document.getElementById('autoTrack');
const viewportProduk = document.querySelector('.carousel-viewport');
const dotsProduk = document.querySelectorAll('#dotContainer .dot');

if (trackProduk && viewportProduk) {
    const totalSlideProduk = trackProduk.querySelectorAll('.carousel-slide').length || dotsProduk.length || 1;
    let slideSekarang = 0;
    let titikAwalGeser = 0;
    let sedangDigeser = false;
    let timerOtomatis = null;

    function pindahSlide(index) {
        slideSekarang = index;

        if (slideSekarang >= totalSlideProduk) slideSekarang = 0;
        if (slideSekarang < 0) slideSekarang = totalSlideProduk - 1;

        const pergeseran = -(slideSekarang * (100 / totalSlideProduk));
        trackProduk.style.transform = `translateX(${pergeseran}%)`;

        dotsProduk.forEach((dot, i) => {
            dot.classList.toggle('active', i === slideSekarang);
        });
    }

    function mulaiOtomatis() {
        if (totalSlideProduk <= 1) return;
        clearInterval(timerOtomatis);
        timerOtomatis = setInterval(() => {
            pindahSlide(slideSekarang + 1);
        }, 4000);
    }

    function hentikanOtomatis() {
        clearInterval(timerOtomatis);
    }

    function prosesGeser(titikAkhirGeser) {
        const selisihGeser = titikAwalGeser - titikAkhirGeser;

        if (selisihGeser > 50) {
            pindahSlide(slideSekarang + 1);
        } else if (selisihGeser < -50) {
            pindahSlide(slideSekarang - 1);
        } else {
            pindahSlide(slideSekarang);
        }

        mulaiOtomatis();
    }

    viewportProduk.addEventListener('mousedown', (e) => {
        titikAwalGeser = e.pageX;
        sedangDigeser = true;
        hentikanOtomatis();
    });

    window.addEventListener('mouseup', (e) => {
        if (!sedangDigeser) return;
        sedangDigeser = false;
        prosesGeser(e.pageX);
    });

    viewportProduk.addEventListener('touchstart', (e) => {
        titikAwalGeser = e.touches[0].pageX;
        hentikanOtomatis();
    });

    viewportProduk.addEventListener('touchend', (e) => {
        prosesGeser(e.changedTouches[0].pageX);
    });

    dotsProduk.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            hentikanOtomatis();
            pindahSlide(index);
            mulaiOtomatis();
        });
    });

    pindahSlide(0);
    mulaiOtomatis();
}

/* FILTER KATALOG PRODUK */
const filterButtons = document.querySelectorAll('.filter-btn');
const produkCards = document.querySelectorAll('.produk-card');

if (filterButtons.length && produkCards.length) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            produkCards.forEach(card => {
                const produkKategori = card.getAttribute('data-kategori');
                const tampilkanProduk = filterValue === 'All' || filterValue === produkKategori;
                card.classList.toggle('hide-produk', !tampilkanProduk);
            });
        });
    });
}

/* VIDEO DROPDOWN EDUKASI */
const pilihanVideo = document.getElementById('pilihanVideo');
const pemutarVideoUtama = document.getElementById('pemutarVideoUtama');

if (pilihanVideo && pemutarVideoUtama) {
    pilihanVideo.addEventListener('change', function() {
        const namaVideoBaru = this.value;
        const sourceElement = pemutarVideoUtama.querySelector('source');

        if (!sourceElement) return;

        sourceElement.setAttribute('src', namaVideoBaru);
        pemutarVideoUtama.load();
        pemutarVideoUtama.play();
    });
}

/* DATABASE FAQ */
const faqData = {
    categories: [
        { id: 'tentang-nadeem', label: 'Tentang Nadeem' },
        { id: 'produk', label: 'Spesifikasi Produk' },
        { id: 'pengiriman', label: 'Pemesanan & Pengiriman' }
    ],
    questions: {
        'tentang-nadeem': [
            {
                text: 'Apakah yang dimaksud dengan konsep "Your Praying Mate" dari Nadeem Indonesia?',
                answer: 'Nadeem Indonesia mengusung tagline "Your Praying Mate" sebagai komitmen kami untuk menjadi sahabat terbaik dalam perjalanan ibadah Anda. Konsep ini diwujudkan melalui penyediaan perlengkapan haji dan umrah yang praktis, ringan, dan multifungsi, guna meminimalkan beban fisik jemaah sehingga Anda dapat fokus beribadah dengan khusyuk dan nyaman selama di tanah suci.'
            },
            {
                text: 'Bagaimana Nadeem Indonesia memastikan kualitas dan ketahanan setiap produknya?',
                answer: 'Kami menerapkan standar kontrol kualitas yang ketat pada setiap lini produksi. Semua produk Nadeem diproduksi menggunakan material premium pilihan, seperti kain berdaya serap tinggi, komponen ritsleting yang kokoh, serta bahan tas water repellent guna memastikan ketahanan optimal dalam menghadapi berbagai kondisi cuaca di tanah suci.'
            },
            {
                text: 'Apakah produk-produk perlengkapan ibadah Nadeem Indonesia telah memiliki sertifikasi atau jaminan legalitas resmi?',
                answer: 'Ya. Seluruh aspek legalitas perusahaan dan sertifikasi bahan baku produk kami telah memenuhi standar regulasi yang berlaku di Indonesia untuk memastikan keamanan, kenyamanan, serta kesesuaian syariat pada produk tertentu (seperti kain ihram).'
            },
            {
                text: 'Apakah Nadeem Indonesia membuka peluang kemitraan berskala besar atau pengadaan produk untuk biro perjalanan (Travel Haji & Umrah)?',
                answer: 'Tentu saja. Kami membuka kesempatan kolaborasi dan pengadaan paket perlengkapan jemaah berskala besar untuk Travel Haji & Umrah maupun instansi korporat. Hubungi tim layanan pelanggan kami untuk mendapatkan informasi skema kemitraan, portofolio kerja sama, dan penawaran harga grosir khusus.'
            }
        ],
        produk: [
            {
                text: 'Apakah produk-produk dari Nadeem Indonesia memiliki fitur tahan air (waterproof)?',
                answer: 'Material produk kami bersifat water repellent (menolak air). Produk mampu menahan cipratan air atau hujan ringan dalam jumlah kecil, tetapi jika terkena air dalam jumlah besar atau direndam tetap bisa basah/merembes.'
            },
            {
                text: 'Bagaimana karakteristik material produk pakaian ibadah (seperti kain ihram) dari Nadeem Indonesia?',
                answer: 'Seluruh produk tekstil kami menggunakan bahan bersertifikasi yang mengutamakan kenyamanan maksimal di iklim ekstrem. Karakteristik bahannya memiliki daya serap keringat yang tinggi, sirkulasi udara yang baik (adem), tidak menerawang, serta tekstur kain yang lembut di kulit guna mencegah iritasi saat beribadah dalam waktu lama.'
            },
            {
                text: 'Bagaimana cara membersihkan dan merawat produk Nadeem Indonesia agar tahan lama?',
                answer: 'Seluruh produk kami dirancang menggunakan material berkualitas yang mudah dirawat. Untuk produk berbasis kain dan tas, cukup lap permukaan yang kotor menggunakan kain basah atau dicuci ringan. Untuk jenis produk lainnya (seperti kursi lipat atau alas matras), bersihkan menggunakan kain basah dan pastikan produk telah kering sepenuhnya sebelum disimpan kembali.'
            },
            {
                text: 'Apakah produk-produk Nadeem Indonesia dapat digunakan untuk aktivitas di luar ibadah haji dan umrah?',
                answer: 'Bisa. Meskipun dirancang secara khusus untuk mengutamakan kenyamanan selama ibadah haji dan umrah, karakteristik produk kami mengusung konsep praktis dan multifungsi. Oleh karena itu, produk-produk Nadeem tetap sangat relevan dan aman digunakan untuk keperluan traveling, mobilitas harian, maupun aktivitas luar ruangan lainnya.'
            }
        ],
        pengiriman: [
            {
                text: 'Apakah diperbolehkan melakukan perubahan varian warna atau alamat pengiriman setelah pesanan terjadwal?',
                answer: 'Jika Anda ingin mengubah varian, disarankan untuk melakukan pemesanan ulang (re-order). Apabila pesanan sudah terlanjur diserahkan ke pihak ekspedisi/kurir, maka data alamat maupun varian sudah tidak dapat diubah kembali.'
            },
            {
                text: 'Apakah pesanan yang telah diproses dapat dibatalkan secara sepihak?',
                answer: 'Pembatalan pesanan hanya dapat disetujui selama paket belum masuk ke dalam proses pengiriman. Mohon maaf, apabila paket sudah diserahkan ke pihak kurir ekspedisi, pesanan tersebut sudah tidak dapat dibatalkan.'
            },
            {
                text: 'Apakah terdapat jadwal pengiriman operasional pada hari Minggu atau hari libur nasional?',
                answer: 'Operasional pengiriman kami tidak aktif pada hari Minggu dan hari libur nasional. Seluruh pesanan yang masuk pada periode libur tersebut akan diprioritaskan untuk diproses dan dikirimkan pada hari kerja berikutnya.'
            },
            {
                text: 'Berapa batas waktu pembayaran agar pesanan dapat dikirimkan pada hari yang sama?',
                answer: 'Batas maksimal konfirmasi pembayaran agar pesanan dapat didistribusikan pada hari yang sama adalah pukul 15.00 WIB. Konfirmasi pembayaran yang diterima melewati batas waktu tersebut akan otomatis dialokasikan ke jadwal pengiriman hari berikutnya.'
            }
        ]
    }
};

/* FAQ INTERAKTIF */
const faqModal = document.getElementById('faqModal');
const faqSplash = document.getElementById('faqSplash');
const faqChatContainer = document.getElementById('faqChatContainer');
const faqChatBox = document.getElementById('faqChatBox');

function toggleFAQ() {
    if (!faqModal) return;
    faqModal.classList.toggle('active');
}

function scrollToBottom() {
    if (!faqChatBox) return;
    setTimeout(() => {
        faqChatBox.scrollTop = faqChatBox.scrollHeight;
    }, 50);
}

function addSystemMsg(text) {
    if (!faqChatBox) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg system-msg';
    msgDiv.innerHTML = text;
    faqChatBox.appendChild(msgDiv);
    scrollToBottom();
}

function addUserMsg(text) {
    if (!faqChatBox) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg user-msg';
    msgDiv.textContent = text;
    faqChatBox.appendChild(msgDiv);
    scrollToBottom();
}

function startFAQ() {
    if (!faqSplash || !faqChatContainer || !faqChatBox) return;

    faqSplash.style.display = 'none';
    faqChatContainer.style.display = 'flex';
    faqChatBox.innerHTML = '';

    addSystemMsg('Halo, Sobat Nadeem ðŸ‘‹<br>Ada yang bisa kami bantu?<br>Silakan pilih kategori pertanyaan di bawah ini ya.');
    showOptions(faqData.categories, handleCategorySelect);
}

function showOptions(optionsArray, callback) {
    if (!faqChatBox) return;

    const optionsWrapper = document.createElement('div');
    optionsWrapper.className = 'faq-options';

    optionsArray.forEach(option => {
        const btn = document.createElement('button');
        const label = typeof option === 'object' ? option.label : option;

        btn.className = 'faq-option-btn';
        btn.textContent = label;
        btn.addEventListener('click', () => {
            optionsWrapper.remove();
            callback(option);
        });

        optionsWrapper.appendChild(btn);
    });

    faqChatBox.appendChild(optionsWrapper);
    scrollToBottom();
}

function handleCategorySelect(categoryObj) {
    addUserMsg(categoryObj.label);

    setTimeout(() => {
        const daftarPertanyaan = faqData.questions[categoryObj.id] || [];
        const opsiPertanyaan = daftarPertanyaan.map(q => ({
            label: q.text,
            answer: q.answer
        }));

        addSystemMsg('Siap, kami bantu ya. Silakan pilih pertanyaan yang sesuai dengan kebutuhan sobat Nadeem.');
        showOptions(opsiPertanyaan, handleQuestionSelect);
    }, 500);
}

function handleQuestionSelect(questionObj) {
    addUserMsg(questionObj.label);

    setTimeout(() => {
        addSystemMsg(`${questionObj.answer}<br><br>Apakah ada pertanyaan lain?`);
        showOptions(['Ya', 'Tidak'], handleFollowUp);
    }, 600);
}

function handleFollowUp(choice) {
    addUserMsg(choice);

    setTimeout(() => {
        if (choice === 'Ya') {
            addSystemMsg('Silakan pilih kembali kategori pertanyaan Anda.');
            showOptions(faqData.categories, handleCategorySelect);
            return;
        }

        addSystemMsg('Baik, terima kasih Sobat Nadeem. Silakan hubungi kami kembali jika membutuhkan bantuan.');
        showContactCard();
    }, 500);
}

function showContactCard() {
    if (!faqChatBox) return;

    setTimeout(() => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'contact-card system-msg';
        cardDiv.innerHTML = `
            <p>Tidak menemukan jawaban? Chat admin untuk informasi lebih lanjut.</p>
            <a href="https://wa.me/6282123984418" target="_blank" class="btn-wa">Hubungi via Whatsapp</a>
        `;
        faqChatBox.appendChild(cardDiv);
        scrollToBottom();
    }, 800);
}

/* VALIDASI FORM KONTAK */
const contactForm = document.querySelector('.form-hubungi-kami');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        const requiredFields = [
            { id: 'nama_depan', label: 'Nama Depan' },
            { id: 'nama_belakang', label: 'Nama Belakang' },
            { id: 'email', label: 'Email' },
            { id: 'nomor_kontak', label: 'Nomor Kontak' },
            { id: 'pesan', label: 'Pesan' }
        ];

        const emptyFields = requiredFields.filter(({ id }) => {
            const field = document.getElementById(id);
            return !field || !field.value.trim();
        });

        if (!emptyFields.length) return;

        event.preventDefault();
        const fieldNames = emptyFields.map(({ label }) => label).join(', ');
        alert(`Mohon isi bagian yang masih kosong terlebih dahulu: ${fieldNames}`);
    });
}