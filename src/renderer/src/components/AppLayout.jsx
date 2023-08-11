import AppHeader from './AppHeader'
import { styled, css } from 'styled-components'
import AppDrawer from './AppDrawer'

const StyledAppContainer = styled.div`
  height: 100vh;

  ${({ theme }) => css`
    background-color: ${theme.colors.primaryBackground};
    color: ${theme.colors.font};
    line-height: 1.2;
  `}
`

const StyledAppContent = styled.div`
  overflow: hidden;

  ${({ headerHeight }) => css`
    padding-top: calc(2.8rem + 1px);
    height: calc(100% - 2.8rem);
  `}
`
const AppLayout = (props) => {
  const { children } = props

  return (
    <StyledAppContainer>
      <AppHeader />
      <StyledAppContent>{children}</StyledAppContent>
      <AppDrawer />
    </StyledAppContainer>
  )
}

export default AppLayout
