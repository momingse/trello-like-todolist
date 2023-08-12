import styled from 'styled-components'
import AutoStartupSwitch from './setting/AutoStartupSwitch'

const StyledSettingItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
`

const StyledSettingItemTitle = styled.div`
  font-size: 1.2rem;
  text-transform: capitalize;
`

const SettingItem = (props) => {
  const { title, action } = props

  return (
    <StyledSettingItemContainer>
      <StyledSettingItemTitle>{title}</StyledSettingItemTitle>
      {action}
    </StyledSettingItemContainer>
  )
}

const GeneralSettingPanel = (props) => {
  const EXTRA_SETTING_LIST = [
    {
      title: 'launch when system starts',
      action: <AutoStartupSwitch />
    }
  ]

  return (
    <>
      {EXTRA_SETTING_LIST.map((item, index) => (
        <SettingItem key={index} title={item.title} action={item.action} />
      ))}
    </>
  )
}

export default GeneralSettingPanel
