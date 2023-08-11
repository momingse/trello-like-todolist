import { styled, css } from 'styled-components'
import { useLocation } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import ViewWeekIcon from '@mui/icons-material/ViewWeek'
import SettingsIcon from '@mui/icons-material/Settings'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { openDrawer } from '../redux/appSlice'

export const HEADER_TITLE = {
  '/todo-state': { title: 'Todo State', icon: <ViewWeekIcon /> },
  '/setting': { title: 'Setting', icon: <SettingsIcon /> }
}

const StyledHeaderContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0.5rem 0;
  text-align: center;
  font-size: 1.5rem;

  ${({ theme }) => css`
    background-color: ${theme.colors.primaryBackground};
    border-bottom: 1px solid ${theme.colors.border};
    color: ${theme.colors.font};
  `}
`

const StyledMenuIcon = styled(MenuIcon)`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  left: 0.5rem;
  cursor: pointer;
`

const AppHeader =(props) => {
  const { pathname } = useLocation()
  const title = HEADER_TITLE[pathname].title
  const dispatch = useDispatch()

  const handleOpenDrawer = () => {
    dispatch(openDrawer())
  }

  return (
    <StyledHeaderContainer>
      <StyledMenuIcon onClick={handleOpenDrawer} />
      {title ? title : '404'}
    </StyledHeaderContainer>
  )
}

export default AppHeader
