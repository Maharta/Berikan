import { FormEvent, Fragment, useCallback, useState } from "react";
import ProductInput from "@/components/product/ProductInput";
import {
  noemptyValidationFn,
  descriptionValidationFn,
} from "@/helpers/validation-function/productInputValidation";
import useInput from "@/hooks/useInput";
import NavLayout from "@/layout/NavLayout";
import DescriptionArea from "@/components/product/DescriptionArea";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store/store";
import ImagesPicker from "@/components/ImagesPicker";
import { useMutation } from "@tanstack/react-query";
import addNewProduct, {
  AddNewItemArgs,
} from "@/helpers/firebase/addNewProduct";
import { TailSpin } from "react-loader-spinner";
import { modalActions } from "@/store/modal-slice";
import ErrorModal from "@/components/base/modal/ErrorModal";
import { useNavigate } from "react-router-dom";
import { Position } from "@/models/position";
import LeafletMap from "@/components/map/LeafletMap";
import { motion } from "framer-motion";

const imgErrorVariants = {
  visible: {
    fontSize: "16px",
  },
  hidden: {
    fontSize: "8px",
  },
};

function AddItemPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isModalOpen = useSelector(
    (state: RootState) => state.modal.isModalOpen
  );
  const dispatch = useAppDispatch();

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [nameState, nameProps] = useInput(noemptyValidationFn);
  const [descriptionState, descriptionProps] = useInput(
    descriptionValidationFn
  );
  const [position, setPosition] = useState<Position>({
    lat: -8.65,
    lng: 115.216667,
  });

  const [imageArrays, setImageArrays] = useState<File[]>([]);
  const filteredArrays = imageArrays.filter(
    (imageFiles) => imageFiles !== null // filtering arrays removing null index, in case users don't put image on first imagepicker component
  );

  const imagesNotEmpty = filteredArrays.length !== 0;
  const isFormValid =
    nameState.isValid && descriptionState.isValid && imagesNotEmpty;

  const { isError, error, isLoading, mutate } = useMutation<
    void,
    Error,
    AddNewItemArgs
  >({
    mutationFn: addNewProduct,
  });

  const navigate = useNavigate();

  const addItemHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsButtonClicked(true);
    if (!isFormValid) return;
    const cleanPosition = { ...position };
    mutate(
      {
        name: nameProps.value,
        description: descriptionProps.value,
        ownerId: user!.uid,
        images: filteredArrays,
        position: cleanPosition,
      },
      {
        onSuccess: () => {
          navigate("/");
        },
        onError: () => {
          dispatch(modalActions.openModal());
        },
      }
    );
  };

  const onImagesChangedHandler = useCallback((imgArray: File[]) => {
    setImageArrays(imgArray);
  }, []);

  if (isLoading) {
    return (
      <TailSpin
        height="80"
        width="80"
        color="#00838f"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperClass="centered"
        visible
      />
    );
  }

  return (
    <>
      <ErrorModal
        isOpen={isModalOpen && isError}
        onClose={() => {
          dispatch(modalActions.closeModal());
        }}>
        {error && (
          <div className="text-center text-xl">
            <strong>Oops!</strong>
            <p>{error.message}</p>
          </div>
        )}
      </ErrorModal>
      <NavLayout title="Tambah Barang">
        <form onSubmit={addItemHandler}>
          <ProductInput
            isInvalid={nameState.isInputInvalid}
            id="name"
            title="NAMA BARANG"
            invalidMessage="Nama barang tidak boleh kosong!"
            {...nameProps}
          />
          <DescriptionArea
            isInvalid={descriptionState.isInputInvalid}
            {...descriptionProps}
          />

          <div className="mx-auto w-[90%] max-w-lg">
            <label htmlFor="map-form" className="mb-1">
              Lokasi Barang
            </label>
            <LeafletMap
              editable
              id="map-form"
              onGetPositionHandler={setPosition}
              position={position}
            />
          </div>
          <div className="mx-auto mt-3 w-[90%] max-w-lg">
            <label className="mb-2 block" htmlFor="imagePickers">
              Tambahkan Foto (Maks 4)
            </label>
            <ImagesPicker
              id="imagePickers"
              className="black flex border px-1 py-2"
              numberOfImages={4}
              onImagesChanged={onImagesChangedHandler}
            />
          </div>

          <div
            style={{
              visibility:
                isButtonClicked && !imagesNotEmpty ? "initial" : "hidden",
            }}
            className="w-full text-center">
            <motion.strong
              animate={
                isButtonClicked && !imagesNotEmpty ? "visible" : "hidden"
              }
              variants={imgErrorVariants}
              className="text-red-600">
              Sisipkan paling tidak 1 gambar!
            </motion.strong>
          </div>

          <button className="mx-auto mt-4 block w-32 rounded-lg bg-primary px-3 py-2 text-white hover:scale-105 active:scale-105">
            Tambahkan!
          </button>
        </form>
      </NavLayout>
    </>
  );
}

export default AddItemPage;
