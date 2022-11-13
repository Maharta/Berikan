import { Link } from "react-router-dom";
import FloatingButton, {
  HorizontalPosition,
  VerticalPosition,
} from "../../components/FloatingButton";
import NewProducts from "../../components/product/NewProducts";
import MainHeader from "../../layout/MainHeader";

const MainPage = () => {
  return (
    <>
      <MainHeader />
      <main className="px-4">
        <section aria-label="baru ditambahkan">
          <h1 className="mb-3 text-xl font-bold">Baru Ditambahkan</h1>
          <NewProducts />
        </section>
      </main>
      <FloatingButton
        horizontal={HorizontalPosition.Right}
        vertical={VerticalPosition.Bottom}
        className="mr-3 mb-3">
        <Link to="/add-item">+ TAMBAH</Link>
      </FloatingButton>
    </>
  );
};

export default MainPage;
