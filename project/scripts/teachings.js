const teachingsGrid = document.getElementById("teachingsGrid");

async function loadTeachings() {
    try {
        const response = await fetch("data/teachings.json");

        if (!response.ok) {
            throw new Error("Failed to load teachings");
        }

        const teachings = await response.json();

        teachingsGrid.innerHTML = teachings
            .map(
                teaching => `
                <article class="teaching-card">

                    <div class="teaching-image">
                        <img src="${teaching.image}" alt="${teaching.title}">
                    </div>

                    <div class="teaching-content">
                        <span class="teaching-series">
                            ${teaching.series}
                        </span>

                        <h3>${teaching.title}</h3>

                        <p class="teaching-speaker">
                            ${teaching.speaker}
                        </p>

                        <p class="teaching-date">
                            ${teaching.date}
                        </p>

                        <p class="teaching-description">
                            ${teaching.description}
                        </p>

                        <a href="${teaching.url}" class="teaching-btn">
                            Read More
                        </a>
                    </div>

                </article>
                `
            )
            .join("");

    } catch (error) {
        console.error(error);

        teachingsGrid.innerHTML = `
            <p class="error-message">
                Unable to load teachings at this time.
            </p>
        `;
    }
}

loadTeachings();