// ==========================================================================
// DATA REFERENSI POCKETBOOK LSSD (DAPAT DITAMBAH SESUAI KEBUTUHAN)
// ==========================================================================
const pocketbookData = [
    {
        docNumber: "DOC-101",
        category: "RADIO",
        title: "TEN-CODES & RADIO BREVITY",
        content: "10-4: Dimengerti | 10-7: Out of Service | 10-8: In Service | 10-15: Tahanan dalam pengawalan | 10-20: Lokasi saat ini | 10-99: Officer dalam bahaya darurat.",
        updated: "REV 2026.1"
    },
    {
        docNumber: "DOC-102",
        category: "SOP",
        title: "MIRANDA WARNING ADVISEMENT",
        content: "Wajib dibacakan sebelum interogasi tahanan (Custodial Interrogation): Hak untuk diam, segala pernyataan dapat digunakan di pengadilan, dan hak didampingi penasihat hukum.",
        updated: "REV 2026.1"
    },
    {
        docNumber: "DOC-103",
        category: "SOP",
        title: "HIGH-RISK / FELONY TRAFFIC STOP",
        content: "Posisikan cruiser pada sudut taktis 30 derajat, aktifkan takedown lights, gunakan PA system untuk memerintahkan pengemudi membuang kunci keluar jendela dan keluar perlahan.",
        updated: "REV 2026.2"
    },
    {
        docNumber: "DOC-104",
        category: "PENAL",
        title: "PC 187 — MURDER & HOMICIDE",
        content: "Pembunuhan berencana maupun tidak berencana terhadap warga sipil atau petugas penegak hukum. Klasifikasi: Felony Berat. Wajib mengamankan perimeter TKP untuk Detective Bureau.",
        updated: "REV 2026.1"
    },
    {
        docNumber: "DOC-105",
        category: "PENAL",
        title: "PC 211 — ARMED ROBBERY",
        content: "Perampasan properti milik orang lain secara paksa menggunakan ancaman kekerasan atau senjata api. Klasifikasi: Felony. Lakukan identifikasi saksi dan penyitaan barang bukti.",
        updated: "REV 2026.1"
    },
    {
        docNumber: "DOC-106",
        category: "SOP",
        title: "USE OF FORCE CONTINUUM",
        content: "Tingkatan penggunaan kekuatan: 1. Kehadiran Petugas -> 2. Perintah Verbal -> 3. Kendali Tangan Kosong -> 4. Less-Lethal (Taser/Baton) -> 5. Lethal Force (Ancaman jiwa langsung).",
        updated: "REV 2026.3"
    }
];

// ==========================================================================
// DOM ELEMENTS
// ==========================================================================
const hamburgerBtn = document.getElementById("hamburger-btn");
const navMenu = document.getElementById("nav-menu");
const searchInput = document.getElementById("search-input");
const clearSearchBtn = document.getElementById("clear-search");
const filterTabs = document.getElementById("filter-tabs");
const recordsContainer = document.getElementById("records-container");
const resultCounter = document.getElementById("result-counter");

let currentCategory = "ALL";
let currentQuery = "";

// ==========================================================================
// MOBILE HAMBURGER NAVIGATION
// ==========================================================================
hamburgerBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    hamburgerBtn.setAttribute("aria-expanded", isOpen);
});

// Tutup menu mobile saat link diklik
document.querySelectorAll(".nav-item").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        hamburgerBtn.setAttribute("aria-expanded", "false");
    });
});

// ==========================================================================
// RENDER POCKETBOOK RECORDS
// ==========================================================================
function renderRecords() {
    const filtered = pocketbookData.filter(item => {
        const matchesCategory = currentCategory === "ALL" || item.category === currentCategory;
        const searchTarget = `${item.docNumber} ${item.category} ${item.title} ${item.content}`.toLowerCase();
        const matchesQuery = searchTarget.includes(currentQuery.toLowerCase().trim());
        return matchesCategory && matchesQuery;
    });

    // Update Counter
    const totalFormatted = String(pocketbookData.length).padStart(2, "0");
    const shownFormatted = String(filtered.length).padStart(2, "0");
    resultCounter.textContent = `SHOWING ${shownFormatted} OF ${totalFormatted} RECORDS`;

    // Render HTML
    if (filtered.length === 0) {
        recordsContainer.innerHTML = `
            <div class="empty-state">
                NO MATCHING FIELD RECORDS FOUND FOR "${currentQuery.toUpperCase()}".
            </div>
        `;
        return;
    }

    recordsContainer.innerHTML = filtered.map(item => `
        <article class="record-card">
            <div>
                <div class="record-top">
                    <span class="record-num">${item.docNumber}</span>
                    <span class="record-cat">[${item.category}]</span>
                </div>
                <div class="record-body">
                    <h3 class="record-title">${item.title}</h3>
                    <p class="record-desc">${item.content}</p>
                </div>
            </div>
            <div class="record-footer">
                <span>LSSD FIELD MANUAL</span>
                <span>${item.updated}</span>
            </div>
        </article>
    `).join("");
}

// ==========================================================================
// SEARCH & CATEGORY FILTER EVENTS
// ==========================================================================
searchInput.addEventListener("input", (e) => {
    currentQuery = e.target.value;
    renderRecords();
});

clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    currentQuery = "";
    renderRecords();
    searchInput.focus();
});

filterTabs.addEventListener("click", (e) => {
    if (!e.target.classList.contains("filter-btn")) return;

    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");

    currentCategory = e.target.getAttribute("data-category");
    renderRecords();
});

// Inisialisasi awal saat halaman dimuat
renderRecords();
