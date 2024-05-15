import { ColorSetName, RawColorSet } from '../types';

export const deltaOfAlpha = 0.3;

export const defaultColorSetIndexes = [0, 2, 4, 6, 8, 10];

export const defaultLocalIndex = 1;

export const defaultGlobalIndex = 4;

export const colorSets: Record<ColorSetName, RawColorSet[]> = {
  classic: [
    [
      { fg: '#000000', bg: '#E6D0ED', tag: 'violet' },
      { fg: '#000000', bg: '#DBCBE9', tag: 'purple' },
      { fg: '#000000', bg: '#CBDCF6', tag: 'blue' },
      { fg: '#000000', bg: '#CEEFF3', tag: 'teal' },
      { fg: '#000000', bg: '#CCF5D2', tag: 'green' },
      { fg: '#000000', bg: '#EEF9CC', tag: 'lime' },
      { fg: '#000000', bg: '#FEFBCC', tag: 'yellow' },
      { fg: '#000000', bg: '#FEF3CC', tag: 'gold' },
      { fg: '#000000', bg: '#FEEACC', tag: 'tangerine' },
      { fg: '#000000', bg: '#FCE3D3', tag: 'orange' },
      { fg: '#000000', bg: '#FBD2D3', tag: 'red' },
      { fg: '#000000', bg: '#F9CCE8', tag: 'pink' },
    ],
    [
      { fg: '#000000', bg: '#CEA1DB', tag: 'violet' },
      { fg: '#000000', bg: '#B499D3', tag: 'purple' },
      { fg: '#000000', bg: '#9AB9EE', tag: 'blue' },
      { fg: '#000000', bg: '#9DE1E7', tag: 'teal' },
      { fg: '#000000', bg: '#99EBA5', tag: 'green' },
      { fg: '#000000', bg: '#DFF399', tag: 'lime' },
      { fg: '#000000', bg: '#FEF799', tag: 'yellow' },
      { fg: '#000000', bg: '#FEE599', tag: 'gold' },
      { fg: '#000000', bg: '#FCD599', tag: 'tangerine' },
      { fg: '#000000', bg: '#F9C8A7', tag: 'orange' },
      { fg: '#000000', bg: '#F8A4A7', tag: 'red' },
      { fg: '#000000', bg: '#F399D2', tag: 'pink' },
    ],
    [
      { fg: '#000000', bg: '#B472CA', tag: 'violet' },
      { fg: '#000000', bg: '#9066BD', tag: 'purple' },
      { fg: '#000000', bg: '#6696E5', tag: 'blue' },
      { fg: '#000000', bg: '#6CD1DA', tag: 'teal' },
      { fg: '#000000', bg: '#67DF77', tag: 'green' },
      { fg: '#000000', bg: '#CEEC66', tag: 'lime' },
      { fg: '#000000', bg: '#FCF466', tag: 'yellow' },
      { fg: '#000000', bg: '#FDDA66', tag: 'gold' },
      { fg: '#000000', bg: '#FAC166', tag: 'tangerine' },
      { fg: '#000000', bg: '#F7AC7B', tag: 'orange' },
      { fg: '#000000', bg: '#F4777B', tag: 'red' },
      { fg: '#000000', bg: '#ED66BB', tag: 'pink' },
    ],
    [
      { fg: '#ffffff', bg: '#9D43B8', tag: 'violet' },
      { fg: '#ffffff', bg: '#6B33A7', tag: 'purple' },
      { fg: '#000000', bg: '#3274DD', tag: 'blue' },
      { fg: '#000000', bg: '#3BC3CF', tag: 'teal' },
      { fg: '#000000', bg: '#32D64A', tag: 'green' },
      { fg: '#000000', bg: '#BDE633', tag: 'lime' },
      { fg: '#000000', bg: '#FEF033', tag: 'yellow' },
      { fg: '#000000', bg: '#FDCD33', tag: 'gold' },
      { fg: '#000000', bg: '#F9AC33', tag: 'tangerine' },
      { fg: '#000000', bg: '#F4914F', tag: 'orange' },
      { fg: '#000000', bg: '#F14850', tag: 'red' },
      { fg: '#000000', bg: '#E933A5', tag: 'pink' },
    ],
    [
      { fg: '#ffffff', bg: '#8415A6', tag: 'violet' },
      { fg: '#ffffff', bg: '#470091', tag: 'purple' },
      { fg: '#ffffff', bg: '#0050D4', tag: 'blue' },
      { fg: '#000000', bg: '#08B4C3', tag: 'teal' },
      { fg: '#000000', bg: '#04CC1E', tag: 'green' },
      { fg: '#000000', bg: '#AEDF00', tag: 'lime' },
      { fg: '#000000', bg: '#FCEC00', tag: 'yellow' },
      { fg: '#000000', bg: '#FBC101', tag: 'gold' },
      { fg: '#000000', bg: '#F79701', tag: 'tangerine' },
      { fg: '#000000', bg: '#F17524', tag: 'orange' },
      { fg: '#ffffff', bg: '#ED1B23', tag: 'red' },
      { fg: '#000000', bg: '#E3008E', tag: 'pink' },
    ],
  ],
};
