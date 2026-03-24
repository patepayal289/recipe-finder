import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, Flame, Tag, CheckCircle2 } from 'lucide-react';
import Loader from '../components/Loader';
import { localRecipes } from '../data/recipes';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      const found = localRecipes.find(r => r.idMeal === id);
      if (found) {
        setRecipe(found);
      } else {
        setError('Recipe not found.');
      }
      setLoading(false);
    }, 300); // Simulate premium networking delay

  }, [id]);

  if (loading) return <Loader />;

  if (error || !recipe) return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center space-y-4">
      <div className="bg-red-50 text-red-600 p-6 rounded-2xl shadow-sm border border-red-200">
        <p className="text-xl font-medium">{error}</p>
      </div>
      <button onClick={() => navigate('/')} className="text-primary-600 hover:underline flex items-center gap-2 font-bold">
        <ArrowLeft size={16} /> Back to VegDelight Home
      </button>
    </div>
  );

  const getIngredients = () => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push({ ingredient, measure });
        }
    }
    return ingredients;
  };

  const ingredients = getIngredients();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-slate-50 min-h-screen pb-20"
    >
      {/* Hero Header with Background Image Blur */}
      <div className="relative h-96 w-full overflow-hidden">
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal} 
          className="w-full h-full object-cover blur-md scale-110 opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
        
        <div className="absolute top-8 left-4 md:left-8 z-20">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-lg border border-white/20"
          >
            <ArrowLeft size={18} /> Back
          </button>
        </div>

        <div className="absolute bottom-10 left-4 md:left-8 right-4 md:right-8 z-20">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col gap-4 text-white max-w-5xl mx-auto"
          >
            <div className="flex flex-wrap gap-2">
              {recipe.strCategory && (
                <span className="bg-primary-500/90 text-white px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide flex items-center gap-1.5 shadow-sm border border-primary-500/50">
                  <Tag size={14} /> {recipe.strCategory}
                </span>
              )}
              {recipe.strArea && (
                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide flex items-center gap-1.5 shadow-sm border border-white/30">
                  <Flame size={14} /> {recipe.strArea}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-xl">{recipe.strMeal}</h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Image & Ingredients */}
        <div className="lg:col-span-4 space-y-8">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform -translate-y-24 hidden lg:block"
          >
            <img 
              src={recipe.strMealThumb} 
              alt={recipe.strMeal} 
              className="w-full object-cover aspect-square hover:scale-110 transition-transform duration-700"
            />
          </motion.div>

          {/* Metrics Card */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex justify-between items-center text-slate-600 lg:-mt-16"
          >
            <div className="flex flex-col items-center">
              <Clock className="text-primary-500 mb-2" size={24} />
              <span className="text-sm font-medium">45 Mins</span>
            </div>
            <div className="h-10 w-px bg-slate-200"></div>
            <div className="flex flex-col items-center">
              <Users className="text-primary-500 mb-2" size={24} />
              <span className="text-sm font-medium">Serves 2-4</span>
            </div>
            <div className="h-10 w-px bg-slate-200"></div>
            <div className="flex flex-col items-center">
              <Flame className="text-primary-500 mb-2" size={24} />
              <span className="text-sm font-medium">{recipe.strArea}</span>
            </div>
          </motion.div>

          {/* Ingredients list */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"
          >
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary-500/10 text-primary-500 flex items-center justify-center">
                📋
              </span>
              Ingredients
            </h2>
            <ul className="space-y-4">
              {ingredients.map((item, index) => (
                <li key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 pb-3 border-b-slate-100 last:border-b-transparent">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-green-500" />
                    <span className="font-medium text-slate-700 capitalize">{item.ingredient}</span>
                  </div>
                  <span className="text-slate-500 text-sm font-medium bg-slate-100 px-3 py-1 rounded-full">{item.measure}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Right Column: Instructions */}
        <div className="lg:col-span-8 space-y-10">
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center text-xl">
                👨‍🍳
              </span>
              Method
            </h2>
            <div className="prose prose-lg prose-slate max-w-none prose-p:leading-relaxed prose-p:text-slate-600 marker:text-primary-500">
              {recipe.strInstructions.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
                <p key={index} className="mb-6 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-3 before:w-2 before:h-2 before:bg-primary-500 before:rounded-full">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeDetails;
