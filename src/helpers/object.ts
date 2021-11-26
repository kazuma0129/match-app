const escapeBracket = (str: string): string => {
  const key = str.substring(1, str.length - 1);
  return key;
};

const isBracket = (str: string): Boolean => {
  if (str.startsWith('[') && str.endsWith(']')) {
    return true;
  }
  return false;
};

export const accessor = <T extends { [k: string]: any }, U>(
  obj: T,
  accessKeys: Array<string | number>
): U | undefined => {
  let returnVal: U | undefined;
  let box: any;
  accessKeys.forEach((key, index) => {
    const strKey = String(key);
    const k = isBracket(strKey) ? escapeBracket(strKey) : strKey;
    if (index === 0) {
      box = obj[k];
    } else {
      box = box[k];
    }
  });
  returnVal = box;
  return returnVal;
};
