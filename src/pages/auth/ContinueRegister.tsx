import { FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firstStepStorage } from "./RegisterPage";
import { useInput } from "../../hooks/useInput";
import TextInput from "../../components/base/TextInput";
import Button from "../../components/base/Button";
import ActionLink from "../../components/base/ActionLink";
import { RootState, useAppDispatch } from "../../store/store";
import { register } from "../../store/auth-thunks";
import { useSelector } from "react-redux";
import { MutatingDots } from "react-loader-spinner";
import { authActions } from "../../store/auth-slice";

const noEmptyValidationFn = (value: string) => {
  return value.trim().length !== 0;
};

const ContinueRegister = () => {
  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector(
    (state: RootState) => state.auth
  );

  const [firstNameState, firstNameProps] = useInput(noEmptyValidationFn);
  const [lastNameState, lastNameProps] = useInput(noEmptyValidationFn);

  const isFormvalid = firstNameState.isValid && lastNameState.isValid;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!firstStepStorage.isValid) {
      navigate("/register", { replace: true });
    } // redirect back if user immediately come to this page via url
  }, [navigate]);

  const submitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormvalid) return;

    dispatch(
      register({
        email: firstStepStorage.email,
        password: firstStepStorage.password,
        firstname: firstNameProps.value,
        lastname: lastNameProps.value,
      })
    );
  };

  useEffect(() => {
    if (user) {
      navigate("/register-profile", {
        state: {
          user: user,
        },
        replace: true,
      });
    }
  }, [user, navigate]);

  const backPageHandler = () => {
    dispatch(authActions.resetError());
  };

  if (isLoading) {
    return (
      <div className="gradient-background">
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
      </div>
    );
  }

  return (
    <div className="gradient-background">
      {error && <h1>{error}</h1>}
      <section className="flex flex-col">
        <h1 className="text-4xl font-medium text-center mt-12 mb-9">
          Sedikit Lagi
        </h1>
        <form
          onSubmit={submitFormHandler}
          className="mt-5 flex flex-col items-center"
        >
          <TextInput
            id="firstName"
            label="Nama Depan"
            type="text"
            isInvalid={firstNameState.isInputInvalid}
            {...firstNameProps}
          />
          <TextInput
            id="lastName"
            label="Nama Belakang"
            type="text"
            isInvalid={lastNameState.isInputInvalid}
            {...lastNameProps}
          />
          <Button label="SELESAI" className="mt-6 text-center" />
          <ActionLink to="/register" onClick={backPageHandler} className="mt-4">
            KEMBALI
          </ActionLink>
        </form>
      </section>
    </div>
  );
};

export default ContinueRegister;
