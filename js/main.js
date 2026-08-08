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

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.2
});

elements.forEach(element => {
    observer.observe(element);
});

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