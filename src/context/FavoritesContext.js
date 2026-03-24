import React, { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('culina_favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('culina_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (recipe) => {
    if (!favorites.find(r => r.idMeal === recipe.idMeal)) {
      setFavorites([...favorites, recipe]);
      toast.success(`${recipe.strMeal} added to favorites!`, {
        icon: '❤️',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  const removeFavorite = (idMeal) => {
    const recipe = favorites.find(r => r.idMeal === idMeal);
    if (recipe) {
      setFavorites(favorites.filter(r => r.idMeal !== idMeal));
      toast(`${recipe.strMeal} removed`, {
        icon: '💔',
      });
    }
  };

  const toggleFavorite = (recipe) => {
    if (isFavorite(recipe.idMeal)) {
      removeFavorite(recipe.idMeal);
    } else {
      addFavorite(recipe);
    }
  };

  const isFavorite = (idMeal) => {
    return favorites.some(r => r.idMeal === idMeal);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
