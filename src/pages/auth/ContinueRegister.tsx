import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firstStepStorage } from "./RegisterPage";
import TextInput from "../../components/TextInput";
import { useInput } from "../../hooks/useInput";
import Button from "../../components/Button";
import ActionLink from "../../components/ActionLink";
import { supabase } from "../../helpers/supabaseClient";

const noEmptyValidationFn = (value: string) => {
  return value.trim().length !== 0;
};

const ContinueRegister = () => {
  const navigate = useNavigate();

  const [firstNameState, firstNameProps] = useInput(noEmptyValidationFn);
  const [lastNameState, lastNameProps] = useInput(noEmptyValidationFn);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isFormvalid = firstNameState.isValid && lastNameState.isValid;

  useEffect(() => {
    if (!firstStepStorage.isValid) {
      navigate("/register", { replace: true });
    } // redirect back if user immediately come to this page via url
  }, [navigate]);

  const submitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormvalid) return;

    try {
      setIsLoading(true);
      const { error, data } = await supabase.auth.signUp({
        email: firstStepStorage.email,
        password: firstStepStorage.password,
      });

      if (error) throw error;

      const { error: insertError } = await supabase.from("profiles").insert({
        id: data.user?.id,
        firstname: firstNameProps.value,
        lastname: lastNameProps.value,
      });

      if (insertError) throw insertError;

      navigate("/register-profile", {
        state: { userData: data },
      });
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="gradient-background">
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
          <ActionLink to="/register" className="mt-4">
            KEMBALI
          </ActionLink>
        </form>
      </section>
    </div>
  );
};

export default ContinueRegister;
