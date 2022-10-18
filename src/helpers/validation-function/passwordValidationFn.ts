const passwordValidationFn = (value: string) => {
  return value.trim().length >= 6;
};

export default passwordValidationFn;
