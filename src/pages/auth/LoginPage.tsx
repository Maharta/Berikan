import Button from "../../components/Button";
import { useInput } from "../../hooks/useInput";
import TextInput from "../../components/TextInput";
import emailValidationFn from "../../helpers/validation-function/emailValidationFn";
import passwordValidationFn from "../../helpers/validation-function/passwordValidationFn";
import ActionLink from "../../components/ActionLink";

const LoginPage = () => {
  const [emailState, emailProps] = useInput(emailValidationFn);
  const [passwordState, passwordProps] = useInput(passwordValidationFn);

  return (
    <div className="gradient-background">
      <section className="flex flex-col justify-center">
        <h1 className="text-center text-4xl font-medium mt-36 mb-10">Masuk</h1>
        <TextInput
          type="email"
          label="ALAMAT EMAIL"
          id="email"
          isInvalid={emailState.isInputInvalid}
          {...emailProps}
          className="mb-4"
        />
        <TextInput
          type="password"
          label="PASSWORD"
          id="password"
          isInvalid={passwordState.isInputInvalid}
          {...passwordProps}
          className="mb-7"
        />
        <Button label="MASUK" className="mx-auto mb-4" />
        <ActionLink className="text-center mb-4" to="/">
          LUPA PASSWORD?
        </ActionLink>
        <ActionLink className="text-center" to="/">
          KEMBALI
        </ActionLink>
      </section>
    </div>
  );
};

export default LoginPage;
