import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import Product, { FirestoreProduct } from "../../models/product";
import ProductItem from "./ProductItem";

const productRef = collection(db, "item");
const q = query(productRef, orderBy("updated_at", "desc"), limit(7));

const newProductsFetcher = async () => {
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
    return Promise.resolve(tempItems);
  } catch (error) {
    if (error instanceof Error) {
      return Promise.reject(error.message);
    } else {
      return Promise.reject("something went wrong");
    }
  }
};

const NewProducts = () => {
  const { data, isLoading, isError, error } = useQuery<Product[], string>({
    queryKey: ["products"],
    queryFn: newProductsFetcher,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (isError) {
    return <div>{error}</div>;
  }

  return (
    <div
      className="grid snap-x snap-mandatory scroll-p-1 auto-cols-[65%] grid-flow-col gap-3
      overflow-x-auto scroll-smooth p-1 xs:auto-cols-[45%] md:auto-cols-[35%] lg:auto-cols-[21%]
      [@media(max-width:830px)]:scrollbar-hide">
      {data?.map((product) => (
        <ProductItem
          className="snap-start last:snap-end"
          product={product}
          key={product.id}
        />
      ))}
    </div>
  );
};

export default NewProducts;
