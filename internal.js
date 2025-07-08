// --- Fungsi Perbaikan Tinggi Layar di HP ---
const setAppHeight = () => {
    const doc = document.documentElement;
    // Mengukur tinggi jendela yang sebenarnya (inner height)
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};

// Panggil fungsi ini saat halaman dimuat dan saat ukuran jendela berubah
window.addEventListener('resize', setAppHeight);
setAppHeight(); // Panggil sekali saat pertama kali dibuka


// =======================================================
// === KODE BARU: Menjalankan Animasi Saat Halaman Dibuka ==
// =======================================================
window.addEventListener('load', () => {
    const cardContainer = document.querySelector('.card-container');
    if (cardContainer) {
        // Menambahkan kelas .loaded untuk memulai semua transisi CSS
        cardContainer.classList.add('loaded');
    }
});