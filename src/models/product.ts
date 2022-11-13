import { Timestamp } from "firebase/firestore";

interface ProductArgs {
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
}

export interface FirestoreProduct
  extends Omit<ProductArgs, "id" | "updated_at"> {
  updated_at: Timestamp;
}

class Product {
  id: string;
  name: string;
  description: string;
  updated_at: Date;
  images: string[];
  ownerId: string;
  position: {
    lat: number;
    lng: number;
  };

  constructor({
    id,
    name,
    description,
    updated_at = new Date(),
    images,
    ownerId,
    position,
  }: ProductArgs) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.updated_at = updated_at;
    this.images = images;
    this.ownerId = ownerId;
    this.position = position;
  }
}

export default Product;
