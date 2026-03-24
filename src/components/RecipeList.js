import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';

const gujaratiDishNames = ['Dhokla', 'Khandvi', 'Undhiyu', 'Thepla', 'Handvo'];

const RecipeList = ({ onSelectRecipe }) => {
  const [recipes, setRecipes] = useState([]);
  const [gujaratiDishes, setGujaratiDishes] = useState([]);

  // Fetch all dishes
  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then(res => setRecipes(res.data.meals || []))
      .catch(err => console.error(err));
  }, []);

  // Fetch Gujarati dishes
  useEffect(() => {
    const fetchGujarati = async () => {
      const results = await Promise.all(
        gujaratiDishNames.map(name =>
          axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        )
      );
      const dishes = results.flatMap(r => r.data.meals || []);
      setGujaratiDishes(dishes);
    };
    fetchGujarati();
  }, []);

  return (
    <div>
      <h2>🍛 Gujarati Specials</h2>
      <div className="recipe-list">
        {gujaratiDishes.map(recipe => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} onClick={() => onSelectRecipe(recipe)} />
        ))}
      </div>

      <h2 className="mt-4">🍽️ All Recipes</h2>
      <div className="recipe-list">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} onClick={() => onSelectRecipe(recipe)} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
