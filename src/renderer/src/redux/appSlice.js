import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  drawer: {
    isOpen: false
  },
  snackbar: {
    snacks: []
  }
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addSnack: {
      prepare: ({ msg, type, id }) => {
        return {
          payload: {
            msg,
            type,
            id
          }
        }
      },
      reducer: (state, action) => {
        const { msg, type, id } = action.payload

        state.snackbar.snacks.push({ id, type, msg, open: true })
      }
    },
    removeSnack: {
      prepare: ({ id }) => {
        return { payload: { id } }
      },
      reducer: (state, action) => {
        const { id } = action.payload

        state.snackbar.snacks = state.snackbar.snacks.filter((snack) => snack.id !== id)
      }
    },
    hideSnack: {
      prepare: ({ id }) => {
        return { payload: { id } }
      },
      reducer: (state, action) => {
        const { id } = action.payload

        state.snackbar.snacks.find((snack) => snack.id === id).open = false
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

export const { addSnack, removeSnack, hideSnack, openDrawer, closeDrawer } = appSlice.actions

export default appSlice.reducer
