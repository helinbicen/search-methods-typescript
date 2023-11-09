"use strict";
class PuzzleState {
    constructor(puzzle) {
        this.puzzle = puzzle;
        this.blank = puzzle.indexOf(0);
    }
    toString() {
        return `${this.puzzle.slice(0, 3).join(' ')}\n${this.puzzle.slice(3, 6).join(' ')}\n${this.puzzle.slice(6).join(' ')}`;
    }
    moveUp() {
        if (this.blank >= 3) {
            const newPuzzle = [...this.puzzle];
            [newPuzzle[this.blank], newPuzzle[this.blank - 3]] = [newPuzzle[this.blank - 3], newPuzzle[this.blank]];
            return new PuzzleState(newPuzzle);
        }
        return null;
    }
    moveDown() {
        if (this.blank < 6) {
            const newPuzzle = [...this.puzzle];
            [newPuzzle[this.blank], newPuzzle[this.blank + 3]] = [newPuzzle[this.blank + 3], newPuzzle[this.blank]];
            return new PuzzleState(newPuzzle);
        }
        return null;
    }
    moveLeft() {
        if (this.blank % 3 > 0) {
            const newPuzzle = [...this.puzzle];
            [newPuzzle[this.blank], newPuzzle[this.blank - 1]] = [newPuzzle[this.blank - 1], newPuzzle[this.blank]];
            return new PuzzleState(newPuzzle);
        }
        return null;
    }
    moveRight() {
        if (this.blank % 3 < 2) {
            const newPuzzle = [...this.puzzle];
            [newPuzzle[this.blank], newPuzzle[this.blank + 1]] = [newPuzzle[this.blank + 1], newPuzzle[this.blank]];
            return new PuzzleState(newPuzzle);
        }
        return null;
    }
}
// Implement Depth-Limited Search
function dlsSearch(currentState, goalState, depthLimit) {
    if (depthLimit === 0) {
        if (currentState.toString() === goalState.toString()) {
            return currentState;
        }
        return null;
    }
    for (const move of [currentState.moveUp(), currentState.moveDown(), currentState.moveLeft(), currentState.moveRight()]) {
        if (move) {
            const result = dlsSearch(move, goalState, depthLimit - 1);
            if (result) {
                return result;
            }
        }
    }
    return null;
}
// create inital & goal states
const initialPuzzle = [7, 2, 4, 5, 0, 6, 8, 3, 1];
const goalPuzzle = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const initialState = new PuzzleState(initialPuzzle);
const goalState = new PuzzleState(goalPuzzle);
// configıre depth limit
const depthLimit = 15;
// find solution
const solution = dlsSearch(initialState, goalState, depthLimit);
if (solution) {
    console.log("Solution found:");
    console.log(solution.toString());
}
else {
    console.log("depthLimit:" + depthLimit + " " + "Solution not found.");
}
