import { Timestamp } from "firebase/firestore";

interface ProductArgs {
  id: string;
  name: string;
  description: string;
  updated_at?: Date;
  images: string[];
  owner: string;
}

export interface FirestoreProduct {
  name: string;
  description: string;
  updated_at: Timestamp;
  images: string[];
  owner: string;
}

class Product {
  id: string;
  name: string;
  description: string;
  updated_at: Date;
  images: string[];
  owner: string;

  constructor({
    id,
    name,
    description,
    updated_at = new Date(),
    images,
    owner,
  }: ProductArgs) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.updated_at = updated_at;
    this.images = images;
    this.owner = owner;
  }
}

export default Product;
