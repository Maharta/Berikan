import { useQuery } from "@tanstack/react-query";
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import MyProductItem from "@/components/product/MyProductItem";
import { db } from "@/firebase";
import NavLayout from "@/layout/NavLayout";
import Product, { FirestoreProduct } from "@/models/product";
import { RootState } from "@/store/store";
import { useCallback } from "react";

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

  const {
    data: myProducts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-products", currentUser!.uid],
    queryFn: () => myProductsFetcher(currentUser!.uid),
    refetchOnWindowFocus: false,
    select: useCallback((snapshot: QuerySnapshot<DocumentData>) => {
      //used usecallback so it doesn't rerun unless data changed.
      let myProducts: Product[] = [];
      snapshot.forEach((productSnap) => {
        const productData = productSnap.data() as FirestoreProduct;
        const transformedData = {
          ...productData,
          id: productSnap.id,
          updated_at: productData.updated_at.toDate(),
        };
        myProducts.push(transformedData);
      });
      return myProducts;
    }, []),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <NavLayout title="Barang Saya">
      {myProducts?.map((product) => (
        <MyProductItem product={product} key={product.id} />
      ))}
      {myProducts?.length === 0 && (
        <p className="centered">
          <strong>Anda tidak memiliki barang yang diiklankan.</strong>
        </p>
      )}
    </NavLayout>
  );
};

export default MyProductsPage;
