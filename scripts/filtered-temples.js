// ==========================================
// Array of Temple Objects (with Local Relative Image Paths)
// ==========================================
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "images/aba-nigeria-temple.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "images/manti-temple.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "images/payson-utah-temple.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "images/yigo_guam_temple.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "images/washington-temple.jpeg"
  },
  {
    templeName: "Lima Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "images/lima-peru-temple.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "images/mexico-city-temple.jpg"
  },
   {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl: "images/salt-lake-temple.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl: "images/rome-temple.jpg"
  },
{
    templeName: "Boise Idaho",
    location: "Boise, Idaho, United States",
    dedicated: "1984, May, 25",
    area: 35832,
    imageUrl: "images/boise-idaho-temple.jpg"
  },
  {
    "templeName": "Edmonton Alberta",
    "location": "Edmonton, Alberta, Canada",
    "dedicated": "1999, December, 11",
    "area": 10700,
    "imageUrl": "images/edmonton-alberta-temple.jpg"
  },
  {
    "templeName": "Frankfurt Germany",
    "location": "Friedrichsdorf, Germany",
    "dedicated": "1987, August, 28",
    "area": 32895,
    "imageUrl": "images/frankfurt-temple.jpg"
  }
];

// DOM Element Selectors
const gridElement = document.getElementById("temples");
const mainTitleElement = document.getElementById("main-title");
const navLinks = document.querySelectorAll("#primary-nav a");

// Your specific navigation elements
const hamburger = document.querySelector("#hamburger");
const nav = document.querySelector("#primary-nav");

// ==========================================
// Responsive Navigation Control
// ==========================================
hamburger.addEventListener("click", () => {
    nav.classList.toggle("open");
    
    // Toggle symbol: X for close, ☰ for open
    if (nav.classList.contains("open")) {
        hamburger.textContent = "X";
    } else {
        hamburger.textContent = "☰";
    }
});

// ==========================================
// Loop and Generate Temple Cards Function
// ==========================================
function displayTemples(filteredTemples) {
  // Clear out the existing items before rendering new ones
  gridElement.innerHTML = "";

  filteredTemples.forEach(temple => {
    // Create card container elements matching the blueprint structure
    const card = document.createElement("section");
    card.classList.add("temple-card");

    const name = document.createElement("h3");
    name.textContent = temple.templeName;

    const location = document.createElement("p");
    location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;

    const dedicated = document.createElement("p");
    dedicated.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;

    const area = document.createElement("p");
    area.innerHTML = `<span class="label">Size:</span> ${temple.area.toLocaleString()} sq ft`;

    const img = document.createElement("img");
    img.setAttribute("src", temple.imageUrl);
    img.setAttribute("alt", `${temple.templeName} Temple`);
    img.setAttribute("loading", "lazy"); 

    // Append child elements to our card container
    card.appendChild(name);
    card.appendChild(location);
    card.appendChild(dedicated);
    card.appendChild(area);
    card.appendChild(img);
    // Push the finalized card into the grid
    gridElement.appendChild(card);
  });
}

// ==========================================
// Navigation Menu Filtering Logic
// ==========================================
navLinks.forEach(link => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    // Toggle active classes on menu tabs
    navLinks.forEach(item => item.classList.remove("active"));
    link.classList.add("active");

    const filterId = link.id;
    let filteredList = [];

    // Filter array data matching requirements
    if (filterId === "home") {
      mainTitleElement.textContent = "Home";
      filteredList = temples;
    } else if (filterId === "old") {
      mainTitleElement.textContent = "Old Temples (Built before 1900)";
      filteredList = temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(",")[0]);
        return year < 1900;
      });
    } else if (filterId === "new") {
      mainTitleElement.textContent = "New Temples (Built after 2000)";
      filteredList = temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(",")[0]);
        return year > 2000;
      });
    } else if (filterId === "large") {
      mainTitleElement.textContent = "Large Temples (> 90,000 sq ft)";
      filteredList = temples.filter(temple => temple.area > 90000);
    } else if (filterId === "small") {
      mainTitleElement.textContent = "Small Temples (< 10,000 sq ft)";
      filteredList = temples.filter(temple => temple.area < 10000);
    }

    // Close the mobile menu automatically when a link is clicked
    if (nav.classList.contains("open")) {
        nav.classList.remove("open");
        hamburger.textContent = "☰";
    }

    // Refresh display grid with targeted selection
    displayTemples(filteredList);
  });
});

// ==========================================
// Footer Year and Last Modified Injection
// ==========================================
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

// Initial load context setup
displayTemples(temples);