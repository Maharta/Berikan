import useDebounce from "@/hooks/useDebounce";
import Product, { FirestoreProduct } from "@/models/product";
import { FormEvent, MouseEvent, useMemo, useRef, useState } from "react";
import useAllProducts from "@/hooks/useAllProducts";
import { useNavigate, createSearchParams } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const SearchInput = () => {
  const [isSearchTouched, setIsSearchTouched] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedQuery = useDebounce(search, 250);

  const navigate = useNavigate();

  const { data } = useAllProducts(
    { isEnabled: !!debouncedQuery, refetchOnMount: false },
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
      return products;
    }
  );

  const searchClickHandler = (e: MouseEvent<HTMLLIElement>) => {
    navigate({
      pathname: "search-results",
      search: createSearchParams({
        query: e.currentTarget.innerText,
      }).toString(),
    });
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate({
      pathname: "search-results",
      search: createSearchParams({
        query: search,
      }).toString(),
    });
  };

  const searchResults = useRef<Product[] | undefined>([]);

  searchResults.current = useMemo(() => {
    return data?.filter((product) => {
      if (debouncedQuery) {
        return product.name
          .toLowerCase()
          .trim()
          .includes(debouncedQuery.toLowerCase().trim());
      } else {
        return true;
      }
    });
  }, [data, debouncedQuery]);

  return (
    <form
      onSubmit={onSubmitHandler}
      autoComplete="off"
      className="relative mr-auto flex w-max items-center rounded-full border border-black">
      <MagnifyingGlassIcon className="ml-3 h-5 w-5" />
      <label className="invisible absolute" htmlFor="search">
        {/* hidden label for accessibility */}
        Cari Barang Disini.
      </label>
      <input
        type="search"
        name="search"
        id="search"
        onFocus={() => setIsSearchTouched(true)}
        onBlur={() => setIsSearchTouched(false)}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="PS5 Bekas"
        className="ml-2 mr-1 h-full w-full rounded-full p-1 outline-none"
      />
      {search && isSearchTouched && (
        <div className="absolute top-[35px] left-0 z-50 w-full rounded-md bg-white shadow-md">
          <ul
            style={{
              padding: searchResults.current?.length !== 0 ? "0.5rem 0" : 0,
            }}>
            {searchResults.current && searchResults.current.length !== 0
              ? searchResults.current.slice(0, 7).map((result) => (
                  <li
                    className="cursor-pointer p-1 px-3 font-medium hover:bg-slate-400/20"
                    onMouseDown={(e) => e.preventDefault()} // prevent search input onBlur
                    onClick={searchClickHandler}
                    key={result.id}>
                    {result.name}
                  </li>
                ))
              : null}
          </ul>
        </div>
      )}
    </form>
  );
};

export default SearchInput;
