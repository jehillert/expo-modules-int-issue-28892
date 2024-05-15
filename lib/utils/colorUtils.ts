// for alternatives, check out https://github.com/TomKopp/CssColor/tree/master/packages
import Color from 'color';
import { colorSets, defaultColorSetIndexes, deltaOfAlpha } from '../constants';
import {
  ColorSetName,
  GetColorSetParams,
  UpdateHighlightCssParams,
} from '../types';
import { clamp } from './mathUtils';

type GetMarkupColors = {
  colorSetName: ColorSetName;
  colorSetIndex: number;
  colorIndex: number;
};

const getColorSet = ({
  classPrefix,
  bgColor,
  colorSetName = 'classic',
  colorSetIndex,
  colorIndexes = defaultColorSetIndexes,
  fgColor,
  txt,
}: GetColorSetParams) => {
  const set = colorSets[colorSetName][colorSetIndex];
  const filteredSet = colorIndexes.map(i => set[i]);
  const colors = filteredSet.map(({ fg, bg }, index) =>
    txt
      ? {
          id: `${classPrefix}${index}`,
          bg: bgColor ?? bg,
          fg: fgColor ?? fg,
          txt,
        }
      : {
          id: `${classPrefix}${index}`,
          bg: bgColor ?? bg,
          fg: fgColor ?? fg,
        },
  );
  return colors;
};

const getContrastColor = (baseColor: string) => {
  const color = Color(baseColor);
  if (color.isLight()) {
    return color.saturate(0.7).darken(0.7).toString();
  }

  return color.lighten(0.95).toString();
};

const getMarkupStyles = ({
  colorSetName,
  colorSetIndex,
  colorIndex,
}: GetMarkupColors) => colorSets[colorSetName][colorSetIndex][colorIndex];

const hexToRgb = (hex: string, a: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const alpha = Number(a.toFixed(2));

  return alpha
    ? `rgba(${r}, ${g}, ${b}, ${String(alpha)})`
    : `rgba(${r}, ${g}, ${b})`;
};

const setHexAlpha = (hex: string, alpha: number) => {
  if (hex.length !== 7 && hex.length !== 9) return hex;
  const baseHex = hex.slice(0, 7);
  const hexAlpha = Math.round(alpha * 255).toString(16);
  return `${baseHex}${hexAlpha.toUpperCase()}`;
};

const setRgbAlpha = (color: string, alpha: number) => {
  const _alpha = Number(alpha.toFixed(2));
  const splitRGB = color.split(', ');

  if (color.startsWith('#')) {
    return hexToRgb(color, _alpha);
  }

  if (splitRGB.length !== 3 && splitRGB.length !== 4) {
    return color;
  }

  return `${splitRGB[0]}, ${splitRGB[1]}, ${splitRGB[2]}, ${_alpha})`;
};

const offsetAlpha = (color: string, alphaOffset: number) => {
  const _alphaOffset = Number(alphaOffset.toFixed(2));
  let splitRGB = (color.startsWith('#') ? hexToRgb(color, 0) : color).split(
    ', ',
  );
  if (splitRGB.length !== 3 && splitRGB.length !== 4) {
    return color;
  }
  const oldAlpha = splitRGB.length === 3 ? 0 : parseFloat(splitRGB[3]);
  const newAlpha = clamp(oldAlpha + _alphaOffset, 0, 1);
  return `${splitRGB[0]}, ${splitRGB[1]}, ${splitRGB[2]}, ${newAlpha})`;
};

const adjustMarkOpacity = (
  bgColor: string,
  alpha?: string | number | undefined,
) => {
  if (alpha === undefined || Number(alpha) === 1) {
    return bgColor;
  }

  return Color(bgColor).alpha(Number(alpha)).toString();
};

const colorWhenSelected = (
  bgColor: string,
  isSelected?: boolean | undefined,
) =>
  isSelected ? Color(bgColor).fade(deltaOfAlpha).hexa().toString() : bgColor;

const updateHighlightCss = ({
  colors,
  markupType,
  alpha,
}: UpdateHighlightCssParams) => {
  const getColorStyles = (isSelect: boolean = false) =>
    colors.reduce((accum, { bg, fg }, index) => {
      let bgColor = bg;
      bgColor = adjustMarkOpacity(bg, alpha);
      bgColor = colorWhenSelected(bg, isSelect);
      return `${accum} ${
        isSelect ? `.selected-mark` : ``
      }.${markupType}${index} { background-color: ${bgColor}; color: ${fg}; }`;
    }, '');

  return {
    unselected: getColorStyles(),
    selected: getColorStyles(true),
  };
};

const colorUtils = {
  hexToRgb,
  offsetAlpha,
  setHexAlpha,
  setRgbAlpha,
};

export {
  adjustMarkOpacity,
  colorUtils,
  colorWhenSelected,
  getColorSet,
  getContrastColor,
  getMarkupStyles,
  updateHighlightCss,
};
