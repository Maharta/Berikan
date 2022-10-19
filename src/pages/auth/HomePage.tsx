import Button from "../../components/Button";
import TransparentButton from "../../components/TransparentButton";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="gradient-background p-5">
      <section className="flex flex-col items-center">
        <h1 className="mt-12 font-medium text-4xl mb-14 ">Berikan</h1>
        <p className="text-center mb-9">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex
          distinctio aliquam autem molestias libero explicabo?
        </p>
        <Button
          onClick={() => navigate("/login", { replace: false })}
          label="MASUK"
          className="mb-7"
        />
        <TransparentButton
          label="DAFTAR"
          onClick={() => navigate("/register", { replace: false })}
        />
      </section>
    </div>
  );
};

export default HomePage;
