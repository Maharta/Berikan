import { FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "@/hooks/useInput";
import TextInput from "@/components/TextInput";
import AuthButton from "@/components/base/buttons/AuthButton";
import ActionLink from "@/components/base/buttons/ActionLink";
import { RootState, useAppDispatch } from "@/store/store";
import { register } from "@/store/auth-thunks";
import { useSelector } from "react-redux";
import { MutatingDots } from "react-loader-spinner";
import { noemptyValidationFn } from "@/helpers/validation-function/productInputValidation";
import { firstStepStorage } from "./RegisterPage";

const noEmptyValidationFn = (value: string) => value.trim().length !== 0;

function RegisterContinuePage() {
  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector(
    (state: RootState) => state.auth
  );

  const [firstNameState, firstNameProps] = useInput(noEmptyValidationFn);
  const [lastNameState, lastNameProps] = useInput(noEmptyValidationFn);
  const [phoneState, phoneProps] = useInput(noemptyValidationFn);

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
        phone_number: phoneProps.value,
      })
    );
  };

  useEffect(() => {
    if (user) {
      navigate("/register-profile", {
        state: {
          user,
        },
        replace: true,
      });
    }
  }, [user, navigate]);

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
            visible
          />
        </div>
      </div>
    );
  }

  return (
    <div className="gradient-background">
      {error && <h1>{error.message}</h1>}
      <section className="flex flex-col items-center">
        <h1 className="mt-20 mb-9 text-4xl font-medium">Sedikit Lagi</h1>
        <form onSubmit={submitFormHandler} className="w-full">
          <TextInput
            id="firstName"
            label="Nama Depan"
            type="text"
            placeholder="John"
            className="mb-3"
            isInvalid={firstNameState.isInputInvalid}
            value={firstNameProps.value}
            onChange={firstNameProps.onChange}
            onBlur={firstNameProps.onBlur}
          />
          <TextInput
            id="lastName"
            label="Nama Belakang"
            type="text"
            placeholder="Doe"
            className="mb-3"
            isInvalid={lastNameState.isInputInvalid}
            value={lastNameProps.value}
            onChange={lastNameProps.onChange}
            onBlur={lastNameProps.onBlur}
          />
          <TextInput
            id="phone"
            label="Nomor Whatsapp (Tanpa Spasi)"
            type="tel"
            placeholder="+6281237624774"
            pattern="^(\+)[0-9]{8,15}"
            className="mb-3"
            isInvalid={phoneState.isInputInvalid}
            value={phoneProps.value}
            onChange={phoneProps.onChange}
            onBlur={phoneProps.onBlur}
          />
          <AuthButton
            label="SELESAI"
            className="mx-auto mt-5 block text-center"
          />
        </form>
        <ActionLink to="/register" className="mt-7 text-lg">
          KEMBALI
        </ActionLink>
      </section>
    </div>
  );
}

export default RegisterContinuePage;
