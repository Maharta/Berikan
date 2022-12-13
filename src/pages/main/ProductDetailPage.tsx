import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import ImageCarousel from "../../components/ImageCarousel";
import LeafletMap from "../../components/map/LeafletMap";
import OwnerAvatar from "../../components/product/OwnerAvatar";
import NavLayout from "../../layout/NavLayout";
import Account from "../../models/account";
import Product from "../../models/product";
import accountFetcher from "../../helpers/firebase/accountFetcher";
import AvatarImg from "../../assets/avatar.png";

const ProductDetailPage = () => {
  const location = useLocation();
  const product = location.state as Product;

  const images = product.images.map((image) => {
    return {
      name: product.name,
      url: image,
    };
  });

  const {
    isLoading,
    data: snapshot,
    error,
    isError,
  } = useQuery({
    queryKey: ["product-owner", product.ownerId],
    queryFn: () => accountFetcher(product.ownerId),
  });

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (isError) {
    if (error instanceof Error) {
      return <div>{error.message}</div>;
    }
    return <div>Something went wrong..</div>;
  }

  let ownerData;
  if (snapshot) {
    ownerData = snapshot.data() as Account;
  }

  return (
    <NavLayout paddingBot="0" paddingTop="0.5rem" title="Detail Barang">
      <ImageCarousel className="h-72 w-full" images={images} />
      <div className="mt-2 px-2">
        <h1 className="text-lg font-bold">{product.name}</h1>
        <p>{product.description}</p>
        <div className="mb-3">
          <label className="mb-1 block text-lg font-bold" htmlFor="map">
            Peta Barang
          </label>
          <LeafletMap
            editable={false}
            id="map"
            position={product.position}
            popupText={product.address}
          />
        </div>
        {ownerData && (
          <section
            aria-label="Detail Iklan"
            className="card grid grid-cols-3 grid-rows-3 rounded-lg pt-2 pb-4">
            <div className="col-span-1 row-span-2 grid place-content-center">
              <OwnerAvatar
                imgUrl={
                  !ownerData.avatar_url ? AvatarImg : ownerData.avatar_url
                }
              />
            </div>
            <div className="col-span-2 self-end">
              Diiklankan {product.updated_at?.toISOString().split("T")[0]}
            </div>
            <div className="col-span-2 self-start">
              {ownerData.firstname + " " + ownerData.lastname}
            </div>
            <div className="col-span-3 self-center text-center">
              <button className="rounded-lg bg-blue-300 px-4 py-2 text-white">
                Chat Pengiklan
              </button>
            </div>
          </section>
        )}
      </div>
    </NavLayout>
  );
};

export default ProductDetailPage;
