import { uuidv4 } from "@firebase/util";
import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/firebase";
import { FirestoreProduct } from "@/models/product";

export interface AddNewItemArgs
  extends Omit<
    FirestoreProduct,
    "images" | "updated_at" | "location" | "address"
  > {
  images: File[];
}

const addNewProduct = async ({
  name,
  description,
  ownerId,
  images,
  position,
}: AddNewItemArgs) => {
  try {
    const locationRes = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=json`
    );
    const locationData = await locationRes.json();
    const { address, display_name: displayName } = locationData;
    let location;

    if (address.city) {
      location = address.city;
    } else if (address.county) {
      location = address.county;
    } else {
      location = address.state;
    }
    const data = {
      name,
      description,
      ownerId,
      updated_at: Timestamp.fromDate(new Date()),
      position,
      location,
      address: displayName,
    };

    const imageUrls: string[] = [];
    const docRef = await addDoc(collection(db, "item"), data);

    await Promise.all(
      images.map(async (imageFile, index) => {
        const productPhotoRef = ref(
          storage,
          `${ownerId}/products/${docRef.id}/${uuidv4()}`
        );
        await uploadBytes(productPhotoRef, imageFile);
        const url = await getDownloadURL(productPhotoRef);
        imageUrls[index] = url;
      })
    );

    return await updateDoc(doc(db, "item", docRef.id), {
      images: imageUrls,
    });
  } catch (error) {
    if (error instanceof Error) {
      return Promise.reject(error);
    }
    return Promise.reject(
      new Error("Something went wrong when trying to add your item.")
    );
  }
};

export default addNewProduct;
