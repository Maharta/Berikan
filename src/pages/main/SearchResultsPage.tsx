import ProductItem from "@/components/product/ProductItem";
import useAllProducts from "@/hooks/useAllProducts";
import NavLayout from "@/layout/NavLayout";
import Product, { FirestoreProduct } from "@/models/product";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchResultsPage = () => {
  let [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const navigate = useNavigate();

  useEffect(() => {
    if (!query) {
      navigate("/");
    }
  }, [navigate, query]);

  const { data: searchResults } = useAllProducts(
    { refetchOnMount: true },
    (querySnapshot) => {
      const products: Product[] = [];
      querySnapshot.forEach((snapshot) => {
        const data = snapshot.data() as FirestoreProduct;
        const transformed = {
          id: snapshot.id,
          ...data,
          updated_at: data.updated_at.toDate(),
        };
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
    }
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
};

export default SearchResultsPage;
