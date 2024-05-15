import { Entity, ShareType } from '@lib/types';
import { nanoid } from '@reduxjs/toolkit';

export const getId = (prefix1: Entity | 'workflow', prefix2?: ShareType) =>
  `${prefix1}-${prefix2 ? `${prefix2}-` : ``}${nanoid()}`;
