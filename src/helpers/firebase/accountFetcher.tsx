import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const accountFetcher = (accountId: string) => {
  const accountDocRef = doc(db, "account", accountId);
  return getDoc(accountDocRef);
};

export default accountFetcher;
