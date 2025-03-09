import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('https://vigilant-journey-977ggw7r7wp4h477-5000.app.github.dev/api/recipes')
      .then(response => setRecipes(response.data))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  return (
    <div>
      <h1>Recipe List</h1>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe._id}>
            <Link to={`/recipe/${recipe._id}`}>{recipe.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/add">Add Recipe</Link>
    </div>
  );
}

export default RecipeList;