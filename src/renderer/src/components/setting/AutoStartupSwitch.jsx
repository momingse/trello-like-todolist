import Switch from '@mui/material/Switch'
import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { withTheme } from 'styled-components'
import { useDispatch } from 'react-redux'
import useSnackbar from '../../hooks/useSnackbar'

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 24,
  padding: 0,
  display: 'flex',
  '& .MuiSwitch-switchBase': {
    padding: 3,
    '&.Mui-checked': {
      transform: 'translateX(18px)',
      color: theme.colors.font,
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.colors.secondaryBackground
      }
    }
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    backgroundColor: theme.colors.font,
    width: 18,
    height: 18,
    borderRadius: 9
    // transition: theme.transitions.create(['width'], {
    //   duration: 200
    // })
  },
  '& .MuiSwitch-track': {
    borderRadius: 24 / 2,
    opacity: 1,
    border: `1px solid ${theme.colors.border}`,
    backgroundColor: theme.colors.primaryBackground,
    boxSizing: 'border-box'
  }
}))

const StyledSwitchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 64
}))

const AutoStartupSwitch = (props) => {
  const { theme } = props
  const [checked, setChecked] = useState(api.getLaunchAtLogin())
  const { snackbar } = useSnackbar()

  const handleOnChange = (e) => {
    if (!api.setLaunchAtLogin(e.target.checked)) {
      snackbar({ msg: 'Sorry autoLaunch is not available on your platform', type: 'warning' })
      return
    }
    setChecked(e.target.checked)
  }

  api.onUpdateLaunchAtLogin((_event, value) => {
    setChecked(value)
  })

  return (
    <StyledSwitchContainer>
      <AntSwitch checked={checked} onChange={handleOnChange} theme={theme} />
    </StyledSwitchContainer>
  )
}

export default withTheme(AutoStartupSwitch)
