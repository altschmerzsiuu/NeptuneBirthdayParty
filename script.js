// ========================================
// INITIALIZE: Create particles and clouds
// ========================================
function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = -20 + 'px';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 8) + 's';
        container.appendChild(particle);
    }
}

function createClouds() {
    const container = document.getElementById('clouds');
    for (let i = 0; i < 8; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.top = (Math.random() * 60 + 10) + '%';
        cloud.style.width = (150 + Math.random() * 200) + 'px';
        cloud.style.height = (60 + Math.random() * 80) + 'px';
        cloud.style.animationDelay = Math.random() * 60 + 's';
        cloud.style.animationDuration = (40 + Math.random() * 40) + 's';
        container.appendChild(cloud);
    }
}

// ========================================
// PAGE 1: FORM VALIDATION
// ========================================
const entryForm = document.getElementById('entryForm');

entryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const anniversary = document.getElementById('anniversary').value;
    
    // Validate all fields are filled
    if (name && age && anniversary) {
        // Store data (optional - for personalization)
        sessionStorage.setItem('userName', name);
        sessionStorage.setItem('userAge', age);
        sessionStorage.setItem('anniversary', anniversary);
        
        // Scroll to next page
        // Scroll to the landing section (Happy Birthday) as requested
        const landing = document.getElementById('landing');
        if (landing) {
            landing.scrollIntoView({ behavior: 'smooth' });
        } else {
            document.getElementById('page2').scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        alert('Please fill in all fields! 💜');
    }
});

// ========================================
// PAGE 3: PUZZLE GAME (4x4 = 16 pieces)
// ========================================

// 🧩 GANTI 'URL_FOTO_PUZZLE' dengan link foto untuk puzzle
const PUZZLE_IMAGE = 'ara1.jpg';

let puzzlePieces = [];
let selectedPiece = null;

function initPuzzle() {
    const board = document.getElementById('puzzleBoard');
    if (!board) return;
    
    const GRID_COLS = 4;  // 8 kolom
    const GRID_ROWS = 4;
    const TOTAL_PIECES = GRID_COLS * GRID_ROWS; // = 32

    for (let i = 0; i < TOTAL_PIECES; i++) {
        puzzlePieces.push(i);
    }
    
    // Shuffle pieces
    puzzlePieces = shuffleArray(puzzlePieces);
    
    // Create puzzle pieces
    puzzlePieces.forEach((position, index) => {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.dataset.correctPosition = position;
        piece.dataset.currentIndex = index;
        
        // Calculate background position for this piece
        const row = Math.floor(position / GRID_COLS);
        const col = position % GRID_COLS;
        
        piece.style.backgroundImage = `url('${PUZZLE_IMAGE}')`;
        piece.style.backgroundPosition = `${(col * 100) / (GRID_COLS - 1)}% ${(row * 100) / (GRID_ROWS - 1)}%`;
        
        // Click handler
        piece.addEventListener('click', () => handlePieceClick(piece));
        
        board.appendChild(piece);
    });
}

function handlePieceClick(piece) {
    if (piece.classList.contains('correct')) return;
    
    if (!selectedPiece) {
        // Select first piece
        selectedPiece = piece;
        piece.style.border = '3px solid #FFD700';
    } else {
        // Swap with second piece
        swapPieces(selectedPiece, piece);
        selectedPiece.style.border = '2px solid rgba(213, 196, 232, 0.3)';
        selectedPiece = null;
        
        // Check if puzzle is solved
        checkPuzzleSolved();
    }
}

function swapPieces(piece1, piece2) {
    const tempBg = piece1.style.backgroundPosition;
    const tempCorrect = piece1.dataset.correctPosition;
    
    piece1.style.backgroundPosition = piece2.style.backgroundPosition;
    piece1.dataset.correctPosition = piece2.dataset.correctPosition;
    
    piece2.style.backgroundPosition = tempBg;
    piece2.dataset.correctPosition = tempCorrect;
}

