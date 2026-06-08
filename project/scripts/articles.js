document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("featured-articles-container");

    // Core Functionality: Track page visits using localStorage
    function updatePageTracking() {
        const currentViewsRaw = localStorage.getItem("featuredPageViews");
        let currentViews = 0;

        // Conditional branching to evaluate localStorage data
        if (currentViewsRaw) {
            currentViews = parseInt(currentViewsRaw, 10);
        }

        currentViews += 1;
        localStorage.setItem("featuredPageViews", currentViews.toString());
    }

    // DOM & Array Methods: Generate cards strictly using template literals
    function renderArticleCards(articles) {
        if (!container) return;

        // Clear out any lingering content placeholders
        container.innerHTML = "";

        // Use array map method to loop smoothly through your articles
        // Exclusively uses template literals for the HTML output string
        const cardsHtml = articles.map((article) => {
            return `
                <article class="article-card" style="background-image: url('${article.image}');">
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
                </article>
            `;
        }).join("");

        // Inject the complete markup block into the DOM
        container.innerHTML = cardsHtml;
    }

    // Execution Flow
    updatePageTracking();

    if (container) {
        // Looks for the data folder sitting in the project root
        fetch("data/articles.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok. Could not load articles.");
                }
                return response.json();
            })
            .then((articles) => {
                // Passes the processed array over to the rendering engine
                renderArticleCards(articles);
            })
            .catch((error) => {
                console.error("Error operationalizing data fetch:", error);
                container.innerHTML = `
                    <div class="error-msg">
                        <p>Unable to load our featured articles list at this moment. Please refresh the page.</p>
                    </div>
                `;
            });
    }
});