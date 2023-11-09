"use strict";
class State {
    constructor(b, r, c, p) {
        this.board = b;
        this.blankRow = r;
        this.blankCol = c;
        this.path = p;
    }
}
function printBoard(board) {
    for (const row of board) {
        for (const tile of row) {
            if (tile === 0)
                console.log("  ");
            else
                console.log(tile + " ");
        }
        console.log();
    }
    console.log();
}
function isGoal(board) {
    const goal = [
        [1, 2, 3],
        [8, 0, 4],
        [7, 6, 5],
    ];
    return JSON.stringify(board) === JSON.stringify(goal);
}
const dr = [0, 0, -1, 1];
const dc = [-1, 1, 0, 0];
const moveStr = ["L", "R", "U", "D"];
function isValid(row, col) {
    return row >= 0 && row < 3 && col >= 0 && col < 3;
}
function solve8Puzzle(initial, maxDepth, maxIterations) {
    for (let depth = 0; depth <= maxDepth; ++depth) {
        const visited = new Set();
        const stack = [new State(initial, 0, 0, "")];
        let iterations = 0;
        while (stack.length > 0) {
            const current = stack.pop();
            if (current.path.length > depth) {
                continue;
            }
            if (isGoal(current.board)) {
                console.log("Çözüm adımları: " + current.path);
                return true;
            }
            visited.add(JSON.stringify(current.board));
            for (let i = 0; i < 4; ++i) {
                const newRow = current.blankRow + dr[i];
                const newCol = current.blankCol + dc[i];
                if (isValid(newRow, newCol)) {
                    const newBoard = [
                        ...current.board.map((row) => [...row]),
                    ];
                    [
                        newBoard[current.blankRow][current.blankCol],
                        newBoard[newRow][newCol],
                    ] = [
                        newBoard[newRow][newCol],
                        newBoard[current.blankRow][current.blankCol],
                    ];
                    const newBoardString = JSON.stringify(newBoard);
                    if (!visited.has(newBoardString)) {
                        stack.push(new State(newBoard, newRow, newCol, current.path + moveStr[i]));
                    }
                }
            }
            iterations++;
            if (iterations > maxIterations) {
                console.log("RangeError: Potential infinite loop: exceeded " +
                    maxIterations +
                    " iterations.");
                return false;
            }
        }
    }
    console.log("Çözüm bulunamadı");
    return false;
}
const initial = [
    [2, 8, 3],
    [1, 6, 4],
    [7, 0, 5],
];
const maxDepth = 31;
const maxIterations = 1500;
solve8Puzzle(initial, maxDepth, maxIterations);
