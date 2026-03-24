import React from 'react';

const RecipeDetails = ({ recipe, onBack }) => {
  const getIngredients = () => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredients;
  };

  return (
    <div>
      <button className="btn btn-secondary mb-3" onClick={onBack}>⬅ Back</button>
      <h2>{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="img-fluid mb-3" />
      <h4>Ingredients:</h4>
      <ul>
        {getIngredients().map((item, index) => <li key={index}>{item}</li>)}
      </ul>
      <h4>Instructions:</h4>
      <p>{recipe.strInstructions}</p>
    </div>
  );
};

export default RecipeDetails;
