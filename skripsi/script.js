// Inisialisasi efek animasi AOS
AOS.init({
    duration: 900,
    easing: 'ease-out-cubic',
    once: true,
    offset: 120,
    mirror: false
});

// Sisa kode script.js milikmu di bawahnya...

// === JAVASCRIPT PRODUK UNGGULAN === //

// 1. Ambil elemen dari HTML
const trackProduk = document.getElementById('autoTrack');
const viewportProduk = document.getElementById('viewport');
// Ambil titik-titik (dots) khusus yang ada di dalam dotContainer
const dotsProduk = document.querySelectorAll('#dotContainer .dot');

// 2. Variabel Pengaturan
let slideSekarang = 0;
const totalSlideProduk = 4;
let titikAwalGeser = 0;
let sedangDigeser = false;
let timerOtomatis;

// 3. Fungsi Utama untuk Memindahkan Slide
function pindahSlide(index) {
    slideSekarang = index;
    
    // Jika lewat dari slide terakhir, balik ke awal
    if (slideSekarang >= totalSlideProduk) slideSekarang = 0;
    // Jika geser ke kiri dari slide pertama, pergi ke slide terakhir
    if (slideSekarang < 0) slideSekarang = totalSlideProduk - 1;

    // Hitung pergeseran (1 slide = 25% dari total panjang track)
    const pergeseran = -(slideSekarang * 25);
    
    // Geser gambarnya
    if (trackProduk) {
        trackProduk.style.transform = `translateX(${pergeseran}%)`;
    }

    // Update warna bulet-bulet (dots)
    if (dotsProduk.length > 0) {
        dotsProduk.forEach((dot, i) => {
            if (i === slideSekarang) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

// 4. Fungsi Menyalakan & Mematikan Geser Otomatis
function mulaiOtomatis() {
    timerOtomatis = setInterval(() => {
        pindahSlide(slideSekarang + 1);
    }, 4000); // Geser otomatis setiap 4 detik
}

function hentikanOtomatis() {
    clearInterval(timerOtomatis);
}

// 5. Logika Geser Manual Pakai Mouse (Di Komputer/Laptop)
if (viewportProduk) {
    viewportProduk.addEventListener('mousedown', (e) => {
        titikAwalGeser = e.pageX;
        sedangDigeser = true;
        hentikanOtomatis(); // Stop otomatis saat user mau geser sendiri
    });

    window.addEventListener('mouseup', (e) => {
        if (!sedangDigeser) return;
        sedangDigeser = false;
        
        const titikAkhirGeser = e.pageX;
        const selisihGeser = titikAwalGeser - titikAkhirGeser;

        // Jika digeser cukup jauh (lebih dari 50px)
        if (selisihGeser > 50) {
            pindahSlide(slideSekarang + 1); // Geser Kanan
        } else if (selisihGeser < -50) {
            pindahSlide(slideSekarang - 1); // Geser Kiri
        } else {
            pindahSlide(slideSekarang); // Balik ke posisi semula jika geser terlalu pelan
        }
        
        mulaiOtomatis(); // Nyalakan lagi geser otomatisnya
    });

    // 6. Logika Geser Manual Pakai Jari (Di Layar HP)
    viewportProduk.addEventListener('touchstart', (e) => {
        titikAwalGeser = e.touches[0].pageX;
        hentikanOtomatis();
    });

    viewportProduk.addEventListener('touchend', (e) => {
        const titikAkhirGeser = e.changedTouches[0].pageX;
        const selisihGeser = titikAwalGeser - titikAkhirGeser;

        if (selisihGeser > 50) pindahSlide(slideSekarang + 1);
        else if (selisihGeser < -50) pindahSlide(slideSekarang - 1);
        else pindahSlide(slideSekarang);

        mulaiOtomatis();
    });
}

// 7. Klik Bulet-Bulet untuk pindah slide
if (dotsProduk.length > 0) {
    dotsProduk.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            hentikanOtomatis();
            pindahSlide(index);
            mulaiOtomatis();
        });
    });
}

// 8. Nyalakan pertama kali saat web dibuka
pindahSlide(0);
mulaiOtomatis();


// =========================================
// FITUR FILTER KATALOG PRODUK
// =========================================

// 1. Ambil semua tombol filter dan semua kartu produk
const filterButtons = document.querySelectorAll('.filter-btn');
const produkCards = document.querySelectorAll('.produk-card');

// 2. Tambahkan aksi 'klik' pada setiap tombol
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        // Hapus class 'active' (warna cokelat) dari semua tombol
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Tambahkan class 'active' hanya ke tombol yang baru saja diklik
        button.classList.add('active');

        // Ambil label kategori dari tombol yang diklik (misal: 'tas', 'buku', 'semua')
        const filterValue = button.getAttribute('data-filter');

        // Cek setiap produk satu per satu
        produkCards.forEach(card => {
            // Ambil label kategori dari produk tersebut
            const produkKategori = card.getAttribute('data-kategori');

            // Jika filter yang dipilih adalah 'All' ATAU kategori produk cocok dengan filter
            if (filterValue === 'All' || filterValue === produkKategori) {
                card.classList.remove('hide-produk'); // Tampilkan produk
            } else {
                card.classList.add('hide-produk'); // Sembunyikan produk
            }
        });
    });
});

// =========================================
// SCRIPT HALAMAN EDUKASI - VIDEO DROPDOWN
// =========================================

// Menangani perubahan video saat dropdown berubah
const pilihanVideo = document.getElementById('pilihanVideo');
const pemutarVideoUtama = document.getElementById('pemutarVideoUtama');

