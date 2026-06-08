document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("featured-articles-container");

    // 1. Core Functionality: Track home page visits using localStorage
    function updatePageTracking() {
        const currentViewsRaw = localStorage.getItem("homePageViews");
        let currentViews = 0;

        // Conditional branching to evaluate localStorage data safely
        if (currentViewsRaw) {
            currentViews = parseInt(currentViewsRaw, 10);
        }

        currentViews += 1;
        localStorage.setItem("homePageViews", currentViews.toString());
    }

    // 2. Core Functionality: Shuffle array to pick 4 random unique articles
    function getRandomArticles(allArticles, countToSelect) {
        // Create a copy of the array to prevent altering the original dataset
        const shuffled = [...allArticles];
        
        // Fisher-Yates Shuffle Algorithm for an unbiased random distribution
        for (let i = shuffled.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = shuffled[i];
            shuffled[i] = shuffled[j];
            shuffled[j] = temp;
        }
        
        // Slice the first 4 elements from the randomized array
        return shuffled.slice(0, countToSelect);
    }

    // 3. DOM & Array Methods: Generate cards strictly using template literals
    function renderFeaturedCards(selectedArticles) {
        if (!container) return;

        // Clear out any structural fallback text or placeholders
        container.innerHTML = "";

        // Loop through the 4 randomly selected articles using .map()
        // Exclusively uses template literals for structural string creation
        const cardsHtml = selectedArticles.map((article) => {
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

        // Securely inject the final template block into your landing grid
        container.innerHTML = cardsHtml;
    }

    // 4. Operational Execution Flow
    updatePageTracking();

    if (container) {
        // Fetch the dataset from your central data folder
        fetch("data/articles.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok. Could not load homepage articles.");
                }
                return response.json();
            })
            .then((allArticles) => {
                // Get a fresh array containing exactly 4 random articles
                const randomSelection = getRandomArticles(allArticles, 4);
                
                // Render the selection to the homepage grid
                renderFeaturedCards(randomSelection);
            })
            .catch((error) => {
                console.error("Error operationalizing homepage fetch:", error);
                container.innerHTML = `
                    <div class="error-msg">
                        <p>Unable to load our featured articles list at this moment. Please refresh the page.</p>
                    </div>
                `;
            });
    }
});