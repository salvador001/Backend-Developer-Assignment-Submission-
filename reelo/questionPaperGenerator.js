// Helper function to shuffle the array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Helper function to get the weighted question index
function getWeightedIndex(weights) {
    let totalWeight = 0;
    for (let i = 0; i < weights.length; i++) {
        totalWeight += weights[i];
    }

    let randomValue = Math.random() * totalWeight;
    let weightSum = 0;

    for (let i = 0; i < weights.length; i++) {
        weightSum += weights[i];
        if (randomValue <= weightSum) {
            return i;
        }
    }
}

// Define the Questions and their weights
const Questions = [
    { "question": "What is the speed of light", "subject": "Physics", "topic": "Waves", "difficulty": "Easy", "marks": 5 },
    { "question": "What is the diameter of the earth", "subject": "Physics", "topic": "Size", "difficulty": "Medium", "marks": 10 },
    { "question": "What is the largest living organism", "subject": "Biology", "topic": "Size", "difficulty": "Hard", "marks": 15 },
    // ... add more questions here
];

const DifficultyWeights = { "Easy": 0.2, "Medium": 0.5, "Hard": 0.3 };

// Shuffle the array
shuffleArray(Questions);

// Generate the question paper
const questionPaper = [];
let totalMarks = 0;

while (totalMarks < 100) {
    const difficultyIndex = getWeightedIndex(Object.values(DifficultyWeights));
    const difficulty = Object.keys(DifficultyWeights)[difficultyIndex];

    for (let i = 0; i < Questions.length; i++) {
        if (Questions[i].difficulty === difficulty && totalMarks + Questions[i].marks <= 100) {
            questionPaper.push(Questions[i]);
            totalMarks += Questions[i].marks;
            break;
        }
    }
}
const fs = require('fs');
const output = questionPaper.map(question => JSON.stringify(question)).join('\n');
fs.writeFileSync('questionPaper.txt', output);
// console.log(questionPaper);