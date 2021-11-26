import { accessor as objectAccessor } from './object';

export const filterObjArrayByRegexp = <T>(
  searchVal: string,
  array: Array<T>,
  paths?: Array<string | number>
): T[] => {
  if (searchVal === '') {
    return array;
  }
  const prefixRegex = (str: string) => {
    return new RegExp(`^${str}`, 'i');
  };
  const newThList = array.filter((el) => {
    const target = paths ? objectAccessor<T, string>(el, paths) : el;
    if (typeof target !== 'string') {
      return false;
    }
    return prefixRegex(searchVal).test(target);
  });
  return newThList;
};
