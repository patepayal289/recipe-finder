import React from 'react';
import { Home, Heart, Compass, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const MobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: <Home size={24} />, label: 'Home' },
    { path: '/?category=Gujarati', icon: <Compass size={24} />, label: 'Gujarati' },
    { path: '/favorites', icon: <Heart size={24} />, label: 'Favorites' },
    { path: '/profile', icon: <User size={24} />, label: 'Profile' }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-safe">
      <div className="flex justify-around items-center h-16 relative">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (location.pathname === '/' && location.search === item.path.replace('/', ''));
          
          return (
            <Link
              key={item.label}
              to={item.path}
              className="relative flex flex-col items-center justify-center w-full h-full text-slate-500 hover:text-primary transition-colors duration-300"
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute -top-[1px] w-12 h-1 bg-primary rounded-b-lg shadow-sm shadow-primary/50"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              
              <div className={`relative ${isActive ? 'text-primary' : 'text-slate-400'}`}>
                {item.icon}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 bg-primary/10 rounded-full scale-150 -z-10"
                  />
                )}
              </div>
              <span className={`text-[10px] mt-1 font-medium transition-all ${isActive ? 'text-primary' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
