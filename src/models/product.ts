import { Timestamp } from "firebase/firestore";

interface Product {
  id: string;
  name: string;
  description: string;
  updated_at?: Date;
  images: string[];
  ownerId: string;
  position: {
    lat: number;
    lng: number;
  };
  location: string;
  address: string;
}

export interface FirestoreProduct extends Omit<Product, "id" | "updated_at"> {
  updated_at: Timestamp;
}

export default Product;
