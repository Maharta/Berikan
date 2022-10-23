import Button from "../../components/base/Button";
import { useInput } from "../../hooks/useInput";
import TextInput from "../../components/base/TextInput";
import emailValidationFn from "../../helpers/validation-function/emailValidationFn";
import passwordValidationFn from "../../helpers/validation-function/passwordValidationFn";
import ActionLink from "../../components/base/ActionLink";
import { FormEvent, useEffect } from "react";
import { login } from "../../store/auth-thunks";
import { useNavigate } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import { RootState, useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const { error, isLoading, user } = useSelector(
    (state: RootState) => state.auth
  );
  const [emailState, emailProps] = useInput(emailValidationFn);
  const [passwordState, passwordProps] = useInput(passwordValidationFn);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email: emailProps.value, password: passwordProps.value }));
  };

  useEffect(() => {
    console.log("navigate");
    if (user) {
      navigate("/main", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="gradient-background">
      {error && <h1>{error}</h1>}
      {isLoading && (
        <div className="centered">
          <MutatingDots
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      {!isLoading && (
        <section className="flex flex-col justify-center">
          <h1 className="text-center text-4xl font-medium mt-36 mb-10">
            Masuk
          </h1>
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
      )}
    </div>
  );
};

export default LoginPage;
