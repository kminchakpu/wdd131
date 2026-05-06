// JavaScript for the Responsive Hamburger Menu
const hamburger = document.querySelector("#menu"); 
const nav = document.querySelector(".navigation"); 

hamburger.addEventListener("click", () => {
  nav.classList.toggle("show");
  hamburger.classList.toggle("open");
});

// Dynamic Copyright Year for the Footer[cite: 1]
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Last Modified Date for the Footer[cite: 1]
document.getElementById("lastModified").textContent = 
  `Last Modification: ${document.lastModified}`;