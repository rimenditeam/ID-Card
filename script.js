// --- Fungsi Perbaikan Tinggi Layar di HP ---
const setAppHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};
window.addEventListener('resize', setAppHeight);
setAppHeight();

// --- Efek Ripple Saat Tombol Diklik ---
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    const rect = button.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add("ripple");
    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
        ripple.remove();
    }
    button.appendChild(circle);
}

const buttons = document.querySelectorAll('.link-button');
buttons.forEach(button => {
    button.addEventListener("click", createRipple);
});

// --- Kode untuk Animasi, Modal, dll. ---
window.addEventListener('load', () => {
    // Fungsi Animasi Awal
    const cardContainer = document.querySelector('.card-container');
    if (cardContainer) {
        cardContainer.classList.add('loaded');
    }

    // Fungsi Modal Password
    const semuaTombolProteksi = document.querySelectorAll('.proteksi');
    const modalOverlay = document.getElementById('password-modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const passwordForm = document.getElementById('password-form');
    const successMessage = document.getElementById('success-message');
    const passwordInput = document.getElementById('password-input');
    const submitBtn = document.getElementById('submit-password-btn');
    const cancelBtn = document.getElementById('cancel-password-btn');
    const errorMessage = document.getElementById('error-message');

    let urlTujuanSaatIni = '';
    let passwordBenarSaatIni = '';

    function tampilkanModal() {
        if (!modalOverlay) return;
        passwordForm.style.display = 'block';
        successMessage.style.display = 'none';
        modalOverlay.classList.remove('modal-hidden');
        setTimeout(() => {
            modalOverlay.classList.add('visible');
            passwordInput.focus();
        }, 10);
    }

    function sembunyikanModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('visible');
        setTimeout(() => {
            modalOverlay.classList.add('modal-hidden');
            passwordInput.value = '';
            errorMessage.textContent = '';
        }, 300);
    }

    semuaTombolProteksi.forEach(tombol => {
        tombol.addEventListener('click', function(event) {
            event.preventDefault();
            urlTujuanSaatIni = tombol.dataset.url;
            passwordBenarSaatIni = tombol.dataset.password;
            const judulModal = tombol.dataset.title || 'Akses Terproteksi';
            if (modalTitle) {
                modalTitle.textContent = judulModal;
            }
            tampilkanModal();
        });
    });

    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const passwordMasukan = passwordInput.value;
            if (passwordMasukan === passwordBenarSaatIni) {
                passwordForm.style.display = 'none';
                successMessage.style.display = 'block';
                setTimeout(() => {
                    sembunyikanModal();
                    setTimeout(() => {
                        window.location.href = urlTujuanSaatIni;
                    }, 300);
                }, 2000);
            } else {
                errorMessage.textContent = 'Password salah, coba lagi.';
                passwordInput.value = '';
                passwordInput.focus();
            }
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                submitBtn.click();
            }
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', sembunyikanModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(event) {
            if (event.target === modalOverlay) {
                sembunyikanModal();
            }
        });
    }
});
