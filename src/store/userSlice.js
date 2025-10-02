import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("reduxUsers") || "[]");

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.unshift(action.payload);
      localStorage.setItem("reduxUsers", JSON.stringify(state));
    },
    updateUser: (state, action) => {
      const idx = state.findIndex((u) => u.id === action.payload.id);
      if (idx !== -1) state[idx] = action.payload;
      localStorage.setItem("reduxUsers", JSON.stringify(state));
    },
    deleteUser: (state, action) => {
      const updated = state.filter((u) => u.id !== action.payload);
      localStorage.setItem("reduxUsers", JSON.stringify(updated));
      return updated;
    },
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
