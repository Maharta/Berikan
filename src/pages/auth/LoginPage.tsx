import Button from "../../components/Button";
import { useInput } from "../../hooks/useInput";
import TextInput from "../../components/TextInput";
import emailValidationFn from "../../helpers/validation-function/emailValidationFn";
import passwordValidationFn from "../../helpers/validation-function/passwordValidationFn";
import ActionLink from "../../components/ActionLink";
import { FormEvent } from "react";
import { loginThunk } from "../../store/auth-thunks";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [emailState, emailProps] = useInput(emailValidationFn);
  const [passwordState, passwordProps] = useInput(passwordValidationFn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = await dispatch(
      loginThunk(emailProps.value, passwordProps.value)
    );
    console.log(user);
    if (user) {
      console.log("navigate");
      navigate("/main", { replace: true });
    }
  };

  return (
    <div className="gradient-background">
      <section className="flex flex-col justify-center">
        <h1 className="text-center text-4xl font-medium mt-36 mb-10">Masuk</h1>
        <form onSubmit={loginSubmitHandler}>
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
          <Button label="MASUK" className="mx-auto block mb-4" />
        </form>
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
