class State {
  board: number[][];
  blankRow: number;
  blankCol: number;
  path: string;

  constructor(b: number[][], r: number, c: number, p: string) {
    this.board = b;
    this.blankRow = r;
    this.blankCol = c;
    this.path = p;
  }
}

function printBoard(board: number[][]): void {
  for (const row of board) {
    for (const tile of row) {
      if (tile === 0) console.log("  ");
      else console.log(tile + " ");
    }
    console.log();
  }
  console.log();
}

function isGoal(board: number[][]): boolean {
  const goal: number[][] = [
    [1, 2, 3],
    [8, 0, 4],
    [7, 6, 5],
  ];
  return JSON.stringify(board) === JSON.stringify(goal);
}

const dr: number[] = [0, 0, -1, 1];
const dc: number[] = [-1, 1, 0, 0];
const moveStr: string[] = ["L", "R", "U", "D"];

function isValid(row: number, col: number): boolean {
  return row >= 0 && row < 3 && col >= 0 && col < 3;
}

function solve8Puzzle(
  initial: number[][],
  maxDepth: number,
  maxIterations: number
): boolean {
  for (let depth = 0; depth <= maxDepth; ++depth) {
    const visited: Set<string> = new Set();
    const stack: State[] = [new State(initial, 0, 0, "")];
    let iterations = 0;

    while (stack.length > 0) {
      const current: State = stack.pop()!;

      if (current.path.length > depth) {
        continue;
      }

      if (isGoal(current.board)) {
        console.log("Çözüm adımları: " + current.path);
        return true;
      }

      visited.add(JSON.stringify(current.board));

      for (let i = 0; i < 4; ++i) {
        const newRow: number = current.blankRow + dr[i];
        const newCol: number = current.blankCol + dc[i];

        if (isValid(newRow, newCol)) {
          const newBoard: number[][] = [
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
            stack.push(
              new State(newBoard, newRow, newCol, current.path + moveStr[i])
            );
          }
        }
      }

      iterations++;
      if (iterations > maxIterations) {
        console.log(
          "RangeError: Potential infinite loop: exceeded " +
            maxIterations +
            " iterations."
        );
        return false;
      }
    }
  }

  console.log("Çözüm bulunamadı");
  return false;
}

const initial: number[][] = [
  [2, 8, 3],
  [1, 6, 4],
  [7, 0, 5],
];
const maxDepth: number = 31;
const maxIterations: number = 1500;

solve8Puzzle(initial, maxDepth, maxIterations);
