import Button from "../../components/base/Button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="gradient-background p-5">
      <section className="flex flex-col items-center">
        <h1 className="mt-12 mb-14 text-4xl font-medium ">Berikan</h1>
        <p className="mb-9 text-center">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex
          distinctio aliquam autem molestias libero explicabo?
        </p>
        <Button
          mode="primary"
          onClick={() => navigate("/login", { replace: false })}
          label="MASUK"
          className="mb-7"
        />
        <Button
          onClick={() => navigate("/register", { replace: false })}
          mode="transparent"
          label="DAFTAR"
        />
      </section>
    </div>
  );
};

export default HomePage;
