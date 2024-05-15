import { AnyCallback } from '../types';

/**
 * @summary
 * Type Guards
 * For further reading, see {@link https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates Using type predicates}.
 * @example
 * function isFish(pet: Fish | Bird): pet is Fish {
 *   return (pet as Fish).swim !== undefined;
 * }
 */
export const isEnumValue = <T extends { [k: string]: string }>(
  something: any,
  enumObject: T,
): something is T[keyof T] =>
  typeof something === 'string' &&
  Object.values(enumObject).includes(something);

export function isFunction(func: AnyCallback | undefined) {
  return func && typeof func === 'function';
}

/**
 * @example
 * const array: (string | null)[] = ['foo', 'bar', null, 'zoo', null];
 * const filteredArray: string[] = array.filter(isNotEmpty);
 */
export function isNotEmpty<TValue>(
  value: TValue | null | undefined,
): value is TValue {
  return value !== null && value !== undefined;
}
