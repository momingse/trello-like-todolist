import { configureStore } from "@reduxjs/toolkit";
import todoReducer, { toDoListenerMiddleware } from "./redux/todoSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(toDoListenerMiddleware.middleware),
});
