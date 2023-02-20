import AuthButton from "@/components/base/buttons/AuthButton";
import useInput from "@/hooks/useInput";
import TextInput from "@/components/TextInput";
import emailValidationFn from "@/helpers/validation-function/emailValidationFn";
import passwordValidationFn from "@/helpers/validation-function/passwordValidationFn";
import ActionLink from "@/components/base/buttons/ActionLink";
import { FormEvent, useEffect } from "react";
import { login } from "@/store/auth-thunks";
import { useNavigate } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import { RootState, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";

function LoginPage() {
  const { isLoading, user } = useSelector((state: RootState) => state.auth);
  const [emailState, emailProps] = useInput(emailValidationFn);
  const [passwordState, passwordProps] = useInput(passwordValidationFn);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email: emailProps.value, password: passwordProps.value }));
  };

  useEffect(() => {
    if (user) {
      navigate("/main", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="gradient-background">
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
            visible
          />
        </div>
      )}
      {!isLoading && (
        <section className="flex flex-col justify-center">
          <h1 className="mt-36 mb-10 text-center text-4xl font-medium">
            Masuk
          </h1>
          <form onSubmit={loginSubmitHandler}>
            <TextInput
              type="email"
              label="ALAMAT EMAIL"
              id="email"
              placeholder="johndoe@gmail.com"
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
            <AuthButton label="MASUK" className="mx-auto mb-4 block" />
          </form>
          <ActionLink className="mb-4 text-center" to="/">
            LUPA PASSWORD?
          </ActionLink>
          <ActionLink className="text-center" to="/">
            KEMBALI
          </ActionLink>
        </section>
      )}
    </div>
  );
}

export default LoginPage;
