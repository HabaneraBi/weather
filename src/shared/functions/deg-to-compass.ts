export function degToCompass(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  // 360° / 8 = 45°, каждая зона по 45°
  return dirs[Math.round(deg / 45) % 8];
}
