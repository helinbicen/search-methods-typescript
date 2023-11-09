"use strict";
class PuzzleNode {
    constructor(state, parent, action, depth) {
        this.state = state;
        this.parent = parent;
        this.action = action;
        this.depth = depth;
    }
    isGoal(goalState) {
        return this.state.every((value, index) => value === goalState[index]);
    }
    getSuccessors() {
        const successors = [];
        const emptyIndex = this.state.indexOf(0);
        const possibleMoves = [
            { action: 'up', index: emptyIndex - 3 },
            { action: 'down', index: emptyIndex + 3 },
            { action: 'left', index: emptyIndex - 1 },
            { action: 'right', index: emptyIndex + 1 },
        ];
        for (const move of possibleMoves) {
            if (move.index >= 0 && move.index < this.state.length) {
                const newState = this.state.slice();
                [newState[emptyIndex], newState[move.index]] = [newState[move.index], newState[emptyIndex]];
                successors.push(new PuzzleNode(newState, this, move.action, this.depth + 1));
            }
        }
        return successors;
    }
}
function dfsLimitedIterations(startState, goalState, maxIterations) {
    const startNode = new PuzzleNode(startState, null, '', 0);
    const stack = [startNode];
    const visited = new Set();
    let iterations = 0;
    while (stack.length > 0) {
        const currentNode = stack.pop();
        if (currentNode.isGoal(goalState)) {
            return currentNode;
        }
        const successors = currentNode.getSuccessors();
        const unvisitedSuccessors = successors.filter((successor) => !visited.has(successor.state.toString()));
        if (iterations < maxIterations) {
            stack.push(...unvisitedSuccessors);
            visited.add(currentNode.state.toString());
            iterations++;
        }
        else {
            // if number of iterations > 1000 then, skip this part.
        }
    }
    return null;
}
function printSolution(solutionNode) {
    if (!solutionNode) {
        console.log('Solution not found.');
        return;
    }
    const actions = [];
    let currentNode = solutionNode;
    while (currentNode) {
        if (currentNode.action) {
            actions.unshift(currentNode.action);
        }
        currentNode = currentNode.parent;
    }
    console.log('start state:');
    printState(startState);
    console.log('goal state:');
    printState(goalState);
    console.log('solution parts:');
    console.log(actions.join(' '));
}
function printState(state) {
    for (let i = 0; i < 9; i += 3) {
        console.log(state.slice(i, i + 3).join(' '));
    }
}
const startState = [7, 2, 4, 5, 0, 6, 8, 3, 1];
const goalState = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const solutionNode = dfsLimitedIterations(startState, goalState);
printSolution(solutionNode);
