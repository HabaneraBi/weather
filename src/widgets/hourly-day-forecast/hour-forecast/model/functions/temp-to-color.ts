export function tempToColor(t: number) {
  if (t <= -5) return "#5B8DEF"; // холодно — синие
  if (t <= 5) return "#78A6F5";
  if (t <= 15) return "#A8D8A5";
  if (t <= 25) return "#FFD166"; // тепло — жёлтые
  return "#F87272"; // жарко — красные
}
