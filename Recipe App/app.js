const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetails = document.querySelector('.recipe-details');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');
const recipeDetailsContent = document.querySelector('.recipe-details-content');


async function fetchRecipes(query) {
    try {
        recipeContainer.innerHTML = "<h3>Fetching Recipes....</h3>"
        const data = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
        const response = await fetch(`${data}`).then(response => response.json());
        //console.log(response.meals[0]);

        recipeContainer.innerHTML = "";

        response.meals.forEach(meal => {

            //console.log(meal);
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
         <img src="${meal.strMealThumb}">
         <h3>${meal.strMeal}</h3>
         <p><span>${meal.strArea}</span> Dish </p>
         <p>Belong to <span>${meal.strCategory}</span> Category</p>
        `
            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);
            
            recipeContainer.appendChild(recipeDiv);

            // Adding EventListener to recipe button
            
            button.addEventListener('click', () => {
                openRecipePopup(meal);
            })
        });
    } catch (error) {
        recipeContainer.innerHTML = "<h3>Error in Fetching Recipes....</h3>"
    };
};

// Function to fetch ingredients and measurements

const fetchIngredients = (meal) => {
   // console.log(meal);
    let ingredientList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        // console.log(i);
        // console.log(ingredient);
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            // console.log(measure);
            ingredientList += `<li>${measure} ${ingredient}</li>`;
            // console.log(ingredientList);
        } else {
            break;
        }
    }
    return ingredientList;
};

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
      <h2 class="recipeName">${meal.strMeal}</h2>
      <h3 class="ingredient">Ingredeints:</h3>
      <ul class="ingredientList">${fetchIngredients(meal)}</ul>
      <div  class="recipeInstruction">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
      </div>
    `

    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
})

// Click from search button to (fetchRecipes) Fuction Call 

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // recipeContainer.innerHTML = "featch Recipes....";
    // console.log('Search Clicked');
    if (!searchBox.value) {
        recipeContainer.innerHTML = "<h3>Type the meal in search box.</h3>"
        return;
    }
    fetchRecipes(searchBox.value);
});
