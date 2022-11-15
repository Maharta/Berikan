import { FormEvent, Fragment, useCallback, useState } from "react";
import ProductInput from "../../components/product/ProductInput";
import {
  noemptyValidationFn,
  descriptionValidationFn,
} from "../../helpers/validation-function/productInputValidation";
import { useInput } from "../../hooks/useInput";
import NavLayout from "../../layout/NavLayout";
import DescriptionArea from "../../components/product/DescriptionArea";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import ImagesPicker from "../../components/ImagesPicker";
import { useMutation } from "@tanstack/react-query";
import addNewItem, { AddNewItemArgs } from "../../helpers/firebase/addNewItem";
import { TailSpin } from "react-loader-spinner";
import { modalActions } from "../../store/modal-slice";
import ErrorModal from "../../components/base/modal/ErrorModal";
import { useNavigate } from "react-router-dom";
import { Position } from "../../models/position";
import LeafletMap from "../../components/map/LeafletMap";

const AddItemPage = () => {
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
    undefined,
    string,
    AddNewItemArgs
  >({
    mutationFn: addNewItem,
  });

  const navigate = useNavigate();

  const addItemHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsButtonClicked(true);
    if (!isFormValid) return;
    const cleanPosition = Object.assign({}, position);
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

  const onImagesChangedHandler = useCallback((imageArrays: File[]) => {
    setImageArrays(imageArrays);
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
        visible={true}
      />
    );
  }

  return (
    <Fragment>
      <ErrorModal
        isOpen={isModalOpen && isError}
        onClose={() => {
          dispatch(modalActions.closeModal());
        }}>
        {error && (
          <div className="text-center text-xl">
            <strong>Oops!</strong>
            <p>{error}</p>
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
              editable={true}
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
            <strong>Sisipkan paling tidak 1 gambar!</strong>
          </div>

          <button className="mx-auto mt-6 block w-32 rounded-lg bg-primary px-3 py-2 text-white hover:scale-105 active:scale-105">
            Tambahkan!
          </button>
        </form>
      </NavLayout>
    </Fragment>
  );
};

export default AddItemPage;
