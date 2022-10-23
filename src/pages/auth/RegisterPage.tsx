import { useInput } from "../../hooks/useInput";
import emailValidationFn from "../../helpers/validation-function/emailValidationFn";
import passwordValidationFn from "../../helpers/validation-function/passwordValidationFn";
import TextInput from "../../components/base/TextInput";
import Button from "../../components/base/Button";
import ActionLink from "../../components/base/ActionLink";
import { FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const confirmPassValidationFn = (
  password: string,
  confirmPassword: string
) => {
  return password === confirmPassword;
};

export let firstStepStorage = {
  email: "",
  password: "",
  confirmPassword: "",
  isValid: false,
};

const RegisterPage = () => {
  const [emailState, emailProps] = useInput(
    emailValidationFn,
    firstStepStorage.email
  );
  const [passwordState, passwordProps] = useInput(
    passwordValidationFn,
    firstStepStorage.password
  );
  const [confirmPasswordState, confirmPasswordProps] = useInput(
    confirmPassValidationFn.bind(null, passwordProps.value),
    firstStepStorage.confirmPassword
  );
  const navigate = useNavigate();

  const isFormValid =
    emailState.isValid && passwordState.isValid && confirmPasswordState.isValid;

  useEffect(() => {
    firstStepStorage = {
      email: emailProps.value,
      password: passwordProps.value,
      confirmPassword: confirmPasswordProps.value,
      isValid: isFormValid,
    };
  }, [
    emailProps.value,
    passwordProps.value,
    confirmPasswordProps.value,
    isFormValid,
  ]);

  const continueSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      navigate("/register-continue");
    } else {
      alert("Masih ada form yang belum valid!");
    }
  };

  return (
    <div className="gradient-background">
      <section className="flex flex-col items-center">
        <h1 className="font-medium text-4xl mt-20 mb-9">Daftar</h1>
        <form className="w-full" onSubmit={continueSubmitHandler}>
          <TextInput
            id="email"
            isInvalid={emailState.isInputInvalid}
            label="EMAIL"
            type="email"
            className="mb-3"
            {...emailProps}
          />
          <TextInput
            id="password"
            isInvalid={passwordState.isInputInvalid}
            label="PASSWORD"
            type="password"
            {...passwordProps}
            className="mb-3"
          />
          <TextInput
            id="confirmPassword"
            isInvalid={confirmPasswordState.isInputInvalid}
            label="CONFIRM PASSWORD"
            type="password"
            {...confirmPasswordProps}
            className="mb-3"
          />
          <Button
            type="submit"
            label="LANJUT"
            className="tracking-widest mx-auto block mt-5"
          />
        </form>
        <ActionLink to="/" className="mt-7 text-lg">
          KEMBALI
        </ActionLink>
      </section>
    </div>
  );
};

export default RegisterPage;
