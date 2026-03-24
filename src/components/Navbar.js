import React, { useState } from 'react';
import { ChefHat, Menu, X, Heart, Dices, UserCircle2, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { localRecipes } from '../data/recipes';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  const menuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: 'auto' }
  };

  const surpriseMe = () => {
    const random = localRecipes[Math.floor(Math.random() * localRecipes.length)];
    navigate(`/recipe/${random.idMeal}`);
    setIsMenuOpen(false);
  };

  return (
    <nav className="glass-panel sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          <Link to="/" className="flex items-center gap-4 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-primary p-3 rounded-2xl text-white shadow-lg shadow-primary/30"
            >
              <ChefHat size={32} />
            </motion.div>
            <span className="font-black text-3xl tracking-tight text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary hidden lg:block">
              VegDelight
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6 xl:space-x-8">
            <Link to="/" className="text-slate-600 font-bold hover:text-primary transition-colors flex items-center gap-1.5 hover:-translate-y-0.5 transform duration-200 text-sm xl:text-base">
              Home
            </Link>
            <div className="h-4 w-px bg-slate-200"></div>
            <Link to="/?category=Gujarati" className="text-slate-600 font-bold hover:text-primary transition-colors hover:-translate-y-0.5 transform duration-200 text-sm xl:text-base">
              Gujarati
            </Link>
            <Link to="/?category=North Indian" className="text-slate-600 font-bold hover:text-primary transition-colors hover:-translate-y-0.5 transform duration-200 text-sm xl:text-base">
              North Indian
            </Link>
            <Link to="/?category=South Indian" className="text-slate-600 font-bold hover:text-primary transition-colors hover:-translate-y-0.5 transform duration-200 text-sm xl:text-base">
              South Indian
            </Link>
            
            <div className="h-4 w-px bg-slate-200 mx-2"></div>

            <button 
              onClick={surpriseMe}
              className="text-slate-600 font-bold hover:text-primary transition-colors flex items-center gap-2 hover:-translate-y-0.5 transform duration-200 text-sm xl:text-base"
            >
              <Dices size={20} className="text-primary" /> Surprise Me
            </button>

            <Link to="/favorites" className="text-slate-600 font-bold hover:text-primary transition-colors flex items-center gap-2 hover:-translate-y-0.5 transform duration-200 ml-4 relative">
              <div className="bg-rose-50 p-2 rounded-xl text-rose-500">
                <Heart size={20} className={favorites.length > 0 ? "fill-rose-500" : ""} />
              </div>
              {favorites.length > 0 && (
                <span className="absolute -top-1 left-7 bg-rose-500 text-white text-[11px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {favorites.length}
                </span>
              )}
            </Link>
            
            <button className="text-slate-600 hover:text-primary transition-colors">
              <UserCircle2 size={32} className="text-slate-300 hover:text-primary transition-colors" />
            </button>
          </div>

          <div className="md:hidden flex items-center bg-white/50 backdrop-blur-md rounded-2xl shadow-sm border border-slate-100 p-1.5">
             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2.5 text-slate-700 rounded-xl hover:bg-slate-100 transition-colors">
               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden bg-white/95 backdrop-blur-3xl border-b border-slate-100 absolute w-full shadow-2xl z-40 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-slate-800 hover:text-primary transition-colors p-3 hover:bg-slate-50 rounded-xl">Home</Link>
              <Link to="/?category=Gujarati" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-slate-800 hover:text-primary transition-colors p-3 hover:bg-slate-50 rounded-xl flex justify-between items-center">
                Gujarati Cuisine <Compass size={20} className="text-primary"/>
              </Link>
              <Link to="/?category=North Indian" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-slate-800 hover:text-primary transition-colors p-3 hover:bg-slate-50 rounded-xl flex justify-between items-center">
                North Indian <Compass size={20} className="text-primary"/>
              </Link>
              <Link to="/?category=South Indian" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-slate-800 hover:text-primary transition-colors p-3 hover:bg-slate-50 rounded-xl flex justify-between items-center">
                South Indian <Compass size={20} className="text-primary"/>
              </Link>
              <button 
                onClick={surpriseMe} 
                className="text-xl font-bold text-white bg-primary transition-colors p-4 rounded-xl flex justify-center items-center gap-3 mt-4 shadow-lg shadow-primary/30"
              >
                <Dices size={24} /> Surprise Me With A Dish!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
