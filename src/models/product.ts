import { DocumentData, DocumentSnapshot, Timestamp } from "firebase/firestore";
import { Position } from "./position";

interface Product {
  id: string;
  name: string;
  description: string;
  updated_at?: Date;
  images: string[];
  ownerId: string;
  position: Position;
  location: string;
  address: string;
}

export interface FirestoreProduct extends Omit<Product, "id" | "updated_at"> {
  updated_at: Timestamp;
}

export function transformToProduct(
  snapshot: DocumentSnapshot<DocumentData>
): Product {
  const data = snapshot.data() as FirestoreProduct;
  return {
    ...data,
    id: snapshot.id,
    updated_at: data.updated_at.toDate(),
  };
}

export default Product;
