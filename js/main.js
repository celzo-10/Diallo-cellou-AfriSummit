// DARK MODE
const themeBtn = document.getElementById("themtoggle");
function setTheme(theme){
    if(theme === "dark"){
        document.body.classList.add("dark-mode");
        if(themeBtn){
            themeBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';
        }
    }else{
        document.body.classList.remove("dark-mode");
        if(themeBtn){
            themeBtn.innerHTML = '<i class="bi bi-moon-fill"></i>';
        }
    }
}

setTheme(localStorage.getItem("theme") || "light");

if(themeBtn){
    themeBtn.addEventListener("click", () => {
        const newTheme = document.body.classList.contains("dark-mode")
            ? "light"
            : "dark";

        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    });
}
// Navbar dynamique
const header = document.querySelector(".main-header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){
        header.classList.add("scrolled");
    }else{
        header.classList.remove("scrolled");
    }

});
// Menu Hamburger
document.addEventListener("DOMContentLoaded", () => {

    const menuBtn = document.getElementById("menuHamburger");
    const navLinks = document.querySelector(".nav-links");

    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        menuBtn.classList.toggle("active");
    });

});



// ==============================
// ANIMATION AU SCROLL
// ==============================
const elements = document.querySelectorAll(".scroll-anim");
const statNumbers = document.querySelectorAll(".stat-number");
const statsSection = document.querySelector(".stats-section");
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animation CSS au scroll
            entry.target.classList.add("show");
            // ==============================
            // ANIMATION DES CHIFFRES
            // ==============================
            if (entry.target.classList.contains("stats-section")) {
                statNumbers.forEach(stat => {
                    const target = stat.dataset.target.trim();
                    // Enlever le "+"
                    const targetNumber = parseInt(
                        target.replace("+", "")
                    );
                    let current = 0;
                    const duration = 1500;
                    const increment = targetNumber / (duration / 20);
                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= targetNumber) {
                            current = targetNumber;
                            clearInterval(counter);
                        }
                        // Ajouter "+" pour +1200
                        if (target.includes("+")) {
                            stat.textContent = "+" + Math.floor(current);
                        } else {
                            stat.textContent = Math.floor(current);
                        }
                    }, 20);
                });
            }
            // Une seule animation
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});
// Observer les éléments avec .scroll-anim
elements.forEach(element => {
    observer.observe(element);
});

// date fictive
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

if (
    daysElement &&
    hoursElement &&
    minutesElement &&
    secondsElement
) {

    const targetDate =
        new Date("2026-10-15T00:00:00").getTime();

    function updateCountdown() {

        const now = Date.now();
        const difference = targetDate - now;

        if (difference <= 0) {

            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";

            return;
        }

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (difference / 1000) % 60
        );

        daysElement.textContent =
            String(days).padStart(2, "0");

        hoursElement.textContent =
            String(hours).padStart(2, "0");

        minutesElement.textContent =
            String(minutes).padStart(2, "0");

        secondsElement.textContent =
            String(seconds).padStart(2, "0");
    }

    updateCountdown();

    setInterval(updateCountdown, 1000);
}





// ==============================
// ONGLETS PROGRAMME
// ==============================

const tabs = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".tab-panel");

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        // Retirer active
        tabs.forEach(btn => btn.classList.remove("active"));
        panels.forEach(panel => panel.classList.remove("active"));

        // Ajouter active au bouton
        tab.classList.add("active");

        // Afficher le bon jour
        const day = tab.dataset.day.toLowerCase();

        document.getElementById(day).classList.add("active");

    });

});
// Filtrage dynamique

const filterButtons = document.querySelectorAll(".filter-btn");
const speakerCards = document.querySelectorAll(".speaker-card-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Récupérer le filtre du bouton
        const filter = button.dataset.filter
            .trim()
            .toLowerCase();

        // Bouton actif
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        // Filtrer les cartes
        speakerCards.forEach(card => {

            let category = card.dataset.category
                .trim()
                .toLowerCase();

            // Corriger automatiquement "bussiness"
            if (category === "bussiness") {
                category = "business";
            }

            let selectedFilter = filter;

            if (selectedFilter === "bussiness") {
                selectedFilter = "business";
            }

            // Affichage
            if (selectedFilter === "all" || category === selectedFilter) {
                card.hidden = false;
            } else {
                card.hidden = true;
            }

        });

    });

});
// Validation du formulaire
const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Récupération des champs
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const participationType = document.getElementById("participationType");
    const country = document.getElementById("country");
    const message = document.getElementById("message");

    let isValid = true;

    // Réinitialiser les erreurs
    document.querySelectorAll(".error-text").forEach(function (error) {
        error.textContent = "";
    });

    document.querySelectorAll(".form-control").forEach(function (input) {
        input.classList.remove("error");
    });

    // ===============================
    // NOM
    // ===============================
    if (fullName.value.trim() === "") {
        afficherErreur(fullName, "Veuillez entrer votre nom complet.");
        isValid = false;
    }

    // ===============================
    // EMAIL
    // ===============================
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {
        afficherErreur(email, "Veuillez entrer votre adresse e-mail.");
        isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        afficherErreur(email, "Veuillez entrer une adresse e-mail valide.");
        isValid = false;
    }

    // ===============================
    // TELEPHONE
    // ===============================
    if (phone.value.trim() === "") {
        afficherErreur(phone, "Veuillez entrer votre numéro de téléphone.");
        isValid = false;
    }

    // ===============================
    // TYPE DE PARTICIPATION
    // ===============================
    if (participationType.value === "") {
        afficherErreur(
            participationType,
            "Veuillez choisir un type de participation."
        );
        isValid = false;
    }

    // ===============================
    // PAYS
    // ===============================
    if (country.value === "") {
        afficherErreur(country, "Veuillez sélectionner votre pays.");
        isValid = false;
    }

    // ===============================
    // MESSAGE
    // ===============================
    if (message.value.trim() === "") {
        afficherErreur(message, "Veuillez écrire votre motivation.");
        isValid = false;
    } else if (message.value.trim().length < 20) {
        afficherErreur(
            message,
            "Le message doit contenir au moins 20 caractères."
        );
        isValid = false;
    }

    // ===============================
    // SI TOUT EST VALIDE
    // ===============================
    if (isValid) {
        successMessage.style.display = "block";

        // Remonter vers le message de succès
        successMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        // Réinitialiser le formulaire
        form.reset();
    }
});


// ===============================
// FONCTION POUR AFFICHER UNE ERREUR
// ===============================

function afficherErreur(input, message) {
    input.classList.add("error");

    const formGroup = input.closest(".form-group");
    const errorText = formGroup.querySelector(".error-text");

    errorText.textContent = message;
}


