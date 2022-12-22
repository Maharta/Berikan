import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import MyProductItem from "@/components/product/MyProductItem";
import { db } from "@/firebase";
import NavLayout from "@/layout/NavLayout";
import Product, { FirestoreProduct } from "@/models/product";
import { RootState } from "@/store/store";

const myProductsFetcher = (uid: string) => {
  console.log(uid);
  const productRef = collection(db, "item");
  const q = query(
    productRef,
    where("ownerId", "==", uid),
    orderBy("updated_at", "desc")
  );
  return getDocs(q);
};

const MyProductsPage = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["my-products", currentUser!.uid],
    queryFn: () => myProductsFetcher(currentUser!.uid),
    refetchOnWindowFocus: false,
  });

  let myProductsData: Product[] = [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    data.forEach((productSnapshot) => {
      const productData = productSnapshot.data() as FirestoreProduct;
      const transformedData = {
        ...productData,
        id: productSnapshot.id,
        updated_at: productData.updated_at.toDate(),
      };
      myProductsData.push(transformedData);
    });
  }

  return (
    <NavLayout title="Barang Saya">
      {myProductsData?.map((product) => (
        <MyProductItem product={product} key={product.id} />
      ))}
      {myProductsData.length === 0 && (
        <p className="centered">
          <strong>Anda tidak memiliki barang yang diiklankan.</strong>
        </p>
      )}
    </NavLayout>
  );
};

export default MyProductsPage;
