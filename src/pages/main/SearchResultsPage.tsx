import ProductItem from "@/components/product/ProductItem";
import useAllProducts from "@/hooks/useAllProducts";
import NavLayout from "@/layout/NavLayout";
import Product, { transformToProduct } from "@/models/product";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const navigate = useNavigate();

  useEffect(() => {
    if (!query) {
      navigate("/");
    }
  }, [navigate, query]);

  const { data: searchResults } = useAllProducts(
    { refetchOnMount: true },
    useCallback(
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        const products: Product[] = [];
        querySnapshot.forEach((snapshot) => {
          const transformed = transformToProduct(snapshot);
          products.push(transformed);
        });
        return products.filter((product) => {
          if (query) {
            return product.name
              .toLowerCase()
              .trim()
              .includes(query.trim().toLowerCase());
          }
          return true;
        });
      },
      [query]
    )
  );

  return (
    <NavLayout title="Hasil Pencarian">
      {searchResults?.map((product) => (
        <ProductItem
          className="mx-auto w-[325px]"
          product={product}
          key={product.id}
        />
      ))}
      {searchResults?.length === 0 && (
        <p className="centered">
          <strong>Barang yang anda cari tidak ditemukan.</strong>
        </p>
      )}
    </NavLayout>
  );
}

export default SearchResultsPage;
