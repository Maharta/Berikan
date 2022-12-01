import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import ProductItem from "../../components/product/ProductItem";
import { db } from "../../firebase";
import NavLayout from "../../layout/NavLayout";
import Product, { FirestoreProduct } from "../../models/product";
import { RootState } from "../../store/store";

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

  console.log(myProductsData);

  return (
    <NavLayout title="Barang Saya">
      {myProductsData?.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </NavLayout>
  );
};

export default MyProductsPage;