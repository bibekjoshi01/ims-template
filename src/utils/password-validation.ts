function isNumber(value: string) {
  return new RegExp('^(?=.*[0-9]).+$').test(value);
}

function isLowercaseChar(value: string) {
  return new RegExp('^(?=.*[a-z]).+$').test(value);
}

function isUppercaseChar(value: string) {
  return new RegExp('^(?=.*[A-Z]).+$').test(value);
}

function isSpecialChar(value: string) {
  return new RegExp('^(?=.*[-+_!@#$%^&*.,?]).+$').test(value);
}

function minLength(value: string) {
  return value.length > 7;
}

export { isLowercaseChar, isNumber, isSpecialChar, isUppercaseChar, minLength };
