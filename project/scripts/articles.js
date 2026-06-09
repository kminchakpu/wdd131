document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("featured-articles-container");

    // 1. Storage Tracking Function
    function updatePageTracking() {
        const currentViewsRaw = localStorage.getItem("articlesPageViews");
        let currentViews = 0;

        if (currentViewsRaw) {
            currentViews = parseInt(currentViewsRaw, 10);
        }

        currentViews += 1;
        localStorage.setItem("articlesPageViews", currentViews.toString());
    }

    // 2. Main Render Engine
    function renderAllCards(articles) {
        if (!container) return;

        container.innerHTML = "";

        const cardsHtml = articles.map((article) => {
            return `
                <article class="article-card">
                    <img src="${article.image}" alt="${article.title}" class="card-image-cap" loading="lazy">
                    
                    <div class="card-body">
                        <span class="category-badge">${article.category}</span>
                        <h3 class="article-title">${article.title}</h3>
                        <p class="article-description">${article.description}</p>
                    </div>
                    
                    <div class="card-footer">
                        <div class="author-profile">
                            <img src="${article.authorImage}" alt="${article.authorName}" class="author-avatar" loading="lazy">
                            <span class="author-name">${article.authorName}</span>
                        </div>
                        <a href="${article.link}" class="btn-primary">Read Article</a>
                    </div>
                </article>
            `;
        }).join("");

        container.innerHTML = cardsHtml;
    }

    // 3. Executing Flow
    updatePageTracking();

    if (container) {
        fetch("data/articles.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network error encountered. Could not load articles data.");
                }
                return response.json();
            })
            .then((articles) => {
                renderAllCards(articles);
            })
            .catch((error) => {
                console.error("Operational fetch issue:", error);
                container.innerHTML = `
                    <div class="error-msg">
                        <p>Unable to load our articles list at this moment. Please refresh the page.</p>
                    </div>
                `;
            });
    }
});