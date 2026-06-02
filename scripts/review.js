// Review JS - This script is for testing and reviewing the form's functionality and design. It includes event listeners for form submission, input validation, and dynamic feedback to the user.

document.addEventListener("DOMContentLoaded", () => {
    // Get the query string from the URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const displayContainer = document.getElementById("submission-summary");

    if (queryString) {
        // Build a list of the submitted data
        // Note: .getAll('features') handles multiple checkboxes with the same name
        const productName = urlParams.get('product-name');
        const rating = urlParams.get('rating');
        const installDate = urlParams.get('install-date');
        const features = urlParams.getAll('features').join(', ');
        const review = urlParams.get('review') || "No written review provided.";
        const userName = urlParams.get('user-name') || "Anonymous";

        displayContainer.innerHTML = `
            <p><strong>Product:</strong> ${productName}</p>
            <p><strong>Rating:</strong> ${rating} Stars</p>
            <p><strong>Installed On:</strong> ${installDate}</p>
            <p><strong>Useful Features:</strong> ${features || "None selected"}</p>
            <p><strong>Your Review:</strong> <em>"${review}"</em></p>
            <p><strong>Submitted by:</strong> ${userName}</p>
        `;
    } else {
        displayContainer.innerHTML = "<p>No submission data found. Please submit the form first.</p>";
    }
});