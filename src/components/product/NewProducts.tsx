import Product from "../../models/item";
import ProductItem from "./ProductItem";

interface NewProductsProps {
  products: Product[];
}

const NewProducts = ({ products }: NewProductsProps) => {
  return (
    <div
      className="grid snap-x snap-mandatory scroll-p-1 auto-cols-[60%] grid-flow-col gap-3
      overflow-x-auto scroll-smooth p-1 xs:auto-cols-[45%] md:auto-cols-[35%] lg:auto-cols-[21%]
      [@media(max-width:830px)]:scrollbar-hide">
      {products.map((product) => (
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
