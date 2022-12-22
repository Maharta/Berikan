import { collection, limit, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import FloatingButton, {
  HorizontalPosition,
  VerticalPosition,
} from "@/components/FloatingButton";
import InfinityProduct from "@/components/product/InfinityProduct";
import NewProducts from "@/components/product/NewProducts";
import { db } from "@/firebase";
import MainLayout from "@/layout/MainLayout";

const productRef = collection(db, "item");
const infinityProductQuery = query(
  productRef,
  orderBy("updated_at", "asc"),
  limit(5)
);

const MainPage = () => {
  return (
    <>
      <MainLayout>
        <section aria-label="baru ditambahkan">
          <h1 className="ml-1 text-xl font-bold">Baru Ditambahkan</h1>
          <NewProducts />
        </section>
        <section aria-label="semua barang">
          <h1 className="ml-1 text-xl font-bold">Semua Barang</h1>
          <InfinityProduct q={infinityProductQuery} />
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
