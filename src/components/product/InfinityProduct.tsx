import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  collection,
  DocumentData,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  Query,
  query,
  startAfter,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase";
import CardCarousel from "../CardCarousel";
import ProductItem from "./ProductItem";

const infinityProductFetcher = async (query: Query<DocumentData>) => {
  return await getDocs(query);
};

const totalProductFetcher = async () => {
  const productRef = collection(db, "item");
  const q = query(productRef, orderBy("updated_at", "asc"), limit(10));
  return await getCountFromServer(q);
};

const InfinityProduct = () => {
  const [isInfinityReady, setIsInfinityReady] = useState(false);
  const productRef = collection(db, "item");
  const q = query(productRef, orderBy("updated_at", "asc"), limit(10));

  const {
    data: countResponse,
    isLoading,
    error,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["products-count"],
    queryFn: totalProductFetcher,
  });

  useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = q }) => infinityProductFetcher(pageParam),
    getNextPageParam: (lastPageSnapshot, allPages) => {
      const totalProduct = countResponse?.data().count;
      const totalPage = totalProduct / 10;
    },
  });

  console.log(countResponse?.data().count);

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (isError) {
    if (error instanceof Error) {
      return <div>{error.message}</div>;
    }
    return <div>Something went wrong</div>;
  }

  return (
    <CardCarousel>
      <div>.</div>
      <div>.</div>
      <div>.</div>
    </CardCarousel>
  );
};

export default InfinityProduct;
