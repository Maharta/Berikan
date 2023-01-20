import {
  LockClosedIcon,
  UserCircleIcon,
  ShoppingBagIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SettingButton from "@/components/base/buttons/SettingButton";
import accountFetcher from "@/helpers/firebase/accountFetcher";
import NavLayout from "@/layout/NavLayout";
import Account from "@/models/account";
import { logout } from "@/store/auth-thunks";
import { RootState } from "@/store/store";
import AvatarImg from "@/assets/avatar.png";

function AccountPage() {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user-data"],
    queryFn: () => accountFetcher(currentUser!.uid),
    select: (snapshot) => snapshot.data() as Account,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const editProfileButtonHandler = () => {
    navigate("profile");
  };

  const changePasswordButtonHandler = () => {
    navigate("change-password");
  };

  const myProductsButtonHandler = () => {
    navigate("my-products");
  };

  return (
    <NavLayout title="Account">
      <figure className="text-center">
        <img
          className="mx-auto h-32 w-32 rounded-[50%] object-cover"
          src={userData?.avatar_url || AvatarImg}
          alt="Pengguna yang sedang log in"
        />
        <figcaption className="mt-2 font-semibold">
          {`${userData?.firstname} ${userData?.lastname}`}
        </figcaption>
      </figure>
      <section className="mt-1 p-2">
        <h1 className="font-semibold">Account</h1>
        <SettingButton
          icon={<UserCircleIcon className="h-6 w-6" />}
          label="Edit Profil"
          onClick={editProfileButtonHandler}
        />
        <SettingButton
          onClick={changePasswordButtonHandler}
          icon={<LockClosedIcon className="h-6 w-6" />}
          label="Ganti Password"
        />
        <SettingButton
          onClick={myProductsButtonHandler}
          icon={<ShoppingBagIcon className="h-6 w-6" />}
          label="Barang saya"
        />
      </section>
      <section className="p-2">
        <h1 className="font-semibold">Lainnya</h1>
        <SettingButton
          icon={<ArrowRightOnRectangleIcon className="h-6 w-6" />}
          label="Logout"
          onClick={logout}
        />
      </section>
    </NavLayout>
  );
}

export default AccountPage;
