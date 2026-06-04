// Review JS - This script handles displaying the submission summary 
// and updating the localStorage review counter.

document.addEventListener("DOMContentLoaded", () => {
    // Get the query string from the URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const displayContainer = document.getElementById("submission-summary");

    if (queryString) {
        // Build a list of the submitted data
        const productName = urlParams.get('product-name');
        const rating = urlParams.get('rating');
        const installDate = urlParams.get('install-date');
        const features = urlParams.getAll('features').join(', ');
        const review = urlParams.get('review') || "No written review provided.";
        const userName = urlParams.get('user-name') || "Anonymous";

        // Retrieve the current counter from localStorage (default to 0 if not found)
        let reviewCount = Number(localStorage.getItem("reviewCount")) || 0;

        // Increment the counter since a valid query string means a successful new submission
        // Note: Doing this step here ensures the counter increments exactly when review.html loads.
        reviewCount += 1;
        localStorage.setItem("reviewCount", reviewCount.toString());

        // 3. Inject the data AND the review counter into the HTML template
        displayContainer.innerHTML = `
            <div class="summary-box">
                <p><strong>Product:</strong> ${productName}</p>
                <p><strong>Rating:</strong> ${rating} Stars</p>
                <p><strong>Installed On:</strong> ${installDate}</p>
                <p><strong>Useful Features:</strong> ${features || "None selected"}</p>
                <p><strong>Your Review:</strong> <em>"${review}"</em></p>
                <p><strong>Submitted by:</strong> ${userName}</p>
            </div>
            <div class="counter-box" style="margin-top: 20px; padding: 10px; border-top: 2px dashed var(--input-border); text-align: center;">
                <p><strong>Total Product Reviews Submitted:</strong> ${reviewCount}</p>
            </div>
        `;
    } else {
        displayContainer.innerHTML = "<p>No submission data found. Please submit the form first.</p>";
    }
});