import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, UtensilsCrossed, Search } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import { localRecipes } from '../data/recipes';

const categories = ["All", "Gujarati", "North Indian", "South Indian"];

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [error, setError] = useState('');
  const [homeSearch, setHomeSearch] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get('search');
  const categoryParam = queryParams.get('category');

  useEffect(() => {
    setLoading(true);
    setError('');

    setTimeout(() => {
      let filtered = localRecipes;

      if (categoryParam) {
        if (categories.includes(categoryParam) && categoryParam !== "All") {
          setActiveCategory(categoryParam);
          filtered = localRecipes.filter(r => r.strCategory === categoryParam);
        } else {
          setActiveCategory("All");
        }
      } else if (searchParam) {
        setActiveCategory('');
        filtered = localRecipes.filter(r => 
          r.strMeal.toLowerCase().includes(searchParam.toLowerCase()) || 
          r.strCategory.toLowerCase().includes(searchParam.toLowerCase())
        );
      } else if (activeCategory !== "All") {
        filtered = localRecipes.filter(r => r.strCategory === activeCategory);
      }

      if (filtered.length > 0) {
        setRecipes(filtered);
      } else {
        setRecipes([]);
        if (searchParam) {
          setError(`We couldn't find anything for "${searchParam}". Try "Paneer" or "Dosa"!`);
        } else {
          setError('No recipes found for this category.');
        }
      }
      setLoading(false);
    }, 400);

  }, [searchParam, categoryParam, activeCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (homeSearch.trim()) {
      navigate(`/?search=${homeSearch}`);
      setHomeSearch('');
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/?category=${category}`);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-10 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-4xl mx-auto mb-16 mt-6"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 shadow-sm border border-primary/20 tracking-wide uppercase">
          <Sparkles size={16} className="text-primary" /> Curated Pure Veg Collection
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
          What are you craving <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            today?
          </span>
        </h1>
        <p className="text-lg md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
          Find your next comfort meal, perfectly spiced and completely vegetarian.
        </p>

        {/* Big Beautiful Hero Search Bar */}
        <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto group shadow-2xl rounded-full">
          <input
            type="text"
            placeholder="Search 'Paneer', 'Dhokla', or 'Dosa'..."
            value={homeSearch}
            onChange={(e) => setHomeSearch(e.target.value)}
            className="w-full pl-6 md:pl-8 pr-16 py-5 md:py-6 rounded-full bg-white border-2 border-transparent focus:outline-none focus:border-primary/30 focus:ring-8 focus:ring-primary/10 transition-all text-slate-800 font-medium text-lg placeholder-slate-400"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white p-3 md:p-4 rounded-full hover:bg-primary/90 hover:scale-105 transition-all shadow-md">
            <Search size={24} />
          </button>
        </form>
      </motion.div>

      {/* Categories Filter (Always show for user friendliness) */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6 text-slate-800 font-bold text-2xl">
          <UtensilsCrossed size={28} className="text-primary hidden sm:block" />
          <h2>Explore Regions</h2>
        </div>
        <motion.div 
          className="flex overflow-x-auto pb-6 pt-2 hide-scrollbar gap-4 custom-scrollbar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`flex-shrink-0 px-8 py-4 rounded-3xl font-bold text-base md:text-lg transition-all duration-300 shadow-sm border ${
                activeCategory === category
                  ? 'bg-primary text-white border-primary shadow-primary/40 shadow-xl scale-105'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-primary/50 hover:bg-primary/5'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Title for Search Results */}
      {searchParam && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800">
            Results for <span className="text-primary">"{searchParam}"</span>
          </h2>
        </div>
      )}

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-orange-50 border border-orange-200 text-orange-700 p-8 rounded-3xl text-center max-w-2xl mx-auto shadow-sm"
          >
            <p className="text-xl font-bold">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recipe Grid */}
      {loading ? (
        <Loader />
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {recipes.map((recipe, index) => (
            <motion.div
              key={recipe.idMeal}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <RecipeCard recipe={recipe} />
            </motion.div>
          ))}
        </motion.div>
      )}

    </div>
  );
};

export default Home;
