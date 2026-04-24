import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, PlusCircle, PieChart, User as UserIcon } from 'lucide-react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import FoodLog from './components/FoodLog';
import SuggestionPanel from './components/SuggestionPanel';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is onboarded (in a real app, check localStorage or token)
  useEffect(() => {
    // Basic mock logic: if no user and not on onboarding, redirect
    if (!user && location.pathname !== '/onboarding') {
      navigate('/onboarding');
    }
  }, [user, navigate, location]);

  const navItems = [
    { path: '/', icon: <Home size={24} />, label: 'Home' },
    { path: '/log', icon: <PlusCircle size={24} />, label: 'Log' },
    { path: '/suggestions', icon: <PieChart size={24} />, label: 'Tips' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Header */}
      {user && (
        <header className="md:hidden bg-white shadow-sm p-4 sticky top-0 z-10">
          <h1 className="text-xl font-bold text-emerald-600">NutriCoach</h1>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl mx-auto w-full p-4 overflow-y-auto">
        <Routes>
          <Route path="/onboarding" element={<Onboarding onComplete={(u) => { setUser(u); navigate('/'); }} />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/log" element={<FoodLog />} />
          <Route path="/suggestions" element={<SuggestionPanel />} />
        </Routes>
      </main>

      {/* Mobile Bottom Navigation */}
      {user && (
        <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 flex justify-around p-3 z-10">
          {navItems.map(item => (
            <Link key={item.path} to={item.path} className={`flex flex-col items-center ${location.pathname === item.path ? 'text-emerald-600' : 'text-slate-500'}`}>
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </nav>
      )}

      {/* Desktop Sidebar Navigation */}
      {user && (
        <aside className="hidden md:flex flex-col w-64 bg-white shadow-xl h-screen sticky top-0">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-emerald-600 mb-8">NutriCoach</h1>
            <nav className="space-y-4">
              {navItems.map(item => (
                <Link key={item.path} to={item.path} className={`flex items-center space-x-3 p-3 rounded-xl transition-colors ${location.pathname === item.path ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-6 border-t border-slate-100">
            <div className="flex items-center space-x-3 text-slate-600">
              <UserIcon size={24} />
              <span className="font-medium">{user.age ? `User (${user.age})` : 'Profile'}</span>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

export default App;
