import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Flame, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(recipe.idMeal);

  const handleCardClick = (e) => {
    // Prevent navigation if clicking on the heart button
    if (e.target.closest('button')) return;
    navigate(`/recipe/${recipe.idMeal}`);
  };

  return (
    <motion.div
      onClick={handleCardClick}
      className="bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] cursor-pointer relative group transition-all duration-300 border border-slate-100"
      whileHover={{ y: -10, scale: 1.01 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative h-64 overflow-hidden p-2">
        <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(recipe);
          }}
          className={`absolute top-6 right-6 z-20 p-3 rounded-full backdrop-blur-md transition-all duration-300 shadow-xl
            ${favorited 
              ? 'bg-white text-rose-500 border border-rose-100' 
              : 'bg-black/30 text-white border border-white/20 hover:bg-black/50'}`}
        >
          <Heart size={22} className={favorited ? "fill-rose-500 scale-110 transition-transform" : ""} />
        </button>
      </div>
      
      <div className="px-6 pt-4 pb-6">
        <p className="text-sm font-bold mb-2 uppercase tracking-wider text-primary">
          {recipe.strCategory}
        </p>
        <h3 className="text-2xl font-extrabold text-slate-800 leading-tight mb-4 group-hover:text-primary transition-colors line-clamp-1">
          {recipe.strMeal}
        </h3>
        
        <div className="flex items-center justify-between text-slate-500 font-medium">
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <Clock size={16} className="text-primary" />
            <span className="text-sm">30m</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <Users size={16} className="text-primary" />
            <span className="text-sm">2 Ppl</span>
          </div>
          <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100">
            <Flame size={16} className="text-primary" />
            <span className="text-sm">{recipe.strArea}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
