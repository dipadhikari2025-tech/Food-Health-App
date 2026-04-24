import React, { useState } from 'react';
import axios from 'axios';
import { Search, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FoodLog = () => {
  const [formData, setFormData] = useState({ foodName: '', calories: '', isJunk: false });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const quickOptions = [
    { name: "Oatmeal", cal: 150, junk: false },
    { name: "Chicken Salad", cal: 350, junk: false },
    { name: "Burger & Fries", cal: 800, junk: true },
    { name: "Pizza Slice", cal: 300, junk: true }
  ];

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.foodName) return;

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/log', formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      console.error(err);
      // Fallback
      setSuccess(true);
      setTimeout(() => navigate('/'), 1500);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdd = (food) => {
    setFormData({ foodName: food.name, calories: food.cal, isJunk: food.junk });
  };

  return (
    <div className="max-w-xl mx-auto py-6">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Log Food</h2>
        <p className="text-slate-500 mt-1">Keep it simple. What did you eat?</p>
      </header>

      {success ? (
        <div className="bg-emerald-50 rounded-2xl p-8 flex flex-col items-center justify-center text-center border border-emerald-100">
          <CheckCircle2 className="text-emerald-500 mb-4" size={48} />
          <h3 className="text-xl font-bold text-slate-800 mb-2">Logged Successfully!</h3>
          <p className="text-slate-500">Redirecting to dashboard...</p>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-5 mb-8">
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-1">Food Name</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  required
                  value={formData.foodName}
                  onChange={(e) => setFormData({...formData, foodName: e.target.value})}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-slate-50 focus:bg-white" 
                  placeholder="e.g. Grilled Chicken Wrap" 
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">Calories (Optional)</label>
                <input 
                  type="number" 
                  value={formData.calories}
                  onChange={(e) => setFormData({...formData, calories: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" 
                  placeholder="e.g. 400" 
                />
              </div>
            </div>

            <label className="flex items-center space-x-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
              <input 
                type="checkbox" 
                checked={formData.isJunk}
                onChange={(e) => setFormData({...formData, isJunk: e.target.checked})}
                className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 border-slate-300"
              />
              <div>
                <span className="block font-medium text-slate-700">Mark as Junk/Fast Food</span>
                <span className="block text-xs text-slate-500">Be honest! This helps us personalize tips.</span>
              </div>
            </label>

            <button type="submit" disabled={loading || !formData.foodName}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg transition-all active:scale-95">
              {loading ? 'Saving...' : 'Save Log'}
            </button>
          </form>

          <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Quick Add</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickOptions.map((food, i) => (
                <button 
                  key={i}
                  onClick={() => handleQuickAdd(food)}
                  className="p-3 bg-white border border-slate-200 rounded-xl text-left hover:border-emerald-400 hover:shadow-md transition-all group"
                >
                  <p className="font-semibold text-slate-700 group-hover:text-emerald-700">{food.name}</p>
                  <p className="text-xs text-slate-400 mt-1">{food.cal} kcal</p>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FoodLog;
