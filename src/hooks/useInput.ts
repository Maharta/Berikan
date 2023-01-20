import React, { useState } from "react";

const useInput = (
  validateFn: (value: string) => boolean,
  initialValue = ""
): [
  {
    isValid: boolean;
    isInputInvalid: boolean;
    reset: () => void;
  },
  {
    value: string;
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onBlur: () => void;
  }
] => {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateFn(value);
  const isInputInvalid = !isValid && isTouched;

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.target.value);
  };

  const onBlur = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue(initialValue);
    setIsTouched(false);
  };

  return [
    { isValid, isInputInvalid, reset },
    { value, onChange, onBlur },
  ];
};

export default useInput;
