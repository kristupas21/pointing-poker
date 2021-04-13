import isEqual from 'lodash/isEqual';

export function getDiffPartial<T>(prevObj: T, currObj: T): Partial<T> {
  if (!currObj) {
    return {};
  }

  if (currObj && !prevObj) {
    return currObj;
  }

  return Object.keys(currObj).reduce((partial, key) => {
    const notEqual = !(key in prevObj) ||
          !isEqual(currObj[key], prevObj[key]);

    if (notEqual) {
      return {
        ...partial,
        [key]: currObj[key],
      };
    }

    return partial;
  }, {});
}
