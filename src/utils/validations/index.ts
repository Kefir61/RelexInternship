export type ValidatorFn = (...args: (string | number)[]) => ValidatorItem;

export type ValidatorItem = {
  isError: boolean;
  errorMessage: string;
};

/**
 * checks value with the help of passed validators
 * @param {valueToCheck} valueToCheck - value of input
 * @param {arrFunction} arrFunction - array of validator function
 * @returns {{isError,errorMessage}} - object containing properties is there an error and error message
 */
export const applyValidators = (
  valueToCheck: string,
  arrFunction: ValidatorFn[]
) => {
  const arr: string[] = [];
  arrFunction.map((validItem: ValidatorFn) => {
    if (validItem(valueToCheck).errorMessage) {
      arr.push(validItem(valueToCheck).errorMessage);
    }
  });
  return arr;
};

/**
 * checks value for maximum length
 * @param {number} maxNumber - Number whose length should not exceed input
 * @returns {{isError,errorMessage}} object containing properties is there an error and error message
 */
export const maxLength = (maxNumber: number) => {
  return (valueToCheck: string) => {
    return {
      isError: Number(valueToCheck.length) > maxNumber ? true : false,
      errorMessage:
        Number(valueToCheck.length) > maxNumber
          ? "Слишком много символов"
          : null,
    };
  };
};

/**
 * checks value for minimum length
 * @param {number} minNumber - Number whose length should exceed input
 * @returns {{isError,errorMessage}} object containing properties is there an error and error message
 */
export const minLength = (minNumber: number) => {
  return (valueToCheck: string) => {
    return {
      isError: Number(valueToCheck.length) < minNumber ? true : false,
      errorMessage:
        Number(valueToCheck.length) < minNumber
          ? "Слишком мало символов"
          : null,
    };
  };
};

/**
 * checks for null
 * @returns {{isError,errorMessage}} object containing properties is there an error and error message
 */
export const required = () => {
  return (valueToCheck: string) => {
    return {
      isError: valueToCheck === "" ? true : false,
      errorMessage: valueToCheck === "" ? "Поле не должно быть пустым" : null,
    };
  };
};
