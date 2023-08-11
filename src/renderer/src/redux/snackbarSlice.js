import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  successSnackbarOpen: false,
  errorSnackbarOpen: false,
  infoSnackbarOpen: false,
  successMessage: '',
  errorMessage: '',
  infoMessage: ''
}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    clearSnackbar: (state) => {
      state.successSnackbarOpen = false
      state.errorSnackbarOpen = false
      state.infoSnackbarOpen = false
      state.successMessage = ''
      state.errorMessage = ''
      state.infoMessage = ''
    },
    successMsg: {
      prepare: ({ msg }) => {
        return {
          payload: {
            msg
          }
        }
      },
      reducer: (state, action) => {
        const { msg } = action.payload

        state.successSnackbarOpen = true
        state.successMessage = msg
      }
    },
    errorMsg: {
      prepare: ({ msg }) => {
        return {
          payload: {
            msg
          }
        }
      },
      reducer: (state, action) => {
        const { msg } = action.payload

        state.errorSnackbarOpen = true
        state.errorMessage = msg
      }
    },
    infoMsg: {
      prepare: ({ msg }) => {
        return {
          payload: {
            msg
          }
        }
      },
      reducer: (state, action) => {
        const { msg } = action.payload

        state.infoSnackbarOpen = true
        state.infoMessage = msg
      }
    }
  }
})

export const { clearSnackbar, successMsg, errorMsg, infoMsg } = snackbarSlice.actions

export default snackbarSlice.reducer
