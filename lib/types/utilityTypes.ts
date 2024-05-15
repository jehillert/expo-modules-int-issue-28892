import { Dispatch, SetStateAction } from 'react';

export type AnyCallback = (...args: any[]) => any;

export type AnyReturnCallback = () => any | void | Promise<void>;

export type ArrayWithLength<
  Len extends number,
  T extends unknown,
  Occ extends T[] = [],
> = Occ['length'] extends Len ? Occ : ArrayWithLength<Len, T, [T, ...Occ]>;

export type ValueCallback<T> = Dispatch<SetStateAction<T>> | ((val: T) => void);

export type OrNull<T> = T | null;

export type OrUndefined<T> = T | undefined;

export type UnionOfObjPropTypes<T> = T[keyof T];

export type VoidCallback = () => void | Promise<void>;

export type VoidCallbackWithArgs = (...args: any[]) => void | Promise<void>;

export type WebViewVariant = 'Screen' | 'Search' | 'Processing';
