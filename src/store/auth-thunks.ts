import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
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

export interface CustomError {
  name: string;
  message: string;
}

export const login = createAsyncThunk<
  unknown,
  LoginCredentials,
  { rejectValue: CustomError }
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
      return rejectWithValue({
        name: error.name,
        message: error.message,
      });
    }
    return rejectWithValue({
      name: "SIGN_IN_ERROR",
      message: "Something went wrong when trying to sign you in..",
    });
  }
});

export const logout = () => {
  try {
    signOut(auth);
  } catch (error) {
    toast.error("Gagal melakukan log out...");
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const register = createAsyncThunk<
  unknown,
  RegisterCredentials,
  { rejectValue: CustomError }
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

      return user.toJSON();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({
          name: error.name,
          message: error.message,
        });
      }
      return rejectWithValue({
        name: "REGISTER_ERROR",
        message: "Something went wrong when creating your account..",
      });
    }
  }
);
