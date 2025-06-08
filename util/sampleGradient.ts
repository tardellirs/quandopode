// converts given hex color to rgb object
function hexToRgb(hex: string) {
  if (hex.startsWith('#')) hex = hex.slice(1)
  if (hex.length === 3)
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('')
  if (hex.length !== 6) throw 'invalid hex length'
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  }
}

// linearly interpolates between a and b by t
function lerp(a: number, b: number, t: number) {
  return a * (1 - t) + b * t
}

// linearly interpolates between two hex colors
export function lerpColor(colorA: string, colorB: string, t: number) {
  const rgbA = hexToRgb(colorA)
  const rgbB = hexToRgb(colorB)
  const r = lerp(rgbA.r, rgbB.r, t)
  const g = lerp(rgbA.g, rgbB.g, t)
  const b = lerp(rgbA.b, rgbB.b, t)
  return `rgb(${r}, ${g}, ${b})`
}

// find percentage of distance to b that t is from a, b > a
function progress(a: number, b: number, t: number) {
  const distance = b - a
  return (t - a) / distance
}

// returns a color gradient of size shades + 1
export function sampleGradient(shades: number) {
  // calculate shade levels
  const levels = Array(shades + 1)
    .fill(0)
    .map((v, i) => i / shades || 0)
  // convert shade levels to colors
  return levels.map((x) => {
    if (x === 0) return '#E0E0E0'
    if (x < 0.33) return lerpColor('#E8F5E9', '#A5D6A7', progress(0, 0.33, x))
    if (x < 0.69)
      return lerpColor('#A5D6A7', '#66BB6A', progress(0.33, 0.69, x))
    if (x < 0.82)
      return lerpColor('#66BB6A', '#43A047', progress(0.69, 0.82, x))
    return lerpColor('#43A047', '#2E7D32', progress(0.82, 1, x))
  })
}
