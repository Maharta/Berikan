import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firstStepStorage } from "./RegisterPage";
import AvatarImg from "../assets/avatar.png";

const ContinueRegister = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!firstStepStorage.isValid) {
      navigate("/register", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="gradient-background">
      <section className="flex flex-col">
        <h1 className="text-4xl font-medium text-center mt-12 mb-12">
          Sedikit Lagi
        </h1>
        <h2 className="text-center mb-4">Foto Profil</h2>
        <div>
          <img
            className="w-48 mx-auto align-middle rounded-[50%] bg-white relative"
            src={AvatarImg}
            alt="avatar stock"
          />
        </div>
      </section>
    </div>
  );
};

export default ContinueRegister;
