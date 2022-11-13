import { User } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { MutatingDots } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";
import ActionLink from "../../components/base/ActionLink";
import Button from "../../components/base/Button";
import ImagePicker from "../../components/ImagePicker";
import { db, storage } from "../../firebase";
import { resizeImage320 } from "../../helpers/image/image-resizer";

const RegisterProfilePage = () => {
  const [image, setImage] = useState<File>();
  const location = useLocation();
  const user: User = location.state?.user;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/register", { replace: true });
      return;
    }
  }, [user, navigate]);

  const onAddFileHandler = useCallback((imageFile: File) => {
    setImage(imageFile);
  }, []);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) return;
    try {
      setIsLoading(true);
      const compressedImg = (await resizeImage320(image)) as File; // compressing image in browser before uploading to storage
      const profilePhotoRef = ref(storage, `profile/${user.uid}`);
      await uploadBytes(profilePhotoRef, compressedImg);

      const url = await getDownloadURL(profilePhotoRef);

      updateDoc(doc(db, "account", user.uid), {
        avatar_url: url,
      });
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="gradient-background">
        <div className="centered">
          <MutatingDots />
        </div>
      </div>
    );
  }

  return (
    <main>
      <div className="gradient-background">
        <section className="flex flex-col">
          <h1 className="mt-36 mb-10 text-center text-4xl font-medium">
            Foto Anda
          </h1>
          <form onSubmit={submitHandler}>
            <ImagePicker type="avatar" onAddFile={onAddFileHandler} />

            <Button
              className="mx-auto mt-10 mb-5 block"
              type="submit"
              label="SIMPAN"
            />
            <ActionLink className="mx-auto block w-max" to="/">
              LEWATI
            </ActionLink>
          </form>
        </section>
      </div>
    </main>
  );
};

export default RegisterProfilePage;
