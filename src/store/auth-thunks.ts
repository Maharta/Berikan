import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  firstname: string;
  lastname: string;
  phone_number: string;
}

export const login = createAsyncThunk<
  unknown,
  LoginCredentials,
  { rejectValue: Error }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const { user }: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user.toJSON();
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error);
    }
    return rejectWithValue(
      new Error("Something went wrong when trying to sign you in..")
    );
  }
});

export const logout = () => {
  try {
    signOut(auth);
  } catch (error) {
    if (error instanceof Error) alert(error.message);
  }
};

export const register = createAsyncThunk<
  unknown,
  RegisterCredentials,
  {
    rejectValue: Error;
  }
>(
  "auth/register",
  async (registerArgs: RegisterCredentials, { rejectWithValue }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        registerArgs.email,
        registerArgs.password
      );

      await setDoc(doc(db, "account", user.uid), {
        uid: user.uid,
        firstname: registerArgs.firstname,
        lastname: registerArgs.lastname,
        phone_number: registerArgs.phone_number,
        avatar_url: "",
        created_at: Timestamp.fromDate(new Date()),
      });

      console.log(`document created`);
      return user.toJSON();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error);
      }
      return rejectWithValue(
        new Error("Something went wrong when creating your account..")
      );
    }
  }
);
