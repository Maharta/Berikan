import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isModalOpen: boolean;
}

const initialAuthState: ModalState = {
  isModalOpen: false,
};

export const modalSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
