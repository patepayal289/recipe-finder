import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { useFavorites } from '../context/FavoritesContext';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-slate-50 pt-8 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <Link to="/" className="p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
          <ArrowLeft className="text-slate-600" size={24} />
        </Link>
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 flex items-center gap-3 tracking-tight">
            My Favorites
            <Heart className="text-rose-500 fill-rose-500 mt-1" size={32} />
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Your curated collection of loved recipes.</p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100 max-w-3xl mx-auto mt-20"
        >
          <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="text-rose-400" size={48} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">No favorites yet!</h2>
          <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto">
            Explore our collection and tap the heart icon to save recipes you love for quick access later.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
            Discover Recipes
          </Link>
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {favorites.map((recipe, index) => (
            <motion.div
              key={recipe.idMeal}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <RecipeCard recipe={recipe} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Favorites;
