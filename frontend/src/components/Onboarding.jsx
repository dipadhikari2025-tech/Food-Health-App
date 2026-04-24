import React, { useState } from 'react';
import axios from 'axios';

const Onboarding = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    goal: 'maintain',
    foodPreference: 'anything'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mock API call to backend
      const res = await axios.post('http://localhost:5000/api/onboarding', formData);
      onComplete(res.data.user);
    } catch (err) {
      console.error(err);
      // Fallback if backend is not running
      onComplete(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome</h2>
          <p className="text-slate-500">Let's personalize your experience.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
              <input type="number" name="age" required value={formData.age} onChange={handleChange} 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="25" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Weight (kg)</label>
              <input type="number" name="weight" value={formData.weight} onChange={handleChange} 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="70" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Primary Goal</label>
            <select name="goal" value={formData.goal} onChange={handleChange} 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white">
              <option value="lose">Lose weight</option>
              <option value="maintain">Maintain health</option>
              <option value="gain">Gain muscle</option>
              <option value="energy">More energy</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Food Preference</label>
            <select name="foodPreference" value={formData.foodPreference} onChange={handleChange} 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white">
              <option value="anything">Anything</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="keto">Keto</option>
            </select>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-4 mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-95 flex justify-center items-center">
            {loading ? <span className="animate-pulse">Saving...</span> : 'Get Started'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
