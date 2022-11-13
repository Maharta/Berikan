import { Timestamp } from "firebase/firestore";

interface ProductArgs {
  id: string;
  name: string;
  description: string;
  updated_at?: Date;
  images: string[];
  ownerId: string;
}

export interface FirestoreProduct {
  name: string;
  description: string;
  updated_at: Timestamp;
  images: string[];
  ownerId: string;
}

class Product {
  id: string;
  name: string;
  description: string;
  updated_at: Date;
  images: string[];
  ownerId: string;

  constructor({
    id,
    name,
    description,
    updated_at = new Date(),
    images,
    ownerId: owner,
  }: ProductArgs) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.updated_at = updated_at;
    this.images = images;
    this.ownerId = owner;
  }
}

export default Product;
