import { HTMLAttributes } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import timeSince from "../../helpers/date/time-since";
import Product from "../../models/product";
import { RootState } from "../../store/store";
import Card from "../base/Card";
import classNames from "classnames";

interface ProductItemProps extends HTMLAttributes<HTMLDivElement> {
  product: Product;
}

const ProductItem = ({ product, ...props }: ProductItemProps) => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const { pathname: currentPath } = useLocation();

  const isDeleteable =
    currentUser?.uid === product.ownerId &&
    currentPath === "/account/my-products";

  const onClickHandler = () => {
    navigate(`/product/${product.id}`, {
      state: product,
    });
  };

  return (
    <Card
      onClick={onClickHandler}
      key={product.id}
      className={classNames(
        `relative mb-3 cursor-pointer rounded-lg ${props.className}`,
        {
          "hover:scale-105": !isDeleteable,
        }
      )}>
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
};

export default ProductItem;