function checkPuzzleSolved() {
    const pieces = document.querySelectorAll('.puzzle-piece');
    let solved = true;
    
    pieces.forEach((piece, index) => {
        if (parseInt(piece.dataset.correctPosition) === index) {
            piece.classList.add('correct');
        } else {
            solved = false;
        }
    });
    
    if (solved) {
        setTimeout(() => {
            // Show QR code
            document.getElementById('qrReveal').style.display = 'flex';
        }, 500);
    }
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Fungsi baru untuk memulai hitungan mundur 10 detik
function startTimer(duration) {
    let timer = duration;
    const display = document.getElementById('timerDisplay');
    const qrReveal = document.getElementById('qrReveal');

    // Menampilkan hitungan awal
    display.textContent = `Anda punya ${timer} detik untuk scan!`;

    // Menggunakan setInterval untuk mengupdate setiap 1 detik
    const countdown = setInterval(() => {
        timer--;
        display.textContent = `Anda punya ${timer} detik untuk scan!`;

        if (timer <= 0) {
            clearInterval(countdown); // Hentikan hitungan mundur
            
            // 🚨 Sembunyikan kotak QR (TUTUP OTOMATIS)
            qrReveal.style.display = 'none';
            
            // Optional: Beri pesan singkat sebelum menutup
            alert('Waktu habis! Cepat scan lain kali!');
            
            // Optional: Jika ingin mengarahkan kembali ke halaman puzzle
            // location.reload(); 
        }
    }, 1000); // 1000 milidetik = 1 detik
}

// Fungsi baru untuk memulai hitungan mundur 10 detik
function startTimer(duration) {
    let timer = duration;
    // Ambil elemen yang akan menampilkan angka hitungan mundur
    const display = document.getElementById('timerCountdown'); 
    const qrReveal = document.getElementById('qrReveal');
    
    // Pastikan display ada sebelum memulai
    if (!display) return; 

    // Tampilkan hitungan awal
    display.textContent = timer;

    // Menggunakan setInterval untuk mengupdate setiap 1 detik
    const countdown = setInterval(() => {
        timer--;
        display.textContent = timer; // Update angka di layar

        if (timer <= 0) {
            clearInterval(countdown); // Hentikan hitungan mundur
            
            // 🚨 Sembunyikan kotak QR (TUTUP OTOMATIS)
            qrReveal.style.display = 'none';
            
            // Opsional: Beri efek goyang pada kotak puzzle yang muncul setelah timer habis
            document.getElementById('page3').style.boxShadow = '0 0 50px red';
            
        }
    }, 1000); // 1000 milidetik = 1 detik
}


function checkPuzzleSolved() {
    const pieces = document.querySelectorAll('.puzzle-piece');
    let solved = true;
    
    pieces.forEach((piece, index) => {
        if (parseInt(piece.dataset.correctPosition) === index) {
            piece.classList.add('correct');
        } else {
            solved = false;
        }
    });
    
    if (solved) {
        setTimeout(() => {
            // Show QR code
            document.getElementById('qrReveal').style.display = 'flex';
            
            // 🔥 PANGGIL FUNGSI TIMER BARU DI SINI (10 detik)
            // 10 adalah durasi dalam detik
            startTimer(10); 
            
        }, 500);
    }
}

// ========================================
// PAGE 5: STAR RATING (Visual Only)
// ========================================
const stars = document.querySelectorAll('.star');
let currentRating = 0;

stars.forEach(star => {
    star.addEventListener('click', function() {
        currentRating = parseInt(this.dataset.rating);
        updateStars(currentRating);
    });
    
    star.addEventListener('mouseenter', function() {
        const rating = parseInt(this.dataset.rating);
        updateStars(rating);
    });
});

document.querySelector('.star-rating').addEventListener('mouseleave', function() {
    updateStars(currentRating);
});

function updateStars(rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// ========================================
// SMOOTH SCROLL BETWEEN PAGES
// ========================================
let isScrolling = false;

// Scroll helper for the Landing button
function showScrapbook() {
    const target = document.getElementById('page2');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Fallback: scroll down one viewport
        window.scrollBy({ top: window.innerHeight, left: 0, behavior: 'smooth' });
    }
}

window.addEventListener('wheel', function(e) {
    if (isScrolling) return;
    
    const currentPage = Math.round(window.scrollY / window.innerHeight);
    const totalPages = document.querySelectorAll('.page').length;
    
    if (e.deltaY > 0 && currentPage < totalPages - 1) {
        // Scroll down
        isScrolling = true;
        document.getElementById(`page${currentPage + 2}`).scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => { isScrolling = false; }, 1000);
    } else if (e.deltaY < 0 && currentPage > 0) {
        // Scroll up
        isScrolling = true;
        document.getElementById(`page${currentPage}`).scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => { isScrolling = false; }, 1000);
    }
}, { passive: true });

// ========================================
// INITIALIZE ON PAGE LOAD
// ========================================
window.addEventListener('DOMContentLoaded', function() {
    createParticles();
    createClouds();
    
    // Initialize puzzle when page 3 is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target.id === 'page3' && entry.isIntersecting) {
                if (document.querySelectorAll('.puzzle-piece').length === 0) {
                    initPuzzle();
                }
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.page').forEach(page => {
        observer.observe(page);
    });
});

// ========================================
// MUSIC
// ========================================

const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isMusicPlaying = false;

// Auto play musik pas user interact (browser policy)
document.addEventListener('click', function() {
    if (!isMusicPlaying) {
        bgMusic.play();
        isMusicPlaying = true;
        musicToggle.textContent = '🔊';
    }
}, { once: true });

