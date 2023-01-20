import React, { HTMLAttributes, useState } from "react";
import timeSince from "@/helpers/date/time-since";
import Product from "@/models/product";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { ProgressBar } from "react-loader-spinner";
import VerticalDots from "../base/buttons/VerticalDots";
import Card from "../base/Card";

interface MyProductItemProps extends HTMLAttributes<HTMLDivElement> {
  product: Product;
}

const deleteItemById = (id: string) => deleteDoc(doc(db, "item", id));

function MyProductItem({ product, ...props }: MyProductItemProps) {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { error, mutate, isLoading, isError, isSuccess } = useMutation({
    // error and success state will be implemented after creating a custom toast component
    mutationFn: () => deleteItemById(product.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-products"]);
    },
  });

  const onClickHandler = () => {
    navigate(`/product/${product.id}`, {
      state: product,
    });
  };
  const threeDotsClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOptionOpen((isOpen) => !isOpen);
  };

  const deleteButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutate();
  };

  return (
    <>
      <Card
        onClick={onClickHandler}
        key={product.id}
        className={classNames(
          `relative mx-auto mb-3 w-[325px] cursor-pointer rounded-lg ${props.className}`
        )}>
        <figure>
          <VerticalDots
            onClick={threeDotsClickHandler}
            className="absolute top-1 right-1"
          />
          <AnimatePresence>
            {isOptionOpen && (
              <motion.div
                initial={{
                  x: "110%",
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                exit={{
                  x: "110%",
                  opacity: 0,
                }}
                className="absolute top-[50px] right-0 w-[125px] rounded-sm bg-white shadow-lg">
                <button
                  onClick={deleteButtonHandler}
                  className="w-full p-2 text-start">
                  Hapus
                </button>
              </motion.div>
            )}
          </AnimatePresence>
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
      {isLoading && (
        <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{
            position: "absolute",
            bottom: "0",
            right: "0",
          }}
          borderColor="#F4442E"
          barColor="#51E5FF"
        />
      )}
    </>
  );
}

export default MyProductItem;
