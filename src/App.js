import React, { useState } from 'react';
import axios from 'axios';
import RecipeCard from './components/RecipeCard';
import RecipeDetails from './components/RecipeDetails';
import './App.css';
import SearchIcon from '@rsuite/icons/Search';
import TrashIcon from '@rsuite/icons/Trash';

const App = () => {
  const [searchTerm, setSearchWord] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [error, setError] = useState(null);

  const searchRecipes = async () => {
    setError(null);

    axios.get(`https://www.themealdb.com/api/json/v2/1/search.php?s=${searchTerm}`)
      .then((response) => {
        if (response.data.meals) {
          setRecipes(response.data.meals);
        } else {
          setError("No results! Interesting... Enter different word(s)!");
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Error occured! Please re-enter the word(s).");
      });
  };

  const addToBookmarks = (recipe) => {
    setBookmarks([...bookmarks, recipe]);
  };

  const removeFromBookmarks = (id) => {
    setBookmarks(bookmarks.filter((recipe) => recipe.mealId !== id));
  };

  const closeRecipeDetails = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="app">
      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="Search for recipes..."
        />
        <SearchIcon className="search-icon" />

        <button onClick={searchRecipes}>Search</button>
      </div>

      {error ? (
        <div className="error-message">
          <h3>{error}</h3>
        </div>
      ) : (
        <div className="recipe-cards">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.mealId}
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
            />
          ))}
        </div>
      )}

      {selectedRecipe && (
        <div className="recipe-details-container">
          <RecipeDetails recipe={selectedRecipe} />
          <div className='recipe-details-container--footer'>
            <button onClick={closeRecipeDetails}>Close</button>
            <button onClick={() => addToBookmarks(selectedRecipe)}>Add to bookmarks</button>
          </div>
        </div>
      )}

      <div className="bookmarks">
        <h2>Bookmarked Recipes</h2>
        {bookmarks.map((recipe) => (
          <div key={recipe.mealId} className="bookmark">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <h3>{recipe.strMeal}</h3>
            <button onClick={() => removeFromBookmarks(recipe.mealId)}><TrashIcon />Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
