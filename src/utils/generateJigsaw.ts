type Edge = 0 | -1 | 1;

function deepcopy(value: any): any {
  return JSON.parse(JSON.stringify(value));
}

function generate2DMatrix(n: number, m: number, value: any = null): any[][] {
  return Array.from({ length: m }, () =>
    Array.from({ length: n }, () => deepcopy(value))
  );
}

function hash(node: number[]) {
  const [i, j] = node;
  return `${i}-${j}`;
}

function generateJigsaw(n: number, m: number): Edge[][][] {
  // Generate blank matrix of dimensions n x m
  const jigsaw = generate2DMatrix(n, m, [0, 0, 0, 0]);
  const seen = new Set();

  // DFS propagation through matrix to create connections
  // Stack is used to circumvent recursion limit
  const stack: number[][] = [[0, 0]];
  while (stack.length > 0) {
    const node = stack.pop() as number[];
    const [i, j] = node;
    if (seen.has(hash(node))) continue;
    seen.add(hash(node));

    const nbrs = [
      // idx - direction
      [i - 1, j], // 0 - top
      [i, j + 1], // 1 - right
      [i + 1, j], // 2 - down
      [i, j - 1], // 3 - left
    ];
    nbrs.forEach((nbr, dir) => {
      // TODO: Check if nbr is seen here to prevent unneccessary work
      const [nbri, nbrj] = nbr;
      if (0 <= nbri && nbri < m && 0 <= nbrj && nbrj < n) {
        const nbrDir = (dir + 2) % 4;
        const edge = Math.random() < 0.5 ? -1 : 1;
        jigsaw[i][j][dir] = edge;
        jigsaw[nbri][nbrj][nbrDir] = -edge; // Neighbour must have opposing joint
        stack.push(nbr);
      }
    });
  }

  return jigsaw;
}

export default generateJigsaw;
