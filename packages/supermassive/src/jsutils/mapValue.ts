import type { ObjMap, ReadOnlyObjMap } from "./ObjMap";

/**
 * Creates an object map with the same keys as `map` and values generated by
 * running each value of `map` thru `fn`.
 */
export function mapValue<T, V>(
  map: ReadOnlyObjMap<T>,
  fn: (value: T, key: string) => V,
): ObjMap<V> {
  const result = Object.create(null);

  for (const [key, value] of Object.entries(map)) {
    result[key] = fn(value, key);
  }
  return result;
}
