import { configureStore } from '@reduxjs/toolkit'
import todoReducer, { toDoListenerMiddleware } from './redux/todoSlice'
import appReducer from './redux/appSlice'

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    app: appReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(toDoListenerMiddleware.middleware)
})
