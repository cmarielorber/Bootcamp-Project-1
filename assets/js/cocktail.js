const dailyRecipeEl = document.getElementById('dailyRecipe');
let recipe;
let requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://cors-anywhere.herokuapp.com/www.thecocktaildb.com/api/json/v1/1/random.php?a=Alcoholic", requestOptions)
  .then(response => response.json())
  .then(result => {
    recipe = result.drinks[0];
    publishRecipe(recipe);
  })
  .catch(error => console.log('error', error));

function publishRecipe(input) {
  let drinkName = input.strDrink;
  let drinkInstructions = input.strInstructions;
  const ingredientKeys = Object.keys(recipe).filter((key) => key.includes('strIngredient'));
  const ingredientValues = ingredientKeys.map((key) => recipe[key]).filter((x) => x);
  const measurementKeys = Object.keys(recipe).filter((key) => key.includes('strMeasure'));
  const measurementValues = measurementKeys.map((key) => recipe[key]).filter((x) => x);

  console.log(ingredientValues);
  console.log(measurementValues);

  let headerDiv = document.createElement('div');
  let ingredientsDiv = document.createElement('div');
  let instructionsDiv = document.createElement('div');
  headerDiv.innerHTML = `
    <h3 style="font-weight: bold;">${drinkName}</h3>
  `;
  let template = ``;
  for (let i = 0; i < ingredientValues.length; i++) {
    if (measurementValues[i] === undefined) {
      template += `
        <p>${ingredientValues[i]}</p>
      `;
    } else {
      template += `
        <p>${measurementValues[i] + " " + ingredientValues[i]}</p>
      `;
    }

  }
  ingredientsDiv.innerHTML = template;
  instructionsDiv.innerHTML = `
    <p class="container" style="margin-bottom: 0;">${drinkInstructions}</p>
  `;

  dailyRecipeEl.appendChild(headerDiv);
  dailyRecipeEl.appendChild(ingredientsDiv);
  dailyRecipeEl.appendChild(instructionsDiv);
}