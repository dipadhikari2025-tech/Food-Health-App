import React, { useState } from 'react';
import axios from 'axios';
import { Clock, DollarSign, Cookie, Moon, Sparkles, AlertCircle } from 'lucide-react';

const SuggestionPanel = () => {
  const [context, setContext] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const situations = [
    { id: '10 mins', icon: <Clock size={20} />, label: 'Only 10 mins available', type: 'timeAvailable', val: '10 mins' },
    { id: 'low budget', icon: <DollarSign size={20} />, label: 'Low budget today', type: 'budget', val: 'low' },
    { id: 'craving junk', icon: <Cookie size={20} />, label: 'Craving junk food', type: 'craving', val: 'junk' },
    { id: 'late night', icon: <Moon size={20} />, label: 'Late night hunger', type: 'timeOfDay', val: 'late-night' },
  ];

  const fetchSuggestions = async (situation) => {
    setContext(situation.id);
    setLoading(true);
    try {
      const payload = { context: { [situation.type]: situation.val } };
      const res = await axios.post('http://localhost:5000/api/suggestions', payload);
      setSuggestions(res.data.suggestions);
    } catch (err) {
      console.error(err);
      // Mock Fallback
      setSuggestions([
        { title: "Smart Choice", description: "Based on your situation, try a handful of almonds and an apple.", type: situation.type }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Smart Suggestions</h2>
        <p className="text-slate-500 mt-1">What's your current situation?</p>
      </header>

      {/* Situation Selector */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {situations.map((sit) => (
          <button 
            key={sit.id}
            onClick={() => fetchSuggestions(sit)}
            className={`p-4 rounded-2xl border transition-all flex flex-col items-center justify-center text-center space-y-2
              ${context === sit.id 
                ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-md ring-2 ring-emerald-200' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300 hover:bg-slate-50'}`}
          >
            <div className={`${context === sit.id ? 'text-emerald-500' : 'text-slate-400'}`}>
              {sit.icon}
            </div>
            <span className="font-medium text-sm leading-tight">{sit.label}</span>
          </button>
        ))}
      </div>

      {/* Results Panel */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 min-h-[300px]">
        {!context ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4 py-12">
            <Sparkles size={48} className="text-slate-400" />
            <p className="text-slate-500">Select a situation above to get context-aware meal ideas.</p>
          </div>
        ) : loading ? (
          <div className="h-full flex flex-col items-center justify-center space-y-4 py-12">
            <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium animate-pulse">Analyzing context...</p>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="font-bold text-slate-800 flex items-center space-x-2">
              <Sparkles size={18} className="text-amber-500" />
              <span>Recommended for you</span>
            </h3>
            
            {suggestions.map((sug, i) => (
              <div key={i} className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="absolute left-0 top-0 w-1.5 h-full bg-emerald-400"></div>
                <h4 className="font-bold text-slate-800 text-lg mb-1">{sug.title}</h4>
                <p className="text-slate-600 leading-relaxed text-sm">{sug.description}</p>
                
                {/* Meta tag */}
                <div className="mt-3 flex items-center space-x-1 text-[10px] uppercase tracking-wider font-bold text-emerald-600 bg-emerald-50 w-max px-2 py-1 rounded-md">
                  <AlertCircle size={12} />
                  <span>{sug.type} Match</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestionPanel;
