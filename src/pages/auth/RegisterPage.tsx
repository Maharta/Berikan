import { useInput } from "@/hooks/useInput";
import emailValidationFn from "@/helpers/validation-function/emailValidationFn";
import passwordValidationFn from "@/helpers/validation-function/passwordValidationFn";
import TextInput from "@/components/TextInput";
import AuthButton from "@/components/base/buttons/AuthButton";
import ActionLink from "@/components/base/buttons/ActionLink";
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
        <h1 className="mt-20 mb-9 text-4xl font-medium">Daftar</h1>
        <form className="w-full" onSubmit={continueSubmitHandler}>
          <TextInput
            id="email"
            isInvalid={emailState.isInputInvalid}
            label="EMAIL"
            type="email"
            placeholder="johndoe@gmail.com"
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
          <AuthButton
            type="submit"
            label="LANJUT"
            className="mx-auto mt-5 block tracking-widest"
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
