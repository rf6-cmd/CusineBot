document.addEventListener("DOMContentLoaded", () => {
  // Step 1: Read selected ingredients from localStorage
  const selectedIngredients = [];
  for (let key in localStorage) {
    if (localStorage.getItem(key) === "selected") {
      selectedIngredients.push(key);
    }
  }

  // Step 2: Define your recipe list
  const recipes = [
    {
      name: "Quinoa Salad",
      ingredients: ["Quinoa", "Tomatoes", "Cucumbers", "Oliveoil"]
    },
    {
      name: "Barley Soup",
      ingredients: ["Barley", "Carrots", "Celery", "Onions"]
    },
    {
      name: "Buckwheat Pancakes",
      ingredients: ["Buckwheat", "Eggs", "Milk"]
    },
    {
      name: "Millet Porridge",
      ingredients: ["Millet", "Milk", "Honey"]
    },
    {
      name: "Amaranth Stir Fry",
      ingredients: ["Amaranth", "Peppers", "Soy sauce"]
    },
    {
      name: "Chocolate Cake",
      ingredients: ["Flour", "Sugar", "Eggs", "Butter"]
    }
  ];

  // Step 3: Filter recipes that contain at least one selected ingredient
  const matchingRecipes = recipes.filter(recipe =>
    selectedIngredients.some(ingredient =>
      recipe.ingredients.includes(ingredient)
    )
  );

  // Step 4: Display results
  const container = document.getElementById("recipe-results");

  if (matchingRecipes.length === 0) {
    container.innerHTML = "<p>No recipes match your selected ingredients.</p>";
  } else {
    matchingRecipes.forEach(recipe => {
      // Create a link to the recipe page
      const link = document.createElement("a");
      link.href = `${recipe.name.toLowerCase().replace(/\s+/g, "-")}.html`;
      link.className = "box-link";

      // Create the recipe box
      const div = document.createElement("div");
      div.className = "box interactive";
      div.setAttribute("tabindex", "0");
      div.setAttribute("data-name", recipe.name);
      div.setAttribute("data-selectable", "true");
      div.innerHTML = `<strong>${recipe.name}</strong><br>
        Ingredients: ${recipe.ingredients.join(", ")}`;

      link.appendChild(div);
      container.appendChild(link);
    });
  }

  // Step 5: Back button logic
  const resetBackButton = document.getElementById("resetBackButton");
  if (resetBackButton) {
    resetBackButton.addEventListener("click", () => {
      for (let key in localStorage) {
        if (localStorage.getItem(key) === "selected") {
          localStorage.removeItem(key);
        }
      }
    });
  }
});
