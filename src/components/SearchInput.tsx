import {
  FormEvent,
  MouseEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import useAllProducts from "@/hooks/useAllProducts";
import Product, { transformToProduct } from "@/models/product";
import useDebounce from "@/hooks/useDebounce";

function SearchInput() {
  const [isSearchTouched, setIsSearchTouched] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedQuery = useDebounce(search, 250);

  const navigate = useNavigate();

  const { data: allProducts } = useAllProducts(
    { isEnabled: !!debouncedQuery, refetchOnMount: false },
    useCallback((querySnapshot: QuerySnapshot<DocumentData>) => {
      const products: Product[] = [];
      querySnapshot.forEach((snapshot) => {
        const transformed = transformToProduct(snapshot);
        products.push(transformed);
      });
      return products;
    }, [])
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

  searchResults.current = useMemo(
    () =>
      allProducts?.filter((product) => {
        if (debouncedQuery) {
          return product.name
            .toLowerCase()
            .trim()
            .includes(debouncedQuery.toLowerCase().trim());
        }
        return true;
      }),
    [allProducts, debouncedQuery]
  );

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
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
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
}

export default SearchInput;
