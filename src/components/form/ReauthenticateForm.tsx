import { useQuery } from "@tanstack/react-query";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "@/firebase";
import passwordValidationFn from "@/helpers/validation-function/passwordValidationFn";
import useInput from "@/hooks/useInput";
import { modalActions } from "@/store/modal-slice";
import { useAppDispatch } from "@/store/store";
import { toast } from "react-toastify";
import AuthButton from "../base/buttons/AuthButton";
import TextInput from "../TextInput";

function ReauthenticateForm() {
  const user = auth.currentUser!;
  const dispatch = useAppDispatch();

  const [passwordState, passwordProps] = useInput(passwordValidationFn);
  const credential = EmailAuthProvider.credential(
    user?.email!,
    passwordProps.value
  );

  const reauthenticateHandler = () =>
    reauthenticateWithCredential(user, credential);

  const { isFetching, error, isError, refetch } = useQuery({
    queryKey: ["reauthenticate"],
    queryFn: reauthenticateHandler,
    onSuccess: () => {
      toast.success("Silahkan klik kembali tombol ubah password.");
      dispatch(modalActions.closeModal());
    },
    enabled: false,
    retry: false,
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <strong className="mb-4 inline-block w-full text-center text-xl">
        Ketikkan Password Lama Anda.
      </strong>
      <form onSubmit={() => refetch()} id="reauthenticate-form">
        <TextInput
          type="password"
          label="Password anda"
          id="password"
          isInvalid={passwordState.isInputInvalid}
          {...passwordProps}
          className="mb-4 w-full"
          inputClass="w-full"
        />
        {isError && error instanceof Error ? (
          <label
            className="mb-4 inline-block w-full text-center font-bold"
            htmlFor="reauthenticate-form">
            {error.message}
          </label>
        ) : null}
        <AuthButton label="Submit" className="mx-auto mb-4 block" />
      </form>
    </div>
  );
}

export default ReauthenticateForm;
