import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./redux/todoSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});
