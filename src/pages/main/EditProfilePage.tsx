import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { FormEvent, useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ImagePicker from "@/components/ImagePicker";
import TextInput from "@/components/TextInput";
import accountFetcher from "@/helpers/firebase/accountFetcher";
import { resizeImage320 } from "@/helpers/image/image-resizer";
import { noemptyValidationFn } from "@/helpers/validation-function/productInputValidation";
import useInput from "@/hooks/useInput";
import NavLayout from "@/layout/NavLayout";
import Account from "@/models/account";
import { RootState } from "@/store/store";
import { uuidv4 } from "@firebase/util";
import { db, storage } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import AccountButton from "@/components/base/buttons/AccountButton";
import { Id, toast } from "react-toastify";

function EditProfilePage() {
  const [image, setImage] = useState<File>();
  const navigate = useNavigate();

  const currentUser = useSelector((state: RootState) => state.auth.user);

  const onAddFileHandler = useCallback((imageFile: File) => {
    setImage(imageFile);
  }, []);

  const { data: userData } = useQuery({
    queryKey: ["user-data"],
    queryFn: () => accountFetcher(currentUser!.uid),
    select: (snapshot) => snapshot.data() as Account,
    refetchOnWindowFocus: false,
  });

  const [firstNameState, firstNameProps] = useInput(
    noemptyValidationFn,
    userData?.firstname
  );
  const [lastNameState, lastNameProps] = useInput(
    noemptyValidationFn,
    userData?.lastname
  );
  const [phoneState, phoneProps] = useInput(
    noemptyValidationFn,
    userData?.phone_number
  );

  const updateUserData = async () => {
    let newImageUrl = userData?.avatar_url;

    if (image) {
      const imageId = uuidv4();
      const profilePhotoRef = ref(
        storage,
        `${currentUser?.uid}/profile/${imageId}`
      );
      const compressedImg = (await resizeImage320(image)) as File; // compressing image in browser before uploading to storage
      await uploadBytes(profilePhotoRef, compressedImg);
      newImageUrl = await getDownloadURL(profilePhotoRef);

      if (userData?.avatar_url) {
        const oldProfileRef = ref(storage, userData.avatar_url);
        deleteObject(oldProfileRef);
      }
    }

    return updateDoc(doc(db, "account", currentUser!.uid), {
      firstname: firstNameProps.value,
      lastname: lastNameProps.value,
      phone_number: phoneProps.value,
      avatar_url: newImageUrl,
    });
  };

  const toastId = useRef<Id>();

  const { mutate } = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      navigate("..");
      toast.update(toastId.current!, {
        isLoading: false,
        type: "success",
        render: "Berhasil mengganti profil anda..",
        autoClose: 2000,
        closeButton: true,
        closeOnClick: true,
      });
    },
    onMutate: () => {
      toastId.current = toast.loading("Menyimpan perubahan anda..", {
        position: "top-right",
      });
    },
    onError: () => {
      toast.update(toastId.current!, {
        isLoading: false,
        type: "error",
        render: "Gagal mengganti profil anda..",
        autoClose: 2000,
        closeButton: true,
        closeOnClick: true,
      });
    },
  });

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <NavLayout title="Edit Profil">
      <form onSubmit={onSubmitHandler}>
        <ImagePicker
          onAddFile={onAddFileHandler}
          initialImage={userData?.avatar_url}
          type="avatar"
        />
        <TextInput
          type="text"
          id="firstname"
          isInvalid={firstNameState.isInputInvalid}
          label="Nama Depan"
          className="w-full"
          {...firstNameProps}
        />
        <TextInput
          type="text"
          id="lastname"
          isInvalid={lastNameState.isInputInvalid}
          label="Nama Belakang"
          {...lastNameProps}
        />
        <TextInput
          type="tel"
          id="phone"
          placeholder="+6281237624774"
          pattern="^(\+)[0-9]{8,15}"
          isInvalid={phoneState.isInputInvalid}
          label="Nomor Telepon"
          title="Dimulai dengan +62"
          {...phoneProps}
        />
        <AccountButton type="submit" label="SIMPAN" centered />
      </form>
    </NavLayout>
  );
}

export default EditProfilePage;
