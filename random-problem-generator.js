"use strict";
// Function to generate random math problems
function generateRandomProblem() {
    const operators = ['+', '-', '*', '/'];
    const num1 = Math.floor(Math.random() * 100) + 1;
    let num2 = Math.floor(Math.random() * 100) + 1;
    const operator = operators[Math.floor(Math.random() * operators.length)];
    // Avoid division by zero error
    if (operator === '/' && num2 === 0) {
        num2 = 1;
    }
    const problem = `${num1} ${operator} ${num2}`;
    const solution = eval(problem); // Evaluate the expression to get the solution
    return { problem, solution };
}
// Solve 10 random problems in a console application
for (let i = 0; i < 10; i++) {
    const { problem, solution } = generateRandomProblem();
    console.log(`Problem ${i + 1}: ${problem}`);
    // Simulate user input in a console application
    const userAnswer = require('readline-sync').question('Your answer: ');
    const parsedUserAnswer = parseFloat(userAnswer);
    if (!isNaN(parsedUserAnswer)) {
        if (parsedUserAnswer === solution) {
            console.log("Correct!\n");
        }
        else {
            console.log(`Wrong. The correct answer is ${solution}\n`);
        }
    }
    else {
        console.log("Invalid input. Please enter a number.\n");
    }
}
