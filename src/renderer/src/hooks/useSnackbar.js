import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { addSnack, removeSnack } from '../redux/appSlice'

const HIDEDURATION = 3000

const useSnackbar = () => {
  const dispatch = useDispatch()

  const snackbar = (props) => {
    const { msg, type } = props

    if (typeof msg !== 'string') return
    if (type !== 'warning' && type !== 'info' && type !== 'success') return

    const id = nanoid()
    dispatch(addSnack({ msg, type, id }))
    setTimeout(() => {
      dispatch(removeSnack({ id }))
    }, HIDEDURATION)
  }

  return { snackbar }
}

export default useSnackbar
