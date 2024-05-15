import { getId } from '@lib/constants';
import { MarkupType } from '@lib/types';

type CreateMarkId = {
  colorIndex: number;
  markupType: MarkupType;
};

const createMarkId = ({ colorIndex, markupType }: CreateMarkId) =>
  `${getId(`mark-${markupType}`)}-${markupType}${colorIndex}`;

export { createMarkId };
