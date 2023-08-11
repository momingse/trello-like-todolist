import { configureStore } from '@reduxjs/toolkit'
import todoReducer, { toDoListenerMiddleware } from './redux/todoSlice'
import snackbarReducer from './redux/snackbarSlice'

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    snackbar: snackbarReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(toDoListenerMiddleware.middleware)
})
