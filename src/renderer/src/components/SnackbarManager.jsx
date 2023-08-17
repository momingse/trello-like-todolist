import Snackbar from '@mui/material/Snackbar'
import { Alert } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { hideSnack } from '../redux/appSlice'

const HIDEDURATION = 2000

const CustomizedSnackbar = (props) => {
  const { open, onClose, severity, msg } = props

  return (
    <Snackbar
      open={open}
      autoHideDuration={HIDEDURATION}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity={severity}>{msg}</Alert>
    </Snackbar>
  )
}

const SnackbarManager = () => {
  const dispatch = useDispatch()
  const snacks = useSelector((state) => state.app.snackbar.snacks)

  const handleClose = (id) => {
    dispatch(hideSnack({ id }))
  }

  return (
    <>
      {snacks.map((snack) => (
        <CustomizedSnackbar
          key={snack.id}
          severity={snack.type}
          msg={snack.msg}
          open={snack.open}
          onClose={() => {
            handleClose(snack.id)
          }}
        />
      ))}
    </>
  )
}

export default SnackbarManager
