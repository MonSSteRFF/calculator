type T_getCounting = (value: string) => {
  result: null | string;
  str: string;
};

type T_checkWrongNumber = (str: string) => string;

import bn, { BigNumber } from 'bignumber.js';

const isSymbol = (s: string, withDot?: boolean) => {
  withDot = withDot !== undefined ? withDot : true;

  return withDot
    ? ['/', '-', '+', '.', '*'].filter((j) => j === s).length > 0
    : ['/', '-', '+', '*'].filter((j) => j === s).length > 0;
};

const checkWrongNumber: T_checkWrongNumber = (str: string) => {
  let validStr = str;
  for (let i = 0; i < str.length; i++) {
    const n0 = str[i];
    const n1 = str[i + 1];
    const n2 = str[i + 2];

    if (isSymbol(n0) && isSymbol(n1) && isSymbol(n2)) {
      validStr =
        validStr.split('').splice(0, i).join('') +
        validStr
          .split('')
          .splice(i + 1, validStr.length - 1)
          .join('');
      return validStr;
    } else if (isSymbol(n0) && isSymbol(n1)) {
      if (
        (n0 === '*' && n1 !== '*') ||
        (n0 !== '*' && n1 === '*') ||
        (n0 !== '*' && n1 !== '*')
      ) {
        validStr =
          validStr.split('').splice(0, i).join('') +
          validStr
            .split('')
            .splice(i + 1, validStr.length - 1)
            .join('');

        console.log('validStr: ', validStr);

        return validStr;
      }
    }
  }
  return validStr;
};

const getCounting: T_getCounting = (value) => {
  const str = value.replace(/[^-()\d/*+.]/g, '');

  const validStr = checkWrongNumber(str);

  if (validStr !== str) {
    return { result: null, str: getCounting(validStr).str };
  }

  try {
    if (str === '') {
      return { result: null, str: '' };
    }

    const result = String(eval(str));

    if (String(result) === str || result === 'undefined') {
      return { result: null, str: str };
    }

    if (result === 'Infinity') {
      return { result: 'Infinity', str: str };
    }

    return { result: result, str: str };
  } catch (e) {
    return { result: null, str: str };
  }
};

getCounting(`3**3**3**3`);

export { getCounting };
