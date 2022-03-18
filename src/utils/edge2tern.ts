export default function edge2tern(edges: number[]): string {
  // e.g.: [-1, 0, 1, 1] -> "1102"
  const edgeMap = { "-1": 2, "0": 0, "1": 1 } as { [edge: string]: number };
  const ternary: string = edges
    .map((edge) => edgeMap[String(edge)])
    .reverse()
    .join("");
  return ternary;
}
