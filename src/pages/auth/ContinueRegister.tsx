import { FormEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firstStepStorage } from "./RegisterPage";
import TextInput from "../../components/TextInput";
import { useInput } from "../../hooks/useInput";
import ImagePicker from "../../components/ImagePicker";
import Button from "../../components/Button";
import ActionLink from "../../components/ActionLink";

const noEmptyValidationFn = (value: string) => {
  return value.trim().length !== 0;
};

const ContinueRegister = () => {
  const navigate = useNavigate();

  const [firstNameState, firstNameProps] = useInput(noEmptyValidationFn);
  const [lastNameState, lastNameProps] = useInput(noEmptyValidationFn);
  const [image, setImage] = useState<File>();

  const isFormvalid = firstNameState.isValid && lastNameState.isValid && image;

  useEffect(() => {
    if (!firstStepStorage.isValid) {
      navigate("/register", { replace: true });
    } // redirect back if user immediately come to this page via url
  }, [navigate]);

  const onAddFileHandler = useCallback((imageFile: File) => {
    setImage(imageFile);
  }, []);

  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormvalid) return;

    const userData = {
      email: firstStepStorage.email,
      password: firstStepStorage.password,
      firstName: firstNameProps.value,
      lastname: lastNameProps.value,
      image,
    };

    console.log(userData);
  };

  return (
    <div className="gradient-background">
      <section className="flex flex-col">
        <h1 className="text-4xl font-medium text-center mt-12 mb-9">
          Sedikit Lagi
        </h1>
        <h2 className="text-center mb-4">Foto Profil</h2>
        <ImagePicker onAddFile={onAddFileHandler} />
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
