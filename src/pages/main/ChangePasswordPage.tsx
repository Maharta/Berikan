import { updatePassword } from "firebase/auth";
import { FormEvent } from "react";
import { useSelector } from "react-redux";
import AccountButton from "@/components/base/buttons/AccountButton";
import Modal from "@/components/base/modal/Modal";
import ReauthenticateForm from "@/components/form/ReauthenticateForm";
import TextInput from "@/components/TextInput";
import { auth } from "@/firebase";
import passwordValidationFn from "@/helpers/validation-function/passwordValidationFn";
import { useInput } from "@/hooks/useInput";
import NavLayout from "@/layout/NavLayout";
import { modalActions } from "@/store/modal-slice";
import { RootState, useAppDispatch } from "@/store/store";
import { confirmPassValidationFn } from "../auth/RegisterPage";

const ChangePasswordPage = () => {
  const [passwordState, passwordProps] = useInput(passwordValidationFn);
  const [confirmPasswordState, confirmPasswordProps] = useInput(
    confirmPassValidationFn.bind(null, passwordProps.value)
  );

  const dispatch = useAppDispatch();

  const isModalOpen = useSelector(
    (state: RootState) => state.modal.isModalOpen
  );

  const isPasswordValid = passwordState.isValid && confirmPasswordState.isValid;

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPasswordValid) return;
    const currentUser = auth.currentUser;
    try {
      await updatePassword(currentUser!, passwordProps.value);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Firebase: Error (auth/requires-recent-login)."
      ) {
        dispatch(modalActions.openModal());
      }
    }
  };

  return (
    <NavLayout title="Change Password">
      <form onSubmit={onSubmitHandler} className="mt-16">
        <h1 className="mx-auto mb-4 block max-w-xs text-3xl font-bold">
          Password
        </h1>
        <TextInput
          isInvalid={passwordState.isInputInvalid}
          {...passwordProps}
          type="password"
          id="password"
          label="Password Baru"
        />
        <TextInput
          isInvalid={confirmPasswordState.isInputInvalid}
          {...confirmPasswordProps}
          type="password"
          id="confirm-password"
          label="Confirm Password Baru"
        />
        <AccountButton marginTop={4} label="Ganti Password" />
        <Modal
          isOpen={isModalOpen}
          onClose={() => dispatch(modalActions.closeModal())}>
          <ReauthenticateForm />
        </Modal>
      </form>
    </NavLayout>
  );
};

export default ChangePasswordPage;
