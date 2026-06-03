document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("featured-articles-container");

    // Fetch the raw JSON dataset
    fetch("articles.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok. Could not load articles.");
            }
            return response.json();
        })
        .then(articles => {
            // Clean out any lingering content placeholders
            container.innerHTML = "";

            // Loop smoothly through all articles and create cards with the new design
            articles.forEach(article => {
                const articleCard = document.createElement("div");
                articleCard.classList.add("article-card");
                // Directly stitch the main cover image as a background context
                articleCard.style.backgroundImage = `url('${article.image}')`;
                // Build HTML safely containing elements inside the target transparent wrappers
                articleCard.innerHTML = `
                    <div class="hero-text-box">
                        <span class="category-badge">${article.category}</span>
                        <h1>${article.title}</h1>
                        <p>${article.description}</p>
                    </div>
                    
                    <div class="card-footer">
                        <div class="author-profile">
                            <img src="${article.authorImage}" alt="${article.authorName}" class="author-avatar" loading="lazy">
                            <span class="author-name">${article.authorName}</span>
                        </div>
                        <a href="${article.link}" class="btn-primary">${article.buttonText}</a>
                    </div>
                `;

                container.appendChild(articleCard);
            });
        })
        .catch(error => {
            console.error("Error operationalizing data fetch:", error);
            container.innerHTML = `
                <div class="error-msg">
                    <p>Unable to load our featured articles list at this moment. Please refresh the page.</p>
                </div>
            `;
        });
});