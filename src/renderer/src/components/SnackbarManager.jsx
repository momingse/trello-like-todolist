import Snackbar from '@mui/material/Snackbar'
import { Alert } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { clearSnackbar } from '../redux/snackbarSlice'

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
  const successMessage = useSelector((state) => state.snackbar.successMessage)
  const errorMessage = useSelector((state) => state.snackbar.errorMessage)
  const infoMessage = useSelector((state) => state.snackbar.infoMessage)
  const successSnackbarOpen = useSelector((state) => state.snackbar.successSnackbarOpen)
  const errorSnackbarOpen = useSelector((state) => state.snackbar.errorSnackbarOpen)
  const infoSnackbarOpen = useSelector((state) => state.snackbar.infoSnackbarOpen)

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(clearSnackbar())
  }

  return (
    <>
      <CustomizedSnackbar
        open={successSnackbarOpen}
        onClose={handleClose}
        severity={'success'}
        msg={successMessage}
      />
      <CustomizedSnackbar
        open={errorSnackbarOpen}
        onClose={handleClose}
        severity={'error'}
        msg={errorMessage}
      />
      <CustomizedSnackbar
        open={infoSnackbarOpen}
        onClose={handleClose}
        severity={'info'}
        msg={infoMessage}
      />
    </>
  )
}

export default SnackbarManager
