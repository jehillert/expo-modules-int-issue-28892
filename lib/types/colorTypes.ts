import { MarkupType, MarkupTypeEnum } from './markTypes';

type ColorSetItem = {
  id: string;
  bg: string;
  fg: string;
  txt?: string;
  tag?: string;
};

type ColorSetName = 'classic';

type ColorSet = ColorSetItem[];

type RawColorSetItem = Omit<ColorSetItem, 'id'>;

type RawColorSet = RawColorSetItem[];

type UpdateHighlightCssParams = {
  colors: ColorSet;
  markupType: MarkupTypeEnum;
  alpha?: number;
};

type CssColorSet = {
  classPrefix: MarkupTypeEnum;
  colors: ColorSet;
};

type GetColorSetParams = {
  classPrefix: MarkupTypeEnum | MarkupType;
  bgColor?: string;
  colorIndexes?: number[];
  fgColor?: string;
  colorSetIndex: number;
  colorSetName?: ColorSetName;
  txt?: string;
};

export type {
  ColorSet,
  ColorSetName,
  CssColorSet,
  GetColorSetParams,
  RawColorSet,
  RawColorSetItem,
  UpdateHighlightCssParams,
};