if (pilihanVideo && pemutarVideoUtama) {
    // Event saat user memilih option di dropdown
    pilihanVideo.addEventListener('change', function() {
        const namaVideoBarau = this.value;
        const sourceElement = pemutarVideoUtama.querySelector('source');
        
        // Ubah src pada element <source>
        sourceElement.setAttribute('src', namaVideoBarau);
        
        // Reload video
        pemutarVideoUtama.load();
        pemutarVideoUtama.play();
    });
}


/* ================= DATABASE FAQ ================= */
const faqData = {
    categories: [
        { id: 'tentang-nadeem', label: 'Tentang Nadeem' }, // Kategori Baru
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
        'produk': [
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
        'pengiriman': [
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

/* ================= LOGIKA INTERAKTIF FAQ ================= */
const faqModal = document.getElementById('faqModal');
const faqSplash = document.getElementById('faqSplash');
const faqChatContainer = document.getElementById('faqChatContainer');
const faqChatBox = document.getElementById('faqChatBox');

// Buka / Tutup Modal
function toggleFAQ() {
    faqModal.classList.toggle('active');
}

// Scroll otomatis ke bawah chat
function scrollToBottom() {
    setTimeout(() => {
        faqChatBox.scrollTop = faqChatBox.scrollHeight;
    }, 50);
}

// Render Bubble Chat System
function addSystemMsg(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg system-msg';
    msgDiv.innerHTML = text;
    faqChatBox.appendChild(msgDiv);
    scrollToBottom();
}

// Render Bubble Chat User
function addUserMsg(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg user-msg';
    msgDiv.innerHTML = text;
    faqChatBox.appendChild(msgDiv);
    scrollToBottom();
}

// Mulai FAQ (Dari tombol Splash atau Reset)
function startFAQ() {
    faqSplash.style.display = 'none';
    faqChatContainer.style.display = 'flex';
    faqChatBox.innerHTML = ''; // Bersihkan chat sebelumnya
    
    // Pesan sapaan pertama
    addSystemMsg("Halo, Sobat Nadeem 👋<br>Ada yang bisa kami bantu?<br>Silakan pilih kategori pertanyaan di bawah ini ya.");
    
    // Tampilkan tombol Kategori
    showOptions(faqData.categories, handleCategorySelect);
}

// Tampilkan tombol opsi (pilihan)
function showOptions(optionsArray, callback) {
    const optionsWrapper = document.createElement('div');
    optionsWrapper.className = 'faq-options';

    optionsArray.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'faq-option-btn';
        // option bisa berupa object {id, label} atau string biasa
        const label = typeof option === 'object' ? option.label : option;
        btn.innerHTML = label;
        
        btn.onclick = () => {
            // Hapus tombol opsi setelah dipilih
            optionsWrapper.remove();
            // Lanjutkan ke callback (langkah berikutnya)
            callback(option);
        };
        optionsWrapper.appendChild(btn);
    });

    faqChatBox.appendChild(optionsWrapper);
    scrollToBottom();
}

// Saat kategori dipilih
function handleCategorySelect(categoryObj) {
    addUserMsg(categoryObj.label);
    
    setTimeout(() => {
        addSystemMsg("Siap, kami bantu ya. Silakan pilih pertanyaan yang sesuai dengan kebutuhan sobat Nadeem.");
        
        // Ambil daftar pertanyaan sesuai kategori (konversi text jadi label untuk fungsi showOptions)
        const qList = faqData.questions[categoryObj.id].map(q => ({
            label: q.text,
            answer: q.answer
        }));
        
        showOptions(qList, handleQuestionSelect);
    }, 500);
}

// Saat pertanyaan dipilih
function handleQuestionSelect(questionObj) {
    addUserMsg(questionObj.label);
    
    setTimeout(() => {
        addSystemMsg(`${questionObj.answer}<br><br>Apakah ada pertanyaan lain?`);
        // Opsi Ya / Tidak
        showOptions(["Ya", "Tidak"], handleFollowUp);
    }, 600);
}

// Penanganan setelah pertanyaan "Apakah ada pertanyaan lain?"
function handleFollowUp(choice) {
    addUserMsg(choice);
    
    setTimeout(() => {
        if(choice === "Ya") {
            addSystemMsg("Silakan pilih kembali kategori pertanyaan Anda.");
            showOptions(faqData.categories, handleCategorySelect);
        } else {
            addSystemMsg("Baik, terima kasih Sobat Nadeem. Silakan hubungi kami kembali jika membutuhkan bantuan.");
            showContactCard();
        }
    }, 500);
}

// Tampilkan Kartu Kontak Admin
function showContactCard() {
    setTimeout(() => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'contact-card system-msg'; // Mewarisi style animasi system-msg
        cardDiv.innerHTML = `
            <p>Tidak menemukan jawaban? Chat admin untuk informasi lebih lanjut.</p>
            <a href="https://wa.me/6282123984418" target="_blank" class="btn-wa">Hubungi via Whatsapp</a>
        `;
        faqChatBox.appendChild(cardDiv);
        scrollToBottom();
    }, 800);
}

// =========================================
// VALIDASI FORM KONTAK
// =========================================
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

        if (emptyFields.length > 0) {
            event.preventDefault();
            const fieldNames = emptyFields.map(({ label }) => label).join(', ');
            alert(`Mohon isi bagian yang masih kosong terlebih dahulu: ${fieldNames}`);
        }
    });
}