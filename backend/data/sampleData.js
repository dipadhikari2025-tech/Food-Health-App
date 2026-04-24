// Rule-based logic for suggestions

const getContextAwareSuggestions = (context, userHistory) => {
    const { timeAvailable, budget, craving, timeOfDay } = context;
    let suggestions = [];

    // 1. Time constraints
    if (timeAvailable === 'low' || timeAvailable === '10 mins') {
        suggestions.push({
            title: "Quick 10-Minute Meal",
            description: "Oatmeal with nuts and a banana. Fast, filling, and nutritious.",
            type: "time"
        });
        suggestions.push({
            title: "Grab & Go",
            description: "Greek yogurt with mixed berries and a spoonful of honey.",
            type: "time"
        });
    }

    // 2. Budget constraints
    if (budget === 'low') {
        suggestions.push({
            title: "Budget Friendly Protein",
            description: "Lentil soup or black bean wrap. High protein, very affordable.",
            type: "budget"
        });
        suggestions.push({
            title: "Cheap Greens",
            description: "Cabbage and carrot stir-fry with two boiled eggs.",
            type: "budget"
        });
    }

    // 3. Cravings
    if (craving && craving.toLowerCase().includes('junk')) {
        suggestions.push({
            title: "Healthier Alternative",
            description: "Craving a burger? Try a homemade turkey or black bean burger on a whole wheat bun.",
            type: "craving"
        });
        suggestions.push({
            title: "Sweet Tooth",
            description: "Dark chocolate (70%+) with a handful of almonds instead of a candy bar.",
            type: "craving"
        });
    }

    // 4. Time of Day (e.g., Late Night)
    if (timeOfDay === 'late-night') {
        suggestions.push({
            title: "Light Late-Night Snack",
            description: "A small bowl of cottage cheese or a warm glass of milk. Easy to digest.",
            type: "timeOfDay"
        });
        suggestions.push({
            title: "Avoid Heavy Foods",
            description: "Skip the heavy carbs; try a few slices of turkey or a handful of walnuts.",
            type: "timeOfDay"
        });
    }

    // Default suggestions if no specific context matches or if it's general
    if (suggestions.length === 0) {
        suggestions.push({
            title: "Balanced Plate",
            description: "Make sure your next meal has 1/2 veggies, 1/4 lean protein, and 1/4 complex carbs.",
            type: "general"
        });
        suggestions.push({
            title: "Hydration Check",
            description: "Have you drank enough water today? Drink a glass now.",
            type: "general"
        });
    }

    return suggestions;
};

// Simple logic to evaluate junk food intake
const evaluateHabits = (foodLogs) => {
    let junkCount = 0;
    foodLogs.forEach(log => {
        if (log.isJunk) junkCount++;
    });
    return {
        totalMeals: foodLogs.length,
        junkFoodCount: junkCount,
        consistencyScore: foodLogs.length > 0 ? Math.round(((foodLogs.length - junkCount) / foodLogs.length) * 100) : 0
    };
};

module.exports = {
    getContextAwareSuggestions,
    evaluateHabits
};
