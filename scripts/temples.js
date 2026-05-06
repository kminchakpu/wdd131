// JavaScript for the Responsive Hamburger Menu
const hamburger = document.querySelector("#menu"); 
const nav = document.querySelector(".navigation"); 

hamburger.addEventListener("click", () => {
  nav.classList.toggle("show");
  
  // Toggle the 'open' class on the button to change the symbol via CSS or textContent
  hamburger.classList.toggle("open");
  
  // Use 'X' to close the menu and '☰' to open it
  if (hamburger.classList.contains("open")) {
    hamburger.textContent = "X"; 
  } else {
    hamburger.textContent = "☰";
  }
});

// Dynamic Copyright Year for the Footer[cite: 1]
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Last Modified Date for the Footer[cite: 1]
document.getElementById("lastModified").textContent = 
  `Last Modification: ${document.lastModified}`;