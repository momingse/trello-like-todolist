import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  drawer: {
    isOpen: false
  },
  snackbar: {
    successSnackbarOpen: false,
    errorSnackbarOpen: false,
    infoSnackbarOpen: false,
    successMessage: '',
    errorMessage: '',
    infoMessage: ''
  }
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    clearSnackbar: (state) => {
      state.snackbar.successSnackbarOpen = false
      state.snackbar.errorSnackbarOpen = false
      state.snackbar.infoSnackbarOpen = false
      state.snackbar.successMessage = ''
      state.snackbar.errorMessage = ''
      state.snackbar.infoMessage = ''
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

        state.snackbar.successSnackbarOpen = true
        state.snackbar.successMessage = msg
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

        state.snackbar.errorSnackbarOpen = true
        state.snackbar.errorMessage = msg
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

        state.snackbar.infoSnackbarOpen = true
        state.snackbar.infoMessage = msg
      }
    },
    openDrawer: (state) => {
      state.drawer.isOpen = true
    },
    closeDrawer: (state) => {
      state.drawer.isOpen = false
    }
  }
})

export const { clearSnackbar, successMsg, errorMsg, infoMsg, openDrawer, closeDrawer } =
  appSlice.actions

export default appSlice.reducer
