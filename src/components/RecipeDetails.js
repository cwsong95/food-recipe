import React from 'react';

const RecipeDetails = ({ recipe }) => {
  const ingredients = [];
  for (let i = 1; i <= 100; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push(`${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`);
    }
  }

  return (
    <div className="recipe-details">
      <h2>{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>Ingredients:</h3>

      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h3>Instructions:</h3>
      <p>{recipe.strInstructions}</p>
    </div>
  );
};

export default RecipeDetails;