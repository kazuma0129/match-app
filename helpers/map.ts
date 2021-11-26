export const upsertValArray = <T, U>(map: Map<T, U[]>, key: T, val: U): void => {
  const arr = map.get(key);
  if (arr) {
    map.set(key, [...arr, val]);
  } else {
    map.set(key, [val]);
  }
};
