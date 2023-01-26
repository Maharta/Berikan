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
import Product, { transformToProduct } from "@/models/product";
import { RootState } from "@/store/store";
import { useCallback } from "react";
import { MutatingDots } from "react-loader-spinner";

const myProductsFetcher = (uid: string) => {
  const productRef = collection(db, "item");
  const q = query(
    productRef,
    where("ownerId", "==", uid),
    orderBy("updated_at", "desc")
  );
  return getDocs(q);
};

function MyProductsPage() {
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
      // used usecallback so it doesn't rerun unless data changed.
      const products: Product[] = [];
      snapshot.forEach((productSnap) => {
        products.push(transformToProduct(productSnap));
      });
      return products;
    }, []),
  });

  if (isLoading) {
    return <MutatingDots wrapperClass="centered" />;
  }

  if (isError) {
    return (
      <div className="centered">
        <strong>Gagal memuat barang anda.</strong>
        {error instanceof Error ? <strong>{error.message}</strong> : null}
      </div>
    );
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
}

export default MyProductsPage;
