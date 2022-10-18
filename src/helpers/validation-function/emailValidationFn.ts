const emailValidationFn = (value: string) => {
  return value.trim().length !== 0 && value.trim().includes("@");
};

export default emailValidationFn;
