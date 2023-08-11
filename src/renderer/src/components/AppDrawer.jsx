import { useLocation, useNavigate } from 'react-router-dom'
import { HEADER_TITLE } from './AppHeader'
import { Drawer } from '@mui/material'
import { styled, css } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { closeDrawer } from '../redux/appSlice'

const StyledDrawer = styled(Drawer)`
  ${({ theme }) => css`
    & .MuiDrawer-paper {
      padding: 0.5rem 0;
      background-color: ${theme.colors.primaryBackground};
      color: ${theme.colors.font};
    }
  `}
`

const StyledDrawerItem = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: left;
  align-item: center;
  font-size: 1.25rem;
  width: 250px;
  cursor: pointer;

  ${({ isSelected, theme }) => css`
    background-color: ${isSelected ? theme.colors.secondaryBackground : 'inherit'};
  `}
`

const StyledIconContainer = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  padding-right: 1rem;
`

const AppDrawer = (props) => {
  // const { open, onClose } = props
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const dispatch = useDispatch()

  const open = useSelector((state) => state.app.drawer.isOpen)

  const onClose = () => {
    dispatch(closeDrawer())
  }

  const handleNavigate = (path) => {
    if (pathname !== path) navigate(path)
    setTimeout(() => dispatch(closeDrawer()), 100)
  }

  return (
    <StyledDrawer open={open} onClose={onClose} anchor={'left'}>
      {Object.entries(HEADER_TITLE).map(([path, page], index) => {
        return (
          <StyledDrawerItem
            key={index}
            onClick={() => {
              handleNavigate(path)
            }}
            isSelected={pathname === path}
          >
            <StyledIconContainer>{page.icon}</StyledIconContainer>
            {page.title}
          </StyledDrawerItem>
        )
      })}
    </StyledDrawer>
  )
}

export default AppDrawer
