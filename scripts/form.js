// Product array as provided for the activity
const products = [
  {
    id: "fc-1888",
    name: "Flux Capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "Power Laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "Time Circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "Low Voltage Reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "Warp Equalizer",
    averagerating: 5.0
  }
];

document.addEventListener("DOMContentLoaded", () => {
    const selectElement = document.getElementById("product-name");
    const reviewForm = document.querySelector("form");

    // Populate product options safely
    if (selectElement) {
        products.forEach(product => {
            const option = document.createElement("option");
            option.value = product.name; 
            option.textContent = product.name;
            selectElement.appendChild(option);
        });
    }

    // Handle localStorage tracking on form submission
    if (reviewForm) {
        reviewForm.addEventListener("submit", () => {
            // Retrieve existing review count or default to 0
            let numReviews = Number(localStorage.getItem("reviewCount")) || 0;
            
            // Increment and store the updated counter
            numReviews += 1;
            localStorage.setItem("reviewCount", numReviews.toString());
        });
    }
});