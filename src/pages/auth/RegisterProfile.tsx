import { Session, User } from "@supabase/supabase-js";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import ImagePicker from "../../components/ImagePicker";
import { supabase } from "../../helpers/supabaseClient";
import { authActions } from "../../store/auth-slice";

interface userData {
  user: User | null;
  session: Session | null;
}

const RegisterProfile = () => {
  const [image, setImage] = useState<File>();
  const location = useLocation();
  const userData: userData = location.state?.userData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData?.session?.user) {
      navigate("/register", { replace: true });
      return;
    }
    dispatch(
      authActions.login({
        user: userData?.session?.user,
      })
    );
  }, [dispatch, userData?.session?.user, navigate]);

  const onAddFileHandler = useCallback((imageFile: File) => {
    setImage(imageFile);
  }, []);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) return;
    try {
      const { error: storageError } = await supabase.storage
        .from("avatars")
        .upload(`/public/${userData.user?.id}`, image, {
          upsert: true,
        });

      if (storageError) throw storageError;
      navigate("/main", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="gradient-background">
      <section className="flex flex-col">
        <h1 className="text-center text-4xl font-medium mt-36 mb-10">
          Foto Anda
        </h1>
        <form onSubmit={submitHandler}>
          <ImagePicker onAddFile={onAddFileHandler} />

          <Button
            className="block mt-10 mx-auto mb-5"
            type="submit"
            label="SIMPAN"
          />
          <Button mode="transparent" type="button" label="LEWATI" />
        </form>
      </section>
    </div>
  );
};

export default RegisterProfile;
