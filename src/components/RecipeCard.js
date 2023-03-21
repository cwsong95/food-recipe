import React from 'react';

const RecipeCard = ({ recipe, onClick }) => (
  <div className="recipe-card" onClick={onClick}>
    <img src={recipe.strMealThumb} alt={recipe.strMeal} />
    <h3>{recipe.strMeal}</h3>
    <p>{recipe.strInstructions.slice(0, 100)}...</p>
  </div>
);

export default RecipeCard;
