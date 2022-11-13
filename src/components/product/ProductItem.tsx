import { HTMLAttributes } from "react";
import timeSince from "../../helpers/date/time-since";
import Product from "../../models/item";
import Card from "../base/Card";

interface ProductItemProps extends HTMLAttributes<HTMLDivElement> {
  product: Product;
}

const ProductItem = ({ product, ...props }: ProductItemProps) => {
  return (
    <Card key={product.id} className={`mb-3 rounded-lg ${props.className}`}>
      <figure>
        <img
          src={product.images[0]}
          className="aspect-square w-full rounded-lg rounded-b-none object-cover"
          alt={product.description}
        />
        <figcaption className="pl-1 text-lg">{product.name}</figcaption>
      </figure>
      <div className="mt-4 flex justify-between px-1 text-sm uppercase text-slate-500">
        <address className="not-italic">Kuta Selatan</address>
        <span>{`${timeSince(product.updated_at, "id")} lalu`}</span>
      </div>
    </Card>
  );
};

export default ProductItem;
