/* =====================================
   1. BUKA UNDANGAN
===================================== */

let invitationOpened = false;

function openInvitation() {

    if (invitationOpened) return;

    invitationOpened = true;

    const cover = document.getElementById("cover");
    const invitation = document.getElementById("invitation");
    const music = document.getElementById("weddingMusic");
    const musicButton = document.getElementById("musicButton");

    // Tampilkan seluruh konten undangan
    invitation.classList.add("show");

    // Hilangkan cover dengan animasi
    cover.classList.add("hide");

    // Putar musik wedding
    music.play()
        .then(() => {
            musicButton.textContent = "♫";
        })
        .catch(() => {
            musicButton.textContent = "▶";
            console.log("Musik belum dapat diputar.");
        });

    // Scroll otomatis menuju halaman utama
    setTimeout(() => {

        document.querySelector(".hero").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 150);

}


/* =====================================
   2. SCROLL REVEAL ANIMATION
===================================== */

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                // Aktifkan animasi
                entry.target.classList.add("active");

            } else {

                // Animasi diulang ketika kembali
                entry.target.classList.remove("active");

            }

        });

    },

    {
        threshold: 0.15
    }

);


// Amati seluruh bagian halaman
revealElements.forEach((element) => {

    observer.observe(element);

});


/* =====================================
   3. MUSIK WEDDING PLAY / PAUSE
===================================== */

const music = document.getElementById("weddingMusic");

const musicButton = document.getElementById("musicButton");

function toggleMusic() {

    if (music.paused) {

        music.play()
            .then(() => {

                musicButton.textContent = "♫";

            })
            .catch(() => {

                alert("Musik tidak dapat diputar. Periksa file MP3.");

            });

    } else {

        music.pause();

        musicButton.textContent = "▶";

    }

}


/* =====================================
   4. COUNTDOWN PERNIKAHAN
===================================== */

// Tanggal pernikahan:
// Tahun, Bulan (Januari = 0), Tanggal, Jam

const weddingDate = new Date(2026, 11, 20, 8, 0, 0);

function updateCountdown() {

    const now = new Date();

    const distance = weddingDate.getTime() - now.getTime();

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (distance <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;

    }

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (distance / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (distance / 1000) % 60
    );

    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;

}


// Jalankan countdown
updateCountdown();

setInterval(updateCountdown, 1000);


/* =====================================
   5. UCAPAN DAN DOA
===================================== */

const wishForm = document.getElementById("wishForm");

const wishList = document.getElementById("wishList");


// Mengambil data ucapan dari browser
let wishes = [];

try {

    wishes = JSON.parse(
        localStorage.getItem("weddingWishes") || "[]"
    );

    if (!Array.isArray(wishes)) {
        wishes = [];
    }

} catch (error) {

    wishes = [];

}


// Menampilkan ucapan
function displayWishes() {

    wishList.innerHTML = "";

    wishes.forEach((wish) => {

        const item = document.createElement("div");

        item.className = "wish-item";


        const name = document.createElement("strong");

        name.textContent = wish.name;


        const message = document.createElement("p");

        message.textContent = wish.message;


        item.appendChild(name);

        item.appendChild(message);


        wishList.appendChild(item);

    });

}


// Tampilkan ucapan ketika halaman dibuka
displayWishes();


// Mengirim ucapan
wishForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name = document.getElementById("guestName").value.trim();

    const message = document.getElementById("guestMessage").value.trim();


    if (!name || !message) {

        alert("Silakan lengkapi nama dan ucapan!");

        return;

    }


    // Tambahkan ucapan baru
    wishes.unshift({

        name: name,

        message: message

    });


    // Simpan ke LocalStorage
    try {

        localStorage.setItem(
            "weddingWishes",
            JSON.stringify(wishes)
        );

    } catch (error) {

        alert("Ucapan tidak dapat disimpan di browser.");

        return;

    }


    // Perbarui tampilan
    displayWishes();


    // Kosongkan formulir
    wishForm.reset();


    // Notifikasi
    alert("Terima kasih atas ucapan dan doanya!");

});
