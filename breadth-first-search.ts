class PuzzleNode {
  state: number[];
  parent: PuzzleNode | null;
  action: string;
  depth: number;

  constructor(
    state: number[],
    parent: PuzzleNode | null,
    action: string,
    depth: number
  ) {
    this.state = state;
    this.parent = parent;
    this.action = action;
    this.depth = depth;
  }

  isGoal(goalState: number[]): boolean {
    return this.state.every((value, index) => value === goalState[index]);
  }

  getSuccessors(): PuzzleNode[] {
    const successors: PuzzleNode[] = [];
    const emptyIndex = this.state.indexOf(0);

    const possibleMoves = [
      { action: "up", index: emptyIndex - 3 },
      { action: "down", index: emptyIndex + 3 },
      { action: "left", index: emptyIndex - 1 },
      { action: "right", index: emptyIndex + 1 },
    ];

    for (const move of possibleMoves) {
      if (move.index >= 0 && move.index < this.state.length) {
        const newState = this.state.slice();
        [newState[emptyIndex], newState[move.index]] = [
          newState[move.index],
          newState[emptyIndex],
        ];
        successors.push(
          new PuzzleNode(newState, this, move.action, this.depth + 1)
        );
      }
    }

    return successors;
  }
}

function dfsLimitedIterations(
  startState: number[],
  goalState: number[],
  maxIterations: number
): PuzzleNode | null {
  const startNode = new PuzzleNode(startState, null, "", 0);
  const stack: PuzzleNode[] = [startNode];
  const visited = new Set<string>();
  let iterations = 0;

  while (stack.length > 0) {
    const currentNode = stack.pop()!;

    if (currentNode.isGoal(goalState)) {
      return currentNode;
    }

    const successors = currentNode.getSuccessors();
    const unvisitedSuccessors = successors.filter(
      (successor) => !visited.has(successor.state.toString())
    );

    if (iterations < maxIterations) {
      stack.push(...unvisitedSuccessors);
      visited.add(currentNode.state.toString());
      iterations++;
    } else {
      // if number of iterations > 1000, skip
    }
  }

  return null;
}

function printSolution(solutionNode: PuzzleNode | null) {
  if (!solutionNode) {
    console.log("Solution not found.");
    return;
  }

  const actions: string[] = [];
  let currentNode: PuzzleNode | null = solutionNode;

  while (currentNode) {
    if (currentNode.action) {
      actions.unshift(currentNode.action);
    }
    currentNode = currentNode.parent;
  }

  console.log("Start state:");
  printState(startState);
  console.log("Goal state:");
  printState(goalState);
  console.log("Steps of solutions:");
  console.log(actions.join(" "));
}

function printState(state: number[]) {
  for (let i = 0; i < 9; i += 3) {
    console.log(state.slice(i, i + 3).join(" "));
  }
}

const startState = [7, 2, 4, 5, 0, 6, 8, 3, 1];
const goalState = [0, 1, 2, 3, 4, 5, 6, 7, 8];

console.log(startState);
console.log(goalState);

const solutionNode = dfsLimitedIterations(startState, goalState, 1000);
printSolution(solutionNode);
