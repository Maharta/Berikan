const emailValidationFn = (value: string) => value.trim().length !== 0 && value.trim().includes("@");

export default emailValidationFn;
