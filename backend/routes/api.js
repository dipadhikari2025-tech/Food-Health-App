const express = require('express');
const router = express.Router();
const { getContextAwareSuggestions, evaluateHabits } = require('../data/sampleData');

// --- Onboarding ---
router.post('/onboarding', (req, res) => {
    const { age, weight, goal, foodPreference } = req.body;
    
    // Validate minimal data
    if (!age || !goal || !foodPreference) {
        return res.status(400).json({ error: 'Missing required onboarding data.' });
    }

    // Save to mock DB
    global.mockDB.user = { age, weight, goal, foodPreference, onboardedAt: new Date() };
    
    res.status(200).json({ message: 'Onboarding complete', user: global.mockDB.user });
});

// --- Context-Aware Suggestions ---
router.post('/suggestions', (req, res) => {
    const context = req.body.context || {}; // { timeAvailable, budget, craving, timeOfDay }
    
    // Pass context and user history to the logic engine
    const suggestions = getContextAwareSuggestions(context, global.mockDB.foodLogs);
    
    res.status(200).json({ suggestions });
});

// --- Quick Food Logging ---
router.post('/log', (req, res) => {
    const { foodName, calories, isJunk } = req.body;
    
    if (!foodName) {
        return res.status(400).json({ error: 'Food name is required.' });
    }

    const newLog = {
        id: Date.now().toString(),
        foodName,
        calories: calories || 0,
        isJunk: isJunk || false,
        timestamp: new Date()
    };

    global.mockDB.foodLogs.push(newLog);

    // Re-evaluate habits after logging
    global.mockDB.habits = evaluateHabits(global.mockDB.foodLogs);

    res.status(201).json({ message: 'Food logged successfully', log: newLog, newHabits: global.mockDB.habits });
});

// --- Dashboard / Habits ---
router.get('/dashboard', (req, res) => {
    // Determine smart nudges based on recent activity
    let nudge = "You're doing great! Keep up the consistency.";
    
    if (global.mockDB.habits.junkFoodCount > 3) {
        nudge = "You've had a bit of junk food lately. Let's try adding more greens today! Remember, small steps.";
    } else if (global.mockDB.foodLogs.length === 0 && global.mockDB.user) {
        nudge = "Welcome! Let's log your first meal today. Don't worry about being perfect.";
    }

    res.status(200).json({
        user: global.mockDB.user,
        recentLogs: global.mockDB.foodLogs.slice(-5).reverse(), // Last 5 logs
        habits: global.mockDB.habits,
        nudge
    });
});

module.exports = router;
