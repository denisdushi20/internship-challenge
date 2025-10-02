import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: [], 
  reducers: {
    setUsers: (state, action) => action.payload, 
    addUser: (state, action) => [action.payload, ...state],
    updateUser: (state, action) => {
      const index = state.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteUser: (state, action) => state.filter((u) => u.id !== action.payload),
  },
});

export const { setUsers, addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
