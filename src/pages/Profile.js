import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Heart, Clock, Bell, LogOut, ChevronRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const menuItems = [
    { icon: <Heart size={22} className="text-rose-500" />, label: 'My Favorites', value: `${favorites.length} Recipes`, onClick: () => navigate('/favorites') },
    { icon: <Clock size={22} className="text-orange-500" />, label: 'Cooking History', value: '12 Dishes' },
    { icon: <Bell size={22} className="text-blue-500" />, label: 'Notifications', value: 'On' },
    { icon: <ShieldCheck size={22} className="text-emerald-500" />, label: 'Dietary Preferences', value: 'Pure Veg' },
    { icon: <Settings size={22} className="text-slate-500" />, label: 'App Settings' },
    { icon: <HelpCircle size={22} className="text-purple-500" />, label: 'Help & Support' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-slate-50 pb-32"
    >
      {/* Profile Header Block */}
      <div className="bg-white px-6 pt-12 pb-8 shadow-sm rounded-b-[2rem] border-b border-slate-100 flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-primary to-orange-400 p-1 shadow-xl shadow-primary/20">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-1">
              <img 
                src="https://ui-avatars.com/api/?name=Veg+User&background=fff&color=ea580c&size=150" 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border border-slate-100 text-slate-700 hover:text-primary transition-colors">
            <User size={16} />
          </button>
        </div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Food Enthusiast</h1>
        <p className="text-slate-500 font-medium mt-1">user@vegdelight.com</p>
        
        <div className="flex gap-4 mt-6 w-full max-w-sm">
          <div className="flex-1 bg-slate-50 py-3 rounded-2xl border border-slate-100">
            <p className="text-2xl font-black text-primary">{favorites.length}</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Saved</p>
          </div>
          <div className="flex-1 bg-slate-50 py-3 rounded-2xl border border-slate-100">
            <p className="text-2xl font-black text-primary">24</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Cooked</p>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-3">
        {menuItems.map((item, index) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 + 0.2 }}
            key={index}
            onClick={item.onClick}
            className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-slate-100 cursor-pointer hover:border-primary/30 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-slate-50 p-3 rounded-xl group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <span className="font-bold text-slate-700">{item.label}</span>
            </div>
            <div className="flex items-center gap-3">
              {item.value && <span className="text-sm font-medium text-slate-400">{item.value}</span>}
              <ChevronRight size={20} className="text-slate-300 group-hover:text-primary transition-colors" />
            </div>
          </motion.div>
        ))}

        {/* Logout Button */}
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full mt-8 bg-rose-50 text-rose-600 p-4 rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-rose-500 hover:text-white transition-all border border-rose-100 shadow-sm"
        >
          <LogOut size={20} />
          Sign Out
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Profile;
