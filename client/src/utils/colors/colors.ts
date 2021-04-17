import Color from 'color';

export function generateCssVarName(name: string): string {
  return `--${name.split(/(?=[A-Z])/).join('-').toLowerCase()}`;
}

export function lightColor(color: string): string {
  return Color(color).lighten(0.27).hex();
}

export function lighterColor(color: string): string {
  return Color(color).lighten(0.27).mix(Color('#EEEEEE'), 0.8).hex();
}

export function darkColor(color: string): string {
  return Color(color).darken(0.2).mix(Color('#706e6e'), 0.3).hex();
}

export function darkerColor(color: string): string {
  return Color(color).darken(0.15).mix(Color('#5e5e5e'), 0.6).hex();
}