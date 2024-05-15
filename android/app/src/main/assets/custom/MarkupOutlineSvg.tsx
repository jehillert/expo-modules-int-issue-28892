import React from 'react';

import Svg, { Rect, Path, SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components/native';
import { hScale } from '../../theme/themeUtils';

type Props = SvgProps;

const MarkupOutlineSvg = ({ width = 20, height = 20 }: Props) => {
  const { colors } = useTheme();
  return (
    <Svg
      height={Number(height) - hScale(2)}
      width={Number(width) - hScale(2)}
      fill="none"
      viewBox="0 0 20 20">
      <Path
        d="M17 1C18.1046 1 19 1.89543 19 3V17C19 18.1046 18.1046 19 17 19H3C1.89543 19 1 18.1046 1 17V3C1 1.89543 1.89543 1 3 1L17 1Z"
        stroke={colors.textSecondary}
        strokeWidth="2"
      />
      <Rect height="3" width="8" fill={colors.textSecondary} x="4" y="5" />
      <Rect height="3" width="9" fill={colors.textSecondary} x="7" y="9" />
      <Rect height="3" width="5" fill={colors.textSecondary} x="4" y="13" />
    </Svg>
  );
};

export default MarkupOutlineSvg;
