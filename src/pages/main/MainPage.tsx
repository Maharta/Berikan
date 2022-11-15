import { Link } from "react-router-dom";
import FloatingButton, {
  HorizontalPosition,
  VerticalPosition,
} from "../../components/FloatingButton";
import InfinityProduct from "../../components/product/InfinityProduct";
import NewProducts from "../../components/product/NewProducts";
import MainLayout from "../../layout/MainLayout";

const MainPage = () => {
  return (
    <>
      <MainLayout>
        <section aria-label="baru ditambahkan">
          <h1 className="mb-3 text-xl font-bold">Baru Ditambahkan</h1>
          <NewProducts />
        </section>
        <section aria-label="semua barang">
          <h1 className="text-xl font-bold">Semua Barang</h1>
          <InfinityProduct />
        </section>
      </MainLayout>
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
