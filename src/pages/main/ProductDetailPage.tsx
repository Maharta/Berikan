/* eslint-disable no-useless-escape */
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ImageCarousel from "@/components/ImageCarousel";
import LeafletMap from "@/components/map/LeafletMap";
import OwnerAvatar from "@/components/product/OwnerAvatar";
import NavLayout from "@/layout/NavLayout";
import { transformToProduct } from "@/models/product";
import accountFetcher from "@/helpers/firebase/accountFetcher";
import AvatarImg from "@/assets/avatar.png";
import { ReactComponent as WhatsappLogo } from "@/assets/whatsapp.svg";
import Account from "@/models/account";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { MutatingDots } from "react-loader-spinner";

function getProductDetail(id: string) {
  const docRef = doc(db, "item", id);
  return getDoc(docRef);
}

function ProductDetailPage() {
  const { id } = useParams();

  const {
    isLoading: isProductLoading,
    data: product,
    isError: isProductError,
    error: productError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetail(id!),
    select: (snapshot) => transformToProduct(snapshot),
  });

  const images = product?.images.map((image: string) => ({
    name: product.name,
    url: image,
  }));

  const {
    isLoading,
    data: ownerData,
    error,
    isError,
  } = useQuery({
    queryKey: ["product-owner", product?.ownerId],
    queryFn: () => accountFetcher(product?.ownerId!),
    select: (snapshot) => snapshot.data() as Account,
    enabled: !!product,
  });

  if (isLoading || isProductLoading) {
    return <MutatingDots wrapperClass="centered" />;
  }

  if (isError || isProductError) {
    return (
      <div className="centered">
        <strong>Something went wrong..</strong>
        {isError && error instanceof Error ? (
          <strong>{error.message}</strong>
        ) : null}
        {isProductError && productError instanceof Error ? (
          <strong>{productError.message}</strong>
        ) : null}
      </div>
    );
  }

  if (!product) {
    return <p>Barang dengan URL yang anda ketik tidak ditemukan..</p>;
  }

  return (
    <NavLayout paddingBot="0" paddingTop="0.5rem" title="Detail Barang">
      <ImageCarousel className="h-72 w-full" images={images!} />
      <div className="mt-2 px-2">
        <h1 className="text-lg font-bold">{product?.name}</h1>
        <p>{product?.description}</p>
        <div className="mb-3">
          <h2 className="mb-1 block text-lg font-bold">Peta Barang</h2>
          <LeafletMap
            editable={false}
            id="map"
            position={product?.position}
            popupText={product?.address}
          />
        </div>
        {ownerData && (
          <section
            aria-label="Detail Iklan"
            className="card mb-1 grid grid-cols-3 grid-rows-3 rounded-lg pt-2">
            <div className="col-span-1 row-span-2 grid place-content-center">
              <OwnerAvatar
                imgUrl={
                  !ownerData.avatar_url ? AvatarImg : ownerData.avatar_url
                }
              />
            </div>
            <div className="col-span-2 self-end">
              Diiklankan {product?.updated_at?.toISOString().split("T")[0]}
            </div>
            <div className="col-span-2 self-start">
              {`${ownerData.firstname} ${ownerData.lastname}`}
            </div>
            <div className="col-span-3 self-center text-center">
              <a
                href={`https://wa.me/${ownerData.phone_number}?text=Halo! saya tertarik dengan barang ini:
                https://berikan.web.app/product/${id}, apakah masih ada\?`}
                className="flex w-full cursor-pointer items-center justify-center bg-whatsappGreen py-2 font-bold 
                tracking-normal text-white hover:bg-whatsappGreen_light focus:bg-whatsappGreen_light active:bg-whatsappGreen_light">
                <WhatsappLogo className="mr-1 h-8 w-8" />
                Chat Pengiklan
              </a>
            </div>
          </section>
        )}
      </div>
    </NavLayout>
  );
}

export default ProductDetailPage;
