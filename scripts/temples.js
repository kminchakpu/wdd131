// Select elements based on your provided HTML[cite: 1]
const hamburger = document.querySelector("#hamburger");
const nav = document.querySelector("#primary-nav");

hamburger.addEventListener("click", () => {
    nav.classList.toggle("open");
    
    // Toggle symbol: X for close, ☰ for open[cite: 1]
    if (nav.classList.contains("open")) {
        hamburger.textContent = "X";
    } else {
        hamburger.textContent = "☰";
    }
});

// Footer Logic[cite: 1]
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;

