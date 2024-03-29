import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import Product, { FirestoreProduct } from "@/models/product";
import CardCarousel from "../CardCarousel";
import ProductItem from "./ProductItem";

const newProductsFetcher = async () => {
  const productRef = collection(db, "item");
  const q = query(productRef, orderBy("updated_at", "desc"), limit(7));
  try {
    const itemsSnapshot = await getDocs(q);
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
    return await Promise.resolve(tempItems);
  } catch (error) {
    if (error instanceof Error) {
      return Promise.reject(error.message);
    }
    return Promise.reject(new Error("Something went wrong."));
  }
};

function NewProducts() {
  const { data, isLoading, isError, error } = useQuery<Product[], Error>({
    queryKey: ["new-products"],
    queryFn: newProductsFetcher,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <CardCarousel>
      {data?.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </CardCarousel>
  );
}

export default NewProducts;
