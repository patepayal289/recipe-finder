import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="font-sans antialiased text-slate-800 bg-slate-50 min-h-screen relative md:pb-0">
          <Toaster position="top-center" />
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipe/:id" element={<RecipeDetails />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </AnimatePresence>
          <MobileBottomNav />
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
