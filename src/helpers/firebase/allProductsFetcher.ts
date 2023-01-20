import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

const productRef = collection(db, "item");
const getAllProducts = () => getDocs(productRef);

export default getAllProducts;
