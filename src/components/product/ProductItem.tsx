import { HTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import timeSince from "@/helpers/date/time-since";
import Product from "@/models/product";
import Card from "../base/Card";

interface ProductItemProps extends HTMLAttributes<HTMLDivElement> {
  product: Product;
}

function ProductItem({ product, ...props }: ProductItemProps) {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/product/${product.id}`, {
      state: product,
    });
  };

  return (
    <Card
      onClick={onClickHandler}
      key={product.id}
      className={`relative my-2 cursor-pointer rounded-lg hover:scale-105 focus:scale-105 ${props.className}`}>
      <figure>
        <img
          src={product.images ? product.images[0] : ""}
          className="aspect-square w-full rounded-lg rounded-b-none object-cover"
          alt={product.description}
        />
        <figcaption className="pb-10 pl-1 text-lg font-[500]">
          {product.name}
        </figcaption>
      </figure>
      <div className="absolute bottom-0 flex w-full justify-between px-1 text-sm uppercase text-slate-500">
        <address className="not-italic">{product.location}</address>
        <span>{`${timeSince(product.updated_at!, "id")} lalu`}</span>
      </div>
    </Card>
  );
}

export default ProductItem;
