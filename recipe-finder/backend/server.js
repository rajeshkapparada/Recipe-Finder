const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb+srv://Rajeshkapparada:Veenajosh@cs628rajesh.dfmt9.mongodb.net/?retryWrites=true&w=majority&appName=CS628Rajesh', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: String,
  instructions: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

app.get('/api/recipes', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

app.post('/api/recipes', async (req, res) => {
  const newRecipe = new Recipe(req.body);
  await newRecipe.save();
  res.json(newRecipe);
});

app.get('/api/recipes/:id', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.json(recipe);
});

app.put('/api/recipes/:id', async (req, res) => {
  const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedRecipe);
});

app.delete('/api/recipes/:id', async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ message: 'Recipe deleted' });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});