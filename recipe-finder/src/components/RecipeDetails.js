import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RecipeDetails() {
// It gets recipe ID from the URL  
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://vigilant-journey-977ggw7r7wp4h477-5000.app.github.dev/api/recipes/${id}`)
      .then(response => {
        setRecipe(response.data);
        setName(response.data.name);
        setIngredients(response.data.ingredients);
        setInstructions(response.data.instructions);
      })
      .catch(error => console.error('Error fetching recipe details:', error));
  }, [id]);
  // Handle deleting the recipe
  const handleDelete = () => {
    axios.delete(`https://vigilant-journey-977ggw7r7wp4h477-5000.app.github.dev/api/recipes/${id}`)
      .then(() => navigate('/'))
      .catch(error => console.error('Error deleting recipe:', error));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  // Handle updating the recipe
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log('Updating recipe:', { name, ingredients, instructions });
    axios.put(`https://vigilant-journey-977ggw7r7wp4h477-5000.app.github.dev/api/recipes/${id}`, { name, ingredients, instructions })
      .then(response => {
        console.log('Recipe updated successfully:', response.data);
        setRecipe(response.data);
        setIsEditing(false);
      })
      .catch(error => console.error('Error updating recipe:', error));
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      {isEditing ? (
        <div>
          <h1>Edit Recipe</h1>
          <form onSubmit={handleUpdate}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Recipe Name" required />
            <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredients" required />
            <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Instructions" required />
            <button type="submit">Update Recipe</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>{recipe.name}</h1>
          <p>{recipe.ingredients}</p>
          <p>{recipe.instructions}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;