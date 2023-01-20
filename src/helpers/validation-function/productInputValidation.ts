const noemptyValidationFn = (value: string) => value.trim().length !== 0;

const descriptionValidationFn = (value: string) => {
  // need at least 2 words
  const regexp = /[a-zA-Z]+\s+[a-zA-Z]+/g;
  if (regexp.test(value)) {
    return true;
  }
  return false;
};

export { noemptyValidationFn, descriptionValidationFn };
