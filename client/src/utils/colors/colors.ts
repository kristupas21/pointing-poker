import Color from 'color';

export function generateCssVarName(name: string): string {
  return `--${name.split(/(?=[A-Z])/).join('-').toLowerCase()}`;
}

export function lightColor(color: string): string {
  return Color(color).lighten(0.27).hex();
}

export function lighterColor(color: string): string {
  return Color(color).lighten(0.27).mix(Color('#eeeeee'), 0.8).hex();
}

export function darkColor(color: string): string {
  return Color(color).darken(0.2).mix(Color('#706e6e'), 0.3).hex();
}

export function darkerColor(color: string): string {
  return Color(color).darken(0.15).mix(Color('#5e5e5e'), 0.6).hex();
}

export function colorWithOpacity(color: string, alpha: number) {
  return Color(color).alpha(alpha).rgb();
}

export function grayedColor(color: string): string {
  return Color(color).lighten(0.2).mix(Color('#EBECF2'), 0.97).hex();
}

export function colorTone(color: string): string {
  return Color(color).lighten(0.2).mix(Color('#FAF9FC'), 0.97).hex();
}
