// RecipeJS Part 3 – IIFE + Recursion + Expandable Cards
const RecipeApp = (function () {
    console.log("RecipeApp initializing...");

    const recipes = [
        {
            id: 1,
            title: "Pasta",
            difficulty: "Easy",
            ingredients: ["Pasta", "Salt", "Oil", "Sauce"],
            steps: [
                "Boil water",
                {
                    text: "Prepare sauce",
                    substeps: [
                        "Heat oil",
                        "Add garlic",
                        {
                            text: "Add spices",
                            substeps: ["Add chili", "Add oregano"]
                        }
                    ]
                },
                "Cook pasta",
                "Mix pasta with sauce",
                "Serve hot"
            ]
        },
        {
            id: 2,
            title: "Sandwich",
            difficulty: "Easy",
            ingredients: ["Bread", "Butter", "Veggies", "Cheese"],
            steps: [
                "Take bread slices",
                "Apply butter",
                {
                    text: "Add fillings",
                    substeps: ["Add veggies", "Add cheese"]
                },
                "Grill sandwich",
                "Serve"
            ]
        }
    ];

    const container = document.getElementById("recipe-container");

    // 🔁 Recursive function
    const renderSteps = (steps, level = 0) => {
        let html = "<ul>";
        steps.forEach(step => {
            if (typeof step === "string") {
                html += `<li style="margin-left:${level * 20}px">➡ ${step}</li>`;
            } else {
                html += `<li style="margin-left:${level * 20}px"><strong>${step.text}</strong></li>`;
                html += renderSteps(step.substeps, level + 1);
            }
        });
        html += "</ul>";
        return html;
    };

    const createRecipeCard = (recipe) => {
        return `
        <div class="card">
            <h3>${recipe.title}</h3>
            <p>Difficulty: ${recipe.difficulty}</p>

            <button class="toggle-btn" data-id="${recipe.id}" data-type="steps">
                Show Steps
            </button>

            <button class="toggle-btn" data-id="${recipe.id}" data-type="ingredients">
                Show Ingredients
            </button>

            <div class="steps-container" id="steps-${recipe.id}">
                ${renderSteps(recipe.steps)}
            </div>

            <div class="ingredients-container" id="ingredients-${recipe.id}">
                <ul>
                    ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
                </ul>
            </div>
        </div>
        `;
    };

    const renderRecipes = () => {
        container.innerHTML = recipes.map(createRecipeCard).join("");
    };

    // 🎯 Event Delegation
    const handleToggle = (e) => {
        if (!e.target.classList.contains("toggle-btn")) return;

        const id = e.target.dataset.id;
        const type = e.target.dataset.type;
        const section = document.getElementById(`${type}-${id}`);

        section.classList.toggle("visible");
        e.target.textContent =
            section.classList.contains("visible")
                ? `Hide ${type}`
                : `Show ${type}`;
    };

    const init = () => {
        renderRecipes();
        container.addEventListener("click", handleToggle);
        console.log("RecipeApp ready!");
    };

    return { init };
})();

RecipeApp.init();
