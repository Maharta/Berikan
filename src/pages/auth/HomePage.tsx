import AuthButton from "@/components/base/buttons/AuthButton";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="gradient-background p-5">
      <section className="flex flex-col items-center justify-center pt-16">
        <h1 className="mt-12 mb-14 text-4xl font-medium ">Berikan</h1>
        <p>Bagikan Kebaikan dengan Berikan</p>
        <p className="mb-9 text-center">Aplikasi Berbagi Barang Bekas</p>
        <AuthButton
          mode="primary"
          onClick={() => navigate("/login", { replace: false })}
          label="MASUK"
          className="mb-7"
        />
        <AuthButton
          onClick={() => navigate("/register", { replace: false })}
          mode="transparent"
          label="DAFTAR"
        />
      </section>
    </div>
  );
}

export default HomePage;
