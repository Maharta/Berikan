import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { FormEvent, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import ImagePicker from "@/components/ImagePicker";
import TextInput from "@/components/TextInput";
import accountFetcher from "@/helpers/firebase/accountFetcher";
import { resizeImage320 } from "@/helpers/image/image-resizer";
import { noemptyValidationFn } from "@/helpers/validation-function/productInputValidation";
import { useInput } from "@/hooks/useInput";
import NavLayout from "@/layout/NavLayout";
import Account from "@/models/account";
import { RootState } from "@/store/store";
import { uuidv4 } from "@firebase/util";
import { db, storage } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import AccountButton from "@/components/base/buttons/AccountButton";

const EditProfilePage = () => {
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

      const oldProfileRef = ref(storage, userData!.avatar_url);
      deleteObject(oldProfileRef);
    }

    return updateDoc(doc(db, "account", currentUser!.uid), {
      firstname: firstNameProps.value,
      lastname: lastNameProps.value,
      phone_number: phoneProps.value,
      avatar_url: newImageUrl,
    });
  };

  const { mutate, isLoading, error, isError } = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => navigate(".."),
  });

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  if (isLoading) {
    return <div>Loading..</div>;
  }

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
          label="First Name"
          className="w-full"
          {...firstNameProps}
        />
        <TextInput
          type="text"
          id="lastname"
          isInvalid={lastNameState.isInputInvalid}
          label="Last Name"
          {...lastNameProps}
        />
        <TextInput
          type="tel"
          id="phone"
          isInvalid={phoneState.isInputInvalid}
          label="Phone Number"
          {...phoneProps}
        />
        <AccountButton label="SIMPAN" centered={true} />
      </form>
    </NavLayout>
  );
};

export default EditProfilePage;