// Toggle musik on/off
if (musicToggle) {
    musicToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent double trigger
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = '🔊';
        } else {
            bgMusic.pause();
            musicToggle.textContent = '🔇';
        }
    });
}

// ========================================
// PHOTO MODAL / LIGHTBOX WITH FLIP
// ========================================

const photoModal = document.getElementById('photoModal');
const modalClose = document.querySelector('.modal-close');
const modalPolaroid = document.querySelector('.modal-polaroid');
const modalImage = document.querySelector('.modal-image');
const modalCaption = document.querySelector('.modal-caption');
const backContent = document.querySelector('.back-content');
const allPolaroids = document.querySelectorAll('.polaroid');

// Data pesan rahasia untuk setiap foto
const secretMessages = {
    0: "LAGI, LAGI, LAGII, semoga dikasih rezeki banyak-banyakkkK!",
    1: "cu bangett pacarkuu, besok-besok udah gak ada lagi pulang dari mahameraa hehehe, bisa jalan-jalan terus, buy kasi uangg!",
    2: "SMR bakal selalu jadi tempat yang kotor gak sih sekarang buy, sekaligus tempat pelarian kitaa, seru senang bareng disana, gak ada yang tau, cuma kita, semoga kamu selalu suka dengan pulang baliknyaa hehe",
    3: "Maaf yaa bubuyy, aku sering banget ngomong yang nyakitin hati buyy, salah satunya tentang ini! Kedepannya sebebas apapun yang ada di pikiran buy untuk bahas tentang ini akan selalu aman. Semua doa juga pada akhirnya selalu bermula pada ucapan yang terus berulang",
    4: "Ketemu lagi setelah LDR, yang pertama gak siiiii?! aku lupaa! tapi ini masih gak seru, soalnya masih jaim bangett awalawal, tapi hari besoknya udah K4C4U M3N!!!",
    5: "Bocil ini masih lucuu bangett diliat-liat, gakk kek bocil motor jamet ireng ingusan jametttttttt",
    6: "POTOBUT KESEKIAN KALINYAA! memang nagihh ehh, tapi kalau baguss, habis banyakk uang cuma buat potobut, tapi seruuu!",
    7: "First time nonton mas bas! Semoga masih di kasih kesempatan buat nonton konser-konser kesukaan kita dehhh, MASIH PENGEN BANGETTT BUAT LAGI LAGI LAGII!",
    8: "HARI-HARI NYA CEPET BETUL, PERASAAN CAMPUR ADUKNYA JUGA MASIH KEINGET BANGETT! Kita udah sama-sama cape sama LDR, tapi... 9 BULAN LAGIIII",
    9: "Prambanan! semogaaa masih dikasih rezeki yang baguss yaa kedepannyaa dan selalu, buat banyak tempat lainnya! 🏛️",
    10: "Can't explain the feeling when I'm with you... ✨",
    11: "Entah nanti kemana lagi kita bakal liburan bareng, tapi yang penting ada kamunya udah bisa seruu bangett jadinya, YANG PENTING ADA BUY NYAA AJAA 🗺️"
};

// Click pada setiap polaroid
allPolaroids.forEach((polaroid, index) => {
    polaroid.addEventListener('click', function() {
        // Reset flip state
        modalPolaroid.classList.remove('flipped');
        
        // Ambil image/video dari polaroid yang diklik
        const imageContainer = this.querySelector('.polaroid-image');
        const caption = this.querySelector('.polaroid-caption').textContent;
        
        // Clone content (img atau video)
        const content = imageContainer.cloneNode(true);
        
        // Clear modal lalu inject content baru
        modalImage.innerHTML = '';
        modalImage.appendChild(content);
        modalCaption.textContent = caption;
        
        // Set pesan rahasia
        backContent.textContent = secretMessages[index] || "Moment spesial kita berdua ❤️";
        
        // Auto play video kalau ada
        const video = modalImage.querySelector('video');
        if (video) {
            video.play();
        }
        
        // Show modal
        photoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Flip card saat diklik
modalPolaroid.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent modal close
    this.classList.toggle('flipped');
});

// Close modal
modalClose.addEventListener('click', closeModal);

photoModal.addEventListener('click', function(e) {
    // Only close if clicking the backdrop (not the polaroid)
    if (e.target === photoModal) {
        closeModal();
    }
});

function closeModal() {
    photoModal.classList.remove('active');
    modalPolaroid.classList.remove('flipped'); // Reset flip
    document.body.style.overflow = 'auto';
    
    // Stop video kalau ada
    const video = modalImage.querySelector('video');
    if (video) {
        video.pause();
    }
}

// ESC key untuk close
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && photoModal.classList.contains('active')) {
        closeModal();
    }
});