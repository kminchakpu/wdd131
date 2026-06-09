document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("featured-articles-container");

    // Storage & Business Logic Tracking Function
    function updatePageTracking() {
        const currentViewsRaw = localStorage.getItem("homePageViews");
        let currentViews = 0;

        if (currentViewsRaw) {
            currentViews = parseInt(currentViewsRaw, 10);
        }

        currentViews += 1;
        localStorage.setItem("homePageViews", currentViews.toString());
    }

    // Unbiased Random Shuffling Function (Fisher-Yates)
    function getRandomArticles(allArticles, countToSelect) {
        const shuffled = [...allArticles];
        
        for (let i = shuffled.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = shuffled[i];
            shuffled[i] = shuffled[j];
            shuffled[j] = temp;
        }
        
        return shuffled.slice(0, countToSelect);
    }

    // UI Output Function (Exclusively utilizing Template Literals)
    function renderFeaturedCards(selectedArticles) {
        if (!container) return;

        container.innerHTML = "";

        // Maps array into a clean layout block matching the reference card image
        const cardsHtml = selectedArticles.map((article) => {
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

    // 4. Initializing Core Flow
    updatePageTracking();

    if (container) {
        fetch("data/articles.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network error encountered. Could not load homepage items.");
                }
                return response.json();
            })
            .then((allArticles) => {
                const randomSelection = getRandomArticles(allArticles, 4);
                renderFeaturedCards(randomSelection);
            })
            .catch((error) => {
                console.error("Operational fetch issue:", error);
                container.innerHTML = `
                    <div class="error-msg">
                        <p>Unable to load our featured articles list at this moment. Please refresh the page.</p>
                    </div>
                `;
            });
    }
});