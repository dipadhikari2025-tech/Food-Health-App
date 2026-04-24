import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, Flame, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState({
    habits: { consistency: 0, junkFoodCount: 0 },
    recentLogs: [],
    nudge: "Loading your insights..."
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/dashboard');
        setData(res.data);
      } catch (err) {
        // Mock fallback
        setData({
          habits: { consistency: 85, junkFoodCount: 1 },
          recentLogs: [{ id: 1, foodName: 'Oatmeal & Banana', calories: 350, timestamp: new Date() }],
          nudge: "You're doing great! Keep up the consistency."
        });
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="space-y-6 max-w-2xl mx-auto py-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Your Dashboard</h2>
        <p className="text-slate-500 mt-1">Here is how you are doing today.</p>
      </header>

      {/* Smart Nudge */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white shadow-lg shadow-emerald-200">
        <div className="flex items-start space-x-4">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
            <Award className="text-white" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Today's Insight</h3>
            <p className="text-emerald-50 leading-relaxed">{data.nudge}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-3">
            <Activity size={24} />
          </div>
          <span className="text-3xl font-bold text-slate-800">{data.habits.consistency}%</span>
          <span className="text-sm font-medium text-slate-500 mt-1">Consistency Score</span>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-3">
            <Flame size={24} />
          </div>
          <span className="text-3xl font-bold text-slate-800">{data.habits.junkFoodCount}</span>
          <span className="text-sm font-medium text-slate-500 mt-1">Junk Meals this Week</span>
        </div>
      </div>

      {/* Recent Logs */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-bold text-slate-800">Recent Meals</h3>
          <Link to="/log" className="text-sm font-medium text-emerald-600 flex items-center hover:text-emerald-700">
            Log new <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="space-y-3">
          {data.recentLogs.length > 0 ? data.recentLogs.map((log, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
              <div>
                <p className="font-semibold text-slate-800">{log.foodName}</p>
                <p className="text-xs text-slate-400 mt-0.5">{new Date(log.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-bold text-slate-700">{log.calories > 0 ? `${log.calories} kcal` : ''}</span>
                {log.isJunk && <span className="text-[10px] uppercase font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full mt-1">Junk Food</span>}
              </div>
            </div>
          )) : (
            <div className="text-center p-8 bg-slate-100/50 rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-500 mb-4">No meals logged yet today.</p>
              <Link to="/log" className="px-5 py-2.5 bg-white border border-slate-200 shadow-sm rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                Log your first meal
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
