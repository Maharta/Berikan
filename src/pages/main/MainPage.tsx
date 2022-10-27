import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FloatingButton, {
  HorizontalPosition,
  VerticalPosition,
} from "../../components/FloatingButton";
import NewProducts from "../../components/product/NewProducts";
import { db } from "../../firebase";
import MainHeader from "../../layout/MainHeader";
import Product, { FirestoreProduct } from "../../models/item";

const DUMMY_ITEMS = [
  {
    id: 1,
    name: "Sapu Lidi",
    avatar_url:
      "https://1.bp.blogspot.com/-aWoPUwMy-XQ/YTs-6N0TzjI/AAAAAAAAHG8/O12XMAQRUx8f1vwoQPWUpH_lk8dmJzTcQCNcBGAsYHQ/s16000/WhatsApp%2BImage%2B2021-09-09%2Bat%2B18.50.09.jpeg",
    location: {
      province: "Jawa Barat",
      Kota: "Bandung",
      kecamatan: "Coblong",
      kelurahan: "Dago",
    },
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Sapu Lidi",
    avatar_url:
      "https://1.bp.blogspot.com/-aWoPUwMy-XQ/YTs-6N0TzjI/AAAAAAAAHG8/O12XMAQRUx8f1vwoQPWUpH_lk8dmJzTcQCNcBGAsYHQ/s16000/WhatsApp%2BImage%2B2021-09-09%2Bat%2B18.50.09.jpeg",
    location: {
      province: "Jawa Barat",
      Kota: "Bandung",
      kecamatan: "Coblong",
      kelurahan: "Dago",
    },
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Sapu Lidi",
    avatar_url:
      "https://1.bp.blogspot.com/-aWoPUwMy-XQ/YTs-6N0TzjI/AAAAAAAAHG8/O12XMAQRUx8f1vwoQPWUpH_lk8dmJzTcQCNcBGAsYHQ/s16000/WhatsApp%2BImage%2B2021-09-09%2Bat%2B18.50.09.jpeg",
    location: {
      province: "Jawa Barat",
      Kota: "Bandung",
      kecamatan: "Coblong",
      kelurahan: "Dago",
    },
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Sapu Lidi",
    avatar_url:
      "https://1.bp.blogspot.com/-aWoPUwMy-XQ/YTs-6N0TzjI/AAAAAAAAHG8/O12XMAQRUx8f1vwoQPWUpH_lk8dmJzTcQCNcBGAsYHQ/s16000/WhatsApp%2BImage%2B2021-09-09%2Bat%2B18.50.09.jpeg",
    location: {
      province: "Jawa Barat",
      Kota: "Bandung",
      kecamatan: "Coblong",
      kelurahan: "Dago",
    },
    created_at: new Date().toISOString(),
  },
  {
    id: 5,
    name: "Sapu Lidi",
    avatar_url:
      "https://1.bp.blogspot.com/-aWoPUwMy-XQ/YTs-6N0TzjI/AAAAAAAAHG8/O12XMAQRUx8f1vwoQPWUpH_lk8dmJzTcQCNcBGAsYHQ/s16000/WhatsApp%2BImage%2B2021-09-09%2Bat%2B18.50.09.jpeg",
    location: {
      province: "Jawa Barat",
      Kota: "Bandung",
      kecamatan: "Coblong",
      kelurahan: "Dago",
    },
    created_at: new Date().toISOString(),
  },
  {
    id: 6,
    name: "Sapu Lidi",
    avatar_url:
      "https://1.bp.blogspot.com/-aWoPUwMy-XQ/YTs-6N0TzjI/AAAAAAAAHG8/O12XMAQRUx8f1vwoQPWUpH_lk8dmJzTcQCNcBGAsYHQ/s16000/WhatsApp%2BImage%2B2021-09-09%2Bat%2B18.50.09.jpeg",
    location: {
      province: "Jawa Barat",
      Kota: "Bandung",
      kecamatan: "Coblong",
      kelurahan: "Dago",
    },
    created_at: new Date().toISOString(),
  },
  {
    id: 7,
    name: "Sapu Lidi",
    avatar_url:
      "https://1.bp.blogspot.com/-aWoPUwMy-XQ/YTs-6N0TzjI/AAAAAAAAHG8/O12XMAQRUx8f1vwoQPWUpH_lk8dmJzTcQCNcBGAsYHQ/s16000/WhatsApp%2BImage%2B2021-09-09%2Bat%2B18.50.09.jpeg",
    location: {
      province: "Jawa Barat",
      Kota: "Bandung",
      kecamatan: "Coblong",
      kelurahan: "Dago",
    },
    created_at: new Date().toISOString(),
  },
  {
    id: 8,
    name: "Sapu Lidi",
    avatar_url:
      "https://1.bp.blogspot.com/-aWoPUwMy-XQ/YTs-6N0TzjI/AAAAAAAAHG8/O12XMAQRUx8f1vwoQPWUpH_lk8dmJzTcQCNcBGAsYHQ/s16000/WhatsApp%2BImage%2B2021-09-09%2Bat%2B18.50.09.jpeg",
    location: {
      province: "Jawa Barat",
      Kota: "Bandung",
      kecamatan: "Coblong",
      kelurahan: "Dago",
    },
    created_at: new Date().toISOString(),
  },
  {
    id: 9,
    name: "Sapu Lidi",
    avatar_url:
      "https://1.bp.blogspot.com/-aWoPUwMy-XQ/YTs-6N0TzjI/AAAAAAAAHG8/O12XMAQRUx8f1vwoQPWUpH_lk8dmJzTcQCNcBGAsYHQ/s16000/WhatsApp%2BImage%2B2021-09-09%2Bat%2B18.50.09.jpeg",
    location: {
      province: "Jawa Barat",
      Kota: "Bandung",
      kecamatan: "Coblong",
      kelurahan: "Dago",
    },
    created_at: new Date().toISOString(),
  },
  {
    id: 10,
    name: "Sapu Lidi",
    avatar_url:
      "https://1.bp.blogspot.com/-aWoPUwMy-XQ/YTs-6N0TzjI/AAAAAAAAHG8/O12XMAQRUx8f1vwoQPWUpH_lk8dmJzTcQCNcBGAsYHQ/s16000/WhatsApp%2BImage%2B2021-09-09%2Bat%2B18.50.09.jpeg",
    location: {
      province: "Jawa Barat",
      Kota: "Bandung",
      kecamatan: "Coblong",
      kelurahan: "Dago",
    },
    created_at: new Date().toISOString(),
  },
];

const MainPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getAllItems = async () => {
      try {
        const itemsSnapshot = await getDocs(collection(db, "item"));
        const tempItems: Product[] = [];
        itemsSnapshot.forEach((item) => {
          const itemData = item.data() as FirestoreProduct;
          const transformedItem: Product = {
            ...itemData,
            id: item.id,
            updated_at: itemData.updated_at.toDate(),
          };
          tempItems.push(transformedItem);
        });
        setProducts(tempItems);
      } catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  }, []);

  return (
    <>
      <MainHeader />
      <main className="px-4">
        <section aria-label="baru ditambahkan">
          <h1 className="mb-3 text-xl font-bold">Baru Ditambahkan</h1>
          <NewProducts products={products} />
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
