import { useInfiniteQuery } from "@tanstack/react-query";
import {
  DocumentData,
  getDocs,
  Query,
  query,
  startAfter,
} from "firebase/firestore";
import React, { useCallback, useRef } from "react";
import Product, { FirestoreProduct } from "@/models/product";
import CardCarousel from "../CardCarousel";
import ProductItem from "./ProductItem";

const infinityProductFetcher = async (q: Query<DocumentData>) => getDocs(q);

interface InfinityProductProps {
  q: Query<DocumentData>;
}

function InfinityProduct({ q }: InfinityProductProps) {
  const { data, isLoading, isError, error, fetchNextPage } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = q }) => infinityProductFetcher(pageParam),
    getNextPageParam: (lastPageSnapshot) => {
      if (!lastPageSnapshot.docs.length) return undefined;
      const lastDocument =
        lastPageSnapshot.docs[lastPageSnapshot.docs.length - 1];
      return query(q, startAfter(lastDocument));
    },
    refetchOnWindowFocus: false,
  });

  const isFetchingRef = useRef(false); // ref for stopping calls to API for infinite scroll if currently fetching
  const onScrollHandler = useCallback(
    async (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollWidth, scrollLeft, clientWidth } =
        e.target as HTMLDivElement;
      if (scrollWidth - scrollLeft <= clientWidth * 1.3) {
        if (isFetchingRef.current === false) {
          isFetchingRef.current = true;
          await fetchNextPage();
          isFetchingRef.current = false;
        }
      }
    },
    [fetchNextPage]
  );

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (isError) {
    if (error instanceof Error) {
      return <div>{error.message}</div>;
    }
    return <div>Something went wrong..</div>;
  }

  let products;
  if (data) {
    const tempArray: Product[] = [];
    data.pages.forEach((itemSnapshot) => {
      itemSnapshot.forEach((item) => {
        const itemData = item.data() as FirestoreProduct;
        const transformedData = {
          ...itemData,
          id: item.id,
          updated_at: itemData.updated_at.toDate(),
        };
        tempArray.push(transformedData);
      });
    });
    products = tempArray;
  }

  return (
    <CardCarousel onScroll={onScrollHandler}>
      {products?.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </CardCarousel>
  );
}

export default InfinityProduct;
