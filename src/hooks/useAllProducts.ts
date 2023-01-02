import getAllProducts from "@/helpers/firebase/allProductsFetcher";
import Product from "@/models/product";
import { useQuery } from "@tanstack/react-query";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

interface Options {
  isEnabled?: boolean;
  refetchOnMount?: boolean;
}

const useAllProducts = (
  options: Options,
  select?: (data: QuerySnapshot<DocumentData>) => Product[] | undefined
) => {
  return useQuery(["all-products"], getAllProducts, {
    enabled: options.isEnabled,
    refetchOnWindowFocus: false, // prevent unnecessary re-renders
    select,
    refetchOnMount: options.refetchOnMount,
  });
};

export default useAllProducts;
